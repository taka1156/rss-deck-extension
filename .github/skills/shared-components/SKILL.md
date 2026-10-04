---
name: shared-components
description: "Use when adding or editing UI in src/components or src/entrypoints, choosing between a raw HTML tag and a Base* component from src/components/shared, or deciding whether to extract a new shared component."
---

# Shared Components (`src/components/shared`)

## Available components

| Component | Replaces | Key props |
|---|---|---|
| `BaseButton` | `<button>` | `variant`: `default` / `secondary` / `icon` (bordered) / `ghost` (transparent, muted, accent on hover) / `menuItem` |
| `BaseInput` | `<input>` | Native input props |
| `BaseLabel` | `<label>` | `direction`: `column` (default) / `row`. Always pass `htmlFor` |
| `BaseLink` | `<a>` | `external` (default `true`: `target="_blank"` + `rel="noopener noreferrer"`, fixed); `external={false}` for same-tab links (in-page `#anchor`, extension pages); `variant="button"` for button look |
| `BaseHeading` | `<h1>`-`<h6>` | `hLv`: `'1'`-`'6'` |
| `BaseText` | `<p>`, text `<span>`/`<small>` | `as`: `p` (default) / `span` / `small`; `color`, `weight`, `size`, `truncate` |
| `BaseList` | `<ul>` | Native `ul` props (resets list style, margin, padding) |
| `BaseDialog` | dialogs | See the component |

## Usage rules

### Text: "text or frame?"
- Elements that display text use `BaseText`.
- Use `as="span"` / `as="small"` only when `<p>` is invalid or breaks layout: inside headings (`<h1>`-`<h6>`), or inside inline flows (next to a link or `<time>`).
- Otherwise keep the default `<p>`. Do not add `as="span"` just to preserve an old tag.
- Operational or layout wrappers stay raw `<span>`/`<div>`: drag handles, color rows, badges, avatars, brand marks, icon containers.
- Text with custom styles (rem sizes, letter-spacing) still uses `BaseText`; keep the custom parts in `className`.
- `color`/`weight`/`size` are optional and inherit from the parent when omitted (keeps the dark theme working).

### Other elements
- Do not write raw `<button>`, `<input>`, `<label>`, `<a>`, `<h1>`-`<h6>` or `<ul>` in features/entrypoints. Use the Base component.
- Do not hand-write `target="_blank"` / `rel` on links. Use `BaseLink`; use `external={false}` for internal links.
- `<li>` stays raw (no shared style, so no wrapper).

### Styling
- Shared styles live in the component's `.css.ts` (`BaseXxx.css.ts`). Remove the same properties from feature CSS when moving to a Base component.
- Feature CSS keeps only layout/context-specific properties (`flex`, `padding` overrides, grid, one-off font sizes).
- Merge classes with `clsx`; Base components accept `className` and merge it.
- CSS order: shared CSS loads before feature CSS, so a feature class with the same specificity overrides the shared one. Keep overrides single-class.
- Do not add global element styles (`globalStyle('input', ...)`) in `theme.css.ts` for things a Base component owns.

## When to extract a new shared component

Extract only if ALL apply:
1. **Reuse**: 2+ places (ideally 3+) use the same element with the same styles or attributes.
2. **Stable shared part**: the common part is style/behavior that must stay identical (reset styles, security attributes like `rel`, accessibility). Differences are expressible as a few props.
3. **Domain-free**: no feature knowledge (feeds, groups, i18n keys, storage). Domain logic stays in `features`.
4. **Real value**: it removes duplicated styles, prevents a mistake (e.g. a missing `rel`), or enforces consistency. A wrapper with no shared style adds nothing (e.g. `BaseListItem` was skipped).

Do not extract when:
- Only one place uses it, or usages differ mostly in style (keep local).
- The wrapper would only forward props.
- Variants would need many props or conditionals (prefer a small `variant`, or leave local).

### Decision flow
1. Is it domain-specific? -> keep in `features`.
2. Is it reused 2+ times with the same common styles? No -> keep local.
3. Does the common part carry real value (style, safety, a11y)? No -> keep local.
4. Can the differences be 1-3 props (`variant`, `as`, `direction`)? Yes -> extract to `shared`. No -> keep local.

## How to add a Base component
1. Create `src/components/shared/BaseXxx/` with `BaseXxx.tsx`, `BaseXxx.css.ts`, `BaseXxx.test.tsx`.
2. Move common styles into `BaseXxx.css.ts`; export the classes so tests can assert them.
3. Spread native props; merge `className` with `clsx`.
4. Replace usages in features/entrypoints and delete the moved styles from their `.css.ts`.
5. Test: default render, each variant/prop, `className` merge, attribute pass-through.
6. Run `npx biome check --write`, `npx tsc --noEmit`, `npx vitest run`, `npx wxt build`.
