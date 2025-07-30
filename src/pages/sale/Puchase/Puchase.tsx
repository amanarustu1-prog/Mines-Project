import React, { useState, useEffect } from 'react';
import './Puchase.css';

// Icon components
const Mountain = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7h14l-7 7-7-7z" />
    </svg>
);

const MapPin = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

const CheckCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const XCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ArrowUpCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
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



interface PurchaseEntry {
    id: string;
    purchaseNo: string;
    date: string;
    lease: string;
    vehicleNo: string;
    driver: string;
    driverNo: string;
    vehicleType: string;
    tareWgt: number;
    grossWgt: number;
    netWgt: number;
    freightAmt: number;
    rate: number;
    totalAmt: number;
    mineralName: string;
}

const Purchase: React.FC = () => {
    const [activeTab, setActiveTab] = useState('entry');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
    const [selectedLease, setSelectedLease] = useState<string | null>(null);
    const [selectedEntry, setSelectedEntry] = useState<PurchaseEntry | null>(null);
    // Initialize with sample purchase entries
    const [dateRange, setDateRange] = useState({
        from: '',
        to: ''
    });

    const handleDateFilter = () => {
        // The filtering is now handled by the useEffect hook
        // This function is kept for the Apply Filter button click handler
    };

    const handleResetFilter = () => {
        setDateRange({ from: '', to: '' });
        // The useEffect will handle updating filteredEntries automatically
    };

    const [filteredEntries, setFilteredEntries] = useState<PurchaseEntry[]>([]);
    const [purchaseEntries, setPurchaseEntries] = useState<PurchaseEntry[]>([
        {
            id: '1',
            purchaseNo: 'PUR-2023-001',
            date: '2023-07-30',
            lease: 'L-1001',
            vehicleNo: 'RJ14AB1234',
            driver: 'Rajesh Kumar',
            driverNo: '9876543210',
            vehicleType: 'Truck',
            tareWgt: 12000,
            grossWgt: 32000,
            netWgt: 20000,
            freightAmt: 1500,
            rate: 2.5,
            totalAmt: 51500,
            mineralName: 'Sandstone'
        },
        {
            id: '2',
            purchaseNo: 'PUR-2023-002',
            date: '2023-07-29',
            lease: 'L-1002',
            vehicleNo: 'RJ14CD5678',
            driver: 'Manoj Sharma',
            driverNo: '9876543211',
            vehicleType: 'Truck',
            tareWgt: 11800,
            grossWgt: 31800,
            netWgt: 20000,
            freightAmt: 1800,
            rate: 2.75,
            totalAmt: 56800,
            mineralName: 'Marble'
        },
        {
            id: '3',
            purchaseNo: 'PUR-2023-003',
            date: '2023-07-28',
            lease: 'L-1003',
            vehicleNo: 'RJ14EF9012',
            driver: 'Vikram Singh',
            driverNo: '9876543212',
            vehicleType: 'Truck',
            tareWgt: 12200,
            grossWgt: 32200,
            netWgt: 20000,
            freightAmt: 2000,
            rate: 3.0,
            totalAmt: 62000,
            mineralName: 'Granite'
        }
    ]);
    const [newPurchase, setNewPurchase] = useState<Partial<PurchaseEntry>>({
        purchaseNo: '',
        date: '',
        lease: '',
        vehicleNo: '',
        driver: '',
        driverNo: '',
        vehicleType: '',
        tareWgt: 0,
        grossWgt: 0,
        netWgt: 0,
        freightAmt: 0,
        rate: 0,
        totalAmt: 0,
        mineralName: '',
    });


    const [newEntry, setNewEntry] = useState<Partial<PurchaseEntry>>({
        purchaseNo: '',
        date: new Date().toISOString().split('T')[0],
        lease: '',
        vehicleNo: '',
        driver: '',
        driverNo: '',
        vehicleType: 'Truck',
        tareWgt: 0,
        grossWgt: 0,
        netWgt: 0,
        freightAmt: 0,
        rate: 0,
        totalAmt: 0,
        mineralName: 'Coal'
    });

    // Filter functions
    useEffect(() => {
        const filtered = purchaseEntries.filter(entry => {
            if (!entry) return false;

            // Search term filter
            const matchesSearch = searchTerm === '' ||
                (entry.purchaseNo && entry.purchaseNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (entry.vehicleNo && entry.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (entry.lease && entry.lease.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (entry.driver && entry.driver.toLowerCase().includes(searchTerm.toLowerCase()));

            // Vehicle filter
            const matchesVehicle = !selectedVehicle || entry.vehicleNo === selectedVehicle;

            // Lease filter
            const matchesLease = !selectedLease || entry.lease === selectedLease;

            // Date range filter
            let matchesDate = true;
            if (dateRange.from && dateRange.to) {
                const entryDate = new Date(entry.date);
                const fromDate = new Date(dateRange.from);
                const toDate = new Date(dateRange.to);
                matchesDate = entryDate >= fromDate && entryDate <= toDate;
            }

            return matchesSearch && matchesVehicle && matchesLease && matchesDate;
        });

        setFilteredEntries(filtered);
    }, [purchaseEntries, searchTerm, dateRange]);

    // Calculate net weight and total amount when tare, gross weight, rate, or freight amount changes
    const calculateNetAndTotal = (entry: Partial<PurchaseEntry>): Partial<PurchaseEntry> => {
        const tareWgt = Number(entry.tareWgt) || 0;
        const grossWgt = Number(entry.grossWgt) || 0;
        const rate = Number(entry.rate) || 0;
        const freightAmt = Number(entry.freightAmt) || 0;

        const netWgt = Math.max(0, grossWgt - tareWgt);
        const totalAmt = (netWgt * rate) + freightAmt;

        return {
            ...entry,
            netWgt: parseFloat(netWgt.toFixed(2)),
            totalAmt: parseFloat(totalAmt.toFixed(2))
        };
    };

    // Handle weight changes and recalculate
    const handleWeightChange = (field: keyof PurchaseEntry, value: number) => {
        const updatedEntry = { ...newEntry, [field]: value };
        const calculated = calculateNetAndTotal(updatedEntry);
        setNewEntry(calculated);
    };

    // Handle new entry creation
    const handleAddEntry = () => {
        if (!newEntry.purchaseNo || !newEntry.vehicleNo || !newEntry.lease) {
            alert('Please fill in all required fields (Purchase No, Vehicle No, and Lease)');
            return;
        }

        const entry: PurchaseEntry = {
            id: Date.now().toString(),
            purchaseNo: newEntry.purchaseNo || '',
            date: newEntry.date || new Date().toISOString().split('T')[0],
            lease: newEntry.lease || '',
            vehicleNo: newEntry.vehicleNo || '',
            driver: newEntry.driver || '',
            driverNo: newEntry.driverNo || '',
            vehicleType: newEntry.vehicleType || 'Truck',
            tareWgt: newEntry.tareWgt || 0,
            grossWgt: newEntry.grossWgt || 0,
            netWgt: newEntry.netWgt || 0,
            rate: newEntry.rate || 0,
            freightAmt: newEntry.freightAmt || 0,
            totalAmt: newEntry.totalAmt || 0,
            mineralName: newEntry.mineralName || 'Coal',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setPurchaseEntries([...purchaseEntries, entry]);

        // Reset form
        setNewEntry({
            purchaseNo: '',
            date: new Date().toISOString().split('T')[0],
            lease: '',
            vehicleNo: '',
            driver: '',
            driverNo: '',
            vehicleType: 'Truck',
            tareWgt: 0,
            grossWgt: 0,
            netWgt: 0,
            rate: 0,
            freightAmt: 0,
            totalAmt: 0,
            mineralName: 'Coal',
        });

        setShowAddModal(false);
    };

    // Handle edit button click
    const handleEdit = (entry: PurchaseEntry) => {
        setSelectedEntry(entry);
        setShowEditModal(true);
    };

    // Handle entry modification
    const handleModifyEntry = () => {
        if (!selectedEntry) return;

        const updatedEntry = {
            ...selectedEntry,
            updatedAt: new Date().toISOString(),
            ...calculateNetAndTotal(selectedEntry)
        };

        const updatedEntries = purchaseEntries.map(entry =>
            entry.id === selectedEntry.id ? updatedEntry : entry
        );

        setPurchaseEntries(updatedEntries);
        setSelectedEntry(null);
        setShowEditModal(false);
    };

    // Handle delete entry
    const handleDelete = (entryId: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            setPurchaseEntries(purchaseEntries.filter(entry => entry.id !== entryId));
        }
    };

    // Calculate statistics
    const getTotalEntries = () => purchaseEntries.length;
    const getTotalNetWeight = () => purchaseEntries.reduce((sum, entry) => sum + (entry.netWgt || 0), 0);
    const getTotalAmount = () => purchaseEntries.reduce((sum, entry) => sum + (entry.totalAmt || 0), 0);

    return (
        <>
            <div className="purchase-container">
                {/* Header */}
                {/* <div className="pit-block-header lg:mt-[4.5rem]">
                    <div className="puchase-header-content" style={{ background: 'rgba(255, 255, 255, 0.95)', color: 'black', padding: '0.85rem', backdropFilter: 'blur(10px)', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <div className="pit-block-title-section">
                            <Mountain className="pit-block-header-icon" />
                            <div>
                                <h1 className="pit-block-title">Purchase</h1>
                                <p className="pit-block-subtitle">
                                    Manage pit/river and bench/gate master details with approval workflows
                                </p>
                            </div>
                        </div>

                    </div>
                </div> */}

                {/* Main Content */}
                <div className="pit-block-main">




                    <div className="pit-block-tab-content p-0 mt-[4.5rem]">


                        {/* Search and Filters */}
                        <div className="pit-block-filters flex flex-wrap gap-4 mb-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">From Date:</label>
                                <input
                                    type="date"
                                    className="p-2 border border-gray-300 rounded-md text-sm min-w-[300px]"
                                    value={dateRange.from}
                                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">To Date:</label>
                                <input
                                    type="date"
                                    className="p-2 border border-gray-300 rounded-md text-sm min-w-[300px]"
                                    value={dateRange.to}
                                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                                    min={dateRange.from}
                                />
                            </div>

                            {/* Vehicle No Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Vehicle No:</label>
                                <select
                                    className="p-2 border border-gray-300 rounded-md text-sm min-w-[300px]"
                                    value={selectedVehicle || ''}
                                    onChange={(e) => setSelectedVehicle(e.target.value || null)}
                                >
                                    <option value="">All Vehicles</option>
                                    {Array.from(new Set(purchaseEntries.map(entry => entry.vehicleNo))).map((vehicle, index) => (
                                        <option key={index} value={vehicle}>{vehicle}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Lease Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700 whitespace-nowrap min-w-[70px] text-right">Lease:</label>
                                <select
                                    className="p-2 border border-gray-300 rounded-md text-sm min-w-[300px]"
                                    value={selectedLease || ''}
                                    onChange={(e) => setSelectedLease(e.target.value || null)}
                                >
                                    <option value="">All Leases</option>
                                    {Array.from(new Set(purchaseEntries.map(entry => entry.lease))).map((lease, index) => (
                                        <option key={index} value={lease}>{lease}</option>
                                    ))}
                                </select>
                            </div>


                            <div className="pit-block-header-actions ml-auto">
                                <button
                                    onClick={() => setShowAddModal(true)}
                                    className="pit-block-btn pit-block-btn-primary"
                                >
                                    <Plus className="pit-block-icon" />
                                    Add New Entry
                                </button>
                            </div>


                            {/* Lease dropdown is already implemented above */}
                        </div>

                    </div>




                    {/* Records Table */}
                    <div className="pit-block-table-container overflow-x-auto overflow-y-hidden max-h-[calc(100vh-300px)]">
                        <table className="pit-block-table">
                            <thead>
                                <tr>
                                    <th>Purchase No</th>
                                    <th>Date</th>
                                    <th>Lease</th>
                                    <th>Vehicle No</th>
                                    <th>Driver</th>
                                    <th>Vehicle Type</th>
                                    <th>Mineral</th>
                                    <th>Tare (kg)</th>
                                    <th>Gross (kg)</th>
                                    <th>Net (kg)</th>
                                    <th>Rate (₹/kg)</th>
                                    <th>Freight (₹)</th>
                                    <th>Total (₹)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td className="font-medium">{entry.purchaseNo}</td>
                                        <td>{entry.date}</td>
                                        <td>{entry.lease}</td>
                                        <td>{entry.vehicleNo}</td>
                                        <td>{entry.driver}</td>
                                        <td>{entry.vehicleType}</td>
                                        <td>{entry.mineralName}</td>
                                        <td className="text-right">{entry.tareWgt.toLocaleString()}</td>
                                        <td className="text-right">{entry.grossWgt.toLocaleString()}</td>
                                        <td className="text-right font-medium">
                                            {entry.netWgt.toLocaleString()}
                                        </td>
                                        <td className="text-right">{entry.rate.toLocaleString()}</td>
                                        <td className="text-right">{entry.freightAmt.toLocaleString()}</td>
                                        <td className="text-right font-bold">
                                            ₹{entry.totalAmt.toLocaleString()}
                                        </td>
                                        <td className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(entry)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Edit"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(entry.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>


                    {filteredEntries.length === 0 && (
                        <div className="pit-block-card">
                            <div className="pit-block-card-content">
                                <div style={{ textAlign: 'center', padding: '3rem' }}>

                                    <h3 className="pit-block-text-lg pit-block-font-medium pit-block-text-gray-600">
                                        No entries found
                                    </h3>
                                    <p className="pit-block-text-sm pit-block-text-gray-600">
                                        {searchTerm || selectedVehicle || selectedLease || dateRange.from || dateRange.to
                                            ? 'Try adjusting your search or filter criteria'
                                            : 'No purchase entries found. Click "Add New Entry" to get started.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>







                {/* Add Entry Modal */}
                {showAddModal && (
                    <div className="pit-block-modal-overlay" onClick={() => setShowAddModal(false)}>
                        <div className="pit-block-modal pit-block-modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="pit-block-modal-header">
                                <h3 className="pit-block-modal-title">Add New Purchase Entry</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="pit-block-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="pit-block-modal-content">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase No *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.purchaseNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, purchaseNo: e.target.value })}
                                            placeholder="Enter purchase number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.date || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lease *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.lease || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, lease: e.target.value })}
                                            placeholder="Enter lease number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mineral Name</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.mineralName || 'Coal'}
                                            onChange={(e) => setNewEntry({ ...newEntry, mineralName: e.target.value })}
                                        >
                                            <option value="Coal">Coal</option>
                                            <option value="Iron Ore">Iron Ore</option>
                                            <option value="Bauxite">Bauxite</option>
                                            <option value="Limestone">Limestone</option>
                                            <option value="Manganese">Manganese</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle No *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.vehicleNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, vehicleNo: e.target.value })}
                                            placeholder="Enter vehicle number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.driver || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, driver: e.target.value })}
                                            placeholder="Enter driver name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver Contact</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.driverNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, driverNo: e.target.value })}
                                            placeholder="Enter driver contact number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.vehicleType || 'Truck'}
                                            onChange={(e) => setNewEntry({ ...newEntry, vehicleType: e.target.value })}
                                        >
                                            <option value="Truck">Truck</option>
                                            <option value="Dumper">Dumper</option>
                                            <option value="Tanker">Tanker</option>
                                            <option value="Trailer">Trailer</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tare Weight (kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.tareWgt || ''}
                                            onChange={(e) => handleWeightChange('tareWgt', parseFloat(e.target.value) || 0)}
                                            placeholder="Enter tare weight"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gross Weight (kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.grossWgt || ''}
                                            onChange={(e) => handleWeightChange('grossWgt', parseFloat(e.target.value) || 0)}
                                            placeholder="Enter gross weight"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight (kg)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                            value={newEntry.netWgt || 0}
                                            readOnly
                                            placeholder="Calculated automatically"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹/kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.rate || ''}
                                            onChange={(e) => handleWeightChange('rate', parseFloat(e.target.value) || 0)}
                                            placeholder="Enter rate per kg"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Freight Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.freightAmt || ''}
                                            onChange={(e) => handleWeightChange('freightAmt', parseFloat(e.target.value) || 0)}
                                            placeholder="Enter freight amount"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 font-bold"
                                            value={newEntry.totalAmt || 0}
                                            readOnly
                                            placeholder="Calculated automatically"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pit-block-modal-footer">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="pit-block-btn pit-block-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddEntry}
                                    className="pit-block-btn pit-block-btn-primary"
                                    disabled={!newEntry.purchaseNo || !newEntry.vehicleNo || !newEntry.lease}
                                >
                                    <Save className="pit-block-icon" />
                                    Save Entry
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Entry Modal */}
                {showEditModal && selectedEntry && (
                    <div className="pit-block-modal-overlay" onClick={() => setShowEditModal(false)}>
                        <div className="pit-block-modal pit-block-modal-lg" onClick={(e) => e.stopPropagation()}>
                            <div className="pit-block-modal-header">
                                <h3 className="pit-block-modal-title">Modify Entry Details</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="pit-block-modal-close"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="pit-block-modal-content">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase No *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.purchaseNo || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, purchaseNo: e.target.value })}
                                            placeholder="Enter purchase number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                                        <input
                                            type="date"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.date || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, date: e.target.value })}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lease *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.lease || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, lease: e.target.value })}
                                            placeholder="Enter lease number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mineral Name</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.mineralName || 'Coal'}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, mineralName: e.target.value })}
                                        >
                                            <option value="Coal">Coal</option>
                                            <option value="Iron Ore">Iron Ore</option>
                                            <option value="Bauxite">Bauxite</option>
                                            <option value="Limestone">Limestone</option>
                                            <option value="Manganese">Manganese</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle No *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.vehicleNo || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, vehicleNo: e.target.value })}
                                            placeholder="Enter vehicle number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.driver || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, driver: e.target.value })}
                                            placeholder="Enter driver name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Driver Contact</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.driverNo || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, driverNo: e.target.value })}
                                            placeholder="Enter driver contact number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.vehicleType || 'Truck'}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, vehicleType: e.target.value })}
                                        >
                                            <option value="Truck">Truck</option>
                                            <option value="Dumper">Dumper</option>
                                            <option value="Tanker">Tanker</option>
                                            <option value="Trailer">Trailer</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tare Weight (kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.tareWgt || ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const updated = { ...selectedEntry, tareWgt: value };
                                                const calculated = calculateNetAndTotal(updated);
                                                setSelectedEntry(calculated);
                                            }}
                                            placeholder="Enter tare weight"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gross Weight (kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.grossWgt || ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const updated = { ...selectedEntry, grossWgt: value };
                                                const calculated = calculateNetAndTotal(updated);
                                                setSelectedEntry(calculated);
                                            }}
                                            placeholder="Enter gross weight"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Net Weight (kg)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                                            value={selectedEntry.netWgt || 0}
                                            readOnly
                                            placeholder="Calculated automatically"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹/kg) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.rate || ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const updated = { ...selectedEntry, rate: value };
                                                const calculated = calculateNetAndTotal(updated);
                                                setSelectedEntry(calculated);
                                            }}
                                            placeholder="Enter rate per kg"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Freight Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.freightAmt || ''}
                                            onChange={(e) => {
                                                const value = parseFloat(e.target.value) || 0;
                                                const updated = { ...selectedEntry, freightAmt: value };
                                                const calculated = calculateNetAndTotal(updated);
                                                setSelectedEntry(calculated);
                                            }}
                                            placeholder="Enter freight amount"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 font-bold"
                                            value={selectedEntry.totalAmt || 0}
                                            readOnly
                                            placeholder="Calculated automatically"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pit-block-modal-footer">
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="pit-block-btn pit-block-btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleModifyEntry}
                                    className="pit-block-btn pit-block-btn-primary"
                                    disabled={!selectedEntry.purchaseNo || !selectedEntry.vehicleNo || !selectedEntry.lease}
                                >
                                    <Save className="pit-block-icon" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Purchase;
