import Contact from "../db/models/Contact.js";

export const fetchAllContacts = async (userId) => {
  const contacts = await Contact.find({userId});

  return {
    data: contacts,
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
