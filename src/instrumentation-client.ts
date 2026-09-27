function reportClientError(message: string, source: string) {
  if (process.env.NEXT_PUBLIC_ERROR_MONITORING !== "true") return;
  try {
    const payload = JSON.stringify({ message: message.slice(0, 300), source: source.slice(0, 160), path: window.location.pathname.slice(0, 200) });
    navigator.sendBeacon("/api/errors", new Blob([payload], { type: "application/json" }));
  } catch {
    // Monitoring must never affect the user journey.
  }
}

window.addEventListener("error", (event) => reportClientError(event.message || "Client error", event.filename || "browser"));
window.addEventListener("unhandledrejection", (event) => reportClientError(event.reason instanceof Error ? event.reason.message : "Unhandled promise rejection", "promise"));
