import moment from "moment";


export const getLabelsString = (data) => {
  return data?.map(item => item.label).join(',');
}

export const getShowingDateText = (dateStr) => {
  return moment(dateStr)?.format("MM/DD/yyyy HH:mm")
}

export const getShowingYearMonthDate = (dateStr) => {
  return moment(dateStr).format("yyyy-MM-DD HH:mm:ss")
}

export const currentDate = () => {
  return moment(new Date()).format('YYYY-MM-DD');
}

export const currentDateNotes = () => {
  return moment(new Date()).format('YYYY-MM-DD  HH:mm:ss');
}

export const getShowingMonthDateYear = (dateStr) => {
  return moment(dateStr).format("MM/DD/YYYY HH:mm:ss")
}
export const getShowingWithOutTime = (dateStr) => {
  return moment(dateStr).format("MM/DD/YYYY")
}