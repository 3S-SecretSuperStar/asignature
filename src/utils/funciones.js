// de cada input del form, crea un objeto:
//    clave: atributo name
//    valor: contenido del input
export function crearObjetoFromFormData(formData) {
	let objFormData = {};
	for (let key of formData.keys()) {
		objFormData[key] = formData.get(key);
	}
	return objFormData;
}

// copiar al portapapeles el valor
// que se pasa como parámetro
// https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
export function copyToClipboard(textToCopy) {
	const el = document.createElement('textarea');
	el.value = textToCopy;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}