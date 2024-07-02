---
'svelte-ux': patch
---

adds a function `normalizeClasses` to normalize classes when they can be a string or an object, essentially converting strings to objects (e.g. `'p-2'` ➞ `{ root: 'p-2' }`)
