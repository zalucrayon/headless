let CONFIG: any = null;
export const dummy = true;
export async function getBaseInfo() {
  try {
    console.log("file call");
    if (CONFIG) return CONFIG;
    const _url: any = String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE) + 'config';
    const res = await fetch(_url);
    if (!res.ok) {
      CONFIG = { "error": "Failed to fetch Data !" }
    }
    CONFIG = await res.json();
    return CONFIG;
  } catch (error) {
    CONFIG = { "error": "Failed to fetch Data !" }
    return CONFIG;
  }
}
