import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0H20M7 13h10m-10 0l1.5-6h10l-1.5 6M7 19a2 2 0 100 4 2 2 0 000-4zM17 19a2 2 0 100 4 2 2 0 000-4z" />
  </svg>
);

const Compare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Save = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

export default function QuotationComparison() {
  const [activeTab, setActiveTab] = useState('comparison-overview');
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [comparisonNote, setComparisonNote] = useState('');
  const [showVendorModal, setShowVendorModal] = useState(false);

  // Sample quotation comparison data
  const [quotationData, setQuotationData] = useState([
    {
      id: 1,
      rfqNo: 'RFQ001',
      itemName: 'Steel Rods 12mm',
      category: 'Raw Materials',
      quantity: 1000,
      unit: 'Pieces',
      vendors: [
        { name: 'Tata Steel Ltd.', rate: 850, totalAmount: 850000, deliveryDays: 15, quality: 'Grade A' },
        { name: 'SAIL Corporation', rate: 820, totalAmount: 820000, deliveryDays: 20, quality: 'Grade A' },
        { name: 'JSW Steel Ltd.', rate: 875, totalAmount: 875000, deliveryDays: 12, quality: 'Grade A+' }
      ],
      bestVendor: 'SAIL Corporation',
      savingsAmount: 30000,
      status: 'Under Review',
      createdDate: '2025-08-01',
      requiredDate: '2025-08-20',
      comparisonNote: ''
    },
    {
      id: 2,
      rfqNo: 'RFQ002',
      itemName: 'Heavy Duty Conveyor Belt',
      category: 'Equipment',
      quantity: 500,
      unit: 'Meters',
      vendors: [
        { name: 'ContiTech India', rate: 2500, totalAmount: 1250000, deliveryDays: 30, quality: 'Premium' },
        { name: 'Fenner India Ltd.', rate: 2350, totalAmount: 1175000, deliveryDays: 25, quality: 'Standard' },
        { name: 'Habasit India', rate: 2700, totalAmount: 1350000, deliveryDays: 20, quality: 'Premium' }
      ],
      bestVendor: 'Fenner India Ltd.',
      savingsAmount: 75000,
      status: 'Approved',
      createdDate: '2025-07-25',
      requiredDate: '2025-08-25',
      comparisonNote: 'Best value for money with good delivery time'
    },
    {
      id: 3,
      rfqNo: 'RFQ003',
      itemName: 'Industrial Lubricants',
      category: 'Consumables',
      quantity: 200,
      unit: 'Liters',
      vendors: [
        { name: 'Indian Oil Corp.', rate: 450, totalAmount: 90000, deliveryDays: 7, quality: 'Standard' },
        { name: 'Bharat Petroleum', rate: 440, totalAmount: 88000, deliveryDays: 10, quality: 'Standard' },
        { name: 'Shell India', rate: 480, totalAmount: 96000, deliveryDays: 5, quality: 'Premium' }
      ],
      bestVendor: 'Bharat Petroleum',
      savingsAmount: 2000,
      status: 'Pending Approval',
      createdDate: '2025-08-05',
      requiredDate: '2025-08-15',
      comparisonNote: ''
    },
    {
      id: 4,
      rfqNo: 'RFQ004',
      itemName: 'Safety Equipment Set',
      category: 'Safety',
      quantity: 50,
      unit: 'Sets',
      vendors: [
        { name: '3M India Ltd.', rate: 1200, totalAmount: 60000, deliveryDays: 14, quality: 'Premium' },
        { name: 'Honeywell Safety', rate: 1050, totalAmount: 52500, deliveryDays: 18, quality: 'Standard' },
        { name: 'MSA Safety India', rate: 1180, totalAmount: 59000, deliveryDays: 12, quality: 'Premium' }
      ],
      bestVendor: 'Honeywell Safety',
      savingsAmount: 7500,
      status: 'Rejected',
      createdDate: '2025-07-30',
      requiredDate: '2025-08-12',
      comparisonNote: 'Quality concerns with selected vendor'
    }
  ]);

  // New quotation comparison form data
  const [newComparison, setNewComparison] = useState({
    rfqNo: '',
    itemName: '',
    category: 'Raw Materials',
    quantity: '',
    unit: 'Pieces',
    requiredDate: '',
    vendors: [
      { name: '', rate: '', deliveryDays: '', quality: 'Standard' },
      { name: '', rate: '', deliveryDays: '', quality: 'Standard' },
      { name: '', rate: '', deliveryDays: '', quality: 'Standard' }
    ],
    comparisonNote: ''
  });

  const tabs = [
    {
      id: 'comparison-overview',
      label: 'Comparison Overview',
      icon: Compare,
    },
    {
      id: 'add-comparison',
      label: 'Add New Comparison',
      icon: Plus,
    },
    {
      id: 'comparison-reports',
      label: 'Reports & Analytics',
      icon: FileText,
    },
  ];

  const handleApproveReject = (quotation: any, action: 'approve' | 'reject') => {
    setSelectedQuotation({ ...quotation, action });
    setShowComparisonModal(true);
  };

  const submitApproval = () => {
    if (selectedQuotation && selectedQuotation.action) {
      const updatedStatus = selectedQuotation.action === 'approve' ? 'Approved' : 'Rejected';
      
      setQuotationData(prev => 
        prev.map(q => 
          q.id === selectedQuotation.id
            ? { ...q, status: updatedStatus, comparisonNote: comparisonNote }
            : q
        )
      );
      setShowComparisonModal(false);
      setComparisonNote('');
      setSelectedQuotation(null);
      alert(`Quotation comparison ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewComparison(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVendorChange = (index: number, field: string, value: string) => {
    setNewComparison(prev => ({
      ...prev,
      vendors: prev.vendors.map((vendor, i) => 
        i === index ? { ...vendor, [field]: value } : vendor
      )
    }));
  };

  const calculateBestVendor = () => {
    const vendors = newComparison.vendors.filter(v => v.name && v.rate);
    if (vendors.length === 0) return null;
    
    return vendors.reduce((best, current) => {
      const currentTotal = parseFloat(current.rate) * parseFloat(newComparison.quantity || '0');
      const bestTotal = parseFloat(best.rate) * parseFloat(newComparison.quantity || '0');
      return currentTotal < bestTotal ? current : best;
    });
  };

  const submitNewComparison = () => {
    const bestVendor = calculateBestVendor();
    if (!bestVendor) {
      alert('Please add at least one vendor with valid rate');
      return;
    }

    const newQuotation = {
      id: quotationData.length + 1,
      rfqNo: newComparison.rfqNo || `RFQ${String(quotationData.length + 1).padStart(3, '0')}`,
      itemName: newComparison.itemName,
      category: newComparison.category,
      quantity: parseInt(newComparison.quantity),
      unit: newComparison.unit,
      vendors: newComparison.vendors
        .filter(v => v.name && v.rate)
        .map(v => ({
          ...v,
          rate: parseFloat(v.rate),
          totalAmount: parseFloat(v.rate) * parseInt(newComparison.quantity),
          deliveryDays: parseInt(v.deliveryDays || '0')
        })),
      bestVendor: bestVendor.name,
      savingsAmount: 0, // Calculate based on highest vs lowest vendor rate
      status: 'Under Review',
      createdDate: new Date().toISOString().split('T')[0],
      requiredDate: newComparison.requiredDate,
      comparisonNote: newComparison.comparisonNote
    };

    setQuotationData(prev => [...prev, newQuotation]);
    
    // Reset form
    setNewComparison({
      rfqNo: '',
      itemName: '',
      category: 'Raw Materials',
      quantity: '',
      unit: 'Pieces',
      requiredDate: '',
      vendors: [
        { name: '', rate: '', deliveryDays: '', quality: 'Standard' },
        { name: '', rate: '', deliveryDays: '', quality: 'Standard' },
        { name: '', rate: '', deliveryDays: '', quality: 'Standard' }
      ],
      comparisonNote: ''
    });

    alert('Quotation comparison created successfully!');
    setActiveTab('comparison-overview');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'comparison-overview':
        return (
          <div className="quotation-space-y-4">
            {/* Summary Cards */}
            <div className="quotation-grid-4">
              <div className="quotation-card">
                <div className="quotation-summary-card">
                  <div className="quotation-summary-content">
                    <div className="quotation-summary-icon pending">
                      <AlertCircle className="quotation-icon-lg" />
                    </div>
                    <div>
                      <p className="quotation-summary-text">Under Review</p>
                      <p className="quotation-summary-number pending">
                        {quotationData.filter(q => q.status === 'Under Review').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-card">
                <div className="quotation-summary-card">
                  <div className="quotation-summary-content">
                    <div className="quotation-summary-icon approved">
                      <CheckCircle className="quotation-icon-lg" />
                    </div>
                    <div>
                      <p className="quotation-summary-text">Approved</p>
                      <p className="quotation-summary-number approved">
                        {quotationData.filter(q => q.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-card">
                <div className="quotation-summary-card">
                  <div className="quotation-summary-content">
                    <div className="quotation-summary-icon rejected">
                      <XCircle className="quotation-icon-lg" />
                    </div>
                    <div>
                      <p className="quotation-summary-text">Rejected</p>
                      <p className="quotation-summary-number rejected">
                        {quotationData.filter(q => q.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="quotation-card">
                <div className="quotation-summary-card">
                  <div className="quotation-summary-content">
                    <div className="quotation-summary-icon total">
                      <DollarSign className="quotation-icon-lg" />
                    </div>
                    <div>
                      <p className="quotation-summary-text">Total Savings</p>
                      <p className="quotation-summary-number total">
                        ₹{quotationData.reduce((total, q) => total + q.savingsAmount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Comparison Table */}
            <div className="quotation-card">
              <div className="quotation-card-header">
                <h3 className="quotation-card-title">
                  <Compare className="quotation-icon-sm" />
                  Quotation Comparison Records
                </h3>
              </div>
              <div className="quotation-card-content">
                <div className="quotation-table-container">
                  <table className="quotation-table">
                    <thead className="quotation-table-header">
                      <tr>
                        <th>RFQ No.</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Best Vendor</th>
                        <th>Savings</th>
                        <th>Status</th>
                        <th>Required Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.map((quotation) => (
                        <tr key={quotation.id} className="quotation-table-row">
                          <td className="quotation-table-cell emp-no">{quotation.rfqNo}</td>
                          <td className="quotation-table-cell name">{quotation.itemName}</td>
                          <td className="quotation-table-cell">
                            <span className={`quotation-badge category ${quotation.category.toLowerCase().replace(' ', '-')}`}>
                              {quotation.category}
                            </span>
                          </td>
                          <td className="quotation-table-cell mono">{quotation.quantity} {quotation.unit}</td>
                          <td className="quotation-table-cell truncate">{quotation.bestVendor}</td>
                          <td className="quotation-table-cell center">₹{quotation.savingsAmount.toLocaleString()}</td>
                          <td className="quotation-table-cell">
                            <span className={`quotation-badge status ${quotation.status.toLowerCase().replace(' ', '-')}`}>
                              {quotation.status}
                            </span>
                          </td>
                          <td className="quotation-table-cell small">{quotation.requiredDate}</td>
                          <td className="quotation-table-cell">
                            <div className="quotation-flex quotation-flex-gap-1">
                              {quotation.status === 'Under Review' && (
                                <>
                                  <button 
                                    className="quotation-button success icon-only"
                                    title="Approve"
                                    onClick={() => handleApproveReject(quotation, 'approve')}
                                  >
                                    <CheckCircle className="quotation-icon-sm" />
                                  </button>
                                  <button 
                                    className="quotation-button danger icon-only"
                                    title="Reject"
                                    onClick={() => handleApproveReject(quotation, 'reject')}
                                  >
                                    <XCircle className="quotation-icon-sm" />
                                  </button>
                                </>
                              )}
                              <button className="quotation-button ghost icon-only" title="View Details">
                                <Edit3 className="quotation-icon-sm" />
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

      case 'add-comparison':
        return (
          <div className="quotation-space-y-4">
            <div className="quotation-card">
              <div className="quotation-card-header">
                <h3 className="quotation-card-title">
                  <Plus className="quotation-icon-sm" />
                  Warehouse Module: Add New Quotation Comparison
                </h3>
              </div>
              <div className="quotation-card-content quotation-space-y-6">
                {/* Basic Information */}
                <div className="quotation-form-grid">
                  <div className="quotation-space-y-4">
                    <div className="quotation-form-group">
                      <label className="quotation-form-label">RFQ Number</label>
                      <input
                        type="text"
                        className="quotation-form-input"
                        placeholder="Auto-generated if empty"
                        value={newComparison.rfqNo}
                        onChange={(e) => handleInputChange('rfqNo', e.target.value)}
                      />
                    </div>

                    <div className="quotation-form-group">
                      <label className="quotation-form-label">Item Name <span className="required">*</span></label>
                      <input
                        type="text"
                        className="quotation-form-input"
                        placeholder="Enter item name"
                        value={newComparison.itemName}
                        onChange={(e) => handleInputChange('itemName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="quotation-form-group">
                      <label className="quotation-form-label">Category</label>
                      <select
                        className="quotation-form-select"
                        value={newComparison.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Consumables">Consumables</option>
                        <option value="Safety">Safety Equipment</option>
                        <option value="Maintenance">Maintenance Items</option>
                        <option value="Tools">Tools & Accessories</option>
                      </select>
                    </div>
                  </div>

                  <div className="quotation-space-y-4">
                    <div className="quotation-form-group">
                      <label className="quotation-form-label">Quantity <span className="required">*</span></label>
                      <input
                        type="number"
                        className="quotation-form-input"
                        placeholder="Enter quantity"
                        value={newComparison.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="quotation-form-group">
                      <label className="quotation-form-label">Unit</label>
                      <select
                        className="quotation-form-select"
                        value={newComparison.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                      >
                        <option value="Pieces">Pieces</option>
                        <option value="Kg">Kilograms</option>
                        <option value="Liters">Liters</option>
                        <option value="Meters">Meters</option>
                        <option value="Sets">Sets</option>
                        <option value="Boxes">Boxes</option>
                        <option value="Rolls">Rolls</option>
                      </select>
                    </div>

                    <div className="quotation-form-group">
                      <label className="quotation-form-label">Required Date <span className="required">*</span></label>
                      <input
                        type="date"
                        className="quotation-form-input"
                        value={newComparison.requiredDate}
                        onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vendor Quotations Section */}
                <div className="quotation-border-t">
                  <h4 className="quotation-section-title">Vendor Quotations</h4>
                  
                  {newComparison.vendors.map((vendor, index) => (
                    <div key={index} className="quotation-vendor-card">
                      <div className="quotation-vendor-header">
                        <h5>Vendor {index + 1}</h5>
                      </div>
                      
                      <div className="quotation-form-grid">
                        <div className="quotation-form-group">
                          <label className="quotation-form-label">Vendor Name</label>
                          <input
                            type="text"
                            className="quotation-form-input"
                            placeholder="Enter vendor name"
                            value={vendor.name}
                            onChange={(e) => handleVendorChange(index, 'name', e.target.value)}
                          />
                        </div>

                        <div className="quotation-form-group">
                          <label className="quotation-form-label">Rate per Unit</label>
                          <input
                            type="number"
                            step="0.01"
                            className="quotation-form-input"
                            placeholder="Enter rate"
                            value={vendor.rate}
                            onChange={(e) => handleVendorChange(index, 'rate', e.target.value)}
                          />
                        </div>

                        <div className="quotation-form-group">
                          <label className="quotation-form-label">Delivery Days</label>
                          <input
                            type="number"
                            className="quotation-form-input"
                            placeholder="Days"
                            value={vendor.deliveryDays}
                            onChange={(e) => handleVendorChange(index, 'deliveryDays', e.target.value)}
                          />
                        </div>

                        <div className="quotation-form-group">
                          <label className="quotation-form-label">Quality Grade</label>
                          <select
                            className="quotation-form-select"
                            value={vendor.quality}
                            onChange={(e) => handleVendorChange(index, 'quality', e.target.value)}
                          >
                            <option value="Standard">Standard</option>
                            <option value="Grade A">Grade A</option>
                            <option value="Grade A+">Grade A+</option>
                            <option value="Premium">Premium</option>
                          </select>
                        </div>
                      </div>

                      {vendor.rate && newComparison.quantity && (
                        <div className="quotation-vendor-summary">
                          <strong>Total Amount: ₹{(parseFloat(vendor.rate) * parseFloat(newComparison.quantity)).toLocaleString()}</strong>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Comparison Notes */}
                <div className="quotation-form-group">
                  <label className="quotation-form-label">Comparison Notes</label>
                  <textarea
                    className="quotation-form-textarea"
                    rows={3}
                    placeholder="Enter any additional notes or observations"
                    value={newComparison.comparisonNote}
                    onChange={(e) => handleInputChange('comparisonNote', e.target.value)}
                  ></textarea>
                </div>

                {/* Best Vendor Preview */}
                {calculateBestVendor() && (
                  <div className="quotation-best-vendor-preview">
                    <h4>Best Vendor Analysis</h4>
                    <div className="quotation-best-vendor-card">
                      <p><strong>Recommended Vendor:</strong> {calculateBestVendor()?.name}</p>
                      <p><strong>Rate:</strong> ₹{calculateBestVendor()?.rate}/unit</p>
                      <p><strong>Total Amount:</strong> ₹{(parseFloat(calculateBestVendor()?.rate || '0') * parseFloat(newComparison.quantity || '0')).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="quotation-form-actions">
                  <button type="button" className="quotation-button primary" onClick={submitNewComparison}>
                    <Save className="quotation-icon-sm" />
                    Create Comparison
                  </button>
                  <button 
                    type="button" 
                    className="quotation-button outline"
                    onClick={() => setActiveTab('comparison-overview')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'comparison-reports':
        return (
          <div className="quotation-space-y-4">
            <div className="quotation-card">
              <div className="quotation-card-header">
                <h3 className="quotation-card-title">
                  <FileText className="quotation-icon-sm" />
                  Quotation Comparison Reports & Analytics
                </h3>
              </div>
              <div className="quotation-card-content quotation-space-y-4">
                <div className="quotation-reports-grid">
                  <div className="quotation-report-card">
                    <TrendingUp className="quotation-report-icon blue" />
                    <h3 className="quotation-report-title">Cost Savings Report</h3>
                    <p className="quotation-report-description">Generate cost analysis and savings report</p>
                    <button className="quotation-button outline small">
                      <Download className="quotation-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="quotation-report-card">
                    <Compare className="quotation-report-icon green" />
                    <h3 className="quotation-report-title">Vendor Comparison Matrix</h3>
                    <p className="quotation-report-description">Detailed vendor performance comparison</p>
                    <button className="quotation-button outline small">
                      <Download className="quotation-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="quotation-report-card">
                    <Clock className="quotation-report-icon orange" />
                    <h3 className="quotation-report-title">Delivery Analysis</h3>
                    <p className="quotation-report-description">Vendor delivery time performance analysis</p>
                    <button className="quotation-button outline small">
                      <Download className="quotation-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="quotation-report-card">
                    <ShoppingCart className="quotation-report-icon purple" />
                    <h3 className="quotation-report-title">Category-wise Report</h3>
                    <p className="quotation-report-description">Quotation analysis by item categories</p>
                    <button className="quotation-button outline small">
                      <Download className="quotation-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="quotation-stats-section">
                  <h4>Quick Statistics</h4>
                  <div className="quotation-stats-grid">
                    <div className="quotation-stat-item">
                      <span className="quotation-stat-label">Total Comparisons:</span>
                      <span className="quotation-stat-value">{quotationData.length}</span>
                    </div>
                    <div className="quotation-stat-item">
                      <span className="quotation-stat-label">Average Savings:</span>
                      <span className="quotation-stat-value">₹{Math.round(quotationData.reduce((total, q) => total + q.savingsAmount, 0) / quotationData.length).toLocaleString()}</span>
                    </div>
                    <div className="quotation-stat-item">
                      <span className="quotation-stat-label">Top Category:</span>
                      <span className="quotation-stat-value">Raw Materials</span>
                    </div>
                    <div className="quotation-stat-item">
                      <span className="quotation-stat-label">Approval Rate:</span>
                      <span className="quotation-stat-value">{Math.round((quotationData.filter(q => q.status === 'Approved').length / quotationData.length) * 100)}%</span>
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
    <div className="quotation-management-container">
      {/* Header */}
      <header className="quotation-header">
        <div className="quotation-header-content">
          <div className="quotation-header-info">
            <div className="quotation-header-icon">
              <Compare className="quotation-icon-lg" />
            </div>
            <div>
              <h1 className="quotation-header-title">Quotation Comparison</h1>
              <p className="quotation-header-subtitle">Warehouse Management & Organization</p>
            </div>
          </div>
        </div>
      </header>

      <div className="quotation-main-container">
        
        {/* Tab Navigation */}
        <div className="quotation-tab-navigation">
          <nav className="quotation-tab-nav">
            <div className="quotation-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`quotation-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="quotation-icon-sm" />
                  {tab.label}
                </button>
              ))}
            </div>
          </nav>
        </div>

        {/* Content Area */}
        {renderTabContent()}
      </div>

      {/* Approval/Rejection Modal */}
      {showComparisonModal && selectedQuotation && (
        <div className="quotation-modal-overlay">
          <div className="quotation-modal-content">
            <h3 className="quotation-modal-title">
              {selectedQuotation.action === 'approve' ? 'Approve' : 'Reject'} Quotation Comparison
            </h3>
            <div className="quotation-modal-info">
              <p><span>RFQ No.:</span> {selectedQuotation.rfqNo}</p>
              <p><span>Item:</span> {selectedQuotation.itemName}</p>
              <p><span>Best Vendor:</span> {selectedQuotation.bestVendor}</p>
              <p><span>Potential Savings:</span> ₹{selectedQuotation.savingsAmount.toLocaleString()}</p>
            </div>
            <div className="quotation-form-group">
              <label className="quotation-form-label">
                {selectedQuotation.action === 'approve' ? 'Approval' : 'Rejection'} Note
              </label>
              <textarea
                className="quotation-form-textarea"
                rows={3}
                placeholder={`Enter ${selectedQuotation.action === 'approve' ? 'approval' : 'rejection'} reason...`}
                value={comparisonNote}
                onChange={(e) => setComparisonNote(e.target.value)}
              ></textarea>
            </div>
            <div className="quotation-modal-buttons">
              <button 
                className={`quotation-button ${selectedQuotation.action === 'approve' ? 'success' : 'danger'}`}
                onClick={submitApproval}
              >
                {selectedQuotation.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
              <button 
                className="quotation-button outline"
                onClick={() => {
                  setShowComparisonModal(false);
                  setComparisonNote('');
                  setSelectedQuotation(null);
                }}
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
