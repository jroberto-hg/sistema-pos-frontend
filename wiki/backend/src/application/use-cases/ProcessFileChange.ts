import { Document as WikiDocument } from '../../domain/entities/Document';
import { DocumentGateway } from '../gateways/DocumentGateway';
import type HashGateway = require("../gateways/HashGateway");

export type ProcessResult = 'CREATED' | 'UPDATED' | 'NO_CHANGE';

export class ProcessFileChange {
    constructor(
        private readonly documentGateway: DocumentGateway,
        private readonly hasGateway: HashGateway.HashGateway
    ) {}

    async execute(
        wikiId: string, 
        filePath: string, 
        content: string, 
        localNodeId: string
    ): Promise<ProcessResult> {
        //Calcular el hash del nuevo contenido
        const newHash = this.hasGateway.generateHash(content);

        //Buscar si el documento ya está indexado
        const existingDoc = await this.documentGateway.findByPath(wikiId, filePath);

        if(!existingDoc) {
            //Si no existe, es un archivo nuevo creado desde Obsidian
            const newDoc = WikiDocument.createLocal(wikiId, filePath, 'Sin Título', newHash, localNodeId);
            await this.documentGateway.save(newDoc);
            console.log(`[Sync Engine] ✨ Nuevo documento indexado: ${filePath}`);
            
            return 'CREATED';
        }

        //Si existe, verificamos si el contenido realmente cambió
        if(existingDoc.contentHash !== newHash) {
            //actualizamos el hash
            await this.documentGateway.updateHash(existingDoc.id, newHash);
            console.log(`[Sync Engine] 📝 Documento actualizado (Hash modificado): ${filePath}`);

            return 'UPDATED';
        } else {
            console.log(`[Sync Engine] ⏸️ Cambio detectado pero el hash es idéntico. Ignorando: ${filePath}`);

            return 'NO_CHANGE';
        }
    }
}