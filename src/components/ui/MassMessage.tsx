import React from "react";
interface IProps {
  name: string;
  address: string;
  hour: string;
  date: string;
  cellPhone: string;
}

export const MassMessage: React.FC<IProps> = ({
  name,
  address,
  hour,
  date,
  cellPhone,
}) => {
  return (
    <p>
      {`Hola ${name}, te recordamos que tenés un turno agendado el ${date} a las ${hour} en ${address}. `}
      <br />
      {`Si no podes asistir, por favor comunícate al ${cellPhone} para reprogramar o cancelar. ¡Gracias!`}
    </p>
  );
};
