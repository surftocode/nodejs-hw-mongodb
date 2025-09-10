import Contact from "../db/models/Contact.js";
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
  const removed = await Contact.findByIdAndDelete(id);
  return removed;
};