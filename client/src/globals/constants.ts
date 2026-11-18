import { BRAND } from "./brand";

export const APP_NAME = BRAND.name;
export const APP_VERSION = "0.1.0";
export const LOCALE = BRAND.locale;

/** Every route path in one place. Register each in router/AppRouter.tsx. */
export const ROUTES = {
  HOME: "/",
  /** Development-only previews of the UI layers. */
  DEV_FOUNDATION: "/dev/foundation",
  DEV_COMPONENTS: "/dev/components",
} as const;
