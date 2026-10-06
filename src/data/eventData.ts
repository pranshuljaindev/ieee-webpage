/**
 * IEEE InnovateX 2026 - Centralized Event Data Configuration
 * 
 * Edit this file to update event details, schedule, speakers, 
 * registration links, and branding without modifying UI components.
 */

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  category: string;
  description: string;
  locationHint?: string;
  isKeynote?: boolean;
}

export interface Speaker {
  id: string;
  code: string; // e.g. "Speaker 01"
  name: string;
  title: string;
  topic: string;
  bio: string;
  avatarUrl: string;
  linkedinUrl: string;
  websiteUrl?: string;
  abstract?: string;
}

export interface SocietyGroup {
  id: string;
  abbr: string;
  fullName: string;
  tagline: string;
  description: string;
  logoUrl: string;
  websiteUrl: string;
  focusArea: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const EVENT_DATA = {
  // 1. General Event Information (All placeholders clearly labeled)
  event: {
    name: "IEEE InnovateX 2026",
    shortName: "InnovateX 2026",
    superTitle: "IEEE STUDENT SOCIETY PRESENTS",
    tagline: "Where Ideas Meet Engineering",
    description:
      "IEEE InnovateX 2026 is a student-focused technical symposium bringing together innovation, applied engineering, emerging technology, and collaborative ideas. Hosted by the IEEE Student Society in association with the Industry Applications Society (IAS) and the Robotics & Automation Society (RAS).",
    
    // Exact requested placeholders (do not invent dates or venues)
    date: "Coming Soon",
    venue: "To Be Announced",
    organizer: "IEEE Student Society",
    
    // Registration Target URL (Replace with your Google Form, Luma, or ticketing link)
    registrationUrl: "https://forms.gle/placeholder-innovatex-2026",
    
    // Contact & Support
    contactEmail: "ieee.innovatex2026@placeholder.edu",
    edition: "2026 Edition",
    academicYear: "2025–2026",
  },

  // 2. Navigation items
  navigation: [
    { label: "Home", href: "#hero" },
    { label: "Schedule", href: "#schedule" },
    { label: "Speakers", href: "#speakers" },
    { label: "About", href: "#about" },
    { label: "Societies", href: "#societies" },
  ] as NavItem[],

  // 3. Four Schedule Items (Timeline)
  schedule: [
    {
      id: "slot-01",
      time: "09:30 AM",
      title: "Registration & Welcome",
      category: "Arrival & Kit Distribution",
      description: "Delegate check-in, distribution of symposium kits, and morning networking reception.",
      locationHint: "Main Reception Foyer",
    },
    {
      id: "slot-02",
      time: "10:00 AM",
      title: "Opening Ceremony",
      category: "Inauguration & Address",
      description: "Welcome address by student society leadership, introduction of IEEE, IAS, and RAS mandates, and event overview.",
      locationHint: "Main Auditorium",
    },
    {
      id: "slot-03",
      time: "11:00 AM",
      title: "Keynote Session",
      category: "Distinguished Lecture",
      description: "Plenary technical talks on frontiers in technology, industrial automation, and emerging engineering disciplines.",
      locationHint: "Main Auditorium",
      isKeynote: true,
    },
    {
      id: "slot-04",
      time: "01:00 PM",
      title: "Innovation Showcase",
      category: "Demonstration & Interaction",
      description: "Interactive exhibition of student hardware prototypes, algorithmic demonstrations, and peer technical exchange.",
      locationHint: "Exhibition Hall & Tech Atrium",
    },
  ] as ScheduleItem[],

  // 4. Exactly 2 Keynote Speaker Cards (Placeholders as specified)
  speakers: [
    {
      id: "spk-01",
      code: "Speaker 01",
      name: "Dr. [Speaker Name]",
      title: "Distinguished Researcher & Academic Fellow",
      topic: "Technology & Innovation",
      bio: "Invited academic researcher pioneering cross-disciplinary methodologies in next-generation computing architectures and practical engineering frameworks.",
      avatarUrl: "/assets/images/speaker_tech_avatar_1_1790888162879.jpg",
      linkedinUrl: "https://www.linkedin.com/in/placeholder-speaker-1",
      websiteUrl: "https://scholar.google.com/citations?user=placeholder",
      abstract: "A keynote exploration into the translation of foundational engineering research into scalable technical innovations, addressing challenges across autonomous computation and systems design."
    },
    {
      id: "spk-02",
      code: "Speaker 02",
      name: "Dr. [Speaker Name]",
      title: "Senior Engineering Specialist & Systems Lead",
      topic: "Emerging Technologies",
      bio: "Industry practitioner and systems investigator specializing in robotics, embedded intelligence, and sustainable automation infrastructures.",
      avatarUrl: "/assets/images/speaker_tech_avatar_2_1790888173151.jpg",
      linkedinUrl: "https://www.linkedin.com/in/placeholder-speaker-2",
      websiteUrl: "https://scholar.google.com/citations?user=placeholder",
      abstract: "Examining contemporary paradigms in sensor fusion, adaptive control, and modern robotic deployments that bridge theoretical robotics with industrial applicability."
    },
  ] as Speaker[],

  // 5. Associated Societies: IEEE, IAS, RAS
  societies: [
    {
      id: "soc-ieee",
      abbr: "IEEE",
      fullName: "Institute of Electrical and Electronics Engineers",
      tagline: "Advancing Technology for Humanity",
      description: "The world's largest technical professional organization dedicated to advancing technology for the benefit of humanity through conferences, peer-reviewed journals, and educational initiatives.",
      logoUrl: "/assets/ieee-logo.jpg",
      websiteUrl: "https://www.ieee.org",
      focusArea: "Global Engineering & Standards",
    },
    {
      id: "soc-ias",
      abbr: "IEEE IAS",
      fullName: "IEEE Industry Applications Society",
      tagline: "Linking Research to Practice",
      description: "Specializes in the unique electrical and electronic systems needs of industry and commerce, focusing on safe, reliable, and energy-efficient industrial applications and technologies.",
      logoUrl: "/assets/ias-logo.png",
      websiteUrl: "https://ias.ieee.org",
      focusArea: "Industrial Power & Automation",
    },
    {
      id: "soc-ras",
      abbr: "IEEE RAS",
      fullName: "IEEE Robotics and Automation Society",
      tagline: "Innovating the Future of Robotics",
      description: "Fosters the development and facilitates the exchange of scientific and technological knowledge in Robotics and Automation that benefits members, the profession and humanity.",
      logoUrl: "/assets/ras-logo.jpg",
      websiteUrl: "https://www.ieee-ras.org",
      focusArea: "Robotics & Autonomous Systems",
    },
  ] as SocietyGroup[],

  // 6. About Pillars
  aboutPillars: [
    {
      title: "Engineering Rigor",
      description: "Rooted in foundational scientific principles, emphasizing practical system design, mathematical precision, and disciplined engineering execution.",
    },
    {
      title: "Robotics & Automation",
      description: "Exploring state-of-the-art developments in mechatronics, intelligent feedback loops, sensor integration, and industrial manipulation.",
    },
    {
      title: "Student Technical Community",
      description: "An inclusive platform empowering undergraduate and graduate engineers to showcase research, exchange ideas, and build peer networks.",
    },
    {
      title: "Industry & Academic Perspectives",
      description: "Connecting rigorous academic research with tangible industrial problems, guided by the joint vision of IEEE, IAS, and RAS.",
    },
  ],

  // 7. Footer & Brand Assets
  assets: {
    ieeeLogo: "/assets/ieee-logo.jpg",
    iasLogo: "/assets/ias-logo.png",
    rasLogo: "/assets/ras-logo.jpg",
    footerBanner: "/assets/footer-banner.jpg",
    heroImage: "/assets/images/hero_engineering_geometry_1790888183093.jpg",
    // Original provided Kommodo viewer URLs for reference & provenance
    kommodoUrls: {
      ieee: "https://kommodo.ai/i/EtJRryiEBiWtEZ0P6uI5",
      ias: "https://kommodo.ai/i/fZX7Oap2QzKzLWLJFr96",
      ras: "https://kommodo.ai/i/HMDQxvrIYT1iYhYlSRr5",
      footer: "https://kommodo.ai/i/MrRh7jqDYuucqnLeiKzM",
    },
  },

  // 8. Social Links
  socials: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/placeholder-ieee-innovatex", label: "IEEE InnovateX on LinkedIn" },
    { name: "GitHub", url: "https://github.com/placeholder-ieee-innovatex", label: "IEEE InnovateX on GitHub" },
    { name: "Twitter / X", url: "https://x.com/placeholder_ieee", label: "IEEE Student Society on X" },
    { name: "Instagram", url: "https://instagram.com/placeholder_ieee", label: "IEEE Student Branch on Instagram" },
  ],
};
