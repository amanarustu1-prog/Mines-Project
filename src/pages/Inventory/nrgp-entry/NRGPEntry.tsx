import React, { useState, useRef } from 'react';
import './styles.css';

const NRGPEntry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'reports'>('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedNRGP, setSelectedNRGP] = useState<any>(null);

  // Form state for new NRGP entry
  const [formData, setFormData] = useState({
    nrgpNo: '',
    entryDate: '',
    recipientType: 'department',
    recipientName: '',
    recipientContact: '',
    recipientLocation: '',
    purpose: '',
    priority: 'medium',
    estimatedValue: 0,
    specialInstructions: '',
    securityClearance: false,
    insuranceRequired: false,
    transportMode: 'internal',
    expectedDeliveryDate: '',
    remarks: '',
    attachments: [] as File[]
  });

  // Items for NRGP
  const [nrgpItems, setNRGPItems] = useState([
    {
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedCost: 0,
      category: 'consumables',
      urgency: 'medium',
      specifications: '',
      alternativeItems: '',
      remarks: ''
    }
  ]);

  // File input ref for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for display
  const nrgpSummary = {
    total: 145,
    pending: 34,
    approved: 89,
    rejected: 22
  };

  const recentNRGPs = [
    {
      id: 'NRGP-2024-001',
      recipientName: 'Production Department',
      recipientType: 'department',
      entryDate: '2024-01-20',
      purpose: 'Raw Material Supply',
      status: 'approved',
      priority: 'high',
      itemsCount: 8,
      estimatedValue: 125000.00,
      createdBy: 'John Doe'
    },
    {
      id: 'NRGP-2024-002',
      recipientName: 'Maintenance Workshop',
      recipientType: 'location',
      entryDate: '2024-01-19',
      purpose: 'Equipment Repair Parts',
      status: 'pending',
      priority: 'medium',
      itemsCount: 5,
      estimatedValue: 75000.00,
      createdBy: 'Mike Smith'
    },
    {
      id: 'NRGP-2024-003',
      recipientName: 'Quality Control Lab',
      recipientType: 'department',
      entryDate: '2024-01-18',
      purpose: 'Testing Consumables',
      status: 'approved',
      priority: 'low',
      itemsCount: 12,
      estimatedValue: 45000.00,
      createdBy: 'Sarah Wilson'
    },
    {
      id: 'NRGP-2024-004',
      recipientName: 'Site Office Block-A',
      recipientType: 'location',
      entryDate: '2024-01-17',
      purpose: 'Office Supplies',
      status: 'rejected',
      priority: 'low',
      itemsCount: 6,
      estimatedValue: 18000.00,
      createdBy: 'David Brown'
    }
  ];

  // Performance metrics
  const performanceMetrics = [
    { label: 'Processing Time', value: '3.2 days', trend: 'down' },
    { label: 'Approval Rate', value: '76%', trend: 'up' },
    { label: 'Average Value', value: '₹82,500', trend: 'up' },
    { label: 'Rush Orders', value: '18%', trend: 'down' }
  ];

  // Handle form input changes
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle item changes
  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...nrgpItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setNRGPItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setNRGPItems([...nrgpItems, {
      id: nrgpItems.length + 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedCost: 0,
      category: 'consumables',
      urgency: 'medium',
      specifications: '',
      alternativeItems: '',
      remarks: ''
    }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (nrgpItems.length > 1) {
      const updatedItems = nrgpItems.filter((_, i) => i !== index);
      setNRGPItems(updatedItems);
    }
  };

  // Handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  // Remove attachment
  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // Submit NRGP
  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('NRGP action:', action, formData, nrgpItems);
    alert(`Non-Returnable Gate Pass ${action === 'save' ? 'saved as draft' : 'submitted for approval'} successfully!`);
    
    // Reset form
    setFormData({
      nrgpNo: '',
      entryDate: '',
      recipientType: 'department',
      recipientName: '',
      recipientContact: '',
      recipientLocation: '',
      purpose: '',
      priority: 'medium',
      estimatedValue: 0,
      specialInstructions: '',
      securityClearance: false,
      insuranceRequired: false,
      transportMode: 'internal',
      expectedDeliveryDate: '',
      remarks: '',
      attachments: []
    });
    
    setNRGPItems([{
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedCost: 0,
      category: 'consumables',
      urgency: 'medium',
      specifications: '',
      alternativeItems: '',
      remarks: ''
    }]);
  };

  // View NRGP details
  const viewNRGPDetails = (nrgpData: any) => {
    setSelectedNRGP(nrgpData);
    setShowModal(true);
  };

  const renderOverviewTab = () => (
    <div className="nrgp-entry-tab-content">
      <div className="nrgp-entry-space-y-4">
        {/* Summary Cards */}
        <div className="nrgp-entry-grid-4">
          <div className="nrgp-entry-card nrgp-entry-summary-card">
            <div className="nrgp-entry-summary-content">
              <div className="nrgp-entry-summary-icon total">
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="nrgp-entry-summary-text">Total NRGPs</p>
                <p className="nrgp-entry-summary-number total">{nrgpSummary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="nrgp-entry-card nrgp-entry-summary-card">
            <div className="nrgp-entry-summary-content">
              <div className="nrgp-entry-summary-icon pending">
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <p className="nrgp-entry-summary-text">Pending Approval</p>
                <p className="nrgp-entry-summary-number pending">{nrgpSummary.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="nrgp-entry-card nrgp-entry-summary-card">
            <div className="nrgp-entry-summary-content">
              <div className="nrgp-entry-summary-icon approved">
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="nrgp-entry-summary-text">Approved</p>
                <p className="nrgp-entry-summary-number approved">{nrgpSummary.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="nrgp-entry-card nrgp-entry-summary-card">
            <div className="nrgp-entry-summary-content">
              <div className="nrgp-entry-summary-icon rejected">
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="nrgp-entry-summary-text">Rejected</p>
                <p className="nrgp-entry-summary-number rejected">{nrgpSummary.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent NRGPs */}
        <div className="nrgp-entry-card">
          <div className="nrgp-entry-card-header">
            <h3 className="nrgp-entry-card-title">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Recent NRGP Entries
            </h3>
          </div>
          <div className="nrgp-entry-tab-content">
            <div className="nrgp-entry-table-container">
              <table className="nrgp-entry-table">
                <thead className="nrgp-entry-table-header">
                  <tr>
                    <th>NRGP No.</th>
                    <th>Recipient</th>
                    <th>Type</th>
                    <th>Entry Date</th>
                    <th>Purpose</th>
                    <th>Items</th>
                    <th>Value</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentNRGPs.map((nrgp) => (
                    <tr key={nrgp.id} className="nrgp-entry-table-row">
                      <td className="nrgp-entry-table-cell nrgp-no">{nrgp.id}</td>
                      <td className="nrgp-entry-table-cell recipient-name">{nrgp.recipientName}</td>
                      <td className="nrgp-entry-table-cell center">
                        <span className={`nrgp-entry-badge type ${nrgp.recipientType}`}>
                          {nrgp.recipientType}
                        </span>
                      </td>
                      <td className="nrgp-entry-table-cell">{new Date(nrgp.entryDate).toLocaleDateString()}</td>
                      <td className="nrgp-entry-table-cell purpose">{nrgp.purpose}</td>
                      <td className="nrgp-entry-table-cell center">{nrgp.itemsCount}</td>
                      <td className="nrgp-entry-table-cell center">₹{nrgp.estimatedValue.toLocaleString()}</td>
                      <td className="nrgp-entry-table-cell center">
                        <span className={`nrgp-entry-badge priority ${nrgp.priority}`}>
                          {nrgp.priority}
                        </span>
                      </td>
                      <td className="nrgp-entry-table-cell center">
                        <span className={`nrgp-entry-badge status ${nrgp.status}`}>
                          {nrgp.status}
                        </span>
                      </td>
                      <td className="nrgp-entry-table-cell">
                        <button
                          className="nrgp-entry-button outline small"
                          onClick={() => viewNRGPDetails(nrgp)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="nrgp-entry-card">
          <div className="nrgp-entry-card-header">
            <h3 className="nrgp-entry-card-title">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              Performance Metrics
            </h3>
          </div>
          <div className="nrgp-entry-tab-content">
            <div className="nrgp-entry-stats-grid">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="nrgp-entry-stat-item">
                  <div>
                    <div className="nrgp-entry-stat-label">{metric.label}</div>
                    <div className="nrgp-entry-stat-value">{metric.value}</div>
                  </div>
                  <div className={`nrgp-entry-trend ${metric.trend}`}>
                    {metric.trend === 'up' ? (
                      <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 15.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateTab = () => (
    <div className="nrgp-entry-tab-content">
      <div className="nrgp-entry-space-y-4">
        {/* NRGP Information Section */}
        <div className="nrgp-entry-form-section">
          <h4>NRGP Information</h4>
          <div className="nrgp-entry-form-grid">
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">NRGP Number</label>
              <input
                type="text"
                className="nrgp-entry-form-input readonly"
                value={formData.nrgpNo}
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Entry Date</label>
              <input
                type="date"
                className="nrgp-entry-form-input"
                value={formData.entryDate}
                onChange={(e) => handleFormChange('entryDate', e.target.value)}
              />
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Priority Level</label>
              <select
                className="nrgp-entry-form-select"
                value={formData.priority}
                onChange={(e) => handleFormChange('priority', e.target.value)}
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Estimated Total Value</label>
              <input
                type="number"
                className="nrgp-entry-form-input"
                value={formData.estimatedValue}
                onChange={(e) => handleFormChange('estimatedValue', parseFloat(e.target.value) || 0)}
                min="0"
                step="100"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        {/* Recipient Information Section */}
        <div className="nrgp-entry-form-section">
          <h4>Recipient Information</h4>
          <div className="nrgp-entry-form-grid">
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Recipient Type</label>
              <select
                className="nrgp-entry-form-select"
                value={formData.recipientType}
                onChange={(e) => handleFormChange('recipientType', e.target.value)}
              >
                <option value="department">Department</option>
                <option value="location">Location/Site</option>
                <option value="contractor">Contractor</option>
                <option value="vendor">Vendor</option>
                <option value="external">External Party</option>
              </select>
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Recipient Name</label>
              <input
                type="text"
                className="nrgp-entry-form-input"
                value={formData.recipientName}
                onChange={(e) => handleFormChange('recipientName', e.target.value)}
                placeholder="Enter recipient name"
              />
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Contact Person</label>
              <input
                type="text"
                className="nrgp-entry-form-input"
                value={formData.recipientContact}
                onChange={(e) => handleFormChange('recipientContact', e.target.value)}
                placeholder="Enter contact person"
              />
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Location/Address</label>
              <input
                type="text"
                className="nrgp-entry-form-input"
                value={formData.recipientLocation}
                onChange={(e) => handleFormChange('recipientLocation', e.target.value)}
                placeholder="Enter location or address"
              />
            </div>
          </div>
        </div>

        {/* Purpose and Delivery Section */}
        <div className="nrgp-entry-form-section">
          <h4>Purpose and Delivery Details</h4>
          <div className="nrgp-entry-form-grid">
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Purpose</label>
              <input
                type="text"
                className="nrgp-entry-form-input"
                value={formData.purpose}
                onChange={(e) => handleFormChange('purpose', e.target.value)}
                placeholder="Brief purpose description"
              />
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Transport Mode</label>
              <select
                className="nrgp-entry-form-select"
                value={formData.transportMode}
                onChange={(e) => handleFormChange('transportMode', e.target.value)}
              >
                <option value="internal">Internal Transport</option>
                <option value="external">External Transport</option>
                <option value="courier">Courier Service</option>
                <option value="pickup">Recipient Pickup</option>
                <option value="direct">Direct Delivery</option>
              </select>
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-form-label">Expected Delivery Date</label>
              <input
                type="date"
                className="nrgp-entry-form-input"
                value={formData.expectedDeliveryDate}
                onChange={(e) => handleFormChange('expectedDeliveryDate', e.target.value)}
              />
            </div>
          </div>
          
          <div className="nrgp-entry-form-group full-width">
            <label className="nrgp-entry-form-label">Special Instructions</label>
            <textarea
              className="nrgp-entry-form-textarea"
              value={formData.specialInstructions}
              onChange={(e) => handleFormChange('specialInstructions', e.target.value)}
              placeholder="Any special handling or delivery instructions"
              rows={3}
            />
          </div>
        </div>

        {/* Items Section */}
        <div className="nrgp-entry-form-section">
          <div className="nrgp-entry-section-header">
            <h4>Items for Non-Returnable Gate Pass</h4>
            <button
              type="button"
              className="nrgp-entry-button primary small"
              onClick={addItem}
            >
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Item
            </button>
          </div>
          
          <div className="nrgp-entry-items-container">
            {nrgpItems.map((item, index) => (
              <div key={item.id} className="nrgp-entry-item-card">
                <div className="nrgp-entry-item-header">
                  <h5>Item {index + 1}</h5>
                  {nrgpItems.length > 1 && (
                    <button
                      type="button"
                      className="nrgp-entry-button danger small"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="nrgp-entry-item-grid">
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Item Code</label>
                    <input
                      type="text"
                      className="nrgp-entry-form-input"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Enter item code"
                    />
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Item Name</label>
                    <input
                      type="text"
                      className="nrgp-entry-form-input"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Category</label>
                    <select
                      className="nrgp-entry-form-select"
                      value={item.category}
                      onChange={(e) => handleItemChange(index, 'category', e.target.value)}
                    >
                      <option value="consumables">Consumables</option>
                      <option value="raw-materials">Raw Materials</option>
                      <option value="spare-parts">Spare Parts</option>
                      <option value="tools">Tools</option>
                      <option value="equipment">Equipment</option>
                      <option value="supplies">Office Supplies</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Quantity</label>
                    <input
                      type="number"
                      className="nrgp-entry-form-input"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Unit</label>
                    <input
                      type="text"
                      className="nrgp-entry-form-input"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      placeholder="e.g., pieces, kg, liters"
                    />
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Estimated Cost</label>
                    <input
                      type="number"
                      className="nrgp-entry-form-input"
                      value={item.estimatedCost}
                      onChange={(e) => handleItemChange(index, 'estimatedCost', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="100"
                      placeholder="0.00"
                    />
                  </div>
                  
                  <div className="nrgp-entry-form-group">
                    <label className="nrgp-entry-form-label">Urgency</label>
                    <select
                      className="nrgp-entry-form-select"
                      value={item.urgency}
                      onChange={(e) => handleItemChange(index, 'urgency', e.target.value)}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>
                
                <div className="nrgp-entry-form-group full-width">
                  <label className="nrgp-entry-form-label">Item Description</label>
                  <textarea
                    className="nrgp-entry-form-textarea"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Detailed description of the item"
                    rows={2}
                  />
                </div>
                
                <div className="nrgp-entry-form-group full-width">
                  <label className="nrgp-entry-form-label">Specifications</label>
                  <textarea
                    className="nrgp-entry-form-textarea"
                    value={item.specifications}
                    onChange={(e) => handleItemChange(index, 'specifications', e.target.value)}
                    placeholder="Technical specifications, dimensions, quality requirements"
                    rows={2}
                  />
                </div>
                
                <div className="nrgp-entry-form-group full-width">
                  <label className="nrgp-entry-form-label">Alternative Items</label>
                  <textarea
                    className="nrgp-entry-form-textarea"
                    value={item.alternativeItems}
                    onChange={(e) => handleItemChange(index, 'alternativeItems', e.target.value)}
                    placeholder="Alternative items if primary item is not available"
                    rows={2}
                  />
                </div>
                
                <div className="nrgp-entry-form-group full-width">
                  <label className="nrgp-entry-form-label">Item Remarks</label>
                  <textarea
                    className="nrgp-entry-form-textarea"
                    value={item.remarks}
                    onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                    placeholder="Any additional remarks for this item"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Requirements Section */}
        <div className="nrgp-entry-form-section">
          <h4>Additional Requirements</h4>
          <div className="nrgp-entry-form-grid">
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-checkbox-label">
                <input
                  type="checkbox"
                  className="nrgp-entry-checkbox"
                  checked={formData.securityClearance}
                  onChange={(e) => handleFormChange('securityClearance', e.target.checked)}
                />
                Security Clearance Required
              </label>
            </div>
            
            <div className="nrgp-entry-form-group">
              <label className="nrgp-entry-checkbox-label">
                <input
                  type="checkbox"
                  className="nrgp-entry-checkbox"
                  checked={formData.insuranceRequired}
                  onChange={(e) => handleFormChange('insuranceRequired', e.target.checked)}
                />
                Insurance Coverage Required
              </label>
            </div>
          </div>
        </div>

        {/* Remarks Section */}
        <div className="nrgp-entry-form-section">
          <h4>Additional Information</h4>
          <div className="nrgp-entry-form-group full-width">
            <label className="nrgp-entry-form-label">General Remarks</label>
            <textarea
              className="nrgp-entry-form-textarea"
              value={formData.remarks}
              onChange={(e) => handleFormChange('remarks', e.target.value)}
              placeholder="Any additional information or special requirements"
              rows={4}
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="nrgp-entry-form-section">
          <h4>Attachments</h4>
          <div className="nrgp-entry-form-group">
            <label className="nrgp-entry-form-label">Upload Supporting Documents</label>
            <input
              type="file"
              ref={fileInputRef}
              className="nrgp-entry-form-input"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
            />
            {formData.attachments.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                {formData.attachments.map((file, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>{file.name}</span>
                    <button
                      type="button"
                      className="nrgp-entry-button danger small"
                      onClick={() => removeAttachment(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="nrgp-entry-form-actions">
          <button
            type="button"
            className="nrgp-entry-button outline"
            onClick={() => {
              setFormData({
                nrgpNo: '',
                entryDate: '',
                recipientType: 'department',
                recipientName: '',
                recipientContact: '',
                recipientLocation: '',
                purpose: '',
                priority: 'medium',
                estimatedValue: 0,
                specialInstructions: '',
                securityClearance: false,
                insuranceRequired: false,
                transportMode: 'internal',
                expectedDeliveryDate: '',
                remarks: '',
                attachments: []
              });
              setNRGPItems([{
                id: 1,
                itemCode: '',
                itemName: '',
                description: '',
                quantity: 0,
                unit: '',
                estimatedCost: 0,
                category: 'consumables',
                urgency: 'medium',
                specifications: '',
                alternativeItems: '',
                remarks: ''
              }]);
            }}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="nrgp-entry-button outline"
            onClick={() => handleSubmit('save')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="nrgp-entry-button primary"
            onClick={() => handleSubmit('submit')}
          >
            Submit for Approval
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="nrgp-entry-tab-content">
      <div className="nrgp-entry-space-y-4">
        {/* Report Options */}
        <div className="nrgp-entry-reports-grid">
          <div className="nrgp-entry-report-card">
            <div className="nrgp-entry-report-icon purple">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="nrgp-entry-report-title">NRGP Summary Report</h3>
            <p className="nrgp-entry-report-description">
              Comprehensive summary of all non-returnable gate passes with statistics
            </p>
            <button className="nrgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="nrgp-entry-report-card">
            <div className="nrgp-entry-report-icon orange">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="nrgp-entry-report-title">Approval Status Report</h3>
            <p className="nrgp-entry-report-description">
              Track approval status and processing times for all NRGPs
            </p>
            <button className="nrgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="nrgp-entry-report-card">
            <div className="nrgp-entry-report-icon blue">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="nrgp-entry-report-title">Value Analysis Report</h3>
            <p className="nrgp-entry-report-description">
              Analysis of item values and cost distribution across categories
            </p>
            <button className="nrgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="nrgp-entry-report-card">
            <div className="nrgp-entry-report-icon green">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="nrgp-entry-report-title">Department Usage Report</h3>
            <p className="nrgp-entry-report-description">
              Department-wise usage patterns and frequency analysis
            </p>
            <button className="nrgp-entry-button primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="nrgp-entry-card">
          <div className="nrgp-entry-card-header">
            <h3 className="nrgp-entry-card-title">
              <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              NRGP Analytics
            </h3>
          </div>
          <div className="nrgp-entry-stats-section">
            <div className="nrgp-entry-stats-grid">
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">This Month Entries</span>
                <span className="nrgp-entry-stat-value">42</span>
              </div>
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">Approval Rate</span>
                <span className="nrgp-entry-stat-value">84%</span>
              </div>
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">Total Value This Month</span>
                <span className="nrgp-entry-stat-value">₹34.8L</span>
              </div>
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">Avg Processing Time</span>
                <span className="nrgp-entry-stat-value">2.4 days</span>
              </div>
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">Top Category</span>
                <span className="nrgp-entry-stat-value">Raw Materials</span>
              </div>
              <div className="nrgp-entry-stat-item">
                <span className="nrgp-entry-stat-label">Active Recipients</span>
                <span className="nrgp-entry-stat-value">18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="nrgp-entry-container">
      {/* Header */}
      <div className="nrgp-entry-header">
        <div className="nrgp-entry-header-content">
          <div className="nrgp-entry-header-info">
            <div className="nrgp-entry-header-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="nrgp-entry-icon">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h1 className="nrgp-entry-header-title">NRGP Entry</h1>
              <p className="nrgp-entry-header-subtitle">Non-returnable Gate Pass - for permanent transfers and consumables</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="nrgp-entry-main-container">
        {/* Tab Navigation */}
        <div className="nrgp-entry-tab-navigation">
          <div className="nrgp-entry-tab-nav">
            <div className="nrgp-entry-tab-list">
              <button
                className={`nrgp-entry-tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                NRGP Overview
              </button>
              
              <button
                className={`nrgp-entry-tab-button ${activeTab === 'create' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('create')}
              >
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Create NRGP
              </button>
              
              <button
                className={`nrgp-entry-tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="nrgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                NRGP Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>

      {/* NRGP Details Modal */}
      {showModal && selectedNRGP && (
        <div className="nrgp-entry-modal-overlay">
          <div className="nrgp-entry-modal">
            <div className="nrgp-entry-modal-header">
              <h3>NRGP Details - {selectedNRGP.id}</h3>
            </div>
            <div className="nrgp-entry-modal-content">
              <div className="nrgp-entry-space-y-4">
                <div>
                  <strong>Recipient:</strong> {selectedNRGP.recipientName}
                </div>
                <div>
                  <strong>Type:</strong> {selectedNRGP.recipientType}
                </div>
                <div>
                  <strong>Entry Date:</strong> {new Date(selectedNRGP.entryDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Purpose:</strong> {selectedNRGP.purpose}
                </div>
                <div>
                  <strong>Items:</strong> {selectedNRGP.itemsCount}
                </div>
                <div>
                  <strong>Estimated Value:</strong> ₹{selectedNRGP.estimatedValue.toLocaleString()}
                </div>
                <div>
                  <strong>Priority:</strong> 
                  <span className={`nrgp-entry-badge priority ${selectedNRGP.priority}`} style={{marginLeft: '0.5rem'}}>
                    {selectedNRGP.priority}
                  </span>
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`nrgp-entry-badge status ${selectedNRGP.status}`} style={{marginLeft: '0.5rem'}}>
                    {selectedNRGP.status}
                  </span>
                </div>
                <div>
                  <strong>Created By:</strong> {selectedNRGP.createdBy}
                </div>
              </div>
            </div>
            <div className="nrgp-entry-modal-actions">
              <button
                className="nrgp-entry-button outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="nrgp-entry-button primary"
                onClick={() => {
                  console.log('Processing NRGP:', selectedNRGP.id);
                  setShowModal(false);
                }}
              >
                Process NRGP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NRGPEntry;
