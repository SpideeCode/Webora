import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    Cpu,
    Video,
    Zap,
    ArrowRight,
    ArrowLeft,
    CheckCircle
} from 'lucide-react';
import { supabase } from '../lib/supabase';

type ServiceType = 'WEB & APPS' | 'IA & AUTOMATISATION' | 'PRODUCTION VISUELLE' | 'CONTENT & POST-PROD' | null;

interface FormData {
    service: ServiceType;
    details: string[];
    budget: string;
    name: string;
    email: string;
    company: string;
}

const steps = [
    { id: 'service', title: 'Univers' },
    { id: 'details', title: 'Services' },
    { id: 'budget', title: 'Budget' },
    { id: 'contact', title: 'Identité' }
];

const serviceOptions = [
    { id: 'WEB & APPS', icon: Globe, label: 'WEB & APPS', desc: 'Site Vitrine, SaaS complet' },
    { id: 'IA & AUTOMATISATION', icon: Cpu, label: 'IA & AUTOMATISATION', desc: 'Automatisation IA, Chatbot' },
    { id: 'PRODUCTION VISUELLE', icon: Video, label: 'PRODUCTION VISUELLE', desc: 'Photoshoot, Vidéo Pub' },
    { id: 'CONTENT & POST-PROD', icon: Zap, label: 'CONTENT & POST-PROD', desc: 'Montage, Contenu RS' },
];

const detailOptions: Record<string, string[]> = {
    'WEB & APPS': ['Site Vitrine', 'SaaS complet', 'E-commerce', 'Refonte UI/UX'],
    'IA & AUTOMATISATION': ['Automatisation IA', 'Chatbot Intelligent', 'Analyse de Données', 'Custom Agent'],
    'PRODUCTION VISUELLE': ['Photoshoot', 'Vidéo Pub', 'Brand Movie', 'Drone 4K'],
    'CONTENT & POST-PROD': ['Montage Vidéo', 'Retouche Photo', 'Contenu Réseaux Sociaux', 'Motion Design'],
};

const budgetOptions = ['-500€', '500€ - 1000€', '1000€ - 2000€', '2000€+'];

export default function SmartFunnel() {
    const [currentStep, setCurrentStep] = useState(0);
    const [data, setData] = useState<FormData>({
        service: null,
        details: [],
        budget: '',
        name: '',
        email: '',
        company: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleServiceSelect = (service: ServiceType) => {
        setData({ ...data, service, details: [] });
        setCurrentStep(1);
    };

    const toggleDetail = (detail: string) => {
        const newDetails = data.details.includes(detail)
            ? data.details.filter(d => d !== detail)
            : [...data.details, detail];
        setData({ ...data, details: newDetails });
    };

    const nextStep = () => {
        setError(null);
        setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    };
    const prevStep = () => {
        setError(null);
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);
        try {
            const { error: dbError } = await supabase
                .from('leads')
                .insert([{
                    service_type: data.service,
                    details: data.details,
                    budget: data.budget,
                    client_name: data.name,
                    client_email: data.email,
                    company: data.company,
                    status: 'New'
                }]);

            if (dbError) throw dbError;
            setIsSuccess(true);
        } catch (err: any) {
            console.error('Submission failed:', err);
            setError(err.message || "Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto min-h-[500px] flex flex-col">
            {/* Progress Bar */}
            <div className="flex justify-between mb-16 px-4 relative">
                {/* Connecting Lines Background */}
                <div className="absolute top-5 left-8 right-8 h-[1px] bg-white/5 z-0 hidden sm:block" />

                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 group relative z-10 w-1/4">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-primary ${idx <= currentStep
                                ? 'border-accent-magenta text-white shadow-[0_0_20px_rgba(255,0,128,0.3)]'
                                : 'border-white/10 text-gray-600'
                                }`}
                        >
                            {idx < currentStep ? <CheckCircle size={18} className="text-accent-magenta" /> : idx + 1}
                        </div>

                        <div className="text-center">
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] transition-colors whitespace-nowrap block mb-1 ${idx <= currentStep ? 'text-white' : 'text-gray-600'
                                }`}>
                                {step.title}
                            </span>
                        </div>

                        {/* Active Line Overlay */}
                        {idx < steps.length - 1 && (
                            <div className={`absolute left-[60%] w-[80%] h-[2px] top-5 -z-10 transition-all duration-700 hidden sm:block ${idx < currentStep ? 'bg-accent-magenta shadow-[0_0_10px_rgba(255,0,128,0.5)]' : 'bg-transparent'
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex-grow mt-8 relative">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="py-4"
                        >
                            {currentStep === 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {serviceOptions.map((opt) => (
                                        <motion.button
                                            key={opt.id}
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleServiceSelect(opt.id as ServiceType)}
                                            className={`p-6 rounded-3xl border text-left transition-all group ${data.service === opt.id
                                                ? 'bg-accent-magenta/10 border-accent-magenta ring-1 ring-accent-magenta'
                                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${data.service === opt.id ? 'bg-accent-magenta text-white' : 'bg-white/5 text-gray-400 group-hover:text-white'
                                                }`}>
                                                <opt.icon size={24} />
                                            </div>
                                            <h3 className="font-black text-white text-lg mb-1 uppercase tracking-tight">{opt.label}</h3>
                                            <p className="text-gray-400 text-xs font-semibold">{opt.desc}</p>
                                        </motion.button>
                                    ))}
                                </div>
                            )}

                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {data.service && detailOptions[data.service].map((detail) => (
                                            <button
                                                key={detail}
                                                onClick={() => toggleDetail(detail)}
                                                className={`p-5 rounded-2xl border text-left transition-all flex items-center justify-between ${data.details.includes(detail)
                                                    ? 'bg-accent-cyan/10 border-accent-cyan text-white'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="font-bold uppercase tracking-wider text-sm">{detail}</span>
                                                {data.details.includes(detail) && <CheckCircle className="text-accent-cyan" size={18} />}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 pt-8">
                                        <button onClick={prevStep} className="px-8 py-4 rounded-xl border border-white/10 text-white font-black uppercase text-xs hover:bg-white/5 transition-all flex items-center gap-2">
                                            <ArrowLeft size={16} /> Retour
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={data.details.length === 0}
                                            className="flex-grow px-8 py-4 rounded-xl bg-accent-magenta text-white font-black uppercase text-xs disabled:opacity-50 flex items-center justify-center gap-2 hover:translate-x-1 transition-all"
                                        >
                                            Continuer <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {budgetOptions.map((budget) => (
                                            <button
                                                key={budget}
                                                onClick={() => setData({ ...data, budget })}
                                                className={`p-6 rounded-2xl border transition-all text-center ${data.budget === budget
                                                    ? 'bg-accent-magenta border-accent-magenta text-white shadow-[0_10px_30px_rgba(255,0,128,0.2)]'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                                                    }`}
                                            >
                                                <span className="font-black text-sm uppercase tracking-[0.2em]">{budget}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 pt-12">
                                        <button onClick={prevStep} className="px-8 py-4 rounded-xl border border-white/10 text-white font-black uppercase text-xs hover:bg-white/5 transition-all flex items-center gap-2">
                                            <ArrowLeft size={16} /> Retour
                                        </button>
                                        <button
                                            onClick={nextStep}
                                            disabled={!data.budget}
                                            className="flex-grow px-8 py-4 rounded-xl bg-accent-magenta text-white font-black uppercase text-xs disabled:opacity-50 flex items-center justify-center gap-2 hover:translate-x-1 transition-all"
                                        >
                                            Finaliser <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black px-2">Identité</label>
                                            <input
                                                type="text"
                                                placeholder="Votre Nom"
                                                value={data.name}
                                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-magenta transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black px-2">Canal</label>
                                            <input
                                                type="email"
                                                placeholder="votre@email.com"
                                                value={data.email}
                                                onChange={(e) => setData({ ...data, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-magenta transition-all"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2 text-left">
                                            <label className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-black px-2">Entreprise</label>
                                            <input
                                                type="text"
                                                placeholder="Nom de votre structure"
                                                value={data.company}
                                                onChange={(e) => setData({ ...data, company: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent-magenta transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-12">
                                        <button onClick={prevStep} className="px-8 py-4 rounded-xl border border-white/10 text-white font-black uppercase text-xs hover:bg-white/5 transition-all flex items-center gap-2">
                                            <ArrowLeft size={16} /> Retour
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!data.name || !data.email || isSubmitting}
                                            className="flex-grow px-8 py-4 rounded-xl bg-accent-magenta text-white font-black uppercase text-xs disabled:opacity-50 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(255,0,128,0.2)]"
                                        >
                                            {isSubmitting ? 'Transmission...' : 'Initier le Projet'} <Zap size={16} />
                                        </button>
                                    </div>
                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-500 text-[10px] font-bold uppercase tracking-widest mt-4"
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="py-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 rounded-full bg-accent-cyan/20 flex items-center justify-center text-accent-cyan mb-8 animate-pulse">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Transmission Réussie</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">
                                Votre briefing a été reçu avec succès par l'équipe Webora. Nous analysons vos données et nous vous recontacterons sous 24h.
                            </p>
                            <div className="w-full p-8 border border-white/10 rounded-3xl bg-white/5 backdrop-blur-xl">
                                <p className="text-accent-magenta font-black uppercase tracking-widest text-xs mb-4">Étape Suivante</p>
                                <a
                                    href="https://calendly.com/"
                                    target="_blank"
                                    className="block w-full py-4 rounded-xl bg-white text-primary font-black uppercase text-xs hover:scale-105 transition-all"
                                >
                                    Planifier un Appel Expert
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
