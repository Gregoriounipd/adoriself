export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(phone);
}

export function validateForm(data: {
  nome: string;
  email: string;
  telefono: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.nome || data.nome.length < 2) {
    errors.nome = 'Nome valido richiesto';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email non valida';
  }

  if (!validatePhone(data.telefono)) {
    errors.telefono = 'Numero di telefono non valido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
