---
'svelte-ux': minor
---

Removes SelectList. Updates SelectField features to support SelectList's use case via property/attribute overrides. Updates QuickSearch to use SelectField. Defines MenuOption type & updates MenuField & SelectField to use it; this results in renaming of SelectField options' `name` field to become `label`, standardizing the API across the two. Also adds `activeOptionIcon` to SelectField so users can opt-in to dynamically updating the field icon based on the selected option. Also fixed a bug with the `scrollIntoView` action related to its `onlyIfNeeded` flag.
