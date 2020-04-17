/*
 * de cada input del form, crea un objeto:
 * 	 clave: atributo name
 *	 valor: contenido del input
 * 
 * https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
*/
export function crearObjetoFromFormData(formData) {
	let objFormData = {};
	for (let key of formData.keys()) {
		objFormData[key] = formData.get(key);
	}
	return objFormData;
}

/*
 * copiar al portapapeles el parámetro que se pasa
 * se añade un textare que se hace invisible
 * se guardan las selecciones que hubiera
 * 
 * https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
*/
export function copyToClipboard(textToCopy) {
	const el = document.createElement('textarea');

	el.value = textToCopy;
	el.setAttribute('readonly', '');
	el.style.position = 'absolute';
	el.style.left = '-9999px';

	document.body.appendChild(el);

	const selected = 
		document.getSelection().rangeCount > 0
		? document.getSelection().getRangeAt(0)
		: false;

	el.select();

	document.execCommand('copy');
	document.body.removeChild(el);

	if (selected) {
		document.getSelection().removeAllRanges();
		document.getSelection().addRange(selected);
	}
}