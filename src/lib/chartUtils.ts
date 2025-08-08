export const AvailableChartColors = [
  "blue",
  "cyan",
  "teal",
  "emerald",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "indigo",
] as const;

export type AvailableChartColorsKeys = (typeof AvailableChartColors)[number];

export const constructCategoryColors = (
  categories: string[],
  colors: readonly AvailableChartColorsKeys[]
): Map<string, AvailableChartColorsKeys> => {
  const map = new Map<string, AvailableChartColorsKeys>();
  categories.forEach((cat, index) => {
    map.set(cat, colors[index % colors.length]);
  });
  return map;
};

export const getColorClassName = (
  color: AvailableChartColorsKeys,
  type: "fill" | "bg"
): string => {
  const prefix = type === "fill" ? "fill-" : "bg-";
  return `${prefix}${color}-500`;
};
