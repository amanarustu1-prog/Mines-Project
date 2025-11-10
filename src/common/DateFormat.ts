import moment from "moment";


export const getLabelsString = (data : any) => {
  return data?.map((item : any) => item.label).join(',');
}

export const getShowingDateText = (dateStr : any) => {
  if(!dateStr) return "";
  return moment(dateStr)?.format("MM/DD/yyyy HH:mm")
}

export const getShowingYearMonthDate = (dateStr : any) => {
  return moment(dateStr).format("yyyy-MM-DD HH:mm:ss")
}

export const currentDate = () => {
  return moment(new Date()).format('YYYY-MM-DD');
}

export const currentDateNotes = () => {
  return moment(new Date()).format('YYYY-MM-DD  HH:mm:ss');
}

export const getShowingMonthDateYear = (dateStr : any) => {
  return moment(dateStr).format("MM/DD/YYYY HH:mm:ss")
}
export const getShowingWithOutTime = (dateStr : any) => {
  return moment(dateStr).format("MM/DD/YYYY")
}
export const getShowingWithOutDate = (dateStr : any) => {
  return moment(dateStr).format("HH:mm")
}