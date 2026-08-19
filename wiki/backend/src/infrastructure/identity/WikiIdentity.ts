import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export class WikiIdentity {
    public static getOrCreateWikiId(vaultPath: string): string {
        const absoluteVault = path.resolve(vaultPath);

        //Crear la carpeta vault si no existe
        if(!fs.existsSync(absoluteVault)) {
            fs.mkdirSync(absoluteVault, { recursive: true });
        }

        const manifestPath = path.join(absoluteVault, '.ciudadan.json');

        if(fs.existsSync(manifestPath)) {
            try {
                const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                if(manifest.wikiId) return manifest.wikiId;
            } catch (err) {
                console.warn('[WikiIdentity] Error leyendo .ciudadan.json, regenerando wikiId.');
            }
        }

        const newWikiId = `wiki_${randomUUID()}`;
        const content = {
            wikiId: newWikiId,
            name: "Vault Local",
            createAt: new Date().toISOString()
        };

        fs.writeFileSync(manifestPath, JSON.stringify(content, null, 2));
        console.log(`📚 [WikiIdentity] Manifiesto de Wiki creado en vault: ${newWikiId}`);
        
        return newWikiId;
    }
}