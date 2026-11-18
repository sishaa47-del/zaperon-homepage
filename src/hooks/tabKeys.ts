import type { KeyboardEvent } from "react";

/**
 * Arrow-key navigation for a role="tablist" (automatic activation).
 * Left/Up = previous, Right/Down = next, Home/End = first/last.
 * Moves focus to the newly selected tab inside the same tablist.
 */
export function onTabKeyDown(e: KeyboardEvent<HTMLElement>, index: number, count: number, select: (i: number) => void) {
  let next = -1;
  if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % count;
  else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + count) % count;
  else if (e.key === "Home") next = 0;
  else if (e.key === "End") next = count - 1;
  if (next < 0) return;
  e.preventDefault();
  select(next);
  const tabs = e.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLElement>('[role="tab"]');
  tabs?.[next]?.focus();
}

/**
 * Keep the selected tab visible inside a horizontally scrolling tab row
 * (mobile pill rows) without scrolling the page itself.
 */
export function keepTabVisible(list: HTMLElement | null, index: number, smooth: boolean) {
  const tab = list?.querySelectorAll<HTMLElement>('[role="tab"]')[index];
  if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
  const left = tab.offsetLeft - list.offsetLeft;
  if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth) {
    list.scrollTo({ left: Math.max(0, left - 16), behavior: smooth ? "smooth" : "auto" });
  }
}
