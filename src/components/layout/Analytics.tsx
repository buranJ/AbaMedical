import Script from "next/script";

export function Analytics() {
  const googleId = process.env.NEXT_PUBLIC_GA_ID;
  if (!googleId) return null;
  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleId}`} strategy="afterInteractive" />
    <Script id="aba-google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${googleId}',{anonymize_ip:true});`}</Script>
  </>;
}
