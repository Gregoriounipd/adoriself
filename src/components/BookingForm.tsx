'use client';

import React, { useState } from 'react';
import { EventConfig, calculatePrice } from '@/lib/pricing';
import { validateForm } from '@/lib/validation';

interface BookingFormProps {
  config: EventConfig;
  onSuccess: () => void;
  isLoading?: boolean;
}

export function BookingForm({ config, onSuccess, isLoading = false }: BookingFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    data_preferita: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    setErrors({});

    try {
      const { minPrice, maxPrice } = calculatePrice(config);

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          ...formData,
          budget_min: minPrice,
          budget_max: maxPrice,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore nel salvataggio');
      }

      onSuccess();
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : 'Errore nel salvataggio. Riprova.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Nome e cognome *
        </label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Luca Rossi"
          className={`w-full px-4 py-3 border rounded-lg transition ${
            errors.nome
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gold/30 focus:border-gold focus:ring-gold/20'
          }`}
          aria-invalid={!!errors.nome}
        />
        {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="luca@example.com"
          className={`w-full px-4 py-3 border rounded-lg transition ${
            errors.email
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gold/30 focus:border-gold focus:ring-gold/20'
          }`}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Telefono *
        </label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
          placeholder="+39 123 456 7890"
          className={`w-full px-4 py-3 border rounded-lg transition ${
            errors.telefono
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gold/30 focus:border-gold focus:ring-gold/20'
          }`}
          aria-invalid={!!errors.telefono}
        />
        {errors.telefono && (
          <p className="text-red-600 text-xs mt-1">{errors.telefono}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-dark mb-2">
          Data preferita per la call
        </label>
        <input
          type="date"
          name="data_preferita"
          value={formData.data_preferita}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gold/30 rounded-lg focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition"
        />
      </div>

      {errors.submit && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
          {errors.submit}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || isLoading}
        className="w-full py-4 bg-gold hover:bg-gold-light text-white font-bold rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Sto salvando...' : 'BLOCCA UNA CONSULENZA GRATUITA'}
      </button>

      <p className="text-xs text-dark/50 text-center">
        Riceverai una conferma via email. Ti contatteremo entro 24 ore.
      </p>
    </form>
  );
}
