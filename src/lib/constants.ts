import { dev } from '$app/env';

export const ROOT = 'https://rockabillyroasting.com/';
export const WP_KEY = dev ? import.meta.env.VITE_WP_KEY : process.env.WP_KEY;
export const WP_SECRET = dev ? import.meta.env.VITE_WP_SECRET : process.env.WP_SECRET;
