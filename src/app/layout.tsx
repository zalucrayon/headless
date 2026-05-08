import "./globals.css";
import { ReactNode } from "react";
import { getBaseInfo } from "@/lib/service/config";
import { ConfigProvider } from "@/element/common/ConfigProvider";
import Error from "@/element/common/error";


export async function generateMetadata() {
  const config = await getBaseInfo();
  const favicon = (process.env.NEXT_PUBLIC_SERVER + config?.header?.favicon?.public) || '/images/icon.png';
  return {
    icons: {
      icon: favicon
    },
    title: process.env.NEXT_PUBLIC_DEFAULTTITLE,
  }
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const NEXT_PUBLIC_SERVER = process.env.NEXT_PUBLIC_SERVER;
  const NEXT_PUBLIC_API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const config = await getBaseInfo();

  return (
    <html lang="en">
      <body >
        {
          !NEXT_PUBLIC_SERVER || !NEXT_PUBLIC_API_BASE || config?.error ?
            <Error message={"Please configure headless in typo3 & run command!!"} />
            :
            <ConfigProvider config={config}>
              {children}
            </ConfigProvider>
        }
      </body>
    </html>
  );
}