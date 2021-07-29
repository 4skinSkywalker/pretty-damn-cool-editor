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
        let id = Math.random() * 1000 | 0;
        let stored = getLS(ipfs.LSKey);
        stored[id] = data;
        setLS(ipfs.LSKey, stored);
        return id;
    },
    cat: id => {
        return getLS(ipfs.LSKey)[id];
    }
};

let LSKey = "v0";
let title = document.querySelector("#doc-title");
let datalistInput = document.querySelector("#datalist-input");
let datalistOptions = document.querySelector("#datalist-options");
let openDocBtn = document.querySelector("#open-doc-btn");
let newDocBtn = document.querySelector("#new-doc-btn");
let saveDocBtn = document.querySelector("#save-doc-btn");
let currentName;
let currentPassword;

// Events
openDocBtn.addEventListener("click", () => openDocHandler());
newDocBtn.addEventListener("click", () => newDocHandler());
saveDocBtn.addEventListener("click", () => saveDocHandler());

// Functions
function openDocHandler() {
    let datalistOption = document.querySelector(`option[value="${datalistInput.value}"]`);
    let ipfsId = datalistOption.getAttribute("data-value");
    let { encryptedDoc, sign } = ipfs.cat(ipfsId);
    let pass = window.prompt("Enter the password");
    if (!pass) {
        window.alert("No password provided");
        return;
    }

    // Decrypt the document
    let key = aesjs.utils.hex.toBytes(SHA256(pass));
    let docString = decrypt(key, encryptedDoc);

    // Check password correctness
    if (SHA256(docString) !== sign) {
        window.alert("Password is incorrect");
        return;
    }
    currentName = datalistInput.value;
    title.innerHTML = currentName;
    currentPassword = pass;

    // Set contents to quill
    quill.setContents(JSON.parse(docString));
    datalistInput.value = "";
}

function newDocHandler() {
    let name = window.prompt("Enter a name");
    if (!name) {
        window.alert("No name provided");
        return;
    }

    // TODO: Check if the name is already there

    // TODO: Notify the user that the name cannot be change
}

function saveDocHandler() {
    if (!currentPassword) {
        window.alert("No document selected");
        return;
    }

    // TODO: Notify the user he/she has to load a document first

    // Get contents from quill
    let { ops: doc } = quill.getContents();
    saveDoc(currentName, currentPassword, doc);
    loadDocs();
}

function saveDoc(name, pass, doc) {
    let docString = JSON.stringify(doc);
    let sign = SHA256(docString);

    // SHA256 to hash the password, but this method is vulnerable to Rainbow Attacks
    let key = aesjs.utils.hex.toBytes(SHA256(pass));
    let encryptedDoc = encrypt(key, docString);
    let ipfsEntry = {
        encryptedDoc,
        sign
    };
    let ipfsId = ipfs.add(ipfsEntry);
    let localEntry = {
        timestamp: Date.now(),
        ipfsId
    };
    let stored = getLS(LSKey);
    stored[name] = localEntry;
    setLS(LSKey, stored);
}

function loadDocs() {
    datalistOptions.innerHTML = "";
    let stored = getLS(LSKey);
    for (let key in stored) {
        datalistOptions.innerHTML += `<option data-value="${stored[key].ipfsId}" value="${key}">${key}</option>`;
    }
};
loadDocs();

function getLS(key) {
    let stored = JSON.parse(window.localStorage.getItem(key));
    if (!stored) {
        stored = {};
    }
    return stored;
}

function setLS(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
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