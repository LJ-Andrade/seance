import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed the "middleware" file convention to "proxy".
// next-intl's middleware works unchanged as the default proxy export.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for those starting with:
  // - /api, /_next, /_vercel (internal)
  // - any path containing a dot (static files like favicon.ico, images)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
