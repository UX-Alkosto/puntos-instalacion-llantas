import { html } from "lit/html.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
export { Menu, getFormatedPhone, getFormatedCellphone };

const _changeHandler = {
        handleEvent(e) {
            document.querySelectorAll(".puntos-instalacion__menu__item > input").forEach(otherMenuItem => {
                const icon = otherMenuItem.nextElementSibling.querySelector("span");
                if (e.target === otherMenuItem) {
                    icon?.classList.replace("alk-icon-abajo", "alk-icon-arriba");
                } else {
                    icon?.classList.replace("alk-icon-arriba", "alk-icon-abajo");
                }
            });
        },
        capture: true
    },
    _bodyClickHandler = {
        handleEvent(e) {
            let target = e.target;
            if (target.tagName == "A") return;
            if (target.classList.contains("puntos-instalacion__menu__item__body")) {
                return map?.clickMarker(target.dataset?.serviceCenter);
            }
            target = target.closest(".puntos-instalacion__menu__item__body");
            return map?.clickMarker(target.dataset?.serviceCenter);
        },
        capture: false
    },
    _clickHandler = {
        handleEvent(e) {
            const body = e.target.nextElementSibling.nextElementSibling;
            if (body.dataset.callCenter == "true") {
                body.click();
                map?.map?.setZoom(5);
            }
        },
        capture: false
    },
    _mouseEnterHandler = {
        handleEvent(e) {
            map?.bounceMarker(e.target.dataset.serviceCenter, "start");
        },
        capture: false
    },
    _mouseLeaveHandler = {
        handleEvent(e) {
            map?.bounceMarker(e.target.dataset.serviceCenter, "stop");
        },
        capture: false
    };

let map = null;

class Menu {
    constructor(serviceCenter, mapElement) {
        this.serviceCenter = serviceCenter;
        map = mapElement;
    }
    render() {
        return html`<div class="puntos-instalacion__menu__item">
            <input type="radio" @change=${_changeHandler} @click=${_clickHandler}
                name="centro-servicio" .id="${this.serviceCenter.id}">
            <label for="${this.serviceCenter.id}">
                ${unsafeHTML(this.serviceCenter.name)}
                <span class="${this.serviceCenter.active ?
                    "alk-icon-arriba" : "alk-icon-abajo"}"></span>
            </label>
            <div class="puntos-instalacion__menu__item__body"
                data-call-center="${this.serviceCenter.isCallCenter}"
                data-service-center="${this.serviceCenter.id}"
                @click=${_bodyClickHandler} @mouseenter=${_mouseEnterHandler}
                @mouseleave=${_mouseLeaveHandler}>
                ${this.serviceCenter.address.length ? html`<div class="address">
                    <p><strong><i class="alk-icon-llegada-ciudad"></i> Dirección:</strong>
                        ${unsafeHTML(this.serviceCenter.address)}</p>
                </div>` : ""}
                ${this.serviceCenter.email.length ? html`<div class="email">
                    <p><strong><i class="alk-icon-email"></i> Email:</strong>
                        <a href="mailto:${this.serviceCenter.email}">${this.serviceCenter.email}</a>
                    </p>
                </div>` : ""}
                <div class="contact-phones">
                    ${this.serviceCenter.phone.length ? html`<div class="phone">
                        <p><strong><i class="alk-icon-customer-contact"></i> Contacto telefónico:</strong>
                            ${getFormatedPhone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                    ${this.serviceCenter.cellphone.length ? html`<div class="cell">
                        <p><strong><i class="alk-icon-phone-contact"></i> Celular:</strong>
                            ${getFormatedCellphone(this.serviceCenter)}
                        </p>
                    </div>` : ""}
                </div>
                ${this.serviceCenter.schedule.length ? html`<div class="schedule">
                    <p><strong><i class="alk-icon-clock"></i> Horario:</strong>
                            ${getFormatedSchedule(this.serviceCenter)}
                        </p>
                </div>` : ""}
                ${this.serviceCenter.map.length ? html`<div class="how-to-get">
                    <p>
                        <i class="alk-icon-arrive"></i><a rel="noopener" .href="${this.serviceCenter.map}" title="Indicaciones para llegar a ${this.name}" target="_blank">¿Cómo llegar?</a>
                    </p>
                </div>`: ""}
            </div>
        </div>`;
    }
}

function getFormatedCellphone(location, returnHtml = true) {
    const cellPhoneNumbers = [];
    for (const cellPhoneNumber of location.cellphone) {
        if (returnHtml) {
            cellPhoneNumbers.push(html`<a href="tel:+57${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${cellPhoneNumber}</a>`);
        } else {
            cellPhoneNumbers.push(`<a href="tel:+57${cellPhoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${cellPhoneNumber}</a>`);
        }
    }
    return cellPhoneNumbers;
}

function getFormatedPhone(location, returnHtml = true) {
    const phoneNumbers = [];
    for (const phoneNumber of location.phone) {
        if (returnHtml) {
            phoneNumbers.push(html`<a href="tel:+60${location.areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${phoneNumber}</a>`);
        } else {
            phoneNumbers.push(`<a href="tel:+60${location.areaCode}${phoneNumber.replace(/\s/g, "")}" title="Llamar a ${location.name}">${phoneNumber}</a>`);
        }
    }
    return phoneNumbers;
}

function getFormatedSchedule(location) {
    let scheduleItems = [];
    for (const scheduleItem of location.schedule) {
        scheduleItems.push(html`<span>${unsafeHTML(scheduleItem)}</span>`);
    }
    return scheduleItems;
}
