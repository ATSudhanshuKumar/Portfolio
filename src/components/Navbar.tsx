import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import Logo from '../assets/logo.png';
import { scroll } from '../utils';
import { profile } from '../data/profile';

const Links = [
    { id: 'about', title: 'About' },
    { id: 'skills', title: 'Skills' },
    { id: 'experience', title: 'Experience' },
    { id: 'projects', title: 'Projects' },
    { id: 'contact', title: 'Contact' },
];

const list = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};

const item = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0 },
};

function Navbar() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState('');
    const [hovered, setHovered] = useState<string | null>(null);

    // highlight the section currently in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
            },
            { rootMargin: '-45% 0px -50% 0px' },
        );
        ['hero', ...Links.map((l) => l.id)].forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const go = (id: string) => {
        setOpen(false);
        scroll(id);
    };

    const highlighted = hovered ?? active;

    return (
        <div className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 md:top-8">
            <motion.nav
                initial={{ opacity: 0, scale: 0.25 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 0.7 }}
                className="w-full max-w-md rounded-3xl border border-white/40 bg-white/15 px-2 py-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-md lg:w-auto lg:max-w-none"
            >
                <div className="flex items-center justify-between gap-2">
                    <motion.button
                        onClick={() => go('hero')}
                        whileHover={{ scale: 1.08, rotate: -6 }}
                        whileTap={{ scale: 0.92 }}
                        className="shrink-0 rounded-full"
                        aria-label={`${profile.name} — back to top`}
                    >
                        <img src={Logo} alt={profile.name} className="h-9 w-9 rounded-full" />
                    </motion.button>

                    <motion.ul
                        variants={list}
                        initial="hidden"
                        animate="show"
                        onMouseLeave={() => setHovered(null)}
                        className="hidden items-center lg:flex"
                    >
                        {Links.map((link) => (
                            <motion.li key={link.id} variants={item} className="relative">
                                {highlighted === link.id && (
                                    <motion.span
                                        layoutId="nav-pill"
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                        className="absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-brand-600"
                                    />
                                )}
                                <motion.button
                                    onClick={() => go(link.id)}
                                    onMouseEnter={() => setHovered(link.id)}
                                    whileTap={{ scale: 0.92 }}
                                    className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                                        highlighted === link.id ? 'text-brand-700' : 'text-slate-700 hover:text-ink'
                                    }`}
                                >
                                    {link.title}
                                </motion.button>
                            </motion.li>
                        ))}
                    </motion.ul>

                    <div className="flex items-center gap-1">
                        <motion.button
                            onClick={() => setOpen((o) => !o)}
                            whileTap={{ scale: 0.85 }}
                            className="rounded-full p-2 text-ink hover:bg-white/50 lg:hidden"
                            aria-label={open ? 'Close menu' : 'Open menu'}
                            aria-expanded={open}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={open ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                    className="block"
                                >
                                    {open ? <X weight="bold" className="h-5 w-5" /> : <List weight="bold" className="h-5 w-5" />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="overflow-hidden lg:hidden"
                        >
                            {Links.map((link, i) => (
                                <motion.li
                                    key={link.id}
                                    initial={{ opacity: 0, x: -12 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.04 * i }}
                                >
                                    <button
                                        onClick={() => go(link.id)}
                                        className={`w-full rounded-2xl px-4 py-2.5 text-left text-base font-medium transition-colors ${
                                            active === link.id ? 'text-brand-700' : 'text-slate-700 hover:text-brand-700'
                                        }`}
                                    >
                                        {link.title}
                                    </button>
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
}

export default Navbar;
