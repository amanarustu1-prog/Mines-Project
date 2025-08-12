import React, { useState } from 'react';
import './styles.css';

const CalendarIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="store-to-store-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const PackageIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const HomeIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = () => (
  <svg className="store-to-store-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function StoreToStore() {
  const [activeTab, setActiveTab] = useState('transfer-overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [approverNote, setApproverNote] = useState('');
  const [newTransfer, setNewTransfer] = useState({
    transferNo: '',
    date: new Date().toISOString().split('T')[0],
    fromStore: '',
    toStore: '',
    reason: '',
    requestedBy: '',
    priority: 'Normal',
    urgentReason: '',
    items: [{
      materialCode: '',
      materialName: '',
      specification: '',
      unit: '',
      availableQty: '',
      transferQty: '',
      remarks: ''
    }]
  });

  // Sample store-to-store transfer data
  const [transferData, setTransferData] = useState([
    {
      id: 1,
      transferNo: 'STS-2025-001',
      date: '2025-08-11',
      fromStore: 'Main Warehouse',
      toStore: 'Mining Site Store',
      reason: 'Urgent requirement for mining operations',
      requestedBy: 'John Smith',
      priority: 'Urgent',
      status: 'Pending',
      totalItems: 4,
      totalValue: 45200.00,
      items: [
        { materialCode: 'DRL-001', materialName: 'Drill Bits', qty: 10, unit: 'Nos' },
        { materialCode: 'EXP-002', materialName: 'Explosives', qty: 50, unit: 'Kg' },
        { materialCode: 'SAF-003', materialName: 'Safety Equipment', qty: 20, unit: 'Sets' }
      ]
    },
    {
      id: 2,
      transferNo: 'STS-2025-002',
      date: '2025-08-10',
      fromStore: 'Central Store',
      toStore: 'Processing Plant Store',
      reason: 'Equipment maintenance and spare parts requirement',
      requestedBy: 'Sarah Wilson',
      priority: 'High',
      status: 'Approved',
      totalItems: 6,
      totalValue: 32800.00,
      items: [
        { materialCode: 'CNV-001', materialName: 'Conveyor Parts', qty: 5, unit: 'Sets' },
        { materialCode: 'BLT-002', materialName: 'Belt Material', qty: 100, unit: 'Mtr' },
        { materialCode: 'BRG-003', materialName: 'Bearings', qty: 8, unit: 'Nos' }
      ]
    },
    {
      id: 3,
      transferNo: 'STS-2025-003',
      date: '2025-08-09',
      fromStore: 'Mining Site Store',
      toStore: 'Maintenance Workshop',
      reason: 'Regular maintenance supplies transfer',
      requestedBy: 'Mike Johnson',
      priority: 'Normal',
      status: 'Completed',
      totalItems: 8,
      totalValue: 18650.00,
      items: [
        { materialCode: 'OIL-001', materialName: 'Hydraulic Oil', qty: 200, unit: 'Ltr' },
        { materialCode: 'FIL-002', materialName: 'Oil Filters', qty: 12, unit: 'Nos' },
        { materialCode: 'GRS-003', materialName: 'Industrial Grease', qty: 25, unit: 'Kg' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const handleApproval = (transfer: any, status: string) => {
    setSelectedTransfer(transfer);
    setShowTransferModal(true);
  };

  const submitApproval = () => {
    if (selectedTransfer) {
      setTransferData(prev => prev.map(transfer => 
        transfer.id === selectedTransfer.id 
          ? { ...transfer, status: 'Approved', approverNote }
          : transfer
      ));
    }
    setShowTransferModal(false);
    setSelectedTransfer(null);
    setApproverNote('');
  };

  const addItem = () => {
    setNewTransfer(prev => ({
      ...prev,
      items: [...prev.items, {
        materialCode: '',
        materialName: '',
        specification: '',
        unit: '',
        availableQty: '',
        transferQty: '',
        remarks: ''
      }]
    }));
  };

  const removeItem = (index: number) => {
    setNewTransfer(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    setNewTransfer(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const filteredTransfers = transferData.filter(transfer => {
    const matchesSearch = transfer.transferNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toStore.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || transfer.status === filterStatus;
    const matchesPriority = filterPriority === 'All' || transfer.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusStats = () => {
    const total = transferData.length;
    const pending = transferData.filter(t => t.status === 'Pending').length;
    const approved = transferData.filter(t => t.status === 'Approved').length;
    const completed = transferData.filter(t => t.status === 'Completed').length;
    
    return { total, pending, approved, completed };
  };

  const statusStats = getStatusStats();

  const exportToCSV = () => {
    const csvData = filteredTransfers.map(transfer => ({
      'Transfer No': transfer.transferNo,
      'Date': transfer.date,
      'From Store': transfer.fromStore,
      'To Store': transfer.toStore,
      'Reason': transfer.reason,
      'Requested By': transfer.requestedBy,
      'Priority': transfer.priority,
      'Status': transfer.status,
      'Total Items': transfer.totalItems,
      'Total Value': transfer.totalValue
    }));
    
    console.log('Exporting CSV:', csvData);
  };

  return (
    <div className="store-to-store-container">
      {/* Header */}
      <div className="store-to-store-header">
        <div className="store-to-store-header-content">
          <div className="store-to-store-header-info">
            <div className="store-to-store-header-icon">
              <ArrowRightIcon />
            </div>
            <div>
              <h1 className="store-to-store-header-title">Store to Store</h1>
              <p className="store-to-store-header-subtitle">Transfer without PO - for urgent purchases</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="store-to-store-main-container">
        {/* Tab Navigation */}
        <div className="store-to-store-tab-navigation">
          <div className="store-to-store-tab-nav">
            <div className="store-to-store-tab-list">
              <button
                onClick={() => setActiveTab('transfer-overview')}
                className={`store-to-store-tab-button ${activeTab === 'transfer-overview' ? 'active' : 'inactive'}`}
              >
                <FileTextIcon />
                Transfer Overview
              </button>
              <button
                onClick={() => setActiveTab('create-transfer')}
                className={`store-to-store-tab-button ${activeTab === 'create-transfer' ? 'active' : 'inactive'}`}
              >
                <PlusIcon />
                Create Transfer
              </button>
              <button
                onClick={() => setActiveTab('transfer-reports')}
                className={`store-to-store-tab-button ${activeTab === 'transfer-reports' ? 'active' : 'inactive'}`}
              >
                <CalendarIcon />
                Transfer Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="store-to-store-tab-content">
            {activeTab === 'transfer-overview' && (
              <div className="store-to-store-space-y-4">
                {/* Summary Cards */}
                <div className="store-to-store-grid-4">
                  <div className="store-to-store-card">
                    <div className="store-to-store-card-content store-to-store-summary-card">
                      <div className="store-to-store-summary-content">
                        <div className="store-to-store-summary-icon total">
                          <FileTextIcon />
                        </div>
                        <div>
                          <p className="store-to-store-summary-text">Total Transfers</p>
                          <p className="store-to-store-summary-number total">{statusStats.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="store-to-store-card">
                    <div className="store-to-store-card-content store-to-store-summary-card">
                      <div className="store-to-store-summary-content">
                        <div className="store-to-store-summary-icon pending">
                          <ClockIcon />
                        </div>
                        <div>
                          <p className="store-to-store-summary-text">Pending Transfers</p>
                          <p className="store-to-store-summary-number pending">{statusStats.pending}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="store-to-store-card">
                    <div className="store-to-store-card-content store-to-store-summary-card">
                      <div className="store-to-store-summary-content">
                        <div className="store-to-store-summary-icon approved">
                          <CheckCircleIcon />
                        </div>
                        <div>
                          <p className="store-to-store-summary-text">Approved Transfers</p>
                          <p className="store-to-store-summary-number approved">{statusStats.approved}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="store-to-store-card">
                    <div className="store-to-store-card-content store-to-store-summary-card">
                      <div className="store-to-store-summary-content">
                        <div className="store-to-store-summary-icon completed">
                          <TruckIcon />
                        </div>
                        <div>
                          <p className="store-to-store-summary-text">Completed Transfers</p>
                          <p className="store-to-store-summary-number completed">{statusStats.completed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="store-to-store-card">
                  <div className="store-to-store-card-content">
                    <div className="store-to-store-section-header">
                      <h4>Store Transfer Management</h4>
                      <button 
                        onClick={exportToCSV}
                        className="store-to-store-button primary"
                      >
                        <DownloadIcon />
                        Export Data
                      </button>
                    </div>
                    
                    <div className="store-to-store-form-grid">
                      <div className="store-to-store-form-group">
                        <label className="store-to-store-form-label">Search Transfers</label>
                        <input
                          type="text"
                          placeholder="Search by Transfer No, Stores, or Requester..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="store-to-store-form-input"
                        />
                      </div>
                      <div className="store-to-store-form-group">
                        <label className="store-to-store-form-label">Filter by Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="store-to-store-form-select"
                        >
                          <option value="All">All Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="store-to-store-form-group">
                        <label className="store-to-store-form-label">Filter by Priority</label>
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="store-to-store-form-select"
                        >
                          <option value="All">All Priorities</option>
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transfers Table */}
                <div className="store-to-store-card">
                  <div className="store-to-store-card-content">
                    <div className="store-to-store-table-container">
                      <table className="store-to-store-table">
                        <thead className="store-to-store-table-header">
                          <tr>
                            <th>Transfer No</th>
                            <th>Date</th>
                            <th>From Store</th>
                            <th>To Store</th>
                            <th>Requested By</th>
                            <th>Priority</th>
                            <th>Items</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredTransfers.map((transfer) => (
                            <tr key={transfer.id} className="store-to-store-table-row">
                              <td className="store-to-store-table-cell transfer-no">{transfer.transferNo}</td>
                              <td className="store-to-store-table-cell">{transfer.date}</td>
                              <td className="store-to-store-table-cell store-name">{transfer.fromStore}</td>
                              <td className="store-to-store-table-cell store-name">{transfer.toStore}</td>
                              <td className="store-to-store-table-cell requester">{transfer.requestedBy}</td>
                              <td className="store-to-store-table-cell">
                                <span className={`store-to-store-badge priority ${transfer.priority.toLowerCase()}`}>
                                  {transfer.priority}
                                </span>
                              </td>
                              <td className="store-to-store-table-cell center">{transfer.totalItems}</td>
                              <td className="store-to-store-table-cell value">₹{transfer.totalValue.toFixed(2)}</td>
                              <td className="store-to-store-table-cell">
                                <span className={`store-to-store-badge status ${transfer.status.toLowerCase()}`}>
                                  {transfer.status}
                                </span>
                              </td>
                              <td className="store-to-store-table-cell">
                                {transfer.status === 'Pending' && (
                                  <button
                                    onClick={() => handleApproval(transfer, 'Approved')}
                                    className="store-to-store-button small primary"
                                  >
                                    Approve
                                  </button>
                                )}
                                {transfer.status === 'Approved' && (
                                  <button
                                    onClick={() => handleApproval(transfer, 'Completed')}
                                    className="store-to-store-button small success"
                                  >
                                    Complete
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'create-transfer' && (
              <div className="store-to-store-space-y-4">
                <div className="store-to-store-card">
                  <div className="store-to-store-card-header">
                    <h3 className="store-to-store-card-title">
                      <PlusIcon />
                      Create New Store Transfer
                    </h3>
                  </div>
                  <div className="store-to-store-card-content">
                    {/* Transfer Details Section */}
                    <div className="store-to-store-form-section">
                      <h4>Transfer Details</h4>
                      <div className="store-to-store-form-grid">
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">Transfer Number</label>
                          <input
                            type="text"
                            value={newTransfer.transferNo}
                            onChange={(e) => setNewTransfer(prev => ({...prev, transferNo: e.target.value}))}
                            className="store-to-store-form-input"
                            placeholder="STS-2025-XXX"
                          />
                        </div>
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">Transfer Date</label>
                          <input
                            type="date"
                            value={newTransfer.date}
                            onChange={(e) => setNewTransfer(prev => ({...prev, date: e.target.value}))}
                            className="store-to-store-form-input"
                          />
                        </div>
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">From Store</label>
                          <select
                            value={newTransfer.fromStore}
                            onChange={(e) => setNewTransfer(prev => ({...prev, fromStore: e.target.value}))}
                            className="store-to-store-form-select"
                          >
                            <option value="">Select Source Store</option>
                            <option value="Main Warehouse">Main Warehouse</option>
                            <option value="Central Store">Central Store</option>
                            <option value="Mining Site Store">Mining Site Store</option>
                            <option value="Processing Plant Store">Processing Plant Store</option>
                            <option value="Maintenance Workshop">Maintenance Workshop</option>
                          </select>
                        </div>
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">To Store</label>
                          <select
                            value={newTransfer.toStore}
                            onChange={(e) => setNewTransfer(prev => ({...prev, toStore: e.target.value}))}
                            className="store-to-store-form-select"
                          >
                            <option value="">Select Destination Store</option>
                            <option value="Main Warehouse">Main Warehouse</option>
                            <option value="Central Store">Central Store</option>
                            <option value="Mining Site Store">Mining Site Store</option>
                            <option value="Processing Plant Store">Processing Plant Store</option>
                            <option value="Maintenance Workshop">Maintenance Workshop</option>
                          </select>
                        </div>
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">Requested By</label>
                          <input
                            type="text"
                            value={newTransfer.requestedBy}
                            onChange={(e) => setNewTransfer(prev => ({...prev, requestedBy: e.target.value}))}
                            className="store-to-store-form-input"
                            placeholder="Employee Name"
                          />
                        </div>
                        <div className="store-to-store-form-group">
                          <label className="store-to-store-form-label">Priority</label>
                          <select
                            value={newTransfer.priority}
                            onChange={(e) => setNewTransfer(prev => ({...prev, priority: e.target.value}))}
                            className="store-to-store-form-select"
                          >
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div className="store-to-store-form-group full-width">
                          <label className="store-to-store-form-label">Reason for Transfer</label>
                          <textarea
                            value={newTransfer.reason}
                            onChange={(e) => setNewTransfer(prev => ({...prev, reason: e.target.value}))}
                            className="store-to-store-form-textarea"
                            placeholder="Describe the reason for store transfer..."
                            rows={3}
                          />
                        </div>
                        {newTransfer.priority === 'Urgent' && (
                          <div className="store-to-store-form-group full-width">
                            <label className="store-to-store-form-label">Urgent Transfer Justification</label>
                            <textarea
                              value={newTransfer.urgentReason}
                              onChange={(e) => setNewTransfer(prev => ({...prev, urgentReason: e.target.value}))}
                              className="store-to-store-form-textarea"
                              placeholder="Provide detailed justification for urgent transfer..."
                              rows={2}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Material Items Section */}
                    <div className="store-to-store-form-section">
                      <div className="store-to-store-section-header">
                        <h4>Materials to Transfer</h4>
                        <button
                          type="button"
                          onClick={addItem}
                          className="store-to-store-button outline small"
                        >
                          <PlusIcon />
                          Add Item
                        </button>
                      </div>

                      <div className="store-to-store-items-container">
                        {newTransfer.items.map((item, index) => (
                          <div key={index} className="store-to-store-item-card">
                            <div className="store-to-store-item-header">
                              <h5>Item {index + 1}</h5>
                              {newTransfer.items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeItem(index)}
                                  className="store-to-store-button danger small"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="store-to-store-item-grid">
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Material Code</label>
                                <input
                                  type="text"
                                  value={item.materialCode}
                                  onChange={(e) => updateItem(index, 'materialCode', e.target.value)}
                                  className="store-to-store-form-input"
                                  placeholder="MAT-001"
                                />
                              </div>
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Material Name</label>
                                <input
                                  type="text"
                                  value={item.materialName}
                                  onChange={(e) => updateItem(index, 'materialName', e.target.value)}
                                  className="store-to-store-form-input"
                                  placeholder="Enter material name"
                                />
                              </div>
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Specification</label>
                                <input
                                  type="text"
                                  value={item.specification}
                                  onChange={(e) => updateItem(index, 'specification', e.target.value)}
                                  className="store-to-store-form-input"
                                  placeholder="Technical specifications"
                                />
                              </div>
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Unit</label>
                                <select
                                  value={item.unit}
                                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                  className="store-to-store-form-select"
                                >
                                  <option value="">Select Unit</option>
                                  <option value="Nos">Numbers</option>
                                  <option value="Kg">Kilograms</option>
                                  <option value="Ltr">Liters</option>
                                  <option value="Mtr">Meters</option>
                                  <option value="Pcs">Pieces</option>
                                </select>
                              </div>
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Available Qty</label>
                                <input
                                  type="number"
                                  value={item.availableQty}
                                  onChange={(e) => updateItem(index, 'availableQty', e.target.value)}
                                  className="store-to-store-form-input readonly"
                                  placeholder="0"
                                  readOnly
                                />
                              </div>
                              <div className="store-to-store-form-group">
                                <label className="store-to-store-form-label">Transfer Qty</label>
                                <input
                                  type="number"
                                  value={item.transferQty}
                                  onChange={(e) => updateItem(index, 'transferQty', e.target.value)}
                                  className="store-to-store-form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div className="store-to-store-form-group full-width">
                                <label className="store-to-store-form-label">Remarks</label>
                                <input
                                  type="text"
                                  value={item.remarks}
                                  onChange={(e) => updateItem(index, 'remarks', e.target.value)}
                                  className="store-to-store-form-input"
                                  placeholder="Additional notes or remarks"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="store-to-store-form-actions">
                      <button type="button" className="store-to-store-button outline">
                        Cancel
                      </button>
                      <button type="submit" className="store-to-store-button primary">
                        <SaveIcon />
                        Save Transfer Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transfer-reports' && (
              <div className="store-to-store-space-y-4">
                {/* Reports Header */}
                <div className="store-to-store-card">
                  <div className="store-to-store-card-header">
                    <h3 className="store-to-store-card-title">
                      <CalendarIcon />
                      Store Transfer Reports
                    </h3>
                  </div>
                  <div className="store-to-store-card-content">
                    <div className="store-to-store-reports-grid">
                      <div className="store-to-store-report-card">
                        <div className="store-to-store-report-icon red">
                          <FileTextIcon />
                        </div>
                        <h4 className="store-to-store-report-title">Daily Transfer Report</h4>
                        <p className="store-to-store-report-description">
                          Generate daily store-to-store transfer reports with detailed item tracking and status updates.
                        </p>
                        <button className="store-to-store-button primary small">Generate Report</button>
                      </div>
                      <div className="store-to-store-report-card">
                        <div className="store-to-store-report-icon green">
                          <HomeIcon />
                        </div>
                        <h4 className="store-to-store-report-title">Store Wise Analysis</h4>
                        <p className="store-to-store-report-description">
                          Analyze material movements between different stores with inventory flow patterns.
                        </p>
                        <button className="store-to-store-button primary small">Generate Report</button>
                      </div>
                      <div className="store-to-store-report-card">
                        <div className="store-to-store-report-icon blue">
                          <ArrowRightIcon />
                        </div>
                        <h4 className="store-to-store-report-title">Transfer Flow Summary</h4>
                        <p className="store-to-store-report-description">
                          Track material transfer flows and identify patterns in urgent and emergency transfers.
                        </p>
                        <button className="store-to-store-button primary small">Generate Report</button>
                      </div>
                      <div className="store-to-store-report-card">
                        <div className="store-to-store-report-icon orange">
                          <PackageIcon />
                        </div>
                        <h4 className="store-to-store-report-title">Material Movement Tracking</h4>
                        <p className="store-to-store-report-description">
                          Comprehensive tracking of material movements with cost analysis and efficiency metrics.
                        </p>
                        <button className="store-to-store-button primary small">Generate Report</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="store-to-store-card">
                  <div className="store-to-store-card-content">
                    <div className="store-to-store-stats-section">
                      <h4>Transfer Statistics</h4>
                      <div className="store-to-store-stats-grid">
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">Today's Transfers</span>
                          <span className="store-to-store-stat-value">8</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">This Week</span>
                          <span className="store-to-store-stat-value">34</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">This Month</span>
                          <span className="store-to-store-stat-value">142</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">Avg Daily Value</span>
                          <span className="store-to-store-stat-value">₹32,200</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">Total Value (Month)</span>
                          <span className="store-to-store-stat-value">₹966,000</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">Urgent Transfers</span>
                          <span className="store-to-store-stat-value">18%</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">High Priority</span>
                          <span className="store-to-store-stat-value">35%</span>
                        </div>
                        <div className="store-to-store-stat-item">
                          <span className="store-to-store-stat-label">Completion Rate</span>
                          <span className="store-to-store-stat-value">94%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      {showTransferModal && selectedTransfer && (
        <div className="store-to-store-modal-overlay">
          <div className="store-to-store-modal">
            <div className="store-to-store-modal-header">
              <h3>Approve Store Transfer</h3>
            </div>
            <div className="store-to-store-modal-content">
              <p><strong>Transfer No:</strong> {selectedTransfer.transferNo}</p>
              <p><strong>From Store:</strong> {selectedTransfer.fromStore}</p>
              <p><strong>To Store:</strong> {selectedTransfer.toStore}</p>
              <p><strong>Requested By:</strong> {selectedTransfer.requestedBy}</p>
              <p><strong>Priority:</strong> {selectedTransfer.priority}</p>
              
              <div className="store-to-store-form-group">
                <label className="store-to-store-form-label">Approver Note</label>
                <textarea
                  value={approverNote}
                  onChange={(e) => setApproverNote(e.target.value)}
                  className="store-to-store-form-textarea"
                  placeholder="Add approval notes..."
                  rows={3}
                />
              </div>
            </div>
            <div className="store-to-store-modal-actions">
              <button 
                onClick={() => setShowTransferModal(false)}
                className="store-to-store-button outline"
              >
                Cancel
              </button>
              <button 
                onClick={submitApproval}
                className="store-to-store-button success"
              >
                Approve Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
