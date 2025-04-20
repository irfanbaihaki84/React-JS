export const beliReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
        notification: { type: 'success', message: 'Item added successfully' },
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                ...action.payload,
                updated_At: new Date().toLocaleDateString('en-GB'),
              }
            : item
        ),
        notification: { type: 'success', message: 'Item updated successfully' },
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        notification: { type: 'success', message: 'Item deleted successfully' },
      };

    case 'ADD_TO_CART':
      // const existingItem = state.cart.find(
      //   (item) => item.id === action.payload.id
      // );
      // if (existingItem) {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    // }
    // return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case 'UPDATE_CART_ITEM_QTY':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'CREATE_TRANSACTION':
      // const newTrans = {
      //   id: state.trans.length + 1,
      //   buyId: `${state.currentUser.id}${new Date()
      //     .toLocaleDateString('en-GB')
      //     .replace(/\//g, '')}${String(state.trans.length + 1).padStart(
      //     5,
      //     '0'
      //   )}`,
      //   userId: [state.currentUser.id],
      //   cusId: [action.payload.customerId],
      //   buyTanggal: new Date().toLocaleDateString('en-GB'),
      //   bayarCara: action.payload.paymentMethod,
      //   total: action.payload.total,
      //   bayar: action.payload.amountPaid,
      //   jumlah: action.payload.change,
      //   isActive: true,
      //   created_At: new Date().toLocaleDateString('en-GB'),
      //   updated_At: null,
      // };

      // const newDtTrans = state.cart.map((item, index) => ({
      //   id: state.dt_trans.length + index + 1,
      //   buyId: newTrans.buyId,
      //   item: [item.id],
      //   qty: item.qty,
      //   harga: item.hargaItem,
      //   jumlah: item.qty * item.hargaItem,
      //   isActive: true,
      //   created_At: new Date().toLocaleDateString('en-GB'),
      //   updated_At: null,
      // }));

      return {
        ...state,
        trans: [...state.trans, action.payload.newTrans],
        // dt_trans: [...state.dt_trans, ...newDtTrans],
        dt_trans: [...state.dt_trans, action.payload.newDtTrans],
        cart: [],
        notification: {
          type: 'success',
          message: 'Transaction completed successfully',
        },
      };

    case 'ADD_ADDRESS':
      return {
        ...state,
        alamat: [...state.alamat, action.payload],
        notification: {
          type: 'success',
          message: 'Address added successfully',
        },
      };

    case 'UPDATE_ADDRESS':
      return {
        ...state,
        alamat: state.alamat.map((addr) =>
          addr.id === action.payload.id
            ? {
                ...addr,
                ...action.payload,
                updated_At: new Date().toLocaleDateString('en-GB'),
              }
            : addr
        ),
        notification: {
          type: 'success',
          message: 'Address updated successfully',
        },
      };

    case 'DELETE_ADDRESS':
      return {
        ...state,
        alamat: state.alamat.filter((addr) => addr.id !== action.payload),
        notification: {
          type: 'success',
          message: 'Address deleted successfully',
        },
      };

    default:
      return state;
  }
};
