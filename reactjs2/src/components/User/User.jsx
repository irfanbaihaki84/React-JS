// This component can be used for individual user display if needed
const User = ({ user }) => {
  return (
    <div className="user">
      <h3>{user.username}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.status ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

export default User;
