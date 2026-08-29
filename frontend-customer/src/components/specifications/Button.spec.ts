/**
 * Question Mart & Cafe - Button Component Specification
 * Luxury, elegant button component design specifications
 */

// ========================================
// BUTTON VARIANTS
// ========================================

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  LINK = 'link',
}

// ========================================
// BUTTON SIZES
// ========================================

export enum ButtonSize {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

// ========================================
// BUTTON SPECIFICATIONS
// ========================================

export const ButtonSpecs = {
  // Size specifications
  sizes: {
    [ButtonSize.XS]: {
      height: '28px',
      padding: '0 12px',
      fontSize: '12px',
      borderRadius: '4px',
    },
    [ButtonSize.SM]: {
      height: '32px',
      padding: '0 16px',
      fontSize: '14px',
      borderRadius: '4px',
    },
    [ButtonSize.MD]: {
      height: '40px',
      padding: '0 24px',
      fontSize: '14px',
      borderRadius: '6px',
    },
    [ButtonSize.LG]: {
      height: '48px',
      padding: '0 32px',
      fontSize: '16px',
      borderRadius: '8px',
    },
    [ButtonSize.XL]: {
      height: '56px',
      padding: '0 40px',
      fontSize: '18px',
      borderRadius: '8px',
    },
  },

  // Variant specifications
  variants: {
    [ButtonVariant.PRIMARY]: {
      backgroundColor: 'var(--color-primary-900)',
      color: 'var(--color-text-inverse)',
      hoverBackgroundColor: 'var(--color-primary-800)',
      activeBackgroundColor: 'var(--color-primary-700)',
      disabledBackgroundColor: 'var(--color-primary-300)',
      disabledColor: 'var(--color-text-muted)',
    },
    [ButtonVariant.SECONDARY]: {
      backgroundColor: 'var(--color-secondary-500)',
      color: 'var(--color-text-inverse)',
      hoverBackgroundColor: 'var(--color-secondary-600)',
      activeBackgroundColor: 'var(--color-secondary-700)',
      disabledBackgroundColor: 'var(--color-secondary-200)',
      disabledColor: 'var(--color-text-muted)',
    },
    [ButtonVariant.OUTLINE]: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      borderColor: 'var(--color-border-default)',
      hoverBackgroundColor: 'var(--color-background-tertiary)',
      activeBackgroundColor: 'var(--color-background-secondary)',
      disabledBorderColor: 'var(--color-border-subtle)',
      disabledColor: 'var(--color-text-muted)',
    },
    [ButtonVariant.GHOST]: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      hoverBackgroundColor: 'var(--color-background-tertiary)',
      activeBackgroundColor: 'var(--color-background-secondary)',
      disabledColor: 'var(--color-text-muted)',
    },
    [ButtonVariant.LINK]: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-primary)',
      textDecoration: 'underline',
      hoverColor: 'var(--color-text-secondary)',
      activeColor: 'var(--color-text-tertiary)',
      disabledColor: 'var(--color-text-muted)',
    },
  },

  // Transition specifications
  transition: {
    duration: 'var(--transition-duration-base)',
    easing: 'var(--transition-ease-out)',
    properties: ['background-color', 'color', 'border-color', 'transform', 'box-shadow'],
  },

  // Icon specifications
  icon: {
    size: {
      [ButtonSize.XS]: '14px',
      [ButtonSize.SM]: '16px',
      [ButtonSize.MD]: '18px',
      [ButtonSize.LG]: '20px',
      [ButtonSize.XL]: '24px',
    },
    spacing: '8px',
  },

  // Loading state
  loading: {
    spinnerSize: {
      [ButtonSize.XS]: '12px',
      [ButtonSize.SM]: '14px',
      [ButtonSize.MD]: '16px',
      [ButtonSize.LG]: '18px',
      [ButtonSize.XL]: '20px',
    },
  },
} as const;

// ========================================
// BUTTON PROPS INTERFACE
// ========================================

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}
