import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const Car = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h3m-1 4h6m4 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2.5M7 10H5a2 2 0 00-2 2v8a2 2 0 002 2h2m3 0h6m-6 0v-4m0 4v4m6-4v4m0 0h2a2 2 0 002-2v-8a2 2 0 00-2-2h-2.5" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Filter = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

const ToggleLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ToggleRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

interface ListItem {
    id: number;
    code: string;
    description: string;
    isActive: boolean;
    createdDate: string;
    lastModified: string;
}

export default function VehicleType() {
    const [activeTab, setActiveTab] = useState('list-overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);

    // Sample list data
    const [listData, setListData] = useState<ListItem[]>([
        {
            id: 1,
            code: 'DEPT001',
            description: 'Human Resources Department',
            isActive: true,
            createdDate: '2025-01-10',
            lastModified: '2025-07-15'
        },
        {
            id: 2,
            code: 'DEPT002',
            description: 'Finance and Accounting',
            isActive: true,
            createdDate: '2025-01-10',
            lastModified: '2025-07-14'
        },
        {
            id: 3,
            code: 'DEPT003',
            description: 'Mining Operations',
            isActive: true,
            createdDate: '2025-01-12',
            lastModified: '2025-07-13'
        },
        {
            id: 4,
            code: 'DEPT004',
            description: 'Equipment Maintenance',
            isActive: false,
            createdDate: '2025-01-15',
            lastModified: '2025-07-12'
        },
        {
            id: 5,
            code: 'DEPT005',
            description: 'Safety and Compliance',
            isActive: true,
            createdDate: '2025-01-18',
            lastModified: '2025-07-11'
        },
        {
            id: 6,
            code: 'DEPT006',
            description: 'Quality Control',
            isActive: false,
            createdDate: '2025-01-20',
            lastModified: '2025-07-10'
        }
    ]);

    // New item form data
    const [newItem, setNewItem] = useState({
        code: '',
        description: '',
        isActive: true
    });

    const tabs = [
        { id: 'list-overview', label: 'List Overview', icon: List }
    ];

    const handleInputChange = (field: string, value: string | boolean) => {
        setNewItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveItem = () => {
        if (!newItem.code.trim() || !newItem.description.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        // Check if code already exists
        const codeExists = listData.some(item => item.code.toLowerCase() === newItem.code.toLowerCase());
        if (codeExists) {
            alert('Code already exists. Please use a different code.');
            return;
        }

        const newEntry: ListItem = {
            id: listData.length + 1,
            ...newItem,
            createdDate: new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0]
        };

        setListData(prev => [...prev, newEntry]);
        setNewItem({
            code: '',
            description: '',
            isActive: true
        });
        alert('Item saved successfully!');
    };

    const toggleItemStatus = (id: number) => {
        setListData(prev =>
            prev.map(item =>
                item.id === id
                    ? {
                        ...item,
                        isActive: !item.isActive,
                        lastModified: new Date().toISOString().split('T')[0]
                    }
                    : item
            )
        );
    };

    // Filter and search logic
    const filteredData = listData.filter(item => {
        const matchesSearch =
            item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && item.isActive) ||
            (statusFilter === 'inactive' && !item.isActive);

        return matchesSearch && matchesStatus;
    });

    const activeCount = listData.filter(item => item.isActive).length;
    const inactiveCount = listData.filter(item => !item.isActive).length;

    const renderTabContent = () => {
        switch (activeTab) {
            case 'list-overview':
                return (
                    <div className="list-space-y-4">
                        {/* Summary Cards */}
                        <div className="list-grid-3">


                            <div className="list-card mb-0">
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon active">
                                            <ToggleRight className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Active Items</p>
                                            <p className="list-summary-number active">{activeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0">
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon inactive">
                                            <ToggleLeft className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Inactive Items</p>
                                            <p className="list-summary-number inactive">{inactiveCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0">
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon total">
                                            <List className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Total Items</p>
                                            <p className="list-summary-number total">{listData.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add New Item Form - Minimalist */}
                        <div className="list-card compact">
                            <div className="list-card-content">
                                <div className="list-compact-form">
                                    <h4 className="list-compact-title pt-2">
                                        <Plus className="list-icon-sm " />
                                        Add New Item
                                    </h4>

                                    <div className="list-compact-grid">
                                        <input
                                            type="text"
                                            value={newItem.code}
                                            onChange={(e) => handleInputChange('code', e.target.value)}
                                            className="list-compact-input"
                                            placeholder="Item Code (e.g., DEPT001)"
                                            maxLength={20}
                                        />

                                        <input
                                            type="text"
                                            value={newItem.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            className="list-compact-input"
                                            placeholder="Description"
                                            maxLength={500}
                                        />

                                        <select
                                            value={newItem.isActive ? 'active' : 'inactive'}
                                            onChange={(e) => handleInputChange('isActive', e.target.value === 'active')}
                                            className="list-compact-select"
                                        >
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>

                                        <div className="list-compact-actions">
                                            <button
                                                onClick={handleSaveItem}
                                                className="list-button primary small"
                                            >
                                                <Save className="list-icon-sm" />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setNewItem({ code: '', description: '', isActive: true })}
                                                className="list-button outline small"
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter and Search Bar */}


                        {/* Items Table */}
                        <div className="list-card">
                            {/* <div className="list-card-header">
                                <h3 className="list-card-title">
                                    <List className="list-icon-sm" />
                                    Items List ({filteredData.length} items)
                                </h3>


                                <div className="list-filter-bar">
                                    <div className="list-filter-section">
                                        <div className="list-filter-group">
                                            <label className="list-filter-label">
                                                <Filter className="list-icon-sm" />
                                                Status Filter
                                            </label>
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="list-filter-select"
                                            >
                                                <option value="all">All Items</option>
                                                <option value="active">Active Only</option>
                                                <option value="inactive">Inactive Only</option>
                                            </select>
                                        </div>

                                        <div className="list-search-group">
                                            <label className="list-filter-label">
                                                <Search className="list-icon-sm" />
                                                Search
                                            </label>
                                            <div className="list-search-wrapper">
                                                <Search className="list-search-icon" />
                                                <input
                                                    type="text"
                                                    placeholder="Search by code or description..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="list-search-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="list-filter-actions">
                                        <button className="list-button outline small">
                                            <Download className="list-icon-sm" />
                                            Export
                                        </button>
                                    </div>
                                </div>

                            </div> */}
                            <div className="list-card-content" style={{ padding: 0 }}>
                                <div className="list-table-container">
                                    <table className="list-table">
                                        <thead className="list-table-header">
                                            <tr>
                                                <th>Code</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Created Date</th>
                                                <th>Last Modified</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((item) => (
                                                <tr key={item.id} className="list-table-row">
                                                    <td className="list-table-cell code">{item.code}</td>
                                                    <td className="list-table-cell description">{item.description}</td>
                                                    <td className="list-table-cell">
                                                        <span className={`list-badge ${item.isActive ? 'active' : 'inactive'}`}>
                                                            {item.isActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="list-table-cell mono">{new Date(item.createdDate).toLocaleDateString('en-GB')}</td>
                                                    <td className="list-table-cell mono">{new Date(item.lastModified).toLocaleDateString('en-GB')}</td>
                                                    <td className="list-table-cell">
                                                        <div className="list-action-buttons">
                                                            <button
                                                                onClick={() => toggleItemStatus(item.id)}
                                                                className={`list-button ghost ${item.isActive ? 'danger' : 'success'}`}
                                                                title={item.isActive ? 'Deactivate' : 'Activate'}
                                                            >
                                                                {item.isActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}
                                                            </button>
                                                            <button
                                                                className="list-button ghost primary"
                                                                title="Edit"
                                                            >
                                                                <Edit3 className="list-icon-sm" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredData.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="list-table-cell empty">
                                                        No items found matching your criteria
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="list-management-container ">
            {/* Header */}
            <div className="list-header ">
                <div className="list-header-content container">
                    <div className="list-header-info">
                        <div className="list-header-icon">
                            <Car className="list-icon-sm" />
                        </div>
                        <div>
                            <h1 className="list-header-title">Vehicle Type</h1>
                            <p className="list-header-subtitle">Master data with codes and descriptions for vehicle types</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Container */}
            <div className="list-main-container container">

                {/* Tab Navigation */}
                {/* <div className="list-tab-navigation">
                                <nav className="list-tab-nav">
                                    <div className="list-tab-list">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`list-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                                            >
                                                <tab.icon className="list-icon-sm" />
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </nav>
                            </div> */}

                {/* Content Area */}
                {renderTabContent()}
            </div>
        </div>
    );
}
