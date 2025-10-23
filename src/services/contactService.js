import Contact from "../db/models/Contact.js";
import { SORT_ORDER } from "../constants/index.js";
import { calculationPages } from "../utils/calculatePages.js";

export const fetchAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = "name",
  sortOrder = SORT_ORDER.asc,
  filter = {},
}) => {
  const count = Contact.countDocuments(filter);
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const usersQuery = Contact.find({filter});
  const contacts = await usersQuery
    .limit(limit)
    .skip(skip)
    .sort({
      [sortBy]: sortOrder,
    })
    .exec();
  const paginationData = calculationPages(count, page, perPage);
  return {
    data: contacts,
    ...paginationData,
  };
};

//Contact eklemek
export const createNewContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

//Contact güncelle
export const updateContact = async (data, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(data._id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedContact;
};

//delete Contact

export const deletedContact = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact;
};
