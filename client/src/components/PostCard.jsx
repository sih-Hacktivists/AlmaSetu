import { useRef } from 'react';

export const PostCard = ({ post }) => {
  const imageContainerRef = useRef(null);

  const scrollImages = (direction) => {
    const container = imageContainerRef.current;
    const scrollAmount = container.offsetWidth; // Scroll by the width of the container
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="bg-[#BBDCF1] rounded-2xl shadow-md relative h-full">
      {/* User Info */}
      <div className="flex text-sm text-white rounded-t-2xl h-1/4 pl-5 py-2 items-center mb-3 bg-[#111E4B]">
        <img
          src={post.userImg}
          alt={post.userName}
          className="rounded-full w-8 h-8 mr-3"
        />
        {post.userName}, {post.userLocation}
      </div>

      <div className="h-3/4 m-2 flex flex-col gap-5">
        {/* Content */}
        <p className="text-base mb-2">{post.content}</p>

        {/* Photos Section */}
        <div className="relative ">
          {/* Image Scroll Container */}
          {post.photos && post.photos.length > 0 && (
            <div className="relative">
              <div
                ref={imageContainerRef}
                className="overflow-hidden flex justify-start"
              >
                <div className="flex gap-2 transition-transform">
                  {post.photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Post photo ${index + 1}`}
                      className="rounded-lg w-1/2 h-52 object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={() => scrollImages('left')}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
              >
                {/* Left Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>

              <button
                onClick={() => scrollImages('right')}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full"
              >
                {/* Right Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-4">
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              {/* Like Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              {/* Share Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>


            </button>
            <button className="flex items-center text-gray-600 hover:text-blue-500">
              {/* Comment Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.172 48.172 0 0 0 15.01 3.134a1.14 1.14 0 0 0-.865-.501L12 7.5 9.245 3.367a1.14 1.14 0 0 0-.865.501c-1.153.086-2.294.213-3.423.379C2.873 3.746 1.75 5.14 1.75 6.742v5.518Z"
                />
              </svg>
            </button>
          </div>

          {/* Save Button */}
          <button className="absolute bottom-2 right-2 text-gray-600 hover:text-blue-500">
            {/* Save Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
</svg>

          </button>
        </div>
      </div>
    </div>
  );
};
