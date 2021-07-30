// Variables
let quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: '#toolbar'
    }
});

let ipfs = {
    LSKey: "ipfs",
    add: data => {
        let id = Math.random() * 1e10 | 0;
        let stored = JSON.parse(window.localStorage.getItem(ipfs.LSKey));
        if (!stored) {
            stored = {};
        }
        stored[id] = data;
        window.localStorage.setItem(ipfs.LSKey, JSON.stringify(stored));
        return id;
    },
    cat: id => {
        let stored = JSON.parse(window.localStorage.getItem(ipfs.LSKey));
        if (!stored) {
            return;
        }
        return stored[id];
    }
};

let LSKey = "documents-v0";
let graphContainer = document.getElementById("graph-container");
let title = document.querySelector("#doc-title");
let datalistInput = document.querySelector("#datalist-input");
let datalistOptions = document.querySelector("#datalist-options");
let openDocBtn = document.querySelector("#open-doc-btn");
let saveDocBtn = document.querySelector("#save-doc-btn");
let saveAsDocBtn = document.querySelector("#save-as-doc-btn");
let selectedDoc;
let selectedDocPassword;

// Functions
(function init() {
    populateDatalist();

    // Events
    datalistInput.addEventListener("change", () => openDocHandler());
    saveDocBtn.addEventListener("click", () => saveDocHandler());
    saveAsDocBtn.addEventListener("click", () => saveDocHandler(true));
})();

function openDocHandler() {
    let selectedOption = document.querySelector(`option[value="${datalistInput.value}"]`);
    if (!selectedOption) {
        window.alert("No document selected.");
        return;
    }
    let doc = JSON.parse(atob(selectedOption.getAttribute("data-base64")));

    // If the document name has changed reset selectedDocPassword
    if (selectedDoc && selectedDoc.name !== doc.name) {
        selectedDoc = null;
        selectedDocPassword = null;
        quill.setContents("");
        title.innerHTML = '-';
        graphContainer.innerHTML = "";
    }
    let pass;
    if (selectedDocPassword) {
        pass = selectedDocPassword;
    } else {
        pass = window.prompt("Enter the password.");
        if (!pass) {
            window.alert("No password provided.");
            return;
        }
    }

    // Retrieve the text
    let text = loadDoc(doc, pass);
    if (!text) {
        datalistInput.value = "";
        return;
    }
    selectedDoc = doc;
    selectedDocPassword = pass;
    quill.setContents(text);
    title.innerHTML = doc.name + " v" + doc.version;
    datalistInput.value = "";
    loadGitGraph(doc);
}

function loadGitGraph(doc) {
    let docs = getDocsLS(doc.name);
    graphContainer.innerHTML = "";
    let gitgraph = GitgraphJS.createGitgraph(graphContainer, {
        mode: "compact",
        orientation: "horizontal",
        template: new GitgraphJS.templateExtend(
            GitgraphJS.TemplateName.Metro,
            {
                commit: {
                    hasTooltipInCompactMode: false
                }
            }
        )
    });
    docs.sort((a, b) => getSemanticValue(a.version) - getSemanticValue(b.version));
    let branches = [gitgraph.branch('master')];
    for (let i = 0; i < docs.length; i++) {
        branches[branches.length - 1]
            .commit({
                onClick: commit => {

                    // Retrieve the text
                    let doc = JSON.parse(commit.subject);
                    let text = loadDoc(doc, selectedDocPassword);
                    if (!text) {
                        return;
                    }
                    selectedDoc = doc;
                    quill.setContents(text);
                    title.innerHTML = doc.name + " v" + doc.version;
                    loadGitGraph(doc);
                },
                subject: JSON.stringify(docs[i]),
                dotText: (docs[i].version === doc.version) ? "❤️" : ""
            });

        // Break here to avoid problems
        if (i === docs.length - 1) {
            break;
        }

        // Get levels which are important to know if it necessary to make a new branch or to go to the one before
        let aLvl = docs[i].version.split('.').length;
        let bLvl = docs[i + 1].version.split('.').length;
        if (aLvl < bLvl) {
            let branch = gitgraph.branch('v' + docs[i].version);
            branches.push(branch);
        } else if (aLvl > bLvl) {
            branches.pop();
        }
    }
}

function saveDocHandler(isSaveAs = false) {
    let selectedDocTemp = selectedDoc;
    if (isSaveAs) {
        selectedDocTemp = null;
    }
    let name;
    let version;
    let pass;
    if (selectedDocTemp) {
        name = selectedDoc.name;
        version = selectedDoc.version;
        pass = selectedDocPassword;
    } else {
        name = window.prompt("Enter a document name.");
        if (!name) {
            window.alert("Document name not provided.");
            return;
        }

        // Check if the document already exists
        let docs = getDocsLS(name);
        if (docs.length) {
            window.alert(`
A document with the name ${name} already exists.
Please choose a new and unique name.
`);
            return;
        }
        pass = window.prompt("Enter the password.");
        if (!pass) {
            window.alert("No password provided.");
            return;
        }
    }
    let { ops: text } = quill.getContents();

    // Save the document and change the state
    let doc = saveDoc(name, version, pass, text);
    selectedDoc = doc;
    selectedDocPassword = pass;
    title.innerHTML = doc.name + " v" + doc.version;
    datalistInput.value = "";
    populateDatalist();
    loadGitGraph(doc);
}

function getSemanticValue(version) {
    version = version.split('.');
    version = +(version[0] + '.' + version.slice(1).join(''));
    return version;
}

function populateDatalist() {

    // Reset and populate the datalist options
    datalistOptions.innerHTML = "";
    let docs = getDocsLS();

    // Keep just the head of each document
    let roots = {};
    for (let doc of docs) {
        if (!roots[doc.name]) {
            roots[doc.name] = doc;
        }
    }
    for (let doc of Object.values(roots)) {
        let base64 = btoa(JSON.stringify(doc));
        datalistOptions.innerHTML += `<option data-base64="${base64}" value="${doc.name}">${doc.name}</option>`;
    }

    // Sort documents in a way that makes sense
    // docs.sort((a, b) => {
    //     if (a.name < b.name) {
    //         return -1;
    //     } else if (a.name > b.name) {
    //         return 1;
    //     } else {
    //         return getSemanticValue(a.version) - getSemanticValue(b.version);
    //     }
    // });
    // for (let doc of docs) {
    //     let base64 = btoa(JSON.stringify(doc));
    //     datalistOptions.innerHTML += `<option data-base64="${base64}" value="${doc.name}-${doc.version}">${doc.name}</option>`;
    // }
}

function saveDoc(name, version, pass, text) {
    text = JSON.stringify(text);
    let sign = SHA256(text);

    // SHA256 to hash the password, but this method is vulnerable to Rainbow Attacks
    let key = aesjs.utils.hex.toBytes(SHA256(pass));
    let encryptedText = encrypt(key, text);
    
    // Save an entry in the ipfs
    let ipfsEntry = {
        encryptedText,
        sign
    };
    let ipfsId = ipfs.add(ipfsEntry);

    function getNextVersion(version) {
        let nextVersion = version.split('.');
        nextVersion[nextVersion.length - 1]++;
        nextVersion = nextVersion.join('.');
        return nextVersion;
    }

    function getLastVersion(version) {
        let lastVersion = getNextVersion(version);
        while (getDocLS(name, lastVersion)) {
            lastVersion = getNextVersion(lastVersion);
        }
        return lastVersion;
    }

    if (!version) {

        // Check the latest version of the document and bump it by 1
        version = getLastVersion("0");
        console.log("Continuing on the main version line...", version);
    } else {

        // Checking if a branch is needed
        let nextVersionDoc = getDocLS(name, getNextVersion(version));
        if (!nextVersionDoc) {
            version = getNextVersion(version);
            console.log("Continuing on the same version line...", version);
        } else {
            console.log("Branching the version line...");
            version = getLastVersion(version + ".0");
            console.log("Next open version spot is", version);
        }
    }
    let doc = {
        timestamp: Date.now(),
        name,
        version,
        ipfsId
    }
    return pushDocLS(doc);
}

function loadDoc(doc, pass) {
    if (!doc) {
        window.alert("No document provided.");
        return;
    }
    let { encryptedText, sign } = ipfs.cat(doc.ipfsId);
    let key = aesjs.utils.hex.toBytes(SHA256(pass));
    let text = decrypt(key, encryptedText);

    // Check if the password is correct
    if (SHA256(text) !== sign) {
        window.alert("Password is incorrect.");
        return;
    }
    return JSON.parse(text);
}

function getDocsLS(name) {
    let docs = JSON.parse(window.localStorage.getItem(LSKey));
    if (!docs) {
        docs = [];
    }
    if (!name) {
        return docs;
    }
    return docs.filter(doc => doc.name === name);
}

function getDocLS(name, version) {
    let docs = getDocsLS(name);
    return docs.find(doc => doc.version === version);
}

function pushDocLS(data) {
    let docs = getDocsLS();
    docs.push(data);
    window.localStorage.setItem(LSKey, JSON.stringify(docs));
    return data;
}

function encrypt(key, plaintext) {

    // (1) Convert text to bytes
    var textBytes = aesjs.utils.utf8.toBytes(plaintext);

    // (2)
    var aesCtr = new aesjs.ModeOfOperation.ctr(key);
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // (3) To store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
}

function decrypt(key, encryptedHex) {

    // (4) When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // (5) The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key);
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // (6) Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
}

function SHA256(r) {
    var n = 8, t = 0; function e(r, n) { var t = (65535 & r) + (65535 & n); return (r >> 16) + (n >> 16) + (t >> 16) << 16 | 65535 & t } function o(r, n) { return r >>> n | r << 32 - n } function u(r, n) { return r >>> n } function a(r, n, t) { return r & n ^ ~r & t } function f(r, n, t) { return r & n ^ r & t ^ n & t } function c(r) { return o(r, 2) ^ o(r, 13) ^ o(r, 22) } function i(r) { return o(r, 6) ^ o(r, 11) ^ o(r, 25) } function h(r) { return o(r, 7) ^ o(r, 18) ^ u(r, 3) } return function (r) { for (var n = t ? "0123456789ABCDEF" : "0123456789abcdef", e = "", o = 0; o < 4 * r.length; o++)e += n.charAt(r[o >> 2] >> 8 * (3 - o % 4) + 4 & 15) + n.charAt(r[o >> 2] >> 8 * (3 - o % 4) & 15); return e }(function (r, n) { var t, C, g, A, d, v, S, l, m, y, w, b = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298), p = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225), B = new Array(64); r[n >> 5] |= 128 << 24 - n % 32, r[15 + (n + 64 >> 9 << 4)] = n; for (var D = 0; D < r.length; D += 16) { t = p[0], C = p[1], g = p[2], A = p[3], d = p[4], v = p[5], S = p[6], l = p[7]; for (var E = 0; E < 64; E++)B[E] = E < 16 ? r[E + D] : e(e(e(o(w = B[E - 2], 17) ^ o(w, 19) ^ u(w, 10), B[E - 7]), h(B[E - 15])), B[E - 16]), m = e(e(e(e(l, i(d)), a(d, v, S)), b[E]), B[E]), y = e(c(t), f(t, C, g)), l = S, S = v, v = d, d = e(A, m), A = g, g = C, C = t, t = e(m, y); p[0] = e(t, p[0]), p[1] = e(C, p[1]), p[2] = e(g, p[2]), p[3] = e(A, p[3]), p[4] = e(d, p[4]), p[5] = e(v, p[5]), p[6] = e(S, p[6]), p[7] = e(l, p[7]) } return p }(function (r) { for (var t = Array(), e = (1 << n) - 1, o = 0; o < r.length * n; o += n)t[o >> 5] |= (r.charCodeAt(o / n) & e) << 24 - o % 32; return t }(r = function (r) { r = r.replace(/\r\n/g, "\n"); for (var n = "", t = 0; t < r.length; t++) { var e = r.charCodeAt(t); e < 128 ? n += String.fromCharCode(e) : e > 127 && e < 2048 ? (n += String.fromCharCode(e >> 6 | 192), n += String.fromCharCode(63 & e | 128)) : (n += String.fromCharCode(e >> 12 | 224), n += String.fromCharCode(e >> 6 & 63 | 128), n += String.fromCharCode(63 & e | 128)) } return n }(r)), r.length * n))
}