import { getBaseInfo } from "@/lib/service/config";
import Logo from "./logo";
import Navigation from "./navigation";
import Sticky from "./sticky";
import MainPageData from "@/app/[[...slug]]";
import { cookies } from "next/headers";
import styles from "./styles/header.module.css";

export default async function Header() {
  const config = await getBaseInfo();
  let pdata: any = null;
  let langpdata: any = null;

  const cookieStore = await cookies();
  const url = cookieStore.get('pathname')?.value ?? '';

  if (config?.header?.header_top) {
    pdata = config?.pages?.find((pg: any) => pg?.uid == config?.header?.header_top);
    langpdata = config?.pages?.find((pg: any) => pg?.slugurl == url);

    if (pdata && langpdata && pdata?.sys_language_uid != langpdata?.sys_language_uid) {
      pdata = config?.pages?.find((pg: any) =>
        pg?.l10n_parent == config?.header?.header_top &&
        pg?.sys_language_uid == langpdata?.sys_language_uid
      );
    }
  }

  return (
    <header className={styles.header}>
      <Sticky />

      {config?.header?.header_top
        ? <MainPageData pdata={pdata} />
        : (
          <nav className={styles.navbar}>
            <div className={styles.inner}>
              <Logo header={config.header} />
              <Navigation />
            </div>
          </nav>
        )
      }
    </header>
  );
}
