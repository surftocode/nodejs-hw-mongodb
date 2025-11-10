import fs from "node:fs/promises";
import path from "node:path";
import { UPLOAD_DIR } from "../constants/index.js";
export const saveFileToUploadDir = async (file) => {
    const oldPath=file.path;
    const extention=path.extname(file.originalname);
    const uniqueName=`${Date.now()}-${Math.random()}${extention}}`;
    const fileName=file.filename||file.originalname;
    const newPath=path.join(UPLOAD_DIR,fileName)
    await fs.rename(oldPath,newPath);
    return newPath;
}

