import React, { useState, useMemo, useEffect } from 'react';
import './ProductMasonry.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { fetch_Post_Data, fetchPostData, AddDeleteUpadate } from '@/components/hooks/Api';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { customStyles } from '@/common/Utility';

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
  ProductID: number;
  ProductName: string;
  Productgroupid: number;
  GroupName: string;
  Rate: number;
  UnitTypeid: number;
  UnitType: string;
  Inchallan: boolean;
  IsReuse: boolean;
  IsPurchase: boolean;
  RoyaltyRate: number;
  DMGProduct: boolean;
  GSTRate: number;
  ProductCode: string;
  CompanyId: number;
  IsActive: boolean;
  CreatedDate: string;
  LastUpdated: string;
  Remarks?: string;
}

interface ProductGroup {
  Productgroupid: number;
  GroupName: string;
}

interface UnitType {
  UnitTypeid: number;
  UnitType: string;
}

// Predefined product names for masonry stones (fallback)
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

// Static options for react-select
const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

const productStatusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];

export default function ProductMasonry() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);




  // State for API data
  const [products, setProducts] = useState<Product[]>([]);
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);

  const [productForm, setProductForm] = useState({
    Productgroupid: 0,
    ProductName: '',
    Rate: 0,
    UnitTypeid: 0,
    Inchallan: false,
    IsReuse: false,
    IsPurchase: false,
    RoyaltyRate: 0,
    DMGProduct: false,
    GSTRate: 0,
    ProductCode: '',
    // IsActive: true,
    Remarks: ''
  });

  // API Functions
  const getCompanyId = () => Number(localStorage.getItem("companyID") || 0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const isActive = filterStatus === 'all' ? '' : filterStatus === 'active' ? true : false;
      const response = await fetch_Post_Data("GetData_Product", {
        IsActive: 1,
        CompanyId: Number(localStorage.getItem("companyID"))
      });

      // console.log('API Response:', response);

      if (response?.Data && Array.isArray(response.Data)) {
        setProducts(response.Data);
      } else {
        // Add some sample data for testing if API returns empty
        const sampleData = [
          {
            ProductID: 1,
            ProductName: 'Sand',
            Productgroupid: 1,
            GroupName: 'Masonry',
            Rate: 1200,
            UnitTypeid: 1,
            UnitType: 'Ton',
            Inchallan: false,
            IsReuse: false,
            IsPurchase: false,
            RoyaltyRate: 150,
            DMGProduct: false,
            GSTRate: 18,
            ProductCode: 'SAND001',
            CompanyId: getCompanyId(),
            IsActive: true,
            CreatedDate: '2025-01-01',
            LastUpdated: '2025-01-20',
            Remarks: 'Fine sand for construction'
          },
          {
            ProductID: 2,
            ProductName: 'Grit',
            Productgroupid: 1,
            GroupName: 'Masonry',
            Rate: 1000,
            UnitTypeid: 1,
            UnitType: 'Ton',
            Inchallan: false,
            IsReuse: false,
            IsPurchase: false,
            RoyaltyRate: 120,
            DMGProduct: false,
            GSTRate: 18,
            ProductCode: 'GRIT001',
            CompanyId: getCompanyId(),
            IsActive: true,
            CreatedDate: '2025-01-01',
            LastUpdated: '2025-01-18',
            Remarks: 'Coarse grit for road construction'
          }
        ];
        setProducts(sampleData);
        // console.log('Using sample data:', sampleData);
      }
    } catch (error) {
      // console.error('Error fetching products:', error);
      toastifyError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const response = await fetch_Post_Data("GetDataDropDown_Product", {
        CompanyId: getCompanyId()
      });
      // console.log(response, "response")

      // console.log('Dropdown API Response:', response);

      if (response?.Data) {
        // Assuming the response contains product groups, unit types, and product names
        setProductGroups(response.Data.ProductGroups || []);
        setUnitTypes(response.Data.UnitTypes || []);
        setProductNames(response.Data.ProductNames || MASONRY_PRODUCTS);
      } else {
        // Fallback to sample data
        const sampleGroups = [
          { Productgroupid: 1, GroupName: 'Masonry' },
          { Productgroupid: 2, GroupName: 'Construction' },
          { Productgroupid: 3, GroupName: 'Road Material' }
        ];

        const sampleUnitTypes = [
          { UnitTypeid: 1, UnitType: 'Ton' },
          { UnitTypeid: 2, UnitType: 'Cubic Meter' },
          { UnitTypeid: 3, UnitType: 'Piece' }
        ];

        setProductGroups(sampleGroups);
        setUnitTypes(sampleUnitTypes);
        setProductNames(MASONRY_PRODUCTS);
        // console.log('Using sample dropdown data');
      }
    } catch (error) {
      // console.error('Error fetching dropdown data:', error);
      // Fallback to predefined data
      setProductNames(MASONRY_PRODUCTS);
    }
  };

  const insertProduct = async (productData: any) => {
    try {
      const response = await fetchPostData('Insert_Product', {
        ...productData,
        CompanyId: getCompanyId()
      });

      if (response) {
        toastifySuccess('Product added successfully');
        fetchProducts();
        return true;
      }
    } catch (error) {
      // console.error('Error inserting product:', error);
      toastifyError('Error adding product');
      return false;
    }
  };

  const updateProduct = async (productData: any, productId: number) => {
    try {
      const response = await fetchPostData('Update_Product', {
        ...productData,
        ProductID: productId,
        CompanyId: getCompanyId()
      });



      if (response) {
        toastifySuccess('Product updated successfully');
        fetchProducts();
        return true;
      }
    } catch (error) {
      // console.error('Error updating product:', error);
      toastifyError('Error updating product');
      return false;
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      const response = await fetchPostData('Delete_Product', {
        IsActive: false,
        ProductID: productId
      });

      if (response) {
        toastifySuccess('Product deleted successfully');
        fetchProducts();
        return true;
      }
    } catch (error) {
      // console.error('Error deleting product:', error);
      toastifyError('Error deleting product');
      return false;
    }
  };

  const getSingleProduct = async (productId: number) => {
    try {
      const response = await fetch_Post_Data('GetSingleData_Product', {
        ProductID: productId
      });

      if (response?.Data && response.Data.length > 0) {
        return response.Data[0];
      }
    } catch (error) {
      // console.error('Error fetching single product:', error);
      toastifyError('Error fetching product details');
    }
    return null;
  };

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' ||
      product.ProductName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.Remarks && product.Remarks.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'all' ||
      (filterStatus === 'active' && product.IsActive) ||
      (filterStatus === 'inactive' && !product.IsActive);

    return matchesSearch && matchesStatus;
  });

  // useEffect hooks
  useEffect(() => {
    fetchProducts();
    fetchDropdownData();
  }, [filterStatus]);

  // Debug effect to log data changes
  useEffect(() => {
    // console.log('Products updated:', products);
    // console.log('Filtered products:', filteredProducts);
  }, [products, filteredProducts]);

  // Table columns configuration
  const columns = [
    {
      name: 'Product Name',
      selector: (row: Product) => row.ProductName,
      sortable: true,
      cell: (row: Product) => <span className="product-masonry-font-medium">{row.ProductName}</span>
    },
    {
      name: 'Group',
      selector: (row: Product) => row.GroupName,
      sortable: true,
    },
    {
      name: 'Rate (₹/unit)',
      selector: (row: Product) => row.Rate,
      sortable: true,
      cell: (row: Product) => `₹${row.Rate.toLocaleString()}`
    },
    {
      name: 'Unit Type',
      selector: (row: Product) => row.UnitType,
      sortable: true,
    },
    {
      name: 'Royalty Rate (₹/unit)',
      selector: (row: Product) => row.RoyaltyRate,
      sortable: true,
      cell: (row: Product) => `₹${row.RoyaltyRate.toLocaleString()}`
    },
    {
      name: 'GST Rate (%)',
      selector: (row: Product) => row.GSTRate,
      sortable: true,
      cell: (row: Product) => `${row.GSTRate}%`
    },
    {
      name: 'Product Code',
      selector: (row: Product) => row.ProductCode,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: Product) => row.IsActive,
      sortable: true,
      cell: (row: Product) => (
        <span className={`product-masonry-badge ${row.IsActive ? 'product-masonry-badge-success' : 'product-masonry-badge-error'}`}>
          {row.IsActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      name: 'Actions',
      cell: (row: Product) => (
        <div className="product-masonry-flex product-masonry-gap-1">
          <button
            onClick={() => handleEditProduct(row)}
            className="product-masonry-btn-icon"
            title="Edit"
          >
            <Edit3 className="product-masonry-icon-sm" />
          </button>
          <button
            onClick={() => handleDeleteProduct(row.ProductID)}
            className="product-masonry-btn-icon product-masonry-btn-icon-danger"
            title="Delete"
          >
            <Trash2 className="product-masonry-icon-sm" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Overview table columns
  const overviewColumns = [
    {
      name: 'Product Name',
      selector: (row: Product) => row.ProductName,
      sortable: true,
      cell: (row: Product) => <span className="product-masonry-font-medium">{row.ProductName}</span>
    },
    {
      name: 'Rate (₹/unit)',
      selector: (row: Product) => row.Rate,
      sortable: true,
      cell: (row: Product) => `₹${row.Rate.toLocaleString()}`
    },
    {
      name: 'Unit Type',
      selector: (row: Product) => row.UnitType,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row: Product) => row.IsActive,
      sortable: true,
      cell: (row: Product) => (
        <span className={`product-masonry-badge ${row.IsActive ? 'product-masonry-badge-success' : 'product-masonry-badge-error'}`}>
          {row.IsActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      name: 'Last Updated',
      selector: (row: Product) => row.LastUpdated,
      sortable: true,
      cell: (row: Product) => new Date(row.LastUpdated).toLocaleDateString()
    },
  ];

  // Handle product creation/editing
  const handleSaveProduct = async () => {
    if (!productForm.ProductName || productForm.Rate <= 0) {
      toastifyError('Please fill in all required fields');
      return;
    }

    if (editingProduct) {
      // Update existing product
      const success = await updateProduct(productForm, editingProduct.ProductID);
      if (success) {
        setEditingProduct(null);
        setShowProductModal(false);
        resetForm();
      }
    } else {
      // Create new product
      const success = await insertProduct(productForm);
      if (success) {
        setShowProductModal(false);
        resetForm();
      }
    }
  };

  // Handle edit
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      Productgroupid: product.Productgroupid,
      ProductName: product.ProductName,
      Rate: product.Rate,
      UnitTypeid: product.UnitTypeid,
      Inchallan: product.Inchallan,
      IsReuse: product.IsReuse,
      IsPurchase: product.IsPurchase,
      RoyaltyRate: product.RoyaltyRate,
      DMGProduct: product.DMGProduct,
      GSTRate: product.GSTRate,
      ProductCode: product.ProductCode,
      IsActive: product.IsActive,
      Remarks: product.Remarks || ''
    });
    setShowProductModal(true);
  };

  // Handle delete
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(productId);
    }
  };

  // Reset form
  const resetForm = () => {
    setProductForm({
      Productgroupid: 0,
      ProductName: '',
      Rate: 0,
      UnitTypeid: 0,
      Inchallan: false,
      IsReuse: false,
      IsPurchase: false,
      RoyaltyRate: 0,
      DMGProduct: false,
      GSTRate: 0,
      ProductCode: '',
      IsActive: true,
      Remarks: ''
    });
  };

  // Calculate statistics
  const getTotalProducts = () => products.length;
  const getActiveProducts = () => products.filter(p => p.IsActive).length;
  const getInactiveProducts = () => products.filter(p => !p.IsActive).length;
  const getAverageRate = () => {
    const activeProducts = products.filter(p => p.IsActive);
    if (activeProducts.length === 0) return 0;
    return Math.round(activeProducts.reduce((sum, p) => sum + p.Rate, 0) / activeProducts.length);
  };

  // Options for react-select
  const productOptions = useMemo(() =>
    productNames.map(product => ({
      value: product,
      label: product
    })), [productNames]
  );

  const productGroupOptions = useMemo(() =>
    productGroups.map(group => ({
      value: group.Productgroupid,
      label: group.GroupName
    })), [productGroups]
  );

  const unitTypeOptions = useMemo(() =>
    unitTypes.map(unit => ({
      value: unit.UnitTypeid,
      label: unit.UnitType
    })), [unitTypes]
  );

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
                resetForm();
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
                    <div className="product-masonry-flex product-masonry-items-center p-2">
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
                    <div className="product-masonry-flex product-masonry-items-center p-2">
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
                    <div className="product-masonry-flex product-masonry-items-center p-2">
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
                    <div className="product-masonry-flex product-masonry-items-center p-2">
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
                <div className="product-masonry-card-content">
                  <DataTable
                    columns={overviewColumns}
                    data={products.slice(0, 5)}
                    pagination={false}
                    highlightOnHover
                    // customStyles={{
                    //   table: {
                    //     style: {
                    //       backgroundColor: 'transparent',
                    //     },
                    //   },
                    //   headRow: {
                    //     style: {
                    //       backgroundColor: '#f9fafb',
                    //       borderBottom: '1px solid #e5e7eb',
                    //     },
                    //   },
                    //   headCells: {
                    //     style: {
                    //       color: '#374151',
                    //       fontSize: '0.875rem',
                    //       fontWeight: '600',
                    //       padding: '0.75rem',
                    //     },
                    //   },
                    //   cells: {
                    //     style: {
                    //       padding: '1rem 0.75rem',
                    //       borderBottom: '1px solid #f3f4f6',
                    //       fontSize: '0.875rem',
                    //     },
                    //   },
                    //   rows: {
                    //     style: {
                    //       '&:hover': {
                    //         backgroundColor: '#f9fafb',
                    //       },
                    //     },
                    //   },
                    // }}

                    customStyles={customStyles}
                  />
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
                <Select
                  value={statusOptions.find(option => option.value === filterStatus)}
                  onChange={(selectedOption) => setFilterStatus(selectedOption?.value || 'all')}
                  options={statusOptions}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      minHeight: '48px',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      '&:hover': {
                        borderColor: '#9ca3af',
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: '#6b7280',
                    }),
                  }}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Products Table */}
              <div className="product-masonry-card">
                <div className="product-masonry-card-content">
                  <DataTable
                    columns={columns}
                    data={filteredProducts}
                    pagination
                    paginationPerPage={10}
                    paginationRowsPerPageOptions={[5, 10, 20, 50]}
                    highlightOnHover
                    responsive
                    progressPending={loading}
                    // subHeader

                    noDataComponent={
                      <div className="product-masonry-text-center product-masonry-py-8">
                        <p className="product-masonry-text-gray-600">No products found</p>
                      </div>
                    }
                    // customStyles={{
                    //   table: {
                    //     style: {
                    //       backgroundColor: 'transparent',
                    //     },
                    //   },
                    //   headRow: {
                    //     style: {
                    //       backgroundColor: '#f9fafb',
                    //       borderBottom: '1px solid #e5e7eb',
                    //     },
                    //   },
                    //   headCells: {
                    //     style: {
                    //       color: '#374151',
                    //       fontSize: '0.875rem',
                    //       fontWeight: '600',
                    //       padding: '0.75rem',
                    //     },
                    //   },
                    //   cells: {
                    //     style: {
                    //       padding: '1rem 0.75rem',
                    //       borderBottom: '1px solid #f3f4f6',
                    //       fontSize: '0.875rem',
                    //     },
                    //   },
                    //   rows: {
                    //     style: {
                    //       '&:hover': {
                    //         backgroundColor: '#f9fafb',
                    //       },
                    //     },
                    //   },
                    //   pagination: {
                    //     style: {
                    //       backgroundColor: 'transparent',
                    //       borderTop: '1px solid #e5e7eb',
                    //       padding: '1rem',
                    //     },
                    //   },
                    // }}


                    customStyles={customStyles}
                  />
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
                    <Select
                      value={productOptions.find(option => option.value === productForm.ProductName) || null}
                      onChange={(selectedOption) => setProductForm({ ...productForm, ProductName: selectedOption?.value || '' })}
                      options={productOptions}
                      placeholder="Select Product"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          '&:hover': {
                            borderColor: '#9ca3af',
                          },
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: '#6b7280',
                        }),
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Product Group <span style={{ color: 'red' }}>*</span></label>
                    <Select
                      value={productGroupOptions.find(option => option.value === productForm.Productgroupid) || null}
                      onChange={(selectedOption) => setProductForm({ ...productForm, Productgroupid: selectedOption?.value || 0 })}
                      options={productGroupOptions}
                      placeholder="Select Group"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          '&:hover': {
                            borderColor: '#9ca3af',
                          },
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: '#6b7280',
                        }),
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-3">
                  <div>
                    <label className="product-masonry-label">
                      Rate (₹/unit) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="number"
                      value={productForm.Rate || ''}
                      onChange={(e) => setProductForm({ ...productForm, Rate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="Product rate"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">
                      Unit Type <span style={{ color: 'red' }}>*</span>
                    </label>
                    <Select
                      value={unitTypeOptions.find(option => option.value === productForm.UnitTypeid) || null}
                      onChange={(selectedOption) => setProductForm({ ...productForm, UnitTypeid: selectedOption?.value || 0 })}
                      options={unitTypeOptions}
                      placeholder="Select Unit Type"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          '&:hover': {
                            borderColor: '#9ca3af',
                          },
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: '#6b7280',
                        }),
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Royalty Rate (₹/unit)</label>
                    <input
                      type="number"
                      value={productForm.RoyaltyRate || ''}
                      onChange={(e) => setProductForm({ ...productForm, RoyaltyRate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="Rate paid to government"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-3">
                  <div>
                    <label className="product-masonry-label">GST Rate (%)</label>
                    <input
                      type="number"
                      value={productForm.GSTRate || ''}
                      onChange={(e) => setProductForm({ ...productForm, GSTRate: Number(e.target.value) })}
                      className="product-masonry-input"
                      placeholder="GST percentage"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Product Code</label>
                    <input
                      type="text"
                      value={productForm.ProductCode}
                      onChange={(e) => setProductForm({ ...productForm, ProductCode: e.target.value })}
                      className="product-masonry-input"
                      placeholder="Product code"
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">Status</label>
                    <Select
                      value={productStatusOptions.find(option => option.value === (productForm.IsActive ? 'active' : 'inactive'))}
                      onChange={(selectedOption) => setProductForm({ ...productForm, IsActive: selectedOption?.value === 'active' })}
                      options={productStatusOptions}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          minHeight: '48px',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          '&:hover': {
                            borderColor: '#9ca3af',
                          },
                        }),
                        placeholder: (provided) => ({
                          ...provided,
                          color: '#6b7280',
                        }),
                      }}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-3">
                  <div>
                    <label className="product-masonry-label">
                      <input
                        type="checkbox"
                        checked={productForm.Inchallan}
                        onChange={(e) => setProductForm({ ...productForm, Inchallan: e.target.checked })}
                        className="mr-2"
                      />
                      Inchallan
                    </label>
                  </div>

                  <div>
                    <label className="product-masonry-label">
                      <input
                        type="checkbox"
                        checked={productForm.IsReuse}
                        onChange={(e) => setProductForm({ ...productForm, IsReuse: e.target.checked })}
                        className="mr-2"
                      />
                      Is Reuse
                    </label>
                  </div>

                  <div>
                    <label className="product-masonry-label">
                      <input
                        type="checkbox"
                        checked={productForm.IsPurchase}
                        onChange={(e) => setProductForm({ ...productForm, IsPurchase: e.target.checked })}
                        className="mr-2"
                      />
                      Is Purchase
                    </label>
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-2">
                  <div>
                    <label className="product-masonry-label">
                      <input
                        type="checkbox"
                        checked={productForm.DMGProduct}
                        onChange={(e) => setProductForm({ ...productForm, DMGProduct: e.target.checked })}
                        className="mr-2"
                      />
                      DMG Product
                    </label>
                  </div>
                </div>

                <div>
                  <label className="product-masonry-label">Remarks</label>
                  <textarea
                    value={productForm.Remarks}
                    onChange={(e) => setProductForm({ ...productForm, Remarks: e.target.value })}
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
                disabled={!productForm.ProductName || productForm.Rate <= 0 || productForm.Productgroupid <= 0 || productForm.UnitTypeid <= 0 || loading}
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
