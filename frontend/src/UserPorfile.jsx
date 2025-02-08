import React from 'react';
import UserStats from './UserStats';
import UserPosts from './UserPosts';

function UserProfile() {
  return (
    <div className="flex flex-col ml-5 w-1/5 max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-3.5 pt-3.5 pb-80 mx-auto w-full bg-white rounded-2xl shadow-[0px_1px_4px_rgba(0,0,0,0.25)] max-md:pb-24 max-md:mt-10">
        <div className="flex gap-5 justify-between w-full tracking-normal whitespace-nowrap">
          <div className="flex gap-3 items-start">
            <div className="flex overflow-hidden flex-col self-start text-base font-medium text-center text-violet-900">
              <div className="px-4 w-10 h-10 bg-purple-200 rounded-full fill-purple-200">
                A
              </div>
            </div>
            <div className="self-end mt-5 text-xs font-light leading-5 text-zinc-700">
              User_name@gmail.com
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/42c66e8d451f45a9a4324b4252e65e302a460345d957d5d6471d0c2c54690d5c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
            className="object-contain shrink-0 self-start w-8 aspect-square"
            alt=""
          />
        </div>
        <UserStats />
        <UserPosts />
      </div>
    </div>
  );
}

export default UserProfile;