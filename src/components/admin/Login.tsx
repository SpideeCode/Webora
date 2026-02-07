import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { Lock, Mail, Rocket, AlertCircle } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden grid-gradient-bg">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-magenta/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/10 blur-[120px] rounded-full" />

            <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md glass-card p-10 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-foreground/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-foreground/10 group">
                        <Rocket className="text-foreground group-hover:text-accent-magenta transition-colors" size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">Webora OS</h1>
                    <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mt-2">Accès Administrateur</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-4 italic">Canal Sécurisé</label>
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-cyan transition-colors" size={18} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@webora.be"
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl pl-14 pr-6 py-4 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-4 italic">Code d'Accès</label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent-magenta transition-colors" size={18} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-foreground/5 border border-foreground/10 rounded-2xl pl-14 pr-6 py-4 text-foreground placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-magenta/50 transition-all"
                            />
                        </div>
                    </div>

                    {error && (
                        <m.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-bold uppercase tracking-widest"
                        >
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </m.div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 dark:bg-white dark:text-black bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/5 disabled:opacity-50"
                    >
                        {loading ? 'Authentification...' : 'Déverrouiller Base'}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-foreground/5 text-center">
                    <p className="text-[10px] text-text-secondary/60 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Système Opérationnel
                    </p>
                </div>
            </m.div>
        </div>
    );
}
