// import React, { useState, useContext } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { storage } from "../../../../firebaseConfig";
// import { AuthContext } from "../../../Context/AuthContext";

// const Step2Ques3 = ({ data, updateData, handleNavigation }) => {
//   const { auth } = useContext(AuthContext); // Get the user info from the context
//   const [coverPhoto, setCoverPhoto] = useState(data.coverPhoto || "");
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Generate a new file name using auth.userId and current timestamp
//       const timestamp = Date.now();
//       const newFileName = `${auth.userId}-${timestamp}${file.name.substring(file.name.lastIndexOf('.'))}`;

//       // Create a reference to Firebase Storage with the new file name
//       const storageRef = ref(storage, `coverPhotos/${newFileName}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       setUploading(true);

//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           setUploadProgress(progress);
//         },
//         (error) => {
//           console.error("Upload failed:", error);
//           setUploading(false);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setCoverPhoto(downloadURL);
//             updateData("coverPhoto", downloadURL); // Store the URL in the parent data
//             setUploading(false);
//           });
//         }
//       );
//     }
//   };

//   return (
//     <div className="px-20 max-md:px-5 flex flex-col items-center">
//       <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
//         Upload your cover photo
//       </h1>
//       <p className="text-center mt-2">Best photo to attract people</p>

//       {/* File Upload Input */}
//       <div className="mt-5 w-full max-w-md">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           className="border-2 border-gray-300 rounded-lg p-3 w-full"
//         />
//         {uploading && (
//           <div className="mt-2 text-sm text-gray-500">
//             Uploading... {Math.round(uploadProgress)}%
//           </div>
//         )}
//         {coverPhoto && (
//           <img
//             src={coverPhoto}
//             alt="Cover Preview"
//             className="mt-5 rounded-lg w-full object-cover"
//           />
//         )}
//       </div>

//       <div className="flex justify-between items-center py-10 w-full">
//         {/* Back Button */}
//         <button
//           onClick={() => handleNavigation(-1)}
//           className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
//         >
//           <IoIosArrowRoundBack size={25} />
//           <span>Back</span>
//         </button>

//         {/* Next Button */}
//         <button
//           onClick={() => handleNavigation(1)}
//           className={`px-10 py-3 rounded-lg text-2xl ${
//             coverPhoto
//               ? "bg-primarycolor text-white cursor-pointer"
//               : "bg-gray-300 text-gray-500 cursor-not-allowed"
//           }`}
//           disabled={!coverPhoto} // Disable Next button until coverPhoto is uploaded
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step2Ques3;

import React, { useState, useContext, useEffect } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../../../../firebaseConfig";
import { AuthContext } from "../../../Context/AuthContext";
import { motion } from "framer-motion"; // If you want to use Framer Motion

const Step2Ques3 = ({ data, updateData, handleNavigation }) => {
  const { auth } = useContext(AuthContext); // Get the user info from the context
  const [coverPhoto, setCoverPhoto] = useState(data.coverPhoto || "");
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [previousCoverPhoto, setPreviousCoverPhoto] = useState(data.coverPhoto); // Store the previous cover photo URL

  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check if file size exceeds 1MB
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage("File size exceeds 1MB. Please choose a smaller file.");
        return;
      } else {
        setErrorMessage(""); // Clear any previous error messages
      }

      // Generate a new file name using auth.userId and current timestamp
      const timestamp = Date.now();
      const newFileName = `${auth.userId}-${timestamp}${file.name.substring(file.name.lastIndexOf('.'))}`;

      // Delete the previous file from Firebase Storage if it exists
      if (previousCoverPhoto) {
        const previousFileRef = ref(storage, previousCoverPhoto); // Get reference to the old photo
        deleteObject(previousFileRef)
          .then(() => {
            console.log("Previous cover photo deleted successfully.");
          })
          .catch((error) => {
            console.error("Error deleting previous cover photo:", error);
          });
      }

      // Create a reference to Firebase Storage with the new file name
      const storageRef = ref(storage, `coverPhotos/${newFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setCoverPhoto(downloadURL);
            updateData("coverPhoto", downloadURL); // Store the URL in the parent data
            setPreviousCoverPhoto(downloadURL); // Update the previous cover photo URL
            setIsUploading(false);
          });
        }
      );
    }
  };

  return (
    <div className="px-20 max-md:px-5 flex flex-col items-center">
      <h1 className="text-3xl max-md:text-2xl font-semibold text-center">
        Upload your cover photo
      </h1>
      <p className="text-center mt-2">You can add more or make changes later.</p>

      {/* File Upload Input */}
      <div className="mt-5 w-full max-w-md flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="border-2 border-gray-300 rounded-lg p-3 w-full"
        />

        {/* Error Message */}
        {errorMessage && (
          <div className="mt-2 text-sm text-red-500">
            {errorMessage}
          </div>
        )}

        {/* Skeleton or Upload Progress */}
        {isUploading ? (
          <motion.div
            className="mt-5 w-full h-60 bg-gray-200 rounded-lg flex justify-center items-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <svg
                className="animate-spin h-16 w-16 text-primarycolor"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 118 8 8 8 0 01-8-8z"
                />
              </svg>
              <div className="absolute text-white">{Math.round(uploadingProgress)}%</div>
            </div>
          </motion.div>
        ) : (
          coverPhoto && (
            <img
              src={coverPhoto}
              alt="Cover Preview"
              className="mt-5 h-40 rounded-lg border-2 object-cover"
            />
          )
        )}
      </div>

      <div className="flex justify-between items-center py-10 w-full">
        {/* Back Button */}
        <button
          onClick={() => handleNavigation(-1)}
          className="border-2 border-dark-1 rounded-full text-xl flex items-center justify-center px-3 py-1"
        >
          <IoIosArrowRoundBack size={25} />
          <span>Back</span>
        </button>

        {/* Next Button */}
        <button
          onClick={() => handleNavigation(1)}
          className={`px-10 py-3 rounded-lg text-2xl ${
            coverPhoto
              ? "bg-primarycolor text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!coverPhoto} // Disable Next button until coverPhoto is uploaded
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2Ques3;
