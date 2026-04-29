// app/sitemap.js

// 👉 Ideally move this to a separate file and import it
const ALL_PRODUCTS = [
  "stainless-steel-insulation-gasket-kits",
  "parker-8-6-hbz-ss-reducing-union",
  "corten-steel-panels",
  "forged-stainless-steel-tube-union-elbow",
  "nipo-flanges",
  "slip-on-flanges",
  "ring-type-joint-flanges",
  "spectacle-blind-flanges",
  "din-flanges",
  "threaded-flanges",
  "blind-flanges",
  "body-flanges",
  "awwa-flanges",
  "long-weld",
  "weld-neck-flanges",
  "ansi-b16-28-swage-nipple",
  "astm-a403-stainless-steel-reducing-tee",
  "ansi-b16-28-5d-6d-pipe-bend",
  "asme-ansi-b16-9-barred-tee",
  "cross-reducers",
  "ansi-b16-28-stainless-steel-cross-tee",
  "ansi-b16-9-forged-concentric-reducer",
  "astm-a234-wp11-pipe-reducing-tee",
  "elbow-outlet-pipe-fittings",
  "stainless-steel-threaded-outlets",
  "astm-a182-flange-outlets",
  "astm-a182-nipple-outlet",
  "astm-a182-nipple-outlets",
  "forged-cross-pipe-fitting",
  "forged-cross-pipe-fittings",
  "astm-a325-u-bolts",
  "astm-a325-fasteners",
  "astm-a325-eye-bolts",
  "stainless-steel-anchor-foundation-bolts",
  "astm-a325-washers",
  "astm-a193-b7-stud-bolts",
  "astm-a325-heavy-hex-nuts",
  "astm-a325-hex-bolts",
  "customized-stainless-steel-refractory-anchors",
  "u-type-refractory-anchors",
  "stainless-steel-y-type-refractory-anchors",
  "v-shaped-refractory-anchors",
  "customized-stainless-steel-and-carbon-steel-forgings",
  "stainless-steel-and-carbon-steel-propeller-shafts-forged-round-bars",
  "astm-a105-carbon-steel-rotor-shafts",
  "carbon-steel-forged-rings-astm-a105",
  "stainless-steel-graphite-filler-gaskets",
  "ss-316-and-high-nickel-octagonal-ring-type-joint-gaskets",
  "alloy-20-and-stainless-steel-ring-type-joint-gaskets",
  "spiral-wound-gaskets",
  "sheets-plates-coils",
  "rods-bars-wires",
  "copper-tubes",
  "brass-tubes",
  "cupronickel",
  "cap",
  "stub-end",
  "seamless-pipes",
  "welded-pipes",
  "erw-pipes",
  "electro-polished-pipes",
  "efw-pipes",
];

export default function sitemap() {
  const baseUrl = "https://www.ratnamikmetal.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic product pages
  const productPages = ALL_PRODUCTS.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}