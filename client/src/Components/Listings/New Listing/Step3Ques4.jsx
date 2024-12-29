import React from 'react'

const Step3Ques4 = ({ handleNavigation }) => {
  return (
    <div>Step3Ques4
      <div className="flex justify-between">
        <button
          onClick={() => handleNavigation(-1)} // Back button
          className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>
        <button
          onClick={() => handleNavigation(1)} // Next button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Finish
        </button>
      </div>
    </div>
  )
}

export default Step3Ques4