import type React from "react";
import { useState } from "react";
import { UserView } from "../modules/users/views/UserView";

interface DashbodarLayoutProps {
    onLogout: () => void;
}

export const DashBoardLayout: React.FC<DashbodarLayoutProps> = ({ onLogout }) => {
    // Estado para controlar qué sección/vista está activa en el contenido principal
    const [activeView, setActiveView] = useState<string>('users');
    
    return(
        <div style={{ display: 'flex', height: '100vh', background: 'var(--paper)', color: 'var(--ink)' }}>

            {/* 1. Sidebar / Menu lateral izquierdo */}
            <aside style={{ 
                width: '280px', 
                background: 'var(--paper-raised)', 
                borderRight: '1px solid var(--rule)', 
                display: 'flex', 
                flexDirection: 'column',
                overflowY: 'auto'
            }}>
                {/* Logo / Encabezado del Sistema */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--rule)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: 'var(--ink)', color: 'var(--paper)', width: '32px', height: '32px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                        POS
                    </div>
                    <div>
                        <h3 style={{ fontSize: '15px', margin: 0, fontWeight: 600 }}>Terminal Corporativa</h3>
                        <span style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>Sistema ERP / POS</span>
                    </div>
                </div>

                {/* Menú por Categorías */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                    {/* Ventas */}
                    <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>Ventas</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="sidebar-link" onClick={() => setActiveView('pos')} style={menuItemStyle(activeView === 'pos')}>💻 Vender (POS)</button>
                            <button className="sidebar-link" onClick={() => setActiveView('sales_history')} style={menuItemStyle(activeView === 'sales_history')}>📦 Ventas</button>
                            <button className="sidebar-link" onClick={() => setActiveView('quotes')} style={menuItemStyle(activeView === 'quotes')}>📋 Cotización</button>
                            <button className="sidebar-link" onClick={() => setActiveView('receivable')} style={menuItemStyle(activeView === 'receivable')}>💳 Ventas x cobrar</button>
                        </div>
                    </div>

                    {/* Compras y Proveedores */}
                    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>Compras</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="sidebar-link" onClick={() => setActiveView('purchase')} style={menuItemStyle(activeView === 'purchase')}>🛒 Compra</button>
                            <button className="sidebar-link" onClick={() => setActiveView('purchases_history')} style={menuItemStyle(activeView === 'purchases_history')}>📑 Compras</button>
                            <button className="sidebar-link" onClick={() => setActiveView('payable')} style={menuItemStyle(activeView === 'payable')}>📉 Compras x pagar</button>
                            <button className="sidebar-link" onClick={() => setActiveView('suppliers_clients')} style={menuItemStyle(activeView === 'suppliers_clients')}>🤝 Proveedores / Clientes</button>
                        </div>
                    </div>

                    {/* Inventario y Almacén */}
                    <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>Inventario</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="sidebar-link" onClick={() => setActiveView('inventory')} style={menuItemStyle(activeView === 'inventory')}>🏬 Inventario / Almacén</button>
                            <button className="sidebar-link" onClick={() => setActiveView('products')} style={menuItemStyle(activeView === 'products')}>🏷️ Productos / Artículos</button>
                            <button className="sidebar-link" onClick={() => setActiveView('categories')} style={menuItemStyle(activeView === 'categories')}>🗂️ Categoría</button>
                            <button className="sidebar-link" onClick={() => setActiveView('units')} style={menuItemStyle(activeView === 'units')}>📦 Unidad</button>
                            <button className="sidebar-link" onClick={() => setActiveView('transfers')} style={menuItemStyle(activeView === 'transfers')}>🔄 Transferencia</button>
                            <button className="sidebar-link" onClick={() => setActiveView('movements')} style={menuItemStyle(activeView === 'movements')}>📊 Movimientos</button>
                        </div>
                    </div>

                    {/* Administración y Personal */}
                    <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>Administración</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="sidebar-link" onClick={() => setActiveView('users')} style={menuItemStyle(activeView === 'users')}>👥 Colaboradores / Usuarios</button>
                            <button className="sidebar-link" onClick={() => setActiveView('roles')} style={menuItemStyle(activeView === 'roles')}>🛡️ Cargos y Permisos</button>
                        </div>
                    </div>

                    {/* Reportes */}
                    <div>
                        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--ink-faint)', fontWeight: 700, marginBottom: '8px', paddingLeft: '8px' }}>Reportes</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <button className="sidebar-link" onClick={() => setActiveView('reports')} style={menuItemStyle(activeView === 'reports')}>📈 Reporte General</button>
                        </div>
                    </div>
                </div>

                {/* Footer del Sidebar con opción de Cerrar Sesión */}
                <div style={{ padding: '16px', borderTop: '1px solid var(--rule)' }}>
                    <button 
                        onClick={onLogout} 
                        style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--rule)', borderRadius: '4px', color: 'var(--err)', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* 2. Contenido Principal */}
            <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                {activeView === 'users' && <UserView />}
                {activeView !== 'users' && (
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px' }}>Vista en desarrollo</h2>
                        <p style={{ color: 'var(--ink-soft)' }}>Esta sección del módulo estará disponible próximamente.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

// Estilo auxiliar para los enlaces del menú lateral con soporte para estado activo
const menuItemStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    textAlign: 'left',
    padding: '8px 12px',
    background: isActive ? 'var(--rule)' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background 0.2s'
});