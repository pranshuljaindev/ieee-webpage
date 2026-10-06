export interface ChatbotFAQ {
  id: string;
  category: 'Registration' | 'Keynotes' | 'Schedule' | 'Chapters' | 'Certificates';
  question: string;
  shortAnswer: string;
  fullAnswer: string;
}

export const PRESET_FAQS: ChatbotFAQ[] = [
  {
    id: 'faq-1',
    category: 'Registration',
    question: 'Is registration for IEEE InnovateX 2026 free?',
    shortAnswer: 'Yes, registration is 100% Free of Cost (₹0).',
    fullAnswer:
      'Yes! IEEE InnovateX 2026 is **100% Free of Cost (₹0)** for all registered students, researchers, and IEEE chapter members. Delegates can generate a customized, verifiable digital accreditation pass token (`#INX-2026-XXXX`) directly on this portal.',
  },
  {
    id: 'faq-2',
    category: 'Keynotes',
    question: 'Who are the Keynote Speakers and their topics?',
    shortAnswer: '2 Keynotes: Autonomous Robotics (RAS) and Next-Gen Smart Grids (IAS).',
    fullAnswer:
      'The symposium features **2 Distinguished Keynote Plenary Sessions**:\n\n• **Keynote 01 (#SPK-01)**: *Autonomous Robotic Systems & Embodied AI* (Focusing on SLAM, real-time kinematics, and edge neural accelerators).\n• **Keynote 02 (#SPK-02)**: *Next-Gen Industrial Power & Smart Grids* (Focusing on high-density power conversion topologies, telemetry, and renewable integration).',
  },
  {
    id: 'faq-3',
    category: 'Certificates',
    question: 'Will attendees receive a verified certificate of participation?',
    shortAnswer: 'Yes, verified IEEE Student Branch certificate awarded.',
    fullAnswer:
      'Yes. All registered attendees who check in at the symposium sessions will be awarded an official **IEEE Student Branch Certificate of Participation** accredited jointly by IEEE, IEEE IAS, and IEEE RAS.',
  },
  {
    id: 'faq-4',
    category: 'Schedule',
    question: 'What is the symposium schedule and itinerary?',
    shortAnswer: '4-phase itinerary: Keynote 01, Student Paper Track, Keynote 02, and Tri-Society Showcase.',
    fullAnswer:
      'The 4-phase symposium roadmap includes:\n\n1. **09:00 AM** — Plenary Opening & Keynote 01 (Autonomous Robotic Systems)\n2. **11:30 AM** — Technical Paper Track & Student Demonstration Exhibits\n3. **02:00 PM** — Keynote 02 (Next-Gen Industrial Power & Smart Grids)\n4. **04:30 PM** — Tri-Society Innovation Showcase & Awards Ceremony',
  },
  {
    id: 'faq-5',
    category: 'Chapters',
    question: 'How do IEEE, IAS, and RAS collaborate in this event?',
    shortAnswer: 'Global standards (IEEE) + Industrial power (IAS) + Autonomous robotics (RAS).',
    fullAnswer:
      'The symposium converges 3 major technical bodies:\n\n• **IEEE**: Global Institute of Electrical and Electronics Engineers providing global engineering ethics, computing standards, and academic prestige.\n• **IEEE IAS (Industry Applications Society)**: Drives industrial power systems, drives, motor controls, and smart energy grids.\n• **IEEE RAS (Robotics and Automation Society)**: Advances autonomous robotics, cybernetics, computer vision, and sensor fusion.',
  },
  {
    id: 'faq-6',
    category: 'Schedule',
    question: 'When and where is IEEE InnovateX 2026 taking place?',
    shortAnswer: 'Date: Coming Soon / Venue: To Be Announced campus auditorium.',
    fullAnswer:
      'The symposium will take place in **2026**. Official date and campus auditorium venue ratification announcements are currently pending program committee finalization.',
  },
];

export const SUPPORT_INFO = {
  email: 'support@ieee-innovatex2026.org',
  helpdesk: 'helpdesk@innovatex2026.edu',
  hours: '08:00 AM – 07:00 PM (IST) // 24/7 on Symposium Days',
  deskLocation: 'IEEE Student Branch Secretariat & Registration Helpdesk',
  responseGuarantee: 'Under 2 hours for delegate inquiries',
};
