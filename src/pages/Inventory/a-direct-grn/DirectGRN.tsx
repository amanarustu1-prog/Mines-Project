import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.4 3M6 16l1.4-3m0 0l1.6 8m0 0h8m-8 0v-3m8 3v-3m0 0V9m0 8h-8" />
  </svg>
);

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

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

const Minus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
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

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function DirectGRN() {
  const [activeTab, setActiveTab] = useState('urgent-overview');
  const [directGRNData, setDirectGRNData] = useState({
    grnNumber: '',
    vendorName: '',
    vendorContact: '',
    receivedDate: '',
    urgencyLevel: 'High',
    reason: '',
    inspectedBy: '',
    warehouseLocation: '',
    totalAmount: 0,
    notes: ''
  });

  const [directItems, setDirectItems] = useState([{
    id: 1,
    itemName: '',
    description: '',
    quantity: 0,
    unit: 'Pieces',
    unitRate: 0,
    totalAmount: 0,
    condition: 'Good',
    urgencyReason: '',
    remarks: ''
  }]);

  // Sample Direct GRN Records
  const [directGRNRecords, setDirectGRNRecords] = useState([
    {
      id: 1,
      grnNumber: 'DGRN-2025-001',
      vendorName: 'Emergency Supplies Ltd.',
      receivedDate: '2025-08-10',
      urgencyLevel: 'Critical',
      reason: 'Equipment breakdown - immediate repair needed',
      status: 'Completed',
      inspectedBy: 'Rajesh Kumar',
      totalItems: 2,
      totalAmount: 45000,
      warehouseLocation: 'WH-EM1'
    },
    {
      id: 2,
      grnNumber: 'DGRN-2025-002',
      vendorName: 'Quick Parts Co.',
      receivedDate: '2025-08-09',
      urgencyLevel: 'High',
      reason: 'Production line stoppage',
      status: 'Pending Approval',
      inspectedBy: 'Priya Sharma',
      totalItems: 1,
      totalAmount: 12500,
      warehouseLocation: 'WH-A1'
    },
    {
      id: 3,
      grnNumber: 'DGRN-2025-003',
      vendorName: 'Safety Equipment Inc.',
      receivedDate: '2025-08-08',
      urgencyLevel: 'Medium',
      reason: 'Safety compliance requirement',
      status: 'In Progress',
      inspectedBy: 'Amit Singh',
      totalItems: 3,
      totalAmount: 28000,
      warehouseLocation: 'WH-SF1'
    }
  ]);

  const tabs = [
    {
      id: 'urgent-overview',
      label: 'Direct GRN Overview',
      icon: ShoppingCart,
    },
    {
      id: 'create-urgent',
      label: 'Create Direct GRN',
      icon: Zap,
    },
    {
      id: 'urgent-reports',
      label: 'Urgent Purchase Reports',
      icon: FileText,
    },
  ];

  const addItem = () => {
    const newItem = {
      id: directItems.length + 1,
      itemName: '',
      description: '',
      quantity: 0,
      unit: 'Pieces',
      unitRate: 0,
      totalAmount: 0,
      condition: 'Good',
      urgencyReason: '',
      remarks: ''
    };
    setDirectItems([...directItems, newItem]);
  };

  const removeItem = (id: number) => {
    if (directItems.length > 1) {
      setDirectItems(directItems.filter(item => item.id !== id));
    }
  };

  const updateItem = (id: number, field: string, value: any) => {
    setDirectItems(directItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'unitRate') {
          updatedItem.totalAmount = updatedItem.quantity * updatedItem.unitRate;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotalAmount = () => {
    return directItems.reduce((total, item) => total + item.totalAmount, 0);
  };

  const createDirectGRN = () => {
    if (!directGRNData.grnNumber || !directGRNData.vendorName || !directGRNData.receivedDate) {
      alert('Please fill all required fields');
      return;
    }

    const totalAmount = calculateTotalAmount();
    const newDirectGRN = {
      id: directGRNRecords.length + 1,
      ...directGRNData,
      totalItems: directItems.length,
      totalAmount: totalAmount,
      status: 'Completed'
    };

    setDirectGRNRecords(prev => [newDirectGRN, ...prev]);
    
    // Reset form
    setDirectGRNData({
      grnNumber: '',
      vendorName: '',
      vendorContact: '',
      receivedDate: '',
      urgencyLevel: 'High',
      reason: '',
      inspectedBy: '',
      warehouseLocation: '',
      totalAmount: 0,
      notes: ''
    });
    setDirectItems([{
      id: 1,
      itemName: '',
      description: '',
      quantity: 0,
      unit: 'Pieces',
      unitRate: 0,
      totalAmount: 0,
      condition: 'Good',
      urgencyReason: '',
      remarks: ''
    }]);
    setActiveTab('urgent-overview');
    
    alert('Direct GRN created successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'urgent-overview':
        return (
          <div className="direct-grn-space-y-4">
            {/* Summary Cards */}
            <div className="direct-grn-grid-4">
              <div className="direct-grn-card">
                <div className="direct-grn-card-content">
                  <div className="direct-grn-summary-card">
                    <div className="direct-grn-summary-content">
                      <div className="direct-grn-summary-icon urgent">
                        <Zap className="direct-grn-icon-sm" />
                      </div>
                      <div>
                        <p className="direct-grn-summary-text">Total Direct GRN</p>
                        <p className="direct-grn-summary-number urgent">{directGRNRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="direct-grn-card">
                <div className="direct-grn-card-content">
                  <div className="direct-grn-summary-card">
                    <div className="direct-grn-summary-content">
                      <div className="direct-grn-summary-icon completed">
                        <CheckCircle className="direct-grn-icon-sm" />
                      </div>
                      <div>
                        <p className="direct-grn-summary-text">Completed</p>
                        <p className="direct-grn-summary-number completed">
                          {directGRNRecords.filter(grn => grn.status === 'Completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="direct-grn-card">
                <div className="direct-grn-card-content">
                  <div className="direct-grn-summary-card">
                    <div className="direct-grn-summary-content">
                      <div className="direct-grn-summary-icon critical">
                        <AlertTriangle className="direct-grn-icon-sm" />
                      </div>
                      <div>
                        <p className="direct-grn-summary-text">Critical Orders</p>
                        <p className="direct-grn-summary-number critical">
                          {directGRNRecords.filter(grn => grn.urgencyLevel === 'Critical').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="direct-grn-card">
                <div className="direct-grn-card-content">
                  <div className="direct-grn-summary-card">
                    <div className="direct-grn-summary-content">
                      <div className="direct-grn-summary-icon amount">
                        <Truck className="direct-grn-icon-sm" />
                      </div>
                      <div>
                        <p className="direct-grn-summary-text">Total Value</p>
                        <p className="direct-grn-summary-number amount">
                          ₹{directGRNRecords.reduce((total, grn) => total + grn.totalAmount, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct GRN Records Table */}
            <div className="direct-grn-card">
              <div className="direct-grn-card-header">
                <h3 className="direct-grn-card-title">
                  <ShoppingCart className="direct-grn-icon-sm" />
                  Direct GRN Records - Urgent Purchases Without PO
                </h3>
              </div>
              <div className="direct-grn-card-content">
                <div className="direct-grn-table-container">
                  <table className="direct-grn-table">
                    <thead className="direct-grn-table-header">
                      <tr>
                        <th>GRN Number</th>
                        <th>Vendor</th>
                        <th>Date</th>
                        <th>Urgency</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th>Items</th>
                        <th>Inspector</th>
                      </tr>
                    </thead>
                    <tbody>
                      {directGRNRecords.map((grn) => (
                        <tr key={grn.id} className="direct-grn-table-row">
                          <td className="direct-grn-table-cell grn-no">{grn.grnNumber}</td>
                          <td className="direct-grn-table-cell name">{grn.vendorName}</td>
                          <td className="direct-grn-table-cell mono">{grn.receivedDate}</td>
                          <td className="direct-grn-table-cell">
                            <span className={`direct-grn-badge urgency ${grn.urgencyLevel.toLowerCase()}`}>
                              {grn.urgencyLevel}
                            </span>
                          </td>
                          <td className="direct-grn-table-cell truncate">{grn.reason}</td>
                          <td className="direct-grn-table-cell">
                            <span className={`direct-grn-badge status ${grn.status.toLowerCase().replace(' ', '')}`}>
                              {grn.status}
                            </span>
                          </td>
                          <td className="direct-grn-table-cell amount">₹{grn.totalAmount.toLocaleString()}</td>
                          <td className="direct-grn-table-cell center">{grn.totalItems}</td>
                          <td className="direct-grn-table-cell small">{grn.inspectedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-urgent':
        return (
          <div className="direct-grn-space-y-4">
            <div className="direct-grn-card">
              <div className="direct-grn-card-header">
                <h3 className="direct-grn-card-title">
                  <Zap className="direct-grn-icon-sm" />
                  Create Direct GRN - Urgent Purchase Without PO
                </h3>
              </div>
              <div className="direct-grn-card-content">
                {/* Basic Information */}
                <div className="direct-grn-form-section">
                  <h4>Basic Information</h4>
                  <div className="direct-grn-form-grid">
                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">GRN Number *</label>
                      <input
                        type="text"
                        className="direct-grn-form-input"
                        value={directGRNData.grnNumber}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, grnNumber: e.target.value }))}
                        placeholder="DGRN-2025-XXX"
                      />
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Vendor Name *</label>
                      <input
                        type="text"
                        className="direct-grn-form-input"
                        value={directGRNData.vendorName}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, vendorName: e.target.value }))}
                        placeholder="Enter vendor name"
                      />
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Vendor Contact</label>
                      <input
                        type="text"
                        className="direct-grn-form-input"
                        value={directGRNData.vendorContact}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, vendorContact: e.target.value }))}
                        placeholder="Contact number/email"
                      />
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Received Date *</label>
                      <input
                        type="date"
                        className="direct-grn-form-input"
                        value={directGRNData.receivedDate}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, receivedDate: e.target.value }))}
                      />
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Urgency Level *</label>
                      <select
                        className="direct-grn-form-select"
                        value={directGRNData.urgencyLevel}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, urgencyLevel: e.target.value }))}
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Warehouse Location</label>
                      <select
                        className="direct-grn-form-select"
                        value={directGRNData.warehouseLocation}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, warehouseLocation: e.target.value }))}
                      >
                        <option value="">Select Location</option>
                        <option value="WH-EM1">Emergency Warehouse</option>
                        <option value="WH-A1">Warehouse A1</option>
                        <option value="WH-B1">Warehouse B1</option>
                        <option value="WH-SF1">Safety Equipment Warehouse</option>
                      </select>
                    </div>

                    <div className="direct-grn-form-group">
                      <label className="direct-grn-form-label">Inspected By</label>
                      <input
                        type="text"
                        className="direct-grn-form-input"
                        value={directGRNData.inspectedBy}
                        onChange={(e) => setDirectGRNData(prev => ({ ...prev, inspectedBy: e.target.value }))}
                        placeholder="Inspector name"
                      />
                    </div>
                  </div>

                  <div className="direct-grn-form-group">
                    <label className="direct-grn-form-label">Urgency Reason *</label>
                    <textarea
                      className="direct-grn-form-textarea"
                      rows={3}
                      value={directGRNData.reason}
                      onChange={(e) => setDirectGRNData(prev => ({ ...prev, reason: e.target.value }))}
                      placeholder="Explain why this purchase was urgent and couldn't wait for PO process..."
                    ></textarea>
                  </div>
                </div>

                {/* Items Section */}
                <div className="direct-grn-form-section">
                  <div className="direct-grn-section-header">
                    <h4>Items Purchased</h4>
                    <button
                      type="button"
                      className="direct-grn-button success small"
                      onClick={addItem}
                    >
                      <Plus className="direct-grn-icon-sm" />
                      Add Item
                    </button>
                  </div>

                  <div className="direct-grn-items-container">
                    {directItems.map((item, index) => (
                      <div key={item.id} className="direct-grn-item-card">
                        <div className="direct-grn-item-header">
                          <h5>Item {index + 1}</h5>
                          {directItems.length > 1 && (
                            <button
                              type="button"
                              className="direct-grn-button danger small"
                              onClick={() => removeItem(item.id)}
                            >
                              <Minus className="direct-grn-icon-sm" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="direct-grn-item-grid">
                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Item Name *</label>
                            <input
                              type="text"
                              className="direct-grn-form-input"
                              value={item.itemName}
                              onChange={(e) => updateItem(item.id, 'itemName', e.target.value)}
                              placeholder="Enter item name"
                            />
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Description</label>
                            <input
                              type="text"
                              className="direct-grn-form-input"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              placeholder="Item specifications"
                            />
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Quantity *</label>
                            <input
                              type="number"
                              className="direct-grn-form-input"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                              min="0"
                            />
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Unit</label>
                            <select
                              className="direct-grn-form-select"
                              value={item.unit}
                              onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                            >
                              <option value="Pieces">Pieces</option>
                              <option value="Kg">Kg</option>
                              <option value="Liter">Liter</option>
                              <option value="Meter">Meter</option>
                              <option value="Box">Box</option>
                              <option value="Set">Set</option>
                            </select>
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Unit Rate *</label>
                            <input
                              type="number"
                              className="direct-grn-form-input"
                              value={item.unitRate}
                              onChange={(e) => updateItem(item.id, 'unitRate', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                            />
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Total Amount</label>
                            <input
                              type="number"
                              className="direct-grn-form-input readonly"
                              value={item.totalAmount}
                              readOnly
                            />
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Condition</label>
                            <select
                              className="direct-grn-form-select"
                              value={item.condition}
                              onChange={(e) => updateItem(item.id, 'condition', e.target.value)}
                            >
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Damaged">Damaged</option>
                              <option value="Defective">Defective</option>
                            </select>
                          </div>

                          <div className="direct-grn-form-group">
                            <label className="direct-grn-form-label">Urgency for this Item</label>
                            <input
                              type="text"
                              className="direct-grn-form-input"
                              value={item.urgencyReason}
                              onChange={(e) => updateItem(item.id, 'urgencyReason', e.target.value)}
                              placeholder="Why was this item urgently needed"
                            />
                          </div>

                          <div className="direct-grn-form-group full-width">
                            <label className="direct-grn-form-label">Remarks</label>
                            <input
                              type="text"
                              className="direct-grn-form-input"
                              value={item.remarks}
                              onChange={(e) => updateItem(item.id, 'remarks', e.target.value)}
                              placeholder="Additional remarks"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total Amount */}
                  <div className="direct-grn-total-section">
                    <div className="direct-grn-total-card">
                      <h4>Total Purchase Amount: ₹{calculateTotalAmount().toLocaleString()}</h4>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="direct-grn-form-section">
                  <div className="direct-grn-form-group">
                    <label className="direct-grn-form-label">Additional Notes</label>
                    <textarea
                      className="direct-grn-form-textarea"
                      rows={4}
                      value={directGRNData.notes}
                      onChange={(e) => setDirectGRNData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Any additional notes or justifications..."
                    ></textarea>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="direct-grn-form-actions">
                  <button
                    type="button"
                    className="direct-grn-button primary"
                    onClick={createDirectGRN}
                  >
                    Create Direct GRN
                  </button>
                  <button
                    type="button"
                    className="direct-grn-button outline"
                    onClick={() => {
                      setDirectGRNData({
                        grnNumber: '',
                        vendorName: '',
                        vendorContact: '',
                        receivedDate: '',
                        urgencyLevel: 'High',
                        reason: '',
                        inspectedBy: '',
                        warehouseLocation: '',
                        totalAmount: 0,
                        notes: ''
                      });
                      setDirectItems([{
                        id: 1,
                        itemName: '',
                        description: '',
                        quantity: 0,
                        unit: 'Pieces',
                        unitRate: 0,
                        totalAmount: 0,
                        condition: 'Good',
                        urgencyReason: '',
                        remarks: ''
                      }]);
                    }}
                  >
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'urgent-reports':
        return (
          <div className="direct-grn-space-y-4">
            <div className="direct-grn-card">
              <div className="direct-grn-card-header">
                <h3 className="direct-grn-card-title">
                  <FileText className="direct-grn-icon-sm" />
                  Urgent Purchase Reports & Analytics
                </h3>
              </div>
              <div className="direct-grn-card-content direct-grn-space-y-4">
                <div className="direct-grn-reports-grid">
                  <div className="direct-grn-report-card">
                    <Zap className="direct-grn-report-icon red" />
                    <h3 className="direct-grn-report-title">Urgent Purchase Summary</h3>
                    <p className="direct-grn-report-description">Comprehensive analysis of all urgent purchases without PO</p>
                    <button className="direct-grn-button outline small">
                      <Download className="direct-grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="direct-grn-report-card">
                    <AlertTriangle className="direct-grn-report-icon orange" />
                    <h3 className="direct-grn-report-title">Urgency Analysis</h3>
                    <p className="direct-grn-report-description">Analysis of urgency patterns and cost implications</p>
                    <button className="direct-grn-button outline small">
                      <Download className="direct-grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="direct-grn-report-card">
                    <Clock className="direct-grn-report-icon blue" />
                    <h3 className="direct-grn-report-title">Processing Time</h3>
                    <p className="direct-grn-report-description">Time analysis for urgent purchase processing</p>
                    <button className="direct-grn-button outline small">
                      <Download className="direct-grn-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="direct-grn-report-card">
                    <Truck className="direct-grn-report-icon green" />
                    <h3 className="direct-grn-report-title">Cost Analysis</h3>
                    <p className="direct-grn-report-description">Cost comparison and budget impact analysis</p>
                    <button className="direct-grn-button outline small">
                      <Download className="direct-grn-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="direct-grn-stats-section">
                  <h4>Urgent Purchase Statistics</h4>
                  <div className="direct-grn-stats-grid">
                    <div className="direct-grn-stat-item">
                      <span className="direct-grn-stat-label">This Month:</span>
                      <span className="direct-grn-stat-value">{directGRNRecords.length} Direct GRNs</span>
                    </div>
                    <div className="direct-grn-stat-item">
                      <span className="direct-grn-stat-label">Critical Purchases:</span>
                      <span className="direct-grn-stat-value">{directGRNRecords.filter(grn => grn.urgencyLevel === 'Critical').length}</span>
                    </div>
                    <div className="direct-grn-stat-item">
                      <span className="direct-grn-stat-label">Average Amount:</span>
                      <span className="direct-grn-stat-value">₹{Math.round(directGRNRecords.reduce((total, grn) => total + grn.totalAmount, 0) / directGRNRecords.length).toLocaleString()}</span>
                    </div>
                    <div className="direct-grn-stat-item">
                      <span className="direct-grn-stat-label">Total Urgent Spend:</span>
                      <span className="direct-grn-stat-value">₹{directGRNRecords.reduce((total, grn) => total + grn.totalAmount, 0).toLocaleString()}</span>
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
    <div className="direct-grn-management-container">
      {/* Header */}
      <header className="direct-grn-header">
        <div className="direct-grn-header-content">
          <div className="direct-grn-header-info">
            <div className="direct-grn-header-icon">
              <Zap className="direct-grn-icon-sm" />
            </div>
            <div>
              <h1 className="direct-grn-header-title">A DIRECT GRN</h1>
              <p className="direct-grn-header-subtitle">without PO - for urgent purchases</p>
            </div>
          </div>
        </div>
      </header>

      <div className="direct-grn-main-container">
        
        {/* Tab Navigation */}
        <div className="direct-grn-tab-navigation">
          <nav className="direct-grn-tab-nav">
            <div className="direct-grn-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`direct-grn-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="direct-grn-icon-sm" />
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
