import { SORT_ORDER } from "../constants/index.js";

const parseSortOrder = (sortOrder) => {
  const order = [sort_order.asc, sort_order.desc].includes(sortOrder);
  if (order) {
    return sortOrder;
  }
  return SORT_ORDER.asc;
};

const parseSortBy = (sortby) => {
  const keyOfContact = ["name", "email"];

  if (keyOfContact.includes(sortby)) {
    return sortby;
  }
  return "name";
};

export const parseSortParams = (query) => {
  const { sortby, sortOrder } = query;
  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortby);
  return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
