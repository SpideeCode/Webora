import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    LogOut,
    Search,
    RefreshCcw,
    Rocket,
    Mail,
    Trash2,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Lead {
    id: string;
    created_at: string;
    service_type: string;
    details: string[];
    budget: string;
    client_name: string;
    client_email: string;
    company: string;
    status: 'New' | 'In Progress' | 'Archived';
}

interface LeadDetailModalProps {
    lead: Lead;
    onClose: () => void;
    onUpdateStatus: (id: string, status: string) => void;
}

function LeadDetailModal({ lead, onClose, onUpdateStatus }: LeadDetailModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-2xl overflow-hidden shadow-2xl border-white/20"
            >
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-4 inline-block ${lead.status === 'New' ? 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20' :
                                lead.status === 'In Progress' ? 'text-accent-magenta bg-accent-magenta/10 border-accent-magenta/20' :
                                    'text-gray-500 bg-gray-500/10 border-gray-500/20'
                                }`}>
                                {lead.status}
                            </span>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">{lead.client_name}</h2>
                            <p className="text-gray-500 text-sm font-bold mt-1">{lead.company || 'Indépendant'}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                            <LogOut size={24} className="rotate-180" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Contact Direct</h4>
                                <div className="space-y-3">
                                    <a href={`mailto:${lead.client_email}`} className="flex items-center gap-3 text-white hover:text-accent-cyan transition-colors group">
                                        <Mail size={16} className="text-gray-500 group-hover:text-accent-cyan" />
                                        <span className="text-sm font-bold">{lead.client_email}</span>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Besoin & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-white uppercase tracking-widest italic">{lead.service_type}</span>
                                    {lead.details?.map((d, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-gray-400 uppercase tracking-widest">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Budget Estimé</h4>
                                <p className="text-2xl font-black text-white italic tracking-tighter">{lead.budget}</p>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Changer de Statut</h4>
                                <div className="flex gap-2">
                                    {['New', 'In Progress', 'Archived'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => onUpdateStatus(lead.id, s)}
                                            className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${lead.status === s
                                                ? 'bg-white text-primary border-white scale-95 opacity-50'
                                                : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                                                }`}
                                            disabled={lead.status === s}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/5 flex gap-4">
                        <button
                            onClick={() => onUpdateStatus(lead.id, 'In Progress')}
                            className="flex-grow py-4 bg-accent-magenta text-white rounded-xl font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-accent-magenta/20"
                        >
                            Marquer comme En Cours
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-black uppercase text-xs hover:bg-white/10 transition-all"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Dashboard() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/admin/login');
            }
        };

        checkUser();
        fetchLeads();

        const channel = supabase
            .channel('leads-db-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'leads' },
                () => {
                    fetchLeads();
                }
            )
            .subscribe((status) => {
                console.log('Supabase Realtime Status:', status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [navigate]);

    async function fetchLeads() {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching leads:', error);
        else {
            setLeads(data || []);
            if (selectedLead) {
                const updated = data?.find(l => l.id === selectedLead.id);
                if (updated) setSelectedLead(updated);
            }
        }
        setLoading(false);
    }

    const handleDelete = async (id: string) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;

        const { error } = await supabase
            .from('leads')
            .update({ status: 'Deleted' }) // Or actual delete, but better to soft-delete or just filter out. 
            // The screenshot shows "SUPPRIMER", usually in apps like this it's an actual delete.
            .eq('id', id);

        // Actually, let's do a hard delete if it's an admin dashboard like the reference.
        const { error: deleteError } = await supabase
            .from('leads')
            .delete()
            .eq('id', id);

        if (deleteError) console.error('Delete failed:', deleteError);
        else fetchLeads();
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) console.error('Update failed:', error);
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/admin/login', { replace: true });
        } catch (error) {
            console.error('Error logging out:', error);
            navigate('/');
        }
    };

    const [activeTab, setActiveTab] = useState<'current' | 'finished'>('current');
    const [selectedService, setSelectedService] = useState<string>('TOUS');

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.client_email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesService = selectedService === 'TOUS' || lead.service_type.toUpperCase() === selectedService;

        const matchesTab = activeTab === 'current'
            ? (lead.status === 'New' || lead.status === 'In Progress')
            : lead.status === 'Archived';

        return matchesSearch && matchesService && matchesTab;
    });

    const stats = {
        total: leads.length,
        pending: leads.filter(l => l.status === 'New').length,
        inProgress: leads.filter(l => l.status === 'In Progress').length,
        finished: leads.filter(l => l.status === 'Archived').length
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] text-[#1A1A1A] font-sans">
            <AnimatePresence>
                {selectedLead && (
                    <LeadDetailModal
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onUpdateStatus={handleStatusUpdate}
                    />
                )}
            </AnimatePresence>

            <main className="min-h-screen">
                {/* Top Banner */}
                <div className="bg-[#002D5B] text-white py-4 px-12 flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-white p-1.5 rounded">
                            <Users size={20} className="text-[#002D5B]" />
                        </div>
                        <h2 className="text-xl font-black uppercase tracking-tight">WEBORA ADMIN</h2>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => navigate('/')} className="text-xs font-bold uppercase tracking-widest border border-white/20 px-4 py-2 rounded hover:bg-white/10 transition-all">Voir le site</button>
                        <button onClick={fetchLeads} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-white/80 transition-all">
                            <RefreshCcw size={14} /> Actualiser
                        </button>
                        <button onClick={handleLogout} className="bg-white text-[#002D5B] px-6 py-2 rounded font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all">Déconnexion</button>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto p-12">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'TOTAL', val: stats.total },
                            { label: 'EN ATTENTE', val: stats.pending },
                            { label: 'CONTACTÉS', val: stats.inProgress },
                            { label: 'TERMINÉS', val: stats.finished },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-8 border-2 border-[#002D5B] shadow-[4px_4px_0px_#002D5B]">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
                                <p className="text-4xl font-black text-[#002D5B]">{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-8 border-b-2 border-gray-200 mb-12">
                        <button
                            onClick={() => setActiveTab('current')}
                            className={`pb-4 px-8 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'current' ? 'text-[#002D5B]' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Dossiers en cours ({stats.pending + stats.inProgress})
                            {activeTab === 'current' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#002D5B]" />}
                        </button>
                        <button
                            onClick={() => setActiveTab('finished')}
                            className={`pb-4 px-8 text-sm font-black uppercase tracking-widest transition-all relative ${activeTab === 'finished' ? 'text-[#002D5B]' : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            Dossiers terminés ({stats.finished})
                            {activeTab === 'finished' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#002D5B]" />}
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col lg:flex-row gap-6 mb-8 items-stretch lg:items-center">
                        <div className="relative flex-grow max-w-xl">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="RECHERCHER UN NOM, TÉLÉPHONE..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border-2 border-[#002D5B] pl-16 pr-6 py-4 text-sm focus:outline-none transition-all font-bold placeholder:text-gray-300 uppercase tracking-widest"
                            />
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            {['TOUS', 'WEB', 'SAAS', 'VIDEO', 'AI'].map((service) => (
                                <button
                                    key={service}
                                    onClick={() => setSelectedService(service)}
                                    className={`px-6 py-4 border-2 font-black text-xs uppercase tracking-widest transition-all ${selectedService === service
                                        ? 'bg-[#002D5B] text-white border-[#002D5B]'
                                        : 'bg-white text-[#002D5B] border-[#002D5B] hover:bg-gray-50'
                                        }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lead Cards List */}
                    <div className="space-y-6">
                        <AnimatePresence mode="popLayout">
                            {filteredLeads.map((lead) => (
                                <motion.div
                                    layout
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border-2 border-[#002D5B] p-8 shadow-[6px_6px_0px_rgba(0,45,91,0.05)] relative group overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-8">
                                        {/* Left Side Info */}
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="w-4 h-4 bg-[#7E57C2] rounded-sm" />
                                                <span className="text-xs font-black text-[#002D5B] uppercase tracking-[0.2em]">{lead.service_type}</span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{new Date(lead.created_at).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>

                                            <h3 className="text-3xl font-black text-[#002D5B] uppercase tracking-tighter mb-4 italic">{lead.client_name}</h3>

                                            <div className="flex flex-wrap gap-8 mb-8">
                                                <a href={`mailto:${lead.client_email}`} className="flex items-center gap-2 text-gray-500 hover:text-[#002D5B] transition-colors font-bold text-sm">
                                                    <Mail size={16} className="text-[#002D5B]" /> {lead.client_email}
                                                </a>
                                                {lead.company && (
                                                    <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                                                        <Users size={16} className="text-[#002D5B]" /> {lead.company}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-2 text-gray-500 font-bold text-sm">
                                                    <Rocket size={16} className="text-[#002D5B]" /> {lead.budget}
                                                </div>
                                            </div>

                                            {/* Expandable Details - Card Style */}
                                            <div className="bg-[#F8FAFC] p-8 rounded border border-gray-100">
                                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 border-b border-gray-200 pb-2">Détails du formulaire</h4>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12">
                                                    {lead.details.map((detail, idx) => (
                                                        <div key={idx} className="flex flex-col">
                                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Point {idx + 1}</span>
                                                            <span className="text-sm font-black text-[#002D5B] uppercase tracking-tight italic">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side Controls */}
                                        <div className="flex flex-col justify-between items-end gap-10 min-w-[220px]">
                                            <div className="w-full">
                                                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2 block text-right">Statut</label>
                                                <div className="relative">
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => handleStatusUpdate(lead.id, e.target.value as any)}
                                                        className={`w-full appearance-none border-2 border-[#002D5B] px-6 py-4 rounded font-black text-xs uppercase tracking-widest focus:outline-none cursor-pointer pr-12 transition-colors ${lead.status === 'New' ? 'bg-[#FFFDC6] text-[#002D5B]' :
                                                            lead.status === 'In Progress' ? 'bg-[#E3F2FD] text-[#1976D2]' :
                                                                'bg-gray-100 text-gray-500'
                                                            }`}
                                                    >
                                                        <option value="New">En Attente</option>
                                                        <option value="In Progress">Contacté</option>
                                                        <option value="Archived">Terminé</option>
                                                    </select>
                                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#002D5B] pointer-events-none" />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                className="flex items-center justify-center gap-3 border-2 border-[#FF5252] text-[#FF5252] w-full py-4 rounded font-black text-xs uppercase tracking-widest hover:bg-[#FF5252] hover:text-white transition-all group shadow-sm active:scale-95"
                                            >
                                                <Trash2 size={18} /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredLeads.length === 0 && !loading && (
                            <div className="py-20 text-center border-2 border-dashed border-gray-300 rounded-xl">
                                <p className="text-gray-400 font-black uppercase tracking-widest text-sm italic">Aucun dossier trouvé dans cette catégorie</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
