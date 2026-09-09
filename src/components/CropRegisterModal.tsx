import React, { useState } from 'react';
import { Language, RegisteredCrop } from '../types';

interface CropRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddCrop: (crop: RegisteredCrop) => void;
}

export const CropRegisterModal: React.FC<CropRegisterModalProps> = ({
  isOpen,
  onClose,
  language,
  onAddCrop,
}) => {
  const [cropName, setCropName] = useState('कापूस / कॉटन (Cotton)');
  const [surveyNo, setSurveyNo] = useState('142/2A');
  const [areaAcres, setAreaAcres] = useState('3.5');
  const [expectedWeight, setExpectedWeight] = useState('35.0');
  const [village, setVillage] = useState('पिंपळगाव बसवंत');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const weightNum = parseFloat(expectedWeight) || 30;
    const isCotton = cropName.includes('कापूस');
    const rate = isCotton ? 7521 : 4892;

    const newCrop: RegisteredCrop = {
      id: `crop-${Date.now()}`,
      nameMr: cropName,
      nameEn: isCotton ? 'Cotton' : 'New Crop',
      gradeMr: "दर्जा 'अ'",
      gradeEn: "Grade 'A'",
      weightQtl: weightNum,
      scheduledTimeMr: '१५ सप्टें, सकाळी १०:००',
      scheduledTimeEn: '15 Sep, 10:00 AM',
      mspRatePerQtl: rate,
      expectedTotalAmount: Math.round(weightNum * rate),
      moisturePercent: 9.5,
      maxMoistureAllowed: 12.0,
      isMoistureAcceptable: true,
      imageUrl: isCotton
        ? 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&auto=format&fit=crop&q=60'
        : 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyv675iEzzD4n4UQHufnmN4MFm8vaY1LaFB_4961SAu4O4XAlOeU_nEkf3cZKG0ltSwiNWLLta2o2iljyhaYsq1KHaezbkkbCbEqtkIVNJrG7X7QVwjCqQ2vnUexkPbHbQu1ulaEl34pkHgpaHBXiKg-0S3UGuQPTJN9mI1-gH2it5NWVHJMzH8VbVubNZ3djdCFpkxr4Zu4eLFPo5F_cb9k1eLs7itPveydmfeSGneRc4uWOGJ__C',
      status: 'scheduled',
    };

    onAddCrop(newCrop);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md p-5 border border-outline-variant/40 shadow-xl flex flex-col space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-primary text-[24px]">add_task</span>
            <h2 className="text-base font-bold text-on-surface">
              {language === 'mr' ? 'नवीन पीक नोंदणी (७/१२ संलग्न)' : 'New Crop Registration (7/12)'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div>
            <label className="text-xs font-bold text-on-surface block mb-1">
              {language === 'mr' ? 'पीक निवडा' : 'Select Crop'}
            </label>
            <select
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="कापूस / कॉटन (Cotton)">कापूस / कॉटन (Cotton)</option>
              <option value="सोयाबीन (Soybean)">सोयाबीन (Soybean)</option>
              <option value="हरभरा / चणा (Gram)">हरभरा / चणा (Gram)</option>
              <option value="तूर / अरहर (Pigeon Pea)">तूर / अरहर (Tur)</option>
              <option value="मका (Maize)">मका (Maize)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                {language === 'mr' ? '७/१२ गट क्रमांक (Survey)' : 'Survey / Gat No.'}
              </label>
              <input
                type="text"
                value={surveyNo}
                onChange={(e) => setSurveyNo(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-mono font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                {language === 'mr' ? 'पेरणी क्षेत्र (एकर)' : 'Sown Area (Acres)'}
              </label>
              <input
                type="number"
                step="0.1"
                value={areaAcres}
                onChange={(e) => setAreaAcres(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                {language === 'mr' ? 'अपेक्षित उत्पादन (Qtl)' : 'Expected Qtl'}
              </label>
              <input
                type="number"
                step="0.5"
                value={expectedWeight}
                onChange={(e) => setExpectedWeight(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs font-bold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-on-surface block mb-1">
                {language === 'mr' ? 'गाव / तालुका' : 'Village'}
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/40 text-xs"
                required
              />
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-xs text-on-surface-variant flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">task_alt</span>
            <span>
              {language === 'mr'
                ? 'ई-पीक पाहणी (e-Pik Pahani) पोर्टलवरून डेटा स्वयंचलित प्रमाणित केला जाईल.'
                : 'Data verified via Maharashtra e-Pik Pahani portal.'}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high"
            >
              {language === 'mr' ? 'रद्द करा' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs"
            >
              {language === 'mr' ? 'नोंदणी पूर्ण करा' : 'Register Crop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
