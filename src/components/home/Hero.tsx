'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useLocale } from '@/context/LocaleContext';

export function Hero() {
    const { t } = useLocale();

    return (
        <section className="min-h-screen flex items-center justify-center pt-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center space-y-8">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-full"
                    >
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-neutral-600 dark:text-neutral-300">
                            {t.hero.badge}
                        </span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-white"
                    >
                        {t.hero.greeting}{' '}
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {t.hero.name}
                        </span>
                    </motion.h1>

                    {/* Tagline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
                    >
                        {t.hero.tagline}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-base sm:text-lg text-neutral-500 dark:text-neutral-500 max-w-xl mx-auto"
                    >
                        {t.hero.description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/projects">
                            <Button size="lg">
                                {t.hero.cta.projects}
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="secondary" size="lg">
                                {t.hero.cta.contact}
                            </Button>
                        </Link>
                        <a
                            href="https://forms.gle/Eo6wiH7xxZmP8wvc9"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="secondary" size="lg">
                                Register Tutor Class
                            </Button>
                        </a>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="pt-16"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-neutral-300 dark:border-neutral-700 rounded-full mx-auto flex items-start justify-center p-2"
                        >
                            <motion.div className="w-1.5 h-1.5 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
