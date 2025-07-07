/**
 * Constructs a MongoDB search query object based on provided query parameters.
 * @param {Object} query - The query object containing search parameters.
 * @param {string} [query.name] - The name to search for (case-insensitive).
 * @param {string} [query.category] - The category to search for (case-insensitive).
 * @returns {Object} A MongoDB query object with regex filters for name and/or category.
 */
export const getSearchQuery = (query) => {
  const searchQuery = {};

  if (query.name) {
    searchQuery.name = { $regex: query.name, $options: "i" }; // case-insensitive
  }

  if (query.category) {
    searchQuery.category = { $regex: query.category, $options: "i" };
  }

  return searchQuery;
};