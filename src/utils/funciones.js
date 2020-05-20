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

/*
 * convierte lo que proporciona un input type="date", que es un string aaaa-mm-dd
 * a un timestamp en segundos, que es lo que necesita Solidity
*/
export function dateStringToTimestamp(dateStringToTimestamp) {
	let timestampMs = Date.parse(dateStringToTimestamp);
	return timestampMs/1000;
}

/*
 * convierte lo que da un input type="date", que es un string aaaa-mm-dd
 * a un timestamp en segundos, que es lo que necesita Solidity
*/
export function timestampToDateString(timestampToDate) {
	const date = new Date(timestampToDate*1000);
	const dateYear = date.getFullYear();
	const dateMonth = padNumbers(date.getMonth() + 1, 2);
	const dateDay = padNumbers(date.getDate(), 2);
	const dateString = `${dateDay}/${dateMonth}/${dateYear}`;
	return dateString;
}

/*
 * si number tiene menos de digits dígitos, rellena
 * con ceros por la izquierda
*/
function padNumbers(number, digits) {
	if (("" + number).length < digits) {
		number = "0" + number;
	}
	return "" + number;
}

export function shortenEthAddress(ethAddress) {
	if (ethAddress.length > 16) {
		return ethAddress.slice(0, 8) + "..." + ethAddress.slice(-8);
	}
}