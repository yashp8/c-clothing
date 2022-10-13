// eslint-disable-next-line import/prefer-default-export
export const selectCategoriesMap = (state) => {
  if (state.categories.categories.length === undefined) {
    // eslint-disable-next-line no-param-reassign
    state.categories.categories = [];
  }
  const categoriesMap = state.categories.categories.reduce(
    (acc, { title, items }) => {
      acc[title.toLowerCase()] = items;
      return acc;
    },
    {},
  );
  return categoriesMap;
};
