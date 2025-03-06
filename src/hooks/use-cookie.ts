import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document, {
    subtree: true,
    childList: true,
    attributes: true,
  });
  return () => observer.disconnect();
}

function getServerSideSnapshot() {
  return undefined;
}

function getCookieValue(name: string) {
  const cookies = document.cookie
    .split("; ")
    .reduce<Record<string, string>>((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
  return cookies[name] || "";
}

export function useCookie(cookieName: string) {
  return useSyncExternalStore(
    subscribe,
    () => getCookieValue(cookieName),
    getServerSideSnapshot,
  );
}
