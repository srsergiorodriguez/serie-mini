---
name: tour
---

# Recorrido por la colección

Esta colección de muestra recopila varias imágenes con representaciones alegóricas de América hechas tomadas de [Rijksstudio](https://www.rijksmuseum.nl/en), la colección digital del Rijks Museum de Países Bajos. Todas las imágenes usadas están en el dominio público.

Usa este archivo para incluir contenido que permita hacer un recorrido por la colección.

Para poner una imagen correspondiente a un ítem de la colección en este recorrido, usa el formato convencional de Markdown con el que se insertan imágenes: `![TEXTO ALTERNATIVO](URL)`, pero, en vez de poner la url, pon el pid de la imagen precedido por un signo de interrogación. Por ejemplo: `![TEST](!AdriaenCollaert)`. Así se mostrará una imagen que, si se cliquea, te llevará al elemento de la colección correspondiente.

Así:

![TEST](!AdriaenCollaert)

Puedes usar urls de imágenes externas con normalidad en el formato Markdown si no sigues esta convención.

Si quieres poner una imagen concreta de un ítem con varias imágenes (por defecto se mostrará la primera), justo después del pid debes poner el símbolo `|` y el número correspondiente a la imagen empezando en el orden en que se ve en tu carpeta. Así, por ejemplo, para ver la imagen dos, debes hacer algo como esto `![TEST](!AdriaenCollaert|2)`.

También pudes agregar un texto que aparecerá al interior de la tarjeta, debajo del título, siguiendo esta convención:  `![TEXTO ALTERNATIVO](!PID "TEXTO ADICIONAL")`.