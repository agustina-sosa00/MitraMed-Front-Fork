import DonutChartWithLabels from "@/components/features/PanelProfessional/DonutChart";
import React from "react";

interface IProp {
  title?: string;
  data: {
    name: string;
    value: number;
    colors: string;
  }[];
}

export const DetailsMetrics: React.FC<IProp> = ({ data, title }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3 px-2 py-5 bg-white border shadow-xl shadow-black/30 border-lightGray rounded-2xl">
      <h1 className="h-6 text-lg font-semibold capitalize text-blue">
        {title}
      </h1>
      <div className="flex justify-center  w-full min-h-[200px] ">
        <DonutChartWithLabels data={data} />
        <div className="items-center justify-center w-2/3 ">
          <div className="flex flex-col items-start justify-center w-full h-full gap-2">
            {data?.map((item) => (
              <div className="flex items-center w-full gap-2">
                <div
                  className={`w-4 h-4 `}
                  style={{ backgroundColor: item.colors }}
                ></div>
                <p className="text-xs font-medium capitalize text-blue ">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
