export type Language = 'mr' | 'hi' | 'en';

export type UserRole = 'farmer' | 'operator' | 'admin';

export interface AuthUser {
  id: string;
  role: UserRole;
  nameMr: string;
  nameHi?: string;
  nameEn: string;
  identifier: string;
  phone?: string;
  avatarUrl?: string;
  centreId?: string;
  centreNameMr?: string;
  centreNameHi?: string;
  centreNameEn?: string;
  designationMr?: string;
  designationHi?: string;
  designationEn?: string;
  loginTime: string;
  tokenNumber?: string;
}

export type ScreenTab = 'home' | 'book-slot' | 'live-queue' | 'tracking' | 'payments' | 'grievance';

export interface FarmerProfile {
  id: string;
  nameMr: string;
  nameHi?: string;
  nameEn: string;
  initial: string;
  phone: string;
  village: string;
  district: string;
  state: string;
  avatarUrl: string;
  isVerified: boolean;
  aadhaarLinked: boolean;
  bankAccount: string;
  bankName: string;
}

export interface ActiveToken {
  tokenNumber: string;
  currentTokenServing: string;
  farmersAhead: number;
  expectedWaitMin: number;
  mandiNameMr: string;
  mandiNameHi?: string;
  mandiNameEn: string;
  gateNumber: string;
  weighbridgeNumber: string;
  centerStatusMr: string;
  centerStatusHi?: string;
  centerStatusEn: string;
  totalActiveScales: number;
  slotTime: string;
  slotDate: string;
  vehicleNumber: string;
  vehicleType: string;
  status: 'booked' | 'arrived' | 'verified' | 'quality_checked' | 'weighed' | 'accepted' | 'billed' | 'completed';
}

export interface RegisteredCrop {
  id: string;
  nameMr: string;
  nameHi?: string;
  nameEn: string;
  gradeMr: string;
  gradeHi?: string;
  gradeEn: string;
  weightQtl: number;
  scheduledTimeMr: string;
  scheduledTimeHi?: string;
  scheduledTimeEn: string;
  mspRatePerQtl: number;
  expectedTotalAmount: number;
  moisturePercent: number;
  maxMoistureAllowed: number;
  isMoistureAcceptable: boolean;
  imageUrl: string;
  status: 'scheduled' | 'in_progress' | 'completed';
}

export type ProcurementStage =
  | 'BOOKED'
  | 'ARRIVED'
  | 'DOCUMENT_VERIFIED'
  | 'QUALITY_CHECK'
  | 'WEIGHING'
  | 'ACCEPTED'
  | 'BILL_GENERATED'
  | 'PAYMENT_PROCESSING'
  | 'PAID';

export interface ProcurementStep {
  stepNumber: number;
  stage: ProcurementStage;
  titleMr: string;
  titleHi?: string;
  titleEn: string;
  descriptionMr: string;
  descriptionHi?: string;
  descriptionEn: string;
  time?: string;
  status: 'completed' | 'current' | 'upcoming';
  operator?: string;
  location?: string;
  reading?: string;
}

export interface PaymentRecord {
  id: string;
  cropMr: string;
  cropHi?: string;
  cropEn: string;
  quantityQtl: number;
  ratePerQtl: number;
  totalAmount: number;
  date: string;
  status: 'credited' | 'processing' | 'approved' | 'submitted';
  utrNumber?: string;
  jFormNumber: string;
  mandiName: string;
}

export interface MandiCenter {
  id: string;
  nameMr: string;
  nameHi?: string;
  nameEn: string;
  locationMr: string;
  locationHi?: string;
  locationEn: string;
  distanceKm: number;
  currentWaitMin: number;
  status: 'low' | 'moderate' | 'high';
  gatesOpen: number;
  operatingHours: string;
  contactNumber: string;
  activeCounters: number;
  totalDailyCapacity: number;
  bookedToday: number;
}

export interface QueueTokenItem {
  id: string;
  tokenNumber: string;
  farmerName: string;
  farmerId: string;
  farmerPhone: string;
  crop: string;
  quantityQtl: number;
  status: 'waiting' | 'in_verification' | 'quality_check' | 'weighing' | 'accepted' | 'completed' | 'rejected';
  counter: string;
  waitTimeMin: number;
  slotTime: string;
  vehicleNumber: string;
  grossWeightQtl?: number;
  tareWeightQtl?: number;
  netWeightQtl?: number;
  moisturePercent?: number;
  grade?: string;
}

export type GrievanceCategory =
  | 'token'
  | 'payment'
  | 'weighing'
  | 'quality'
  | 'centre'
  | 'other';

export type GrievanceStatus = 'OPEN' | 'IN_REVIEW' | 'RESOLVED';

export interface Grievance {
  id: string;
  category: GrievanceCategory;
  subject: string;
  description: string;
  farmerName: string;
  farmerPhone: string;
  centreName: string;
  tokenNumber?: string;
  status: GrievanceStatus;
  createdAt: string;
  resolutionNote?: string;
  resolvedAt?: string;
}

export interface AdminAlert {
  id: string;
  type: 'congestion' | 'wait_time' | 'low_utilization' | 'payment_delay';
  titleMr: string;
  titleHi?: string;
  titleEn: string;
  descriptionMr: string;
  descriptionHi?: string;
  descriptionEn: string;
  centreName: string;
  severity: 'warning' | 'critical' | 'info';
  time: string;
}
