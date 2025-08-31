import { SORT_ORDER } from "../index.js";

export const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keyOfContacts = ["name", "phoneNumber", "email"];
  if (keyOfContacts.includes(sortBy)) return sortBy;
  return "_id";
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;
  return {
    sortBy: parseSortBy(sortBy),
    sortOrder: parseSortOrder(sortOrder),
  };
};
