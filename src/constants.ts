export const TRACKR_RELATIVE_CATS = (process.env.NEXT_PUBLIC_TRACKD_RELATIVE || '').split(',');
export const HAS_RELATIVE_CATS = !!TRACKR_RELATIVE_CATS.length && !!TRACKR_RELATIVE_CATS[0].length;
export const OPENTSDB_HOST = process.env.OPENTSDB_HOST || 'localhost';
export const OPENTSDB_PORT = process.env.OPENTSDB_PORT || 4242;
export const PRODUCTION = process.env.NODE_ENV === 'production';
export const TRACKR_RELATIVE_METRIC = `${PRODUCTION ? '' : 'dev_'}trackr_relative`;
export const TRACKR_ABSOLUTE_METRIC = `${PRODUCTION ? '' : 'dev_'}trackr_absolute`;
export const LEGACY_MAPPINGS: { [legacyCat: string]: number } = {
  '-': 0,
  None: 0,
  Mild: 3,
  Moderate: 6,
  Severe: 9,
};
