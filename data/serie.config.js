const config = {
  "lang": "es",
  "localPort": "5173",
  "base": "https://srsergiorodriguez.github.io",
  "baseurl": "/serie-mini",
  "title": "Serie Mini",
  "subtitle": "Un sistema para mini colecciones digitales",
  "credits": "Por Sergio Rodríguez Gómez",
  "copyright": "Todos los derechos reservados, 2024",
  "logos": [
    {img: "logos/logo.png", link: "https://github.com/srsergiorodriguez/serie-mini"}
  ],
  "pages": {
    "iiifViewer": true,
    "metadataToShow": [
      {
        "key": "label",
        "label": "Nombre",
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