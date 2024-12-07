import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
  const socialLinks = [
    {
      icon: <Twitter size={20} />,
      href: 'https://x.com/frndzcallmeSAM',
      label: 'Twitter'
    },
    {
      icon: <Linkedin size={20} />,
      href: 'https://www.linkedin.com/in/samarth-singh-491449221/',
      label: 'LinkedIn'
    },
    {
      icon: <Github size={20} />,
      href: 'https://github.com/samarth-sxngh',
      label: 'GitHub'
    },
    {
      icon: <Mail size={20} />,
      href: 'mailto:singh.samarth.1101@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="w-full py-6 mt-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> by Samarth
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
