import File from "../modles/file.js";
import bcrypt from "bcrypt"
import { sendEmail } from "../utils/sendEmail.js";


export const uploadImage = async (request, response) => {
  const fileObj = {
    path: request.file.path,
    name: request.file.originalname,
  };
  if(request.body.password!=null&&request.body.password!==""){
    fileObj.password=await bcrypt.hash(request.body.password,10)
  }
  console.log(fileObj);
  try {
    const file = await File.create(fileObj);
    response
      .status(200)
      .json({ path: `${process.env.BASE_URL}/file/${file._id}` });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ error: error.message });
  }
};
export const downloadImage = async (request, response) => {
  try {
    const file = await File.findById(request.params.fileId);
    if(file.password!=null){
      if(request.body.password==null){
           response.render("password")
           return
      }
      if(!await bcrypt.compare(request.body.password,file.password)){
          response.render("password",{error:true})
      }

    }
    file.downloadContent++;
    await file.save();
    response.download(file.path, file.name);
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ error: error.message });
  }
};

export const mailHandler = async (request, response) => {
  let password=`Not required`;
  if(request.body.password){
    password=request.body.password
  }
  const message=`${request.body.sender} has sent you a Link to download a file \n\n Link : ${request.body.url} \n 
                 Password : ${password}`
  console.log(message)
  try {
    await sendEmail({
      email:request.body.receiver,
      subject:`Share Linker`,
      message
    })
    response.status(200).json({
      sucess:true,
      message:`Email sent to ${request.body.receiver} successfully`
    })
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ error: error.message });
  }
};
