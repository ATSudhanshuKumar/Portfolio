import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
    id: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
    children: ReactNode;
    className?: string;
};

function Section({ id, eyebrow, title, subtitle, children, className = '' }: Props) {
    return (
        <section id={id} className={`py-20 md:py-28 ${className}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <p className="text-sm font-semibold uppercase tracking-widest text-ink">{eyebrow}</p>
                    <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">{title}</h2>
                    {subtitle && <p className="mt-3 max-w-2xl text-lg text-slate-600">{subtitle}</p>}
                    <div className="mt-10">{children}</div>
                </motion.div>
            </div>
        </section>
    );
}

export default Section;
