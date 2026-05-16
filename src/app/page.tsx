import { Hero } from "@/components/home/Hero";
import { Pillars } from "@/components/home/Pillars";
import { MaisonsGrid } from "@/components/home/MaisonsGrid";
import { EspritSection } from "@/components/home/EspritSection";
import { PrivatReservSection } from "@/components/home/PrivatReservSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <MaisonsGrid />
      <EspritSection />
      <PrivatReservSection />
    </>
  );
}
