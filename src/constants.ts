export const TRACKR_CATS = (process.env.NEXT_PUBLIC_TRACKD_RELATIVE || '').split(',');
export const HAS_CATS = !!TRACKR_CATS.length && !!TRACKR_CATS[0].length;
export const OPENTSDB_HOST = process.env.OPENTSDB_HOST || 'localhost';
export const OPENTSDB_PORT = process.env.OPENTSDB_PORT || 4242;
export const TRACKR_RELATIVE_METRIC = 'dev_trackr_relative';
export const PRODUCTION = process.env.NODE_ENV === 'production';
