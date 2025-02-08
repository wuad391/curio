import React from 'react';
import { useNavigate } from 'react-router-dom';

function SidebarItem({ text, icon, isActive }) {
  const navigate = useNavigate();
  const baseClasses = "flex overflow-hidden gap-3 w-full text-sm font-medium tracking-normal leading-5 whitespace-nowrap min-h-[56px] rounded-[100px] text-zinc-700";
  const activeClasses = "bg-slate-50 font-semibold";

  const handleClick = () => {
    // this sucks because in the future, a custom label called dashboard would cause major issues
    if (text == "Dashboard") {
      navigate("/dashboard");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseClasses} ${isActive ? activeClasses : ''}`}
    >
      <div className="flex flex-1 gap-3 items-center py-4 pr-6 pl-4 min-w-[240px] max-md:pr-5">
        {icon && (
          <img
            loading="lazy"
            src={icon}
            className="object-contain shrink-0 w-6 aspect-square"
            alt=""
          />
        )}
        {/* The text container is now forced to be left-aligned with added padding */}
        <div className="flex-1 pl-2 text-left">
          {text}
        </div>
      </div>
    </button>
  );
}

export default SidebarItem;