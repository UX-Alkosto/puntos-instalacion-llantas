import { render } from "lit/html.js";
import Select from "./select";

const brandSelect = document.getElementById("marca"),
	departmentSelect = document.getElementById("departamento"),
	defaultOption = new Option("Selecciona una opción", 0, true, true),
	google = window.google,
	menuContainer = document.querySelector(".puntos-instalacion__menu"),
	mobileBreakpoint = Number(getComputedStyle(document.documentElement).getPropertyValue("--puntos-instalacion-breakpoint").replace("px", ""));

let departmentDefaultOption = defaultOption,
	enableFirst = true,
	mapElement = null,
	mapLoaded = false,
	servicePointsCodes = [];

// Attach events
document.addEventListener("updateCenter", e => {
	const center = e.detail.center;
	if (center !== null) {
		const item = document.getElementById(center);
		item.click();
		setTimeout(() => menuContainer.scrollTop = item.offsetTop, 250);
	}
});

document.addEventListener("click", e => {
	if (e.target.classList
		.contains("puntos-instalacion__map__info-window__close")) {
		mapElement.infoWindow.close();
	}
});

window.onresize = () => {
	document.querySelector(".puntos-instalacion__map").style.display = "none";
	if (window.innerWidth > mobileBreakpoint &&
		document.getElementById("departamento").value != "0") {
		document.querySelector(".puntos-instalacion__map").style.display = "block";
	}
};

if (departmentSelect !== null) {
	departmentDefaultOption = new Option(`Selecciona un ${departmentSelect.labels[0].textContent.toLowerCase()}`, 0, true, true);
	departmentSelect.append(departmentDefaultOption);
	if (brandSelect !== null) {
		departmentSelect.disabled = true;
	}
}


document.querySelectorAll("[data-custom-select]").forEach(selectElement => new Select(selectElement)); // init custom dropdowns

// eslint-disable-next-line no-undef
if (appConfig.jsonFile !== undefined) {
	// eslint-disable-next-line no-undef
	loadJson(appConfig.jsonFile)
		.then(async ({ departments, puntosInstalacion }) => {

			if (departments !== undefined && departmentSelect !== null) {
				// get departments and render options in dropdown
				Object.entries(departments).map(departmentData => {
					const department = departmentData[1];
					const value = departmentData[0];
					const option = new Option(department.name, value);
					return departmentSelect.append(option);
				});
				departmentSelect.refresh();

				departmentSelect.addEventListener("change", async () => {
					if (!mapLoaded)
						await initMap();
					mapLoaded = true;
					enableFirst = true;
					mapElement.infoWindow.close();
					if (window.innerWidth > mobileBreakpoint) {
						// Show map on desktop devices
						document.querySelector(".puntos-instalacion__map")
							.style.display = "block";
					}
					document.querySelector(".msje-localiza")
						.innerText = "Localiza los puntos de instalación de llantas:";
					Object.entries(departments[departmentSelect.value].cities)
						.map(cityData => {
							const city = cityData[0];
							return cityData[1].puntos.map(code => {
								const puntoInstalacion = {
									city: city,
									code: code,
									areaCode: cityData[1].areaCode,
								};

								return servicePointsCodes.push(puntoInstalacion);
							});
						});
					await getServicePoints({
						servicePointsCodes: servicePointsCodes,
						PuntosInstalacion: puntosInstalacion,
					}).then(servicePoints => setPuntosInstalacion(servicePoints));

					servicePointsCodes = []; // Reset service array
				});
			}

		});
}

async function getServicePoints({ servicePointsCodes, PuntosInstalacion }) {
	if (!servicePointsCodes.length) return [];
	const PuntoInstalacion = await import("./punto.js").then(Module => Module.PuntoInstalacion),
		_servicePointsCodes = {};

	servicePointsCodes.map(({ areaCode, city, code }) => _servicePointsCodes[code] = { "areaCode": areaCode, "code": code, "city": city });
	return Object.values(_servicePointsCodes).map(({ areaCode, city, code }) => {
		let servicePoint = {
			areaCode: areaCode,
			city: city,
			coordinates: {
				lat: PuntosInstalacion[code].lat,
				lng: PuntosInstalacion[code].lng,
			},
			id: code
		};
		servicePoint = { ...servicePoint, ...PuntosInstalacion[code] };
		return new PuntoInstalacion(servicePoint);
	});
}

async function initMap(coordinates = {
	lat: 4.67998417919688,
	lng: -74.08550441957686
}) {
	const Map = await import("./map.js").then(Module => Module.Map);
	return mapElement = new Map({
		$element: "#puntos-instalacion-map",
		// eslint-disable-next-line no-undef
		baseSite: appConfig.site,
		center: coordinates
	});
}

async function loadJson(jsonUrl = "") {
	if (jsonUrl.length) {
		return await fetch(jsonUrl, {
			cache: "force-cache",
			mode: "cors",
		}).then(response => {
			if (response.ok) return response.json();
		}).then(data => data);
	}
}

async function setPuntosInstalacion(puntosInstalacionPoints) {
	if (!puntosInstalacionPoints.length) return render([], menuContainer);
	const Menu = await import("./menu.js").then(Module => Module.Menu);
	const menuItems = [];

	// render service points menu items
	puntosInstalacionPoints.map(puntosInstalacionPoint => {
		puntosInstalacionPoint.active = enableFirst;
		enableFirst = false;
		if (puntosInstalacionPoint.isCallCenter) {
			puntosInstalacionPoint.coordinates = {
				lat: 4.67998417919688,
				lng: -74.08550441957686
			};
		}
		menuItems.push(new Menu(puntosInstalacionPoint, mapElement).render());
	});
	if (mapLoaded) mapElement.setMarkers(puntosInstalacionPoints); // render map markers
	render(menuItems, menuContainer);
	document.querySelector("input[name=centro-servicio]").click(); //force checked state on first menu item
}

function resetMap(mapElement) {
	mapElement.infoWindow.close();
	mapElement.clearMarkers();
	mapElement.map.setCenter(new google.maps.LatLng(mapElement.center));
	mapElement.map.setZoom(5);
}