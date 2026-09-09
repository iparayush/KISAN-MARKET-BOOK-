# 🌾 KisanProcure

## Smart Farmer Procurement & Queue Management Platform
**SIH 2026 — Problem Statement 26032**

> **Transforming government crop procurement from a physical queue-based process into a smart, transparent, and digitally managed journey.**

---

## 🚀 Overview

KisanProcure is a smart digital platform designed to reduce long waiting times, unnecessary visits, and uncertainty at government procurement centres.

The platform connects:
- 👨‍🌾 **Farmers**
- 🏢 **Procurement Centre Operators**
- 🏛️ **Government Administrators**

### 🔄 End-to-End Procurement Workflow
```text
Register → Crop Registration → Find Procurement Centre → Smart Slot Recommendation → Slot Booking → Digital Token → Live Queue → Arrival & Verification → Quality Check → Weighing → Procurement Acceptance → Bill Generation → Payment Processing → Payment Credited
```

---

## 🎯 Problem Statement (SIH 2026 — PS 26032)

Farmers at physical mandis often face:
- Long waiting times and unpredictability
- Uncertainty about procurement schedules
- Lack of real-time queue visibility
- Multiple unnecessary transportation trips & costs
- Limited visibility into crop acceptance status
- Delayed or opaque payment processing
- Unmanaged congestion at procurement hubs

---

## 💡 Our Solution

KisanProcure converts the traditional physical queue into a **smart digital queue**.

| Traditional Journey | KisanProcure Journey |
|---|---|
| Travel → Wait → Uncertainty → Procure → Payment Delay | **Book → Token → Track Queue → Arrive → Procure → Track Payment** |

---

## ⭐ Key Features

### 👨‍🌾 1. Farmer Application
- **Farmer Registration**: Mobile OTP login, profile management, Aadhaar KYC & 7/12 land record verification.
- **Multilingual Support**: Instant switching between **Marathi (मराठी)**, **Hindi (हिन्दी)**, and **English**.
- **🌱 Crop Registration**: Crop selection (Soybean, Cotton, Gram, Wheat), expected quantity, moisture check, and harvest readiness.
- **📍 Mandi Discovery**: Search nearby hubs by distance, current queue, available slots, and wait times.
- **🧠 Smart Slot Allocation Engine**: Recommends optimal centres using:
  $$\text{Score} = \text{Distance} + \text{Queue Size} + \text{Capacity} + \text{Counters} + \text{Processing Speed}$$
- **🎫 Digital Token & Gate Pass**: Generates Token `#027` with scannable QR code and gate details.
- **🔴 Live Queue Telemetry**: Displays currently serving token, farmers ahead, active weighbridges, and dynamic wait estimate.
- **📦 9-Stage Procurement Tracker**: Step-by-step progress from `BOOKED` to `PAID`.
- **💰 Payment & J-Form Receipt**: Direct Benefit Transfer (DBT) status tracking via PFMS with UTR reference.
- **🆘 Grievance Redressal**: File complaints for token, weighing, quality, or payment issues with 24h SLA.
- **📱 Non-Smartphone Support**: IVR Toll-Free (`1800-180-1551`) and SMS Gateway simulator for feature phones.

### 🏢 2. Procurement Centre Dashboard
- **Operator Workbench**: Real-time queue table, token search, and check-in scanning.
- **Farmer Verification**: Verify identity and 7/12 land record match.
- **Quality Check**: Input moisture %, foreign matter %, and grade classification (Grade A/B/C).
- **Digital Weighbridge**: Gross weight & Tare weight entry with auto Net weight calculation ($\text{Net} = \text{Gross} - \text{Tare}$).
- **Instant J-Form Billing**: MSP rate calculation and digital bill generation (`KP-2026-XXXXXX`).
- **Counter Management**: Dynamically adjust active scale counters and manage no-show tokens.

### 🏛️ 3. Government Admin Command Center
- **Macro Operational KPIs**: Total farmers, active mandis, total procured quintals, procurement value (₹ Cr), and DBT disbursement.
- **Live Congestion Radar**: Color-coded centre status (🟢 Normal, 🟡 Moderate, 🔴 High Congestion, ⚫ Closed).
- **Workload Rebalancing Engine**: Automated algorithms nudging slot bookings away from overloaded mandis.
- **Cryptographic Audit Log**: Immutable system audit trail capturing operator actions, timestamps, and metadata.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────┐
│                 CLIENTS                 │
│  Farmer App • Centre Web • Admin Web   │
│              SMS / IVR                  │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│               API GATEWAY               │
│      Authentication / Validation        │
└────────────────────┬────────────────────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 User Service   Slot Service   Queue Engine
      │              │              │
      └──────────────┼──────────────┘
                     ▼
┌─────────────────────────────────────────┐
│           PROCUREMENT SERVICE           │
│   Verification • Quality • Weighing     │
│          Billing • Payments             │
└────────────────────┬────────────────────┘
                     ▼
┌─────────────────────────────────────────┐
│              PostgreSQL                 │
└────────────────────┬────────────────────┘
                     │
       ┌─────────────┴─────────────┐
       ▼                           ▼
 Notification Service      Analytics Service
 (SMS / Push / IVR)
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend / Web** | React 19, Vite 6, TypeScript, Tailwind CSS 4, Motion |
| **Icons & Design** | Lucide React, Google Material Symbols, Stark Tech Aesthetic |
| **Backend API** | Node.js / Express / NestJS |
| **Database** | PostgreSQL |
| **Real-Time / Cache**| WebSockets / Redis |
| **Authentication** | Mobile OTP + JWT |

---

## 🚀 Running Locally

### Prerequisites
- Node.js (v18+)
- npm or bun

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/iparayush/KISAN-MARKET-BOOK-.git

# 2. Enter project directory
cd KISAN-MARKET-BOOK-

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

---

## 🌐 Repository & SIH Details

- **GitHub Repository**: [https://github.com/iparayush/KISAN-MARKET-BOOK-](https://github.com/iparayush/KISAN-MARKET-BOOK-)
- **Hackathon**: Smart India Hackathon 2026 🇮🇳
- **Problem Statement ID**: 26032
- **Theme**: Smart Automation
- **Category**: Software
- **Solution Name**: KisanProcure

---

> **KisanProcure — Smart Procurement. Less Waiting.** 🌾🇮🇳
