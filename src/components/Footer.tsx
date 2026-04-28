import Link from 'next/link';
import { GraduationCap, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Browse Scholarships', href: '/scholarships' },
    { label: 'Scholarship Guide', href: '/guide' },
    { label: 'Categories', href: '/scholarships' },
  ],
  Resources: [
    { label: 'How to Apply', href: '/guide' },
    { label: 'Visa Information', href: '/guide' },
    { label: 'FAQ', href: '/guide' },
  ],
  Company: [
    { label: 'About Us', href: '/' },
    { label: 'Contact', href: '/' },
    { label: 'Privacy Policy', href: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-violet-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary-400 to-violet-400 bg-clip-text text-transparent">
                EasyScholars
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Your trusted platform for discovering and applying to international scholarships. 
              We make the path to global education accessible for everyone.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Mail, href: '#', label: 'Email' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-slate-100 font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {new Date().getFullYear()} EasyScholars. All rights reserved.
          </p>
          <p className="text-xs">
            Built with ❤️ to help students find their path to education.
          </p>
        </div>
      </div>
    </footer>
  );
}
