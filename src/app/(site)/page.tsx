import Hero from "@/components/home/Hero";
import Purpose from "@/components/home/Purpose";
import WhatWeDo from "@/components/home/WhatWeDo";
import Spotlight from "@/components/home/Spotlight";
import ImpactStats from "@/components/home/ImpactStats";
import ImpactModel from "@/components/home/ImpactModel";
import Research from "@/components/home/Research";
import Insights from "@/components/home/Insights";
import UpcomingEvent from "@/components/home/UpcomingEvent";
import Testimonials from "@/components/home/Testimonials";
import GetInvolved from "@/components/home/GetInvolved";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Purpose />
      <WhatWeDo />
      <Spotlight />
      <ImpactStats />
      <ImpactModel />
      <Research />
      <Insights />
      <UpcomingEvent />
      <Testimonials />
      <GetInvolved />
      <Newsletter />
    </>
  );
}