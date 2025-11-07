import {
  createNewContact,
  updateContact,
  fetchAllContacts,
} from "../services/contactService.js";
import { notFoundHandler } from "../middlewares/notFoundHandler.js";
import { resetPassword } from "../services/auth.js";

//Tüm Contact listesini almak7
export const getAllContacts = async (req, res) => {
  const contacts = await fetchAllContacts(req.user._id);
  console.log("contacts found:", contacts.data?.length || 0);
  res.status(200).json({
    success: true,
    message: "Successfully found Contacts!",
    data: contacts,
  });
};

//idye göre Contact almak

export const getContactsById = async (req, res) => {
  const ContactByID = await Contact.findById(req.params.id);
  if (!ContactByID) {
    return notFoundHandler(res, "Contact not found");
  }
  res.status(200).json({
    success: true,
    message: `Successfully found Contact with id ${ContactByID._id}!`,
    data: ContactByID,
  });
};

//Yeni contact eklemek

export const createContact = async (req, res, next) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  if (!name || !phoneNumber || !email || !isFavourite || !contactType) {
    return res.status(400).json({
      status: 400,
      success: false,
      messge:
        "Please provide all required fields: name, phoneNumber, email, isFavourite, contactType",
    });
  }
  const newContact = await createNewContact({
    userId: req.user._id,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  });
  res.status(201).json({
    success: true,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

//Contact güncelleme
export const updatedContactController = async (req, res) => {
  const { id } = req.params;
  const updated = await updateContact(id, req.body);

  if (!updated) {
    return notFoundHandler(res, "Contact not found");
  }
  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updated,
  });
};

//Contact silme

export const deleteContactController = async (req, res) => {
  const { id } = req.params;

  const deletedId = await deletedContact(id);
  if (!deletedId) {
    return notFoundHandler(res, "Contact cannot be found!");
  }

  res.status(204).end();
};
