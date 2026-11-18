import { Link } from "react-router-dom";
import { BrandMark } from "./BrandLogo";
import { ROUTES } from "../globals/constants";

function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-6 text-center">
      <BrandMark className="h-12" title="" />
      <h1 className="text-4xl">Page not found</h1>
      <Link to={ROUTES.HOME} className="interactive rounded-md text-sm text-primary hover:underline">
        Go home
      </Link>
    </main>
  );
}

export default NotFound;
