import type React from "react";
import { useState } from "react";
import { authRepository } from "../repositorties/auth.repository";

interface LoginViewProps {
    onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
    const [identifier, setIdentifier] = useState('');
    const [appKey, setAppKey] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        // Detectar si ingresó un correo o un nombre de usuario
        const isEmail = identifier.includes('@');
        const credentials = {
            username: isEmail ? undefined : identifier.trim(),
            email: isEmail ? identifier.trim() : undefined,
            app_key: appKey,
        };

        try {
            await authRepository.login(credentials);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Credenciales inválidas o error de conexión.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--paper)' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '400px', padding: '32px' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div className="logo-icon-wrapper" style={{ display: 'inline-flex', marginBottom: '12px' }}>
                        <span style={{ color: '#fff', fontWeight: 'bold' }}>POS</span>
                        <h1 style={{ fontSize: '22px', margin: '0 0 6px', fontWeight: 600 }}>Acceso al Sistema</h1>
                        <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: 0 }}>Terminal Corporativa</p>
                    </div>
                </div>

                {error && (
                    <div style={{ background: 'var(--err-bg)', color: 'var(--err)', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px', border: '1px solid var(--err)' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                            Usuario o Correo Electrónico
                        </label>
                        <input 
                            type="text" 
                            value={identifier} 
                            onChange={(e) => setIdentifier(e.target.value)} 
                            required
                            style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                            placeholder="ej. usuario_cajero"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                            Llave de Aplicación
                        </label>
                        <input 
                            type="password" 
                            value={appKey} 
                            onChange={(e) => setAppKey(e.target.value)} 
                            required
                            style={{ width: '100%', padding: '10px 12px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn-claro" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
                        {loading ? 'Validando...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );

}