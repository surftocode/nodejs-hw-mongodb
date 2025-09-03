export const parseFilterParams = (query) => {
  const { name, phoneNumber, email } = query;
  const filter = {};
  if (name) {
    filter.name = { $regex: name, $options: "i" };
  }
  if (phoneNumber) {
    filter.phoneNumber = { $regex: phoneNumber, $options: "i" };
  }
  if (email) {
    filter.email = { $regex: email, $options: "i" };
  }
  if (isFavourite) {
    filter.isFavourite = isFavourite === "true";
    return filter;
  }
};
