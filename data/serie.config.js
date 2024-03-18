const config = {
  "lang": "es",
  "base": "https://srsergiorodriguez.github.io",
  "baseurl": "/serie-mini",
  "title": "Serie Mini",
  "subtitle": "Una plataforma para mini colecciones digitales",
  "credits": "Por Sergio Rodríguez Gómez. Hecho con Serie Mini",
  "copyright": "Todos los derechos reservados, 2024",
  "pages": {
    "iiifViewer": true,
    "metadataToShow": [
      {
        "key": "label",
        "label": "Label",
        "type": "text"
      },
      {
        "key": "autor",
        "label": "Autor",
        "type": "text"
      },
      {
        "key": "fecha",
        "label": "Fecha",
        "type": "text"
      }
    ],
    "metadataToIndex": [
      "label",
      "autor",
      "fecha"
    ]
  }
};
export default config;