import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { ImageGallery } from "./ImageGallery.jsx";
import { SelectColor } from "./SelectColors.jsx";
import { Stars } from "../../components/Stars.jsx";
import { BreadCrumb } from "../../components/BreadCrumb.jsx";
import { formatPrice } from "../../logic/utils.js";
import { useState } from "react";
import { Accordion } from "../../components/Accordion.jsx";
import { RelatedProducts } from "./RelatedProducts.jsx";
import { LogoLoader } from "../../components/LogoLoader.jsx";

export function ProductsDetails({ addToCart, products }) {
  const { id } = useParams();
  const { product, loanding } = useProduct(id);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (loanding) return <LogoLoader></LogoLoader>;
  if (!product) return <p>Producto no encontrado</p>;

  const stockDelTalleSeleccionado =
    product.sizes?.find((s) => s.size === selectedSize)?.stock ?? 0;

  return (
    <main className=" product-detail">
      <div className="main-detail">
        <ImageGallery images={product.images} name={product.name} />

        <div className="purchase-info">
          <BreadCrumb
            category={product.category}
            subcategory={product.subcategory}
          />

          <h1>{product.name}</h1>
          {product.subtitle && (
            <p className="product-subtitle">{product.subtitle}</p>
          )}
          <Stars rating={product.rating} reviewsCount={product.reviewsCount} />
          <p className="price">{formatPrice(product.price)}</p>

          <SelectColor products={products} currentProduct={product} />

          {product.sizes?.length > 0 && (
            <div className="sizes">
              <p>Talle:</p>
              <div className="size-options">
                {product.sizes.map((s) => (
                  <button
                    key={s.size}
                    className={`size-btn ${selectedSize === s.size ? "active" : ""} ${s.stock === 0 ? "disabled" : ""}`}
                    disabled={s.stock === 0}
                    onClick={() => {
                      setSelectedSize(s.size);
                      setSizeError(false);
                      setQuantity(1);
                    }}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              <div className="size-error" role="alert">
                {sizeError && <p>Por favor, seleciona tu talle</p>}
              </div>
            </div>
          )}

          {selectedSize && (
            <div className="item-count">
              <p>Cantidad:</p>
              <div className="item-count-controls">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(stockDelTalleSeleccionado, prev + 1),
                    )
                  }
                  disabled={quantity >= stockDelTalleSeleccionado}
                >
                  +
                </button>
              </div>
              <p className="stock-hint">
                {stockDelTalleSeleccionado} disponibles
              </p>
            </div>
          )}

          <button
            className="btnAdd"
            onClick={() => {
              if (!selectedSize) {
                setSizeError(true);
                return;
              }
              addToCart({ ...product, size: selectedSize, quantity });
            }}
          >
            Añadir al carrito
          </button>
          <Accordion title="Descripcion  ">
            {product.description && (
              <div className="description-block">
                <p>{product.description} </p>
              </div>
            )}
          </Accordion>
          <Accordion title="Detalles">
            {product.details?.length > 0 && (
              <div className="details-block">
                <ul>
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </Accordion>
        </div>
        <RelatedProducts
          products={products}
          category={product.category}
          subCategory={product.subCategory}
        ></RelatedProducts>
      </div>
    </main>
  );
}
