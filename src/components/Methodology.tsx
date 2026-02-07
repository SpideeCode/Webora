import { m } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Methodology() {
    const { t } = useTranslation();
    const isMobile = useMediaQuery('(max-width: 768px)');

    const steps = [
        {
            icon: Search,
            title: t('methodology.steps.step1_title'),
            description: t('methodology.steps.step1_desc'),
            color: 'bg-accent-cyan'
        },
        {
            icon: PenTool,
            title: t('methodology.steps.step2_title'),
            description: t('methodology.steps.step2_desc'),
            color: 'bg-accent-magenta'
        },
        {
            icon: Code2,
            title: t('methodology.steps.step3_title'),
            description: t('methodology.steps.step3_desc'),
            color: 'bg-accent-purple'
        },
        {
            icon: Rocket,
            title: t('methodology.steps.step4_title'),
            description: t('methodology.steps.step4_desc'),
            color: 'bg-foreground'
        }
    ];

    return (
        <section id="methodology" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <m.div
                    initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-accent-cyan font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        {t('methodology.badge')}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black text-foreground mb-6 tracking-tighter uppercase">
                        {t('methodology.title')}
                    </h2>
                    <div className="w-24 h-1 bg-accent-cyan mx-auto rounded-full" />
                </m.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <m.div
                                key={index}
                                initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: isMobile ? 0 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
                                className="relative z-10 text-center group"
                            >
                                <div className="relative mb-8 inline-block">
                                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border border-black/10 dark:border-white/10 glass-morphism transition-all ${!isMobile ? 'group-hover:scale-110 group-hover:border-accent-cyan/50 group-hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]' : ''} relative z-10 bg-background`}>
                                        <Icon className={`w-6 h-6 text-foreground ${!isMobile ? 'group-hover:text-accent-cyan' : ''} transition-colors`} />
                                    </div>
                                    {!isMobile && <div className="absolute -inset-2 bg-accent-cyan/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />}
                                </div>

                                <h3 className="text-xl font-black text-foreground mb-4 uppercase tracking-[0.2em]">{step.title}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto font-medium">
                                    {step.description}
                                </p>

                                <div className="mt-8 text-[40px] font-black text-foreground/[0.03] group-hover:text-accent-cyan transition-colors pointer-events-none select-none italic">
                                    STEP 0{index + 1}
                                </div>
                            </m.div>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Background Noise/Aura */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-accent-cyan/5 to-transparent pointer-events-none" />
        </section>
    );
}
