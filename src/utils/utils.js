/**
 * Returns a new object where certain values have been removed
 * @param {object} object The object to clean 
 * @param {value} remove The value to clean
 * @returns {object} New cleaned object
 */
function cleanObject(object, remove) {
	if (!object) return new Error(`Missing object`)
	return Object.fromEntries(
		Object.entries(object)
			.filter(([key, value]) => value != remove)
			.map(([key, value]) => [key, value === Object(value) ? delete value : value])
	);
}