import { motion } from 'framer-motion';
import { skills } from '../data/profile';
import Section from './Section';
import TechLogo from './TechLogo';

// all skills in one list, kept in category order
const all = skills.flatMap((s) => s.items);

function Skills() {
    return (
        <Section
            id="skills"
            eyebrow="Skills"
            title="Technologies I work with"
            subtitle="The languages, frameworks and tools I use to build products end to end."
        >
            <ul className="flex flex-wrap gap-3 rounded-3xl border border-white/80 bg-white/85 p-6 shadow-sm shadow-slate-900/5 backdrop-blur sm:p-8">
                {all.map((name, i) => (
                    <motion.li
                        key={name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.03, duration: 0.35, ease: 'easeOut' }}
                        className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:text-ink hover:shadow-md hover:shadow-slate-900/5 hover:ring-slate-300"
                    >
                        <TechLogo name={name} className="h-5 w-5" />
                        {name}
                    </motion.li>
                ))}
            </ul>
        </Section>
    );
}

export default Skills;
