import { ArrowUpRight, FolderOpen, GithubLogo } from '@phosphor-icons/react';
import { profile, projects } from '../data/profile';
import Section from './Section';

function Projects() {
    return (
        <Section id="projects" eyebrow="Projects" title="Things I've built">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                    <article
                        key={p.title}
                        className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                                <FolderOpen weight="duotone" className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-1">
                                {p.github && (
                                    <a
                                        href={p.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`${p.title} source code`}
                                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-ink"
                                    >
                                        <GithubLogo weight="fill" className="h-[18px] w-[18px]" />
                                    </a>
                                )}
                                {p.live && (
                                    <a
                                        href={p.live}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`${p.title} live demo`}
                                        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-ink"
                                    >
                                        <ArrowUpRight weight="bold" className="h-4 w-4" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <h3 className="mt-5 font-display text-lg font-bold text-ink">
                            {p.title}
                            {p.featured && (
                                <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle text-xs font-semibold text-amber-700">
                                    Featured
                                </span>
                            )}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-slate-500">
                            {p.tech.map((t) => (
                                <li key={t}>{t}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>

            <div className="mt-10 text-center">
                <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                    <GithubLogo weight="fill" className="h-[18px] w-[18px]" />
                    See more on GitHub
                    <ArrowUpRight weight="bold" className="h-4 w-4" />
                </a>
            </div>
        </Section>
    );
}

export default Projects;
