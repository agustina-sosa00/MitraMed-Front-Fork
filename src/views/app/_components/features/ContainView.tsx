import React from "react";

interface ContainViewProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function ContainView({ children, onClick }: ContainViewProps) {
  return (
    <div
      className={`flex flex-col items-center bg-[#f5f5f5] w-full min-h-screen gap-5 px-5 py-4 overflow-y-auto `}
      onClick={onClick}
    >
      <div className={`lg:w-full flex flex-col items-center gap-2`}>
        <div className={`flex flex-col items-center justify-start w-full  `}>{children}</div>
      </div>
    </div>
  );
}
