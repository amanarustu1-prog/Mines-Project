import React, { useEffect, useMemo, useState } from 'react';
// import React, { useEffect, useMemo, useState } from 'react';
import { AddUpListProps } from './AddUpListProps';
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';
import { AddDeleteUpadate } from '@/components/hooks/Api';
import DataTable from 'react-data-table-component';
import { customStyles, multiValue } from '@/common/Utility';
import Select from "react-select";
import ConfirmModal from '@/common/ConfirmModal';

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

const Filter = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
    </svg>
);

const Search = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

interface TableRow {
    [key: string]: any; // for dynamic keys like props.col3, props.col4, props.col5
    IsActive: boolean;
    CreatedDate: string | Date;
    UpdatedDate: string | Date;
}

interface ColumnsProps {
    col3: string;
    col4: string;
    col5: string;
}

const AddUpList: React.FC<AddUpListProps> = (props) => {
    const [activeTab, setActiveTab] = useState('list-overview');
    const { col1, col2, col3, col4, col5, getUrl, addUrl, singleDataUrl, upUrl, delUrl } = props;

    // Sample list data
    const [listData, setListData] = useState<ListItem[]>([]);
    const [statusFilter, setStatusFilter] = useState<number | string>(1);
    const [bloodGroupOptions, setBloodGroupOptions] = useState<any[]>([]);
    const [bloodGroupCode, setBloodGroupCode] = useState<any[]>([]);
    const [editItemId, setEditItemId] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"active" | "inactive" | "all">("all");
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [inactiveCount, setInactiveCount] = useState(0);
    const [activeCount, setActiveCount] = useState(0);







    // Define columns
    const columns = [

        { name: 'Code', selector: (row: ListItem) => row[props.col3], sortable: true },
        {
            name: 'Description',
            selector: (row: ListItem) => row[props.col5],
            sortable: true,
        },
        {
            name: 'Status',
            cell: (row: ListItem) => (
                <span className={`list-badge ${row.IsActive ? 'active' : 'inactive'}`}>
                    {row.IsActive ? 'Active' : 'Inactive'}
                </span>
            ),
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: (row: ListItem) => formatDate(row.CreatedDate),
            sortable: true,
        },
        {
            name: 'Last Modified',
            selector: (row: ListItem) => formatDate(row.UpdatedDate),
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row: ListItem) => (
                <div className="list-action-buttons">
                    <button
                        onClick={() => {
                            setSelectedId(row[props.col4]); // clicked item id
                            setShowModal(true);             // show confirmation modal
                        }}
                        className={`list-button ghost ${row.IsActive ? 'danger' : 'success'}`}
                        title={row.IsActive ? 'Deactivate' : 'Activate'}
                    >
                        {row.IsActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}
                    </button>

                    <button onClick={() => handleEdit(row)} className="list-button ghost primary" title="Edit">
                        <Edit3 className="list-icon-sm" />
                    </button>
                </div>
            ),
        },
    ];

    // Dropdown-data
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const payload = { EmployeeID: '1' };
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



    // New item form data
    const [newItem, setNewItem] = useState({
        code: '',
        description: '',
        isActive: true
    });

    // const deleteItem = async (id: number) => {
    //     alert(id);
    //     try{
    //        const response = await axios.post(props.delUrl, {[props.col4]: id, isActive: statusFilter});
    //        console.log(response.data);
    //        if(response.data.success){
    //             await fetchData(); 
    //             toastifySuccess("Item deleted successfully!");
    //        }else{
    //             toastifyError("Failed to delete item");
    //        }
    //     }catch(err){
    //         console.error("Error deleting item:", err);
    //         toastifyError("Error deleting item");
    //     }
    // }

    // ✅ Delete/Activate function
    const deleteItem = async (id: number) => {
        const item = listData.find(x => x[col4] === id);
        if (!item) return;

        const newStatus = item.IsActive ? 0 : 1; // 0=deactivate, 1=activate

        try {
            const response = await AddDeleteUpadate(delUrl, {
                [col4]: id,
                IsActive: newStatus,
            });

            if (response.data.success) {
                setListData(prev =>
                    prev.map(x =>
                        x[props.col4] === id ? { ...x, IsActive: newStatus } : x
                    )
                );
                toastifySuccess(`Item ${newStatus === 1 ? "activated" : "deactivated"} successfully!`);
            } else {
                toastifyError("Failed to update item status");
            }
        } catch (err) {
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

            const message = parsedData?.Table?.[0]?.message;
            // console.log("Update message:", message);

            if (message === "Already Update") {
                toastifyError("Code is already present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }

            if(message === " Description Already update") {
                toastifyError("Description is already Present");
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

            const message = parsedData?.Table?.[0]?.message;

            if (message === "Already Insert") {
                toastifyError("Code is already Present");
                setErrors({ CodeError: '', DescriptionError: '' });
                return;
            }

            if (message === "Description Already Insert") {
                toastifyError("Description is already Present");
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


    const formatDate = (dateString?: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);

        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            // second: "2-digit",
            // hour12: true,   
        });
    };

    // const toggleItemStatus = (id: number) => {
    //     setListData(prev =>
    //         prev.map(item =>
    //             item.Id === id
    //                 ? {
    //                     ...item,
    //                     isActive: !item.IsActive,
    //                     lastModified: new Date().toISOString().split('T')[0]
    //                 }
    //                 : item
    //         )
    //     );
    // };



    const options = bloodGroupOptions.map(opt => ({
        value: opt.CompanyID,
        label: opt.CompanyName
    }));





    // ✅ Filtered Data with universal search
    const filteredData = useMemo(() => {
        const searchLower = search.trim().toLowerCase();

        return listData.filter(item => {
            // 1. Status filter
            // if (filter === "active" && !item.IsActive) return false;
            if (filter === "inactive" && item.IsActive) return false;

            // 2. Search filter (check all values of the item)
            if (searchLower) {
                const values = Object.values(item)
                    .filter(v => v != null) // null/undefined skip
                    .map(v => v.toString().toLowerCase());

                const matched = values.some(val => val.includes(searchLower));
                if (!matched) return false;
            }

            return true;
        });
    }, [listData, filter, search]);


    // ✅ Counts
    // const activeCount = useMemo(
    //     () => listData.filter(item => item.IsActive).length,
    //     [listData]
    // );

    // const inactiveCount = useMemo(
    //     () => listData.filter(item => !item.IsActive).length,
    //     [listData]
    // );


    // active/inactive count
    useEffect(() => {
        setInactiveCount(listData.filter(x => !x.IsActive).length);
        setActiveCount(listData.filter(x => x.IsActive).length);
    }, [listData]);



    




    const renderTabContent = () => {
        switch (activeTab) {
            case 'list-overview':
                return (
                    <div className="list-space-y-4">
                        {/* Summary Cards */}
                        <div className="list-grid-4">
                            <div className="list-card mb-0" >
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

                            <div className="list-card mb-0  cursor-pointer" onClick={() => setFilter("active")}>
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
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.code}
                                                onChange={(e) => handleInputChange("code", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Item Code"
                                                maxLength={20}
                                            />
                                            {errors.CodeError !== 'true' ? (
                                                <p style={{ color: 'red', fontSize: '11px', margin: '0px', padding: '0px' }}>{errors.CodeError}</p>
                                            ) : null}
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-3">
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                value={newItem.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-9"
                                                placeholder="Description"
                                                maxLength={300}
                                            />
                                        </div>


                                        <div className="col-span-4">
                                            <Select
                                                value={bloodGroupCode} // should be an array of selected options for isMulti
                                                onChange={(selectedOptions) => setBloodGroupCode(selectedOptions)}
                                                options={options} // array of { value, label } objects
                                                isMulti
                                                isClearable
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={true}
                                                placeholder={`Select ${props.col1}`}
                                                className="basic-multi-select"
                                                styles={multiValue}
                                            />
                                        </div>






                                        {/* Buttons */}
                                        {/* <div className="col-span-2 flex gap-2">
                                            <button onClick={() => (editItemId ? updatedItem(editItemId) : handleSaveItem())}
                                                className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8">
                                                <Save className="list-icon-sm" />
                                                {editItemId ? "Update" : "Save"}
                                            </button>

                                            <button onClick={() => setNewItem({ code: "", description: "", isActive: true })}
                                                className="list-button outline small flex-1 h-8">
                                                Clear
                                            </button>
                                        </div> */}
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

                        {/* Items Table */}
                        {/* Table */}
                        <div className="list-card compact" style={{ height: '100%' }}>
                            {/* Search Input */}
                            <div className="flex justify-end">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="list-compact-input w-[20%] text-sm py-1 px-2 h-9 mt-2 mb-2 mr-2"
                                    placeholder="Search"
                                    maxLength={300}
                                />
                            </div>
                            <DataTable
                                columns={columns}
                                data={filteredData}
                                pagination
                                highlightOnHover
                                noDataComponent="No items found matching your criteria"
                                fixedHeader
                                fixedHeaderScrollHeight="300px"
                                customStyles={customStyles}
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
                {/* Main Container */}
                <div className="list-main-container container">

                    {/* Content Area */}
                    {renderTabContent()}
                </div>
            </div>

            <ConfirmModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={() => {
                    if (selectedId !== null) {
                        deleteItem(selectedId);  // Confirm → delete/activate
                    }
                    setShowModal(false);        // Close modal
                }}
            />

        </>
    );
}

export default AddUpList;


