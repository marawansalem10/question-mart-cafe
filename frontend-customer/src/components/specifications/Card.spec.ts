/**
 * Question Mart & Cafe - Card Component Specification
 * Luxury, elegant card component design specifications
 */

// ========================================
// CARD VARIANTS
// ========================================

export enum CardVariant {
  DEFAULT = 'default',
  ELEVATED = 'elevated',
  OUTLINE = 'outline',
  FLAT = 'flat',
}

// ========================================
// CARD SIZES
// ========================================

export enum CardSize {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

// ========================================
// CARD SPECIFICATIONS
// ========================================

export const CardSpecs = {
  // Size specifications
  sizes: {
    [CardSize.SM]: {
      padding: '16px',
      borderRadius: '8px',
      gap: '12px',
    },
    [CardSize.MD]: {
      padding: '24px',
      borderRadius: '12px',
      gap: '16px',
    },
    [CardSize.LG]: {
      padding: '32px',
      borderRadius: '16px',
      gap: '20px',
    },
    [CardSize.XL]: {
      padding: '40px',
      borderRadius: '20px',
      gap: '24px',
    },
  },

  // Variant specifications
  variants: {
    [CardVariant.DEFAULT]: {
      backgroundColor: 'var(--color-surface-primary)',
      borderColor: 'var(--color-border-subtle)',
      shadow: 'var(--shadow-sm)',
      hoverShadow: 'var(--shadow-md)',
    },
    [CardVariant.ELEVATED]: {
      backgroundColor: 'var(--color-surface-primary)',
      borderColor: 'transparent',
      shadow: 'var(--shadow-lg)',
      hoverShadow: 'var(--shadow-xl)',
    },
    [CardVariant.OUTLINE]: {
      backgroundColor: 'transparent',
      borderColor: 'var(--color-border-default)',
      shadow: 'none',
      hoverShadow: 'var(--shadow-sm)',
    },
    [CardVariant.FLAT]: {
      backgroundColor: 'var(--color-surface-secondary)',
      borderColor: 'transparent',
      shadow: 'none',
      hoverShadow: 'none',
    },
  },

  // Transition specifications
  transition: {
    duration: 'var(--transition-duration-base)',
    easing: 'var(--transition-ease-out)',
    properties: ['box-shadow', 'transform', 'border-color'],
  },

  // Header specifications
  header: {
    marginBottom: '16px',
    title: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'var(--color-text-primary)',
      lineHeight: '1.4',
    },
    subtitle: {
      fontSize: '14px',
      fontWeight: '400',
      color: 'var(--color-text-secondary)',
      lineHeight: '1.5',
      marginTop: '4px',
    },
  },

  // Body specifications
  body: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'var(--color-text-primary)',
  },

  // Footer specifications
  footer: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border-subtle)',
  },

  // Image specifications
  image: {
    borderRadius: '8px',
    aspectRatio: '16/9',
    objectFit: 'cover',
  },
} as const;

// ========================================
// CARD PROPS INTERFACE
// ========================================

export interface CardProps {
  variant?: CardVariant;
  size?: CardSize;
  hoverable?: boolean;
  clickable?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export interface CardBodyProps {
  children: React.ReactNode;
}

export interface CardFooterProps {
  children: React.ReactNode;
}
