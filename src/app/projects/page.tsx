'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { supabase } from '@/lib/supabase';
import { Project, ProjectCategory, PROJECT_CATEGORIES } from '@/types';
import { useLocale } from '@/context/LocaleContext';

// Sample projects organized by category
const sampleProjects: Project[] = [
    // AI & Machine Learning
    {
        id: '1',
        title: 'AI Research Assistant',
        description: 'A machine learning powered research tool that helps analyze and summarize physics papers using natural language processing.',
        tech_stack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        category: 'ai-ml',
        github_url: 'https://github.com/pranata-dev/ai-research',
        demo_url: null,
        image_url: null,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Neural Network Visualizer',
        description: 'Interactive visualization tool for understanding deep learning model architectures and training processes.',
        tech_stack: ['TypeScript', 'D3.js', 'Next.js', 'WebGL'],
        category: 'ai-ml',
        github_url: 'https://github.com/pranata-dev/nn-viz',
        demo_url: 'https://nn-viz.demo.com',
        image_url: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    // Web Development
    {
        id: '3',
        title: 'Personal Portfolio Website',
        description: 'Modern portfolio website built with Next.js, Tailwind CSS, and Supabase with bilingual support.',
        tech_stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase'],
        category: 'web-dev',
        github_url: 'https://github.com/pranata-dev/personal-website',
        demo_url: null,
        image_url: null,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    // Automation & Tools
    {
        id: '4',
        title: 'Automation Pipeline',
        description: 'End-to-end automation system for data processing workflows that reduces manual work by 80%.',
        tech_stack: ['Python', 'Apache Airflow', 'Docker', 'PostgreSQL'],
        category: 'automation',
        github_url: 'https://github.com/pranata-dev/automation',
        demo_url: null,
        image_url: null,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '5',
        title: 'Smart Health Monitoring Band',
        description: 'IoT-based health monitoring system using ESP32 with 85-90% accuracy for vital sign detection.',
        tech_stack: ['C++', 'ESP32', 'TensorFlow Lite', 'Python'],
        category: 'automation',
        github_url: 'https://github.com/pranata-dev/health-band',
        demo_url: null,
        image_url: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    // Data Analytics
    {
        id: '6',
        title: 'Stellar Classification System',
        description: 'Neural network-based system for classifying stellar evolutionary phases using spectral data.',
        tech_stack: ['Python', 'PyTorch', 'Pandas', 'Matplotlib'],
        category: 'data-analytics',
        github_url: 'https://github.com/pranata-dev/stellar-classification',
        demo_url: null,
        image_url: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default function ProjectsPage() {
    const { t, locale } = useLocale();
    const [projects, setProjects] = useState<Project[]>(sampleProjects);
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

    useEffect(() => {
        async function fetchProjects() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (!error && data && data.length > 0) {
                    setProjects(data);
                }
            } catch {
                // Keep using sample projects
            }
        }

        fetchProjects();
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedCategory === 'all') return projects;
        return projects.filter(project => project.category === selectedCategory);
    }, [projects, selectedCategory]);

    const getCategoryLabel = (category: ProjectCategory) => {
        return t.projects.categories[category] || PROJECT_CATEGORIES.find(c => c.value === category)?.label || category;
    };

    return (
        <div className="pt-16">
            <Section title={t.projects.title} subtitle={t.projects.subtitle}>
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === 'all'
                                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        {locale === 'id' ? 'Semua' : 'All'}
                    </button>
                    {PROJECT_CATEGORIES.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setSelectedCategory(category.value)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedCategory === category.value
                                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                                }`}
                        >
                            {getCategoryLabel(category.value)}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-neutral-500 dark:text-neutral-500">
                            {locale === 'id' ? 'Belum ada proyek di kategori ini.' : 'No projects in this category yet.'}
                        </p>
                    </div>
                )}
            </Section>
        </div>
    );
}
