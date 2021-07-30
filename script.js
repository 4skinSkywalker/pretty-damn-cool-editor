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
let title = document.querySelector("#doc-title");
let datalistInput = document.querySelector("#datalist-input");
let datalistOptions = document.querySelector("#datalist-options");
let openDocBtn = document.querySelector("#open-doc-btn");
let newDocBtn = document.querySelector("#new-doc-btn");
let saveDocBtn = document.querySelector("#save-doc-btn");

// TODO: Expressions to use
// let key = aesjs.utils.hex.toBytes(SHA256(pass));
// let docString = decrypt(key, encryptedDoc);
//
// let datalistOption = document.querySelector(`option[value="${datalistInput.value}"]`);
// datalistOption.getAttribute("data-value");
//
// quill.setContents(JSON.parse(docString));
// let { ops: doc } = quill.getContents();

// Functions
function init() {
    loadDocs();

    // Events
    openDocBtn.addEventListener("click", () => openDocHandler());
    newDocBtn.addEventListener("click", () => newDocHandler());
    saveDocBtn.addEventListener("click", () => saveDocHandler());
}

function openDocHandler() {
    
}

function newDocHandler() {

}

function saveDocHandler(name) {
    
}

function saveDoc(name, version, pass, doc) {
    let docString = JSON.stringify(doc);
    let sign = SHA256(docString);

    // SHA256 to hash the password, but this method is vulnerable to Rainbow Attacks
    let key = aesjs.utils.hex.toBytes(SHA256(pass));
    let encryptedDoc = encrypt(key, docString);
    
    // Save an entry in the ipfs
    let ipfsEntry = {
        encryptedDoc,
        sign
    };
    let ipfsId = ipfs.add(ipfsEntry);

    if (!name) {
        name = window.prompt("Enter a document name.");
        if (!name) {
            window.alert("Document name not provided.");
            return;
        }
    }

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
    let localeStorageEntry = {
        timestamp: Date.now(),
        name,
        version,
        ipfsId
    }
    pushDocLS(localeStorageEntry);
}

function loadDocs() {

    // Reset and populate the datalist options
    datalistOptions.innerHTML = "";
    let docs = getDocsLS();

    // Sort documents in a way that makes sense
    function getSemanticValue(version) {
        version = version.split('.');
        version = +(version[0] + '.' + version.slice(1).join(''));
        return version;
    }
    docs.sort((a, b) => {
        if (a.name === b.name) {
            return getSemanticValue(a.version) - getSemanticValue(b.version);
        } else {
            return a.name > b.name;
        }
    });
    for (let doc of docs) {
        let base64 = btoa(JSON.stringify(doc));
        datalistOptions.innerHTML += `<option data="${base64}" value="${doc.name}-${doc.version}">${doc.name}</option>`;
    }
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