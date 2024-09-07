import React from 'react';

export const PostCard = ({ post }) => {
  return (
    <div className="bg-[#BBDCF1] rounded-lg shadow-md p-4 mb-4 relative">
      {/* User Info */}
      <div className="flex items-center mb-3">
        <img
          src={post.userImg}
          alt={post.userName}
          className="rounded-full w-12 h-12 mr-3"
        />
        <div>
          <div className="text-lg font-semibold">{post.userName}</div>
          <div className="text-sm text-gray-600">{post.userLocation}</div>
        </div>
      </div>

      {/* Content */}
      <p className="text-base mb-3">{post.content}</p>

      {/* Photos */}
      {post.photos && post.photos.length > 0 && (
        <div className="overflow-x-auto mb-3">
          <div className="flex gap-2">
            {post.photos.slice(0, 4).map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Post photo ${index + 1}`}
                className="rounded-lg w-48 h-auto object-cover flex-shrink-0"
              />
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-4">
          <button className="flex items-center text-gray-600 hover:text-blue-500">
            {/* Like Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 15l7 7 7-7M12 4v7.24a4.5 4.5 0 11-4.5 0V4h0a4.5 4.5 0 014.5-4.5H12a4.5 4.5 0 014.5 4.5v0a4.5 4.5 0 014.5 4.5v7.24l-7 7-7-7V8.5A4.5 4.5 0 015 4z"
              />
            </svg>
            Like
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500">
            {/* Share Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8a4 4 0 014-4h12a4 4 0 014 4v12a4 4 0 01-4 4H7a4 4 0 01-4-4V8zm4 0a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2H7z"
              />
            </svg>
            Share
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500">
            {/* Comment Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 10h10m-5 5H7m4-8V3a1 1 0 10-2 0v4H4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V6a1 1 0 00-1-1h-4zm2 0h-4v4h4V6z"
              />
            </svg>
            Comment
          </button>
        </div>
        <button className="absolute bottom-3 right-3 text-gray-600 hover:text-blue-500">
          {/* Save Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 3h-4a1 1 0 00-1 1v4a1 1 0 01-1 1H5a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V8a1 1 0 011-1h4a1 1 0 001-1V4a1 1 0 00-1-1zm-1 12h-6v-2h6v2zm0-4H5V6h12v5zm2-5h-2V5h2v5z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
