import React from 'react';

function SidebarItem({ text, icon, isActive }) {
  const baseClasses = "flex overflow-hidden gap-3 w-full text-sm font-medium tracking-normal leading-5 whitespace-nowrap min-h-[56px] rounded-[100px] text-zinc-700";
  const activeClasses = "bg-slate-50 font-semibold";

  return (
    <div className={`${baseClasses} ${isActive ? activeClasses : ''}`}>
      <div className="flex flex-1 shrink gap-3 items-center py-4 pr-6 pl-4 basis-0 min-w-[240px] size-full max-md:pr-5">
        {icon && (
          <img
            loading="lazy"
            src={icon}
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            alt=""
          />
        )}
        <div className="flex-1 shrink self-stretch my-auto basis-0">
          {text}
        </div>
      </div>
    </div>
  );
}

export default SidebarItem;