import Database from 'better-sqlite3';

export class DbInitializer {
    static initialize(db: Database.Database): void {
        /* 
        - Configuraciones PRAGMA fundamentales para concurrencia y velocidad
        - Foreign Keys: Garantiza la integridad referencial.
        - journal_mode = WAL: Permite lecturas simultáneas mientras se escribe sin bloquear SQLite.
        - synchronous = NORMAL: Maximiza I/O en SSDs sin comprometer la seguridad de datos.
        */
        db.pragma('foreign_keys = ON');
        db.pragma('journal_mode = WAL');
        db.pragma('synchronous = NORMAL');

        const tableSchemas = [
            `CREATE TABLE IF NOT EXISTS nodes (
                node_id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                domain TEXT,
                public_key TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'active',
                last_see DATETIME,
                metadata TEXT
            );`,

            `CREATE TABLE IF NOT EXISTS wikis (
                wiki_id TEXT PRIMARY KEY,
                node_id TEXT NOT NULL,
                name TEXT NOT NULL,
                slug TEXT NOT NULL,
                visibility TEXT NOT NULL DEFAULT 'public',
                description TEXT,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (node_id) REFERENCES nodes(node_id)
            );`,

            `CREATE TABLE IF NOT EXISTS documents (
                document_id TEXT PRIMARY KEY,
                wiki_id TEXT NOT NULL,
                path TEXT NOT NULL,
                title TEXT NOT NULL,
                content_hash TEXT NOT NULL,
                origin_node TEXT NOT NULL,
                authority_node TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (wiki_id) REFERENCES wikis(wiki_id)
            );`,

            `CREATE TABLE IF NOT EXISTS versions (
                version_id TEXT PRIMARY KEY,
                document_id TEXT NOT NULL,
                parent_version_id TEXT,
                content_hash TEXT NOT NULL,
                origin_node TEXT NOT NULL,
                authority_node TEXT NOT NULL,
                signature TEXT,
                status TEXT NOT NULL CHECK(status IN ('official', 'pending', 'conflict', 'rejected')),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (document_id) REFERENCES documents(document_id),
                FOREIGN KEY (parent_version_id) REFERENCES versions(version_id),
                FOREIGN KEY (origin_node) REFERENCES nodes(node_id),
                FOREIGN KEY (authority_node) REFERENCES nodes(node_id)
            );`,

            `CREATE TABLE IF NOT EXISTS permissions (
                id TEXT PRIMARY KEY,
                principal_id TEXT NOT NULL,
                resource_type TEXT NOT NULL CHECK(resource_type IN ('node', 'wiki', 'folder', 'document')),
                resource_id TEXT NOT NULL,
                permission TEXT NOT NULL CHECK(permission IN ('DISCOVERY', 'READ', 'WRITE', 'CREATE', 'DELETE', 'PUBLISH', 'CURATE', 'ADMIN')),
                source TEXT,
                expires_at DATETIME,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );`,

            `CREATE TABLE IF NOT EXISTS links (
                id TEXT PRIMARY KEY,
                document_id TEXT NOT NULL,
                version_id TEXT,
                operation TEXT NOT NULL CHECK(operation IN ('create', 'update', 'delete')),
                content_hash TEXT,
                status TEXT NOT NULL CHECK(status IN ('pending', 'syncing', 'conflict', 'denied', 'failed', 'proposal')),
                retry_count INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (document_id) REFERENCES documents(document_id),
                FOREIGN KEY (version_id) REFERENCES versions(version_id)
            );`
        ];

        const indexSchemas = [

            `CREATE UNIQUE INDEX IF NOT EXISTS idx_documents_wiki_path ON documents(wiki_id, path);`,
            `CREATE INDEX IF NOT EXISTS idx_documents_hash ON documents(content_hash);`,
            `CREATE INDEX IF NOT EXISTS idx_permissions_lookup ON permissions(principal_id, resource_type, resource_id);`,
            `CREATE INDEX IF NOT EXISTS idx_links_document ON links(document_id);`,
            `CREATE INDEX IF NOT EXISTS idx_links_status ON links(status);`
        ];

        //Ejecución dentro de una transacción en lote para velocidad extrema
        const runInitialization = db.transaction(() => {
            for (const query of tableSchemas) {
                db.exec(query);
            }

            for (const query of indexSchemas) {
                db.exec(query);
            }
        });

        runInitialization();

        console.log('[Database] Tablas e índices creados correctamente.');
    }
}