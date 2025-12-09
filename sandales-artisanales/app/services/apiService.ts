import axios from "axios";

// Utilisation de la variable d'environnement
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Service pour récupérer toutes les sandales
export const getSandales = async () => {
  const res = await api.get("/sandals?populate=images");
  return res.data.data; // Format Strapi V4 : [{id, attributes: {...}}]
};

// Service pour récupérer l’artisan
export const getArtisan = async () => {
  console.log("tonga eto");
  const res = await api.get("/artisans", {
    params: {
      "populate[0]": "photo",
      "populate[1]": "gallery",
    },
  });

  if (res.data.data && res.data.data.length > 0) {
    return res.data.data[0];
  }
  return null;
};

// Service pour récupérer les témoignages
export const getTemoignages = async () => {
  const res = await api.get("/testimonials?populate[0]=photo");
  return res.data.data;
};

// Service pour envoyer un message de contact
export const sendContactMessage = async (payload: {
  name: string;
  email: string;
  message: string;
}) => {
  const res = await api.post("/contact-messages", { data: payload });
  return res.data;
};

// Service pour récupérer le hero
export const getHero = async () => {
  const res = await api.get("/hero?populate=background");
  return res.data.data[0];
};

export default api;
