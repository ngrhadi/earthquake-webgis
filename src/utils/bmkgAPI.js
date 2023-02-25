import axios from "axios";

const configurations = {
  BMKG_URL: "https://bmkg-content-inatews.storage.googleapis.com/histori.json"
}

export const API = axios.create({
  baseURL: configurations.BMKG_URL,
});

export const fetchCurrent = async () => {
  const responser = await API.get(`${configurations.BMKG_URL}?${Date.now().toString}`)
  if (responser.status !== "ok") return;
  const response = responser.data
  return {
    response
  };
}
