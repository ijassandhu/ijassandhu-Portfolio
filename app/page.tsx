import Navbar from "@/components/Navbar";
import PointerGlow from "@/components/PointerGlow";
import ScrollExperience from "@/components/ScrollExperience";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <PointerGlow />
      <Navbar />
      <ScrollExperience />
      <Footer />
    </main>
  );
}
