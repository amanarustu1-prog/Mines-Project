import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../ledger/Ledger.css';
import DataTable from 'react-data-table-component';
import { customStyles, requiredColorStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import { toastifyError, toastifySuccess } from '@/common/AlertMsg';
import { getShowingDateText } from '@/common/DateFormat';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import ConfirmModal from '@/common/ConfirmModal';
import { StylesConfig } from "react-select";
import * as XLSX from 'xlsx';
import { FaFileExcel } from 'react-icons/fa';
import { Space_Not_Allow } from '@/common/validation';

//==================== Icon Components ====================
const Edit = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const Trash2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

interface AccountGroups {
  GroupID: number;
  Description: string;
  parent: string;
  primary_group: string;
  IsBank: boolean;
  Iscash: boolean;
  IsSale: boolean;
  IsPurchase: boolean;
  CreatedDate: string;
  UpdatedDate: string;
}

interface Groups {
  GroupID: number;
  Description: string;
}

const GroupCreation = () => {
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<AccountGroups[]>([]);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [accountGroup, setAccountGroup] = useState<Groups[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({
    DescriptionError: '',
    ParentGroupError: '',
  });

  const [form, setForm] = useState({
    GroupID: 0,
    Description: '',
    parent: '',
    primary_group: '',
    IsBank: false,
    Iscash: false,
    IsSale: false,
    IsPurchase: false,
    CreatedDate: '',
    UpdatedDate: ''
  });

  const selectCompactStyles: StylesConfig<any> = {
    control: (provided, state) => ({
      ...provided,
      minHeight: "33px",
      height: "33px",
      fontSize: "14px",
      padding: "0 2px",
      borderColor: state.isFocused ? "#6ea8ff" : "#84b3f8",
      boxShadow: state.isFocused ? "0 0 0 1px #84b3f8" : "none",
      "&:hover": { borderColor: "#6ea8ff" },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: "0 6px",
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0 6px",
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 6px",
    }),

    clearIndicator: (provided) => ({
      ...provided,
      padding: "0 6px",
    }),
  };

  // ===================TODO-Func====================
  const fetchGetData = async () => {
    const response = await fetchPostData('AccountingGroups/GetData_AccountingGroups', {
      "CompanyId": 1,
      "IsActive": 1
    });

    if (response && Array.isArray(response)) {
      const mapped: AccountGroups[] = response.map((row: any) => ({
        GroupID: Number(row.GroupID) || 0,
        Description: row.Description ?? '',
        parent: row.parent ?? '',
        primary_group: row.primary_group ?? '',
        IsBank: !!row.IsBank,
        Iscash: !!row.Iscash,
        IsSale: !!row.IsSale,
        IsPurchase: !!row.IsPurchase,
        CreatedDate: row.CreatedDate ?? '',
        UpdatedDate: row.UpdatedDate ?? ''
      }));
      setGroups(mapped);
    } else {
      setGroups([]);
    }
  }

  const fetchInsertData = async (form: AccountGroups) => {
    try {
      const response = await fetchPostData('AccountingGroups/Insert_AccountingGroups', {
        ...form,
        IsBank: form.IsBank ? 1 : 0,
        Iscash: form.Iscash ? 1 : 0,
        IsSale: form.IsSale ? 1 : 0,
        IsPurchase: form.IsPurchase ? 1 : 0,
        CompanyId: localStorage.getItem('companyID')
      });
      // console.log(response);

      if (response) {
        toastifySuccess("Item Added successfully");
        await fetchGetData();
        return true;
      } else {
        toastifyError("Item is not Inserted");
        return false;
      }
    } catch {
      toastifyError("Error in inserting a Data.");
      return false;
    }
  }

  const fetchUpdateData = async (form: AccountGroups, Id: number) => {
    try {
      const response = await fetchPostData('AccountingGroups/Update_AccountingGroups', {
        ...form,
        GroupID: Id,
        CompanyId: localStorage.getItem('companyID')
      });
      // console.log(response);

      if (response) {
        toastifySuccess("Item Updated Successfully");
        await fetchGetData();
        return true;
      } else {
        toastifyError("Item is not Updated");
        return false;
      }
    } catch {
      toastifyError("Error in Updating a Data.");
      return false;
    }
  }

  const fetchDeleteData = async (Id: number) => {
    try {
      const response = await fetchPostData('AccountingGroups/Delete_AccountingGroups', {
        "GroupID": Id,
        "IsActive": 0
      });
      // console.log(response);

      if (response) {
        toastifySuccess("Item is deleted successfully.");
        await fetchGetData();
        return true;
      } else {
        toastifyError("Item is not Deleted");
        return false;
      }
    }
    catch {
      toastifySuccess("Error in Deleting a Item");
    }
  }

  const fetchSingleData = async (Id: number) => {
    try {
      const response = await fetchPostData('AccountingGroups/GetSingleData_AccountingGroups', {
        "GroupID": Id
      })
      // console.log(response);

      if (response) {
        const record = response[0];
        setForm({
          GroupID: record.GroupID,
          Description: record.Description,
          parent: record.parent || '',
          primary_group: accountGroup.find((a) => a.GroupID === Number(record.parent))?.Description || '',
          IsBank: record.IsBank === "1" ? true : false,
          Iscash: record.Iscash === "1" ? true : false,
          IsSale: record.IsSale === "1" ? true : false,
          IsPurchase: record.IsPurchase === "1" ? true : false,
          CreatedDate: record.CreatedDate,
          UpdatedDate: record.UpdatedDate
        })
      }
    }
    catch {
      toastifyError("Error in getting a Single Data");
    }
  }

  const handleInsertAndUpdate = async () => {
    if (!checkValidationError()) return;
    if (editItemId) {
      const success = await fetchUpdateData(form, editItemId);

      if (success) {

        // resetData();
        handleReset();
      }
    }
    if (!editItemId) {
      const success = await fetchInsertData(form);
      if (success) {
        // resetData();
        handleReset();
      }
    }
  }

  // =================== DropDown ===================
  const fetchAccountGroup = async () => {
    try {
      const response = await fetchPostData('AccountingGroups/GetDataDropDown_AccountingGroups', {
        CompanyId: 1
      })
      // console.log(response);
      if (response && Array.isArray(response)) {
        setAccountGroup(response);
      } else {
        setAccountGroup([]);
      }
    }
    catch {
      toastifyError("Error in getting a Account Group");
    }
  }

  // =================== Valiadation ===================
  const checkValidationError = () => {
    let valid = true;

    const descriptionValidation = Space_Not_Allow(form.Description);
    const parentValidation = Space_Not_Allow(form.primary_group);

    setErrors({
      DescriptionError: descriptionValidation !== 'true' ? descriptionValidation : '',
      ParentGroupError: parentValidation !== 'true' ? parentValidation : '',
    });

    if (descriptionValidation !== 'true' || parentValidation !== 'true') {
      valid = false;
    }

    return valid;
  };

  useEffect(() => {
    if (editItemId) {
      fetchSingleData(editItemId);
    }
  }, [editItemId]);

  useEffect(() => {
    fetchGetData();
    fetchAccountGroup();
  }, []);

  const Columns = [
    {
      name: 'Group Name',
      selector: (row: AccountGroups) => row.Description,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.Description}</span>
      )
    },
    {
      name: 'Parent Group',
      selector: (row: AccountGroups) => row.primary_group,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.primary_group}</span>
      )
    },
    // {
    //   name: 'Is-Bank',
    //   selector: (row: AccountGroups) => row.IsBank,
    //   sortable: true,
    //   cell: (row: AccountGroups) => (
    //     <span>{row.IsBank ? 'Yes' : 'No'}</span>
    //   )
    // },
    // {
    //   name: 'Is-Cash',
    //   selector: (row: AccountGroups) => row.Iscash,
    //   sortable: true,
    //   cell: (row: AccountGroups) => (
    //     <span>{row.Iscash ? 'Yes' : 'No'}</span>
    //   )
    // },
    // {
    //   name: 'Is-Sale',
    //   selector: (row: AccountGroups) => row.IsSale,
    //   sortable: true,
    //   cell: (row: AccountGroups) => (
    //     <span>{row.IsSale ? 'Yes' : 'No'}</span>
    //   )
    // },
    // {
    //   name: 'Is-Purchase',
    //   selector: (row: AccountGroups) => row.IsPurchase,
    //   sortable: true,
    //   cell: (row: AccountGroups) => (
    //     <span>{row.IsPurchase ? 'Yes' : 'No'}</span>
    //   )
    // },

    // Dates
    {
      name: 'CreatedDate',
      selector: (row: AccountGroups) => getShowingDateText(row.CreatedDate),
      sortable: true,
    },
    {
      name: 'UpdatedDate',
      selector: (row: AccountGroups) => getShowingDateText(row.UpdatedDate),
      sortable: true,
    },

    //Actions
    {
      name: 'Actions',
      cell: (row: AccountGroups) => (
        <div className="d-flex gap-2">
          <button onClick={() => { setEditItemId(row.GroupID); }} className="material-name-btn-icon" title="Edit">
            <Edit className="material-name-icon-sm" />
          </button>

          <button onClick={() => { setSelectedId(row.GroupID); setShowModal(true); }} className="text-red-600 hover:text-red-800 material-name-btn-icon" title="Delete">
            <Trash2 className="material-name-icon-sm" />
          </button>
        </div>
      )
    }
  ];

  const handleChange = (field: string, value: boolean) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resizeableColumns = useResizableColumns(Columns).map(col => ({
    ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
  }));

  const filteredData = groups.filter((item: AccountGroups) => {
    const term = searchTerm.toLowerCase();

    return (
      item.Description?.toLowerCase().includes(term) ||
      item.parent?.toLowerCase().includes(term) ||
      item.primary_group?.toLowerCase().includes(term) ||
      item.IsBank?.toString().toLowerCase().includes(term) ||
      item.Iscash?.toString().toLowerCase().includes(term) ||
      item.IsSale?.toString().toLowerCase().includes(term) ||
      item.IsPurchase?.toString().toLowerCase().includes(term)
    );
  });

  const handleReset = () => {
    setForm({
      GroupID: 0,
      Description: '',
      parent: '',
      primary_group: '',
      IsBank: false,
      Iscash: false,
      IsSale: false,
      IsPurchase: false,
      CreatedDate: '',
      UpdatedDate: ''
    });
    setErrors({ DescriptionError: '', ParentGroupError: '' });
    setEditItemId(null);
  };

  const exportToExcel = () => {
    const rows = (filteredData.length ? filteredData : groups).map((item: AccountGroups) => ({
      "Group ID": item.GroupID,
      "Description": item.Description,
      "Parent": item.parent,
      "Primary Group": item.primary_group,
      "Is Bank": item.IsBank,
      "Is Cash": item.Iscash,
      "Is Sale": item.IsSale,
      "Is Purchase": item.IsPurchase,
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "groups.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container-fluid">
      <div className="card GroupCreation_header">
        <div className="card-body py-2">
          {/* Basic Details */}
          <div className="row align-items-center">
            {/* Group */}
            <div className="col-md-1 text-end px-0">
              <label className="ledger-management-label mb-0">Group Name <span className="text-danger">*</span></label>
            </div>
            <div className="col-md-3">
              <input type="text" className="form-control form-control-sm challan w-100 requiredColor"
                value={form.Description} placeholder='Group Name'
                onChange={(e) => setForm({ ...form, Description: e.target.value })}
              />
              {errors.DescriptionError && (
                <div className="invalid-feedback d-block">{errors.DescriptionError}</div>
              )}
            </div>

            {/* Parent Group */}
            <div className="col-md-1 text-end px-0">
              <label className="ledger-management-label mb-0">Parent Group <span className="text-danger"> *</span></label>
            </div>
            <div className="col-md-3">
              <Select
                classNamePrefix="select"
                placeholder="Select parent group"
                value={form.parent ?
                  {
                    value: form.parent,
                    label: accountGroup.find(a => a.GroupID === Number(form.parent))?.Description || ''
                  } : null
                }
                options={accountGroup.map((a) => ({
                  value: a.GroupID,
                  label: a.Description
                }))}
                onChange={(option) => (
                  setForm((prev) => ({
                    ...prev,
                    parent: Number(option?.value),
                    primary_group: option?.label
                  }))
                )}
                isClearable
                isDisabled={false}
                styles={requiredColorStyles}
              />
              {/* <Select className="w-100 requiredColor" placeholder="Select Ledger Group"
                value={getValue(form.parent, accountGroup)}
                options={getOptions(accountGroup)}
                onChange={getChange(setForm)}
                isClearable
                styles={requiredColorStyles}
              /> */}
              {errors.ParentGroupError && (
                <div className="invalid-feedback d-block">{errors.ParentGroupError}</div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className='row mt-2'>
            <div className='col-lg-12'>
              <div className="row align-items-center">
                {/* Bank */}
                <div className="col-md-1 text-end px-0">
                  <label className="ledger-management-label mb-0">Bank</label>
                </div>
                <div className="col-md-1">
                  <Select
                    classNamePrefix="select"
                    styles={selectCompactStyles}
                    placeholder="Select"
                    value={{ label: form.IsBank ? 'Yes' : 'No', value: form.IsBank }}
                    onChange={(opt) => handleChange('IsBank', opt?.value)}
                    options={[
                      { label: 'Yes', value: 1 },
                      { label: 'No', value: 0 }
                    ]}
                    isClearable={false}
                  />
                </div>
                {/* Cash */}
                <div className="col-md-1 text-end px-0">
                  <label className="ledger-management-label mb-0">Cash</label>
                </div>
                <div className="col-md-1">
                  <Select
                    classNamePrefix="select"
                    styles={selectCompactStyles}
                    placeholder="Select"
                    value={{ label: form.Iscash ? 'Yes' : 'No', value: form.Iscash }}
                    onChange={(opt) => handleChange('Iscash', opt ? !!opt.value : false)}
                    options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                    isClearable={false}
                  />
                </div>
                {/* Sale */}
                <div className="col-md-1 text-end px-0">
                  <label className="ledger-management-label mb-0">Sale</label>
                </div>
                <div className="col-md-1">
                  <Select
                    classNamePrefix="select"
                    styles={selectCompactStyles}
                    placeholder="Select"
                    value={{ label: form.IsSale ? 'Yes' : 'No', value: form.IsSale }}
                    onChange={(opt) => handleChange('IsSale', opt ? !!opt.value : false)}
                    options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                    isClearable={false}
                  />
                </div>
                {/* Purchase */}
                <div className="col-md-1 text-end px-0">
                  <label className="ledger-management-label mb-0">Purchase</label>
                </div>
                <div className="col-md-1">
                  <Select
                    classNamePrefix="select"
                    styles={selectCompactStyles}
                    placeholder="Select"
                    value={{ label: form.IsPurchase ? 'Yes' : 'No', value: form.IsPurchase }}
                    onChange={(opt) => handleChange('IsPurchase', opt ? !!opt.value : false)}
                    options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                    isClearable={false}
                  />
                </div>
                {/* Buttons */}
                <div className="col-md-4 d-flex gap-2 justify-content-end mt-2">
                  <button className="btn btn-primary d-flex align-items-center gap-1 " style={{ height: "40px" }} onClick={handleInsertAndUpdate}>
                    {editItemId ? "Update" : "Save"}
                  </button>

                  <button className="btn btn-outline-secondary text-white" style={{ backgroundColor: "#6c757d", borderColor: "#6c757d", height: "40px" }} onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body py-2">

              {/* Search + Export Row */}
              <div className="d-flex justify-content-end align-items-center gap-3 mb-2">
                <input type="text" placeholder="Search..." className="form-control form-control-sm challan"
                  style={{ width: "200px", borderRadius: "5px" }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <button type="button" onClick={exportToExcel} className="btn btn-sm btn-primary py-1 d-flex px-2 align-items-center gap-2">
                  <FaFileExcel size={14} /> Export
                </button>
              </div>

              {/* Data Table */}
              <DataTable
                columns={resizeableColumns}
                data={filteredData}
                pagination
                highlightOnHover
                striped
                customStyles={customStyles}
                progressPending={loading}
              />
            </div>
          </div>

          <ConfirmModal show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={() => {
              if (selectedId !== null) {
                fetchDeleteData(selectedId);
              }
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCreation;