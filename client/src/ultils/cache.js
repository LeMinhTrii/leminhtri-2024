export const localStorageCache = {
  set(name, data, time) {
    const storeData = {
      data,
      time,
    };
    localStorage.setItem(name, JSON.stringify(storeData));
  },
  get(name) {
    const storeData = JSON.parse(localStorage.getItem(name));
    if (storeData) {
      let now = Date.now();
      if (storeData.time && storeData.time - now < 0) {
        return;
      }
      return storeData.data;
    }
  },
  remove(name) {
    localStorage.removeItem(name);
  },
};

export const sessionStorageCache = {
  set(name, data, time) {
    const storeData = {
      data,
      time,
    };
    sessionStorage.setItem(name, JSON.stringify(storeData));
  },
  get(name) {
    const storeData = JSON.parse(sessionStorage.getItem(name));
    if (storeData) {
      let now = Date.now();
      if (storeData.time && storeData.time - now < 0) {
        return;
      }
      return storeData.data;
    }
  },
  remove(name) {
    sessionStorage.removeItem(name);
  },
};
