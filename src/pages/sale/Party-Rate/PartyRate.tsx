import React, { useState, useEffect } from 'react';
import './PartyRate.css';

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
    partyName: string;
    mobile: string;
    address: string;
    district: string;
    state: string;
    gst: string;
    product: string;
    challanRate: number;
    billRate: number;
    date: string;
    status: 'Active' | 'Inactive';
}

const PartyRate: React.FC = () => {
    const [activeTab, setActiveTab] = useState('entry');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [selectedEntry, setSelectedEntry] = useState<PurchaseEntry | null>(null);

    const [filteredEntries, setFilteredEntries] = useState<PurchaseEntry[]>([]);
    const [purchaseEntries, setPurchaseEntries] = useState<PurchaseEntry[]>([        
        // Sample data for Party Rate entries
        {
            id: '1',
            partyName: 'Shree Ganesh Minerals',
            mobile: '9876543210',
            address: '123, Industrial Area, Udaipur',
            district: 'Udaipur',
            state: 'Rajasthan',
            gst: '08AABCS1429B1Z1',
            product: 'Marble',
            challanRate: 4500,
            billRate: 5000,
            date: '2023-07-30',
            status: 'Active'
        },
        {
            id: '2',
            partyName: 'Agarwal Stone Industries',
            mobile: '8765432109',
            address: '456, RIICO, Kishangarh',
            district: 'Ajmer',
            state: 'Rajasthan',
            gst: '08AABCS1429B1Z2',
            product: 'Granite',
            challanRate: 5200,
            billRate: 5800,
            date: '2023-07-29',
            status: 'Active'
        },
        {
            id: '3',
            partyName: 'Mahaveer Minerals',
            mobile: '7654321098',
            address: '789, Makrana Road, Nagaur',
            district: 'Nagaur',
            state: 'Rajasthan',
            gst: '08AABCS1429B1Z3',
            product: 'Marble',
            challanRate: 4300,
            billRate: 4800,
            date: '2023-07-28',
            status: 'Inactive'
        },
        {
            id: '4',
            partyName: 'Shree Nath Mineral & Chemicals',
            mobile: '6543210987',
            address: '321, GIDC, Bhilwara',
            district: 'Bhilwara',
            state: 'Rajasthan',
            gst: '08AABCS1429B1Z4',
            product: 'Soapstone',
            challanRate: 3800,
            billRate: 4200,
            date: '2023-07-27',
            status: 'Active'
        },
        {
            id: '5',
            partyName: 'Shree Balaji Minerals',
            mobile: '5432109876',
            address: '159, Udaipur Road, Rajsamand',
            district: 'Rajsamand',
            state: 'Rajasthan',
            gst: '08AABCS1429B1Z5',
            product: 'Quartz',
            challanRate: 2800,
            billRate: 3200,
            date: '2023-07-26',
            status: 'Active'
        }
    ]);

    const [newEntry, setNewEntry] = useState<Partial<PurchaseEntry>>({
        partyName: '',
        mobile: '',
        address: '',
        district: '',
        state: '',
        gst: '',
        product: '',
        challanRate: 0,
        billRate: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'Active'
    });

    useEffect(() => {
        const filtered = purchaseEntries.filter(entry => {
            if (!entry) return false;

            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = searchTerm === '' ||
                (entry.partyName && entry.partyName.toLowerCase().includes(searchTermLower)) ||
                (entry.mobile && entry.mobile.includes(searchTermLower)) ||
                (entry.district && entry.district.toLowerCase().includes(searchTermLower)) ||
                (entry.state && entry.state.toLowerCase().includes(searchTermLower)) ||
                (entry.product && entry.product.toLowerCase().includes(searchTermLower)) ||
                (entry.gst && entry.gst.toLowerCase().includes(searchTermLower));

            const matchesState = !selectedState || entry.state === selectedState;

            const matchesProduct = !selectedProduct || entry.product === selectedProduct;

            let matchesDate = true;
            if (dateRange.from && dateRange.to) {
                const entryDate = new Date(entry.date);
                const fromDate = new Date(dateRange.from);
                const toDate = new Date(dateRange.to);
                matchesDate = entryDate >= fromDate && entryDate <= toDate;
            }

            return matchesSearch && matchesState && matchesProduct && matchesDate;
        });

        setFilteredEntries(filtered);
    }, [purchaseEntries, searchTerm, dateRange]);

    const handleAddEntry = () => {
        if (!newEntry.partyName || !newEntry.mobile || !newEntry.state || !newEntry.district || !newEntry.product || !newEntry.challanRate || !newEntry.billRate) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }

        const entry: PurchaseEntry = {
            id: Date.now().toString(),
            partyName: newEntry.partyName || '',
            mobile: newEntry.mobile || '',
            address: newEntry.address || '',
            district: newEntry.district || '',
            state: newEntry.state || '',
            gst: newEntry.gst || '',
            product: newEntry.product || '',
            challanRate: Number(newEntry.challanRate) || 0,
            billRate: Number(newEntry.billRate) || 0,
            date: newEntry.date || new Date().toISOString().split('T')[0],
            status: newEntry.status || 'Active',
        };

        setPurchaseEntries([...purchaseEntries, entry]);

        setNewEntry({
            partyName: '',
            mobile: '',
            address: '',
            district: '',
            state: '',
            gst: '',
            product: '',
            challanRate: 0,
            billRate: 0,
            date: new Date().toISOString().split('T')[0],
            status: 'Active'
        });

        setShowAddModal(false);
    };

    const handleEdit = (entry: PurchaseEntry) => {
        setSelectedEntry(entry);
        setShowEditModal(true);
    };

    const handleModifyEntry = () => {
        if (!selectedEntry) return;

        if (!selectedEntry.partyName || !selectedEntry.mobile || !selectedEntry.state || !selectedEntry.district || !selectedEntry.product || !selectedEntry.challanRate || !selectedEntry.billRate) {
            alert('Please fill in all required fields (marked with *)');
            return;
        }

        const updatedEntry = {
            ...selectedEntry,
        };

        const updatedEntries = purchaseEntries.map(entry =>
            entry.id === selectedEntry.id ? updatedEntry : entry
        );

        setPurchaseEntries(updatedEntries);
        setSelectedEntry(null);
        setShowEditModal(false);
    };

    const handleDelete = (entryId: string) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            setPurchaseEntries(purchaseEntries.filter(entry => entry.id !== entryId));
        }
    };

    return (
        <>
            <div className="purchase-container">
                {/* <div className="pit-block-header lg:mt-[4.5rem]">
                    <div className="puchase-header-content" style={{ background: 'rgba(255, 255, 255, 0.95)', color: 'black', padding: '0.85rem', backdropFilter: 'blur(10px)', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                        <div className="pit-block-title-section">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 7h14l-7 7-7-7z"/></svg>
                            <div>
                                <h1 className="pit-block-title">Party Rate</h1>
                                <p className="pit-block-subtitle">
                                    Manage pit/river and bench/gate master details with approval workflows
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="pit-block-main mt-[4.5rem]">
                    <div className="pit-block-tab-content p-0">
                        <div className="pit-block-header-actions ml-auto flex items-center gap-2 justify-end mb-2">
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="pit-block-btn pit-block-btn-primary"
                            >
                                <Plus className="pit-block-icon" />
                                Add New Entry
                            </button>
                        </div>
                    </div>

                    <div className="pit-block-table-container overflow-x-auto overflow-y-hidden max-h-[calc(100vh-300px)]">
                        <table className="pit-block-table">
                            <thead>
                                <tr>
                                    <th className="text-left">Party Name</th>
                                    <th className="text-left">Mobile</th>
                                    <th className="text-left">State</th>
                                    <th className="text-left">District</th>
                                    <th className="text-left">Product</th>
                                    <th className="text-right">Challan Rate</th>
                                    <th className="text-right">Bill Rate</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.map((entry) => (
                                    <tr key={entry.id}>
                                        <td className="font-medium">{entry.partyName}</td>
                                        <td>{entry.mobile}</td>
                                        <td>{entry.state}</td>
                                        <td>{entry.district}</td>
                                        <td>{entry.product}</td>
                                        <td>₹{entry.challanRate?.toLocaleString()}</td>
                                        <td>₹{entry.billRate?.toLocaleString()}</td>
                                        <td className="text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                entry.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {entry.status}
                                            </span>
                                        </td>
                                        <td className="flex gap-2 justify-center">
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
                                        {searchTerm || selectedState || selectedProduct || dateRange.from || dateRange.to
                                            ? 'Try adjusting your search or filter criteria'
                                            : 'No purchase entries found. Click "Add New Entry" to get started.'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Party Name *</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.partyName || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, partyName: e.target.value })}
                                        >
                                            <option value="">Select Party</option>
                                            <option value="ABC Minerals">ABC Minerals</option>
                                            <option value="XYZ Enterprises">XYZ Enterprises</option>
                                            <option value="PQR Traders">PQR Traders</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.mobile || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, mobile: e.target.value })}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>

                                    <div className="form-group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.address || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, address: e.target.value })}
                                            placeholder="Enter complete address"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.district || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, district: e.target.value })}
                                            placeholder="Enter district"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.state || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, state: e.target.value })}
                                        >
                                            <option value="">Select State</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.gst || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, gst: e.target.value })}
                                            placeholder="Enter GST number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.product || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, product: e.target.value })}
                                        >
                                            <option value="">Select Product</option>
                                            <option value="Coal">Coal</option>
                                            <option value="Iron Ore">Iron Ore</option>
                                            <option value="Bauxite">Bauxite</option>
                                            <option value="Limestone">Limestone</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Challan Rate (₹/MT) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.challanRate || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, challanRate: parseFloat(e.target.value) || 0 })}
                                            placeholder="Enter challan rate"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bill Rate (₹/MT) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={newEntry.billRate || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, billRate: parseFloat(e.target.value) || 0 })}
                                            placeholder="Enter bill rate"
                                            step="0.01"
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
                                    disabled={
                                        !newEntry.partyName ||
                                        !newEntry.mobile ||
                                        !newEntry.state ||
                                        !newEntry.district ||
                                        !newEntry.product ||
                                        !newEntry.challanRate ||
                                        !newEntry.billRate
                                    }
                                >
                                    <Save className="pit-block-icon" />
                                    Save Entry
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Party Name *</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.partyName || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, partyName: e.target.value })}
                                            placeholder="Enter party name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.mobile || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, mobile: e.target.value })}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>

                                    <div className="form-group md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.address || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, address: e.target.value })}
                                            placeholder="Enter complete address"
                                            rows={2}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.district || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, district: e.target.value })}
                                            placeholder="Enter district"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.state || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, state: e.target.value })}
                                        >
                                            <option value="">Select State</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.gst || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, gst: e.target.value })}
                                            placeholder="Enter GST number"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Product *</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.product || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, product: e.target.value })}
                                        >
                                            <option value="">Select Product</option>
                                            <option value="Coal">Coal</option>
                                            <option value="Iron Ore">Iron Ore</option>
                                            <option value="Bauxite">Bauxite</option>
                                            <option value="Limestone">Limestone</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Challan Rate (₹/MT) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.challanRate || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, challanRate: parseFloat(e.target.value) || 0 })}
                                            placeholder="Enter challan rate"
                                            step="0.01"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bill Rate (₹/MT) *</label>
                                        <input
                                            type="number"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            value={selectedEntry.billRate || ''}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, billRate: parseFloat(e.target.value) || 0 })}
                                            placeholder="Enter bill rate"
                                            step="0.01"
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
                                    disabled={
                                        !selectedEntry.partyName ||
                                        !selectedEntry.mobile ||
                                        !selectedEntry.state ||
                                        !selectedEntry.district ||
                                        !selectedEntry.product ||
                                        !selectedEntry.challanRate ||
                                        !selectedEntry.billRate
                                    }
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

export default PartyRate;
