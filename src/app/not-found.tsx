import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center overflow-hidden px-4">
      <div className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />
      <div className="text-center">
        <div className="headline text-[clamp(5rem,22vw,16rem)] leading-none text-stroke-crimson">404</div>
        <h1 className="headline mt-2 text-3xl text-bone sm:text-4xl">Count-Out Loss</h1>
        <p className="mx-auto mt-3 max-w-md text-ash">
          That page got tossed over the top rope. The match must go on somewhere else.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-crimson to-crimson-deep px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
          >
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <Link
            href="/promotions"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 text-sm font-bold uppercase tracking-wide text-bone"
          >
            <Compass className="h-4 w-4" /> Browse Promotions
          </Link>
        </div>
      </div>
    </section>
  );
}
