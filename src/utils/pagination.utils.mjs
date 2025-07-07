/**
 * Extracts pagination parameters from the query object.
 * @param {Object} query - The query object containing pagination parameters.
 * @param {string} [query.page=1] - The page number for pagination (defaults to 1).
 * @param {string} [query.limit=10] - The number of items per page (defaults to 10).
 * @returns {Object} An object containing the parsed page and limit values.
 * @property {number} page - The parsed page number.
 * @property {number} limit - The parsed limit value.
 */
export const getPagination = (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  return { page, limit };
};