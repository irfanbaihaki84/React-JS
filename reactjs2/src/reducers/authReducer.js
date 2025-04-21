export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // const user = state.users.find(
      //   (u) =>
      //     u.username === action.payload.username &&
      //     u.password === action.payload.password
      // );
      // if (user) {
      return {
        ...state,
        currentUser: action.payload.user,
        isAuthenticated: true,
        notification: { type: 'success', message: 'Login successful' },
      };
    // }
    // return {
    //   ...state,
    //   notification: { type: 'error', message: 'Invalid credentials' },
    // };

    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        notification: { type: 'success', message: 'Logged out successfully' },
      };

    case 'SIGNUP':
      // const newUser = {
      //   ...action.payload,
      //   id: state.users.length + 1,
      //   role: 'pelanggan',
      //   status: true,
      //   isActive: true,
      //   created_At: new Date().toLocaleDateString('en-GB'),
      // };
      return {
        ...state,
        users: [...state.users, action.payload.newUser],
        // currentUser: newUser,
        // notification: {
        //   type: 'success',
        //   message: 'Account created successfully',
        // },
      };

    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload],
        isAuthenticated: true,
        notification: { type: 'success', message: 'User added successfully' },
      };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                ...user,
                ...action.payload,
                updated_At: new Date().toLocaleDateString('en-GB'),
              }
            : user
        ),
        isAuthenticated: true,
        notification: { type: 'success', message: 'User updated successfully' },
      };

    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        isAuthenticated: true,
        notification: { type: 'success', message: 'User deleted successfully' },
      };

    case 'CLEAR_NOTIFICATION':
      return { ...state, notification: null };

    default:
      return state;
  }
};
