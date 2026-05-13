"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { SITE } from "@/lib/site";
import { captureEvent } from "./posthog-provider";

type Variant = "primary" | "secondary" | "ghost";

type CallToBookButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> & {
  /** Stable key used for PostHog `call_to_book_clicked` event props. */
  packageKey: string;
  variant?: Variant;
  fullWidth?: boolean;
  children?: ReactNode;
};

/**
 * Phone-call CTA used by packages the owner qualifies by phone (Bonfire
 * Bash, The Sunset for Two). Renders as a tel: anchor styled like the
 * other primary buttons; mobile devices open the dialer, desktops route
 * to the user's default phone handler.
 */
export function CallToBookButton({
  packageKey,
  variant = "primary",
  fullWidth = false,
  className = "",
  children = "Call to Book",
  "aria-label": ariaLabel,
  ...rest
}: CallToBookButtonProps) {
  const variantClass =
    variant === "secondary"
      ? "btn-secondary"
      : variant === "ghost"
        ? "btn-ghost"
        : "btn-primary";

  const classes = [variantClass, fullWidth ? "w-full" : "", className]
    .filter(Boolean)
    .join(" ");

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    captureEvent("call_to_book_clicked", {
      package_key: packageKey,
      variant,
      location:
        typeof window !== "undefined" ? window.location.pathname : undefined,
    });
    if (typeof rest.onClick === "function") rest.onClick(e);
  }

  return (
    <a
      href={SITE.phoneHref}
      aria-label={ariaLabel}
      className={classes}
      {...rest}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
