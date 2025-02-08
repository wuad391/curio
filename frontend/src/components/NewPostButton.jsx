import React from 'react';

function NewPostButton() {
  return (
    <button className="flex flex-col justify-center items-center p-4 text-base font-extrabold tracking-normal leading-none text-white bg-blue-400 rounded-2xl min-h-[56px]">
      <div className="flex gap-3 max-w-full w-[116px]">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/65622cb844ffc063bbcf9bf66823c3a3929a4a792fe4de7ea9e6ae3ae963335f?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
          className="object-contain shrink-0 w-6 aspect-square"
          alt=""
        />
        <div className="my-auto">New Post</div>
      </div>
    </button>
  );
}

export default NewPostButton;