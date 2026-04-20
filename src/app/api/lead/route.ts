import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendLeadEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      tipo_evento,
      num_persone,
      location,
      catering,
      dj,
      fotografo,
      allestimento,
      budget_min,
      budget_max,
      nome,
      email,
      telefono,
      data_preferita,
    } = body;

    // Validazione base
    if (!nome || !email || !telefono) {
      return NextResponse.json(
        { error: 'Dati mancanti' },
        { status: 400 }
      );
    }

    // Salva su Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          tipo_evento,
          num_persone,
          location,
          catering,
          dj,
          fotografo,
          allestimento,
          budget_min,
          budget_max,
          nome,
          email,
          telefono,
          data_preferita,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Errore nel salvataggio' },
        { status: 500 }
      );
    }

    // Invia email
    await sendLeadEmail(
      { nome, email, telefono },
      { tipo_evento, num_persone, budget_min, budget_max }
    );

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Errore interno' },
      { status: 500 }
    );
  }
}
