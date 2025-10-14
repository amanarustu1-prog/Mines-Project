import React, { useState, useMemo, useEffect } from 'react';
import './Material-Name.css';
import DataTable from 'react-data-table-component';
import Select from 'react-select';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import { customStyles, multiValue } from '@/common/Utility';
import axios from '@/interceptors/axios';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import { getShowingDateText } from '@/common/DateFormat';
import * as XLSX from 'xlsx';
import ConfirmModal from '@/common/ConfirmModal';

// Icon components
const Package = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 9l6-3m0 0l6 3M9 9v12l6-3v-12" />
    </svg>
);

const Plus = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
);

const Save = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
    </svg>
);

const Edit3 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 7-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const Tag = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
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
interface MaterialName {
    MaterialNameID?: number;
    MaterialName: string;
    MaterialTypeID: number;
    MaterialGroupID: number;
    UnitMeasurementID: number;
    MaterialNameCode: string;
    CompanyId: number | string;
    IsActive?: boolean;
    CreatedDate?: string;
    LastUpdated?: string;
    Description: string;
    Brand: string;
    Model: string;
    MaterialSpecificationID: number;
    MaterialUnitID: number;
    HSNCode: string;
    PartNo: string;
    Remarks: string;
    MaterialID: number;
}

interface MaterialType {
    MaterialTypeID: number;
    MaterialTypeName: string;
    MaterialTypeCode: string;
    Description: string;
    IsActive: boolean;
}

interface MaterialGroup {
    MaterialGroupID: number;
    MaterialGroupName: string;
    MaterialGroupCode: string;
    IsActive: boolean;
}

interface UnitMeasurement {
    UnitMeasurementID: number;
    UnitName: string;
    UnitCode: string;
    IsActive: boolean;
}

interface MaterialSpecification {
    MaterialSpecificationID: number;
    Description: string;
    IsActive: boolean;
}

interface Props {
    baseUrl?: string;
    companyId?: number | string | null;
}

// Status options
const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
];

const MaterialName: React.FC<Props> = ({ baseUrl = '', companyId = null }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showMaterialNameModal, setShowMaterialNameModal] = useState(false);
    const [editingMaterialName, setEditingMaterialName] = useState<MaterialName | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(false);
    const [ filter, setFilter ] = useState<"active" | "inactive" | "all">("active");
    const [activeCounts, setActiveCounts] = useState(0);
    const [inactiveCounts, setInactiveCounts] = useState(0);
    const [dropdownOptions, setDropdownOptions] = useState<any[]>([]);
    const [dropdown, setDropdown] = useState<any[]>([]);

    const [materialNames, setMaterialNames] = useState<MaterialName[]>([]);
    const [materialTypes, setMaterialTypes] = useState<MaterialType[]>([]);
    const [materialGroups, setMaterialGroups] = useState<MaterialGroup[]>([]);
    const [unitMeasurements, setUnitMeasurements] = useState<UnitMeasurement[]>([]);
    const [materialSpecifications, setMaterialSpecifications] = useState<MaterialSpecification[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);

    const [materialNameForm, setMaterialNameForm] = useState({
        MaterialName: '',
        MaterialTypeID: 0,
        MaterialGroupID: 0,
        UnitMeasurementID: 0,
        MaterialNameCode: '',
        IsActive: true,
        CompanyId: companyId || '',
        Description: '',
        Brand: '',
        Model: '',
        MaterialSpecificationID: 0,
        MaterialUnitID: 0,
        HSNCode: '',
        PartNo: '',
        Remarks: '',
        MaterialID: 0
    });

    const api = (path: string) => (baseUrl ? `${baseUrl}${path}` : path);

    // API Functions
    const getCompanyId = () => Number(localStorage.getItem('companyID')) || 0;

    // Fetch dropdown data for Material Types
    const fetchMaterialTypes = async () => {
        try {
            const response = await fetchPostData('MaterialType/GetDataDropDown_MaterialType', {
                CompanyId: localStorage.getItem('companyID')
            });
            // console.log(response);
            setMaterialTypes(response);
        } catch (error: any) {
            console.error('Error fetching material types:', error);
            toastifyError(error?.response?.data?.message || 'Error fetching material types');
        }
    };

    const options1 = materialTypes.map(opt => ({
        value: opt.MaterialTypeID,
        label: opt.Description
    }));

    // Fetch dropdown data for Material Groups
    const fetchMaterialGroups = async () => {
        try {
            const { data } = await axios.post('MaterialGroup/GetDataDropDown_MaterialGroup', {
                CompanyId: getCompanyId(),
                IsActive: 1
            });
            const materialGroupData = Array.isArray(data) ? data : Array.isArray(data?.Data) ? data.Data : [];
            setMaterialGroups(materialGroupData);
        } catch (error: any) {
            console.error('Error fetching material groups:', error);
            toastifyError(error?.response?.data?.message || 'Error fetching material groups');
        }
    };

    // Fetch Material Specifications dropdown
    const fetchMaterialSpecifications = async () => {
        try {
            const response = await fetchPostData('MaterialSpecification/GetDataDropDown_MaterialSpecification', {
                CompanyId: Number(localStorage.getItem('companyID')),
            });
            console.log(response);
            if (response && Array.isArray(response)) {
                setMaterialSpecifications(response);
            }
        } catch (error: any) {
            console.error('Error fetching material specifications:', error);
            toastifyError(`Error fetching material specifications: ${error.message}`);
        }
    };
    const options2 = materialSpecifications.map(opt => ({
        value: opt.MaterialSpecificationID,
        label: opt.Description
    }));

    // Fetch Material Names
    const fetchMaterialNames = async () => {
        try {
            setLoading(true);  

            const payload = {
                CompanyId: Number(localStorage.getItem("companyID")),
                IsActive: filter === "active" ? 1 : filter === "inactive" ? 0 : ""
            }

            const response = await fetchPostData('MaterialName/GetData_MaterialName', payload);
            setMaterialNames(response);           
        } catch (error: any) {
            // console.error('Error fetching material names:', error);
            // toastifyError(`Error fetching material names: ${error.message}`);
            setMaterialNames([]);
        } finally {
            setLoading(false);
        }
    };

    // Insert Material Name
    const insertMaterialName = async (formData: any) => {
        try {
            setLoading(true);
            const response = await fetchPostData('MaterialName/Insert_MaterialName', {
                ...formData,
                CompanyId: Number(localStorage.getItem('companyId'))
            });

            if (response) {
                toastifySuccess('Material name added successfully');
                await fetchMaterialNames();
                await fetchCounts();
                return true;
            }else{
                return false;
            }
        } catch (error: any) {
            console.error('Error inserting material name:', error);
            toastifyError(`Error adding material name: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Update Material Name
    const updateMaterialName = async (formData: any, id: number) => {
        try {
            // const payload = {
            //     ...formData
            //     MaterialID: materialId,
            //     CompanyId: dropdown.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            // };
            const response = await fetchPostData("MaterialType/Update_MaterialType", payload);
    
            const message = response[0].Message;
            if (message === "Already Exists MaterialTypeCode") {
                toastifyError("Code is already Present");
                return;
            }
    
            if (message === "Already Exists Description") {
                toastifyError("Description is already Present");
                return;
            }
            console.log("Update Response:", response);
                if (response) {
                toastifySuccess('Item updated successfully');
                setEditItemId(null);
                setDropdown([]);
                setMaintenanceTypeForm({ Description: '', MaterialGroupID: '', MaterialTypeCode: '' });
                setShowMaintenanceTypeModal(false);
                await fetchMaterialTypes();
                return true;
            }
            } catch (error: any) {
                toastifyError(`Error updating material type: ${error.message}`);
                return false;
            }
    };

    // Delete Material Name
    const deleteMaterialName = async (materialId: number) => {
        try {
            setLoading(true);
            const item = materialNames.find(x => x.MaterialTypeID === number);
            if (!item) return;

            const newStatus = item.IsActive ? 0 : 1;

            const payload = {
                MaterialID: materialId,
                IsActive: newStatus
            }

            const response = await fetchPostData('MaterialName/Delete_MaterialName', payload);

            if (response) {
                toastifySuccess('Material name deleted successfully');
                await fetchMaterialNames();
                await fetchCounts();
                return true;
            }
            return false;
        } catch (error: any) {
            console.error('Error deleting material name:', error);
            toastifyError(`Error deleting material name: ${error.message}`);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Get Single Material Name
    const getSingleMaterialName = async (materialId: number) => {
        try {
            const response = await fetchPostData('MaterialName/GetSingleData_MaterialName', {
                MaterialID: materialId,
                CompanyId: getCompanyId()
            });

            if (response) {
                return response;
            }
            return null;
        } catch (error: any) {
            console.error('Error fetching single material name:', error);
            toastifyError(`Error fetching material details: ${error.message}`);
            return null;
        }
    };

    const fetchCounts = async () => {
        try {
            const [activeResp, inactiveResp] = await Promise.all([
                fetch_Post_Data('MaterialName/GetData_MaterialName', { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
                fetch_Post_Data('MaterialName/GetData_MaterialName', { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
            ]);
    
            setActiveCounts(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
            setInactiveCounts(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
        }catch (err) {
            toastifyError("Error fetching counts");
        }
    };
    
    useEffect(() => {
        fetchMaterialNames();
        fetchCounts();
    }, [filter]);

    // Filter material names
    const filteredMaterialNames = useMemo(() => {
        return materialNames.filter(material => {
            const matchesSearch = searchTerm === '' ||
                material.MaterialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                material.MaterialNameCode.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = filterStatus === 'all' ||
                (filterStatus === 'active' && material.IsActive) ||
                (filterStatus === 'inactive' && !material.IsActive);

            return matchesSearch && matchesStatus;
        });
    }, [materialNames, searchTerm, filterStatus]);

    const tableData = filteredMaterialNames.length > 0
        ? filteredMaterialNames
        : [];

    // useEffect hooks
    useEffect(() => {
        fetchMaterialNames();
    }, [filterStatus]);

    useEffect(() => {
        fetchMaterialTypes();
        fetchMaterialGroups();
        fetchMaterialSpecifications();
    }, []);

    // Handle save
    const handleSaveMaterialName = async () => {
        if (!materialNameForm.MaterialName || !materialNameForm.MaterialNameCode ) {
            toastifyError('Please fill in all required fields');
            return;
        }

        if (editingMaterialName) {
            const success = await updateMaterialName(materialNameForm, editingMaterialName.MaterialID!);
            if (success) {
                setEditingMaterialName(null);
                setShowMaterialNameModal(false);
                resetForm();
            }
        } else {
            const success = await insertMaterialName(materialNameForm);
            if (success) {
                setShowMaterialNameModal(false);
                resetForm();
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setMaterialNameForm({
            MaterialName: '',
            MaterialTypeID: 0,
            MaterialGroupID: 0,
            UnitMeasurementID: 0,
            MaterialNameCode: '',
            IsActive: true,
            CompanyId: companyId || '',
            Description: '',
            Brand: '',
            Model: '',
            MaterialSpecificationID: 0,
            MaterialUnitID: 0,
            HSNCode: '',
            PartNo: '',
            Remarks: '',
            MaterialID: 0
        });
    };

    // Calculate statistics
    const getMaterialNamesByGroup = () => {
        const groupCount = materialNames.reduce((acc, material) => {
            acc[material.MaterialGroupID] = (acc[material.MaterialGroupID] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);
        return Object.keys(groupCount).length;
    };

    // Table columns configuration
    const columns: any[] = [
        {
            name: 'Code',
            selector: (row: MaterialName) => row.MaterialNameCode,
            sortable: true,
        },
        {
            name: 'Material Name',
            selector: (row: MaterialName) => row.MaterialName,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-font-medium">{row.MaterialName}</span>
            )
        },
        {
            name: 'Material Type',
            selector: (row: MaterialName) => {
                const materialType = materialTypes.find(mt => mt.MaterialTypeID === row.MaterialTypeID);
                return materialType ? materialType.MaterialTypeName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Material Group',
            selector: (row: MaterialName) => {
                const materialGroup = materialGroups.find(mg => mg.MaterialGroupID === row.MaterialGroupID);
                return materialGroup ? materialGroup.MaterialGroupName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Unit',
            selector: (row: MaterialName) => {
                const unit = unitMeasurements.find(u => u.UnitMeasurementID === row.UnitMeasurementID);
                return unit ? unit.UnitName : 'Unknown';
            },
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: MaterialName) => row.Description,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm material-name-text-gray-600" title={row.Description}>
                    {row.Description && row.Description.length > 30
                        ? `${row.Description.substring(0, 30)}...`
                        : row.Description || '-'
                    }
                </span>
            ),
        },
        {
            name: 'Brand',
            selector: (row: MaterialName) => row.Brand,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm">{row.Brand || '-'}</span>
            ),
        },
        {
            name: 'Model',
            selector: (row: MaterialName) => row.Model,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm">{row.Model || '-'}</span>
            ),
        },
        {
            name: 'HSN Code',
            selector: (row: MaterialName) => row.HSNCode,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm material-name-font-mono">{row.HSNCode || '-'}</span>
            ),
        },
        {
            name: 'Part No',
            selector: (row: MaterialName) => row.PartNo,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm material-name-font-mono">{row.PartNo || '-'}</span>
            ),
        },
        {
            name: 'Material ID',
            selector: (row: MaterialName) => row.MaterialID,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className="material-name-text-sm material-name-font-mono">#{row.MaterialID || '-'}</span>
            ),
        },
        {
            name: 'Status',
            selector: (row: MaterialName) => row.IsActive,
            sortable: true,
            cell: (row: MaterialName) => (
                <span className={`material-name-badge ${row.IsActive ? 'material-name-badge-success' : 'material-name-badge-error'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            name: 'Actions',
            cell: (row: MaterialName) => (
                <div className="material-name-flex material-name-gap-1">
                    <button onClick={() => { setSelectedId(row.MaterialTypeID!); setShowModal(true); }}
                        className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`} title={row.IsActive ? 'Deactivate' : 'Activate'}>
                        {row.IsActive ? <ToggleLeft className="list-icon-sm1" /> : <ToggleRight className="list-icon-sm1" />}
                    </button>

                    <button onClick={() => setEditItemId(row.MaterialNameID!)} className="material-name-btn-icon" title="Edit">
                        <Edit3 className="material-name-icon-sm" />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    //Company-Dropdown
    useEffect(() => {
        const fetchDropDown = async () => {
            try{
                const payload = { EmployeeID: localStorage.getItem("employeeID") };
                const response = await fetchPostData('Users/GetData_Company', payload);

                if(response){
                    const data = response;
                    setDropdownOptions(Array.isArray(data) ? data : []);
                }else{
                    toastifyError("Failed to load Dropdown.")
                }
            }catch(error: any){
                toastifyError("Failed to Load Description");
            }
        }
        fetchDropDown();
    }, [])

    const options = dropdownOptions.map(opt => ({
        value: opt.CompanyID,
        label: opt.CompanyName
    }));

    const resizeableColumns = useResizableColumns(columns).map(col => ({
        ...col,
        minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

  //Download-Excel_File
    const exportToExcel = () => {
        const filteredDataNew = filteredMaterialNames?.map(item => ({
            'Material-Type Code': item.MaterialTypeCode,
            'Description': item.Description,
            'Material Group': item.MaterialTypeID,
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
        <div className="material-name">
            {/* Header */}
            <div className="material-name-header">
                <div className="material-name-header-content">
                    <div className="material-name-title-section">
                        <Tag className="material-name-header-icon" />
                        <div>
                            <h1 className="material-name-title">Material Name Management</h1>
                            <p className="material-name-subtitle">
                                Manage material names, types, groups, and units
                            </p>
                        </div>
                    </div>
                    <div className="material-name-header-actions">
                        <button
                            onClick={() => {
                                setEditingMaterialName(null);
                                resetForm();
                                setShowMaterialNameModal(true);
                            }}
                            className="material-name-btn material-name-btn-primary"
                        >
                            <Plus className="material-name-icon" />
                            Add Material Name
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="material-name-main">
                <div className="material-name-content">
                    <div className="material-name-tab-content">
                        {/* Statistics Cards */}
                        <div className="material-name-grid material-name-grid-cols-1 material-name-md-grid-cols-4 material-name-gap-6 material-name-mb-6">
                            <div className="material-name-card cursor-pointer" onClick={() => setFilter("active")}>
                                <div className="material-name-card-content">
                                    <div className="material-name-flex material-name-items-center p-2">
                                        <div className="material-name-stat-icon material-name-stat-icon-green">
                                            <Tag className="material-name-icon" />
                                        </div>
                                        <div>
                                            <p className="material-name-text-sm material-name-text-gray-600">Active Materials</p>
                                            <p className="material-name-text-2xl material-name-font-bold">{activeCounts}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="material-name-card cursor-pointer" onClick={() => setFilter("inactive")}>
                                <div className="material-name-card-content">
                                    <div className="material-name-flex material-name-items-center p-2">
                                        <div className="material-name-stat-icon material-name-stat-icon-yellow">
                                            <Package className="material-name-icon" />
                                        </div>
                                        <div>
                                            <p className="material-name-text-sm material-name-text-gray-600">Inactive Materials</p>
                                            <p className="material-name-text-2xl material-name-font-bold">{inactiveCounts}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="material-name-card cursor-pointer" onClick={() => setFilter("all")}>
                                <div className="material-name-card-content">
                                    <div className="material-name-flex material-name-items-center p-2">
                                        <div className="material-name-stat-icon material-name-stat-icon-blue">
                                            <Package className="material-name-icon" />
                                        </div>
                                        <div>
                                            <p className="material-name-text-sm material-name-text-gray-600">Total Materials</p>
                                            <p className="material-name-text-2xl material-name-font-bold">{ activeCounts + inactiveCounts}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="material-name-card">
                                <div className="material-name-card-content">
                                    <div className="material-name-flex material-name-items-center p-2">
                                        <div className="material-name-stat-icon material-name-stat-icon-purple">
                                            <BarChart3 className="material-name-icon" />
                                        </div>
                                        <div>
                                            <p className="material-name-text-sm material-name-text-gray-600">Material Groups</p>
                                            <p className="material-name-text-2xl material-name-font-bold">{getMaterialNamesByGroup()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Data Table */}
                    <div className="material-name-mt-8">
                        <div className="material-name-card">
                            <div className="material-name-flex material-name-gap-4">
                                <div className="product-masonry-search-container mb-2 d-flex justify-between align-center">
                                    <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 mt-2 flex items-center gap-1">
                                    <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel</button>

                                    <input
                                        type="text"
                                        className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                        placeholder="Search..."
                                        maxLength={300}
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="material-name-card-content">
                                <DataTable
                                    columns={resizeableColumns}
                                    data={filteredMaterialNames}
                                    pagination
                                    paginationPerPage={20}
                                    paginationRowsPerPageOptions={[10, 20, 50, 100]}
                                    highlightOnHover
                                    striped
                                    responsive
                                    customStyles={customStyles}
                                    progressPending={loading}
                                    noDataComponent={<div style={{ padding: "20px" }}>No records found</div>}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Material Name Modal */}
            {showMaterialNameModal && (
                <div className="material-name-modal-overlay" onClick={() => setShowMaterialNameModal(false)}>
                    <div className="material-name-modal material-name-modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="material-name-modal-header">
                            <h3 className="material-name-modal-title">
                                {editingMaterialName ? 'Edit Material Name' : 'Add New Material Name'}
                            </h3>
                            <button onClick={() => setShowMaterialNameModal(false)} className="material-name-modal-close">
                                ×
                            </button>
                        </div>
                        <div className="material-name-modal-content">
                            <div className="material-name-space-y-4">
                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">
                                            Material Name <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={materialNameForm.MaterialName}
                                            onChange={(e) =>
                                                setMaterialNameForm({ ...materialNameForm, MaterialName: e.target.value })
                                            }
                                            className="material-name-input"
                                            placeholder="Material name"
                                            required
                                        />
                                    </div>
                               
                                    <div>
                                        <label className="material-name-label">
                                            Material Code <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={materialNameForm.MaterialNameCode}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, MaterialNameCode: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material code"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">
                                            Material Group <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select
                                            value={materialGroups.find(group => group.MaterialGroupID === materialNameForm.MaterialGroupID) ? {
                                                value: materialNameForm.MaterialGroupID,
                                                label: materialGroups.find(group => group.MaterialGroupID === materialNameForm.MaterialGroupID)?.MaterialGroupName || ''
                                            } : null}
                                            onChange={(selectedOption: any) => setMaterialNameForm({
                                                ...materialNameForm,
                                                MaterialGroupID: selectedOption ? selectedOption.value : 0
                                            })}
                                            options={materialGroups.map(group => ({
                                                value: group.MaterialGroupID,
                                                label: `${group.MaterialGroupName} - ${group.MaterialGroupCode}`
                                            }))}
                                            placeholder="Select Material Group"
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
                                            isSearchable={true}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">Material Unit ID</label>
                                        <input
                                            type="number"
                                            value={materialNameForm.MaterialUnitID}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, MaterialUnitID: parseInt(e.target.value) || 0 })}
                                            className="material-name-input"
                                            placeholder="Material unit ID"
                                        />
                                    </div>
                                </div>

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">
                                            Material Type <span style={{ color: 'red' }}>*</span>
                                        </label>
                                        <Select value={materialTypes.find(type => type.MaterialTypeID === materialNameForm.MaterialTypeID) ? {
                                                value: materialNameForm.MaterialTypeID,
                                                label: materialTypes.find(type => type.MaterialTypeID === materialNameForm.MaterialTypeID)?.Description || ''
                                            } : null}
                                            onChange={(selectedOption: any) => setMaterialNameForm({
                                                ...materialNameForm,
                                                MaterialTypeID: selectedOption ? selectedOption.value : 0
                                            })}
                                            options={materialTypes.map(type => ({
                                                value: type.MaterialTypeID,
                                                label: type.Description
                                            }))}
                                            placeholder="Select Material Type"
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
                                            isSearchable={true}
                                            required
                                        />
                                    </div> 

                                    <div>
                                        <label className="material-name-label">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            value={materialNameForm.Description}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, Description: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material description"
                                        />
                                    </div>
                                </div>

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">Brand</label>
                                        <input
                                            type="text"
                                            value={materialNameForm.Brand}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, Brand: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material brand"
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">Model</label>
                                        <input
                                            type="text"
                                            value={materialNameForm.Model}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, Model: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Material model"
                                        />
                                    </div>
                                </div>

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">HSN Code</label>
                                        <input
                                            type="text"
                                            value={materialNameForm.HSNCode}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, HSNCode: e.target.value })}
                                            className="material-name-input"
                                            placeholder="HSN code"
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">Part No</label>
                                        <input
                                            type="text"
                                            value={materialNameForm.PartNo}
                                            onChange={(e) => setMaterialNameForm({ ...materialNameForm, PartNo: e.target.value })}
                                            className="material-name-input"
                                            placeholder="Part number"
                                        />
                                    </div>
                                </div>

                                <div className="material-name-form-grid material-name-form-grid-2">
                                    <div>
                                        <label className="material-name-label">Material Specification</label>
                                        <Select
                                            value={materialSpecifications.find(spec => spec.MaterialSpecificationID === materialNameForm.MaterialSpecificationID) ? {
                                                value: materialNameForm.MaterialSpecificationID,
                                                label: materialSpecifications.find(spec => spec.MaterialSpecificationID === materialNameForm.MaterialSpecificationID)?.Description || ''
                                            } : null}
                                            onChange={(selectedOption: any) => setMaterialNameForm({
                                                ...materialNameForm,
                                                MaterialSpecificationID: selectedOption ? selectedOption.value : 0
                                            })}
                                            options={materialSpecifications.map(spec => ({
                                                value: spec.MaterialSpecificationID,
                                                label: spec.Description
                                            }))}
                                            placeholder="Select Specification"
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
                                            isSearchable={true}
                                            isClearable
                                        />
                                    </div>

                                    <div>
                                        <label className="material-name-label">Company ID</label>
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
                                            styles={{
                                                ...multiValue,
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

                                <div>
                                    <label className="material-name-label">Remarks</label>
                                    <textarea
                                        value={materialNameForm.Remarks}
                                        onChange={(e) => setMaterialNameForm({ ...materialNameForm, Remarks: e.target.value })}
                                        className="material-name-input"
                                        placeholder="Additional remarks"
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="material-name-modal-footer">
                            <button
                                onClick={() => { setShowMaterialNameModal(false);
                                    setEditingMaterialName(null);
                                    resetForm();
                                }} className="material-name-btn material-name-btn-secondary">
                                Cancel
                            </button>
                            <button onClick={handleSaveMaterialName} className="material-name-btn material-name-btn-primary" disabled={!materialNameForm.MaterialName || !materialNameForm.MaterialNameCode || loading}>
                                <Save className="material-name-icon" />
                                {editingMaterialName ? 'Update Material Name' : 'Add Material Name'}
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
                deleteMaterialName(selectedId);
            }
            setShowModal(false);
        }} />
        </>
    );
};

export default MaterialName;

// In this do some changes so that our Add, Update, Delete, Get would work.
// {
//   "CompanyId": "1",
//   "MaterialGroupID": "7",
//   "MaterialTypeID": "3",
//   "Description": "High-performance industrial motor",
//   "Brand": "Siemens",
//   "Model": "SIMOTICS S-1FK2",
//   "MaterialSpecificationID": "9",
//   "MaterialUnitID": "01",
//   "HSNCode": "85015210",
//   "PartNo": "MTR-1FK2-8501",
//   "Remarks": "Suitable for automation systems",
//   "MaterialNameCode": "INDMTR001"
// }