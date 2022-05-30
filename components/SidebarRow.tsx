import React, { SVGProps } from "react";
interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}
const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex max-w-fit items-end space-x-2 px-4 py-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all duration-200 group"
    >
      <Icon className="h-6 w-6" />
      <p className="group-hover:text-twitter hidden md:inline-flex text-base font-light lg:text-xl ">
        {title}
      </p>
    </div>
  );
};

export default SidebarRow;
