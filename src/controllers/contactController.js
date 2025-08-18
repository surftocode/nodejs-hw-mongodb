import Contact from "../db/models/Contact.js";

//Tüm contact listesini almak7
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({createdAt:-1});
    res.status(200).json({
      success: true,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Sunucu hatası",
      error: error.message,
    });
  }
};

//idye göre contact almak

export const getContactsById = async (req, res) => {
  try {
    const contactByID = await Contact.findById(req.params.id);
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
