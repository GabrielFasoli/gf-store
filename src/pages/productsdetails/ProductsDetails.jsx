import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { ImageGallery } from "./GaleriaImages.jsx";
import { SelectColor } from "./SelectColors.jsx";
import { Stars } from "../../components/Stars.jsx";
import { BreadCrumb } from "../../components/BreadCrumb.jsx";
import { formatearPrecio } from "../../logic/utils.js";
import { useState } from "react";
import { Acordeon } from "../../components/Acordeon.jsx";
import { RelatedProducts } from "./RelatedProducts.jsx";
import { LogoLoader } from "../../components/LogoLoader.jsx";

export function ProductsDetails({ agregarAlCarrito, productos }) {
  const { id } = useParams();
  const { product, loanding } = useProduct(id);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);
  const [errorTalleSelecionado, SetErrorTalleSelecionado] = useState(false);
  console.log(product);
  if (loanding) return <LogoLoader></LogoLoader>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <main className=" detalle-producto">
      <div className="detalle-principal">
        <ImageGallery images={product.images} name={product.name} />

        <div className="info-compra">
          <BreadCrumb
            categoria={product.categoria}
            subcategoria={product.subcategoria}
          />

          <h1>{product.name}</h1>
          <Stars rating={product.rating} reviewsCount={product.reviewsCount} />
          <p className="precio">{formatearPrecio(product.price)}</p>

          <SelectColor productos={productos} productoActual={product} />

          {product.sizes?.length > 0 && (
            <div className="talles">
              <p>Talle:</p>
              <div className="talles-opciones">
                {product.sizes.map((talle) => (
                  <button
                    key={talle}
                    className={`talle-btn ${talleSeleccionado === talle ? "activo" : ""}`}
                    onClick={() => {
                      setTalleSeleccionado(talle);
                      SetErrorTalleSelecionado(false);
                    }}
                  >
                    {talle}
                  </button>
                ))}
              </div>
              <div className="Error-talle" role="alert">
                {errorTalleSelecionado && <p>Por favor, seleciona tu talle</p>}
              </div>
            </div>
          )}

          <button
            className="btnAgregaar"
            onClick={() => {
              if (!talleSeleccionado) {
                SetErrorTalleSelecionado(true);
                return;
              }
              agregarAlCarrito({ ...product, talle: talleSeleccionado });
            }}
          >
            Añadir al carrito
          </button>
          <Acordeon titulo="Descripcion  ">
            {product.description && (
              <div className="bloque-descripcion">
                <p>{product.description} </p>
              </div>
            )}
          </Acordeon>
          <Acordeon titulo="Detalles">
            {product.details?.length > 0 && (
              <div className="bloque-detalles">
                <ul>
                  {product.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </Acordeon>
        </div>
        <RelatedProducts
          products={productos}
          category={product.category}
          subCategory={product.subCategory}
        ></RelatedProducts>
      </div>
    </main>
  );
}
