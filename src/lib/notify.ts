export async function notify(url: string | undefined, payload: unknown) {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    // The message is already saved; a failed notification must not break the form.
  }
}