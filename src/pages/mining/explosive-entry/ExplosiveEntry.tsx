import React, { useState } from 'react';
import './ExplosiveEntry.css';

// Icon components
const Zap = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const Building = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

const Package = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Download = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
    </svg>
);

const Eye = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const X = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// Types
interface Supplier {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    status: 'active' | 'inactive';
}

interface ExplosiveEntry {
    id: string;
    explosiveName: string;
    supplierId: string;
    type: string;
    unit: string;
    rate: number;
    description: string;
    status: 'active' | 'inactive' | 'not-in-use';
    createdDate: string;
    modifiedDate: string;
    createdBy: string;
}

export default function ExplosiveEntry() {
    const [activeTab, setActiveTab] = useState('rate-master');
    const [showExplosiveModal, setShowExplosiveModal] = useState(false);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterSupplier, setFilterSupplier] = useState('all');
    const [editingExplosive, setEditingExplosive] = useState<ExplosiveEntry | null>(null);

    // Sample suppliers data
    const [suppliers] = useState<Supplier[]>([
        {
            id: 'supplier-1',
            name: 'Mining Explosives India Pvt Ltd',
            contactPerson: 'Rajesh Kumar',
            phone: '9876543210',
            email: 'rajesh@meipl.com',
            status: 'active'
        },
        {
            id: 'supplier-2',
            name: 'Bharat Dynamics Limited',
            contactPerson: 'Suresh Patel',
            phone: '9876543211',
            email: 'suresh@bdl.in',
            status: 'active'
        },
        {
            id: 'supplier-3',
            name: 'Explosive Materials Corp',
            contactPerson: 'Anil Sharma',
            phone: '9876543212',
            email: 'anil@emc.com',
            status: 'active'
        }
    ]);

    // Sample explosive entries data
    const [explosiveEntries, setExplosiveEntries] = useState<ExplosiveEntry[]>([
        {
            id: 'explosive-1',
            explosiveName: 'ANFO',
            supplierId: 'supplier-1',
            type: 'Bulk Explosive',
            unit: 'Kg',
            rate: 85.50,
            description: 'Ammonium Nitrate Fuel Oil mixture for blasting operations',
            status: 'active',
            createdDate: '2025-01-15',
            modifiedDate: '2025-01-15',
            createdBy: 'Admin'
        },
        {
            id: 'explosive-2',
            explosiveName: 'Emulsion Explosive',
            supplierId: 'supplier-2',
            type: 'Packaged Explosive',
            unit: 'Kg',
            rate: 125.75,
            description: 'Water-resistant emulsion explosive for wet conditions',
            status: 'active',
            createdDate: '2025-01-10',
            modifiedDate: '2025-01-12',
            createdBy: 'Admin'
        },
        {
            id: 'explosive-3',
            explosiveName: 'Pentolite',
            supplierId: 'supplier-3',
            type: 'High Explosive',
            unit: 'Kg',
            rate: 450.00,
            description: 'High-performance explosive for specialized applications',
            status: 'not-in-use',
            createdDate: '2024-12-20',
            modifiedDate: '2025-01-05',
            createdBy: 'Admin'
        },
        {
            id: 'explosive-4',
            explosiveName: 'Detonating Cord',
            supplierId: 'supplier-1',
            type: 'Initiation System',
            unit: 'Meter',
            rate: 15.25,
            description: 'Flexible tube containing explosive core for initiation',
            status: 'active',
            createdDate: '2025-01-08',
            modifiedDate: '2025-01-08',
            createdBy: 'Admin'
        }
    ]);

    const [explosiveForm, setExplosiveForm] = useState({
        explosiveName: '',
        supplierId: '',
        type: '',
        unit: '',
        rate: 0,
        description: ''
    });

    // Explosive types
    const explosiveTypes = [
        'Bulk Explosive',
        'Packaged Explosive',
        'High Explosive',
        'Initiation System',
        'Blasting Agent',
        'Safety Fuse',
        'Detonator',
        'Booster'
    ];

    // Units
    const units = [
        'Kg',
        'Ton',
        'Meter',
        'Piece',
        'Box',
        'Roll',
        'Unit'
    ];

    // Filter functions
    const filteredExplosives = explosiveEntries.filter(explosive => {
        const matchesSearch = searchTerm === '' ||
            explosive.explosiveName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            explosive.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getSupplierById(explosive.supplierId)?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || explosive.status === filterStatus;
        const matchesSupplier = filterSupplier === 'all' || explosive.supplierId === filterSupplier;

        return matchesSearch && matchesStatus && matchesSupplier;
    });

    // Helper functions
    const getSupplierById = (supplierId: string) => suppliers.find(s => s.id === supplierId);

    // Handle explosive creation/modification
    const handleSaveExplosive = () => {
        if (explosiveForm.explosiveName && explosiveForm.supplierId && explosiveForm.type && explosiveForm.unit && explosiveForm.rate > 0) {
            if (editingExplosive) {
                // Update existing explosive
                setExplosiveEntries(prev => prev.map(explosive =>
                    explosive.id === editingExplosive.id
                        ? {
                            ...explosive,
                            ...explosiveForm,
                            modifiedDate: new Date().toISOString().split('T')[0]
                        }
                        : explosive
                ));
            } else {
                // Create new explosive
                const newExplosive: ExplosiveEntry = {
                    id: `explosive-${Date.now()}`,
                    ...explosiveForm,
                    status: 'active',
                    createdDate: new Date().toISOString().split('T')[0],
                    modifiedDate: new Date().toISOString().split('T')[0],
                    createdBy: 'Admin'
                };
                setExplosiveEntries(prev => [...prev, newExplosive]);
            }

            resetForm();
            setShowExplosiveModal(false);
        }
    };

    const handleMarkAsNotInUse = (id: string) => {
        setExplosiveEntries(prev => prev.map(explosive =>
            explosive.id === id
                ? {
                    ...explosive,
                    status: 'not-in-use',
                    modifiedDate: new Date().toISOString().split('T')[0]
                }
                : explosive
        ));
    };

    const handleDeleteExplosive = (id: string) => {
        setExplosiveEntries(prev => prev.filter(explosive => explosive.id !== id));
    };

    const handleEditExplosive = (explosive: ExplosiveEntry) => {
        setEditingExplosive(explosive);
        setExplosiveForm({
            explosiveName: explosive.explosiveName,
            supplierId: explosive.supplierId,
            type: explosive.type,
            unit: explosive.unit,
            rate: explosive.rate,
            description: explosive.description
        });
        setShowExplosiveModal(true);
    };

    const resetForm = () => {
        setExplosiveForm({
            explosiveName: '',
            supplierId: '',
            type: '',
            unit: '',
            rate: 0,
            description: ''
        });
        setEditingExplosive(null);
    };

    // Calculate statistics
    const getTotalExplosives = () => explosiveEntries.length;
    const getActiveExplosives = () => explosiveEntries.filter(e => e.status === 'active').length;
    const getNotInUseExplosives = () => explosiveEntries.filter(e => e.status === 'not-in-use').length;
    const getTotalSuppliers = () => suppliers.length;

    return (
        <div className="explosive-entry">
            {/* Header */}
            <div className="explosive-entry-header">
                <div className="explosive-entry-header-content">
                    <div className="explosive-entry-title-section">
                        <Zap className="explosive-entry-header-icon" />
                        <div>
                            <h1 className="explosive-entry-title">Explosive Rate Master</h1>
                            <p className="explosive-entry-subtitle">Manage explosive materials and their rates</p>
                        </div>
                    </div>
                    <div className="explosive-entry-header-actions">
                        <button
                            className="explosive-entry-btn explosive-entry-btn-primary"
                            onClick={() => {
                                resetForm();
                                setShowExplosiveModal(true);
                            }}
                        >
                            <Plus className="explosive-entry-icon" />
                            Add Explosive
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="explosive-entry-main">
                {/* Tab Navigation */}
                <div className="explosive-entry-tabs">
                    <div className="explosive-entry-tabs-container">
                        <div className="explosive-entry-tabs-nav">
                            <div className="explosive-entry-tabs-list">
                                <button
                                    className={`explosive-entry-tab ${activeTab === 'rate-master' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('rate-master')}
                                >
                                    <Package className="explosive-entry-tab-icon" />
                                    Rate Master
                                </button>
                                <button
                                    className={`explosive-entry-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('overview')}
                                >
                                    <BarChart3 className="explosive-entry-tab-icon" />
                                    Overview
                                </button>
                                <button
                                    className={`explosive-entry-tab ${activeTab === 'suppliers' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('suppliers')}
                                >
                                    <Building className="explosive-entry-tab-icon" />
                                    Suppliers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="explosive-entry-content">
                    {activeTab === 'rate-master' && (
                        <div className="explosive-entry-tab-content">
                            <div className="explosive-entry-section-header">
                                <div>
                                    <h2 className="explosive-entry-section-title">Explosive Rate Master</h2>
                                    <p className="explosive-entry-section-subtitle">Manage explosive materials and their pricing information</p>
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="explosive-entry-filters">
                                <div className="explosive-entry-search-container">
                                    <Search className="explosive-entry-search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search explosives..."
                                        className="explosive-entry-search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="explosive-entry-select"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={{ minWidth: '150px' }}
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="not-in-use">Not In Use</option>
                                </select>
                                <select
                                    className="explosive-entry-select"
                                    value={filterSupplier}
                                    onChange={(e) => setFilterSupplier(e.target.value)}
                                    style={{ minWidth: '200px' }}
                                >
                                    <option value="all">All Suppliers</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Explosives Table */}
                            <div className="explosive-entry-table-container">
                                <table className="explosive-entry-table">
                                    <thead>
                                        <tr>
                                            <th>Explosive Name</th>
                                            <th>Supplier</th>
                                            <th>Type</th>
                                            <th>Unit</th>
                                            <th>Rate (₹)</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredExplosives.map((explosive) => (
                                            <tr key={explosive.id}>
                                                <td>
                                                    <div>
                                                        <div className="explosive-entry-font-medium">{explosive.explosiveName}</div>
                                                        <div className="explosive-entry-text-sm explosive-entry-text-gray-600">
                                                            {explosive.description.length > 50
                                                                ? `${explosive.description.substring(0, 50)}...`
                                                                : explosive.description}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{getSupplierById(explosive.supplierId)?.name}</td>
                                                <td>{explosive.type}</td>
                                                <td>{explosive.unit}</td>
                                                <td>₹{explosive.rate.toFixed(2)}</td>
                                                <td>
                                                    <span className={`explosive-entry-badge ${explosive.status === 'active' ? 'explosive-entry-badge-active' :
                                                        explosive.status === 'not-in-use' ? 'explosive-entry-badge-not-in-use' :
                                                            'explosive-entry-badge-inactive'
                                                        }`}>
                                                        {explosive.status === 'active' ? 'Active' :
                                                            explosive.status === 'not-in-use' ? 'Not In Use' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>{explosive.createdDate}</td>
                                                <td>
                                                    <div className="explosive-entry-flex explosive-entry-gap-1">
                                                        <button
                                                            className="explosive-entry-btn-icon"
                                                            onClick={() => handleEditExplosive(explosive)}
                                                            title="Edit Explosive"
                                                        >
                                                            <Edit3 className="explosive-entry-icon-sm" />
                                                        </button>
                                                        {explosive.status === 'active' && (
                                                            <button
                                                                className="explosive-entry-btn-icon explosive-entry-btn-icon-danger"
                                                                onClick={() => handleMarkAsNotInUse(explosive.id)}
                                                                title="Mark as Not In Use"
                                                            >
                                                                <X className="explosive-entry-icon-sm" />
                                                            </button>
                                                        )}
                                                        <button
                                                            className="explosive-entry-btn-icon explosive-entry-btn-icon-danger"
                                                            onClick={() => handleDeleteExplosive(explosive.id)}
                                                            title="Delete Explosive"
                                                        >
                                                            <Trash2 className="explosive-entry-icon-sm" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <div className="explosive-entry-tab-content">
                            <div className="explosive-entry-section-header">
                                <div>
                                    <h2 className="explosive-entry-section-title">Overview</h2>
                                    <p className="explosive-entry-section-subtitle">Statistics and insights for explosive rate management</p>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="explosive-entry-grid explosive-entry-grid-cols-4 explosive-entry-gap-6 explosive-entry-mb-6">
                                <div className="explosive-entry-card">
                                    <div className="explosive-entry-card-content" style={{ padding: '1.5rem' }}>
                                        <div className="explosive-entry-flex explosive-entry-items-center">
                                            <div className="explosive-entry-stat-icon explosive-entry-stat-icon-blue">
                                                <Package className="explosive-entry-icon" />
                                            </div>
                                            <div>
                                                <div className="explosive-entry-text-2xl explosive-entry-font-bold">{getTotalExplosives()}</div>
                                                <div className="explosive-entry-text-gray-600">Total Explosives</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="explosive-entry-card">
                                    <div className="explosive-entry-card-content" style={{ padding: '1.5rem' }}>
                                        <div className="explosive-entry-flex explosive-entry-items-center">
                                            <div className="explosive-entry-stat-icon explosive-entry-stat-icon-green">
                                                <Zap className="explosive-entry-icon" />
                                            </div>
                                            <div>
                                                <div className="explosive-entry-text-2xl explosive-entry-font-bold">{getActiveExplosives()}</div>
                                                <div className="explosive-entry-text-gray-600">Active Materials</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="explosive-entry-card">
                                    <div className="explosive-entry-card-content" style={{ padding: '1.5rem' }}>
                                        <div className="explosive-entry-flex explosive-entry-items-center">
                                            <div className="explosive-entry-stat-icon explosive-entry-stat-icon-red">
                                                <X className="explosive-entry-icon" />
                                            </div>
                                            <div>
                                                <div className="explosive-entry-text-2xl explosive-entry-font-bold">{getNotInUseExplosives()}</div>
                                                <div className="explosive-entry-text-gray-600">Not In Use</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="explosive-entry-card">
                                    <div className="explosive-entry-card-content" style={{ padding: '1.5rem' }}>
                                        <div className="explosive-entry-flex explosive-entry-items-center">
                                            <div className="explosive-entry-stat-icon explosive-entry-stat-icon-purple">
                                                <Building className="explosive-entry-icon" />
                                            </div>
                                            <div>
                                                <div className="explosive-entry-text-2xl explosive-entry-font-bold">{getTotalSuppliers()}</div>
                                                <div className="explosive-entry-text-gray-600">Suppliers</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities */}
                            <div className="explosive-entry-card">
                                <div className="explosive-entry-card-header">
                                    <h3 className="explosive-entry-card-title">Recent Activities</h3>
                                </div>
                                <div className="explosive-entry-card-content">
                                    <div className="explosive-entry-space-y-4">
                                        {explosiveEntries.slice(0, 5).map((explosive) => (
                                            <div key={explosive.id} className="explosive-entry-flex explosive-entry-items-center explosive-entry-justify-between">
                                                <div>
                                                    <div className="explosive-entry-font-medium">{explosive.explosiveName}</div>
                                                    <div className="explosive-entry-text-sm explosive-entry-text-gray-600">
                                                        {explosive.type} • Modified: {explosive.modifiedDate}
                                                    </div>
                                                </div>
                                                <span className={`explosive-entry-badge ${explosive.status === 'active' ? 'explosive-entry-badge-active' :
                                                    explosive.status === 'not-in-use' ? 'explosive-entry-badge-not-in-use' :
                                                        'explosive-entry-badge-inactive'
                                                    }`}>
                                                    {explosive.status === 'active' ? 'Active' :
                                                        explosive.status === 'not-in-use' ? 'Not In Use' : 'Inactive'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'suppliers' && (
                        <div className="explosive-entry-tab-content">
                            <div className="explosive-entry-section-header">
                                <div>
                                    <h2 className="explosive-entry-section-title">Suppliers</h2>
                                    <p className="explosive-entry-section-subtitle">Manage explosive material suppliers</p>
                                </div>
                            </div>

                            {/* Suppliers Table */}
                            <div className="explosive-entry-table-container">
                                <table className="explosive-entry-table">
                                    <thead>
                                        <tr>
                                            <th>Supplier Name</th>
                                            <th>Contact Person</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>Materials</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {suppliers.map((supplier) => (
                                            <tr key={supplier.id}>
                                                <td className="explosive-entry-font-medium">{supplier.name}</td>
                                                <td>{supplier.contactPerson}</td>
                                                <td>{supplier.phone}</td>
                                                <td>{supplier.email}</td>
                                                <td>
                                                    <span className={`explosive-entry-badge ${supplier.status === 'active' ? 'explosive-entry-badge-active' : 'explosive-entry-badge-inactive'
                                                        }`}>
                                                        {supplier.status === 'active' ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    {explosiveEntries.filter(e => e.supplierId === supplier.id).length} materials
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Explosive Modal */}
            {showExplosiveModal && (
                <div className="explosive-entry-modal-overlay">
                    <div className="explosive-entry-modal explosive-entry-modal-lg">
                        <div className="explosive-entry-modal-header">
                            <h3 className="explosive-entry-modal-title">
                                {editingExplosive ? 'Modify Explosive Details' : 'Add New Explosive'}
                            </h3>
                            <button
                                className="explosive-entry-modal-close"
                                onClick={() => {
                                    setShowExplosiveModal(false);
                                    resetForm();
                                }}
                            >
                                <X className="explosive-entry-icon" />
                            </button>
                        </div>
                        <div className="explosive-entry-modal-content">
                            <div className="explosive-entry-form-grid">
                                <div className="explosive-entry-form-group">
                                    <label className="explosive-entry-label">Explosive Name *</label>
                                    <input
                                        type="text"
                                        className="explosive-entry-input"
                                        value={explosiveForm.explosiveName}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, explosiveName: e.target.value }))}
                                        placeholder="Enter explosive name"
                                    />
                                </div>

                                <div className="explosive-entry-form-group">
                                    <label className="explosive-entry-label">Select Supplier *</label>
                                    <select
                                        className="explosive-entry-select"
                                        value={explosiveForm.supplierId}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, supplierId: e.target.value }))}
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.filter(s => s.status === 'active').map(supplier => (
                                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="explosive-entry-form-group">
                                    <label className="explosive-entry-label">Type *</label>
                                    <select
                                        className="explosive-entry-select"
                                        value={explosiveForm.type}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, type: e.target.value }))}
                                    >
                                        <option value="">Select Type</option>
                                        {explosiveTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="explosive-entry-form-group">
                                    <label className="explosive-entry-label">Unit *</label>
                                    <select
                                        className="explosive-entry-select"
                                        value={explosiveForm.unit}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, unit: e.target.value }))}
                                    >
                                        <option value="">Select Unit</option>
                                        {units.map(unit => (
                                            <option key={unit} value={unit}>{unit}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="explosive-entry-form-group">
                                    <label className="explosive-entry-label">Rate (₹) *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="explosive-entry-input"
                                        value={explosiveForm.rate || ''}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, rate: parseFloat(e.target.value) || 0 }))}
                                        placeholder="Enter rate"
                                    />
                                </div>

                                <div className="explosive-entry-form-group explosive-entry-form-group-full">
                                    <label className="explosive-entry-label">Explosive Description</label>
                                    <textarea
                                        className="explosive-entry-textarea"
                                        rows={3}
                                        value={explosiveForm.description}
                                        onChange={(e) => setExplosiveForm(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="Enter description"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="explosive-entry-modal-footer">
                            <button
                                className="explosive-entry-btn explosive-entry-btn-secondary"
                                onClick={() => {
                                    setShowExplosiveModal(false);
                                    resetForm();
                                }}
                            >
                                Cancel
                            </button>
                            {editingExplosive && (
                                <button
                                    className="explosive-entry-btn explosive-entry-btn-warning"
                                    onClick={() => {
                                        handleMarkAsNotInUse(editingExplosive.id);
                                        setShowExplosiveModal(false);
                                        resetForm();
                                    }}
                                >
                                    <X className="explosive-entry-icon" />
                                    Mark as Not In Use
                                </button>
                            )}
                            <button
                                className="explosive-entry-btn explosive-entry-btn-primary"
                                onClick={handleSaveExplosive}
                                disabled={!explosiveForm.explosiveName || !explosiveForm.supplierId || !explosiveForm.type || !explosiveForm.unit || explosiveForm.rate <= 0}
                            >
                                <Save className="explosive-entry-icon" />
                                {editingExplosive ? 'Modify Explosive Details' : 'Save Explosive Details'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
