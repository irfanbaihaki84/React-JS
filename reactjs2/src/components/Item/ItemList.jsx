import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ItemList = () => {
  const { state, dispatch } = useAppContext();
  const { items } = state;

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch({ type: 'DELETE_ITEM', payload: id });
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <div>
          <h2>Item List</h2>
          <Link to="/admin" className="btn-edit">
            Back
          </Link>
        </div>
        <Link to="/admin/items/add" className="btn-add">
          Add New Item
        </Link>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nama}</td>
              <td>Rp{item.hargaItem.toLocaleString()}</td>
              <td>{item.isActive ? 'Active' : 'Inactive'}</td>
              <td>{item.created_At}</td>
              <td className="actions">
                <Link to={`/admin/items/edit/${item.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
