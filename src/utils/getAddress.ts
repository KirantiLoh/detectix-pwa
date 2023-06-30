export default async function getAddress(latitude: number, longitude: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );

  const data = await res.json();

  return data;
}
