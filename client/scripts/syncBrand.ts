// `npm run brand:sync` — rewrite every file generated from brand.ts.

import { syncBrand } from "./brandSync.ts";

const written = syncBrand();
console.log(written.length ? `brand: wrote ${written.join(", ")}` : "brand: already in sync");
