import { profile } from '../data/profile';
import { GithubLogo, LinkedinLogo } from '@phosphor-icons/react';

function Footer() {
    return (
        <footer className="border-t border-slate-200">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-10">
                <p>
                    © {new Date().getFullYear()} {profile.name}. Built with React & Tailwind CSS.
                </p>
                <div className="flex items-center gap-1">
                    <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-md p-2 hover:text-ink">
                        <GithubLogo weight="fill" className="h-5 w-5" />
                    </a>
                    <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-md p-2 hover:text-ink">
                        <LinkedinLogo weight="fill" className="h-5 w-5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
