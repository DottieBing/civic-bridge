import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GetInvolved from "@/components/home/GetInvolved";
import ContactForm from "@/components/get-involved/ContactForm";
import { getSettings } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Get involved | Civic Bridge Africa",
};

export default async function GetInvolvedPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        label="Get involved"
        title="There are many ways to strengthen civic life."
      />
      <GetInvolved />
      <ContactForm email={settings.contact_email || undefined} />
    </>
  );
}