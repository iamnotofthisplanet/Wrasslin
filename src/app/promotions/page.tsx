import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PromotionsExplorer } from "@/components/promotions/PromotionsExplorer";
import { promotions } from "@/data";

export const metadata: Metadata = {
  title: "Promotions",
  description: "Browse every independent wrestling promotion on WRASSLIN — filter by region, style, and more.",
};

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const { region } = await searchParams;

  return (
    <>
      <PageHeader
        eyebrow="The Directory"
        title={
          <>
            All <span className="text-gradient-fire">Promotions</span>
          </>
        }
        description="Every territory, every style, all in one place. Find your next obsession — then follow it to never miss a beat."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PromotionsExplorer promotions={promotions} initialRegion={region} />
      </section>
    </>
  );
}
