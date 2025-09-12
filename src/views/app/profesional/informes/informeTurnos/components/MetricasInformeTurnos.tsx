import Card from "@/views/app/components/ui/card/Card";
import DonutChart from "@/views/app/components/ui/DonutChart";

//#region arrays

const obs = [
  { name: "Swiss Medical", value: 100, colors: "#D50032" },
  { name: "IOMA", value: 300, colors: "#04AAC0" },
  { name: "Osde", value: 300, colors: "#1226AA" },
  { name: "Medifé", value: 210, colors: "#f37d2e" },
];
const turns = [
  { name: "Clínica Medica", value: 110, colors: "#1A9AE9" },
  { name: "Odontología", value: 310, colors: "#00BF89" },
  { name: "Cardiología", value: 500, colors: "#D50032" },
  { name: "Pediatría", value: 90, colors: "#ECDC2C" },
];

export default function MetricasInformeTurnos() {
  return (
    <div className="grid w-full grid-cols-2 gap-5 pt-10 justify-items-center">
      <Card>
        <h1 className="h-6 text-lg font-semibold text-blue">Obras Sociales</h1>
        <div className="flex justify-center  w-full min-h-[200px] ">
          <DonutChart data={obs} />
          <div className="items-center justify-center w-2/3 ">
            <div className="flex flex-col items-start justify-center w-full h-full gap-2">
              {obs?.map((item) => (
                <div key={item.name} className="flex items-center w-full gap-2">
                  <div className={`w-4 h-4 `} style={{ backgroundColor: item.colors }}></div>
                  <p className="text-xs font-medium text-blue ">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h1 className="h-6 text-lg font-semibold text-blue">Turnos por Especialidad</h1>
        <div className="flex justify-center  w-full min-h-[200px] ">
          <DonutChart data={turns} />
          <div className="items-center justify-center w-2/3 ">
            <div className="flex flex-col items-start justify-center w-full h-full gap-2">
              {turns?.map((item) => (
                <div key={item.name} className="flex items-center w-full gap-2">
                  <div className={`w-4 h-4 `} style={{ backgroundColor: item.colors }}></div>
                  <p className="text-xs font-medium text-blue ">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
