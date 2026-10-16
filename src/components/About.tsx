import { useEffect, useRef } from 'react';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { Code, DeviceMobile, GraduationCap, ShieldCheck, TreeStructure } from '@phosphor-icons/react';
import { about, education } from '../data/profile';
import Highlighted from './Highlighted';
import TechLogo from './TechLogo';
import { experienceStat, rolesStat } from '../utils';
import Section from './Section';

const logoClass = 'h-6 w-6 drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]';

const strengthIcons = {
    'Clean Code': Code,
    'Scalable APIs': TreeStructure,
    'Secure Auth': ShieldCheck,
    'Responsive UI': DeviceMobile,
} as const;

// counts up from 0 when scrolled into view, e.g. "3+" → 0…3 then "+"
function CountUp({ value }: { value: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const target = parseInt(value, 10) || 0;
    const suffix = value.replace(/^\d+/, '');
    const count = useMotionValue(0);
    const shown = useTransform(count, (v) => `${Math.round(v)}${suffix}`);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(count, target, { duration: 1.4, ease: 'easeOut' });
        return () => controls.stop();
    }, [inView, count, target]);

    return <motion.span ref={ref}>{shown}</motion.span>;
}

const cardLabel = 'text-xs font-semibold uppercase tracking-widest text-slate-400';

function About() {
    return (
        <Section id="about" eyebrow="About me" title="Turning ideas into reliable products">
            <div className="grid gap-12 lg:grid-cols-2 xl:gap-16">
                {/* story + strengths */}
                <div>
                    <div className="space-y-5 text-lg leading-relaxed text-slate-600">
                        {about.paragraphs.map((p, i) => (
                            <p key={i}>
                                <Highlighted text={p} />
                            </p>
                        ))}
                    </div>

                    <ul className="mt-8 grid grid-cols-2 gap-3">
                        {about.strengths.map((s, i) => {
                            const Icon = strengthIcons[s as keyof typeof strengthIcons] ?? Code;
                            return (
                                <motion.li
                                    key={s}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                                    whileHover={{ y: -3 }}
                                    className="flex items-center gap-3 rounded-xl border border-white/80 bg-white/70 px-4 py-3 shadow-sm shadow-slate-900/5 backdrop-blur"
                                >
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-ink">
                                        <Icon weight="bold" className="h-5 w-5" />
                                    </span>
                                    <span className="text-sm font-semibold text-ink">{s}</span>
                                </motion.li>
                            );
                        })}
                    </ul>
                </div>

                {/* premium dark profile card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative flex overflow-hidden rounded-3xl bg-[#0a0d14] p-7 text-white shadow-2xl shadow-slate-900/30 ring-1 ring-white/10 sm:p-8"
                >
                    {/* soft aurora glows + top sheen */}
                    <motion.div
                        aria-hidden="true"
                        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[#289EFD] blur-[100px]"
                    />
                    <motion.div
                        aria-hidden="true"
                        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.1, 1] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                        className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-indigo-500 blur-[100px]"
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    />

                    <div className="relative flex w-full flex-col justify-between gap-4 xl:gap-5">
                        <div className="grid grid-cols-2 gap-4">
                            {[experienceStat(), rolesStat()].map((h) => (
                                <div
                                    key={h.label}
                                    className="rounded-2xl bg-white/[0.06] px-5 py-4 ring-1 ring-white/10 backdrop-blur-sm"
                                >
                                    <p className="font-display text-4xl font-extrabold tracking-tight xl:text-5xl">
                                        <CountUp value={h.value} />
                                    </p>
                                    <p className="mt-1.5 text-sm text-slate-400">{h.label}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className={cardLabel}>Education</p>
                            {education.map((e) => (
                                <div key={e.degree} className="mt-3 flex items-center gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
                                        <GraduationCap weight="duotone" className="h-7 w-7" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="font-semibold leading-snug">{e.degree}</p>
                                        <p className="mt-1 text-sm text-slate-400">
                                            {e.school} · {e.period}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <p className={cardLabel}>Core stack</p>
                            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3 xl:gap-x-6">
                                {about.stack.map((t, i) => (
                                    <motion.li
                                        key={t}
                                        initial={{ opacity: 0, scale: 0.8, y: 6 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                                        whileHover={{ y: -3 }}
                                        className="flex cursor-default items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-white"
                                    >
                                        <TechLogo name={t} className={logoClass} />
                                        {t}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

export default About;
