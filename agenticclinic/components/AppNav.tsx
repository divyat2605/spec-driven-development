'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/agents', label: 'Agents' },
  { href: '/ailments', label: 'Ailments' },
  { href: '/therapy-types', label: 'Therapy Types' },
  { href: '/appointments', label: 'Appointments' },
] as const;

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') {
    return pathname === '/dashboard' || pathname.startsWith('/dashboard/');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AppNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 mr-1 transition-colors"
        >
          AgentClinic
        </Link>
        {links.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`relative py-1 transition-colors after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-200 hover:after:scale-x-100 ${
                active
                  ? 'font-semibold text-indigo-700 after:scale-x-100 after:bg-indigo-600'
                  : 'text-gray-700 hover:text-indigo-700'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
