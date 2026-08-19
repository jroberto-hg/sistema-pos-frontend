import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

export class NodeIdentity {
    private static readonly CONFIG_FILE = path.resolve('./node-identity.json');

    public static getOrCreateNodeId(): string {
        if(fs.existsSync(this.CONFIG_FILE)) {
            try {
                const data = JSON.parse(fs.readFileSync(this.CONFIG_FILE, 'utf-8'));
                if(data.node_id) return data.nodeId;
            } catch (err) {
                console.warn('[NodeIdentity] Error leyendo node-identity.json, creando uno nuevo.');
            }
        }

        const newId = `node_${randomUUID()}`;
        fs.writeFileSync(this.CONFIG_FILE, JSON.stringify({ nodeId: newId, createAt: new Date().toISOString() }, null, 2));
        console.log(`🔑 [NodeIdentity] Nueva identidad generada para el nodo: ${newId}`);

        return newId;
    }
}