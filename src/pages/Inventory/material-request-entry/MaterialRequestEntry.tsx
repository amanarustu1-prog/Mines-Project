import React, { useState } from 'react';
import './MaterialRequestEntry.css';

// Icon components (simplified SVG icons)
const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H19M7 13v4a2 2 0 002 2h4m0 0a2 2 0 110 4 2 2 0 010-4zm6 0a2 2 0 110 4 2 2 0 010-4z" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function MaterialRequestEntry() {
  const [activeTab, setActiveTab] = useState('request-overview');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');

  // Sample material request data
  const [requestData, setRequestData] = useState([
    {
      id: 1,
      requestNo: 'MR-001-2024',
      requestType: 'Purchase Order',
      department: 'Mining Operations',
      requestedBy: 'SHUBHAM SINGH',
      priority: 'High',
      requiredDate: '2025-08-15',
      materialName: 'Excavator Parts',
      category: 'Machinery',
      quantity: 5,
      unit: 'PCS',
      estimatedCost: 125000,
      supplier: 'Caterpillar India Pvt Ltd',
      description: 'Hydraulic cylinder seals and pistons for CAT 320 excavator',
      status: 'Pending',
      requestDate: '2025-08-01',
      approverNote: ''
    },
    {
      id: 2,
      requestNo: 'MR-002-2024',
      requestType: 'Requisition',
      department: 'Safety',
      requestedBy: 'RAHUL KUMAR',
      priority: 'Critical',
      requiredDate: '2025-08-10',
      materialName: 'Safety Helmets',
      category: 'Safety Equipment',
      quantity: 50,
      unit: 'PCS',
      estimatedCost: 25000,
      supplier: 'MSA Safety India',
      description: 'ISI marked safety helmets with chin straps',
      status: 'Approved',
      requestDate: '2025-07-28',
      approverNote: 'Approved for immediate procurement'
    },
    {
      id: 3,
      requestNo: 'MR-003-2024',
      requestType: 'Purchase Order',
      department: 'Maintenance',
      requestedBy: 'PRIYA SHARMA',
      priority: 'Medium',
      requiredDate: '2025-08-20',
      materialName: 'Hydraulic Oil',
      category: 'Consumables',
      quantity: 20,
      unit: 'LTR',
      estimatedCost: 15000,
      supplier: 'Shell India Markets',
      description: 'High-performance hydraulic oil for heavy machinery',
      status: 'Rejected',
      requestDate: '2025-07-25',
      approverNote: 'Budget constraints, defer to next quarter'
    },
    {
      id: 4,
      requestNo: 'MR-004-2024',
      requestType: 'Requisition',
      department: 'Production',
      requestedBy: 'AMIT SINGH',
      priority: 'High',
      requiredDate: '2025-08-12',
      materialName: 'Conveyor Belts',
      category: 'Equipment',
      quantity: 2,
      unit: 'PCS',
      estimatedCost: 85000,
      supplier: 'Fenner India Ltd',
      description: 'Heavy-duty conveyor belts for material handling system',
      status: 'Pending',
      requestDate: '2025-08-02',
      approverNote: ''
    }
  ]);

  // New material request form data
  const [newRequest, setNewRequest] = useState({
    requestNo: `MR-${String(requestData.length + 1).padStart(3, '0')}-2024`,
    requestType: 'Purchase Order',
    department: 'Mining Operations',
    requestedBy: 'SHUBHAM SINGH',
    priority: 'Medium',
    requiredDate: '',
    materialName: '',
    category: 'Machinery',
    quantity: 1,
    unit: 'PCS',
    estimatedCost: 0,
    supplier: '',
    description: '',
    status: 'Pending',
    requestDate: new Date().toISOString().split('T')[0],
    approverNote: ''
  });

  const tabs = [
    { id: 'request-overview', label: 'Request Overview', icon: Package },
    { id: 'add-request', label: 'Add Material Request', icon: Plus },
    { id: 'purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
    { id: 'requisitions', label: 'Requisitions', icon: FileText }
  ];

  const departments = [
    'Mining Operations',
    'Safety',
    'Maintenance',
    'Production',
    'Administration',
    'Quality Control',
    'Environmental',
    'Finance'
  ];

  const requestTypes = [
    'Purchase Order',
    'Requisition',
    'Emergency Request',
    'Capital Purchase',
    'Service Request'
  ];

  const priorities = [
    'Low',
    'Medium',
    'High',
    'Critical'
  ];

  const categories = [
    'Machinery',
    'Safety Equipment',
    'Consumables',
    'Equipment',
    'Raw Materials',
    'Tools',
    'Spare Parts',
    'Office Supplies',
    'Maintenance Items'
  ];

  const units = [
    'PCS', 'KG', 'LTR', 'MTR', 'SQM', 'CUM', 'TON', 'BOX', 'SET', 'PKT'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setNewRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveRequest = () => {
    const newEntry = {
      id: requestData.length + 1,
      ...newRequest,
      requestDate: new Date().toISOString().split('T')[0]
    };

    setRequestData(prev => [...prev, newEntry]);
    setNewRequest({
      requestNo: `MR-${String(requestData.length + 2).padStart(3, '0')}-2024`,
      requestType: 'Purchase Order',
      department: 'Mining Operations',
      requestedBy: 'SHUBHAM SINGH',
      priority: 'Medium',
      requiredDate: '',
      materialName: '',
      category: 'Machinery',
      quantity: 1,
      unit: 'PCS',
      estimatedCost: 0,
      supplier: '',
      description: '',
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      approverNote: ''
    });
    alert('Material request saved successfully!');
  };

  const handleApproveReject = (request: any, action: 'approve' | 'reject') => {
    setSelectedRequest({ ...request, action });
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (selectedRequest) {
      const updatedStatus = selectedRequest.action === 'approve' ? 'Approved' : 'Rejected';
      setRequestData(prev => 
        prev.map(request => 
          request.id === selectedRequest.id 
            ? { ...request, status: updatedStatus, approverNote: approvalNote }
            : request
        )
      );
      setShowApprovalModal(false);
      setApprovalNote('');
      setSelectedRequest(null);
      alert(`Material request ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending': return 'material-status-pending';
      case 'Approved': return 'material-status-approved';
      case 'Rejected': return 'material-status-rejected';
      default: return 'material-status-pending';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'Low': return 'material-priority-low';
      case 'Medium': return 'material-priority-medium';
      case 'High': return 'material-priority-high';
      case 'Critical': return 'material-priority-critical';
      default: return 'material-priority-medium';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'request-overview':
        return (
          <div className="material-space-y-4">
            {/* Request Summary Cards */}
            <div className="material-grid-4">
              <div className="material-card">
                <div className="material-summary-card">
                  <div className="material-summary-content">
                    <div className="material-summary-icon pending">
                      <AlertCircle className="material-icon-lg" />
                    </div>
                    <div>
                      <p className="material-summary-text">Pending Requests</p>
                      <p className="material-summary-number pending">
                        {requestData.filter(request => request.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-card">
                <div className="material-summary-card">
                  <div className="material-summary-content">
                    <div className="material-summary-icon approved">
                      <CheckCircle className="material-icon-lg" />
                    </div>
                    <div>
                      <p className="material-summary-text">Approved</p>
                      <p className="material-summary-number approved">
                        {requestData.filter(request => request.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-card">
                <div className="material-summary-card">
                  <div className="material-summary-content">
                    <div className="material-summary-icon rejected">
                      <XCircle className="material-icon-lg" />
                    </div>
                    <div>
                      <p className="material-summary-text">Rejected</p>
                      <p className="material-summary-number rejected">
                        {requestData.filter(request => request.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="material-card">
                <div className="material-summary-card">
                  <div className="material-summary-content">
                    <div className="material-summary-icon total">
                      <Package className="material-icon-lg" />
                    </div>
                    <div>
                      <p className="material-summary-text">Total Requests</p>
                      <p className="material-summary-number total">{requestData.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Material Requests Table */}
            <div className="material-card">
              <div className="material-card-header">
                <h3 className="material-card-title">
                  <Package className="material-icon-sm" />
                  Material Requests - {new Date().getFullYear()}
                </h3>
                <button 
                  className="material-button primary small"
                  onClick={() => setActiveTab('add-request')}
                >
                  <Plus className="material-icon-sm" />
                  Add Material Request
                </button>
              </div>

              <div className="material-card-content">
                <div className="material-table-container">
                  <table className="material-table">
                    <thead>
                      <tr>
                        <th>Request No.</th>
                        <th>Type</th>
                        <th>Department</th>
                        <th>Requested By</th>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Estimated Cost</th>
                        <th>Priority</th>
                        <th>Required Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestData.map((request) => (
                        <tr key={request.id}>
                          <td className="material-table-cell-bold">{request.requestNo}</td>
                          <td>
                            <span className="material-type-badge">
                              {request.requestType}
                            </span>
                          </td>
                          <td>{request.department}</td>
                          <td>{request.requestedBy}</td>
                          <td>
                            <div>
                              <div className="material-table-cell-bold">{request.materialName}</div>
                              <div className="material-table-cell-sub">{request.category}</div>
                            </div>
                          </td>
                          <td>{request.quantity} {request.unit}</td>
                          <td className="material-table-cell-bold">{formatCurrency(request.estimatedCost)}</td>
                          <td>
                            <span className={`material-priority-badge ${getPriorityBadgeClass(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td>{new Date(request.requiredDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`material-status-badge ${getStatusBadgeClass(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td>
                            <div className="material-action-buttons">
                              {request.status === 'Pending' && (
                                <>
                                  <button
                                    className="material-action-button approve"
                                    onClick={() => handleApproveReject(request, 'approve')}
                                    title="Approve"
                                  >
                                    <CheckCircle className="material-icon-xs" />
                                  </button>
                                  <button
                                    className="material-action-button reject"
                                    onClick={() => handleApproveReject(request, 'reject')}
                                    title="Reject"
                                  >
                                    <XCircle className="material-icon-xs" />
                                  </button>
                                </>
                              )}
                              <button
                                className="material-action-button edit"
                                title="Edit"
                              >
                                <Edit3 className="material-icon-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'add-request':
        return (
          <div className="material-space-y-4">
            <div className="material-card">
              <div className="material-card-header">
                <h3 className="material-card-title">
                  <Plus className="material-icon-sm" />
                  Add New Material Request
                </h3>
              </div>

              <div className="material-card-content">
                <div className="material-form-grid">
                  <div className="material-space-y-4">
                    <div className="material-form-group">
                      <label className="material-form-label">Request No.:-</label>
                      <input 
                        value={newRequest.requestNo}
                        readOnly
                        className="material-form-input readonly"
                      />
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Request Type:-</label>
                      <select 
                        value={newRequest.requestType}
                        onChange={(e) => handleInputChange('requestType', e.target.value)}
                        className="material-form-select"
                      >
                        {requestTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Department:-</label>
                      <select 
                        value={newRequest.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="material-form-select"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Requested By:-</label>
                      <input 
                        value={newRequest.requestedBy}
                        onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                        className="material-form-input"
                        placeholder="Enter requestor name"
                      />
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Priority:-</label>
                      <select 
                        value={newRequest.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="material-form-select"
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Required Date:-</label>
                      <input 
                        type="date"
                        value={newRequest.requiredDate}
                        onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                        className="material-form-input"
                      />
                    </div>
                  </div>

                  <div className="material-space-y-4">
                    <div className="material-form-group">
                      <label className="material-form-label">Material Name:-</label>
                      <input 
                        value={newRequest.materialName}
                        onChange={(e) => handleInputChange('materialName', e.target.value)}
                        className="material-form-input"
                        placeholder="Enter material name"
                      />
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Category:-</label>
                      <select 
                        value={newRequest.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="material-form-select"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Quantity:-</label>
                      <input 
                        type="number"
                        value={newRequest.quantity}
                        onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                        className="material-form-input"
                        min="1"
                      />
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Unit:-</label>
                      <select 
                        value={newRequest.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                        className="material-form-select"
                      >
                        {units.map(unit => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Estimated Cost (₹):-</label>
                      <input 
                        type="number"
                        value={newRequest.estimatedCost}
                        onChange={(e) => handleInputChange('estimatedCost', Number(e.target.value))}
                        className="material-form-input"
                        min="0"
                        step="0.01"
                      />
                    </div>

                    <div className="material-form-group">
                      <label className="material-form-label">Preferred Supplier:-</label>
                      <input 
                        value={newRequest.supplier}
                        onChange={(e) => handleInputChange('supplier', e.target.value)}
                        className="material-form-input"
                        placeholder="Enter supplier name"
                      />
                    </div>
                  </div>
                </div>

                <div className="material-form-group-full">
                  <label className="material-form-label">Description/Specifications:-</label>
                  <textarea 
                    value={newRequest.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="material-form-textarea"
                    rows={4}
                    placeholder="Enter detailed description and specifications"
                  />
                </div>

                <div className="material-form-actions">
                  <button 
                    className="material-button primary"
                    onClick={handleSaveRequest}
                  >
                    <Save className="material-icon-sm" />
                    Save Request
                  </button>
                  <button 
                    className="material-button secondary"
                    onClick={() => setActiveTab('request-overview')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'purchase-orders':
        return (
          <div className="material-space-y-4">
            <div className="material-card">
              <div className="material-card-header">
                <h3 className="material-card-title">
                  <ShoppingCart className="material-icon-sm" />
                  Purchase Orders
                </h3>
                <button 
                  className="material-button primary small"
                  onClick={() => setActiveTab('add-request')}
                >
                  <Plus className="material-icon-sm" />
                  New Purchase Order
                </button>
              </div>

              <div className="material-card-content">
                <div className="material-table-container">
                  <table className="material-table">
                    <thead>
                      <tr>
                        <th>PO Number</th>
                        <th>Department</th>
                        <th>Material</th>
                        <th>Supplier</th>
                        <th>Quantity</th>
                        <th>Estimated Cost</th>
                        <th>Required Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestData
                        .filter(request => request.requestType === 'Purchase Order')
                        .map((request) => (
                        <tr key={request.id}>
                          <td className="material-table-cell-bold">{request.requestNo}</td>
                          <td>{request.department}</td>
                          <td>
                            <div>
                              <div className="material-table-cell-bold">{request.materialName}</div>
                              <div className="material-table-cell-sub">{request.category}</div>
                            </div>
                          </td>
                          <td>{request.supplier}</td>
                          <td>{request.quantity} {request.unit}</td>
                          <td className="material-table-cell-bold">{formatCurrency(request.estimatedCost)}</td>
                          <td>{new Date(request.requiredDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`material-status-badge ${getStatusBadgeClass(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td>
                            <div className="material-action-buttons">
                              <button className="material-action-button edit" title="Edit">
                                <Edit3 className="material-icon-xs" />
                              </button>
                              <button className="material-action-button download" title="Download">
                                <Download className="material-icon-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'requisitions':
        return (
          <div className="material-space-y-4">
            <div className="material-card">
              <div className="material-card-header">
                <h3 className="material-card-title">
                  <FileText className="material-icon-sm" />
                  Requisitions
                </h3>
                <button 
                  className="material-button primary small"
                  onClick={() => setActiveTab('add-request')}
                >
                  <Plus className="material-icon-sm" />
                  New Requisition
                </button>
              </div>

              <div className="material-card-content">
                <div className="material-table-container">
                  <table className="material-table">
                    <thead>
                      <tr>
                        <th>Requisition No.</th>
                        <th>Department</th>
                        <th>Requested By</th>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Priority</th>
                        <th>Required Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requestData
                        .filter(request => request.requestType === 'Requisition')
                        .map((request) => (
                        <tr key={request.id}>
                          <td className="material-table-cell-bold">{request.requestNo}</td>
                          <td>{request.department}</td>
                          <td>{request.requestedBy}</td>
                          <td>
                            <div>
                              <div className="material-table-cell-bold">{request.materialName}</div>
                              <div className="material-table-cell-sub">{request.category}</div>
                            </div>
                          </td>
                          <td>{request.quantity} {request.unit}</td>
                          <td>
                            <span className={`material-priority-badge ${getPriorityBadgeClass(request.priority)}`}>
                              {request.priority}
                            </span>
                          </td>
                          <td>{new Date(request.requiredDate).toLocaleDateString()}</td>
                          <td>
                            <span className={`material-status-badge ${getStatusBadgeClass(request.status)}`}>
                              {request.status}
                            </span>
                          </td>
                          <td>
                            <div className="material-action-buttons">
                              {request.status === 'Pending' && (
                                <>
                                  <button
                                    className="material-action-button approve"
                                    onClick={() => handleApproveReject(request, 'approve')}
                                    title="Approve"
                                  >
                                    <CheckCircle className="material-icon-xs" />
                                  </button>
                                  <button
                                    className="material-action-button reject"
                                    onClick={() => handleApproveReject(request, 'reject')}
                                    title="Reject"
                                  >
                                    <XCircle className="material-icon-xs" />
                                  </button>
                                </>
                              )}
                              <button className="material-action-button edit" title="Edit">
                                <Edit3 className="material-icon-xs" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
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
    <div className="material-management-container">
      {/* Header */}
      <div className="material-header">
        <div className="material-header-content">
          <div className="material-header-info">
            <div className="material-header-icon">
              <Package className="material-icon-sm" />
            </div>
            <div>
              <h1 className="material-header-title">Material Request & Approval</h1>
              <p className="material-header-subtitle">Purchase Orders and Requisitions Management</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="material-main-container">
        {/* Tab Navigation */}
        <div className="material-tab-navigation">
          <div className="material-tab-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`material-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="material-icon-sm" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="material-modal-overlay" onClick={() => setShowApprovalModal(false)}>
          <div className="material-modal" onClick={(e) => e.stopPropagation()}>
            <div className="material-modal-header">
              <h3 className="material-modal-title">
                {selectedRequest?.action === 'approve' ? 'Approve Request' : 'Reject Request'}
              </h3>
              <button 
                className="material-modal-close"
                onClick={() => setShowApprovalModal(false)}
              >
                ×
              </button>
            </div>
            <div className="material-modal-content">
              <div className="material-space-y-4">
                <div>
                  <p><strong>Request No:</strong> {selectedRequest?.requestNo}</p>
                  <p><strong>Material:</strong> {selectedRequest?.materialName}</p>
                  <p><strong>Department:</strong> {selectedRequest?.department}</p>
                  <p><strong>Requested By:</strong> {selectedRequest?.requestedBy}</p>
                </div>
                <div className="material-form-group">
                  <label className="material-form-label">
                    {selectedRequest?.action === 'approve' ? 'Approval Note' : 'Rejection Reason'}
                  </label>
                  <textarea 
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    className="material-form-textarea"
                    rows={3}
                    placeholder={`Enter ${selectedRequest?.action === 'approve' ? 'approval note' : 'rejection reason'}`}
                  />
                </div>
              </div>
            </div>
            <div className="material-modal-actions">
              <button 
                className={`material-button ${selectedRequest?.action === 'approve' ? 'success' : 'danger'}`}
                onClick={submitApproval}
              >
                {selectedRequest?.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
              <button 
                className="material-button secondary"
                onClick={() => setShowApprovalModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
