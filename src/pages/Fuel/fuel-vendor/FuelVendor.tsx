import React, { useState, useEffect } from 'react';
import './FuelVendor.css';

// Icon components
const Fuel = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);

const TruckIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const Building = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
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

const TankIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const Receipt = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z" />
    </svg>
);

// Types
interface Vendor {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    address: string;
    gstNumber: string;
    panNumber: string;
    fuelTypes: string[];
    status: 'active' | 'inactive';
    rating: number;
    contractStartDate: string;
    contractEndDate: string;
}

interface FuelType {
    id: string;
    name: string;
    unit: string;
    description: string;
    color: string;
}

interface StockInwardEntry {
    id: string;
    vendorId: string;
    fuelTypeId: string;
    quantity: number;
    rate: number;
    totalAmount: number;
    invoiceNumber: string;
    invoiceDate: string;
    receivedDate: string;
    transportDetails: string;
    qualityChecked: boolean;
    approvedBy: string;
    status: 'pending' | 'approved' | 'rejected';
    notes?: string;
    batchNumber: string;
    tankNumber: string;
}

export default function FuelVendor() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showVendorModal, setShowVendorModal] = useState(false);
    const [showInwardModal, setShowInwardModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterVendor, setFilterVendor] = useState('all');

    // Sample fuel types
    const [fuelTypes] = useState<FuelType[]>([
        {
            id: 'fuel-1',
            name: 'Diesel',
            unit: 'Liter',
            description: 'High-grade diesel for heavy machinery',
            color: '#f59e0b'
        },
        {
            id: 'fuel-2',
            name: 'Petrol',
            unit: 'Liter',
            description: 'Premium petrol for light vehicles',
            color: '#10b981'
        },
        {
            id: 'fuel-3',
            name: 'Hydraulic Oil',
            unit: 'Liter',
            description: 'Hydraulic fluid for mining equipment',
            color: '#6366f1'
        }
    ]);

    // Sample vendors data
    const [vendors, setVendors] = useState<Vendor[]>([
        {
            id: 'vendor-1',
            name: 'Bharat Petroleum Corporation Ltd',
            contactPerson: 'Ramesh Kumar',
            phone: '9876543210',
            email: 'ramesh@bpcl.in',
            address: 'Sector 15, Industrial Area, Mumbai, Maharashtra',
            gstNumber: '27AAACB1234C1ZD',
            panNumber: 'AAACB1234C',
            fuelTypes: ['fuel-1', 'fuel-2'],
            status: 'active',
            rating: 4.5,
            contractStartDate: '2025-01-01',
            contractEndDate: '2025-12-31'
        },
        {
            id: 'vendor-2',
            name: 'Indian Oil Corporation Ltd',
            contactPerson: 'Suresh Patel',
            phone: '9876543211',
            email: 'suresh@iocl.in',
            address: 'Plot No. 45, MIDC Area, Pune, Maharashtra',
            gstNumber: '27AAACI1234I1ZE',
            panNumber: 'AAACI1234I',
            fuelTypes: ['fuel-1', 'fuel-3'],
            status: 'active',
            rating: 4.2,
            contractStartDate: '2025-01-01',
            contractEndDate: '2025-12-31'
        },
        {
            id: 'vendor-3',
            name: 'Hindustan Petroleum Corporation Ltd',
            contactPerson: 'Anil Sharma',
            phone: '9876543212',
            email: 'anil@hpcl.in',
            address: 'Industrial Estate, Phase 2, Gurgaon, Haryana',
            gstNumber: '06AAACH1234H1ZF',
            panNumber: 'AAACH1234H',
            fuelTypes: ['fuel-2'],
            status: 'active',
            rating: 4.0,
            contractStartDate: '2025-01-01',
            contractEndDate: '2025-12-31'
        }
    ]);

    // Sample stock inward entries
    const [stockEntries, setStockEntries] = useState<StockInwardEntry[]>([
        {
            id: 'entry-1',
            vendorId: 'vendor-1',
            fuelTypeId: 'fuel-1',
            quantity: 5000,
            rate: 95.50,
            totalAmount: 477500,
            invoiceNumber: 'BPCL/2025/001',
            invoiceDate: '2025-07-15',
            receivedDate: '2025-07-15',
            transportDetails: 'Tanker MH-12-AB-1234',
            qualityChecked: true,
            approvedBy: 'Store Manager',
            status: 'approved',
            notes: 'Quality parameters within limits',
            batchNumber: 'BPCL240715001',
            tankNumber: 'Tank-01'
        },
        {
            id: 'entry-2',
            vendorId: 'vendor-2',
            fuelTypeId: 'fuel-1',
            quantity: 3000,
            rate: 95.20,
            totalAmount: 285600,
            invoiceNumber: 'IOCL/2025/045',
            invoiceDate: '2025-07-14',
            receivedDate: '2025-07-14',
            transportDetails: 'Tanker MH-12-CD-5678',
            qualityChecked: true,
            approvedBy: 'Store Manager',
            status: 'approved',
            notes: 'Regular delivery',
            batchNumber: 'IOCL240714001',
            tankNumber: 'Tank-02'
        },
        {
            id: 'entry-3',
            vendorId: 'vendor-1',
            fuelTypeId: 'fuel-2',
            quantity: 2000,
            rate: 105.20,
            totalAmount: 210400,
            invoiceNumber: 'BPCL/2025/002',
            invoiceDate: '2025-07-13',
            receivedDate: '2025-07-13',
            transportDetails: 'Tanker MH-12-EF-9012',
            qualityChecked: false,
            approvedBy: '',
            status: 'pending',
            notes: 'Awaiting quality check',
            batchNumber: 'BPCL240713001',
            tankNumber: 'Tank-03'
        }
    ]);

    const [newVendor, setNewVendor] = useState<Partial<Vendor>>({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        gstNumber: '',
        panNumber: '',
        fuelTypes: [],
        status: 'active',
        rating: 0,
        contractStartDate: '',
        contractEndDate: ''
    });

    const [inwardForm, setInwardForm] = useState({
        vendorId: '',
        fuelTypeId: '',
        quantity: 0,
        rate: 0,
        invoiceNumber: '',
        invoiceDate: '',
        transportDetails: '',
        tankNumber: '',
        notes: ''
    });

    // Helper functions
    const getVendorById = (vendorId: string) => vendors.find(v => v.id === vendorId);
    const getFuelTypeById = (fuelTypeId: string) => fuelTypes.find(ft => ft.id === fuelTypeId);

    // Filter functions
    const filteredVendors = vendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredStockEntries = stockEntries.filter(entry => {
        const matchesSearch = searchTerm === '' ||
            getVendorById(entry.vendorId)?.name.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            entry.invoiceNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());

        const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
        const matchesVendor = filterVendor === 'all' || entry.vendorId === filterVendor;

        return matchesSearch && matchesStatus && matchesVendor;
    });

    // Handle vendor creation
    const handleSaveVendor = () => {
        if (newVendor.name && newVendor.contactPerson && newVendor.phone) {
            const vendorData: Vendor = {
                id: `vendor-${Date.now()}`,
                name: newVendor?.name,
                contactPerson: newVendor.contactPerson,
                phone: newVendor?.phone,
                email: newVendor?.email || '',
                address: newVendor?.address || '',
                gstNumber: newVendor?.gstNumber || '',
                panNumber: newVendor?.panNumber || '',
                fuelTypes: newVendor?.fuelTypes || [],
                status: newVendor?.status || 'active',
                rating: newVendor?.rating || 0,
                contractStartDate: newVendor?.contractStartDate || '',
                contractEndDate: newVendor?.contractEndDate || ''
            };

            setVendors([...vendors, vendorData]);
            setNewVendor({
                name: '', contactPerson: '', phone: '', email: '', address: '',
                gstNumber: '', panNumber: '', fuelTypes: [], status: 'active',
                rating: 0, contractStartDate: '', contractEndDate: ''
            });
            setShowVendorModal(false);
        }
    };

    // Handle stock inward entry
    const handleCreateInwardEntry = () => {
        if (inwardForm.vendorId && inwardForm.fuelTypeId && inwardForm.quantity > 0 && inwardForm.rate > 0) {
            const entryData: StockInwardEntry = {
                id: `entry-${Date.now()}`,
                vendorId: inwardForm.vendorId,
                fuelTypeId: inwardForm.fuelTypeId,
                quantity: inwardForm.quantity,
                rate: inwardForm.rate,
                totalAmount: inwardForm.quantity * inwardForm.rate,
                invoiceNumber: inwardForm.invoiceNumber,
                invoiceDate: inwardForm.invoiceDate,
                receivedDate: new Date().toISOString().split('T')[0],
                transportDetails: inwardForm.transportDetails,
                qualityChecked: false,
                approvedBy: '',
                status: 'pending',
                notes: inwardForm.notes,
                batchNumber: `${inwardForm.vendorId.toUpperCase()}-${Date.now()}`,
                tankNumber: inwardForm.tankNumber
            };

            setStockEntries([...stockEntries, entryData]);
            setInwardForm({
                vendorId: '', fuelTypeId: '', quantity: 0, rate: 0,
                invoiceNumber: '', invoiceDate: '', transportDetails: '',
                tankNumber: '', notes: ''
            });
            setShowInwardModal(false);
        }
    };

    // Calculate statistics
    const getTotalVendors = () => vendors.length;
    const getActiveVendors = () => vendors.filter(v => v.status === 'active').length;
    const getPendingEntries = () => stockEntries.filter(e => e.status === 'pending').length;
    const getTotalValue = () => stockEntries.reduce((sum, entry) => sum + entry.totalAmount, 0);

    return (
        <div className="fuel-vendor ">
            <div className='container'>      {/* Header */}
                <div className="fuel-vendor-header">
                    <div className="fuel-vendor-header-content">
                        <div className="fuel-vendor-title-section">
                            <Building className="fuel-vendor-header-icon" />
                            <div>
                                <h1 className="fuel-vendor-title">Fuel Vendor Management</h1>
                                <p className="fuel-vendor-subtitle">
                                    Manage fuel vendors, stock inward entries, and vendor relationships
                                </p>
                            </div>
                        </div>
                        <div className="fuel-vendor-header-actions">
                            <button
                                onClick={() => setShowVendorModal(true)}
                                className="fuel-vendor-btn fuel-vendor-btn-secondary"
                            >
                                <Building className="fuel-vendor-icon" />
                                Add Vendor
                            </button>
                            <button
                                onClick={() => setShowInwardModal(true)}
                                className="fuel-vendor-btn fuel-vendor-btn-primary"
                            >
                                <Plus className="fuel-vendor-icon" />
                                Stock Inward Entry
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="fuel-vendor-main">
                    {/* Tab Navigation */}
                    <div className="fuel-vendor-tabs">
                        <div className="fuel-vendor-tabs-container">
                            <nav className="fuel-vendor-tabs-nav">
                                <div className="fuel-vendor-tabs-list">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`fuel-vendor-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                    >
                                        <BarChart3 className="fuel-vendor-tab-icon" />
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('vendors')}
                                        className={`fuel-vendor-tab ${activeTab === 'vendors' ? 'active' : ''}`}
                                    >
                                        <Building className="fuel-vendor-tab-icon" />
                                        Vendors
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('inward-entries')}
                                        className={`fuel-vendor-tab ${activeTab === 'inward-entries' ? 'active' : ''}`}
                                    >
                                        <TankIcon className="fuel-vendor-tab-icon" />
                                        Stock Inward
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('reports')}
                                        className={`fuel-vendor-tab ${activeTab === 'reports' ? 'active' : ''}`}
                                    >
                                        <Receipt className="fuel-vendor-tab-icon" />
                                        Reports
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="fuel-vendor-content">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="fuel-vendor-tab-content">
                                <div className="fuel-vendor-section-header">
                                    <h2 className="fuel-vendor-section-title">Vendor Overview</h2>
                                    <p className="fuel-vendor-section-subtitle">
                                        Current vendor statistics and stock inward summary
                                    </p>
                                </div>

                                {/* Statistics Cards */}
                                <div className="fuel-vendor-grid fuel-vendor-grid-cols-1 fuel-vendor-md-grid-cols-4 fuel-vendor-gap-6 fuel-vendor-mb-6">
                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-content">
                                            <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-3">
                                                <div className="fuel-vendor-stat-icon fuel-vendor-stat-icon-blue">
                                                    <Building className="fuel-vendor-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Total Vendors</p>
                                                    <p className="fuel-vendor-text-2xl fuel-vendor-font-bold">{getTotalVendors()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-content">
                                            <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-3">
                                                <div className="fuel-vendor-stat-icon fuel-vendor-stat-icon-green">
                                                    <Building className="fuel-vendor-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Active Vendors</p>
                                                    <p className="fuel-vendor-text-2xl fuel-vendor-font-bold">{getActiveVendors()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-content">
                                            <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-3">
                                                <div className="fuel-vendor-stat-icon fuel-vendor-stat-icon-yellow">
                                                    <TankIcon className="fuel-vendor-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Pending Entries</p>
                                                    <p className="fuel-vendor-text-2xl fuel-vendor-font-bold">{getPendingEntries()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-content">
                                            <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-3">
                                                <div className="fuel-vendor-stat-icon fuel-vendor-stat-icon-purple">
                                                    <Receipt className="fuel-vendor-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Total Value</p>
                                                    <p className="fuel-vendor-text-2xl fuel-vendor-font-bold">₹{getTotalValue().toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Entries */}
                                <div className="fuel-vendor-card">
                                    <div className="fuel-vendor-card-header">
                                        <h3 className="fuel-vendor-card-title">Recent Stock Inward Entries</h3>
                                    </div>
                                    <div className="fuel-vendor-card-content">
                                        <div className="fuel-vendor-table-container">
                                            <table className="fuel-vendor-table">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Vendor</th>
                                                        <th>Fuel Type</th>
                                                        <th>Quantity</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stockEntries.slice(0, 5).map((entry) => {
                                                        const vendor = getVendorById(entry.vendorId);
                                                        const fuelType = getFuelTypeById(entry.fuelTypeId);

                                                        return (
                                                            <tr key={entry.id}>
                                                                <td>{new Date(entry.receivedDate).toLocaleDateString()}</td>
                                                                <td>{vendor?.name}</td>
                                                                <td>
                                                                    <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-2">
                                                                        <div
                                                                            className="fuel-vendor-shift-indicator-sm"
                                                                            style={{ backgroundColor: fuelType?.color }}
                                                                        />
                                                                        {fuelType?.name}
                                                                    </div>
                                                                </td>
                                                                <td>{entry.quantity.toLocaleString()}L</td>
                                                                <td>₹{entry.totalAmount.toLocaleString()}</td>
                                                                <td>
                                                                    <span className={`fuel-vendor-badge ${entry.status === 'approved' ? 'fuel-vendor-badge-success' :
                                                                        entry.status === 'pending' ? 'fuel-vendor-badge-warning' :
                                                                            'fuel-vendor-badge-error'
                                                                        }`}>
                                                                        {entry.status}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vendors Tab */}
                        {activeTab === 'vendors' && (
                            <div className="fuel-vendor-tab-content">
                                <div className="fuel-vendor-section-header">
                                    <h2 className="fuel-vendor-section-title">Vendor Management</h2>
                                    <p className="fuel-vendor-section-subtitle">
                                        Manage fuel vendors and their information
                                    </p>
                                </div>

                                {/* Vendor Search */}
                                <div className="fuel-vendor-filters">
                                    <div className="fuel-vendor-search-container">
                                        <Search className="fuel-vendor-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search vendors..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="fuel-vendor-search-input"
                                        />
                                    </div>
                                </div>

                                {/* Vendors Grid */}
                                <div className="fuel-vendor-grid fuel-vendor-grid-cols-1 fuel-vendor-grid-cols-3 fuel-vendor-gap-6">
                                    {filteredVendors.map((vendor) => (
                                        <div key={vendor.id} className="fuel-vendor-card">
                                            <div className="fuel-vendor-card-header">
                                                <div>
                                                    <h3 className="fuel-vendor-card-title">{vendor.name}</h3>
                                                    <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600">{vendor.contactPerson}</p>
                                                </div>
                                                <span className={`fuel-vendor-badge ${vendor.status === 'active' ? 'fuel-vendor-badge-success' : 'fuel-vendor-badge-error'
                                                    }`}>
                                                    {vendor.status}
                                                </span>
                                            </div>
                                            <div className="fuel-vendor-card-content">
                                                <div className="fuel-vendor-space-y-2">
                                                    <div className="fuel-vendor-flex fuel-vendor-justify-between">
                                                        <span className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Phone:</span>
                                                        <span className="fuel-vendor-text-sm fuel-vendor-font-medium">{vendor.phone}</span>
                                                    </div>
                                                    <div className="fuel-vendor-flex fuel-vendor-justify-between">
                                                        <span className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Email:</span>
                                                        <span className="fuel-vendor-text-sm fuel-vendor-font-medium">{vendor.email}</span>
                                                    </div>
                                                    <div className="fuel-vendor-flex fuel-vendor-justify-between">
                                                        <span className="fuel-vendor-text-sm fuel-vendor-text-gray-600">GST:</span>
                                                        <span className="fuel-vendor-text-sm fuel-vendor-font-medium">{vendor.gstNumber}</span>
                                                    </div>
                                                    <div className="fuel-vendor-flex fuel-vendor-justify-between">
                                                        <span className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Rating:</span>
                                                        <span className="fuel-vendor-text-sm fuel-vendor-font-medium">{vendor.rating}/5</span>
                                                    </div>
                                                    <div>
                                                        <span className="fuel-vendor-text-sm fuel-vendor-text-gray-600">Fuel Types:</span>
                                                        <div className="fuel-vendor-flex fuel-vendor-gap-1 fuel-vendor-mt-1">
                                                            {vendor.fuelTypes.map(fuelTypeId => {
                                                                const fuelType = getFuelTypeById(fuelTypeId);
                                                                return (
                                                                    <span
                                                                        key={fuelTypeId}
                                                                        className="fuel-vendor-badge fuel-vendor-badge-secondary"
                                                                        style={{ backgroundColor: fuelType?.color + '20', color: fuelType?.color }}
                                                                    >
                                                                        {fuelType?.name}
                                                                    </span>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fuel-vendor-flex fuel-vendor-gap-2 fuel-vendor-mt-4">
                                                    <button className="fuel-vendor-btn-icon">
                                                        <Edit3 className="fuel-vendor-icon-sm" />
                                                    </button>
                                                    <button className="fuel-vendor-btn-icon fuel-vendor-btn-icon-danger">
                                                        <Trash2 className="fuel-vendor-icon-sm" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Stock Inward Tab */}
                        {activeTab === 'inward-entries' && (
                            <div className="fuel-vendor-tab-content">
                                <div className="fuel-vendor-section-header">
                                    <h2 className="fuel-vendor-section-title">Stock Inward Entries</h2>
                                    <p className="fuel-vendor-section-subtitle">
                                        Track fuel stock received from vendors
                                    </p>
                                </div>

                                {/* Filters */}
                                <div className="fuel-vendor-filters">
                                    <div className="fuel-vendor-search-container">
                                        <Search className="fuel-vendor-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search by vendor, invoice..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="fuel-vendor-search-input"
                                        />
                                    </div>
                                    <select
                                        value={filterVendor}
                                        onChange={(e) => setFilterVendor(e.target.value)}
                                        className="fuel-vendor-select"
                                    >
                                        <option value="all">All Vendors</option>
                                        {vendors.map(vendor => (
                                            <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="fuel-vendor-select"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>

                                {/* Stock Entries Table */}
                                <div className="fuel-vendor-table-container">
                                    <table className="fuel-vendor-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Invoice</th>
                                                <th>Vendor</th>
                                                <th>Fuel Type</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Total Amount</th>
                                                <th>Tank</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStockEntries.map((entry) => {
                                                const vendor = getVendorById(entry.vendorId);
                                                const fuelType = getFuelTypeById(entry.fuelTypeId);

                                                return (
                                                    <tr key={entry.id}>
                                                        <td>{new Date(entry.receivedDate).toLocaleDateString()}</td>
                                                        <td>
                                                            <div>
                                                                <div className="fuel-vendor-font-medium">{entry.invoiceNumber}</div>
                                                                <div className="fuel-vendor-text-sm fuel-vendor-text-gray-600">
                                                                    {new Date(entry.invoiceDate).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{vendor?.name}</td>
                                                        <td>
                                                            <div className="fuel-vendor-flex fuel-vendor-items-center fuel-vendor-gap-2">
                                                                <div
                                                                    className="fuel-vendor-shift-indicator-sm"
                                                                    style={{ backgroundColor: fuelType?.color }}
                                                                />
                                                                {fuelType?.name}
                                                            </div>
                                                        </td>
                                                        <td>{entry.quantity.toLocaleString()}L</td>
                                                        <td>₹{entry.rate}</td>
                                                        <td>₹{entry.totalAmount.toLocaleString()}</td>
                                                        <td>{entry.tankNumber}</td>
                                                        <td>
                                                            <span className={`fuel-vendor-badge ${entry.status === 'approved' ? 'fuel-vendor-badge-success' :
                                                                entry.status === 'pending' ? 'fuel-vendor-badge-warning' :
                                                                    'fuel-vendor-badge-error'
                                                                }`}>
                                                                {entry.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="fuel-vendor-flex fuel-vendor-gap-2">
                                                                <button className="fuel-vendor-btn-icon">
                                                                    <Edit3 className="fuel-vendor-icon-sm" />
                                                                </button>
                                                                {entry.status === 'pending' && (
                                                                    <button className="fuel-vendor-btn-icon">
                                                                        <Save className="fuel-vendor-icon-sm" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Reports Tab */}
                        {activeTab === 'reports' && (
                            <div className="fuel-vendor-tab-content">
                                <div className="fuel-vendor-section-header">
                                    <h2 className="fuel-vendor-section-title">Reports</h2>
                                    <p className="fuel-vendor-section-subtitle">
                                        Generate vendor and stock reports
                                    </p>
                                </div>

                                <div className="fuel-vendor-grid fuel-vendor-grid-cols-1 fuel-vendor-md-grid-cols-2 fuel-vendor-gap-6">
                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-header">
                                            <h3 className="fuel-vendor-card-title">Vendor Performance Report</h3>
                                        </div>
                                        <div className="fuel-vendor-card-content">
                                            <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600 fuel-vendor-mb-4">
                                                Generate detailed vendor performance and delivery reports
                                            </p>
                                            <button className="fuel-vendor-btn fuel-vendor-btn-primary">
                                                <Download className="fuel-vendor-icon" />
                                                Generate Report
                                            </button>
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-card">
                                        <div className="fuel-vendor-card-header">
                                            <h3 className="fuel-vendor-card-title">Stock Inward Report</h3>
                                        </div>
                                        <div className="fuel-vendor-card-content">
                                            <p className="fuel-vendor-text-sm fuel-vendor-text-gray-600 fuel-vendor-mb-4">
                                                Generate stock inward entries and inventory reports
                                            </p>
                                            <button className="fuel-vendor-btn fuel-vendor-btn-primary">
                                                <Download className="fuel-vendor-icon" />
                                                Generate Report
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stock Inward Modal */}
                {showInwardModal && (
                    <div className="fuel-vendor-modal-overlay" onClick={() => setShowInwardModal(false)}>
                        <div className="fuel-vendor-modal fuel-vendor-modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="fuel-vendor-modal-header">
                                <h3 className="fuel-vendor-modal-title">New Stock Inward Entry</h3>
                                <button
                                    onClick={() => setShowInwardModal(false)}
                                    className="fuel-vendor-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="fuel-vendor-modal-content">
                                <div className="fuel-vendor-space-y-4">
                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Vendor</label>
                                            <select
                                                value={inwardForm.vendorId}
                                                onChange={(e) => setInwardForm({ ...inwardForm, vendorId: e.target.value })}
                                                className="fuel-vendor-select"
                                            >
                                                <option value="">Select Vendor</option>
                                                {vendors.filter(v => v.status === 'active').map(vendor => (
                                                    <option key={vendor.id} value={vendor.id}>
                                                        {vendor.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Fuel Type</label>
                                            <select
                                                value={inwardForm.fuelTypeId}
                                                onChange={(e) => setInwardForm({ ...inwardForm, fuelTypeId: e.target.value })}
                                                className="fuel-vendor-select"
                                            >
                                                <option value="">Select Fuel Type</option>
                                                {fuelTypes.map(fuel => (
                                                    <option key={fuel.id} value={fuel.id}>
                                                        {fuel.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-3 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Quantity (Liters)</label>
                                            <input
                                                type="number"
                                                value={inwardForm.quantity}
                                                onChange={(e) => setInwardForm({ ...inwardForm, quantity: parseFloat(e.target.value) || 0 })}
                                                className="fuel-vendor-input"
                                                placeholder="Enter quantity"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Rate per Liter</label>
                                            <input
                                                type="number"
                                                value={inwardForm.rate}
                                                onChange={(e) => setInwardForm({ ...inwardForm, rate: parseFloat(e.target.value) || 0 })}
                                                className="fuel-vendor-input"
                                                placeholder="Enter rate"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Tank Number</label>
                                            <input
                                                type="text"
                                                value={inwardForm.tankNumber}
                                                onChange={(e) => setInwardForm({ ...inwardForm, tankNumber: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Tank-01"
                                            />
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Invoice Number</label>
                                            <input
                                                type="text"
                                                value={inwardForm.invoiceNumber}
                                                onChange={(e) => setInwardForm({ ...inwardForm, invoiceNumber: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Invoice number"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Invoice Date</label>
                                            <input
                                                type="date"
                                                value={inwardForm.invoiceDate}
                                                onChange={(e) => setInwardForm({ ...inwardForm, invoiceDate: e.target.value })}
                                                className="fuel-vendor-input"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="fuel-vendor-label">Transport Details</label>
                                        <input
                                            type="text"
                                            value={inwardForm.transportDetails}
                                            onChange={(e) => setInwardForm({ ...inwardForm, transportDetails: e.target.value })}
                                            className="fuel-vendor-input"
                                            placeholder="Vehicle number, driver details etc."
                                        />
                                    </div>

                                    <div>
                                        <label className="fuel-vendor-label">Notes</label>
                                        <textarea
                                            value={inwardForm.notes}
                                            onChange={(e) => setInwardForm({ ...inwardForm, notes: e.target.value })}
                                            className="fuel-vendor-textarea"
                                            placeholder="Additional notes..."
                                            rows={3}
                                        />
                                    </div>

                                    {inwardForm.quantity > 0 && inwardForm.rate > 0 && (
                                        <div className="fuel-vendor-card">
                                            <div className="fuel-vendor-card-content">
                                                <div className="fuel-vendor-flex fuel-vendor-justify-between">
                                                    <span className="fuel-vendor-text-lg fuel-vendor-font-semibold">Total Amount:</span>
                                                    <span className="fuel-vendor-text-lg fuel-vendor-font-bold">
                                                        ₹{(inwardForm.quantity * inwardForm.rate).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="fuel-vendor-modal-footer">
                                <button
                                    onClick={() => setShowInwardModal(false)}
                                    className="fuel-vendor-btn fuel-vendor-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateInwardEntry}
                                    className="fuel-vendor-btn fuel-vendor-btn-primary"
                                    disabled={!inwardForm.vendorId || !inwardForm.fuelTypeId || inwardForm.quantity <= 0 || inwardForm.rate <= 0}
                                >
                                    <Save className="fuel-vendor-icon" />
                                    Create Entry
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Vendor Modal */}
                {showVendorModal && (
                    <div className="fuel-vendor-modal-overlay" onClick={() => setShowVendorModal(false)}>
                        <div className="fuel-vendor-modal fuel-vendor-modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="fuel-vendor-modal-header">
                                <h3 className="fuel-vendor-modal-title">Add New Vendor</h3>
                                <button
                                    onClick={() => setShowVendorModal(false)}
                                    className="fuel-vendor-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="fuel-vendor-modal-content">
                                <div className="fuel-vendor-space-y-4">
                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Vendor Name</label>
                                            <input
                                                type="text"
                                                value={newVendor.name}
                                                onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Enter vendor name"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Contact Person</label>
                                            <input
                                                type="text"
                                                value={newVendor.contactPerson}
                                                onChange={(e) => setNewVendor({ ...newVendor, contactPerson: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Contact person name"
                                            />
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Phone</label>
                                            <input
                                                type="tel"
                                                value={newVendor.phone}
                                                onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Phone number"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Email</label>
                                            <input
                                                type="email"
                                                value={newVendor.email}
                                                onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="Email address"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="fuel-vendor-label">Address</label>
                                        <textarea
                                            value={newVendor.address}
                                            onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
                                            className="fuel-vendor-textarea"
                                            placeholder="Complete address"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">GST Number</label>
                                            <input
                                                type="text"
                                                value={newVendor.gstNumber}
                                                onChange={(e) => setNewVendor({ ...newVendor, gstNumber: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="GST number"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">PAN Number</label>
                                            <input
                                                type="text"
                                                value={newVendor.panNumber}
                                                onChange={(e) => setNewVendor({ ...newVendor, panNumber: e.target.value })}
                                                className="fuel-vendor-input"
                                                placeholder="PAN number"
                                            />
                                        </div>
                                    </div>

                                    <div className="fuel-vendor-grid fuel-vendor-grid-cols-2 fuel-vendor-gap-4">
                                        <div>
                                            <label className="fuel-vendor-label">Contract Start Date</label>
                                            <input
                                                type="date"
                                                value={newVendor.contractStartDate}
                                                onChange={(e) => setNewVendor({ ...newVendor, contractStartDate: e.target.value })}
                                                className="fuel-vendor-input"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-vendor-label">Contract End Date</label>
                                            <input
                                                type="date"
                                                value={newVendor.contractEndDate}
                                                onChange={(e) => setNewVendor({ ...newVendor, contractEndDate: e.target.value })}
                                                className="fuel-vendor-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="fuel-vendor-modal-footer">
                                <button
                                    onClick={() => setShowVendorModal(false)}
                                    className="fuel-vendor-btn fuel-vendor-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveVendor}
                                    className="fuel-vendor-btn fuel-vendor-btn-primary"
                                    disabled={!newVendor.name || !newVendor.contactPerson || !newVendor.phone}
                                >
                                    <Save className="fuel-vendor-icon" />
                                    Add Vendor
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}
