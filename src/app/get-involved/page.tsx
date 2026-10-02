import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GetInvolved from "@/components/home/GetInvolved";
import ContactForm from "@/components/get-involved/ContactForm";

export const metadata: Metadata = {
  title: "Get involved | Civic Bridge Africa",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        label="Get involved"
        title="There are many ways to strengthen civic life."
      />
      <GetInvolved />
      <ContactForm />
    </>
  );
}