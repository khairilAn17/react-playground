# Project Rules & Design Guidelines: React Playground (BYOND BIZNIS)

## 1. UI Framework & Styling Standards
- **Material UI (MUI) First**: ALWAYS use `@mui/material` components and `@mui/icons-material` icons as much as possible for all UI elements.
- **No Raw Primitives**: Avoid raw HTML elements (`<button>`, `<input>`, `<div>`, `<span>`) for interactive elements or text. Use MUI equivalents (`Button`, `TextField`, `Box`, `Typography`, `IconButton`, `Chip`, `Paper`) to ensure uniform theme styling, accessibility, and ripple animations.
- **Responsive Layout Grids**: Always use standard MUI Grid (`import Grid from '@mui/material/Grid'`) for multi-column responsive grid layouts with responsive size breakpoints (`size={{ xs: 12, sm: 6, md: 4 }}`).
- **BYOND BIZNIS Theme Tokens**:
  - **Teal Primary**: `#00A39D` (or `#00A99D`)
  - **Orange Accent**: `#F59E0B` (or `#EAA827`)
  - **Main Text**: `#1E293B`
  - **Muted Text**: `#64748B`
  - **Background**: `#F4F5F7` (Paper: `#FFFFFF`)
  - **Border**: `#E2E8F0` / `#E8ECEF`

## 2. Component Taxonomy & Architecture (3-Tier Layering)
- **Layer 1 — UI Primitives (`src/components/`)**: Pure presentational elements, zero domain awareness.
  - `src/components/card/`: Standalone `Card` container.
  - `src/components/breadcrumbs/`: Standalone `Breadcrumbs` component with `BreadcrumbItem` type.
  - `src/components/search/`: Standalone `ExpandableSearch` component.
  - `src/components/form/`: RHF + Zod type-safe form field primitives.
  - `src/components/pageLayout/`: `PageLayout` compound layout system.
  - `src/components/sidebar/`: Modern collapsible `Sidebar` component system.
- **Layer 2 — Composite Domain Widgets (`src/widgets/`)**: Domain-aware composite UI blocks with API hooks, popovers, and loading states.
  - `src/widgets/userHeader/`: Header actions widget with `UserHeader`, `UserProfilePill` (MUI Menu), `NotificationMenu` (MUI Popover), and `Skeleton` loading states.
- **Layer 3 — Feature Workspaces (`src/features/`)**: High-level business feature workflows and page layouts.
- **Barrel Exports**: Every component and widget folder MUST feature a clean `index.ts` file exporting the public functions and TypeScript prop interfaces.

## 3. Type Safety & Form Best Practices
- **Type-Safe Forms**: Use `createTypedForm<TSchemaValues>()` for form implementations.
- **Zod & React Hook Form**: Define schemas using `zod` and connect via `Field.*` typed primitives (`Field.Text`, `Field.Select`, `Field.Checkbox`, `Field.Radio`, `Field.Switch`, `Field.Slider`, `Field.DatePicker`, `Field.Autocomplete`).

## 4. Verification & Testing Workflow
- **TypeScript Verification**: Always run `npx tsc --noEmit` to verify type safety.
- **Vitest & React Testing Library**: Maintain tests in `*.test.tsx` files. Run `npx vitest run` to ensure all tests pass before completing tasks.
