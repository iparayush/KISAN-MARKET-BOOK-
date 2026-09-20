export interface CentreData {
  id: string;
  name: string;
  distance: string;
  currentQueue: number;
  availableSlots: number;
  activeCounters: number;
  estimatedWait: string;
  status: string;
  isRecommended: boolean;
  recommendationReason: string;
}

export interface SlotData {
  id: string;
  time: string;
  date: string;
  expectedWaiting: string;
  availableCapacity: string;
  reason: string;
  isRecommended: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface BookingRecord {
  id: string;
  bookingId: string;
  centre: string;
  date: string;
  time: string;
  crop: string;
  quantity: string;
  token: string;
  status: string;
}

export interface ProcurementHistoryRecord {
  id: string;
  crop: string;
  quantity: string;
  centre: string;
  date: string;
  status: string;
  rate: string;
  totalAmount: string;
  receiptId: string;
}

export interface DemoState {
  farmerName: string;
  village: string;
  district: string;
  state: string;
  role: string;
  crop: string;
  quantity: number; // in kg
  expectedDate: string;
  centre: string;
  distance: string;
  centreQueue: number;
  activeCounters: number;
  availableSlots: number;
  appointmentDate: string;
  appointmentTime: string;
  token: string;
  currentServingToken: string;
  farmersAhead: number;
  queuePosition: number;
  estimatedWaitMinutes: number;
  procurementStage: ProcurementStage;
  qualityGrade: string;
  moisturePercent: string;
  qualityStatus: string;
  expectedWeight: number;
  actualWeight: number;
  weighingStatus: string;
  ratePerQuintal: number;
  totalBillAmount: number;
  bookingId: string;
  transactionId: string;
  paymentStatus: "PROCESSING" | "PAID";
  paymentDate: string;
  queueLastUpdated: string;
  language: "en" | "mr" | "hi";
  isAutoDemo: boolean;
}

export type ProcurementStage =
  | "BOOKED"
  | "ARRIVED"
  | "DOCUMENT VERIFIED"
  | "QUALITY CHECK"
  | "WEIGHING"
  | "ACCEPTED"
  | "BILL GENERATED"
  | "PAYMENT PROCESSING"
  | "PAID";

export const PROCUREMENT_STAGES: ProcurementStage[] = [
  "BOOKED",
  "ARRIVED",
  "DOCUMENT VERIFIED",
  "QUALITY CHECK",
  "WEIGHING",
  "ACCEPTED",
  "BILL GENERATED",
  "PAYMENT PROCESSING",
  "PAID",
];

export const INITIAL_DEMO_STATE: DemoState = {
  farmerName: "Demo Farmer",
  village: "Nashik",
  district: "Nashik",
  state: "Maharashtra",
  role: "Farmer",
  crop: "Wheat",
  quantity: 450,
  expectedDate: "24 September 2026",
  centre: "Kisan Procurement Centre",
  distance: "4.2 km",
  centreQueue: 12,
  activeCounters: 3,
  availableSlots: 4,
  appointmentDate: "24 September 2026",
  appointmentTime: "10:30 AM",
  token: "KP-104",
  currentServingToken: "KP-097",
  farmersAhead: 7,
  queuePosition: 8,
  estimatedWaitMinutes: 32,
  procurementStage: "BOOKED",
  qualityGrade: "Good",
  moisturePercent: "11.8%",
  qualityStatus: "Pending",
  expectedWeight: 450,
  actualWeight: 448,
  weighingStatus: "Pending",
  ratePerQuintal: 2275,
  totalBillAmount: 10192,
  bookingId: "KP-2026-104",
  transactionId: "KP-DEMO-2026-104",
  paymentStatus: "PROCESSING",
  paymentDate: "24 September 2026",
  queueLastUpdated: "Just now",
  language: "en",
  isAutoDemo: false,
};

export const AVAILABLE_CENTRES: CentreData[] = [
  {
    id: "centre-1",
    name: "Kisan Procurement Centre",
    distance: "4.2 km",
    currentQueue: 12,
    availableSlots: 4,
    activeCounters: 3,
    estimatedWait: "32 min",
    status: "Available",
    isRecommended: true,
    recommendationReason: "Recommended based on queue, centre capacity, available counters and slot availability.",
  },
  {
    id: "centre-2",
    name: "Nashik APMC Mandi",
    distance: "7.8 km",
    currentQueue: 28,
    availableSlots: 2,
    activeCounters: 2,
    estimatedWait: "75 min",
    status: "Crowded",
    isRecommended: false,
    recommendationReason: "Higher waiting duration due to active morning arrivals.",
  },
  {
    id: "centre-3",
    name: "Dindori Farmer Hub",
    distance: "11.4 km",
    currentQueue: 8,
    availableSlots: 6,
    activeCounters: 2,
    estimatedWait: "25 min",
    status: "Available",
    isRecommended: false,
    recommendationReason: "Low queue but longer transit distance from your farm.",
  },
];

export const AVAILABLE_SLOTS: SlotData[] = [
  {
    id: "slot-1",
    time: "10:30 AM",
    date: "24 September 2026",
    expectedWaiting: "32 minutes",
    availableCapacity: "Good",
    reason: "Lower queue and available processing capacity.",
    isRecommended: true,
  },
  {
    id: "slot-2",
    time: "11:30 AM",
    date: "24 September 2026",
    expectedWaiting: "45 minutes",
    availableCapacity: "Moderate",
    reason: "Peak morning inflow expected around this window.",
    isRecommended: false,
  },
  {
    id: "slot-3",
    time: "12:30 PM",
    date: "24 September 2026",
    expectedWaiting: "50 minutes",
    availableCapacity: "Moderate",
    reason: "Lunch counter shift transition.",
    isRecommended: false,
  },
  {
    id: "slot-4",
    time: "02:00 PM",
    date: "24 September 2026",
    expectedWaiting: "35 minutes",
    availableCapacity: "Good",
    reason: "Afternoon intake batch.",
    isRecommended: false,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Slot Confirmed",
    message: "Your procurement slot is confirmed for 10:30 AM.",
    timestamp: "10:00 AM",
    read: false,
  },
  {
    id: "notif-2",
    title: "Token Generated",
    message: "Your digital token KP-104 has been generated.",
    timestamp: "10:02 AM",
    read: false,
  },
  {
    id: "notif-3",
    title: "Queue Updated",
    message: "6 farmers are now ahead of you.",
    timestamp: "10:15 AM",
    read: true,
  },
  {
    id: "notif-4",
    title: "Quality Completed",
    message: "Your crop quality check has been completed.",
    timestamp: "10:45 AM",
    read: true,
  },
  {
    id: "notif-5",
    title: "Weight Verified",
    message: "Your final accepted quantity is 448 kg.",
    timestamp: "11:00 AM",
    read: true,
  },
  {
    id: "notif-6",
    title: "Payment Credited",
    message: "Your simulated procurement payment has been credited.",
    timestamp: "11:15 AM",
    read: true,
  },
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: "b-1",
    bookingId: "KP-2026-104",
    centre: "Kisan Procurement Centre",
    date: "24 Sep 2026",
    time: "10:30 AM",
    crop: "Wheat",
    quantity: "450 kg",
    token: "KP-104",
    status: "BOOKED",
  },
];

export const INITIAL_HISTORY: ProcurementHistoryRecord[] = [
  {
    id: "h-1",
    crop: "Wheat",
    quantity: "448 kg",
    centre: "Kisan Procurement Centre",
    date: "24 Sep 2026",
    status: "PAID",
    rate: "Rs 2,275 / qtl",
    totalAmount: "Rs 10,192",
    receiptId: "KP-2026-104",
  },
  {
    id: "h-2",
    crop: "Soybean",
    quantity: "620 kg",
    centre: "Kisan Procurement Centre",
    date: "12 Oct 2025",
    status: "PAID",
    rate: "Rs 4,600 / qtl",
    totalAmount: "Rs 28,520",
    receiptId: "KP-2025-089",
  },
];

export const FAQ_LIST = [
  {
    question: "How do I book a slot?",
    answer: "Enter your crop details, select the recommended procurement centre, choose an available time slot, and click Book This Slot to receive a digital token.",
  },
  {
    question: "How does the digital token work?",
    answer: "Your token (e.g. KP-104) guarantees your position in the physical queue and eliminates the need to park your tractor or vehicle in line for hours.",
  },
  {
    question: "How can I track my queue?",
    answer: "The Live Queue screen shows the currently served token, your position, number of farmers ahead, and real-time waiting estimation.",
  },
  {
    question: "How can I track procurement?",
    answer: "The Procurement Tracking timeline shows each step: Arrival, Document Verification, Quality Check, Weighing, Acceptance, and Bill Generation.",
  },
  {
    question: "How can I see payment status?",
    answer: "The Payment Tracking screen confirms the payment authorization, simulated transaction reference, and disbursed amount once weighing is approved.",
  },
];

export const ABOUT_METADATA = {
  title: "About KisanProcure",
  description:
    "KisanProcure is a Smart India Hackathon 2026 functional prototype designed to reduce farmer waiting through digital slot booking, digital tokens, live queue tracking and end-to-end procurement status visibility.",
  problemStatement: "SIH 2026",
  psId: "SIH26032",
  category: "Software",
  theme: "Smart Automation",
  prototype: "Functional Demo",
  tagline: "Book Smart. Wait Less. Track Everything.",
  disclaimer: "Simulated Procurement Environment",
  demoLabel: "Functional Demo Prototype",
};

export const TRANSLATIONS = {
  en: {
    brand: "KisanProcure",
    tagline: "Smart Procurement & Queue Management",
    demoMode: "Demo Mode",
    functionalPrototype: "Functional Demo Prototype",
    simulatedEnv: "Simulated Procurement Environment",
    tryDemo: "Try Demo",
    viewWorkflow: "View Workflow",
    heroTitle: "Smart Procurement Without Long Waiting",
    heroDesc: "Book a suitable procurement slot, receive a digital token and track your queue in real time.",
    home: "Home",
    book: "Book",
    queue: "Queue",
    track: "Track",
    more: "More",
    loginTitle: "Demo Farmer Login",
    continueDemo: "Continue Demo",
    goodMorning: "Good Morning",
    todaysProcurement: "Today's Procurement",
    token: "Token",
    centre: "Centre",
    appointment: "Appointment",
    status: "Status",
    currentServing: "Current Token",
    farmersAhead: "Farmers Ahead",
    estimatedWait: "Estimated Wait",
    quickActions: "Quick Actions",
    bookSlot: "Book Slot",
    viewQueue: "View Queue",
    trackProcurement: "Track Procurement",
    registerCrop: "Register Crop",
    cropLabel: "Crop",
    quantityLabel: "Quantity (kg)",
    dateLabel: "Expected Procurement Date",
    continueBtn: "Continue",
    recommended: "Recommended",
    selectCentre: "Select Centre",
    recommendedSlot: "Recommended Slot",
    bookThisSlot: "Book This Slot",
    generateToken: "Generate Digital Token",
    yourDigitalToken: "Your Digital Token",
    viewLiveQueue: "View Live Queue",
    addToMyBookings: "Add to My Bookings",
    nowServing: "NOW SERVING",
    yourToken: "YOUR TOKEN",
    position: "POSITION",
    activeCounters: "ACTIVE COUNTERS",
    simulateNextToken: "Simulate Next Token",
    imAtCentre: "I'm at the Centre",
    arrivalConfirmed: "Arrival Confirmed",
    documentVerification: "Document Verification",
    continueToQuality: "Continue to Quality Check",
    qualityCheck: "Quality Check",
    continueToWeighing: "Continue to Weighing",
    weighing: "Weighing",
    acceptProcurement: "Accept Procurement",
    procurementAccepted: "Procurement Accepted",
    generateBill: "Generate Bill",
    procurementReceipt: "KisanProcure Procurement Receipt",
    trackPayment: "Track Payment",
    paymentTracking: "Payment Tracking",
    simulatedPayment: "SIMULATED PAYMENT",
    resetDemo: "Reset Demo",
    presentationDemo: "PRESENTATION DEMO",
    demoControls: "Demo Controls",
  },
  mr: {
    brand: "किसानप्रोक्युअर",
    tagline: "स्मार्ट खरेदी आणि रांग व्यवस्थापन",
    demoMode: "डेमो मोड",
    functionalPrototype: "कार्यरत डेमो प्रोटोटाइप",
    simulatedEnv: "सिम्युलेटेड खरेदी पर्यावरण",
    tryDemo: "डेमो सुरू करा",
    viewWorkflow: "प्रक्रिया पहा",
    heroTitle: "लांब प्रतीक्षा न करता स्मार्ट खरेदी",
    heroDesc: "योग्य खरेदी स्लॉट बुक करा, डिजिटल टोकन मिळवा आणि थेट रांगेचा मागोवा घ्या.",
    home: "मुख्यपृष्ठ",
    book: "नोंदणी",
    queue: "रांग",
    track: "मागोवा",
    more: "अधिक",
    loginTitle: "डेमो शेतकरी लॉगिन",
    continueDemo: "डेमो सुरू ठेवा",
    goodMorning: "शुभ प्रभात",
    todaysProcurement: "आजची खरेदी",
    token: "टोकन",
    centre: "खरेदी केंद्र",
    appointment: "वेळ",
    status: "स्थिती",
    currentServing: "सध्या सुरू असलेले टोकन",
    farmersAhead: "पुढील शेतकरी",
    estimatedWait: "अपेक्षित वेळ",
    quickActions: "त्वरित कृती",
    bookSlot: "स्लॉट बुक करा",
    viewQueue: "थेट रांग पहा",
    trackProcurement: "खरेदी मागोवा",
    registerCrop: "पीक नोंदणी",
    cropLabel: "पीक",
    quantityLabel: "प्रमाण (किलो)",
    dateLabel: "अपेक्षित खरेदी तारीख",
    continueBtn: "पुढे चला",
    recommended: "शिफारस केलेले",
    selectCentre: "केंद्र निवडा",
    recommendedSlot: "शिफारस केलेला स्लॉट",
    bookThisSlot: "हा स्लॉट बुक करा",
    generateToken: "डिजिटल टोकन तयार करा",
    yourDigitalToken: "आपले डिजिटल टोकन",
    viewLiveQueue: "थेट रांग पहा",
    addToMyBookings: "माझ्या नोंदणीत जोडा",
    nowServing: "सध्या सेवा सुरू",
    yourToken: "आपले टोकन",
    position: "क्रमांक",
    activeCounters: "सक्रिय काउंटर",
    simulateNextToken: "पुढील टोकन पुढे सरकवा",
    imAtCentre: "मी केंद्रावर पोहोचलो आहे",
    arrivalConfirmed: "आगमन नोंदवले गेले",
    documentVerification: "कागदपत्र पडताळणी",
    continueToQuality: "गुणवत्ता तपासणीकडे जा",
    qualityCheck: "गुणवत्ता तपासणी",
    continueToWeighing: "वजन तपासणीकडे जा",
    weighing: "वजन मापन",
    acceptProcurement: "खरेदी स्वीकारा",
    procurementAccepted: "खरेदी स्वीकृत",
    generateBill: "पावती तयार करा",
    procurementReceipt: "किसानप्रोक्युअर खरेदी पावती",
    trackPayment: "पेमेंट मागोवा",
    paymentTracking: "पेमेंट मागोवा",
    simulatedPayment: "सिम्युलेटेड पेमेंट",
    resetDemo: "डेमो रीसेट करा",
    presentationDemo: "सादरीकरण डेमो",
    demoControls: "डेमो नियंत्रणे",
  },
  hi: {
    brand: "किसानप्रोक्योर",
    tagline: "स्मार्ट खरीद एवं कतार प्रबंधन",
    demoMode: "डेमो मोड",
    functionalPrototype: "कार्यात्मक डेमो प्रोटोटाइप",
    simulatedEnv: "सिम्युलेटेड खरीद वातावरण",
    tryDemo: "डेमो देखें",
    viewWorkflow: "कार्यप्रवाह देखें",
    heroTitle: "बिना लंबी प्रतीक्षा के स्मार्ट खरीद",
    heroDesc: "सुविधाजनक खरीद स्लॉट बुक करें, डिजिटल टोकन प्राप्त करें और वास्तविक समय में कतार ट्रैक करें।",
    home: "होम",
    book: "बुकिंग",
    queue: "कतार",
    track: "ट्रैकिंग",
    more: "अधिक",
    loginTitle: "डेमो किसान लॉगिन",
    continueDemo: "डेमो जारी रखें",
    goodMorning: "शुभ प्रभात",
    todaysProcurement: "आज की खरीद",
    token: "टोकन",
    centre: "खरीद केंद्र",
    appointment: "समय",
    status: "स्थिति",
    currentServing: "वर्तमान टोकन",
    farmersAhead: "आगे उपस्थित किसान",
    estimatedWait: "अनुमानित प्रतीक्षा",
    quickActions: "त्वरित क्रियाएं",
    bookSlot: "स्लॉट बुक करें",
    viewQueue: "कतार देखें",
    trackProcurement: "खरीद ट्रैक करें",
    registerCrop: "फसल पंजीकरण",
    cropLabel: "फसल",
    quantityLabel: "मात्रा (किलो)",
    dateLabel: "अपेक्षित खरीद तिथि",
    continueBtn: "आगे बढ़ें",
    recommended: "अनुशंसित",
    selectCentre: "केंद्र चुनें",
    recommendedSlot: "अनुशंसित स्लॉट",
    bookThisSlot: "यह स्लॉट बुक करें",
    generateToken: "डिजिटल टोकन जनरेट करें",
    yourDigitalToken: "आपका डिजिटल टोकन",
    viewLiveQueue: "लाइव कतार देखें",
    addToMyBookings: "मेरी बुकिंग में जोड़ें",
    nowServing: "वर्तमान में सेवा जारी",
    yourToken: "आपका टोकन",
    position: "स्थान",
    activeCounters: "सक्रिय काउंटर",
    simulateNextToken: "अगला टोकन बढ़ाएं",
    imAtCentre: "मैं केंद्र पर पहुंच चुका हूं",
    arrivalConfirmed: "आगमन दर्ज हुआ",
    documentVerification: "दस्तावेज़ सत्यापन",
    continueToQuality: "गुणवत्ता जांच के लिए आगे बढ़ें",
    qualityCheck: "गुणवत्ता जांच",
    continueToWeighing: "वजन के लिए आगे बढ़ें",
    weighing: "वजन मापन",
    acceptProcurement: "खरीद स्वीकार करें",
    procurementAccepted: "खरीद स्वीकृत",
    generateBill: "रसीद जनरेट करें",
    procurementReceipt: "किसानप्रोक्योर खरीद रसीद",
    trackPayment: "भुगतान ट्रैक करें",
    paymentTracking: "भुगतान ट्रैकिंग",
    simulatedPayment: "सिम्युलेटेड भुगतान",
    resetDemo: "डेमो रीसेट करें",
    presentationDemo: "प्रस्तुति डेमो",
    demoControls: "डेमो नियंत्रण",
  },
};
