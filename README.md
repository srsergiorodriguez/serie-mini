# Introducción

Este es un sistema, llamado Serie Mini, para la creación de colecciones culturales digitales simples y mínimas. Está pensado como medio educativo en el contexto de las artes y humanidades digitales o como herramienta para proyectos culturales de computación mínima que requieran crear sitios estáticos, livianos y portables.

Como ejemplo, aquí puedes ver un ejemplo de una colección de fanzines hecha con Serie Mini: <a href="https://srsergiorodriguez.github.io/zine/" target="_blank">enlace</a>.

El sistema permite crear un sitio web con algunas páginas esenciales en una colección cultural digital: una portada, una página de exploración, un recorrido guiado con visualizaciones interactivas, una página con metadatos, y una página para cada ítem de la colección con un visor de imágenes y una presentación de metadatos. Los sitios generados con Serie Mini pueden publicarse en GitHub pages de forma gratuita por defecto (o en otras plataformas de alojamiento), lo que permite crear colecciones con requerimientos mínimos de recursos económicos y mantenimiento.

Serie Mini está pensada para facilitar al máximo la creación de colecciones digitales a personas que están apenas entrando en el tema o en las artes y humanidades digitales en general.

No obstante, este sistema también puede ser extendido por personas con un conocimiento más avanzado de programación y diseño web. Concretamente, el sistema está construido usando Node y el **framework** Svelte de diseño web y componentes personalizados.

Serie Mini está inspirada en otros proyectos similares, especialmente <a href="https://minicomp.github.io/wax/" target="_blank">Wax</a> y <a href="https://collectionbuilder.github.io/" target="_blank">Collection Builder</a>, que siguen principios de <a href="https://go-dh.github.io/mincomp/about/" target="_blank">computación mínima</a> en el campo de las humanidades digitales, pero tiene algunas diferencias:

- Es bilingüe. Su interfaz funciona en español e inglés.
- Está pensada para, en la medida de lo posible, ser fácil de usar para principiantes. Así, es mínima pero también simple. Por su simpleza, tiene algunas restricciones artificiales que evitan que los usuarios nuevos se abrumen, pero también es extensible.
- No utiliza Jekyll como base. Por el contrario, está basada en Node, que es compatible de fábrica con Windows, Linux y Mac, y se usa de la misma forma en todos los sistemas operativos. Esto evita problemas de instalación y compatibilidad, y así no es necesario usar contenedores de Docker u otras maromas.
- Es extensible. Se pueden añadir nuevas características integrables al sistema de base.

## Instrucciones de uso

### 0. Prerrequisitos

Para usar la plantilla es necesario cumplir los siguientes prerrequisitos:

- Tener una cuenta en <a href="https://github.com/">GitHub</a> y el programa <a href="https://desktop.github.com/" target="_blank">GitHub Desktop</a> instalado en el computador (inicia sesión en Github desktop con tu cuenta de GitHub)
- Tener una versión reciente de <a href="https://nodejs.org/en" target="_blank">Node.js</a> instalada en el computador
- Tener el editor de texto <a href="https://code.visualstudio.com/" target="_blank">Visual Studio Code</a> (es posible usar otro editor, pero estas instrucciones están basadas en ese editor)

### 1. Crear un repositorio a partir de esta plantilla

En el explorador web, entra a tu cuenta de GitHub, visita el repositorio de esta plantilla [https://github.com/srsergiorodriguez/serie-mini](https://github.com/srsergiorodriguez/serie-mini), y haz clic en "Use this template/Create a new repository". Asigna un nombre al repositorio. Escoge un nombre significativo y sencillo para la colección que vas a crear.

### 2. Cargar el repositorio en el computador

En la aplicación GitHub Desktop haz clic en "Add/Clone repository", luego busca el repositorio que acabas de crear, selecciona la ruta en donde quieres que se guarde el repositorio en tu computador y haz clic en "clone". Se copiarán todos los elementos de la plantilla en esa carpeta, que llamaremos **carpeta del proyecto**. ¡Recuerda esa ruta porque se necesitará luego!

Ahora, usando el explorador de archivos de tu sistema operativo busca la ruta escogida y arrastra la **carpeta del proyecto** a Visual Studio Code. Esto le indicará al editor de texto que todos los archivos de esa carpeta son parte de un proyecto completo. Abre la terminal de Visual Studio Code usando el menú "View(o Ver)/Terminal". Se abrirá una terminal de línea de comandos en la parte inferior de Visual Studio code. De ahora en adelante, la llamaremos *la terminal*. Aquí debemos ingresar varios comandos para completar la configuración.

### 3. Instalar dependencias de Node

En *la terminal*, copia y pega el siguiente comando: `npm install` y presiona enter. Esto instalará las dependencias del proyecto. Puede tardar unos minutos.

### 4. Preparar metadatos e imágenes

Abre la carpeta "data" contenida dentro de la **carpeta del proyecto** en el explorador de archivos, aquí debes reemplazar el archivo "metadata.csv" por uno que contenga los metadatos de tu colección y debes reemplazar las imágenes contenidas en la carpeta "raw_images" por las que corresponden a tu colección, cada imagen debe nombrarse con un pid (identificador personal único) que corresponda a una fila en tu archivo de metadatos. Puedes usar archivos jpg, png, tiff, y gif; o, en el caso de varias imágenes por ítem, puedes crear una carpeta (que debe tener el nombre del pid) con varias imágenes en los formatos válidos (estas imágenes pueden tener cualquier nombre, pero en la presentación se mostrarán por orden alfabético).

:eyes: ***OJO***: es NECESARIO que el archivo csv contenga al menos dos columnas: una llamada "*pid*" (en minúsculas) con un identificador ÚNICO para cada ítem de la colección, y una llamada "*label*" (en minúsculas) con un título para el ítem. El pid de cada ítem solo puede contener números y letras ascii (es decir, nada de signos de puntuación, espacios, acentos u otros caracteres). Todas las demás columnas son opcionales y pueden tener los datos que consideres relevantes y siguiendo tus propios protocolos (aunque no puedes iniciar el nombre de la columna con un guion bajo '_', está reservado). Revisa el archivo "metadata.csv" que viene por defecto ante las dudas.

:eyes: ***OJO2***: es NECESARIO que las imágenes o la carpeta con múltiples imágenes tengan **EXACTAMENTE** (incluyendo mayúsculas y minúsculas) el mismo nombre que el "pid" del ítem al que corresponden. Revisa las imágenes que vienen por defecto en la carpeta "raw_images" ante las dudas.

### 5. Crear archivo de configuración.

En **la terminal**, copia y pega el siguiente comando `npm run config` y presiona enter. Se iniciará una **interfaz de configuración** en **la terminal** que te guiará en el proceso de creación del sitio de tu colección. La información que te pedirá la **interfaz de configuración** es la siguiente:

| Configuración          | Descripción                                                                                  |
|---                     |---                                                                                           |
| Nombre de usuario      | Nombre de usuario de la cuenta de GitHub en donde se subirá el sitio                         |
| Nombre del repositorio | Nombre del repositorio creado desde la plantilla                                             |
| Título de la colección | Título que aparecerá en el banner del sitio                                                  |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización |
| Mensaje copyright      | Mensaje de derechos de autor que aparecerá en el footer. Por defecto, "Todos los derechos reservados" |
| Mensaje créditos       | Mensaje que aparecerá en el footer con los créditos. Por ejemplo, tu nombre o nombre de organización|
| Metadatos para mostrar | Lista de las columnas de metadatos que se mostrarán en la página de cada ítem de la colección                |
| Metadatos para indexar | Lista de las columnas de metadatos que indexarán en el buscador. Solo estos metadatos se podrán buscar en la interfaz de explorar. Si no escoges niguno se indexarán TODOS |

:eyes: ***OJO***: Asegúrate de haber preparado la tabla de metadatos antes de hacer la configuración. Algunas de las preguntas de la **interfaz de configuración** usan esa tabla. Luego puedes añadir nuevos ítems (filas) a la tabla sin problemas, pero deberás correr de nuevo la **interfaz de configuració** si quieres que se presenten esos nuevas columnas en las páginas de ítems o que sean indexados en el buscador.

:point_up: ***NOTA***: si ya tienes familiaridad con este tipo de sistemas de configuración, puedes editar el archivo "serie.config.js" directamente en la carpeta "data" sin necesidad de usar la **interfaz de configuración**.

### 6. Construir el sitio en modo desarrollador

Antes de crear la versión final del sitio, puedes construirlo en modo desarrollador, esto te permitirá ver y editar una versión de previsualización localmente, sin necesidad de subirla a internet. Para hacerlo, copia y pega el siguiente código en la terminal `npm run dev` y presiona enter.

Este código realizará algunas tareas de construcción del sitio, de acuerdo con tu configuración, metadatos e imágenes. Dependiendo de la cantidad de imágenes que tengas en tu colecicón, estas tareas pueden tomar unos minutos. Luego se creará el sitio y se servirá localmente. Busca en la terminal un aviso que dice `Local:` seguido de una dirección en color azul. Copia esa dirección en tu explorador web, allí podrás previsualizar cómo se verá tu sitio.

:point_up: ***NOTA***: si solo necesitas la previsualización pero no requieres ejecutar las tareas nuevamente, por ejemplo, si no modificaste las imágenes, la configuración o los metadatos, pero necesitas previsualizar y editar el contenido de las páginas o su diseño en Svelte, puedes simplemente ejecutar el siguiente código: `npm run preview`. Igualmente, si solo necesitas ejecutar las tareas, para posteriormente crear el build final del sitio, sin pasar por previsualización, puedes ejecutar el código: `npm run tasks`.

### 7. Editar el contenido del sitio

En la carpeta "data/content" dentro de la **carpeta del proyecto** encuentras una serie de archivos en formato svx que definen el contenido de las páginas estáticas de la colección. Estas páginas se pueden editar usando las convenciones de <a href="https://es.wikipedia.org/wiki/Markdown" target="_blank">Markdown</a>. Los cambios hechos en estos archivos se insertarán y actualizarán automáticamente, así que, en modo desarrollador, podrás ver la apariencia final de las páginas y editarlas a tu gusto.

Como esta es una plantilla simple y pensada como herramienta pedagógica, el sitio contiene una serie de páginas de base en Markdown en esta carpeta que cumplen varias funciones específicas. Como se describe a continuación:

| Página    | Descripción                                                                                                  |
|---        |---                                                                                                           |
| portada   | Es la primera página que aparece cuando se carga el sitio. Aquí puedes hacer una introducción a la colección |
| explorar  | Esta página contiene un buscador y una galería básicos para ver un sobrevuelo de la colección                |
| tour      | En esta página puedes hacer un ensayo o recorrido por temas o elementos particulares de la colección con algunas visualizaciones interactivas         |
| creditos  | En esta página puedes poner tus créditos detallados. Se accede a través del footer                           |
| metadatos | En esta página se muestra una tabla con los metadatos de la colección y un botón para descargarlos. Puedes usarla, como se muestra en el ejemplo, para poner otra información relacionada con la recolección y modelado de los datos. Por ejemplo, sus protocolos |

#### Componentes adicionales

Adicional al formato tradicional de Markdown, puedes incrustar en las páginas diversos componentes interactivos y visualizaciones que extienden la narrativa y navegación de la colección. Para agregar un componente es necesario importarlo dentro de una etiqueta de `script` entre el front matter y el contenido del archivo svx. Para importar un componente debes usar este formato:

```JavaScript
<script>
  import NOMBREDECOMPONENTE from "$components/NOMBREDECOMPONENTE.svelte"
</script>
```

Ante las dudas, revisa el archivo "tour" en "data/content".

Luego de la importación puedes poner los componentes en la parte del contenido que consideres necesario usando la etiqueta con el nombre del componente y sus props o argumentos, si aplica. Los props son los argumentos que requiere un componente para funcionar adecuadamente. La siguiente tabla describe los componentes implementados hasta el momento (los props con asterisco son opcionales).

| Componente  | Props | Descripción |
|---          |---    |--- |
| ItemPreview | pid=pid de ítem, *title=texto descriptivo *alt=texto alternativo *page=por defecto, 1. Página del ítem a mostrar | Previsualizador de ítem de la colección. Si se cliquea lleva a la página del ítem |
| SearchBar   |       | Barra de búsqueda simple de ítems de la colección |
| Gallery     | *metadata=array con metadatos prefiltrados, *filters=array con nombres de columna para los filtros | Galería de ítems de la colección con filtros |
| VizBarChart | key=nombre de columna categórica | Gráfico de barras horizontales que muestra un conteo de categorías |
| VizHistogram | key=columna con valores numéricos | Histograma que muestra la frecuencia de valores numéricos |
| VizTree | keys=array con nombres de columnas categóricas, *metadata=array con metadatos prefiltrados | Árbol filtrable que muestra la estructura jerárquica de la colección |
| VizTimeline | dateKey=nombres de columna con fechas válidas, *metadata=array con metadatos prefiltrados | Línea de tiempo que permite explorar los ítems de acuerdo con fechas |

:point_up: ***NOTA***: usuarios más avanzados pueden crear sus propias páginas y componentes adicionales usando Svelte.

### 8. Publicar el sitio

Una vez tengas una versión terminada del sitio lista para publicar, asegúrate de salir del modo "dev" (presionando Ctrl/command + c), copia y pega este código en la terminal: `npm run build` y presiona enter. Esto creará una versión publicable del sitio en la carpeta "docs" dentro de la **carpeta del proyecto**. Ahora visita tu repositorio en el sitio web de GitHub (no olvides loggearte), haz clic en el botón "Settings" y, luego, en la columna izquierda, haz clic en "Pages". Allí, selecciona, justo debajo de la opción "Branch", lo siguiente: en el selector que dice "None", selecciona "main". Y en el nuevo selector que aparecerá, selecciona "/docs". Esto le indica a Github que tu página para publicar está en la carpeta "docs".

Luego de hacer esto, GitHub creará un sitio web con la colección. Puede tomar unos minutos en terminar. Una vez esté completo, podrás visitar el sitio en un enlace con este formato: `https://TU_NOMBRE_DE_USUARIO.github.io/TU_REPOSITORIO/`.

:point_up: ***NOTA***: Asegúrate de haber ejecutado `npm run dev` o `npm run tasks` antes de crear la versión terminada del sitio si modificaste la configuración, los metadatos o las imágenes de la colección.

## Opciones para usuarios intermedios

- En el archivo serie.config.js en la carpeta data puedes modificar el texto que aparecerá como nombre de cada columna de metadatos modificando el objeto "metadataToShow" y el parámetro "label" en cada elemento.
- En el archivo serie.config.js en la carpeta data puedes agregar un parámetro para añadir logos en el footer y uno para añadir una imagen de fondo al encabezado. Para añadir logos, debes incluir el parámetro "logos", y este debe contener una array de objetos. Cada objeto representa un logo y debe tener los siguientes parámetros `{img: RUTA_LOCAL_O_URL_A_IMAGEN, link: ENLACE}`. Para añadir una imagen de fondo al encabezado, debes incluir el parámetro "banner" y darle como valor una ruta local (en la carpeta static o una url a una imagen).
- En el archivo serie.config.js en la carpeta data puedes modificar el tipo de presentación de cada metadato modificando el objeto "metadataToShow" y el parámetro "type" en cada elemento. Esta es una opción muy poderosa, porque permite enriquecer la diversidad de metadatos de la colección. El tipo por defecto es "text", que simplemente muestra el valor como texto plano. Los tipos de presentación posibles son:

| Tipo       | Descripción                                                                          |
|---         |---                                                                                   |
| text       | Se mostrará el texto del dato tal cual como está en la tabla                         |
| link       | El dato debe ser una url válida. Se mostrará un enlace cliqueable a tal url          |
| ref        | Una lista, separada por `/` y sin espacios de pids de otros elementos dentro de la colección. Se mostrará una serie de enlaces que llevan a la página de cada pieza referenciada por pid |
| image      | El dato debe ser una ruta válida desde la carpeta static a un archivo de imagen o una url externa. Se mostrará la imagen |
| video     | El dato debe ser una ruta válida desde la carpeta static o una url externa a un archivo de video en un formato válido. El video debe ponerse en esa ruta. Por ejemplo: `video/mi-pelicula.mp4`. Se mostrará un reproductor de video incrustado |
| audio  | El dato debe ser una ruta válida desde la carpeta static o una url externa a un archivo de audio en un formato válido. El audio debe ponerse en esa ruta. Por ejemplo: `audio/mi-grabacion.wav`. Se mostrará un reproductor de audio incrustado |
| youtube | El dato debe ser el id de un video de YouTube. Por ejemplo, en el video `https://www.youtube.com/watch?v=VTvluHmL4fY&ab_channel=Automata`, el id es la secuencia de letras y números después de `v=` y, si es el caso, antes del caracter `&`. Así, en el ejemplo, el id es `VTvluHmL4fY`. Se mostrará un reproductor de video de YouTube incrustado. |

## Funciones de línea de comandos

Las siguientes son las funciones de la línea de comandos disponibles en Serie Mini

| Comando             | Acción |
|---                  |---     |
| npm run config      | Inicia la interfaz CLI de configuración del proyecto. Usar este comando cuando se crea el proyecto por primera vez |
| npm run clear       | Elimina la carpeta con derivatives IIIF |
| npm run tasks       | Elimina la carpeta con derivatives IIIF, actualiza los metadatos, el índice de búsqueda, la presentación basada en la configuración y crea nuevos derivatives desde cero |
| npm run dev         | Elimina la carpeta con derivatives IIIF, actualiza los metadatos, el índice de búsqueda, la presentación basada en la configuración, crea nuevos derivatives desde cero e inicia el servidor local de prueba. Usar este comando cuando se crea la colección por primera vez |
| npm run preview     | Inicia el servidor local de prueba sin modificar los metadatos o derivatives de la colección y sin actualizar la presentación basada en la configuración. Usar este comando cuando solo se quiere modificar el contenido o la apariencia del sitio |
| npm run update      | Actualiza los metadatos, y crea derivatives solo para nuevos ítems. Este commando evita tiempo de procesamiento cuando solo se quiere extender la colección con más elementos o actualizar la presentación basada en el archivo de configuración |
| npm run build       | Crea una versión de producción. Usar este comando cuando se quiere publicar una nueva versión del sitio |

## Ruta de trabajo y sostenibilidad del proyecto

Versión actual: 2.0.0

### Características básicas

A continuación hay una lista de las característcas desarrolladas para la versión 1.0.0 Es decir, la versión básica del sistema:

- [x] Readme con documentación en español
- [x] Archivo de configuración global
- [x] CLI de instalación bilingüe español e inglés
- [x] Interfaz de sitio web en español e inglés
- [x] Buscador de la colección (usa indexado basado en la librería Lunr)
- [x] Procesamiento de imágenes para IIIF 3. Múltiples imágenes por ítem (usa la librería Sharp para la producción de derivatives IIIF y thumbnails)
- [x] Generación de manifests IIIF para cada imagen (usa la librería digital-piranesi/iiif-manifest-library) (1.0)
- [x] Visor de imágenes IIIF 3 (usa la librería OpenSeaDragon)
- [x] Componente de previsualización de ítem hipervinculado a página de ítem
- [x] Soporte Markdown para edición simplificada de páginas (usa la librería mdsvex)
- [x] Interfaz de galería con filtros de exploración
- [x] Distintos modos de presentación de los metadatos (texto, link, referencia, video, audio, imagen...)
- [x] Espacio para banner en el header y logos en el footer

### Características adicionales

Serie Mini funciona modularmente, así que se pueden añadir nuevas características y capacidades al sistema básico de colecciones que pueden potenciar las formas de presentación y análisis de los ítems. Debido a que Serie Mini es un proyecto de código abierto e independiente, se requieren recursos, tiempo y experticia para poder llevar a cabo e incluir esas al sistema. Por ese motivo, estoy abierto a donaciones y patrocinios que permitan continuar con el desarrollo de ellas. Instituciones o individuos interesados pueden aportar al proyecto y pueden sugerir nuevas características.

Aunque no existe una cantidad específica para el patrocinio, para que el proyecto y desarrollo de características sea sostenible, es ideal que una institución, grupo o individuo patrocinante financie el desarrollo de una característica por completo (o varias de ellas), es decir, las horas de trabajo aproximadas que implicaría obtener un resultado de producción de la característica. Esto en ninguna medida quiere decir que los patrocinantes sean de ninguna manera dueños de la característica o que los tiempos y compromisos del desarrollo estén definidos u obligados por el patroncinio. A continuación presento una lista de posibles características que encajan en la ruta de desarrollo del proyecto (algunas de ellas ya desarrolladas):

- [ ] Exportación de folleto de la colección en pdf
- [ ] Visor de textos anotados en TEI
- [ ] Visualización de la colección con grafos
- [ ] Extracción de paletas de color de las imágenes de la colección
- [ ] Visualización de gráfico de dispersión de imágenes al estilo ImagePlot
- [ ] Mapa de burbujas y grafo en mapa
- [ ] Paneles interactivos usando Aventura
- [x] Línea de tiempo, histograma, gráfico de barras, gráfico de árbol
- [ ] Temas instalables

A cambio de la donación al proyecto, la institución, grupo o individuos patrocinantes serán reconocidos públicamente (usando su nombre y logo y especificando el tipo de patrocinio) en este documento y en el *footer* del sitio de muestra de la colección.

Adicionalmente, individuos interesados pueden donar usando los enlaces de [Ko-fi](ko-fi.com/srsergior) y [Buy me a Coffee](buymeacoffee.com/srsergior).

### Charlas y talleres

Otra alternativa para apoyar la sostenibilidad del proyecto es la contratación de charlas relacionadas con humanidades digitales y la construcción de colección o talleres acerca del uso de Serie Mini. El costo de las charlas y talleres se calcula en horas y se acuerda con la institución que lo requiera.

## Créditos

Este sistema es desarrollado por Sergio Rodríguez Gómez. Sigue los principios del código abierto y se ampara en una licencia MIT.
