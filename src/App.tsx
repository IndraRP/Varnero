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
    const timer = setTimeout(() => {
      setLoading(false);
    }, 20000); // ⏱️ boot duration

    return () => clearTimeout(timer);
  }, []);

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