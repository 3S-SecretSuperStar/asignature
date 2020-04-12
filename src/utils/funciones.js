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