// HeroSection Styles

export const sectionStyles = 'relative h-screen flex items-center justify-center overflow-hidden';

export const backgroundStyles = {
  container: 'absolute inset-0 z-0',
  image: "absolute inset-0 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')]",
  overlay: 'absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80',
};

export const contentStyles = {
  container: 'relative z-10 text-center text-white px-4 max-w-5xl mx-auto',
  badge: 'inline-block px-4 py-2 bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full text-primary text-sm font-medium mb-6',
  title: 'text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-none tracking-tight',
  titleAccent: 'block text-primary',
  description: 'text-lg md:text-xl text-neutral-300 mb-10 max-w-2xl mx-auto',
  buttons: 'flex flex-col sm:flex-row gap-4 justify-center',
};

export const scrollIndicatorStyles = {
  container: 'absolute bottom-8 left-1/2 -translate-x-1/2',
  content: 'flex flex-col items-center text-white/60',
  text: 'text-xs uppercase tracking-widest mb-2',
};
