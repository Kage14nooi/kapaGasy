import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const STRAPI_URL = "http://localhost:1337"; // Modifie si ton Strapi est hébergé
const TOKEN =
  "13d6990409482564b73c68aa7fc226b066fccd2acbb2bb9ad103dc3b25b72c42690324a80b340e61df3db4eb23323df7ae4630f6830ab63be6ae1ab106e3752ba7bbb2c70e6f67a0d4f6ca9e96506f74f0dad7cb6494a670bd5801072bf7220b18caf67b0be66991cf348a2858f524015f3bef744e2e90de0f471acc7d386ecb"; // Mets ton token ici

async function importSandals() {
  const filePath = path.join(process.cwd(), "data/products.json");
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const sandal of json.sandals) {
    const body = {
      data: {
        name: sandal.name,
        category: sandal.category,
        price: sandal.price,
        description: sandal.description,
        materials: sandal.materials,
        badge: sandal.badge || null,
        sizes: sandal.sizes ?? [],
        featured: sandal.featured || false,
        images: sandal.images, // 🚀 Version sans upload → on garde les URLs telles quelles
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/sandals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    console.log("✔️ Imported sandal:", sandal.name);
  }
}

async function importTestimonials() {
  const filePath = path.join(process.cwd(), "data/testimonials.json");
  const json = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const t of json) {
    const body = {
      data: {
        author: t.author,
        role: t.role,
        text: t.text,
        rating: t.rating,
        image: t.image, // 🚀 Pas d'upload → juste la string
      },
    };

    const res = await fetch(`${STRAPI_URL}/api/testimonials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    console.log("✔️ Imported testimonial:", t.author);
  }
}

(async () => {
  console.log("🚀 Importing sandals...");
  await importSandals();

  console.log("🚀 Importing testimonials...");
  await importTestimonials();

  console.log("🎉 Import terminé !");
})();
