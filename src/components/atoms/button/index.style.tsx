// Button Styles - Encapsulated styling logic

interface ButtonStyleProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
  secondary: 'bg-neutral-800 text-white hover:bg-neutral-700 focus:ring-neutral-500',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
  ghost: 'text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-300',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const buttonStyles = ({ variant, size, disabled }: ButtonStyleProps): string => {
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  return `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles}`;
};

export const loaderStyles = 'inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin';
