import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    LogOut,
    Search,
    Filter,
    CheckCircle2,
    RefreshCcw,
    Rocket,
    Mail
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
    }, []);

    async function fetchLeads() {
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

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('leads')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) console.error('Update failed:', error);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const filteredLeads = leads.filter(lead =>
        lead.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.service_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'New': return 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20';
            case 'In Progress': return 'text-accent-magenta bg-accent-magenta/10 border-accent-magenta/20';
            case 'Archived': return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="min-h-screen bg-primary text-gray-300 font-sans">
            <AnimatePresence>
                {selectedLead && (
                    <LeadDetailModal
                        lead={selectedLead}
                        onClose={() => setSelectedLead(null)}
                        onUpdateStatus={handleStatusUpdate}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar / Sidebar Placeholder Style Nav */}
            <nav className="fixed left-0 top-0 bottom-0 w-20 bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col items-center py-10 z-50">
                <div className="w-10 h-10 bg-white/10 rounded-xl mb-12 flex items-center justify-center text-white font-black italic">W</div>
                <div className="space-y-8 flex-grow">
                    <button className="p-3 bg-accent-magenta/20 text-accent-magenta rounded-xl"><Users size={20} /></button>
                    <button className="p-3 text-gray-600 hover:text-white transition-colors"><Filter size={20} /></button>
                    <button className="p-3 text-gray-600 hover:text-white transition-colors"><Search size={20} /></button>
                </div>
                <button onClick={handleLogout} className="p-3 text-red-500/50 hover:text-red-500 transition-colors"><LogOut size={20} /></button>
            </nav>

            <main className="pl-20 min-h-screen">
                <div className="max-w-[1600px] mx-auto p-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                        <div>
                            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">Flux Leads</h1>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Gestion des Opportunités Webora</p>
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <div className="relative flex-grow md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Filtrer Leads..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-white/20 transition-all font-bold"
                                />
                            </div>
                            <button onClick={fetchLeads} className="p-3 glass-card hover:bg-white/5 transition-all"><RefreshCcw size={18} /></button>
                        </div>
                    </div>

                    {/* Stats Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Total Flux', val: leads.length, color: 'text-white' },
                            { label: 'Nouveaux', val: leads.filter(l => l.status === 'New').length, color: 'text-accent-cyan' },
                            { label: 'En Cours', val: leads.filter(l => l.status === 'In Progress').length, color: 'text-accent-magenta' },
                            { label: 'Archivés', val: leads.filter(l => l.status === 'Archived').length, color: 'text-gray-600' },
                        ].map((stat, i) => (
                            <div key={i} className="glass-card p-6 border-white/5">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">{stat.label}</p>
                                <p className={`text-2xl font-black ${stat.color}`}>{stat.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Leads Table - "Linear Style" */}
                    <div className="glass-card overflow-hidden border border-white/5 bg-white/[0.01]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 bg-white/[0.02]">
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Flux Date</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Client / Structure</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Expertise</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500">Status</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.03]">
                                    <AnimatePresence>
                                        {filteredLeads.map((lead) => (
                                            <motion.tr
                                                key={lead.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                onClick={() => setSelectedLead(lead)}
                                                className="hover:bg-white/[0.02] cursor-pointer transition-colors group"
                                            >
                                                <td className="px-8 py-6">
                                                    <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">
                                                        {new Date(lead.created_at).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-black text-white uppercase tracking-tight italic">{lead.client_name}</span>
                                                        <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{lead.company || lead.client_email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 text-white italic group-hover:border-white/20 transition-all">
                                                        {lead.service_type}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className={`px-3 py-1 inline-flex items-center gap-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(lead.status)}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'New' ? 'bg-accent-cyan animate-pulse' :
                                                            lead.status === 'In Progress' ? 'bg-accent-magenta' :
                                                                'bg-gray-500'
                                                            }`} />
                                                        {lead.status}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleStatusUpdate(lead.id, 'In Progress'); }}
                                                            className="p-2 hover:bg-white/10 rounded-lg text-accent-cyan transition-all"
                                                        >
                                                            <Rocket size={16} />
                                                        </button>
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                                                            className="p-2 hover:bg-white/10 rounded-lg text-white transition-all"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>

                        {filteredLeads.length === 0 && !loading && (
                            <div className="py-20 text-center">
                                <p className="text-gray-600 font-black uppercase tracking-widest text-xs italic bg-white/5 py-4 inline-block px-12 rounded-full border border-white/5">Aucune opportunité détectée</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
