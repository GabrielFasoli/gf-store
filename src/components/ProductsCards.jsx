import { formatPrice } from "../logic/utils";
import { Link } from "react-router-dom";
export const ProductsCards = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        return (
          <Link
            className="card-link"
            to={`/productsdetails/${product.id}`}
            key={product.id}
          >
            <article className="product-card">
              <div className="dynamic-cards">
                <img
                  className="image-main"
                  src={product.images[0]}
                  alt=""
                />
                {product.images[1] && (
                  <img
                    className="image-secondary"
                    src={product.images[1]}
                    alt=""
                  ></img>
                )}
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>

                <p className="price">
                  Precio: {formatPrice(product.price)}
                </p>
              </div>
            </article>
          </Link>
        );
      })}
    </>
  );
};
