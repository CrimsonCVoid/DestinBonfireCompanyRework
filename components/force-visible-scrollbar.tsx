"use client";

import { useEffect } from "react";

/**
 * Toggles an `force-scrollbar` class on <html> for the lifetime of the
 * page it's mounted on. The class is styled in globals.css to override
 * macOS / iOS overlay-style scrollbars with a classic always-visible
 * track + thumb, so guests deep-linked to a package anchor on
 * /bonfire-packages can see at a glance where they are in the page.
 *
 * Renders nothing.
 */
export function ForceVisibleScrollbar() {
  useEffect(() => {
    document.documentElement.classList.add("force-scrollbar");
    return () => {
      document.documentElement.classList.remove("force-scrollbar");
    };
  }, []);
  return null;
}
