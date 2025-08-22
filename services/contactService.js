import Contact from "../src/db/models/Contact";

//contact eklemek
export const createNewContact =async (data)=>{
    const newContact=await Contact.create(data);
    return newContact;
  }


  //contact güncelle
  export const updateContact=async(data)=>{
    
  }