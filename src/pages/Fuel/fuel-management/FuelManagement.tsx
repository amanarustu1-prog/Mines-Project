import React, { useState, useEffect } from 'react';
import './FuelManagement.css';

// Icon components (you can replace these with your preferred icon library or SVGs)
const Fuel = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
    </svg>
);

const Truck = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
    </svg>
);

const Calendar = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
    </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

const Grid = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
    </svg>
);

const ChevronLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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

const Gas = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM12 12v.01" />
    </svg>
);

// Types
interface Vehicle {
    id: string;
    vehicleNo: string;
    type: string;
    model: string;
    capacity: number;
    department: string;
    driver: string;
    status: 'active' | 'maintenance' | 'inactive';
    lastRefuel?: string;
}

interface FuelType {
    id: string;
    name: string;
    price: number;
    unit: string;
    description: string;
    color: string;
    stock: number;
    minStock: number;
}

interface FuelTransaction {
    id: string;
    vehicleId: string;
    fuelTypeId: string;
    quantity: number;
    pricePerUnit: number;
    totalAmount: number;
    date: string;
    attendant: string;
    meterReading: number;
    notes?: string;
    status: 'completed' | 'pending' | 'cancelled';
}

interface FuelStock {
    id: string;
    fuelTypeId: string;
    quantity: number;
    lastUpdated: string;
    supplier: string;
    batchNo: string;
    expiryDate?: string;
}

export default function FuelManagement() {
    const [activeTab, setActiveTab] = useState('overview');
    const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showFuelTypeModal, setShowFuelTypeModal] = useState(false);
    const [showStockModal, setShowStockModal] = useState(false);
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterFuelType, setFilterFuelType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Sample fuel types data
    const [fuelTypes, setFuelTypes] = useState<FuelType[]>([
        {
            id: 'fuel-1',
            name: 'Diesel',
            price: 95.50,
            unit: 'Liter',
            description: 'High-grade diesel for heavy machinery and vehicles',
            color: '#f59e0b',
            stock: 8500,
            minStock: 2000
        },
        {
            id: 'fuel-2',
            name: 'Petrol',
            price: 105.20,
            unit: 'Liter',
            description: 'Premium petrol for light vehicles and generators',
            color: '#10b981',
            stock: 3200,
            minStock: 1000
        },
        {
            id: 'fuel-3',
            name: 'Hydraulic Oil',
            price: 180.00,
            unit: 'Liter',
            description: 'Hydraulic fluid for mining equipment',
            color: '#6366f1',
            stock: 1200,
            minStock: 300
        }
    ]);

    // Sample vehicles data
    const [vehicles, setVehicles] = useState<Vehicle[]>([
        {
            id: 'veh-1',
            vehicleNo: 'MH-12-AB-1234',
            type: 'Dump Truck',
            model: 'Tata 3118',
            capacity: 25,
            department: 'Mining Operations',
            driver: 'Rajesh Kumar',
            status: 'active',
            lastRefuel: '2025-07-15'
        },
        {
            id: 'veh-2',
            vehicleNo: 'MH-12-CD-5678',
            type: 'Excavator',
            model: 'JCB 320D',
            capacity: 200,
            department: 'Excavation',
            driver: 'Amit Singh',
            status: 'active',
            lastRefuel: '2025-07-14'
        },
        {
            id: 'veh-3',
            vehicleNo: 'MH-12-EF-9012',
            type: 'Loader',
            model: 'CAT 950M',
            capacity: 150,
            department: 'Material Handling',
            driver: 'Priya Sharma',
            status: 'maintenance',
            lastRefuel: '2025-07-12'
        },
        {
            id: 'veh-4',
            vehicleNo: 'MH-12-GH-3456',
            type: 'Transport Truck',
            model: 'Ashok Leyland 2518',
            capacity: 18,
            department: 'Transport',
            driver: 'Manoj Gupta',
            status: 'active',
            lastRefuel: '2025-07-15'
        },
        {
            id: 'veh-5',
            vehicleNo: 'MH-12-IJ-7890',
            type: 'Drill Rig',
            model: 'Atlas Copco ROC D7',
            capacity: 300,
            department: 'Drilling',
            driver: 'Deepak Kumar',
            status: 'active',
            lastRefuel: '2025-07-13'
        }
    ]);

    // Sample fuel transactions
    const [transactions, setTransactions] = useState<FuelTransaction[]>([
        {
            id: 'trans-1',
            vehicleId: 'veh-1',
            fuelTypeId: 'fuel-1',
            quantity: 80,
            pricePerUnit: 95.50,
            totalAmount: 7640,
            date: '2025-07-15',
            attendant: 'Fuel Station Operator',
            meterReading: 15230,
            notes: 'Regular refueling',
            status: 'completed'
        },
        {
            id: 'trans-2',
            vehicleId: 'veh-2',
            fuelTypeId: 'fuel-1',
            quantity: 120,
            pricePerUnit: 95.50,
            totalAmount: 11460,
            date: '2025-07-14',
            attendant: 'Fuel Station Operator',
            meterReading: 8950,
            notes: 'Heavy usage day',
            status: 'completed'
        },
        {
            id: 'trans-3',
            vehicleId: 'veh-4',
            fuelTypeId: 'fuel-2',
            quantity: 45,
            pricePerUnit: 105.20,
            totalAmount: 4734,
            date: '2025-07-15',
            attendant: 'Fuel Station Operator',
            meterReading: 12450,
            notes: 'Transport vehicle',
            status: 'completed'
        },
        {
            id: 'trans-4',
            vehicleId: 'veh-3',
            fuelTypeId: 'fuel-3',
            quantity: 25,
            pricePerUnit: 180.00,
            totalAmount: 4500,
            date: '2025-07-12',
            attendant: 'Maintenance Team',
            meterReading: 6780,
            notes: 'Hydraulic system refill',
            status: 'completed'
        },
        {
            id: 'trans-5',
            vehicleId: 'veh-5',
            fuelTypeId: 'fuel-1',
            quantity: 150,
            pricePerUnit: 95.50,
            totalAmount: 14325,
            date: '2025-07-13',
            attendant: 'Fuel Station Operator',
            meterReading: 5680,
            notes: 'Drill rig refueling',
            status: 'completed'
        }
    ]);

    const [newFuelType, setNewFuelType] = useState<Partial<FuelType>>({
        name: '',
        price: 0,
        unit: 'Liter',
        description: '',
        color: '#10b981',
        stock: 0,
        minStock: 0
    });

    const [transactionForm, setTransactionForm] = useState({
        vehicleId: '',
        fuelTypeId: '',
        quantity: 0,
        meterReading: 0,
        notes: ''
    });

    // Filter functions
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = searchTerm === '' ||
            getVehicleById(transaction.vehicleId)?.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            getFuelTypeById(transaction.fuelTypeId)?.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFuelType = filterFuelType === 'all' || transaction.fuelTypeId === filterFuelType;
        const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;

        return matchesSearch && matchesFuelType && matchesStatus;
    });

    // Helper functions
    const getFuelTypeById = (fuelTypeId: string) => fuelTypes.find(ft => ft.id === fuelTypeId);
    const getVehicleById = (vehicleId: string) => vehicles.find(v => v.id === vehicleId);

    // Handle fuel type creation
    const handleSaveFuelType = () => {
        if (newFuelType.name && newFuelType.price && newFuelType.unit) {
            const fuelTypeData: FuelType = {
                id: `fuel-${Date.now()}`,
                name: newFuelType.name,
                price: newFuelType.price,
                unit: newFuelType.unit,
                description: newFuelType.description || '',
                color: newFuelType.color || '#10b981',
                stock: newFuelType.stock || 0,
                minStock: newFuelType.minStock || 0
            };

            setFuelTypes([...fuelTypes, fuelTypeData]);
            setNewFuelType({ name: '', price: 0, unit: 'Liter', description: '', color: '#10b981', stock: 0, minStock: 0 });
            setShowFuelTypeModal(false);
        }
    };

    // Handle transaction creation
    const handleCreateTransaction = () => {
        if (transactionForm.vehicleId && transactionForm.fuelTypeId && transactionForm.quantity > 0) {
            const fuelType = getFuelTypeById(transactionForm.fuelTypeId);
            if (!fuelType) return;

            const transactionData: FuelTransaction = {
                id: `trans-${Date.now()}`,
                vehicleId: transactionForm.vehicleId,
                fuelTypeId: transactionForm.fuelTypeId,
                quantity: transactionForm.quantity,
                pricePerUnit: fuelType.price,
                totalAmount: transactionForm.quantity * fuelType.price,
                date: new Date().toISOString().split('T')[0],
                attendant: 'Current User',
                meterReading: transactionForm.meterReading,
                notes: transactionForm.notes,
                status: 'completed'
            };

            setTransactions([...transactions, transactionData]);
            setTransactionForm({ vehicleId: '', fuelTypeId: '', quantity: 0, meterReading: 0, notes: '' });
            setShowTransactionModal(false);
        }
    };

    // Calculate statistics
    const getTotalConsumption = () => {
        return transactions.reduce((total, transaction) => total + transaction.quantity, 0);
    };

    const getTotalCost = () => {
        return transactions.reduce((total, transaction) => total + transaction.totalAmount, 0);
    };

    const getLowStockFuels = () => {
        return fuelTypes.filter(fuel => fuel.stock <= fuel.minStock);
    };

    const getMonthlyConsumption = () => {
        const currentMonthTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const currentDate = new Date();
            return transactionDate.getMonth() === currentDate.getMonth() &&
                transactionDate.getFullYear() === currentDate.getFullYear();
        });
        return currentMonthTransactions.reduce((total, transaction) => total + transaction.quantity, 0);
    };

    return (
        <div className="fuel-management">
            <div className='container'>
                {/* Header */}
                <div className="fuel-management-header">
                    <div className="fuel-management-header-content">
                        <div className="fuel-management-title-section">
                            <Fuel className="fuel-management-header-icon" />
                            <div>
                                <h1 className="fuel-management-title">Fuel Management</h1>
                                <p className="fuel-management-subtitle">
                                    Track fuel consumption, manage inventory, and monitor vehicle refueling
                                </p>
                            </div>
                        </div>
                        <div className="fuel-management-header-actions">
                            <button
                                onClick={() => setShowFuelTypeModal(true)}
                                className="fuel-management-btn fuel-management-btn-secondary"
                            >
                                <TankIcon className="fuel-management-icon" />
                                Add Fuel Type
                            </button>
                            <button
                                onClick={() => setShowTransactionModal(true)}
                                className="fuel-management-btn fuel-management-btn-primary"
                            >
                                <Plus className="fuel-management-icon" />
                                New Transaction
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="fuel-management-main " style={{marginTop:"1rem"}}>
                    {/* Tab Navigation */}
                    <div className="fuel-management-tabs">
                        <div className="fuel-management-tabs-container">
                            <nav className="fuel-management-tabs-nav">
                                <div className="fuel-management-tabs-list">
                                    <button
                                        onClick={() => setActiveTab('overview')}
                                        className={`fuel-management-tab ${activeTab === 'overview' ? 'active' : ''}`}
                                    >
                                        <BarChart3 className="fuel-management-tab-icon" />
                                        Overview
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('transactions')}
                                        className={`fuel-management-tab ${activeTab === 'transactions' ? 'active' : ''}`}
                                    >
                                        <Fuel className="fuel-management-tab-icon" />
                                        Transactions
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('inventory')}
                                        className={`fuel-management-tab ${activeTab === 'inventory' ? 'active' : ''}`}
                                    >
                                        <TankIcon className="fuel-management-tab-icon" />
                                        Inventory
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('vehicles')}
                                        className={`fuel-management-tab ${activeTab === 'vehicles' ? 'active' : ''}`}
                                    >
                                        <Truck className="fuel-management-tab-icon" />
                                        Vehicles
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="fuel-management-content">
                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="fuel-management-tab-content">
                                {/* <div className="fuel-management-section-header">
                                    <h2 className="fuel-management-section-title">Fuel Overview</h2>
                                    <p className="fuel-management-section-subtitle">
                                        Current fuel statistics and consumption analysis
                                    </p>
                                </div> */}

                                {/* Statistics Cards */}
                                <div className="fuel-management-grid fuel-management-grid-cols-1 fuel-management-md-grid-cols-4 fuel-management-gap-6 fuel-management-mb-6">
                                    <div className="fuel-management-card">
                                        <div className="fuel-management-card-content">
                                            <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                <div className="fuel-management-stat-icon fuel-management-stat-icon-blue">
                                                    <Fuel className="fuel-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-management-text-sm fuel-management-text-gray-600">Total Consumption</p>
                                                    <p className="fuel-management-text-2xl fuel-management-font-bold">{getTotalConsumption().toLocaleString()}L</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-management-card">
                                        <div className="fuel-management-card-content">
                                            <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                <div className="fuel-management-stat-icon fuel-management-stat-icon-green">
                                                    <TrendingUp className="fuel-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-management-text-sm fuel-management-text-gray-600">Total Cost</p>
                                                    <p className="fuel-management-text-2xl fuel-management-font-bold">₹{getTotalCost().toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-management-card">
                                        <div className="fuel-management-card-content">
                                            <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                <div className="fuel-management-stat-icon fuel-management-stat-icon-yellow">
                                                    <Calendar className="fuel-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-management-text-sm fuel-management-text-gray-600">Monthly Usage</p>
                                                    <p className="fuel-management-text-2xl fuel-management-font-bold">{getMonthlyConsumption().toLocaleString()}L</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="fuel-management-card">
                                        <div className="fuel-management-card-content">
                                            <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                <div className="fuel-management-stat-icon fuel-management-stat-icon-purple">
                                                    <TankIcon className="fuel-management-icon" />
                                                </div>
                                                <div>
                                                    <p className="fuel-management-text-sm fuel-management-text-gray-600">Low Stock Alerts</p>
                                                    <p className="fuel-management-text-2xl fuel-management-font-bold">{getLowStockFuels().length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Fuel Type Distribution */}
                                <div className="fuel-management-grid fuel-management-grid-cols-1 fuel-management-md-grid-cols-3 fuel-management-gap-6">
                                    {fuelTypes.map((fuelType) => {
                                        const typeTransactions = transactions.filter(t => t.fuelTypeId === fuelType.id);
                                        const totalConsumption = typeTransactions.reduce((sum, t) => sum + t.quantity, 0);
                                        const totalCost = typeTransactions.reduce((sum, t) => sum + t.totalAmount, 0);
                                        const stockPercentage = Math.min((fuelType.stock / (fuelType.minStock * 5)) * 100, 100);

                                        return (
                                            <div key={fuelType.id} className="fuel-management-card">
                                                <div className="fuel-management-card-header">
                                                    <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                        <div
                                                            className="fuel-management-shift-indicator"
                                                            style={{ backgroundColor: fuelType.color }}
                                                        />
                                                        <div>
                                                            <h3 className="fuel-management-card-title">{fuelType.name}</h3>
                                                            <p className="fuel-management-text-sm fuel-management-text-gray-600">
                                                                ₹{fuelType.price} per {fuelType.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="fuel-management-card-content">
                                                    <div className="fuel-management-space-y-4">
                                                        <div className="fuel-management-flex fuel-management-justify-between fuel-management-items-center">
                                                            <span className="fuel-management-text-sm fuel-management-text-gray-600">Current Stock</span>
                                                            <span className="fuel-management-text-lg fuel-management-font-semibold">{fuelType.stock.toLocaleString()}L</span>
                                                        </div>

                                                        <div className="fuel-management-progress-bar">
                                                            <div
                                                                className="fuel-management-progress-fill"
                                                                style={{
                                                                    width: `${stockPercentage}%`,
                                                                    backgroundColor: fuelType.stock <= fuelType.minStock ? '#dc2626' : fuelType.color
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="fuel-management-flex fuel-management-justify-between">
                                                            <span className={`fuel-management-badge ${fuelType.stock <= fuelType.minStock
                                                                ? 'fuel-management-badge-error'
                                                                : stockPercentage < 50
                                                                    ? 'fuel-management-badge-warning'
                                                                    : 'fuel-management-badge-success'
                                                                }`}>
                                                                {fuelType.stock <= fuelType.minStock ? 'Low Stock' : stockPercentage < 50 ? 'Medium' : 'Good Stock'}
                                                            </span>
                                                            <span className="fuel-management-text-xs fuel-management-text-gray-500">
                                                                Min: {fuelType.minStock}L
                                                            </span>
                                                        </div>

                                                        <div className="fuel-management-space-y-2">
                                                            <div className="fuel-management-flex fuel-management-justify-between">
                                                                <span className="fuel-management-text-xs fuel-management-text-gray-600">Total Consumed</span>
                                                                <span className="fuel-management-text-xs fuel-management-font-medium">{totalConsumption.toLocaleString()}L</span>
                                                            </div>
                                                            <div className="fuel-management-flex fuel-management-justify-between">
                                                                <span className="fuel-management-text-xs fuel-management-text-gray-600">Total Cost</span>
                                                                <span className="fuel-management-text-xs fuel-management-font-medium">₹{totalCost.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Transactions Tab */}
                        {activeTab === 'transactions' && (
                            <div className="fuel-management-tab-content">
                                {/* <div className="fuel-management-section-header">
                                    <h2 className="fuel-management-section-title">Fuel Transactions</h2>
                                    <p className="fuel-management-section-subtitle">
                                        View and manage fuel transactions and refueling records
                                    </p>
                                </div> */}

                                {/* Filters */}
                                <div className="fuel-management-filters">
                                    <div className="fuel-management-search-container">
                                        <Search className="fuel-management-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search by vehicle, fuel type..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="fuel-management-search-input"
                                        />
                                    </div>
                                    <select
                                        value={filterFuelType}
                                        onChange={(e) => setFilterFuelType(e.target.value)}
                                        className="fuel-management-select"
                                    >
                                        <option value="all">All Fuel Types</option>
                                        {fuelTypes.map(fuel => (
                                            <option key={fuel.id} value={fuel.id}>{fuel.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="fuel-management-select"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>

                                {/* Transactions Table */}
                                <div className="fuel-management-table-container">
                                    <table className="fuel-management-table">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Vehicle</th>
                                                <th>Fuel Type</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Total Amount</th>
                                                <th>Meter Reading</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTransactions.map((transaction) => {
                                                const vehicle = getVehicleById(transaction.vehicleId);
                                                const fuelType = getFuelTypeById(transaction.fuelTypeId);

                                                return (
                                                    <tr key={transaction.id}>
                                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                                        <td>
                                                            <div>
                                                                <div className="fuel-management-font-medium">{vehicle?.vehicleNo}</div>
                                                                <div className="fuel-management-text-sm fuel-management-text-gray-600">{vehicle?.type}</div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-2">
                                                                <div
                                                                    className="fuel-management-shift-indicator-sm"
                                                                    style={{ backgroundColor: fuelType?.color }}
                                                                />
                                                                {fuelType?.name}
                                                            </div>
                                                        </td>
                                                        <td>{transaction.quantity}L</td>
                                                        <td>₹{transaction.pricePerUnit}</td>
                                                        <td>₹{transaction.totalAmount.toLocaleString()}</td>
                                                        <td>{transaction.meterReading.toLocaleString()} km</td>
                                                        <td>
                                                            <span className={`fuel-management-badge ${transaction.status === 'completed' ? 'fuel-management-badge-success' :
                                                                transaction.status === 'pending' ? 'fuel-management-badge-warning' :
                                                                    'fuel-management-badge-error'
                                                                }`}>
                                                                {transaction.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="fuel-management-flex fuel-management-gap-2">
                                                                <button className="fuel-management-btn-icon">
                                                                    <Edit3 className="fuel-management-icon-sm" />
                                                                </button>
                                                                <button className="fuel-management-btn-icon fuel-management-btn-icon-danger">
                                                                    <Trash2 className="fuel-management-icon-sm" />
                                                                </button>
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

                        {/* Inventory Tab */}
                        {activeTab === 'inventory' && (
                            <div className="fuel-management-tab-content">
                                {/* <div className="fuel-management-section-header">
                                    <h2 className="fuel-management-section-title">Fuel Inventory</h2>
                                    <p className="fuel-management-section-subtitle">
                                        Monitor fuel stock levels and manage inventory
                                    </p>
                                </div> */}

                                <div className="fuel-management-grid fuel-management-grid-cols-1 fuel-management-md-grid-cols-2 fuel-management-gap-6">
                                    {fuelTypes.map((fuelType) => {
                                        const stockPercentage = Math.min((fuelType.stock / (fuelType.minStock * 5)) * 100, 100);
                                        const isLowStock = fuelType.stock <= fuelType.minStock;

                                        return (
                                            <div key={fuelType.id} className="fuel-management-card">
                                                <div className="fuel-management-card-header">
                                                    <div className="fuel-management-flex fuel-management-items-center fuel-management-gap-3">
                                                        <div
                                                            className="fuel-management-shift-indicator"
                                                            style={{ backgroundColor: fuelType.color }}
                                                        />
                                                        <div>
                                                            <h3 className="fuel-management-card-title">{fuelType.name}</h3>
                                                            <p className="fuel-management-text-sm fuel-management-text-gray-600">
                                                                ₹{fuelType.price} per {fuelType.unit}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button className="fuel-management-btn-icon">
                                                        <Edit3 className="fuel-management-icon-sm" />
                                                    </button>
                                                </div>
                                                <div className="fuel-management-card-content">
                                                    <div className="fuel-management-space-y-4">
                                                        <div className="fuel-management-flex fuel-management-justify-between fuel-management-items-center">
                                                            <span className="fuel-management-text-sm fuel-management-text-gray-600">Current Stock</span>
                                                            <span className="fuel-management-text-2xl fuel-management-font-bold">
                                                                {fuelType.stock.toLocaleString()}L
                                                            </span>
                                                        </div>

                                                        <div className="fuel-management-progress-bar">
                                                            <div
                                                                className="fuel-management-progress-fill"
                                                                style={{
                                                                    width: `${stockPercentage}%`,
                                                                    backgroundColor: isLowStock ? '#dc2626' : fuelType.color
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="fuel-management-flex fuel-management-justify-between fuel-management-items-center">
                                                            <span className={`fuel-management-badge ${isLowStock ? 'fuel-management-badge-error' :
                                                                stockPercentage < 50 ? 'fuel-management-badge-warning' :
                                                                    'fuel-management-badge-success'
                                                                }`}>
                                                                {isLowStock ? 'Low Stock' : stockPercentage < 50 ? 'Medium Stock' : 'Good Stock'}
                                                            </span>
                                                            <span className="fuel-management-text-sm fuel-management-text-gray-600">
                                                                Min: {fuelType.minStock}L
                                                            </span>
                                                        </div>

                                                        <div className="fuel-management-space-y-2">
                                                            <div className="fuel-management-flex fuel-management-justify-between">
                                                                <span className="fuel-management-text-sm fuel-management-text-gray-600">Stock Value</span>
                                                                <span className="fuel-management-text-sm fuel-management-font-medium">
                                                                    ₹{(fuelType.stock * fuelType.price).toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <div className="fuel-management-flex fuel-management-justify-between">
                                                                <span className="fuel-management-text-sm fuel-management-text-gray-600">Days Supply</span>
                                                                <span className="fuel-management-text-sm fuel-management-font-medium">
                                                                    {Math.floor(fuelType.stock / 50)} days
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <p className="fuel-management-text-sm fuel-management-text-gray-700">
                                                            {fuelType.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Vehicles Tab */}
                        {activeTab === 'vehicles' && (
                            <div className="fuel-management-tab-content">
                                {/* <div className="fuel-management-section-header">
                                    <h2 className="fuel-management-section-title">Vehicle Fleet</h2>
                                    <p className="fuel-management-section-subtitle">
                                        Manage vehicles and their fuel consumption
                                    </p>
                                </div> */}

                                {/* Vehicle Search */}
                                <div className="fuel-management-filters">
                                    <div className="fuel-management-search-container">
                                        <Search className="fuel-management-search-icon" />
                                        <input
                                            type="text"
                                            placeholder="Search vehicles..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="fuel-management-search-input"
                                        />
                                    </div>
                                </div>

                                {/* Vehicles Table */}
                                <div className="fuel-management-table-container">
                                    <table className="fuel-management-table">
                                        <thead>
                                            <tr>
                                                <th>Vehicle No</th>
                                                <th>Type & Model</th>
                                                <th>Department</th>
                                                <th>Driver</th>
                                                <th>Capacity</th>
                                                <th>Last Refuel</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredVehicles.map((vehicle) => {
                                                const vehicleTransactions = transactions.filter(t => t.vehicleId === vehicle.id);
                                                const totalConsumption = vehicleTransactions.reduce((sum, t) => sum + t.quantity, 0);

                                                return (
                                                    <tr key={vehicle.id}>
                                                        <td>
                                                            <div className="fuel-management-font-medium">{vehicle.vehicleNo}</div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="fuel-management-font-medium">{vehicle.type}</div>
                                                                <div className="fuel-management-text-sm fuel-management-text-gray-600">{vehicle.model}</div>
                                                            </div>
                                                        </td>
                                                        <td>{vehicle.department}</td>
                                                        <td>{vehicle.driver}</td>
                                                        <td>{vehicle.capacity}T</td>
                                                        <td>
                                                            {vehicle.lastRefuel ? new Date(vehicle.lastRefuel).toLocaleDateString() : 'Never'}
                                                        </td>
                                                        <td>
                                                            <span className={`fuel-management-badge ${vehicle.status === 'active' ? 'fuel-management-badge-success' :
                                                                vehicle.status === 'maintenance' ? 'fuel-management-badge-warning' :
                                                                    'fuel-management-badge-error'
                                                                }`}>
                                                                {vehicle.status}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="fuel-management-flex fuel-management-gap-2">
                                                                <button className="fuel-management-btn-icon" title="Refuel">
                                                                    <Fuel className="fuel-management-icon-sm" />
                                                                </button>
                                                                <button className="fuel-management-btn-icon">
                                                                    <Edit3 className="fuel-management-icon-sm" />
                                                                </button>
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
                    </div>
                </div>

                {/* New Transaction Modal */}
                {showTransactionModal && (
                    <div className="fuel-management-modal-overlay" onClick={() => setShowTransactionModal(false)}>
                        <div className="fuel-management-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="fuel-management-modal-header">
                                <h3 className="fuel-management-modal-title">New Fuel Transaction</h3>
                                <button
                                    onClick={() => setShowTransactionModal(false)}
                                    className="fuel-management-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="fuel-management-modal-content">
                                <div className="fuel-management-space-y-4">
                                    <div>
                                        <label className="fuel-management-label">Vehicle</label>
                                        <select
                                            value={transactionForm.vehicleId}
                                            onChange={(e) => setTransactionForm({ ...transactionForm, vehicleId: e.target.value })}
                                            className="fuel-management-select"
                                        >
                                            <option value="">Select Vehicle</option>
                                            {vehicles.filter(v => v.status === 'active').map(vehicle => (
                                                <option key={vehicle.id} value={vehicle.id}>
                                                    {vehicle.vehicleNo} - {vehicle.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Fuel Type</label>
                                        <select
                                            value={transactionForm.fuelTypeId}
                                            onChange={(e) => setTransactionForm({ ...transactionForm, fuelTypeId: e.target.value })}
                                            className="fuel-management-select"
                                        >
                                            <option value="">Select Fuel Type</option>
                                            {fuelTypes.map(fuel => (
                                                <option key={fuel.id} value={fuel.id}>
                                                    {fuel.name} - ₹{fuel.price}/{fuel.unit}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Quantity (Liters)</label>
                                        <input
                                            type="number"
                                            value={transactionForm.quantity}
                                            onChange={(e) => setTransactionForm({ ...transactionForm, quantity: parseFloat(e.target.value) || 0 })}
                                            className="fuel-management-input"
                                            placeholder="Enter quantity"
                                        />
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Meter Reading (km)</label>
                                        <input
                                            type="number"
                                            value={transactionForm.meterReading}
                                            onChange={(e) => setTransactionForm({ ...transactionForm, meterReading: parseFloat(e.target.value) || 0 })}
                                            className="fuel-management-input"
                                            placeholder="Enter meter reading"
                                        />
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Notes</label>
                                        <textarea
                                            value={transactionForm.notes}
                                            onChange={(e) => setTransactionForm({ ...transactionForm, notes: e.target.value })}
                                            className="fuel-management-textarea"
                                            placeholder="Additional notes..."
                                            rows={3}
                                        />
                                    </div>
                                    {transactionForm.fuelTypeId && transactionForm.quantity > 0 && (
                                        <div className="fuel-management-card">
                                            <div className="fuel-management-card-content">
                                                <div className="fuel-management-flex fuel-management-justify-between">
                                                    <span>Total Amount:</span>
                                                    <span className="fuel-management-text-lg fuel-management-font-bold">
                                                        ₹{(transactionForm.quantity * (getFuelTypeById(transactionForm.fuelTypeId)?.price || 0)).toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="fuel-management-modal-footer">
                                <button
                                    onClick={() => setShowTransactionModal(false)}
                                    className="fuel-management-btn fuel-management-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateTransaction}
                                    className="fuel-management-btn fuel-management-btn-primary"
                                    disabled={!transactionForm.vehicleId || !transactionForm.fuelTypeId || transactionForm.quantity <= 0}
                                >
                                    <Save className="fuel-management-icon" />
                                    Create Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* New Fuel Type Modal */}
                {showFuelTypeModal && (
                    <div className="fuel-management-modal-overlay" onClick={() => setShowFuelTypeModal(false)}>
                        <div className="fuel-management-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="fuel-management-modal-header">
                                <h3 className="fuel-management-modal-title">Add New Fuel Type</h3>
                                <button
                                    onClick={() => setShowFuelTypeModal(false)}
                                    className="fuel-management-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="fuel-management-modal-content">
                                <div className="fuel-management-space-y-4">
                                    <div>
                                        <label className="fuel-management-label">Fuel Name</label>
                                        <input
                                            type="text"
                                            value={newFuelType.name}
                                            onChange={(e) => setNewFuelType({ ...newFuelType, name: e.target.value })}
                                            className="fuel-management-input"
                                            placeholder="Enter fuel name"
                                        />
                                    </div>
                                    <div className="fuel-management-grid fuel-management-grid-cols-2 fuel-management-gap-4">
                                        <div>
                                            <label className="fuel-management-label">Price per Unit</label>
                                            <input
                                                type="number"
                                                value={newFuelType.price}
                                                onChange={(e) => setNewFuelType({ ...newFuelType, price: parseFloat(e.target.value) || 0 })}
                                                className="fuel-management-input"
                                                placeholder="Price"
                                                step="0.01"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-management-label">Unit</label>
                                            <select
                                                value={newFuelType.unit}
                                                onChange={(e) => setNewFuelType({ ...newFuelType, unit: e.target.value })}
                                                className="fuel-management-select"
                                            >
                                                <option value="Liter">Liter</option>
                                                <option value="Gallon">Gallon</option>
                                                <option value="Kg">Kg</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="fuel-management-grid fuel-management-grid-cols-2 fuel-management-gap-4">
                                        <div>
                                            <label className="fuel-management-label">Current Stock</label>
                                            <input
                                                type="number"
                                                value={newFuelType.stock}
                                                onChange={(e) => setNewFuelType({ ...newFuelType, stock: parseFloat(e.target.value) || 0 })}
                                                className="fuel-management-input"
                                                placeholder="Stock quantity"
                                            />
                                        </div>
                                        <div>
                                            <label className="fuel-management-label">Minimum Stock</label>
                                            <input
                                                type="number"
                                                value={newFuelType.minStock}
                                                onChange={(e) => setNewFuelType({ ...newFuelType, minStock: parseFloat(e.target.value) || 0 })}
                                                className="fuel-management-input"
                                                placeholder="Minimum stock level"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Color</label>
                                        <input
                                            type="color"
                                            value={newFuelType.color}
                                            onChange={(e) => setNewFuelType({ ...newFuelType, color: e.target.value })}
                                            className="fuel-management-color-input"
                                        />
                                    </div>
                                    <div>
                                        <label className="fuel-management-label">Description</label>
                                        <textarea
                                            value={newFuelType.description}
                                            onChange={(e) => setNewFuelType({ ...newFuelType, description: e.target.value })}
                                            className="fuel-management-textarea"
                                            placeholder="Fuel description..."
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="fuel-management-modal-footer">
                                <button
                                    onClick={() => setShowFuelTypeModal(false)}
                                    className="fuel-management-btn fuel-management-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveFuelType}
                                    className="fuel-management-btn fuel-management-btn-primary"
                                    disabled={!newFuelType.name || !newFuelType.price || !newFuelType.unit}
                                >
                                    <Save className="fuel-management-icon" />
                                    Add Fuel Type
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
