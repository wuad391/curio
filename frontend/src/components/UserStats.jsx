import React from 'react';

function UserStats() {
  return (
    <>
      <div className="self-start mt-4 text-xs font-semibold tracking-normal leading-loose text-zinc-700">
        Your Stats
      </div>
      <div className="flex flex-col items-start pt-5 pr-12 pb-44 pl-5 mt-1.5 w-full tracking-normal text-right rounded-2xl border-2 border-solid bg-slate-50 border-neutral-300 border-opacity-40 max-md:pr-5 max-md:pb-24 max-md:mr-1">
        <div className="flex gap-2">
          <div className="grow text-xs leading-loose text-black">
            Number of Stars:
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/11380c82b698f742acb77fde4b83bda36119230f452ab9dfed1dd45d1b2d2007?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
            className="object-contain shrink-0 my-auto w-3 rounded-sm aspect-[0.92]"
            alt=""
          />
          <div className="text-sm font-bold leading-none text-zinc-700">
            3
          </div>
        </div>
        <div className="flex gap-2 mt-2 mb-0 max-md:mb-2.5">
          <div className="grow text-xs leading-loose text-black">
            Number of Stars:
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/11380c82b698f742acb77fde4b83bda36119230f452ab9dfed1dd45d1b2d2007?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
            className="object-contain shrink-0 my-auto w-3 rounded-sm aspect-[0.92]"
            alt=""
          />
          <div className="text-sm font-bold leading-none text-zinc-700">
            3
          </div>
        </div>
      </div>
    </>
  );
}

export default UserStats;