"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import {
  FAREHARBOR,
  fareHarborItemUrl,
  type FareHarborItemKey,
} from "@/lib/site";
import { captureEvent } from "./posthog-provider";

type Variant = "primary" | "secondary" | "ghost";

type BookNowButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  /** Which FareHarbor item to open. Omit to open the generic item picker. */
  item?: FareHarborItemKey;
  /** Matches the site's existing .btn-* utilities. */
  variant?: Variant;
  /** If true, the button fills its container width. */
  fullWidth?: boolean;
  /** Visible label. */
  children?: ReactNode;
};

/**
 * "Book Now" anchor that the FareHarbor autolightframe script (loaded in
 * app/layout.tsx) intercepts, opening the booking flow in a modal overlay.
 *
 * Required attributes for the Lightframe script to pick up the click:
 *   - href matching fareharbor.com/{shortname}/ or /items/{id}/
 *   - data-fh-customer-id set to the shortname
 *   - data-fh-flow present (boolean presence attribute)
 *
 * Must NOT carry target="_blank" or rel="noopener" — those cause the
 * browser to open a new tab before the script's click handler runs.
 *
 * Without JavaScript this degrades to a plain link to the FareHarbor URL.
 */
export function BookNowButton({
  item,
  variant = "primary",
  fullWidth = false,
  className = "",
  children = "Book Now",
  "aria-label": ariaLabel,
  ...rest
}: BookNowButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-primary";

  const classes = [
    variantClass,
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // TODO post-launch: fire GA4/Meta conversion event on click (dataLayer push)

  // Visible text is always the accessible name — never override with a
  // generic "Book a beach bonfire" label, which fails Lighthouse's
  // label-content-name-mismatch (the announced label differed from the
  // visible "BOOK THE COZY FIRE" / "BOOK THE SUNSET CIRCLE" copy).
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    // Fire-and-forget event capture. Don't preventDefault — FareHarbor's
    // Lightframe script still owns the click and we never want to block it.
    captureEvent("book_button_clicked", {
      package_key: item ?? "generic",
      variant,
      location: typeof window !== "undefined" ? window.location.pathname : undefined,
    });
    if (typeof rest.onClick === "function") rest.onClick(e);
  }

  return (
    <a
      href={fareHarborItemUrl(item)}
      data-fh-customer-id={FAREHARBOR.shortname}
      data-fh-flow
      aria-label={ariaLabel}
      className={classes}
      {...rest}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
