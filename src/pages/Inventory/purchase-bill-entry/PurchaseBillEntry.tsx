import React, { useState, useRef } from 'react';
import './styles.css';

const PurchaseBillEntry: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'reports'>('overview');
  const [showModal, setShowModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);

  // Form state for new bill entry
  const [formData, setFormData] = useState({
    billNo: '',
    vendorId: '',
    vendorName: '',
    billDate: '',
    dueDate: '',
    purchaseOrderNo: '',
    billType: 'material',
    department: '',
    totalAmount: 0,
    taxAmount: 0,
    discountAmount: 0,
    netAmount: 0,
    paymentTerms: 'net30',
    priority: 'normal',
    remarks: '',
    attachments: [] as File[]
  });

  // Items in the bill
  const [billItems, setBillItems] = useState([
    {
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      rate: 0,
      amount: 0,
      taxRate: 0,
      taxAmount: 0,
      netAmount: 0
    }
  ]);

  // File input ref for attachments
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sample data for display
  const billSummary = {
    total: 156,
    pending: 43,
    approved: 89,
    paid: 24
  };

  const recentBills = [
    {
      id: 'PB-2024-001',
      vendorName: 'Rajesh Steel Suppliers',
      billDate: '2024-01-15',
      amount: 45670.50,
      status: 'pending',
      priority: 'high',
      department: 'Production',
      type: 'material'
    },
    {
      id: 'PB-2024-002',
      vendorName: 'Mining Equipment Co.',
      billDate: '2024-01-14',
      amount: 125000.00,
      status: 'approved',
      priority: 'normal',
      department: 'Equipment',
      type: 'equipment'
    },
    {
      id: 'PB-2024-003',
      vendorName: 'Safety Gear Ltd.',
      billDate: '2024-01-13',
      amount: 8950.75,
      status: 'paid',
      priority: 'normal',
      department: 'Safety',
      type: 'safety'
    },
    {
      id: 'PB-2024-004',
      vendorName: 'Office Supplies Inc.',
      billDate: '2024-01-12',
      amount: 3250.00,
      status: 'pending',
      priority: 'urgent',
      department: 'Administration',
      type: 'office'
    }
  ];

  // Vendor performance data
  const topVendors = [
    { name: 'Rajesh Steel Suppliers', bills: 34, amount: 567890.50, onTime: 95 },
    { name: 'Mining Equipment Co.', bills: 28, amount: 1245670.00, onTime: 88 },
    { name: 'Safety Gear Ltd.', bills: 42, amount: 298450.75, onTime: 92 },
    { name: 'Fuel Supply Corp.', bills: 18, amount: 445200.25, onTime: 85 }
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
    const updatedItems = [...billItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    
    // Calculate amounts if rate or quantity changes
    if (field === 'rate' || field === 'quantity' || field === 'taxRate') {
      const item = updatedItems[index];
      item.amount = item.quantity * item.rate;
      item.taxAmount = item.amount * (item.taxRate / 100);
      item.netAmount = item.amount + item.taxAmount;
    }
    
    setBillItems(updatedItems);
    calculateTotals(updatedItems);
  };

  // Calculate bill totals
  const calculateTotals = (items: typeof billItems) => {
    const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = items.reduce((sum, item) => sum + item.taxAmount, 0);
    const netAmount = totalAmount + taxAmount - formData.discountAmount;
    
    setFormData(prev => ({
      ...prev,
      totalAmount,
      taxAmount,
      netAmount
    }));
  };

  // Add new item
  const addItem = () => {
    setBillItems([...billItems, {
      id: billItems.length + 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      rate: 0,
      amount: 0,
      taxRate: 0,
      taxAmount: 0,
      netAmount: 0
    }]);
  };

  // Remove item
  const removeItem = (index: number) => {
    if (billItems.length > 1) {
      const updatedItems = billItems.filter((_, i) => i !== index);
      setBillItems(updatedItems);
      calculateTotals(updatedItems);
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

  // Submit bill
  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('Bill action:', action, formData, billItems);
    alert(`Bill ${action === 'save' ? 'saved as draft' : 'submitted'} successfully!`);
    
    // Reset form
    setFormData({
      billNo: '',
      vendorId: '',
      vendorName: '',
      billDate: '',
      dueDate: '',
      purchaseOrderNo: '',
      billType: 'material',
      department: '',
      totalAmount: 0,
      taxAmount: 0,
      discountAmount: 0,
      netAmount: 0,
      paymentTerms: 'net30',
      priority: 'normal',
      remarks: '',
      attachments: []
    });
    
    setBillItems([{
      id: 1,
      itemCode: '',
      itemName: '',
      description: '',
      quantity: 0,
      unit: '',
      rate: 0,
      amount: 0,
      taxRate: 0,
      taxAmount: 0,
      netAmount: 0
    }]);
  };

  // View bill details
  const viewBillDetails = (bill: any) => {
    setSelectedBill(bill);
    setShowModal(true);
  };

  const renderOverviewTab = () => (
    <div className="purchase-bill-tab-content">
      <div className="purchase-bill-space-y-4">
        {/* Summary Cards */}
        <div className="purchase-bill-grid-4">
          <div className="purchase-bill-card purchase-bill-summary-card">
            <div className="purchase-bill-summary-content">
              <div className="purchase-bill-summary-icon total">
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <p className="purchase-bill-summary-text">Total Bills</p>
                <p className="purchase-bill-summary-number total">{billSummary.total}</p>
              </div>
            </div>
          </div>
          
          <div className="purchase-bill-card purchase-bill-summary-card">
            <div className="purchase-bill-summary-content">
              <div className="purchase-bill-summary-icon pending">
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
                </svg>
              </div>
              <div>
                <p className="purchase-bill-summary-text">Pending Bills</p>
                <p className="purchase-bill-summary-number pending">{billSummary.pending}</p>
              </div>
            </div>
          </div>
          
          <div className="purchase-bill-card purchase-bill-summary-card">
            <div className="purchase-bill-summary-content">
              <div className="purchase-bill-summary-icon approved">
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <div>
                <p className="purchase-bill-summary-text">Approved Bills</p>
                <p className="purchase-bill-summary-number approved">{billSummary.approved}</p>
              </div>
            </div>
          </div>
          
          <div className="purchase-bill-card purchase-bill-summary-card">
            <div className="purchase-bill-summary-content">
              <div className="purchase-bill-summary-icon completed">
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v2H6V8zm8 0v4h2V8h-2z"/>
                </svg>
              </div>
              <div>
                <p className="purchase-bill-summary-text">Paid Bills</p>
                <p className="purchase-bill-summary-number completed">{billSummary.paid}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bills */}
        <div className="purchase-bill-card">
          <div className="purchase-bill-card-header">
            <h3 className="purchase-bill-card-title">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
              Recent Purchase Bills
            </h3>
          </div>
          <div className="purchase-bill-tab-content">
            <div className="purchase-bill-table-container">
              <table className="purchase-bill-table">
                <thead className="purchase-bill-table-header">
                  <tr>
                    <th>Bill No.</th>
                    <th>Vendor Name</th>
                    <th>Date</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBills.map((bill) => (
                    <tr key={bill.id} className="purchase-bill-table-row">
                      <td className="purchase-bill-table-cell bill-no">{bill.id}</td>
                      <td className="purchase-bill-table-cell vendor-name">{bill.vendorName}</td>
                      <td className="purchase-bill-table-cell">{new Date(bill.billDate).toLocaleDateString()}</td>
                      <td className="purchase-bill-table-cell department">{bill.department}</td>
                      <td className="purchase-bill-table-cell">
                        <span className={`purchase-bill-badge type ${bill.type}`}>
                          {bill.type}
                        </span>
                      </td>
                      <td className="purchase-bill-table-cell amount">₹{bill.amount.toLocaleString()}</td>
                      <td className="purchase-bill-table-cell">
                        <span className={`purchase-bill-badge priority ${bill.priority}`}>
                          {bill.priority}
                        </span>
                      </td>
                      <td className="purchase-bill-table-cell">
                        <span className={`purchase-bill-badge status ${bill.status}`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="purchase-bill-table-cell">
                        <button
                          className="purchase-bill-button outline small"
                          onClick={() => viewBillDetails(bill)}
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

        {/* Top Vendors Performance */}
        <div className="purchase-bill-card">
          <div className="purchase-bill-card-header">
            <h3 className="purchase-bill-card-title">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
              Top Vendor Performance
            </h3>
          </div>
          <div className="purchase-bill-tab-content">
            <div className="purchase-bill-stats-grid">
              {topVendors.map((vendor, index) => (
                <div key={index} className="purchase-bill-stat-item">
                  <div>
                    <div className="purchase-bill-stat-label">{vendor.name}</div>
                    <div className="purchase-bill-stat-value">
                      {vendor.bills} bills • ₹{vendor.amount.toLocaleString()}
                    </div>
                    <div className="purchase-bill-stat-label">On-time: {vendor.onTime}%</div>
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
    <div className="purchase-bill-tab-content">
      <div className="purchase-bill-space-y-4">
        {/* Bill Information Section */}
        <div className="purchase-bill-form-section">
          <h4>Bill Information</h4>
          <div className="purchase-bill-form-grid">
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Bill Number</label>
              <input
                type="text"
                className="purchase-bill-form-input"
                value={formData.billNo}
                onChange={(e) => handleFormChange('billNo', e.target.value)}
                placeholder="Enter bill number"
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Bill Date</label>
              <input
                type="date"
                className="purchase-bill-form-input"
                value={formData.billDate}
                onChange={(e) => handleFormChange('billDate', e.target.value)}
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Due Date</label>
              <input
                type="date"
                className="purchase-bill-form-input"
                value={formData.dueDate}
                onChange={(e) => handleFormChange('dueDate', e.target.value)}
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Bill Type</label>
              <select
                className="purchase-bill-form-select"
                value={formData.billType}
                onChange={(e) => handleFormChange('billType', e.target.value)}
              >
                <option value="material">Material Purchase</option>
                <option value="equipment">Equipment Purchase</option>
                <option value="service">Service Bill</option>
                <option value="maintenance">Maintenance</option>
                <option value="office">Office Supplies</option>
                <option value="safety">Safety Equipment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vendor Information Section */}
        <div className="purchase-bill-form-section">
          <h4>Vendor Information</h4>
          <div className="purchase-bill-form-grid">
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Vendor ID</label>
              <input
                type="text"
                className="purchase-bill-form-input"
                value={formData.vendorId}
                onChange={(e) => handleFormChange('vendorId', e.target.value)}
                placeholder="Enter vendor ID"
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Vendor Name</label>
              <input
                type="text"
                className="purchase-bill-form-input"
                value={formData.vendorName}
                onChange={(e) => handleFormChange('vendorName', e.target.value)}
                placeholder="Enter vendor name"
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Purchase Order No.</label>
              <input
                type="text"
                className="purchase-bill-form-input"
                value={formData.purchaseOrderNo}
                onChange={(e) => handleFormChange('purchaseOrderNo', e.target.value)}
                placeholder="Enter PO number (if applicable)"
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Department</label>
              <select
                className="purchase-bill-form-select"
                value={formData.department}
                onChange={(e) => handleFormChange('department', e.target.value)}
              >
                <option value="">Select Department</option>
                <option value="Production">Production</option>
                <option value="Equipment">Equipment</option>
                <option value="Safety">Safety</option>
                <option value="Administration">Administration</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Transportation">Transportation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bill Items Section */}
        <div className="purchase-bill-form-section">
          <div className="purchase-bill-section-header">
            <h4>Bill Items</h4>
            <button
              type="button"
              className="purchase-bill-button primary small"
              onClick={addItem}
            >
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Item
            </button>
          </div>
          
          <div className="purchase-bill-items-container">
            {billItems.map((item, index) => (
              <div key={item.id} className="purchase-bill-item-card">
                <div className="purchase-bill-item-header">
                  <h5>Item {index + 1}</h5>
                  {billItems.length > 1 && (
                    <button
                      type="button"
                      className="purchase-bill-button danger small"
                      onClick={() => removeItem(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
                
                <div className="purchase-bill-item-grid">
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Item Code</label>
                    <input
                      type="text"
                      className="purchase-bill-form-input"
                      value={item.itemCode}
                      onChange={(e) => handleItemChange(index, 'itemCode', e.target.value)}
                      placeholder="Enter item code"
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Item Name</label>
                    <input
                      type="text"
                      className="purchase-bill-form-input"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                      placeholder="Enter item name"
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Quantity</label>
                    <input
                      type="number"
                      className="purchase-bill-form-input"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Unit</label>
                    <select
                      className="purchase-bill-form-select"
                      value={item.unit}
                      onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    >
                      <option value="">Select Unit</option>
                      <option value="pcs">Pieces</option>
                      <option value="kg">Kilograms</option>
                      <option value="tons">Tons</option>
                      <option value="liters">Liters</option>
                      <option value="meters">Meters</option>
                      <option value="hours">Hours</option>
                    </select>
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Rate (₹)</label>
                    <input
                      type="number"
                      className="purchase-bill-form-input"
                      value={item.rate}
                      onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Tax Rate (%)</label>
                    <input
                      type="number"
                      className="purchase-bill-form-input"
                      value={item.taxRate}
                      onChange={(e) => handleItemChange(index, 'taxRate', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Amount (₹)</label>
                    <input
                      type="text"
                      className="purchase-bill-form-input readonly"
                      value={item.amount.toFixed(2)}
                      readOnly
                    />
                  </div>
                  
                  <div className="purchase-bill-form-group">
                    <label className="purchase-bill-form-label">Net Amount (₹)</label>
                    <input
                      type="text"
                      className="purchase-bill-form-input readonly"
                      value={item.netAmount.toFixed(2)}
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="purchase-bill-form-group full-width">
                  <label className="purchase-bill-form-label">Description</label>
                  <textarea
                    className="purchase-bill-form-textarea"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Enter item description"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Summary Section */}
        <div className="purchase-bill-form-section">
          <h4>Bill Summary</h4>
          <div className="purchase-bill-form-grid">
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Subtotal (₹)</label>
              <input
                type="text"
                className="purchase-bill-form-input readonly"
                value={formData.totalAmount.toFixed(2)}
                readOnly
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Tax Amount (₹)</label>
              <input
                type="text"
                className="purchase-bill-form-input readonly"
                value={formData.taxAmount.toFixed(2)}
                readOnly
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Discount (₹)</label>
              <input
                type="number"
                className="purchase-bill-form-input"
                value={formData.discountAmount}
                onChange={(e) => {
                  const discount = parseFloat(e.target.value) || 0;
                  handleFormChange('discountAmount', discount);
                  const netAmount = formData.totalAmount + formData.taxAmount - discount;
                  handleFormChange('netAmount', netAmount);
                }}
                min="0"
                step="0.01"
              />
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Net Amount (₹)</label>
              <input
                type="text"
                className="purchase-bill-form-input readonly"
                value={formData.netAmount.toFixed(2)}
                readOnly
                style={{ fontWeight: 'bold', fontSize: '1.1em' }}
              />
            </div>
          </div>
        </div>

        {/* Payment Terms & Priority Section */}
        <div className="purchase-bill-form-section">
          <h4>Payment Terms & Priority</h4>
          <div className="purchase-bill-form-grid">
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Payment Terms</label>
              <select
                className="purchase-bill-form-select"
                value={formData.paymentTerms}
                onChange={(e) => handleFormChange('paymentTerms', e.target.value)}
              >
                <option value="net30">Net 30 Days</option>
                <option value="net15">Net 15 Days</option>
                <option value="net7">Net 7 Days</option>
                <option value="immediate">Immediate Payment</option>
                <option value="net45">Net 45 Days</option>
                <option value="net60">Net 60 Days</option>
              </select>
            </div>
            
            <div className="purchase-bill-form-group">
              <label className="purchase-bill-form-label">Priority</label>
              <select
                className="purchase-bill-form-select"
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

        {/* Attachments Section */}
        <div className="purchase-bill-form-section">
          <h4>Attachments</h4>
          <div className="purchase-bill-form-group">
            <label className="purchase-bill-form-label">Upload Bill Documents</label>
            <input
              type="file"
              ref={fileInputRef}
              className="purchase-bill-form-input"
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
                      className="purchase-bill-button danger small"
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

        {/* Remarks Section */}
        <div className="purchase-bill-form-section">
          <h4>Remarks</h4>
          <div className="purchase-bill-form-group full-width">
            <label className="purchase-bill-form-label">Additional Remarks</label>
            <textarea
              className="purchase-bill-form-textarea"
              value={formData.remarks}
              onChange={(e) => handleFormChange('remarks', e.target.value)}
              placeholder="Enter any additional remarks or notes"
              rows={4}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="purchase-bill-form-actions">
          <button
            type="button"
            className="purchase-bill-button outline"
            onClick={() => {
              setFormData({
                billNo: '',
                vendorId: '',
                vendorName: '',
                billDate: '',
                dueDate: '',
                purchaseOrderNo: '',
                billType: 'material',
                department: '',
                totalAmount: 0,
                taxAmount: 0,
                discountAmount: 0,
                netAmount: 0,
                paymentTerms: 'net30',
                priority: 'normal',
                remarks: '',
                attachments: []
              });
              setBillItems([{
                id: 1,
                itemCode: '',
                itemName: '',
                description: '',
                quantity: 0,
                unit: '',
                rate: 0,
                amount: 0,
                taxRate: 0,
                taxAmount: 0,
                netAmount: 0
              }]);
            }}
          >
            Clear Form
          </button>
          <button
            type="button"
            className="purchase-bill-button outline"
            onClick={() => handleSubmit('save')}
          >
            Save as Draft
          </button>
          <button
            type="button"
            className="purchase-bill-button primary"
            onClick={() => handleSubmit('submit')}
          >
            Submit Bill
          </button>
        </div>
      </div>
    </div>
  );

  const renderReportsTab = () => (
    <div className="purchase-bill-tab-content">
      <div className="purchase-bill-space-y-4">
        {/* Report Options */}
        <div className="purchase-bill-reports-grid">
          <div className="purchase-bill-report-card">
            <div className="purchase-bill-report-icon orange">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="purchase-bill-report-title">Bill History Report</h3>
            <p className="purchase-bill-report-description">
              Comprehensive report of all purchase bills with filtering options
            </p>
            <button className="purchase-bill-button primary">
              Generate Report
            </button>
          </div>

          <div className="purchase-bill-report-card">
            <div className="purchase-bill-report-icon blue">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 className="purchase-bill-report-title">Vendor Analysis Report</h3>
            <p className="purchase-bill-report-description">
              Detailed vendor performance and payment analysis
            </p>
            <button className="purchase-bill-button primary">
              Generate Report
            </button>
          </div>

          <div className="purchase-bill-report-card">
            <div className="purchase-bill-report-icon green">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v2H6V8zm8 0v4h2V8h-2z"/>
              </svg>
            </div>
            <h3 className="purchase-bill-report-title">Payment Tracking Report</h3>
            <p className="purchase-bill-report-description">
              Track payment status and outstanding amounts
            </p>
            <button className="purchase-bill-button primary">
              Generate Report
            </button>
          </div>

          <div className="purchase-bill-report-card">
            <div className="purchase-bill-report-icon purple">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="purchase-bill-report-title">Department Expense Report</h3>
            <p className="purchase-bill-report-description">
              Department-wise expense analysis and budget comparison
            </p>
            <button className="purchase-bill-button primary">
              Generate Report
            </button>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="purchase-bill-card">
          <div className="purchase-bill-card-header">
            <h3 className="purchase-bill-card-title">
              <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              Purchase Bill Statistics
            </h3>
          </div>
          <div className="purchase-bill-stats-section">
            <div className="purchase-bill-stats-grid">
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">This Month Bills</span>
                <span className="purchase-bill-stat-value">47</span>
              </div>
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">This Month Amount</span>
                <span className="purchase-bill-stat-value">₹8,45,670</span>
              </div>
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">Pending Payments</span>
                <span className="purchase-bill-stat-value">₹2,34,560</span>
              </div>
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">Avg Processing Time</span>
                <span className="purchase-bill-stat-value">3.2 days</span>
              </div>
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">Active Vendors</span>
                <span className="purchase-bill-stat-value">28</span>
              </div>
              <div className="purchase-bill-stat-item">
                <span className="purchase-bill-stat-label">Overdue Bills</span>
                <span className="purchase-bill-stat-value">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="purchase-bill-container">
      {/* Header */}
      <div className="purchase-bill-header">
        <div className="purchase-bill-header-content">
          <div className="purchase-bill-header-info">
            <div className="purchase-bill-header-icon">
              <svg fill="currentColor" viewBox="0 0 20 20" className="purchase-bill-icon">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zM14 6a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h8zM6 8a2 2 0 012 2v2H6V8zm8 0v4h2V8h-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="purchase-bill-header-title">Purchase Bill Entry</h1>
              <p className="purchase-bill-header-subtitle">Warehouse management and bill processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="purchase-bill-main-container">
        {/* Tab Navigation */}
        <div className="purchase-bill-tab-navigation">
          <div className="purchase-bill-tab-nav">
            <div className="purchase-bill-tab-list">
              <button
                className={`purchase-bill-tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('overview')}
              >
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                Bill Overview
              </button>
              
              <button
                className={`purchase-bill-tab-button ${activeTab === 'create' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('create')}
              >
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
                Create Bill
              </button>
              
              <button
                className={`purchase-bill-tab-button ${activeTab === 'reports' ? 'active' : 'inactive'}`}
                onClick={() => setActiveTab('reports')}
              >
                <svg className="purchase-bill-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                Bill Reports
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'create' && renderCreateTab()}
          {activeTab === 'reports' && renderReportsTab()}
        </div>
      </div>

      {/* Bill Details Modal */}
      {showModal && selectedBill && (
        <div className="purchase-bill-modal-overlay">
          <div className="purchase-bill-modal">
            <div className="purchase-bill-modal-header">
              <h3>Bill Details - {selectedBill.id}</h3>
            </div>
            <div className="purchase-bill-modal-content">
              <div className="purchase-bill-space-y-4">
                <div>
                  <strong>Vendor:</strong> {selectedBill.vendorName}
                </div>
                <div>
                  <strong>Date:</strong> {new Date(selectedBill.billDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Department:</strong> {selectedBill.department}
                </div>
                <div>
                  <strong>Type:</strong> {selectedBill.type}
                </div>
                <div>
                  <strong>Amount:</strong> ₹{selectedBill.amount.toLocaleString()}
                </div>
                <div>
                  <strong>Priority:</strong> 
                  <span className={`purchase-bill-badge priority ${selectedBill.priority}`} style={{marginLeft: '0.5rem'}}>
                    {selectedBill.priority}
                  </span>
                </div>
                <div>
                  <strong>Status:</strong> 
                  <span className={`purchase-bill-badge status ${selectedBill.status}`} style={{marginLeft: '0.5rem'}}>
                    {selectedBill.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="purchase-bill-modal-actions">
              <button
                className="purchase-bill-button outline"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                className="purchase-bill-button primary"
                onClick={() => {
                  console.log('Processing bill:', selectedBill.id);
                  setShowModal(false);
                }}
              >
                Process Bill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseBillEntry;
