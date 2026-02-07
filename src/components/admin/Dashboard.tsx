import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { m, AnimatePresence } from 'framer-motion';
import {
    Users,
    LogOut,
    Search,
    RefreshCcw,
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
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
            <m.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="glass-card w-full max-w-2xl overflow-hidden shadow-2xl border border-foreground/10"
            >
                <div className="p-8 md:p-12">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest mb-4 inline-block ${lead.status === 'New' ? 'text-blue-600 bg-blue-50 border-blue-200' :
                                lead.status === 'In Progress' ? 'text-amber-600 bg-amber-50 border-amber-200' :
                                    'text-gray-500 bg-gray-50 border-gray-200'
                                }`}>
                                {lead.status === 'New' ? 'EN ATTENTE' : lead.status === 'In Progress' ? 'CONTACTÉ' : 'TERMINÉ'}
                            </span>
                            <h2 className="text-3xl font-black text-[#002B4D] uppercase tracking-tighter italic">{lead.client_name}</h2>
                            <p className="text-text-secondary text-sm font-bold mt-1 uppercase tracking-widest">{lead.company || 'PARTICULIER'}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground">
                            <LogOut size={24} className="rotate-180" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Contact Direct</h4>
                                <div className="space-y-3">
                                    <a href={`mailto:${lead.client_email}`} className="flex items-center gap-3 text-foreground hover:text-accent-cyan transition-colors group">
                                        <Mail size={16} className="text-text-secondary group-hover:text-accent-cyan" />
                                        <span className="text-sm font-bold">{lead.client_email}</span>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 mb-4">Besoin & Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-foreground/5 border border-foreground/10 rounded-lg text-[10px] font-black text-foreground uppercase tracking-widest italic">{lead.service_type}</span>
                                    {lead.details?.map((d, i) => (
                                        <span key={i} className="px-3 py-1 bg-foreground/5 border border-foreground/10 rounded-lg text-[10px] font-black text-text-secondary uppercase tracking-widest">{d}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-4">Budget Estimé</h4>
                                <p className="text-2xl font-black text-foreground italic tracking-tighter">{lead.budget}</p>
                            </div>

                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-text-secondary mb-4">Changer de Statut</h4>
                                <div className="flex gap-2">
                                    {['New', 'In Progress', 'Archived'].map((s) => (
                                        <button
                                            key={s}
                                            onClick={() => onUpdateStatus(lead.id, s)}
                                            className={`px-3 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${lead.status === s
                                                ? 'bg-foreground text-background border-foreground scale-95 opacity-50'
                                                : 'border-foreground/10 text-text-secondary hover:border-foreground/30 hover:text-foreground'
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

                    <div className="mt-12 pt-8 border-t border-foreground/5 flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => onUpdateStatus(lead.id, 'In Progress')}
                            className="flex-grow py-4 bg-[#002B4D] text-white rounded-xl font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#002B4D]/20"
                        >
                            Marquer comme En Cours
                        </button>
                        <button
                            onClick={onClose}
                            className="px-8 py-4 bg-foreground/5 border border-foreground/10 text-foreground rounded-xl font-black uppercase text-xs hover:bg-foreground/10 transition-all"
                        >
                            Fermer
                        </button>
                    </div>
                </div>
            </m.div>
        </m.div>
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

        const { error: updateError } = await supabase
            .from('leads')
            .update({ status: 'Deleted' }) // Or actual delete, but better to soft-delete or just filter out. 
            // The screenshot shows "SUPPRIMER", usually in apps like this it's an actual delete.
            .eq('id', id);

        if (updateError) console.error('Soft delete failed:', updateError);

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
        <div className="min-h-screen bg-background text-foreground font-sans">
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
                {/* Header Section */}
                <div className="bg-[#002B4D] text-white border-b border-white/10 py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex items-center gap-3">
                            <div className="bg-white p-1.5 rounded shadow-sm">
                                <Users size={20} className="text-[#002B4D]" />
                            </div>
                            <h2 className="text-xl font-black uppercase tracking-tight italic">WEBORA ADMIN</h2>
                        </div>
                        <div className="md:hidden">
                            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center w-full md:w-auto justify-center md:justify-end overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        <button
                            onClick={() => navigate('/')}
                            className="whitespace-nowrap text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 rounded hover:bg-white/10 transition-all text-white"
                        >
                            VOIR LE SITE
                        </button>
                        <button
                            onClick={fetchLeads}
                            className="whitespace-nowrap flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-white/80 transition-all text-white border border-white/20 px-4 py-2 rounded"
                        >
                            <RefreshCcw size={12} /> ACTUALISER
                        </button>
                        <button
                            onClick={handleLogout}
                            className="hidden md:block bg-white text-[#002B4D] px-6 py-2 rounded font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all shadow-lg"
                        >
                            DÉCONNEXION
                        </button>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto p-4 md:p-12">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
                        {[
                            { label: 'TOTAL', val: stats.total },
                            { label: 'EN ATTENTE', val: stats.pending },
                            { label: 'CONTACTÉS', val: stats.inProgress },
                            { label: 'TERMINÉS', val: stats.finished },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-black/20 p-4 md:p-8 border-2 border-[#002B4D]/10 md:border-[#002B4D]/20 shadow-sm rounded-xl">
                                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-secondary mb-1 md:mb-2">{stat.label}</p>
                                <p className="text-2xl md:text-4xl font-black text-[#002B4D] dark:text-white italic">{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-[#F5F7FA] dark:bg-white/5 p-1 rounded-xl mb-8 md:mb-12 overflow-x-auto scrollbar-none">
                        <button
                            onClick={() => setActiveTab('current')}
                            className={`flex-1 min-w-[160px] py-3 px-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all rounded-lg ${activeTab === 'current' ? 'bg-[#002B4D] text-white shadow-lg' : 'text-text-secondary hover:text-foreground'
                                }`}
                        >
                            Dossiers en cours ({stats.pending + stats.inProgress})
                        </button>
                        <button
                            onClick={() => setActiveTab('finished')}
                            className={`flex-1 min-w-[160px] py-3 px-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all rounded-lg ${activeTab === 'finished' ? 'bg-[#002B4D] text-white shadow-lg' : 'text-text-secondary hover:text-foreground'
                                }`}
                        >
                            Dossiers terminés ({stats.finished})
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-4 mb-8">
                        <div className="relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="RECHERCHER UN NOM, TÉLÉPHONE..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white dark:bg-white/5 border border-[#002B4D]/10 dark:border-white/10 pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#002B4D]/20 rounded-xl font-bold placeholder:text-text-secondary/30 uppercase tracking-widest text-foreground shadow-sm"
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {['TOUS', 'WEB', 'SAAS', 'VIDEO', 'AI'].map((service) => (
                                <button
                                    key={service}
                                    onClick={() => setSelectedService(service)}
                                    className={`px-6 py-2 border rounded-full font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap ${selectedService === service
                                        ? 'bg-[#002B4D] text-white border-[#002B4D]'
                                        : 'bg-white dark:bg-white/5 text-foreground border-[#002B4D]/10 dark:border-white/10 hover:border-[#002B4D]/30'
                                        }`}
                                >
                                    {service}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lead Cards List */}
                    <div className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {filteredLeads.map((lead) => (
                                <m.div
                                    layout
                                    key={lead.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white dark:bg-white/5 border border-[#002B4D]/10 dark:border-white/10 p-5 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex-grow">
                                            <div className="flex items-center justify-between md:justify-start gap-4 mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-[#002B4D] dark:bg-white rounded-full" />
                                                    <span className="text-[10px] font-black text-[#002B4D] dark:text-white uppercase tracking-widest">{lead.service_type}</span>
                                                </div>
                                                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{new Date(lead.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-black text-[#002B4D] dark:text-white uppercase tracking-tight italic mb-4">{lead.client_name}</h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                                                <a href={`mailto:${lead.client_email}`} className="flex items-center gap-2 text-text-secondary hover:text-[#002B4D] dark:hover:text-white transition-colors font-bold text-xs truncate">
                                                    <Mail size={14} className="flex-shrink-0" /> {lead.client_email}
                                                </a>
                                                {lead.company && (
                                                    <div className="flex items-center gap-2 text-text-secondary font-bold text-xs">
                                                        <Users size={14} className="flex-shrink-0" /> {lead.company}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-[#F8FAFC] dark:bg-white/5 p-4 rounded-xl border border-[#002B4D]/5 dark:border-white/5">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[#002B4D] dark:text-white/60 hover:text-[#002B4D] transition-colors"
                                                >
                                                    DÉTAILS DU FORMULAIRE
                                                    <ChevronDown size={14} className="-rotate-90" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 min-w-[200px]">
                                            <div className="relative">
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => handleStatusUpdate(lead.id, e.target.value as any)}
                                                    className="w-full appearance-none bg-[#F1F5F9] dark:bg-white/5 border border-transparent px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest focus:outline-none cursor-pointer pr-10 text-[#002B4D] dark:text-white"
                                                >
                                                    <option value="New">EN ATTENTE</option>
                                                    <option value="In Progress">CONTACTÉ</option>
                                                    <option value="Archived">TERMINÉ</option>
                                                </select>
                                                <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#002B4D] dark:text-white pointer-events-none" />
                                            </div>

                                            <button
                                                onClick={() => handleDelete(lead.id)}
                                                className="flex items-center justify-center gap-2 text-[#FF5252] dark:text-[#ff4d4d] w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-[#FF5252]/10 dark:border-[#ff4d4d]/10 hover:bg-[#FF5252] hover:text-white transition-all transition-colors active:scale-95"
                                            >
                                                <Trash2 size={14} /> SUPPRIMER
                                            </button>
                                        </div>
                                    </div>
                                </m.div>
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
