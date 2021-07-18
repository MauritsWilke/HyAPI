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

/**
 * Returns a new object where certain values have been removed
 * @param {object} object The object to clean 
 * @param {value} remove The value to clean
 * @returns {object} New cleaned object
 */
function removeEmpty(obj) {
	return Object.fromEntries(
		Object.entries(obj)
			.filter(([k, v]) => v != null)
			.map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
	);
}

module.exports = {
	removeEmpty,
}