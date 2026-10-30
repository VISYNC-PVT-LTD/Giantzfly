"use client";

import { createContext, useContext } from "react";
import { normalizeSiteSettings } from "@/lib/settings-normalize.mjs";
import type { SiteSettings } from "@/lib/settings";

const ContactSettingsContext = createContext<SiteSettings>(normalizeSiteSettings(null));

export function ContactSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <ContactSettingsContext.Provider value={settings}>
      {children}
    </ContactSettingsContext.Provider>
  );
}

export function useContactSettings() {
  return useContext(ContactSettingsContext);
}
