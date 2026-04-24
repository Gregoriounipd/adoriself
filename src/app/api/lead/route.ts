import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendLeadEmail } from '@/lib/email';
import { createCalendarEvent } from '@/lib/google-calendar';
import { calculatePrice } from '@/lib/pricing';

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
      nome,
      email,
      telefono,
      data_preferita,
    } = body;

    // Validazione
    if (!nome || !email || !telefono) {
      return NextResponse.json({ error: 'Dati mancanti' }, { status: 400 });
    }

    // Calcola budget
    const { minPrice, maxPrice } = calculatePrice({
      tipo_evento,
      num_persone,
      location,
      catering,
      dj,
      fotografo,
      allestimento,
    });

    // Salva in Supabase
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
          budget_min: minPrice,
          budget_max: maxPrice,
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
      return NextResponse.json({ error: 'Errore nel salvataggio' }, { status: 500 });
    }

    // Invia email
    await sendLeadEmail(
      { nome, email, telefono },
      { tipo_evento, num_persone, budget_min: minPrice, budget_max: maxPrice }
    );

    // Crea evento calendario (se data_preferita è fornita)
    if (data_preferita) {
      try {
        const startTime = new Date(data_preferita);
        startTime.setHours(10, 0, 0); // 10:00 AM

        const endTime = new Date(startTime);
        endTime.setHours(11, 0, 0); // 11:00 AM

        await createCalendarEvent({
          title: `Consulenza - ${nome} (${tipo_evento})`,
          description: `Budget: €${minPrice} - €${maxPrice}\nPersone: ${num_persone}\nCatering: ${catering}`,
          startTime,
          endTime,
          attendeeEmail: email,
        });
      } catch (calendarError) {
        console.error('Calendar creation failed:', calendarError);
        // Non bloccare il form se il calendario fallisce
      }
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}