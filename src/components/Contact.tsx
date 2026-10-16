import { useState } from 'react';
import { Check, Copy, DownloadSimple, EnvelopeSimple, GithubLogo, LinkedinLogo, Phone } from '@phosphor-icons/react';
import { profile } from '../data/profile';

function Contact() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${profile.email}`;
        }
    };

    const channels = [
        { href: profile.links.linkedin, label: 'LinkedIn', value: 'Connect with me', icon: <LinkedinLogo weight="duotone" className="h-6 w-6" /> },
        { href: profile.links.github, label: 'GitHub', value: 'ATSudhanshuKumar', icon: <GithubLogo weight="duotone" className="h-6 w-6" /> },
        ...(profile.phone
            ? [{ href: `tel:${profile.phone.replace(/\s/g, '')}`, label: 'Phone', value: profile.phone, icon: <Phone weight="duotone" className="h-6 w-6" /> }]
            : []),
    ];

    return (
        <section id="contact" className="px-4 py-20 sm:px-6 md:py-28 lg:px-10">
            <div className="relative mx-auto max-w-[75rem] overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-12 md:py-20">
                <div aria-hidden="true" className="absolute -top-24 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-brand-600/40 blur-3xl" />
                <div className="relative">
                    <p className="text-sm font-semibold uppercase tracking-widest text-brand-100">Contact</p>
                    <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Let's build something great together
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
                        I'm actively looking for new roles. Whether you have an opening, a question, or just want to say hi, my inbox is open.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                        {profile.email ? (
                            <>
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
                                >
                                    <EnvelopeSimple weight="bold" className="h-4 w-4" />
                                    {profile.email}
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    {copied ? <Check weight="bold" className="h-4 w-4 text-emerald-400" /> : <Copy weight="bold" className="h-4 w-4" />}
                                    {copied ? 'Copied!' : 'Copy email'}
                                </button>
                            </>
                        ) : (
                            <a
                                href={profile.links.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
                            >
                                <LinkedinLogo weight="fill" className="h-4 w-4" />
                                Message me on LinkedIn
                            </a>
                        )}
                        {/* static button: no link / download for now */}
                        <span className="inline-flex cursor-default select-none items-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white">
                            <DownloadSimple weight="bold" className="h-4 w-4" />
                            Resume
                        </span>
                    </div>

                    <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                        {channels.map((c) => (
                            <a
                                key={c.label}
                                href={c.href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-left text-white transition hover:bg-white/10"
                            >
                                <span className="text-slate-300">{c.icon}</span>
                                <span>
                                    <span className="block text-sm font-semibold">{c.label}</span>
                                    <span className="block text-sm text-slate-400">{c.value}</span>
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
