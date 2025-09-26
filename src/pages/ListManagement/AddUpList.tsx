import React, { useEffect, useState } from 'react';
import { AddUpListProps } from './AddUpListProps';
import axios from "../../interceptors/axios";
import { toastifySuccess, toastifyError } from '@/common/AlertMsg';

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

const AddUpList: React.FC<AddUpListProps> = (props) => {
    const [activeTab, setActiveTab] = useState('list-overview');

    // Sample list data
    const [listData, setListData] = useState<ListItem[]>([]);
    const [statusFilter, setStatusFilter] = useState<number | string>(1);
    const [bloodGroupOptions, setBloodGroupOptions] = useState<any[]>([]);
    const [bloodGroupCode, setBloodGroupCode] = useState('');
    const [editItemId, setEditItemId] = useState<number | null>(null);

    // Dropdown-data
    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const payload = { EmployeeID: '1' };
                const response = await axios.post(props.dropDownUrl, payload);
                const parsedData = JSON.parse(response.data.data);
                if (response.data.success) {
                    const data = parsedData.Table;
                    setBloodGroupOptions(Array.isArray(data) ? data : []);
                    // console.log("Hello " + bloodGroupOptions);
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

    const fetchData = async () => {
        try {
            const value = { IsActive: statusFilter, CompanyId: Number(localStorage.getItem("employeeID")) };
            const response = await axios.post(props.getUrl, value);
            const parsedData = JSON.parse(response.data.data);
            // console.log(parsedData.Table);
            setListData(parsedData.Table);
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        fetchData();
    }, [props.getUrl, statusFilter]);

    const handleEdit = (item: ListItem) => {
        setEditItemId(item[props.col4]);
        setNewItem({
            code: item[props.col3],
            description: item[props.col5],
            isActive: item.IsActive,
        });
        setBloodGroupCode(item.BloodGroupCode || "");
        setStatusFilter(item.IsActive ? 1 : 0);
    }

    const filteredData = listData.filter((item) => {
        if (statusFilter === "1") return item.IsActive;
        if (statusFilter === "0") return !item.IsActive;
        return true;
    });

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

    const deleteItem = async (id: number) => {
        const item = listData.find(x => x[props.col4] === id);
        if (!item) return;

        const newStatus = item.IsActive ? 0 : 1;

        try {
            const response = await axios.post(props.delUrl, {
                [props.col4]: id,
                IsActive: newStatus,
            });

            if (response.data.success) {
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
        // alert(id);
        const payload = {
            [props.col4]: id,
            [props.col5]: newItem.description,
            [props.col3]: newItem.code,
            CompanyId: Number(localStorage.getItem("employeeID"))
        }
        try {
            const resp = await axios.post(props.upUrl, payload);
            // console.log(resp);
            if (resp.data.success) {
                await fetchData();
                toastifySuccess("Item updated successfully!");

                setEditItemId(null);
                setNewItem({ code: "", description: "", isActive: true });
                setBloodGroupCode("");
            } else {
                toastifyError("Failed to update item");
            }
        } catch (err) {
            // console.error("Error updating item:", err);
            toastifyError("Error updating item");
        }
    }

    const tabs = [{ id: 'list-overview', label: 'List Overview', icon: List }];

    const handleInputChange = (field: string, value: string | boolean) => {
        setNewItem(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Insert-Data
    const handleSaveItem = async () => {
        if (!newItem.code.trim() || !newItem.description.trim() || !bloodGroupCode) {
            toastifyError("Please fill in all required fields");
            return;
        }

        const payload = {
            [props.col5]: newItem.description,
            CompanyId: 1,
            [props.col3]: newItem.code
        };


        try {
            // console.log("Payload sent:", payload);
            const response = await axios.post(props.addUrl, payload);
            setListData(prev => [...prev, response.data]);
            setNewItem({ code: '', description: '', isActive: true });
            setBloodGroupCode('');
            fetchData();
            toastifySuccess("Item saved successfully!");
        } catch (error) {
            // console.error("Error saving item:", error);
            toastifyError("Error saving item");
        }
    };

    const formatDate = (dateString?: string): string => {
        if (!dateString) return "Null"; 
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

    const activeCount = listData.filter(item => item.IsActive).length;
    const inactiveCount = listData.filter(item => !item.IsActive).length;

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
                                            <h1 className="list-header-title">{props.col1}</h1>
                                            <p className="list-header-subtitle">{props.col2}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-card mb-0">
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

                            <div className="list-card mb-0">
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

                            <div className="list-card mb-0">
                                <div className="list-summary-card">
                                    <div className="list-summary-content">
                                        <div className="list-summary-icon total">
                                            <List className="list-icon-lg" />
                                        </div>
                                        <div>
                                            <p className="list-summary-text">Total Items</p>
                                            <p className="list-summary-number total">{listData.length}</p>
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
                                        <div className="col-span-2">
                                            <input
                                                type="text"
                                                value={newItem.code}
                                                onChange={(e) => handleInputChange("code", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-8"
                                                placeholder="Item Code"
                                                maxLength={20}
                                            />
                                        </div>

                                        {/* Description */}
                                        <div className="col-span-2">
                                            <input
                                                type="text"
                                                value={newItem.description}
                                                onChange={(e) => handleInputChange("description", e.target.value)}
                                                className="list-compact-input w-full text-sm py-1 px-2 h-8"
                                                placeholder="Description"
                                                maxLength={300}
                                            />
                                        </div>

                                        {/* Status */}
                                        <div className="col-span-2">
                                            <select
                                                value={statusFilter}
                                                onChange={(e) => setStatusFilter(e.target.value)}
                                                className="list-compact-select w-full py-1 px-2 h-8 text-sm"
                                            >
                                                <option value="">Select Status</option>
                                                <option value="1">Active</option>
                                                <option value="0">Inactive</option>
                                            </select>
                                        </div>

                                        {/* Company */}
                                        <select
                                            value={bloodGroupCode}
                                            onChange={(e) => setBloodGroupCode(e.target.value)}
                                            className="list-compact-select w-full py-1 px-2 h-8 text-sm"
                                        >
                                            <option value="">Select {props.col1}</option>
                                            {
                                                bloodGroupOptions.map((opt) => (
                                                    <option key={opt.CompanyID} value={opt['CompanyID']}>
                                                        {opt['CompanyName']}
                                                    </option>
                                                ))
                                            }
                                        </select>

                                        {/* Buttons */}
                                        <div className="col-span-2 flex gap-2">
                                            <button onClick={() => (editItemId ? updatedItem(editItemId) : handleSaveItem())}
                                                className="list-button primary small flex-1 flex items-center justify-center gap-1 h-8">
                                                <Save className="list-icon-sm" />
                                                {editItemId ? "Update" : "Save"}
                                            </button>

                                            <button onClick={() => setNewItem({ code: "", description: "", isActive: true })}
                                                className="list-button outline small flex-1 h-8">
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter and Search Bar */}

                        {/* Items Table */}
                        <div className="list-card">
                            {/* Table-Data */}
                            <div className="list-card-content" style={{ padding: 0 }}>
                                <div className="list-table-container">
                                    <table className="list-table">
                                        <thead className="list-table-header">
                                            <tr>
                                                <th>Code</th>
                                                <th>Description</th>
                                                <th>Status</th>
                                                <th>Created Date</th>
                                                <th>Last Modified</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredData.map((item, Id) => (
                                                <tr key={item[props.col4] || item.Id} className="list-table-row">
                                                    <td className="list-table-cell">{item[props.col3]}</td>
                                                    <td className="list-table-cell">{item[props.col5]}</td>
                                                    <td className="list-table-cell">
                                                        <span className={`list-badge ${item.IsActive ? 'active' : 'inactive'}`}>
                                                            {item.IsActive ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td className="list-table-cell mono">{formatDate(item.CreatedDate)}</td>
                                                    <td className="list-table-cell mono">{formatDate(item.UpdatedDate || "Null")}</td>
                                                    <td className="list-table-cell">
                                                        <div className="list-action-buttons">
                                                            <button onClick={() => deleteItem(item[props.col4])}
                                                                className={`list-button ghost ${item.IsActive ? 'danger' : 'success'}`}
                                                                title={item.IsActive ? 'Deactivate' : 'Activate'}>
                                                                {item.IsActive ? <ToggleLeft className="list-icon-sm" /> : <ToggleRight className="list-icon-sm" />}
                                                            </button>
                                                            <button onClick={() => handleEdit(item)} className="list-button ghost primary" title="Edit">
                                                                <Edit3 className="list-icon-sm" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredData.length === 0 && (
                                                <tr>
                                                    <td colSpan={6} className="list-table-cell empty">
                                                        No items found matching your criteria
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
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
        <div className="list-management-container ">
            {/* Header */}

            {/* Main Container */}
            <div className="list-main-container container">

                {/* Content Area */}
                {renderTabContent()}
            </div>
        </div>
    );
}

export default AddUpList;