# Project Rules & Design Guidelines: React Playground (BYOND BIZNIS)

## 1. UI Framework & Styling Standards
- **Material UI (MUI) First**: ALWAYS use `@mui/material` components and `@mui/icons-material` icons as much as possible for all UI elements.
- **No Raw Primitives**: Avoid raw HTML elements (`<button>`, `<input>`, `<div>`, `<span>`) for interactive elements or text. Use MUI equivalents (`Button`, `TextField`, `Box`, `Typography`, `IconButton`, `Chip`, `Paper`) to ensure uniform theme styling, accessibility, and ripple animations.
- **Responsive Layout Grids**: Always use standard MUI Grid (`import Grid from '@mui/material/Grid'`) for multi-column responsive grid layouts with responsive size breakpoints (`size={{ xs: 12, sm: 6, md: 4 }}`).
- **BYOND BIZNIS Theme Tokens**:
  - **Teal Primary**: `#00A99D` (or `#00A39D`)
  - **Orange Accent**: `#F59E0B` (or `#EAA827`)
  - **Main Text**: `#1E293B`
  - **Muted Text**: `#64748B`
  - **Background**: `#F4F5F7` (Paper: `#FFFFFF`)
  - **Border**: `#E2E8F0` / `#E8ECEF`

## 2. Component Architecture & Modularization
- **Dedicated Component Packages**: Keep distinct UI primitives in separate directories inside `src/components/`:
  - `src/components/card/`: Standalone `Card` container with title, subtitle, actions, divider.
  - `src/components/breadcrumbs/`: Standalone `Breadcrumbs` component with `BreadcrumbItem` type.
  - `src/components/search/`: Standalone `ExpandableSearch` component.
  - `src/components/form/`: RHF + Zod type-safe form field primitives.
  - `src/components/pageLayout/`: `PageLayout` compound layout system (`Header`, `Content`, `Section`, `Steps`, `StickyFooter`, `Skeleton`, `Breadcrumbs`).
  - `src/components/sidebar/`: Modern collapsible `Sidebar` component system.
  - `src/components/appShell/`: `AppShell` layout container.
- **Barrel Exports**: Every component folder MUST feature a clean `index.ts` file exporting the public component functions and TypeScript prop interfaces.
- **Decoupled Primitives**: Keep general UI primitives (`Card`, `ExpandableSearch`, `Breadcrumbs`) decoupled from compound wrappers like `PageLayout` so they can be freely reused in drawers, dialogs, panels, or standalone views.
- **Import from dedicated packages**: Always import standalone primitives from their own package path (e.g. `from '../../components/card'`, `from '../../components/breadcrumbs'`, `from '../../components/search'`).

## 3. Type Safety & Form Best Practices
- **Type-Safe Forms**: Use `createTypedForm<TSchemaValues>()` for form implementations.
- **Zod & React Hook Form**: Define schemas using `zod` and connect via `Field.*` typed primitives (`Field.Text`, `Field.Select`, `Field.Checkbox`, `Field.Radio`, `Field.Switch`, `Field.Slider`, `Field.DatePicker`, `Field.Autocomplete`).

## 4. Verification & Testing Workflow
- **TypeScript Verification**: Always run `npx tsc --noEmit` to verify type safety.
- **Vitest & React Testing Library**: Maintain tests in `*.test.tsx` files. Run `npx vitest run` to ensure all tests pass before completing tasks.
