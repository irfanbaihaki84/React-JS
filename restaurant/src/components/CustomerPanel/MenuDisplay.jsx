import React, { useState } from 'react';
import './customer.css';

const MenuDisplay = ({ menus, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(menus.map((item) => item.category))];

  const filteredMenus = menus.filter((menu) => {
    const matchesCategory =
      activeCategory === 'All' || menu.category === activeCategory;
    const matchesSearch = menu.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-display">
      <div className="menu-filters">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                activeCategory === category ? 'active' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-items">
        {filteredMenus.map((menu) => (
          <div key={menu.id} className="menu-item">
            <div className="menu-item-image">
              <img src={menu.image || 'default-food.jpg'} alt={menu.name} />
            </div>
            <div className="menu-item-details">
              <h3>{menu.name}</h3>
              <p className="menu-category">{menu.category}</p>
              <p className="menu-description">{menu.description}</p>
              <div className="menu-item-footer">
                <span className="menu-price">
                  Rp {menu.price.toLocaleString()}
                </span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(menu)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDisplay;
