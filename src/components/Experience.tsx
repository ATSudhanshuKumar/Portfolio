import { motion } from 'framer-motion';
import { ClipboardText, HardDrives, Monitor, UsersThree } from '@phosphor-icons/react';
import { experience } from '../data/profile';
import Section from './Section';
import TechLogo from './TechLogo';

const panel = 'rounded-2xl bg-slate-50/80 p-5 ring-1 ring-slate-200/70';
const iconTile = 'hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-ink shadow-sm ring-1 ring-slate-200/70';

// one timeline entry per role, newest first
const entries = experience.flatMap((job) => job.roles.map((role) => ({ job, role })));

function Badges({ items }: { items: string[] }) {
    return (
        <ul className="mt-2 flex flex-wrap gap-2">
            {items.map((t) => (
                <li key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
                    {t}
                </li>
            ))}
        </ul>
    );
}

function Status({ current }: { current: boolean }) {
    return current ? (
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Ongoing
        </span>
    ) : (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 ring-1 ring-slate-200">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Completed
        </span>
    );
}

function Experience() {
    return (
        <Section
            id="experience"
            eyebrow="Career Journey"
            title="Experience"
            subtitle="Roles, responsibilities and the impact I've created."
        >
            <ol className="space-y-6">
                {entries.map(({ job, role }) => {
                    const current = !role.end;

                    return (
                        <motion.li
                            key={`${job.company}-${role.title}`}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <article className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-sm shadow-slate-900/5 backdrop-blur sm:p-8">
                                {role.focus ? (
                                    <>
                                        <header className="flex flex-wrap items-start justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-ink font-display text-2xl font-extrabold text-white">
                                                    {job.company[0]}
                                                </span>
                                                <div>
                                                    <h3 className="font-display text-xl font-bold text-ink">{job.company}</h3>
                                                    <Badges items={[job.type, job.mode]} />
                                                </div>
                                            </div>
                                            <Status current={current} />
                                        </header>

                                        <h4 className="mt-6 font-display text-2xl font-bold text-ink">{role.title}</h4>
                                        {role.summary && (
                                            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">{role.summary}</p>
                                        )}

                                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                                            {role.focus.map((f) => {
                                                const Icon = /back/i.test(f.title) ? HardDrives : Monitor;
                                                return (
                                                    <div key={f.title} className={`${panel} flex gap-4`}>
                                                        <span className={iconTile}>
                                                            <Icon weight="bold" className="h-5 w-5" />
                                                        </span>
                                                        <div className="min-w-0">
                                                            <h5 className="font-semibold text-ink">{f.title}</h5>
                                                            <p className="mt-1 text-sm leading-relaxed text-slate-600">{f.text}</p>
                                                            {f.tech && (
                                                                <ul className="mt-4 flex flex-wrap gap-2">
                                                                    {f.tech.map((t) => (
                                                                        <li
                                                                            key={t}
                                                                            className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                                                                        >
                                                                            <TechLogo name={t} className="h-4 w-4" />
                                                                            {t}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {role.points.length > 0 && (
                                            <div className={`${panel} mt-4 flex gap-4`}>
                                                <span className={iconTile}>
                                                    <ClipboardText weight="bold" className="h-5 w-5" />
                                                </span>
                                                <div className="min-w-0">
                                                    <h5 className="font-semibold text-ink">Key Responsibilities</h5>
                                                    <ul className="mt-2 gap-x-8 md:columns-2">
                                                        {role.points.map((p) => (
                                                            <li key={p} className="mb-2 flex break-inside-avoid gap-2.5 text-sm leading-relaxed text-slate-600">
                                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                                                                {p}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    // compact card for roles without focus areas
                                    <div className="flex flex-wrap items-start gap-4 sm:flex-nowrap">
                                        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-ink">
                                            <UsersThree weight="bold" className="h-7 w-7" />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-start justify-between gap-3">
                                                <div>
                                                    <h4 className="font-display text-xl font-bold text-ink">{role.title}</h4>
                                                    <p className="mt-1 text-sm font-medium text-slate-600">{job.company}</p>
                                                    <Badges items={[job.type, job.mode]} />
                                                </div>
                                                <Status current={current} />
                                            </div>
                                            {role.summary && (
                                                <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">{role.summary}</p>
                                            )}
                                            {role.points.length > 0 && (
                                                <ul className="mt-3 space-y-1.5">
                                                    {role.points.map((p) => (
                                                        <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-slate-600">
                                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                                                            {p}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </article>
                        </motion.li>
                    );
                })}
            </ol>
        </Section>
    );
}

export default Experience;
