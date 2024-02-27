---
"svelte-ux": patch
---

Create `FALLBACK_SETTINGS` on demand so we don't call `createThemeStore()` eagerly and thus set `<html class="dark">` unintentional
