import placesData from '../places.json';

const places = placesData.places;

export const getProvinces  = () => {
  return Object.keys(places.city_municipality);
}

export const getMunicipalityByProvince = (province) => {
  console.log(province);
  if (!province) return [];
  return Object.keys(places.city_municipality[province]);
}

export const getBarangayByMunicipality = (province, mun) => {
  if (!mun) return [];
  console.log(places.barangay[province][mun]);
  return Object.keys(places.barangay[province][mun]);
}