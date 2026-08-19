# Especificación de Endpoints API

Estructura de rutas para el servidor central de sincronización **Ciudadan**.

## Rutas Principales
- `GET /api/v1/health` - Estado del nodo local
- `POST /api/v1/sync` - Intercambio de hashes de documentos
- `GET /api/v1/documents` - Consulta indexada con paginación