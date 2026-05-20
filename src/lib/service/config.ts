let CONFIG: any = null;
export const dummy = true;
export async function getBaseInfo() {
  try {
    if (CONFIG) return CONFIG;
    const baseUrl = typeof window !== 'undefined' ? '/api-proxy/' : String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE);
    const _url: any = baseUrl + 'config';
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
