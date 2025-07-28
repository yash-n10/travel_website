// utils/slugify.ts
export function slugify(text: string | undefined | null): string {
  if (!text || typeof text !== 'string') {
    return '' // Return empty string instead of throwing or warning
  }
  
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}