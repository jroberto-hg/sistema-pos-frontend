import { createHash } from 'crypto';
import { HashGateway } from '../../application/gateways/HashGateway';

export class NodeCryptoHash implements HashGateway {
    generateHash(content: string): string {
        return createHash('sha256').update(content, 'utf-8').digest('hex');
    }
}