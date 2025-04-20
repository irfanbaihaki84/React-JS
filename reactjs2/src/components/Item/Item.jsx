// This component can be used for individual item display if needed
const Item = ({ item }) => {
  return (
    <div className="item">
      <h3>{item.nama}</h3>
      <p>Price: Rp{item.hargaItem.toLocaleString()}</p>
      <p>Status: {item.isActive ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default Item;
