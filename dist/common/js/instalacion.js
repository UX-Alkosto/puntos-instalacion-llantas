/*! puntos-instalacion-llantas - release: 1.0.10 */
var e, t, n, s;
const i = globalThis.trustedTypes,
    l = i ? i.createPolicy("lit-html", {
        createHTML: e => e
    }) : void 0,
    o = `lit$${(Math.random()+"").slice(9)}$`,
    a = "?" + o,
    r = `<${a}>`,
    c = document,
    d = (e = "") => c.createComment(e),
    u = e => null === e || "object" != typeof e && "function" != typeof e,
    h = Array.isArray,
    m = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    p = /-->/g,
    v = />/g,
    f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
    E = /'/g,
    g = /"/g,
    y = /^(?:script|style|textarea)$/i,
    b = (e => (t, ...n) => ({
        _$litType$: e,
        strings: t,
        values: n
    }))(1),
    w = Symbol.for("lit-noChange"),
    x = Symbol.for("lit-nothing"),
    L = new WeakMap,
    $ = (e, t, n) => {
        var s, i;
        const l = null !== (s = null == n ? void 0 : n.renderBefore) && void 0 !== s ? s : t;
        let o = l._$litPart$;
        if (void 0 === o) {
            const e = null !== (i = null == n ? void 0 : n.renderBefore) && void 0 !== i ? i : null;
            l._$litPart$ = o = new T(t.insertBefore(d(), e), e, void 0, n)
        }
        return o.I(e), o
    },
    _ = c.createTreeWalker(c, 129, null, !1),
    H = (e, t) => {
        const n = e.length - 1,
            s = [];
        let i, a = 2 === t ? "<svg>" : "",
            c = m;
        for (let t = 0; t < n; t++) {
            const n = e[t];
            let l, d, u = -1,
                h = 0;
            for (; h < n.length && (c.lastIndex = h, d = c.exec(n), null !== d);) h = c.lastIndex, c === m ? "!--" === d[1] ? c = p : void 0 !== d[1] ? c = v : void 0 !== d[2] ? (y.test(d[2]) && (i = RegExp("</" + d[2], "g")), c = f) : void 0 !== d[3] && (c = f) : c === f ? ">" === d[0] ? (c = null != i ? i : m, u = -1) : void 0 === d[1] ? u = -2 : (u = c.lastIndex - d[2].length, l = d[1], c = void 0 === d[3] ? f : '"' === d[3] ? g : E) : c === g || c === E ? c = f : c === p || c === v ? c = m : (c = f, i = void 0);
            const b = c === f && e[t + 1].startsWith("/>") ? " " : "";
            a += c === m ? n + r : u >= 0 ? (s.push(l), n.slice(0, u) + "$lit$" + n.slice(u) + o + b) : n + o + (-2 === u ? (s.push(void 0), t) : b)
        }
        const d = a + (e[n] || "<?>") + (2 === t ? "</svg>" : "");
        return [void 0 !== l ? l.createHTML(d) : d, s]
    };
class S {
    constructor({
        strings: e,
        _$litType$: t
    }, n) {
        let s;
        this.parts = [];
        let l = 0,
            r = 0;
        const c = e.length - 1,
            u = this.parts,
            [h, m] = H(e, t);
        if (this.el = S.createElement(h, n), _.currentNode = this.el.content, 2 === t) {
            const e = this.el.content,
                t = e.firstChild;
            t.remove(), e.append(...t.childNodes)
        }
        for (; null !== (s = _.nextNode()) && u.length < c;) {
            if (1 === s.nodeType) {
                if (s.hasAttributes()) {
                    const e = [];
                    for (const t of s.getAttributeNames())
                        if (t.endsWith("$lit$") || t.startsWith(o)) {
                            const n = m[r++];
                            if (e.push(t), void 0 !== n) {
                                const e = s.getAttribute(n.toLowerCase() + "$lit$").split(o),
                                    t = /([.?@])?(.*)/.exec(n);
                                u.push({
                                    type: 1,
                                    index: l,
                                    name: t[2],
                                    strings: e,
                                    ctor: "." === t[1] ? N : "?" === t[1] ? I : "@" === t[1] ? j : k
                                })
                            } else u.push({
                                type: 6,
                                index: l
                            })
                        } for (const t of e) s.removeAttribute(t)
                }
                if (y.test(s.tagName)) {
                    const e = s.textContent.split(o),
                        t = e.length - 1;
                    if (t > 0) {
                        s.textContent = i ? i.emptyScript : "";
                        for (let n = 0; n < t; n++) s.append(e[n], d()), _.nextNode(), u.push({
                            type: 2,
                            index: ++l
                        });
                        s.append(e[t], d())
                    }
                }
            } else if (8 === s.nodeType)
                if (s.data === a) u.push({
                    type: 2,
                    index: l
                });
                else {
                    let e = -1;
                    for (; - 1 !== (e = s.data.indexOf(o, e + 1));) u.push({
                        type: 7,
                        index: l
                    }), e += o.length - 1
                } l++
        }
    }
    static createElement(e, t) {
        const n = c.createElement("template");
        return n.innerHTML = e, n
    }
}

function C(e, t, n = e, s) {
    var i, l, o, a;
    if (t === w) return t;
    let r = void 0 !== s ? null === (i = n.Σi) || void 0 === i ? void 0 : i[s] : n.Σo;
    const c = u(t) ? void 0 : t._$litDirective$;
    return (null == r ? void 0 : r.constructor) !== c && (null === (l = null == r ? void 0 : r.O) || void 0 === l || l.call(r, !1), void 0 === c ? r = void 0 : (r = new c(e), r.T(e, n, s)), void 0 !== s ? (null !== (o = (a = n).Σi) && void 0 !== o ? o : a.Σi = [])[s] = r : n.Σo = r), void 0 !== r && (t = C(e, r.S(e, t.values), r, s)), t
}
class A {
    constructor(e, t) {
        this.l = [], this.N = void 0, this.D = e, this.M = t
    }
    u(e) {
        var t;
        const {
            el: {
                content: n
            },
            parts: s
        } = this.D, i = (null !== (t = null == e ? void 0 : e.creationScope) && void 0 !== t ? t : c).importNode(n, !0);
        _.currentNode = i;
        let l = _.nextNode(),
            o = 0,
            a = 0,
            r = s[0];
        for (; void 0 !== r;) {
            if (o === r.index) {
                let t;
                2 === r.type ? t = new T(l, l.nextSibling, this, e) : 1 === r.type ? t = new r.ctor(l, r.name, r.strings, this, e) : 6 === r.type && (t = new B(l, this, e)), this.l.push(t), r = s[++a]
            }
            o !== (null == r ? void 0 : r.index) && (l = _.nextNode(), o++)
        }
        return i
    }
    v(e) {
        let t = 0;
        for (const n of this.l) void 0 !== n && (void 0 !== n.strings ? (n.I(e, n, t), t += n.strings.length - 2) : n.I(e[t])), t++
    }
}
class T {
    constructor(e, t, n, s) {
        this.type = 2, this.N = void 0, this.A = e, this.B = t, this.M = n, this.options = s
    }
    setConnected(e) {
        var t;
        null === (t = this.P) || void 0 === t || t.call(this, e)
    }
    get parentNode() {
        return this.A.parentNode
    }
    get startNode() {
        return this.A
    }
    get endNode() {
        return this.B
    }
    I(e, t = this) {
        e = C(this, e, t), u(e) ? e === x || null == e || "" === e ? (this.H !== x && this.R(), this.H = x) : e !== this.H && e !== w && this.m(e) : void 0 !== e._$litType$ ? this._(e) : void 0 !== e.nodeType ? this.$(e) : (e => {
            var t;
            return h(e) || "function" == typeof (null === (t = e) || void 0 === t ? void 0 : t[Symbol.iterator])
        })(e) ? this.g(e) : this.m(e)
    }
    k(e, t = this.B) {
        return this.A.parentNode.insertBefore(e, t)
    }
    $(e) {
        this.H !== e && (this.R(), this.H = this.k(e))
    }
    m(e) {
        const t = this.A.nextSibling;
        null !== t && 3 === t.nodeType && (null === this.B ? null === t.nextSibling : t === this.B.previousSibling) ? t.data = e : this.$(c.createTextNode(e)), this.H = e
    }
    _(e) {
        var t;
        const {
            values: n,
            _$litType$: s
        } = e, i = "number" == typeof s ? this.C(e) : (void 0 === s.el && (s.el = S.createElement(s.h, this.options)), s);
        if ((null === (t = this.H) || void 0 === t ? void 0 : t.D) === i) this.H.v(n);
        else {
            const e = new A(i, this),
                t = e.u(this.options);
            e.v(n), this.$(t), this.H = e
        }
    }
    C(e) {
        let t = L.get(e.strings);
        return void 0 === t && L.set(e.strings, t = new S(e)), t
    }
    g(e) {
        h(this.H) || (this.H = [], this.R());
        const t = this.H;
        let n, s = 0;
        for (const i of e) s === t.length ? t.push(n = new T(this.k(d()), this.k(d()), this, this.options)) : n = t[s], n.I(i), s++;
        s < t.length && (this.R(n && n.B.nextSibling, s), t.length = s)
    }
    R(e = this.A.nextSibling, t) {
        var n;
        for (null === (n = this.P) || void 0 === n || n.call(this, !1, !0, t); e && e !== this.B;) {
            const t = e.nextSibling;
            e.remove(), e = t
        }
    }
}
class k {
    constructor(e, t, n, s, i) {
        this.type = 1, this.H = x, this.N = void 0, this.V = void 0, this.element = e, this.name = t, this.M = s, this.options = i, n.length > 2 || "" !== n[0] || "" !== n[1] ? (this.H = Array(n.length - 1).fill(x), this.strings = n) : this.H = x
    }
    get tagName() {
        return this.element.tagName
    }
    I(e, t = this, n, s) {
        const i = this.strings;
        let l = !1;
        if (void 0 === i) e = C(this, e, t, 0), l = !u(e) || e !== this.H && e !== w, l && (this.H = e);
        else {
            const s = e;
            let o, a;
            for (e = i[0], o = 0; o < i.length - 1; o++) a = C(this, s[n + o], t, o), a === w && (a = this.H[o]), l || (l = !u(a) || a !== this.H[o]), a === x ? e = x : e !== x && (e += (null != a ? a : "") + i[o + 1]), this.H[o] = a
        }
        l && !s && this.W(e)
    }
    W(e) {
        e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != e ? e : "")
    }
}
class N extends k {
    constructor() {
        super(...arguments), this.type = 3
    }
    W(e) {
        this.element[this.name] = e === x ? void 0 : e
    }
}
class I extends k {
    constructor() {
        super(...arguments), this.type = 4
    }
    W(e) {
        e && e !== x ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name)
    }
}
class j extends k {
    constructor() {
        super(...arguments), this.type = 5
    }
    I(e, t = this) {
        var n;
        if ((e = null !== (n = C(this, e, t, 0)) && void 0 !== n ? n : x) === w) return;
        const s = this.H,
            i = e === x && s !== x || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive,
            l = e !== x && (s === x || i);
        i && this.element.removeEventListener(this.name, this, s), l && this.element.addEventListener(this.name, this, e), this.H = e
    }
    handleEvent(e) {
        var t, n;
        "function" == typeof this.H ? this.H.call(null !== (n = null === (t = this.options) || void 0 === t ? void 0 : t.host) && void 0 !== n ? n : this.element, e) : this.H.handleEvent(e)
    }
}
class B {
    constructor(e, t, n) {
        this.element = e, this.type = 6, this.N = void 0, this.V = void 0, this.M = t, this.options = n
    }
    I(e) {
        C(this, e)
    }
}
null === (t = (e = globalThis).litHtmlPlatformSupport) || void 0 === t || t.call(e, S, T), (null !== (n = (s = globalThis).litHtmlVersions) && void 0 !== n ? n : s.litHtmlVersions = []).push("2.0.0-rc.3");
class q {
    constructor(e) {

        this.element = e, this.label = e.labels[0], this.options = W(e.querySelectorAll("option")), this.customElement = document.createElement("div"), this.arrowElement = document.createElement("span"), this.labelElement = document.createElement("span"), this.valueElement = document.createElement("span"), this.optionsCustomElement = document.createElement("ul"),

            function (e) {
                HTMLSelectElement.prototype.refresh = function () {
                    this.dispatchEvent(new Event("refresh"))
                }, e.element.disabled && e.customElement.classList.add("disabled");
                e.customElement.classList.add("custom-select__container"), e.customElement.tabIndex = 0, e.customElement.setAttribute("aria-labelledby", `${e.element.id}-label`), e.labelElement.classList.add("custom-select__label"), e.labelElement.id = `${e.element.id}-label`, e.labelElement.innerText = e.label.textContent, e.customElement.append(e.labelElement);
                const t = document.createElement("span");
                t.classList.add("alk-icon-abajo"), e.arrowElement.append(t), e.arrowElement.classList.add("custom-select__arrow"), e.customElement.append(e.arrowElement), e.valueElement.classList.add("custom-select__value"), e.valueElement.innerText = e.selectedOption.label, e.customElement.append(e.valueElement), e.optionsCustomElement.classList.add("custom-select__options"), O(e), e.customElement.append(e.optionsCustomElement),
                    e.element.addEventListener("refresh", (() => {
                        e.element.disabled ? e.customElement.classList.add("disabled") : e.customElement.classList.remove("disabled"), e.options = W(e.element.querySelectorAll("option")), e.valueElement.innerText = e.selectedOption.label, e.valueElement.dataset.status = "", O(e)
                    })),
                    e.arrowElement.addEventListener("click", (() => M(e))), e.valueElement.addEventListener("click", (() => M(e))), e.customElement.addEventListener("blur", (() => {
                        e.arrowElement.querySelector("span").classList.replace("alk-icon-arriba", "alk-icon-abajo"), e.optionsCustomElement.classList.remove("show")
                    }))
            }(this), this.element.style.display = "none", this.element.setAttribute("aria-hidden", !0), this.label.style.display = "none", e.after(this.customElement)
    }

    get selectedOption() {
        return this.options.find((e => e.selected))
    }
    selectValue(e) {

        const t = this.options.find((t => t.value === e)),
            n = this.selectedOption;
        /*         console.log(t.value);
                console.log(e);
                console.log(n.selected); */
        n.selected = !1, n.element.selected = !1, t.selected = !0, t.element.selected = !0, this.element.dispatchEvent(new Event("change")), this.valueElement.innerText = t.label, this.valueElement.dataset.status = "filled"
    }
}



function M(e) {
    if (e.customElement.classList.contains("disabled")) return;
    const t = e.arrowElement.querySelector("span");
    t.classList.contains("alk-icon-abajo") ? t.classList.replace("alk-icon-abajo", "alk-icon-arriba") : t.classList.replace("alk-icon-arriba", "alk-icon-abajo"), e.optionsCustomElement.classList.toggle("show")
}

function O(e) {
    e.optionsCustomElement.innerHtml = "", e.optionsCustomElement.querySelectorAll("*").forEach((e => e.remove())), e.options.forEach((t => {
        const n = document.createElement("li");
        n.classList.add("custom-select__option"), n.classList.toggle("selected", t.selected), n.setAttribute("role", "option"), t.selected && n.setAttribute("aria-selected", !0), n.innerText = t.label, n.dataset.value = t.value, "0" === t.value && (n.style.display = "none"), n.addEventListener("click", (() => {
            if ("0" === n.dataset.value) return;
            let s = e.optionsCustomElement.querySelector(`[data-value="${e.selectedOption.value}"]`);
            s.removeAttribute("aria-selected"), s.classList.remove("selected"), e.selectValue(t.value), n.classList.add("selected"), n.setAttribute("aria-selected", !0), e.optionsCustomElement.classList.remove("show"), e.customElement.blur()
        })), e.optionsCustomElement.append(n)
    }))
}

function W(e) {
    return [...e].map((e => ({
        value: e.value,
        label: e.label,
        selected: e.selected,
        element: e
    })))
}
const P = document.getElementById("marca"),
    V = document.getElementById("departamento"),
    R = new Option("Selecciona una opción", 0, !0, !0),
    z = document.querySelector(".puntos-instalacion__menu"),
    D = Number(getComputedStyle(document.documentElement).getPropertyValue("--puntos-instalacion-breakpoint").replace("px", ""));

let F = R,
    Z = !0,
    G = null,
    J = !1,
    K = [];

document.addEventListener("updateCenter", (e => {
    const t = e.detail.center;
    if (null !== t) {
        const e = document.getElementById(t);
        e.click(), setTimeout((() => z.scrollTop = e.offsetTop), 250)
    }
})), document.addEventListener("click", (e => {
    e.target.classList.contains("puntos-instalacion__map__info-window__close") && G.infoWindow.close()
})), window.onresize = () => {
    document.querySelector(".puntos-instalacion__map").style.display = "none", window.innerWidth > D && "0" != document.getElementById("departamento").value && (document.querySelector(".puntos-instalacion__map").style.display = "block")
}, null !== V && (F = new Option(`Selecciona un ${V.labels[0].textContent.toLowerCase()}`, 0, !0, !0), V.append(F), null !== P && (V.disabled = !0)), document.querySelectorAll("[data-custom-select]").forEach((e => new q(e))), void 0 !== appConfig.jsonFile && async function (e = "") {
    console.log(e);
    if (e.length) return await fetch(e, {
        cache: "force-cache",
        mode: "cors"
    }).then((e => {
        if (e.ok) return e.json()
    })).then((e => e))
}(appConfig.jsonFile).then((async ({
    departments: e,
    puntosInstalacion: t
}) => {
    void 0 !== e && null !== V && (Object.entries(e).map((e => {
        const t = e[1],
            n = e[0],
            s = new Option(t.name, n, "todos" == n, "todos" == n);
        return V.append(s)
    })), V.refresh(), V.addEventListener("change", (async () => {
        J || await async function (e = {
            lat: 4.67998417919688,
            lng: -74.08550441957686
        }) {
            const t = await import("./map-036af9ef.js").then((e => e.Map));
            return G = new t({
                $element: "#puntos-instalacion-map",
                baseSite: appConfig.site,
                center: e
            })
        }(), J = !0, Z = !0, G.infoWindow.close(), window.innerWidth > D && (document.querySelector(".puntos-instalacion__map").style.display = "block"), document.querySelector(".msje-localiza").innerText = "Localiza los puntos de instalación de llantas:", Object.entries(e[V.value].cities).map((e => {
            const t = e[0];
            return e[1].puntos.map((e => {
                const n = {
                    city: t,
                    code: e
                };
                return K.push(n)
            }))

        })), await async function ({
            servicePointsCodes: e,
            PuntosInstalacion: t
        }) {
            if (!e.length) return [];
            const n = await import("./punto-c2afeb04.js").then((e => e.PuntoInstalacion)),
                s = {};
                
            return e.map((({
                city: e,
                code: t
            }) => s[t] = {
                code: t,
                city: e
            })), Object.values(s).map((({
                city: e,
                code: s
            }) => {
                let i = {
                    city: e,
                    coordinates: {
                        lat: t[s].lat,
                        lng: t[s].lng
                    },
                    id: s
                };
                return i = {
                    ...i,
                    ...t[s]
                }, new n(i)
            }))
        }({
            servicePointsCodes: K,
            PuntosInstalacion: t
        }).then((e => async function (e) {
            if (!e.length) return $([], z);
            const t = await import("./menu-72f0c630.js").then((e => e.Menu)),
                n = [];
            e.map((e => {
               /*  e.active = Z, */ Z = !1, e.isCallCenter && (e.coordinates = {
                    lat: 4.67998417919688,
                    lng: -74.08550441957686
                }), n.push(new t(e, G).render())
            })), J && G.setMarkers(e);
            $(n, z)/* , document.querySelector("input[name=centro-servicio]").click() */
        }(e))), K = []
    })), V.dispatchEvent(new Event("change")))
}));
export {
    x as A, b as T, w
};