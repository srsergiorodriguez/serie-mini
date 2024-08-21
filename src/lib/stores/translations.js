import { readable, writable, derived } from 'svelte/store';

const translations = {
  home: {es: "Portada", en: "Home"},
  explore: {es: "Explorar", en: "Explore"},
  gallery: {es: "Galería", en: "Gallery"},
  tour: {es: "Tour", en: "Tour"},
  metadata: {es: "Metadatos", en: "Metadata"},
  metadataTable: {es: "Tabla de metadatos", en: "Metadata table"},
  download: {es: "Descargar", en: "Download"},
  search: {es: "Buscar", en: "Search"},
  result: {es: "Resultado", en: "Result"},
  results: {es: "Resultados", en: "Results"},
  filters: {es: "Filtros", en: "Filters"},
  all: {es: "Todos", en: "All"},
  page: {es: "Página", en: "Page"},
}

export const lang = writable("es");
export const t = derived(lang, $lang => {
  const dictionary = {};
  for (let [key, value] of Object.entries(translations)) {
    dictionary[key] = value[$lang];
  }
  return dictionary
});
export const langs = readable(Object.keys(translations));