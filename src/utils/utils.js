/**
 * Returns a new object where certain values have been removed
 * @param {object} object The object to clean 
 * @param {value} remove The value to clean
 * @returns {object} New cleaned object
 */
function removeEmpty(obj) {
	for (const value in obj) {
		if (obj[value] === null || obj[value] === undefined || (isNaN(obj[value]) && typeof obj[value] === "number")) {
			delete obj[value]
		}
		if (typeof obj[value] === "object") {
			removeEmpty(obj[value])
			if (Object.keys(obj[value])?.length === 0) delete obj[value]
		}
	}
	return obj
}


module.exports = {
	removeEmpty,
}