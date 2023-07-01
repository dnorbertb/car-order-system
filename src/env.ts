export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

if (!BACKEND_URL) throw new Error('No backend url defined')