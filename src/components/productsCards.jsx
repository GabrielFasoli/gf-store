import { formatearPrecio } from "../logic/utils";
import { Link } from "react-router-dom";
export const ProductsCards = ({ products }) => {
  return (
    <>
      {products.map((producto) => {
        return (
          <Link
            className="card-link"
            to={`/productsdetails/${producto.id}`}
            key={producto.id}
          >
            <article className="producto-card">
              <div className="cards-dinamic">
                <img
                  className="image-principal"
                  src={producto.images[0]}
                  alt=""
                />
                {producto.images[1] && (
                  <img
                    className="image-secundary"
                    src={producto.images[1]}
                    alt=""
                  ></img>
                )}
              </div>

              <div className="producto-info">
                <h3>{producto.name}</h3>

                <p className="precio">
                  Precio: {formatearPrecio(producto.price)}
                </p>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};
