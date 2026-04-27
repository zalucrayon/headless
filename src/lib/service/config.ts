let CONFIG: any = null;

export async function getBaseInfo() {
  try {
    if (CONFIG) return CONFIG; 
    let _url: any = String(process.env.NEXT_PUBLIC_SERVER) + String(process.env.NEXT_PUBLIC_API_BASE) + 'config'; 
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
