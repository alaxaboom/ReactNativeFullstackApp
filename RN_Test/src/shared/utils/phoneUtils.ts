export const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const normalizePhoneIfNotEmail = (input: string): string => {
  if (input.includes('@')) {
    return input.trim().toLowerCase();
  }
  return input.replace(/\D/g, '');
};

export const formatPhoneDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('387')) {
    return `+${cleaned.substring(0, 3)} ${cleaned.substring(3, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8, 11)}`;
  }
  return `+${cleaned}`;
};

