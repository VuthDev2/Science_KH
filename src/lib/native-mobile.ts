// ==============================================================================
// ScienceKH — Universal Native Mobile Integration (Capacitor)
// Seamless bridge for iOS (App Store) & Android (Google Play Store)
// Duolingo-style native polish:
//   1. Tactile Haptics (Vibrations on clicks, quiz answers, exam submissions)
//   2. Status Bar & Dark/Light mode theme synchronization
//   3. Native Android Back Button & App State Lifecycle
// ==============================================================================

import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { StatusBar, Style } from "@capacitor/status-bar";
import { SplashScreen } from "@capacitor/splash-screen";
import { App } from "@capacitor/app";

/**
 * Check whether the current runtime is an official native iOS or Android app shell
 */
export const isNativeApp = (): boolean => {
  return Capacitor.isNativePlatform();
};

/**
 * Get current mobile operating system: 'ios' | 'android' | 'web'
 */
export const getPlatform = (): "ios" | "android" | "web" => {
  return Capacitor.getPlatform() as "ios" | "android" | "web";
};

// ==============================================================================
// 1. TACTILE HAPTIC VIBRATIONS
// ==============================================================================

/**
 * Light tactile feedback when tapping buttons, cards, tabs, or segmented selectors
 */
export const triggerHapticLight = async () => {
  if (!isNativeApp()) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(10);
      } catch {}
    }
    return;
  }
  try {
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {}
};

/**
 * Selection tick when sliding a carousel or picking options
 */
export const triggerHapticSelection = async () => {
  if (!isNativeApp()) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate(8);
      } catch {}
    }
    return;
  }
  try {
    await Haptics.selectionChanged();
  } catch {}
};

/**
 * Success vibration pattern for correct quiz answers, exam completion, or streak leveling
 */
export const triggerHapticSuccess = async () => {
  if (!isNativeApp()) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([20, 40, 20]);
      } catch {}
    }
    return;
  }
  try {
    await Haptics.notification({ type: NotificationType.Success });
  } catch {}
};

/**
 * Warning / error vibration pattern for incorrect answer or missed streak alert
 */
export const triggerHapticWarning = async () => {
  if (!isNativeApp()) {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {}
    }
    return;
  }
  try {
    await Haptics.notification({ type: NotificationType.Warning });
  } catch {}
};

// ==============================================================================
// 2. STATUS BAR & LIFECYCLE INITIALIZATION
// ==============================================================================

/**
 * Initialize native hardware settings when the app launches
 */
export const initNativeMobile = async () => {
  if (!isNativeApp()) return;

  try {
    // 1. Auto-hide splash screen smoothly
    await SplashScreen.hide({ fadeOutDuration: 300 });

    // 2. Configure status bar
    const isDark =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    await StatusBar.setStyle({
      style: isDark ? Style.Dark : Style.Light,
    });

    if (Capacitor.getPlatform() === "android") {
      await StatusBar.setBackgroundColor({
        color: isDark ? "#0F172A" : "#059669",
      });
    }

    // 3. Android Hardware Back Button listener
    App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack && typeof window !== "undefined") {
        window.history.back();
      } else {
        App.exitApp();
      }
    });

    // 4. Native Deep Linking & OAuth Callback Handler (kh.science.app://)
    App.addListener("appUrlOpen", (event) => {
      try {
        const rawUrl = event.url;
        console.log("[ScienceKH Native] Received deep link:", rawUrl);

        if (
          rawUrl.startsWith("kh.science.app://") ||
          rawUrl.startsWith("sciencekh://")
        ) {
          // Extract the internal route & hash/query params
          const pathAndQuery = rawUrl.replace(/^[^:]+:\/\//, "");
          const targetPath = pathAndQuery.startsWith("/") ? pathAndQuery : `/${pathAndQuery}`;
          if (typeof window !== "undefined") {
            window.location.href = targetPath || "/home";
          }
        }
      } catch (e) {
        console.warn("[ScienceKH Native] appUrlOpen error:", e);
      }
    });
  } catch (error) {
    console.warn("[ScienceKH Native] Init notice:", error);
  }
};

