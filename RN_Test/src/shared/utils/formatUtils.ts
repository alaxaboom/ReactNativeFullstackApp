export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatNumber = (
  value: number | string | null | undefined,
  options?: { suffix?: string; fixed?: number }
): string => {
  const { suffix = '', fixed = 2 } = options || {};
  if (value == null || value === '') return '—';
  const num = Number(value);
  if (isNaN(num)) return '—';
  return `${num.toFixed(fixed)}${suffix}`;
};

