import MainPageData from '@/app/[[...slug]]';
import * as All from '@/element/common/elmntbase';
import { getBaseInfo } from '@/lib/service/config';
import { cookies } from 'next/headers';
import styles from './styles/footer.module.css';

export default async function Footer() {
  const config = await getBaseInfo();
  let pdata: any = null;
  let langpdata: any = null;

  const cookieStore = await cookies();
  let url = cookieStore.get('pathname')?.value ?? '';

  if (url && !url.endsWith('/')) url += '/';

  if (config?.footer?.footerpage) {
    pdata = config?.pages?.find((pg: any) => pg?.uid == config?.footer?.footerpage);
    langpdata = config?.pages?.find((pg: any) => pg?.slugurl == url);

    if (pdata && langpdata && pdata?.sys_language_uid != langpdata?.sys_language_uid) {
      pdata = config?.pages?.find((pg: any) =>
        pg?.l10n_parent == config?.footer?.footerpage &&
        pg?.sys_language_uid == langpdata?.sys_language_uid
      );
    }
  }

  return (
    <footer className={styles.footer}>

      {config?.footer?.footerpage ? <MainPageData pdata={pdata} /> : null}

      {config?.footer?.copyright &&
        <div className={styles.copyWrap}>
          <p className={styles.copyText}>{config?.footer?.copyright}</p>
        </div>
      }

      <All.ShowGoToTop />

    
    </footer>
  );
}
