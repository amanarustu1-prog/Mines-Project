  const logout = async () => {
    const ConnectionID = localStorage.getItem("connectionId");
    if (localStoreData?.PINID && ConnectionID) {
      await GoogleAuthServices.logOutSingleDevices({ UserPINID: localStoreData?.PINID.toString(), ConnectionID: base64ToString(ConnectionID) });
    }
    navigate("/dashboard-page");
  };
