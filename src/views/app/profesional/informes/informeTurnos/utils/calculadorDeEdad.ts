export function calculadorDeEdad({ age }) {
  const today = new Date();
  const birthDate = new Date(age);

  let years = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    years--;
  }

  if (isNaN(years)) return "";
  return years.toString();
}
