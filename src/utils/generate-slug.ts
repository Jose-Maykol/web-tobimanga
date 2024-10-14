export const generateSlug = (title: string) => {
	return title
		.toLowerCase() // Convierte todo a minúsculas
		.replace(/[^\w\s-]/g, '') // Elimina caracteres especiales
		.trim() // Elimina espacios en blanco al inicio y final
		.replace(/\s+/g, '-') // Reemplaza los espacios por guiones
		.replace(/--+/g, '-') // Elimina guiones duplicados si los hay
}
