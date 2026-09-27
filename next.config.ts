import type { NextConfig } from "next";

const redirectMap: Record<string, string> = {
  "/surgery": "/catalog/surgery", "/electrosurgery": "/catalog/surgery/electrosurgery", "/suturematerials": "/catalog/surgery/suture-materials", "/staplingtools": "/catalog/surgery/stapling-tools", "/racks": "/catalog/surgery/laparoscopic-racks",
  "/cardiology": "/catalog/cardiology", "/pacemaker": "/catalog/cardiology/pacemakers", "/interventionalsurgery": "/catalog/cardiology/interventional-surgery", "/coronary": "/catalog/cardiology/interventional-surgery/coronary", "/cornarystent": "/catalog/cardiology/interventional-surgery/coronary/coronary-stents", "/cornaryconductors": "/catalog/cardiology/interventional-surgery/coronary/coronary-guidewires", "/cornaryballoons": "/catalog/cardiology/interventional-surgery/coronary/coronary-balloons", "/peripheral": "/catalog/cardiology/interventional-surgery/peripheral", "/peripheralstent": "/catalog/cardiology/interventional-surgery/peripheral/peripheral-stents", "/peripheralconductors": "/catalog/cardiology/interventional-surgery/peripheral/peripheral-guidewires", "/peripheralpre": "/catalog/cardiology/interventional-surgery/peripheral/vascular-closure", "/peripheralballoons": "/catalog/cardiology/interventional-surgery/peripheral/peripheral-balloons", "/electrophysiology": "/catalog/cardiology/electrophysiology", "/ablation": "/catalog/cardiology/electrophysiology/ablation", "/diagnostics": "/catalog/cardiology/electrophysiology/diagnostics",
  "/diabetsmellitus": "/catalog/diabetes", "/neurosurgery": "/catalog/neurosurgery", "/anesthesiology": "/catalog/anesthesiology", "/deal": "/payment",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  allowedDevOrigins: ["127.0.0.1"],
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90, 95] },
  async redirects() {
    return [
      ...Object.entries(redirectMap).map(([source, destination]) => ({ source, destination, permanent: true })),
      { source: "/:section/tproduct/:slug*", destination: "/catalog/product/:slug*", permanent: true },
      { source: "/tproduct/:slug*", destination: "/catalog/product/:slug*", permanent: true },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "X-Frame-Options", value: "SAMEORIGIN" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ] }];
  },
};

export default nextConfig;
