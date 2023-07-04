import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import img1 from 'src/load.png';
import img2 from "./load.png";
import axios from 'axios';
import { Alert } from "@mui/material";
import { BACKEND_URL } from "src/Constant";
import { updateUsers } from "src/redux/action/information";
import { useDispatch } from "react-redux";

const Props =  {
  imageID: 0,
  itemNumber: 0,
  key_id: 0,
//   onMessageChange  (message) => void;
}

export const AvatarDropzone = () => {
    const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  let MyInfor = JSON.parse(localStorage.getItem("user"));

  const [imageUrl, setImageUrl] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();

    setSelectedFile(acceptedFiles[0]);
    setImageUrl(URL.createObjectURL(acceptedFiles[0]));
    
    formData.append('file', acceptedFiles[0]);
    
    formData.append('id', MyInfor._id);
    
    // console.log(MyInfor.k,'jhfgjhg')
    //const file = acceptedFiles[0];

    try {
      

      //console.log(formData);

       const response = await axios.post(`${BACKEND_URL}/api/users/avatar`, formData, {
        headers: {
          'Content-Type':'multipart/form-data'
        }
      });

    //   if (response.data.message === 'Image uploaded successfully') {
    //     <Alert>{response.data.message}</Alert>
    //     // Props.onMessageChange(response.data.message);
    //   }
      const userInfor = response.data;
      localStorage.setItem('user', JSON.stringify(userInfor));

      dispatch(updateUsers());
      console.log(userInfor);

    } catch (e) {
      console.log(e);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col wx-auto items-center mb-2 mt-2 rounded-md">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-11/12 rounded-md bg-white mt-2 self-center opacity-1"
      >
        <input className="input-zone" {...getInputProps()} />
     
        {!isDragActive &&
          <div className="text-center">
            {selectedFile ? 

              <img 
                src={imageUrl} 
                width={"80px"}
                height={"80px"}
                alt="Uploaded Image" 
              /> :
              MyInfor!=null?
              <img
                src={MyInfor.avatar}
                width={"80px"}
                height={"80px"}
                alt="Upload your avatar file"
                className="mx-auto"
              />:''
            }
          </div>
        }
      </div>
    </div>
  );
};