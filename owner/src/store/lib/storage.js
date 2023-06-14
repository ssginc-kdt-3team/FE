// import localStorage from "localStorage";

const storageKey = 'myAppStorage'; // 저장할 데이터의 키 값

const storage = {
  getItem: (key) => {
    try {
      const item = window.localStorage.getItem(key);
      return Promise.resolve(item);
    } catch (error) {
      console.error('로컬 스토리지에서 데이터를 가져오는 데 실패했습니다:', error);
      return Promise.reject(error);
    }
  },
  setItem: (key, value) => {
    try {
      window.localStorage.setItem(key, value);
      return Promise.resolve();
    } catch (error) {
      console.error('로컬 스토리지에 데이터를 저장하는 데 실패했습니다:', error);
      return Promise.reject(error);
    }
  },
};

export const loadState = async () => {
  try {
    const serializedState = await storage.getItem(storageKey);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    return storage.setItem(storageKey, serializedState);
  } catch (error) {
    console.error('상태를 로컬 스토리지에 저장하는 데 실패했습니다:', error);
  }
};

export default storage;