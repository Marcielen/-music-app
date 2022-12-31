export function convertDurationToTimeString(duration: number) {
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const finalResult = [minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  return finalResult;
}
