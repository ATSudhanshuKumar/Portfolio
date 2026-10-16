import { PlugsConnected } from '@phosphor-icons/react';
import javaLogo from '../assets/tech/java.svg';
import springLogo from '../assets/tech/spring.svg';
import reactLogo from '../assets/tech/react.svg';
import postgresLogo from '../assets/tech/postgresql.svg';
import mongoLogo from '../assets/tech/mongodb.svg';
import redisLogo from '../assets/tech/redis.svg';
import viteLogo from '../assets/tech/vite.svg';
import nextLogo from '../assets/tech/nextjs.svg';
import jsLogo from '../assets/tech/javascript.svg';
import htmlLogo from '../assets/tech/html.svg';
import cssLogo from '../assets/tech/css.svg';
import tailwindLogo from '../assets/tech/tailwind.svg';
import framerLogo from '../assets/tech/framer-motion.svg';
import gitLogo from '../assets/tech/git.svg';
import githubLogo from '../assets/tech/github.svg';
import postmanLogo from '../assets/tech/postman.svg';
import vscodeLogo from '../assets/tech/vscode.svg';

const files: Record<string, string> = {
    HTML: htmlLogo,
    CSS: cssLogo,
    'Tailwind CSS': tailwindLogo,
    'Framer Motion': framerLogo,
    Git: gitLogo,
    GitHub: githubLogo,
    Postman: postmanLogo,
    'VS Code': vscodeLogo,
    Java: javaLogo,
    'Spring Boot': springLogo,
    React: reactLogo,
    'React.js': reactLogo,
    PostgreSQL: postgresLogo,
    MongoDB: mongoLogo,
    Redis: redisLogo,
    Vite: viteLogo,
    'Next.js': nextLogo,
    JavaScript: jsLogo,
};

// Logo for a technology name; returns null when there is none.
// TypeScript + Keycloak are inline SVGs (Simple Icons) so they never fail to load.
function TechLogo({ name, className = 'h-5 w-5' }: { name: string; className?: string }) {
    if (files[name]) return <img src={files[name]} alt="" className={className} />;

    if (name === 'TypeScript')
        return (
            // "TS" centred in the square (the official mark sits it bottom-right)
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
                <rect width="24" height="24" rx="4" fill="#3178C6" />
                <text
                    x="12"
                    y="12.5"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#ffffff"
                    fontSize="11.5"
                    fontWeight="800"
                    letterSpacing="-0.4"
                    fontFamily="'Plus Jakarta Sans', Inter, Arial, sans-serif"
                >
                    TS
                </text>
            </svg>
        );

    if (name === 'Keycloak')
        return (
            <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
                <path
                    fill="#00B8E3"
                    d="m18.742 1.182-12.493.002C4.155 4.784 2.079 8.393 0 12.002c2.071 3.612 4.162 7.214 6.252 10.816l12.49-.004 3.089-5.404h2.158v-.002H24L23.996 6.59h-2.168zM8.327 4.792h2.081l1.04 1.8-3.12 5.413 3.117 5.403-1.035 1.81H8.327a2047.566 2047.566 0 0 0-4.168-7.204C5.547 9.606 6.937 7.2 8.327 4.792Zm6.241 0 2.086.003c1.393 2.405 2.78 4.813 4.166 7.222l-4.167 7.2h-2.08c-.382-.562-1.038-1.808-1.038-1.808l3.123-5.405-3.124-5.413z"
                />
            </svg>
        );

    if (name === 'REST APIs') return <PlugsConnected weight="bold" aria-hidden="true" className={`${className} text-ink`} />;

    return null;
}

export default TechLogo;
