import React, { useState } from 'react';
import './styles.css';

const CalendarIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="inter-dept-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const SwapIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = () => (
  <svg className="inter-dept-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function InterDepartmentTransfer() {
  const [activeTab, setActiveTab] = useState('transfer-overview');
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState<any>(null);
  const [approverNote, setApproverNote] = useState('');
  const [newTransfer, setNewTransfer] = useState({
    transferNo: '',
    date: new Date().toISOString().split('T')[0],
    fromDepartment: '',
    toDepartment: '',
    purpose: '',
    requestedBy: '',
    approvedBy: '',
    priority: 'Normal',
    items: [{
      materialCode: '',
      materialName: '',
      specification: '',
      unit: '',
      availableQty: '',
      transferQty: '',
      cost: '',
      remarks: ''
    }]
  });

  // Sample inter-department transfer data
  const [transferData, setTransferData] = useState([
    {
      id: 1,
      transferNo: 'IDT-2025-001',
      date: '2025-08-11',
      fromDepartment: 'Mining Operations',
      toDepartment: 'Processing Plant',
      purpose: 'Equipment relocation for processing efficiency',
      requestedBy: 'John Smith',
      approvedBy: 'Sarah Wilson',
      priority: 'High',
      status: 'Pending',
      totalItems: 5,
      totalValue: 125000.00,
      items: [
        { materialCode: 'CNV-001', materialName: 'Conveyor System', qty: 1, unit: 'Set' },
        { materialCode: 'PMP-002', materialName: 'Water Pump', qty: 2, unit: 'Nos' },
        { materialCode: 'ELE-003', materialName: 'Electrical Panel', qty: 1, unit: 'Set' }
      ]
    },
    {
      id: 2,
      transferNo: 'IDT-2025-002',
      date: '2025-08-10',
      fromDepartment: 'Maintenance Workshop',
      toDepartment: 'Transport',
      purpose: 'Transfer of specialized tools and equipment',
      requestedBy: 'Mike Johnson',
      approvedBy: 'David Brown',
      priority: 'Normal',
      status: 'Approved',
      totalItems: 8,
      totalValue: 45300.00,
      items: [
        { materialCode: 'TLS-001', materialName: 'Hydraulic Tools', qty: 3, unit: 'Sets' },
        { materialCode: 'SPR-002', materialName: 'Spare Parts Kit', qty: 5, unit: 'Kits' },
        { materialCode: 'LUB-003', materialName: 'Lubricants', qty: 20, unit: 'Ltr' }
      ]
    },
    {
      id: 3,
      transferNo: 'IDT-2025-003',
      date: '2025-08-09',
      fromDepartment: 'Quality Control',
      toDepartment: 'Processing Plant',
      purpose: 'Laboratory equipment setup at processing facility',
      requestedBy: 'Emily Davis',
      approvedBy: 'Robert Taylor',
      priority: 'Normal',
      status: 'Completed',
      totalItems: 12,
      totalValue: 89750.00,
      items: [
        { materialCode: 'LAB-001', materialName: 'Testing Equipment', qty: 4, unit: 'Sets' },
        { materialCode: 'CAL-002', materialName: 'Calibration Tools', qty: 6, unit: 'Nos' },
        { materialCode: 'CHM-003', materialName: 'Chemical Reagents', qty: 50, unit: 'Units' }
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
        cost: '',
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
                         transfer.fromDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      'From Department': transfer.fromDepartment,
      'To Department': transfer.toDepartment,
      'Purpose': transfer.purpose,
      'Requested By': transfer.requestedBy,
      'Approved By': transfer.approvedBy,
      'Priority': transfer.priority,
      'Status': transfer.status,
      'Total Items': transfer.totalItems,
      'Total Value': transfer.totalValue
    }));
    
    console.log('Exporting CSV:', csvData);
  };

  return (
    <div className="inter-dept-container">
      {/* Header */}
      <div className="inter-dept-header">
        <div className="inter-dept-header-content">
          <div className="inter-dept-header-info">
            <div className="inter-dept-header-icon">
              <SwapIcon />
            </div>
            <div>
              <h1 className="inter-dept-header-title">Inter-Department Transfer</h1>
              <p className="inter-dept-header-subtitle">Warehouse management and organization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="inter-dept-main-container">
        {/* Tab Navigation */}
        <div className="inter-dept-tab-navigation">
          <div className="inter-dept-tab-nav">
            <div className="inter-dept-tab-list">
              <button
                onClick={() => setActiveTab('transfer-overview')}
                className={`inter-dept-tab-button ${activeTab === 'transfer-overview' ? 'active' : 'inactive'}`}
              >
                <FileTextIcon />
                Transfer Overview
              </button>
              <button
                onClick={() => setActiveTab('create-transfer')}
                className={`inter-dept-tab-button ${activeTab === 'create-transfer' ? 'active' : 'inactive'}`}
              >
                <PlusIcon />
                Create Transfer
              </button>
              <button
                onClick={() => setActiveTab('transfer-reports')}
                className={`inter-dept-tab-button ${activeTab === 'transfer-reports' ? 'active' : 'inactive'}`}
              >
                <CalendarIcon />
                Transfer Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="inter-dept-tab-content">
            {activeTab === 'transfer-overview' && (
              <div className="inter-dept-space-y-4">
                {/* Summary Cards */}
                <div className="inter-dept-grid-4">
                  <div className="inter-dept-card">
                    <div className="inter-dept-card-content inter-dept-summary-card">
                      <div className="inter-dept-summary-content">
                        <div className="inter-dept-summary-icon total">
                          <FileTextIcon />
                        </div>
                        <div>
                          <p className="inter-dept-summary-text">Total Transfers</p>
                          <p className="inter-dept-summary-number total">{statusStats.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inter-dept-card">
                    <div className="inter-dept-card-content inter-dept-summary-card">
                      <div className="inter-dept-summary-content">
                        <div className="inter-dept-summary-icon pending">
                          <ClockIcon />
                        </div>
                        <div>
                          <p className="inter-dept-summary-text">Pending Transfers</p>
                          <p className="inter-dept-summary-number pending">{statusStats.pending}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inter-dept-card">
                    <div className="inter-dept-card-content inter-dept-summary-card">
                      <div className="inter-dept-summary-content">
                        <div className="inter-dept-summary-icon approved">
                          <CheckCircleIcon />
                        </div>
                        <div>
                          <p className="inter-dept-summary-text">Approved Transfers</p>
                          <p className="inter-dept-summary-number approved">{statusStats.approved}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="inter-dept-card">
                    <div className="inter-dept-card-content inter-dept-summary-card">
                      <div className="inter-dept-summary-content">
                        <div className="inter-dept-summary-icon completed">
                          <TrendingUpIcon />
                        </div>
                        <div>
                          <p className="inter-dept-summary-text">Completed Transfers</p>
                          <p className="inter-dept-summary-number completed">{statusStats.completed}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="inter-dept-card">
                  <div className="inter-dept-card-content">
                    <div className="inter-dept-section-header">
                      <h4>Department Transfer Management</h4>
                      <button 
                        onClick={exportToCSV}
                        className="inter-dept-button primary"
                      >
                        <DownloadIcon />
                        Export Data
                      </button>
                    </div>
                    
                    <div className="inter-dept-form-grid">
                      <div className="inter-dept-form-group">
                        <label className="inter-dept-form-label">Search Transfers</label>
                        <input
                          type="text"
                          placeholder="Search by Transfer No, Departments, or Requester..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="inter-dept-form-input"
                        />
                      </div>
                      <div className="inter-dept-form-group">
                        <label className="inter-dept-form-label">Filter by Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="inter-dept-form-select"
                        >
                          <option value="All">All Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                      <div className="inter-dept-form-group">
                        <label className="inter-dept-form-label">Filter by Priority</label>
                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="inter-dept-form-select"
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
                <div className="inter-dept-card">
                  <div className="inter-dept-card-content">
                    <div className="inter-dept-table-container">
                      <table className="inter-dept-table">
                        <thead className="inter-dept-table-header">
                          <tr>
                            <th>Transfer No</th>
                            <th>Date</th>
                            <th>From Department</th>
                            <th>To Department</th>
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
                            <tr key={transfer.id} className="inter-dept-table-row">
                              <td className="inter-dept-table-cell transfer-no">{transfer.transferNo}</td>
                              <td className="inter-dept-table-cell">{transfer.date}</td>
                              <td className="inter-dept-table-cell dept-name">{transfer.fromDepartment}</td>
                              <td className="inter-dept-table-cell dept-name">{transfer.toDepartment}</td>
                              <td className="inter-dept-table-cell requester">{transfer.requestedBy}</td>
                              <td className="inter-dept-table-cell">
                                <span className={`inter-dept-badge priority ${transfer.priority.toLowerCase()}`}>
                                  {transfer.priority}
                                </span>
                              </td>
                              <td className="inter-dept-table-cell center">{transfer.totalItems}</td>
                              <td className="inter-dept-table-cell value">₹{transfer.totalValue.toFixed(2)}</td>
                              <td className="inter-dept-table-cell">
                                <span className={`inter-dept-badge status ${transfer.status.toLowerCase()}`}>
                                  {transfer.status}
                                </span>
                              </td>
                              <td className="inter-dept-table-cell">
                                {transfer.status === 'Pending' && (
                                  <button
                                    onClick={() => handleApproval(transfer, 'Approved')}
                                    className="inter-dept-button small primary"
                                  >
                                    Approve
                                  </button>
                                )}
                                {transfer.status === 'Approved' && (
                                  <button
                                    onClick={() => handleApproval(transfer, 'Completed')}
                                    className="inter-dept-button small success"
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
              <div className="inter-dept-space-y-4">
                <div className="inter-dept-card">
                  <div className="inter-dept-card-header">
                    <h3 className="inter-dept-card-title">
                      <PlusIcon />
                      Create New Department Transfer
                    </h3>
                  </div>
                  <div className="inter-dept-card-content">
                    {/* Transfer Details Section */}
                    <div className="inter-dept-form-section">
                      <h4>Transfer Details</h4>
                      <div className="inter-dept-form-grid">
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">Transfer Number</label>
                          <input
                            type="text"
                            value={newTransfer.transferNo}
                            onChange={(e) => setNewTransfer(prev => ({...prev, transferNo: e.target.value}))}
                            className="inter-dept-form-input"
                            placeholder="IDT-2025-XXX"
                          />
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">Transfer Date</label>
                          <input
                            type="date"
                            value={newTransfer.date}
                            onChange={(e) => setNewTransfer(prev => ({...prev, date: e.target.value}))}
                            className="inter-dept-form-input"
                          />
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">From Department</label>
                          <select
                            value={newTransfer.fromDepartment}
                            onChange={(e) => setNewTransfer(prev => ({...prev, fromDepartment: e.target.value}))}
                            className="inter-dept-form-select"
                          >
                            <option value="">Select Source Department</option>
                            <option value="Mining Operations">Mining Operations</option>
                            <option value="Processing Plant">Processing Plant</option>
                            <option value="Maintenance Workshop">Maintenance Workshop</option>
                            <option value="Transport">Transport</option>
                            <option value="Quality Control">Quality Control</option>
                            <option value="Administration">Administration</option>
                          </select>
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">To Department</label>
                          <select
                            value={newTransfer.toDepartment}
                            onChange={(e) => setNewTransfer(prev => ({...prev, toDepartment: e.target.value}))}
                            className="inter-dept-form-select"
                          >
                            <option value="">Select Destination Department</option>
                            <option value="Mining Operations">Mining Operations</option>
                            <option value="Processing Plant">Processing Plant</option>
                            <option value="Maintenance Workshop">Maintenance Workshop</option>
                            <option value="Transport">Transport</option>
                            <option value="Quality Control">Quality Control</option>
                            <option value="Administration">Administration</option>
                          </select>
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">Requested By</label>
                          <input
                            type="text"
                            value={newTransfer.requestedBy}
                            onChange={(e) => setNewTransfer(prev => ({...prev, requestedBy: e.target.value}))}
                            className="inter-dept-form-input"
                            placeholder="Employee Name"
                          />
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">Approved By</label>
                          <input
                            type="text"
                            value={newTransfer.approvedBy}
                            onChange={(e) => setNewTransfer(prev => ({...prev, approvedBy: e.target.value}))}
                            className="inter-dept-form-input"
                            placeholder="Approver Name"
                          />
                        </div>
                        <div className="inter-dept-form-group">
                          <label className="inter-dept-form-label">Priority</label>
                          <select
                            value={newTransfer.priority}
                            onChange={(e) => setNewTransfer(prev => ({...prev, priority: e.target.value}))}
                            className="inter-dept-form-select"
                          >
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div className="inter-dept-form-group full-width">
                          <label className="inter-dept-form-label">Purpose of Transfer</label>
                          <textarea
                            value={newTransfer.purpose}
                            onChange={(e) => setNewTransfer(prev => ({...prev, purpose: e.target.value}))}
                            className="inter-dept-form-textarea"
                            placeholder="Describe the purpose for department transfer..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Material Items Section */}
                    <div className="inter-dept-form-section">
                      <div className="inter-dept-section-header">
                        <h4>Items to Transfer</h4>
                        <button
                          type="button"
                          onClick={addItem}
                          className="inter-dept-button outline small"
                        >
                          <PlusIcon />
                          Add Item
                        </button>
                      </div>

                      <div className="inter-dept-items-container">
                        {newTransfer.items.map((item, index) => (
                          <div key={index} className="inter-dept-item-card">
                            <div className="inter-dept-item-header">
                              <h5>Item {index + 1}</h5>
                              {newTransfer.items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeItem(index)}
                                  className="inter-dept-button danger small"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="inter-dept-item-grid">
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Material Code</label>
                                <input
                                  type="text"
                                  value={item.materialCode}
                                  onChange={(e) => updateItem(index, 'materialCode', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="MAT-001"
                                />
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Material Name</label>
                                <input
                                  type="text"
                                  value={item.materialName}
                                  onChange={(e) => updateItem(index, 'materialName', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="Enter material name"
                                />
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Specification</label>
                                <input
                                  type="text"
                                  value={item.specification}
                                  onChange={(e) => updateItem(index, 'specification', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="Technical specifications"
                                />
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Unit</label>
                                <select
                                  value={item.unit}
                                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                  className="inter-dept-form-select"
                                >
                                  <option value="">Select Unit</option>
                                  <option value="Nos">Numbers</option>
                                  <option value="Kg">Kilograms</option>
                                  <option value="Ltr">Liters</option>
                                  <option value="Mtr">Meters</option>
                                  <option value="Sets">Sets</option>
                                  <option value="Units">Units</option>
                                </select>
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Available Qty</label>
                                <input
                                  type="number"
                                  value={item.availableQty}
                                  onChange={(e) => updateItem(index, 'availableQty', e.target.value)}
                                  className="inter-dept-form-input readonly"
                                  placeholder="0"
                                  readOnly
                                />
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Transfer Qty</label>
                                <input
                                  type="number"
                                  value={item.transferQty}
                                  onChange={(e) => updateItem(index, 'transferQty', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div className="inter-dept-form-group">
                                <label className="inter-dept-form-label">Unit Cost (₹)</label>
                                <input
                                  type="number"
                                  value={item.cost}
                                  onChange={(e) => updateItem(index, 'cost', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="0.00"
                                  step="0.01"
                                />
                              </div>
                              <div className="inter-dept-form-group full-width">
                                <label className="inter-dept-form-label">Remarks</label>
                                <input
                                  type="text"
                                  value={item.remarks}
                                  onChange={(e) => updateItem(index, 'remarks', e.target.value)}
                                  className="inter-dept-form-input"
                                  placeholder="Additional notes or remarks"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="inter-dept-form-actions">
                      <button type="button" className="inter-dept-button outline">
                        Cancel
                      </button>
                      <button type="submit" className="inter-dept-button primary">
                        <SaveIcon />
                        Save Transfer Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transfer-reports' && (
              <div className="inter-dept-space-y-4">
                {/* Reports Header */}
                <div className="inter-dept-card">
                  <div className="inter-dept-card-header">
                    <h3 className="inter-dept-card-title">
                      <CalendarIcon />
                      Inter-Department Transfer Reports
                    </h3>
                  </div>
                  <div className="inter-dept-card-content">
                    <div className="inter-dept-reports-grid">
                      <div className="inter-dept-report-card">
                        <div className="inter-dept-report-icon green">
                          <FileTextIcon />
                        </div>
                        <h4 className="inter-dept-report-title">Daily Transfer Report</h4>
                        <p className="inter-dept-report-description">
                          Generate daily inter-department transfer reports with detailed tracking and cost analysis.
                        </p>
                        <button className="inter-dept-button primary small">Generate Report</button>
                      </div>
                      <div className="inter-dept-report-card">
                        <div className="inter-dept-report-icon blue">
                          <BuildingIcon />
                        </div>
                        <h4 className="inter-dept-report-title">Department Wise Analysis</h4>
                        <p className="inter-dept-report-description">
                          Analyze material flow between departments with efficiency and cost optimization insights.
                        </p>
                        <button className="inter-dept-button primary small">Generate Report</button>
                      </div>
                      <div className="inter-dept-report-card">
                        <div className="inter-dept-report-icon purple">
                          <SwapIcon />
                        </div>
                        <h4 className="inter-dept-report-title">Transfer Flow Summary</h4>
                        <p className="inter-dept-report-description">
                          Track transfer patterns and identify optimization opportunities in resource allocation.
                        </p>
                        <button className="inter-dept-button primary small">Generate Report</button>
                      </div>
                      <div className="inter-dept-report-card">
                        <div className="inter-dept-report-icon orange">
                          <TrendingUpIcon />
                        </div>
                        <h4 className="inter-dept-report-title">Cost Analysis Report</h4>
                        <p className="inter-dept-report-description">
                          Comprehensive cost analysis of inter-departmental transfers with budget impact assessment.
                        </p>
                        <button className="inter-dept-button primary small">Generate Report</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="inter-dept-card">
                  <div className="inter-dept-card-content">
                    <div className="inter-dept-stats-section">
                      <h4>Transfer Statistics</h4>
                      <div className="inter-dept-stats-grid">
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">Today's Transfers</span>
                          <span className="inter-dept-stat-value">6</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">This Week</span>
                          <span className="inter-dept-stat-value">28</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">This Month</span>
                          <span className="inter-dept-stat-value">115</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">Avg Daily Value</span>
                          <span className="inter-dept-stat-value">₹86,750</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">Total Value (Month)</span>
                          <span className="inter-dept-stat-value">₹2,602,500</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">Most Active Route</span>
                          <span className="inter-dept-stat-value">Mining → Processing</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">High Priority</span>
                          <span className="inter-dept-stat-value">22%</span>
                        </div>
                        <div className="inter-dept-stat-item">
                          <span className="inter-dept-stat-label">Completion Rate</span>
                          <span className="inter-dept-stat-value">96%</span>
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
        <div className="inter-dept-modal-overlay">
          <div className="inter-dept-modal">
            <div className="inter-dept-modal-header">
              <h3>Approve Department Transfer</h3>
            </div>
            <div className="inter-dept-modal-content">
              <p><strong>Transfer No:</strong> {selectedTransfer.transferNo}</p>
              <p><strong>From Department:</strong> {selectedTransfer.fromDepartment}</p>
              <p><strong>To Department:</strong> {selectedTransfer.toDepartment}</p>
              <p><strong>Requested By:</strong> {selectedTransfer.requestedBy}</p>
              <p><strong>Priority:</strong> {selectedTransfer.priority}</p>
              
              <div className="inter-dept-form-group">
                <label className="inter-dept-form-label">Approver Note</label>
                <textarea
                  value={approverNote}
                  onChange={(e) => setApproverNote(e.target.value)}
                  className="inter-dept-form-textarea"
                  placeholder="Add approval notes..."
                  rows={3}
                />
              </div>
            </div>
            <div className="inter-dept-modal-actions">
              <button 
                onClick={() => setShowTransferModal(false)}
                className="inter-dept-button outline"
              >
                Cancel
              </button>
              <button 
                onClick={submitApproval}
                className="inter-dept-button success"
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
