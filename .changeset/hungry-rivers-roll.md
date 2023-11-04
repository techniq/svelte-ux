---
'svelte-ux': minor
---

Replace <fieldset> elements with <div> elements to delegate control over the tag hierarchy to package users and allow for many-to-one relationships between fieldsets and TextField/SelectField elements.

BREAKING CHANGE: The Field component's `fieldset` slot was renamed to `root` since it no longer has a <fieldset> element.
