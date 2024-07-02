---
'svelte-ux': patch
---

adds a function `clsMerge` for merging groups of classes without needing to do more complex property-by-property merging (e.g. `{ root: cls(settingsClasses.root, 'grid', classes.root), field: cls(settingsClasses.field, 'flex', classes.field) }` ➞ `clsMerge(settingsClasses, { root: 'grid', field: 'flex' }, classes)`)
