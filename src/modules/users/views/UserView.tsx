import { useEffect, useState } from "react";
import type { SystemUser, UserDto } from "../entities/user.entity";
import { userRepository } from "../user.repository";

export const UserView: React.FC = () => {
    const [users, setUsers] = useState<SystemUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Formulario para dar de alta colaboradores/cajeros/auditores
    const [formData, setFormData] = useState<UserDto>({
        username: '',
        email: '',
        app_key: '',
        name: '',
        role: 'CASHIER'
    });

    const fetchUsers = async () => {
        try {
            const data = await userRepository.getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error al cargar colaboradores:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUser = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            await userRepository.create(formData);
            setShowModal(false);
            setFormData({ username: '', email: '', app_key: '', name: '', role: 'CASHIER' });
            fetchUsers();
        } catch (error: any) {
            alert(error.response?.data?.message || 'Error al crear el usuario.');
        }
    }

    return (
        <div>
            <div className="flex-between" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 4px' }}>Gestión de Colaboradores y Usuarios</h2>
                    <p style={{ color: 'var(--ink-soft)', fontSize: '14px', margin: 0 }}>Alta de cajeros, personal de auditoría y administradores del POS.</p>
                </div>
                <button className="btn-claro" onClick={() => setShowModal(true)}>
                    + Nuevo Colaborador
                </button>
            </div>

            {loading ? (
                <p style={{ color: 'var(--ink-faint)' }}>Cargando usuarios...</p>
            ) : (
                <div className="glass-card" style={{ padding: 0, overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ background: 'var(--paper)', borderBottom: '1px solid var(--rule)' }}>
                                <th style={{ padding: '12px 16px', color: 'var(--ink-faint)', fontSize: '11px', textTransform: 'uppercase' }}>Nombre</th>
                                <th style={{ padding: '12px 16px', color: 'var(--ink-faint)', fontSize: '11px', textTransform: 'uppercase' }}>Usuario</th>
                                <th style={{ padding: '12px 16px', color: 'var(--ink-faint)', fontSize: '11px', textTransform: 'uppercase' }}>Correo</th>
                                <th style={{ padding: '12px 16px', color: 'var(--ink-faint)', fontSize: '11px', textTransform: 'uppercase' }}>Rol</th>
                                <th style={{ padding: '12px 16px', color: 'var(--ink-faint)', fontSize: '11px', textTransform: 'uppercase' }}>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} style={{ borderBottom: '1px solid var(--rule)' }}>
                                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{user.name}</td>
                                    <td style={{ padding: '12px 16px', color: 'var(--ink-soft)' }}><span className="mono">{user.username}</span></td>
                                    <td style={{ padding: '12px 16px', color: 'var(--ink-soft)' }}>{user.email}</td>
                                    <td style={{ padding: '12px 16px' }}><span className="mono" style={{ fontSize: '12px' }}>{user.role}</span></td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <span style={{ 
                                            padding: '2px 8px', 
                                            borderRadius: '3px', 
                                            fontSize: '12px', 
                                            background: user.isActive ? 'var(--ok-bg)' : 'var(--err-bg)',
                                            color: user.isActive ? 'var(--ok)' : 'var(--err)'
                                        }}>
                                            {user.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de alta */}
            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '450px', background: 'var(--paper-raised)', padding: '24px' }}>
                        <h3 style={{ margin: '0 0 16px', fontSize: '18px' }}>Registrar Nuevo Colaborador</h3>
                        <form onSubmit={handleUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Nombre Completo</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Nombre de Usuario</label>
                                <input 
                                    type="text" 
                                    value={formData.username} 
                                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                                    placeholder="cajero_01"
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Correo Electrónico</label>
                                <input 
                                    type="email" 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                                    placeholder="cajero@empresa.com"
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Llave de Aplicación (App Key)</label>
                                <input 
                                    type="password" 
                                    value={formData.app_key} 
                                    onChange={(e) => setFormData({...formData, app_key: e.target.value})} 
                                    required 
                                    style={{ width: '100%', padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                                />
                            </div>
                            <div>
                                <label style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Rol en el Sistema</label>
                                <select 
                                    value={formData.role} 
                                    onChange={(e: any) => setFormData({...formData, role: e.target.value})}
                                    style={{ width: '100%', padding: '8px 10px', background: 'var(--paper)', border: '1px solid var(--rule)', borderRadius: '3px', color: 'var(--ink)', fontFamily: 'inherit' }}
                                >
                                    <option value="CASHIER">Cajero</option>
                                    <option value="AUDIT">Auditoría</option>
                                    <option value="ADMIN">Administrador</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button type="submit" className="btn-claro" style={{ flex: 1 }}>Guardar</button>
                                <button type="button" className="btn-contorno" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '8px', background: 'transparent', border: '1px solid var(--rule)', color: 'var(--ink)', borderRadius: '3px', cursor: 'pointer' }}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}