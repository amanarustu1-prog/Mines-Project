import React, { useState, useRef } from 'react';
import './styles.css';

const RGPReturn: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'reports'>('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState<any>(null);

  // Form state for new RGP return
  const [formData, setFormData] = useState({
    rgpNo: '',
    originalRGPNo: '',
    returnDate: '',
    receivedBy: '',
    conditionOnReturn: 'good',
    returnerName: '',
    returnerDesignation: '',
    reason: 'completed',
    damages: '',
    remarks: '',
    attachments: [] as File[]
  });

  // Items being returned
  const [returnItems, setReturnItems] = useState([
    {
      id: 1,
      itemCode: '',
      itemName: '',
      issuedQuantity: 0,
      returnedQuantity: 0,
      conditionOnReturn: 'good',
      damageDetails: '',
      remarks: ''
    }
  ]);

  // File input ref for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for display
  const returnSummary = {
    total: 87,
    pending: 23,
    completed: 52,
    overdue: 12
  };

  const recentReturns = [
    {
      id: 'RGP-RTN-2024-001',
      originalRGPNo: 'RGP-2024-001',
      recipientName: 'Excavator EX-450',
      returnDate: '2024-01-20',
      issueDate: '2024-01-15',
      status: 'completed',
      condition: 'good',
      itemsCount: 5,
      returnerName: 'John Doe'
    },
    {
      id: 'RGP-RTN-2024-002',
      originalRGPNo: 'RGP-2024-004',
      recipientName: 'Maintenance Dept',
      returnDate: '2024-01-19',
      issueDate: '2024-01-10',
      status: 'pending',
      condition: 'fair',
      itemsCount: 3,
      returnerName: 'Mike Smith'
    },
    {
      id: 'RGP-RTN-2024-003',
      originalRGPNo: 'RGP-2024-003',
      recipientName: 'Truck TR-102',
      returnDate: '2024-01-18',
      issueDate: '2024-01-14',
      status: 'completed',
      condition: 'poor',
      itemsCount: 2,
      returnerName: 'Sarah Wilson'
    },
    {
      id: 'RGP-RTN-2024-004',
      originalRGPNo: 'RGP-2024-005',
      recipientName: 'Production Dept',
      returnDate: '2024-01-17',
      issueDate: '2024-01-12',
      status: 'overdue',
      condition: 'good',
      itemsCount: 8,
      returnerName: 'David Brown'
    }
  ];

  // Outstanding RGPs awaiting return
  const outstandingRGPs = [
    { rgpNo: 'RGP-2024-006', recipient: 'Excavator EX-301', daysOverdue: 5, value: 35000.00 },
    { rgpNo: 'RGP-2024-007', recipient: 'Maintenance Dept', daysOverdue: 3, value: 18000.00 },
    { rgpNo: 'RGP-2024-008', recipient: 'Truck TR-205', daysOverdue: 8, value: 42000.00 },
    { rgpNo: 'RGP-2024-009', recipient: 'Drilling Team', daysOverdue: 2, value: 28000.00 }
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
    const updatedItems = [...returnItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setReturnItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setReturnItems([...returnItems, {
      id: returnItems.length + 1,
      itemCode: '',
      itemName: '',
      issuedQuantity: 0,
      returnedQuantity: 0,
      conditionOnReturn: 'good',
      damageDetails: '',
      remarks: ''
    }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (returnItems.length > 1) {
      const updatedItems = returnItems.filter((_, i) => i !== index);
      setReturnItems(updatedItems);
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

  // Submit return
  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Return action:', action, formData, returnItems);
    alert(`RGP Return ${action === 'save' ? 'saved as draft' : 'submitted'} successfully!`);
    
    // Reset form
    setFormData({
      rgpNo: '',
      originalRGPNo: '',
      returnDate: '',
      receivedBy: '',
      conditionOnReturn: 'good',
      returnerName: '',
      returnerDesignation: '',
      reason: 'completed',
      damages: '',
      remarks: '',
      attachments: []
    });
    
    setReturnItems([{
      id: 1,
      itemCode: '',
      itemName: '',
      issuedQuantity: 0,
      returnedQuantity: 0,
      conditionOnReturn: 'good',
      damageDetails: '',
      remarks: ''
    }]);
  };

  // View return details
  const viewReturnDetails = (returnData: any) => {
    setSelectedReturn(returnData);
    setShowModal(true);
  };

  const renderOverviewTab = () => (
    <div className="rgp-return-tab-content">
      <div className="rgp-return-space-y-4">
        {/* Summary Cards */}
        <div className="rgp-return-grid-4">
          <div className="rgp-return-card rgp-return-summary-card">
            <div className="rgp-return-summary-content">
              <div className="rgp-return-summary-icon total">
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm8 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="rgp-return-summary-text">Total Returns</p>
                <p className="rgp-return-summary-number total">{returnSummary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-return-card rgp-return-summary-card">
            <div className="rgp-return-summary-content">
              <div className="rgp-return-summary-icon pending">
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <p className="rgp-return-summary-text">Pending Returns</p>
                <p className="rgp-return-summary-number pending">{returnSummary.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-return-card rgp-return-summary-card">
            <div className="rgp-return-summary-content">
              <div className="rgp-return-summary-icon completed">
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="rgp-return-summary-text">Completed Returns</p>
                <p className="rgp-return-summary-number completed">{returnSummary.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="rgp-return-card rgp-return-summary-card">
            <div className="rgp-return-summary-content">
              <div className="rgp-return-summary-icon overdue">
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="rgp-return-summary-text">Overdue Returns</p>
                <p className="rgp-return-summary-number overdue">{returnSummary.overdue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Returns */}
        <div className="rgp-return-card">
          <div className="rgp-return-card-header">
            <h3 className="rgp-return-card-title">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Recent RGP Returns
            </h3>
          </div>
          <div className="rgp-return-tab-content">
            <div className="rgp-return-table-container">
              <table className="rgp-return-table">
                <thead className="rgp-return-table-header">
                  <tr>
                    <th>Return No.</th>
                    <th>Original RGP</th>
                    <th>Recipient</th>
                    <th>Return Date</th>
                    <th>Days Used</th>
                    <th>Items</th>
                    <th>Condition</th>
                    <th>Returned By</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReturns.map((returnData) => (
                    <tr key={returnData.id} className="rgp-return-table-row">
                      <td className="rgp-return-table-cell return-no">{returnData.id}</td>
                      <td className="rgp-return-table-cell original-rgp">{returnData.originalRGPNo}</td>
                      <td className="rgp-return-table-cell recipient-name">{returnData.recipientName}</td>
                      <td className="rgp-return-table-cell">{new Date(returnData.returnDate).toLocaleDateString()}</td>
                      <td className="rgp-return-table-cell center">
                        {Math.ceil((new Date(returnData.returnDate).getTime() - new Date(returnData.issueDate).getTime()) / (1000 * 3600 * 24))}
                      </td>
                      <td className="rgp-return-table-cell center">{returnData.itemsCount}</td>
                      <td className="rgp-return-table-cell">
                        <span className={`rgp-return-badge condition ${returnData.condition}`}>
                          {returnData.condition}
                        </span>
                      </td>
                      <td className="rgp-return-table-cell returner">{returnData.returnerName}</td>
                      <td className="rgp-return-table-cell">
                        <span className={`rgp-return-badge status ${returnData.status}`}>
                          {returnData.status}
                        </span>
                      </td>
                      <td className="rgp-return-table-cell">
                        <button
                          className="rgp-return-button outline small"
                          onClick={() => viewReturnDetails(returnData)}
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

        {/* Outstanding RGPs */}
        <div className="rgp-return-card">
          <div className="rgp-return-card-header">
            <h3 className="rgp-return-card-title">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Outstanding RGPs Awaiting Return
            </h3>
          </div>
          <div className="rgp-return-tab-content">
            <div className="rgp-return-stats-grid">
              {outstandingRGPs.map((rgp, index) => (
                <div key={index} className="rgp-return-stat-item outstanding">
                  <div>
                    <div className="rgp-return-stat-label">{rgp.rgpNo}</div>
                    <div className="rgp-return-stat-value">{rgp.recipient}</div>
                    <div className="rgp-return-stat-label">
                      {rgp.daysOverdue} days overdue • ₹{rgp.value.toLocaleString()}
                    </div>
                  </div>
                  <button className="rgp-return-button danger small">
                    Follow Up
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateTab = () => (
    <div className="rgp-return-tab-content">
      <div className="rgp-return-space-y-4">
        {/* Return Information Section */}
        <div className="rgp-return-form-section">
          <h4>Return Information</h4>
          <div className="rgp-return-form-grid">
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Original RGP Number</label>
              <input
                type="text"
                className="rgp-return-form-input"
                value={formData.originalRGPNo}
                onChange={(e) => handleFormChange('originalRGPNo', e.target.value)}
                placeholder="Enter original RGP number"
              />
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Return Number</label>
              <input
                type="text"
                className="rgp-return-form-input readonly"
                value={formData.rgpNo}
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Return Date</label>
              <input
                type="date"
                className="rgp-return-form-input"
                value={formData.returnDate}
                onChange={(e) => handleFormChange('returnDate', e.target.value)}
              />
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Received By</label>
              <input
                type="text"
                className="rgp-return-form-input"
                value={formData.receivedBy}
                onChange={(e) => handleFormChange('receivedBy', e.target.value)}
                placeholder="Enter receiver name"
              />
            </div>
          </div>
        </div>

        {/* Returner Information Section */}
        <div className="rgp-return-form-section">
          <h4>Returner Information</h4>
          <div className="rgp-return-form-grid">
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Returner Name</label>
              <input
                type="text"
                className="rgp-return-form-input"
                value={formData.returnerName}
                onChange={(e) => handleFormChange('returnerName', e.target.value)}
                placeholder="Enter returner name"
              />
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Designation</label>
              <input
                type="text"
                className="rgp-return-form-input"
                value={formData.returnerDesignation}
                onChange={(e) => handleFormChange('returnerDesignation', e.target.value)}
                placeholder="Enter designation"
              />
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Return Reason</label>
              <select
                className="rgp-return-form-select"
                value={formData.reason}
                onChange={(e) => handleFormChange('reason', e.target.value)}
              >
                <option value="completed">Work Completed</option>
                <option value="cancelled">Work Cancelled</option>
                <option value="damaged">Item Damaged</option>
                <option value="replacement">Replacement Required</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="rgp-return-form-group">
              <label className="rgp-return-form-label">Overall Condition</label>
              <select
                className="rgp-return-form-select"
                value={formData.conditionOnReturn}
                onChange={(e) => handleFormChange('conditionOnReturn', e.target.value)}
              >
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="damaged">Damaged</option>
              </select>
            </div>
          </div>
        </div>

        {/* Returned Items Section */}
        <div className="rgp-return-form-section">
          <div className="rgp-return-section-header">
            <h4>Returned Items</h4>
            <button
              type="button"
              className="rgp-return-button primary small"
              onClick={addItem}
            >
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Item
            </button>
          </div>
          
          <div className="rgp-return-items-container">
            {returnItems.map((item, index) => (
              <div key={item.id} className="rgp-return-item-card">
                <div className="rgp-return-item-header">
                  <h5>Item {index + 1}</h5>
                  {returnItems.length > 1 && (
                    <button
                      type="button"
                      className="rgp-return-button danger small"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="rgp-return-item-grid">
                  <div className="rgp-return-form-group">
                    <label className="rgp-return-form-label">Item Code</label>
                    <input
                      type="text"
                      className="rgp-return-form-input"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Enter item code"
                    />
                  </div>
                  
                  <div className="rgp-return-form-group">
                    <label className="rgp-return-form-label">Item Name</label>
                    <input
                      type="text"
                      className="rgp-return-form-input"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className="rgp-return-form-group">
                    <label className="rgp-return-form-label">Issued Quantity</label>
                    <input
                      type="number"
                      className="rgp-return-form-input readonly"
                      value={item.issuedQuantity}
                      onChange={(e) => handleItemChange(index, 'issuedQuantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                      readOnly
                    />
                  </div>
                  
                  <div className="rgp-return-form-group">
                    <label className="rgp-return-form-label">Returned Quantity</label>
                    <input
                      type="number"
                      className="rgp-return-form-input"
                      value={item.returnedQuantity}
                      onChange={(e) => handleItemChange(index, 'returnedQuantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="rgp-return-form-group">
                    <label className="rgp-return-form-label">Condition on Return</label>
                    <select
                      className="rgp-return-form-select"
                      value={item.conditionOnReturn}
                      onChange={(e) => handleItemChange(index, 'conditionOnReturn', e.target.value)}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                      <option value="damaged">Damaged</option>
                    </select>
                  </div>
                </div>
                
                <div className="rgp-return-form-group full-width">
                  <label className="rgp-return-form-label">Damage Details (if applicable)</label>
                  <textarea
                    className="rgp-return-form-textarea"
                    value={item.damageDetails}
                    onChange={(e) => handleItemChange(index, 'damageDetails', e.target.value)}
                    placeholder="Describe any damages or issues"
                    rows={2}
                  />
                </div>
                
                <div className="rgp-return-form-group full-width">
                  <label className="rgp-return-form-label">Item Remarks</label>
                  <textarea
                    className="rgp-return-form-textarea"
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

        {/* Damage Assessment Section */}
        <div className="rgp-return-form-section">
          <h4>Damage Assessment</h4>
          <div className="rgp-return-form-group full-width">
            <label className="rgp-return-form-label">Overall Damages/Issues</label>
            <textarea
              className="rgp-return-form-textarea"
              value={formData.damages}
              onChange={(e) => handleFormChange('damages', e.target.value)}
              placeholder="Describe any overall damages or issues found during return"
              rows={4}
            />
          </div>
        </div>

        {/* Remarks Section */}
        <div className="rgp-return-form-section">
          <h4>Additional Information</h4>
          <div className="rgp-return-form-group full-width">
            <label className="rgp-return-form-label">Return Remarks</label>
            <textarea
              className="rgp-return-form-textarea"
              value={formData.remarks}
              onChange={(e) => handleFormChange('remarks', e.target.value)}
              placeholder="Any additional remarks about the return process"
              rows={3}
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="rgp-return-form-section">
          <h4>Attachments</h4>
          <div className="rgp-return-form-group">
            <label className="rgp-return-form-label">Upload Documents/Photos</label>
            <input
              type="file"
              ref={fileInputRef}
              className="rgp-return-form-input"
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
                      className="rgp-return-button danger small"
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
        <div className="rgp-return-form-actions">
          <button
            type="button"
            className="rgp-return-button outline"
            onClick={() => {
              setFormData({
                rgpNo: '',
                originalRGPNo: '',
                returnDate: '',
                receivedBy: '',
                conditionOnReturn: 'good',
                returnerName: '',
                returnerDesignation: '',
                reason: 'completed',
                damages: '',
                remarks: '',
                attachments: []
              });
              setReturnItems([{
                id: 1,
                itemCode: '',
                itemName: '',
                issuedQuantity: 0,
                returnedQuantity: 0,
                conditionOnReturn: 'good',
                damageDetails: '',
                remarks: ''
              }]);
            }}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="rgp-return-button outline"
            onClick={() => handleSubmit('save')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="rgp-return-button primary"
            onClick={() => handleSubmit('submit')}
          >
            Submit Return
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="rgp-return-tab-content">
      <div className="rgp-return-space-y-4">
        {/* Report Options */}
        <div className="rgp-return-reports-grid">
          <div className="rgp-return-report-card">
            <div className="rgp-return-report-icon green">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="rgp-return-report-title">Return History Report</h3>
            <p className="rgp-return-report-description">
              Comprehensive report of all RGP returns with detailed analysis
            </p>
            <button className="rgp-return-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-return-report-card">
            <div className="rgp-return-report-icon orange">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="rgp-return-report-title">Overdue Returns Report</h3>
            <p className="rgp-return-report-description">
              Track overdue returns and follow-up requirements
            </p>
            <button className="rgp-return-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-return-report-card">
            <div className="rgp-return-report-icon blue">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="rgp-return-report-title">Condition Analysis Report</h3>
            <p className="rgp-return-report-description">
              Analysis of item conditions and damage patterns
            </p>
            <button className="rgp-return-button primary">
              Generate Report
            </button>
          </div>

          <div className="rgp-return-report-card">
            <div className="rgp-return-report-icon purple">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="rgp-return-report-title">Return Performance Report</h3>
            <p className="rgp-return-report-description">
              Performance metrics and return rate analysis
            </p>
            <button className="rgp-return-button primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="rgp-return-card">
          <div className="rgp-return-card-header">
            <h3 className="rgp-return-card-title">
              <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              Return Statistics
            </h3>
          </div>
          <div className="rgp-return-stats-section">
            <div className="rgp-return-stats-grid">
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">This Month Returns</span>
                <span className="rgp-return-stat-value">28</span>
              </div>
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">On-time Return Rate</span>
                <span className="rgp-return-stat-value">85%</span>
              </div>
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">Good Condition Rate</span>
                <span className="rgp-return-stat-value">78%</span>
              </div>
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">Avg Return Time</span>
                <span className="rgp-return-stat-value">5.8 days</span>
              </div>
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">Damage Reports</span>
                <span className="rgp-return-stat-value">6</span>
              </div>
              <div className="rgp-return-stat-item">
                <span className="rgp-return-stat-label">Follow-ups Pending</span>
                <span className="rgp-return-stat-value">12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rgp-return-container">
      {/* Header */}
      <div className="rgp-return-header">
        <div className="rgp-return-header-content">
          <div className="rgp-return-header-info">
            <div className="rgp-return-header-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="rgp-return-icon">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h1 className="rgp-return-header-title">RGP Return</h1>
              <p className="rgp-return-header-subtitle">Return processing without PO - for urgent handling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="rgp-return-main-container">
        {/* Tab Navigation */}
        <div className="rgp-return-tab-navigation">
          <div className="rgp-return-tab-nav">
            <div className="rgp-return-tab-list">
              <button
                className={`rgp-return-tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Return Overview
              </button>
              
              <button
                className={`rgp-return-tab-button ${activeTab === 'create' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('create')}
              >
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Process Return
              </button>
              
              <button
                className={`rgp-return-tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="rgp-return-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Return Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>

      {/* Return Details Modal */}
      {showModal && selectedReturn && (
        <div className="rgp-return-modal-overlay">
          <div className="rgp-return-modal">
            <div className="rgp-return-modal-header">
              <h3>Return Details - {selectedReturn.id}</h3>
            </div>
            <div className="rgp-return-modal-content">
              <div className="rgp-return-space-y-4">
                <div>
                  <strong>Original RGP:</strong> {selectedReturn.originalRGPNo}
                </div>
                <div>
                  <strong>Recipient:</strong> {selectedReturn.recipientName}
                </div>
                <div>
                  <strong>Return Date:</strong> {new Date(selectedReturn.returnDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Items Returned:</strong> {selectedReturn.itemsCount}
                </div>
                <div>
                  <strong>Returned By:</strong> {selectedReturn.returnerName}
                </div>
                <div>
                  <strong>Condition:</strong> 
                  <span className={`rgp-return-badge condition ${selectedReturn.condition}`} style={{marginLeft: '0.5rem'}}>
                    {selectedReturn.condition}
                  </span>
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`rgp-return-badge status ${selectedReturn.status}`} style={{marginLeft: '0.5rem'}}>
                    {selectedReturn.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="rgp-return-modal-actions">
              <button
                className="rgp-return-button outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="rgp-return-button primary"
                onClick={() => {
                  console.log('Processing return:', selectedReturn.id);
                  setShowModal(false);
                }}
              >
                Process Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RGPReturn;
