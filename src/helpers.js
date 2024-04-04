export let uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);
export let firstUppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export let sortAlpha = (arr, key) => arr.toSorted((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0 );
export const arrayRange = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);