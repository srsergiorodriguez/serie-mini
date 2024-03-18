const config = {
  lang: "es",
  base: "https://srsergiorodriguez.github.io",
  baseurl: "/serie",
  title: "Serie",
  subtitle: "Colecciones culturales mínimas",
  credits: "Sergio Rodríguez Gómez",
  copyright: "Todos los derechos reservados, 2024",
  pages: {
    iiifViewer: true,
    metadataToShow: [
      { key: "label", label: "Título", type: "text"},
      { key: "autor", label: "Autor", type: "text"},
      { key: "fecha", label: "Fecha", type: "text"}
    ],
    metadataToIndex: []
  }
}

export default config;