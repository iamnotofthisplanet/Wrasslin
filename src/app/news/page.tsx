import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NewsFeed } from "@/components/news/NewsFeed";
import { news } from "@/data";

export const metadata: Metadata = {
  title: "News",
  description: "Breaking news, results, signings, and features from across the indie wrestling world.",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Wire"
        title={
          <>
            Indie <span className="text-gradient-fire">News</span>
          </>
        }
        description="Breaking stories, results, signings and features from every promotion on the hub — so you never have to piece it together yourself."
      />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <NewsFeed articles={news} />
      </section>
    </>
  );
}
