---
name: mui-playground-development
description: Guidelines and best practices for developing components and pages in the React Playground using Material UI (MUI) and BYOND design system principles.
---

# MUI Playground Development Skill

This skill provides workflow guidance for building and maintaining components, forms, and layout pages in this repository.

## Core Principles

1. **Leverage Material UI Primitives**:
   - Always prefer `@mui/material` components over native HTML elements.
   - Use `Box` for layout containers with `sx` styling.
   - Use `Typography` with explicit variants (`h4`, `h5`, `h6`, `body2`, `caption`) and font weights (`800` for headings, `600`/`700` for subheaders, `500` for body).
   - Use `Stack` for flex row/column alignment with spacing props.
   - Use standard `Grid` from `@mui/material/Grid` with responsive `size={{ xs: 12, sm: 6, md: 4 }}` props.

2. **BYOND Theme Aesthetics**:
   - Primary Teal: `#00A99D`
   - Accent Orange/Gold: `#F59E0B`
   - Main Dark Text: `#1E293B`
   - Muted Subtitle Text: `#64748B`
   - Page Background: `#F4F5F7`
   - Card/Paper Border: `#E2E8F0` / `#E8ECEF`

3. **Standalone Component Architecture**:
   - Keep components modular in `src/components/<component-name>/`.
   - Always export types and main component via `src/components/<component-name>/index.ts`.

4. **Quality Assurance**:
   - Run `npx tsc --noEmit` to verify type safety.
   - Run `npx vitest run` to execute unit tests.
