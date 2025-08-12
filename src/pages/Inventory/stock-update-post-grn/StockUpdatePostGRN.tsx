import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const Package = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 4v6h6M23 20v-6h-6M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.35 4.35A9 9 0 0 1 3.51 15" />
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

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
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
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const Archive = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
  </svg>
);

export default function StockUpdatePostGRN() {
  const [activeTab, setActiveTab] = useState('stock-overview');
  const [stockUpdateData, setStockUpdateData] = useState({
    updateId: '',
    grnReference: '',
    updateDate: '',
    updatedBy: '',
    updateType: 'Post-GRN',
    warehouseLocation: '',
    notes: ''
  });

  const [stockItems, setStockItems] = useState([{
    id: 1,
    itemName: '',
    currentStock: 0,
    grnQuantity: 0,
    adjustmentQuantity: 0,
    newStock: 0,
    unitCost: 0,
    totalValue: 0,
    binLocation: '',
    batchNumber: '',
    expiryDate: '',
    remarks: '',
    updateAction: 'Add'
  }]);

  // Sample Stock Update Records
  const [stockUpdateRecords, setStockUpdateRecords] = useState([
    {
      id: 1,
      updateId: 'STK-2025-001',
      grnReference: 'GRN-2025-015',
      updateDate: '2025-08-10',
      updatedBy: 'Rajesh Kumar',
      updateType: 'Post-GRN',
      warehouseLocation: 'WH-A1',
      totalItems: 4,
      totalValue: 125000,
      status: 'Completed'
    },
    {
      id: 2,
      updateId: 'STK-2025-002',
      grnReference: 'DGRN-2025-002',
      updateDate: '2025-08-09',
      updatedBy: 'Priya Sharma',
      updateType: 'Post-GRN',
      warehouseLocation: 'WH-B1',
      totalItems: 2,
      totalValue: 45000,
      status: 'In Progress'
    },
    {
      id: 3,
      updateId: 'STK-2025-003',
      grnReference: 'INS-2025-001',
      updateDate: '2025-08-08',
      updatedBy: 'Amit Singh',
      updateType: 'Post-Inspection',
      warehouseLocation: 'WH-SF1',
      totalItems: 3,
      totalValue: 78000,
      status: 'Completed'
    }
  ]);

  const tabs = [
    {
      id: 'stock-overview',
      label: 'Stock Update Overview',
      icon: Package,
    },
    {
      id: 'create-stock-update',
      label: 'Create Stock Update',
      icon: RefreshCw,
    },
    {
      id: 'stock-reports',
      label: 'Stock Reports',
      icon: FileText,
    },
  ];

  const addStockItem = () => {
    const newItem = {
      id: stockItems.length + 1,
      itemName: '',
      currentStock: 0,
      grnQuantity: 0,
      adjustmentQuantity: 0,
      newStock: 0,
      unitCost: 0,
      totalValue: 0,
      binLocation: '',
      batchNumber: '',
      expiryDate: '',
      remarks: '',
      updateAction: 'Add'
    };
    setStockItems([...stockItems, newItem]);
  };

  const removeStockItem = (id: number) => {
    if (stockItems.length > 1) {
      setStockItems(stockItems.filter(item => item.id !== id));
    }
  };

  const updateStockItem = (id: number, field: string, value: any) => {
    setStockItems(stockItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-calculate new stock and total value
        if (field === 'currentStock' || field === 'grnQuantity' || field === 'adjustmentQuantity' || field === 'updateAction') {
          if (updatedItem.updateAction === 'Add') {
            updatedItem.newStock = updatedItem.currentStock + updatedItem.grnQuantity + updatedItem.adjustmentQuantity;
          } else if (updatedItem.updateAction === 'Subtract') {
            updatedItem.newStock = updatedItem.currentStock + updatedItem.grnQuantity - updatedItem.adjustmentQuantity;
          } else {
            updatedItem.newStock = updatedItem.currentStock + updatedItem.grnQuantity;
          }
        }
        
        if (field === 'newStock' || field === 'unitCost') {
          updatedItem.totalValue = updatedItem.newStock * updatedItem.unitCost;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const calculateTotalValue = () => {
    return stockItems.reduce((total, item) => total + item.totalValue, 0);
  };

  const createStockUpdate = () => {
    if (!stockUpdateData.updateId || !stockUpdateData.grnReference || !stockUpdateData.updatedBy) {
      alert('Please fill all required fields');
      return;
    }

    const totalValue = calculateTotalValue();
    const newStockUpdate = {
      id: stockUpdateRecords.length + 1,
      ...stockUpdateData,
      totalItems: stockItems.length,
      totalValue: totalValue,
      status: 'Completed'
    };

    setStockUpdateRecords(prev => [newStockUpdate, ...prev]);
    
    // Reset form
    setStockUpdateData({
      updateId: '',
      grnReference: '',
      updateDate: '',
      updatedBy: '',
      updateType: 'Post-GRN',
      warehouseLocation: '',
      notes: ''
    });
    setStockItems([{
      id: 1,
      itemName: '',
      currentStock: 0,
      grnQuantity: 0,
      adjustmentQuantity: 0,
      newStock: 0,
      unitCost: 0,
      totalValue: 0,
      binLocation: '',
      batchNumber: '',
      expiryDate: '',
      remarks: '',
      updateAction: 'Add'
    }]);
    setActiveTab('stock-overview');
    
    alert('Stock update created successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'stock-overview':
        return (
          <div className="stock-update-space-y-4">
            {/* Summary Cards */}
            <div className="stock-update-grid-4">
              <div className="stock-update-card">
                <div className="stock-update-card-content">
                  <div className="stock-update-summary-card">
                    <div className="stock-update-summary-content">
                      <div className="stock-update-summary-icon total">
                        <Package className="stock-update-icon-sm" />
                      </div>
                      <div>
                        <p className="stock-update-summary-text">Total Updates</p>
                        <p className="stock-update-summary-number total">{stockUpdateRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stock-update-card">
                <div className="stock-update-card-content">
                  <div className="stock-update-summary-card">
                    <div className="stock-update-summary-content">
                      <div className="stock-update-summary-icon completed">
                        <CheckCircle className="stock-update-icon-sm" />
                      </div>
                      <div>
                        <p className="stock-update-summary-text">Completed</p>
                        <p className="stock-update-summary-number completed">
                          {stockUpdateRecords.filter(record => record.status === 'Completed').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stock-update-card">
                <div className="stock-update-card-content">
                  <div className="stock-update-summary-card">
                    <div className="stock-update-summary-content">
                      <div className="stock-update-summary-icon pending">
                        <Clock className="stock-update-icon-sm" />
                      </div>
                      <div>
                        <p className="stock-update-summary-text">In Progress</p>
                        <p className="stock-update-summary-number pending">
                          {stockUpdateRecords.filter(record => record.status === 'In Progress').length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stock-update-card">
                <div className="stock-update-card-content">
                  <div className="stock-update-summary-card">
                    <div className="stock-update-summary-content">
                      <div className="stock-update-summary-icon value">
                        <Truck className="stock-update-icon-sm" />
                      </div>
                      <div>
                        <p className="stock-update-summary-text">Total Value</p>
                        <p className="stock-update-summary-number value">
                          ₹{stockUpdateRecords.reduce((total, record) => total + record.totalValue, 0).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock Update Records Table */}
            <div className="stock-update-card">
              <div className="stock-update-card-header">
                <h3 className="stock-update-card-title">
                  <Package className="stock-update-icon-sm" />
                  Stock Update Records - Post GRN Processing
                </h3>
              </div>
              <div className="stock-update-card-content">
                <div className="stock-update-table-container">
                  <table className="stock-update-table">
                    <thead className="stock-update-table-header">
                      <tr>
                        <th>Update ID</th>
                        <th>GRN Reference</th>
                        <th>Date</th>
                        <th>Updated By</th>
                        <th>Type</th>
                        <th>Location</th>
                        <th>Items</th>
                        <th>Total Value</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockUpdateRecords.map((record) => (
                        <tr key={record.id} className="stock-update-table-row">
                          <td className="stock-update-table-cell update-id">{record.updateId}</td>
                          <td className="stock-update-table-cell grn-ref">{record.grnReference}</td>
                          <td className="stock-update-table-cell mono">{record.updateDate}</td>
                          <td className="stock-update-table-cell name">{record.updatedBy}</td>
                          <td className="stock-update-table-cell">
                            <span className={`stock-update-badge type ${record.updateType.toLowerCase().replace('-', '')}`}>
                              {record.updateType}
                            </span>
                          </td>
                          <td className="stock-update-table-cell location">{record.warehouseLocation}</td>
                          <td className="stock-update-table-cell center">{record.totalItems}</td>
                          <td className="stock-update-table-cell value">₹{record.totalValue.toLocaleString()}</td>
                          <td className="stock-update-table-cell">
                            <span className={`stock-update-badge status ${record.status.toLowerCase().replace(' ', '')}`}>
                              {record.status}
                            </span>
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

      case 'create-stock-update':
        return (
          <div className="stock-update-space-y-4">
            <div className="stock-update-card">
              <div className="stock-update-card-header">
                <h3 className="stock-update-card-title">
                  <RefreshCw className="stock-update-icon-sm" />
                  Create Stock Update - Post GRN Processing
                </h3>
              </div>
              <div className="stock-update-card-content">
                {/* Basic Information */}
                <div className="stock-update-form-section">
                  <h4>Update Details</h4>
                  <div className="stock-update-form-grid">
                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">Update ID *</label>
                      <input
                        type="text"
                        className="stock-update-form-input"
                        value={stockUpdateData.updateId}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, updateId: e.target.value }))}
                        placeholder="STK-2025-XXX"
                      />
                    </div>

                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">GRN Reference *</label>
                      <input
                        type="text"
                        className="stock-update-form-input"
                        value={stockUpdateData.grnReference}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, grnReference: e.target.value }))}
                        placeholder="GRN/DGRN/INS reference"
                      />
                    </div>

                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">Update Date *</label>
                      <input
                        type="date"
                        className="stock-update-form-input"
                        value={stockUpdateData.updateDate}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, updateDate: e.target.value }))}
                      />
                    </div>

                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">Updated By *</label>
                      <input
                        type="text"
                        className="stock-update-form-input"
                        value={stockUpdateData.updatedBy}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, updatedBy: e.target.value }))}
                        placeholder="Staff member name"
                      />
                    </div>

                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">Update Type</label>
                      <select
                        className="stock-update-form-select"
                        value={stockUpdateData.updateType}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, updateType: e.target.value }))}
                      >
                        <option value="Post-GRN">Post-GRN Update</option>
                        <option value="Post-Inspection">Post-Inspection Update</option>
                        <option value="Adjustment">Stock Adjustment</option>
                        <option value="Transfer">Stock Transfer</option>
                        <option value="Correction">Stock Correction</option>
                      </select>
                    </div>

                    <div className="stock-update-form-group">
                      <label className="stock-update-form-label">Warehouse Location</label>
                      <select
                        className="stock-update-form-select"
                        value={stockUpdateData.warehouseLocation}
                        onChange={(e) => setStockUpdateData(prev => ({ ...prev, warehouseLocation: e.target.value }))}
                      >
                        <option value="">Select Location</option>
                        <option value="WH-A1">Warehouse A1</option>
                        <option value="WH-B1">Warehouse B1</option>
                        <option value="WH-C1">Warehouse C1</option>
                        <option value="WH-SF1">Safety Equipment</option>
                        <option value="WH-EM1">Emergency Stock</option>
                      </select>
                    </div>
                  </div>

                  <div className="stock-update-form-group">
                    <label className="stock-update-form-label">Update Notes</label>
                    <textarea
                      className="stock-update-form-textarea"
                      rows={3}
                      value={stockUpdateData.notes}
                      onChange={(e) => setStockUpdateData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="Notes about this stock update..."
                    ></textarea>
                  </div>
                </div>

                {/* Stock Items Section */}
                <div className="stock-update-form-section">
                  <div className="stock-update-section-header">
                    <h4>Stock Items Update</h4>
                    <button
                      type="button"
                      className="stock-update-button success small"
                      onClick={addStockItem}
                    >
                      <Plus className="stock-update-icon-sm" />
                      Add Item
                    </button>
                  </div>

                  <div className="stock-update-items-container">
                    {stockItems.map((item, index) => (
                      <div key={item.id} className="stock-update-item-card">
                        <div className="stock-update-item-header">
                          <h5>Item {index + 1} - Stock Update</h5>
                          {stockItems.length > 1 && (
                            <button
                              type="button"
                              className="stock-update-button danger small"
                              onClick={() => removeStockItem(item.id)}
                            >
                              <Minus className="stock-update-icon-sm" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="stock-update-item-grid">
                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Item Name *</label>
                            <input
                              type="text"
                              className="stock-update-form-input"
                              value={item.itemName}
                              onChange={(e) => updateStockItem(item.id, 'itemName', e.target.value)}
                              placeholder="Item name"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Current Stock</label>
                            <input
                              type="number"
                              className="stock-update-form-input"
                              value={item.currentStock}
                              onChange={(e) => updateStockItem(item.id, 'currentStock', parseInt(e.target.value) || 0)}
                              min="0"
                              placeholder="Current quantity"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">GRN Quantity</label>
                            <input
                              type="number"
                              className="stock-update-form-input"
                              value={item.grnQuantity}
                              onChange={(e) => updateStockItem(item.id, 'grnQuantity', parseInt(e.target.value) || 0)}
                              min="0"
                              placeholder="Received quantity"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Adjustment Qty</label>
                            <input
                              type="number"
                              className="stock-update-form-input"
                              value={item.adjustmentQuantity}
                              onChange={(e) => updateStockItem(item.id, 'adjustmentQuantity', parseInt(e.target.value) || 0)}
                              min="0"
                              placeholder="Adjustment if any"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Update Action</label>
                            <select
                              className="stock-update-form-select"
                              value={item.updateAction}
                              onChange={(e) => updateStockItem(item.id, 'updateAction', e.target.value)}
                            >
                              <option value="Add">Add to Stock</option>
                              <option value="Subtract">Subtract from Stock</option>
                              <option value="Set">Set Exact Stock</option>
                            </select>
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">New Stock Level</label>
                            <input
                              type="number"
                              className="stock-update-form-input readonly"
                              value={item.newStock}
                              readOnly
                              title="Auto-calculated based on action"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Unit Cost</label>
                            <input
                              type="number"
                              className="stock-update-form-input"
                              value={item.unitCost}
                              onChange={(e) => updateStockItem(item.id, 'unitCost', parseFloat(e.target.value) || 0)}
                              min="0"
                              step="0.01"
                              placeholder="Cost per unit"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Total Value</label>
                            <input
                              type="number"
                              className="stock-update-form-input readonly"
                              value={item.totalValue}
                              readOnly
                              title="Auto-calculated"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Bin Location</label>
                            <input
                              type="text"
                              className="stock-update-form-input"
                              value={item.binLocation}
                              onChange={(e) => updateStockItem(item.id, 'binLocation', e.target.value)}
                              placeholder="Specific bin location"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Batch Number</label>
                            <input
                              type="text"
                              className="stock-update-form-input"
                              value={item.batchNumber}
                              onChange={(e) => updateStockItem(item.id, 'batchNumber', e.target.value)}
                              placeholder="Manufacturing batch"
                            />
                          </div>

                          <div className="stock-update-form-group">
                            <label className="stock-update-form-label">Expiry Date</label>
                            <input
                              type="date"
                              className="stock-update-form-input"
                              value={item.expiryDate}
                              onChange={(e) => updateStockItem(item.id, 'expiryDate', e.target.value)}
                            />
                          </div>

                          <div className="stock-update-form-group full-width">
                            <label className="stock-update-form-label">Update Remarks</label>
                            <textarea
                              className="stock-update-form-textarea"
                              rows={2}
                              value={item.remarks}
                              onChange={(e) => updateStockItem(item.id, 'remarks', e.target.value)}
                              placeholder="Remarks about this stock update..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Update Summary */}
                  <div className="stock-update-summary-section">
                    <div className="stock-update-summary-card">
                      <h4>Stock Update Summary</h4>
                      <div className="stock-update-summary-grid">
                        <div className="summary-item">
                          <span className="summary-label">Total Items:</span>
                          <span className="summary-value">{stockItems.length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Total Quantity:</span>
                          <span className="summary-value">{stockItems.reduce((sum, item) => sum + item.newStock, 0)}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">GRN Quantity:</span>
                          <span className="summary-value">{stockItems.reduce((sum, item) => sum + item.grnQuantity, 0)}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Total Value:</span>
                          <span className="summary-value">₹{calculateTotalValue().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="stock-update-form-actions">
                  <button
                    type="button"
                    className="stock-update-button primary"
                    onClick={createStockUpdate}
                  >
                    Create Stock Update
                  </button>
                  <button
                    type="button"
                    className="stock-update-button outline"
                    onClick={() => {
                      setStockUpdateData({
                        updateId: '',
                        grnReference: '',
                        updateDate: '',
                        updatedBy: '',
                        updateType: 'Post-GRN',
                        warehouseLocation: '',
                        notes: ''
                      });
                      setStockItems([{
                        id: 1,
                        itemName: '',
                        currentStock: 0,
                        grnQuantity: 0,
                        adjustmentQuantity: 0,
                        newStock: 0,
                        unitCost: 0,
                        totalValue: 0,
                        binLocation: '',
                        batchNumber: '',
                        expiryDate: '',
                        remarks: '',
                        updateAction: 'Add'
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

      case 'stock-reports':
        return (
          <div className="stock-update-space-y-4">
            <div className="stock-update-card">
              <div className="stock-update-card-header">
                <h3 className="stock-update-card-title">
                  <FileText className="stock-update-icon-sm" />
                  Stock Management Reports & Analytics
                </h3>
              </div>
              <div className="stock-update-card-content stock-update-space-y-4">
                <div className="stock-update-reports-grid">
                  <div className="stock-update-report-card">
                    <Package className="stock-update-report-icon orange" />
                    <h3 className="stock-update-report-title">Stock Movement</h3>
                    <p className="stock-update-report-description">Comprehensive stock movement and update history</p>
                    <button className="stock-update-button outline small">
                      <Download className="stock-update-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="stock-update-report-card">
                    <RefreshCw className="stock-update-report-icon green" />
                    <h3 className="stock-update-report-title">Update Analytics</h3>
                    <p className="stock-update-report-description">Analysis of stock updates and warehouse efficiency</p>
                    <button className="stock-update-button outline small">
                      <Download className="stock-update-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="stock-update-report-card">
                    <Archive className="stock-update-report-icon blue" />
                    <h3 className="stock-update-report-title">Inventory Valuation</h3>
                    <p className="stock-update-report-description">Current inventory values and cost analysis</p>
                    <button className="stock-update-button outline small">
                      <Download className="stock-update-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="stock-update-report-card">
                    <Truck className="stock-update-report-icon purple" />
                    <h3 className="stock-update-report-title">Warehouse Performance</h3>
                    <p className="stock-update-report-description">Warehouse efficiency and performance metrics</p>
                    <button className="stock-update-button outline small">
                      <Download className="stock-update-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="stock-update-stats-section">
                  <h4>Stock Management Statistics</h4>
                  <div className="stock-update-stats-grid">
                    <div className="stock-update-stat-item">
                      <span className="stock-update-stat-label">This Month:</span>
                      <span className="stock-update-stat-value">{stockUpdateRecords.length} Updates</span>
                    </div>
                    <div className="stock-update-stat-item">
                      <span className="stock-update-stat-label">Total Items Updated:</span>
                      <span className="stock-update-stat-value">{stockUpdateRecords.reduce((sum, record) => sum + record.totalItems, 0)}</span>
                    </div>
                    <div className="stock-update-stat-item">
                      <span className="stock-update-stat-label">Completion Rate:</span>
                      <span className="stock-update-stat-value">
                        {Math.round((stockUpdateRecords.filter(record => record.status === 'Completed').length / stockUpdateRecords.length) * 100)}%
                      </span>
                    </div>
                    <div className="stock-update-stat-item">
                      <span className="stock-update-stat-label">Total Value Updated:</span>
                      <span className="stock-update-stat-value">₹{stockUpdateRecords.reduce((sum, record) => sum + record.totalValue, 0).toLocaleString()}</span>
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
    <div className="stock-update-container">
      {/* Header */}
      <header className="stock-update-header">
        <div className="stock-update-header-content">
          <div className="stock-update-header-info">
            <div className="stock-update-header-icon">
              <RefreshCw className="stock-update-icon-sm" />
            </div>
            <div>
              <h1 className="stock-update-header-title">STOCK UPDATE POST GRN</h1>
              <p className="stock-update-header-subtitle">Warehouse Management</p>
            </div>
          </div>
        </div>
      </header>

      <div className="stock-update-main-container">
        
        {/* Tab Navigation */}
        <div className="stock-update-tab-navigation">
          <nav className="stock-update-tab-nav">
            <div className="stock-update-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`stock-update-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="stock-update-icon-sm" />
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
