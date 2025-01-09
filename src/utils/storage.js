const storageKey = 'lsm_admin_auth';

export const getProfile = () => {
  const profile = localStorage.getItem(storageKey);
  if (profile) {
    return JSON.parse(profile);
  }
  return null;
};

export const setProfile = (profile) => localStorage.setItem(storageKey, JSON.stringify(profile));

export const removeProfile = () => localStorage.removeItem(storageKey);

export const getToken = () => {
  const profile = getProfile();
  if (profile) {
    return profile.access_token;
  }
  return null;
};

export const removeToken = () => {
  removeProfile();
};

export const getData = (dataKey) => {
  const dataString = localStorage.getItem(dataKey);
  if (dataString) {
    return JSON.parse(dataString);
  }
  return null;
};
