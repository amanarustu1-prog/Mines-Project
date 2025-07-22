import React, { useState, useEffect } from 'react';
import './SundryDebtors.css';

// Icon components
const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const List = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
);

const BarChart3 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4L11 13l4-4 4 4M3 21h18" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const CreditCard = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5l-5-5 4-4 5 5v6a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h7l5 5v11z" />
  </svg>
);

// Types
interface SundryDebtor {
  id: string;
  ledgerName: string;
  under: string;
  mailingDetails: {
    address: string;
    name: string;
    state: string;
    pincode: string;
    mobileNo: string;
    email: string;
  };
  taxRegistrationDetails: {
    registrationType: 'Regular' | 'Composition' | 'Unregistered';
    gstin: string;
    panNo: string;
  };
  openingBalance: number;
  openingDate: string;
  status: 'active' | 'inactive';
  createdDate: string;
  modifiedDate: string;
}

export default function SundryDebtors() {
  const [activeTab, setActiveTab] = useState<'entry' | 'list'>('entry');
  const [debtors, setDebtors] = useState<SundryDebtor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingDebtor, setEditingDebtor] = useState<SundryDebtor | null>(null);
  
  const [formData, setFormData] = useState<Omit<SundryDebtor, 'id' | 'createdDate' | 'modifiedDate'>>({
    ledgerName: '',
    under: 'Sundry Debtors',
    mailingDetails: {
      address: '',
      name: '',
      state: '',
      pincode: '',
      mobileNo: '',
      email: ''
    },
    taxRegistrationDetails: {
      registrationType: 'Regular',
      gstin: '',
      panNo: ''
    },
    openingBalance: 0,
    openingDate: '2024-04-01',
    status: 'active'
  });

  // Sample data
  useEffect(() => {
    const sampleDebtors: SundryDebtor[] = [
      {
        id: '1',
        ledgerName: 'A.E. N VINOD PARASHAR BHARTPUR',
        under: 'Sundry Debtors',
        mailingDetails: {
          address: 'Bharatpur, Rajasthan',
          name: 'A.E. N VINOD PARASHAR BHARTPUR',
          state: 'Rajasthan',
          pincode: '321001',
          mobileNo: '9876543210',
          email: 'vinod.parashar@example.com'
        },
        taxRegistrationDetails: {
          registrationType: 'Regular',
          gstin: '08AAAAA0000A1Z5',
          panNo: 'AAAAA0000A'
        },
        openingBalance: 89648.00,
        openingDate: '2024-04-01',
        status: 'active',
        createdDate: '2024-04-01',
        modifiedDate: '2024-04-01'
      },
      {
        id: '2',
        ledgerName: 'B.K. CONSTRUCTION COMPANY',
        under: 'Sundry Debtors',
        mailingDetails: {
          address: 'Jaipur, Rajasthan',
          name: 'B.K. CONSTRUCTION COMPANY',
          state: 'Rajasthan',
          pincode: '302001',
          mobileNo: '9876543211',
          email: 'bk.construction@example.com'
        },
        taxRegistrationDetails: {
          registrationType: 'Regular',
          gstin: '08BBBBB1111B2Z6',
          panNo: 'BBBBB1111B'
        },
        openingBalance: 125000.00,
        openingDate: '2024-04-01',
        status: 'active',
        createdDate: '2024-04-01',
        modifiedDate: '2024-04-01'
      },
      {
        id: '3',
        ledgerName: 'C.M. MINING SERVICES',
        under: 'Sundry Debtors',
        mailingDetails: {
          address: 'Udaipur, Rajasthan',
          name: 'C.M. MINING SERVICES',
          state: 'Rajasthan',
          pincode: '313001',
          mobileNo: '9876543212',
          email: 'cm.mining@example.com'
        },
        taxRegistrationDetails: {
          registrationType: 'Regular',
          gstin: '08CCCCC2222C3Z7',
          panNo: 'CCCCC2222C'
        },
        openingBalance: 75000.00,
        openingDate: '2024-04-01',
        status: 'inactive',
        createdDate: '2024-04-01',
        modifiedDate: '2024-04-01'
      }
    ];
    setDebtors(sampleDebtors);
  }, []);

  // Handle form input changes
  const handleInputChange = (field: string, value: string | number) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingDebtor) {
      // Update existing debtor
      setDebtors(prev => prev.map(debtor => 
        debtor.id === editingDebtor.id 
          ? { 
              ...formData, 
              id: editingDebtor.id, 
              createdDate: editingDebtor.createdDate,
              modifiedDate: new Date().toISOString().split('T')[0]
            }
          : debtor
      ));
      setEditingDebtor(null);
    } else {
      // Add new debtor
      const newDebtor: SundryDebtor = {
        ...formData,
        id: Date.now().toString(),
        createdDate: new Date().toISOString().split('T')[0],
        modifiedDate: new Date().toISOString().split('T')[0]
      };
      setDebtors(prev => [...prev, newDebtor]);
    }
    
    // Reset form
    setFormData({
      ledgerName: '',
      under: 'Sundry Debtors',
      mailingDetails: {
        address: '',
        name: '',
        state: '',
        pincode: '',
        mobileNo: '',
        email: ''
      },
      taxRegistrationDetails: {
        registrationType: 'Regular',
        gstin: '',
        panNo: ''
      },
      openingBalance: 0,
      openingDate: '2024-04-01',
      status: 'active'
    });
    
    // Switch to list tab
    setActiveTab('list');
  };

  // Handle edit
  const handleEdit = (debtor: SundryDebtor) => {
    setFormData({
      ledgerName: debtor.ledgerName,
      under: debtor.under,
      mailingDetails: debtor.mailingDetails,
      taxRegistrationDetails: debtor.taxRegistrationDetails,
      openingBalance: debtor.openingBalance,
      openingDate: debtor.openingDate,
      status: debtor.status
    });
    setEditingDebtor(debtor);
    setActiveTab('entry');
  };

  // Handle delete
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this debtor?')) {
      setDebtors(prev => prev.filter(debtor => debtor.id !== id));
    }
  };

  // Filter debtors based on search term
  const filteredDebtors = debtors.filter(debtor =>
    debtor.ledgerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    debtor.mailingDetails.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
    debtor.taxRegistrationDetails.gstin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    debtor.taxRegistrationDetails.panNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate statistics
  const totalDebtors = debtors.length;
  const activeDebtors = debtors.filter(d => d.status === 'active').length;
  const totalBalance = debtors.reduce((sum, d) => sum + d.openingBalance, 0);
  const avgBalance = totalDebtors > 0 ? totalBalance / totalDebtors : 0;

  // Handle export
  const handleExport = () => {
    console.log('Exporting sundry debtors data...');
    // Implementation for export functionality
  };

  return (
    <div className="sundry-debtors">
      {/* Header */}
      <div className="sundry-debtors-header">
        <div className="sundry-debtors-header-content">
          <div className="sundry-debtors-title-section">
            <Users className="sundry-debtors-header-icon" />
            <div>
              <h1 className="sundry-debtors-title">Sundry Debtors Management</h1>
              <p className="sundry-debtors-subtitle">Manage customer accounts and receivables</p>
            </div>
          </div>
          <div className="sundry-debtors-header-actions">
            <button className="sundry-debtors-btn sundry-debtors-btn-primary" onClick={handleExport}>
              <Download className="sundry-debtors-icon" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="sundry-debtors-main">
        {/* Tabs */}
        <div className="sundry-debtors-tabs">
          <div className="sundry-debtors-tabs-container">
            <div className="sundry-debtors-tabs-nav">
              <div className="sundry-debtors-tabs-list">
                <button
                  className={`sundry-debtors-tab ${activeTab === 'entry' ? 'active' : ''}`}
                  onClick={() => setActiveTab('entry')}
                >
                  <Plus className="sundry-debtors-tab-icon" />
                  {editingDebtor ? 'Edit Debtor' : 'Add Debtor'}
                </button>
                <button
                  className={`sundry-debtors-tab ${activeTab === 'list' ? 'active' : ''}`}
                  onClick={() => setActiveTab('list')}
                >
                  <List className="sundry-debtors-tab-icon" />
                  Debtors List
                </button>
              </div>
            </div>

            {/* Entry Tab */}
            {activeTab === 'entry' && (
              <div className="sundry-debtors-tab-content">
                <div className="sundry-debtors-section-header">
                  <h2 className="sundry-debtors-section-title">
                    {editingDebtor ? 'Edit Sundry Debtor' : 'Add New Sundry Debtor'}
                  </h2>
                  <p className="sundry-debtors-section-subtitle">
                    {editingDebtor ? 'Update debtor information' : 'Enter debtor details and account information'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="sundry-debtors-form">
                  {/* Basic Information */}
                  <div className="sundry-debtors-card">
                    <div className="sundry-debtors-card-header">
                      <h3 className="sundry-debtors-card-title">Basic Information</h3>
                    </div>
                    <div className="sundry-debtors-card-content">
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Ledger Name *</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.ledgerName}
                            onChange={(e) => handleInputChange('ledgerName', e.target.value)}
                            placeholder="Enter ledger name"
                            required
                          />
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Under</label>
                          <select
                            className="sundry-debtors-select"
                            value={formData.under}
                            onChange={(e) => handleInputChange('under', e.target.value)}
                          >
                            <option value="Sundry Debtors">Sundry Debtors</option>
                            <option value="Trade Debtors">Trade Debtors</option>
                            <option value="Other Debtors">Other Debtors</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mailing Details */}
                  <div className="sundry-debtors-card">
                    <div className="sundry-debtors-card-header">
                      <h3 className="sundry-debtors-card-title">Mailing Details</h3>
                    </div>
                    <div className="sundry-debtors-card-content">
                      <div className="sundry-debtors-form-row-full">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Address</label>
                          <textarea
                            className="sundry-debtors-textarea"
                            value={formData.mailingDetails.address}
                            onChange={(e) => handleInputChange('mailingDetails.address', e.target.value)}
                            placeholder="Enter full address"
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Name</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.mailingDetails.name}
                            onChange={(e) => handleInputChange('mailingDetails.name', e.target.value)}
                            placeholder="Enter contact name"
                          />
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">State</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.mailingDetails.state}
                            onChange={(e) => handleInputChange('mailingDetails.state', e.target.value)}
                            placeholder="Enter state"
                          />
                        </div>
                      </div>
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Pincode</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.mailingDetails.pincode}
                            onChange={(e) => handleInputChange('mailingDetails.pincode', e.target.value)}
                            placeholder="Enter pincode"
                          />
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Mobile No</label>
                          <input
                            type="tel"
                            className="sundry-debtors-input"
                            value={formData.mailingDetails.mobileNo}
                            onChange={(e) => handleInputChange('mailingDetails.mobileNo', e.target.value)}
                            placeholder="Enter mobile number"
                          />
                        </div>
                      </div>
                      <div className="sundry-debtors-form-row-full">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Email</label>
                          <input
                            type="email"
                            className="sundry-debtors-input"
                            value={formData.mailingDetails.email}
                            onChange={(e) => handleInputChange('mailingDetails.email', e.target.value)}
                            placeholder="Enter email address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tax Registration Details */}
                  <div className="sundry-debtors-card">
                    <div className="sundry-debtors-card-header">
                      <h3 className="sundry-debtors-card-title">Tax Registration Details</h3>
                    </div>
                    <div className="sundry-debtors-card-content">
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Registration Type</label>
                          <select
                            className="sundry-debtors-select"
                            value={formData.taxRegistrationDetails.registrationType}
                            onChange={(e) => handleInputChange('taxRegistrationDetails.registrationType', e.target.value)}
                          >
                            <option value="Regular">Regular</option>
                            <option value="Composition">Composition</option>
                            <option value="Unregistered">Unregistered</option>
                          </select>
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">GSTIN</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.taxRegistrationDetails.gstin}
                            onChange={(e) => handleInputChange('taxRegistrationDetails.gstin', e.target.value)}
                            placeholder="Enter GSTIN"
                          />
                        </div>
                      </div>
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">PAN No</label>
                          <input
                            type="text"
                            className="sundry-debtors-input"
                            value={formData.taxRegistrationDetails.panNo}
                            onChange={(e) => handleInputChange('taxRegistrationDetails.panNo', e.target.value)}
                            placeholder="Enter PAN number"
                          />
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Status</label>
                          <select
                            className="sundry-debtors-select"
                            value={formData.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opening Balance */}
                  <div className="sundry-debtors-card">
                    <div className="sundry-debtors-card-header">
                      <h3 className="sundry-debtors-card-title">Opening Balance (On 1-Apr-24)</h3>
                    </div>
                    <div className="sundry-debtors-card-content">
                      <div className="sundry-debtors-form-row">
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Opening Balance</label>
                          <input
                            type="number"
                            step="0.01"
                            className="sundry-debtors-input"
                            value={formData.openingBalance}
                            onChange={(e) => handleInputChange('openingBalance', parseFloat(e.target.value) || 0)}
                            placeholder="Enter opening balance"
                          />
                        </div>
                        <div className="sundry-debtors-form-group">
                          <label className="sundry-debtors-label">Opening Date</label>
                          <input
                            type="date"
                            className="sundry-debtors-input"
                            value={formData.openingDate}
                            onChange={(e) => handleInputChange('openingDate', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="sundry-debtors-flex sundry-debtors-justify-between sundry-debtors-gap-4">
                    <button
                      type="button"
                      className="sundry-debtors-btn sundry-debtors-btn-secondary"
                      onClick={() => {
                        setEditingDebtor(null);
                        setFormData({
                          ledgerName: '',
                          under: 'Sundry Debtors',
                          mailingDetails: {
                            address: '',
                            name: '',
                            state: '',
                            pincode: '',
                            mobileNo: '',
                            email: ''
                          },
                          taxRegistrationDetails: {
                            registrationType: 'Regular',
                            gstin: '',
                            panNo: ''
                          },
                          openingBalance: 0,
                          openingDate: '2024-04-01',
                          status: 'active'
                        });
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="sundry-debtors-btn sundry-debtors-btn-primary">
                      <Save className="sundry-debtors-icon" />
                      {editingDebtor ? 'Update Debtor' : 'Save Debtor'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Tab */}
            {activeTab === 'list' && (
              <div className="sundry-debtors-tab-content">
                <div className="sundry-debtors-section-header">
                  <h2 className="sundry-debtors-section-title">Sundry Debtors List</h2>
                  <p className="sundry-debtors-section-subtitle">
                    Manage and view all registered debtors
                  </p>
                </div>

                {/* Statistics */}
                <div className="sundry-debtors-stats-grid">
                  <div className="sundry-debtors-stat-card">
                    <div className="sundry-debtors-stat-header">
                      <div className="sundry-debtors-stat-icon sundry-debtors-stat-icon-blue">
                        <Users className="sundry-debtors-icon" />
                      </div>
                    </div>
                    <div className="sundry-debtors-stat-value">{totalDebtors}</div>
                    <div className="sundry-debtors-stat-label">Total Debtors</div>
                  </div>
                  <div className="sundry-debtors-stat-card">
                    <div className="sundry-debtors-stat-header">
                      <div className="sundry-debtors-stat-icon sundry-debtors-stat-icon-green">
                        <BarChart3 className="sundry-debtors-icon" />
                      </div>
                    </div>
                    <div className="sundry-debtors-stat-value">{activeDebtors}</div>
                    <div className="sundry-debtors-stat-label">Active Debtors</div>
                  </div>
                  <div className="sundry-debtors-stat-card">
                    <div className="sundry-debtors-stat-header">
                      <div className="sundry-debtors-stat-icon sundry-debtors-stat-icon-yellow">
                        <CreditCard className="sundry-debtors-icon" />
                      </div>
                    </div>
                    <div className="sundry-debtors-stat-value">₹{totalBalance.toLocaleString()}</div>
                    <div className="sundry-debtors-stat-label">Total Balance</div>
                  </div>
                  <div className="sundry-debtors-stat-card">
                    <div className="sundry-debtors-stat-header">
                      <div className="sundry-debtors-stat-icon sundry-debtors-stat-icon-purple">
                        <FileText className="sundry-debtors-icon" />
                      </div>
                    </div>
                    <div className="sundry-debtors-stat-value">₹{avgBalance.toLocaleString()}</div>
                    <div className="sundry-debtors-stat-label">Average Balance</div>
                  </div>
                </div>

                {/* Search */}
                <div className="sundry-debtors-search-container">
                  <Search className="sundry-debtors-search-icon" />
                  <input
                    type="text"
                    className="sundry-debtors-search-input"
                    placeholder="Search debtors by name, state, GSTIN, or PAN..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Debtors Table */}
                <div className="sundry-debtors-table-container">
                  <table className="sundry-debtors-table">
                    <thead>
                      <tr>
                        <th>Ledger Name</th>
                        <th>State</th>
                        <th>Mobile No</th>
                        <th>GSTIN</th>
                        <th>PAN No</th>
                        <th>Opening Balance</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDebtors.map((debtor) => (
                        <tr key={debtor.id}>
                          <td>
                            <div>
                              <div style={{ fontWeight: 500 }}>{debtor.ledgerName}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                {debtor.under}
                              </div>
                            </div>
                          </td>
                          <td>{debtor.mailingDetails.state}</td>
                          <td>{debtor.mailingDetails.mobileNo}</td>
                          <td>{debtor.taxRegistrationDetails.gstin}</td>
                          <td>{debtor.taxRegistrationDetails.panNo}</td>
                          <td>₹{debtor.openingBalance.toLocaleString()}</td>
                          <td>
                            <span className={`sundry-debtors-status-badge sundry-debtors-status-${debtor.status}`}>
                              {debtor.status}
                            </span>
                          </td>
                          <td>
                            <div className="sundry-debtors-flex sundry-debtors-gap-2">
                              <button
                                className="sundry-debtors-btn-icon"
                                onClick={() => handleEdit(debtor)}
                                title="Edit"
                              >
                                <Edit3 className="sundry-debtors-icon-sm" />
                              </button>
                              <button
                                className="sundry-debtors-btn-icon sundry-debtors-btn-icon-danger"
                                onClick={() => handleDelete(debtor.id)}
                                title="Delete"
                              >
                                <Trash2 className="sundry-debtors-icon-sm" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {filteredDebtors.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                      {searchTerm ? 'No debtors found matching your search.' : 'No debtors registered yet.'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
