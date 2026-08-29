/**
 * Question Mart & Cafe - Input Component Specification
 * Luxury, elegant input component design specifications
 */

// ========================================
// INPUT VARIANTS
// ========================================

export enum InputVariant {
  DEFAULT = 'default',
  FILLED = 'filled',
  OUTLINE = 'outline',
  UNDERLINE = 'underline',
}

// ========================================
// INPUT SIZES
// ========================================

export enum InputSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

// ========================================
// INPUT STATES
// ========================================

export enum InputState {
  DEFAULT = 'default',
  FOCUS = 'focus',
  ERROR = 'error',
  SUCCESS = 'success',
  DISABLED = 'disabled',
}

// ========================================
// INPUT SPECIFICATIONS
// ========================================

export const InputSpecs = {
  // Size specifications
  sizes: {
    [InputSize.SM]: {
      height: '36px',
      padding: '0 12px',
      fontSize: '14px',
      borderRadius: '4px',
      iconSize: '16px',
    },
    [InputSize.MD]: {
      height: '44px',
      padding: '0 16px',
      fontSize: '16px',
      borderRadius: '6px',
      iconSize: '20px',
    },
    [InputSize.LG]: {
      height: '52px',
      padding: '0 20px',
      fontSize: '18px',
      borderRadius: '8px',
      iconSize: '24px',
    },
  },

  // Variant specifications
  variants: {
    [InputVariant.DEFAULT]: {
      backgroundColor: 'var(--color-surface-primary)',
      borderColor: 'var(--color-border-default)',
      placeholderColor: 'var(--color-text-muted)',
      focusBorderColor: 'var(--color-border-focus)',
      errorBorderColor: 'var(--color-danger-500)',
      successBorderColor: 'var(--color-success-500)',
      disabledBackgroundColor: 'var(--color-background-tertiary)',
      disabledBorderColor: 'var(--color-border-subtle)',
    },
    [InputVariant.FILLED]: {
      backgroundColor: 'var(--color-background-tertiary)',
      borderColor: 'transparent',
      placeholderColor: 'var(--color-text-muted)',
      focusBackgroundColor: 'var(--color-background-secondary)',
      focusBorderColor: 'transparent',
      errorBorderColor: 'var(--color-danger-500)',
      successBorderColor: 'var(--color-success-500)',
      disabledBackgroundColor: 'var(--color-background-tertiary)',
      disabledBorderColor: 'transparent',
    },
    [InputVariant.OUTLINE]: {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-border-default)',
      placeholderColor: 'var(--color-text-muted)',
      focusBorderColor: 'var(--color-border-focus)',
      errorBorderColor: 'var(--color-danger-500)',
      successBorderColor: 'var(--color-success-500)',
      disabledBackgroundColor: 'transparent',
      disabledBorderColor: 'var(--color-border-subtle)',
    },
    [InputVariant.UNDERLINE]: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderBottomColor: 'var(--color-border-default)',
      placeholderColor: 'var(--color-text-muted)',
      focusBorderBottomColor: 'var(--color-border-focus)',
      errorBorderBottomColor: 'var(--color-danger-500)',
      successBorderBottomColor: 'var(--color-success-500)',
      disabledBackgroundColor: 'transparent',
      disabledBorderBottomColor: 'var(--color-border-subtle)',
    },
  },

  // Transition specifications
  transition: {
    duration: 'var(--transition-duration-base)',
    easing: 'var(--transition-ease-out)',
    properties: ['border-color', 'background-color', 'box-shadow'],
  },

  // Label specifications
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--color-text-primary)',
    marginBottom: '8px',
    requiredIndicator: '*',
    requiredColor: 'var(--color-danger-500)',
  },

  // Helper text specifications
  helperText: {
    fontSize: '12px',
    marginTop: '6px',
    defaultColor: 'var(--color-text-tertiary)',
    errorColor: 'var(--color-danger-500)',
    successColor: 'var(--color-success-500)',
  },

  // Icon specifications
  icon: {
    position: 'absolute',
    color: 'var(--color-text-muted)',
    focusColor: 'var(--color-text-secondary)',
  },
} as const;

// ========================================
// INPUT PROPS INTERFACE
// ========================================

export interface InputProps {
  variant?: InputVariant;
  size?: InputSize;
  disabled?: boolean;
  error?: string;
  success?: string;
  helperText?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  name?: string;
  id?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}
