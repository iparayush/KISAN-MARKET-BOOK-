import React, { useState } from 'react';
import { Language, AdminAlert, MandiCenter } from '../types';

interface AdminDashboardProps {
  language: Language;
  alerts: AdminAlert[];
  centres: MandiCenter[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  alerts,
  centres,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Nashik');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'weekly' | 'season'>('today');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExport = (format: string) => {
    setExportNotice(
      language === 'mr'
        ? `${format} खरेदी ऑडिट अहवाल यशस्वीरीत्या डाऊनलोड केला!`
        : `Official ${format} procurement audit report downloaded!`
    );
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="flex flex-col w-full space-y-4 max-w-5xl mx-auto pb-12 animate-fade-in">
      {/* Toast Notification */}
      {exportNotice && (
        <div className="fixed top-28 inset-x-4 max-w-lg mx-auto z-50 bg-[#1e293b] text-white p-3 rounded-xl shadow-xl flex items-center justify-between gap-2 border border-slate-700">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-green-400">download_done</span>
            <span className="text-xs font-bold">{exportNotice}</span>
          </div>
          <button
            onClick={() => setExportNotice(null)}
            className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top DoCA Administrator Header */}
      <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-[#1e293b] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base md:text-lg font-headline font-bold text-on-surface">
                {language === 'mr'
                  ? 'DoCA राष्ट्रीय व राज्य खरेदी देखरेख नियंत्रण कक्ष'
                  : 'DoCA Central & State Procurement Command Center'}
              </h1>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 text-[10px] font-bold">
                SIH 2026 PS-26032
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              {language === 'mr'
                ? 'ग्राहक व्यवहार विभाग • अन्न व सार्वजनिक वितरण मंत्रालय, भारत सरकार'
                : 'Department of Consumer Affairs • Ministry of Consumer Affairs, Food & Public Distribution'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* District selector */}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="h-9 px-2.5 rounded-xl border border-outline-variant/40 text-xs font-bold bg-surface-container-low"
          >
            <option value="Nashik">नाशिक विभाग (Nashik)</option>
            <option value="Pune">पुणे विभाग (Pune)</option>
            <option value="Nagpur">नागपूर विभाग (Nagpur)</option>
            <option value="All">संपूर्ण महाराष्ट्र (All)</option>
          </select>

          {/* Export Report button */}
          <button
            onClick={() => handleExport('PDF')}
            className="h-9 px-3 rounded-xl bg-[#1e293b] text-white text-xs font-bold hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">picture_as_pdf</span>
            <span>{language === 'mr' ? 'अहवाल निर्यात' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* 6 Macro KPIs (FR-18) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'नोंदणीकृत शेतकरी' : 'Registered Farmers'}
          </span>
          <span className="text-2xl font-headline font-black text-on-surface mt-1">1,48,290</span>
          <span className="text-[10px] text-green-700 font-bold mt-0.5">↑ +१,४२० आज</span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'आजचे स्लॉट बुकिंग' : "Today's Bookings"}
          </span>
          <span className="text-2xl font-headline font-black text-primary mt-1">4,820</span>
          <span className="text-[10px] text-primary font-bold mt-0.5">९१% क्षमता भरली</span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'सक्रिय खरेदी केंद्रे' : 'Active Mandis'}
          </span>
          <span className="text-2xl font-headline font-black text-on-surface mt-1">184</span>
          <span className="text-[10px] text-green-700 font-bold mt-0.5">१००% ऑनलाइन देखरेख</span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'एकूण खरेदी आवक' : 'Total Procured'}
          </span>
          <span className="text-2xl font-headline font-black text-on-surface mt-1">2,42,800 Q</span>
          <span className="text-[10px] text-on-surface-variant font-bold mt-0.5">सोयाबीन, कापूस, चणा</span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'खरेदी मूल्य (MSP)' : 'Procurement Value'}
          </span>
          <span className="text-2xl font-headline font-black text-[#00652c] mt-1">₹118.5 Cr</span>
          <span className="text-[10px] text-green-700 font-bold mt-0.5">शासकीय हमीभाव</span>
        </div>

        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col">
          <span className="text-[10px] text-on-surface-variant font-bold uppercase">
            {language === 'mr' ? 'DBT पेमेंट पूर्तता' : 'DBT Disbursed'}
          </span>
          <span className="text-2xl font-headline font-black text-secondary mt-1">94.2%</span>
          <span className="text-[10px] text-green-700 font-bold mt-0.5">४८ तासांत थेट खात्यात</span>
        </div>
      </div>

      {/* Centre Congestion Radar & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Centre Congestion Radar (FR-18 Centre Comparison & Monitoring) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
              <h2 className="text-sm font-bold text-on-surface">
                {language === 'mr'
                  ? 'खरेदी केंद्र थेट गर्दी व क्षमता रडार (Congestion Radar)'
                  : 'Mandi Live Congestion & Queue Radar'}
              </h2>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              {language === 'mr' ? 'थेट सेन्सर व काटा अपडेट' : 'Live Scale Telemetry'}
            </span>
          </div>

          <div className="flex flex-col space-y-2.5">
            {/* Nashik APMC */}
            <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-on-surface">नाशिक मुख्य बाजार समिती (APMC)</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 text-[10px] font-bold">
                  🟢 सामान्य (Normal)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">रांगेतील वाहने</span>
                  <span className="font-bold text-on-surface">12 वाहने</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">प्रतीक्षा वेळ</span>
                  <span className="font-bold text-primary font-mono">34 मिनिटे</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">सक्रिय काटे</span>
                  <span className="font-bold text-on-surface">3/3 सुरू</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">क्षमता वापर</span>
                  <span className="font-bold text-on-surface font-mono">72%</span>
                </div>
              </div>
            </div>

            {/* Pimpalgaon */}
            <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs font-bold text-on-surface">पिंपळगाव बसवंत उप-बाजार समिती</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                  🟡 मध्यम गर्दी (Moderate)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">रांगेतील वाहने</span>
                  <span className="font-bold text-on-surface">24 वाहने</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">प्रतीक्षा वेळ</span>
                  <span className="font-bold text-secondary font-mono">65 मिनिटे</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">सक्रिय काटे</span>
                  <span className="font-bold text-on-surface">2/2 सुरू</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">क्षमता वापर</span>
                  <span className="font-bold text-secondary font-mono">88%</span>
                </div>
              </div>
            </div>

            {/* Malegaon Hub */}
            <div className="p-3 rounded-xl border border-red-200 bg-red-50/50 dark:bg-red-950/20 flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="text-xs font-bold text-on-surface">मालेगाव मध्यवर्ती हमीभाव केंद्र</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[10px] font-bold">
                  🔴 उच्च गर्दी (Congested)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-on-surface-variant pt-1 border-t border-red-200">
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">रांगेतील वाहने</span>
                  <span className="font-bold text-on-surface">38 वाहने</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">प्रतीक्षा वेळ</span>
                  <span className="font-bold text-error font-mono">82 मिनिटे</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">सक्रिय काटे</span>
                  <span className="font-bold text-on-surface">2/3 सुरू</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">क्षमता वापर</span>
                  <span className="font-bold text-error font-mono">98%</span>
                </div>
              </div>
            </div>

            {/* Dindori Hub */}
            <div className="p-3 rounded-xl border border-outline-variant/30 bg-surface-container-low flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-bold text-on-surface">दिंडोरी शासकीय खरेदी केंद्र</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-green-100 text-green-800 text-[10px] font-bold">
                  🟢 सामान्य (Normal)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1 text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">रांगेतील वाहने</span>
                  <span className="font-bold text-on-surface">6 वाहने</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">प्रतीक्षा वेळ</span>
                  <span className="font-bold text-primary font-mono">25 मिनिटे</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">सक्रिय काटे</span>
                  <span className="font-bold text-on-surface">2/2 सुरू</span>
                </div>
                <div>
                  <span className="block text-[9px] text-on-surface-variant uppercase">क्षमता वापर</span>
                  <span className="font-bold text-on-surface font-mono">45%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Alerts & Bottleneck Detection (FR-18 Alerts) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">notifications_active</span>
              <h2 className="text-sm font-bold text-on-surface">
                {language === 'mr' ? ' DoCA स्वयंचलित सूचना व इशारे' : 'Automated Alerts & Bottlenecks'}
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
              {alerts.length} सूचना
            </span>
          </div>

          <div className="flex flex-col space-y-2.5">
            {alerts.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border flex flex-col space-y-1.5 ${
                  item.severity === 'warning'
                    ? 'border-amber-300 bg-amber-50/70 dark:bg-amber-950/20'
                    : item.severity === 'critical'
                    ? 'border-red-300 bg-red-50/70 dark:bg-red-950/20'
                    : 'border-outline-variant/30 bg-surface-container-low'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface">
                    {language === 'mr' ? item.titleMr : item.titleEn}
                  </span>
                  <span className="text-[10px] text-on-surface-variant">{item.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant">
                  {language === 'mr' ? item.descriptionMr : item.descriptionEn}
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="font-bold text-primary">{item.centreName}</span>
                  <span className="text-on-surface-variant font-mono uppercase font-bold">
                    {item.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Dynamic Slot Rebalancing Action */}
          <div className="bg-primary/10 border border-primary/30 p-3 rounded-xl flex flex-col space-y-2 mt-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">alt_route</span>
              <span className="text-xs font-bold text-primary">
                {language === 'mr' ? 'स्मार्ट स्लॉट डायव्हर्जन सक्रिय' : 'Dynamic Slot Rebalancing Active'}
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant">
              {language === 'mr'
                ? 'मालेगाव व पिंपळगाव केंद्रावरील गर्दी कमी करण्यासाठी नवीन शेतकऱ्यांना दिंडोरी व नाशिक APMC कडे प्राधान्य शिफारस सुरू आहे.'
                : 'Algorithms automatically nudging new bookings towards lower wait centres.'}
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Breakdown & Procurement Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Crop Distribution */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-3">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">pie_chart</span>
            <span>{language === 'mr' ? 'पीकनिहाय खरेदी वितरण (२०२६ खरीप)' : 'Crop-wise Procurement Distribution'}</span>
          </h3>

          <div className="space-y-2 pt-1">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>सोयाबीन (Soybean)</span>
                <span className="font-mono">1,26,256 Q (52%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: '52%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>कापूस / कॉटन (Cotton)</span>
                <span className="font-mono">58,272 Q (24%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>हरभरा / चणा (Gram / Chana)</span>
                <span className="font-mono">33,992 Q (14%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: '14%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>इतर धान्य (Others)</span>
                <span className="font-mono">24,280 Q (10%)</span>
              </div>
              <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                <div className="bg-slate-500 h-full rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Queue Surge & Peak Arrival Hours */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col space-y-3">
          <h3 className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
            <span>{language === 'mr' ? 'दिवसभरातील गर्दी आवक तास (Surge Density)' : 'Hourly Arrival Surge Curve'}</span>
          </h3>

          <div className="flex items-end justify-between h-32 pt-6 px-2 border-b border-outline-variant/30">
            {[
              { time: '08 AM', h: '30%', count: '240' },
              { time: '10 AM', h: '85%', count: '890' },
              { time: '12 PM', h: '95%', count: '1040' },
              { time: '02 PM', h: '60%', count: '620' },
              { time: '04 PM', h: '45%', count: '480' },
              { time: '06 PM', h: '20%', count: '180' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <span className="text-[9px] font-mono text-on-surface-variant">{item.count}</span>
                <div
                  className={`w-7 rounded-t-md transition-all ${
                    idx === 2 ? 'bg-error' : idx === 1 ? 'bg-secondary' : 'bg-primary'
                  }`}
                  style={{ height: item.h }}
                />
                <span className="text-[10px] text-on-surface-variant font-bold">{item.time}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-on-surface-variant pt-1">
            {language === 'mr'
              ? 'टीप: सकाळी १० ते दुपारी १२ हा गर्दीचा उच्चांकी काळ असून डिजिटल टोकन स्लॉटिंगमुळे ४२% वाटप दुपारच्या सत्रात यशस्वी वळवले गेले आहे.'
              : 'AI slot balancing successfully flattened peak 10 AM-12 PM queues by 42% across all mandis.'}
          </p>
        </div>
      </div>
    </div>
  );
};
