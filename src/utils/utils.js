import AsyncStorage from '@react-native-async-storage/async-storage';

export function setItem(key, data) {
  // console.log(data,"data111++++++");
  data = JSON.stringify(data);
  return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key).then(data => {
      resolve(JSON.parse(data));
    });
  });
}

export function removeItem(key) {
  // console.log(key, 'remove key');
  return AsyncStorage.removeItem(key);
}
