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
