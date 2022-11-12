export const storage = localStorage;

export const getItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    console.error(e);
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
