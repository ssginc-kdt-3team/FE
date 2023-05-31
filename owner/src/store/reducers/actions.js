// action - account reducer
export const LOGIN = '@auth/LOGIN';
export const LOGOUT = '@auth/LOGOUT';
export const JOIN = '@auth/JOIN';


export const logout = () => ({
    type: LOGOUT,
  });



// export const setOwnerID = (id) => {
//     return {
//       type: 'SET_OWNERID',
//       payload: id,
//     };
//   };