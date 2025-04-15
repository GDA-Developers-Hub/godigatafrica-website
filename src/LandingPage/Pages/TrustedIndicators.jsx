import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import brand1 from "../../assets/au-center.png";
import brand2 from "../../assets/best-lady.png";
import brand3 from "../../assets/cawee.png";
import brand4 from "../../assets/classic-safari.png";
import brand5 from "../../assets/hp.png";
import brand6 from "../../assets/inch-cape.png";
import brand7 from "../../assets/mi-vida.png";
import brand8 from "../../assets/rubis.png";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

export default function TrustIndicators() {
  const [index, setIndex] = useState(0);
  const [logosPerView, setLogosPerView] = useState(5);

  useEffect(() => {
    const updateLogosPerView = () => {
      if (window.innerWidth >= 1024) {
        setLogosPerView(10); 
      } else {
        setLogosPerView(5); 
      }
    };

    updateLogosPerView();
    window.addEventListener("resize", updateLogosPerView);
    return () => window.removeEventListener("resize", updateLogosPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % brands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-8 border-t border-gray-700 mt-8 text-center">
      <p className="text-[var(--text-primary)] text-sm mb-4">
        Trusted by innovative companies worldwide
      </p>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-8"
          animate={{ x: `-${index * (100 / logosPerView)}%` }}
          transition={{ ease: "linear", duration: 1.5 }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex justify-center min-w-[calc(100%/5)] lg:min-w-[calc(100%/10)]"
            >
              <img
                src={brand}
                alt={`Brand ${i + 1}`}
                className="h-20 object-contain opacity-100 hover:opacity-100 transition-opacity rounded-full"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
