import fs from 'fs';
import path from 'path';
import chokidar, { FSWatcher } from 'chokidar';

export class ChokidarVaultWatcher {
    private watcher: FSWatcher | null = null;
    private changeCallback: ((filePath: string, content: string) => void) | null = null;

    startWatching(vaultPath: string): void {
        // Convertir la ruta a absoluta para evitar diferencias entre "./src/vault" y "src\vault"
        const absoluteVaultPath = path.resolve(vaultPath)
        
        this.watcher = chokidar.watch(absoluteVaultPath, {
            persistent: true,
            ignoreInitial: false,
            ignored: /(^|[\/\\])\../ // Ignora carpetas/archivos ocultos como .obsidian o .git
        });

        const handleFile = (filePath: string) => {
            // Filtrar solo archivos con extensión .md
            if (!filePath.endsWith('.md')) return;

            if(this.changeCallback) {
                try {
                    const content = fs.readFileSync(filePath, 'utf-8');

                    // Calcular la ruta relativa limpia y estandarizada
                    const relative = path.relative(absoluteVaultPath, filePath).replace(/\\/g, '/');
                    const cleanPath = relative.startsWith('/') ? relative : `/${relative}`;

                    this.changeCallback(cleanPath, content)
                } catch (err) {
                    console.error(`[Watcher Error] No se pudo leer el archivo en ${path}:`, err);
                }
            }
        }

        this.watcher.on('add', handleFile);
        this.watcher.on('change', handleFile);

        console.log(`[Watcher] Observando el vault en: ${vaultPath}`);
    }

    onFileChanged(callback: (filePath: string, content: string) => void): void {
        this.changeCallback = callback;
    }
}