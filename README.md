# KisanProcure

## Smart Procurement & Queue Management

**Smart India Hackathon 2026 Prototype**  
**Problem Statement ID:** SIH26032  
**Theme:** Smart Automation  
**Category:** Software  
**Prototype Nature:** Functional Demo Prototype (Simulated Procurement Environment)  
**Repository:** [https://github.com/iparayush/KISAN-MARKET-BOOK-.git](https://github.com/iparayush/KISAN-MARKET-BOOK-.git)

---

## 1. Problem Statement

Across India's agricultural mandis and MSP procurement centres, farmers face severe bottlenecks:
- **Unpredictable Physical Waiting Times:** Farmers routinely wait 12 to 48 hours with loaded tractors and bullock carts outside procurement gates.
- **Traffic Congestion & Spoilage:** Long lines cause road blockages, physical fatigue, and exposure of perishable harvests to adverse weather.
- **Zero Real-Time Queue Visibility:** Farmers have no way of knowing whether a mandi is running at capacity or if alternative centres nearby have open slots.
- **Opacity Across Procurement Stages:** Lack of digital milestone tracking between arrival, document verification, quality grading, weighing, and Direct Benefit Transfer (DBT) disbursement.

---

## 2. Proposed Solution

**KisanProcure** is a smart digital procurement and queue management platform designed to replace unorganized physical lines with an intelligent intake pipeline:
- **Smart Centre Recommendation:** Algorithmic ranking of nearby procurement centres based on travel distance, current queue depth, active counters, and available processing slots.
- **Intelligent Slot Booking:** Farmers schedule designated intake windows (e.g. 10:30 AM), flattening peak morning arrival spikes.
- **Digital Gate Entry Token:** Farmers receive a verified digital entry pass (e.g. `KP-104`) eliminating the need to wait in line physically.
- **Real-Time Live Queue Tracking:** Farmers monitor currently served tokens (e.g. `KP-097`), ahead counts, and dynamic wait estimations on their mobile devices.
- **End-to-End Procurement Transparency:** Multi-stage lifecycle tracking from Gate Arrival to Document Verification, Assay Quality Check, Electronic Weighbridge, Acceptance, Bill Generation, and Payment Credit.

---

## 3. Key Features

- **Mobile-First Public Service UI:** Accessible, touch-friendly interface designed for mobile viewports (320px–767px) with bottom navigation, plus centered responsive desktop layout.
- **Strict Public Service Design System:** Primary Yellow/Amber (`#d97706` / `#eab308`), Secondary Green (`#16a34a`), neutral background, dark charcoal typography, and zero emojis.
- **Centralized Client State Engine:** Fully connected state machine managing queue advancement, lifecycle transitions, and automatic bill calculations without external database latency.
- **Queue Simulator:** Interactive gate-advance simulator allowing evaluators to step through token calls from `KP-097` to `KP-104`.
- **SIH Judge Presentation Mode (`/presentation`):** Step-by-step interactive 12-stage guided walkthrough allowing hackathon judges to evaluate the entire pipeline in under 3 minutes.
- **Demo Control Panel (`/demo-controls`):** Quick simulation controls to reset state, advance queue, jump across any of the 9 procurement stages, or run an automated demo loop.
- **Trilingual Localization:** Built-in language switching support for English, Marathi (मराठी), and Hindi (हिन्दी).
- **Vercel Zero-Config Deployment:** 100% static/SSR compatible Next.js build requiring zero API keys, secrets, or database configuration.

---

## 4. Complete Demo Workflow

```
FARMER REGISTRATION
       |
       v
CROP REGISTRATION (Wheat, 450 kg, 24 Sep 2026)
       |
       v
SMART CENTRE RECOMMENDATION (Kisan Procurement Centre - 4.2 km)
       |
       v
SLOT BOOKING (10:30 AM Intake Window)
       |
       v
DIGITAL TOKEN GENERATION (KP-104 Issued)
       |
       v
LIVE QUEUE TRACKING (Serving KP-097 -> Ahead: 7 -> Wait: 32 min)
       |
       v
SIMULATE NEXT TOKEN (Advances to KP-104)
       |
       v
ARRIVAL AT MANDI (Stage: ARRIVED)
       |
       v
DOCUMENT VERIFICATION (Identity & 7/12 Land Record: VERIFIED)
       |
       v
QUALITY ASSAY CHECK (Grade-A FAQ, Moisture 11.8%: PASSED)
       |
       v
ELECTRONIC WEIGHING (Gross - Tare = 448 kg Net: VERIFIED)
       |
       v
PROCUREMENT ACCEPTANCE (Accepted at MSP Rs 2,275/qtl: ACCEPTED)
       |
       v
BILL & RECEIPT GENERATION (Total Payable: Rs 10,192)
       |
       v
PAYMENT DISBURSEMENT (Simulated DBT Transfer: PAID)
```

---

## 5. Screen Catalog

The application includes 24 fully connected routes:

| Route | Screen Name | Key Purpose |
| :--- | :--- | :--- |
| `/` | Landing Screen | Platform introduction, core features, CTAs |
| `/login` | Demo Farmer Login | 1-click authentication with pre-filled demo farmer profile |
| `/home` | Farmer Dashboard | Today's appointment card, live queue status, quick actions |
| `/crop` | Crop Registration | Form for commodity, quantity in kg, and harvest date |
| `/centres` | Centre Discovery | Algorithmic centre recommendation cards with distance & queue metrics |
| `/slots` | Slot Selection | 10:30 AM optimal recommendation and alternative intake slots |
| `/booking` | Booking Confirmation | Appointment reservation summary before pass issuance |
| `/token` | Digital Token | High-contrast digital entry pass (`KP-104`) with gate instructions |
| `/queue` | Live Queue & Simulation | Interactive queue board with "Simulate Next Token" button |
| `/arrival` | Gate Arrival | Mandi geofence arrival check-in action |
| `/verification` | Document Verification | 7/12 land records and Aadhaar authentication status |
| `/quality` | Quality Assay | Moisture percentage and Fair Average Quality (FAQ) grading |
| `/weighing` | Electronic Weighbridge | Gross, tare, and net accepted weight verification |
| `/procurement` | Procurement Acceptance | Official mandi acceptance card and 9-stage stepper |
| `/bill` | Procurement Receipt | Calculated purchase voucher with MSP rates and DBT total |
| `/payment` | Payment Tracking | Simulated DBT milestone status and UTR transaction reference |
| `/notifications` | Notifications | Chronological procurement and queue alert feed |
| `/bookings` | My Bookings | Active appointment ledger and token shortcut |
| `/history` | Procurement History | Historic procurement records and printable receipts |
| `/profile` | Farmer Profile | Farmer details, district, and account preferences |
| `/help` | Help & FAQ | 5 core questions covering slot booking, tokens, and payments |
| `/about` | About KisanProcure | SIH 2026 Problem Statement 26032 project metadata |
| `/workflow` | Visual Workflow | Step-by-step graphical architecture pipeline |
| `/presentation` | Judge Presentation Mode | 12-step guided interactive walkthrough for hackathon evaluators |
| `/demo-controls` | Demo Controls | State reset, stage jumper, and simulation triggers |

---

## 6. Technology Stack

- **Framework:** Next.js (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Icons:** Lucide React (Zero emojis used)
- **State Management:** React Context (`DemoContext.tsx`) + Pure State Engine (`demoEngine.ts`)
- **Deployment Target:** Vercel (Production static build)

---

## 7. Project Structure

```
kisanprocure/
├── package.json           # Monorepo scripts (delegates to frontend & backend)
├── README.md
├── frontend/              # Next.js 16 + React 19 Frontend Web Application
│   ├── .env.example
│   ├── .gitignore
│   ├── next.config.ts
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── tsconfig.json
│   ├── public/
│   └── src/
│       ├── app/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   ├── page.tsx               # Landing screen
│       │   ├── about/page.tsx
│       │   ├── arrival/page.tsx
│       │   ├── bill/page.tsx
│       │   ├── booking/page.tsx
│       │   ├── bookings/page.tsx
│       │   ├── centres/page.tsx
│       │   ├── crop/page.tsx
│       │   ├── demo-controls/page.tsx
│       │   ├── help/page.tsx
│       │   ├── history/page.tsx
│       │   ├── home/page.tsx
│       │   ├── login/page.tsx
│       │   ├── notifications/page.tsx
│       │   ├── payment/page.tsx
│       │   ├── presentation/page.tsx
│       │   ├── procurement/page.tsx
│       │   ├── profile/page.tsx
│       │   ├── quality/page.tsx
│       │   ├── queue/page.tsx
│       │   ├── slots/page.tsx
│       │   ├── token/page.tsx
│       │   ├── verification/page.tsx
│       │   ├── weighing/page.tsx
│       │   └── workflow/page.tsx
│       ├── components/
│       │   ├── AppShell.tsx           # Responsive container, desktop sidebar, mobile nav
│       │   ├── BookingCard.tsx
│       │   ├── BottomNavigation.tsx   # Mobile 5-tab bar (HOME, BOOK, QUEUE, TRACK, MORE)
│       │   ├── CentreCard.tsx
│       │   ├── DisclaimerBanner.tsx   # "Functional Demo Prototype" notice
│       │   ├── EmptyState.tsx
│       │   ├── Header.tsx             # Brand header, Demo Mode badge, language switcher
│       │   ├── PageHeader.tsx
│       │   ├── PrimaryButton.tsx      # Accessible >= 44px buttons
│       │   ├── ProcurementTimeline.tsx # 9-stage interactive lifecycle stepper
│       │   ├── QueueCard.tsx          # Real-time token queue with visual sequence ribbon
│       │   ├── SlotCard.tsx
│       │   ├── StatusBadge.tsx
│       │   └── TokenCard.tsx          # Visual entry token pass
│       ├── context/
│       │   └── DemoContext.tsx        # Centralized state provider & auto-demo timer
│       ├── data/
│       │   └── demoData.ts            # Canonical seed data, stages, centres, and dictionaries
│       └── lib/
│           └── demoEngine.ts          # Pure state transformations & billing calculators
└── backend/               # Node.js + Express API Service
```

---

## 8. Local Installation

Ensure you have **Node.js v18.18+** or **Node.js v20+** installed:

```bash
# Clone the repository
git clone https://github.com/iparayush/KISAN-MARKET-BOOK-.git
cd kisanprocure

# Install dependencies for both root and frontend
npm install
npm --prefix frontend install
```

---

## 9. Development

To start the local development server from root:

```bash
npm run dev
# or
npm --prefix frontend run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 10. Production Build

To build the optimized static production bundle:

```bash
npm run build
# or
npm --prefix frontend run build
```

To run the production server locally:

```bash
npm start
# or
npm --prefix frontend run start
```

---

## 11. Vercel Deployment

This project supports seamless deployment on **Vercel**:

### Option A: Set Root Directory to `frontend` (Recommended on Vercel)
1. In Vercel, import the repository `https://github.com/iparayush/KISAN-MARKET-BOOK-.git`.
2. Under **Root Directory**, click **Edit** and choose `frontend`.
3. Framework Preset will auto-detect as **Next.js**.
4. Click **Deploy**.

### Option B: Deploy from Repository Root
1. Leave **Root Directory** as `./`.
2. Vercel automatically runs `npm run build` which delegates to `npm --prefix frontend run build`.
3. Click **Deploy**.

---

## 12. Demo Instructions for Hackathon Judges

To evaluate the complete farmer procurement flow within 3 minutes:

1. Open the deployed application URL.
2. Click **Try Demo** on the landing screen.
3. On the **Demo Farmer Login** screen, click **Continue Demo**.
4. Review the **Farmer Dashboard** showing today's appointment card, live queue preview, and quick actions.
5. Click **Book Slot** (or navigate to `/crop`), verify the pre-filled 450 kg Wheat harvest details, and click **Continue**.
6. On **Find Procurement Centre**, observe the **Recommended** badge on Kisan Procurement Centre (based on 4.2 km distance, 12 in queue, and 3 active counters). Click **Select Centre**.
7. Select the recommended **10:30 AM** slot and click **Book This Slot**.
8. On **Booking Confirmed**, click **Generate Digital Token**.
9. View your assigned **Digital Token (`KP-104`)**. Click **View Live Queue**.
10. In the **Live Queue** screen, click **Simulate Next Token** multiple times. Watch the served token advance (`KP-097` -> `KP-098` -> `KP-099` -> ... -> `KP-104`), the farmers ahead count decrease to 0, and the wait time update.
11. Click **Proceed to Arrival Check-In**, confirm gate presence, and proceed through **Document Verification**, **Quality Check**, **Weighing**, and **Procurement Acceptance**.
12. Click **Generate Bill** to view the automated receipt (448 kg x Rs 22.75/kg = Rs 10,192).
13. Click **Track Payment** to inspect the simulated Direct Benefit Transfer (DBT) credit status.
14. Alternatively, open **/presentation** at any time to run through the guided 12-step evaluator presentation.

---

## 13. Prototype Limitations

- **Simulated Procurement Environment:** This hackathon prototype uses in-memory client state to guarantee high performance, zero downtime, and instant responsiveness without external API delays.
- **Simulated Financial Transactions:** Payment disbursement is simulated via mock DBT transaction identifiers (`KP-DEMO-2026-104`). No real banking or PFMS APIs are connected.
- **Demo Authentication:** No live SMS gateway or mobile OTP provider is invoked; credentials are pre-configured for evaluation convenience.

---

## 14. Future Scope

1. **Enterprise MongoDB / PostgreSQL Integration:** Persistent cloud data storage for historical multi-season mandi intake records.
2. **e-NAM & National Mandi API Integration:** Direct interoperability with national agriculture market pricing and centralized quota databases.
3. **SMS & IVR Voice Gateway:** Automated multilingual SMS alerts and interactive voice response (IVR) for farmers without smartphones.
4. **Computer Vision Grain Quality Assay:** Camera-based automated grain classification and foreign matter percentage detection using Edge AI.
5. **IoT Electronic Weighbridge Integration:** Direct RS-232 / MQTT sensor integration with physical gross-tare weighbridge scales.
6. **Live PFMS & UPI Payment Rails:** Instant Direct Benefit Transfer settlement directly to verified Jan Dhan / Aadhaar-linked bank accounts.

---

**KisanProcure**  
*Book Smart. Wait Less. Track Everything.*  
Functional SIH 2026 Prototype | Simulated Procurement Environment
