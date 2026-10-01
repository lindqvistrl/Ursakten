const NAAS_URL = "https://naas.isalman.dev/no";

export async function hamtaNaasSvar() {
  const response = await fetch(NAAS_URL);
  if (!response.ok) {
    throw new Error("NaaS svarade inte");
  }
  return await response.json();
}