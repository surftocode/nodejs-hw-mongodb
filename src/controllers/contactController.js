import mongoose from "mongoose";
import contact from "../db/models/Contact.js";

//Tüm contact listesini almak7
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contact.find().sort(-1);
    req.status(200).json({
      success: true,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      successfalse,
      message: "Sunucu hatası",
      error: error.mesage,
    });
  }
};

//idye göre contact almak

export const getContactsById = async (req, res) => {
  try {
    const contactByID = await contact.findById(req.params.id);
    if (!contactByID) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Successfully found contact with id ${contactByID}!`,
      data: contactByID,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
