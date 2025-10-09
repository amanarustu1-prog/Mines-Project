import React, { useEffect, useMemo, useState } from 'react';
import { AddUpListProps } from '../../ListManagement/AddUpListProps';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import DataTable from 'react-data-table-component';
import { customStyles, multiValue } from '@/common/Utility';
import ConfirmModal from '@/common/ConfirmModal';
import Select from "react-select";
import { fetchPostData, AddDeleteUpadate, fetch_Post_Data } from '@/components/hooks/Api';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import { Space_Not_Allow } from '@/common/validation';
import * as XLSX from 'xlsx';
import { getShowingDateText } from '@/common/DateFormat';

// Icon components (simplified SVG icons)
const Car = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h3m-1 4h6m4 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2.5M7 10H5a2 2 0 00-2 2v8a2 2 0 002 2h2m3 0h6m-6 0v-4m0 4v4m6-4v4m0 0h2a2 2 0 002-2v-8a2 2 0 00-2-2h-2.5" />
    </svg>
);

const List = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
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

interface ListItem {
    Id: number;
    ID: number;
    BloodGroupCode: string;
    BloodGroup: string;
    IsActive: boolean;
    CreatedDate: string;
    UpdatedDate: string;
    CompanyID: number | string;
    CompanyId: number | string;
    Description: string;
    [key: string]: any;
}

const MaterialType: React.FC<AddUpListProps> = (props) => {
    const [activeTab, setActiveTab] = useState('list-overview');
    const { col1, col2, col3, col4, col5, getUrl, addUrl, singleDataUrl, upUrl, delUrl } = props;

    // Sample list data
    const [listData, setListData] = useState<ListItem[]>([]);
    const [statusFilter, setStatusFilter] = useState<number | string>(1);
    const [bloodGroupOptions, setBloodGroupOptions] = useState<any[]>([]);
    const [bloodGroupCode, setBloodGroupCode] = useState<any[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"active" | "inactive" | "all">("active");
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);
    const [statusSortAsc, setStatusSortAsc] = useState(true); //For sorting Active/Inactive
    const [multiSelected, setMultiSelected] = useState({ optionSelected: null });
    const [updateStatus, setUpdateStatus] = useState(0);
    const [editval, setEditval] = useState([]);

    //Define columns
    const columns = [
        {
            name: 'Code',
            selector: (row: ListItem) => row[col3],
            sortable: true,
        },
        {
            name: 'Description',
            selector: (row: ListItem) => row[col5],
            sortable: true,
            cell: (row: ListItem) => (
                <span
                    title={row[col5]}
                    style={{
                        display: 'inline-block',
                        maxWidth: '550px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {row[col5]}
                </span>
            ),
        },
        {
            name: 'Status',
            cell: (row: ListItem) => (
                <span className={`list-badge ${row.IsActive ? 'active' : 'inactive'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: true,
            sortFunction: (rowA: ListItem, rowB: ListItem) => {
                if (statusSortAsc) {
                    return (rowA.IsActive === rowB.IsActive) ? 0 : rowA.IsActive ? -1 : 1;
                } else {
                    return (rowA.IsActive === rowB.IsActive) ? 0 : rowA.IsActive ? 1 : -1;
                }
            },
            onSort: () => {
                setStatusSortAsc((prev) => !prev);
            }
        },
        {
            name: 'Created Date',
            selector: (row: ListItem) => getShowingDateText(row.CreatedDate),
            sortable: true,
        },
        {
            name: 'Last Modified',
            selector: (row: ListItem) => getShowingDateText(row.UpdatedDate),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: ListItem) => (
                <div className="list-action-buttons">
                    <button
                        onClick={() => {
                            setSelectedId(row[col4]); // clicked item id
                            setShowModal(true);       // show confirmation modal
                        }}
                        className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`}
                        title={row.IsActive ? 'Deactivate' : 'Activate'}
                    >
                        {row.IsActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}
                    </button>

                    <button onClick={() => setEditItemId(row[col4])} className="list-button ghost primary" title="Edit">
                        <Edit3 className="list-icon-sm" />
                    </button>
                </div>
            ),
        },
    ];

    const resizeableColumns = useResizableColumns(columns).map(col => ({
        ...col,
        minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
    }));

    // Dropdown-data
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const payload = { EmployeeID: localStorage.getItem("employeeID") };
                const response = await fetchPostData(props.dropDownUrl, payload);
                // console.log(response);
                if (response) {
                    const data = response;
                    setBloodGroupOptions(Array.isArray(data) ? data : []);
                } else {
                    toastifyError("Failed to load Dropdown");
                }
            } catch (err) {
                // console.error("Error fetching dropdown:", err);                
                toastifyError("Error fetching Dropdown");
            }
        }
        fetchDropDown();
    }, [props.dropDownUrl]);

    const fetchCounts = async () => {
        try {
            const [activeResp, inactiveResp] = await Promise.all([
                fetch_Post_Data(getUrl, { IsActive: 1, CompanyId: Number(localStorage.getItem("companyID")) }),
                fetch_Post_Data(getUrl, { IsActive: 0, CompanyId: Number(localStorage.getItem("companyID")) }),
            ]);

            setActiveCount(Array.isArray(activeResp?.Data) ? activeResp.Data.length : 0);
            setInactiveCount(Array.isArray(inactiveResp?.Data) ? inactiveResp.Data.length : 0)
        } catch (err) {
            toastifyError("Error fetching counts");
        }
    };

    const options = bloodGroupOptions.map(opt => ({
        value: opt.CompanyID,
        label: opt.CompanyName
    }));

    const fetchData = async () => {
        try {
            if (filter === "all") {
                const activeResp = await fetch_Post_Data(getUrl, { IsActive: "", CompanyId: Number(localStorage.getItem("companyID")) });
                fetchCounts();
                const activeData = activeResp?.Data || [];
                // const inactiveData = inactiveResp?.Data || [];

                setListData([
                    ...(Array.isArray(activeData) ? activeData : []),
                    // ...(Array.isArray(inactiveData) ? inactiveData : [])
                ])
            } else {
                const value = {
                    IsActive: filter === "active" ? 1 : 0,
                    CompanyId: Number(localStorage.getItem("companyID")),
                };
                fetchCounts();
                const response = await fetch_Post_Data(getUrl, value);
                // console.log(response?.Data);
                const parsedData = response?.Data;
                setListData(Array.isArray(parsedData) ? parsedData : []);
            }
        } catch (err) {
            toastifyError("Error fetching data");
        }
    };

    useEffect(() => {
        fetchData();
        fetchCounts();
    }, [getUrl, filter]);

    const handleEdit = (item: ListItem) => {
        setEditItemId(item[col4]);
        setNewItem({
            code: item[col3],
            description: item[col5],
            isActive: item.IsActive,
        });
        // setBloodGroupCode(item.BloodGroupCode ? [{ value: item.BloodGroupCode, label: item.BloodGroupCode }] : []);
        setStatusFilter(item.IsActive ? 1 : 0);
    }

    const filteredData = useMemo(() => {
        const searchLower = search.trim().toLowerCase();

        return listData.filter(item => {
            if (filter === "active" && !item.IsActive) return false;
            if (filter === "inactive" && item.IsActive) return false;

            if (searchLower) {
                const values = Object.values(item).filter(v => v != null).map(v => v.toString().toLowerCase());
                const matched = values.some(val => val.includes(searchLower));
                if (!matched) return false;
            }
            return true;
        });
    }, [listData, filter, search]);

    // New item form data
    const [newItem, setNewItem] = useState({
        code: '',
        description: '',
        isActive: true
    });

    const deleteItem = async (id: number) => {
        const item = listData.find(x => x[col4] === id);
        if (!item) return;

        const newStatus = item.IsActive ? 0 : 1;

        console.log()
        try {
            const response = await AddDeleteUpadate(delUrl, {
                [col4]: id,
                IsActive: newStatus,
            });

            if (response.success) {
                await fetchData();
                toastifySuccess(`Item ${newStatus === 1 ? "activated" : "deactivated"} successfully!`);
            } else {
                toastifyError("Failed to update item status");
            }
        } catch (err) {
            // console.error("Error deleting item:", err);
            toastifyError("Error updating status");
        }
    };

    const updatedItem = async (id: number) => {
        const payload = {
            [col4]: id,
            [col5]: newItem.description,
            [col3]: newItem.code,
            CompanyId: bloodGroupCode.map(opt => opt.value).toString(),
        };

        try {
            const resp = await AddDeleteUpadate(upUrl, payload);

            let parsedData = null;
            try {
                parsedData = typeof resp?.data === "string" ? JSON.parse(resp.data) : resp.data;
            } catch (err) {
                parsedData = resp?.data;
            }

            const message = parsedData?.Table?.[0]?.Message;
            console.log("Update message:", message);

            // console.log("Already Exists "+ col3 );
            if (message === "Already Exists " + col3) {
                toastifyError("Code is already Present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }
            // console.log("Already Exists "+ col5 );
            if (message === "Already Exists " + col5) {
                toastifyError("Description is already Present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }

            if (resp?.success) {
                await fetchData();
                toastifySuccess("Item updated successfully!");
                setEditItemId(null);
                setNewItem({ code: "", description: "", isActive: true });
                setErrors({ CodeError: '', DescriptionError: '' });
                setBloodGroupCode([]);
            } else {
                toastifyError("Failed to update item");
            }
        } catch (error: any) {
            toastifyError(error?.response?.data?.message || "Error updating item");
        }
    };

    const tabs = [{ id: 'list-overview', label: 'List Overview', icon: List }];

    const handleInputChange = (field: string, value: string | boolean) => {
        setNewItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Insert-Data
    const handleSaveItem = async () => {
        check_Validation_Error();

        const payload = {
            [col5]: newItem.description,
            CompanyId: bloodGroupCode.map(opt => opt.value).toString() || localStorage.getItem("companyID"),
            [col3]: newItem.code
        };

        try {
            const response = await AddDeleteUpadate(addUrl, payload);

            // Parse nested data (because backend returns stringified JSON);
            let parsedData = null;
            try {
                parsedData = typeof response?.data === "string" ? JSON.parse(response.data) : response.data;
            } catch (err) {
                parsedData = response?.data;
            }

            const message = parsedData?.Table?.[0]?.Message;

            if (message === "Already Exists " + col3) {
                toastifyError("Code is already Present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }

            if (message === "Already Exists " + col5) {
                toastifyError("Description is already Present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }

            if (response?.success) {
                toastifySuccess("Item saved successfully!");
                setListData(prev => [...prev, response]);
                setNewItem({ code: '', description: '', isActive: true });
                setBloodGroupCode([]);
                fetchData();
                fetchCounts();
                setErrors({ CodeError: '', DescriptionError: '' });
            } else {
                toastifyError("Failed to save item");
            }
        } catch (error: any) {
            toastifyError(error?.response?.data?.message || "Error saving item");
        }
    };

    //Get Data after Update
    useEffect(() => {
        if (editItemId) {
            GetSingleData()
        }
    }, [editItemId, updateStatus])

    const GetSingleData = async () => {
        try {
            const val = { [col4]: editItemId };
            const res = await fetchPostData(singleDataUrl, val);

            if (res && Array.isArray(res) && res.length > 0) {
                const record = res[0];
                // console.log("Record to Edit:", record);

                setNewItem({
                    code: record[col3] || "",
                    description: record[col5] || "",
                    isActive: record.IsActive ?? true,
                });
                // console.log("Record to Edit:", record);
                // console.log("BloodGroupCode:", bloodGroupOptions);

                const companyIdField = record.Companyid ?? record.CompanyID ?? record.CompanyId ?? "";

                if (companyIdField && bloodGroupOptions.length > 0) {
                    const companyIds = String(companyIdField).split(",").map(id => id.trim());
                    // console.log("Company IDs:", companyIds);
                    // Match with bloodGroupOptions
                    const matchedOptions = bloodGroupOptions
                        .filter(opt => companyIds.includes(String(opt.CompanyID)))
                        .map(opt => ({
                            value: opt.CompanyID,
                            label: opt.CompanyName,
                        }));

                    setBloodGroupCode(matchedOptions);
                } else {
                    setBloodGroupCode([]);
                }
            } else {
                setNewItem({ code: "", description: "", isActive: true });
                setBloodGroupCode([]);
            }
        } catch (err) {
            toastifyError("Error fetching single data");
        }
    };

    //Check-Validation-Error 
    const [errors, setErrors] = useState({
        'CodeError': '',
        'DescriptionError': '',
    })

    const check_Validation_Error = () => {
        // e.preventDefault();
        // console.log(newItem);
        if (Space_Not_Allow(newItem.code)) {
            setErrors(prevValues => { return { ...prevValues, ['CodeError']: Space_Not_Allow(newItem.code) } });
        }
        if (Space_Not_Allow(newItem.description)) {
            setErrors(prevValues => { return { ...prevValues, ['DescriptionError']: Space_Not_Allow(newItem.description) } });
        }
    }

    const { DescriptionError, CodeError } = errors

    useEffect(() => {
        // console.log(DescriptionError, CodeError);
        if (DescriptionError === 'true' && CodeError === 'true') {
            if (editItemId) { updatedItem(editItemId) }
            else { handleSaveItem() }
        }
    }, [DescriptionError, CodeError,])

    //Reset-Form    
    useEffect(() => {
        resetForm();
    }, [activeTab, getUrl]);

    const resetForm = () => {
        setNewItem({ code: "", description: "", isActive: true });
        setBloodGroupCode([]);
        setMultiSelected({ optionSelected: null });
        setEditItemId(null);
        setFilter("active");
    };

    //Export-data
    const exportToExcel = () => {
        const filteredDataNew = filteredData?.map(item => ({
            'Code Number': item[col3],
            'Description': item[col5],
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
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'list-overview':
                return (
                    <div className="list-space-y-4">
                        {/* Summary Cards */}
                        <div className="list-grid-4">
                            <div className="list-card mb-0">
                                <div className="list-summary-card ">
                                    <div className="list-header-info ">
                                        <div className="list-header-icon">
                                            <Car className="list-icon-sm" />
                                        </div>
                                        <div>
                                            <h1 className="list-header-title">{col1}</h1>
                                            <p className="list-header-subtitle">{col2}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("active")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon active">
                                            <ToggleRight className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Active Items</p>
                                            <p className="list-summary-number active">{activeCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("inactive")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon inactive">
                                            <ToggleLeft className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Inactive Items</p>
                                            <p className="list-summary-number inactive">{inactiveCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0 cursor-pointer" onClick={() => setFilter("all")}>
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon total">
                                            <List className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Total Items</p>
                                            <p className="list-summary-number total">{activeCount + inactiveCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add New Item Form - Minimalist */}
                        <div className="list-card compact">
                            <div className="list-card-content">
                                <div className="list-compact-form">
                                    <h4 className="list-compact-title pt-2">
                                        <Plus className="list-icon-sm " />
                                        Add New Item
                                    </h4>

                                    <div className="grid grid-cols-12 gap-4 items-center">
                                        {/* Item Code */}
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.code}
                                                onChange={(e) => handleInputChange("code", e.target.value)}
                                                className="requiredColor list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Item Code"
                                                maxLength={20}
                                            />
                                            {errors.CodeError !== 'true' ? (
                                                <p style={{ color: 'red', fontSize: '11px', margin: '0px', padding: '0px' }}>{errors.CodeError}</p>
                                            ) : null}
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                className="requiredColor list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Description"
                                                maxLength={300}
                                            />
                                            {errors.DescriptionError !== 'true' ? (
                                                <p style={{ color: 'red', fontSize: '11px', margin: '0px', padding: '0px' }}>{errors.DescriptionError}</p>
                                            ) : null}
                                        </div>

                                        {/* Company */}
                                        <div className="col-span-4">
                                            <Select
                                                value={bloodGroupCode}
                                                onChange={(selectedOptions: any) => setBloodGroupCode(selectedOptions || [])}
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

                                        {/* Buttons */}
                                        <div className="col-span-2 flex gap-2">
                                            {
                                                editItemId ?
                                                    <button type="button" className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8" onClick={check_Validation_Error}>Update</button>
                                                    :
                                                    <button type="button" className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8" onClick={check_Validation_Error}>Save</button>
                                            }
                                            <button onClick={resetForm} className="list-button outline small flex-1 h-8">
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter and Search Bar */}
                        <div className="compact" style={{ height: '100%' }}>
                            <div className="flex justify-between align-items-center  mb-2 d-flex">
                                <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary bg-[#3b82f6]  py-1 h-9 px-2 flex items-center gap-1">
                                    <i className="fa fa-file-excel-o" aria-hidden="true"></i> Export to Excel</button>
                                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                                    className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                    placeholder="Search..." maxLength={300} />
                            </div>
                            <DataTable
                                columns={resizeableColumns}
                                data={filteredData}
                                // dense //To-Reduce-Space
                                pagination
                                highlightOnHover
                                noDataComponent="No items found matching your criteria"
                                defaultSortFieldId="status"
                                fixedHeader
                                fixedHeaderScrollHeight="300px"
                                customStyles={customStyles}
                                responsive
                                persistTableHead
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="list-management-container ">
                {/* Header */}

                {/* Main Container */}
                <div className="list-main-container container">

                    {/* Content Area */}
                    {renderTabContent()}
                </div>
            </div>

            <ConfirmModal show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        deleteItem(selectedId);
                    }
                    setShowModal(false);
                }} />
        </>
    );
}

export default MaterialType;


