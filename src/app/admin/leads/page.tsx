'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Lead } from '@/lib/supabase';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('tipo_evento', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-beige flex items-center justify-center">
        <p className="text-dark">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-display font-bold text-dark mb-8">
          Leads ({leads.length})
        </h1>

        <div className="bg-white rounded-lg border border-gold/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-beige border-b border-gold/30">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Nome</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Telefono</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Evento</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Persone</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Budget</th>
                  <th className="px-6 py-4 text-left font-semibold text-dark">Data</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(lead => (
                  <tr
                    key={lead.id}
                    className="border-b border-gold/20 hover:bg-beige/50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-dark">{lead.nome}</td>
                    <td className="px-6 py-4 text-dark/70">{lead.email}</td>
                    <td className="px-6 py-4 text-dark/70">{lead.telefono}</td>
                    <td className="px-6 py-4 text-dark">{lead.tipo_evento}</td>
                    <td className="px-6 py-4 text-dark">{lead.num_persone}</td>
                    <td className="px-6 py-4 text-gold font-semibold">
                      €{lead.budget_min} - €{lead.budget_max}
                    </td>
                    <td className="px-6 py-4 text-sm text-dark/50">
                      {new Date(lead.created_at).toLocaleDateString('it-IT')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
