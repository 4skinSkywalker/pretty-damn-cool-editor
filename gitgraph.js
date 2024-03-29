! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).GitgraphJS = {})
}(this, function(t) {
    "use strict";
    var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function r(t) {
        return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
    }

    function s(t, e) {
        return t(e = {
            exports: {}
        }, e.exports), e.exports
    }
    var i = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            function(t) {
                t.VerticalReverse = "vertical-reverse", t.Horizontal = "horizontal", t.HorizontalReverse = "horizontal-reverse"
            }(e.Orientation || (e.Orientation = {}))
    });
    r(i);
    i.Orientation;
    var n = s(function(t, e) {
        function r(t, e) {
            return Object.assign({}, e.reduce((e, r) => Object.assign({}, e, {
                [r]: t[r]
            }), {}))
        }

        function s(t) {
            return void 0 === t
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.booleanOptionOr = function(t, e) {
            return "boolean" == typeof t ? t : e
        }, e.numberOptionOr = function(t, e) {
            return "number" == typeof t ? t : e
        }, e.pick = r, e.debug = function(t, e) {
            console.log(JSON.stringify(t.map(t => r(t, e)), null, 2))
        }, e.isUndefined = s, e.withoutUndefinedKeys = function(t = {}) {
            return Object.keys(t).reduce((e, r) => s(t[r]) ? e : Object.assign({}, e, {
                [r]: t[r]
            }), {})
        }, e.arrowSvgPath = function(t, e, r) {
            const s = r.style.dot.size,
                n = t.template.arrow.size,
                a = s + t.template.arrow.offset,
                o = Math.PI / 7,
                h = function(t, e, r) {
                    const s = e.x - r.x,
                        n = e.y - r.y,
                        a = t.template.commit.spacing;
                    let o, h;
                    switch (t.orientation) {
                        case i.Orientation.Horizontal:
                            o = n, h = -a;
                            break;
                        case i.Orientation.HorizontalReverse:
                            o = n, h = a;
                            break;
                        case i.Orientation.VerticalReverse:
                            o = -a, h = s;
                            break;
                        default:
                            o = a, h = s
                    }
                    return t.isVertical ? Math.abs(n) > a && (h = 0) : Math.abs(s) > a && (o = 0), t.reverseArrow && (o *= -1, h *= -1), Math.atan2(o, h)
                }(t, e, r),
                c = a * Math.cos(h),
                l = a * Math.sin(h),
                m = (a + n) * Math.cos(h - o),
                u = (a + n) * Math.sin(h - o),
                d = (a + n / 2) * Math.cos(h),
                p = (a + n / 2) * Math.sin(h),
                g = (a + n) * Math.cos(h + o),
                f = (a + n) * Math.sin(h + o);
            return `M${c},${l} L${m},${u} Q${d},${p} ${g},${f} L${g},${f}`
        }
    });
    r(n);
    n.booleanOptionOr, n.numberOptionOr, n.pick, n.debug, n.isUndefined, n.withoutUndefinedKeys, n.arrowSvgPath;
    var a = s(function(t, e) {
        var r;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            function(t) {
                t.Bezier = "bezier", t.Straight = "straight"
            }(r || (r = {})), e.MergeStyle = r, e.DEFAULT_FONT = "normal 12pt Calibri";
        class s {
            constructor(t) {
                t.branch = t.branch || {}, t.branch.label = t.branch.label || {}, t.arrow = t.arrow || {}, t.commit = t.commit || {}, t.commit.dot = t.commit.dot || {}, t.commit.message = t.commit.message || {}, this.colors = t.colors || ["#000000"], this.branch = {
                    color: t.branch.color,
                    lineWidth: t.branch.lineWidth || 2,
                    mergeStyle: t.branch.mergeStyle || r.Bezier,
                    spacing: n.numberOptionOr(t.branch.spacing, 20),
                    label: {
                        display: n.booleanOptionOr(t.branch.label.display, !0),
                        color: t.branch.label.color || t.commit.color,
                        strokeColor: t.branch.label.strokeColor || t.commit.color,
                        bgColor: t.branch.label.bgColor || "white",
                        font: t.branch.label.font || t.commit.message.font || e.DEFAULT_FONT,
                        borderRadius: n.numberOptionOr(t.branch.label.borderRadius, 10)
                    }
                }, this.arrow = {
                    size: t.arrow.size || null,
                    color: t.arrow.color || null,
                    offset: t.arrow.offset || 2
                }, this.commit = {
                    color: t.commit.color,
                    spacing: n.numberOptionOr(t.commit.spacing, 25),
                    hasTooltipInCompactMode: n.booleanOptionOr(t.commit.hasTooltipInCompactMode, !0),
                    dot: {
                        color: t.commit.dot.color || t.commit.color,
                        size: t.commit.dot.size || 3,
                        strokeWidth: n.numberOptionOr(t.commit.dot.strokeWidth, 0),
                        strokeColor: t.commit.dot.strokeColor,
                        font: t.commit.dot.font || t.commit.message.font || "normal 10pt Calibri"
                    },
                    message: {
                        display: n.booleanOptionOr(t.commit.message.display, !0),
                        displayAuthor: n.booleanOptionOr(t.commit.message.displayAuthor, !0),
                        displayHash: n.booleanOptionOr(t.commit.message.displayHash, !0),
                        color: t.commit.message.color || t.commit.color,
                        font: t.commit.message.font || e.DEFAULT_FONT
                    }
                }, this.tag = t.tag || {}
            }
        }
        e.Template = s;
        const i = new s({
            colors: ["#6963FF", "#47E8D4", "#6BDB52", "#E84BA5", "#FFA657"],
            branch: {
                color: "#000000",
                lineWidth: 4,
                spacing: 50,
                mergeStyle: r.Straight
            },
            commit: {
                spacing: 60,
                dot: {
                    size: 16,
                    strokeColor: "#000000",
                    strokeWidth: 4
                },
                message: {
                    color: "black"
                }
            },
            arrow: {
                size: 16,
                offset: -1.5
            }
        });
        e.blackArrowTemplate = i;
        const a = new s({
            colors: ["#979797", "#008fb5", "#f1c109"],
            branch: {
                lineWidth: 10,
                spacing: 50
            },
            commit: {
                spacing: 80,
                dot: {
                    size: 14
                },
                message: {
                    font: "normal 14pt Arial"
                }
            }
        });
        var o;

        function h(t) {
            return t ? "string" == typeof t ? {
                [o.BlackArrow]: i,
                [o.Metro]: a
            } [t] : t : a
        }
        e.metroTemplate = a,
            function(t) {
                t.Metro = "metro", t.BlackArrow = "blackarrow"
            }(o || (o = {})), e.TemplateName = o, e.templateExtend = function(t, e) {
                const r = h(t);
                return e.branch || (e.branch = {}), e.commit || (e.commit = {}), {
                    colors: e.colors || r.colors,
                    arrow: Object.assign({}, r.arrow, e.arrow),
                    branch: Object.assign({}, r.branch, e.branch, {
                        label: Object.assign({}, r.branch.label, e.branch.label)
                    }),
                    commit: Object.assign({}, r.commit, e.commit, {
                        dot: Object.assign({}, r.commit.dot, e.commit.dot),
                        message: Object.assign({}, r.commit.message, e.commit.message)
                    }),
                    tag: Object.assign({}, r.tag, e.tag)
                }
            }, e.getTemplate = h
    });
    r(a);
    a.MergeStyle, a.DEFAULT_FONT, a.Template, a.blackArrowTemplate, a.metroTemplate, a.TemplateName, a.templateExtend, a.getTemplate;
    var o = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.Tag = class {
            constructor(t, e, r, s) {
                this.name = t, this.tagStyle = e, this.commitStyle = s, this.render = r
            }
            get style() {
                return {
                    strokeColor: this.tagStyle.strokeColor || this.commitStyle.color,
                    bgColor: this.tagStyle.bgColor || this.commitStyle.color,
                    color: this.tagStyle.color || "white",
                    font: this.tagStyle.font || this.commitStyle.message.font || a.DEFAULT_FONT,
                    borderRadius: n.numberOptionOr(this.tagStyle.borderRadius, 10),
                    pointerWidth: n.numberOptionOr(this.tagStyle.pointerWidth, 12)
                }
            }
        }
    });
    r(o);
    o.Tag;
    var h = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        const r = () => (Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3) + Math.random().toString(16).substring(3)).substring(0, 40);
        class s {
            constructor(t) {
                let e, s;
                this.refs = [], this.x = 0, this.y = 0;
                try {
                    [, e, s] = t.author.match(/(.*) <(.*)>/)
                } catch (r) {
                    [e, s] = [t.author, ""]
                }
                this.author = {
                    name: e,
                    email: s,
                    timestamp: Date.now()
                }, this.committer = {
                    name: e,
                    email: s,
                    timestamp: Date.now()
                }, this.subject = t.subject, this.body = t.body || "", this.hash = t.hash || r(), this.hashAbbrev = this.hash.substring(0, 7), this.parents = t.parents ? t.parents : [], this.parentsAbbrev = this.parents.map(t => t.substring(0, 7)), this.style = Object.assign({}, t.style, {
                    message: Object.assign({}, t.style.message),
                    dot: Object.assign({}, t.style.dot)
                }), this.dotText = t.dotText, this.onClick = (() => t.onClick ? t.onClick(this) : void 0), this.onMessageClick = (() => t.onMessageClick ? t.onMessageClick(this) : void 0), this.onMouseOver = (() => t.onMouseOver ? t.onMouseOver(this) : void 0), this.onMouseOut = (() => t.onMouseOut ? t.onMouseOut(this) : void 0), this.renderDot = t.renderDot, this.renderMessage = t.renderMessage, this.renderTooltip = t.renderTooltip
            }
            get message() {
                let t = "";
                return this.style.message.displayHash && (t += `${this.hashAbbrev} `), t += this.subject, this.style.message.displayAuthor && (t += ` - ${this.author.name} <${this.author.email}>`), t
            }
            get branchToDisplay() {
                return this.branches ? this.branches[0] : ""
            }
            setRefs(t) {
                return this.refs = t.getNames(this.hash), this
            }
            setTags(t, e, r) {
                return this.tags = t.getNames(this.hash).map(t => new o.Tag(t, e(t), r(t), this.style)), this
            }
            setBranches(t) {
                return this.branches = t, this
            }
            setPosition({
                x: t,
                y: e
            }) {
                return this.x = t, this.y = e, this
            }
            withDefaultColor(t) {
                const e = Object.assign({}, this.style, {
                    dot: Object.assign({}, this.style.dot),
                    message: Object.assign({}, this.style.message)
                });
                e.color || (e.color = t), e.dot.color || (e.dot.color = t), e.message.color || (e.message.color = t);
                const r = this.cloneCommit();
                return r.style = e, r
            }
            cloneCommit() {
                const t = new s({
                    author: `${this.author.name} <${this.author.email}>`,
                    subject: this.subject,
                    style: this.style,
                    body: this.body,
                    hash: this.hash,
                    parents: this.parents,
                    dotText: this.dotText,
                    onClick: this.onClick,
                    onMessageClick: this.onMessageClick,
                    onMouseOver: this.onMouseOver,
                    onMouseOut: this.onMouseOut,
                    renderDot: this.renderDot,
                    renderMessage: this.renderMessage,
                    renderTooltip: this.renderTooltip
                });
                return t.refs = this.refs, t.branches = this.branches, t.tags = this.tags, t.x = this.x, t.y = this.y, t
            }
        }
        e.Commit = s
    });
    r(h);
    h.Commit;
    var c = s(function(t, r) {
        var s = e && e.__rest || function(t, e) {
            var r = {};
            for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && e.indexOf(s) < 0 && (r[s] = t[s]);
            if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
                var i = 0;
                for (s = Object.getOwnPropertySymbols(t); i < s.length; i++) e.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(t, s[i]) && (r[s[i]] = t[s[i]])
            }
            return r
        };
        Object.defineProperty(r, "__esModule", {
            value: !0
        });
        class i {
            constructor(t, e, r) {
                this._branch = t, this.name = t.name, this._graph = e, this._onGraphUpdate = r
            }
            branch(t) {
                if (this._branch.isDeleted() && !this._isReferenced()) throw new Error(`Cannot branch from the deleted branch "${this.name}"`);
                const e = "string" == typeof t ? {
                    name: t
                } : t;
                return e.from = this, this._graph.createBranch(e).getUserApi()
            }
            commit(t) {
                if (this._branch.isDeleted() && !this._isReferenced()) throw new Error(`Cannot commit on the deleted branch "${this.name}"`);
                return "string" == typeof t && (t = {
                    subject: t
                }), t || (t = {}), this._commitWithParents(t, []), this._onGraphUpdate(), this
            }
            delete() {
                if (this._graph.refs.getCommit("HEAD") === this._graph.refs.getCommit(this.name)) throw new Error(`Cannot delete the checked out branch "${this.name}"`);
                return [... function*(t, e) {
                    const r = (t, e) => t.commits.find(({
                        hash: t
                    }) => t === e);
                    let s = r(t, t.refs.getCommit(e.name));
                    for (; s && s.hash !== e.parentCommitHash;) yield s, s = r(t, s.parents[0])
                }(this._graph, this._branch)].forEach(t => {
                    t.refs = t.refs.filter(t => t !== this.name)
                }), this._graph.refs.delete(this.name), this._graph.branches.delete(this.name), this._branch = l.createDeletedBranch(this._graph, this._branch.style, () => {}), this._onGraphUpdate(), this
            }
            merge(...t) {
                if (this._branch.isDeleted() && !this._isReferenced()) throw new Error(`Cannot merge to the deleted branch "${this.name}"`);
                let e = t[0];
                (function(t) {
                    return "object" == typeof t && !(t instanceof i)
                })(e) || (e = {
                    branch: t[0],
                    fastForward: !1,
                    commitOptions: {
                        subject: t[1]
                    }
                });
                const {
                    branch: r,
                    fastForward: s,
                    commitOptions: n
                } = e, a = "string" == typeof r ? r : r.name, o = this._graph.refs.getCommit(a);
                if (!o) throw new Error(`The branch called "${a}" is unknown`);
                let h = !1;
                if (s) {
                    const t = this._graph.refs.getCommit(this._branch.name);
                    t && (h = this._areCommitsConnected(t, o))
                }
                return s && h ? this._fastForwardTo(o) : this._commitWithParents(Object.assign({}, n, {
                    subject: n && n.subject || `Merge branch ${a}`
                }), [o]), this._onGraphUpdate(), this
            }
            tag(t) {
                if (this._branch.isDeleted() && !this._isReferenced()) throw new Error(`Cannot tag on the deleted branch "${this.name}"`);
                return "string" == typeof t ? this._graph.getUserApi().tag({
                    name: t,
                    ref: this._branch.name
                }) : this._graph.getUserApi().tag(Object.assign({}, t, {
                    ref: this._branch.name
                })), this
            }
            checkout() {
                if (this._branch.isDeleted() && !this._isReferenced()) throw new Error(`Cannot checkout the deleted branch "${this.name}"`);
                const t = this._branch,
                    e = this._graph.refs.getCommit(t.name);
                return this._graph.currentBranch = t, e && this._graph.refs.set("HEAD", e), this
            }
            _commitWithParents(t, e) {
                const r = this._graph.refs.getCommit(this._branch.name);
                r ? e.unshift(r) : this._branch.parentCommitHash && e.unshift(this._branch.parentCommitHash);
                const {
                    tag: i
                } = t, n = s(t, ["tag"]), a = new h.Commit(Object.assign({
                    hash: this._graph.generateCommitHash(),
                    author: this._branch.commitDefaultOptions.author || this._graph.author,
                    subject: this._branch.commitDefaultOptions.subject || this._graph.commitMessage
                }, n, {
                    parents: e,
                    style: this._getCommitStyle(t.style)
                }));
                if (r) {
                    this._graph.refs.getNames(r).forEach(t => this._graph.refs.set(t, a.hash))
                } else this._graph.refs.set(this._branch.name, a.hash);
                this._graph.commits.push(a), this.checkout(), i && this.tag(i)
            }
            _areCommitsConnected(t, e) {
                const r = this._graph.commits.find(({
                    hash: t
                }) => e === t);
                return !!r && (!(0 === r.parents.length) && (!!r.parents.includes(t) || r.parents.some(e => this._areCommitsConnected(t, e))))
            }
            _fastForwardTo(t) {
                this._graph.refs.set(this._branch.name, t)
            }
            _getCommitStyle(t = {}) {
                return Object.assign({}, n.withoutUndefinedKeys(this._graph.template.commit), n.withoutUndefinedKeys(this._branch.commitDefaultOptions.style), t, {
                    message: Object.assign({}, n.withoutUndefinedKeys(this._graph.template.commit.message), n.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.message), t.message, n.withoutUndefinedKeys({
                        display: this._graph.shouldDisplayCommitMessage && void 0
                    })),
                    dot: Object.assign({}, n.withoutUndefinedKeys(this._graph.template.commit.dot), n.withoutUndefinedKeys(this._branch.commitDefaultOptions.style.dot), t.dot)
                })
            }
            _isReferenced() {
                return this._graph.branches.has(this.name) || this._graph.refs.hasName(this.name) || this._graph.commits.reduce((t, {
                    refs: e
                }) => [...t, ...e], []).includes(this.name)
            }
        }
        r.BranchUserApi = i
    });
    r(c);
    c.BranchUserApi;
    var l = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        const r = "";
        e.DELETED_BRANCH_NAME = r;
        class s {
            constructor(t) {
                this.gitgraph = t.gitgraph, this.name = t.name, this.style = t.style, this.parentCommitHash = t.parentCommitHash, this.commitDefaultOptions = t.commitDefaultOptions || {
                    style: {}
                }, this.onGraphUpdate = t.onGraphUpdate, this.renderLabel = t.renderLabel
            }
            getUserApi() {
                return new c.BranchUserApi(this, this.gitgraph, this.onGraphUpdate)
            }
            isDeleted() {
                return this.name === r
            }
        }
        e.Branch = s, e.createDeletedBranch = function(t, e, i) {
            return new s({
                name: r,
                gitgraph: t,
                style: e,
                onGraphUpdate: i
            })
        }
    });
    r(l);
    l.DELETED_BRANCH_NAME, l.Branch, l.createDeletedBranch;
    var m = s(function(t, e) {
        var r;
        Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            function(t) {
                t.Compact = "compact"
            }(r || (r = {})), e.Mode = r
    });
    r(m);
    m.Mode;
    var u = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.RegularGraphRows = class {
            constructor(t) {
                this.rows = new Map, this.maxRowCache = void 0, this.computeRowsFromCommits(t)
            }
            getRowOf(t) {
                return this.rows.get(t) || 0
            }
            getMaxRow() {
                return void 0 === this.maxRowCache && (this.maxRowCache = function(t) {
                    const e = new Set;
                    return t.forEach(t => e.add(t)), Array.from(e)
                }(Array.from(this.rows.values())).length - 1), this.maxRowCache
            }
            computeRowsFromCommits(t) {
                t.forEach((t, e) => {
                    this.rows.set(t.hash, e)
                }), this.maxRowCache = void 0
            }
        }
    });
    r(u);
    u.RegularGraphRows;
    var d = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.CompactGraphRows = class extends u.RegularGraphRows {
            computeRowsFromCommits(t) {
                t.forEach((e, r) => {
                    let s = r;
                    if (0 !== r) {
                        const i = this.getRowOf(e.parents[0]),
                            n = t[r - 1];
                        s = Math.max(i + 1, this.getRowOf(n.hash)), e.parents.length > 1 && i < this.getRowOf(e.parents[1]) && s++
                    }
                    this.rows.set(e.hash, s)
                })
            }
        }
    });
    r(d);
    d.CompactGraphRows;
    var p = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.GraphRows = u.RegularGraphRows, e.createGraphRows = function(t, e) {
            return t === m.Mode.Compact ? new d.CompactGraphRows(e) : new u.RegularGraphRows(e)
        }
    });
    r(p);
    p.GraphRows, p.createGraphRows;
    var g = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.BranchesOrder = class {
            constructor(t, e, r) {
                this.branches = new Set, this.colors = e, t.forEach(t => this.branches.add(t.branchToDisplay)), r && (this.branches = new Set(Array.from(this.branches).sort(r)))
            }
            get(t) {
                return Array.from(this.branches).findIndex(e => e === t)
            }
            getColorOf(t) {
                return this.colors[this.get(t) % this.colors.length]
            }
        }
    });
    r(g);
    g.BranchesOrder;
    var f = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.Refs = class {
            constructor() {
                this.commitPerName = new Map, this.namesPerCommit = new Map
            }
            set(t, e) {
                const r = this.commitPerName.get(t);
                return r && this.removeNameFrom(r, t), this.addNameTo(e, t), this.addCommitTo(t, e), this
            }
            delete(t) {
                return this.hasName(t) && (this.removeNameFrom(this.getCommit(t), t), this.commitPerName.delete(t)), this
            }
            getCommit(t) {
                return this.commitPerName.get(t)
            }
            getNames(t) {
                return this.namesPerCommit.get(t) || []
            }
            getAllNames() {
                return Array.from(this.commitPerName.keys())
            }
            hasCommit(t) {
                return this.namesPerCommit.has(t)
            }
            hasName(t) {
                return this.commitPerName.has(t)
            }
            removeNameFrom(t, e) {
                const r = this.namesPerCommit.get(t) || [];
                this.namesPerCommit.set(t, r.filter(t => t !== e))
            }
            addNameTo(t, e) {
                const r = this.namesPerCommit.get(t) || [];
                this.namesPerCommit.set(t, [...r, e])
            }
            addCommitTo(t, e) {
                this.commitPerName.set(t, e)
            }
        }
    });
    r(f);
    f.Refs;
    var b = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.BranchesPathsCalculator = class {
            constructor(t, e, r, s, i, n) {
                this.branchesPaths = new Map, this.commits = t, this.branches = e, this.commitSpacing = r, this.isGraphVertical = s, this.isGraphReverse = i, this.createDeletedBranch = n
            }
            execute() {
                return this.fromCommits(), this.withMergeCommits(), this.smoothBranchesPaths()
            }
            fromCommits() {
                this.commits.forEach(t => {
                    let e = this.branches.get(t.branchToDisplay);
                    e || (e = this.getDeletedBranchInPath() || this.createDeletedBranch());
                    const r = [],
                        s = this.branchesPaths.get(e),
                        i = this.commits.find(({
                            hash: e
                        }) => e === t.parents[0]);
                    s ? r.push(...s) : i && r.push({
                        x: i.x,
                        y: i.y
                    }), r.push({
                        x: t.x,
                        y: t.y
                    }), this.branchesPaths.set(e, r)
                })
            }
            withMergeCommits() {
                this.commits.filter(({
                    parents: t
                }) => t.length > 1).forEach(t => {
                    const e = this.commits.find(({
                        hash: e
                    }) => e === t.parents[1]);
                    if (!e) return;
                    const r = e.branches ? e.branches[0] : "";
                    let s = this.branches.get(r);
                    if (!s && !(s = this.getDeletedBranchInPath())) return;
                    const i = [...this.branchesPaths.get(s) || []];
                    this.branchesPaths.set(s, [...i, {
                        x: t.x,
                        y: t.y,
                        mergeCommit: !0
                    }])
                })
            }
            getDeletedBranchInPath() {
                return Array.from(this.branchesPaths.keys()).find(t => t.isDeleted())
            }
            smoothBranchesPaths() {
                const t = new Map;
                return this.branchesPaths.forEach((e, r) => {
                    if (e.length <= 1) return void t.set(r, [e]);
                    e = this.isGraphVertical ? e.sort((t, e) => t.y > e.y ? -1 : 1) : e.sort((t, e) => t.x > e.x ? 1 : -1), this.isGraphReverse && (e = e.reverse());
                    const s = e.reduce((t, r, s) => {
                        if (r.mergeCommit) {
                            t[t.length - 1].push(n.pick(r, ["x", "y"]));
                            let i = s - 1,
                                a = e[i];
                            for (; i >= 0 && a.mergeCommit;) a = e[--i];
                            i >= 0 && t.push([a])
                        } else t[t.length - 1].push(r);
                        return t
                    }, [
                        []
                    ]);
                    this.isGraphReverse && s.forEach(t => t.reverse()), this.isGraphVertical ? s.forEach(e => {
                        if (e.length <= 1) return;
                        const s = e[0],
                            i = e[e.length - 1],
                            n = e[1].x,
                            a = Math.round(Math.abs(s.y - i.y) / this.commitSpacing) - 1,
                            o = a > 0 ? new Array(a).fill(0).map((t, r) => ({
                                x: n,
                                y: e[0].y - this.commitSpacing * (r + 1)
                            })) : [],
                            h = t.get(r) || [];
                        t.set(r, [...h, [s, ...o, i]])
                    }) : s.forEach(e => {
                        if (e.length <= 1) return;
                        const s = e[0],
                            i = e[e.length - 1],
                            n = e[1].y,
                            a = Math.round(Math.abs(s.x - i.x) / this.commitSpacing) - 1,
                            o = a > 0 ? new Array(a).fill(0).map((t, r) => ({
                                y: n,
                                x: e[0].x + this.commitSpacing * (r + 1)
                            })) : [],
                            h = t.get(r) || [];
                        t.set(r, [...h, [s, ...o, i]])
                    })
                }), t
            }
        }, e.toSvgPath = function(t, e, r) {
            return t.map(t => "M" + t.map(({
                x: t,
                y: s
            }, i, n) => {
                if (e && n.length > 1 && (1 === i || i === n.length - 1)) {
                    const e = n[i - 1];
                    if (r) {
                        const r = (e.y + s) / 2;
                        return `C ${e.x} ${r} ${t} ${r} ${t} ${s}`
                    } {
                        const r = (e.x + t) / 2;
                        return `C ${r} ${e.y} ${r} ${s} ${t} ${s}`
                    }
                }
                return `L ${t} ${s}`
            }).join(" ").slice(1)).join(" ")
        }
    });
    r(b);
    b.BranchesPathsCalculator, b.toSvgPath;
    var y = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.GitgraphUserApi = class {
            constructor(t, e) {
                this._graph = t, this._onGraphUpdate = e
            }
            clear() {
                return this._graph.refs = new f.Refs, this._graph.tags = new f.Refs, this._graph.commits = [], this._graph.branches = new Map, this._graph.currentBranch = this._graph.createBranch("master"), this._onGraphUpdate(), this
            }
            commit(t) {
                return this._graph.currentBranch.getUserApi().commit(t), this
            }
            branch(t) {
                return this._graph.createBranch(t).getUserApi()
            }
            tag(...t) {
                let e, r, s, i, n;
                if ("string" == typeof t[0] ? (e = t[0], r = t[1]) : (e = t[0].name, r = t[0].ref, s = t[0].style, i = t[0].render), !r) {
                    const t = this._graph.refs.getCommit("HEAD");
                    if (!t) return this;
                    r = t
                }
                if (this._graph.refs.hasCommit(r) && (n = r), this._graph.refs.hasName(r) && (n = this._graph.refs.getCommit(r)), !n) throw new Error(`The ref "${r}" does not exist`);
                return this._graph.tags.set(e, n), this._graph.tagStyles[e] = s, this._graph.tagRenders[e] = i, this._onGraphUpdate(), this
            }
            import(t) {
                const e = new Error("Only `git2json` format is supported for imported data.");
                if (!Array.isArray(t)) throw e;
                if (!t.every(t => "object" == typeof t && "object" == typeof t.author && Array.isArray(t.refs))) throw e;
                const r = t.map(t => Object.assign({}, t, {
                    style: Object.assign({}, this._graph.template.commit, {
                        message: Object.assign({}, this._graph.template.commit.message, {
                            display: this._graph.shouldDisplayCommitMessage
                        })
                    }),
                    author: `${t.author.name} <${t.author.email}>`
                })).reverse();
                this.clear(), this._graph.commits = r.map(t => new h.Commit(t)), r.forEach(({
                    refs: t,
                    hash: e
                }) => {
                    t && e && (t.map(t => t.split("tag: ")).map(([t, e]) => e).filter(t => "string" == typeof t).forEach(t => this._graph.tags.set(t, e)), t.filter(t => !t.startsWith("tag: ")).forEach(t => this._graph.refs.set(t, e)))
                });
                const s = this._getBranches();
                return this._graph.commits.map(t => this._withBranches(s, t)).reduce((t, e) => e.branches ? (e.branches.forEach(e => t.add(e)), t) : t, new Set).forEach(t => this.branch(t)), this._onGraphUpdate(), this
            }
            _withBranches(t, e) {
                let r = Array.from((t.get(e.hash) || new Set).values());
                return 0 === r.length && (r = [l.DELETED_BRANCH_NAME]), e.setBranches(r)
            }
            _getBranches() {
                const t = new Map,
                    e = [];
                return this._graph.refs.getAllNames().filter(t => "HEAD" !== t).forEach(r => {
                    const s = this._graph.refs.getCommit(r);
                    for (s && e.push(s); e.length > 0;) {
                        const s = e.pop(),
                            i = this._graph.commits.find(({
                                hash: t
                            }) => t === s),
                            n = t.get(s) || new Set;
                        n.add(r), t.set(s, n), i && i.parents && i.parents.length > 0 && e.push(i.parents[0])
                    }
                }), t
            }
        }
    });
    r(y);
    y.GitgraphUserApi;
    var v = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        e.GitgraphCore = class {
            constructor(t = {}) {
                this.refs = new f.Refs, this.tags = new f.Refs, this.tagStyles = {}, this.tagRenders = {}, this.commits = [], this.branches = new Map, this.listeners = [], this.nextTimeoutId = null, this.template = a.getTemplate(t.template), this.currentBranch = this.createBranch("master"), this.orientation = t.orientation, this.reverseArrow = n.booleanOptionOr(t.reverseArrow, !1), this.initCommitOffsetX = n.numberOptionOr(t.initCommitOffsetX, 0), this.initCommitOffsetY = n.numberOptionOr(t.initCommitOffsetY, 0), this.mode = t.mode, this.author = t.author || "Sergio Flores <saxo-guy@epic.com>", this.commitMessage = t.commitMessage || "He doesn't like George Michael! Boooo!", this.generateCommitHash = "function" == typeof t.generateCommitHash ? t.generateCommitHash : () => void 0, this.branchesOrderFunction = "function" == typeof t.compareBranchesOrder ? t.compareBranchesOrder : void 0, this.branchLabelOnEveryCommit = n.booleanOptionOr(t.branchLabelOnEveryCommit, !1)
            }
            get isHorizontal() {
                return this.orientation === i.Orientation.Horizontal || this.orientation === i.Orientation.HorizontalReverse
            }
            get isVertical() {
                return !this.isHorizontal
            }
            get isReverse() {
                return this.orientation === i.Orientation.HorizontalReverse || this.orientation === i.Orientation.VerticalReverse
            }
            get shouldDisplayCommitMessage() {
                return !this.isHorizontal && this.mode !== m.Mode.Compact
            }
            getUserApi() {
                return new y.GitgraphUserApi(this, () => this.next())
            }
            subscribe(t) {
                this.listeners.push(t);
                let e = !0;
                return () => {
                    if (!e) return;
                    e = !1;
                    const r = this.listeners.indexOf(t);
                    this.listeners.splice(r, 1)
                }
            }
            getRenderedData() {
                const t = this.computeRenderedCommits(),
                    e = this.computeRenderedBranchesPaths(t),
                    r = this.computeCommitMessagesX(e);
                return this.computeBranchesColor(t, e), {
                    commits: t,
                    branchesPaths: e,
                    commitMessagesX: r
                }
            }
            createBranch(t) {
                let e = {
                    gitgraph: this,
                    name: "",
                    parentCommitHash: this.refs.getCommit("HEAD"),
                    style: this.template.branch,
                    onGraphUpdate: () => this.next()
                };
                if ("string" == typeof t) e.name = t, e.parentCommitHash = this.refs.getCommit("HEAD");
                else {
                    const r = t.from ? t.from.name : "HEAD",
                        s = this.refs.getCommit(r) || (this.refs.hasCommit(t.from) ? t.from : void 0);
                    t.style = t.style || {}, e = Object.assign({}, e, t, {
                        parentCommitHash: s,
                        style: Object.assign({}, e.style, t.style, {
                            label: Object.assign({}, e.style.label, t.style.label)
                        })
                    })
                }
                const r = new l.Branch(e);
                return this.branches.set(r.name, r), r
            }
            computeRenderedCommits() {
                const t = this.getBranches(),
                    e = (() => {
                        const e = new Set(this.commits.reduce((e, {
                                hash: r
                            }) => t.has(r) ? e : [...e, r], [])),
                            r = this.commits.reduce((t, e) => e.parents.length > 1 ? [...t, ...e.parents.slice(1).map(t => this.commits.find(({
                                hash: e
                            }) => t === e))] : t, []),
                            s = new Set;
                        return r.forEach(t => {
                            let r = t;
                            for (; r && e.has(r.hash);) s.add(r.hash), r = r.parents.length > 0 ? this.commits.find(({
                                hash: t
                            }) => r.parents[0] === t) : void 0
                        }), s
                    })(),
                    r = this.commits.filter(({
                        hash: r
                    }) => t.has(r) || e.has(r)),
                    s = r.map(e => this.withBranches(t, e)),
                    i = p.createGraphRows(this.mode, r),
                    n = new g.BranchesOrder(s, this.template.colors, this.branchesOrderFunction);
                return s.map(t => t.setRefs(this.refs)).map(t => this.withPosition(i, n, t)).map(t => t.withDefaultColor(this.getBranchDefaultColor(n, t.branchToDisplay))).map(t => t.setTags(this.tags, t => Object.assign({}, this.tagStyles[t], this.template.tag), t => this.tagRenders[t]))
            }
            computeRenderedBranchesPaths(t) {
                return new b.BranchesPathsCalculator(t, this.branches, this.template.commit.spacing, this.isVertical, this.isReverse, () => l.createDeletedBranch(this, this.template.branch, () => this.next())).execute()
            }
            computeBranchesColor(t, e) {
                const r = new g.BranchesOrder(t, this.template.colors, this.branchesOrderFunction);
                Array.from(e).forEach(([t]) => {
                    t.computedColor = t.style.color || this.getBranchDefaultColor(r, t.name)
                })
            }
            computeCommitMessagesX(t) {
                return Array.from(t).length * this.template.branch.spacing
            }
            withBranches(t, e) {
                let r = Array.from((t.get(e.hash) || new Set).values());
                return 0 === r.length && (r = [l.DELETED_BRANCH_NAME]), e.setBranches(r)
            }
            getBranches() {
                const t = new Map,
                    e = [];
                return this.refs.getAllNames().filter(t => "HEAD" !== t).forEach(r => {
                    const s = this.refs.getCommit(r);
                    for (s && e.push(s); e.length > 0;) {
                        const s = e.pop(),
                            i = this.commits.find(({
                                hash: t
                            }) => t === s),
                            n = t.get(s) || new Set;
                        n.add(r), t.set(s, n), i && i.parents && i.parents.length > 0 && e.push(i.parents[0])
                    }
                }), t
            }
            withPosition(t, e, r) {
                const s = t.getRowOf(r.hash),
                    n = t.getMaxRow(),
                    a = e.get(r.branchToDisplay);
                switch (this.orientation) {
                    default:
                        return r.setPosition({
                            x: this.initCommitOffsetX + this.template.branch.spacing * a,
                            y: this.initCommitOffsetY + this.template.commit.spacing * (n - s)
                        });
                    case i.Orientation.VerticalReverse:
                        return r.setPosition({
                            x: this.initCommitOffsetX + this.template.branch.spacing * a,
                            y: this.initCommitOffsetY + this.template.commit.spacing * s
                        });
                    case i.Orientation.Horizontal:
                        return r.setPosition({
                            x: this.initCommitOffsetX + this.template.commit.spacing * s,
                            y: this.initCommitOffsetY + this.template.branch.spacing * a
                        });
                    case i.Orientation.HorizontalReverse:
                        return r.setPosition({
                            x: this.initCommitOffsetX + this.template.commit.spacing * (n - s),
                            y: this.initCommitOffsetY + this.template.branch.spacing * a
                        })
                }
            }
            getBranchDefaultColor(t, e) {
                return t.getColorOf(e)
            }
            next() {
                this.nextTimeoutId && window.clearTimeout(this.nextTimeoutId), this.nextTimeoutId = window.setTimeout(() => {
                    this.listeners.forEach(t => t(this.getRenderedData()))
                }, 0)
            }
        }
    });
    r(v);
    v.GitgraphCore;
    var w = s(function(t, e) {
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.GitgraphCore = v.GitgraphCore, e.Mode = m.Mode, e.GitgraphUserApi = y.GitgraphUserApi, e.BranchUserApi = c.BranchUserApi, e.Branch = l.Branch, e.Commit = h.Commit, e.Tag = o.Tag, e.Refs = f.Refs, e.MergeStyle = a.MergeStyle, e.TemplateName = a.TemplateName, e.templateExtend = a.templateExtend, e.Orientation = i.Orientation, e.toSvgPath = b.toSvgPath, e.arrowSvgPath = n.arrowSvgPath
    });
    r(w);
    var C = w.GitgraphCore,
        O = w.Mode,
        _ = (w.GitgraphUserApi, w.BranchUserApi, w.Branch, w.Commit, w.Tag, w.Refs, w.MergeStyle),
        A = w.TemplateName,
        M = w.templateExtend,
        x = w.Orientation,
        E = w.toSvgPath,
        S = w.arrowSvgPath,
        B = "http://www.w3.org/2000/svg";

    function R(t) {
        var e = document.createElementNS(B, "g");
        return t.children.forEach(function(t) {
            return t && e.appendChild(t)
        }), t.translate && e.setAttribute("transform", "translate(" + t.translate.x + ", " + t.translate.y + ")"), t.fill && e.setAttribute("fill", t.fill), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth.toString()), t.onClick && e.addEventListener("click", t.onClick), t.onMouseOver && e.addEventListener("mouseover", t.onMouseOver), t.onMouseOut && e.addEventListener("mouseout", t.onMouseOut), e
    }

    function k(t) {
        var e = document.createElementNS(B, "text");
        return e.setAttribute("alignment-baseline", "central"), e.setAttribute("dominant-baseline", "central"), e.textContent = t.content, t.fill && e.setAttribute("fill", t.fill), t.font && e.setAttribute("style", "font: " + t.font), t.anchor && e.setAttribute("text-anchor", t.anchor), t.translate && (e.setAttribute("x", t.translate.x.toString()), e.setAttribute("y", t.translate.y.toString())), t.onClick && e.addEventListener("click", t.onClick), e
    }

    function j(t) {
        var e = document.createElementNS(B, "path");
        return e.setAttribute("d", t.d), t.fill && e.setAttribute("fill", t.fill), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth.toString()), t.translate && e.setAttribute("transform", "translate(" + t.translate.x + ", " + t.translate.y + ")"), e
    }

    function P(t) {
        var e = document.createElementNS(B, "use");
        return e.setAttribute("href", "#" + t), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#" + t), e
    }
    var T = 10,
        D = 5;

    function N(t, e) {
        var r = function(t) {
                var e = document.createElementNS(B, "rect");
                return e.setAttribute("width", t.width.toString()), e.setAttribute("height", t.height.toString()), t.borderRadius && e.setAttribute("rx", t.borderRadius.toString()), t.fill && e.setAttribute("fill", t.fill || "none"), t.stroke && e.setAttribute("stroke", t.stroke), e
            }({
                width: 0,
                height: 0,
                borderRadius: t.style.label.borderRadius,
                stroke: t.style.label.strokeColor || e.style.color,
                fill: t.style.label.bgColor
            }),
            s = k({
                content: t.name,
                translate: {
                    x: T,
                    y: 0
                },
                font: t.style.label.font,
                fill: t.style.label.color || e.style.color
            }),
            i = R({
                children: [r]
            });
        return new MutationObserver(function() {
            var t = s.getBBox(),
                e = t.height,
                i = t.width + 2 * T,
                n = e + 2 * D;
            r.setAttribute("width", i.toString()), r.setAttribute("height", n.toString()), s.setAttribute("y", (n / 2).toString())
        }).observe(i, {
            attributes: !1,
            subtree: !1,
            childList: !0
        }), i.appendChild(s), i
    }
    var H = 10,
        U = 5;
    var G = 10,
        z = 10;

    function $(t) {
        var e = 0;
        if (t) {
            var r = t.getBoundingClientRect().height,
                s = window.getComputedStyle(t).marginTop || "0px";
            e = r + parseInt(s.replace("px", ""), 10)
        }
        return e
    }
    t.MergeStyle = _, t.Mode = O, t.Orientation = x, t.TemplateName = A, t.createGitgraph = function(t, e) {
        var r, s, i = {},
            n = {},
            a = !1,
            o = 0,
            h = null,
            c = function(t) {
                var e = document.createElementNS(B, "svg");
                return t ? (t.children && t.children.forEach(function(t) {
                    return e.appendChild(t)
                }), t.viewBox && e.setAttribute("viewBox", t.viewBox), t.height && e.setAttribute("height", t.height.toString()), t.width && e.setAttribute("width", t.width.toString()), e) : e
            }();
        l = Boolean(e && e.responsive), new MutationObserver(function() {
            var t, e, h;
            a ? (a = !1, t = Array.from(s.children), e = 0, h = m.orientation === x.VerticalReverse ? t : t.reverse(), n = h.reduce(function(t, r) {
                var s = parseInt(r.getAttribute("transform").split(",")[1].slice(0, -1), 10),
                    i = r.getElementsByTagName("foreignObject")[0],
                    n = i && i.firstElementChild;
                return t[s] = s + e, e += $(n), t
            }, {}), u(r)) : (m.isHorizontal || Object.keys(i).forEach(function(t) {
                var e = i[t],
                    r = e.branchLabel,
                    s = e.tags,
                    n = e.message,
                    a = o;
                if (r) {
                    d(r, a);
                    var h = r.getBBox().width + 2 * T;
                    a += h + 10
                }
                s.forEach(function(t) {
                    d(t, a);
                    var e = parseFloat(t.getAttribute("data-offset") || "0"),
                        r = t.getBBox().width + 2 * H + e;
                    a += r + 10
                }), n && d(n, a)
            }), function(t) {
                var e = c.getBBox(),
                    r = e.height,
                    s = e.width,
                    i = m.isHorizontal ? 50 : T + G,
                    n = m.isHorizontal ? 50 : D + G + 20;
                t ? (c.setAttribute("preserveAspectRatio", "xMinYMin meet"), c.setAttribute("viewBox", "0 0 " + (s + i) + " " + (r + n))) : (c.setAttribute("width", (s + i).toString()), c.setAttribute("height", (r + n).toString()))
            }(l))
        }).observe(c, {
            attributes: !1,
            subtree: !0,
            childList: !0
        }), t.appendChild(c), e && e.responsive && t.setAttribute("style", "display:inline-block; position: relative; width:100%; padding-bottom:100%; vertical-align:middle; overflow:hidden;");
        var l;
        var m = new C(e);
        return m.subscribe(function(t) {
            a = !0, u(t)
        }), m.getUserApi();

        function u(t) {
            i = {};
            var e = t.commits,
                n = t.branchesPaths;
            o = t.commitMessagesX, r = t, s = function(t) {
                return R({
                    children: t.map(function(e) {
                        var r = g(e),
                            s = r.x,
                            n = r.y;
                        return R({
                            translate: {
                                x: s,
                                y: n
                            },
                            children: [function(t) {
                                if (t.renderDot) return t.renderDot(t);
                                var e = t.hash,
                                    r = function(t) {
                                        var e = document.createElementNS(B, "circle");
                                        return e.setAttribute("cx", t.radius.toString()), e.setAttribute("cy", t.radius.toString()), e.setAttribute("r", t.radius.toString()), t.id && e.setAttribute("id", t.id), t.fill && e.setAttribute("fill", t.fill), e
                                    }({
                                        id: e,
                                        radius: t.style.dot.size,
                                        fill: t.style.dot.color || ""
                                    }),
                                    s = "clip-" + t.hash,
                                    i = document.createElementNS(B, "clipPath");
                                i.setAttribute("id", s), i.appendChild(P(e));
                                var n = P(e);
                                n.setAttribute("clip-path", "url(#" + s + ")"), n.setAttribute("stroke", t.style.dot.strokeColor || "");
                                var a = t.style.dot.strokeWidth ? 2 * t.style.dot.strokeWidth : 0;
                                n.setAttribute("stroke-width", a.toString());
                                var o, l, u = t.dotText ? k({
                                    content: t.dotText,
                                    font: t.style.dot.font,
                                    anchor: "middle",
                                    translate: {
                                        x: t.style.dot.size,
                                        y: t.style.dot.size
                                    }
                                }) : null;
                                return R({
                                    onClick: t.onClick,
                                    onMouseOver: function() {
                                        ! function(t) {
                                            if (c.firstChild && m.mode === O.Compact && t.style.hasTooltipInCompactMode) {
                                                var e = t.renderTooltip ? t.renderTooltip(t) : function(t) {
                                                    var e = j({
                                                            d: "",
                                                            fill: "#EEE"
                                                        }),
                                                        r = k({
                                                            translate: {
                                                                x: z + G,
                                                                y: 0
                                                            },
                                                            content: t.hashAbbrev + " - " + t.subject,
                                                            fill: "#333"
                                                        }),
                                                        s = 2 * t.style.dot.size,
                                                        i = R({
                                                            translate: {
                                                                x: s,
                                                                y: s / 2
                                                            },
                                                            children: [e]
                                                        });
                                                    return new MutationObserver(function() {
                                                        var t = r.getBBox().width,
                                                            s = z + t + 2 * G,
                                                            i = ["M 0,0", "L " + z + "," + z, "V 20", "Q " + z + ",25 " + (z + 5) + ",25", "H " + (s - 5), "Q " + s + ",25 " + s + ",20", "V -20", "Q " + s + ",-25 " + (s - 5) + ",-25", "H " + (z + 5), "Q " + z + ",-25 " + z + ",-20", "V -" + z, "z"].join(" ");
                                                        e.setAttribute("d", i.toString())
                                                    }).observe(i, {
                                                        attributes: !1,
                                                        subtree: !1,
                                                        childList: !0
                                                    }), i.appendChild(r), i
                                                }(t);
                                                h = R({
                                                    translate: g(t),
                                                    children: [e]
                                                }), c.firstChild.appendChild(h)
                                            }
                                        }(t), t.onMouseOver()
                                    },
                                    onMouseOut: function() {
                                        h && h.remove(), t.onMouseOut()
                                    },
                                    children: [(o = [r, i], l = document.createElementNS(B, "defs"), o.forEach(function(t) {
                                        return l.appendChild(t)
                                    }), l), n, u]
                                })
                            }(e)].concat(function(e) {
                                if (!m.template.arrow.size) return [null];
                                var r = e.style.dot.size;
                                return e.parents.map(function(s) {
                                    var i = t.find(function(t) {
                                        var e = t.hash;
                                        return e === s
                                    });
                                    if (!i) return null;
                                    var n = m.reverseArrow ? {
                                            x: r + (i.x - e.x),
                                            y: r + (i.y - e.y)
                                        } : {
                                            x: r,
                                            y: r
                                        },
                                        a = j({
                                            d: S(m, i, e),
                                            fill: m.template.arrow.color || ""
                                        });
                                    return R({
                                        translate: n,
                                        children: [a]
                                    })
                                })
                            }(e), [R({
                                translate: {
                                    x: -s,
                                    y: 0
                                },
                                children: [function(t) {
                                    if (!t.style.message.display) return null;
                                    var e;
                                    if (t.renderMessage) return p(e = R({
                                        children: []
                                    })), e.appendChild(t.renderMessage(t)), f(t, e), e;
                                    var r = k({
                                        content: t.message,
                                        fill: t.style.message.color || "",
                                        font: t.style.message.font,
                                        onClick: t.onMessageClick
                                    });
                                    if (e = R({
                                            translate: {
                                                x: 0,
                                                y: t.style.dot.size
                                            },
                                            children: [r]
                                        }), t.body) {
                                        var s = function(t) {
                                            var e = document.createElementNS(B, "foreignObject");
                                            e.setAttribute("width", t.width.toString()), t.translate && (e.setAttribute("x", t.translate.x.toString()), e.setAttribute("y", t.translate.y.toString()));
                                            var r = document.createElement("p");
                                            return r.textContent = t.content, e.appendChild(r), e
                                        }({
                                            width: 600,
                                            translate: {
                                                x: 10,
                                                y: 0
                                            },
                                            content: t.body
                                        });
                                        p(e), e.appendChild(s)
                                    }
                                    return f(t, e), e
                                }(e)].concat(function(t) {
                                    return Array.from(m.branches.values()).map(function(e) {
                                        if (!e.style.label.display) return null;
                                        if (!m.branchLabelOnEveryCommit) {
                                            var r = m.refs.getCommit(e.name);
                                            if (t.hash !== r) return null
                                        }
                                        if (t.branchToDisplay !== e.name) return null;
                                        var s, n = e.renderLabel ? e.renderLabel(e) : N(e, t);
                                        if (m.isVertical) s = R({
                                            children: [n]
                                        });
                                        else {
                                            var a = 2 * t.style.dot.size;
                                            s = R({
                                                translate: {
                                                    x: t.x,
                                                    y: a + 10
                                                },
                                                children: [n]
                                            })
                                        }
                                        return function(t, e) {
                                            i[t.hashAbbrev] || b(t), i[t.hashAbbrev].branchLabel = e
                                        }(t, s), s
                                    })
                                }(e), function(t) {
                                    return t.tags ? m.isHorizontal ? [] : t.tags.map(function(e) {
                                        var r = e.render ? e.render(e.name, e.style) : function(t) {
                                                var e = j({
                                                        d: "",
                                                        fill: t.style.bgColor,
                                                        stroke: t.style.strokeColor
                                                    }),
                                                    r = k({
                                                        content: t.name,
                                                        fill: t.style.color,
                                                        font: t.style.font,
                                                        translate: {
                                                            x: 0,
                                                            y: 0
                                                        }
                                                    }),
                                                    s = R({
                                                        children: [e]
                                                    }),
                                                    i = t.style.pointerWidth;
                                                return new MutationObserver(function() {
                                                    var s = r.getBBox(),
                                                        n = s.height,
                                                        a = s.width;
                                                    if (0 !== n && 0 !== a) {
                                                        var o = t.style.borderRadius,
                                                            h = i + a + 2 * H,
                                                            c = n + 2 * U,
                                                            l = ["M 0,0", "L " + i + "," + c / 2, "V " + c / 2, "Q " + i + "," + c / 2 + " " + (i + o) + "," + c / 2, "H " + (h - o), "Q " + h + "," + c / 2 + " " + h + "," + (c / 2 - o), "V -" + (c / 2 - o), "Q " + h + ",-" + c / 2 + " " + (h - o) + ",-" + c / 2, "H " + (i + o), "Q " + i + ",-" + c / 2 + " " + i + ",-" + c / 2, "V -" + c / 2, "z"].join(" ");
                                                        e.setAttribute("d", l.toString()), r.setAttribute("x", (i + H).toString())
                                                    }
                                                }).observe(s, {
                                                    attributes: !1,
                                                    subtree: !1,
                                                    childList: !0
                                                }), s.appendChild(r), s
                                            }(e),
                                            s = R({
                                                translate: {
                                                    x: 0,
                                                    y: t.style.dot.size
                                                },
                                                children: [r]
                                            });
                                        return s.setAttribute("data-offset", e.style.pointerWidth.toString()),
                                            function(t, e) {
                                                i[t.hashAbbrev] || b(t), i[t.hashAbbrev].tags.push(e)
                                            }(t, s), s
                                    }) : []
                                }(e))
                            })])
                        })
                    })
                })
            }(e), c.innerHTML = "", c.appendChild(R({
                translate: {
                    x: T,
                    y: G
                },
                children: [function(t) {
                    var e = m.template.commit.dot.size,
                        r = m.template.branch.mergeStyle === _.Bezier;
                    return R({
                        children: Array.from(t).map(function(t) {
                            var s = t[0],
                                i = t[1];
                            return j({
                                d: E(i.map(function(t) {
                                    return t.map(g)
                                }), r, m.isVertical),
                                fill: "none",
                                stroke: s.computedColor || "",
                                strokeWidth: s.style.lineWidth,
                                translate: {
                                    x: e,
                                    y: e
                                }
                            })
                        })
                    })
                }(n), s]
            }))
        }

        function d(t, e) {
            var r = t.getAttribute("transform") || "translate(0, 0)";
            t.setAttribute("transform", r.replace(/translate\(([\d\.]+),/, "translate(" + e + ","))
        }

        function p(t) {
            function e(t) {
                if ("foreignObject" === t.nodeName) {
                    var r = t.firstChild && t.firstChild.parentElement;
                    if (!r) return;
                    r.setAttribute("height", $(r.firstElementChild).toString())
                }
                t.childNodes.forEach(e)
            }
            new MutationObserver(function(t) {
                t.forEach(function(t) {
                    return e(t.target)
                })
            }).observe(t, {
                attributes: !1,
                subtree: !1,
                childList: !0
            })
        }

        function g(t) {
            var e = t.x,
                r = t.y;
            return {
                x: e,
                y: n[r] || r
            }
        }

        function f(t, e) {
            i[t.hashAbbrev] || b(t), i[t.hashAbbrev].message = e
        }

        function b(t) {
            i[t.hashAbbrev] = {
                branchLabel: null,
                tags: [],
                message: null
            }
        }
    }, t.templateExtend = M, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});