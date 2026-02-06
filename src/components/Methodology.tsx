import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Methodology() {
    const { t } = useTranslation();

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
            color: 'bg-white'
        }
    ];

    return (
        <section id="methodology" className="py-32 bg-primary relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-accent-magenta font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">
                        {t('methodology.badge')}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase">
                        {t('methodology.title')}
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent-magenta to-accent-cyan mx-auto rounded-full" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[28px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative z-10 text-center group"
                            >
                                <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-8 border border-white/10 glass-morphism transition-all duration-500 group-hover:scale-110 group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-widest">{step.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>

                                <div className="mt-8 text-[40px] font-black text-white/5 group-hover:text-white/10 transition-colors pointer-events-none select-none">
                                    0{index + 1}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Background Noise/Aura */}
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-accent-magenta/5 to-transparent pointer-events-none" />
        </section>
    );
}
