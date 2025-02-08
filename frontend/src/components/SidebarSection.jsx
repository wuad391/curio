import React from 'react';
import SidebarItem from './SidebarItem';

function SidebarSection({ title, items, icon, icons }) {
  return (
    <>
      <div className="flex overflow-hidden gap-2.5 items-center px-4 py-5 w-full text-sm font-medium tracking-normal leading-5 whitespace-nowrap rounded-[100px] text-zinc-700">
        <div className="gap-3 self-stretch my-auto">{title}</div>
      </div>
      {items.map((item, index) => (
        <SidebarItem 
          key={index} 
          text={item} 
          icon={icons ? icons[index] : icon} 
        />
      ))}
    </>
  );
}

export default SidebarSection;