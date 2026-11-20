import type { CapacitorConfig } from "@capacitor/cli";

// ScienceKH Mobile Architecture — Dynamic Dev vs Production Server Configuration
// In development (default for local builds / simulator testing), connect to live Vite server.
// In explicit production builds (CAPACITOR_PROD=true), url is omitted or points to production backend.
const isProd =
  process.env.CAPACITOR_PROD === "true" ||
  (process.env.NODE_ENV === "production" && process.env.CAPACITOR_DEV !== "true");
const isDev = !isProd;

const devServerUrl = process.env.CAPACITOR_SERVER_URL || "http://10.0.2.2:8080";

const config: CapacitorConfig = {
  appId: "kh.science.app",
  appName: "ScienceKH",
  webDir: ".output/public",
  backgroundColor: "#F8FAFC",
  server: isDev
    ? {
        url: devServerUrl,
        cleartext: true,
        androidScheme: "http",
        allowNavigation: [
          "localhost",
          "localhost:*",
          "127.0.0.1",
          "127.0.0.1:*",
          "10.0.2.2",
          "10.0.2.2:*",
          "192.168.*.*",
          "10.*.*.*",
          "*.supabase.co",
          "*.google.com",
          "accounts.google.com",
        ],
      }
    : {
        androidScheme: "https",
        allowNavigation: [
          "*.supabase.co",
          "*.google.com",
          "accounts.google.com",
        ],
      },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      launchAutoHide: true,
      backgroundColor: "#F8FAFC",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#059669",
    },
  },
};

export default config;
