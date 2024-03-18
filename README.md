# Introducción

Esta es una plantilla, llamada Serie Mini, para la creación de colecciones culturales digitales simples y mínimas. Está pensada como medio educativo en el contexto de las humanidades digitales o como herramienta para proyectos de computación mínima que requieran crear sitios estáticos, livianos y portables.

La plantilla permite crear un sitio web con algunas páginas esenciales en una colección cultural digital: una portada, una página de exploración, un recorrido guiado, una página con metadatos, y una página para cada ítem de la colección con un visor de imágenes y una presentación de metadatos. Los sitios generados con Serie Mini pueden publicarse en GitHub pages de forma gratuita por defecto, lo que permite crear colecciones con requerimientos mínimos de recursos económicos y mantenimiento.

Serie Mini está pensada para facilitar al máximo la creación de colecciones digitales a personas que están apenas entrando en el tema o en las humanidades digitales en general.

No obstante, esta plantilla también puede ser extendida por personas con un conocimiento más avanzado de programación y diseño web. Concretamente, la plantilla está construida usando Node y el **framework** Svelte de diseño web y componentes personalizados.

Serie Mini está inspirada fuertemente en otros proyectos similares, especialmente Wax y Collection Builder, que siguen principios de computación mínima en el campo de las humanidades digitales, pero tiene algunas diferencias:

- Su interfaz y documentación está en español
- Está pensada para, en la medida de lo posible, ser fácil de usar para principiantes. Así, es mínima pero también simple. Por su simpleza, tiene algunas restricciones artificiales que evitan que los usuarios nuevos se abrumen.
- No utiliza Jekyll como base. Por el contrario, está basada en Node, que es compatible con Windows, Linux y Mac, y se usa de la misma forma en todos los sistemas operativos. Esto evita problemas de instalación y compatibilidad, y así no es necesario usar contenedores de Docker u otras maromas.

## Instrucciones de uso

### 0. Prerrequisitos

Para usar la plantilla es necesario cumplir los siguientes prerrequisitos:

- Tener una cuenta de GitHub y el programa GitHub Desktop instalado en el computador
- Tener una versión reciente de Node.js instalada en el computador
- Tener el editor de texto Visual Studio Code (es posible usar otro editor, pero las instrucciones está basadas en este)

### 1. Crear un repositorio a partir de esta plantilla

En el explorador web, entra a tu cuenta de GitHub, visita el repositorio de esta plantilla [https://github.com/srsergiorodriguez/serie-mini](https://github.com/srsergiorodriguez/serie-mini), y haz clic en "Use this template/Create a new repository". Asigna un nombre al repositorio. Escoge un nombre significativo para la colección que vas a crear.

### 2. Cargar el repositorio en el computador

En la aplicación GitHub Desktop haz clic en "Add/Clone repository", luego busca el repositorio que acabas de crear, selecciona la ruta en donde quieres que se guarde el repositorio y haz clic en "clone". Se copiarán todos los elementos de la plantilla en esa carpeta, que llamaremos **carpeta del proyecto**.

Ahora, usando el explorador de archivos de tu sistema operativo busca la ruta escogida y arrastra la **carpeta del proyecto** a Visual Studio Code, esto le indicará al editor de texto que todos los archivos de esa carpeta son parte de un proyecto completo. Abre la terminal de Visual Studio Code usando el menú "View(o Ver)/Terminal". Se abrirá una terminal de línea de comandos en la parte inferior de Visual Studio code. De ahora en adelante, la llamaremos *la terminal*. Aquí debemos ingresar varios comandos para completar la configuración.

### 3. Instalar dependencias de Node

En *la terminal*, copia y pega el siguiente comando: `npm install` y presiona enter. Esto instalará las dependencias del proyecto.

### 4. Preparar metadatos e imágenes

Abre la carpeta "data" contenida dentro de la **carpeta del proyecto**, aquí puedes reemplazar el archivo "metadata.csv" por uno que contenga los metadatos de tu colección y puedes reemplazar las imágenes contenidas en la carpeta "raw_images" por las que corresponden a tu colección. Puedes usar archivos jpg, png, tiff, y gif. Por el momento Serie Mini solo puede usar una imagen por ítem; la posibilidad de usar múltiples imágenes está en desarrollo.

:eyes: ***OJO***: es NECESARIO que el archivo csv contenga al menos dos columnas: una llamada "*pid*" (en minúsculas) con un identificador ÚNICO para cada ítem de la colección, y una llamada "*label*" con un título para el ítem. Todas las demás columnas son opcionales y pueden tener los datos que consideres relevantes y siguiendo tus propios protocolos. Revisa el archivo "metadata.csv" que viene por defecto ante las dudas.

:eyes: ***OJO2***: es NECESARIO que las imágenes tengan exactamente (incluyendo mayúsculas y minúsculas) el mismo nombre que el "pid" del ítem al que corresponden. Revisa las imágenes que vienen por defecto en la carpeta "raw_images" ante las dudas.

### 5. Crear archivo de configuración.

En **la terminal**, copia y pega el siguiente comando `npm run config` y presiona enter. Se iniciará una interfaz de comandos en la terminal que te guiará en el proceso de configuración de tu colección. Ten a la mano tu nombre de usuario de GitHub, el nombre de tu repositorio, el nombre de tu colección, una breve descripción.

| Configuración          | Descripción                                                                                  |
|---                     |---                                                                                           |
| Nombre de usuario      | Nombre de usuario de la cuenta de GitHub en donde se subirá el sitio                         |
| Nombre del repositorio | Nombre del repositorio creado desde la plantilla                                             |
| Título de la colección | Título que aparecerá en el banner del sitio                                                  |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización |
| Mensaje copyright      | Mensaje de derechos de autor que aparecerá en el footer. Por defecto, "Todos los derechos reservados" |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización|
| Metadatos para mostrar | Lista de metadatos que se mostrarán en la página de cada ítem de la colección                |
| Metadatos para indexar | Lista de metadatos que indexarán en el buscador. Solo estos metadatos se podrán buscar en la interfaz de explorar. Si no escoges niguno se indexarán TODOS |

:eyes: ***OJO***: Asegúrate de haber preparado la tabla de metadatos antes de hacer la configuración. Algunas de las preguntas de la interfaz de configuración usan esa tabla. Luego puedes añadir nuevos ítems a la tabla, pero ya no podrás añadir nuevas columnas o deberás correr de nuevo la configuración si quieres que se presenten esos nuevos metadatos en las páginas de ítems o que sean indexados en el buscador.

### 6. Construir el sitio en modo desarrollador

Antes de crear la versión final del sitio, puedes correrlo en modo desarrollador, esto te permitirá ver y editar una versión previa localmente, sin necesidad de subirla a internet. Para hacerlo, copia y pega el siguiente código en la terminal `npm run dev` y presiona enter.

Este código realizará algunas tareas de construcción del sitio, de acuerdo con tu configuración, metadatos e imágenes.

### 7. Editar el contenido del sitio

En la carpeta "data/content" encuentras una serie de archivos en formato markdown que definen el contenido de las páginas estáticas de la colección. Estas páginas se pueden editar usando las convenciones de markdown. Los cambios hechos en estos archivos se insertarán y actualizarán automáticamente, así que, en modo desarrollador, podrás ver la apariencia final de las páginas.

Como esta es una plantilla simple y pensada como herramienta pedagógica, el sitio contiene una serie de páginas de base que cumplen varias funciones específicas. Como se describe a continuación:

| Página    | Descripción                                                                                                  |
|---        |---                                                                                                           |
| portada   | Es la primera página que aparece cuando se carga el sitio. Aquí puedes hacer una introducción a la colección |
| explorar  | Esta página contiene un buscador y una galería básicos para ver un sobrevuelo de la colección                |
| tour      | En esta página puedes hacer un ensayo o recorrido por temas o elementos particulares de la colección         |
| metadatos | En esta página se muestra una tabla con los metadatos de la colección y un botón para descargarlos. Puedes usarla, como se muestra en el ejemplo, para poner otra información relacionada con la recolección y modelado de los datos. Por ejemplo, sus protocolos |

### 8. Publicar el sitio

Una vez tengas una versión terminada del sitio, lista para publicar, copia y pega este código en la terminal: `npm run build:production`. Esto creará una versión publicable del sitio en la carpeta docs. Ahora visita tu repositorio en el sitio web de GitHub, haz clic en el botón "Settings" y, luego, en la columna izquierda, haz clic en "Pages". Allí, selecciona, justo debajo de la opción "Branch", lo siguiente: en el selector que dice "None", selecciona "main". Y en el nuevo selector que aparecerá, selecciona "/docs".

Luego de hacer esto, GitHub creará un sitio web con la colección. Puede tomar unos minutos en terminar. Una vez esté completo, podrás visitar el sitio en un enlace con este formato: `https://TU_NOMBRE_DE_USUARIO.github.io/TU_REPOSITORIO/`.

:point_up: ***NOTA***: es posible también crear una versión local, usando el código `npm run build:local` en la terminal. Esta alternativa puede ser útil para crear versiones que funcionan sin conexión a internet, y que pueden guardarse en memorias USB o discos duros.

:eyes: ***OJO***: Estas dos opciones de publicación sobreescriben la carpeta docs. Así que debes tenerlo presente antes de subir el sitio a internet o a una memoria.

## Opciones para usuarios intermedios

...En desarrollo

## Ruta de trabajo. Elementos por desarrollar

Versión actual: 1.0.0

Este es un proyecto en desarrollo. A continuación hay una lista de los elementos desarrollados (y en qué versión) y los elementos por desarrollar para tener una versión relativamente completa de esta plantilla:

- [x] Archivo de configuración global (1.0)
- [x] CLI de instalación (1.0)
- [x] Buscador de la colección (usa indexado basado en la librería Lunr) (1.0)
- [x] Procesamiento de imágens (usa la librería Sharp para la producción de derivatives IIIF y thumbnails) (1.0)
- [x] Visor de imágenes IIIF 3 (usa la librería OpenSeaDragon) (1.0)
- [x] Previsualización de ítem que lleva a página de ítem. Además hay un método, medio hacky, para insertarlas usando Markdown. (1.0)
- [x] Soporte Markdown para páginas básicas (1.0)
- [x] Readme con documentación (1.0)
- [ ] Interfaz de galería. Está a medias, faltan filtros.
- [ ] Generación de manifests IIIF para cada imagen
- [ ] Crear derivatives y adaptar el visor para múltiples imágenes por ítem. En este momento solo soporta una.
- [ ] Crear distintos modos de presentación de los metadatos (texto, número, referencia interna, link, fecha)
- [ ] Tutorial en video

### Ideas experimentales

Estas ideas se pueden desarrollar como experimentos y como alternativas para usuarios avanzados:

- [ ] Visualización de la colección con grafos
- [ ] Visualización de gráfico de dispersión al estilo ImagePlot
- [ ] Paneles interactivos usando Aventura
- [ ] Línea de tiempo
- [ ] Diseño simple, pero más bonito
- [ ] Temas instalables
- [ ] Otras opciones IIIF, como superposiciones o lupas
- [ ] Reproductor de sonido

## Créditos

Esta plantilla es desarrollada por Sergio Rodríguez Gómez. Sigue los principios del código abierto bajo una licencia MIT.