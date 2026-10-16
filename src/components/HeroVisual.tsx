import { motion } from 'framer-motion';
import { Code } from '@phosphor-icons/react';
import heroImg from '../assets/hero.webp';
import { profile } from '../data/profile';

function HeroVisual() {
    return (
        <div className="relative mx-auto w-full max-w-[540px] py-8 lg:max-w-none">
            {/* soft blue glow behind the frame */}
            <motion.div
                aria-hidden="true"
                animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-6 -z-10 rounded-[2rem] bg-[#289EFD]/40 blur-3xl"
            />

            {/* framed image: enters, then floats gently */}
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.94 }}
                animate={{ opacity: 1, y: [0, -10, 0], scale: 1 }}
                transition={{
                    opacity: { duration: 0.8, delay: 0.2 },
                    scale: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
                    y: { duration: 6, delay: 1, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="overflow-hidden rounded-[1.75rem] border-4 border-white/80 shadow-2xl shadow-[#289EFD]/25"
            >
                {/* slow zoom inside the frame */}
                <motion.img
                    src={heroImg}
                    alt="Illustration of a software professional in a suit working on a laptop"
                    width={1200}
                    height={800}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    className="block h-auto w-full"
                />
            </motion.div>

            {/* floating card: role */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
                transition={{
                    opacity: { delay: 0.9, duration: 0.5 },
                    x: { delay: 0.9, duration: 0.5, ease: 'easeOut' },
                    y: { delay: 1.4, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute -left-2 bottom-1 flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-xl shadow-slate-900/10"
            >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink text-white">
                    <Code weight="bold" className="h-5 w-5" />
                </span>
                <span>
                    <span className="block text-sm font-bold text-ink">{profile.role}</span>
                    <span className="block text-xs text-slate-500">Spring Boot · React</span>
                </span>
            </motion.div>

            {/* floating card: experience */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 1.1, duration: 0.5 },
                    x: { delay: 1.1, duration: 0.5, ease: 'easeOut' },
                    y: { delay: 1.6, duration: 5, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="absolute right-0 top-1 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-center shadow-xl shadow-slate-900/10"
            >
                <span className="block font-display text-2xl font-extrabold text-ink">1+</span>
                <span className="block text-xs font-medium text-slate-500">Years Experience</span>
            </motion.div>
        </div>
    );
}

export default HeroVisual;
