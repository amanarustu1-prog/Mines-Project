import React, { useState, useMemo, useEffect } from 'react';
import './ProductMasonry.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { fetch_Post_Data, fetchPostData, AddDeleteUpadate } from '@/components/hooks/Api';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { customStyles, multiValue } from '@/common/Utility';
import { getShowingDateText } from '@/common/DateFormat';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import * as XLSX from 'xlsx';
import ConfirmModal from '@/common/ConfirmModal';

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

const ToggleLeft = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);

const ToggleRight = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
  UpdatedDate: string;
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

export default function ProductMasonry() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"active" | "inactive" | "all">("active");
  const [activeCounts, setActiveCounts] = useState(0);
  const [inactiveCounts, setInactiveCounts] = useState(0);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editItemId, setEditItemId] = useState<number | null>();
  const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
  const [dropdown, setDropdown] = useState<any[]>([]);
  const [unitOption, setUnitOptions] = useState<any[]>([]);

  // State for API data
  const [products, setProducts] = useState<Product[]>([]);
  const [productGroups, setProductGroups] = useState<ProductGroup[]>([]);
  const [unitTypes, setUnitTypes] = useState<UnitType[]>([]);

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

      const payload = {
        IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : "",
        CompanyId: Number(localStorage.getItem("companyID")),
      };
      const response = await fetchPostData("Product/GetData_Product", payload);
      setProducts(response);

    } catch (error) {
      toastifyError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const insertProduct = async (productData: any) => {
    try {
      const response = await fetchPostData('Product/Insert_Product', {
        ...productData,
        CompanyId: Number(localStorage.getItem('companyID'))
      });
      const message = response[0].Message;
      if (message === "Already Exists ProductCode") {
        toastifyError("Code is already Present");
        return;
      }
      
      if (message === "Already Exists ProductName") {
        toastifyError("Description is already Present");
        return;
      }

      if (response) {
        toastifySuccess('Product added successfully');
        fetchProducts();
        fetchCounts();
        return true;
      }
    } catch (error) {
      toastifyError('Error adding product');
      return false;
    }
  };

  const fetchDropdownData = async () => {
  try {
    const [groupsRes, unitsRes] = await Promise.all([
      fetchPostData('ProductGroup/GetDataDropDown_ProductGroup', { CompanyId: getCompanyId() }),
      fetchPostData('UnitType/GetDataDropDown_UnitType', { CompanyId: getCompanyId() }),
    ]);

    const groupOptions = groupsRes?.map((g: any) => ({
      value: g.Productgroupid,
      label: g.GroupName,
    })) || [];

    const unitOptions = unitsRes?.map((u: any) => ({
      value: u.UnitTypeid,
      label: u.UnitType,
    })) || [];

    setProductGroups(groupOptions);
    setUnitTypes(unitOptions);
  } catch {
    toastifyError('Error fetching dropdown data');
  }
  };

  const updateProduct = async (productData: any, productId: number) => {
    try {
      const response = await AddDeleteUpadate('Product/Update_Product', {
        ...productData,
        ProductID: productId,
        CompanyId: Number(localStorage.getItem('companyID'))
      });

      if (response) {
        toastifySuccess('Product updated successfully');
        fetchProducts();
        return true;
      }else{
        toastifyError('Failed to Update data');
        return false;
      }
    } catch (error) {
      toastifyError('Error updating product');
      return false;
    }
  };

  const deleteProduct = async (productId: number) => {
    const item = products.find(x => x.ProductID === productId);
      if (!item) return;
      const newStatus = item.IsActive ? 0 : 1;

      const payload = {
        ProductID: productId,
        IsActive: newStatus,
      };

    try {
      const response = await AddDeleteUpadate('Product/Delete_Product', payload);

      if (response) {
        toastifySuccess(`Product ${newStatus === 1 ? "activated" : "deactivated"} successfully`);
        await fetchProducts();
        await fetchCounts();
        return true;
      }
    } catch (error) {
      toastifyError('Error deleting product');
      return false;
    }
  };

  useEffect(() => {
    if (editItemId && dropdownOptions.length > 0) {
      getSingleProduct();
    }
  }, [editItemId, dropdownOptions]);

  const getSingleProduct = async () => {
    try {
      const payload = {ProductID: editItemId}
      const response = await fetch_Post_Data('Product/GetSingleData_Product', payload);

      if (response && Array.isArray(response) && response.length > 0) {
        const record = response[0];

        setProductForm({
                  Productgroupid:  record.Productgroupid,
                  ProductName: record.ProductName ,
                  Rate: record.Rate,
                  UnitTypeid: record.UnitTypeid,
                  Inchallan: false,
                  IsReuse: false,
                  IsPurchase: false,
                  RoyaltyRate: record.RoyaltyRate,
                  DMGProduct: false,
                  GSTRate: record.GSTRate,
                  ProductCode: record.ProductCode,
                  Remarks: ''
        });

        const companyIdField = record.Companyid ?? record.CompanyID ?? record.CompanyId ?? "";

        if (companyIdField && dropdownOptions.length > 0) {
          const companyIds = String(companyIdField).split(",").map(id => id.trim());
          const matchOptions = dropdownOptions.filter(opt => companyIds.includes(String(opt.CompanyID))).map(opt => ({
            value: opt.CompanyID,
            label: opt.CompanyName
          }));
          setDropdown(matchOptions);
        } else {
          setProductForm({ Productgroupid: 0, ProductName: '', Rate: 0, UnitTypeid: 0, Inchallan: false, IsReuse: false, IsPurchase: false, RoyaltyRate: 0, DMGProduct: false, GSTRate: 0, ProductCode: '', Remarks: '' });
        }
      }
    } catch (error) {
      // console.error('Error fetching single product:', error);
      toastifyError('Error fetching product details');
    }
    return null;
  };

  const fetchCounts = async () => {
    try {
      const [activeResp, inactiveResp] = await Promise.all([
        fetch_Post_Data('Product/GetData_Product', { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
        fetch_Post_Data('Product/GetData_Product', { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
      ]);
  
      setActiveCounts(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
      setInactiveCounts(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
      }catch (err) {
        toastifyError("Error fetching counts");
      }
  };

  useEffect(() => {
    fetchProducts();
    fetchCounts();
  }, [filter]);

  // Filter functions
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' ||
      product?.ProductName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product?.Remarks && product?.Remarks?.toLowerCase().includes(searchTerm.toLowerCase()));

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

  // Table columns configuration
  const columns = [
    {
      name: 'Product Code',
      selector: (row: Product) => row.ProductCode,
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: (row: Product) => row.ProductName,
      sortable: true,
      cell: (row: Product) => <span className="">{row.ProductName}</span>
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
      cell: (row: Product) => `₹${(row.Rate ?? 0).toLocaleString()}`
    },
    {
      name: 'Unit Type',
      selector: (row: Product) => row.UnitTypeid,
      sortable: true,
      cell: (row: Product) => {
        const unit = unitOption.find(u => u.value === row.UnitTypeid);
        return unit ? unit.label : '-';
      }
    },
    {
      name: 'Royalty Rate (₹/unit)',
      selector: (row: Product) => row.RoyaltyRate,
      sortable: true,
      cell: (row: Product) => `₹${(row.RoyaltyRate ?? 0).toLocaleString()}`
    },
    {
      name: 'GST Rate (%)',
      selector: (row: Product) => row.GSTRate,
      sortable: true,
      cell: (row: Product) => `${row.GSTRate}%`
    },
    {
      name: 'Status',
      selector: (row: Product) => row.IsActive,
      sortable: true,
      cell: (row: Product) => (
        <span className={`maintenance-type-badge ${row.IsActive ? 'maintenance-type-badge-success' : 'maintenance-type-badge-error'}`}>
          {row.IsActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      name: 'Created Date',
      selector: (row: Product) => getShowingDateText(row.CreatedDate),
      sortable: true,
    },
    {
      name: 'Last Modified',
      selector: (row: Product) => getShowingDateText(row.UpdatedDate),
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row: Product) => (
        <div className="product-masonry-flex product-masonry-gap-1">
          <button onClick={() => { setSelectedId(row.ProductID!); setShowModal(true); }}
            className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`} title={row.IsActive ? 'Deactivate' : 'Activate'}>
            {row.IsActive ? <ToggleLeft className="list-icon-sm1" /> : <ToggleRight className="list-icon-sm1" />}
          </button>

          <button onClick={() => handleEditProduct(row)} className="list-button ghost primary" title="Edit">
            <Edit3 className="maintenance-type-icon-sm" />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  useEffect(() => {
          const fetchUnitType = async () => {
              try {
                  const payload = { CompanyId: localStorage.getItem("companyID") };
                  const response = await fetchPostData('UnitType/GetDataDropDown_UnitType', payload);
                  // console.log(response);
  
                  const formatted = response.map((item: any) => ({
                      value: item.UnitTypeID,
                      label: item.Description,
                  }));
                  // console.log(formatted[0].value);
                  setUnitOptions(formatted);
              } catch (error) {
                  toastifyError("Error fetching Material Groups");
              }
          };
          fetchUnitType();
  }, []);

  const handleSaveProduct = async () => {
  if (!productForm.ProductName || !productForm.ProductCode) {
    toastifyError('Please fill in all required fields');
    return;
  }

  const success = editingProduct
    ? await updateProduct(productForm, editingProduct.ProductID)
    : await insertProduct(productForm);

  if (success) {
    resetForm();
    setEditingProduct(null);
    setShowProductModal(false);
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

  useEffect(() => {
    const fetchDropDown = async () => {
              try {
                  const payload = { EmployeeID: localStorage.getItem("employeeID") };
                  const response = await fetchPostData('Users/GetData_Company', payload);
                  // console.log(response);
                  if (response) {
                      const data = response;
                      setDropdownOptions(Array.isArray(data) ? data : []);
                  } else {
                      toastifyError("Failed to load Dropdown.")
                  }
              } catch (error: any) {
                  toastifyError("Error fetching Dropdown");
              }
          }
          fetchDropDown();
  }, []);
  
  const options = dropdownOptions.map(opt => ({
    value: opt.CompanyID,
    label: opt.CompanyName
  }));

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
  const getAverageRate = () => {
    const activeProducts = products.filter(p => p.IsActive);
    if (activeProducts.length === 0) return 0;
    return Math.round(activeProducts.reduce((sum, p) => sum + p.Rate, 0) / activeProducts.length);
  };

  const productGroupOptions = useMemo(() =>
    productGroups.map(group => ({
      value: group.Productgroupid,
      label: group.GroupName
    })), [productGroups]
  );

  const resizeableColumns = useResizableColumns(columns).map(col => ({
    ...col,
    minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
  }));

    //Download-Excel_File
  const exportToExcel = () => {
        const filteredDataNew = filteredProducts?.map(item => ({
            'Product Code': item.ProductCode,
            'Product Name': item.ProductName,
            'Group': item.GroupName,
            'Rate': item.Rate,
            'Unit-Type': item.UnitType,
            'Royality-Rate': item.RoyaltyRate,
            'GST-Rate': item.GSTRate,
            'Status': item.IsActive ? 'Active' : 'Inactive',
            'Created Date': item.CreatedDate ? getShowingDateText(item.CreatedDate) : " ",
            'Last Modified': item.UpdatedDate ? getShowingDateText(item.UpdatedDate) : " ",
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(filteredDataNew);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
  }

  return (
    <>
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
        {/* Statistics Cards */}
        <div className="product-masonry-grid product-masonry-grid-cols-1 product-masonry-md-grid-cols-4 product-masonry-gap-6 product-masonry-mb-6">

          <div className="product-masonry-card cursor-pointer" onClick={() => setFilter("active")}>
            <div className="product-masonry-card-content">
              <div className="product-masonry-flex product-masonry-items-center p-2">
                <div className="product-masonry-stat-icon product-masonry-stat-icon-green">
                  <Building className="product-masonry-icon" />
                </div>
                <div>
                  <p className="product-masonry-text-sm product-masonry-text-gray-600">Active Products</p>
                  <p className="product-masonry-text-2xl product-masonry-font-bold">{activeCounts}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="product-masonry-card cursor-pointer" onClick={() => setFilter("inactive")}>
            <div className="product-masonry-card-content">
              <div className="product-masonry-flex product-masonry-items-center p-2">
                <div className="product-masonry-stat-icon product-masonry-stat-icon-yellow">
                  <Calendar className="product-masonry-icon" />
                </div>
                <div>
                  <p className="product-masonry-text-sm product-masonry-text-gray-600">Inactive Products</p>
                  <p className="product-masonry-text-2xl product-masonry-font-bold">{inactiveCounts}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="product-masonry-card cursor-pointer" onClick={() => setFilter("all")}>
            <div className="product-masonry-card-content">
              <div className="product-masonry-flex product-masonry-items-center p-2">
                <div className="product-masonry-stat-icon product-masonry-stat-icon-blue">
                  <Cube className="product-masonry-icon" />
                </div>
                <div>
                  <p className="product-masonry-text-sm product-masonry-text-gray-600">Total Products</p>
                  <p className="product-masonry-text-2xl product-masonry-font-bold">{activeCounts + inactiveCounts}</p>
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

        {/* Tab Content */}
        <div className="product-masonry-content">
          {/* Overview Tab */}
          <div className="product-masonry-tab-content">
            <div className="product-masonry-search-container  mb-2 d-flex justify-between align-center ">
              <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 mt-2 flex items-center gap-1">
                <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel
              </button>
              <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                placeholder="Search..." maxLength={300} />
            </div>

            {/* Recent Products */}
            <div className="product-masonry-card">
              <div className="product-masonry-card-content">
                <DataTable
                  columns={resizeableColumns}
                  data={filteredProducts}
                  pagination
                  paginationPerPage={10}
                  paginationRowsPerPageOptions={[5, 10, 20, 50]}
                  highlightOnHover
                  customStyles={customStyles}
                  responsive
                  progressPending={loading}
                  noDataComponent={
                    <div className="maintenance-type-text-center maintenance-type-py-8">
                      <p className="maintenance-type-text-gray-600">
                        {searchTerm || filterStatus !== 'all'
                          ? 'No Product match your search/filter criteria'
                          : 'No Product found'}
                      </p>
                      <p className="maintenance-type-text-sm maintenance-type-text-gray-500 mt-2">
                        {searchTerm || filterStatus !== 'all'
                          ? 'Try adjusting your search terms or filter settings'
                          : 'Add your first Product using the "Add Product" button above'}
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

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
                    <label className="product-masonry-label">Product Code <span style={{ color: 'red' }}>*</span></label>
                    <input
                      type="text"
                      value={productForm.ProductCode}
                      onChange={(e) => setProductForm({ ...productForm, ProductCode: e.target.value })}
                      className="product-masonry-input requiredColor"
                      placeholder="Product code"
                    />
                  </div>

                  <div>
                    <label className="product-masonry-label">
                      Product Name <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={productForm.ProductName || ''}
                      onChange={(e) => setProductForm({ ...productForm, ProductName: e.target.value })}
                      className="product-masonry-input requiredColor"
                      placeholder="Product rate"
                      required
                    />
                  </div>
                </div>

                <div className="product-masonry-form-grid product-masonry-form-grid-3">
                  <div>
                    <label className="product-masonry-label">
                      Rate (₹/unit) 
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
                      Unit Type 
                    </label>
                    <Select
                      value={unitOption.find(option => option.value === productForm.UnitTypeid) || null}
                      onChange={(selectedOption) => setProductForm({ ...productForm, UnitTypeid: selectedOption?.value || 0 })}
                      options={unitOption}
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
                    <label className="product-masonry-label">Product Group </label>
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

                  <div>
                    <label className="product-masonry-label">Company</label>
                    <Select
                      value={dropdown}
                      onChange={(selectedOptions: any) => setDropdown(selectedOptions || [])}
                      options={options}
                      isMulti
                      isClearable
                      closeMenuOnSelect={false}
                      hideSelectedOptions={true}
                      placeholder="Select Company"
                      className="basic-multi-select"
                      styles={{...multiValue,
                        valueContainer: (provided) => ({
                          ...provided,
                          maxHeight: "80px",
                          overflowY: "auto",
                          flexWrap: "wrap",
                        }),
                      }}
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
                disabled={!productForm.ProductName || !productForm.ProductCode || loading}
              >
                <Save className="product-masonry-icon" />
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

    <ConfirmModal show={showModal}
      handleClose={() => setShowModal(false)}
      handleConfirm={() => {
      if (selectedId !== null) {
        deleteProduct(selectedId);
      }
        setShowModal(false);
    }} />
    </>
  );
}

// In this do some changes by that when our we insert data in our DataTable then at Unit Type its Description will be shown. 
// And our getSingleProduct method is working correctly. And also do some changes by that our all functionalty would work perfectly.