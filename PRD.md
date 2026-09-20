# KisanProcure — Short PRD

### 1. Problem

Farmers face:
* Long waiting at procurement centres
* No clear slot/schedule information
* No live queue visibility
* Uncertainty about procurement/payment status

---

### 2. Solution

**KisanProcure** connects:

**Farmer → Procurement Centre → Government**

Core flow:

**Register → Crop → Smart Centre/Slot → Token → Live Queue → Verification → Quality → Weighing → Procurement → Payment**

---

### 3. Core Features

#### Farmer App
* **OTP Login**: Seamless mobile authentication with Aadhaar & Land (7/12) linkage.
* **Crop & Quantity Registration**: Direct selection of crop varieties, expected yield, and moisture levels.
* **Nearby Centre Search**: Geo-proximity matching to APMC Mandis and PACS procurement centres.
* **Smart Slot Recommendation**: AI/Heuristic workload balancing to suggest optimal low-congestion arrival slots.
* **Digital Token**: Dynamic token and QR/barcode gate pass generation.
* **Live Queue & Estimated Wait**: Real-time position tracking and mathematical wait time estimation.
* **Procurement Status**: Transparent 8-stage progress tracker from arrival to acceptance.
* **Payment Status**: Direct Benefit Transfer (DBT) tracking with J-Form download and bank UTR updates.
* **SMS/IVR Support**: Multi-lingual offline accessibility for feature phone users.

#### Centre Dashboard (Operator Portal)
* **Today's Bookings**: Schedule overview and expected arrivals.
* **Live Queue**: Real-time token queue with inward gate check-in.
* **Active Counters & Weighbridges**: Dynamic scale/counter capacity controls.
* **Verification**: Aadhaar & 7/12 land record validation.
* **Quality Check**: Moisture testing and grading certification.
* **Weighing**: Gross and tare weighbridge input with automatic net calculation.
* **Procurement & Bill**: Instant J-Form generation and procurement receipt creation.
* **Capacity & Workload**: Daily intake limits and throughput metrics.

#### Admin Dashboard (Government / District Authority)
* **Centre Monitoring**: Macro-level visibility across all state APMC centres.
* **Queue Congestion**: Heatmaps and early warnings for bottlenecked centres.
* **Procurement Analytics**: Daily commodity intake, target fulfillment, and procurement trends.
* **Centre Performance**: Average processing times, throughput rates, and active counters.
* **Payment Monitoring**: DBT disbursement status, pending approvals, and payment speed.

---

### 4. Main USP

> **Existing systems digitize procurement; KisanProcure focuses on intelligently coordinating the farmer's queue journey.**

Uses:
$$\text{Queue} + \text{Capacity} + \text{Counters} + \text{Workload} + \text{Processing Speed} + \text{Slots}$$

to recommend suitable centre/slot and provide live queue visibility.

---

### 5. Technology Stack

* **Mobile:** Flutter / Responsive Progressive Web App (React 19 + Vite)
* **Web Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
* **Backend:** FastAPI / Node.js
* **Database:** PostgreSQL
* **Real-time Engine:** Redis + WebSocket
* **Notifications:** SMS Gateway + Web Push + IVR telephony
* **Maps & Geo-location:** Maps API / Geolocation

---

### 6. Smart Queue Formula

$$\text{Estimated Waiting Time} = \frac{\text{Farmers Ahead} \times \text{Average Processing Time}}{\text{Active Counters}}$$

* Enables dynamic wait-time recalculation when active counters increase or decrease.
* Flags congestion thresholds: Normal (< 30 min), Moderate (30–60 min), High (> 60 min).

---

### 7. Procurement Status Pipeline

$$\text{BOOKED} \longrightarrow \text{ARRIVED} \longrightarrow \text{VERIFIED} \longrightarrow \text{QUALITY} \longrightarrow \text{WEIGHING} \longrightarrow \text{ACCEPTED} \longrightarrow \text{BILL} \longrightarrow \text{PAYMENT}$$

1. **BOOKED**: Slot confirmed, digital token issued.
2. **ARRIVED**: Vehicle checked in at Mandi gate via barcode/token scan.
3. **VERIFIED**: Aadhaar KYC and 7/12 land record authenticated.
4. **QUALITY**: Moisture content tested (< 12% standard) and crop graded.
5. **WEIGHING**: Gross weight minus tare weight recorded on digital weighbridge.
6. **ACCEPTED**: Commodity formally accepted by procurement agency (FCI/MSAMB).
7. **BILL**: Electronic J-Form / procurement certificate generated.
8. **PAYMENT**: Direct Benefit Transfer (DBT) credited directly to farmer's bank account.

---

### 8. MVP for SIH (Smart India Hackathon)

Focus on 3 strongest flagship pillars:
1. **Smart Centre & Slot Recommendation**: Congestion-aware slot selection avoiding overcrowded centres.
2. **Digital Token + Live Queue**: Real-time queue tracker with live countdown and dynamic counter adjustments.
3. **End-to-End Procurement Tracking**: Complete transparency from gate arrival to DBT payment confirmation.

---

### 9. Existing Systems & Differentiation

* **Existing Platforms (e-NAM, Kapas Kisan, State MSP Portals):** Primarily digitize trade bidding, price discovery, and procurement receipts. They lack real-time queue management at physical mandis.
* **KisanProcure Differentiation:** Acts as the dedicated **queue-management and centre-coordination layer** bridging the physical bottleneck between farmer arrival and digital procurement.

---

### 10. Tagline

## **BOOK SMART → WAIT LESS → TRACK EVERYTHING**
