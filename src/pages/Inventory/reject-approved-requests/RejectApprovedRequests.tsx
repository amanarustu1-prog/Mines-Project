import React, { useState } from 'react';
import './RejectApprovedRequests.css';

// Icon components (simplified SVG icons)
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

export default function RejectApprovedRequests() {
  const [activeTab, setActiveTab] = useState('approved-overview');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Sample approved requests data - these are already approved requests that can be rejected
  const [approvedRequests, setApprovedRequests] = useState([
    {
      id: 1,
      requestNo: 'SUP-2025-001',
      type: 'Supplier Registration',
      companyName: 'TIWARI HEAVY MACHINERY PVT LTD',
      contactPerson: 'RAJESH TIWARI',
      category: 'Heavy Machinery',
      approvedDate: '2025-07-20',
      approvedBy: 'ADMIN USER',
      originalApprovalReason: 'Good track record and compliance',
      requestDate: '2025-07-14',
      department: 'Procurement',
      amount: 500000,
      status: 'Approved',
      priority: 'High',
      contractDuration: '2 Years'
    },
    {
      id: 2,
      requestNo: 'MAT-2025-015',
      type: 'Material Purchase',
      companyName: 'STEEL SUPPLIERS INC.',
      contactPerson: 'KUMAR STEEL',
      category: 'Raw Materials',
      approvedDate: '2025-07-18',
      approvedBy: 'PROCUREMENT HEAD',
      originalApprovalReason: 'Best quotation and quality standards',
      requestDate: '2025-07-10',
      department: 'Materials',
      amount: 750000,
      status: 'Approved',
      priority: 'Medium',
      contractDuration: '6 Months'
    },
    {
      id: 3,
      requestNo: 'EQP-2025-008',
      type: 'Equipment Purchase',
      companyName: 'MINING EQUIPMENT CO.',
      contactPerson: 'EQUIPMENT SOLUTIONS',
      category: 'Mining Equipment',
      approvedDate: '2025-07-22',
      approvedBy: 'OPERATIONS MANAGER',
      originalApprovalReason: 'Technical specifications met requirements',
      requestDate: '2025-07-12',
      department: 'Operations',
      amount: 1200000,
      status: 'Approved',
      priority: 'High',
      contractDuration: '3 Years'
    },
    {
      id: 4,
      requestNo: 'SER-2025-012',
      type: 'Service Contract',
      companyName: 'MAINTENANCE SERVICES PVT LTD',
      contactPerson: 'SERVICE TEAM',
      category: 'Maintenance',
      approvedDate: '2025-07-19',
      approvedBy: 'FACILITY MANAGER',
      originalApprovalReason: 'Competitive pricing and expertise',
      requestDate: '2025-07-08',
      department: 'Facilities',
      amount: 300000,
      status: 'Approved',
      priority: 'Low',
      contractDuration: '1 Year'
    },
    {
      id: 5,
      requestNo: 'LEA-2025-004',
      type: 'Leave Request',
      companyName: 'N/A',
      contactPerson: 'EMPLOYEE: RAJESH KUMAR',
      category: 'Human Resources',
      approvedDate: '2025-07-21',
      approvedBy: 'HR MANAGER',
      originalApprovalReason: 'Annual leave quota available',
      requestDate: '2025-07-15',
      department: 'Human Resources',
      amount: 0,
      status: 'Approved',
      priority: 'Medium',
      contractDuration: '15 Days'
    }
  ]);

  const tabs = [
    { id: 'approved-overview', label: 'Approved Requests', icon: CheckCircle },
    { id: 'rejection-history', label: 'Rejection History', icon: XCircle },
    { id: 'analytics', label: 'Analytics', icon: FileText }
  ];

  const requestTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'Supplier Registration', label: 'Supplier Registration' },
    { value: 'Material Purchase', label: 'Material Purchase' },
    { value: 'Equipment Purchase', label: 'Equipment Purchase' },
    { value: 'Service Contract', label: 'Service Contract' },
    { value: 'Leave Request', label: 'Leave Request' }
  ];

  // Filter requests based on search term and type
  const filteredRequests = approvedRequests.filter(request => {
    const matchesSearch = searchTerm === '' || 
      request.requestNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || request.type === filterType;
    
    return matchesSearch && matchesType && request.status === 'Approved';
  });

  const handleRejectRequest = (request: any) => {
    setSelectedRequest(request);
    setShowRejectionModal(true);
  };

  const submitRejection = () => {
    if (selectedRequest && rejectionReason.trim()) {
      setApprovedRequests(prev => 
        prev.map(request => 
          request.id === selectedRequest.id 
            ? { 
                ...request, 
                status: 'Rejected',
                rejectionDate: new Date().toISOString().split('T')[0],
                rejectionReason: rejectionReason,
                rejectedBy: 'ADMIN USER'
              }
            : request
        )
      );
      setShowRejectionModal(false);
      setRejectionReason('');
      setSelectedRequest(null);
      alert('Request rejected successfully!');
    } else {
      alert('Please provide a reason for rejection.');
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClass = 'reject-badge';
    switch (status) {
      case 'Approved':
        return `${baseClass} approved`;
      case 'Rejected':
        return `${baseClass} rejected`;
      default:
        return `${baseClass} pending`;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const baseClass = 'reject-badge priority';
    switch (priority) {
      case 'High':
        return `${baseClass} high`;
      case 'Medium':
        return `${baseClass} medium`;
      case 'Low':
        return `${baseClass} low`;
      default:
        return baseClass;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'approved-overview':
        return (
          <div className="reject-space-y-4">
            {/* Summary Cards */}
            <div className="reject-grid-4">
              <div className="reject-card reject-summary-card">
                <div className="reject-summary-content">
                  <div className="reject-summary-icon total">
                    <CheckCircle className="reject-icon-md" />
                  </div>
                  <div>
                    <p className="reject-summary-number total">{filteredRequests.length}</p>
                    <p className="reject-summary-text">Total Approved</p>
                  </div>
                </div>
              </div>
              
              <div className="reject-card reject-summary-card">
                <div className="reject-summary-content">
                  <div className="reject-summary-icon high">
                    <AlertCircle className="reject-icon-md" />
                  </div>
                  <div>
                    <p className="reject-summary-number high">
                      {filteredRequests.filter(r => r.priority === 'High').length}
                    </p>
                    <p className="reject-summary-text">High Priority</p>
                  </div>
                </div>
              </div>
              
              <div className="reject-card reject-summary-card">
                <div className="reject-summary-content">
                  <div className="reject-summary-icon medium">
                    <Clock className="reject-icon-md" />
                  </div>
                  <div>
                    <p className="reject-summary-number medium">
                      {filteredRequests.filter(r => r.priority === 'Medium').length}
                    </p>
                    <p className="reject-summary-text">Medium Priority</p>
                  </div>
                </div>
              </div>
              
              <div className="reject-card reject-summary-card">
                <div className="reject-summary-content">
                  <div className="reject-summary-icon low">
                    <Shield className="reject-icon-md" />
                  </div>
                  <div>
                    <p className="reject-summary-number low">
                      {filteredRequests.filter(r => r.priority === 'Low').length}
                    </p>
                    <p className="reject-summary-text">Low Priority</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="reject-card">
              <div className="reject-card-header">
                <h3 className="reject-card-title">
                  <Shield className="reject-icon-sm" />
                  Approved Requests Management
                </h3>
              </div>
              <div className="reject-card-content">
                <div className="reject-flex reject-flex-gap-3 reject-search-filter">
                  <div className="reject-search-container">
                    <Search className="reject-search-icon" />
                    <input
                      type="text"
                      placeholder="Search requests, companies, contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="reject-search-input"
                    />
                  </div>
                  <div className="reject-filter-container">
                    <Filter className="reject-filter-icon" />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="reject-filter-select"
                    >
                      {requestTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Approved Requests Table */}
            <div className="reject-card">
              <div className="reject-card-header">
                <h3 className="reject-card-title">
                  <FileText className="reject-icon-sm" />
                  Approved Requests ({filteredRequests.length})
                </h3>
              </div>
              <div className="reject-card-content">
                <div className="reject-table-container">
                  <table className="reject-table">
                    <thead className="reject-table-header">
                      <tr>
                        <th>Request No.</th>
                        <th>Type</th>
                        <th>Company/Person</th>
                        <th>Category</th>
                        <th>Amount</th>
                        <th>Approved Date</th>
                        <th>Approved By</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id} className="reject-table-row">
                          <td className="reject-table-cell emp-no">{request.requestNo}</td>
                          <td className="reject-table-cell">
                            <span className="reject-badge request-type">
                              {request.type}
                            </span>
                          </td>
                          <td className="reject-table-cell name">{request.companyName}</td>
                          <td className="reject-table-cell">{request.category}</td>
                          <td className="reject-table-cell center">
                            {request.amount > 0 ? `₹${request.amount.toLocaleString()}` : 'N/A'}
                          </td>
                          <td className="reject-table-cell mono small">{request.approvedDate}</td>
                          <td className="reject-table-cell">{request.approvedBy}</td>
                          <td className="reject-table-cell">
                            <span className={getPriorityBadge(request.priority)}>
                              {request.priority}
                            </span>
                          </td>
                          <td className="reject-table-cell">
                            <span className={getStatusBadge(request.status)}>
                              {request.status}
                            </span>
                          </td>
                          <td className="reject-table-cell">
                            <div className="reject-flex reject-flex-gap-1">
                              {request.status === 'Approved' && (
                                <button 
                                  className="reject-button ghost danger"
                                  onClick={() => handleRejectRequest(request)}
                                  title="Reject Request"
                                >
                                  <XCircle className="reject-icon-sm" />
                                </button>
                              )}
                              <button 
                                className="reject-button ghost primary"
                                title="View Details"
                              >
                                <Edit3 className="reject-icon-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredRequests.length === 0 && (
                    <div className="reject-empty-state">
                      <CheckCircle className="reject-empty-icon" />
                      <p>No approved requests found matching your criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'rejection-history':
        return (
          <div className="reject-space-y-4">
            <div className="reject-card">
              <div className="reject-card-header">
                <h3 className="reject-card-title">
                  <XCircle className="reject-icon-sm" />
                  Rejection History
                </h3>
              </div>
              <div className="reject-card-content">
                <div className="reject-table-container">
                  <table className="reject-table">
                    <thead className="reject-table-header">
                      <tr>
                        <th>Request No.</th>
                        <th>Type</th>
                        <th>Company/Person</th>
                        <th>Originally Approved</th>
                        <th>Rejected Date</th>
                        <th>Rejected By</th>
                        <th>Rejection Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedRequests.filter(r => r.status === 'Rejected').map((request) => (
                        <tr key={request.id} className="reject-table-row">
                          <td className="reject-table-cell emp-no">{request.requestNo}</td>
                          <td className="reject-table-cell">
                            <span className="reject-badge request-type">
                              {request.type}
                            </span>
                          </td>
                          <td className="reject-table-cell name">{request.companyName}</td>
                          <td className="reject-table-cell mono small">{request.approvedDate}</td>
                          <td className="reject-table-cell mono small">
                            {(request as any).rejectionDate || 'N/A'}
                          </td>
                          <td className="reject-table-cell">
                            {(request as any).rejectedBy || 'N/A'}
                          </td>
                          <td className="reject-table-cell truncate">
                            {(request as any).rejectionReason || 'N/A'}
                          </td>
                          <td className="reject-table-cell">
                            <span className={getStatusBadge(request.status)}>
                              {request.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {approvedRequests.filter(r => r.status === 'Rejected').length === 0 && (
                    <div className="reject-empty-state">
                      <XCircle className="reject-empty-icon" />
                      <p>No rejected requests found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="reject-space-y-4">
            <div className="reject-card">
              <div className="reject-card-header">
                <h3 className="reject-card-title">
                  <FileText className="reject-icon-sm" />
                  Request Analytics & Reports
                </h3>
              </div>
              <div className="reject-card-content">
                <div className="reject-stats-section">
                  <div className="reject-stats-title">Overview Statistics</div>
                  <div className="reject-stats-grid">
                    <div>
                      <div className="reject-stats-number blue">
                        {approvedRequests.filter(r => r.status === 'Approved').length}
                      </div>
                      <div className="reject-stats-label blue">Currently Approved</div>
                    </div>
                    <div>
                      <div className="reject-stats-number red">
                        {approvedRequests.filter(r => r.status === 'Rejected').length}
                      </div>
                      <div className="reject-stats-label red">Admin Rejected</div>
                    </div>
                    <div>
                      <div className="reject-stats-number green">
                        {approvedRequests.filter(r => r.priority === 'High').length}
                      </div>
                      <div className="reject-stats-label green">High Priority</div>
                    </div>
                    <div>
                      <div className="reject-stats-number purple">
                        {approvedRequests.reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}
                      </div>
                      <div className="reject-stats-label purple">Total Value (₹)</div>
                    </div>
                  </div>
                </div>

                <div className="reject-reports-grid">
                  <div className="reject-report-card">
                    <Building className="reject-report-icon blue" />
                    <div className="reject-report-title">Monthly Report</div>
                    <div className="reject-report-description">
                      Generate monthly approved/rejected requests report
                    </div>
                    <button className="reject-button primary small">
                      Generate Report
                    </button>
                  </div>
                  
                  <div className="reject-report-card">
                    <Users className="reject-report-icon green" />
                    <div className="reject-report-title">Department Analysis</div>
                    <div className="reject-report-description">
                      Analyze requests by department and approval rates
                    </div>
                    <button className="reject-button success small">
                      View Analysis
                    </button>
                  </div>
                  
                  <div className="reject-report-card">
                    <Truck className="reject-report-icon orange" />
                    <div className="reject-report-title">Category Breakdown</div>
                    <div className="reject-report-description">
                      Request breakdown by categories and suppliers
                    </div>
                    <button className="reject-button outline small">
                      Export Data
                    </button>
                  </div>
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
    <div className="reject-management-container">
      {/* Header */}
      <div className="reject-header">
        <div className="reject-header-content">
          <div className="reject-header-info">
            <div className="reject-header-icon">
              <Shield className="reject-icon-sm" />
            </div>
            <div>
              <h1 className="reject-header-title">Request & Approval Management</h1>
              <p className="reject-header-subtitle">Admin Control - Reject Already Approved Requests</p>
            </div>
          </div>
          <div className="reject-flex reject-flex-gap-3">
            <button className="reject-button outline">
              <Calendar className="reject-icon-sm" />
              Export
            </button>
            <button className="reject-button primary">
              <FileText className="reject-icon-sm" />
              Reports
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="reject-main-container">
        
        {/* Tab Navigation */}
        <div className="reject-tab-navigation">
          <nav className="reject-tab-nav">
            <div className="reject-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`reject-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="reject-icon-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>

      {/* Rejection Modal */}
      {showRejectionModal && selectedRequest && (
        <div className="reject-modal-overlay">
          <div className="reject-modal-content">
            <h3 className="reject-modal-title">
              <XCircle className="reject-icon-sm" />
              Reject Approved Request
            </h3>
            <div className="reject-modal-info">
              <p><span>Request No:</span> {selectedRequest.requestNo}</p>
              <p><span>Type:</span> {selectedRequest.type}</p>
              <p><span>Company:</span> {selectedRequest.companyName}</p>
              <p><span>Approved Date:</span> {selectedRequest.approvedDate}</p>
              <p><span>Approved By:</span> {selectedRequest.approvedBy}</p>
              <p><span>Original Reason:</span> {selectedRequest.originalApprovalReason}</p>
            </div>
            <div className="reject-form-group">
              <label className="reject-form-label">Reason for Rejection *</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="reject-form-textarea"
                rows={4}
                placeholder="Provide a detailed reason for rejecting this approved request..."
                required
              />
            </div>
            <div className="reject-modal-buttons">
              <button 
                className="reject-button outline"
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                  setSelectedRequest(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="reject-button danger"
                onClick={submitRejection}
              >
                <XCircle className="reject-icon-sm" />
                Reject Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
