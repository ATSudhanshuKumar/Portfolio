import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { profile } from '../data/profile';
import { scroll } from '../utils';
import Highlighted from './Highlighted';
import HeroVisual from './HeroVisual';

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' as const },
});

const TYPE_START = 0.6; // seconds before typing begins
const TYPE_SPEED = 0.06; // seconds per letter
const TYPE_PAUSE = 1.8; // seconds the full role stays before typing again

function Hero() {
    const roleLine = `I'm a ${profile.role}`;
    const typeDuration = profile.role.length * TYPE_SPEED;

    // typewriter loop on the role only: type → pause → start again (never deletes)
    const count = useMotionValue(0);
    const typed = useTransform(count, (v) => profile.role.slice(0, Math.round(v)));

    useEffect(() => {
        const controls = animate(count, profile.role.length, {
            delay: TYPE_START,
            duration: typeDuration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: TYPE_PAUSE,
        });
        return () => controls.stop();
    }, [count, typeDuration]);

    return (
        <section id="hero" className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-28">
            {/* soft background: grid + glow */}
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-60"
            />
            <div aria-hidden="true" className="absolute -right-40 top-10 -z-10 h-[520px] w-[520px] rounded-full bg-[#289EFD]/15 blur-3xl" />

            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-10 xl:gap-16">
                <div>
                    <motion.p
                        {...fadeUp(0)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#289EFD]/10 px-4 py-1.5 text-sm font-semibold text-ink"
                    >
                        <span aria-hidden="true">👋</span> Welcome to my portfolio
                    </motion.p>

                    <motion.h1
                        {...fadeUp(0.1)}
                        className="mt-6 whitespace-nowrap font-display text-[clamp(2rem,8vw,3.5rem)] font-extrabold leading-[1.1] lg:text-[2.875rem] xl:text-[3.5rem] tracking-tight text-ink"
                    >
                        Hey, I'm Sudhanshu.
                    </motion.h1>

                    <motion.p
                        {...fadeUp(0.2)}
                        className="mt-4 min-h-[1.5em] font-display text-2xl font-bold text-ink xl:text-[1.75rem]"
                        aria-label={roleLine}
                    >
                        <span aria-hidden="true">I'm a </span>
                        <motion.span aria-hidden="true" className="text-ink">
                            {typed}
                        </motion.span>
                        <motion.span
                            aria-hidden="true"
                            animate={{ opacity: [1, 1, 0, 0] }}
                            transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
                            className="ml-1 inline-block h-[1em] w-[3px] translate-y-[0.15em] rounded-full bg-ink"
                        />
                    </motion.p>

                    <motion.p {...fadeUp(0.3)} className="mt-5 max-w-lg text-base leading-relaxed text-slate-600 xl:text-lg">
                        <Highlighted text={profile.tagline} />
                    </motion.p>

                    <motion.div {...fadeUp(0.4)} className="mt-8">
                        <motion.button
                            onClick={() => scroll('projects')}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-slate-900/25 transition-colors hover:bg-slate-800"
                        >
                            View My Work
                            <ArrowRight weight="bold" className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1" />
                        </motion.button>
                    </motion.div>
                </div>

                <div className="hidden lg:block">
                    <HeroVisual />
                </div>
            </div>
        </section>
    );
}

export default Hero;
