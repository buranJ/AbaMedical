# Карта SEO-миграции

| OLD URL | NEW URL | STATUS |
|---|---|---:|
| `/surgery` | `/catalog/surgery` | 301 |
| `/electrosurgery` | `/catalog/surgery/electrosurgery` | 301 |
| `/suturematerials` | `/catalog/surgery/suture-materials` | 301 |
| `/staplingtools` | `/catalog/surgery/stapling-tools` | 301 |
| `/racks` | `/catalog/surgery/laparoscopic-racks` | 301 |
| `/cardiology` | `/catalog/cardiology` | 301 |
| `/pacemaker` | `/catalog/cardiology/pacemakers` | 301 |
| `/interventionalsurgery` | `/catalog/cardiology/interventional-surgery` | 301 |
| `/coronary` | `/catalog/cardiology/interventional-surgery/coronary` | 301 |
| `/cornarystent` | `/catalog/cardiology/interventional-surgery/coronary/coronary-stents` | 301 |
| `/cornaryconductors` | `/catalog/cardiology/interventional-surgery/coronary/coronary-guidewires` | 301 |
| `/cornaryballoons` | `/catalog/cardiology/interventional-surgery/coronary/coronary-balloons` | 301 |
| `/peripheral` | `/catalog/cardiology/interventional-surgery/peripheral` | 301 |
| `/peripheralstent` | `/catalog/cardiology/interventional-surgery/peripheral/peripheral-stents` | 301 |
| `/peripheralconductors` | `/catalog/cardiology/interventional-surgery/peripheral/peripheral-guidewires` | 301 |
| `/peripheralpre` | `/catalog/cardiology/interventional-surgery/peripheral/vascular-closure` | 301 |
| `/peripheralballoons` | `/catalog/cardiology/interventional-surgery/peripheral/peripheral-balloons` | 301 |
| `/electrophysiology` | `/catalog/cardiology/electrophysiology` | 301 |
| `/ablation` | `/catalog/cardiology/electrophysiology/ablation` | 301 |
| `/diagnostics` | `/catalog/cardiology/electrophysiology/diagnostics` | 301 |
| `/diabetsmellitus` | `/catalog/diabetes` | 301 |
| `/neurosurgery` | `/catalog/neurosurgery` | 301 |
| `/anesthesiology` | `/catalog/anesthesiology` | 301 |
| `/deal` | `/payment` | 301 |
| `/:section/tproduct/:legacySlug` | `/catalog/product/:legacySlug` | 301 (100 URL) |
| `/tproduct/:legacySlug` | `/catalog/product/:legacySlug` | 301 |

Маршруты `/`, `/catalog`, `/blog`, `/services`, `/contacts` сохраняются без redirect. Полный перечень 100 исходных товарных URL хранится рядом с данными каталога и покрывается smoke-тестом.
