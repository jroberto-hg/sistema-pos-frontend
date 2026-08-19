# Guía de Sincronizacion Local-First

Pasos para el procesamiento de eventos locales mediante Chokidar y SQLite:

1. El watcher intercepta cambios de archivos `.md`.
2. Calcula el digest SHA-256 del contenido.
3. Actualiza el índice en la tabla `documents`.