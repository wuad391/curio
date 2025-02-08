import React from 'react';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

const classItems = ['15-122', '15-150', '15-266', '15-251', '15-251', '15-251'];
const labelItems = ['Helpful', 'Can Answer', 'Awaiting Response', 'Trash'];

function Sidebar() {
  return (
    <div className="flex flex-col w-[100%] max-md:ml-0 max-md:w-full">
      <div className="flex overflow-hidden flex-col px-3 py-3 mx-auto w-full bg-white rounded-2xl min-h-[976px] shadow-[0px_1px_4px_rgba(0,0,0,0.25)] max-md:mt-10">
        <div className="flex flex-col w-full text-3xl font-medium tracking-normal leading-5 whitespace-nowrap text-zinc-700">
          <div className="flex overflow-hidden relative gap-2.5 items-start px-4 py-5 w-full rounded-[100px]">
            <div className="gap-3 self-stretch my-auto">Curio</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ae878f1022113044449d46b0ea07c87c33d7348c04e3a11f8e9ca070c50ec01c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"
              className="object-contain absolute bottom-4 z-0 shrink-0 self-start w-6 h-6 aspect-square right-[18px]"
              alt=""
            />
          </div>
        </div>
        <SidebarItem text="Dashboard" isActive={true} />
        <SidebarItem text="Messages" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/1647c06ce690a56d75ebae2b93cd2981962bc94cef0c9e7ad773ab826ffd2162?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404" />
        <SidebarItem text="Leaderboards" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/824177c6490e36196a1a3bd8296fc418cafd2f1395d16fedbb0b617dbd1cc1b1?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404" />
        <SidebarItem text="Favorites" icon="https://cdn.builder.io/api/v1/image/assets/TEMP/ea1669583c6f17b73ebf0730d8699fab711d86f27188f36b2ffea02a8fd2e003?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404" />
        <div className="flex flex-col justify-center px-4 w-full rotate-[8.742277657347563e-8rad]">
          <div className="w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />
        </div>
        <SidebarSection title="Classes" items={classItems} icon="https://cdn.builder.io/api/v1/image/assets/TEMP/fc55506312c467287531c33955138d8b707dedea8cfe24fd538a3a6de3adb75c?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404" />
        <div className="flex flex-col justify-center px-4 w-full rotate-[8.742277657347563e-8rad]">
          <div className="w-full border border-solid bg-stone-300 border-stone-300 min-h-[1px]" />
        </div>
        <SidebarSection title="Label" items={labelItems} icons={["https://cdn.builder.io/api/v1/image/assets/TEMP/585c35cb9789afe7dc9f9fdbd7c33b0b65e36562c111cc73d2b2dab9c71ba665?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404", "https://cdn.builder.io/api/v1/image/assets/TEMP/a48d159d8cfd32216a8a2944e3ce8ace3f3d9de6f144725b94974155ebe66303?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404", "https://cdn.builder.io/api/v1/image/assets/TEMP/b88e5fa8a6ad53e65a31bac21dfef6fc91ae420bdff75ee938bf2e183e9c441b?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404", "https://cdn.builder.io/api/v1/image/assets/TEMP/87fa5aadd19c233530ac5acb36494586940519712898cfb713a9e10bf699e3fe?placeholderIfAbsent=true&apiKey=89515ccbb370433badd694af9d96d404"]} />
      </div>
    </div>
  );
}

export default Sidebar;