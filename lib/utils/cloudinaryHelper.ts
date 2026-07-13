export function getCloudinaryOgImage(url: string): string {
  if (!url.includes("/upload/")) return url;

  return url.replace(
    "/upload/",
    "/upload/w_1200,h_630,c_fill,g_auto,f_auto,q_auto/"
  );
}