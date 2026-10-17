// Shared editorial content — single source for homepage previews and dedicated pages
export const solutions = [
  { slug: "digital-transformation", title: "Digital Transformation", k: "01", desc: "Modernize processes, systems and technology infrastructure to unlock operational agility.", bullets: ["Legacy modernization","Digital workflows","Enterprise platforms","System integration","Cloud transformation"], hero: "Modernize what holds you back." },
  { slug: "intelligent-automation", title: "Intelligent Automation", k: "02", desc: "Reduce repetitive work and improve operational efficiency with workflow and AI automation.", bullets: ["Workflow automation","AI automation","Document processing","Business process automation","Data workflows"], hero: "Automate the work that slows you down." },
  { slug: "product-engineering", title: "Product Engineering", k: "03", desc: "Transform an idea into a scalable digital product — from discovery to deployment.", bullets: ["Discovery & UX/UI","Architecture & MVP","Product development","QA & Deployment","Continuous improvement"], hero: "From idea to product, engineered to scale." },
  { slug: "enterprise-technology", title: "Enterprise Technology", k: "04", desc: "Connect critical business operations through integrated CRM, ERP and SCM platforms.", bullets: ["CRM & ERP & SCM","Enterprise portals","Business applications","APIs & Integration","Operational platforms"], hero: "Connect the systems that run your business." },
  { slug: "ai-powered-software", title: "AI-Powered Software", k: "05", desc: "Build practical AI into business products and workflows — not science fiction, but outcomes.", bullets: ["Generative AI","AI assistants","Knowledge systems","Document intelligence","Analytics & ML"], hero: "Practical AI, built into real workflows." },
  { slug: "digital-platforms", title: "Digital Platforms & SaaS", k: "06", desc: "Build scalable cloud-based products engineered for multi-tenancy, billing and growth.", bullets: ["SaaS architecture","Subscription & billing","User management & APIs","Cloud deployment","Analytics"], hero: "SaaS platforms built to grow." },
  { slug: "business-process-transformation", title: "Business Process Transformation", k: "07", desc: "Re-engineer how work gets done — from manual handoffs to governed digital workflows.", bullets: ["Process mapping","Workflow design","Automation strategy","Change enablement","Operational governance"], hero: "Transform how work flows." },
  { slug: "system-integration", title: "System Integration", k: "08", desc: "Make systems share data, trigger workflows and deliver a unified operational view.", bullets: ["API strategy","Event-driven integration","Data unification","Legacy bridging","Observability"], hero: "One connected enterprise, not a patchwork." },
] as const;

export const services = [
  { slug: "crm-development", title: "CRM Development", short: "Custom CRM platforms for sales, customer management, marketing and service operations." },
  { slug: "erp-development", title: "ERP Development", short: "Integrated systems connecting finance, HR, inventory, procurement and operations." },
  { slug: "scm-development", title: "SCM Development", short: "Technology for inventory, procurement, logistics, warehouse and supply-chain visibility." },
  { slug: "saas-development", title: "SaaS Development", short: "End-to-end SaaS product engineering from architecture to production." },
  { slug: "ai-software-development", title: "AI Software Development", short: "AI-powered applications, assistants, automation and data solutions." },
  { slug: "mobile-app-development", title: "Mobile App Development", short: "Android, cross-platform and enterprise mobile applications." },
  { slug: "ios-development", title: "iOS Development", short: "Native and cross-platform iPhone / iPad applications." },
  { slug: "enterprise-software", title: "Enterprise Software", short: "Large-scale business applications and operational platforms." },
  { slug: "cloud-integration", title: "Cloud & Integration", short: "Cloud modernization, APIs, integrations and distributed systems." },
  { slug: "bpo", title: "BPO Services", short: "Technology-enabled business process outsourcing for scale and consistency." },
  { slug: "resource-management", title: "Resource Management", short: "Dedicated developers, engineers and technology teams on demand." },
] as const;

export const industries = [
  { slug: "automotive", title: "Automotive" },
  { slug: "healthcare", title: "Healthcare" },
  { slug: "financial-services", title: "Financial Services" },
  { slug: "retail", title: "Retail" },
  { slug: "manufacturing", title: "Manufacturing" },
  { slug: "logistics", title: "Logistics" },
  { slug: "education", title: "Education" },
  { slug: "real-estate", title: "Real Estate" },
  { slug: "ecommerce", title: "E-commerce" },
  { slug: "travel-hospitality", title: "Travel & Hospitality" },
  { slug: "professional-services", title: "Professional Services" },
] as const;

// Company contact details — single source so they stay in sync sitewide.
export const contactInfo = {
  phoneDisplay: "+91 8882033199",
  phoneHref: "tel:+918882033199",
  email: "andjaytech@gmail.com",
  emailHref: "mailto:andjaytech@gmail.com",
} as const;

// Notification routing — read only by the contact intake route, never
// exposed to the client. Set these to route accepted inquiries to an email
// inbox, CRM, or support desk. Leave empty to disable.
export const notificationRouting = {
  toEmail: process.env.CONTACT_TO_EMAIL ?? "",
  toName: process.env.CONTACT_TO_NAME ?? "",
} as const;

export const insightCategories = [
  { slug: "ai", title: "AI" },
  { slug: "digital-transformation", title: "Digital Transformation" },
  { slug: "enterprise-software", title: "Enterprise Software" },
  { slug: "cloud", title: "Cloud" },
  { slug: "business-automation", title: "Business Automation" },
  { slug: "technology-strategy", title: "Technology Strategy" },
] as const;
