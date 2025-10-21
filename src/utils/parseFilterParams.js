import mongoose from "mongoose";

export const parseFilterParams = (query) => {
  const { name, email } = query;
  const filter = {};

  if (name) {
    filter.name = {
      $regex: name,
      $options: "i",
    };
    if (email) {
      filter.email = {
         $regex: email, 
         $options: "i" };
    }
  }
  return filter;
};
