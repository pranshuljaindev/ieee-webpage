import React, { useState, useEffect } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { X, ExternalLink, CheckCircle2, ShieldAlert, ArrowRight, Copy, Check } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    institution: '',
    trackInterest: 'Robotics & Automation',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter your full name and valid student/institutional email.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(EVENT_DATA.event.registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reg-modal-title"
    >
      <div className="bg-[#091124] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          aria-label="Close Registration Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-wider mb-1">
            Delegate Registration Portal
          </div>
          <h3 id="reg-modal-title" className="text-2xl font-bold text-white tracking-tight">
            Register for {EVENT_DATA.event.name}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {EVENT_DATA.event.tagline} · Organized by {EVENT_DATA.event.organizer}
          </p>
        </div>

        {/* Primary Options: Direct Form Link OR Pre-Registration */}
        {submitted ? (
          <div className="space-y-6 text-center py-6">
            <div className="w-14 h-14 bg-emerald-950/80 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-700/60">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">Pre-Registration Confirmed!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your provisional delegate interest for the{' '}
                <span className="text-sky-300 font-semibold">{formData.trackInterest}</span> track has been logged.
              </p>
              <p className="text-xs text-slate-400">
                You will receive priority access at <strong>{formData.email}</strong> as soon as the final venue and seat allotments are finalized.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#00629B] hover:bg-[#0072CE] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Quick Action: Direct Link Banner */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>CONFIGURED REGISTRATION URL</span>
                <span className="text-sky-400">[Editable in eventData.ts]</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={EVENT_DATA.event.registrationUrl}
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 select-all"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
                  title="Copy registration link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href={EVENT_DATA.event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-[#00629B] hover:bg-[#0072CE] rounded-lg transition-colors"
              >
                <span>Open Registration Form in New Tab</span>
                <ExternalLink className="w-4 h-4 text-sky-200" />
              </a>
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-800 w-full" />
              <span className="bg-[#091124] px-3 text-xs font-mono text-slate-400 uppercase">
                or pre-register interest directly
              </span>
              <div className="border-t border-slate-800 w-full" />
            </div>

            {/* Inline Pre-Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Full Name <span className="text-sky-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Student / Academic Email <span className="text-sky-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex.morgan@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Institution / University
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Institute of Technology"
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Primary Track Interest
                  </label>
                  <select
                    value={formData.trackInterest}
                    onChange={(e) => setFormData({ ...formData, trackInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="Robotics & Automation">Robotics & Automation (RAS)</option>
                    <option value="Industrial Systems">Industrial Systems (IAS)</option>
                    <option value="Computing & Software">Computing & Software</option>
                    <option value="General Engineering">General Engineering (IEEE)</option>
                  </select>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#00629B] hover:bg-[#0072CE] active:bg-[#005282] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-sky-950/50"
                >
                  <span>Submit Pre-Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center font-mono">
                No payment or registration fees collected on this static portal.
              </div>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
