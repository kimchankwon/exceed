---
name: daisyui
description: Use this skill when implementing any daisyUI component (button, modal, card, accordion, badge, alert, avatar, carousel, chat, collapse, drawer, dropdown, footer, hero, indicator, input, join, kbd, link, loading, mask, menu, mockup, navbar, pagination, progress, radial-progress, rating, select, stat, steps, swap, tab, table, textarea, timeline, toast, toggle, tooltip). Always fetch the daisyUI docs before writing component code.
version: 1.0.0
---

# Implement daisyUI Components

Use this skill whenever you need to implement a daisyUI component to ensure correct class names and best practices for daisyUI 5 (which changed significantly from v4).

## When This Skill Applies

- User asks to add or modify any daisyUI component
- You need to know the correct class names for a component
- You want to use a modifier variant (e.g. `btn-primary`, `collapse-arrow`, `modal-bottom`)

## Steps

1. **Fetch the component docs** before writing any code:

```
WebFetch: https://daisyui.com/components/<component-name>/
Prompt: "Show me all class names, modifiers, and HTML structure for this component including any variants"
```

Common component URL examples:
- `https://daisyui.com/components/button/`
- `https://daisyui.com/components/modal/`
- `https://daisyui.com/components/accordion/`
- `https://daisyui.com/components/card/`
- `https://daisyui.com/components/collapse/`
- `https://daisyui.com/components/navbar/`
- `https://daisyui.com/components/input/`

2. **Note the base + modifier class pattern** — daisyUI uses `<component> <component-modifier>`:

```html
<!-- Button example -->
<button class="btn btn-primary btn-sm">Click</button>

<!-- Collapse/accordion example -->
<div class="collapse collapse-arrow">
  <input type="checkbox" />
  <div class="collapse-title">Title</div>
  <div class="collapse-content">Content</div>
</div>
```

3. **Use the exact class names from the docs** — do not guess or infer class names from v4 knowledge.

## Notes

- daisyUI 5 class names differ from v4 — always fetch fresh docs.
- No CSS modules or CSS-in-JS — all styling is via utility classes per project conventions.
- daisyUI components respond to the active theme automatically (light/dark).
- When in doubt about a modifier or variant, fetch the docs rather than guessing.
