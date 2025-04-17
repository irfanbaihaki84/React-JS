export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    case 'REGISTER':
      return {
        ...state,
        users: [...state.users, action.payload.newUser],
      };
    default:
      return state;
  }
};
