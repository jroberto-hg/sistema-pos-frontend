import Database = require("better-sqlite3");
import { DocumentGateway } from '../../application/gateways/DocumentGateway';
import { Document as WikiDocument } from '../../domain/entities/Document';

export class SqliteDocumentGateway implements DocumentGateway {
    constructor(private readonly db: Database.Database) { }

    async findByPath(wikiId: string, path: string): Promise<WikiDocument | null>  {
        const stmt = this.db.prepare('SELECT * FROM documents WHERE wiki_id = ? AND path = ? LIMIT 100');
        const row = stmt.get(wikiId, path) as any;

        if (!row) return null;

        return new WikiDocument(
            row.document_id, row.wiki_id, row.path, row.title,
            row.content_hash, row.origin_node, row.authority_node, new Date(row.created_at)
        );
    }

    async save(doc: WikiDocument): Promise<void> {
        const stmt = this.db.prepare(`
            INSERT INTO documents (document_id, wiki_id, path, title, content_hash, origin_node, authority_node)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(doc.id, doc.wikiId, doc.path, doc.title, doc.contentHash, doc.originNode, doc.authorityNode);
    }

    async updateHash(documentId: string, newHash: string): Promise<void> {
        const stmt = this.db.prepare('UPDATE documents SET content_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE document_id = ?');
        stmt.run(newHash, documentId);
    }
}