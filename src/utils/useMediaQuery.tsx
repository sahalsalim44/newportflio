import { useState, useEffect } from "react";

interface MediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

export function useMediaQuery(
  query: string,
  options?: MediaQueryOptions
): boolean {
  const [matches, setMatches] = useState<boolean>(
    options?.defaultValue ?? false
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if we're on the client side and component is mounted
    if (typeof window === "undefined" || !mounted) return;

    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    if (options?.initializeWithValue !== false) {
      setMatches(media.matches); // Initialize with initial state
    }

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [query, options, mounted]);

  // Return defaultValue during SSR and before hydration
  if (!mounted) {
    return options?.defaultValue ?? false;
  }

  return matches;
}
