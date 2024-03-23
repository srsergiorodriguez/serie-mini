# Introducción

Esta es una plantilla, llamada Serie Mini, para la creación de colecciones culturales digitales simples y mínimas. Está pensada como medio educativo en el contexto de las humanidades digitales o como herramienta para proyectos de computación mínima que requieran crear sitios estáticos, livianos y portables.

La plantilla permite crear un sitio web con algunas páginas esenciales en una colección cultural digital: una portada, una página de exploración, un recorrido guiado, una página con metadatos, y una página para cada ítem de la colección con un visor de imágenes y una presentación de metadatos. Los sitios generados con Serie Mini pueden publicarse en GitHub pages de forma gratuita por defecto, lo que permite crear colecciones con requerimientos mínimos de recursos económicos y mantenimiento.

Serie Mini está pensada para facilitar al máximo la creación de colecciones digitales a personas que están apenas entrando en el tema o en las humanidades digitales en general.

No obstante, esta plantilla también puede ser extendida por personas con un conocimiento más avanzado de programación y diseño web. Concretamente, la plantilla está construida usando Node y el **framework** Svelte de diseño web y componentes personalizados.

Serie Mini está inspirada fuertemente en otros proyectos similares, especialmente <a href="https://minicomp.github.io/wax/" target="_blank">Wax</a> y <a href="https://collectionbuilder.github.io/" target="_blank">Collection Builder</a>, que siguen principios de <a href="https://go-dh.github.io/mincomp/about/" target="_blank">computación mínima</a> en el campo de las humanidades digitales, pero tiene algunas diferencias:

- Su interfaz y documentación está en español
- Está pensada para, en la medida de lo posible, ser fácil de usar para principiantes. Así, es mínima pero también simple. Por su simpleza, tiene algunas restricciones artificiales que evitan que los usuarios nuevos se abrumen, pero también es extensible.
- No utiliza Jekyll como base. Por el contrario, está basada en Node, que es compatible de fábrica con Windows, Linux y Mac, y se usa de la misma forma en todos los sistemas operativos. Esto evita problemas de instalación y compatibilidad, y así no es necesario usar contenedores de Docker u otras maromas.

## Instrucciones de uso

### 0. Prerrequisitos

Para usar la plantilla es necesario cumplir los siguientes prerrequisitos:

- Tener una cuenta en <a href="https://github.com/">GitHub</a> y el programa <a href="https://desktop.github.com/" target="_blank">GitHub Desktop</a> instalado en el computador (inicia sesión en Github desktop con tu cuenta de GitHub)
- Tener una versión reciente de <a href="https://nodejs.org/en" target="_blank">Node.js</a> instalada en el computador
- Tener el editor de texto <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> (es posible usar otro editor, pero las instrucciones están basadas en este)

### 1. Crear un repositorio a partir de esta plantilla

En el explorador web, entra a tu cuenta de GitHub, visita el repositorio de esta plantilla [https://github.com/srsergiorodriguez/serie-mini](https://github.com/srsergiorodriguez/serie-mini), y haz clic en "Use this template/Create a new repository". Asigna un nombre al repositorio. Escoge un nombre significativo y sencillo para la colección que vas a crear.

### 2. Cargar el repositorio en el computador

En la aplicación GitHub Desktop haz clic en "Add/Clone repository", luego busca el repositorio que acabas de crear, selecciona la ruta en donde quieres que se guarde el repositorio en tu computador y haz clic en "clone". Se copiarán todos los elementos de la plantilla en esa carpeta, que llamaremos **carpeta del proyecto**. ¡Recuerda esa ruta porque se necesitará luego!

Ahora, usando el explorador de archivos de tu sistema operativo busca la ruta escogida y arrastra la **carpeta del proyecto** a Visual Studio Code. Esto le indicará al editor de texto que todos los archivos de esa carpeta son parte de un proyecto completo. Abre la terminal de Visual Studio Code usando el menú "View(o Ver)/Terminal". Se abrirá una terminal de línea de comandos en la parte inferior de Visual Studio code. De ahora en adelante, la llamaremos *la terminal*. Aquí debemos ingresar varios comandos para completar la configuración.

### 3. Instalar dependencias de Node

En *la terminal*, copia y pega el siguiente comando: `npm install` y presiona enter. Esto instalará las dependencias del proyecto. Puede tardar unos minutos.

### 4. Preparar metadatos e imágenes

Abre la carpeta "data" contenida dentro de la **carpeta del proyecto** en el explorador de archivos, aquí debes reemplazar el archivo "metadata.csv" por uno que contenga los metadatos de tu colección y debes reemplazar las imágenes contenidas en la carpeta "raw_images" por las que corresponden a tu colección. Puedes usar archivos jpg, png, tiff, y gif. Por el momento Serie Mini solo puede usar una imagen por ítem; la posibilidad de usar múltiples imágenes está en desarrollo.

:eyes: ***OJO***: es NECESARIO que el archivo csv contenga al menos dos columnas: una llamada "*pid*" (en minúsculas) con un identificador ÚNICO para cada ítem de la colección, y una llamada "*label*" con un título para el ítem. Todas las demás columnas son opcionales y pueden tener los datos que consideres relevantes y siguiendo tus propios protocolos. Revisa el archivo "metadata.csv" que viene por defecto ante las dudas.

:eyes: ***OJO2***: es NECESARIO que las imágenes tengan exactamente (incluyendo mayúsculas y minúsculas) el mismo nombre que el "pid" del ítem al que corresponden. Revisa las imágenes que vienen por defecto en la carpeta "raw_images" ante las dudas.

### 5. Crear archivo de configuración.

En **la terminal**, copia y pega el siguiente comando `npm run config` y presiona enter. Se iniciará una **interfaz de configuración** en **la terminal** que te guiará en el proceso de creación del sitio de tu colección. La información que te pedirá **interfaz de configuración** es la siguiente:

| Configuración          | Descripción                                                                                  |
|---                     |---                                                                                           |
| Nombre de usuario      | Nombre de usuario de la cuenta de GitHub en donde se subirá el sitio                         |
| Nombre del repositorio | Nombre del repositorio creado desde la plantilla                                             |
| Título de la colección | Título que aparecerá en el banner del sitio                                                  |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización |
| Mensaje copyright      | Mensaje de derechos de autor que aparecerá en el footer. Por defecto, "Todos los derechos reservados" |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización|
| Metadatos para mostrar | Lista de las columnas metadatos que se mostrarán en la página de cada ítem de la colección                |
| Metadatos para indexar | Lista de las columnas metadatos que indexarán en el buscador. Solo estos metadatos se podrán buscar en la interfaz de explorar. Si no escoges niguno se indexarán TODOS |

:eyes: ***OJO***: Asegúrate de haber preparado la tabla de metadatos antes de hacer la configuración. Algunas de las preguntas de la **interfaz de configuración** usan esa tabla. Luego puedes añadir nuevos ítems (filas) a la tabla sin problemas, pero deberás correr de nuevo la **interfaz de configuració** si quieres que se presenten esos nuevas columnas en las páginas de ítems o que sean indexados en el buscador.

:point_up: ***NOTA***: si ya tienes familiaridad con este tipo de sistemas de configuración, puedes editar el archivo "serie.config.js" directamente en la carpeta "data".

### 6. Construir el sitio en modo desarrollador

Antes de crear la versión final del sitio, puedes construirlo en modo desarrollador, esto te permitirá ver y editar una versión de previsualización localmente, sin necesidad de subirla a internet. Para hacerlo, copia y pega el siguiente código en la terminal `npm run dev` y presiona enter.

Este código realizará algunas tareas de construcción del sitio, de acuerdo con tu configuración, metadatos e imágenes. Estas tareas pueden tomar unos minutos. Luego se creará el sitio y se servirá localmente. Busca en la terminal un aviso que dice `Local:` seguido de una dirección en color azul. Copia esa dirección en tu explorador web, allí podrás previsualizar cómo se verá tu sitio. 

:point_up: ***NOTA***: si solo necesitas la previsualización pero no requieres ejecutar las tareas nuevamente, por ejemplo, si no modificaste las imágenes, la configuración o los metadatos, pero necesitas previsualizar y editar el contenido de las páginas o su diseño en Svelte, puedes simplemente ejecutar el siguiente código: `npm run preview`. Igualmente, si solo necesitas ejecutar las tareas, para posteriormente crear el build final del sitio, sin pasar por previsualización, puedes ejecutar el código: `npm run tasks`.

### 7. Editar el contenido del sitio

En la carpeta "data/content" dentro de la **carpeta del proyecto** encuentras una serie de archivos en formato Markdown que definen el contenido de las páginas estáticas de la colección. Estas páginas se pueden editar usando las convenciones de <a href="https://es.wikipedia.org/wiki/Markdown" target="_blank">Markdown</a>. Los cambios hechos en estos archivos se insertarán y actualizarán automáticamente, así que, en modo desarrollador, podrás ver la apariencia final de las páginas y editarlas a tu gusto.

Como esta es una plantilla simple y pensada como herramienta pedagógica, el sitio contiene una serie de páginas de bas en Markdown en esta carpeta que cumplen varias funciones específicas. Como se describe a continuación:

| Página    | Descripción                                                                                                  |
|---        |---                                                                                                           |
| portada   | Es la primera página que aparece cuando se carga el sitio. Aquí puedes hacer una introducción a la colección |
| explorar  | Esta página contiene un buscador y una galería básicos para ver un sobrevuelo de la colección                |
| tour      | En esta página puedes hacer un ensayo o recorrido por temas o elementos particulares de la colección         |
| creditos  | En esta página puedes poner tus créditos detallados. Se accede a través del footer                           |
| metadatos | En esta página se muestra una tabla con los metadatos de la colección y un botón para descargarlos. Puedes usarla, como se muestra en el ejemplo, para poner otra información relacionada con la recolección y modelado de los datos. Por ejemplo, sus protocolos |

:point_up: ***NOTA***: en la parte superior de la página Explorar hay una variable llamada "galleryFilters", los nombres de columnas de los metadatos que se incluyan aquí determinarán los filtros posibles que se pueden usar en la galería, por ejemplo, para permitir filtar por pid y label, debes poner: `galleryFilters: ["pid", "label"]`.

#### Componentes adicionales

Adicional al formato tradicional de Markdown, puedes incrustar en las páginas Tour y Portada un componente que muestra una imagen perteneciente a un ítem de la colección usando la siguiente convención: `![TEXTO ALTERNATIVO](!pid DEL ÍTEM)`. Es decir, es igual a la convención de una imágen en Markdown, pero, en vez de un enlace a la imagen entre paréntesis, tiene el pid del ítem precedido por un signo de admiración "!". Este componente muestra la imagen, su label y lleva a la página del ítem al hacer clic en él. Así, puede usarse, por ejemplo, en la página de Tour para hacer referencia a imágenes de la colección.

:point_up: ***NOTA***: usuarios más avanzados pueden crear sus propias páginas y componentes usando Svelte, y pueden adaptar el sistema de transformación de Markdown a Svelte (usa la librería <a href="https://github.com/pablo-abc/svelte-markdown" target="_blank">svelte-markdown</a>)

### 8. Publicar el sitio

Una vez tengas una versión terminada del sitio lista para publicar, copia y pega este código en la terminal: `npm run build:production` y presiona enter. Esto creará una versión publicable del sitio en la carpeta "docs" dentro de la **carpeta del proyecto**. Ahora visita tu repositorio en el sitio web de GitHub (no olvides loggearte), haz clic en el botón "Settings" y, luego, en la columna izquierda, haz clic en "Pages". Allí, selecciona, justo debajo de la opción "Branch", lo siguiente: en el selector que dice "None", selecciona "main". Y en el nuevo selector que aparecerá, selecciona "/docs". Esto le indica a Github que tu página para publicar está en la carpeta "docs".

Luego de hacer esto, GitHub creará un sitio web con la colección. Puede tomar unos minutos en terminar. Una vez esté completo, podrás visitar el sitio en un enlace con este formato: `https://TU_NOMBRE_DE_USUARIO.github.io/TU_REPOSITORIO/`.

:point_up: ***NOTA***: Asegúrate de haber ejecutado `npm run dev` o `npm run tasks` antes de crear la versión terminada del sitio si modificaste la configuración, los metadatos o las imágenes de la colección.

## Opciones para usuarios intermedios

- En el archivo serie.config.js en la carpeta data, puedes modificar el texto que aparecerá como nombre de cada columna de metadatos modificando el objeto "metadataToShow" y el parámetro "label".

## Ruta de trabajo. Elementos por desarrollar

Versión actual: 1.0.0

Este es un proyecto en desarrollo. A continuación hay una lista de los elementos desarrollados (y en qué versión) y los elementos por desarrollar para tener una versión relativamente completa de esta plantilla:

- [x] Archivo de configuración global (1.0)
- [x] CLI de instalación (1.0)
- [x] Buscador de la colección (usa indexado basado en la librería Lunr) (1.0)
- [x] Procesamiento de imágens (usa la librería Sharp para la producción de derivatives IIIF y thumbnails) (1.0)
- [x] Visor de imágenes IIIF 3 (usa la librería OpenSeaDragon) (1.0)
- [x] Previsualización de ítem que lleva a página de ítem. Además hay un método, medio hacky, para insertarlas usando Markdown. (1.0)
- [x] Soporte Markdown para páginas básicas (usa la librería svelte-markdown) (1.0)
- [x] Readme con documentación (1.0)
- [x] Interfaz de galería (1.0)
- [x] Generación de manifests IIIF para cada imagen (1.0)
- [ ] Crear derivatives y adaptar el visor para múltiples imágenes por ítem. En este momento solo soporta una.
- [ ] Crear distintos modos de presentación de los metadatos (texto, número, referencia interna, link, fecha)
- [ ] Tutorial en video
- [ ] Interfaz en español e inglés

### Ideas experimentales

Estas ideas se pueden desarrollar como experimentos y como alternativas para usuarios avanzados:

- [ ] Visualización de la colección con grafos
- [ ] Visualización de gráfico de dispersión de imágenes al estilo ImagePlot
- [ ] Mapa de burbujas y grafo en mapa
- [ ] Paneles interactivos usando Aventura
- [ ] Línea de tiempo
- [ ] Diseño simple, pero más bonito
- [ ] Temas instalables
- [ ] Reproductor de sonido
- [ ] Reproductor de video
- [ ] Visor TEI

## Créditos

Esta plantilla es desarrollada por Sergio Rodríguez Gómez. Sigue los principios del código abierto y se ampara en una licencia MIT.