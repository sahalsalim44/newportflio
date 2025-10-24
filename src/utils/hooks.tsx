"use client";

import {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useContext,
} from "react";

type Variants = "DEFAULT" | "PROJECT" | "BUTTON" | "TEXT";

interface ContextProps {
  variant: Variants;
  setVariant: Dispatch<SetStateAction<Variants>>;
}

const Context = createContext<ContextProps>({
  variant: "DEFAULT",
  setVariant: () => {},
});

const VariantProvider = ({ children }: { children: ReactNode }) => {
  const [variant, setVariant] = useState<Variants>("DEFAULT");

  return (
    <Context.Provider value={{ variant, setVariant }}>
      {children}
    </Context.Provider>
  );
};

const useVariants = () => {
  const { setVariant, variant } = useContext(Context);

  return { variant, setVariant };
};

interface MediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

function useMediaQuery(query: string, options?: MediaQueryOptions): boolean {
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

export { useMediaQuery, useVariants, VariantProvider };
