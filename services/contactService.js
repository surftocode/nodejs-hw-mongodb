import { SORT_ORDER } from "../src";
import Contact from "../src/db/models/Contact";
import { calculatePages } from "../src/utils/calculatePages";

//contact eklemek
export const createNewContact = async (data) => {
  const newContact = await Contact.create(data);
  return newContact;
};

//contact güncelle
export const updateContact = async (data, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(data._id, updateData, {
    new: true,
    runValidators: true,
  });
  return updatedContact;
};

//delete contact

export const deletedContact = async (id) => {
  const deletedContact = await Contact.findByIdAndDelete(id);
  return deletedContact;
};

//get all contacts

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = "_id",
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactQuery = Contact.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)
    .exec();
  const contacts = await contactQuery;

  const paginationData = calculatePages(page, perPage);
  return { data: contacts, ...paginationData };
};
