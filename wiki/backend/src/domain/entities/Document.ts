import { randomUUID } from "node:crypto";

export class Document {
    constructor(
        public readonly id: string,
        public readonly wikiId: string,
        public readonly path: string,
        public readonly title: string,
        public readonly contentHash: string,
        public readonly originNode: string,
        public readonly authorityNode: string,
        public readonly createdAt: Date
    ) {}

    static createLocal(wikiId: string, path: string, title: string, contentHash: string, localNodeId: string): Document {
        return new Document(
            randomUUID(),
            wikiId,
            path,
            title,
            contentHash,
            localNodeId,
            localNodeId,
            new Date()
        );
    }
}