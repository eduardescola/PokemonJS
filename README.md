# PokémonJS - Pokédex Web App

Una aplicación web que muestra una lista de Pokémon usando la API de PokéAPI. Permite buscar, filtrar por tipo, ver detalles, editar Pokémon existentes y añadir nuevos.

## Características

- **Búsqueda de Pokémon**: Puedes buscar por nombre de Pokémon.
- **Filtrar por Tipo**: Filtra los Pokémon por sus tipos (Fuego, Agua, Planta, etc.).
- **Detalles del Pokémon**: Al hacer clic en un Pokémon, se muestra una página con su información detallada (ID, altura, peso, habilidades, movimientos, etc.).
- **Paginación**: Los Pokémon se cargan de manera paginada, mostrando 20 Pokémon por página.
- **Añadir Pokémon**: Permite añadir nuevos Pokémon a la lista.
- **Editar Pokémon**: Permite editar la información de un Pokémon existente.
- **Eliminar Pokémon**: Puedes eliminar Pokémon de la lista.

## Tecnologías

- **HTML**: Estructura de la página.
- **CSS**: Estilo visual, utilizando [NES.css](https://nostalgic-css.github.io/NES.css/) para un estilo retro y [FontAwesome](https://fontawesome.com/) para los iconos.
- **JavaScript**: Lógica de la aplicación, interacción con la API de PokéAPI y manipulación del DOM.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/eduardescola/PokemonJS.git
    ```

2. Abre el archivo `index.html` en tu navegador.

No es necesario instalar nada más, ya que las dependencias se cargan desde una CDN (NES.css y FontAwesome).

## Uso

1. **Búsqueda**: Escribe el nombre de un Pokémon en la barra de búsqueda y se mostrarán sugerencias de los Pokémon que coincidan.
2. **Filtrar por Tipo**: Haz clic en los botones de los tipos de Pokémon (Fuego, Agua, Planta, etc.) para filtrar la lista.
3. **Paginación**: Navega entre las páginas de Pokémon usando los botones de "Anterior" y "Siguiente".
4. **Detalles**: Haz clic en un Pokémon para ver su información detallada, incluyendo su sprite, altura, peso, habilidades y movimientos.
5. **Añadir Pokémon**: Haz clic en el botón "Añadir Pokémon" para acceder a la página de adición de Pokémon.
6. **Editar Pokémon**: En la vista de detalles del Pokémon, puedes editar la información del Pokémon mediante el botón "Editar".
7. **Eliminar Pokémon**: Puedes eliminar un Pokémon de la lista mediante el botón "Eliminar".

## Estructura de Archivos

- `index.html`: Página principal de la Pokédex, donde se muestran los Pokémon.
- `add.html`: Página para añadir un nuevo Pokémon a la Pokédex.
- `edit.html`: Página para editar la información de un Pokémon existente.
- `pokemon-details.html`: Página con los detalles de un Pokémon.
- `style.css`: Archivo CSS con los estilos personalizados.
- `script.js`: Lógica en JavaScript que maneja la interacción con la API y la manipulación del DOM.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir a este proyecto:

1. Haz un fork de este repositorio.
2. Crea una rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Agregada nueva característica'`).
4. Envía un pull request para revisar tus cambios.
