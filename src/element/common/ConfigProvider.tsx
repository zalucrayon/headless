'use client';
import { createContext, useContext } from 'react';
export const ConfigContext = createContext<any>(null);
export const useConfig = () => useContext(ConfigContext);
export function ConfigProvider({ config, children }: { config: any; children: React.ReactNode }) {
    return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}
