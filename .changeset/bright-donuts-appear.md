---
'svelte-ux': patch
---

Fix SelectField MenuOption icons no longer being passed to MenuItems. Fix SelectField `classes: { field: ... }` not being incorporated into the inner `TextField` properly. Same with `classes: { option: ... }` not being incorporated into each inner `MenuItem` option. Update SelectField docs page with colored example that differentiates icon & input color, both in the field and the menu items.
