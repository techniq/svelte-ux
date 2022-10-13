/**
 * Convert object to style string
 */
export function objectToString(styleObj: { [key: string]: string }) {
  return Object.entries(styleObj)
    .map(([key, value]) => {
      if (value) {
        // Convert camelCase into kaboob-case (ex.  (transformOrigin => transform-origin))
        const propertyName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${propertyName}: ${value};`;
      } else {
        return null;
      }
    })
    .filter((x) => x)
    .join(' ');
}
