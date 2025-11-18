import React, { useState } from 'react';
import Select from 'react-select';
import '../ledger/Ledger.css';
import { FiPlusCircle } from "react-icons/fi";
import DataTable from 'react-data-table-component';
import { customStyles } from '@/common/Utility';
import { fetch_Post_Data, fetchPostData } from '@/components/hooks/Api';
import { toastifyError, toastifySuccess } from '@/common/AlertMsg';
import { Edit3, Trash2 } from 'lucide-react';

const GroupCreation = () => {
  const [form, setForm] = useState({
    groupName: '',
    aliasName: '',
    parentGroup: '',
    parent: '',
    nature: '',
    affectsGrossProfit: false,
    description: '',
    CompanyId: '',
    primary_group: false,
    IsBank: false,
    Iscash: false,
    IsSale: false,
    IsPurchase: false,
    isActive: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [parentOptions, setParentOptions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Options (can be wired to API later)
  const parentGroups = [
    'Primary',
    'Capital Account',
    'Loans (Liability)',
    'Current Liabilities',
    'Sundry Creditors',
    'Fixed Assets',
    'Investments',
    'Current Assets',
    'Bank Accounts',
    'Cash-in-Hand',
    'Sundry Debtors',
    'Sales Account',
    'Purchase Account',
    'Direct Incomes',
    'Indirect Incomes',
    'Direct Expenses',
    'Indirect Expenses',
  ];

  const natures = ['Assets', 'Liabilities', 'Income', 'Expense'];

  const selectCompactStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '33px',
      height: '33px',
      fontSize: '14px',
      padding: '0 2px',
      borderColor: state.isFocused ? '#6ea8ff' : '#84b3f8',
      boxShadow: state.isFocused ? '0 0 0 1px #84b3f8' : 'none',
      '&:hover': { borderColor: '#6ea8ff' },
    }),
    valueContainer: (provided) => ({ ...provided, padding: '0 6px' }),
    indicatorsContainer: (provided) => ({ ...provided, padding: '0 6px' }),
    dropdownIndicator: (provided) => ({ ...provided, padding: '0 6px' }),
    clearIndicator: (provided) => ({ ...provided, padding: '0 6px' }),
  };

  const refreshData = () => {
    if (!form.CompanyId) return;
    setLoading(true);
    // Load table
    fetch_Post_Data('AccountingGroups/GetData_AccountingGroups', {
      CompanyId: form.CompanyId,
      IsActive: 1,
    })
      .then((res) => {
        setGroups(res?.Data || []);
      })
      .catch(() => setGroups([]))
      .finally(() => setLoading(false));

    // Load parent dropdown
    fetch_Post_Data('AccountingGroups/GetDataDropDown_AccountingGroups', {
      CompanyId: form.CompanyId,
    })
      .then((res) => {
        const rows = res?.Data || [];
        const opts = rows.map(r => ({ label: r.Description || r.GroupName || r.groupName, value: r.GroupID || r.GroupId || r.id }));
        setParentOptions(opts);
      })
      .catch(() => setParentOptions([]));
  };

  const onEdit = (row) => {
    setEditingId(row.GroupID || row.id || null);
    setForm(prev => ({
      ...prev,
      groupName: row.Description || row.GroupName || row.groupName || '',
      aliasName: row.AliasName || row.aliasName || '',
      parentGroup: row.parentName || row.ParentName || row.parent || row.parentGroup || '',
      parent: row.parent || row.Parent || row.ParentID || row.ParentId || row.parentGroup || '',
      nature: row.nature || '',
      description: row.Description || row.description || '',
      primary_group: row.primary_group ? true : false,
      IsBank: row.IsBank ? true : false,
      Iscash: row.Iscash ? true : false,
      IsSale: row.IsSale ? true : false,
      IsPurchase: row.IsPurchase ? true : false,
      isActive: row.IsActive !== undefined ? !!row.IsActive : !!row.isActive,
    }));
  };

  const onDelete = (row) => {
    const payload = {
      GroupID: row.GroupID || row.id,
      IsActive: 0,
    };
    setLoading(true);
    fetchPostData('AccountingGroups/Delete_AccountingGroups', payload)
      .then(() => {
        toastifySuccess('Group deleted');
        refreshData();
      })
      .catch(() => toastifyError('Failed to delete'))
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (form.CompanyId && String(form.CompanyId).trim() !== '') {
      refreshData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.CompanyId]);

  const columns = [
    { name: 'Group Name', selector: row => row.Description || row.GroupName || row.groupName, sortable: true },
    { name: 'Parent Group', selector: row => row.parentName || row.ParentName || row.parentGroup || row.parent || '-', sortable: true },
    { name: 'Primary', selector: row => (row.primary_group ? 'Yes' : 'No'), sortable: true },
    { name: 'Nature', selector: row => row.nature || '-', sortable: true },
    { name: 'Bank', selector: row => (row.IsBank ? 'Yes' : 'No'), sortable: true },
    { name: 'Cash', selector: row => (row.Iscash ? 'Yes' : 'No'), sortable: true },
    { name: 'Sale', selector: row => (row.IsSale ? 'Yes' : 'No'), sortable: true },
    { name: 'Purchase', selector: row => (row.IsPurchase ? 'Yes' : 'No'), sortable: true },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="d-flex gap-2">
          <button  className="text-red-600 hover:text-red-800 material-name-btn-icon" title="Delete">
            <Trash2 className="material-name-icon-sm" />
          </button>

          <button  className="material-name-btn-icon" title="Edit">
            <Edit3 className="material-name-icon-sm" />
          </button>
        </div>
      )
    }
  ];

  const sampleGroups = [];

  const handleChange = (key, value) => {
    // Keep parentGroup and parent in sync when changing parent dropdown
    if (key === 'parentGroup' || key === 'parent') {
      setForm((prev) => ({ ...prev, parentGroup: value, parent: value }));
    } else {
      setForm((prev) => ({ ...prev, [key]: value }));
    }
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.groupName.trim()) e.groupName = 'Group name is required';
    if (!form.description?.trim()) e.description = 'Description is required';
    if (!form.CompanyId || String(form.CompanyId).trim() === '') e.CompanyId = 'CompanyId is required';
    if (!form.primary_group && !form.parent) e.parent = 'Select parent or mark as Primary Group';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSave = () => {
    if (!validate()) return;
    const payload = {
      Description: (form.description && form.description.trim() !== '') ? form.description : form.groupName,
      CompanyId: form.CompanyId,
      primary_group: form.primary_group ? 1 : 0,
      parent: form.primary_group ? null : form.parent,
      IsBank: form.IsBank ? 1 : 0,
      Iscash: form.Iscash ? 1 : 0,
      IsSale: form.IsSale ? 1 : 0,
      IsPurchase: form.IsPurchase ? 1 : 0,
      GroupID: editingId || undefined,
    };
    setLoading(true);
    const url = editingId ? 'AccountingGroups/Update_AccountingGroups' : 'AccountingGroups/Insert_AccountingGroups';
    fetchPostData(url, payload)
      .then(() => {
        toastifySuccess(editingId ? 'Group updated' : 'Group created');
        onReset();
        setEditingId(null);
        refreshData();
      })
      .catch(() => toastifyError('Failed to save group'))
      .finally(() => setLoading(false));
  };

  const onReset = () => {
    setForm({
      groupName: '',
      aliasName: '',
      parentGroup: '',
      parent: '',
      nature: '',
      affectsGrossProfit: false,
      description: '',
      CompanyId: '',
      primary_group: false,
      IsBank: false,
      Iscash: false,
      IsSale: false,
      IsPurchase: false,
      isActive: true,
    });
    setErrors({});
  };




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
              <label className="ledger-management-label">Group Name *</label>
              <input
                type="text"
                className={`form-control form-control-sm challan w-100 ${errors.groupName ? 'is-invalid' : ''}`}
                value={form.groupName}
                onChange={(e) => handleChange('groupName', e.target.value)}
              />
              {errors.groupName ? (
                <div className="invalid-feedback d-block">{errors.groupName}</div>
              ) : null}
            </div>

            <div className="col-md-6 mb-3">
              <label className="ledger-management-label">Under{form.primary_group ? '' : '*'} </label>
              <Select
                classNamePrefix="select"
                styles={selectCompactStyles}
                placeholder="Select parent group"
                value={form.parent ? { label: form.parentGroup, value: form.parent } : null}
                onChange={(opt) => {
                  if (opt) {
                    // opt.value is GroupID, opt.label is group name/description
                    setForm(prev => ({ ...prev, parent: opt.value, parentGroup: opt.label }));
                    if (errors.parent) setErrors(prev => ({ ...prev, parent: '' }));
                  } else {
                    setForm(prev => ({ ...prev, parent: '', parentGroup: '' }));
                  }
                }}
                options={parentOptions.length ? parentOptions : parentGroups.map((g) => ({ label: g, value: g }))}
                isClearable
                isDisabled={form.primary_group}
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

          {/* <div className="row">
            <div className="col-md-6 mb-3">
              <label className="ledger-management-label">Company Id *</label>
              <input
                type="text"
                className={`ledger-management-input w-100 ${errors.CompanyId ? 'is-invalid' : ''}`}
                value={form.CompanyId}
                onChange={(e) => handleChange('CompanyId', e.target.value)}
              />
              {errors.CompanyId ? (
                <div className="invalid-feedback d-block">{errors.CompanyId}</div>
              ) : null}
            </div>
            <div className="col-md-6 mb-3 d-flex align-items-end">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="primary_group"
                  checked={form.primary_group}
                  onChange={(e) => handleChange('primary_group', e.target.checked)}
                />
                <label className="form-check-label" htmlFor="primary_group">
                  Primary Group
                </label>
              </div>
            </div>
          </div> */}

          {/* Description */}
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="ledger-management-label">Description *</label>
              <textarea
                className="ledger-management-textarea challan w-100"
                rows={3}
                value={form.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
              {errors.description ? (
                <div className="invalid-feedback d-block">{errors.description}</div>
              ) : null}
            </div>
          </div>

          {/* Actions */}
          <div className="d-flex gap-2">
            <button className="btn btn-primary d-flex align-items-center gap-1" onClick={onSave}>
              Save
            </button>
            <button className="btn btn-outline-secondary" onClick={onReset}>
              Reset
            </button>

          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <DataTable
            columns={columns}
            data={groups.length ? groups : sampleGroups}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
            progressPending={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupCreation;

