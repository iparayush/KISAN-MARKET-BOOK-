import React, { useState } from 'react';
import { Language, Grievance, GrievanceCategory } from '../types';

interface GrievanceScreenProps {
  language: Language;
  grievances: Grievance[];
  onAddGrievance: (grievance: Grievance) => void;
}

export const GrievanceScreen: React.FC<GrievanceScreenProps> = ({
  language,
  grievances,
  onAddGrievance,
}) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [category, setCategory] = useState<GrievanceCategory>('weighing');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [centreName, setCentreName] = useState<string>('नाशिक APMC मुख्य केंद्र');
  const [tokenNumber, setTokenNumber] = useState<string>('#027');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newTicketId = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrievance: Grievance = {
      id: newTicketId,
      category,
      subject,
      description,
      farmerName: 'रमेश पाटील',
      farmerPhone: '+91 98224 51092',
      centreName,
      tokenNumber,
      status: 'OPEN',
      createdAt: 'आज (Just now)',
    };

    onAddGrievance(newGrievance);
    setSubject('');
    setDescription('');
    setShowForm(false);
    setSuccessToast(
      language === 'mr'
        ? `तक्रार क्र. ${newTicketId} यशस्वी नोंदवली! २४ तासांत निवारण केले जाईल.`
        : `Grievance #${newTicketId} registered successfully! 24h SLA active.`
    );
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-xl mx-auto pb-6 animate-fade-in">
      {/* Toast Alert */}
      {successToast && (
        <div className="bg-green-700 text-white p-3 rounded-xl shadow-lg flex items-center justify-between text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-white/80">✕</button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-surface-container rounded-2xl p-4 border border-outline-variant/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            {language === 'mr' ? 'शेतकरी तक्रार निवारण पोर्टल' : 'Farmer Grievance Redressal Portal'}
          </span>
          <h1 className="text-lg font-headline font-bold text-on-surface">
            {language === 'mr' ? 'तक्रार व समस्या निवारण' : 'Grievances & Redressal'}
          </h1>
          <p className="text-xs text-on-surface-variant">
            {language === 'mr'
              ? 'टोकन, वजन काटा, गुणवत्ता किंवा पेमेंट संबंधी तक्रार नोंदवा'
              : 'File issues regarding token, scale, quality or payments'}
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-3 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary-container active:scale-95 transition-all flex items-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">
            {showForm ? 'close' : 'add_circle'}
          </span>
          <span>{showForm ? (language === 'mr' ? 'बंद करा' : 'Close') : (language === 'mr' ? 'नवीन तक्रार' : 'New Ticket')}</span>
        </button>
      </div>

      {/* New Grievance Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-2xl p-4 border-2 border-primary/30 shadow-sm flex flex-col space-y-3 animate-fade-in"
        >
          <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">edit_note</span>
            <span>{language === 'mr' ? 'नवीन तक्रार अर्ज दाखल करा' : 'File a New Grievance'}</span>
          </h2>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              {language === 'mr' ? 'तक्रार प्रकार (Category)' : 'Grievance Category'}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GrievanceCategory)}
              className="w-full h-10 px-3 rounded-xl border border-outline-variant/40 bg-surface-container-low text-xs font-bold"
            >
              <option value="weighing">{language === 'mr' ? '⚖️ वजन काटा तफावत (Weighing Issue)' : '⚖️ Weighing Issue'}</option>
              <option value="payment">{language === 'mr' ? '💳 पेमेंट / DBT विलंब (Payment Issue)' : '💳 Payment Issue'}</option>
              <option value="quality">{language === 'mr' ? '🌾 धान्य गुणवत्ता / ओलावा वाद (Quality Issue)' : '🌾 Quality Issue'}</option>
              <option value="token">{language === 'mr' ? '🎫 टोकन किंवा स्लॉट समस्या (Token Issue)' : '🎫 Token Issue'}</option>
              <option value="centre">{language === 'mr' ? '🏢 केंद्र गैरसोय (Centre Issue)' : '🏢 Centre Issue'}</option>
              <option value="other">{language === 'mr' ? '📝 इतर समस्या (Other)' : '📝 Other'}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-on-surface-variant block mb-1">
                {language === 'mr' ? 'खरेदी केंद्र' : 'Procurement Centre'}
              </label>
              <input
                type="text"
                value={centreName}
                onChange={(e) => setCentreName(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-outline-variant/40 text-xs font-bold bg-surface-container-low"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-on-surface-variant block mb-1">
                {language === 'mr' ? 'संबंधित टोकन' : 'Related Token'}
              </label>
              <input
                type="text"
                value={tokenNumber}
                onChange={(e) => setTokenNumber(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-outline-variant/40 text-xs font-bold font-mono bg-surface-container-low"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              {language === 'mr' ? 'तक्रारीचा विषय (Subject)' : 'Subject'}
            </label>
            <input
              type="text"
              required
              placeholder={language === 'mr' ? 'उदा. काटा #२ वर वजन तफावत' : 'e.g. Discrepancy at Scale #2'}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-outline-variant/40 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              {language === 'mr' ? 'सविस्तर तक्रार वर्णन' : 'Detailed Description'}
            </label>
            <textarea
              rows={3}
              required
              placeholder={language === 'mr' ? 'कृपया समस्येची संपूर्ण माहिती द्या...' : 'Provide complete details...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-outline-variant/40 text-xs font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-on-surface-variant flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-green-700">security</span>
              <span>DoCA २४ तास निराकरण हमी</span>
            </span>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container active:scale-95 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              <span>{language === 'mr' ? 'तक्रार दाखल करा' : 'Submit Ticket'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Existing Grievance Tickets List */}
      <div className="flex flex-col space-y-3">
        <h2 className="text-sm font-bold text-on-surface flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
          <span>{language === 'mr' ? `माझ्या तक्रारींची स्थिती (${grievances.length})` : `My Grievance Tickets (${grievances.length})`}</span>
        </h2>

        {grievances.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col space-y-2.5"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-primary">{item.id}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'RESOLVED'
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'IN_REVIEW'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {item.status === 'RESOLVED'
                      ? '✓ निराकरण झाले (RESOLVED)'
                      : item.status === 'IN_REVIEW'
                      ? '● चौकशी सुरू (IN REVIEW)'
                      : '○ दाखल झाली (OPEN)'}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-on-surface mt-1">{item.subject}</h3>
              </div>

              <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{item.createdAt}</span>
            </div>

            <p className="text-xs text-on-surface-variant">{item.description}</p>

            <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
              <span>{item.centreName} {item.tokenNumber ? `• टोकन ${item.tokenNumber}` : ''}</span>
              <span className="capitalize font-bold text-primary font-mono">{item.category}</span>
            </div>

            {item.resolutionNote && (
              <div className="bg-primary/5 border border-primary/20 p-2.5 rounded-xl text-xs flex flex-col space-y-1">
                <span className="text-[10px] font-bold text-primary uppercase">
                  {language === 'mr' ? 'अधिकृत DoCA / APMC निवारण शेरा' : 'Official APMC Resolution'}
                </span>
                <p className="text-on-surface font-medium">{item.resolutionNote}</p>
                {item.resolvedAt && (
                  <span className="text-[9px] text-on-surface-variant font-mono">तारीख: {item.resolvedAt}</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
