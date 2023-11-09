/**
 * Export Blob to file
 */
export function saveAs(blob: Blob, fileName: string) {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style.display = 'none';

  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
