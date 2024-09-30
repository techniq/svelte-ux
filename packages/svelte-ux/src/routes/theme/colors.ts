import { colorVariableValue, type SupportedColorSpace } from '@layerstack/tailwind';
import { formatHex } from 'culori';

export function formatColor(value: string, colorSpace: SupportedColorSpace | 'hex') {
  if (value) {
    if (colorSpace === 'hex') {
      // Only format if not already formatted.  Fixes `#123` becoming `#112233`
      return value.startsWith('#') ? value : formatHex(value);
    } else {
      const colorValue = colorVariableValue(value, colorSpace);
      if (colorValue) {
        return `${colorSpace}(${colorValue})`;
      } else {
        // Return original if unable to convert (i.e invalid such as `rgb( 20 30)`)
        return value;
      }
    }
  } else {
    return value;
  }
}
