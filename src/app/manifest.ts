import { MetadataRoute } from 'next';

const manifest = (): MetadataRoute.Manifest => ({
  name: 'Trackr',
  short_name: 'Trackr',
  theme_color: '#ffffff',
  background_color: '#f5f5f5',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
});

export default manifest;
