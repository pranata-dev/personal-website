'use client';

import { useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import { useLocale } from '@/context/LocaleContext';

// Sample projects for when Supabase is not configured
const sampleProjects: Project[] = [
    {
        id: '1',
        title: 'Neural Network for Astrophysics Research',
        description: 'Applying neural networks for the classification of evolutionary phases as well as the prediction of stars age and mass.',
        tech_stack: ['Python', 'TensorFlow', 'Gaia Data Release 3', 'PyTorch', 'Astropy'],
        github_url: 'https://github.com/pranata-dev/stellar-evolution',
        demo_url: null,
        image_url: null,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Smartband Health Monitoring System',
        description: 'ESP32-based IoT system monitoring Heart Rate, SpO2, and Temp via Blynk. Integrates Hugging Face AI to provide automated medical advice when vitals are abnormal.',
        tech_stack: ['C++', 'ESP32', 'Blynk', 'Hugging Face', 'Arduino'],
        github_url: 'https://github.com/pranata-dev/smartband-healt-monitoring-iot',
        demo_url: null,
        image_url: null,
        featured: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'N8N Job Vacancy Automation',
        description: 'Automated Job Vacancy Tracker using n8n, Jina AI, & Telegram Bot. Features duplicate checking, CAPTCHA fallback, and AI-powered parsing.',
        tech_stack: ['Python', 'n8n', 'Jina AI', 'Telegram Bot'],
        github_url: 'https://github.com/pranata-dev/n8n-job-vacancy-automation',
        demo_url: null,
        image_url: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
    {
        id: '4',
        title: 'N8N Receipt Scanner',
        description: 'Automated receipt scanner using n8n, Google Vision, & Telegram Bot. Features duplicate checking, CAPTCHA fallback, and AI-powered parsing.',
        tech_stack: ['Python', 'n8n', 'Google Vision', 'Telegram Bot'],
        github_url: 'https://github.com/pranata-dev/n8n-receipt-scanning',
        demo_url: null,
        image_url: null,
        featured: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    },
];

export default function ProjectsPage() {
    const { t } = useLocale();
    const [projects, setProjects] = useState<Project[]>(sampleProjects);

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

    return (
        <div className="pt-16">
            <Section title={t.projects.title} subtitle={t.projects.subtitle}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </Section>
        </div>
    );
}
