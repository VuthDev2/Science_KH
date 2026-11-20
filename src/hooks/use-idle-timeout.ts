// ==============================================================================
// ScienceKH — Shared School Computer Lab Inactivity Auto-Logout Hook
// Protects student privacy & accounts in Cambodian school computer labs
// Detects 14 minutes of inactivity, displays 60s warning modal, then signs out.
// ==============================================================================

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

interface IdleTimeoutOptions {
  idleTimeMs?: number; // Time before warning modal appears (default: 14 mins)
  warningTimeMs?: number; // Time user has to respond to warning (default: 60 secs)
  enabled?: boolean;
}

export function useIdleTimeout({
  idleTimeMs = 14 * 60 * 1000, // 14 minutes
  warningTimeMs = 60 * 1000, // 60 seconds
  enabled = true,
}: IdleTimeoutOptions = {}) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [showWarning, setShowWarning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(Math.round(warningTimeMs / 1000));

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const handlePerformLogout = useCallback(async () => {
    // Clear all active timers
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    setShowWarning(false);

    try {
      await signOut();
      toast.warning("សម័យប្រជុំត្រូវបានចាកចេញដោយស្វ័យប្រវត្តិ (Session expired due to inactivity)", {
        description: "គណនីរបស់អ្នកត្រូវបានការពារដោយសុវត្ថិភាពពីការប្រើប្រាស់រួម។",
        duration: 7000,
      });
      navigate({
        to: "/auth",
        search: { mode: "signin" },
        replace: true,
      });
    } catch (err) {
      console.error("[IdleTimeout] Error signing out:", err);
    }
  }, [signOut, navigate]);

  const resetTimer = useCallback(() => {
    lastActivityRef.current = Date.now();

    // If warning was showing, hide it and clear countdown
    if (showWarning) {
      setShowWarning(false);
      setRemainingSeconds(Math.round(warningTimeMs / 1000));
    }

    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    if (!enabled || !user) return;

    // Set new timer for the warning trigger
    idleTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      setRemainingSeconds(Math.round(warningTimeMs / 1000));

      const warningStart = Date.now();
      countdownIntervalRef.current = setInterval(() => {
        const elapsed = Math.round((Date.now() - warningStart) / 1000);
        const remaining = Math.max(0, Math.round(warningTimeMs / 1000) - elapsed);
        setRemainingSeconds(remaining);

        if (remaining <= 0) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          handlePerformLogout();
        }
      }, 1000);
    }, idleTimeMs);
  }, [enabled, user, idleTimeMs, warningTimeMs, showWarning, handlePerformLogout]);

  useEffect(() => {
    if (!enabled || !user) return;

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];

    const handleUserActivity = () => {
      // Throttle activity checks: only reset timer if more than 2 seconds since last reset
      if (Date.now() - lastActivityRef.current > 2000) {
        if (!showWarning) {
          resetTimer();
        }
      }
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });

    // Start initial timer
    resetTimer();

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [enabled, user, resetTimer, showWarning]);

  return {
    showWarning,
    remainingSeconds,
    resetTimer,
    logout: handlePerformLogout,
  };
}
