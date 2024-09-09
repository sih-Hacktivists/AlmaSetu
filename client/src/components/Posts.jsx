import React from 'react'
import { PostCard } from './PostCard.jsx'

export const Posts = () => {
  const samplePost = {
    userName: "John Doe",
    userLocation: "New York, NY",
    userImg: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    photos: [
      "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
      "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
    ]
  };
  return (
    <div className='rounded-lg bg-[#ECF7FE]'>
        <PostCard post={samplePost}/>
        <PostCard post={samplePost}/>
        <PostCard post={samplePost}/>
    </div>
  )
}
