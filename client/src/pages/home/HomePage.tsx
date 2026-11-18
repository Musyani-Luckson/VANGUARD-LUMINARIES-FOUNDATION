import BrandLogo from "../../components/BrandLogo";

// ─── Home ─────────────────────────────────────────────────────────────────────
// The foundation logo, centred. Real content comes later.

function HomePage() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4 text-ink">
      <h1 className="font-sans">
        <BrandLogo size="lg" />
      </h1>
    </main>
  );
}

export default HomePage;
