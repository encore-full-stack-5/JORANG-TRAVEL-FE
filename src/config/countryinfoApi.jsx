import { api } from "./network";

export const getCountryInfo = async (countryName) => {
  try {
    const res = await api(`/api/v1/country/${countryName}`, "get");
    return res.data;
  } catch (error) {
    console.error("Error in getCountryInfo", error);
  }
};
