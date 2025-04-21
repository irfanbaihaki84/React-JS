import { createContext, useContext, useReducer, useEffect } from 'react';
import { authReducer } from '../reducers/authReducer';
import { beliReducer } from '../reducers/beliReducer';

// Create context
const AppContext = createContext();

// Initial state with fallback to dummy data if localStorage is empty
const getInitialState = () => {
  // Default dummy data
  const defaultData = {
    users: [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@email.id',
        role: 'admin',
        status: true,
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        username: 'yasmin',
        password: 'yasmin123',
        email: 'yasmin@email.id',
        role: 'kasir',
        status: true,
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        username: 'bambang',
        password: 'bambang123',
        email: 'bambang@email.id',
        role: 'pelanggan',
        status: true,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
    ],
    items: [
      {
        id: 1,
        nama: 'mie goreng',
        hargaItem: 20000,
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        nama: 'mie tiau goreng',
        hargaItem: 20000,
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        nama: 'es teh manis',
        hargaItem: 5000,
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
    ],
    trans: [
      {
        id: 1,
        buyId: '21604202500001',
        userId: [2],
        cusId: [3],
        buyTanggal: '16/04/2025',
        bayarCara: 'cash',
        total: 45000,
        bayar: 50000,
        jumlah: 5000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        buyId: '21604202500002',
        userId: [2],
        cusId: [3],
        buyTanggal: '16/04/2025',
        bayarCara: 'qris',
        total: 35000,
        bayar: 50000,
        jumlah: 15000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        buyId: '11604202500003',
        userId: [1],
        cusId: [3],
        buyTanggal: '17/04/2025',
        bayarCara: 'kreditCard',
        total: 90000,
        bayar: 100000,
        jumlah: 10000,
        isActive: true,
        created_At: '17/04/2025',
        updated_At: null,
      },
    ],
    dt_trans: [
      {
        id: 1,
        buyId: '21604202500001',
        item: [3],
        qty: 1,
        harga: 5000,
        jumlah: 5000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        buyId: '21604202500001',
        item: [1],
        qty: 2,
        harga: 20000,
        jumlah: 40000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        buyId: '21604202500002',
        item: [3],
        qty: 3,
        harga: 5000,
        jumlah: 15000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 4,
        buyId: '21604202500002',
        item: [1],
        qty: 1,
        harga: 20000,
        jumlah: 20000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 5,
        buyId: '11604202500003',
        item: [3],
        qty: 2,
        harga: 5000,
        jumlah: 10000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 6,
        buyId: '11604202500003',
        item: [1],
        qty: 2,
        harga: 20000,
        jumlah: 40000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 7,
        buyId: '11604202500003',
        item: [2],
        qty: 2,
        harga: 20000,
        jumlah: 40000,
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
    ],
    alamat: [
      {
        id: 1,
        userId: [1],
        phone: '0812345678',
        alamat: 'kota tangerang',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        userId: [1],
        phone: '0812345679',
        alamat: 'karawaci',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        userId: [2],
        phone: '0812345676',
        alamat: 'curug',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 4,
        userId: [3],
        phone: '0812345675',
        alamat: 'tangerang',
        isActive: true,
        created_At: '17/04/2025',
        updated_At: '18/04/2025',
      },
    ],
    currentUser: null,
    isAuthenticated: false,
    cart: [],
    notification: null,
  };

  // Try to get data from localStorage, fallback to default data
  try {
    return {
      users: JSON.parse(localStorage.getItem('users')) || defaultData.users,
      items: JSON.parse(localStorage.getItem('items')) || defaultData.items,
      trans: JSON.parse(localStorage.getItem('trans')) || defaultData.trans,
      dt_trans:
        JSON.parse(localStorage.getItem('dt_trans')) || defaultData.dt_trans,
      alamat: JSON.parse(localStorage.getItem('alamat')) || defaultData.alamat,
      currentUser:
        JSON.parse(localStorage.getItem('currentUser')) ||
        defaultData.currentUser,
      cart: JSON.parse(localStorage.getItem('cart')) || defaultData.cart,
      notification: null,
    };
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return defaultData;
  }
};

// Combined reducer function
const rootReducer = (state, action) => {
  // First apply auth reducer
  const authState = authReducer(state, action);
  // Then apply beli reducer on the result
  const beliState = beliReducer(authState, action);

  return beliState;
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, getInitialState());
  console.log('appContext ', state);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    const persistState = () => {
      try {
        localStorage.setItem('users', JSON.stringify(state.users));
        localStorage.setItem('items', JSON.stringify(state.items));
        localStorage.setItem('trans', JSON.stringify(state.trans));
        localStorage.setItem('dt_trans', JSON.stringify(state.dt_trans));
        localStorage.setItem('alamat', JSON.stringify(state.alamat));
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
        localStorage.setItem('cart', JSON.stringify(state.cart));
      } catch (error) {
        console.error('Error persisting state to localStorage:', error);
      }
    };

    persistState();
  }, [state]);

  const login = (username, password) => {
    const user = state.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      dispatch({ type: 'LOGIN', payload: { user } });
      return true;
    }
    return false;
  };

  const logup = (username, password, email) => {
    const newUser = {
      id: state.users.length + 1,
      username,
      password,
      email,
      role: 'pelanggan',
      status: true,
    };
    dispatch({ type: 'SIGNUP', payload: { newUser } });
    return newUser;
  };

  return (
    <AppContext.Provider value={{ state, dispatch, login, logup }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
