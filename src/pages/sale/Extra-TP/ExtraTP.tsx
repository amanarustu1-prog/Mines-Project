// ExtraTP.tsx
import React, { useState } from 'react';
import { FiPrinter, FiTrash2, FiCheck, FiX, FiPlus, FiPackage, FiFileText } from 'react-icons/fi';
import './ExtraTP.css'; // We'll create this CSS file

interface ExtraTP {
    id: string;
    tpNo: string;
    vehicleNo: string;
    date: string;
    driverName: string;
    fromPlace: string;
    toPlace: string;
    material: string;
    quantity: number;
    rate: number;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    invoiceNo?: string;
    grossWeight?: number;
    netWeight?: number;
    tareWeight?: number;
    billName?: string;
    elnVoiceNo?: string;
}

const ExtraTP: React.FC = () => {
    // Sample data - replace with API call in real implementation
    const [tpEntries, setTpEntries] = useState<ExtraTP[]>([
        {
            id: '1',
            tpNo: 'TP-2025-001',
            vehicleNo: 'MH01AB1234',
            date: '2025-07-28',
            driverName: 'Rajesh Kumar',
            fromPlace: 'Mumbai',
            toPlace: 'Pune',
            material: 'Iron Ore',
            quantity: 10,
            rate: 1500,
            amount: 15000,
            status: 'pending',
            invoiceNo: 'INV-2025-001',
            grossWeight: 12000,
            netWeight: 10000,
            tareWeight: 2000,
            billName: 'ABC Traders',
            elnVoiceNo: 'ELN-2025-001'
        },
        // Add more sample data as needed
    ]);

    // Filter state
    const [filters, setFilters] = useState({
        dateFrom: '',
        dateTo: '',
        search: ''
    });

    // Handle filter changes
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Filter TP entries based on filters
    const filteredEntries = tpEntries.filter(entry => {
        const matchesDate = (!filters.dateFrom || entry.date >= filters.dateFrom) &&
            (!filters.dateTo || entry.date <= filters.dateTo);
        const matchesSearch = !filters.search ||
            entry.tpNo.toLowerCase().includes(filters.search.toLowerCase()) ||
            entry.vehicleNo.toLowerCase().includes(filters.search.toLowerCase()) ||
            entry.driverName.toLowerCase().includes(filters.search.toLowerCase());

        return matchesDate && matchesSearch;
    });

    // Calculate totals
    const totalWeight = filteredEntries.reduce((sum, entry) => sum + (entry.netWeight || 0), 0);
    const totalRecords = filteredEntries.length;

    // Action handlers
    const handlePrint = (id: string) => {
        console.log('Print TP entry:', id);
        window.open(`/print-tp/${id}`, '_blank');

        // Implement print functionality
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this TP entry?')) {
            setTpEntries(tpEntries.filter(entry => entry.id !== id));
        }
    };

    const handleApprove = (id: string) => {
        if (window.confirm('Approve this TP entry?')) {
            setTpEntries(tpEntries.map(entry =>
                entry.id === id ? { ...entry, status: 'approved' } : entry
            ));
        }
    };

    const handleReject = (id: string) => {
        if (window.confirm('Reject this TP entry?')) {
            setTpEntries(tpEntries.map(entry =>
                entry.id === id ? { ...entry, status: 'rejected' } : entry
            ));
        }
    };

    const handleAddNew = () => {
        // Implement add new TP entry
        console.log('Add new TP entry');
    };

    return (
        <div className="extra-tp-container">
            {/* <div className="extra-tp-header">
        <h2>Extra TP Entries</h2>
        <button 
          onClick={handleAddNew}
          className="add-new-btn"
        >
          <FiPlus /> Add New TP
        </button>
      </div> */}

            {/* Filters */}
            <div className="filters-container lg:mt-[70px]">

                <div className="date-filters">
                    <div className="filter-group">
                        <label>From:</label>
                        <input
                            type="date"
                            name="dateFrom"
                            value={filters.dateFrom}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                    <div className="filter-group">
                        <label>To:</label>
                        <input
                            type="date"
                            name="dateTo"
                            value={filters.dateTo}
                            onChange={handleFilterChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="search-filter">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search TP entries..."
                        value={filters.search}
                        onChange={handleFilterChange}
                        className="form-control"
                    />
                </div>
            </div>

            <div className="extra-tp__summary-cards">
                <div className="extra-tp__summary-card">
                    <div className="extra-tp__summary-card-icon">
                        <FiPackage />
                    </div>
                    <div className="extra-tp__summary-card-content">
                        <div className="extra-tp__summary-card-title">Total Weight</div>
                        <div className="extra-tp__summary-card-value">{totalWeight.toLocaleString()} kg</div>
                    </div>
                </div>
                <div className="extra-tp__summary-card">
                    <div className="extra-tp__summary-card-icon">
                        <FiFileText />
                    </div>
                    <div className="extra-tp__summary-card-content">
                        <div className="extra-tp__summary-card-title">Total Records</div>
                        <div className="extra-tp__summary-card-value">{totalRecords}</div>
                    </div>
                </div>
            </div>

            {/* DataTable */}
            <div className="table-responsive">
                <table className="tp-table">
                    <thead>
                        <tr>
                            <th>TP No</th>
                            <th>Invoice #</th>
                            <th>TP Date</th>
                            <th>Vehicle No</th>
                            <th>Gross Weight</th>
                            <th>Tare Weight</th>
                            <th>Net Weight</th>
                            <th>Bill Name</th>
                            <th>ElnVoiceNo</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filteredEntries.length > 0 ? (
                            filteredEntries.map((entry) => (
                                <tr key={entry.id} className={entry.status}>
                                    <td>{entry.tpNo}</td>
                                    <td>{entry.invoiceNo}</td>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                    <td>{entry.vehicleNo}</td>
                                    <td>{entry.grossWeight}</td>
                                    <td>{entry.tareWeight}</td>
                                    <td>{entry.netWeight}</td>
                                    <td>{entry.billName}</td>
                                    <td>{entry.elnVoiceNo}</td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={12} className="no-data">
                                    No TP entries found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExtraTP;