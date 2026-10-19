import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // The root layout lives under the dynamic `[locale]` segment, so unknown
    // URLs need `app/global-not-found.tsx` to get a server-rendered 404.
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
