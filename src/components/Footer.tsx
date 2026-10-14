import Link from "next/link";
import { Logo } from "./Logo";
import { contactInfo } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#070A0F]">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-[320px] text-sm leading-6 text-white/45">We turn complex business challenges into practical digital solutions — strategy, engineering, AI and scalable technology under one roof.</p>
            <p className="mt-4 text-xs leading-5 text-white/30">
              3rd Floor, D23 Building, S3V Business Park, Sector-59<br />
              Noida, Gautambuddha Nagar, UP – 201301, India<br />
              <a href={contactInfo.phoneHref} className="text-white/60 hover:text-white">{contactInfo.phoneDisplay}</a><br />
              <a href={contactInfo.emailHref} className="text-white/60 hover:text-white">{contactInfo.email}</a>
            </p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] font-[700] text-white/50">SOLUTIONS</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link href="/solutions/digital-transformation" className="hover:text-white transition">Digital Transformation</Link></li>
              <li><Link href="/solutions/intelligent-automation" className="hover:text-white transition">Intelligent Automation</Link></li>
              <li><Link href="/solutions/product-engineering" className="hover:text-white transition">Product Engineering</Link></li>
              <li><Link href="/solutions/enterprise-technology" className="hover:text-white transition">Enterprise Technology</Link></li>
              <li><Link href="/solutions/ai-powered-software" className="hover:text-white transition">AI-Powered Software</Link></li>
              <li><Link href="/solutions/digital-platforms" className="hover:text-white transition">Digital Platforms</Link></li>
              <li><Link href="/solutions" className="hover:text-white transition">View all →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] font-[700] text-white/50">SERVICES</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link href="/services/crm-development" className="hover:text-white transition">CRM</Link></li>
              <li><Link href="/services/erp-development" className="hover:text-white transition">ERP</Link></li>
              <li><Link href="/services/scm-development" className="hover:text-white transition">SCM</Link></li>
              <li><Link href="/services/saas-development" className="hover:text-white transition">SaaS</Link></li>
              <li><Link href="/services/ai-software-development" className="hover:text-white transition">AI Software</Link></li>
              <li><Link href="/services/mobile-app-development" className="hover:text-white transition">Mobile</Link></li>
              <li><Link href="/services" className="hover:text-white transition">View all →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] font-[700] text-white/50">INDUSTRIES</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link href="/industries/healthcare" className="hover:text-white transition">Healthcare</Link></li>
              <li><Link href="/industries/financial-services" className="hover:text-white transition">Financial Services</Link></li>
              <li><Link href="/industries/retail" className="hover:text-white transition">Retail</Link></li>
              <li><Link href="/industries/manufacturing" className="hover:text-white transition">Manufacturing</Link></li>
              <li><Link href="/industries" className="hover:text-white transition">View all →</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] font-[700] text-white/50">COMPANY</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link href="/technologies" className="hover:text-white transition">Technology</Link></li>
              <li><Link href="/process" className="hover:text-white transition">Process</Link></li>
              <li><Link href="/insights" className="hover:text-white transition">Insights</Link></li>
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.12em] font-[700] text-white/50">CAREERS</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/50">
              <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
              <li><Link href="/careers/job-search" className="hover:text-white transition">Job Search</Link></li>
              <li><Link href="/careers/students" className="hover:text-white transition">Students & Entry Level</Link></li>
              <li><Link href="/careers/contract-opportunities" className="hover:text-white transition">Contract Opportunities</Link></li>
              <li><Link href="/careers/talent-community" className="hover:text-white transition">Talent Community</Link></li>
              <li><Link href="/careers/send-resume" className="hover:text-white transition">Send Your Resume</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-white/5 pt-6">
          <p className="text-xs text-white/30">© 2026 Nexara Global Solutions. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/30">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
