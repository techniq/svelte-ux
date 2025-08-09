---
'svelte-ux': patch
---

Fixed (Drawer/Dialog) open/close events firing on mount and unrelated updates. Now events are emitted only on actual state transitions by tracking the previous open value, preventing unintended closes and focus jumps. (#632)
