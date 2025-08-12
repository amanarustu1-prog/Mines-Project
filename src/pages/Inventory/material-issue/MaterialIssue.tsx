import React, { useState } from 'react';
import './styles.css';

const CalendarIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="material-issue-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const FileTextIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const TruckIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const CogIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const UserGroupIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = () => (
  <svg className="material-issue-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function MaterialIssue() {
  const [activeTab, setActiveTab] = useState('issue-overview');
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [approverNote, setApproverNote] = useState('');
  const [newIssue, setNewIssue] = useState({
    issueNo: '',
    date: new Date().toISOString().split('T')[0],
    issueTo: '',
    issueType: 'Machine',
    department: '',
    purpose: '',
    requestedBy: '',
    priority: 'Normal',
    items: [{
      materialCode: '',
      materialName: '',
      specification: '',
      unit: '',
      requestedQty: '',
      availableQty: '',
      issuedQty: '',
      remarks: ''
    }]
  });

  // Sample material issue data
  const [issueData, setIssueData] = useState([
    {
      id: 1,
      issueNo: 'MI-2025-001',
      date: '2025-08-11',
      issueTo: 'Excavator-EX001',
      issueType: 'Machine',
      department: 'Mining Operations',
      purpose: 'Maintenance and repair work',
      requestedBy: 'John Smith',
      priority: 'High',
      status: 'Pending',
      totalItems: 3,
      totalValue: 15750.00,
      items: [
        { materialCode: 'HYD-001', materialName: 'Hydraulic Oil', qty: 20, unit: 'Ltr' },
        { materialCode: 'FIL-002', materialName: 'Oil Filter', qty: 2, unit: 'Nos' },
        { materialCode: 'GRS-003', materialName: 'Grease', qty: 5, unit: 'Kg' }
      ]
    },
    {
      id: 2,
      issueNo: 'MI-2025-002',
      date: '2025-08-10',
      issueTo: 'Dumper-DU001',
      issueType: 'Vehicle',
      department: 'Transport',
      purpose: 'Regular service and maintenance',
      requestedBy: 'Mike Johnson',
      priority: 'Normal',
      status: 'Approved',
      totalItems: 4,
      totalValue: 8200.00,
      items: [
        { materialCode: 'ENG-001', materialName: 'Engine Oil', qty: 15, unit: 'Ltr' },
        { materialCode: 'TYR-002', materialName: 'Tire', qty: 1, unit: 'Nos' },
        { materialCode: 'BAT-003', materialName: 'Battery', qty: 1, unit: 'Nos' }
      ]
    },
    {
      id: 3,
      issueNo: 'MI-2025-003',
      date: '2025-08-09',
      issueTo: 'Processing Plant',
      issueType: 'Department',
      department: 'Processing',
      purpose: 'Equipment maintenance and operation',
      requestedBy: 'Sarah Wilson',
      priority: 'Normal',
      status: 'Issued',
      totalItems: 5,
      totalValue: 22300.00,
      items: [
        { materialCode: 'BLT-001', materialName: 'Conveyor Belt', qty: 50, unit: 'Mtr' },
        { materialCode: 'BRG-002', materialName: 'Bearing', qty: 4, unit: 'Nos' },
        { materialCode: 'SCR-003', materialName: 'Screws & Bolts', qty: 100, unit: 'Nos' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const handleApproval = (issue: any, status: string) => {
    setSelectedIssue(issue);
    setShowIssueModal(true);
  };

  const submitApproval = () => {
    if (selectedIssue) {
      setIssueData(prev => prev.map(issue => 
        issue.id === selectedIssue.id 
          ? { ...issue, status: 'Approved', approverNote }
          : issue
      ));
    }
    setShowIssueModal(false);
    setSelectedIssue(null);
    setApproverNote('');
  };

  const addItem = () => {
    setNewIssue(prev => ({
      ...prev,
      items: [...prev.items, {
        materialCode: '',
        materialName: '',
        specification: '',
        unit: '',
        requestedQty: '',
        availableQty: '',
        issuedQty: '',
        remarks: ''
      }]
    }));
  };

  const removeItem = (index: number) => {
    setNewIssue(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
    setNewIssue(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const filteredIssues = issueData.filter(issue => {
    const matchesSearch = issue.issueNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.issueTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || issue.status === filterStatus;
    const matchesType = filterType === 'All' || issue.issueType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusStats = () => {
    const total = issueData.length;
    const pending = issueData.filter(i => i.status === 'Pending').length;
    const approved = issueData.filter(i => i.status === 'Approved').length;
    const issued = issueData.filter(i => i.status === 'Issued').length;
    
    return { total, pending, approved, issued };
  };

  const statusStats = getStatusStats();

  const exportToCSV = () => {
    const csvData = filteredIssues.map(issue => ({
      'Issue No': issue.issueNo,
      'Date': issue.date,
      'Issue To': issue.issueTo,
      'Type': issue.issueType,
      'Department': issue.department,
      'Purpose': issue.purpose,
      'Requested By': issue.requestedBy,
      'Priority': issue.priority,
      'Status': issue.status,
      'Total Items': issue.totalItems,
      'Total Value': issue.totalValue
    }));
    
    console.log('Exporting CSV:', csvData);
  };

  return (
    <div className="material-issue-container">
      {/* Header */}
      <div className="material-issue-header">
        <div className="material-issue-header-content">
          <div className="material-issue-header-info">
            <div className="material-issue-header-icon">
              <TruckIcon />
            </div>
            <div>
              <h1 className="material-issue-header-title">Material Issue</h1>
              <p className="material-issue-header-subtitle">Issue to Machine/Vehicle/Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="material-issue-main-container">
        {/* Tab Navigation */}
        <div className="material-issue-tab-navigation">
          <div className="material-issue-tab-nav">
            <div className="material-issue-tab-list">
              <button
                onClick={() => setActiveTab('issue-overview')}
                className={`material-issue-tab-button ${activeTab === 'issue-overview' ? 'active' : 'inactive'}`}
              >
                <FileTextIcon />
                Issue Overview
              </button>
              <button
                onClick={() => setActiveTab('create-issue')}
                className={`material-issue-tab-button ${activeTab === 'create-issue' ? 'active' : 'inactive'}`}
              >
                <PlusIcon />
                Create Issue
              </button>
              <button
                onClick={() => setActiveTab('issue-reports')}
                className={`material-issue-tab-button ${activeTab === 'issue-reports' ? 'active' : 'inactive'}`}
              >
                <CalendarIcon />
                Issue Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="material-issue-tab-content">
            {activeTab === 'issue-overview' && (
              <div className="material-issue-space-y-4">
                {/* Summary Cards */}
                <div className="material-issue-grid-4">
                  <div className="material-issue-card">
                    <div className="material-issue-card-content material-issue-summary-card">
                      <div className="material-issue-summary-content">
                        <div className="material-issue-summary-icon total">
                          <FileTextIcon />
                        </div>
                        <div>
                          <p className="material-issue-summary-text">Total Issues</p>
                          <p className="material-issue-summary-number total">{statusStats.total}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="material-issue-card">
                    <div className="material-issue-card-content material-issue-summary-card">
                      <div className="material-issue-summary-content">
                        <div className="material-issue-summary-icon pending">
                          <ClockIcon />
                        </div>
                        <div>
                          <p className="material-issue-summary-text">Pending Issues</p>
                          <p className="material-issue-summary-number pending">{statusStats.pending}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="material-issue-card">
                    <div className="material-issue-card-content material-issue-summary-card">
                      <div className="material-issue-summary-content">
                        <div className="material-issue-summary-icon approved">
                          <CheckCircleIcon />
                        </div>
                        <div>
                          <p className="material-issue-summary-text">Approved Issues</p>
                          <p className="material-issue-summary-number approved">{statusStats.approved}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="material-issue-card">
                    <div className="material-issue-card-content material-issue-summary-card">
                      <div className="material-issue-summary-content">
                        <div className="material-issue-summary-icon issued">
                          <TruckIcon />
                        </div>
                        <div>
                          <p className="material-issue-summary-text">Issued Items</p>
                          <p className="material-issue-summary-number issued">{statusStats.issued}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="material-issue-card">
                  <div className="material-issue-card-content">
                    <div className="material-issue-section-header">
                      <h4>Material Issue Management</h4>
                      <button 
                        onClick={exportToCSV}
                        className="material-issue-button primary"
                      >
                        <DownloadIcon />
                        Export Data
                      </button>
                    </div>
                    
                    <div className="material-issue-form-grid">
                      <div className="material-issue-form-group">
                        <label className="material-issue-form-label">Search Issues</label>
                        <input
                          type="text"
                          placeholder="Search by Issue No, Equipment, or Requester..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="material-issue-form-input"
                        />
                      </div>
                      <div className="material-issue-form-group">
                        <label className="material-issue-form-label">Filter by Status</label>
                        <select
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="material-issue-form-select"
                        >
                          <option value="All">All Status</option>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Issued">Issued</option>
                        </select>
                      </div>
                      <div className="material-issue-form-group">
                        <label className="material-issue-form-label">Filter by Type</label>
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="material-issue-form-select"
                        >
                          <option value="All">All Types</option>
                          <option value="Machine">Machine</option>
                          <option value="Vehicle">Vehicle</option>
                          <option value="Department">Department</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Issues Table */}
                <div className="material-issue-card">
                  <div className="material-issue-card-content">
                    <div className="material-issue-table-container">
                      <table className="material-issue-table">
                        <thead className="material-issue-table-header">
                          <tr>
                            <th>Issue No</th>
                            <th>Date</th>
                            <th>Issue To</th>
                            <th>Type</th>
                            <th>Department</th>
                            <th>Requested By</th>
                            <th>Priority</th>
                            <th>Items</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredIssues.map((issue) => (
                            <tr key={issue.id} className="material-issue-table-row">
                              <td className="material-issue-table-cell issue-no">{issue.issueNo}</td>
                              <td className="material-issue-table-cell">{issue.date}</td>
                              <td className="material-issue-table-cell equipment">{issue.issueTo}</td>
                              <td className="material-issue-table-cell">
                                <span className={`material-issue-badge type ${issue.issueType.toLowerCase()}`}>
                                  {issue.issueType}
                                </span>
                              </td>
                              <td className="material-issue-table-cell">{issue.department}</td>
                              <td className="material-issue-table-cell requester">{issue.requestedBy}</td>
                              <td className="material-issue-table-cell">
                                <span className={`material-issue-badge priority ${issue.priority.toLowerCase()}`}>
                                  {issue.priority}
                                </span>
                              </td>
                              <td className="material-issue-table-cell center">{issue.totalItems}</td>
                              <td className="material-issue-table-cell value">₹{issue.totalValue.toFixed(2)}</td>
                              <td className="material-issue-table-cell">
                                <span className={`material-issue-badge status ${issue.status.toLowerCase()}`}>
                                  {issue.status}
                                </span>
                              </td>
                              <td className="material-issue-table-cell">
                                {issue.status === 'Pending' && (
                                  <button
                                    onClick={() => handleApproval(issue, 'Approved')}
                                    className="material-issue-button small primary"
                                  >
                                    Approve
                                  </button>
                                )}
                                {issue.status === 'Approved' && (
                                  <button
                                    onClick={() => handleApproval(issue, 'Issued')}
                                    className="material-issue-button small success"
                                  >
                                    Issue
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

            {activeTab === 'create-issue' && (
              <div className="material-issue-space-y-4">
                <div className="material-issue-card">
                  <div className="material-issue-card-header">
                    <h3 className="material-issue-card-title">
                      <PlusIcon />
                      Create New Material Issue
                    </h3>
                  </div>
                  <div className="material-issue-card-content">
                    {/* Issue Details Section */}
                    <div className="material-issue-form-section">
                      <h4>Issue Details</h4>
                      <div className="material-issue-form-grid">
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Issue Number</label>
                          <input
                            type="text"
                            value={newIssue.issueNo}
                            onChange={(e) => setNewIssue(prev => ({...prev, issueNo: e.target.value}))}
                            className="material-issue-form-input"
                            placeholder="MI-2025-XXX"
                          />
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Issue Date</label>
                          <input
                            type="date"
                            value={newIssue.date}
                            onChange={(e) => setNewIssue(prev => ({...prev, date: e.target.value}))}
                            className="material-issue-form-input"
                          />
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Issue Type</label>
                          <select
                            value={newIssue.issueType}
                            onChange={(e) => setNewIssue(prev => ({...prev, issueType: e.target.value}))}
                            className="material-issue-form-select"
                          >
                            <option value="Machine">Machine</option>
                            <option value="Vehicle">Vehicle</option>
                            <option value="Department">Department</option>
                          </select>
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Issue To</label>
                          <input
                            type="text"
                            value={newIssue.issueTo}
                            onChange={(e) => setNewIssue(prev => ({...prev, issueTo: e.target.value}))}
                            className="material-issue-form-input"
                            placeholder="Equipment ID / Department Name"
                          />
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Department</label>
                          <select
                            value={newIssue.department}
                            onChange={(e) => setNewIssue(prev => ({...prev, department: e.target.value}))}
                            className="material-issue-form-select"
                          >
                            <option value="">Select Department</option>
                            <option value="Mining Operations">Mining Operations</option>
                            <option value="Transport">Transport</option>
                            <option value="Processing">Processing</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Quality Control">Quality Control</option>
                          </select>
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Requested By</label>
                          <input
                            type="text"
                            value={newIssue.requestedBy}
                            onChange={(e) => setNewIssue(prev => ({...prev, requestedBy: e.target.value}))}
                            className="material-issue-form-input"
                            placeholder="Employee Name"
                          />
                        </div>
                        <div className="material-issue-form-group">
                          <label className="material-issue-form-label">Priority</label>
                          <select
                            value={newIssue.priority}
                            onChange={(e) => setNewIssue(prev => ({...prev, priority: e.target.value}))}
                            className="material-issue-form-select"
                          >
                            <option value="Normal">Normal</option>
                            <option value="High">High</option>
                            <option value="Urgent">Urgent</option>
                          </select>
                        </div>
                        <div className="material-issue-form-group full-width">
                          <label className="material-issue-form-label">Purpose</label>
                          <textarea
                            value={newIssue.purpose}
                            onChange={(e) => setNewIssue(prev => ({...prev, purpose: e.target.value}))}
                            className="material-issue-form-textarea"
                            placeholder="Describe the purpose of material issue..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Material Items Section */}
                    <div className="material-issue-form-section">
                      <div className="material-issue-section-header">
                        <h4>Material Items</h4>
                        <button
                          type="button"
                          onClick={addItem}
                          className="material-issue-button outline small"
                        >
                          <PlusIcon />
                          Add Item
                        </button>
                      </div>

                      <div className="material-issue-items-container">
                        {newIssue.items.map((item, index) => (
                          <div key={index} className="material-issue-item-card">
                            <div className="material-issue-item-header">
                              <h5>Item {index + 1}</h5>
                              {newIssue.items.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeItem(index)}
                                  className="material-issue-button danger small"
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                            <div className="material-issue-item-grid">
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Material Code</label>
                                <input
                                  type="text"
                                  value={item.materialCode}
                                  onChange={(e) => updateItem(index, 'materialCode', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="MAT-001"
                                />
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Material Name</label>
                                <input
                                  type="text"
                                  value={item.materialName}
                                  onChange={(e) => updateItem(index, 'materialName', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="Enter material name"
                                />
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Specification</label>
                                <input
                                  type="text"
                                  value={item.specification}
                                  onChange={(e) => updateItem(index, 'specification', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="Technical specifications"
                                />
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Unit</label>
                                <select
                                  value={item.unit}
                                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                                  className="material-issue-form-select"
                                >
                                  <option value="">Select Unit</option>
                                  <option value="Nos">Numbers</option>
                                  <option value="Kg">Kilograms</option>
                                  <option value="Ltr">Liters</option>
                                  <option value="Mtr">Meters</option>
                                  <option value="Pcs">Pieces</option>
                                </select>
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Requested Qty</label>
                                <input
                                  type="number"
                                  value={item.requestedQty}
                                  onChange={(e) => updateItem(index, 'requestedQty', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Available Qty</label>
                                <input
                                  type="number"
                                  value={item.availableQty}
                                  onChange={(e) => updateItem(index, 'availableQty', e.target.value)}
                                  className="material-issue-form-input readonly"
                                  placeholder="0"
                                  readOnly
                                />
                              </div>
                              <div className="material-issue-form-group">
                                <label className="material-issue-form-label">Issued Qty</label>
                                <input
                                  type="number"
                                  value={item.issuedQty}
                                  onChange={(e) => updateItem(index, 'issuedQty', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="0"
                                />
                              </div>
                              <div className="material-issue-form-group full-width">
                                <label className="material-issue-form-label">Remarks</label>
                                <input
                                  type="text"
                                  value={item.remarks}
                                  onChange={(e) => updateItem(index, 'remarks', e.target.value)}
                                  className="material-issue-form-input"
                                  placeholder="Additional notes or remarks"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="material-issue-form-actions">
                      <button type="button" className="material-issue-button outline">
                        Cancel
                      </button>
                      <button type="submit" className="material-issue-button primary">
                        <SaveIcon />
                        Save Issue Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'issue-reports' && (
              <div className="material-issue-space-y-4">
                {/* Reports Header */}
                <div className="material-issue-card">
                  <div className="material-issue-card-header">
                    <h3 className="material-issue-card-title">
                      <CalendarIcon />
                      Material Issue Reports
                    </h3>
                  </div>
                  <div className="material-issue-card-content">
                    <div className="material-issue-reports-grid">
                      <div className="material-issue-report-card">
                        <div className="material-issue-report-icon purple">
                          <FileTextIcon />
                        </div>
                        <h4 className="material-issue-report-title">Daily Issue Report</h4>
                        <p className="material-issue-report-description">
                          Generate daily material issue reports with detailed item breakdown and status tracking.
                        </p>
                        <button className="material-issue-button primary small">Generate Report</button>
                      </div>
                      <div className="material-issue-report-card">
                        <div className="material-issue-report-icon green">
                          <CogIcon />
                        </div>
                        <h4 className="material-issue-report-title">Machine Issue Analysis</h4>
                        <p className="material-issue-report-description">
                          Analyze material consumption by machines and equipment with maintenance patterns.
                        </p>
                        <button className="material-issue-button primary small">Generate Report</button>
                      </div>
                      <div className="material-issue-report-card">
                        <div className="material-issue-report-icon blue">
                          <TruckIcon />
                        </div>
                        <h4 className="material-issue-report-title">Vehicle Issue Summary</h4>
                        <p className="material-issue-report-description">
                          Track material issues to vehicles with fuel, parts, and maintenance item analysis.
                        </p>
                        <button className="material-issue-button primary small">Generate Report</button>
                      </div>
                      <div className="material-issue-report-card">
                        <div className="material-issue-report-icon orange">
                          <UserGroupIcon />
                        </div>
                        <h4 className="material-issue-report-title">Department Consumption</h4>
                        <p className="material-issue-report-description">
                          Departmental material consumption reports with cost analysis and trend identification.
                        </p>
                        <button className="material-issue-button primary small">Generate Report</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="material-issue-card">
                  <div className="material-issue-card-content">
                    <div className="material-issue-stats-section">
                      <h4>Issue Statistics</h4>
                      <div className="material-issue-stats-grid">
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Today's Issues</span>
                          <span className="material-issue-stat-value">12</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">This Week</span>
                          <span className="material-issue-stat-value">48</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">This Month</span>
                          <span className="material-issue-stat-value">186</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Avg Daily Value</span>
                          <span className="material-issue-stat-value">₹18,750</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Total Value (Month)</span>
                          <span className="material-issue-stat-value">₹562,500</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Machine Issues</span>
                          <span className="material-issue-stat-value">45%</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Vehicle Issues</span>
                          <span className="material-issue-stat-value">35%</span>
                        </div>
                        <div className="material-issue-stat-item">
                          <span className="material-issue-stat-label">Department Issues</span>
                          <span className="material-issue-stat-value">20%</span>
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
      {showIssueModal && selectedIssue && (
        <div className="material-issue-modal-overlay">
          <div className="material-issue-modal">
            <div className="material-issue-modal-header">
              <h3>Approve Material Issue</h3>
            </div>
            <div className="material-issue-modal-content">
              <p><strong>Issue No:</strong> {selectedIssue.issueNo}</p>
              <p><strong>Issue To:</strong> {selectedIssue.issueTo}</p>
              <p><strong>Requested By:</strong> {selectedIssue.requestedBy}</p>
              <p><strong>Department:</strong> {selectedIssue.department}</p>
              
              <div className="material-issue-form-group">
                <label className="material-issue-form-label">Approver Note</label>
                <textarea
                  value={approverNote}
                  onChange={(e) => setApproverNote(e.target.value)}
                  className="material-issue-form-textarea"
                  placeholder="Add approval notes..."
                  rows={3}
                />
              </div>
            </div>
            <div className="material-issue-modal-actions">
              <button 
                onClick={() => setShowIssueModal(false)}
                className="material-issue-button outline"
              >
                Cancel
              </button>
              <button 
                onClick={submitApproval}
                className="material-issue-button success"
              >
                Approve Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
