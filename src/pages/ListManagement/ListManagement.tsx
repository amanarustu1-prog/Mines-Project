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
                                    <AddUpList {...{ pageEndPoint }} col1="BloodGroup" col2="Master Tables with codes and descriptions for Blood Types"
                                        getUrl='BloodGroup/GetData_BloodGroup'
                                        addUrl="BloodGroup/Insert_BloodGroup"
                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                        upUrl="BloodGroup/Update_BloodGroup"
                                        delUrl="BloodGroup/Delete_BloodGroup"
                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                    />
                                    :
                                    pageEndPoint === "/safetyLegal/case-status" ?
                                        // <AddUpList {...{ pageEndPoint }} col1="Case Status" col2="Master Tables with codes and descriptions for Case Status"
                                        //     getUrl='CaseStatus/GetData_CaseStatus'
                                        //     addUrl="CaseStatus/Insert_CaseStatus"
                                        //     singleDataUrl="CaseStatus/GetSingleData_CaseStatus"
                                        //     upUrl="CaseStatus/Update_CaseStatus"
                                        //     delUrl="CaseStatus/Delete_CaseStatus"
                                        //     dropDownUrl="CaseStatus/GetDataDropDown_CaseStatus"
                                        // />
                                        <AddUpList {...{ pageEndPoint }} col1="Fuel Type" col2="Master Tables with codes and descriptions for Fuel Types"
                                            getUrl='BloodGroup/GetData_BloodGroup'
                                            addUrl="BloodGroup/Insert_BloodGroup"
                                            singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                            upUrl="BloodGroup/Update_BloodGroup"
                                            delUrl="BloodGroup/Delete_BloodGroup"
                                            dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                        />
                                        :
                                        pageEndPoint === "safety/case-type" ?
                                            <AddUpList {...{ pageEndPoint }} col1="Fuel Type" col2="Master Tables with codes and descriptions for Fuel Types"
                                                getUrl='BloodGroup/GetData_BloodGroup'
                                                addUrl="BloodGroup/Insert_BloodGroup"
                                                singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                upUrl="BloodGroup/Update_BloodGroup"
                                                delUrl="BloodGroup/Delete_BloodGroup"
                                                dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                            />
                                            :
                                            pageEndPoint === "/masterTable/current-location" ?
                                                <AddUpList {...{ pageEndPoint }} col1="Current Location" col2="Master Tables with codes and descriptions for Current Locations"
                                                    getUrl='BloodGroup/GetData_BloodGroup'
                                                    addUrl="BloodGroup/Insert_BloodGroup"
                                                    singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                    upUrl="BloodGroup/Update_BloodGroup"
                                                    delUrl="BloodGroup/Delete_BloodGroup"
                                                    dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                />
                                                :
                                                pageEndPoint === "inventory/material-group" ?
                                                    <AddUpList {...{ pageEndPoint }} col1="Material Group" col2="Master Tables with codes and descriptions for Material Groups"
                                                        getUrl='BloodGroup/GetData_BloodGroup'
                                                        addUrl="BloodGroup/Insert_BloodGroup"
                                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                        upUrl="BloodGroup/Update_BloodGroup"
                                                        delUrl="BloodGroup/Delete_BloodGroup"
                                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                    />
                                                    :
                                                    pageEndPoint === "hr/department" ?
                                                        <AddUpList {...{ pageEndPoint }} col1="Departement" col2="Master Tables with codes and departements for Material Groups"
                                                            getUrl='BloodGroup/GetData_BloodGroup'
                                                            addUrl="BloodGroup/Insert_BloodGroup"
                                                            singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                            upUrl="BloodGroup/Update_BloodGroup"
                                                            delUrl="BloodGroup/Delete_BloodGroup"
                                                            dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                        />
                                                        :
                                                        pageEndPoint === "/masterTable/designation" ?
                                                            <AddUpList {...{ pageEndPoint }} col1="Designation" col2="Master Tables with codes and descriptions for Designations"
                                                                getUrl='BloodGroup/GetData_BloodGroup'
                                                                addUrl="BloodGroup/Insert_BloodGroup"
                                                                singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                upUrl="BloodGroup/Update_BloodGroup"
                                                                delUrl="BloodGroup/Delete_BloodGroup"
                                                                dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                            />
                                                            :
                                                            pageEndPoint === "/masterTable/employee-status" ?
                                                                <AddUpList {...{ pageEndPoint }} col1="Employee Status" col2="Master Tables with codes and descriptions for Employee Status"
                                                                    getUrl='BloodGroup/GetData_BloodGroup'
                                                                    addUrl="BloodGroup/Insert_BloodGroup"
                                                                    singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                    upUrl="BloodGroup/Update_BloodGroup"
                                                                    delUrl="BloodGroup/Delete_BloodGroup"
                                                                    dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                                />
                                                                :
                                                                pageEndPoint === "safety/court" ?
                                                                    <AddUpList {...{ pageEndPoint }} col1="Court Location" col2="Master Tables with codes and descriptions for Court Locations"
                                                                        getUrl='BloodGroup/GetData_BloodGroup'
                                                                        addUrl="BloodGroup/Insert_BloodGroup"
                                                                        singleDataUrl="BloodGroup/GetSingleData_BloodGroup"
                                                                        upUrl="BloodGroup/Update_BloodGroup"
                                                                        delUrl="BloodGroup/Delete_BloodGroup"
                                                                        dropDownUrl="BloodGroup/GetDataDropDown_BloodGroup"
                                                                    />
                                                                    : "null"
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListManagement;
