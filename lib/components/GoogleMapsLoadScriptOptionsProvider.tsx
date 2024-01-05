import React from "react";

const GoogleMapsLoaderConfigContext = React.createContext<UseLoadScriptOptions | null>(null);

export const GoogleMapsLoadScriptOptionsProvider = (props: {
  children: React.ReactNode;
  loadScriptOptions: UseLoadScriptOptions;
}) => {
  const { children, loadScriptOptions } = props;

  return (
    <GoogleMapsLoaderConfigContext.Provider value={loadScriptOptions}>
      {children}
    </GoogleMapsLoaderConfigContext.Provider>
  );
};

const useLoadScriptOptions = () => {
  const loadScriptOptions = React.useContext(GoogleMapsLoaderConfigContext);

  if (!loadScriptOptions) {
    throw new Error(
      "useLoadScriptOptions must be used within a GooglaMapsLoadScriptOptionsProvider"
    );
  }

  return loadScriptOptions;
};

export { useLoadScriptOptions };

export declare type Library = "core" | "maps" | "places" | "geocoding" | "routes" | "marker" | "geometry" | "elevation" | "streetView" | "journeySharing" | "drawing" | "visualization";
export declare type Libraries = Library[];


interface LoadScriptUrlOptions {
  googleMapsApiKey: string | "";
  googleMapsClientId?: string | undefined;
  version?: string | undefined;
  language?: string | undefined;
  region?: string | undefined;
  libraries?: Libraries | undefined;
  channel?: string | undefined;
  mapIds?: string[] | undefined;
  authReferrerPolicy?: 'origin' | undefined;
}
interface UseLoadScriptOptions extends LoadScriptUrlOptions {
  id?: string | undefined;
  nonce?: string | undefined;
  preventGoogleFontsLoading?: boolean | undefined;
}