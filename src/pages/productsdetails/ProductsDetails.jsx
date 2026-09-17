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
  console.log(product);
  if (loanding) return <LogoLoader></LogoLoader>;
  if (!product) return <p>Producto no encontrado</p>;

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
          <Stars rating={product.rating} reviewsCount={product.reviewsCount} />
          <p className="price">{formatPrice(product.price)}</p>

          <SelectColor products={products} currentProduct={product} />

          {product.sizes?.length > 0 && (
            <div className="sizes">
              <p>Talle:</p>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? "active" : ""}`}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="size-error" role="alert">
                {sizeError && <p>Por favor, seleciona tu talle</p>}
              </div>
            </div>
          )}

          <button
            className="btnAdd"
            onClick={() => {
              if (!selectedSize) {
                setSizeError(true);
                return;
              }
              addToCart({ ...product, size: selectedSize });
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
