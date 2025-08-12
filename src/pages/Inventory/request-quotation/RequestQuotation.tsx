import React, { useState } from 'react';
import './RequestQuotation.css';

// Icon components (simplified SVG icons)
const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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

const Send = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const Paperclip = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);

export default function RequestQuotation() {
  const [activeTab, setActiveTab] = useState('rfq-overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);

  // Sample RFQ data
  const [rfqData, setRfqData] = useState([
    {
      id: 1,
      rfqNumber: 'RFQ-2025-001',
      title: 'Heavy Machinery Parts',
      description: 'Excavator hydraulic components and spare parts',
      category: 'Machinery',
      priority: 'High',
      status: 'Sent',
      createdDate: '2025-08-01',
      dueDate: '2025-08-15',
      vendorCount: 5,
      responseCount: 3,
      estimatedValue: 250000,
      createdBy: 'John Smith'
    },
    {
      id: 2,
      rfqNumber: 'RFQ-2025-002', 
      title: 'Safety Equipment',
      description: 'Personal protective equipment for mining operations',
      category: 'Safety',
      priority: 'Medium',
      status: 'Under Review',
      createdDate: '2025-07-28',
      dueDate: '2025-08-12',
      vendorCount: 3,
      responseCount: 3,
      estimatedValue: 75000,
      createdBy: 'Sarah Johnson'
    },
    {
      id: 3,
      rfqNumber: 'RFQ-2025-003',
      title: 'Drilling Equipment',
      description: 'Diamond drilling bits and related consumables',
      category: 'Tools',
      priority: 'Urgent',
      status: 'Draft',
      createdDate: '2025-08-05',
      dueDate: '2025-08-18',
      vendorCount: 4,
      responseCount: 0,
      estimatedValue: 180000,
      createdBy: 'Mike Wilson'
    },
    {
      id: 4,
      rfqNumber: 'RFQ-2025-004',
      title: 'Transportation Services',
      description: 'Material transportation and logistics services',
      category: 'Services',
      priority: 'Low',
      status: 'Completed',
      createdDate: '2025-07-20',
      dueDate: '2025-08-03',
      vendorCount: 6,
      responseCount: 6,
      estimatedValue: 320000,
      createdBy: 'Emma Davis'
    }
  ]);

  // Sample vendor data
  const vendors = [
    {
      id: 1,
      name: 'Industrial Equipment Co.',
      contactPerson: 'Robert Anderson',
      email: 'robert@industrial-eq.com',
      phone: '+1-555-0101',
      specialization: ['Machinery', 'Tools'],
      rating: 4.5,
      responseRate: 95
    },
    {
      id: 2,
      name: 'Safety First Supplies',
      contactPerson: 'Lisa Chen',
      email: 'lisa@safetyfirst.com',
      phone: '+1-555-0102',
      specialization: ['Safety', 'PPE'],
      rating: 4.8,
      responseRate: 98
    },
    {
      id: 3,
      name: 'Mining Tools Ltd.',
      contactPerson: 'David Rodriguez',
      email: 'david@miningtools.com',
      phone: '+1-555-0103',
      specialization: ['Tools', 'Consumables'],
      rating: 4.3,
      responseRate: 92
    },
    {
      id: 4,
      name: 'Transport Solutions Inc.',
      contactPerson: 'Amanda White',
      email: 'amanda@transportsolutions.com',
      phone: '+1-555-0104',
      specialization: ['Services', 'Logistics'],
      rating: 4.6,
      responseRate: 89
    },
    {
      id: 5,
      name: 'Heavy Machinery Parts',
      contactPerson: 'James Taylor',
      email: 'james@heavymachinery.com',
      phone: '+1-555-0105',
      specialization: ['Machinery', 'Parts'],
      rating: 4.4,
      responseRate: 94
    },
    {
      id: 6,
      name: 'Drilling Specialists',
      contactPerson: 'Maria Garcia',
      email: 'maria@drillspec.com',
      phone: '+1-555-0106',
      specialization: ['Tools', 'Drilling'],
      rating: 4.7,
      responseRate: 96
    }
  ];

  // New RFQ form data
  const [newRFQ, setNewRFQ] = useState({
    title: '',
    description: '',
    category: 'Machinery',
    priority: 'Medium',
    dueDate: '',
    estimatedValue: '',
    termsConditions: '',
    items: [{ description: '', quantity: '', unit: 'pcs', specifications: '' }]
  });

  const tabs = [
    { id: 'rfq-overview', label: 'RFQ Overview', icon: FileText },
    { id: 'create-rfq', label: 'Create RFQ', icon: Plus },
    { id: 'rfq-reports', label: 'Reports', icon: BarChart3 }
  ];

  const categories = [
    'Machinery', 'Tools', 'Safety', 'Services', 'Materials', 'Parts', 'Consumables'
  ];

  const priorities = ['Low', 'Medium', 'High', 'Urgent'];
  const statuses = ['All', 'Draft', 'Sent', 'Under Review', 'Completed', 'Cancelled'];

  // Filter RFQ data based on search and status
  const filteredRFQs = rfqData.filter(rfq => {
    const matchesSearch = rfq.rfqNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || rfq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleInputChange = (field: string, value: string) => {
    setNewRFQ(prev => ({ ...prev, [field]: value }));
  };

  const handleVendorToggle = (vendorId: number) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleAddItem = () => {
    setNewRFQ(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: '', unit: 'pcs', specifications: '' }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    setNewRFQ(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    setNewRFQ(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleSaveRFQ = () => {
    if (!newRFQ.title.trim() || !newRFQ.description.trim() || selectedVendors.length === 0) {
      alert('Please fill in all required fields and select at least one vendor.');
      return;
    }

    const newId = Math.max(...rfqData.map(rfq => rfq.id)) + 1;
    const newRFQData = {
      id: newId,
      rfqNumber: `RFQ-2025-${String(newId).padStart(3, '0')}`,
      title: newRFQ.title,
      description: newRFQ.description,
      category: newRFQ.category,
      priority: newRFQ.priority,
      status: 'Draft' as const,
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: newRFQ.dueDate,
      vendorCount: selectedVendors.length,
      responseCount: 0,
      estimatedValue: parseFloat(newRFQ.estimatedValue) || 0,
      createdBy: 'Current User'
    };

    setRfqData(prev => [newRFQData, ...prev]);
    
    // Reset form
    setNewRFQ({
      title: '',
      description: '',
      category: 'Machinery',
      priority: 'Medium',
      dueDate: '',
      estimatedValue: '',
      termsConditions: '',
      items: [{ description: '', quantity: '', unit: 'pcs', specifications: '' }]
    });
    setSelectedVendors([]);
    
    alert('RFQ created successfully!');
    setActiveTab('rfq-overview');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rfq-overview':
        return (
          <div className="rfq-space-y-4">
            {/* RFQ Summary Cards */}
            <div className="rfq-grid-4">
              <div className="rfq-card">
                <div className="rfq-summary-card">
                  <div className="rfq-summary-content">
                    <div className="rfq-summary-icon total">
                      <FileText className="rfq-icon-lg" />
                    </div>
                    <div>
                      <p className="rfq-summary-text">Total RFQs</p>
                      <p className="rfq-summary-number total">{rfqData.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-card">
                <div className="rfq-summary-card">
                  <div className="rfq-summary-content">
                    <div className="rfq-summary-icon pending">
                      <Clock className="rfq-icon-lg" />
                    </div>
                    <div>
                      <p className="rfq-summary-text">Pending Responses</p>
                      <p className="rfq-summary-number pending">
                        {rfqData.filter(rfq => rfq.status === 'Sent' || rfq.status === 'Under Review').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-card">
                <div className="rfq-summary-card">
                  <div className="rfq-summary-content">
                    <div className="rfq-summary-icon received">
                      <CheckCircle className="rfq-icon-lg" />
                    </div>
                    <div>
                      <p className="rfq-summary-text">Received Quotes</p>
                      <p className="rfq-summary-number received">
                        {rfqData.reduce((sum, rfq) => sum + rfq.responseCount, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rfq-card">
                <div className="rfq-summary-card">
                  <div className="rfq-summary-content">
                    <div className="rfq-summary-icon overdue">
                      <AlertCircle className="rfq-icon-lg" />
                    </div>
                    <div>
                      <p className="rfq-summary-text">Overdue</p>
                      <p className="rfq-summary-number overdue">
                        {rfqData.filter(rfq => 
                          (rfq.status === 'Sent' || rfq.status === 'Under Review') && 
                          new Date(rfq.dueDate) < new Date()
                        ).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="rfq-search-filter">
              <div className="rfq-search-container">
                <Search className="rfq-search-icon" />
                <input
                  type="text"
                  placeholder="Search RFQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rfq-search-input"
                />
              </div>
              <div className="rfq-filter-container">
                <Filter className="rfq-filter-icon" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rfq-filter-select"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* RFQ Requests Table */}
            <div className="rfq-card">
              <div className="rfq-card-header">
                <h3 className="rfq-card-title">
                  <FileText className="rfq-icon-sm" />
                  Request for Quotations - {new Date().getFullYear()}
                </h3>
                <button 
                  className="rfq-button primary small"
                  onClick={() => setActiveTab('create-rfq')}
                >
                  <Plus className="rfq-icon-sm" />
                  Create RFQ
                </button>
              </div>
              <div className="rfq-card-content" style={{ padding: 0 }}>
                <div className="rfq-table-container">
                  <table className="rfq-table">
                    <thead className="rfq-table-header">
                      <tr>
                        <th>RFQ Number</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Vendors</th>
                        <th>Responses</th>
                        <th>Est. Value</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRFQs.map(rfq => (
                        <tr key={rfq.id} className="rfq-table-row">
                          <td className="rfq-table-cell rfq-no">{rfq.rfqNumber}</td>
                          <td className="rfq-table-cell title">{rfq.title}</td>
                          <td className="rfq-table-cell">
                            <span className="rfq-badge">{rfq.category}</span>
                          </td>
                          <td className="rfq-table-cell">
                            <span className={`rfq-badge priority ${rfq.priority.toLowerCase()}`}>
                              {rfq.priority}
                            </span>
                          </td>
                          <td className="rfq-table-cell">
                            <span className={`rfq-badge ${rfq.status.toLowerCase().replace(' ', '')}`}>
                              {rfq.status}
                            </span>
                          </td>
                          <td className="rfq-table-cell mono">{new Date(rfq.dueDate).toLocaleDateString('en-GB')}</td>
                          <td className="rfq-table-cell center">{rfq.vendorCount}</td>
                          <td className="rfq-table-cell center">{rfq.responseCount}</td>
                          <td className="rfq-table-cell mono">₹{rfq.estimatedValue.toLocaleString()}</td>
                          <td className="rfq-table-cell">
                            <div className="rfq-flex rfq-flex-gap-1">
                              <button className="rfq-button ghost primary">
                                <Eye className="rfq-icon-sm" />
                              </button>
                              <button className="rfq-button ghost success">
                                <Send className="rfq-icon-sm" />
                              </button>
                              <button className="rfq-button ghost">
                                <Edit3 className="rfq-icon-sm" />
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
          <div className="rfq-space-y-4">
            <div className="rfq-card">
              <div className="rfq-card-header">
                <h3 className="rfq-card-title">
                  <Plus className="rfq-icon-sm" />
                  Create New Request for Quotation (RFQ)
                </h3>
              </div>
              <div className="rfq-card-content rfq-space-y-6">
                {/* Basic Information */}
                <div className="rfq-form-section">
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>Basic Information</h4>
                  <div className="rfq-form-grid">
                    <div className="rfq-form-group">
                      <label className="rfq-form-label">RFQ Title ***</label>
                      <input 
                        type="text"
                        value={newRFQ.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="rfq-form-input"
                        placeholder="Enter RFQ title..."
                      />
                    </div>

                    <div className="rfq-form-group">
                      <label className="rfq-form-label">Category</label>
                      <select 
                        value={newRFQ.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="rfq-form-select"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div className="rfq-form-group">
                      <label className="rfq-form-label">Priority</label>
                      <select 
                        value={newRFQ.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        className="rfq-form-select"
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>{priority}</option>
                        ))}
                      </select>
                    </div>

                    <div className="rfq-form-group">
                      <label className="rfq-form-label">Due Date ***</label>
                      <input 
                        type="date"
                        value={newRFQ.dueDate}
                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                        className="rfq-form-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="rfq-form-group">
                    <label className="rfq-form-label">Description ***</label>
                    <textarea 
                      value={newRFQ.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="rfq-form-textarea"
                      rows={3}
                      placeholder="Detailed description of requirements..."
                    />
                  </div>

                  <div className="rfq-form-group">
                    <label className="rfq-form-label">Estimated Value</label>
                    <input 
                      type="number"
                      value={newRFQ.estimatedValue}
                      onChange={(e) => handleInputChange('estimatedValue', e.target.value)}
                      className="rfq-form-input"
                      placeholder="Enter estimated value in ₹"
                    />
                  </div>
                </div>

                {/* Item Details */}
                <div className="rfq-form-section rfq-border-t">
                  <div className="rfq-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>Item Details</h4>
                    <button 
                      type="button"
                      onClick={handleAddItem}
                      className="rfq-button primary small"
                    >
                      <Plus className="rfq-icon-sm" />
                      Add Item
                    </button>
                  </div>

                  {newRFQ.items.map((item, index) => (
                    <div key={index} className="rfq-form-section" style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
                      <div className="rfq-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h5 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>Item {index + 1}</h5>
                        {newRFQ.items.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="rfq-button danger small"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      
                      <div className="rfq-form-grid">
                        <div className="rfq-form-group">
                          <label className="rfq-form-label">Item Description</label>
                          <input 
                            type="text"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                            className="rfq-form-input"
                            placeholder="Item description..."
                          />
                        </div>

                        <div className="rfq-form-group">
                          <label className="rfq-form-label">Quantity</label>
                          <input 
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            className="rfq-form-input"
                            placeholder="Quantity..."
                          />
                        </div>

                        <div className="rfq-form-group">
                          <label className="rfq-form-label">Unit</label>
                          <select 
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                            className="rfq-form-select"
                          >
                            <option value="pcs">Pieces</option>
                            <option value="kg">Kilograms</option>
                            <option value="m">Meters</option>
                            <option value="liters">Liters</option>
                            <option value="sets">Sets</option>
                            <option value="hours">Hours</option>
                          </select>
                        </div>
                      </div>

                      <div className="rfq-form-group">
                        <label className="rfq-form-label">Technical Specifications</label>
                        <textarea 
                          value={item.specifications}
                          onChange={(e) => handleItemChange(index, 'specifications', e.target.value)}
                          className="rfq-form-textarea"
                          rows={2}
                          placeholder="Technical specifications and requirements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vendor Selection */}
                <div className="rfq-form-section rfq-border-t">
                  <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600' }}>Select Vendors ***</h4>
                  <div className="rfq-vendor-selection">
                    <div className="rfq-vendor-grid">
                      {vendors.map(vendor => (
                        <div 
                          key={vendor.id} 
                          className={`rfq-vendor-item ${selectedVendors.includes(vendor.id) ? 'selected' : ''}`}
                          onClick={() => handleVendorToggle(vendor.id)}
                        >
                          <input 
                            type="checkbox"
                            checked={selectedVendors.includes(vendor.id)}
                            onChange={() => handleVendorToggle(vendor.id)}
                            className="rfq-vendor-checkbox"
                          />
                          <div className="rfq-vendor-info">
                            <p className="rfq-vendor-name">{vendor.name}</p>
                            <p className="rfq-vendor-contact">{vendor.contactPerson} | {vendor.email}</p>
                            <p className="rfq-vendor-contact">Rating: {vendor.rating}/5 | Response Rate: {vendor.responseRate}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0.5rem 0 0 0' }}>
                    Selected: {selectedVendors.length} vendor{selectedVendors.length !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Terms & Conditions */}
                <div className="rfq-form-section rfq-border-t">
                  <div className="rfq-form-group">
                    <label className="rfq-form-label">Terms & Conditions</label>
                    <textarea 
                      value={newRFQ.termsConditions}
                      onChange={(e) => handleInputChange('termsConditions', e.target.value)}
                      className="rfq-form-textarea"
                      rows={4}
                      placeholder="Enter terms and conditions for this RFQ..."
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="rfq-border-t">
                  <div className="rfq-flex rfq-flex-gap-3" style={{ marginTop: '1.5rem', paddingTop: '1rem' }}>
                    <button 
                      onClick={handleSaveRFQ}
                      className="rfq-button success"
                      disabled={!newRFQ.title.trim() || !newRFQ.description.trim() || selectedVendors.length === 0}
                    >
                      <Save className="rfq-icon-sm" />
                      Save RFQ as Draft
                    </button>
                    <button 
                      className="rfq-button primary"
                      disabled={!newRFQ.title.trim() || !newRFQ.description.trim() || selectedVendors.length === 0}
                    >
                      <Send className="rfq-icon-sm" />
                      Save & Send to Vendors
                    </button>
                    <button 
                      className="rfq-button outline"
                      onClick={() => {
                        setNewRFQ({
                          title: '',
                          description: '',
                          category: 'Machinery',
                          priority: 'Medium',
                          dueDate: '',
                          estimatedValue: '',
                          termsConditions: '',
                          items: [{ description: '', quantity: '', unit: 'pcs', specifications: '' }]
                        });
                        setSelectedVendors([]);
                      }}
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rfq-reports':
        return (
          <div className="rfq-space-y-4">
            <div className="rfq-card">
              <div className="rfq-card-header">
                <h3 className="rfq-card-title">
                  <BarChart3 className="rfq-icon-sm" />
                  RFQ Reports & Analytics
                </h3>
              </div>
              <div className="rfq-card-content rfq-space-y-4">
                <div className="rfq-reports-grid">
                  <div className="rfq-report-card">
                    <Calendar className="rfq-report-icon blue" />
                    <h3 className="rfq-report-title">Monthly RFQ Report</h3>
                    <p className="rfq-report-description">Generate monthly RFQ summary with vendor responses</p>
                    <button className="rfq-button outline small">
                      <Download className="rfq-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="rfq-report-card">
                    <Users className="rfq-report-icon green" />
                    <h3 className="rfq-report-title">Vendor Performance</h3>
                    <p className="rfq-report-description">Analyze vendor response rates and performance metrics</p>
                    <button className="rfq-button outline small">
                      <Download className="rfq-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="rfq-report-card">
                    <Truck className="rfq-report-icon orange" />
                    <h3 className="rfq-report-title">Category Analysis</h3>
                    <p className="rfq-report-description">RFQ breakdown by categories and procurement value</p>
                    <button className="rfq-button outline small">
                      <Download className="rfq-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics Overview */}
                <div className="rfq-stats-section">
                  <h3 className="rfq-stats-title">RFQ Performance Metrics</h3>
                  <div className="rfq-stats-grid">
                    <div>
                      <p className="rfq-stats-number blue">89%</p>
                      <p className="rfq-stats-label blue">Response Rate</p>
                    </div>
                    <div>
                      <p className="rfq-stats-number green">7.2</p>
                      <p className="rfq-stats-label green">Avg. Days to Response</p>
                    </div>
                    <div>
                      <p className="rfq-stats-number yellow">₹8.5M</p>
                      <p className="rfq-stats-label yellow">Total RFQ Value</p>
                    </div>
                    <div>
                      <p className="rfq-stats-number purple">15%</p>
                      <p className="rfq-stats-label purple">Cost Savings</p>
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
    <div className="rfq-management-container">
      {/* Header */}
      <div className="rfq-header">
        <div className="rfq-header-content">
          <div className="rfq-header-info">
            <div className="rfq-header-icon">
              <FileText className="rfq-icon-sm" />
            </div>
            <div>
              <h1 className="rfq-header-title">Request for Quotation (RFQ)</h1>
              <p className="rfq-header-subtitle">Vendor quotation management and procurement system</p>
            </div>
          </div>
          <div className="rfq-flex rfq-flex-gap-3">
            <button className="rfq-button outline small">
              <Download className="rfq-icon-sm" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rfq-main-container">
        
        {/* Tab Navigation */}
        <div className="rfq-tab-navigation">
          <nav className="rfq-tab-nav">
            <div className="rfq-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rfq-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="rfq-icon-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>
    </div>
  );
}
