import React from 'react';

function SearchBar() {
  return (
    <div className="flex overflow-hidden flex-auto gap-1 bg-white rounded-2xl min-h-[56px] min-w-[360px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)]">
      <div className="flex flex-wrap flex-1 shrink gap-1 items-center p-1 basis-0 min-w-[240px] size-full max-md:max-w-full">
        <div className="flex flex-col justify-center items-center self-stretch my-auto w-12 min-h-[48px]">
          <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
            <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/728315a4dee7886052f73849805a080167688f2df94a767b1b67861977e91d84?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
                className="object-contain self-stretch my-auto w-6 aspect-square"
                alt=""
              />
            </div>
          </div>
        </div>
        <input
          className="flex-1 shrink gap-2.5 self-stretch h-full text-base tracking-wide leading-6 min-w-[240px] text-zinc-700"
          type="text"
          placeholder="Search posts"
          aria-label="Search posts"
        />
        <div className="flex items-center self-stretch my-auto w-12">
          <div className="flex flex-col justify-center items-center self-stretch my-auto w-12 min-h-[48px]">
            <div className="flex overflow-hidden gap-2.5 justify-center items-center w-full max-w-[40px] rounded-[100px]">
              <div className="flex gap-2.5 justify-center items-center self-stretch p-2 my-auto w-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8078b41ec0fe3376c595ddb828f65d73a14699d5cbf96954433302b524a7c6fc?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
                  className="object-contain self-stretch my-auto w-6 aspect-square"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;