import React from 'react';
import AddUpList from './AddUpList';
import { useLocation, useParams } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import ListManagementRoute from './ListManagementRoute';

const ListManagement = () => {
    // const pageEndPoint = window.location.pathname.slice(1);

    const { section, page } = useParams();
    const pageEndPoint = `${section}/${page}`;

    return (
        <div className="section-body view_page_design pt-1">
            <div className="row clearfix">
                <div className="col-12 col-sm-12">
                    <div className="card Agency name-card">
                        <div className="card-body">
                            {
                                pageEndPoint === "hr/blood-group" ?
                                    <AddUpList {...{ pageEndPoint }} col1="Blood Group" col2="Master Tables with codes and descriptions for Blood Types" col3="BloodGroupCode" col4="Id" col5="Description"
                                        getUrl='BloodGroup/GetData_BloodGroup'
                                        addUrl="BloodGroup/Insert_BloodGroup"
                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                        upUrl="BloodGroup/Update_BloodGroup"
                                        delUrl="BloodGroup/Delete_BloodGroup"
                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                    />
                                    :
                                    pageEndPoint === "safetyLegal/case-status" ?
                                        <AddUpList {...{ pageEndPoint }} col1="Case Status" col2="Master Tables with codes and descriptions for Case Status" col3="CaseStatusCode" col4="CaseStatusID" col5="Description"
                                            getUrl='CaseStatus/GetData_CaseStatus'
                                            addUrl="CaseStatus/Insert_CaseStatus"
                                            singleDataUrl="CaseStatus/GetSingleData_CaseStatus"
                                            upUrl="CaseStatus/Update_CaseStatus"
                                            delUrl="CaseStatus/Delete_CaseStatus"
                                            dropDownUrl="CaseStatus/GetDataDropDown_CaseStatus"
                                        />
                                        :
                                        pageEndPoint === "masterTable/case-type" ?
                                            <AddUpList {...{ pageEndPoint }} col1="Case Type" col2="Master Tables with codes and descriptions for Case Types" col3="" col4="CaseTypeID" col5=""
                                                getUrl='CaseType/GetData_CaseType'
                                                addUrl="CaseType/Insert_CaseType"
                                                singleDataUrl="CaseType/GetSingleData_CaseType"
                                                upUrl="CaseType/Update_CaseType"
                                                delUrl="CaseType/Delete_CaseType"
                                                dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                            />
                                            :
                                            pageEndPoint === "masterTable/current-location" ?
                                                <AddUpList {...{ pageEndPoint }} col1="Current Location" col2="Master Tables with codes and descriptions for Current Locations" col3="" col4="" col5=""
                                                    getUrl='BloodGroup/GetData_BloodGroup'
                                                    addUrl="BloodGroup/Insert_BloodGroup"
                                                    singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                    upUrl="BloodGroup/Update_BloodGroup"
                                                    delUrl="BloodGroup/Delete_BloodGroup"
                                                    dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                />
                                                :
                                                pageEndPoint === "inventory/material-group" ?
                                                    <AddUpList {...{ pageEndPoint }} col1="Material Group" col2="Master Tables with codes and descriptions for Material Groups" col3="" col4="" col5=""
                                                        getUrl='BloodGroup/GetData_BloodGroup'
                                                        addUrl="BloodGroup/Insert_BloodGroup"
                                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                        upUrl="BloodGroup/Update_BloodGroup"
                                                        delUrl="BloodGroup/Delete_BloodGroup"
                                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                    />
                                                    :
                                                    pageEndPoint === "hr/department" ?
                                                        <AddUpList {...{ pageEndPoint }} col1="Departement" col2="Master Tables with codes and departements for Material Groups" col3="DepartmentCode" col4="ID" col5="Department"
                                                            getUrl='Department/GetData_Department'
                                                            addUrl="Department/Insert_Department"
                                                            singleDataUrl="Department/GetSingleData_Department"
                                                            upUrl="Department/Update_Department"
                                                            delUrl="Department/Delete_Department"
                                                            dropDownUrl="Department/GetDataDropDown_Department"
                                                        />
                                                        :
                                                        pageEndPoint === "masterTable/designation" ?
                                                            <AddUpList {...{ pageEndPoint }} col1="Designation" col2="Master Tables with codes and descriptions for Designations" col3="DesignationCode" col4="ID" col5="Designation"
                                                                getUrl='Designation/GetData_Designation'
                                                                addUrl="Designation/Insert_Designation"
                                                                singleDataUrl="Designation/GetSingleData_Designation"
                                                                upUrl="Designation/Update_Designation"
                                                                delUrl="Designation/Delete_Designation"
                                                                dropDownUrl="Designation/GetDataDropDown_Designation"
                                                            />
                                                            :
                                                            pageEndPoint === "masterTable/employee-status" ?
                                                                <AddUpList {...{ pageEndPoint }} col1="Employee Status" col2="Master Tables with codes and descriptions for Employee Status" col3="" col4="" col5=""
                                                                    getUrl='BloodGroup/GetData_BloodGroup'
                                                                    addUrl="BloodGroup/Insert_BloodGroup"
                                                                    singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                    upUrl="BloodGroup/Update_BloodGroup"
                                                                    delUrl="BloodGroup/Delete_BloodGroup"
                                                                    dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                                />
                                                                :
                                                                pageEndPoint === "safety/court" ?
                                                                    <AddUpList {...{ pageEndPoint }} col1="Court Location" col2="Master Tables with codes and descriptions for Court Locations" col3="" col4="" col5=""
                                                                        getUrl='BloodGroup/GetData_BloodGroup'
                                                                        addUrl="BloodGroup/Insert_BloodGroup"
                                                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                        upUrl="BloodGroup/Update_BloodGroup"
                                                                        delUrl="BloodGroup/Delete_BloodGroup"
                                                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                                    />
                                                                    :
                                                                    pageEndPoint === "masterTable/employee-leave-status" ?
                                                                        <AddUpList {...{ pageEndPoint }} col1="Employee Leave Status" col2="Master Tables with codes and descriptions for Employee leave status." col3="Code" col4="Id" col5="Description"
                                                                            getUrl='EmpLeaveStatus/GetData_EmpLeaveStatus'
                                                                            addUrl="EmpLeaveStatus/Insert_EmpLeaveStatus"
                                                                            singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                            upUrl="EmpLeaveStatus/Update_EmpLeaveStatus"
                                                                            delUrl="EmpLeaveStatus/Delete_EmpLeaveStatus"
                                                                            dropDownUrl="EmpLeaveStatus/GetDataDropDown_EmpLeaveStatus"
                                                                        />
                                                                        :
                                                                        "null"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListManagement;

// lstBloodGroup - /hr/blood-group
// lstFuelType - fuel/fuel-type-master
// lstMaterialGroup - inventory/material-group
// lstDepartment - hr/department
// lstCourtLocation - safety/court

// Blood Group - Done
// Case Status - Done
// Case Type - Done
// Court Location - Done
// Company Unit -  Not Found
// Department - Done
// Designation - Done
// EmpLeave Status - Done
// EmpLeave Type
// Employement Status
// EmpStatus
// EquipmentType
// ExplosiveType
// FuelType - Done
// Gender
// IDProof
// InjuryType
// Loadingcharge
// Martial
// MaterialGroup
// MaterialSpecification
// Qualification
// Relation
// Religion
// state
// Thana
// TpAmount
// UnitType
// VehicleType