import { Link } from "react-router-dom"; // remove/change if not using react-router
import { ArrowLeft, Search } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen bg-base-300 text-base-content overflow-hidden">
      {/* subtle vignette + gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
                   [background:radial-gradient(60%_50%_at_50%_0%,hsl(var(--p)/.12),transparent_70%)]
                   after:absolute after:inset-0 after:bg-[radial-gradient(50%_50%_at_50%_50%,hsl(var(--b1)/.2),transparent_60%)]"
      />

      <main className="relative mx-auto max-w-3xl px-6 pt-28 pb-24">
        <div className="text-center space-y-6">
          <p className="inline-flex items-center rounded-full border border-base-200 px-3 py-1 text-xs tracking-wide opacity-80">
            Error
          </p>

          <h1 className="text-7xl sm:text-8xl font-extrabold leading-none tracking-tight">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-semibold">Page not found</h2>

          <p className="mx-auto max-w-prose text-sm sm:text-base opacity-80">
            Page Not Found!!!
          </p>

          {/* quick actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch justify-center gap-3">
            <Link
              to="/"
              className="btn btn-primary inline-flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      {/* bottom accent line */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-base-content/30 to-transparent" />
    </div>
  );
};

export default NotFoundPage;
