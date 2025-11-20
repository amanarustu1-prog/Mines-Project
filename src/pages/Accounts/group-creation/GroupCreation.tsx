import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import '../ledger/Ledger.css';
import { FiPlusCircle } from "react-icons/fi";
import DataTable from 'react-data-table-component';
import { customStyles, requiredColorStyles } from '@/common/Utility';
import { fetchPostData } from '@/components/hooks/Api';
import { toastifyError, toastifySuccess } from '@/common/AlertMsg';
import { Edit3, Trash2 } from 'lucide-react';
import { getShowingDateText } from '@/common/DateFormat';
import useResizableColumns from '@/components/customHooks/UseResizableColumns';
import ConfirmModal from '@/common/ConfirmModal';
import { StylesConfig } from "react-select";

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

const GroupCreation = () => {

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<AccountGroups[]>([]);
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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

  const fetchUpdateData = async (form: AccountGroups, Id: number): Promise<boolean> => {
    try {
      const response = await fetchPostData('AccountingGroups/Update_AccountingGroups', {
        ...form,
        GroupID: Id,
        IsBank: form.IsBank ? 1 : 0,
        Iscash: form.Iscash ? 1 : 0,
        IsSale: form.IsSale ? 1 : 0,
        IsPurchase: form.IsPurchase ? 1 : 0,
        CompanyId: localStorage.getItem('companyID')
      });
      if (response) {
        toastifySuccess("Item Updated successfully");
        await fetchGetData();
        return true;
      }
      toastifyError("Item is not Updated");
      return false;
    } catch {
      toastifyError("Error in updating Data.");
      return false;
    }
  }

  const fetchDeleteData = async (Id: number) => {
    try {
      const response = await fetchPostData('AccountingGroups/Delete_AccountingGroups', {
        GroupID: Id,
        CompanyId: localStorage.getItem('companyID')
      });
      if (response) {
        toastifySuccess("Item Deleted successfully");
        await fetchGetData();
      } else {
        toastifyError("Item is not Deleted");
      }
    } catch {
      toastifyError("Error in deleting Data.");
    }
  }

  const handleInsertAndUpdate = async () => {
    if (editItemId) {
      const success = await fetchUpdateData(form, editItemId);

      if (success) {
        // resetData();
      }
    }
    if (!editItemId) {
      const success = await fetchInsertData(form);
      if (success) {
        // resetData();
      }
    }
  }

  useEffect(() => {
    fetchGetData();
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
      name: 'Under',
      selector: (row: AccountGroups) => row.parent,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span></span>
      )
    },
    {
      name: 'Is-Bank',
      selector: (row: AccountGroups) => row.IsBank,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.IsBank ? 'Yes' : 'No'}</span>
      )
    },
    {
      name: 'Is-Cash',
      selector: (row: AccountGroups) => row.Iscash,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.Iscash ? 'Yes' : 'No'}</span>
      )
    },
    {
      name: 'Is-Sale',
      selector: (row: AccountGroups) => row.IsSale,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.IsSale ? 'Yes' : 'No'}</span>
      )
    },
    {
      name: 'Is-Purchase',
      selector: (row: AccountGroups) => row.IsPurchase,
      sortable: true,
      cell: (row: AccountGroups) => (
        <span>{row.IsPurchase ? 'Yes' : 'No'}</span>
      )
    },

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
          <button onClick={() => { setEditItemId(row.GroupID) }} className="text-red-600 hover:text-red-800 material-name-btn-icon" title="Delete">
            <Trash2 className="material-name-icon-sm" />
          </button>

          <button onClick={() => { setSelectedId(row.GroupID); }} className="material-name-btn-icon" title="Edit">
            <Edit3 className="material-name-icon-sm" />
          </button>
        </div>
      )
    }
  ];

  const resizeableColumns = useResizableColumns(Columns).map(col => ({
    ...col, minWidth: typeof col.minWidth === "number" ? `${col.minWidth}px` : col.minWidth
  }));

  return (
    <div className="container-fluid">
      <header className="ledger-management-header GroupCreation_header mb-3">
        <div className="ledger-management-header-content">
          <div className="ledger-management-title-section">
            <FiPlusCircle size={30} />
            <div>
              <h1 className="ledger-management-title">
                Group Creation
              </h1>
              <p className="ledger-management-subtitle">Create and manage account groups</p>
            </div>
          </div>
        </div>
      </header>

      <div className="card">
        <div className="card-body">
          {/* Basic Details */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="ledger-management-label">Group Name <span className="text-danger">*</span></label>
              <input type="text" className="form-control form-control-sm challan w-100 requiredColor"
                value={form.Description}
                onChange={(e) => setForm({ ...form, Description: e.target.value })}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="ledger-management-label">Under {!form.primary_group && (<span className="text-danger"> *</span>)}</label>
              <Select
                classNamePrefix="select"
                placeholder="Select parent group"
                isClearable
                isDisabled={!!form.primary_group}
                styles={requiredColorStyles}
              />
              {(!form.primary_group && errors.parent) ? (
                <div className="invalid-feedback d-block">{errors.parent}</div>
              ) : null}
            </div>
          </div>

          {/* Settings */}
          <div className="row">
            <div className="col-md-3 mb-3">
              <label className="ledger-management-label">Bank</label>
              <Select
                classNamePrefix="select"
                styles={selectCompactStyles}
                placeholder="Select"
                value={{ label: form.IsBank ? 'Yes' : 'No', value: form.IsBank }}
                onChange={(opt) => handleChange('IsBank', opt ? !!opt.value : false)}
                options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
                isClearable={false}
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="ledger-management-label">Cash</label>
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
            <div className="col-md-3 mb-3">
              <label className="ledger-management-label">Sale</label>
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
            <div className="col-md-3 mb-3">
              <label className="ledger-management-label">Purchase</label>
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
          </div>

          {/* Description */}
          {/* <div className="row">
            <div className="col-md-12 mb-3">
              <label className="ledger-management-label">Description *</label>
              <textarea className="ledger-management-textarea challan w-100" rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description ? (
                <div className="invalid-feedback d-block">{errors.description}</div>
              ) : null}
            </div>
          </div> */}

          {/* Actions */}
          <div className="d-flex gap-2">
            <button className="btn btn-primary d-flex align-items-center gap-1" onClick={handleInsertAndUpdate}>
              {editItemId ? "Update" : "Save"}
            </button>
            <button className="btn btn-outline-secondary">
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <DataTable
            columns={resizeableColumns}
            data={groups}
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
        }} />
    </div>
  );
};

export default GroupCreation;

