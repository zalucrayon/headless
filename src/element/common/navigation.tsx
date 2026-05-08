"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useConfig } from "./ConfigProvider";

export default function Navigation() {
  const config = useConfig();
  const [mmenuopen, setMenuOpen] = useState(false);
  const [fmenu, setFmenu] = useState(null);
  const [smenu, setSmenu] = useState(null);
  const [lmmenuopen, setLMenuOpen] = useState(false);
  const [activlang, setActivelang] = useState<any>(null);
  const [currentMenu, setcurrentMenu] = useState<any>(null);
  const url = usePathname();

  const langchange = async (e: any, lang: any) => {
    setLMenuOpen(false);
    config.activelang = lang;
    updateConfig(url);
  }
  const setActiveMenu = (e: any, i: any) => {
    e.preventDefault();
    if (fmenu == i) {
      setFmenu(null);
    } else {
      setFmenu(i);
    }
    setSmenu(null);
  }
  const setActiveSubMenu = (e: any, i: any, k: any) => {
    e.preventDefault();
    setSmenu(i);
    if (smenu == k) {
      setSmenu(null);
    } else {
      setSmenu(k);
    }
  }
  const updateConfig = async (url: any) => {
    setLMenuOpen(false);
    const url_language = url?.split('/')[1];
    if (config?.langmenu?.show_menu) {
      let _mlang = await getmatchlang(config, url_language);
      if (_mlang) {
      } else {
        _mlang = await getmatchlang(config, "");
      }
      setcurrentMenu(config?.menu[_mlang?.typo3Language]);
      config.activelang = _mlang;
      setActivelang(_mlang);
    } else {
      setcurrentMenu(config?.menu[0]);
      config.activelang = 0;
      setActivelang(0);
    }
  }

  const getmatchlang = async (config: any, url_language: any) => {
    const matchedLang = config?.langmenu?.langm?.find((_lm: any) => {
      const lng = _lm?.path?.split('/')[1];
      return lng === url_language;
    });
    return matchedLang || null;
  }

  const getLangugeUrl = (_mn: any) => {
    const url_language = url?.split('/')[1];
    const matchedLang = config?.langmenu?.langm?.find((_lm: any) => {
      const lng = _lm?.path?.split('/')[1];
      return lng === url_language;
    });
    const _m = matchedLang || null;
    if (_m) {
      const _furl = url.replace(_m.path.replace(/\/$/, ''), "");
      const _pagedata = config?.pages?.find((pg: any) => {
        return pg?.slug === _furl;
      });
      const oid = _pagedata?.l10n_parent;
      let _fdat = null;
      if (_mn?.uid == 0) {
        _fdat = config?.pages?.find((pg: any) => {
          return pg?.uid === oid;
        });
      } else {
        _fdat = config?.pages?.find((pg: any) => {
          return pg?.l10n_parent === oid && pg?.sys_language_uid === _mn?.uid;
        });
      }
      if (_fdat) {
        return _fdat?.slugurl;
      } else {
        return _mn?.path;
      }
    } else {
      const _pagedata = config?.pages?.find((pg: any) => {
        return pg?.slug === url;
      });
      const _fdat = config?.pages?.find((pg: any) => {
        return pg?.l10n_parent === _pagedata?.uid && pg?.sys_language_uid === _mn?.uid;
      });
      if (_fdat) {
        return _fdat?.slugurl;
      } else {
        return _mn?.path;
      }
    }
    return _mn?.path;
  }

  useEffect(() => {
    updateConfig(url);
  }, []);

  return (
    <>
      <div className="flex items-center order-5 lg:order-2 demo">
        <button data-collapse-toggle="mobile-menu-2" type="button" className="my-2 inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={(e) => setMenuOpen(!mmenuopen)}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
          <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </button>
      </div>
      {currentMenu?.length > 0 ?
        <div className={"justify-between items-center w-full order-5  lg:flex lg:w-auto lg:order-2 custom_menu " + (mmenuopen ? "" : " hidden")} >
          <ul className="z-10 flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 mainmenu">
            {currentMenu?.map((menu: any, k: any) => (
              menu?.detail?.slug ?
                <li key={menu?.uid + k + k + menu?.detail?.title + new Date().getTime()} className={menu?.child?.length > 0 ? 'child relative py-4 px-2  ' : 'py-4 px-2  '}>
                  <Link
                    className="block rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 dark:text-white flex justify-between text-[17px]"
                    aria-label={menu?.detail?.slugurl}
                    href={menu?.detail?.slugurl}>
                    <span>{menu?.detail?.nav_title !== '' ? menu?.detail?.nav_title : menu?.detail?.title}</span>
                    {menu?.child?.length > 0 ? <svg className={`mmneu w-2.5 h-2.5 ms-2.5 my-[auto] mx-[10px] lvl1 ${fmenu == k ? 'inverse' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"
                      onClick={(e) => {
                        mmenuopen ?
                          setActiveMenu(e, k)
                          : null
                      }}
                    >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg> : null}</Link>

                  {menu?.child?.length > 0 ?
                    <ul className={`z-10 level-first lg:absolute top-[56px] bg-slate-100 min-w-[150px] left-[0px] ${fmenu == k ? '' : 'hidden'} pt-[8px] pb-[8px] border-[1px] rounded`}>
                      {menu?.child?.map((child: any, i: any) => (
                        <li key={menu?.uid + i + menu?.detail?.title + new Date().getTime() + child?.uid} className={child?.child?.length > 0 ? "children p-[10px]  px-[20px] chilld relative" : "children p-[10px] px-[20px]"}>
                          {child?.detail?.slug ?
                            <Link
                              className="block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white flex justify-between "
                              aria-label={child?.detail?.slugurl}
                              href={child?.detail?.slugurl}  >
                              <span>{child?.detail?.nav_title !== '' ? child?.detail?.nav_title : child?.detail?.title}</span>
                              {child?.child?.length > 0 ? <svg className={`mmneu w-2.5 h-2.5 ms-2.5 my-[auto] mx-[10px] lvl2 ${smenu == i ? 'inverse' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" onClick={(e) => {
                                mmenuopen ?
                                  setActiveSubMenu(e, k, i)
                                  : null
                              }}>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                              </svg> : null}</Link>
                            : null}
                          {child?.child?.length > 0 ?
                            <ul className={`level-sec  lg:absolute top-0 bg-slate-100  p-[10px] min-w-[150px] left-[148px] ${smenu == i ? '' : 'hidden'} pt-[8px] pb-[8px] border-[1px] rounded`}>
                              {child?.child?.map((_child: any, index: any) => (
                                <li key={i + child?.uid + index + _child?.uid + _child?.detail?.title + new Date().getTime() + _child?.uid} className="children-level p-[10px] px-[15px]">
                                  {_child?.detail?.slug ?
                                    <Link
                                      className="block py-2 pr-4 pl-3  rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                                      aria-label={_child?.detail?.slugurl}
                                      href={_child?.detail?.slugurl} >
                                      <span>{_child?.detail?.nav_title !== '' ? _child?.detail?.nav_title : _child?.detail?.title}</span></Link>
                                    : null}
                                </li>
                              ))}
                            </ul>
                            : null}
                        </li>
                      ))}
                    </ul>
                    : null}
                </li>
                : null
            ))}
          </ul>
        </div>
        : null}
      {config?.langmenu?.show_menu ?
        config?.langmenu?.langm?.length > 0 ?
          <div className="lang-wrapper order-1 lg:order-2 relative mt-auto mb-auto align-middle" >
            {activlang ?

              <button className=" font-medium rounded-lg text-sm text-center  items-center flex flex-wrap items-center " type="button">
                {config?.langmenu?.pattern == "flag" ?
                  <span className="flex justify-center items-center ">
                    <Image
                      priority
                      blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                      src={'/Flags/' + activlang?.flagIdentifier?.replace('flags-', '') + '.webp'}
                      alt={"active" + activlang?.navigationTitle}
                      width={32}
                      height={32}
                      
                    />
                  </span>
                  : config?.langmenu?.pattern == "title_flag" ?
                    <span className="flex flex-row justify-between items-center">
                      <span className="flex text-[17px]">{activlang?.navigationTitle ? activlang?.navigationTitle : activlang?.title}
                      </span>
                      <span className="flex ml-2 ">
                        <Image
                          priority
                          blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                          src={'/Flags/' + activlang?.flagIdentifier?.replace('flags-', '') + '.webp'}
                          alt={"active" + activlang?.navigationTitle}
                          width={32}
                          height={32}
                          
                        />
                      </span>
                    </span>
                    : config?.langmenu?.pattern == "flag_title" ?
                      <span className="flex flex-row justify-between items-center">
                        <span className="flex">
                          <Image
                            priority
                            blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                            src={'/Flags/' + activlang?.flagIdentifier?.replace('flags-', '') + '.webp'}
                            alt={"active" + activlang?.navigationTitle}
                            width={32}
                            height={32}
                            
                          />
                        </span>
                        <span className="flex ml-2 text-[17px]">{activlang?.navigationTitle ? activlang?.navigationTitle : activlang?.title}</span>
                      </span>
                      : <span className="text-[17px]">{activlang?.navigationTitle ? activlang?.navigationTitle : activlang?.title}</span>
                }
                {
                 config?.langmenu?.langm?.length > 1 ?
                    <svg className={`w-2.5 h-2.5 ms-3 ${lmmenuopen ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"
                      onClick={(e) => setLMenuOpen(!lmmenuopen)}>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                    : null
                }
              </button>
              : <div className="text-center  items-center flex flex-wrap items-center">Loading...</div>}
            {
             config?.langmenu?.langm?.length > 1 ?
                <ul className={`w-max right-0 z-10 level-first absolute top-[40px] bg-slate-100 left-[0px]  ${lmmenuopen ? '' : 'hidden'} border-[1px] rounded`}>
                  {config?.langmenu?.langm?.map((_mn: any, index: any) => (
                    activlang?.uid !== _mn?.languageId ?
                      <li key={_mn?.typo3Language + index} className="p-[10px] px-[20px] ">
                        <Link href={getLangugeUrl(_mn)} onClick={(e) => langchange(e, _mn)}>
                          {config?.langmenu?.pattern == "flag" ?
                            <span className="flex justify-center items-center">
                              <Image
                                priority
                                blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                                src={'/Flags/' + _mn?.flagIdentifier?.replace('flags-', '') + '.webp'}
                                alt={_mn?.navigationTitle}
                                width={32}
                                height={32}
                              />
                            </span>
                            : config?.langmenu?.pattern == "title_flag" ?
                              <span className="flex flex-row justify-between items-center">
                                <span className="flex text-[17px]">{_mn?.navigationTitle ? _mn?.navigationTitle : _mn?.title}
                                </span>
                                <span className="flex ml-2">
                                  <Image
                                    priority
                                    blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                                    src={'/Flags/' + _mn?.flagIdentifier?.replace('flags-', '') + '.webp'}
                                    alt={_mn?.navigationTitle}
                                    width={32}
                                    height={32}
                                  />
                                </span>
                              </span>
                              : config?.langmenu?.pattern == "flag_title" ?
                                <span className="flex flex-row justify-between items-center">
                                  <span className="flex text-[17px]">
                                    <Image
                                      priority
                                      blurDataURL={`${process.env.NEXT_PUBLIC_DATA_BLUR_URL}`}
                                      src={'/Flags/' + _mn?.flagIdentifier?.replace('flags-', '') + '.webp'}
                                      alt={_mn?.navigationTitle}
                                      width={32}
                                      height={32}
                                    />
                                  </span>
                                  <span className="flex ml-2 text-[17px]">{_mn?.navigationTitle ? _mn?.navigationTitle : _mn?.title}
                                  </span>
                                </span>
                                : <span className="text-[17px]">{_mn?.navigationTitle ? _mn?.navigationTitle : _mn?.title}</span>
                          }
                        </Link>
                      </li>
                      : null
                  ))}
                </ul>
                : null
            }
          </div>
          : null
        : null}
    </>
  )
}
