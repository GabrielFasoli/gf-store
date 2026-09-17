import { useState } from "react";
import { addProducts } from "../../service/products.js";
import "../../index.css";

const emptyProduct = {
  brand: "",
  name: "",
  price: 0,
  category: "",
  subcategory: "",
  sport: "",
  tags: [],
  images: [""],
  description: "",
  details: [],
  stock: 0,
  sizes: [],
  rating: 0,
  reviewsCount: 0,
  color: "",
  colorDisplay: "",
  colorGroup: "",
};

export function CreateProduct() {
  const [form, setForm] = useState(emptyProduct);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const addImage = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImage = (index) => {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceNum = Number(form.price);
    const stockNum = Number(form.stock);
    const ratingNum = Number(form.rating);
    const reviewsNum = Number(form.reviewsCount);

    if (isNaN(priceNum) || priceNum <= 0) {
      alert("El price tiene que ser un número mayor a 0");
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      alert("El stock tiene que ser un número válido");
      return;
    }

    setLoading(true);
    try {
      await addProducts({
        ...form,
        price: priceNum,
        stock: stockNum,
        sport: form.sport,
        rating: ratingNum,
        reviewsCount: reviewsNum,
        sizes: form.sizes
          .toString()
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: form.tags
          .toString()
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        details: form.details
          .toString()
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean),
        images: form.images.filter(Boolean),
      });
      setSuccess(true);
      setForm(emptyProduct);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="main-container">
      <h1>Agregar producto</h1>

      {success && <p className="success-msg">✅ Producto cargado con éxito</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            id="name"
            name="name"
            placeholder="Camiseta Argentina"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Marca</label>
          <input
            id="brand"
            name="brand"
            placeholder="adidas"
            value={form.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Precio *</label>
          <input
            id="price"
            name="price"
            type="number"
            placeholder="210000"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock *</label>
          <input
            id="stock"
            name="stock"
            type="number"
            placeholder="15"
            value={form.stock}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoría *</label>
          <input
            id="category"
            name="category"
            placeholder="hombre, mujer, ninos, deportes, outlet"
            value={form.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subcategory">Subcategoría *</label>
          <input
            id="subcategory"
            name="subcategory"
            placeholder="remeras, zapatillas, camperas..."
            value={form.subcategory}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sport">Deporte</label>
          <select
            id="sport"
            name="sport"
            value={form.sport}
            onChange={handleChange}
          >
            <option value="">Seleccioná un deporte</option>
            <option value="running">Running</option>
            <option value="futbol">Fútbol</option>
            <option value="training">Training / Gimnasio</option>
            <option value="basquet">Básquet</option>
            <option value="outdoor">Outdoor</option>
            <option value="hyrox">Hyrox</option>
            <option value="crossfit">CrossFit</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            id="color"
            name="color"
            placeholder="Negro"
            value={form.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="colorDisplay">Color (nombre comercial)</label>
          <input
            id="colorDisplay"
            name="colorDisplay"
            placeholder="Core Black / Cloud White"
            value={form.colorDisplay}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="colorGroup">Color group</label>
          <input
            id="colorGroup"
            name="colorGroup"
            placeholder="camiseta-argentina-26"
            value={form.colorGroup}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input
            id="rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="4.7"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="reviewsCount">Cantidad de reseñas</label>
          <input
            id="reviewsCount"
            name="reviewsCount"
            type="number"
            placeholder="132"
            value={form.reviewsCount}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="sizes">Talles (separados por coma)</label>
          <input
            id="sizes"
            name="sizes"
            placeholder="S, M, L, XL"
            value={form.sizes}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (separados por coma)</label>
          <input
            id="tags"
            name="tags"
            placeholder="originals, running"
            value={form.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Detalles (separados por coma)</label>
          <input
            id="details"
            name="details"
            placeholder="Corte regular, 100% poliéster, AEROREADY"
            value={form.details}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            placeholder="Descripción del producto..."
            value={form.description}
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="form-group">
          <label>Imágenes</label>
          {form.images.map((img, index) => (
            <div key={index} className="image-row">
              <input
                placeholder={`URL imagen ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
              {form.images.length > 1 && (
                <button type="button" onClick={() => removeImage(index)}>
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="btn-add-image"
            onClick={addImage}
          >
            + Agregar imagen
          </button>
        </div>

        <button type="submit" className="btnAdd" disabled={loading}>
          {loading ? "Guardando..." : "Guardar producto"}
        </button>
      </form>
    </main>
  );
}
