import {
  getAllContacts,
  getContactsById,
} from "../controllers/contactController.js";
("");

//contact eklemek
export const createNewContact = async (data) => {
  const newContact = await getAllContacts.create(data);
  return newContact;
};

//contact güncelle
export const updateContact = async (data, updateData) => {
  const updatedContact = await getContactsById.findByIdAndUpdate(
    data._id,
    updateData,
    { new: true, runValidators: true }
  );
  return updatedContact;
};

//delete contact

export const deletedContact = async (id) => {
  const deletedContact = await getContactsById.findByIdAndDelete(id);
  return deletedContact;
};
