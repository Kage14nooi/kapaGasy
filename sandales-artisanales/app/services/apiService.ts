import axios from "axios";

const API_URL = "http://localhost:1337/api";

const api = axios.create({
  baseURL: API_URL,
});

// Service pour récupérer toutes les sandales
export const getSandales = async () => {
  const res = await api.get("/sandals?populate=images");
  return res.data.data; // Ceci devrait retourner le format Strapi V4 standard : [{id, attributes: {...}}]
};

// Service pour récupérer l’artisan
export const getArtisan = async () => {
  // CORRECTION DE LA REQUÊTE : Utilisation de la syntaxe de peuplement Strapi v4 pour plusieurs champs
  // Assurez-vous que les champs 'photo' et 'gallery' existent sur votre collection 'artisan'
  const res = await api.get("/artisans", {
    params: {
      "populate[0]": "photo",
      "populate[1]": "gallery",
    },
  });

  // Alternativement, si la syntaxe de base ne fonctionne pas :
  // const res = await api.get("/artisans?populate=photo&populate=gallery");

  // On retourne le premier élément, comme convenu pour une section "About"
  if (res.data.data && res.data.data.length > 0) {
    return res.data.data[0];
  }
  return null;
};
// Service pour récupérer les témoignages
export const getTemoignages = async () => {
  const res = await api.get("/testimonials?populate=photo"); // On suppose que .data.data contient le tableau d'objets déstructurés
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
export const getHero = async () => {
  const res = await api.get("/hero?populate=background");
  return res.data.data[0]; // On prend le premier item
};

export default api;
