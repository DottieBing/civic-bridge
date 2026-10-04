import { draftMode } from "next/headers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <>
      {isEnabled && (
        <div className="sticky top-0 z-[100] flex flex-wrap items-center justify-center gap-4 bg-amber px-4 py-2 text-[14px] text-navy">
          <span>Preview mode: you can see drafts that visitors can&apos;t.</span>
          <a href="/api/preview/exit" className="font-bold underline underline-offset-2">
            Exit preview
          </a>
        </div>
      )}
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}