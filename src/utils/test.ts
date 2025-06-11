export const testAPIKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_BALLDONTLIE_API_KEY;
  console.log("API Key:", apiKey ? "Found ✅" : "Not found ❌");
  return !!apiKey;
};
