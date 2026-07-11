export const RESTORE_HOME_FLAG = "restoreHomeScroll";

export function scrollKey(path) {
  const base = path.split("?")[0].split("#")[0] || "/";
  return `scroll:${base}`;
}

export function saveCurrentScroll() {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    scrollKey(window.location.pathname),
    String(window.scrollY)
  );
}
