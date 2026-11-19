// Web app manifest (served at /manifest.webmanifest): name, colours and icons for "Add to home screen"
export default function manifest() {
  return {
    name: 'Muhammad Ibrahim, Agentic AI & Automation Engineer',
    short_name: 'M. Ibrahim',
    description: 'AI agents, voice agents and business automation with human approval, plus full-stack products.',
    start_url: '/',
    display: 'browser',
    background_color: '#0E0D0C',
    theme_color: '#0E0D0C',
    icons: [
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { src: '/favicon.png', sizes: '48x48', type: 'image/png' }
    ]
  };
}
