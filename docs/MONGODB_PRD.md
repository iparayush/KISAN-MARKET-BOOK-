# 🌾 KisanProcure — MongoDB Product Requirements Document (PRD) & Technical Specification

**Problem Statement:** SIH26032 | **Theme:** Smart Automation | **Team:** AstraX  
**Architecture:** React / Flutter Mobile-Web + Node.js Express API + MongoDB Atlas + Socket.IO

---

## 1. Product Overview & Vision

KisanProcure is an end-to-end digital agricultural procurement and intelligent queue-management platform. It solves critical friction points at government procurement centres (APMC Mandis) across India:
- **Long Waiting Times (4–8 hours)** eliminated through automated slot reservation.
- **Queue Uncertainty** resolved via live token broadcasting and wait-time estimation.
- **Manual Paperwork & Delays** streamlined through digital grade check, automated weighbridge capture, J-Form generation, and direct payment tracking.
- **Linguistic Barriers** mitigated through trilingual support (English, Hindi, Marathi) and IVR/SMS fallback.

---

## 2. High-Level Architecture

```text
               👨‍🌾 FARMER / 👷 OPERATOR / 🏛️ ADMIN
                               │
                               ▼
            Frontend Web & Mobile App (React PWA / Flutter)
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       RESTful API Endpoints             WebSocket Connection
      (Node.js + Express.js)                 (Socket.IO)
               │                               │
       ┌───────┴───────────────┐               │
       ▼                       ▼               ▼
 Authentication          Smart Services   Real-time Queue
  (JWT & OTP)           (Recommendation)     Broadcaster
       │                       │               │
       └───────────────┬───────┴───────────────┘
                       ▼
               MongoDB Atlas Database
       ┌───────────────────────────────────────┐
       │ Collections:                          │
       │  • users         • farmers            │
       │  • crops         • centres (2dsphere) │
       │  • slots         • bookings           │
       │  • queue_tokens  • procurements       │
       │  • bills         • payments           │
       │  • grievances    • audit_logs         │
       └───────────────────────────────────────┘
```

---

## 3. MongoDB Collections & Mongoose Schemas

### 3.1 Users (`users`)
Stores authentication records for all 4 roles: Farmer, Operator, Centre Manager, Admin.

```javascript
const userSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, index: true },
    aadhaarHash: { type: String, select: false },
    role: {
      type: String,
      enum: ["farmer", "operator", "manager", "admin"],
      default: "farmer"
    },
    preferredLanguage: {
      type: String,
      enum: ["en", "mr", "hi"],
      default: "mr"
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date }
  },
  { timestamps: true }
);
```

### 3.2 Farmers (`farmers`)
Profile information and landholding details for registered farmers.

```javascript
const farmerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, index: true },
    village: { type: String, required: true },
    taluka: String,
    district: { type: String, required: true, index: true },
    state: { type: String, default: "Maharashtra" },
    pincode: String,
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      accountHolderName: String
    },
    landHoldingAcres: { type: Number, default: 0 },
    preferredLanguage: { type: String, enum: ["en", "mr", "hi"], default: "mr" }
  },
  { timestamps: true }
);
```

### 3.3 Crops (`crops`)
Registered seasonal crop yields intended for government procurement.

```javascript
const cropSchema = new mongoose.Schema(
  {
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true, index: true },
    cropName: { type: String, required: true }, // e.g. "Soybean", "Onion", "Wheat"
    variety: String,
    expectedQuantity: { type: Number, required: true }, // in Quintals
    unit: { type: String, default: "quintal" },
    season: { type: String, enum: ["Kharif", "Rabi", "Zaid"] },
    mspPerQuintal: { type: Number, required: true },
    status: { type: String, enum: ["REGISTERED", "VERIFIED", "PROCURED"], default: "REGISTERED" }
  },
  { timestamps: true }
);
```

### 3.4 Procurement Centres (`centres`)
APMC mandi locations with capacity, active counters, and geospatial coordinates.

```javascript
const centreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    district: { type: String, required: true, index: true },
    state: { type: String, default: "Maharashtra" },
    address: String,
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true } // [Longitude, Latitude]
    },
    dailyCapacity: { type: Number, required: true }, // in Quintals
    activeCounters: { type: Number, default: 2 },
    currentQueue: { type: Number, default: 0 },
    processingRate: { type: Number, default: 5 }, // average farmers per hour per counter
    status: { type: String, enum: ["ACTIVE", "INACTIVE", "CONGESTED"], default: "ACTIVE" },
    operatingHours: { open: { type: String, default: "08:00" }, close: { type: String, default: "18:00" } }
  },
  { timestamps: true }
);

centreSchema.index({ location: "2dsphere" });
```

### 3.5 Slots (`slots`)
Time slots configured per procurement centre.

```javascript
const slotSchema = new mongoose.Schema(
  {
    centreId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true, index: true },
    date: { type: Date, required: true, index: true },
    startTime: { type: String, required: true }, // "09:00"
    endTime: { type: String, required: true },   // "11:00"
    capacity: { type: Number, required: true },  // Total slots available
    bookedCount: { type: Number, default: 0 },
    status: { type: String, enum: ["AVAILABLE", "FULL", "CLOSED"], default: "AVAILABLE" }
  },
  { timestamps: true }
);
slotSchema.index({ centreId: 1, date: 1 });
```

### 3.6 Bookings (`bookings`)
Core transaction representing a farmer's scheduled visit.

```javascript
const bookingSchema = new mongoose.Schema(
  {
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true, index: true },
    cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
    centreId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true, index: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    tokenNumber: { type: String, unique: true, required: true },
    status: {
      type: String,
      enum: [
        "BOOKED",
        "ARRIVED",
        "VERIFIED",
        "QUALITY_CHECK",
        "WEIGHING",
        "ACCEPTED",
        "BILL_GENERATED",
        "PAYMENT_PROCESSING",
        "PAID",
        "CANCELLED",
        "NO_SHOW"
      ],
      default: "BOOKED"
    },
    qrCodeData: String,
    cancellationReason: String
  },
  { timestamps: true }
);
```

### 3.7 Queue Tokens (`queue_tokens`)
Live token state tracking queue order and wait times.

```javascript
const queueTokenSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    centreId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true, index: true },
    tokenNumber: { type: String, required: true, index: true },
    assignedCounter: { type: Number, default: 1 },
    status: {
      type: String,
      enum: ["WAITING", "CALLED", "SERVING", "COMPLETED", "SKIPPED"],
      default: "WAITING"
    },
    calledAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);
```

### 3.8 Procurements (`procurements`)
Detailed inspection, weighing, and validation records for a booking.

```javascript
const procurementSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true, unique: true },
    centreId: { type: mongoose.Schema.Types.ObjectId, ref: "Centre", required: true },
    verification: {
      status: { type: String, enum: ["PENDING", "VERIFIED", "REJECTED"], default: "PENDING" },
      verifiedBy: String,
      verifiedAt: Date
    },
    quality: {
      status: { type: String, enum: ["PENDING", "GRADE_A", "GRADE_B", "REJECTED"], default: "PENDING" },
      grade: String,
      moisturePercentage: Number,
      foreignMatterPercentage: Number,
      inspectorId: String,
      checkedAt: Date
    },
    weighing: {
      grossWeightKg: Number,
      tareWeightKg: Number,
      netWeightKg: Number,
      quantityQuintals: Number,
      weighbridgeId: String,
      weighedAt: Date
    },
    pricing: {
      baseMspRate: Number,
      bonusPerQuintal: { type: Number, default: 0 },
      deductions: { type: Number, default: 0 },
      totalAmount: Number
    },
    jFormNumber: { type: String, unique: true, sparse: true }
  },
  { timestamps: true }
);
```

### 3.9 Payments (`payments`)
Financial disbursement tracking linking J-Forms to direct bank transfers.

```javascript
const paymentSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    procurementId: { type: mongoose.Schema.Types.ObjectId, ref: "Procurement", required: true },
    farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true, index: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "SUCCESS", "FAILED"],
      default: "PENDING"
    },
    transactionReference: String, // Bank UTR
    paymentMethod: { type: String, default: "DBT_PFMS" },
    expectedCreditDate: Date,
    paidAt: Date
  },
  { timestamps: true }
);
```

---

## 4. Smart Recommendation Engine

KisanProcure uses a transparent 4-factor scoring model that balances distance against centre congestion and remaining capacity:

$$\text{Score} = (D \times 0.30) + (Q \times 0.30) + (C \times 0.20) + (W \times 0.20)$$

- **$D$ (Normalized Distance):** Driving distance from farmer's village.
- **$Q$ (Queue Score):** Current waiting tokens at the centre.
- **$C$ (Capacity Score):** $\text{Current Queue} / \text{Daily Capacity}$.
- **$W$ (Workload Score):** $\text{Current Queue} / \text{Processing Rate}$.

### Human-Explainable Rationale
Instead of opaque "AI output", the system presents actionable reasons to the farmer:
> *"Recommended because: 60% lower queue than nearest mandi + immediate morning slot available."*

---

## 5. Live Queue Engine with Socket.IO

When an operator updates a token or completes a weighing stage:
1. The state updates atomically in MongoDB.
2. The backend emits a real-time event:
   ```javascript
   io.to(`centre:${centreId}`).emit("queue:update", {
     nowServing: "KP-1003",
     waitingCount: 4,
     estimatedWaitMinutes: 20
   });
   ```
3. The farmer's mobile interface immediately updates without manual page refreshes.

---

## 6. Master Prompt for AI Coding Agents

```text
You are developing KisanProcure, an intelligent procurement and queue management system for Indian farmers (SIH Problem Statement 26032).
Stack:
- Frontend: React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons, i18n (EN, HI, MR).
- Backend: Node.js, Express, MongoDB Atlas, Mongoose, Socket.IO, JWT.
Key requirements:
1. Mobile-first, responsive, and accessible (WCAG 2.2).
2. Four distinct role workflows: Farmer, Centre Operator, Centre Manager, and Government Admin.
3. Multi-stage procurement tracking: Booked → Arrived → Verified → Quality Check → Weighing → Accepted → Bill Generated → Payment.
4. Smart centre recommendation with explainable scoring (distance, queue, capacity, workload).
5. Real-time live queue broadcasting via Socket.IO with SMS/IVR fallback.
6. Offline resilience: UI gracefully handles offline status with mock data fallback.
```
