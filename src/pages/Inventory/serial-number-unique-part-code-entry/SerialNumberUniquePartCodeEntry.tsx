import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const Hash = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
  </svg>
);

const Tag = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Eye = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

export default function SerialNumberUniquePartCodeEntry() {
  const [activeTab, setActiveTab] = useState('serial-overview');
  const [serialEntryData, setSerialEntryData] = useState({
    entryId: '',
    grnReference: '',
    entryDate: '',
    enteredBy: '',
    vendorName: '',
    warehouseLocation: '',
    entryType: 'New',
    notes: ''
  });

  const [serialItems, setSerialItems] = useState([{
    id: 1,
    itemName: '',
    partCode: '',
    serialNumber: '',
    batchNumber: '',
    manufacturingDate: '',
    expiryDate: '',
    warrantyPeriod: '',
    condition: 'New',
    location: '',
    remarks: '',
    isUnique: true,
    status: 'Active'
  }]);

  // Sample Serial Number Records
  const [serialRecords, setSerialRecords] = useState([
    {
      id: 1,
      entryId: 'SER-2025-001',
      grnReference: 'GRN-2025-015',
      entryDate: '2025-08-10',
      enteredBy: 'Rajesh Kumar',
      vendorName: 'Precision Parts Ltd.',
      totalItems: 5,
      uniqueItems: 5,
      activeItems: 5,
      warehouseLocation: 'WH-A1',
      entryType: 'New'
    },
    {
      id: 2,
      entryId: 'SER-2025-002',
      grnReference: 'DGRN-2025-002',
      entryDate: '2025-08-09',
      enteredBy: 'Priya Sharma',
      vendorName: 'Electronic Components Co.',
      totalItems: 3,
      uniqueItems: 3,
      activeItems: 3,
      warehouseLocation: 'WH-B1',
      entryType: 'Replacement'
    },
    {
      id: 3,
      entryId: 'SER-2025-003',
      grnReference: 'GRN-2025-018',
      entryDate: '2025-08-08',
      enteredBy: 'Amit Singh',
      vendorName: 'Industrial Equipment Inc.',
      totalItems: 2,
      uniqueItems: 2,
      activeItems: 1,
      warehouseLocation: 'WH-SF1',
      entryType: 'Refurbished'
    }
  ]);

  const tabs = [
    {
      id: 'serial-overview',
      label: 'Serial Number Overview',
      icon: Hash,
    },
    {
      id: 'create-serial',
      label: 'Create Serial Entry',
      icon: Tag,
    },
    {
      id: 'serial-reports',
      label: 'Tracking Reports',
      icon: FileText,
    },
  ];

  const addSerialItem = () => {
    const newItem = {
      id: serialItems.length + 1,
      itemName: '',
      partCode: '',
      serialNumber: '',
      batchNumber: '',
      manufacturingDate: '',
      expiryDate: '',
      warrantyPeriod: '',
      condition: 'New',
      location: '',
      remarks: '',
      isUnique: true,
      status: 'Active'
    };
    setSerialItems([...serialItems, newItem]);
  };

  const removeSerialItem = (id: number) => {
    if (serialItems.length > 1) {
      setSerialItems(serialItems.filter(item => item.id !== id));
    }
  };

  const updateSerialItem = (id: number, field: string, value: any) => {
    setSerialItems(serialItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-generate part code if item name is provided
        if (field === 'itemName' && value) {
          const codePrefix = value.toUpperCase().replace(/\s+/g, '').substring(0, 4);
          const timestamp = Date.now().toString().slice(-4);
          updatedItem.partCode = `${codePrefix}-${timestamp}`;
        }
        
        return updatedItem;
      }
      return item;
    }));
  };

  const generateSerialNumber = (id: number) => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const serialNumber = `SN${timestamp}${random}`;
    updateSerialItem(id, 'serialNumber', serialNumber);
  };

  const validateUniqueSerial = (serialNumber: string, currentId: number) => {
    return !serialItems.some(item => 
      item.serialNumber === serialNumber && item.id !== currentId
    );
  };

  const createSerialEntry = () => {
    if (!serialEntryData.entryId || !serialEntryData.grnReference || !serialEntryData.enteredBy) {
      alert('Please fill all required fields');
      return;
    }

    // Validate unique serial numbers
    const serialNumbers = serialItems.map(item => item.serialNumber);
    const hasDuplicates = serialNumbers.length !== new Set(serialNumbers).size;
    if (hasDuplicates) {
      alert('All serial numbers must be unique');
      return;
    }

    const newSerialEntry = {
      id: serialRecords.length + 1,
      ...serialEntryData,
      totalItems: serialItems.length,
      uniqueItems: serialItems.filter(item => item.isUnique).length,
      activeItems: serialItems.filter(item => item.status === 'Active').length
    };

    setSerialRecords(prev => [newSerialEntry, ...prev]);
    
    // Reset form
    setSerialEntryData({
      entryId: '',
      grnReference: '',
      entryDate: '',
      enteredBy: '',
      vendorName: '',
      warehouseLocation: '',
      entryType: 'New',
      notes: ''
    });
    setSerialItems([{
      id: 1,
      itemName: '',
      partCode: '',
      serialNumber: '',
      batchNumber: '',
      manufacturingDate: '',
      expiryDate: '',
      warrantyPeriod: '',
      condition: 'New',
      location: '',
      remarks: '',
      isUnique: true,
      status: 'Active'
    }]);
    setActiveTab('serial-overview');
    
    alert('Serial number entry created successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'serial-overview':
        return (
          <div className="serial-entry-space-y-4">
            {/* Summary Cards */}
            <div className="serial-entry-grid-4">
              <div className="serial-entry-card">
                <div className="serial-entry-card-content">
                  <div className="serial-entry-summary-card">
                    <div className="serial-entry-summary-content">
                      <div className="serial-entry-summary-icon total">
                        <Hash className="serial-entry-icon-sm" />
                      </div>
                      <div>
                        <p className="serial-entry-summary-text">Total Entries</p>
                        <p className="serial-entry-summary-number total">{serialRecords.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="serial-entry-card">
                <div className="serial-entry-card-content">
                  <div className="serial-entry-summary-card">
                    <div className="serial-entry-summary-content">
                      <div className="serial-entry-summary-icon items">
                        <Tag className="serial-entry-icon-sm" />
                      </div>
                      <div>
                        <p className="serial-entry-summary-text">Total Items</p>
                        <p className="serial-entry-summary-number items">
                          {serialRecords.reduce((sum, record) => sum + record.totalItems, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="serial-entry-card">
                <div className="serial-entry-card-content">
                  <div className="serial-entry-summary-card">
                    <div className="serial-entry-summary-content">
                      <div className="serial-entry-summary-icon active">
                        <CheckCircle className="serial-entry-icon-sm" />
                      </div>
                      <div>
                        <p className="serial-entry-summary-text">Active Items</p>
                        <p className="serial-entry-summary-number active">
                          {serialRecords.reduce((sum, record) => sum + record.activeItems, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="serial-entry-card">
                <div className="serial-entry-card-content">
                  <div className="serial-entry-summary-card">
                    <div className="serial-entry-summary-content">
                      <div className="serial-entry-summary-icon unique">
                        <Eye className="serial-entry-icon-sm" />
                      </div>
                      <div>
                        <p className="serial-entry-summary-text">Unique Parts</p>
                        <p className="serial-entry-summary-number unique">
                          {serialRecords.reduce((sum, record) => sum + record.uniqueItems, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Serial Number Records Table */}
            <div className="serial-entry-card">
              <div className="serial-entry-card-header">
                <h3 className="serial-entry-card-title">
                  <Hash className="serial-entry-icon-sm" />
                  Serial Number & Unique Part Code Records
                </h3>
              </div>
              <div className="serial-entry-card-content">
                <div className="serial-entry-table-container">
                  <table className="serial-entry-table">
                    <thead className="serial-entry-table-header">
                      <tr>
                        <th>Entry ID</th>
                        <th>GRN Reference</th>
                        <th>Date</th>
                        <th>Entered By</th>
                        <th>Vendor</th>
                        <th>Type</th>
                        <th>Items</th>
                        <th>Unique/Active</th>
                        <th>Location</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serialRecords.map((record) => (
                        <tr key={record.id} className="serial-entry-table-row">
                          <td className="serial-entry-table-cell entry-id">{record.entryId}</td>
                          <td className="serial-entry-table-cell grn-ref">{record.grnReference}</td>
                          <td className="serial-entry-table-cell mono">{record.entryDate}</td>
                          <td className="serial-entry-table-cell name">{record.enteredBy}</td>
                          <td className="serial-entry-table-cell vendor">{record.vendorName}</td>
                          <td className="serial-entry-table-cell">
                            <span className={`serial-entry-badge type ${record.entryType.toLowerCase()}`}>
                              {record.entryType}
                            </span>
                          </td>
                          <td className="serial-entry-table-cell center">{record.totalItems}</td>
                          <td className="serial-entry-table-cell center">
                            <span className="unique-count">{record.uniqueItems}</span> / 
                            <span className="active-count"> {record.activeItems}</span>
                          </td>
                          <td className="serial-entry-table-cell location">{record.warehouseLocation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'create-serial':
        return (
          <div className="serial-entry-space-y-4">
            <div className="serial-entry-card">
              <div className="serial-entry-card-header">
                <h3 className="serial-entry-card-title">
                  <Tag className="serial-entry-icon-sm" />
                  Create Serial Number & Unique Part Code Entry
                </h3>
              </div>
              <div className="serial-entry-card-content">
                {/* Basic Information */}
                <div className="serial-entry-form-section">
                  <h4>Entry Details</h4>
                  <div className="serial-entry-form-grid">
                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Entry ID *</label>
                      <input
                        type="text"
                        className="serial-entry-form-input"
                        value={serialEntryData.entryId}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, entryId: e.target.value }))}
                        placeholder="SER-2025-XXX"
                      />
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">GRN Reference *</label>
                      <input
                        type="text"
                        className="serial-entry-form-input"
                        value={serialEntryData.grnReference}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, grnReference: e.target.value }))}
                        placeholder="GRN-2025-XXX or DGRN-2025-XXX"
                      />
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Entry Date *</label>
                      <input
                        type="date"
                        className="serial-entry-form-input"
                        value={serialEntryData.entryDate}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, entryDate: e.target.value }))}
                      />
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Entered By *</label>
                      <input
                        type="text"
                        className="serial-entry-form-input"
                        value={serialEntryData.enteredBy}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, enteredBy: e.target.value }))}
                        placeholder="Staff member name"
                      />
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Vendor Name</label>
                      <input
                        type="text"
                        className="serial-entry-form-input"
                        value={serialEntryData.vendorName}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, vendorName: e.target.value }))}
                        placeholder="Supplier name"
                      />
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Warehouse Location</label>
                      <select
                        className="serial-entry-form-select"
                        value={serialEntryData.warehouseLocation}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, warehouseLocation: e.target.value }))}
                      >
                        <option value="">Select Location</option>
                        <option value="WH-A1">Warehouse A1</option>
                        <option value="WH-B1">Warehouse B1</option>
                        <option value="WH-C1">Warehouse C1</option>
                        <option value="WH-SF1">Safety Equipment</option>
                        <option value="WH-EM1">Emergency Stock</option>
                      </select>
                    </div>

                    <div className="serial-entry-form-group">
                      <label className="serial-entry-form-label">Entry Type</label>
                      <select
                        className="serial-entry-form-select"
                        value={serialEntryData.entryType}
                        onChange={(e) => setSerialEntryData(prev => ({ ...prev, entryType: e.target.value }))}
                      >
                        <option value="New">New Item</option>
                        <option value="Replacement">Replacement</option>
                        <option value="Refurbished">Refurbished</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Return">Return</option>
                      </select>
                    </div>
                  </div>

                  <div className="serial-entry-form-group">
                    <label className="serial-entry-form-label">Entry Notes</label>
                    <textarea
                      className="serial-entry-form-textarea"
                      rows={3}
                      value={serialEntryData.notes}
                      onChange={(e) => setSerialEntryData(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="General notes about this serial entry..."
                    ></textarea>
                  </div>
                </div>

                {/* Serial Items Section */}
                <div className="serial-entry-form-section">
                  <div className="serial-entry-section-header">
                    <h4>Serial Number & Part Code Items</h4>
                    <button
                      type="button"
                      className="serial-entry-button success small"
                      onClick={addSerialItem}
                    >
                      <Plus className="serial-entry-icon-sm" />
                      Add Item
                    </button>
                  </div>

                  <div className="serial-entry-items-container">
                    {serialItems.map((item, index) => (
                      <div key={item.id} className="serial-entry-item-card">
                        <div className="serial-entry-item-header">
                          <h5>Item {index + 1} - Serial & Part Code</h5>
                          {serialItems.length > 1 && (
                            <button
                              type="button"
                              className="serial-entry-button danger small"
                              onClick={() => removeSerialItem(item.id)}
                            >
                              <Minus className="serial-entry-icon-sm" />
                              Remove
                            </button>
                          )}
                        </div>

                        <div className="serial-entry-item-grid">
                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Item Name *</label>
                            <input
                              type="text"
                              className="serial-entry-form-input"
                              value={item.itemName}
                              onChange={(e) => updateSerialItem(item.id, 'itemName', e.target.value)}
                              placeholder="Item/part name"
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Part Code *</label>
                            <input
                              type="text"
                              className="serial-entry-form-input"
                              value={item.partCode}
                              onChange={(e) => updateSerialItem(item.id, 'partCode', e.target.value)}
                              placeholder="Auto-generated or custom"
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Serial Number *</label>
                            <div className="serial-input-group">
                              <input
                                type="text"
                                className="serial-entry-form-input"
                                value={item.serialNumber}
                                onChange={(e) => updateSerialItem(item.id, 'serialNumber', e.target.value)}
                                placeholder="Unique serial number"
                              />
                              <button
                                type="button"
                                className="serial-generate-btn"
                                onClick={() => generateSerialNumber(item.id)}
                                title="Generate Serial Number"
                              >
                                Generate
                              </button>
                            </div>
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Batch Number</label>
                            <input
                              type="text"
                              className="serial-entry-form-input"
                              value={item.batchNumber}
                              onChange={(e) => updateSerialItem(item.id, 'batchNumber', e.target.value)}
                              placeholder="Manufacturing batch"
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Manufacturing Date</label>
                            <input
                              type="date"
                              className="serial-entry-form-input"
                              value={item.manufacturingDate}
                              onChange={(e) => updateSerialItem(item.id, 'manufacturingDate', e.target.value)}
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Expiry Date</label>
                            <input
                              type="date"
                              className="serial-entry-form-input"
                              value={item.expiryDate}
                              onChange={(e) => updateSerialItem(item.id, 'expiryDate', e.target.value)}
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Warranty Period (Months)</label>
                            <input
                              type="number"
                              className="serial-entry-form-input"
                              value={item.warrantyPeriod}
                              onChange={(e) => updateSerialItem(item.id, 'warrantyPeriod', e.target.value)}
                              min="0"
                              placeholder="Warranty in months"
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Condition</label>
                            <select
                              className="serial-entry-form-select"
                              value={item.condition}
                              onChange={(e) => updateSerialItem(item.id, 'condition', e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="Good">Good</option>
                              <option value="Fair">Fair</option>
                              <option value="Refurbished">Refurbished</option>
                              <option value="Used">Used</option>
                            </select>
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Storage Location</label>
                            <input
                              type="text"
                              className="serial-entry-form-input"
                              value={item.location}
                              onChange={(e) => updateSerialItem(item.id, 'location', e.target.value)}
                              placeholder="Specific storage location"
                            />
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-label">Status</label>
                            <select
                              className="serial-entry-form-select"
                              value={item.status}
                              onChange={(e) => updateSerialItem(item.id, 'status', e.target.value)}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="Reserved">Reserved</option>
                              <option value="Quarantine">Quarantine</option>
                              <option value="Disposed">Disposed</option>
                            </select>
                          </div>

                          <div className="serial-entry-form-group">
                            <label className="serial-entry-form-checkbox-group">
                              <input
                                type="checkbox"
                                checked={item.isUnique}
                                onChange={(e) => updateSerialItem(item.id, 'isUnique', e.target.checked)}
                              />
                              <span className="checkmark"></span>
                              Unique Part
                            </label>
                          </div>

                          <div className="serial-entry-form-group full-width">
                            <label className="serial-entry-form-label">Remarks</label>
                            <textarea
                              className="serial-entry-form-textarea"
                              rows={2}
                              value={item.remarks}
                              onChange={(e) => updateSerialItem(item.id, 'remarks', e.target.value)}
                              placeholder="Additional remarks and notes..."
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="serial-entry-summary-section">
                    <div className="serial-entry-summary-card">
                      <h4>Entry Summary</h4>
                      <div className="serial-entry-summary-grid">
                        <div className="summary-item">
                          <span className="summary-label">Total Items:</span>
                          <span className="summary-value">{serialItems.length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Unique Parts:</span>
                          <span className="summary-value">{serialItems.filter(item => item.isUnique).length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Active Items:</span>
                          <span className="summary-value">{serialItems.filter(item => item.status === 'Active').length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Serial Numbers:</span>
                          <span className="summary-value">{serialItems.filter(item => item.serialNumber).length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="serial-entry-form-actions">
                  <button
                    type="button"
                    className="serial-entry-button primary"
                    onClick={createSerialEntry}
                  >
                    Create Serial Entry
                  </button>
                  <button
                    type="button"
                    className="serial-entry-button outline"
                    onClick={() => {
                      setSerialEntryData({
                        entryId: '',
                        grnReference: '',
                        entryDate: '',
                        enteredBy: '',
                        vendorName: '',
                        warehouseLocation: '',
                        entryType: 'New',
                        notes: ''
                      });
                      setSerialItems([{
                        id: 1,
                        itemName: '',
                        partCode: '',
                        serialNumber: '',
                        batchNumber: '',
                        manufacturingDate: '',
                        expiryDate: '',
                        warrantyPeriod: '',
                        condition: 'New',
                        location: '',
                        remarks: '',
                        isUnique: true,
                        status: 'Active'
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

      case 'serial-reports':
        return (
          <div className="serial-entry-space-y-4">
            <div className="serial-entry-card">
              <div className="serial-entry-card-header">
                <h3 className="serial-entry-card-title">
                  <FileText className="serial-entry-icon-sm" />
                  Serial Number Tracking & Analytics Reports
                </h3>
              </div>
              <div className="serial-entry-card-content serial-entry-space-y-4">
                <div className="serial-entry-reports-grid">
                  <div className="serial-entry-report-card">
                    <Hash className="serial-entry-report-icon purple" />
                    <h3 className="serial-entry-report-title">Serial Number Registry</h3>
                    <p className="serial-entry-report-description">Complete registry of all serial numbers and part codes</p>
                    <button className="serial-entry-button outline small">
                      <Download className="serial-entry-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="serial-entry-report-card">
                    <Tag className="serial-entry-report-icon green" />
                    <h3 className="serial-entry-report-title">Part Code Tracking</h3>
                    <p className="serial-entry-report-description">Unique part code tracking and inventory status</p>
                    <button className="serial-entry-button outline small">
                      <Download className="serial-entry-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="serial-entry-report-card">
                    <Clock className="serial-entry-report-icon blue" />
                    <h3 className="serial-entry-report-title">Warranty Tracking</h3>
                    <p className="serial-entry-report-description">Warranty expiry dates and maintenance schedules</p>
                    <button className="serial-entry-button outline small">
                      <Download className="serial-entry-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="serial-entry-report-card">
                    <Search className="serial-entry-report-icon orange" />
                    <h3 className="serial-entry-report-title">Asset Lifecycle</h3>
                    <p className="serial-entry-report-description">Complete lifecycle tracking from receipt to disposal</p>
                    <button className="serial-entry-button outline small">
                      <Download className="serial-entry-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics */}
                <div className="serial-entry-stats-section">
                  <h4>Tracking Statistics</h4>
                  <div className="serial-entry-stats-grid">
                    <div className="serial-entry-stat-item">
                      <span className="serial-entry-stat-label">This Month:</span>
                      <span className="serial-entry-stat-value">{serialRecords.length} Entries</span>
                    </div>
                    <div className="serial-entry-stat-item">
                      <span className="serial-entry-stat-label">Total Items Tracked:</span>
                      <span className="serial-entry-stat-value">{serialRecords.reduce((sum, record) => sum + record.totalItems, 0)}</span>
                    </div>
                    <div className="serial-entry-stat-item">
                      <span className="serial-entry-stat-label">Unique Parts:</span>
                      <span className="serial-entry-stat-value">{serialRecords.reduce((sum, record) => sum + record.uniqueItems, 0)}</span>
                    </div>
                    <div className="serial-entry-stat-item">
                      <span className="serial-entry-stat-label">Active Status:</span>
                      <span className="serial-entry-stat-value">
                        {Math.round((serialRecords.reduce((sum, record) => sum + record.activeItems, 0) / 
                         serialRecords.reduce((sum, record) => sum + record.totalItems, 0)) * 100)}%
                      </span>
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
    <div className="serial-entry-container">
      {/* Header */}
      <header className="serial-entry-header">
        <div className="serial-entry-header-content">
          <div className="serial-entry-header-info">
            <div className="serial-entry-header-icon">
              <Tag className="serial-entry-icon-sm" />
            </div>
            <div>
              <h1 className="serial-entry-header-title">SERIAL NUMBER UNIQUE PART CODE</h1>
              <p className="serial-entry-header-subtitle">Entry</p>
            </div>
          </div>
        </div>
      </header>

      <div className="serial-entry-main-container">
        
        {/* Tab Navigation */}
        <div className="serial-entry-tab-navigation">
          <nav className="serial-entry-tab-nav">
            <div className="serial-entry-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`serial-entry-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="serial-entry-icon-sm" />
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
