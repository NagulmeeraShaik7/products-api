import { SEARCH_CONSTANTS } from "../infrasructure/constants/constants.mjs";

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
    searchQuery.name = { $regex: query.name, $options: SEARCH_CONSTANTS.REGEX_CASE_INSENSITIVE }; // case-insensitive
  }

  if (query.category) {
    searchQuery.category = { $regex: query.category, $options: SEARCH_CONSTANTS.REGEX_CASE_INSENSITIVE };
  }

  return searchQuery;
};