export default function TitleView({ title }) {
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className={` font-medium uppercase  text-primaryGreen text-3xl `}>{title}</h1>
      <div className="w-full border border-gray-300"></div>
    </div>
  );
}
