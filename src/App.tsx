import Navbar from "@/components/navbar";
import Home from "@/components/home";
import {CometCardDemo} from "@/components/card";
import About from "@/components/about";
import Footer from "@/components/footer";
import InteractiveCursor from "./components/cursor";

function App() {
  return (
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
  );
}

export default App;