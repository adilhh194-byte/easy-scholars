import Link from 'next/link';
import { GraduationCap, Github, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Browse Scholarships', href: '/scholarships' },
    { label: 'Scholarship Guide', href: '/guide' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
};

const SOCIAL_LINKS = [
  {
    Icon: Github,
    href: 'https://github.com/adilhh194-byte',
    label: 'GitHub profile',
  },
  {
    Icon: Mail,
    href: 'mailto:ahussain@edu.hse.ru',
    label: 'Email EasyScholars',
  },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-slate-600 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="bg-gradient-to-r from-primary-400 to-slate-400 bg-clip-text text-transparent">
                EasyScholars
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Your trusted platform for discovering and applying to international scholarships.
              We make the path to global education accessible for everyone.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary-600 flex items-center justify-center transition-all hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-slate-100 font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
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
            &copy; {new Date().getFullYear()} EasyScholars. All rights reserved.
          </p>
          <p className="text-xs">
            Built to help students find their path to education.
          </p>
        </div>
      </div>
    </footer>
  );
}
