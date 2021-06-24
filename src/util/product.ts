import axios from "axios";

export const getProductFromCode = (code: string) =>
  axios.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
