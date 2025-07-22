import React, { useState } from 'react';
import './TPCharges.css';

// Icons
const Truck = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
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

// Types
interface TPCharge {
  id: string;
  chargeName: string;
  chargeType: 'Fixed' | 'Percentage' | 'Per Unit';
  rate: number;
  description: string;
  status: 'active' | 'inactive';
}

const TPCharges: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Sample data
  const [tpCharges, setTpCharges] = useState<TPCharge[]>([
    {
      id: 'TPC001',
      chargeName: 'Loading Charges',
      chargeType: 'Per Unit',
      rate: 50,
      description: 'Charges for loading operations',
      status: 'active'
    },
    {
      id: 'TPC002',
      chargeName: 'Unloading Charges',
      chargeType: 'Per Unit',
      rate: 40,
      description: 'Charges for unloading operations',
      status: 'active'
    }
  ]);

  const [formData, setFormData] = useState<Omit<TPCharge, 'id'>>({
    chargeName: '',
    chargeType: 'Fixed',
    rate: 0,
    description: '',
    status: 'active'
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing charge
      setTpCharges(prev =>
        prev.map(charge =>
          charge.id === editingId
            ? { ...formData, id: editingId }
            : charge
        )
      );
    } else {
      // Add new charge
      const newCharge = {
        ...formData,
        id: `TPC${String(tpCharges.length + 1).padStart(3, '0')}`
      };
      setTpCharges(prev => [...prev, newCharge]);
    }
    setShowAddModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      chargeName: '',
      chargeType: 'Fixed',
      rate: 0,
      description: '',
      status: 'active'
    });
    setEditingId(null);
  };

  const handleEdit = (charge: TPCharge) => {
    setFormData({
      chargeName: charge.chargeName,
      chargeType: charge.chargeType,
      rate: charge.rate,
      description: charge.description,
      status: charge.status
    });
    setEditingId(charge.id);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this charge?')) {
      setTpCharges(prev => prev.filter(charge => charge.id !== id));
    }
  };

  const filteredCharges = tpCharges.filter(charge =>
    charge.chargeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    charge.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tp-charges-container px-0 mt-5 container">
      <div className="tp-header">
        <div className="tp-header-content">
          <div className="tp-header-info">
            <div className="tp-header-icon">
              <Truck className="tp-icon" />
            </div>
            <div>
              <h1>TP Charges</h1>
              <p>Manage Transport Partner Charges</p>
            </div>
          </div>
          <button
            className="tp-button primary"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="tp-icon" />
            Add New Charge
          </button>
        </div>
      </div>

      <div className="tp-main-content">
        <div className="tp-search-bar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search charges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="tp-table-container">
          <table className="tp-table">
            <thead>
              <tr>
                <th>Charge ID</th>
                <th>Charge Name</th>
                <th>Type</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCharges.map(charge => (
                <tr key={charge.id}>
                  <td>{charge.id}</td>
                  <td>{charge.chargeName}</td>
                  <td>{charge.chargeType}</td>
                  <td>{charge.rate} {charge.chargeType === 'Percentage' ? '%' : '₹'}</td>
                  <td>
                    <span className={`status-badge ${charge.status}`}>
                      {charge.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="action-btn edit"
                      onClick={() => handleEdit(charge)}
                    >
                      <Edit3 className="tp-icon" />
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(charge.id)}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingId ? 'Edit' : 'Add New'} TP Charge</h3>
              <button onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Charge Name *</label>
                <input
                  type="text"
                  value={formData.chargeName}
                  onChange={(e) => handleInputChange('chargeName', e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Charge Type *</label>
                <select
                  value={formData.chargeType}
                  onChange={(e) => handleInputChange('chargeType', e.target.value as any)}
                  required
                >
                  <option value="Fixed">Fixed Amount</option>
                  <option value="Percentage">Percentage</option>
                  <option value="Per Unit">Per Unit</option>
                </select>
              </div>

              <div className="form-group">
                <label>Rate *</label>
                <input
                  type="number"
                  value={formData.rate}
                  onChange={(e) => handleInputChange('rate', parseFloat(e.target.value))}
                  min="0"
                  step={formData.chargeType === 'Percentage' ? '0.01' : '1'}
                  required
                />
                <span className="input-suffix">
                  {formData.chargeType === 'Percentage' ? '%' : '₹'}
                </span>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as 'active' | 'inactive')}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingId ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TPCharges;