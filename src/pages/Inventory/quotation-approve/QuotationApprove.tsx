import React, { useState } from 'react';
import './styles.css';

// Icon components (simplified SVG icons)
const CheckSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

const ClipboardCheck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
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

const User = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

export default function QuotationApprove() {
  const [activeTab, setActiveTab] = useState('approve-overview');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Sample quotation approval data
  const [quotationData, setQuotationData] = useState([
    {
      id: 1,
      quotationNo: 'QUO-2025-001',
      rfqNo: 'RFQ001',
      vendorName: 'Tata Steel Ltd.',
      itemName: 'Steel Rods 12mm',
      category: 'Raw Materials',
      quantity: 1000,
      unit: 'Pieces',
      ratePerUnit: 850,
      totalAmount: 850000,
      requestedBy: 'Rajesh Kumar',
      department: 'Warehouse',
      priority: 'High',
      deliveryDays: 15,
      qualityGrade: 'Grade A',
      status: 'Pending Approval',
      submittedDate: '2025-08-01',
      requiredDate: '2025-08-20',
      approverNote: '',
      specifications: 'High tensile strength steel rods, 12mm diameter, IS 1786:2008 compliant',
      terms: 'Payment: 30 days credit, Delivery: Ex-works, Warranty: 1 year'
    },
    {
      id: 2,
      quotationNo: 'QUO-2025-002',
      rfqNo: 'RFQ002',
      vendorName: 'ContiTech India',
      itemName: 'Heavy Duty Conveyor Belt',
      category: 'Equipment',
      quantity: 500,
      unit: 'Meters',
      ratePerUnit: 2500,
      totalAmount: 1250000,
      requestedBy: 'Priya Sharma',
      department: 'Production',
      priority: 'Medium',
      deliveryDays: 30,
      qualityGrade: 'Premium',
      status: 'Approved',
      submittedDate: '2025-07-25',
      requiredDate: '2025-08-25',
      approverNote: 'Approved after technical evaluation. Good vendor performance history.',
      specifications: 'Belt width: 1200mm, Ply rating: EP315/3, Temperature rating: -40°C to +120°C',
      terms: 'Payment: 45 days credit, Installation support included, Warranty: 2 years'
    },
    {
      id: 3,
      quotationNo: 'QUO-2025-003',
      rfqNo: 'RFQ003',
      vendorName: 'Shell India',
      itemName: 'Industrial Lubricants',
      category: 'Consumables',
      quantity: 200,
      unit: 'Liters',
      ratePerUnit: 480,
      totalAmount: 96000,
      requestedBy: 'Amit Singh',
      department: 'Maintenance',
      priority: 'Low',
      deliveryDays: 5,
      qualityGrade: 'Premium',
      status: 'Rejected',
      submittedDate: '2025-08-05',
      requiredDate: '2025-08-15',
      approverNote: 'Price too high compared to market rates. Alternative vendor selected.',
      specifications: 'Viscosity: ISO VG 46, API classification: GL-4, Operating temp: -20°C to +150°C',
      terms: 'Payment: 15 days credit, Bulk discount available, Technical support included'
    },
    {
      id: 4,
      quotationNo: 'QUO-2025-004',
      rfqNo: 'RFQ004',
      vendorName: 'Honeywell Safety',
      itemName: 'Safety Equipment Set',
      category: 'Safety',
      quantity: 50,
      unit: 'Sets',
      ratePerUnit: 1050,
      totalAmount: 52500,
      requestedBy: 'Suresh Patel',
      department: 'Safety',
      priority: 'High',
      deliveryDays: 18,
      qualityGrade: 'Standard',
      status: 'Under Review',
      submittedDate: '2025-07-30',
      requiredDate: '2025-08-12',
      approverNote: '',
      specifications: 'Complete PPE set: Helmet, Safety goggles, Gloves, Safety shoes, Reflective jacket',
      terms: 'Payment: 30 days credit, Training included, Compliance certificates provided'
    },
    {
      id: 5,
      quotationNo: 'QUO-2025-005',
      rfqNo: 'RFQ005',
      vendorName: 'Bharat Petroleum',
      itemName: 'Diesel Fuel',
      category: 'Fuel',
      quantity: 5000,
      unit: 'Liters',
      ratePerUnit: 89.50,
      totalAmount: 447500,
      requestedBy: 'Vikash Kumar',
      department: 'Operations',
      priority: 'High',
      deliveryDays: 2,
      qualityGrade: 'Standard',
      status: 'Pending Approval',
      submittedDate: '2025-08-07',
      requiredDate: '2025-08-10',
      approverNote: '',
      specifications: 'High Speed Diesel (HSD), BS-VI compliant, Sulphur content <10 ppm',
      terms: 'Payment: Advance payment, Delivery at site, Quality certificate provided'
    }
  ]);

  // New quotation approval form data
  const [newApproval, setNewApproval] = useState({
    quotationNo: '',
    rfqNo: '',
    vendorName: '',
    itemName: '',
    category: 'Raw Materials',
    quantity: '',
    unit: 'Pieces',
    ratePerUnit: '',
    requestedBy: '',
    department: 'Warehouse',
    priority: 'Medium',
    deliveryDays: '',
    qualityGrade: 'Standard',
    requiredDate: '',
    specifications: '',
    terms: '',
    approverNote: ''
  });

  const tabs = [
    {
      id: 'approve-overview',
      label: 'Approval Overview',
      icon: CheckSquare,
    },
    {
      id: 'add-approval',
      label: 'Add New Quotation',
      icon: Plus,
    },
    {
      id: 'approval-reports',
      label: 'Reports & Analytics',
      icon: FileText,
    },
  ];

  const handleApproveReject = (quotation: any, action: 'approve' | 'reject') => {
    setSelectedQuotation({ ...quotation, action });
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (selectedQuotation && selectedQuotation.action) {
      const updatedStatus = selectedQuotation.action === 'approve' ? 'Approved' : 'Rejected';
      
      setQuotationData(prev => 
        prev.map(q => 
          q.id === selectedQuotation.id
            ? { ...q, status: updatedStatus, approverNote: approvalNote }
            : q
        )
      );
      setShowApprovalModal(false);
      setApprovalNote('');
      setSelectedQuotation(null);
      alert(`Quotation ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewApproval(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateTotalAmount = () => {
    const rate = parseFloat(newApproval.ratePerUnit || '0');
    const qty = parseFloat(newApproval.quantity || '0');
    return rate * qty;
  };

  const submitNewApproval = () => {
    if (!newApproval.quotationNo || !newApproval.vendorName || !newApproval.itemName) {
      alert('Please fill all required fields');
      return;
    }

    const newQuotation = {
      id: quotationData.length + 1,
      quotationNo: newApproval.quotationNo,
      rfqNo: newApproval.rfqNo || `RFQ${String(quotationData.length + 1).padStart(3, '0')}`,
      vendorName: newApproval.vendorName,
      itemName: newApproval.itemName,
      category: newApproval.category,
      quantity: parseInt(newApproval.quantity),
      unit: newApproval.unit,
      ratePerUnit: parseFloat(newApproval.ratePerUnit),
      totalAmount: calculateTotalAmount(),
      requestedBy: newApproval.requestedBy || 'Current User',
      department: newApproval.department,
      priority: newApproval.priority,
      deliveryDays: parseInt(newApproval.deliveryDays || '0'),
      qualityGrade: newApproval.qualityGrade,
      status: 'Pending Approval',
      submittedDate: new Date().toISOString().split('T')[0],
      requiredDate: newApproval.requiredDate,
      approverNote: '',
      specifications: newApproval.specifications,
      terms: newApproval.terms
    };

    setQuotationData(prev => [...prev, newQuotation]);
    
    // Reset form
    setNewApproval({
      quotationNo: '',
      rfqNo: '',
      vendorName: '',
      itemName: '',
      category: 'Raw Materials',
      quantity: '',
      unit: 'Pieces',
      ratePerUnit: '',
      requestedBy: '',
      department: 'Warehouse',
      priority: 'Medium',
      deliveryDays: '',
      qualityGrade: 'Standard',
      requiredDate: '',
      specifications: '',
      terms: '',
      approverNote: ''
    });

    alert('Quotation submitted for approval successfully!');
    setActiveTab('approve-overview');
  };

  const viewQuotationDetails = (quotation: any) => {
    setSelectedQuotation(quotation);
    setShowDetailsModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'approve-overview':
        return (
          <div className="approve-space-y-4">
            {/* Summary Cards */}
            <div className="approve-grid-4">
              <div className="approve-card">
                <div className="approve-summary-card">
                  <div className="approve-summary-content">
                    <div className="approve-summary-icon pending">
                      <AlertCircle className="approve-icon-lg" />
                    </div>
                    <div>
                      <p className="approve-summary-text">Pending Approval</p>
                      <p className="approve-summary-number pending">
                        {quotationData.filter(q => q.status === 'Pending Approval').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="approve-card">
                <div className="approve-summary-card">
                  <div className="approve-summary-content">
                    <div className="approve-summary-icon approved">
                      <CheckCircle className="approve-icon-lg" />
                    </div>
                    <div>
                      <p className="approve-summary-text">Approved</p>
                      <p className="approve-summary-number approved">
                        {quotationData.filter(q => q.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="approve-card">
                <div className="approve-summary-card">
                  <div className="approve-summary-content">
                    <div className="approve-summary-icon rejected">
                      <XCircle className="approve-icon-lg" />
                    </div>
                    <div>
                      <p className="approve-summary-text">Rejected</p>
                      <p className="approve-summary-number rejected">
                        {quotationData.filter(q => q.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="approve-card">
                <div className="approve-summary-card">
                  <div className="approve-summary-content">
                    <div className="approve-summary-icon total">
                      <DollarSign className="approve-icon-lg" />
                    </div>
                    <div>
                      <p className="approve-summary-text">Total Value</p>
                      <p className="approve-summary-number total">
                        ₹{quotationData.filter(q => q.status === 'Approved').reduce((total, q) => total + q.totalAmount, 0).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotation Approval Table */}
            <div className="approve-card">
              <div className="approve-card-header">
                <h3 className="approve-card-title">
                  <ClipboardCheck className="approve-icon-sm" />
                  Quotation Approval Records
                </h3>
              </div>
              <div className="approve-card-content">
                <div className="approve-table-container">
                  <table className="approve-table">
                    <thead className="approve-table-header">
                      <tr>
                        <th>Quotation No.</th>
                        <th>Vendor</th>
                        <th>Item Name</th>
                        <th>Category</th>
                        <th>Total Amount</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Required Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationData.map((quotation) => (
                        <tr key={quotation.id} className="approve-table-row">
                          <td className="approve-table-cell quo-no">{quotation.quotationNo}</td>
                          <td className="approve-table-cell name">{quotation.vendorName}</td>
                          <td className="approve-table-cell truncate">{quotation.itemName}</td>
                          <td className="approve-table-cell">
                            <span className={`approve-badge category ${quotation.category.toLowerCase().replace(' ', '-')}`}>
                              {quotation.category}
                            </span>
                          </td>
                          <td className="approve-table-cell center">₹{quotation.totalAmount.toLocaleString()}</td>
                          <td className="approve-table-cell">
                            <span className={`approve-badge priority ${quotation.priority.toLowerCase()}`}>
                              {quotation.priority}
                            </span>
                          </td>
                          <td className="approve-table-cell">
                            <span className={`approve-badge status ${quotation.status.toLowerCase().replace(' ', '-')}`}>
                              {quotation.status}
                            </span>
                          </td>
                          <td className="approve-table-cell small">{quotation.requiredDate}</td>
                          <td className="approve-table-cell">
                            <div className="approve-flex approve-flex-gap-1">
                              {(quotation.status === 'Pending Approval' || quotation.status === 'Under Review') && (
                                <>
                                  <button 
                                    className="approve-button success icon-only"
                                    title="Approve"
                                    onClick={() => handleApproveReject(quotation, 'approve')}
                                  >
                                    <CheckCircle className="approve-icon-sm" />
                                  </button>
                                  <button 
                                    className="approve-button danger icon-only"
                                    title="Reject"
                                    onClick={() => handleApproveReject(quotation, 'reject')}
                                  >
                                    <XCircle className="approve-icon-sm" />
                                  </button>
                                </>
                              )}
                              <button 
                                className="approve-button ghost icon-only" 
                                title="View Details"
                                onClick={() => viewQuotationDetails(quotation)}
                              >
                                <Edit3 className="approve-icon-sm" />
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

      case 'add-approval':
        return (
          <div className="approve-space-y-4">
            <div className="approve-card">
              <div className="approve-card-header">
                <h3 className="approve-card-title">
                  <Plus className="approve-icon-sm" />
                  Warehouse Module: Add New Quotation for Approval
                </h3>
              </div>
              <div className="approve-card-content approve-space-y-6">
                {/* Basic Information */}
                <div className="approve-form-grid">
                  <div className="approve-space-y-4">
                    <div className="approve-form-group">
                      <label className="approve-form-label">Quotation Number <span className="required">*</span></label>
                      <input
                        type="text"
                        className="approve-form-input"
                        placeholder="Enter quotation number"
                        value={newApproval.quotationNo}
                        onChange={(e) => handleInputChange('quotationNo', e.target.value)}
                        required
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">RFQ Reference</label>
                      <input
                        type="text"
                        className="approve-form-input"
                        placeholder="Enter RFQ number"
                        value={newApproval.rfqNo}
                        onChange={(e) => handleInputChange('rfqNo', e.target.value)}
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Vendor Name <span className="required">*</span></label>
                      <input
                        type="text"
                        className="approve-form-input"
                        placeholder="Enter vendor name"
                        value={newApproval.vendorName}
                        onChange={(e) => handleInputChange('vendorName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Item Name <span className="required">*</span></label>
                      <input
                        type="text"
                        className="approve-form-input"
                        placeholder="Enter item name"
                        value={newApproval.itemName}
                        onChange={(e) => handleInputChange('itemName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Category</label>
                      <select
                        className="approve-form-select"
                        value={newApproval.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                      >
                        <option value="Raw Materials">Raw Materials</option>
                        <option value="Equipment">Equipment</option>
                        <option value="Consumables">Consumables</option>
                        <option value="Safety">Safety Equipment</option>
                        <option value="Maintenance">Maintenance Items</option>
                        <option value="Tools">Tools & Accessories</option>
                        <option value="Fuel">Fuel & Energy</option>
                      </select>
                    </div>
                  </div>

                  <div className="approve-space-y-4">
                    <div className="approve-form-group">
                      <label className="approve-form-label">Quantity <span className="required">*</span></label>
                      <input
                        type="number"
                        className="approve-form-input"
                        placeholder="Enter quantity"
                        value={newApproval.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        required
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Unit</label>
                      <select
                        className="approve-form-select"
                        value={newApproval.unit}
                        onChange={(e) => handleInputChange('unit', e.target.value)}
                      >
                        <option value="Pieces">Pieces</option>
                        <option value="Kg">Kilograms</option>
                        <option value="Liters">Liters</option>
                        <option value="Meters">Meters</option>
                        <option value="Sets">Sets</option>
                        <option value="Boxes">Boxes</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Tons">Tons</option>
                      </select>
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Rate per Unit <span className="required">*</span></label>
                      <input
                        type="number"
                        step="0.01"
                        className="approve-form-input"
                        placeholder="Enter rate per unit"
                        value={newApproval.ratePerUnit}
                        onChange={(e) => handleInputChange('ratePerUnit', e.target.value)}
                        required
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Total Amount</label>
                      <input
                        type="text"
                        className="approve-form-input readonly"
                        value={`₹${calculateTotalAmount().toLocaleString()}`}
                        readOnly
                      />
                    </div>

                    <div className="approve-form-group">
                      <label className="approve-form-label">Required Date <span className="required">*</span></label>
                      <input
                        type="date"
                        className="approve-form-input"
                        value={newApproval.requiredDate}
                        onChange={(e) => handleInputChange('requiredDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Details Section */}
                <div className="approve-border-t">
                  <h4 className="approve-section-title">Additional Details</h4>
                  
                  <div className="approve-form-grid">
                    <div className="approve-space-y-4">
                      <div className="approve-form-group">
                        <label className="approve-form-label">Requested By</label>
                        <input
                          type="text"
                          className="approve-form-input"
                          placeholder="Enter requester name"
                          value={newApproval.requestedBy}
                          onChange={(e) => handleInputChange('requestedBy', e.target.value)}
                        />
                      </div>

                      <div className="approve-form-group">
                        <label className="approve-form-label">Department</label>
                        <select
                          className="approve-form-select"
                          value={newApproval.department}
                          onChange={(e) => handleInputChange('department', e.target.value)}
                        >
                          <option value="Warehouse">Warehouse</option>
                          <option value="Production">Production</option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="Safety">Safety</option>
                          <option value="Operations">Operations</option>
                          <option value="Quality Control">Quality Control</option>
                        </select>
                      </div>

                      <div className="approve-form-group">
                        <label className="approve-form-label">Priority</label>
                        <select
                          className="approve-form-select"
                          value={newApproval.priority}
                          onChange={(e) => handleInputChange('priority', e.target.value)}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Critical">Critical</option>
                        </select>
                      </div>
                    </div>

                    <div className="approve-space-y-4">
                      <div className="approve-form-group">
                        <label className="approve-form-label">Delivery Days</label>
                        <input
                          type="number"
                          className="approve-form-input"
                          placeholder="Expected delivery days"
                          value={newApproval.deliveryDays}
                          onChange={(e) => handleInputChange('deliveryDays', e.target.value)}
                        />
                      </div>

                      <div className="approve-form-group">
                        <label className="approve-form-label">Quality Grade</label>
                        <select
                          className="approve-form-select"
                          value={newApproval.qualityGrade}
                          onChange={(e) => handleInputChange('qualityGrade', e.target.value)}
                        >
                          <option value="Standard">Standard</option>
                          <option value="Grade A">Grade A</option>
                          <option value="Grade A+">Grade A+</option>
                          <option value="Premium">Premium</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                <div className="approve-form-group">
                  <label className="approve-form-label">Item Specifications</label>
                  <textarea
                    className="approve-form-textarea"
                    rows={3}
                    placeholder="Enter detailed specifications, technical requirements, standards, etc."
                    value={newApproval.specifications}
                    onChange={(e) => handleInputChange('specifications', e.target.value)}
                  ></textarea>
                </div>

                {/* Terms and Conditions */}
                <div className="approve-form-group">
                  <label className="approve-form-label">Terms & Conditions</label>
                  <textarea
                    className="approve-form-textarea"
                    rows={3}
                    placeholder="Enter payment terms, warranty, delivery conditions, etc."
                    value={newApproval.terms}
                    onChange={(e) => handleInputChange('terms', e.target.value)}
                  ></textarea>
                </div>

                {/* Form Actions */}
                <div className="approve-form-actions">
                  <button type="button" className="approve-button primary" onClick={submitNewApproval}>
                    <Save className="approve-icon-sm" />
                    Submit for Approval
                  </button>
                  <button 
                    type="button" 
                    className="approve-button outline"
                    onClick={() => setActiveTab('approve-overview')}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'approval-reports':
        return (
          <div className="approve-space-y-4">
            <div className="approve-card">
              <div className="approve-card-header">
                <h3 className="approve-card-title">
                  <FileText className="approve-icon-sm" />
                  Quotation Approval Reports & Analytics
                </h3>
              </div>
              <div className="approve-card-content approve-space-y-4">
                <div className="approve-reports-grid">
                  <div className="approve-report-card">
                    <TrendingUp className="approve-report-icon blue" />
                    <h3 className="approve-report-title">Approval Trends</h3>
                    <p className="approve-report-description">Monthly approval trends and patterns</p>
                    <button className="approve-button outline small">
                      <Download className="approve-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="approve-report-card">
                    <User className="approve-report-icon green" />
                    <h3 className="approve-report-title">Vendor Performance</h3>
                    <p className="approve-report-description">Vendor approval rates and performance metrics</p>
                    <button className="approve-button outline small">
                      <Download className="approve-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="approve-report-card">
                    <DollarSign className="approve-report-icon purple" />
                    <h3 className="approve-report-title">Financial Summary</h3>
                    <p className="approve-report-description">Approved quotation values and budget analysis</p>
                    <button className="approve-button outline small">
                      <Download className="approve-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="approve-report-card">
                    <Clock className="approve-report-icon orange" />
                    <h3 className="approve-report-title">Processing Time Analysis</h3>
                    <p className="approve-report-description">Average approval processing time metrics</p>
                    <button className="approve-button outline small">
                      <Download className="approve-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="approve-stats-section">
                  <h4>Quick Statistics</h4>
                  <div className="approve-stats-grid">
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Total Quotations:</span>
                      <span className="approve-stat-value">{quotationData.length}</span>
                    </div>
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Approval Rate:</span>
                      <span className="approve-stat-value">{Math.round((quotationData.filter(q => q.status === 'Approved').length / quotationData.length) * 100)}%</span>
                    </div>
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Average Value:</span>
                      <span className="approve-stat-value">₹{Math.round(quotationData.reduce((total, q) => total + q.totalAmount, 0) / quotationData.length).toLocaleString()}</span>
                    </div>
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Top Category:</span>
                      <span className="approve-stat-value">Raw Materials</span>
                    </div>
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Pending Reviews:</span>
                      <span className="approve-stat-value">{quotationData.filter(q => q.status === 'Pending Approval' || q.status === 'Under Review').length}</span>
                    </div>
                    <div className="approve-stat-item">
                      <span className="approve-stat-label">Highest Priority:</span>
                      <span className="approve-stat-value">{quotationData.filter(q => q.priority === 'High' || q.priority === 'Critical').length}</span>
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
    <div className="approve-management-container">
      {/* Header */}
      <header className="approve-header">
        <div className="approve-header-content">
          <div className="approve-header-info">
            <div className="approve-header-icon">
              <CheckSquare className="approve-icon-lg" />
            </div>
            <div>
              <h1 className="approve-header-title">Quotation Approve</h1>
              <p className="approve-header-subtitle">Warehouse Management & Organization</p>
            </div>
          </div>
        </div>
      </header>

      <div className="approve-main-container">
        
        {/* Tab Navigation */}
        <div className="approve-tab-navigation">
          <nav className="approve-tab-nav">
            <div className="approve-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`approve-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="approve-icon-sm" />
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
      {showApprovalModal && selectedQuotation && (
        <div className="approve-modal-overlay">
          <div className="approve-modal-content">
            <h3 className="approve-modal-title">
              {selectedQuotation.action === 'approve' ? 'Approve' : 'Reject'} Quotation
            </h3>
            <div className="approve-modal-info">
              <p><span>Quotation No.:</span> {selectedQuotation.quotationNo}</p>
              <p><span>Vendor:</span> {selectedQuotation.vendorName}</p>
              <p><span>Item:</span> {selectedQuotation.itemName}</p>
              <p><span>Total Amount:</span> ₹{selectedQuotation.totalAmount.toLocaleString()}</p>
              <p><span>Priority:</span> {selectedQuotation.priority}</p>
            </div>
            <div className="approve-form-group">
              <label className="approve-form-label">
                {selectedQuotation.action === 'approve' ? 'Approval' : 'Rejection'} Note
              </label>
              <textarea
                className="approve-form-textarea"
                rows={3}
                placeholder={`Enter ${selectedQuotation.action === 'approve' ? 'approval' : 'rejection'} reason...`}
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
              ></textarea>
            </div>
            <div className="approve-modal-buttons">
              <button 
                className={`approve-button ${selectedQuotation.action === 'approve' ? 'success' : 'danger'}`}
                onClick={submitApproval}
              >
                {selectedQuotation.action === 'approve' ? 'Approve' : 'Reject'}
              </button>
              <button 
                className="approve-button outline"
                onClick={() => {
                  setShowApprovalModal(false);
                  setApprovalNote('');
                  setSelectedQuotation(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedQuotation && (
        <div className="approve-modal-overlay">
          <div className="approve-modal-content large">
            <h3 className="approve-modal-title">Quotation Details</h3>
            <div className="approve-details-grid">
              <div className="approve-details-section">
                <h4>Basic Information</h4>
                <p><span>Quotation No.:</span> {selectedQuotation.quotationNo}</p>
                <p><span>RFQ No.:</span> {selectedQuotation.rfqNo}</p>
                <p><span>Vendor:</span> {selectedQuotation.vendorName}</p>
                <p><span>Item:</span> {selectedQuotation.itemName}</p>
                <p><span>Category:</span> {selectedQuotation.category}</p>
              </div>
              
              <div className="approve-details-section">
                <h4>Pricing & Delivery</h4>
                <p><span>Quantity:</span> {selectedQuotation.quantity} {selectedQuotation.unit}</p>
                <p><span>Rate per Unit:</span> ₹{selectedQuotation.ratePerUnit}</p>
                <p><span>Total Amount:</span> ₹{selectedQuotation.totalAmount.toLocaleString()}</p>
                <p><span>Delivery Days:</span> {selectedQuotation.deliveryDays} days</p>
                <p><span>Quality Grade:</span> {selectedQuotation.qualityGrade}</p>
              </div>
            </div>
            
            <div className="approve-details-section">
              <h4>Specifications</h4>
              <p>{selectedQuotation.specifications || 'No specifications provided'}</p>
            </div>
            
            <div className="approve-details-section">
              <h4>Terms & Conditions</h4>
              <p>{selectedQuotation.terms || 'No terms specified'}</p>
            </div>
            
            {selectedQuotation.approverNote && (
              <div className="approve-details-section">
                <h4>Approver Note</h4>
                <p>{selectedQuotation.approverNote}</p>
              </div>
            )}
            
            <div className="approve-modal-buttons">
              <button 
                className="approve-button outline"
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedQuotation(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
