import React, { useState, useRef } from 'react';
import './styles.css';

const InEntryAgainstNRGP: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'reports'>('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  // Form state for new entry against NRGP
  const [formData, setFormData] = useState({
    entryNo: '',
    nrgpReferenceNo: '',
    entryDate: '',
    supplierName: '',
    supplierContact: '',
    vehicleNo: '',
    driverName: '',
    driverLicense: '',
    securityClearance: false,
    qualityInspection: false,
    inspectorName: '',
    warehouseLocation: '',
    receivedBy: '',
    handoverTime: '',
    remarks: '',
    attachments: [] as File[]
  });

  // Items being received against NRGP
  const [entryItems, setEntryItems] = useState([
    {
      id: 1,
      nrgpItemId: '',
      itemCode: '',
      itemName: '',
      expectedQuantity: 0,
      receivedQuantity: 0,
      unit: '',
      conditionOnReceiving: 'good',
      qualityGrade: 'a',
      batchNumber: '',
      serialNumbers: '',
      warehouseBin: '',
      expiryDate: '',
      remarks: ''
    }
  ]);

  // File input ref for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for display
  const entrySummary = {
    total: 98,
    pending: 21,
    completed: 65,
    rejected: 12
  };

  const recentEntries = [
    {
      id: 'IN-NRGP-2024-001',
      nrgpReferenceNo: 'NRGP-2024-001',
      supplierName: 'ABC Raw Materials Ltd',
      entryDate: '2024-01-20',
      vehicleNo: 'MH-12-AB-3456',
      status: 'completed',
      itemsCount: 8,
      totalValue: 125000.00,
      warehouseLocation: 'Warehouse-A',
      receivedBy: 'John Doe'
    },
    {
      id: 'IN-NRGP-2024-002',
      nrgpReferenceNo: 'NRGP-2024-004',
      supplierName: 'XYZ Equipment Co.',
      entryDate: '2024-01-19',
      vehicleNo: 'GJ-05-CD-7890',
      status: 'pending',
      itemsCount: 5,
      totalValue: 75000.00,
      warehouseLocation: 'Warehouse-B',
      receivedBy: 'Mike Smith'
    },
    {
      id: 'IN-NRGP-2024-003',
      nrgpReferenceNo: 'NRGP-2024-003',
      supplierName: 'Quality Tools Pvt Ltd',
      entryDate: '2024-01-18',
      vehicleNo: 'KA-09-EF-1234',
      status: 'completed',
      itemsCount: 12,
      totalValue: 45000.00,
      warehouseLocation: 'Tool Storage',
      receivedBy: 'Sarah Wilson'
    },
    {
      id: 'IN-NRGP-2024-004',
      nrgpReferenceNo: 'NRGP-2024-007',
      supplierName: 'Office Supplies Inc',
      entryDate: '2024-01-17',
      vehicleNo: 'TN-33-GH-5678',
      status: 'rejected',
      itemsCount: 6,
      totalValue: 18000.00,
      warehouseLocation: 'Admin Store',
      receivedBy: 'David Brown'
    }
  ];

  // Outstanding NRGPs awaiting entries
  const outstandingNRGPs = [
    { nrgpNo: 'NRGP-2024-008', supplier: 'Steel Corp Ltd', expectedDate: '2024-01-22', value: 185000.00 },
    { nrgpNo: 'NRGP-2024-009', supplier: 'Chemical Supplies', expectedDate: '2024-01-23', value: 95000.00 },
    { nrgpNo: 'NRGP-2024-010', supplier: 'Mining Equipment Co', expectedDate: '2024-01-24', value: 325000.00 },
    { nrgpNo: 'NRGP-2024-011', supplier: 'Safety Gear Ltd', expectedDate: '2024-01-25', value: 67000.00 }
  ];

  // Quality metrics
  const qualityMetrics = [
    { label: 'Acceptance Rate', value: '92%', trend: 'up' },
    { label: 'Quality Grade A', value: '78%', trend: 'up' },
    { label: 'On-time Delivery', value: '85%', trend: 'down' },
    { label: 'Documentation Score', value: '88%', trend: 'up' }
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
    const updatedItems = [...entryItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setEntryItems(updatedItems);
  };

  // Add new item
  const addItem = () => {
    setEntryItems([...entryItems, {
      id: entryItems.length + 1,
      nrgpItemId: '',
      itemCode: '',
      itemName: '',
      expectedQuantity: 0,
      receivedQuantity: 0,
      unit: '',
      conditionOnReceiving: 'good',
      qualityGrade: 'a',
      batchNumber: '',
      serialNumbers: '',
      warehouseBin: '',
      expiryDate: '',
      remarks: ''
    }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (entryItems.length > 1) {
      const updatedItems = entryItems.filter((_, i) => i !== index);
      setEntryItems(updatedItems);
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

  // Submit entry
  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Entry action:', action, formData, entryItems);
    alert(`Entry against NRGP ${action === 'save' ? 'saved as draft' : 'submitted for processing'} successfully!`);
    
    // Reset form
    setFormData({
      entryNo: '',
      nrgpReferenceNo: '',
      entryDate: '',
      supplierName: '',
      supplierContact: '',
      vehicleNo: '',
      driverName: '',
      driverLicense: '',
      securityClearance: false,
      qualityInspection: false,
      inspectorName: '',
      warehouseLocation: '',
      receivedBy: '',
      handoverTime: '',
      remarks: '',
      attachments: []
    });
    
    setEntryItems([{
      id: 1,
      nrgpItemId: '',
      itemCode: '',
      itemName: '',
      expectedQuantity: 0,
      receivedQuantity: 0,
      unit: '',
      conditionOnReceiving: 'good',
      qualityGrade: 'a',
      batchNumber: '',
      serialNumbers: '',
      warehouseBin: '',
      expiryDate: '',
      remarks: ''
    }]);
  };

  // View entry details
  const viewEntryDetails = (entryData: any) => {
    setSelectedEntry(entryData);
    setShowModal(true);
  };

  const renderOverviewTab = () => (
    <div className="in-entry-nrgp-tab-content">
      <div className="in-entry-nrgp-space-y-4">
        {/* Summary Cards */}
        <div className="in-entry-nrgp-grid-4">
          <div className="in-entry-nrgp-card in-entry-nrgp-summary-card">
            <div className="in-entry-nrgp-summary-content">
              <div className="in-entry-nrgp-summary-icon total">
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <div>
                <p className="in-entry-nrgp-summary-text">Total Entries</p>
                <p className="in-entry-nrgp-summary-number total">{entrySummary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="in-entry-nrgp-card in-entry-nrgp-summary-card">
            <div className="in-entry-nrgp-summary-content">
              <div className="in-entry-nrgp-summary-icon pending">
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <p className="in-entry-nrgp-summary-text">Pending Processing</p>
                <p className="in-entry-nrgp-summary-number pending">{entrySummary.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="in-entry-nrgp-card in-entry-nrgp-summary-card">
            <div className="in-entry-nrgp-summary-content">
              <div className="in-entry-nrgp-summary-icon completed">
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="in-entry-nrgp-summary-text">Completed</p>
                <p className="in-entry-nrgp-summary-number completed">{entrySummary.completed}</p>
              </div>
            </div>
          </div>
          
          <div className="in-entry-nrgp-card in-entry-nrgp-summary-card">
            <div className="in-entry-nrgp-summary-content">
              <div className="in-entry-nrgp-summary-icon rejected">
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="in-entry-nrgp-summary-text">Rejected</p>
                <p className="in-entry-nrgp-summary-number rejected">{entrySummary.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="in-entry-nrgp-card">
          <div className="in-entry-nrgp-card-header">
            <h3 className="in-entry-nrgp-card-title">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              Recent Entries Against NRGP
            </h3>
          </div>
          <div className="in-entry-nrgp-tab-content">
            <div className="in-entry-nrgp-table-container">
              <table className="in-entry-nrgp-table">
                <thead className="in-entry-nrgp-table-header">
                  <tr>
                    <th>Entry No.</th>
                    <th>NRGP Reference</th>
                    <th>Supplier</th>
                    <th>Entry Date</th>
                    <th>Vehicle No.</th>
                    <th>Items</th>
                    <th>Value</th>
                    <th>Warehouse</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEntries.map((entry) => (
                    <tr key={entry.id} className="in-entry-nrgp-table-row">
                      <td className="in-entry-nrgp-table-cell entry-no">{entry.id}</td>
                      <td className="in-entry-nrgp-table-cell nrgp-ref">{entry.nrgpReferenceNo}</td>
                      <td className="in-entry-nrgp-table-cell supplier-name">{entry.supplierName}</td>
                      <td className="in-entry-nrgp-table-cell">{new Date(entry.entryDate).toLocaleDateString()}</td>
                      <td className="in-entry-nrgp-table-cell vehicle">{entry.vehicleNo}</td>
                      <td className="in-entry-nrgp-table-cell center">{entry.itemsCount}</td>
                      <td className="in-entry-nrgp-table-cell center">₹{entry.totalValue.toLocaleString()}</td>
                      <td className="in-entry-nrgp-table-cell warehouse">{entry.warehouseLocation}</td>
                      <td className="in-entry-nrgp-table-cell center">
                        <span className={`in-entry-nrgp-badge status ${entry.status}`}>
                          {entry.status}
                        </span>
                      </td>
                      <td className="in-entry-nrgp-table-cell">
                        <button
                          className="in-entry-nrgp-button outline small"
                          onClick={() => viewEntryDetails(entry)}
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

        {/* Outstanding NRGPs */}
        <div className="in-entry-nrgp-card">
          <div className="in-entry-nrgp-card-header">
            <h3 className="in-entry-nrgp-card-title">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
              Outstanding NRGPs Awaiting Entry
            </h3>
          </div>
          <div className="in-entry-nrgp-tab-content">
            <div className="in-entry-nrgp-stats-grid">
              {outstandingNRGPs.map((nrgp, index) => (
                <div key={index} className="in-entry-nrgp-stat-item outstanding">
                  <div>
                    <div className="in-entry-nrgp-stat-label">{nrgp.nrgpNo}</div>
                    <div className="in-entry-nrgp-stat-value">{nrgp.supplier}</div>
                    <div className="in-entry-nrgp-stat-label">
                      Expected: {new Date(nrgp.expectedDate).toLocaleDateString()} • ₹{nrgp.value.toLocaleString()}
                    </div>
                  </div>
                  <button className="in-entry-nrgp-button primary small">
                    Create Entry
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
        <div className="in-entry-nrgp-card">
          <div className="in-entry-nrgp-card-header">
            <h3 className="in-entry-nrgp-card-title">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              Quality Metrics
            </h3>
          </div>
          <div className="in-entry-nrgp-tab-content">
            <div className="in-entry-nrgp-stats-grid">
              {qualityMetrics.map((metric, index) => (
                <div key={index} className="in-entry-nrgp-stat-item">
                  <div>
                    <div className="in-entry-nrgp-stat-label">{metric.label}</div>
                    <div className="in-entry-nrgp-stat-value">{metric.value}</div>
                  </div>
                  <div className={`in-entry-nrgp-trend ${metric.trend}`}>
                    {metric.trend === 'up' ? (
                      <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L10 4.414 4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
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
    <div className="in-entry-nrgp-tab-content">
      <div className="in-entry-nrgp-space-y-4">
        {/* Entry Information Section */}
        <div className="in-entry-nrgp-form-section">
          <h4>Entry Information</h4>
          <div className="in-entry-nrgp-form-grid">
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Entry Number</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input readonly"
                value={formData.entryNo}
                placeholder="Auto-generated"
                readOnly
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">NRGP Reference Number</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.nrgpReferenceNo}
                onChange={(e) => handleFormChange('nrgpReferenceNo', e.target.value)}
                placeholder="Enter NRGP reference number"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Entry Date</label>
              <input
                type="date"
                className="in-entry-nrgp-form-input"
                value={formData.entryDate}
                onChange={(e) => handleFormChange('entryDate', e.target.value)}
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Handover Time</label>
              <input
                type="time"
                className="in-entry-nrgp-form-input"
                value={formData.handoverTime}
                onChange={(e) => handleFormChange('handoverTime', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Supplier and Transport Information Section */}
        <div className="in-entry-nrgp-form-section">
          <h4>Supplier and Transport Information</h4>
          <div className="in-entry-nrgp-form-grid">
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Supplier Name</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.supplierName}
                onChange={(e) => handleFormChange('supplierName', e.target.value)}
                placeholder="Enter supplier name"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Supplier Contact</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.supplierContact}
                onChange={(e) => handleFormChange('supplierContact', e.target.value)}
                placeholder="Contact person/number"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Vehicle Number</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.vehicleNo}
                onChange={(e) => handleFormChange('vehicleNo', e.target.value)}
                placeholder="e.g., MH-12-AB-1234"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Driver Name</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.driverName}
                onChange={(e) => handleFormChange('driverName', e.target.value)}
                placeholder="Enter driver name"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Driver License No.</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.driverLicense}
                onChange={(e) => handleFormChange('driverLicense', e.target.value)}
                placeholder="Enter license number"
              />
            </div>
          </div>
        </div>

        {/* Warehouse and Reception Information Section */}
        <div className="in-entry-nrgp-form-section">
          <h4>Warehouse and Reception Information</h4>
          <div className="in-entry-nrgp-form-grid">
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Warehouse Location</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.warehouseLocation}
                onChange={(e) => handleFormChange('warehouseLocation', e.target.value)}
                placeholder="Enter warehouse location"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Received By</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.receivedBy}
                onChange={(e) => handleFormChange('receivedBy', e.target.value)}
                placeholder="Enter receiver name"
              />
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-form-label">Quality Inspector</label>
              <input
                type="text"
                className="in-entry-nrgp-form-input"
                value={formData.inspectorName}
                onChange={(e) => handleFormChange('inspectorName', e.target.value)}
                placeholder="Enter inspector name (if applicable)"
              />
            </div>
          </div>
          
          <div className="in-entry-nrgp-form-grid">
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-checkbox-label">
                <input
                  type="checkbox"
                  className="in-entry-nrgp-checkbox"
                  checked={formData.securityClearance}
                  onChange={(e) => handleFormChange('securityClearance', e.target.checked)}
                />
                Security Clearance Verified
              </label>
            </div>
            
            <div className="in-entry-nrgp-form-group">
              <label className="in-entry-nrgp-checkbox-label">
                <input
                  type="checkbox"
                  className="in-entry-nrgp-checkbox"
                  checked={formData.qualityInspection}
                  onChange={(e) => handleFormChange('qualityInspection', e.target.checked)}
                />
                Quality Inspection Completed
              </label>
            </div>
          </div>
        </div>

        {/* Received Items Section */}
        <div className="in-entry-nrgp-form-section">
          <div className="in-entry-nrgp-section-header">
            <h4>Items Received Against NRGP</h4>
            <button
              type="button"
              className="in-entry-nrgp-button primary small"
              onClick={addItem}
            >
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Item
            </button>
          </div>
          
          <div className="in-entry-nrgp-items-container">
            {entryItems.map((item, index) => (
              <div key={item.id} className="in-entry-nrgp-item-card">
                <div className="in-entry-nrgp-item-header">
                  <h5>Item {index + 1}</h5>
                  {entryItems.length > 1 && (
                    <button
                      type="button"
                      className="in-entry-nrgp-button danger small"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="in-entry-nrgp-item-grid">
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">NRGP Item ID</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.nrgpItemId}
                      onChange={(e) => handleItemChange(index, 'nrgpItemId', e.target.value)}
                      placeholder="Enter NRGP item ID"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Item Code</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Enter item code"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Item Name</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Expected Quantity</label>
                    <input
                      type="number"
                      className="in-entry-nrgp-form-input readonly"
                      value={item.expectedQuantity}
                      onChange={(e) => handleItemChange(index, 'expectedQuantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                      readOnly
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Received Quantity</label>
                    <input
                      type="number"
                      className="in-entry-nrgp-form-input"
                      value={item.receivedQuantity}
                      onChange={(e) => handleItemChange(index, 'receivedQuantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Unit</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      placeholder="e.g., pieces, kg, liters"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Condition on Receiving</label>
                    <select
                      className="in-entry-nrgp-form-select"
                      value={item.conditionOnReceiving}
                      onChange={(e) => handleItemChange(index, 'conditionOnReceiving', e.target.value)}
                    >
                      <option value="excellent">Excellent</option>
                      <option value="good">Good</option>
                      <option value="fair">Fair</option>
                      <option value="poor">Poor</option>
                      <option value="damaged">Damaged</option>
                    </select>
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Quality Grade</label>
                    <select
                      className="in-entry-nrgp-form-select"
                      value={item.qualityGrade}
                      onChange={(e) => handleItemChange(index, 'qualityGrade', e.target.value)}
                    >
                      <option value="a">Grade A</option>
                      <option value="b">Grade B</option>
                      <option value="c">Grade C</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Batch Number</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.batchNumber}
                      onChange={(e) => handleItemChange(index, 'batchNumber', e.target.value)}
                      placeholder="Enter batch number (if applicable)"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Serial Numbers</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.serialNumbers}
                      onChange={(e) => handleItemChange(index, 'serialNumbers', e.target.value)}
                      placeholder="Enter serial numbers (comma-separated)"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Warehouse Bin</label>
                    <input
                      type="text"
                      className="in-entry-nrgp-form-input"
                      value={item.warehouseBin}
                      onChange={(e) => handleItemChange(index, 'warehouseBin', e.target.value)}
                      placeholder="Enter storage bin location"
                    />
                  </div>
                  
                  <div className="in-entry-nrgp-form-group">
                    <label className="in-entry-nrgp-form-label">Expiry Date (if applicable)</label>
                    <input
                      type="date"
                      className="in-entry-nrgp-form-input"
                      value={item.expiryDate}
                      onChange={(e) => handleItemChange(index, 'expiryDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="in-entry-nrgp-form-group full-width">
                  <label className="in-entry-nrgp-form-label">Item Remarks</label>
                  <textarea
                    className="in-entry-nrgp-form-textarea"
                    value={item.remarks}
                    onChange={(e) => handleItemChange(index, 'remarks', e.target.value)}
                    placeholder="Any remarks about the item condition, quality issues, etc."
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* General Remarks Section */}
        <div className="in-entry-nrgp-form-section">
          <h4>Additional Information</h4>
          <div className="in-entry-nrgp-form-group full-width">
            <label className="in-entry-nrgp-form-label">Entry Remarks</label>
            <textarea
              className="in-entry-nrgp-form-textarea"
              value={formData.remarks}
              onChange={(e) => handleFormChange('remarks', e.target.value)}
              placeholder="Any general remarks about the entry process, issues encountered, etc."
              rows={4}
            />
          </div>
        </div>

        {/* Attachments Section */}
        <div className="in-entry-nrgp-form-section">
          <h4>Supporting Documents</h4>
          <div className="in-entry-nrgp-form-group">
            <label className="in-entry-nrgp-form-label">Upload Documents/Photos</label>
            <input
              type="file"
              ref={fileInputRef}
              className="in-entry-nrgp-form-input"
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
                      className="in-entry-nrgp-button danger small"
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
        <div className="in-entry-nrgp-form-actions">
          <button
            type="button"
            className="in-entry-nrgp-button outline"
            onClick={() => {
              setFormData({
                entryNo: '',
                nrgpReferenceNo: '',
                entryDate: '',
                supplierName: '',
                supplierContact: '',
                vehicleNo: '',
                driverName: '',
                driverLicense: '',
                securityClearance: false,
                qualityInspection: false,
                inspectorName: '',
                warehouseLocation: '',
                receivedBy: '',
                handoverTime: '',
                remarks: '',
                attachments: []
              });
              setEntryItems([{
                id: 1,
                nrgpItemId: '',
                itemCode: '',
                itemName: '',
                expectedQuantity: 0,
                receivedQuantity: 0,
                unit: '',
                conditionOnReceiving: 'good',
                qualityGrade: 'a',
                batchNumber: '',
                serialNumbers: '',
                warehouseBin: '',
                expiryDate: '',
                remarks: ''
              }]);
            }}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="in-entry-nrgp-button outline"
            onClick={() => handleSubmit('save')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="in-entry-nrgp-button primary"
            onClick={() => handleSubmit('submit')}
          >
            Submit Entry
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="in-entry-nrgp-tab-content">
      <div className="in-entry-nrgp-space-y-4">
        {/* Report Options */}
        <div className="in-entry-nrgp-reports-grid">
          <div className="in-entry-nrgp-report-card">
            <div className="in-entry-nrgp-report-icon teal">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <h3 className="in-entry-nrgp-report-title">Entry Summary Report</h3>
            <p className="in-entry-nrgp-report-description">
              Comprehensive summary of all entries against NRGPs with detailed analytics
            </p>
            <button className="in-entry-nrgp-button primary">
              Generate Report
            </button>
          </div>

          <div className="in-entry-nrgp-report-card">
            <div className="in-entry-nrgp-report-icon orange">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="in-entry-nrgp-report-title">Quality Assessment Report</h3>
            <p className="in-entry-nrgp-report-description">
              Quality grades, inspection results, and condition analysis
            </p>
            <button className="in-entry-nrgp-button primary">
              Generate Report
            </button>
          </div>

          <div className="in-entry-nrgp-report-card">
            <div className="in-entry-nrgp-report-icon blue">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 className="in-entry-nrgp-report-title">Supplier Performance Report</h3>
            <p className="in-entry-nrgp-report-description">
              Supplier delivery performance and quality metrics analysis
            </p>
            <button className="in-entry-nrgp-button primary">
              Generate Report
            </button>
          </div>

          <div className="in-entry-nrgp-report-card">
            <div className="in-entry-nrgp-report-icon green">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="in-entry-nrgp-report-title">Warehouse Utilization Report</h3>
            <p className="in-entry-nrgp-report-description">
              Warehouse space utilization and inventory distribution analysis
            </p>
            <button className="in-entry-nrgp-button primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="in-entry-nrgp-card">
          <div className="in-entry-nrgp-card-header">
            <h3 className="in-entry-nrgp-card-title">
              <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              Entry Analytics
            </h3>
          </div>
          <div className="in-entry-nrgp-stats-section">
            <div className="in-entry-nrgp-stats-grid">
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">This Month Entries</span>
                <span className="in-entry-nrgp-stat-value">52</span>
              </div>
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">Processing Rate</span>
                <span className="in-entry-nrgp-stat-value">91%</span>
              </div>
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">Total Value Received</span>
                <span className="in-entry-nrgp-stat-value">₹45.2L</span>
              </div>
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">Avg Processing Time</span>
                <span className="in-entry-nrgp-stat-value">1.8 hours</span>
              </div>
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">Quality Rejection Rate</span>
                <span className="in-entry-nrgp-stat-value">4%</span>
              </div>
              <div className="in-entry-nrgp-stat-item">
                <span className="in-entry-nrgp-stat-label">Active Suppliers</span>
                <span className="in-entry-nrgp-stat-value">26</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="in-entry-nrgp-container">
      {/* Header */}
      <div className="in-entry-nrgp-header">
        <div className="in-entry-nrgp-header-content">
          <div className="in-entry-nrgp-header-info">
            <div className="in-entry-nrgp-header-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="in-entry-nrgp-icon">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="in-entry-nrgp-header-title">In-Entry Against NRGP</h1>
              <p className="in-entry-nrgp-header-subtitle">Process incoming materials and goods against non-returnable gate passes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="in-entry-nrgp-main-container">
        {/* Tab Navigation */}
        <div className="in-entry-nrgp-tab-navigation">
          <div className="in-entry-nrgp-tab-nav">
            <div className="in-entry-nrgp-tab-list">
              <button
                className={`in-entry-nrgp-tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Entry Overview
              </button>
              
              <button
                className={`in-entry-nrgp-tab-button ${activeTab === 'create' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('create')}
              >
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Create Entry
              </button>
              
              <button
                className={`in-entry-nrgp-tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="in-entry-nrgp-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Entry Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>

      {/* Entry Details Modal */}
      {showModal && selectedEntry && (
        <div className="in-entry-nrgp-modal-overlay">
          <div className="in-entry-nrgp-modal">
            <div className="in-entry-nrgp-modal-header">
              <h3>Entry Details - {selectedEntry.id}</h3>
            </div>
            <div className="in-entry-nrgp-modal-content">
              <div className="in-entry-nrgp-space-y-4">
                <div>
                  <strong>NRGP Reference:</strong> {selectedEntry.nrgpReferenceNo}
                </div>
                <div>
                  <strong>Supplier:</strong> {selectedEntry.supplierName}
                </div>
                <div>
                  <strong>Entry Date:</strong> {new Date(selectedEntry.entryDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Vehicle Number:</strong> {selectedEntry.vehicleNo}
                </div>
                <div>
                  <strong>Items Count:</strong> {selectedEntry.itemsCount}
                </div>
                <div>
                  <strong>Total Value:</strong> ₹{selectedEntry.totalValue.toLocaleString()}
                </div>
                <div>
                  <strong>Warehouse:</strong> {selectedEntry.warehouseLocation}
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`in-entry-nrgp-badge status ${selectedEntry.status}`} style={{marginLeft: '0.5rem'}}>
                    {selectedEntry.status}
                  </span>
                </div>
                <div>
                  <strong>Received By:</strong> {selectedEntry.receivedBy}
                </div>
              </div>
            </div>
            <div className="in-entry-nrgp-modal-actions">
              <button
                className="in-entry-nrgp-button outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="in-entry-nrgp-button primary"
                onClick={() => {
                  console.log('Processing entry:', selectedEntry.id);
                  setShowModal(false);
                }}
              >
                Process Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InEntryAgainstNRGP;
