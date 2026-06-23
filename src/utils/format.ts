/**
 * Formatting utilities for dates, numbers, and currencies.
 */

/**
 * Format a date string or object into a human-readable display date.
 */
export const formatDate = (date: Date | string | number): string => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
};

/**
 * Format currency to USD or specified locale currency.
 */
export const formatCurrency = (amount: number, currency = 'USD', locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Capitalize first letter of a string.
 */
export const capitalize = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
