import { Document as WikiDocument } from '../../domain/entities/Document';

export interface DocumentGateway {
    //Retorna el Documento si lo encuentra, o null si no existe
    findByPath(wikiId: string, path: string): Promise<WikiDocument | null>;

    //Solo ejecuta la inserción, no retorna datos
    save(document: WikiDocument): Promise<void>;

    //Solo actualiza el hash, no retorna datos
    updateHash(documentId: string, newHash: string): Promise<void>;
}