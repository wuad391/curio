import React from 'react';

function Post({ title, course, content, stars, icon, isActive }) {
  const baseClasses = "flex flex-col px-4 pt-4 pb-8 mt-5 w-full rounded-2xl border-2 border-solid border-neutral-300 border-opacity-40 max-md:max-w-full";
  const activeClasses = "bg-blue-100 bg-opacity-30";
  const inactiveClasses = "bg-neutral-200 bg-opacity-50";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
      <div className="flex flex-wrap gap-5 justify-between w-full font-bold max-md:max-w-full">
        <div className="flex gap-2 self-start text-lg leading-none">
          <img
            loading="lazy"
            src={icon}
            className="object-contain shrink-0 self-start w-5 aspect-square"
            alt=""
          />
          <div className="flex-auto">{title}</div>
        </div>
        <div className="text-sm tracking-normal leading-none text-right">
          {course}
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 items-start self-end tracking-normal max-md:mr-2.5">
        <div className="mt-2.5 text-xs leading-5 basis-auto max-md:max-w-full">
          {content}
        </div>
        <div className="text-sm font-bold leading-none text-right">
          {stars}
        </div>
        <img
          loading="lazy"
          src={isActive ? "https://cdn.builder.io/api/v1/image/assets/TEMP/11380c82b698f742acb77fde4b83bda36119230f452ab9dfed1dd45d1b2d2007?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404" : "https://cdn.builder.io/api/v1/image/assets/TEMP/8c11455cfca0c1515fd1aca7d98a81d182213e5c43e559cb7c247c5f859a5213?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"}
          className="object-contain shrink-0 w-3 rounded-sm aspect-[0.92]"
          alt=""
        />
      </div>
    </div>
  );
}

export default Post;