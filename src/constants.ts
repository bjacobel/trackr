export const TRACKR_CATS = (process.env.NEXT_PUBLIC_TRACKD_RELATIVE || '').split(',');
export const HAS_CATS = TRACKR_CATS.length && TRACKR_CATS[0].length;
