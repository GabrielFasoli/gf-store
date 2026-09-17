import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion } from "../../components/Accordion";

export function FilterSort({
  baseProducts,
  category,
  subcategory,
  onResult,
  onClose,
  open,
}) {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("");
  const [activeColors, setActiveColors] = useState([]);
  const [activeSizes, setActiveSizes] = useState([]);

  const availableColors = [
    ...new Set(baseProducts.map((p) => p.color).filter(Boolean)),
  ];
  const availableSizes = [
    ...new Set(baseProducts.flatMap((p) => p.sizes || [])),
  ];

  const prices = baseProducts.map((p) => p.price);
  const availableMinPrice = prices.length ? Math.min(...prices) : 0;
  const availableMaxPrice = prices.length ? Math.max(...prices) : 0;

  const [minPrice, setMinPrice] = useState(availableMinPrice);
  const [maxPrice, setMaxPrice] = useState(availableMaxPrice);

  useEffect(() => {
    setMinPrice(availableMinPrice);
    setMaxPrice(availableMaxPrice);
  }, [availableMinPrice, availableMaxPrice]);

  const toggleColor = (color) => {
    setActiveColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const toggleSize = (size) => {
    setActiveSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const removeSubcategory = () => navigate(`/${category}`);
  const removeCategory = () => navigate("/products");

  let result = baseProducts.filter((p) => {
    const matchesColor =
      activeColors.length === 0 || activeColors.includes(p.color);
    const matchesSize =
      activeSizes.length === 0 || activeSizes.some((s) => p.sizes?.includes(s));
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesColor && matchesSize && matchesPrice;
  });

  if (sortBy === "price-asc")
    result = [...result].sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc")
    result = [...result].sort((a, b) => b.price - a.price);
  if (sortBy === "newest")
    result = [...result].sort((a, b) => b.createdAt - a.createdAt);

  useEffect(() => {
    onResult(result);
  }, [sortBy, activeColors, activeSizes, minPrice, maxPrice, baseProducts]);

  const clearAll = () => {
    setActiveColors([]);
    setActiveSizes([]);
    setSortBy("");
    setMinPrice(availableMinPrice);
    setMaxPrice(availableMaxPrice);
  };

  return (
    <aside className={`filter-panel ${open ? "active" : ""}`}>
      <div className="filter-header">
        <h3>Filtrar y ordenar</h3>
        <div className="filter-header-actions">
          <button onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="applied-chips">
        {subcategory && (
          <span className="chip chip-info">
            {subcategory}
            <button onClick={removeSubcategory}>✕</button>
          </span>
        )}
        <span className="chip chip-info">
          {category}
          <button onClick={removeCategory}>✕</button>
        </span>
        {activeColors.map((color) => (
          <span key={color} className="chip">
            {color}
            <button onClick={() => toggleColor(color)}>✕</button>
          </span>
        ))}
        {activeSizes.map((size) => (
          <span key={size} className="chip">
            {size}
            <button onClick={() => toggleSize(size)}>✕</button>
          </span>
        ))}
      </div>

      <Accordion title="Ordenar por">
        <label>
          <input
            type="radio"
            name="sortBy"
            checked={sortBy === "price-asc"}
            onChange={() => setSortBy("price-asc")}
          />
          Precio: menor a mayor
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            checked={sortBy === "price-desc"}
            onChange={() => setSortBy("price-desc")}
          />
          Precio: mayor a menor
        </label>
        <label>
          <input
            type="radio"
            name="sortBy"
            checked={sortBy === "newest"}
            onChange={() => setSortBy("newest")}
          />
          Novedades
        </label>
      </Accordion>

      <Accordion title="Talle">
        {availableSizes.map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              checked={activeSizes.includes(size)}
              onChange={() => toggleSize(size)}
            />
            {size}
          </label>
        ))}
      </Accordion>

      <Accordion title="Color">
        {availableColors.map((color) => (
          <label key={color}>
            <input
              type="checkbox"
              checked={activeColors.includes(color)}
              onChange={() => toggleColor(color)}
            />
            {color}
          </label>
        ))}
      </Accordion>

      <Accordion title="Precio">
        <div className="price-range">
          <input
            type="range"
            min={availableMinPrice}
            max={availableMaxPrice}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="range"
            min={availableMinPrice}
            max={availableMaxPrice}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="price-labels">
          <span>${minPrice.toLocaleString("es-AR")}</span>
          <span>${maxPrice.toLocaleString("es-AR")}</span>
        </div>
      </Accordion>
    </aside>
  );
}
