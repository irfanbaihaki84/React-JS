import React, { createContext, useReducer, useContext } from 'react';
import { authReducer } from '../reducers/authReducer';
import { transaksiReducer } from '../reducers/transaksiReducer';
import { itemReducer } from '../reducers/itemReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContext = createContext();

const getInitialState = () => {
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
    dt_items: [
      {
        id: 1,
        itemId: 3,
        stock: 20,
        kategori: 'minuman',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 2,
        itemId: 1,
        stock: 10,
        kategori: 'makanan',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 3,
        itemId: 2,
        stock: 10,
        kategori: 'makanan',
        isActive: true,
        created_At: '15/04/2025',
        updated_At: null,
      },
      {
        id: 4,
        itemId: 1,
        stock: 15,
        kategori: 'makanan',
        isActive: true,
        created_At: '16/04/2025',
        updated_At: null,
      },
      {
        id: 5,
        itemId: 2,
        stock: 20,
        kategori: 'makanan',
        isActive: true,
        created_At: '16/04/2025',
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
      isAuthenticated:
        JSON.parse(localStorage.getItem('isAuthenticated')) ||
        defaultData.isAuthenticated,
      cart: JSON.parse(localStorage.getItem('cart')) || defaultData.cart,
      notification: null,
    };
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
    return defaultData;
  }
};

const combineReducers = (reducers) => {
  return (state, action) => {
    return Object.keys(reducers).reduce(
      (acc, prop) => ({
        ...acc,
        [prop]: reducers[prop](acc[prop], action),
      }),
      state
    );
  };
};

const rootReducer = combineReducers({
  auth: authReducer,
  transaksi: transaksiReducer,
  items: itemReducer,
});

// const rootReducer = (state, action) => {
//   const authState = authReducer(state, action);

//   const transaksiState = transaksiReducer(authState, action);

//   const itemState = itemReducer(transaksiState, action);

//   return itemState;
// };

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, getInitialState());
  console.log('appContext ', state);

  // Persist state to localStorage whenever it changes
  // useEffect(() => {
  //   const persistState = () => {
  //     try {
  //       localStorage.setItem('users', JSON.stringify(state.users));
  //       localStorage.setItem('items', JSON.stringify(state.items));
  //       localStorage.setItem('trans', JSON.stringify(state.trans));
  //       localStorage.setItem('dt_trans', JSON.stringify(state.dt_trans));
  //       localStorage.setItem('alamat', JSON.stringify(state.alamat));
  //       localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
  //       localStorage.setItem(
  //         'isAuthenticated',
  //         JSON.stringify(state.isAuthenticated)
  //       );
  //       localStorage.setItem('cart', JSON.stringify(state.cart));
  //     } catch (error) {
  //       console.error('Error persisting state to localStorage:', error);
  //     }
  //   };

  //   persistState();
  // }, [state]);

  const signIn = (username, password) => {
    const user = state.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      return dispatch({ type: 'LOGIN', payload: user });
    }
    return false;
  };

  const signUp = (userData) => {
    const newUser = {
      ...userData,
      id: state.users.length + 1,
      role: 'pelanggan',
      status: true,
      isActive: true,
      created_At: new Date().toLocaleDateString(),
      updated_At: null,
    };
    dispatch({ type: 'REGISTER', payload: newUser });
    return newUser;
  };

  const signOut = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: state.items.length + 1,
      isActive: true,
      created_At: new Date().toLocaleDateString(),
      updated_At: null,
    };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
    return newItem;
  };

  const updateItem = (item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: item });
    return item;
  };

  const deleteItem = (id) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  };

  const addToCart = (item) => {
    dispatch({ type: 'ADD_CART', payload: item });
  };

  const updateCart = (item) => {
    dispatch({ type: 'UPDATE_CART', payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'DELETE_CART', payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        addItem,
        updateItem,
        deleteItem,
        addToCart,
        updateCart,
        removeFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
