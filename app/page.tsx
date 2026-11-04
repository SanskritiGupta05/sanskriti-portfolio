import BottomNav from "@/components/BottomNav";
import Built from "@/components/Built";
import CardDeck from "@/components/CardDeck";
import Craft from "@/components/Craft";
import Footer from "@/components/Footer";
import Gachapon from "@/components/Gachapon";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Lantern from "@/components/Lantern";
import MetroMap from "@/components/MetroMap";
import MoreWork from "@/components/MoreWork";
import Playground from "@/components/Playground";
import ScrollRail from "@/components/ScrollRail";
import WhyJapan from "@/components/WhyJapan";

export default function Home() {
  return (
    <>
      <Intro />
      <Lantern />
      <ScrollRail />
      <main>
        <Hero />
        <Craft />
        <MetroMap />
        <CardDeck />
        <Built />
        <MoreWork />
        <Playground />
        <WhyJapan />
        <Gachapon />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
