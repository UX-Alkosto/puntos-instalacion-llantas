export class PuntoInstalacion {
    constructor({
        address = "",
        areaCode = "",
        cell = [],
        city = "",
        coordinates = {},
        email = "",
        hours = [],
        id = "",
        name = "",
        phone = [],
        schedule = [],
        viewMap = ""
    }) {
        this.address = address;
        this.areaCode = areaCode;
        this.cellphone = cell;
        this.city = city;
        this.coordinates = coordinates;
        this.email = email;
        this.hours = hours;
        this.id = id;
        this.isActive = false;
        this.name = name;
        this.phone = phone;
        this.schedule = schedule;
        this.map = viewMap;
    }

    get active() {
        return this.isActive;
    }

    set active(active) {
        this.isActive = active;
    }

}