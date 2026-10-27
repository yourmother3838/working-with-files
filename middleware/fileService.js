import { v4 as uuidv4 } from "uuid";

class FileService {
    async saveFile(file){
        try{
            //checking whether the file has arrived
            if(!file){
                throw new Error("file not transferred")
            }

            const MAX_SIZE = 5 * 1024 * 1024

            if(file.size > MAX_SIZE){
                throw new Error("The file is too large. Maximum 5 MB")
            }
            const fileType = file.name.split(".").pop()
            const fileName = `{uuidv4}.${fileType}`  
            const filePath = `./uploads/${fileName}`

            await file.mv(filePath)


        }catch(err){

        }
    }
}

export default new FileService;