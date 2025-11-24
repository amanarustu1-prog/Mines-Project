export const getValue = (id, state) => {
  return id
    ? {
        value: id,
        label: state.find((a) => a.GroupID === Number(id))?.Description || '',
      }
    : null;
};

export const getOptions = (state) => {
  return state.map((a) => ({
    value: a.GroupID,
    label: a.Description,
  }));
};

export const getChange = (setState) => {
  return (opt) => {
    setState((prev) => ({
      ...prev,
      AccountGroupId: Number(opt?.value),
      AccountGroup: opt?.label,
    }));
  };
};
