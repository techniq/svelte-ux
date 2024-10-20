---
'svelte-ux': patch
---

fix(Drawer|Dialog): No longer stop mouseup event propgation, which fixes closing Menu by clicking outside (within Dialog/Drawer)
