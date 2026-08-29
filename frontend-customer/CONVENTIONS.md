# Question Mart & Cafe - Frontend Conventions

## Project Conventions

This document outlines the coding conventions and organizational standards for the Question Mart & Cafe frontend project.

---

## File Naming Conventions

### General Rules
- Use **kebab-case** for all file names
- Use **PascalCase** for React component files
- Use **camelCase** for utility files
- Use **kebab-case** for style files
- Use **kebab-case** for configuration files

### Examples

```
✅ Correct
- UserProfile.tsx
- user-service.ts
- button-styles.css
- vite.config.ts

❌ Incorrect
- userProfile.tsx
- User_Service.ts
- ButtonStyles.css
- viteConfig.ts
```

---

## Folder Naming Conventions

- Use **kebab-case** for all folder names
- Keep names descriptive but concise
- Use singular nouns for folders containing similar items

### Examples

```
✅ Correct
- components/
- services/
- styles/
- utils/

❌ Incorrect
- Components/
- userServices/
- style_files/
- util/
```

---

## Component Naming Conventions

### React Components
- Use **PascalCase** for component names
- Component files should match the component name
- Use descriptive names that indicate purpose

### Examples

```
✅ Correct
- UserProfile.tsx → export const UserProfile: React.FC = () => {}
- OrderCard.tsx → export const OrderCard: React.FC = () => {}
- NavigationBar.tsx → export const NavigationBar: React.FC = () => {}

❌ Incorrect
- userProfile.tsx → export const UserProfile: React.FC = () => {}
- order-card.tsx → export const OrderCard: React.FC = () => {}
- navbar.tsx → export const NavigationBar: React.FC = () => {}
```

### Component Structure
- Functional components only (no class components)
- Use TypeScript interfaces for props
- Export components as named exports

```typescript
// ✅ Correct
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant, children }) => {
  return <button className={`btn btn-${variant}`}>{children}</button>;
};

// ❌ Incorrect
export default function Button({ variant, children }) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}
```

---

## Hooks Naming Conventions

- Use **camelCase** with `use` prefix
- Custom hooks should start with `use`
- Keep hooks focused on a single concern

### Examples

```
✅ Correct
- useAuth.ts → export const useAuth = () => {}
- useLocalStorage.ts → export const useLocalStorage = () => {}
- useDebounce.ts → export const useDebounce = () => {}

❌ Incorrect
- AuthHook.ts → export const useAuth = () => {}
- useLocalStorage.ts → export const localStorageHook = () => {}
- UseDebounce.ts → export const useDebounce = () => {}
```

---

## Service Naming Conventions

- Use **camelCase** for service files
- Service names should end with `Service` or be descriptive
- Group related functions in a single service file

### Examples

```
✅ Correct
- authService.ts → export const login = () => {}
- userService.ts → export const getUserProfile = () => {}
- orderService.ts → export const createOrder = () => {}

❌ Incorrect
- auth.ts → export const login = () => {}
- User.ts → export const getUserProfile = () => {}
- order-service.ts → export const createOrder = () => {}
```

---

## Import Organization

### Import Order
1. React and third-party libraries
2. Internal constants and types
3. Internal utilities and helpers
4. Internal components
5. Styles
6. Relative imports (last)

### Example

```typescript
// ✅ Correct
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { ROUTES, API_ENDPOINTS } from '../../constants';
import { User, Order } from '../../types';
import { useAuth } from '../../context';
import { formatDate } from '../../utils';

import { Button, Card } from '../../components';
import './UserProfile.css';

// ❌ Incorrect
import { Button } from '../../components';
import React, { useState } from 'react';
import { ROUTES } from '../../constants';
import './UserProfile.css';
import { formatDate } from '../../utils';
```

---

## File Organization

### Component File Structure

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.spec.ts      # Component specifications
├── ComponentName.test.tsx     # Component tests (future)
├── ComponentName.css          # Component styles
└── index.ts                   # Component export
```

### Page File Structure

```
pages/
├── home/
│   ├── HomePage.tsx
│   ├── HomePage.css
│   └── index.ts
├── menu/
│   ├── MenuPage.tsx
│   ├── MenuPage.css
│   └── index.ts
```

---

## TypeScript Conventions

### Type Definitions
- Use **PascalCase** for interface and type names
- Use **camelCase** for property names
- Export types from a central `types/` directory

### Example

```typescript
// ✅ Correct
interface UserProfile {
  userId: string;
  userName: string;
  userEmail: string;
}

type OrderStatus = 'pending' | 'confirmed' | 'completed';

// ❌ Incorrect
interface userProfile {
  user_id: string;
  user_name: string;
  user_email: string;
}

type order_status = 'pending' | 'confirmed' | 'completed';
```

### Type Exports
- Export types from `types/index.ts`
- Re-export types from feature-specific type files

---

## CSS Conventions

### Class Naming
- Use **kebab-case** for class names
- Use BEM methodology for complex components
- Prefix utility classes with `u-`

### BEM Example

```css
/* ✅ Correct */
.card { }
.card__header { }
.card__header--highlighted { }
.card__body { }
.card__footer { }

/* ❌ Incorrect */
.card { }
.cardHeader { }
.cardHeaderHighlighted { }
.cardBody { }
.cardFooter { }
```

### CSS Variables
- Use CSS variables from design tokens
- Never hardcode colors, spacing, or fonts

---

## Code Style

### General Rules
- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Use trailing commas in multi-line objects/arrays
- Max line length: 100 characters

### Example

```typescript
// ✅ Correct
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'customer',
};

// ❌ Incorrect
const user = {
  id:'123',
  name:"John Doe",
  email:"john@example.com",
  role:"customer"
};
```

---

## Comments

### When to Comment
- Explain complex logic
- Document API integrations
- Note workarounds or temporary solutions
- Explain why (not what)

### Comment Style

```typescript
// ✅ Correct
// Calculate loyalty tier based on points
// Bronze: 0-999, Silver: 1000-2499, Gold: 2500-4999, Platinum: 5000+
const calculateLoyaltyTier = (points: number): LoyaltyTier => {
  // Implementation
};

// ❌ Incorrect
// This function calculates the loyalty tier
const calculateLoyaltyTier = (points: number): LoyaltyTier => {
  // Implementation
};
```

---

## Git Commit Conventions

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(auth): add JWT token refresh logic

Implement automatic token refresh when the access token expires.
Redirects to login if refresh fails.

fix(order): correct total calculation bug

Fixed issue where service fee was not included in order total.
Added proper discount calculation.

docs(readme): update installation instructions

Updated the README with new environment variables and setup steps.
```

---

## Performance Guidelines

### Code Splitting
- Lazy load routes using React.lazy
- Split large components into smaller pieces
- Use dynamic imports for heavy libraries

### Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Debounce search inputs
- Lazy load images

---

## Accessibility Guidelines

### ARIA Labels
- Always include aria-labels for icon-only buttons
- Use semantic HTML elements
- Ensure keyboard navigation works
- Test with screen readers

### Example

```typescript
// ✅ Correct
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

// ❌ Incorrect
<button onClick={onClose}>
  <CloseIcon />
</button>
```

---

## Security Guidelines

### Data Handling
- Never store sensitive data in localStorage (use secure storage)
- Validate all user inputs
- Sanitize data before rendering
- Use HTTPS in production
- Implement proper error handling (don't expose stack traces)

---

## Testing Guidelines (Future)

### Test Naming
- Use `describe` for test suites
- Use `it` or `test` for individual tests
- Name tests descriptively

### Example

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('should return user data on successful login', async () => {
      // Test implementation
    });

    it('should throw error on invalid credentials', async () => {
      // Test implementation
    });
  });
});
```

---

## Documentation

### Component Documentation
- Use JSDoc comments for complex functions
- Document props with TypeScript interfaces
- Include usage examples in README files

### Example

```typescript
/**
 * Authenticates a user with email and password
 * @param credentials - User login credentials
 * @returns Promise resolving to authenticated user with token
 * @throws Error if credentials are invalid
 */
export const login = async (credentials: LoginCredentials): Promise<AuthUser> => {
  // Implementation
};
```

---

## Review Checklist

Before committing code, ensure:
- [ ] Code follows naming conventions
- [ ] Imports are properly organized
- [ ] TypeScript has no errors
- [ ] Components are properly typed
- [ ] No console.log statements (use proper logging)
- [ ] Accessibility requirements are met
- [ ] Performance considerations are addressed
- [ ] Code is properly documented
- [ ] Tests pass (when implemented)
