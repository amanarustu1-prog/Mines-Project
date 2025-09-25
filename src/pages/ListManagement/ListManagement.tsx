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
                                    <AddUpList {
                                        ...{ pageEndPoint }}
                                        col1="Blood Group"
                                        col2="Master Tables with codes and descriptions for Blood Types"
                                        col3="BloodGroupCode"
                                        col4="Id"
                                        col5="Description"
                                        getUrl='BloodGroup/GetData_BloodGroup'
                                        addUrl="BloodGroup/Insert_BloodGroup"
                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                        upUrl="BloodGroup/Update_BloodGroup"
                                        delUrl="BloodGroup/Delete_BloodGroup"
                                        dropDownUrl="Users/GetData_Company"
                                    />
                                    :
                                    pageEndPoint === "masterTable/case-status" ?
                                        <AddUpList
                                            {...{ pageEndPoint }}
                                            col1="Case Status"
                                            col2="Master Tables with codes and descriptions for Case Status"
                                            col3="CaseStatusCode"
                                            col4="CaseStatusID"
                                            col5="Description"
                                            getUrl='CaseStatus/GetData_CaseStatus'
                                            addUrl="CaseStatus/Insert_CaseStatus"
                                            singleDataUrl="CaseStatus/GetSingleData_CaseStatus"
                                            upUrl="CaseStatus/Update_CaseStatus"
                                            delUrl="CaseStatus/Delete_CaseStatus"
                                            dropDownUrl="Users/GetData_Company"
                                        />
                                        :
                                        pageEndPoint === "masterTable/case-type" ?
                                            <AddUpList
                                                {...{ pageEndPoint }}
                                                col1="Case Type"
                                                col2="Master Tables with codes and descriptions for Case Types"
                                                col3="CaseTypeCode"
                                                col4="CaseTypeID"
                                                col5="Description"
                                                getUrl='CaseType/GetData_CaseType'
                                                addUrl="CaseType/Insert_CaseType"
                                                singleDataUrl="CaseType/GetSingleData_CaseType"
                                                upUrl="CaseType/Update_CaseType"
                                                delUrl="CaseType/Delete_CaseType"
                                                dropDownUrl="Users/GetData_Company"
                                            />
                                            :
                                            pageEndPoint === "masterTable/court-location" ?
                                                <AddUpList {...{ pageEndPoint }}
                                                    col1="Court Location"
                                                    col2="Master Tables with codes and descriptions for Court Locations"
                                                    col3="CourtLocationCode"
                                                    col4="CourtLocationID"
                                                    col5="Description"
                                                    getUrl='CourtLocation/GetData_CourtLocation'
                                                    addUrl="CourtLocation/Insert_CourtLocation"
                                                    singleDataUrl="CourtLocation/GetSingleData_CourtLocation"
                                                    upUrl="CourtLocation/Update_CourtLocation"
                                                    delUrl="CourtLocation/Delete_CourtLocation"
                                                    dropDownUrl="Users/GetData_Company"
                                                />
                                                :
                                                pageEndPoint === "masterTable/injury-type" ?
                                                    <AddUpList {...{ pageEndPoint }}
                                                        col1="Injury Type"
                                                        col2="Master Tables with codes and descriptions for Injury Type"
                                                        col3="InjuryTypeCode"
                                                        col4="InjuryTypeID"
                                                        col5="Description"
                                                        getUrl='InjuryType/GetData_InjuryType'
                                                        addUrl="InjuryType/Insert_InjuryType"
                                                        singleDataUrl="InjuryType/GetSingleData_InjuryType"
                                                        upUrl="InjuryType/Update_InjuryType"
                                                        delUrl="InjuryType/Delete_InjuryType"
                                                        dropDownUrl="Users/GetData_Company"
                                                    />
                                                    // :
                                                    // pageEndPoint === "masterTable/thana" ?
                                                    //     <AddUpList {...{ pageEndPoint }}
                                                    //         col1="Thana"
                                                    //         col2="Master Tables with codes and descriptions for Thana"
                                                    //         col3="CourtLocationCode"
                                                    //         col4="CourtLocationID"
                                                    //         col5="Description"
                                                    //         getUrl='CourtLocation/GetData_CourtLocation'
                                                    //         addUrl="CourtLocation/Insert_CourtLocation"
                                                    //         singleDataUrl="CourtLocation/GetSingleData_CourtLocation"
                                                    //         upUrl="CourtLocation/Update_CourtLocation"
                                                    //         delUrl="CourtLocation/Delete_CourtLocation"
                                                    //         dropDownUrl="Users/GetData_Company"
                                                    //     />
                                                    :
                                                    pageEndPoint === "inventory/material-group" ?
                                                        <AddUpList
                                                            {...{ pageEndPoint }}
                                                            col1="Material Group" col2="Master Tables with codes and descriptions for Material Groups" col3="" col4="" col5=""
                                                            getUrl='BloodGroup/GetData_BloodGroup'
                                                            addUrl="BloodGroup/Insert_BloodGroup"
                                                            singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                            upUrl="BloodGroup/Update_BloodGroup"
                                                            delUrl="BloodGroup/Delete_BloodGroup"
                                                            dropDownUrl="Users/GetData_Company"
                                                        />
                                                        :
                                                        pageEndPoint === "hr/department" ?
                                                            <AddUpList
                                                                {...{ pageEndPoint }}
                                                                col1="Departement"
                                                                col2="Master Tables with codes and departements for Material Groups"
                                                                col3="DepartmentCode"
                                                                col4="ID"
                                                                col5="Department"
                                                                getUrl='Department/GetData_Department'
                                                                addUrl="Department/Insert_Department"
                                                                singleDataUrl="Department/GetSingleData_Department"
                                                                upUrl="Department/Update_Department"
                                                                delUrl="Department/Delete_Department"
                                                                dropDownUrl="Users/GetData_Company"
                                                            />
                                                            :
                                                            pageEndPoint === "masterTable/designation" ?
                                                                <AddUpList
                                                                    {...{ pageEndPoint }}
                                                                    col1="Designation"
                                                                    col2="Master Tables with codes and descriptions for Designations"
                                                                    col3="DesignationCode"
                                                                    col4="ID"
                                                                    col5="Designation"
                                                                    getUrl='Designation/GetData_Designation'
                                                                    addUrl="Designation/Insert_Designation"
                                                                    singleDataUrl="Designation/GetSingleData_Designation"
                                                                    upUrl="Designation/Update_Designation"
                                                                    delUrl="Designation/Delete_Designation"
                                                                    dropDownUrl="Users/GetData_Company"
                                                                />
                                                                :
                                                                pageEndPoint === "masterTable/employee-status" ?
                                                                    <AddUpList
                                                                        {...{ pageEndPoint }}
                                                                        col1="Employee Status"
                                                                        col2="Master Tables with codes and descriptions for Employee Status"
                                                                        col3="Code"
                                                                        col4="ID"
                                                                        col5="Description"
                                                                        getUrl="EmpStatus/GetData_EmpStatus"
                                                                        addUrl="EmpStatus/Insert_EmpStatus"
                                                                        singleDataUrl="EmpStatus/GetSingleData_EmpStatus"
                                                                        upUrl="EmpStatus/Update_EmpStatus"
                                                                        delUrl="EmpStatus/Delete_EmpStatus"
                                                                        dropDownUrl="Users/GetData_Company"
                                                                    />
                                                                    :
                                                                    pageEndPoint === "safety/court" ?
                                                                        <AddUpList
                                                                            {...{ pageEndPoint }}
                                                                            col1="Court Location"
                                                                            col2="Master Tables with codes and descriptions for Court Locations"
                                                                            col3=""
                                                                            col4=""
                                                                            col5=""
                                                                            getUrl='BloodGroup/GetData_BloodGroup'
                                                                            addUrl="BloodGroup/Insert_BloodGroup"
                                                                            singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                            upUrl="BloodGroup/Update_BloodGroup"
                                                                            delUrl="BloodGroup/Delete_BloodGroup"
                                                                            dropDownUrl="Users/GetData_Company"
                                                                        />
                                                                        :
                                                                        pageEndPoint === "masterTable/employee-leave-status" ?
                                                                            <AddUpList
                                                                                {...{ pageEndPoint }}
                                                                                col1="Employee Leave Status"
                                                                                col2="Master Tables with codes and descriptions for Employee leave status."
                                                                                col3="Code"
                                                                                col4="ID"
                                                                                col5="Description"
                                                                                getUrl='EmpLeaveStatus/GetData_EmpLeaveStatus'
                                                                                addUrl="EmpLeaveStatus/Insert_EmpLeaveStatus"
                                                                                singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                                upUrl="EmpLeaveStatus/Update_EmpLeaveStatus"
                                                                                delUrl="EmpLeaveStatus/Delete_EmpLeaveStatus"
                                                                                dropDownUrl="Users/GetData_Company"
                                                                            />
                                                                            :
                                                                            pageEndPoint === "masterTable/employee-leave-type" ?
                                                                                <AddUpList
                                                                                    {...{ pageEndPoint }}
                                                                                    col1="Employee Leave Type"
                                                                                    col2="Master Tables with codes and descriptions for Employee leave type."
                                                                                    col3="Code"
                                                                                    col4="ID"
                                                                                    col5="Description"
                                                                                    getUrl='EmpLeaveType/GetData_EmpLeaveType'
                                                                                    addUrl="EmpLeaveType/Insert_EmpLeaveType"
                                                                                    singleDataUrl="EmpLeaveType/GetSingleData_EmpLeaveType"
                                                                                    upUrl="EmpLeaveType/Update_EmpLeaveType"
                                                                                    delUrl="EmpLeaveType/Delete_EmpLeaveType"
                                                                                    dropDownUrl="Users/GetData_Company"
                                                                                />
                                                                                :
                                                                                pageEndPoint === "masterTable/gender" ?
                                                                                    <AddUpList
                                                                                        {...{ pageEndPoint }}
                                                                                        col1="Gender"
                                                                                        col2="Master Tables with codes and descriptions for Gender."
                                                                                        col3="GenderCode"
                                                                                        col4="id"
                                                                                        col5="Description"
                                                                                        getUrl='Gender/GetData_Gender'
                                                                                        addUrl="Gender/Insert_Gender"
                                                                                        singleDataUrl="Gender/GetSingleData_Gender"
                                                                                        upUrl="Gender/Update_Gender"
                                                                                        delUrl="Gender/Delete_Gender"
                                                                                        dropDownUrl="Users/GetData_Company"
                                                                                    />
                                                                                    :
                                                                                    pageEndPoint === "masterTable/id-proof" ?
                                                                                        <AddUpList
                                                                                            {...{ pageEndPoint }}
                                                                                            col1="ID Proof"
                                                                                            col2="Master Tables with codes and descriptions for ID Proof."
                                                                                            col3="Code"
                                                                                            col4="ID"
                                                                                            col5="Description"
                                                                                            getUrl='IDProof/GetData_IDProof'
                                                                                            addUrl="IDProof/Insert_IDProof"
                                                                                            singleDataUrl="IDProof/GetSingleData_IDProof"
                                                                                            upUrl="IDProof/Update_IDProof"
                                                                                            delUrl="IDProof/Delete_IDProof"
                                                                                            dropDownUrl="Users/GetData_Company"
                                                                                        />
                                                                                        :
                                                                                        pageEndPoint === "masterTable/district" ?
                                                                                            <AddUpList
                                                                                                {...{ pageEndPoint }}
                                                                                                col1="District"
                                                                                                col2="Master Tables with codes and descriptions for District."
                                                                                                col3="Code"
                                                                                                col4="ID"
                                                                                                col5="Description"
                                                                                                getUrl='District/GetData_District'
                                                                                                addUrl="District/Insert_District"
                                                                                                singleDataUrl="District/GetSingleData_District"
                                                                                                upUrl="District/Update_District"
                                                                                                delUrl="District/Delete_District"
                                                                                                dropDownUrl="Users/GetData_Company"
                                                                                            />
                                                                                            :
                                                                                            pageEndPoint === "masterTable/loading-charge" ?
                                                                                                <AddUpList
                                                                                                    {...{ pageEndPoint }}
                                                                                                    col1="Loading Charge"
                                                                                                    col2="Master Tables with codes and descriptions for Loading Charge."
                                                                                                    col3="LoadingchargeCode"
                                                                                                    col4="LoadingchargeID"
                                                                                                    col5="Description"
                                                                                                    getUrl="Loadingcharge/GetData_Loadingcharge"
                                                                                                    addUrl="Loadingcharge/Insert_Loadingcharge"
                                                                                                    singleDataUrl="Loadingcharge/GetSingleData_Loadingcharge"
                                                                                                    upUrl="Loadingcharge/Update_Loadingcharge"
                                                                                                    delUrl="Loadingcharge/Delete_Loadingcharge"
                                                                                                    dropDownUrl="Users/GetData_Company"
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