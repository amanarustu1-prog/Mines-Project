import React, { useState } from 'react';
import './styles.css';

// Icon components
const FileTextIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="quotation-entry-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const SendIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const SaveIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Edit3Icon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const UsersIcon = ({ style }: { style?: React.CSSProperties }) => (
  <svg className="quotation-entry-icon" style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const PackageIcon = () => (
  <svg className="quotation-entry-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

export default function QuotationEntry() {
  const [activeTab, setActiveTab] = useState('quotation-overview');
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  // Sample RFQ data
  const [rfqData, setRfqData] = useState([
    {
      id: 1,
      rfqNo: 'RFQ001',
      title: 'Heavy Machinery Parts',
      category: 'Equipment',
      requestDate: '2025-08-01',
      dueDate: '2025-08-15',
      priority: 'High',
      status: 'Sent to Vendors',
      vendorCount: 5,
      responseCount: 3,
      totalAmount: 250000,
      description: 'Hydraulic pumps and spare parts for excavators',
      requestedBy: 'RAJESH KUMAR',
      department: 'Operations'
    },
    {
      id: 2,
      rfqNo: 'RFQ002',
      title: 'Safety Equipment Bulk Order',
      category: 'Safety',
      requestDate: '2025-07-28',
      dueDate: '2025-08-12',
      priority: 'Medium',
      status: 'Draft',
      vendorCount: 0,
      responseCount: 0,
      totalAmount: 75000,
      description: 'Hard hats, safety vests, and protective gear',
      requestedBy: 'PRIYA SHARMA',
      department: 'Safety'
    },
    {
      id: 3,
      rfqNo: 'RFQ003',
      title: 'Office Supplies & Stationery',
      category: 'Office',
      requestDate: '2025-07-25',
      dueDate: '2025-08-08',
      priority: 'Low',
      status: 'Evaluation',
      vendorCount: 3,
      responseCount: 3,
      totalAmount: 12000,
      description: 'Monthly office supply requirements',
      requestedBy: 'AMIT SINGH',
      department: 'Administration'
    }
  ]);

  // New RFQ form data
  const [newRFQ, setNewRFQ] = useState({
    rfqNo: `RFQ${String(rfqData.length + 1).padStart(3, '0')}`,
    title: '',
    category: 'Equipment',
    requestDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    priority: 'Medium',
    status: 'Draft',
    vendorCount: 0,
    responseCount: 0,
    totalAmount: 0,
    description: '',
    requestedBy: 'SHUBHAM',
    department: 'Operations',
    items: [
      {
        itemName: '',
        specification: '',
        quantity: 0,
        unit: 'Nos',
        estimatedPrice: 0,
        remarks: ''
      }
    ]
  });

  // Sample vendor data
  const vendors = [
    { id: 'V001', name: 'TATA Equipment Supplies', category: 'Equipment', email: 'sales@tataequipment.com', rating: 4.5 },
    { id: 'V002', name: 'Safety First Solutions', category: 'Safety', email: 'info@safetyfirst.com', rating: 4.2 },
    { id: 'V003', name: 'Industrial Parts Hub', category: 'Equipment', email: 'orders@industrialparts.com', rating: 4.8 },
    { id: 'V004', name: 'Office Mart Limited', category: 'Office', email: 'business@officemart.com', rating: 4.0 },
    { id: 'V005', name: 'Mining Solutions Ltd', category: 'Equipment', email: 'procurement@miningsol.com', rating: 4.6 }
  ];

  const categories = [
    { code: 'Equipment', name: 'Heavy Equipment & Machinery' },
    { code: 'Safety', name: 'Safety Equipment' },
    { code: 'Office', name: 'Office Supplies' },
    { code: 'Raw Materials', name: 'Raw Materials' },
    { code: 'Services', name: 'Services & Maintenance' },
    { code: 'Other', name: 'Other Items' }
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const units = ['Nos', 'Kg', 'Ton', 'Meter', 'Liter', 'Set', 'Box', 'Piece'];

  const tabs = [
    { id: 'quotation-overview', label: 'RFQ Overview', icon: FileTextIcon },
    { id: 'create-rfq', label: 'Create New RFQ', icon: PlusIcon },
    { id: 'quotation-reports', label: 'Reports & Analytics', icon: PackageIcon }
  ];

  const handleInputChange = (field: string, value: any) => {
    setNewRFQ(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...newRFQ.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setNewRFQ(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addNewItem = () => {
    setNewRFQ(prev => ({
      ...prev,
      items: [...prev.items, {
        itemName: '',
        specification: '',
        quantity: 0,
        unit: 'Nos',
        estimatedPrice: 0,
        remarks: ''
      }]
    }));
  };

  const removeItem = (index: number) => {
    setNewRFQ(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const calculateTotalAmount = () => {
    return newRFQ.items.reduce((total, item) => total + (item.quantity * item.estimatedPrice), 0);
  };

  const handleSaveRFQ = () => {
    const totalAmount = calculateTotalAmount();
    const newEntry = {
      id: rfqData.length + 1,
      ...newRFQ,
      totalAmount,
      items: undefined // Don't include items in the main list
    };

    setRfqData(prev => [...prev, newEntry]);
    setNewRFQ({
      rfqNo: `RFQ${String(rfqData.length + 2).padStart(3, '0')}`,
      title: '',
      category: 'Equipment',
      requestDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      priority: 'Medium',
      status: 'Draft',
      vendorCount: 0,
      responseCount: 0,
      totalAmount: 0,
      description: '',
      requestedBy: 'SHUBHAM',
      department: 'Operations',
      items: [
        {
          itemName: '',
          specification: '',
          quantity: 0,
          unit: 'Nos',
          estimatedPrice: 0,
          remarks: ''
        }
      ]
    });
    alert('RFQ saved successfully!');
  };

  const handleSendToVendors = (rfq: any) => {
    setSelectedRFQ(rfq);
    setSelectedVendors([]);
    setShowRFQModal(true);
  };

  const submitRFQToVendors = () => {
    if (selectedRFQ && selectedVendors.length > 0) {
      setRfqData(prev => 
        prev.map(rfq => 
          rfq.id === selectedRFQ.id 
            ? { 
                ...rfq, 
                status: 'Sent to Vendors', 
                vendorCount: selectedVendors.length 
              }
            : rfq
        )
      );
      setShowRFQModal(false);
      setSelectedVendors([]);
      setSelectedRFQ(null);
      alert(`RFQ sent to ${selectedVendors.length} vendor(s) successfully!`);
    }
  };

  const getStatusBadge = (status: string) => {
    const className = `quotation-entry-badge quotation-entry-badge-${status.toLowerCase().replace(' ', '-')}`;
    return <span className={className}>{status}</span>;
  };

  const getPriorityBadge = (priority: string) => {
    const className = `quotation-entry-badge quotation-entry-badge-priority-${priority.toLowerCase()}`;
    return <span className={className}>{priority}</span>;
  };

  const getCategoryBadge = (category: string) => {
    const className = `quotation-entry-badge quotation-entry-badge-category`;
    return <span className={className}>{category}</span>;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'quotation-overview':
        return (
          <div className="quotation-entry-space-y-4">
            {/* RFQ Summary Cards */}
            <div className="quotation-entry-summary-grid">
              <div className="quotation-entry-summary-card">
                <div className="quotation-entry-summary-content">
                  <div className="quotation-entry-summary-item">
                    <div className="quotation-entry-icon-container quotation-entry-icon-orange">
                      <AlertCircleIcon />
                    </div>
                    <div>
                      <p className="quotation-entry-metric-label">Pending RFQs</p>
                      <p className="quotation-entry-metric-value quotation-entry-metric-orange">
                        {rfqData.filter(rfq => rfq.status === 'Draft' || rfq.status === 'Sent to Vendors').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-entry-summary-card">
                <div className="quotation-entry-summary-content">
                  <div className="quotation-entry-summary-item">
                    <div className="quotation-entry-icon-container quotation-entry-icon-green">
                      <CheckCircleIcon />
                    </div>
                    <div>
                      <p className="quotation-entry-metric-label">Completed RFQs</p>
                      <p className="quotation-entry-metric-value quotation-entry-metric-green">
                        {rfqData.filter(rfq => rfq.status === 'Evaluation' || rfq.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-entry-summary-card">
                <div className="quotation-entry-summary-content">
                  <div className="quotation-entry-summary-item">
                    <div className="quotation-entry-icon-container quotation-entry-icon-blue">
                      <UsersIcon />
                    </div>
                    <div>
                      <p className="quotation-entry-metric-label">Active Vendors</p>
                      <p className="quotation-entry-metric-value quotation-entry-metric-blue">
                        {vendors.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-entry-summary-card">
                <div className="quotation-entry-summary-content">
                  <div className="quotation-entry-summary-item">
                    <div className="quotation-entry-icon-container quotation-entry-icon-purple">
                      <PackageIcon />
                    </div>
                    <div>
                      <p className="quotation-entry-metric-label">Total Value</p>
                      <p className="quotation-entry-metric-value quotation-entry-metric-purple">
                        ₹{(rfqData.reduce((sum, rfq) => sum + rfq.totalAmount, 0) / 100000).toFixed(1)}L
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Requests Table */}
            <div className="quotation-entry-card">
              <div className="quotation-entry-card-header">
                <h3 className="quotation-entry-card-title">
                  <FileTextIcon />
                  Request for Quotation (RFQ) - {new Date().getFullYear()}
                </h3>
                <button 
                  className="quotation-entry-button quotation-entry-button-primary quotation-entry-button-sm"
                  onClick={() => setActiveTab('create-rfq')}
                >
                  <PlusIcon />
                  Create New RFQ
                </button>
              </div>
              <div className="quotation-entry-card-content" style={{padding: 0}}>
                <div className="quotation-entry-table-container">
                  <table className="quotation-entry-table">
                    <thead>
                      <tr>
                        <th>RFQ No.</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Requested By</th>
                        <th>Priority</th>
                        <th>Due Date</th>
                        <th>Vendors</th>
                        <th>Amount (₹)</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rfqData.map((rfq) => (
                        <tr key={rfq.id}>
                          <td>
                            <span className="quotation-entry-font-mono quotation-entry-text-blue">
                              {rfq.rfqNo}
                            </span>
                          </td>
                          <td>
                            <span className="quotation-entry-font-medium">
                              {rfq.title}
                            </span>
                          </td>
                          <td>{getCategoryBadge(rfq.category)}</td>
                          <td>
                            <span className="quotation-entry-text-gray-700">
                              {rfq.requestedBy}
                            </span>
                          </td>
                          <td>{getPriorityBadge(rfq.priority)}</td>
                          <td>
                            <span className="quotation-entry-font-mono quotation-entry-text-sm">
                              {new Date(rfq.dueDate).toLocaleDateString('en-GB')}
                            </span>
                          </td>
                          <td className="quotation-entry-text-center">
                            <span className="quotation-entry-font-medium">
                              {rfq.vendorCount > 0 ? `${rfq.responseCount}/${rfq.vendorCount}` : '-'}
                            </span>
                          </td>
                          <td>
                            <span className="quotation-entry-font-mono">
                              {rfq.totalAmount.toLocaleString('en-IN')}
                            </span>
                          </td>
                          <td>{getStatusBadge(rfq.status)}</td>
                          <td>
                            <div style={{display: 'flex', gap: '0.25rem'}}>
                              {rfq.status === 'Draft' && (
                                <button
                                  className="quotation-entry-button quotation-entry-button-ghost"
                                  onClick={() => handleSendToVendors(rfq)}
                                >
                                  <SendIcon />
                                </button>
                              )}
                              <button className="quotation-entry-button quotation-entry-button-ghost">
                                <Edit3Icon />
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

      case 'create-rfq':
        return (
          <div className="quotation-entry-space-y-4">
            <div className="quotation-entry-card">
              <div className="quotation-entry-card-header">
                <h3 className="quotation-entry-card-title">
                  <PlusIcon />
                  Warehouse Module: Create New RFQ (Request for Quotation)
                </h3>
              </div>
              <div className="quotation-entry-card-content quotation-entry-space-y-6">
                {/* Basic Information */}
                <div className="quotation-entry-grid quotation-entry-grid-cols-1 quotation-entry-md-grid-cols-2">
                  <div className="quotation-entry-space-y-4">
                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">RFQ Number</label>
                      <input 
                        value={newRFQ.rfqNo}
                        readOnly
                        className="quotation-entry-input quotation-entry-input-readonly"
                      />
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">RFQ Title ***</label>
                      <input 
                        value={newRFQ.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="quotation-entry-input"
                        placeholder="Enter RFQ title"
                      />
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Category ***</label>
                      <select 
                        value={newRFQ.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="quotation-entry-select"
                      >
                        {categories.map(cat => (
                          <option key={cat.code} value={cat.code}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Priority</label>
                      <select 
                        value={newRFQ.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="quotation-entry-select"
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="quotation-entry-space-y-4">
                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Requested By</label>
                      <input 
                        value={newRFQ.requestedBy}
                        onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                        className="quotation-entry-input"
                      />
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Department</label>
                      <input 
                        value={newRFQ.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="quotation-entry-input"
                      />
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Request Date</label>
                      <input 
                        type="date"
                        value={newRFQ.requestDate}
                        readOnly
                        className="quotation-entry-input quotation-entry-input-readonly"
                      />
                    </div>

                    <div className="quotation-entry-form-group">
                      <label className="quotation-entry-label">Due Date ***</label>
                      <input 
                        type="date"
                        value={newRFQ.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="quotation-entry-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="quotation-entry-form-group">
                  <label className="quotation-entry-label">Description ***</label>
                  <textarea 
                    value={newRFQ.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="quotation-entry-input quotation-entry-textarea"
                    rows={3}
                    placeholder="Provide detailed description of the RFQ requirements..."
                  />
                </div>

                {/* Items Section */}
                <div className="quotation-entry-border-t quotation-entry-pt-6">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                    <h4 className="quotation-entry-font-medium">Item Details</h4>
                    <button 
                      onClick={addNewItem}
                      className="quotation-entry-button quotation-entry-button-outline quotation-entry-button-sm"
                    >
                      <PlusIcon />
                      Add Item
                    </button>
                  </div>

                  {newRFQ.items.map((item, index) => (
                    <div key={index} className="quotation-entry-card" style={{border: '1px solid #e5e7eb', marginBottom: '1rem'}}>
                      <div className="quotation-entry-card-content">
                        <div style={{display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem'}}>
                          <h5 className="quotation-entry-font-medium">Item {index + 1}</h5>
                          {newRFQ.items.length > 1 && (
                            <button 
                              onClick={() => removeItem(index)}
                              className="quotation-entry-button quotation-entry-button-danger quotation-entry-button-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        
                        <div className="quotation-entry-grid quotation-entry-grid-cols-1 quotation-entry-md-grid-cols-3">
                          <div className="quotation-entry-form-group">
                            <label className="quotation-entry-label">Item Name ***</label>
                            <input 
                              value={item.itemName}
                              onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                              className="quotation-entry-input"
                              placeholder="Enter item name"
                            />
                          </div>

                          <div className="quotation-entry-form-group">
                            <label className="quotation-entry-label">Quantity ***</label>
                            <input 
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                              className="quotation-entry-input"
                              min="0"
                            />
                          </div>

                          <div className="quotation-entry-form-group">
                            <label className="quotation-entry-label">Unit</label>
                            <select 
                              value={item.unit}
                              onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                              className="quotation-entry-select"
                            >
                              {units.map(unit => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="quotation-entry-grid quotation-entry-grid-cols-1 quotation-entry-md-grid-cols-2">
                          <div className="quotation-entry-form-group">
                            <label className="quotation-entry-label">Estimated Price (₹)</label>
                            <input 
                              type="number"
                              value={item.estimatedPrice}
                              onChange={(e) => handleItemChange(index, 'estimatedPrice', parseFloat(e.target.value) || 0)}
                              className="quotation-entry-input"
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <div className="quotation-entry-form-group">
                            <label className="quotation-entry-label">Total: ₹{(item.quantity * item.estimatedPrice).toLocaleString('en-IN')}</label>
                            <div style={{padding: '0.5rem', background: '#f9fafb', borderRadius: '0.375rem', fontSize: '0.875rem', fontWeight: '500'}}>
                              Qty: {item.quantity} × ₹{item.estimatedPrice.toLocaleString('en-IN')} = ₹{(item.quantity * item.estimatedPrice).toLocaleString('en-IN')}
                            </div>
                          </div>
                        </div>

                        <div className="quotation-entry-form-group">
                          <label className="quotation-entry-label">Specification</label>
                          <textarea 
                            value={item.specification}
                            onChange={(e) => handleItemChange(index, 'specification', e.target.value)}
                            className="quotation-entry-input quotation-entry-textarea"
                            rows={2}
                            placeholder="Technical specifications, brand preferences, etc."
                          />
                        </div>

                        <div className="quotation-entry-form-group">
                          <label className="quotation-entry-label">Remarks</label>
                          <textarea 
                            value={item.remarks}
                            onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                            className="quotation-entry-input quotation-entry-textarea"
                            rows={2}
                            placeholder="Additional notes or requirements"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Total Summary */}
                  <div style={{padding: '1rem', background: '#eff6ff', borderRadius: '0.5rem', marginTop: '1rem'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span className="quotation-entry-font-medium">Total Estimated Value:</span>
                      <span className="quotation-entry-font-bold" style={{fontSize: '1.125rem', color: '#1e40af'}}>
                        ₹{calculateTotalAmount().toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div style={{fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem'}}>
                      Total items: {newRFQ.items.length} | Total quantity: {newRFQ.items.reduce((sum, item) => sum + item.quantity, 0)}
                    </div>
                  </div>

                  <div style={{display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb'}}>
                    <button 
                      onClick={handleSaveRFQ}
                      className="quotation-entry-button quotation-entry-button-success"
                      disabled={!newRFQ.title || !newRFQ.description || !newRFQ.dueDate || newRFQ.items.some(item => !item.itemName || item.quantity <= 0)}
                    >
                      <SaveIcon />
                      Save RFQ as Draft
                    </button>
                    <button 
                      className="quotation-entry-button quotation-entry-button-outline"
                      onClick={() => setActiveTab('quotation-overview')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quotation-reports':
        return (
          <div className="quotation-entry-space-y-4">
            <div className="quotation-entry-card">
              <div className="quotation-entry-card-header">
                <h3 className="quotation-entry-card-title">
                  <PackageIcon />
                  RFQ Reports & Analytics
                </h3>
              </div>
              <div className="quotation-entry-card-content quotation-entry-space-y-4">
                <div className="quotation-entry-grid quotation-entry-grid-cols-1 quotation-entry-md-grid-cols-2" style={{gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'}}>
                  <div className="quotation-entry-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="quotation-entry-card-content">
                      <FileTextIcon />
                      <h3 className="quotation-entry-font-semibold" style={{color: '#1e40af', marginBottom: '0.5rem'}}>Monthly RFQ Report</h3>
                      <p style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem'}}>Generate monthly RFQ summary</p>
                      <button className="quotation-entry-button quotation-entry-button-outline quotation-entry-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="quotation-entry-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="quotation-entry-card-content">
                      <UsersIcon />
                      <h3 className="quotation-entry-font-semibold" style={{color: '#059669', marginBottom: '0.5rem'}}>Vendor Performance</h3>
                      <p style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem'}}>Vendor response and rating analysis</p>
                      <button className="quotation-entry-button quotation-entry-button-outline quotation-entry-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>

                  <div className="quotation-entry-card" style={{border: '1px solid #e5e7eb'}}>
                    <div className="quotation-entry-card-content">
                      <PackageIcon />
                      <h3 className="quotation-entry-font-semibold" style={{color: '#7c3aed', marginBottom: '0.5rem'}}>Category Analysis</h3>
                      <p style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.75rem'}}>RFQ distribution by category</p>
                      <button className="quotation-entry-button quotation-entry-button-outline quotation-entry-button-sm">
                        <DownloadIcon />
                        Download
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '0.5rem'}}>
                  <h4 className="quotation-entry-font-semibold" style={{color: '#1e40af', marginBottom: '0.5rem'}}>RFQ Statistics</h4>
                  <div className="quotation-entry-grid quotation-entry-grid-cols-2" style={{gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1rem', textAlign: 'center'}}>
                    <div>
                      <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#d97706'}}>{rfqData.length}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>Total RFQs</div>
                    </div>
                    <div>
                      <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#059669'}}>{vendors.length}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>Active Vendors</div>
                    </div>
                    <div>
                      <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#dc2626'}}>{rfqData.filter(rfq => rfq.status === 'Draft').length}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>Pending Drafts</div>
                    </div>
                    <div>
                      <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#2563eb'}}>₹{(rfqData.reduce((sum, rfq) => sum + rfq.totalAmount, 0) / 100000).toFixed(1)}L</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>Total Value</div>
                    </div>
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
    <div className="quotation-entry-container">
      {/* Header */}
      <div className="quotation-entry-header">
        <div className="quotation-entry-header-content">
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <div className="quotation-entry-logo">
              <FileTextIcon style={{color: 'white'}} />
            </div>
            <div>
              <h1 className="quotation-entry-title">Quotation Entry (RFQ)</h1>
              <p className="quotation-entry-subtitle">Request for Quotation management and vendor communication</p>
            </div>
          </div>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button className="quotation-entry-button quotation-entry-button-outline quotation-entry-button-sm">
              <DownloadIcon />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="quotation-entry-main">
        
        {/* Tab Navigation */}
        <div className="quotation-entry-tabs">
          <div className="quotation-entry-tabs-container">
            <nav className="quotation-entry-nav">
              <div className="quotation-entry-tab-list">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`quotation-entry-tab-button ${
                      activeTab === tab.id ? 'active' : ''
                    }`}
                  >
                    <tab.icon />
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>

      {/* Send to Vendors Modal */}
      {showRFQModal && selectedRFQ && (
        <div className="quotation-entry-modal-overlay">
          <div className="quotation-entry-modal quotation-entry-fade-in">
            <h3 className="quotation-entry-modal-title">
              Send RFQ to Vendors
            </h3>
            <div className="quotation-entry-modal-info">
              <p>RFQ: <span className="quotation-entry-font-medium">{selectedRFQ.rfqNo} - {selectedRFQ.title}</span></p>
              <p>Category: <span className="quotation-entry-font-medium">{selectedRFQ.category}</span></p>
              <p>Due Date: <span className="quotation-entry-font-medium">{new Date(selectedRFQ.dueDate).toLocaleDateString('en-GB')}</span></p>
              <p>Estimated Value: <span className="quotation-entry-font-medium">₹{selectedRFQ.totalAmount.toLocaleString('en-IN')}</span></p>
            </div>
            <div className="quotation-entry-form-group">
              <label className="quotation-entry-label">Select Vendors to Send RFQ</label>
              <div style={{maxHeight: '200px', overflowY: 'auto', border: '1px solid #d1d5db', borderRadius: '0.375rem', padding: '0.5rem'}}>
                {vendors
                  .filter(vendor => vendor.category === selectedRFQ.category || selectedRFQ.category === 'Other')
                  .map(vendor => (
                  <label key={vendor.id} style={{display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', cursor: 'pointer'}}>
                    <input 
                      type="checkbox"
                      checked={selectedVendors.includes(vendor.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedVendors(prev => [...prev, vendor.id]);
                        } else {
                          setSelectedVendors(prev => prev.filter(id => id !== vendor.id));
                        }
                      }}
                    />
                    <div>
                      <div className="quotation-entry-font-medium">{vendor.name}</div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>
                        {vendor.email} • Rating: {vendor.rating}/5
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div className="quotation-entry-modal-actions">
              <button
                onClick={submitRFQToVendors}
                disabled={selectedVendors.length === 0}
                className="quotation-entry-button quotation-entry-button-success"
              >
                <SendIcon />
                Send to {selectedVendors.length} Vendor(s)
              </button>
              <button
                className="quotation-entry-button quotation-entry-button-outline"
                onClick={() => {
                  setShowRFQModal(false);
                  setSelectedVendors([]);
                  setSelectedRFQ(null);
                }}
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
