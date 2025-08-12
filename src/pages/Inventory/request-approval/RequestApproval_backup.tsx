import React, { useState } from 'react';
import './RequestApproval.css';

// Icon components (simplified SVG icons)
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
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

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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

const Download = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM21 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const DollarSign = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

export default function RequestApproval() {
  const [activeTab, setActiveTab] = useState('supplier-overview');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [approvalNote, setApprovalNote] = useState('');

  // New supplier request form data
  const [newSupplier, setNewSupplier] = useState({
    requestNo: `SUP-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: 'Heavy Machinery',
    location: '',
    gstNo: '',
    panNo: '',
    rating: 0,
    creditLimit: '',
    paymentTerms: 'NET 30',
    status: 'Pending',
    requestDate: new Date().toISOString().split('T')[0],
    requesterName: '',
    department: 'Procurement',
    approverNote: '',
    establishedYear: '',
    businessType: 'Manufacturing',
    certifications: '',
    bankDetails: '',
    previousExperience: ''
  });

  const tabs = [
    { id: 'supplier-overview', label: 'Supplier Overview', icon: Users },
    { id: 'add-supplier', label: 'Add Supplier Request', icon: Plus },
    { id: 'reports-analytics', label: 'Reports & Analytics', icon: FileText }
  ];

  const supplierCategories = [
    'Heavy Machinery',
    'Safety Equipment',
    'Explosives',
    'Conveyor Systems',
    'Electrical Equipment',
    'Maintenance Services',
    'Transportation',
    'Construction Materials',
    'Spare Parts',
    'Fuel & Lubricants',
    'IT & Technology'
  ];

  const departments = [
    'Procurement',
    'Safety',
    'Mining Operations',
    'Maintenance',
    'Finance',
    'Administration',
    'Quality Control',
    'Environmental'
  ];

  const businessTypes = [
    'Manufacturing',
    'Trading',
    'Service Provider',
    'Distributor',
    'Contractor'
  ];

  const paymentTermsOptions = [
    'NET 15',
    'NET 30',
    'NET 45',
    'NET 60',
    'COD',
    'Advance Payment'
  ];

  // Sample supplier request data
  const [supplierData, setSupplierData] = useState([
    {
      id: 1,
      requestNo: 'SUP-2025-001',
      companyName: 'TIWARI HEAVY MACHINERY PVT LTD',
      contactPerson: 'RAJESH TIWARI',
      phone: '+91 9876543210',
      email: 'contact@tiwariheavy.com',
      category: 'Heavy Machinery',
      location: 'RAIPUR, CHHATTISGARH',
      gstNo: '22ABCDE1234F1Z5',
      panNo: 'ABCDE1234F',
      rating: 4.5,
      creditLimit: 500000,
      paymentTerms: 'NET 30',
      status: 'Pending',
      requestDate: '2025-07-14',
      requesterName: 'PROCUREMENT MANAGER',
      department: 'Procurement',
      approverNote: '',
      establishedYear: '2010',
      businessType: 'Manufacturing',
      certifications: 'ISO 9001:2015, CE',
      bankDetails: 'HDFC BANK - RAIPUR BRANCH',
      previousExperience: '15+ Years in Mining Equipment'
    },
    {
      id: 2,
      requestNo: 'SUP-2025-002',
      companyName: 'SAFETY EQUIPMENT SUPPLIERS',
      contactPerson: 'KUMAR INDUSTRIES',
      phone: '+91 9876543211',
      email: 'safety@kumarindustries.com',
      category: 'Safety Equipment',
      location: 'NAGPUR, MAHARASHTRA',
      gstNo: '27FGHIJ5678G2A8',
      panNo: 'FGHIJ5678G',
      rating: 4.2,
      creditLimit: 200000,
      paymentTerms: 'NET 15',
      status: 'Approved',
      requestDate: '2025-07-13',
      requesterName: 'SAFETY OFFICER',
      department: 'Safety',
      approverNote: 'Good track record with safety equipment supply',
      establishedYear: '2015',
      businessType: 'Trading',
      certifications: 'ISI, BIS',
      bankDetails: 'SBI - NAGPUR MAIN BRANCH',
      previousExperience: '10+ Years in Industrial Safety'
    },
    {
      id: 3,
      requestNo: 'SUP-2025-003',
      companyName: 'EXPLOSIVE MATERIALS CO.',
      contactPerson: 'MINING EXPLOSIVES LTD',
      phone: '+91 9876543212',
      email: 'explosives@miningexp.com',
      category: 'Explosives',
      location: 'DHANBAD, JHARKHAND',
      gstNo: '20KLMNO9012H3B9',
      panNo: 'KLMNO9012H',
      rating: 4.8,
      creditLimit: 1000000,
      paymentTerms: 'NET 21',
      status: 'Under Review',
      requestDate: '2025-07-12',
      requesterName: 'BLAST ENGINEER',
      department: 'Mining Operations',
      approverNote: 'Requires additional safety compliance verification',
      establishedYear: '2005',
      businessType: 'Manufacturing',
      certifications: 'PESO License, ISO 9001:2015',
      bankDetails: 'AXIS BANK - DHANBAD BRANCH',
      previousExperience: '20+ Years in Mining Explosives'
    },
    {
      id: 4,
      requestNo: 'SUP-2025-004',
      companyName: 'CONVEYOR BELT SYSTEMS',
      contactPerson: 'BELT TECH SOLUTIONS',
      phone: '+91 9876543213',
      email: 'belts@belttech.com',
      category: 'Conveyor Systems',
      location: 'KOLKATA, WEST BENGAL',
      gstNo: '19PQRST3456I4C1',
      panNo: 'PQRST3456I',
      rating: 4.1,
      creditLimit: 300000,
      paymentTerms: 'NET 45',
      status: 'Rejected',
      requestDate: '2025-07-11',
      requesterName: 'MAINTENANCE HEAD',
      department: 'Maintenance',
      approverNote: 'Insufficient experience with mining grade conveyor systems',
      establishedYear: '2018',
      businessType: 'Service Provider',
      certifications: 'ISO 9001:2015',
      bankDetails: 'ICICI BANK - KOLKATA BRANCH',
      previousExperience: '7+ Years in Industrial Conveyors'
    }
  ]);

  // New supplier request form data
  const [newSupplier, setNewSupplier] = useState({
    requestNo: `SUP-2025-${String(Date.now()).slice(-3).padStart(3, '0')}`,
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: '',
    location: '',
    gstNo: '',
    panNo: '',
    rating: 0,
    creditLimit: 0,
    paymentTerms: 'NET 30',
    status: 'Pending',
    requestDate: new Date().toISOString().split('T')[0],
    requesterName: '',
    department: '',
    approverNote: '',
    establishedYear: '',
    businessType: '',
    certifications: '',
    bankDetails: '',
    previousExperience: ''
  });

  const tabs = [
    { id: 'supplier-overview', label: 'Supplier Overview', icon: Users },
    { id: 'add-supplier', label: 'Add Supplier Request', icon: Plus },
    { id: 'supplier-reports', label: 'Reports & Analytics', icon: FileText }
  ];

  const supplierCategories = [
    'Heavy Machinery',
    'Safety Equipment',
    'Explosives',
    'Conveyor Systems',
    'Electrical Equipment',
    'Maintenance Services',
    'Transportation',
    'Construction Materials',
    'PPE & Safety',
    'Spare Parts',
    'Fuel & Lubricants',
    'IT & Technology'
  ];

  const businessTypes = [
    'Manufacturing',
    'Trading',
    'Service Provider',
    'Distributor',
    'Importer',
    'Contractor'
  ];

  const paymentTermOptions = [
    'NET 15',
    'NET 21',
    'NET 30',
    'NET 45',
    'NET 60',
    'Advance Payment',
    'COD'
  ];

  const departments = [
    'Procurement',
    'Safety',
    'Mining Operations',
    'Maintenance',
    'Quality Control',
    'Finance',
    'Administration',
    'Production'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setNewSupplier(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleApproveReject = (supplier: any, action: 'approve' | 'reject') => {
    setSelectedRequest({ ...supplier, action });
    setShowApprovalModal(true);
  };

  const submitApproval = () => {
    if (selectedRequest) {
      const updatedStatus = selectedRequest.action === 'approve' ? 'Approved' : 'Rejected';
      
      setSupplierData(prevData =>
        prevData.map(supplier =>
          supplier.id === selectedRequest.id
            ? { 
                ...supplier, 
                status: updatedStatus, 
                approverNote: approvalNote 
              }
            : supplier
        )
      );
      
      setShowApprovalModal(false);
      setApprovalNote('');
      setSelectedRequest(null);
      alert(`Supplier request ${updatedStatus.toLowerCase()} successfully!`);
    }
  };

  const handleSaveSupplier = () => {
    const newId = Math.max(...supplierData.map(s => s.id)) + 1;
    const supplierToAdd = { ...newSupplier, id: newId };
    
    setSupplierData(prevData => [...prevData, supplierToAdd]);
    
    // Reset form
    setNewSupplier({
      requestNo: `SUP-2025-${String(Date.now()).slice(-3).padStart(3, '0')}`,
      companyName: '',
      contactPerson: '',
      phone: '',
      email: '',
      category: '',
      location: '',
      gstNo: '',
      panNo: '',
      rating: 0,
      creditLimit: 0,
      paymentTerms: 'NET 30',
      status: 'Pending',
      requestDate: new Date().toISOString().split('T')[0],
      requesterName: '',
      department: '',
      approverNote: '',
      establishedYear: '',
      businessType: '',
      certifications: '',
      bankDetails: '',
      previousExperience: ''
    });
    
    alert('Supplier request submitted successfully!');
    setActiveTab('supplier-overview');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'supplier-overview':
        return (
          <div className="supplier-space-y-4">
            {/* Supplier Summary Cards */}
            <div className="supplier-grid-4">
              <div className="supplier-card">
                <div className="supplier-summary-card">
                  <div className="supplier-summary-content">
                    <div className="supplier-summary-icon pending">
                      <AlertCircle className="supplier-icon-lg" />
                    </div>
                    <div>
                      <p className="supplier-summary-text">Pending Requests</p>
                      <p className="supplier-summary-number pending">
                        {supplierData.filter(supplier => supplier.status === 'Pending').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="supplier-card">
                <div className="supplier-summary-card">
                  <div className="supplier-summary-content">
                    <div className="supplier-summary-icon approved">
                      <CheckCircle className="supplier-icon-lg" />
                    </div>
                    <div>
                      <p className="supplier-summary-text">Approved Suppliers</p>
                      <p className="supplier-summary-number approved">
                        {supplierData.filter(supplier => supplier.status === 'Approved').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="supplier-card">
                <div className="supplier-summary-card">
                  <div className="supplier-summary-content">
                    <div className="supplier-summary-icon rejected">
                      <XCircle className="supplier-icon-lg" />
                    </div>
                    <div>
                      <p className="supplier-summary-text">Rejected Requests</p>
                      <p className="supplier-summary-number rejected">
                        {supplierData.filter(supplier => supplier.status === 'Rejected').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="supplier-card">
                <div className="supplier-summary-card">
                  <div className="supplier-summary-content">
                    <div className="supplier-summary-icon total">
                      <Users className="supplier-icon-lg" />
                    </div>
                    <div>
                      <p className="supplier-summary-text">Total Requests</p>
                      <p className="supplier-summary-number total">{supplierData.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplier Requests Table */}
            <div className="supplier-card">
              <div className="supplier-card-header">
                <h3 className="supplier-card-title">
                  <Users className="supplier-icon-sm" />
                  Supplier Requests - {new Date().getFullYear()}
                </h3>
                <button 
                  className="supplier-button primary small"
                  onClick={() => setActiveTab('add-supplier')}
                >
                  <Plus className="supplier-icon-sm" />
                  Add Supplier Request
                </button>
              </div>
              <div className="supplier-card-content" style={{ padding: 0 }}>
                <div className="supplier-table-container">
                  <table className="supplier-table">
                    <thead className="supplier-table-header">
                      <tr>
                        <th>Request No</th>
                        <th>Company Name</th>
                        <th>Contact Person</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th>Credit Limit</th>
                        <th>Status</th>
                        <th>Request Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {supplierData.map((supplier, index) => (
                        <tr key={supplier.id} className="supplier-table-row">
                          <td className="supplier-table-cell request-no">{supplier.requestNo}</td>
                          <td className="supplier-table-cell company-name">{supplier.companyName}</td>
                          <td className="supplier-table-cell">{supplier.contactPerson}</td>
                          <td className="supplier-table-cell">
                            <span className="supplier-badge category">
                              {supplier.category}
                            </span>
                          </td>
                          <td className="supplier-table-cell location">{supplier.location}</td>
                          <td className="supplier-table-cell mono">₹{supplier.creditLimit.toLocaleString()}</td>
                          <td className="supplier-table-cell">
                            <span className={`supplier-badge ${supplier.status.toLowerCase().replace(' ', '-')}`}>
                              {supplier.status}
                            </span>
                          </td>
                          <td className="supplier-table-cell small">{new Date(supplier.requestDate).toLocaleDateString('en-GB')}</td>
                          <td className="supplier-table-cell">
                            <div className="supplier-flex supplier-flex-gap-1">
                              {(supplier.status === 'Pending' || supplier.status === 'Under Review') && (
                                <>
                                  <button 
                                    className="supplier-button ghost success"
                                    onClick={() => handleApproveReject(supplier, 'approve')}
                                    title="Approve"
                                  >
                                    <CheckCircle className="supplier-icon-sm" />
                                  </button>
                                  <button 
                                    className="supplier-button ghost danger"
                                    onClick={() => handleApproveReject(supplier, 'reject')}
                                    title="Reject"
                                  >
                                    <XCircle className="supplier-icon-sm" />
                                  </button>
                                </>
                              )}
                              <button className="supplier-button ghost" title="Edit">
                                <Edit3 className="supplier-icon-sm" />
                              </button>
                              <button className="supplier-button ghost" title="Download">
                                <Download className="supplier-icon-sm" />
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

      case 'add-supplier':
        return (
          <div className="supplier-space-y-4">
            <div className="supplier-card">
              <div className="supplier-card-header">
                <h3 className="supplier-card-title">
                  <Plus className="supplier-icon-sm" />
                  Supplier Registration Request Form
                </h3>
              </div>
              <div className="supplier-card-content supplier-space-y-6">
                {/* Basic Company Information */}
                <div className="supplier-form-section">
                  <h4 className="supplier-section-title">
                    <Building className="supplier-icon-sm" />
                    Company Information
                  </h4>
                  <div className="supplier-form-grid">
                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Request Number</label>
                      <input 
                        value={newSupplier.requestNo}
                        readOnly
                        className="supplier-form-input readonly"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Request Date</label>
                      <input 
                        value={new Date(newSupplier.requestDate).toLocaleDateString('en-GB')}
                        readOnly
                        className="supplier-form-input readonly"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Company Name ***</label>
                      <input 
                        value={newSupplier.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Enter company name"
                        className="supplier-form-input"
                        required
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Contact Person ***</label>
                      <input 
                        value={newSupplier.contactPerson}
                        onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                        placeholder="Enter contact person name"
                        className="supplier-form-input"
                        required
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Phone Number ***</label>
                      <input 
                        value={newSupplier.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter phone number"
                        className="supplier-form-input"
                        required
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Email Address ***</label>
                      <input 
                        type="email"
                        value={newSupplier.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter email address"
                        className="supplier-form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Business Details */}
                <div className="supplier-form-section">
                  <h4 className="supplier-section-title">
                    <CreditCard className="supplier-icon-sm" />
                    Business Details
                  </h4>
                  <div className="supplier-form-grid">
                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Category ***</label>
                      <select 
                        value={newSupplier.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="supplier-form-select"
                        required
                      >
                        <option value="">Select Category</option>
                        {supplierCategories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Business Type</label>
                      <select 
                        value={newSupplier.businessType}
                        onChange={(e) => handleInputChange('businessType', e.target.value)}
                        className="supplier-form-select"
                      >
                        <option value="">Select Business Type</option>
                        {businessTypes.map(type => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Established Year</label>
                      <input 
                        type="number"
                        value={newSupplier.establishedYear}
                        onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                        placeholder="Enter established year"
                        className="supplier-form-input"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Location</label>
                      <input 
                        value={newSupplier.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        placeholder="Enter location"
                        className="supplier-form-input"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">GST Number</label>
                      <input 
                        value={newSupplier.gstNo}
                        onChange={(e) => handleInputChange('gstNo', e.target.value)}
                        placeholder="Enter GST number"
                        className="supplier-form-input"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">PAN Number</label>
                      <input 
                        value={newSupplier.panNo}
                        onChange={(e) => handleInputChange('panNo', e.target.value)}
                        placeholder="Enter PAN number"
                        className="supplier-form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial & Terms */}
                <div className="supplier-form-section">
                  <h4 className="supplier-section-title">
                    <DollarSign className="supplier-icon-sm" />
                    Financial & Payment Terms
                  </h4>
                  <div className="supplier-form-grid">
                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Credit Limit (₹)</label>
                      <input 
                        type="number"
                        value={newSupplier.creditLimit}
                        onChange={(e) => handleInputChange('creditLimit', parseInt(e.target.value) || 0)}
                        placeholder="Enter credit limit"
                        className="supplier-form-input"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Payment Terms</label>
                      <select 
                        value={newSupplier.paymentTerms}
                        onChange={(e) => handleInputChange('paymentTerms', e.target.value)}
                        className="supplier-form-select"
                      >
                        {paymentTermOptions.map(term => (
                          <option key={term} value={term}>
                            {term}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Bank Details</label>
                      <input 
                        value={newSupplier.bankDetails}
                        onChange={(e) => handleInputChange('bankDetails', e.target.value)}
                        placeholder="Enter bank details"
                        className="supplier-form-input"
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Certifications</label>
                      <input 
                        value={newSupplier.certifications}
                        onChange={(e) => handleInputChange('certifications', e.target.value)}
                        placeholder="Enter certifications"
                        className="supplier-form-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="supplier-form-section">
                  <h4 className="supplier-section-title">
                    <FileText className="supplier-icon-sm" />
                    Request Details
                  </h4>
                  <div className="supplier-form-grid">
                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Requester Name ***</label>
                      <input 
                        value={newSupplier.requesterName}
                        onChange={(e) => handleInputChange('requesterName', e.target.value)}
                        placeholder="Enter requester name"
                        className="supplier-form-input"
                        required
                      />
                    </div>

                    <div className="supplier-form-group">
                      <label className="supplier-form-label">Department ***</label>
                      <select 
                        value={newSupplier.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="supplier-form-select"
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="supplier-form-group supplier-form-group-full">
                      <label className="supplier-form-label">Previous Experience</label>
                      <textarea 
                        value={newSupplier.previousExperience}
                        onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                        placeholder="Enter previous experience details"
                        className="supplier-form-textarea"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="supplier-border-t">
                  <div className="supplier-flex supplier-flex-gap-3" style={{ marginTop: '1.5rem', paddingTop: '1rem' }}>
                    <button 
                      onClick={handleSaveSupplier}
                      className="supplier-button success"
                      disabled={!newSupplier.companyName || !newSupplier.contactPerson || !newSupplier.phone || !newSupplier.email || !newSupplier.category || !newSupplier.requesterName || !newSupplier.department}
                    >
                      <Save className="supplier-icon-sm" />
                      Submit Supplier Request
                    </button>
                    <button 
                      className="supplier-button outline"
                      onClick={() => setActiveTab('supplier-overview')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'supplier-reports':
        return (
          <div className="supplier-space-y-4">
            <div className="supplier-card">
              <div className="supplier-card-header">
                <h3 className="supplier-card-title">
                  <FileText className="supplier-icon-sm" />
                  Supplier Reports & Analytics
                </h3>
              </div>
              <div className="supplier-card-content supplier-space-y-4">
                <div className="supplier-reports-grid">
                  <div className="supplier-report-card">
                    <Users className="supplier-report-icon blue" />
                    <h3 className="supplier-report-title">Supplier Directory</h3>
                    <p className="supplier-report-description">Complete supplier database</p>
                    <button className="supplier-button outline small">
                      <Download className="supplier-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="supplier-report-card">
                    <Building className="supplier-report-icon green" />
                    <h3 className="supplier-report-title">Category Analysis</h3>
                    <p className="supplier-report-description">Supplier category breakdown</p>
                    <button className="supplier-button outline small">
                      <Download className="supplier-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="supplier-report-card">
                    <DollarSign className="supplier-report-icon orange" />
                    <h3 className="supplier-report-title">Financial Summary</h3>
                    <p className="supplier-report-description">Credit limits and payment terms</p>
                    <button className="supplier-button outline small">
                      <Download className="supplier-icon-sm" />
                      Download
                    </button>
                  </div>

                  <div className="supplier-report-card">
                    <Star className="supplier-report-icon purple" />
                    <h3 className="supplier-report-title">Performance Ratings</h3>
                    <p className="supplier-report-description">Supplier performance analysis</p>
                    <button className="supplier-button outline small">
                      <Download className="supplier-icon-sm" />
                      Download
                    </button>
                  </div>
                </div>

                <div className="supplier-stats-section">
                  <h4 className="supplier-stats-title">Supplier Statistics</h4>
                  <div className="supplier-stats-grid">
                    <div>
                      <p className="supplier-stats-number blue">
                        {supplierData.filter(s => s.category === 'Heavy Machinery').length}
                      </p>
                      <p className="supplier-stats-label blue">Heavy Machinery</p>
                    </div>
                    <div>
                      <p className="supplier-stats-number green">
                        {supplierData.filter(s => s.category === 'Safety Equipment').length}
                      </p>
                      <p className="supplier-stats-label green">Safety Equipment</p>
                    </div>
                    <div>
                      <p className="supplier-stats-number yellow">
                        {supplierData.filter(s => s.category === 'Explosives').length}
                      </p>
                      <p className="supplier-stats-label yellow">Explosives</p>
                    </div>
                    <div>
                      <p className="supplier-stats-number purple">
                        {(supplierData.reduce((acc, s) => acc + s.rating, 0) / supplierData.length).toFixed(1)}
                      </p>
                      <p className="supplier-stats-label purple">Avg Rating</p>
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
    <div className="supplier-management-container">
      {/* Header */}
      <div className="supplier-header">
        <div className="supplier-header-content">
          <div className="supplier-header-info">
            <div className="supplier-header-icon">
              <Users className="supplier-icon-sm" />
            </div>
            <div>
              <h1 className="supplier-header-title">Request & Approval</h1>
              <p className="supplier-header-subtitle">Supplier management and relationship system</p>
            </div>
          </div>
          <div className="supplier-flex supplier-flex-gap-3">
            <button className="supplier-button outline small">
              <Download className="supplier-icon-sm" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="supplier-main-container">
        
        {/* Tab Navigation */}
        <div className="supplier-tab-navigation">
          <nav className="supplier-tab-nav">
            <div className="supplier-tab-list">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`supplier-tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="supplier-icon-sm" />
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
      {showApprovalModal && selectedRequest && (
        <div className="supplier-modal-overlay">
          <div className="supplier-modal-content">
            <h3 className="supplier-modal-title">
              {selectedRequest.action === 'approve' ? 'Approve' : 'Reject'} Supplier Request
            </h3>
            <div className="supplier-modal-info">
              <p>Company: <span>{selectedRequest.companyName}</span></p>
              <p>Category: <span>{selectedRequest.category}</span></p>
              <p>Credit Limit: <span>₹{selectedRequest.creditLimit.toLocaleString()}</span></p>
              <p>Location: <span>{selectedRequest.location}</span></p>
            </div>
            <div className="supplier-form-group">
              <label className="supplier-form-label">Approval Note</label>
              <textarea
                value={approvalNote}
                onChange={(e) => setApprovalNote(e.target.value)}
                className="supplier-form-textarea"
                rows={3}
                placeholder={`Add a note for ${selectedRequest.action === 'approve' ? 'approval' : 'rejection'}...`}
              />
            </div>
            <div className="supplier-modal-buttons">
              <button
                onClick={submitApproval}
                className={`supplier-button ${selectedRequest.action === 'approve' ? 'success' : 'danger'}`}
              >
                {selectedRequest.action === 'approve' ? 'Approve' : 'Reject'} Request
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(false);
                  setApprovalNote('');
                  setSelectedRequest(null);
                }}
                className="supplier-button outline"
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
