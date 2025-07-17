import React, { useState } from 'react';
import './PitBlock.css';

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

// Types
interface PitBlockEntry {
    id: string;
    pitNo: string;
    benchNo: string;
    location: string;
    siteDirection: 'NORTH' | 'SOUTH' | 'EAST' | 'WEST' | '';
    reduceLevel: number;
    pattaHolderName: string;
    remarks: string;
    state: string;
    status: 'approved' | 'pending' | 'rejected';
    rgpApproved: boolean;
    nrgpApproved: boolean;
    rgpReturned: boolean;
    createdDate: string;
    modifiedDate: string;
}

export default function PitBlock() {
    const [activeTab, setActiveTab] = useState('entry');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedEntry, setSelectedEntry] = useState<PitBlockEntry | null>(null);

    // Sample pit/block entries data
    const [pitBlockEntries, setPitBlockEntries] = useState<PitBlockEntry[]>([
        {
            id: '14',
            pitNo: 'HELLO',
            benchNo: '22',
            location: '',
            siteDirection: '',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: true,
            rgpReturned: false,
            createdDate: '2025-07-15',
            modifiedDate: '2025-07-15'
        },
        {
            id: '13',
            pitNo: 'HELLO',
            benchNo: '8',
            location: '',
            siteDirection: '',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: false,
            rgpReturned: false,
            createdDate: '2025-07-14',
            modifiedDate: '2025-07-14'
        },
        {
            id: '12',
            pitNo: 'HELLO',
            benchNo: '1234',
            location: '',
            siteDirection: '',
            reduceLevel: 125.00,
            pattaHolderName: 'shub',
            remarks: 'dfef',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: true,
            rgpReturned: false,
            createdDate: '2025-07-13',
            modifiedDate: '2025-07-13'
        },
        {
            id: '11',
            pitNo: 'HELLO',
            benchNo: '6',
            location: '',
            siteDirection: 'NORTH',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'pending',
            rgpApproved: false,
            nrgpApproved: false,
            rgpReturned: false,
            createdDate: '2025-07-12',
            modifiedDate: '2025-07-12'
        },
        {
            id: '10',
            pitNo: 'HELLO',
            benchNo: '5',
            location: '',
            siteDirection: 'WEST',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'pending',
            rgpApproved: false,
            nrgpApproved: false,
            rgpReturned: false,
            createdDate: '2025-07-11',
            modifiedDate: '2025-07-11'
        },
        {
            id: '9',
            pitNo: 'HELLO',
            benchNo: '1',
            location: '',
            siteDirection: 'EAST',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: true,
            rgpReturned: false,
            createdDate: '2025-07-10',
            modifiedDate: '2025-07-10'
        },
        {
            id: '8',
            pitNo: 'HH',
            benchNo: '1',
            location: 'JAIPUR',
            siteDirection: '',
            reduceLevel: 125.00,
            pattaHolderName: 'shubham',
            remarks: 'DG',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: true,
            rgpReturned: false,
            createdDate: '2025-07-09',
            modifiedDate: '2025-07-09'
        },
        {
            id: '7',
            pitNo: 'HH',
            benchNo: '3',
            location: '',
            siteDirection: 'WEST',
            reduceLevel: 0.00,
            pattaHolderName: '',
            remarks: '',
            state: 'Rajasthan',
            status: 'rejected',
            rgpApproved: false,
            nrgpApproved: false,
            rgpReturned: true,
            createdDate: '2025-07-08',
            modifiedDate: '2025-07-08'
        },
        {
            id: '6',
            pitNo: 'TESTING',
            benchNo: '25',
            location: '',
            siteDirection: 'NORTH',
            reduceLevel: 125.00,
            pattaHolderName: 'mani',
            remarks: 'ftgf',
            state: 'Rajasthan',
            status: 'approved',
            rgpApproved: true,
            nrgpApproved: true,
            rgpReturned: false,
            createdDate: '2025-07-07',
            modifiedDate: '2025-07-07'
        }
    ]);

    const [newEntry, setNewEntry] = useState<Partial<PitBlockEntry>>({
        pitNo: '',
        benchNo: '',
        location: '',
        siteDirection: '',
        reduceLevel: 0,
        pattaHolderName: '',
        remarks: '',
        state: 'Rajasthan',
        status: 'pending',
        rgpApproved: false,
        nrgpApproved: false,
        rgpReturned: false
    });

    // Filter functions
    const filteredEntries = pitBlockEntries.filter(entry => {
        const matchesSearch = searchTerm === '' ||
            entry.pitNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.benchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.pattaHolderName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Handle new entry creation
    const handleSaveEntry = () => {
        if (newEntry.pitNo && newEntry.benchNo) {
            const entryData: PitBlockEntry = {
                id: Date.now().toString(),
                pitNo: newEntry.pitNo,
                benchNo: newEntry.benchNo,
                location: newEntry.location || '',
                siteDirection: newEntry.siteDirection || '',
                reduceLevel: newEntry.reduceLevel || 0,
                pattaHolderName: newEntry.pattaHolderName || '',
                remarks: newEntry.remarks || '',
                state: newEntry.state || 'Rajasthan',
                status: newEntry.status || 'pending',
                rgpApproved: newEntry.rgpApproved || false,
                nrgpApproved: newEntry.nrgpApproved || false,
                rgpReturned: newEntry.rgpReturned || false,
                createdDate: new Date().toISOString().split('T')[0],
                modifiedDate: new Date().toISOString().split('T')[0]
            };

            setPitBlockEntries([entryData, ...pitBlockEntries]);
            setNewEntry({
                pitNo: '', benchNo: '', location: '', siteDirection: '',
                reduceLevel: 0, pattaHolderName: '', remarks: '', state: 'Rajasthan',
                status: 'pending', rgpApproved: false, nrgpApproved: false, rgpReturned: false
            });
            setShowAddModal(false);
        }
    };

    // Handle entry modification
    const handleModifyEntry = () => {
        if (selectedEntry && selectedEntry.pitNo && selectedEntry.benchNo) {
            const updatedEntries = pitBlockEntries.map(entry =>
                entry.id === selectedEntry.id
                    ? { ...selectedEntry, modifiedDate: new Date().toISOString().split('T')[0] }
                    : entry
            );
            setPitBlockEntries(updatedEntries);
            setSelectedEntry(null);
            setShowEditModal(false);
        }
    };

    // Handle approval actions
    const handleApproveRGP = (entryId: string) => {
        const updatedEntries = pitBlockEntries.map(entry =>
            entry.id === entryId
                ? { ...entry, rgpApproved: true, status: 'approved' as const, modifiedDate: new Date().toISOString().split('T')[0] }
                : entry
        );
        setPitBlockEntries(updatedEntries);
    };

    const handleApproveNRGP = (entryId: string) => {
        const updatedEntries = pitBlockEntries.map(entry =>
            entry.id === entryId
                ? { ...entry, nrgpApproved: true, modifiedDate: new Date().toISOString().split('T')[0] }
                : entry
        );
        setPitBlockEntries(updatedEntries);
    };

    const handleRGPReturn = (entryId: string) => {
        const updatedEntries = pitBlockEntries.map(entry =>
            entry.id === entryId
                ? { ...entry, rgpReturned: true, status: 'rejected' as const, modifiedDate: new Date().toISOString().split('T')[0] }
                : entry
        );
        setPitBlockEntries(updatedEntries);
    };

    // Calculate statistics
    const getTotalEntries = () => pitBlockEntries.length;
    const getApprovedEntries = () => pitBlockEntries.filter(e => e.status === 'approved').length;
    const getPendingEntries = () => pitBlockEntries.filter(e => e.status === 'pending').length;
    const getRejectedEntries = () => pitBlockEntries.filter(e => e.status === 'rejected').length;

    return (
        <div className="pit-block">
            {/* Header */}
            <div className="pit-block-header">
                <div className="pit-block-header-content">
                    <div className="pit-block-title-section">
                        <Mountain className="pit-block-header-icon" />
                        <div>
                            <h1 className="pit-block-title">Pit/Block Management</h1>
                            <p className="pit-block-subtitle">
                                Manage pit/river and bench/gate master details with approval workflows
                            </p>
                        </div>
                    </div>
                    <div className="pit-block-header-actions">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="pit-block-btn pit-block-btn-primary"
                        >
                            <Plus className="pit-block-icon" />
                            Add New Entry
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="pit-block-main">
                {/* Tab Navigation */}
                <div className="pit-block-tabs">
                    <div className="pit-block-tabs-container">
                        <nav className="pit-block-tabs-nav">
                            <div className="pit-block-tabs-list">
                                <button
                                    onClick={() => setActiveTab('entry')}
                                    className={`pit-block-tab ${activeTab === 'entry' ? 'active' : ''}`}
                                >
                                    <Plus className="pit-block-tab-icon" />
                                    Entry & Management
                                </button>
                                <button
                                    onClick={() => setActiveTab('list')}
                                    className={`pit-block-tab ${activeTab === 'list' ? 'active' : ''}`}
                                >
                                    <List className="pit-block-tab-icon" />
                                    Records List
                                </button>
                                <button
                                    onClick={() => setActiveTab('reports')}
                                    className={`pit-block-tab ${activeTab === 'reports' ? 'active' : ''}`}
                                >
                                    <BarChart3 className="pit-block-tab-icon" />
                                    Reports
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="pit-block-content">
                    {/* Entry & Management Tab */}
                    {activeTab === 'entry' && (
                        <div className="pit-block-tab-content">
                            <div className="pit-block-section-header">
                                <div>
                                    <h2 className="pit-block-section-title">Pit/River - Bench/Gate Master Details Entry</h2>
                                    <p className="pit-block-section-subtitle">
                                        Enter and manage pit/block information with approval workflows
                                    </p>
                                </div>
                            </div>

                            {/* Statistics Cards */}
                            <div className="pit-block-grid pit-block-grid-cols-1 pit-block-md-grid-cols-4 pit-block-gap-6 pit-block-mb-6">
                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <div className="pit-block-flex pit-block-items-center">
                                            <div className="pit-block-stat-icon pit-block-stat-icon-blue">
                                                <List className="pit-block-icon" />
                                            </div>
                                            <div>
                                                <p className="pit-block-text-sm pit-block-text-gray-600">Total Entries</p>
                                                <p className="pit-block-text-2xl pit-block-font-bold">{getTotalEntries()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <div className="pit-block-flex pit-block-items-center">
                                            <div className="pit-block-stat-icon pit-block-stat-icon-green">
                                                <CheckCircle className="pit-block-icon" />
                                            </div>
                                            <div>
                                                <p className="pit-block-text-sm pit-block-text-gray-600">Approved</p>
                                                <p className="pit-block-text-2xl pit-block-font-bold">{getApprovedEntries()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <div className="pit-block-flex pit-block-items-center">
                                            <div className="pit-block-stat-icon pit-block-stat-icon-yellow">
                                                <ArrowUpCircle className="pit-block-icon" />
                                            </div>
                                            <div>
                                                <p className="pit-block-text-sm pit-block-text-gray-600">Pending</p>
                                                <p className="pit-block-text-2xl pit-block-font-bold">{getPendingEntries()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <div className="pit-block-flex pit-block-items-center">
                                            <div className="pit-block-stat-icon pit-block-stat-icon-purple">
                                                <XCircle className="pit-block-icon" />
                                            </div>
                                            <div>
                                                <p className="pit-block-text-sm pit-block-text-gray-600">Rejected</p>
                                                <p className="pit-block-text-2xl pit-block-font-bold">{getRejectedEntries()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Entry Form */}
                            <div className="pit-block-form-section">
                                <h3 className="pit-block-form-title">
                                    <Plus className="pit-block-icon" />
                                    Quick Entry Form
                                </h3>

                                <div className="pit-block-form-grid">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Pit / Block No/River</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.pitNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, pitNo: e.target.value })}
                                            placeholder="Enter pit/block number"
                                        />
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Bench No/Gate</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.benchNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, benchNo: e.target.value })}
                                            placeholder="Enter bench/gate number"
                                        />
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Select State</label>
                                        <select
                                            className="pit-block-select"
                                            value={newEntry.state || 'Rajasthan'}
                                            onChange={(e) => setNewEntry({ ...newEntry, state: e.target.value })}
                                        >
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Odisha">Odisha</option>
                                        </select>
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">RL (Reduce Level in Mtrs)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="pit-block-input"
                                            value={newEntry.reduceLevel || 0}
                                            onChange={(e) => setNewEntry({ ...newEntry, reduceLevel: parseFloat(e.target.value) || 0 })}
                                            placeholder="0.00"
                                        />
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Location</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.location || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                                            placeholder="Enter location"
                                        />
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Site Direction</label>
                                        <select
                                            className="pit-block-select"
                                            value={newEntry.siteDirection || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, siteDirection: e.target.value as any })}
                                        >
                                            <option value="">Select Direction</option>
                                            <option value="NORTH">NORTH</option>
                                            <option value="SOUTH">SOUTH</option>
                                            <option value="EAST">EAST</option>
                                            <option value="WEST">WEST</option>
                                        </select>
                                    </div>

                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Patta Holder Name</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.pattaHolderName || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, pattaHolderName: e.target.value })}
                                            placeholder="Enter patta holder name"
                                        />
                                    </div>

                                    <div className="pit-block-form-group pit-block-form-group-full">
                                        <label className="pit-block-label">Remarks</label>
                                        <textarea
                                            className="pit-block-textarea"
                                            rows={3}
                                            value={newEntry.remarks || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, remarks: e.target.value })}
                                            placeholder="Enter remarks"
                                        />
                                    </div>
                                </div>

                                <div className="pit-block-flex pit-block-gap-4">
                                    <button
                                        onClick={handleSaveEntry}
                                        className="pit-block-btn pit-block-btn-primary"
                                        disabled={!newEntry.pitNo || !newEntry.benchNo}
                                    >
                                        <Save className="pit-block-icon" />
                                        Save River/Pit Details
                                    </button>
                                    <button
                                        onClick={() => setNewEntry({
                                            pitNo: '', benchNo: '', location: '', siteDirection: '',
                                            reduceLevel: 0, pattaHolderName: '', remarks: '', state: 'Rajasthan',
                                            status: 'pending', rgpApproved: false, nrgpApproved: false, rgpReturned: false
                                        })}
                                        className="pit-block-btn pit-block-btn-secondary"
                                    >
                                        Clear Form
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Records List Tab */}
                    {activeTab === 'list' && (
                        <div className="pit-block-tab-content">
                            <div className="pit-block-section-header">
                                <div>
                                    <h2 className="pit-block-section-title">Pit/Block Records</h2>
                                    <p className="pit-block-section-subtitle">
                                        View and manage all pit/block entries with approval actions
                                    </p>
                                </div>
                            </div>

                            {/* Search and Filters */}
                            <div className="pit-block-filters">
                                <div className="pit-block-search-container">
                                    <Search className="pit-block-search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search by pit no, bench no, location, or patta holder..."
                                        className="pit-block-search-input"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <select
                                    className="pit-block-select"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={{ minWidth: '150px' }}
                                >
                                    <option value="all">All Status</option>
                                    <option value="approved">Approved</option>
                                    <option value="pending">Pending</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            {/* Records Table */}
                            <div className="pit-block-table-container">
                                <table className="pit-block-table">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Pit No</th>
                                            <th>Bench No</th>
                                            <th>Location</th>
                                            <th>Site Dir</th>
                                            <th>Red Lvl</th>
                                            <th>Patta Holder Name</th>
                                            <th>Remarks</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredEntries.map((entry) => (
                                            <tr key={entry.id}>
                                                <td>{entry.id}</td>
                                                <td className="pit-block-font-medium">{entry.pitNo}</td>
                                                <td>{entry.benchNo}</td>
                                                <td>{entry.location}</td>
                                                <td>{entry.siteDirection}</td>
                                                <td>{entry.reduceLevel.toFixed(2)}</td>
                                                <td>{entry.pattaHolderName}</td>
                                                <td>{entry.remarks}</td>
                                                <td>
                                                    <span className={`pit-block-badge pit-block-badge-${entry.status}`}>
                                                        {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className="pit-block-flex pit-block-gap-1">
                                                        {entry.status === 'pending' && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleApproveRGP(entry.id)}
                                                                    className="pit-block-btn-icon"
                                                                    title="Approve RGP"
                                                                    disabled={entry.rgpApproved}
                                                                >
                                                                    <CheckCircle className={`pit-block-icon-sm ${entry.rgpApproved ? 'pit-block-text-green-600' : ''}`} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleApproveNRGP(entry.id)}
                                                                    className="pit-block-btn-icon"
                                                                    title="Approve NRGP"
                                                                    disabled={entry.nrgpApproved}
                                                                >
                                                                    <CheckCircle className={`pit-block-icon-sm ${entry.nrgpApproved ? 'pit-block-text-green-600' : ''}`} />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleRGPReturn(entry.id)}
                                                                    className="pit-block-btn-icon pit-block-btn-icon-danger"
                                                                    title="RGP Return"
                                                                >
                                                                    <ArrowUpCircle className="pit-block-icon-sm" />
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedEntry(entry);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="pit-block-btn-icon"
                                                            title="Modify Details"
                                                        >
                                                            <Edit3 className="pit-block-icon-sm" />
                                                        </button>
                                                    </div>
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
                                            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                                                <Mountain className="pit-block-text-gray-600" />
                                            </div>
                                            <h3 className="pit-block-text-lg pit-block-font-medium pit-block-text-gray-600">
                                                No entries found
                                            </h3>
                                            <p className="pit-block-text-sm pit-block-text-gray-600">
                                                {searchTerm || filterStatus !== 'all'
                                                    ? 'Try adjusting your search or filter criteria'
                                                    : 'Create your first pit/block entry to get started'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Reports Tab */}
                    {activeTab === 'reports' && (
                        <div className="pit-block-tab-content">
                            <div className="pit-block-section-header">
                                <div>
                                    <h2 className="pit-block-section-title">Reports & Analytics</h2>
                                    <p className="pit-block-section-subtitle">
                                        View comprehensive reports and analytics for pit/block management
                                    </p>
                                </div>
                                <button className="pit-block-btn pit-block-btn-secondary">
                                    <Download className="pit-block-icon" />
                                    Export Report
                                </button>
                            </div>

                            {/* Summary Cards */}
                            <div className="pit-block-grid pit-block-grid-cols-1 pit-block-md-grid-cols-4 pit-block-gap-6 pit-block-mb-6">
                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <h3 className="pit-block-font-semibold pit-block-mb-4">Status Distribution</h3>
                                        <div className="pit-block-space-y-2">
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>Approved:</span>
                                                <span className="pit-block-font-medium">{getApprovedEntries()}</span>
                                            </div>
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>Pending:</span>
                                                <span className="pit-block-font-medium">{getPendingEntries()}</span>
                                            </div>
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>Rejected:</span>
                                                <span className="pit-block-font-medium">{getRejectedEntries()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <h3 className="pit-block-font-semibold pit-block-mb-4">RGP Statistics</h3>
                                        <div className="pit-block-space-y-2">
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>RGP Approved:</span>
                                                <span className="pit-block-font-medium">{pitBlockEntries.filter(e => e.rgpApproved).length}</span>
                                            </div>
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>NRGP Approved:</span>
                                                <span className="pit-block-font-medium">{pitBlockEntries.filter(e => e.nrgpApproved).length}</span>
                                            </div>
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>RGP Returned:</span>
                                                <span className="pit-block-font-medium">{pitBlockEntries.filter(e => e.rgpReturned).length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <h3 className="pit-block-font-semibold pit-block-mb-4">Location Analysis</h3>
                                        <div className="pit-block-space-y-2">
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>With Location:</span>
                                                <span className="pit-block-font-medium">{pitBlockEntries.filter(e => e.location.trim() !== '').length}</span>
                                            </div>
                                            <div className="pit-block-flex pit-block-justify-between">
                                                <span>Without Location:</span>
                                                <span className="pit-block-font-medium">{pitBlockEntries.filter(e => e.location.trim() === '').length}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pit-block-card">
                                    <div className="pit-block-card-content">
                                        <h3 className="pit-block-font-semibold pit-block-mb-4">Direction Distribution</h3>
                                        <div className="pit-block-space-y-2">
                                            {['NORTH', 'SOUTH', 'EAST', 'WEST'].map(direction => (
                                                <div key={direction} className="pit-block-flex pit-block-justify-between">
                                                    <span>{direction}:</span>
                                                    <span className="pit-block-font-medium">
                                                        {pitBlockEntries.filter(e => e.siteDirection === direction).length}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Entry Modal */}
            {showAddModal && (
                <div className="pit-block-modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="pit-block-modal pit-block-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="pit-block-modal-header">
                            <h3 className="pit-block-modal-title">Add New Pit/Block Entry</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="pit-block-modal-close"
                            >
                                ×
                            </button>
                        </div>
                        <div className="pit-block-modal-content">
                            <div className="pit-block-space-y-4">
                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Pit / Block No/River *</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.pitNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, pitNo: e.target.value })}
                                            placeholder="Enter pit/block number"
                                        />
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Bench No/Gate *</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.benchNo || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, benchNo: e.target.value })}
                                            placeholder="Enter bench/gate number"
                                        />
                                    </div>
                                </div>

                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Select State</label>
                                        <select
                                            className="pit-block-select"
                                            value={newEntry.state || 'Rajasthan'}
                                            onChange={(e) => setNewEntry({ ...newEntry, state: e.target.value })}
                                        >
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Odisha">Odisha</option>
                                        </select>
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">RL (Reduce Level in Mtrs)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="pit-block-input"
                                            value={newEntry.reduceLevel || 0}
                                            onChange={(e) => setNewEntry({ ...newEntry, reduceLevel: parseFloat(e.target.value) || 0 })}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Location</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={newEntry.location || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                                            placeholder="Enter location"
                                        />
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Site Direction</label>
                                        <select
                                            className="pit-block-select"
                                            value={newEntry.siteDirection || ''}
                                            onChange={(e) => setNewEntry({ ...newEntry, siteDirection: e.target.value as any })}
                                        >
                                            <option value="">Select Direction</option>
                                            <option value="NORTH">NORTH</option>
                                            <option value="SOUTH">SOUTH</option>
                                            <option value="EAST">EAST</option>
                                            <option value="WEST">WEST</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pit-block-form-group">
                                    <label className="pit-block-label">Patta Holder Name</label>
                                    <input
                                        type="text"
                                        className="pit-block-input"
                                        value={newEntry.pattaHolderName || ''}
                                        onChange={(e) => setNewEntry({ ...newEntry, pattaHolderName: e.target.value })}
                                        placeholder="Enter patta holder name"
                                    />
                                </div>

                                <div className="pit-block-form-group">
                                    <label className="pit-block-label">Remarks</label>
                                    <textarea
                                        className="pit-block-textarea"
                                        rows={3}
                                        value={newEntry.remarks || ''}
                                        onChange={(e) => setNewEntry({ ...newEntry, remarks: e.target.value })}
                                        placeholder="Enter remarks"
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
                                onClick={handleSaveEntry}
                                className="pit-block-btn pit-block-btn-primary"
                                disabled={!newEntry.pitNo || !newEntry.benchNo}
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
                            <div className="pit-block-space-y-4">
                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Pit / Block No/River *</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={selectedEntry.pitNo}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, pitNo: e.target.value })}
                                            placeholder="Enter pit/block number"
                                        />
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Bench No/Gate *</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={selectedEntry.benchNo}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, benchNo: e.target.value })}
                                            placeholder="Enter bench/gate number"
                                        />
                                    </div>
                                </div>

                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Select State</label>
                                        <select
                                            className="pit-block-select"
                                            value={selectedEntry.state}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, state: e.target.value })}
                                        >
                                            <option value="Rajasthan">Rajasthan</option>
                                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                                            <option value="Chhattisgarh">Chhattisgarh</option>
                                            <option value="Jharkhand">Jharkhand</option>
                                            <option value="Odisha">Odisha</option>
                                        </select>
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">RL (Reduce Level in Mtrs)</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="pit-block-input"
                                            value={selectedEntry.reduceLevel}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, reduceLevel: parseFloat(e.target.value) || 0 })}
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="pit-block-form-group-row">
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Location</label>
                                        <input
                                            type="text"
                                            className="pit-block-input"
                                            value={selectedEntry.location}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, location: e.target.value })}
                                            placeholder="Enter location"
                                        />
                                    </div>
                                    <div className="pit-block-form-group">
                                        <label className="pit-block-label">Site Direction</label>
                                        <select
                                            className="pit-block-select"
                                            value={selectedEntry.siteDirection}
                                            onChange={(e) => setSelectedEntry({ ...selectedEntry, siteDirection: e.target.value as any })}
                                        >
                                            <option value="">Select Direction</option>
                                            <option value="NORTH">NORTH</option>
                                            <option value="SOUTH">SOUTH</option>
                                            <option value="EAST">EAST</option>
                                            <option value="WEST">WEST</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pit-block-form-group">
                                    <label className="pit-block-label">Patta Holder Name</label>
                                    <input
                                        type="text"
                                        className="pit-block-input"
                                        value={selectedEntry.pattaHolderName}
                                        onChange={(e) => setSelectedEntry({ ...selectedEntry, pattaHolderName: e.target.value })}
                                        placeholder="Enter patta holder name"
                                    />
                                </div>

                                <div className="pit-block-form-group">
                                    <label className="pit-block-label">Remarks</label>
                                    <textarea
                                        className="pit-block-textarea"
                                        rows={3}
                                        value={selectedEntry.remarks}
                                        onChange={(e) => setSelectedEntry({ ...selectedEntry, remarks: e.target.value })}
                                        placeholder="Enter remarks"
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
                                disabled={!selectedEntry.pitNo || !selectedEntry.benchNo}
                            >
                                <Save className="pit-block-icon" />
                                Modify Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
