import React, { useState } from 'react';
import './styles.css';

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

const TruckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export default function GRNAgainstPO() {
  const [activeTab, setActiveTab] = useState('grn-overview');
  const [selectedPO, setSelectedPO] = useState('');
  const [grnData, setGrnData] = useState({
    grnNumber: '',
    vendorName: '',
    poNumber: '',
    receivedDate: '',
    inspectedBy: '',
    warehouseLocation: '',
    notes: ''
  });
  const [receivedItems, setReceivedItems] = useState([]);
  const [showPOModal, setShowPOModal] = useState(false);

  // Sample purchase orders for selection
  const [availablePOs, setAvailablePOs] = useState([
    {
      id: 1,
      poNumber: 'PO-2025-001',
      vendorName: 'Tata Steel Ltd.',
      totalAmount: 850000,
      status: 'Approved',
      deliveryDate: '2025-08-20',
      items: [
        { name: 'Steel Rods 12mm', orderedQty: 100, unit: 'Pieces', rate: 2500, specifications: 'High grade steel rods' },
        { name: 'Steel Plates 10mm', orderedQty: 50, unit: 'Pieces', rate: 8000, specifications: 'Industrial grade plates' },
        { name: 'Welding Electrodes', orderedQty: 20, unit: 'Boxes', rate: 10000, specifications: 'E7018 electrodes' }
      ]
    },
    {
      id: 2,
      poNumber: 'PO-2025-002',
      vendorName: 'ContiTech India',
      totalAmount: 1250000,
      status: 'Approved',
      deliveryDate: '2025-08-25',
      items: [
        { name: 'Conveyor Belts', orderedQty: 5, unit: 'Pieces', rate: 180000, specifications: 'Heavy duty belts' },
        { name: 'Belt Fasteners', orderedQty: 100, unit: 'Sets', rate: 3500, specifications: 'Stainless steel fasteners' }
      ]
    }
  ]);

  // Sample GRN data
  const [grnRecords, setGrnRecords] = useState([
    {
      id: 1,
      grnNumber: 'GRN-2025-001',
      poNumber: 'PO-2025-001',
      vendorName: 'Tata Steel Ltd.',
      receivedDate: '2025-08-10',
      status: 'Completed',
      inspectedBy: 'Rajesh Kumar',
      totalItems: 3,
      warehouseLocation: 'WH-A1'
    },
    {
      id: 2,
      grnNumber: 'GRN-2025-002',
      poNumber: 'PO-2025-002',
      vendorName: 'ContiTech India',
      receivedDate: '2025-08-08',
      status: 'Pending Inspection',
      inspectedBy: 'Priya Sharma',
      totalItems: 2,
      warehouseLocation: 'WH-B2'
    }
  ]);

  const tabs = [
    {
      id: 'grn-overview',
      label: 'GRN Overview',
      icon: Package,
    },
    {
      id: 'create-grn',
      label: 'Create GRN',
      icon: Plus,
    },
    {
      id: 'grn-reports',
      label: 'GRN Reports',
      icon: FileText,
    },
  ];

  const handlePOSelection = (po) => {
    setSelectedPO(po.poNumber);
    setGrnData(prev => ({
      ...prev,
      poNumber: po.poNumber,
      vendorName: po.vendorName,
      grnNumber: `GRN-2025-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    }));
    
    // Initialize received items with PO items
    const itemsWithReceived = po.items.map(item => ({
      ...item,
      receivedQty: 0,
      acceptedQty: 0,
      rejectedQty: 0,
      damageQty: 0,
      remarks: ''
    }));
    setReceivedItems(itemsWithReceived);
    setShowPOModal(false);
  };

  const addGRNRecord = () => {
    if (!grnData.grnNumber || !grnData.poNumber || !grnData.receivedDate) {
      alert('Please fill all required fields');
      return;
    }

    const newGRN = {
      id: grnRecords.length + 1,
      ...grnData,
      status: 'Completed',
      totalItems: receivedItems.length
    };

    setGrnRecords(prev => [newGRN, ...prev]);
    
    // Reset form
    setGrnData({
      grnNumber: '',
      vendorName: '',
      poNumber: '',
      receivedDate: '',
      inspectedBy: '',
      warehouseLocation: '',
      notes: ''
    });
    setReceivedItems([]);
    setSelectedPO('');
    setActiveTab('grn-overview');
    
    alert('GRN created successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'grn-overview':
        return (
          <div className="grn-space-y-4">
            {/* Summary Cards */}
            <div className="grn-grid-4">
              <div className="grn-card">
                <div className="grn-card-content">
                  <div className="grn-summary-card">
                    <div className="grn-summary-content">
                      <div className="grn-summary-icon received">
                        <Package className="grn-icon-sm" />
                      </div>
                      <div>
                        <p className="grn-summary-text">Total GRN</p>
                        <p className="grn-summary-number received">{grnRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grn-card">
                <div className="grn-card-content">
                  <div className="grn-summary-card">
                    <div className="grn-summary-content">
                      <div className="grn-summary-icon completed">
                        <CheckCircle className="grn-icon-sm" />
                      </div>
                      <div>
                        <p className="grn-summary-text">Completed</p>
                        <p className="grn-summary-number completed">
                          {grnRecords.filter(grn => grn.status === 'Completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grn-card">
                <div className="grn-card-content">
                  <div className="grn-summary-card">
                    <div className="grn-summary-content">
                      <div className="grn-summary-icon pending">
                        <AlertCircle className="grn-icon-sm" />
                      </div>
                      <div>
                        <p className="grn-summary-text">Pending</p>
                        <p className="grn-summary-number pending">
                          {grnRecords.filter(grn => grn.status === 'Pending Inspection').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grn-card">
                <div className="grn-card-content">
                  <div className="grn-summary-card">
                    <div className="grn-summary-content">
                      <div className="grn-summary-icon warehouse">
                        <TruckIcon className="grn-icon-sm" />
                      </div>
                      <div>
                        <p className="grn-summary-text">Vendors</p>
                        <p className="grn-summary-number warehouse">
                          {new Set(grnRecords.map(grn => grn.vendorName)).size}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* GRN Records Table */}
            <div className="grn-card">
              <div className="grn-card-header">
                <h3 className="grn-card-title">
                  <Package className="grn-icon-sm" />
                  GRN Records - Warehouse Management
                </h3>
              </div>
              <div className="grn-card-content">
                <div className="grn-table-container">
                  <table className="grn-table">
                    <thead className="grn-table-header">
                      <tr>
                        <th>GRN Number</th>
                        <th>PO Number</th>
                        <th>Vendor</th>
                        <th>Received Date</th>
                        <th>Status</th>
                        <th>Inspected By</th>
                        <th>Items</th>
                        <th>Warehouse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {grnRecords.map((grn) => (
                        <tr key={grn.id} className="grn-table-row">
                          <td className="grn-table-cell grn-no">{grn.grnNumber}</td>
                          <td className="grn-table-cell po-no">{grn.poNumber}</td>
                          <td className="grn-table-cell name">{grn.vendorName}</td>
                          <td className="grn-table-cell mono">{grn.receivedDate}</td>
                          <td className="grn-table-cell">
                            <span className={`grn-badge ${grn.status.toLowerCase().replace(' ', '')}`}>
                              {grn.status}
                            </span>
                          </td>
                          <td className="grn-table-cell small">{grn.inspectedBy}</td>
                          <td className="grn-table-cell center">{grn.totalItems}</td>
                          <td className="grn-table-cell center">{grn.warehouseLocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-grn':
        return (
          <div className="grn-space-y-4">
            <div className="grn-card">
              <div className="grn-card-header">
                <h3 className="grn-card-title">
                  <Plus className="grn-icon-sm" />
                  Create New GRN Against Purchase Order
                </h3>
              </div>
              <div className="grn-card-content">
                {/* PO Selection */}
                <div className="grn-form-section">
                  <h4>Select Purchase Order</h4>
                  <div className="grn-form-grid">
                    <div className="grn-form-group">
                      <label className="grn-form-label">Purchase Order *</label>
                      <div className="grn-po-selector">
                        <input
                          type="text"
                          className="grn-form-input readonly"
                          value={selectedPO || 'Click to select PO'}
                          readOnly
                          onClick={() => setShowPOModal(true)}
                        />
                        <button
                          type="button"
                          className="grn-button outline"
                          onClick={() => setShowPOModal(true)}
                        >
                          <SearchIcon className="grn-icon-sm" />
                          Browse PO
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* GRN Details */}
                {selectedPO && (
                  <>
                    <div className="grn-form-section">
                      <h4>GRN Details</h4>
                      <div className="grn-form-grid">
                        <div className="grn-form-group">
                          <label className="grn-form-label">GRN Number *</label>
                          <input
                            type="text"
                            className="grn-form-input"
                            value={grnData.grnNumber}
                            onChange={(e) => setGrnData(prev => ({ ...prev, grnNumber: e.target.value }))}
                          />
                        </div>

                        <div className="grn-form-group">
                          <label className="grn-form-label">Vendor Name</label>
                          <input
                            type="text"
                            className="grn-form-input readonly"
                            value={grnData.vendorName}
                            readOnly
                          />
                        </div>

                        <div className="grn-form-group">
                          <label className="grn-form-label">Received Date *</label>
                          <input
                            type="date"
                            className="grn-form-input"
                            value={grnData.receivedDate}
                            onChange={(e) => setGrnData(prev => ({ ...prev, receivedDate: e.target.value }))}
                          />
                        </div>

                        <div className="grn-form-group">
                          <label className="grn-form-label">Inspected By</label>
                          <input
                            type="text"
                            className="grn-form-input"
                            value={grnData.inspectedBy}
                            onChange={(e) => setGrnData(prev => ({ ...prev, inspectedBy: e.target.value }))}
                            placeholder="Inspector name"
                          />
                        </div>

                        <div className="grn-form-group">
                          <label className="grn-form-label">Warehouse Location</label>
                          <select
                            className="grn-form-select"
                            value={grnData.warehouseLocation}
                            onChange={(e) => setGrnData(prev => ({ ...prev, warehouseLocation: e.target.value }))}
                          >
                            <option value="">Select Location</option>
                            <option value="WH-A1">Warehouse A1</option>
                            <option value="WH-A2">Warehouse A2</option>
                            <option value="WH-B1">Warehouse B1</option>
                            <option value="WH-B2">Warehouse B2</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Items Received */}
                    {receivedItems.length > 0 && (
                      <div className="grn-form-section">
                        <h4>Items Received</h4>
                        <div className="grn-items-table">
                          <table className="grn-table">
                            <thead className="grn-table-header">
                              <tr>
                                <th>Item Description</th>
                                <th>Ordered Qty</th>
                                <th>Received Qty</th>
                                <th>Accepted Qty</th>
                                <th>Rejected Qty</th>
                                <th>Damage Qty</th>
                                <th>Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              {receivedItems.map((item, index) => (
                                <tr key={index} className="grn-table-row">
                                  <td className="grn-table-cell">
                                    <div>
                                      <strong>{item.name}</strong>
                                      <div className="grn-item-specs">{item.specifications}</div>
                                    </div>
                                  </td>
                                  <td className="grn-table-cell center">{item.orderedQty} {item.unit}</td>
                                  <td className="grn-table-cell">
                                    <input
                                      type="number"
                                      className="grn-form-input small"
                                      value={item.receivedQty}
                                      onChange={(e) => {
                                        const newItems = [...receivedItems];
                                        newItems[index].receivedQty = parseInt(e.target.value) || 0;
                                        setReceivedItems(newItems);
                                      }}
                                    />
                                  </td>
                                  <td className="grn-table-cell">
                                    <input
                                      type="number"
                                      className="grn-form-input small"
                                      value={item.acceptedQty}
                                      onChange={(e) => {
                                        const newItems = [...receivedItems];
                                        newItems[index].acceptedQty = parseInt(e.target.value) || 0;
                                        setReceivedItems(newItems);
                                      }}
                                    />
                                  </td>
                                  <td className="grn-table-cell">
                                    <input
                                      type="number"
                                      className="grn-form-input small"
                                      value={item.rejectedQty}
                                      onChange={(e) => {
                                        const newItems = [...receivedItems];
                                        newItems[index].rejectedQty = parseInt(e.target.value) || 0;
                                        setReceivedItems(newItems);
                                      }}
                                    />
                                  </td>
                                  <td className="grn-table-cell">
                                    <input
                                      type="number"
                                      className="grn-form-input small"
                                      value={item.damageQty}
                                      onChange={(e) => {
                                        const newItems = [...receivedItems];
                                        newItems[index].damageQty = parseInt(e.target.value) || 0;
                                        setReceivedItems(newItems);
                                      }}
                                    />
                                  </td>
                                  <td className="grn-table-cell">
                                    <input
                                      type="text"
                                      className="grn-form-input small"
                                      value={item.remarks}
                                      onChange={(e) => {
                                        const newItems = [...receivedItems];
                                        newItems[index].remarks = e.target.value;
                                        setReceivedItems(newItems);
                                      }}
                                      placeholder="Add remarks"
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="grn-form-section">
                      <div className="grn-form-group">
                        <label className="grn-form-label">Notes</label>
                        <textarea
                          className="grn-form-textarea"
                          rows={4}
                          value={grnData.notes}
                          onChange={(e) => setGrnData(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Add any additional notes..."
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="grn-form-actions">
                      <button
                        type="button"
                        className="grn-button primary"
                        onClick={addGRNRecord}
                      >
                        Create GRN
                      </button>
                      <button
                        type="button"
                        className="grn-button outline"
                        onClick={() => {
                          setSelectedPO('');
                          setReceivedItems([]);
                          setGrnData({
                            grnNumber: '',
                            vendorName: '',
                            poNumber: '',
                            receivedDate: '',
                            inspectedBy: '',
                            warehouseLocation: '',
                            notes: ''
                          });
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 'grn-reports':
        return (
          <div className="grn-space-y-4">
            <div className="grn-card">
              <div className="grn-card-header">
                <h3 className="grn-card-title">
                  <FileText className="grn-icon-sm" />
                  GRN Reports & Analytics
                </h3>
              </div>
              <div className="grn-card-content grn-space-y-4">
                <div className="grn-reports-grid">
                  <div className="grn-report-card">
                    <Package className="grn-report-icon blue" />
                    <h3 className="grn-report-title">GRN Summary</h3>
                    <p className="grn-report-description">Comprehensive summary of all goods receipt notes</p>
                    <button className="grn-button outline small">
                      <Download className="grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="grn-report-card">
                    <TruckIcon className="grn-report-icon green" />
                    <h3 className="grn-report-title">Vendor Performance</h3>
                    <p className="grn-report-description">Analysis of vendor delivery and quality performance</p>
                    <button className="grn-button outline small">
                      <Download className="grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="grn-report-card">
                    <CheckCircle className="grn-report-icon purple" />
                    <h3 className="grn-report-title">Quality Metrics</h3>
                    <p className="grn-report-description">Quality analysis and rejection statistics</p>
                    <button className="grn-button outline small">
                      <Download className="grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="grn-report-card">
                    <CalendarIcon className="grn-report-icon orange" />
                    <h3 className="grn-report-title">Monthly Reports</h3>
                    <p className="grn-report-description">Monthly GRN processing and warehouse activity</p>
                    <button className="grn-button outline small">
                      <Download className="grn-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grn-stats-section">
                  <h4>Current Statistics</h4>
                  <div className="grn-stats-grid">
                    <div className="grn-stat-item">
                      <span className="grn-stat-label">This Month:</span>
                      <span className="grn-stat-value">{grnRecords.length} GRNs</span>
                    </div>
                    <div className="grn-stat-item">
                      <span className="grn-stat-label">Avg Processing Time:</span>
                      <span className="grn-stat-value">2.5 days</span>
                    </div>
                    <div className="grn-stat-item">
                      <span className="grn-stat-label">Quality Rate:</span>
                      <span className="grn-stat-value">95.2%</span>
                    </div>
                    <div className="grn-stat-item">
                      <span className="grn-stat-label">On-time Delivery:</span>
                      <span className="grn-stat-value">88.7%</span>
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
    <div className="grn-management-container">
      {/* Header */}
      <header className="grn-header">
        <div className="grn-header-content">
          <div className="grn-header-info">
            <div className="grn-header-icon">
              <Package className="grn-icon-sm" />
            </div>
            <div>
              <h1 className="grn-header-title">GOODS RECEIPT NOTE</h1>
              <p className="grn-header-subtitle">Sent to multiple vendors</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grn-main-container">
        
        {/* Tab Navigation */}
        <div className="grn-tab-navigation">
          <nav className="grn-tab-nav">
            <div className="grn-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`grn-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="grn-icon-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>

      {/* PO Selection Modal */}
      {showPOModal && (
        <div className="grn-modal-overlay">
          <div className="grn-modal-content">
            <h3 className="grn-modal-title">Select Purchase Order</h3>
            <div className="grn-po-list">
              {availablePOs.map((po) => (
                <div key={po.id} className="grn-po-item" onClick={() => handlePOSelection(po)}>
                  <div className="grn-po-info">
                    <h4>{po.poNumber}</h4>
                    <p>{po.vendorName}</p>
                    <div className="grn-po-details">
                      <span>Amount: ₹{po.totalAmount.toLocaleString()}</span>
                      <span>•</span>
                      <span>Due: {po.deliveryDate}</span>
                      <span>•</span>
                      <span>{po.items.length} items</span>
                    </div>
                  </div>
                  <span className={`grn-badge ${po.status.toLowerCase()}`}>
                    {po.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="grn-modal-buttons">
              <button
                className="grn-button outline"
                onClick={() => setShowPOModal(false)}
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
