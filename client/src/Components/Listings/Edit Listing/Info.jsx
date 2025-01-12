

import React, { useState, useContext } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../Context/AuthContext";

const Info = ({ data, updateData }) => {
  const { auth } = useContext(AuthContext);


  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [coverPhoto, setCoverPhoto] = useState(data.coverPhoto || "");
  const [previousCoverPhoto, setPreviousCoverPhoto] = useState(data.coverPhoto);
  const [photoURL, setPhotoURL] = useState(""); 

  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 32) {
      setTitle(inputValue);
      updateData("title", inputValue);
    }
  };


  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 500) {
      setDescription(inputValue);
      updateData("description", inputValue);
    }
  };


  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const MAX_FILE_SIZE = 1 * 1024 * 1024; 
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 1MB. Please choose a smaller file.");
        return;
      }
      setErrorMessage("");

      const timestamp = Date.now();
      const newFileName = `${auth.userId}-${timestamp}${file.name.substring(
        file.name.lastIndexOf(".")
      )}`;
      if (previousCoverPhoto) {
        const previousFileRef = ref(storage, previousCoverPhoto);
        deleteObject(previousFileRef).catch((error) =>
          console.error("Error deleting previous cover photo:", error)
        );
      }

      const storageRef = ref(storage, `coverPhotos/${newFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploadingProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCoverPhoto(downloadURL);
            updateData("coverPhoto", downloadURL);
            setPreviousCoverPhoto(downloadURL);
            setIsUploading(false);
          });
        }
      );
    }
  };


  const handleUrlChange = (e) => {
    const url = e.target.value.trim();
    setCoverPhoto(url);
    updateData("coverPhoto", url);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center">
        {isUploading ? (
          <div className="w-64 border-2 h-64 bg-gray-300 text-xl rounded-lg flex items-center justify-center">
            Uploading... {Math.round(uploadingProgress)}%
          </div>
        ) : (
          coverPhoto && (
            <img
              src={coverPhoto}
              alt="Cover"
              className="w-64 border-2 object-cover rounded-lg"
            />
          )
        )}

        <h3 className="font-semibold text-xl mt-3">Change Cover Photo</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className=" bg-primarycolor text-white mt-2 "
        />

        <h1 className="my-3">Or</h1>
        <input
          type="text"
          value={coverPhoto.startsWith("http") ? coverPhoto : ""}
          onChange={handleUrlChange}
          placeholder="Enter image URL"
          className="border-2 border-gray-300 rounded-lg p-3"
        />

        {errorMessage && (
          <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
        )}
      </div>

      <div className="flex w-full max-md:flex-col justify-center md:space-x-10 mt-10 md:px-20">
        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold">Title</h2>
          <textarea
            value={title}
            onChange={handleTitleChange}
            maxLength={32}
            placeholder="Enter a title"
            className="border-2 border-gray-300 rounded-lg p-3 w-full resize-none"
            rows={3}
          />
          <p className="text-sm text-gray-500 text-right">{title.length}/32</p>
        </div>

        <div className="md:w-1/2">
          <h2 className="text-xl font-semibold">Description</h2>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            maxLength={500}
            placeholder="Enter a description"
            className="border-2 border-gray-300 rounded-lg p-3 w-full resize-none"
            rows={5}
          />
          <p className="text-sm text-gray-500 text-right">
            {description.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
