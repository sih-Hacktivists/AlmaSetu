import React from "react";

const DocumentModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-3xl w-full">
        <h3 className="text-lg font-semibold">Document for {user.name}</h3>
        {/* Dummy content for the document */}
        <div className="mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Profile Picture:</strong></p>
          <img className="w-40 h-40 rounded-full" src={user.profilePic} alt="Profile" />
          {/* Add more document details here */}
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default DocumentModal;
