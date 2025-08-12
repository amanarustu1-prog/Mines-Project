import React, { useState, useRef } from 'react';
import './styles.css';

const RGPEntry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'reports'>('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedRGP, setSelectedRGP] = useState<any>(null);

  // Form state for new RGP entry
  const [formData, setFormData] = useState({
    rgpNo: '',
    rgpDate: '',
    recipientType: 'machine',
    machineId: '',
    vehicleId: '',
    departmentId: '',
    recipientName: '',
    expectedReturnDate: '',
    purpose: '',
    priority: 'normal',
    remarks: '',
    issuedBy: '',
    approvedBy: '',
    status: 'pending',
    attachments: [] as File[]
  });

  // Items in the RGP
  const [rgpItems, setRGPItems] = useState([
    {
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedValue: 0,
      condition: 'new',
      serialNumbers: ''
    }
  ]);

  // File input ref for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for display
  const rgpSummary = {
    total: 128,
    pending: 45,
    approved: 67,
    returned: 16
  };

  const recentRGPs = [
    {
      id: 'RGP-2024-001',
      recipientName: 'Excavator EX-450',
      recipientType: 'machine',
      rgpDate: '2024-01-15',
      returnDate: '2024-01-20',
      status: 'pending',
      priority: 'high',
      itemsCount: 5,
      estimatedValue: 25000.00
    },
    {
      id: 'RGP-2024-002',
      recipientName: 'Truck TR-102',
      recipientType: 'vehicle',
      rgpDate: '2024-01-14',
      returnDate: '2024-01-18',
      status: 'approved',
      priority: 'normal',
      itemsCount: 3,
      estimatedValue: 15000.00
    },
    {
      id: 'RGP-2024-003',
      recipientName: 'Maintenance Dept',
      recipientType: 'department',
      rgpDate: '2024-01-13',
      returnDate: '2024-01-17',
      status: 'returned',
      priority: 'normal',
      itemsCount: 8,
      estimatedValue: 8500.00
    },
    {
      id: 'RGP-2024-004',
      recipientName: 'Drilling Machine DM-301',
      recipientType: 'machine',
      rgpDate: '2024-01-12',
      returnDate: '2024-01-16',
      status: 'pending',
      priority: 'urgent',
      itemsCount: 2,
      estimatedValue: 45000.00
    }
  ];

  // Most active recipients
  const topRecipients = [
    { name: 'Excavator EX-450', type: 'Machine', rgps: 24, value: 450000.00, returnRate: 95 },
    { name: 'Maintenance Dept', type: 'Department', rgps: 38, value: 285000.00, returnRate: 92 },
    { name: 'Truck TR-102', type: 'Vehicle', rgps: 19, value: 195000.00, returnRate: 88 },
    { name: 'Production Dept', type: 'Department', rgps: 31, value: 320000.00, returnRate: 94 }
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
    const updatedItems = [...rgpItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setRGPItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setRGPItems([...rgpItems, {
      id: rgpItems.length + 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedValue: 0,
      condition: 'new',
      serialNumbers: ''
    }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (rgpItems.length > 1) {
      const updatedItems = rgpItems.filter((_, i) => i !== index);
      setRGPItems(updatedItems);
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

  // Submit RGP
  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('RGP action:', action, formData, rgpItems);
    alert(`RGP ${action === 'save' ? 'saved as draft' : 'submitted'} successfully!`);
    
    // Reset form
    setFormData({
      rgpNo: '',
      rgpDate: '',
      recipientType: 'machine',
      machineId: '',
      vehicleId: '',
      departmentId: '',
      recipientName: '',
      expectedReturnDate: '',
      purpose: '',
      priority: 'normal',
      remarks: '',
      issuedBy: '',
      approvedBy: '',
      status: 'pending',
      attachments: []
    });
    
    setRGPItems([{
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      estimatedValue: 0,
      condition: 'new',
      serialNumbers: ''
    }]);
  };

  // View RGP details
  const viewRGPDetails = (rgp: any) => {
    setSelectedRGP(rgp);
    setShowModal(true);
  };

  const renderOverviewTab = () => (
    <div className="rgp-entry-tab-content">
      <div className="rgp-entry-space-y-4">
        {/* Summary Cards */}
        <div className="rgp-entry-grid-4">
          <div className="rgp-entry-card rgp-entry-summary-card">
            <div className="rgp-entry-summary-content">
              <div className="rgp-entry-summary-icon total">
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="rgp-entry-summary-text">Total RGPs</p>
                <p className="rgp-entry-summary-number total">{rgpSummary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-entry-card rgp-entry-summary-card">
            <div className="rgp-entry-summary-content">
              <div className="rgp-entry-summary-icon pending">
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <p className="rgp-entry-summary-text">Pending RGPs</p>
                <p className="rgp-entry-summary-number pending">{rgpSummary.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-entry-card rgp-entry-summary-card">
            <div className="rgp-entry-summary-content">
              <div className="rgp-entry-summary-icon approved">
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="rgp-entry-summary-text">Approved RGPs</p>
                <p className="rgp-entry-summary-number approved">{rgpSummary.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-entry-card rgp-entry-summary-card">
            <div className="rgp-entry-summary-content">
              <div className="rgp-entry-summary-icon completed">
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="rgp-entry-summary-text">Returned RGPs</p>
                <p className="rgp-entry-summary-number completed">{rgpSummary.returned}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent RGPs */}
        <div className="rgp-entry-card">
          <div className="rgp-entry-card-header">
            <h3 className="rgp-entry-card-title">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Recent Returnable Gate Passes
            </h3>
          </div>
          <div className="rgp-entry-tab-content">
            <div className="rgp-entry-table-container">
              <table className="rgp-entry-table">
                <thead className="rgp-entry-table-header">
                  <tr>
                    <th>RGP No.</th>
                    <th>Recipient</th>
                    <th>Type</th>
                    <th>Issue Date</th>
                    <th>Return Date</th>
                    <th>Items</th>
                    <th>Value</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRGPs.map((rgp) => (
                    <tr key={rgp.id} className="rgp-entry-table-row">
                      <td className="rgp-entry-table-cell rgp-no">{rgp.id}</td>
                      <td className="rgp-entry-table-cell recipient-name">{rgp.recipientName}</td>
                      <td className="rgp-entry-table-cell">
                        <span className={`rgp-entry-badge type ${rgp.recipientType}`}>
                          {rgp.recipientType}
                        </span>
                      </td>
                      <td className="rgp-entry-table-cell">{new Date(rgp.rgpDate).toLocaleDateString()}</td>
                      <td className="rgp-entry-table-cell">{new Date(rgp.returnDate).toLocaleDateString()}</td>
                      <td className="rgp-entry-table-cell center">{rgp.itemsCount}</td>
                      <td className="rgp-entry-table-cell value">₹{rgp.estimatedValue.toLocaleString()}</td>
                      <td className="rgp-entry-table-cell">
                        <span className={`rgp-entry-badge priority ${rgp.priority}`}>
                          {rgp.priority}
                        </span>
                      </td>
                      <td className="rgp-entry-table-cell">
                        <span className={`rgp-entry-badge status ${rgp.status}`}>
                          {rgp.status}
                        </span>
                      </td>
                      <td className="rgp-entry-table-cell">
                        <button
                          className="rgp-entry-button outline small"
                          onClick={() => viewRGPDetails(rgp)}
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

        {/* Top Recipients Performance */}
        <div className="rgp-entry-card">
          <div className="rgp-entry-card-header">
            <h3 className="rgp-entry-card-title">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              Top Recipients Performance
            </h3>
          </div>
          <div className="rgp-entry-tab-content">
            <div className="rgp-entry-stats-grid">
              {topRecipients.map((recipient, index) => (
                <div key={index} className="rgp-entry-stat-item">
                  <div>
                    <div className="rgp-entry-stat-label">{recipient.name}</div>
                    <div className="rgp-entry-stat-value">
                      {recipient.rgps} RGPs • ₹{recipient.value.toLocaleString()}
                    </div>
                    <div className="rgp-entry-stat-label">Return Rate: {recipient.returnRate}%</div>
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
    <div className="rgp-entry-tab-content">
      <div className="rgp-entry-space-y-4">
        {/* RGP Information Section */}
        <div className="rgp-entry-form-section">
          <h4>RGP Information</h4>
          <div className="rgp-entry-form-grid">
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">RGP Number</label>
              <input
                type="text"
                className="rgp-entry-form-input"
                value={formData.rgpNo}
                onChange={(e) => handleFormChange('rgpNo', e.target.value)}
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">RGP Date</label>
              <input
                type="date"
                className="rgp-entry-form-input"
                value={formData.rgpDate}
                onChange={(e) => handleFormChange('rgpDate', e.target.value)}
              />
            </div>
            
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Expected Return Date</label>
              <input
                type="date"
                className="rgp-entry-form-input"
                value={formData.expectedReturnDate}
                onChange={(e) => handleFormChange('expectedReturnDate', e.target.value)}
              />
            </div>
            
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Priority</label>
              <select
                className="rgp-entry-form-select"
                value={formData.priority}
                onChange={(e) => handleFormChange('priority', e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Recipient Information Section */}
        <div className="rgp-entry-form-section">
          <h4>Recipient Information</h4>
          <div className="rgp-entry-form-grid">
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Recipient Type</label>
              <select
                className="rgp-entry-form-select"
                value={formData.recipientType}
                onChange={(e) => handleFormChange('recipientType', e.target.value)}
              >
                <option value="machine">Machine</option>
                <option value="vehicle">Vehicle</option>
                <option value="department">Department</option>
              </select>
            </div>
            
            {formData.recipientType === 'machine' && (
              <div className="rgp-entry-form-group">
                <label className="rgp-entry-form-label">Machine ID</label>
                <input
                  type="text"
                  className="rgp-entry-form-input"
                  value={formData.machineId}
                  onChange={(e) => handleFormChange('machineId', e.target.value)}
                  placeholder="Enter machine ID"
                />
              </div>
            )}
            
            {formData.recipientType === 'vehicle' && (
              <div className="rgp-entry-form-group">
                <label className="rgp-entry-form-label">Vehicle ID</label>
                <input
                  type="text"
                  className="rgp-entry-form-input"
                  value={formData.vehicleId}
                  onChange={(e) => handleFormChange('vehicleId', e.target.value)}
                  placeholder="Enter vehicle ID"
                />
              </div>
            )}
            
            {formData.recipientType === 'department' && (
              <div className="rgp-entry-form-group">
                <label className="rgp-entry-form-label">Department</label>
                <select
                  className="rgp-entry-form-select"
                  value={formData.departmentId}
                  onChange={(e) => handleFormChange('departmentId', e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option value="production">Production</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="transportation">Transportation</option>
                  <option value="safety">Safety</option>
                  <option value="administration">Administration</option>
                </select>
              </div>
            )}
            
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Recipient Name</label>
              <input
                type="text"
                className="rgp-entry-form-input"
                value={formData.recipientName}
                onChange={(e) => handleFormChange('recipientName', e.target.value)}
                placeholder="Enter recipient name"
              />
            </div>
          </div>
        </div>

        {/* RGP Items Section */}
        <div className="rgp-entry-form-section">
          <div className="rgp-entry-section-header">
            <h4>RGP Items</h4>
            <button
              type="button"
              className="rgp-entry-button primary small"
              onClick={addItem}
            >
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Item
            </button>
          </div>
          
          <div className="rgp-entry-items-container">
            {rgpItems.map((item, index) => (
              <div key={item.id} className="rgp-entry-item-card">
                <div className="rgp-entry-item-header">
                  <h5>Item {index + 1}</h5>
                  {rgpItems.length > 1 && (
                    <button
                      type="button"
                      className="rgp-entry-button danger small"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="rgp-entry-item-grid">
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Item Code</label>
                    <input
                      type="text"
                      className="rgp-entry-form-input"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Enter item code"
                    />
                  </div>
                  
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Item Name</label>
                    <input
                      type="text"
                      className="rgp-entry-form-input"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Quantity</label>
                    <input
                      type="number"
                      className="rgp-entry-form-input"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Unit</label>
                    <select
                      className="rgp-entry-form-select"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="meters">Meters</option>
                      <option value="liters">Liters</option>
                      <option value="sets">Sets</option>
                    </select>
                  </div>
                  
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Estimated Value (₹)</label>
                    <input
                      type="number"
                      className="rgp-entry-form-input"
                      value={item.estimatedValue}
                      onChange={(e) => handleItemChange(index, 'estimatedValue', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="rgp-entry-form-group">
                    <label className="rgp-entry-form-label">Condition</label>
                    <select
                      className="rgp-entry-form-select"
                      value={item.condition}
                      onChange={(e) => handleItemChange(index, 'condition', e.target.value)}
                    >
                      <option value="new">New</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                    </select>
                  </div>
                </div>
                
                <div className="rgp-entry-form-group full-width">
                  <label className="rgp-entry-form-label">Description</label>
                  <textarea
                    className="rgp-entry-form-textarea"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Enter item description"
                    rows={2}
                  />
                </div>
                
                <div className="rgp-entry-form-group full-width">
                  <label className="rgp-entry-form-label">Serial Numbers (if applicable)</label>
                  <input
                    type="text"
                    className="rgp-entry-form-input"
                    value={item.serialNumbers}
                    onChange={(e) => handleItemChange(index, 'serialNumbers', e.target.value)}
                    placeholder="Enter serial numbers separated by commas"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Purpose and Approval Section */}
        <div className="rgp-entry-form-section">
          <h4>Purpose and Approval</h4>
          <div className="rgp-entry-form-grid">
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Issued By</label>
              <input
                type="text"
                className="rgp-entry-form-input"
                value={formData.issuedBy}
                onChange={(e) => handleFormChange('issuedBy', e.target.value)}
                placeholder="Enter issuer name"
              />
            </div>
            
            <div className="rgp-entry-form-group">
              <label className="rgp-entry-form-label">Approved By</label>
              <input
                type="text"
                className="rgp-entry-form-input"
                value={formData.approvedBy}
                onChange={(e) => handleFormChange('approvedBy', e.target.value)}
                placeholder="Enter approver name"
              />
            </div>
          </div>
          
          <div className="rgp-entry-form-group full-width">
            <label className="rgp-entry-form-label">Purpose</label>
            <textarea
              className="rgp-entry-form-textarea"
              value={formData.purpose}
              onChange={(e) => handleFormChange('purpose', e.target.value)}
              placeholder="Enter purpose for RGP"
              rows={3}
            />
          </div>
          
          <div className="rgp-entry-form-group full-width">
            <label className="rgp-entry-form-label">Remarks</label>
            <textarea
              className="rgp-entry-form-textarea"
              value={formData.remarks}
              onChange={(e) => handleFormChange('remarks', e.target.value)}
              placeholder="Enter any additional remarks"
              rows={2}
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="rgp-entry-form-section">
          <h4>Attachments</h4>
          <div className="rgp-entry-form-group">
            <label className="rgp-entry-form-label">Upload Documents</label>
            <input
              type="file"
              ref={fileInputRef}
              className="rgp-entry-form-input"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
            />
            {formData.attachments.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                {formData.attachments.map((file, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>{file.name}</span>
                    <button
                      type="button"
                      className="rgp-entry-button danger small"
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
        <div className="rgp-entry-form-actions">
          <button
            type="button"
            className="rgp-entry-button outline"
            onClick={() => {
              setFormData({
                rgpNo: '',
                rgpDate: '',
                recipientType: 'machine',
                machineId: '',
                vehicleId: '',
                departmentId: '',
                recipientName: '',
                expectedReturnDate: '',
                purpose: '',
                priority: 'normal',
                remarks: '',
                issuedBy: '',
                approvedBy: '',
                status: 'pending',
                attachments: []
              });
              setRGPItems([{
                id: 1,
                itemCode: '',
                itemName: '',
                description: '',
                quantity: 0,
                unit: '',
                estimatedValue: 0,
                condition: 'new',
                serialNumbers: ''
              }]);
            }}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="rgp-entry-button outline"
            onClick={() => handleSubmit('save')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="rgp-entry-button primary"
            onClick={() => handleSubmit('submit')}
          >
            Submit RGP
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="rgp-entry-tab-content">
      <div className="rgp-entry-space-y-4">
        {/* Report Options */}
        <div className="rgp-entry-reports-grid">
          <div className="rgp-entry-report-card">
            <div className="rgp-entry-report-icon blue">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="rgp-entry-report-title">RGP History Report</h3>
            <p className="rgp-entry-report-description">
              Comprehensive report of all returnable gate passes with filtering options
            </p>
            <button className="rgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-entry-report-card">
            <div className="rgp-entry-report-icon green">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="rgp-entry-report-title">Recipient Analysis Report</h3>
            <p className="rgp-entry-report-description">
              Detailed recipient performance and return rate analysis
            </p>
            <button className="rgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-entry-report-card">
            <div className="rgp-entry-report-icon purple">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="rgp-entry-report-title">Outstanding RGPs Report</h3>
            <p className="rgp-entry-report-description">
              Track pending returns and overdue returnable gate passes
            </p>
            <button className="rgp-entry-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-entry-report-card">
            <div className="rgp-entry-report-icon orange">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="rgp-entry-report-title">Asset Tracking Report</h3>
            <p className="rgp-entry-report-description">
              Track asset movement and utilization through RGPs
            </p>
            <button className="rgp-entry-button primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="rgp-entry-card">
          <div className="rgp-entry-card-header">
            <h3 className="rgp-entry-card-title">
              <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              RGP Statistics
            </h3>
          </div>
          <div className="rgp-entry-stats-section">
            <div className="rgp-entry-stats-grid">
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">This Month RGPs</span>
                <span className="rgp-entry-stat-value">34</span>
              </div>
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">Total Value</span>
                <span className="rgp-entry-stat-value">₹5,67,890</span>
              </div>
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">Overdue Returns</span>
                <span className="rgp-entry-stat-value">7</span>
              </div>
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">Avg Return Time</span>
                <span className="rgp-entry-stat-value">4.2 days</span>
              </div>
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">Active Recipients</span>
                <span className="rgp-entry-stat-value">18</span>
              </div>
              <div className="rgp-entry-stat-item">
                <span className="rgp-entry-stat-label">Return Rate</span>
                <span className="rgp-entry-stat-value">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rgp-entry-container">
      {/* Header */}
      <div className="rgp-entry-header">
        <div className="rgp-entry-header-content">
          <div className="rgp-entry-header-info">
            <div className="rgp-entry-header-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="rgp-entry-icon">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h1 className="rgp-entry-header-title">RGP Entry</h1>
              <p className="rgp-entry-header-subtitle">Returnable Gate Pass - Issue to Machine/Vehicle/Department</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rgp-entry-main-container">
        {/* Tab Navigation */}
        <div className="rgp-entry-tab-navigation">
          <div className="rgp-entry-tab-nav">
            <div className="rgp-entry-tab-list">
              <button
                className={`rgp-entry-tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                RGP Overview
              </button>
              
              <button
                className={`rgp-entry-tab-button ${activeTab === 'create' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('create')}
              >
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Create RGP
              </button>
              
              <button
                className={`rgp-entry-tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="rgp-entry-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                RGP Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>

      {/* RGP Details Modal */}
      {showModal && selectedRGP && (
        <div className="rgp-entry-modal-overlay">
          <div className="rgp-entry-modal">
            <div className="rgp-entry-modal-header">
              <h3>RGP Details - {selectedRGP.id}</h3>
            </div>
            <div className="rgp-entry-modal-content">
              <div className="rgp-entry-space-y-4">
                <div>
                  <strong>Recipient:</strong> {selectedRGP.recipientName}
                </div>
                <div>
                  <strong>Type:</strong> {selectedRGP.recipientType}
                </div>
                <div>
                  <strong>Issue Date:</strong> {new Date(selectedRGP.rgpDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Expected Return:</strong> {new Date(selectedRGP.returnDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Items Count:</strong> {selectedRGP.itemsCount}
                </div>
                <div>
                  <strong>Estimated Value:</strong> ₹{selectedRGP.estimatedValue.toLocaleString()}
                </div>
                <div>
                  <strong>Priority:</strong> 
                  <span className={`rgp-entry-badge priority ${selectedRGP.priority}`} style={{marginLeft: '0.5rem'}}>
                    {selectedRGP.priority}
                  </span>
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`rgp-entry-badge status ${selectedRGP.status}`} style={{marginLeft: '0.5rem'}}>
                    {selectedRGP.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="rgp-entry-modal-actions">
              <button
                className="rgp-entry-button outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="rgp-entry-button primary"
                onClick={() => {
                  console.log('Processing RGP:', selectedRGP.id);
                  setShowModal(false);
                }}
              >
                Process RGP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGPEntry;
