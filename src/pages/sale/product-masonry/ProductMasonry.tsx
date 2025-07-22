import React, { useState } from 'react';
import './ProductMasonry.css';

// Icon components
const Cube = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

const Calendar = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z" />
  </svg>
);

const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

// Types
interface Product {
  id: string;
  productName: string;
  groupName: string;
  rate: number;
  billRate: number;
  royaltyRate: number;
  effectiveFrom: string;
  remarks: string;
  status: 'active' | 'inactive';
  createdDate: string;
  lastUpdated: string;
}

// Predefined product names for masonry stones
const MASONRY_PRODUCTS = [
  'Sand',
  'Grit',
  'Stone Dust',
  'Boulder',
  'Aggregate 10mm',
  'Aggregate 20mm',
  'Aggregate 40mm',
  'Crushed Stone',
  'Quarry Dust',
  'Base Course Material',
  'Sub-base Material'
];

export default function ProductMasonry() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod-1',
      productName: 'Sand',
      groupName: 'Masonry',
      rate: 1200,
      billRate: 1500,
      royaltyRate: 150,
      effectiveFrom: '2025-01-01',
      remarks: 'Fine sand for construction',
      status: 'active',
      createdDate: '2025-01-01',
      lastUpdated: '2025-07-20'
    },
    {
      id: 'prod-2',
      productName: 'Grit',
      groupName: 'Masonry',
      rate: 1000,
      billRate: 1300,
      royaltyRate: 120,
      effectiveFrom: '2025-01-01',
      remarks: 'Coarse grit for road construction',
      status: 'active',
      createdDate: '2025-01-01',
      lastUpdated: '2025-07-18'
    },
    {
      id: 'prod-3',
      productName: 'Stone Dust',
      groupName: 'Masonry',
      rate: 800,
      billRate: 1100,
      royaltyRate: 100,
      effectiveFrom: '2025-01-01',
      remarks: 'Stone dust for concrete mixing',
      status: 'active',
      createdDate: '2025-01-01',
      lastUpdated: '2025-07-15'
    },
    {
      id: 'prod-4',
      productName: 'Boulder',
      groupName: 'Masonry',
      rate: 2000,
      billRate: 2500,
      royaltyRate: 250,
      effectiveFrom: '2025-01-01',
      remarks: 'Large boulder stones',
      status: 'inactive',
      createdDate: '2025-01-01',
      lastUpdated: '2025-07-10'
    }
  ]);

  const [productForm, setProductForm] = useState({
    productName: '',
    rate: 0,
    billRate: 0,
    royaltyRate: 0,
    effectiveFrom: '',
    remarks: '',
    status: 'active' as 'active' | 'inactive'
  });

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.remarks.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle product creation/editing
  const handleSaveProduct = () => {
    if (productForm.productName && productForm.rate > 0 && productForm.billRate > 0) {
      if (editingProduct) {
        // Update existing product
        const updatedProduct: Product = {
          ...editingProduct,
          productName: productForm.productName,
          rate: productForm.rate,
          billRate: productForm.billRate,
          royaltyRate: productForm.royaltyRate,
          effectiveFrom: productForm.effectiveFrom,
          remarks: productForm.remarks,
          status: productForm.status,
          lastUpdated: new Date().toISOString().split('T')[0]
        };

        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      } else {
        // Create new product
        const newProduct: Product = {
          id: `prod-${Date.now()}`,
          productName: productForm.productName,
          groupName: 'Masonry',
          rate: productForm.rate,
          billRate: productForm.billRate,
          royaltyRate: productForm.royaltyRate,
          effectiveFrom: productForm.effectiveFrom,
          remarks: productForm.remarks,
          status: productForm.status,
          createdDate: new Date().toISOString().split('T')[0],
          lastUpdated: new Date().toISOString().split('T')[0]
        };

        setProducts([...products, newProduct]);
      }

      // Reset form
      setProductForm({
        productName: '',
        rate: 0,
        billRate: 0,
        royaltyRate: 0,
        effectiveFrom: '',
        remarks: '',
        status: 'active'
      });
      setEditingProduct(null);
      setShowProductModal(false);
    }
  };

  // Handle edit
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      productName: product.productName,
      rate: product.rate,
      billRate: product.billRate,
      royaltyRate: product.royaltyRate,
      effectiveFrom: product.effectiveFrom,
      remarks: product.remarks,
      status: product.status
    });
    setShowProductModal(true);
  };

  // Handle delete
  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // Calculate statistics
  const getTotalProducts = () => products.length;
  const getActiveProducts = () => products.filter(p => p.status === 'active').length;
  const getInactiveProducts = () => products.filter(p => p.status === 'inactive').length;
  const getAverageRate = () => {
    const activeProducts = products.filter(p => p.status === 'active');
    if (activeProducts.length === 0) return 0;
    return Math.round(activeProducts.reduce((sum, p) => sum + p.rate, 0) / activeProducts.length);
  };

  return (
    <div className="product-masonry">
      {/* Header */}
      <div className="product-masonry-header">
        <div className="product-masonry-header-content">
          <div className="product-masonry-title-section">
            <Cube className="product-masonry-header-icon" />
            <div>
              <h1 className="product-masonry-title">Product (Masonry Stone) Management</h1>
              <p className="product-masonry-subtitle">
                Manage masonry stone products, rates, and inventory information
              </p>
            </div>
          </div>
          <div className="product-masonry-header-actions">
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  productName: '',
                  rate: 0,
                  billRate: 0,
                  royaltyRate: 0,
                  effectiveFrom: '',
                  remarks: '',
                  status: 'active'
                });
                setShowProductModal(true);
              }}
              className="product-masonry-btn product-masonry-btn-primary"
            >
              <Plus className="product-masonry-icon" />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="product-masonry-main">
        {/* Tab Navigation */}
        <div className="product-masonry-tabs">
          <div className="product-masonry-tabs-container">
            <nav className="product-masonry-tabs-nav">
              <div className="product-masonry-tabs-list">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`product-masonry-tab ${activeTab === 'overview' ? 'active' : ''}`}
                >
                  <BarChart3 className="product-masonry-tab-icon" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`product-masonry-tab ${activeTab === 'products' ? 'active' : ''}`}
                >
                  <List className="product-masonry-tab-icon" />
                  Product List
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="product-masonry-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="product-masonry-tab-content">
              <div className="product-masonry-section-header">
                <div>
                  <h2 className="product-masonry-section-title">Overview</h2>
                  <p className="product-masonry-section-subtitle">
                    Summary of masonry stone products and key metrics
                  </p>
                </div>
              </div>

              {/* Statistics Cards */}
              <div className="product-masonry-grid product-masonry-grid-cols-1 product-masonry-md-grid-cols-4 product-masonry-gap-6 product-masonry-mb-6">
                <div className="product-masonry-card">
                  <div className="product-masonry-card-content">
                    <div className="product-masonry-flex product-masonry-items-center">
                      <div className="product-masonry-stat-icon product-masonry-stat-icon-blue">
                        <Cube className="product-masonry-icon" />
                      </div>
                      <div>
                        <p className="product-masonry-text-sm product-masonry-text-gray-600">Total Products</p>
                        <p className="product-masonry-text-2xl product-masonry-font-bold">{getTotalProducts()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-masonry-card">
                  <div className="product-masonry-card-content">
                    <div className="product-masonry-flex product-masonry-items-center">
                      <div className="product-masonry-stat-icon product-masonry-stat-icon-green">
                        <Building className="product-masonry-icon" />
                      </div>
                      <div>
                        <p className="product-masonry-text-sm product-masonry-text-gray-600">Active Products</p>
                        <p className="product-masonry-text-2xl product-masonry-font-bold">{getActiveProducts()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-masonry-card">
                  <div className="product-masonry-card-content">
                    <div className="product-masonry-flex product-masonry-items-center">
                      <div className="product-masonry-stat-icon product-masonry-stat-icon-yellow">
                        <Calendar className="product-masonry-icon" />
                      </div>
                      <div>
                        <p className="product-masonry-text-sm product-masonry-text-gray-600">Inactive Products</p>
                        <p className="product-masonry-text-2xl product-masonry-font-bold">{getInactiveProducts()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="product-masonry-card">
                  <div className="product-masonry-card-content">
                    <div className="product-masonry-flex product-masonry-items-center">
                      <div className="product-masonry-stat-icon product-masonry-stat-icon-purple">
                        <BarChart3 className="product-masonry-icon" />
                      </div>
                      <div>
                        <p className="product-masonry-text-sm product-masonry-text-gray-600">Avg. Rate (₹/ton)</p>
                        <p className="product-masonry-text-2xl product-masonry-font-bold">₹{getAverageRate()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Products */}
              <div className="product-masonry-card">
                <div className="product-masonry-card-header">
                  <h3 className="product-masonry-card-title">Recent Product Updates</h3>
                </div>
                <div className="product-masonry-card-content">
                  <div className="product-masonry-table-container">
                    <table className="product-masonry-table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Rate (₹/ton)</th>
                          <th>Bill Rate (₹/ton)</th>
                          <th>Status</th>
                          <th>Last Updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.slice(0, 5).map((product) => (
                          <tr key={product.id}>
                            <td className="product-masonry-font-medium">{product.productName}</td>
                            <td>₹{product.rate.toLocaleString()}</td>
                            <td>₹{product.billRate.toLocaleString()}</td>
                            <td>
                              <span className={`product-masonry-badge ${
                                product.status === 'active' ? 'product-masonry-badge-success' : 'product-masonry-badge-error'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td>{new Date(product.lastUpdated).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="product-masonry-tab-content">
              <div className="product-masonry-section-header">
                <div>
                  <h2 className="product-masonry-section-title">Product List</h2>
                  <p className="product-masonry-section-subtitle">
                    Manage all masonry stone products and their rates
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="product-masonry-filters">
                <div className="product-masonry-search-container">
                  <Search className="product-masonry-search-icon" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="product-masonry-search-input"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="product-masonry-select"
                  style={{ minWidth: '150px' }}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Products Table */}
              <div className="product-masonry-card">
                <div className="product-masonry-card-content">
                  <div className="product-masonry-table-container">
                    <table className="product-masonry-table">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Group</th>
                          <th>Rate (₹/ton)</th>
                          <th>Bill Rate (₹/ton)</th>
                          <th>Royalty Rate (₹/ton)</th>
                          <th>Effective From</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="product-masonry-font-medium">{product.productName}</td>
                            <td>{product.groupName}</td>
                            <td>₹{product.rate.toLocaleString()}</td>
                            <td>₹{product.billRate.toLocaleString()}</td>
                            <td>₹{product.royaltyRate.toLocaleString()}</td>
                            <td>{new Date(product.effectiveFrom).toLocaleDateString()}</td>
                            <td>
                              <span className={`product-masonry-badge ${
                                product.status === 'active' ? 'product-masonry-badge-success' : 'product-masonry-badge-error'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td>
                              <div className="product-masonry-flex product-masonry-gap-1">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="product-masonry-btn-icon"
                                  title="Edit"
                                >
                                  <Edit3 className="product-masonry-icon-sm" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product.id)}
                                  className="product-masonry-btn-icon product-masonry-btn-icon-danger"
                                  title="Delete"
                                >
                                  <Trash2 className="product-masonry-icon-sm" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {filteredProducts.length === 0 && (
                    <div className="product-masonry-text-center product-masonry-py-8">
                      <p className="product-masonry-text-gray-600">No products found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="product-masonry-modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="product-masonry-modal product-masonry-modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="product-masonry-modal-header">
              <h3 className="product-masonry-modal-title">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowProductModal(false)}
                className="product-masonry-modal-close"
              >
                ×
              </button>
            </div>
            <div className="product-masonry-modal-content">
              <div className="product-masonry-space-y-4">
                <div className="product-masonry-form-grid product-masonry-form-grid-2">
                  <div>
                    <label className="product-masonry-label">
                      Product Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                      value={productForm.productName}
                      onChange={(e) => setProductForm({ ...productForm, productName: e.target.value })}
                      className="product-masonry-select"
                      required
                    >
                      <option value="">Select Product</option>
                      {MASONRY_PRODUCTS.map((productName) => (
                        <option key={productName} value={productName}>
                          {productName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="product-masonry-label">Group Name</label>
                    <input
                      type="text"
                      value="Masonry"
                      disabled
                      className="product-masonry-input"
                      style={{ backgroundColor: '#f9fafb', color: '#6b7280' }}
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-3">
                  <div>
                    <label className="product-masonry-label">
                      Rate (₹/ton) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      value={productForm.rate || ''}
                      onChange={(e) => setProductForm({ ...productForm, rate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="Internal cost rate"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">
                      Bill Rate (₹/ton) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      value={productForm.billRate || ''}
                      onChange={(e) => setProductForm({ ...productForm, billRate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="Rate charged to client"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Royalty Rate (₹/ton)</label>
                    <input
                      type="number"
                      value={productForm.royaltyRate || ''}
                      onChange={(e) => setProductForm({ ...productForm, royaltyRate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="Rate paid to government"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-2">
                  <div>
                    <label className="product-masonry-label">
                      Effective From <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="date"
                      value={productForm.effectiveFrom}
                      onChange={(e) => setProductForm({ ...productForm, effectiveFrom: e.target.value })}
                      className="product-masonry-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Status</label>
                    <select
                      value={productForm.status}
                      onChange={(e) => setProductForm({ ...productForm, status: e.target.value as 'active' | 'inactive' })}
                      className="product-masonry-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="product-masonry-label">Remarks</label>
                  <textarea
                    value={productForm.remarks}
                    onChange={(e) => setProductForm({ ...productForm, remarks: e.target.value })}
                    className="product-masonry-textarea"
                    rows={3}
                    placeholder="Any special notes or conditions"
                  />
                </div>
              </div>
            </div>
            <div className="product-masonry-modal-footer">
              <button
                onClick={() => setShowProductModal(false)}
                className="product-masonry-btn product-masonry-btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="product-masonry-btn product-masonry-btn-primary"
                disabled={!productForm.productName || productForm.rate <= 0 || productForm.billRate <= 0 || !productForm.effectiveFrom}
              >
                <Save className="product-masonry-icon" />
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
