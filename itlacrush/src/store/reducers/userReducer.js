const INITIAL_STATE = {
  users: null,
};
  
  const applySetUsers = (state, action) => ({
    ...state,
    users: action.users,
  });
  
  const applySetUser = (state, action) => ({
    ...state,
    users: {
      ...state.users,
      [action.uid]: action.user,
    },
  });
  
 export default(state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'USERS_SET': {
        return applySetUsers(state, action);
      }
      case 'USER_SET': {
        return applySetUser(state, action);
      }
      default:
        return state;
    }
  }