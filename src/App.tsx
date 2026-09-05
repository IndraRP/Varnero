import Navbar from "@/components/navbar";
import Home from "@/components/home";
import {CometCardDemo} from "@/components/card";
import About from "@/components/about";
import Footer from "@/components/footer";
import InteractiveCursor from "./components/cursor";
import {TextFlippingBoardDemo} from "./components/text-flipping";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!loading) return;
  
    // Timer 20 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20000);
  
    // Klik / scroll langsung lanjut
    const handleContinue = () => {
      setLoading(false);
    };
  
    window.addEventListener("click", handleContinue);
    window.addEventListener("wheel", handleContinue);
    window.addEventListener("touchmove", handleContinue);
    window.addEventListener("touchstart", handleContinue);
  
    return () => {
      clearTimeout(timer);
  
      window.removeEventListener("click", handleContinue);
      window.removeEventListener("wheel", handleContinue);
      window.removeEventListener("touchmove", handleContinue);
      window.removeEventListener("touchstart", handleContinue);
    };
  }, [loading]);

  return (
      <div>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="min-h-screen flex items-center justify-center bg-black">
                <TextFlippingBoardDemo/>
            </div>
          </motion.div>
        )}

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="min-h-screen flex items-center justify-center bg-black">
              <Navbar />
              <InteractiveCursor/>

              <div className="w-full">
                <Home/>
                <About/> 
                <CometCardDemo/>
                <Footer/>
              </div>
            </div>
          </motion.div>
        )}
      </div>
  );
}

export default App;