"use client";
import { useEffect, useState } from "react";
import MotionCard from "@/app/components/ui/MotionCard";
import { getSandales } from "@/app/services/apiService";

interface ImageAttribute {
  url: string;
}

interface ImageData {
  attributes: ImageAttribute;
}

interface StrapiSandale {
  id: number;
  attributes: {
    name: string;
    price: number;
    description?: string;
    images?: {
      data: ImageData[] | null;
    };
  };
}

interface FlatSandale {
  id: number;
  name: string;
  price: number;
  description?: string;
  images?: ImageAttribute[];
}

type Sandale = StrapiSandale | FlatSandale;

export default function SectionSandales() {
  const [sandales, setSandales] = useState<Sandale[]>([]);
  const [selectedSandale, setSelectedSandale] = useState<Sandale | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchSandales = async () => {
      try {
        const data = await getSandales();
        setSandales(data);
        console.log(data);
      } catch (err) {
        console.error("Erreur lors de la récupération des sandales :", err);
      }
    };
    fetchSandales();
  }, []);

  const closeModal = () => {
    setSelectedSandale(null);
    setCurrentImageIndex(0);
  };

  const getSandaleData = (sandale: Sandale) => {
    const isStrapiV4 = "attributes" in sandale && sandale.attributes !== null;

    const name = isStrapiV4
      ? sandale.attributes.name
      : (sandale as FlatSandale).name;
    const price = isStrapiV4
      ? sandale.attributes.price
      : (sandale as FlatSandale).price;
    const description = isStrapiV4
      ? sandale.attributes.description
      : (sandale as FlatSandale).description;

    let imagesData: any = null;
    if (isStrapiV4) {
      imagesData = sandale.attributes.images?.data;
    } else {
      imagesData = (sandale as FlatSandale).images;
    }

    const images: string[] = [];
    if (imagesData && imagesData.length > 0) {
      imagesData.forEach((img: any) => {
        let imgUrl = "/placeholder.jpg";
        if (isStrapiV4) {
          if (img && img.attributes && img.attributes.url) {
            imgUrl = img.attributes.url;
          }
        } else {
          if (img && img.url) {
            imgUrl = img.url;
          }
        }
        const fullUrl = imgUrl.startsWith("/")
          ? `http://localhost:1337${imgUrl}`
          : imgUrl;
        images.push(fullUrl);
      });
    }

    if (images.length === 0) {
      images.push("/placeholder.jpg");
    }

    return { name, price, description, images };
  };

  const handlePrevImage = () => {
    if (!selectedSandale) return;
    const { images } = getSandaleData(selectedSandale);
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    if (!selectedSandale) return;
    const { images } = getSandaleData(selectedSandale);
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <section id="sandales" className="py-20 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#3D3D3D] tracking-wide"
            style={{ fontFamily: "Lora, serif" }}
          >
            Nos Sandales Artisanales
          </h2>
          <p
            className="text-lg text-gray-600 mb-16 text-center max-w-2xl mx-auto"
            style={{ fontFamily: "Montserrat, sans-serif", lineHeight: "1.6" }}
          >
            Découvrez notre collection de sandales en cuir, fabriquées à la main
            avec passion
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {sandales.map((sandale) => {
              const isStrapiV4 =
                "attributes" in sandale && sandale.attributes !== null;
              const name = isStrapiV4
                ? sandale.attributes.name
                : (sandale as FlatSandale).name;
              const price = isStrapiV4
                ? sandale.attributes.price
                : (sandale as FlatSandale).price;

              if (!name || price === undefined || price === null) {
                console.warn(
                  `Sandale ID ${sandale.id} n'a pas de nom ou de prix valide. Ignoré.`
                );
                return null;
              }

              let imagesData: any = null;
              if (isStrapiV4) {
                imagesData = sandale.attributes.images?.data;
              } else {
                imagesData = (sandale as FlatSandale).images;
              }

              let imgUrl = "/placeholder.jpg";
              if (imagesData && imagesData.length > 0) {
                if (isStrapiV4) {
                  if (
                    imagesData[0] &&
                    imagesData[0].attributes &&
                    imagesData[0].attributes.url
                  ) {
                    imgUrl = imagesData[0].attributes.url;
                  }
                } else {
                  if (imagesData[0] && imagesData[0].url) {
                    imgUrl = imagesData[0].url;
                  }
                }
              }

              const fullImgUrl = imgUrl.startsWith("/")
                ? `http://localhost:1337${imgUrl}`
                : imgUrl;

              return (
                <div
                  key={sandale.id}
                  onClick={() => setSelectedSandale(sandale)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-pointer"
                  style={{ border: "1px solid #E8DDD2" }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={fullImgUrl}
                      alt={name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-xl font-semibold text-[#3D3D3D] mb-2"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      {name}
                    </h3>
                    <p
                      className="text-2xl font-bold text-[#E07B39]"
                      style={{ fontFamily: "Montserrat, sans-serif" }}
                    >
                      {price} €
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal avec galerie d'images */}
      {selectedSandale && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ border: "2px solid #D9C6B0" }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-600 hover:text-[#E07B39] hover:bg-[#F7F3F0] transition-all shadow-lg"
              aria-label="Fermer"
            >
              ×
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Galerie d'images */}
              <div className="relative bg-[#F7F3F0] flex items-center justify-center p-8">
                <img
                  src={
                    getSandaleData(selectedSandale).images[currentImageIndex]
                  }
                  alt={getSandaleData(selectedSandale).name}
                  className="max-w-full max-h-[500px] object-contain rounded-lg"
                />

                {getSandaleData(selectedSandale).images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all shadow-lg"
                    >
                      ←
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center text-[#3D3D3D] hover:bg-[#E07B39] hover:text-white transition-all shadow-lg"
                    >
                      →
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {getSandaleData(selectedSandale).images.map(
                        (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentImageIndex
                                ? "bg-[#E07B39] w-8"
                                : "bg-gray-300 hover:bg-gray-400"
                            }`}
                          />
                        )
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Détails du produit */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3
                  className="text-3xl md:text-4xl font-bold text-[#3D3D3D] mb-4"
                  style={{ fontFamily: "Lora, serif" }}
                >
                  {getSandaleData(selectedSandale).name}
                </h3>

                <p
                  className="text-3xl font-bold text-[#E07B39] mb-6"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {getSandaleData(selectedSandale).price} €
                </p>

                {getSandaleData(selectedSandale).description && (
                  <div className="mb-6">
                    <h4
                      className="text-xl font-semibold text-[#3D3D3D] mb-3"
                      style={{ fontFamily: "Lora, serif" }}
                    >
                      Description
                    </h4>
                    <p
                      className="text-gray-700 leading-relaxed"
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        lineHeight: "1.8",
                      }}
                    >
                      {getSandaleData(selectedSandale).description ||
                        "Sandale artisanale en cuir véritable, fabriquée à la main avec soin. Chaque paire est unique et reflète le savoir-faire traditionnel de nos artisans. Confortable et durable, parfaite pour un style élégant et naturel."}
                    </p>
                  </div>
                )}

                {/* Caractéristiques */}
                <div className="mb-6">
                  <h4
                    className="text-xl font-semibold text-[#3D3D3D] mb-3"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    Caractéristiques
                  </h4>
                  <ul
                    className="space-y-2 text-gray-700"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    <li className="flex items-start">
                      <span className="text-[#E07B39] mr-2">•</span>
                      <span>Matière : Cuir véritable tanné végétal</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E07B39] mr-2">•</span>
                      <span>Semelle : Caoutchouc naturel antidérapant</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E07B39] mr-2">•</span>
                      <span>Fabrication : 100% artisanale</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E07B39] mr-2">•</span>
                      <span>Tailles disponibles : 36 à 45</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#E07B39] mr-2">•</span>
                      <span>Délai de fabrication : 7-10 jours</span>
                    </li>
                  </ul>
                </div>

                {/* Entretien */}
                <div className="mb-8 p-4 bg-[#F7F3F0] rounded-lg">
                  <h4
                    className="text-lg font-semibold text-[#3D3D3D] mb-2"
                    style={{ fontFamily: "Lora, serif" }}
                  >
                    💡 Conseils d'entretien
                  </h4>
                  <p
                    className="text-sm text-gray-600"
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      lineHeight: "1.6",
                    }}
                  >
                    Nettoyez avec un chiffon humide et nourrissez régulièrement
                    le cuir avec un produit adapté pour conserver sa souplesse
                    et son éclat.
                  </p>
                </div>

                <button
                  className="w-full bg-[#E07B39] text-white py-4 rounded-lg font-semibold hover:bg-[#C86A2F] transition-all duration-300 shadow-md hover:shadow-lg"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Nous contacter pour commander
                </button>

                <p
                  className="text-sm text-gray-500 text-center mt-4"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  Fabrication artisanale • Cuir véritable • Fait main
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
