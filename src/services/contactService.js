import ContactController from "../controllers/contactController.js";""

//contact eklemek
export const createNewContact =async (data)=>{
    const newContact=await ContactController.create(data);
    return newContact;
  }


  //contact güncelle
  export const updateContact=async(data,updateData)=>{
    const updatedContact = await ContactController.findByIdAndUpdate(
      data._id,updateData,
      { new: true, runValidators: true }
    );
    return updatedContact;
    
  }

  //delete contact

  export const deletedContact=async(id)=>{
    const deletedContact=await ContactController.findByIdAndDelete(id);
    return deletedContact;
    
  }