export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, ' ');
  };
  export const formatNumberValue = (
    value: number | string | null | undefined,
    options?: { suffix?: string; fixed?: number }
  ): string => {
    const { suffix = '', fixed = 2 } = options || {};
    if (value == null || value === '') return '—';
    const num = Number(value);
    if (isNaN(num)) return '—';
    return `${num.toFixed(fixed)}${suffix}`;
  };
  