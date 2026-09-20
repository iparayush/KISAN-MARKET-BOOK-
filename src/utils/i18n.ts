import { Language } from '../types';

/**
 * Universal translation helper function
 * If Hindi is selected, returns hi, else if Marathi returns mr, otherwise en.
 */
export function t(language: Language, mr: string, hi: string, en?: string): string {
  if (language === 'hi') return hi;
  if (language === 'mr') return mr;
  return en || mr;
}

export interface LocalizedText {
  mr: string;
  hi: string;
  en: string;
}

export function tr(language: Language, text: LocalizedText): string {
  return text[language] || text.en || text.mr;
}

/**
 * Common labels for UI elements across KisanProcure
 */
export const I18N = {
  portalName: {
    mr: 'राष्ट्रीय शेती खरेदी पोर्टल',
    hi: 'राष्ट्रीय कृषि खरीद पोर्टल',
    en: 'National Agri-Procurement Portal',
  },
  departmentName: {
    mr: 'ग्राहक व्यवहार व सार्वजनिक वितरण मंत्रालय (DoCA)',
    hi: 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय (DoCA)',
    en: 'Ministry of Consumer Affairs, Food & Public Distribution (DoCA)',
  },
  roles: {
    farmer: {
      mr: 'शेतकरी',
      hi: 'किसान',
      en: 'Farmer',
    },
    operator: {
      mr: 'केंद्र ऑपरेटर',
      hi: 'केंद्र ऑपरेटर',
      en: 'Centre Operator',
    },
    admin: {
      mr: 'DoCA प्रशासन',
      hi: 'DoCA प्रशासन',
      en: 'Govt Admin',
    },
  },
  nav: {
    home: {
      mr: 'मुख्य',
      hi: 'होम',
      en: 'Home',
    },
    bookSlot: {
      mr: 'स्लॉट बुक',
      hi: 'स्लॉट बुक',
      en: 'Book Slot',
    },
    liveQueue: {
      mr: 'थेट रांग',
      hi: 'लाइव कतार',
      en: 'Live Queue',
    },
    tracking: {
      mr: 'ट्रॅकिंग',
      hi: 'ट्रैकिंग',
      en: 'Tracking',
    },
    payments: {
      mr: 'पेमेंट्स',
      hi: 'भुगतान',
      en: 'Payments',
    },
    grievance: {
      mr: 'तक्रार',
      hi: 'शिकायत',
      en: 'Grievance',
    },
  },
  auth: {
    login: {
      mr: 'प्रवेश करा / Login',
      hi: 'लॉग इन करें / Login',
      en: 'Sign In / Login',
    },
    logout: {
      mr: 'लॉगआउट',
      hi: 'लॉगआउट',
      en: 'Logout',
    },
    switchAccount: {
      mr: 'खाते बदला',
      hi: 'खाता बदलें',
      en: 'Switch Account',
    },
    mobileOtp: {
      mr: 'मोबाईल OTP',
      hi: 'मोबाइल OTP',
      en: 'Mobile OTP',
    },
    aadhaarUid: {
      mr: 'आधार KYC',
      hi: 'आधार KYC',
      en: 'Aadhaar UID',
    },
    sendOtp: {
      mr: 'OTP मिळवा',
      hi: 'OTP प्राप्त करें',
      en: 'Send OTP',
    },
    verifyAndSignIn: {
      mr: 'पोर्टलवर प्रवेश करा',
      hi: 'पोर्टल में प्रवेश करें',
      en: 'Verify & Sign In',
    },
    instantDemo: {
      mr: 'किंवा चाचणीसाठी थेट प्रवेश करा',
      hi: 'या परीक्षण हेतु त्वरित प्रवेश करें',
      en: 'Or Instant 1-Click Demo',
    },
    quickLogin: {
      mr: '१-क्लिक प्रवेश',
      hi: '१-क्लिक प्रवेश',
      en: 'Quick Login',
    },
    operatorPin: {
      mr: '४-अंकी सुरक्षा पिन',
      hi: '४-अंकीय सुरक्षा पिन',
      en: '4-Digit Terminal PIN',
    },
    operatorLogin: {
      mr: 'ऑपरेटर डेस्क सुरू करा',
      hi: 'ऑपरेटर टर्मिनल शुरू करें',
      en: 'Open Operator Terminal',
    },
    adminLogin: {
      mr: 'कमांड सेंटरमध्ये प्रवेश करा',
      hi: 'कमांड सेंटर में प्रवेश करें',
      en: 'Sign In to Command Center',
    },
  },
  helpline: {
    title: {
      mr: 'शेतकरी मदत कक्ष',
      hi: 'किसान सहायता केंद्र',
      en: 'Farmer Helpline',
    },
    tollFree: {
      mr: 'टोल-फ्री हेल्पलाईन: १८००-१८०-१५५१',
      hi: 'टोल-फ्री हेल्पलाइन: 1800-180-1551',
      en: 'Toll-Free Helpline: 1800-180-1551',
    },
  },
  voiceAssist: {
    title: {
      mr: 'आवाज सहाय्यक',
      hi: 'आवाज सहायक',
      en: 'Voice Assistant',
    },
  },
  queue: {
    token: {
      mr: 'टोकन',
      hi: 'टोकन',
      en: 'Token',
    },
    farmersAhead: {
      mr: 'शेतकरी पुढे',
      hi: 'किसान आगे',
      en: 'Farmers Ahead',
    },
    estimatedWait: {
      mr: 'अपेक्षित प्रतीक्षा',
      hi: 'अनुमानित प्रतीक्षा',
      en: 'Expected Wait',
    },
    minutes: {
      mr: 'मिनिटे',
      hi: 'मिनट',
      en: 'minutes',
    },
    currentServing: {
      mr: 'सध्या सुरू असलेले टोकन',
      hi: 'वर्तमान में सेवारत टोकन',
      en: 'Currently Serving',
    },
    gatePass: {
      mr: 'डिजिटल गेट पास',
      hi: 'डिजिटल गेट पास',
      en: 'Digital Gate Pass',
    },
  },
};
