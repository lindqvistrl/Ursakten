// Frågar webbläsaren efter användarens position.
// Svarar med latitud och longitud, eller ett fel om användaren nekar.
export function hamtaPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Webbläsaren kan inte ta fram din position."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        reject(new Error("Du nekade åtkomst till din position."));
      }
    );
  });
}