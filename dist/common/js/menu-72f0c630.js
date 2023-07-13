/*! puntos-instalacion-llantas - release: 1.0.10 */
import{A as e,w as t,T as s}from"./instalacion.js";const i=2;class r extends class{constructor(e){}T(e,t,s){this.Σdt=e,this.M=t,this.Σct=s}S(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(t){if(super(t),this.vt=e,t.type!==i)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(s){if(s===e)return this.Vt=void 0,this.vt=s;if(s===t)return s;if("string"!=typeof s)throw Error(this.constructor.directiveName+"() called with a non-string value");if(s===this.vt)return this.Vt;this.vt=s;const i=[s];return i.raw=i,this.Vt={_$litType$:this.constructor.resultType,strings:i,values:[]}}}r.directiveName="unsafeHTML",r.resultType=1;const a=(e=>(...t)=>({_$litDirective$:e,values:t}))(r),n={handleEvent(e){document.querySelectorAll(".puntos-instalacion__menu__item > input").forEach((t=>{const s=t.nextElementSibling.querySelector("span");e.target===t?s?.classList.replace("alk-icon-abajo","alk-icon-arriba"):s?.classList.replace("alk-icon-arriba","alk-icon-abajo")}))},capture:!0},c={handleEvent(e){let t=e.target;if("A"!=t.tagName)return t.classList.contains("puntos-instalacion__menu__item__body")||(t=t.closest(".puntos-instalacion__menu__item__body")),d?.clickMarker(t.dataset?.serviceCenter)},capture:!1},l={handleEvent(e){const t=e.target.nextElementSibling.nextElementSibling;"true"==t.dataset.callCenter&&(t.click(),d?.map?.setZoom(5))},capture:!1},o={handleEvent(e){d?.bounceMarker(e.target.dataset.serviceCenter,"start")},capture:!1},h={handleEvent(e){d?.bounceMarker(e.target.dataset.serviceCenter,"stop")},capture:!1};let d=null;class u{constructor(e,t){this.serviceCenter=e,d=t}render(){return s`<div class="puntos-instalacion__menu__item"><input type="radio" @change="${n}" @click="${l}" name="centro-servicio" .id="${this.serviceCenter.id}"> <label for="${this.serviceCenter.id}">${a(this.serviceCenter.name)} <span class="${this.serviceCenter.active?"alk-icon-arriba":"alk-icon-abajo"}"></span></label><div class="puntos-instalacion__menu__item__body" data-call-center="${this.serviceCenter.isCallCenter}" data-service-center="${this.serviceCenter.id}" @click="${c}" @mouseenter="${o}" @mouseleave="${h}">${this.serviceCenter.address.length?s`<div class="address"><p><strong><i class="alk-icon-llegada-ciudad"></i> Dirección:</strong> ${a(this.serviceCenter.address)}</p></div>`:""} ${this.serviceCenter.email.length?s`<div class="email"><p><strong><i class="alk-icon-email"></i> Email:</strong> <a href="mailto:${this.serviceCenter.email}">${this.serviceCenter.email}</a></p></div>`:""}<div class="contact-phones">${this.serviceCenter.phone.length?s`<div class="phone"><p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong> ${v(this.serviceCenter)}</p></div>`:""} ${this.serviceCenter.cellphone.length?s`<div class="cell"><p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong> ${p(this.serviceCenter)}</p></div>`:""}</div>${this.serviceCenter.schedule.length?s`<div class="schedule"><p><strong><i class="alk-icon-clock"></i> Horario:</strong> ${function(e){let t=[];for(const i of e.schedule)t.push(s`<span>${a(i)}</span>`);return t}(this.serviceCenter)}</p></div>`:""} ${this.serviceCenter.map.length?s`<div class="how-to-get"><p><i class="alk-icon-arrive"></i><a rel="noopener" .href="${this.serviceCenter.map}" title="Indicaciones para llegar a ${this.name}" target="_blank">¿Cómo llegar?</a></p></div>`:""}</div></div>`}}function p(e,t=!0){const i=[];for(const r of e.cellphone)t?i.push(s`<a href="tel:+57${r.replace(/\s/g,"")}" title="Llamar a ${e.name}">${r}</a>`):i.push(`<a href="tel:+57${r.replace(/\s/g,"")}" title="Llamar a ${e.name}">${r}</a>`);return i}function v(e,t=!0){const i=[];for(const r of e.phone)t?i.push(s`<a href="tel:+60${e.areaCode}${r.replace(/\s/g,"")}" title="Llamar a ${e.name}">${r}</a>`):i.push(`<a href="tel:+60${e.areaCode}${r.replace(/\s/g,"")}" title="Llamar a ${e.name}">${r}</a>`);return i}export{u as Menu,p as getFormatedCellphone,v as getFormatedPhone};
