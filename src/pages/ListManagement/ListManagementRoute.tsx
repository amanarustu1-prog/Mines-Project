import React from "react";
import { useParams } from "react-router-dom";
import ListManagement from "./ListManagement";

interface ListManagementProps {
  pageEndPoint: string;
}
const ListManagementRoute = () => {
  const { section, page } = useParams();
  const pageEndPoint = `${section}/${page}`; // 👉 gives hr/blood-group etc.
  console.log("Page End Point in Route:", pageEndPoint);
return <ListManagement pageEndPoint={pageEndPoint} />;
};

export default ListManagementRoute;
