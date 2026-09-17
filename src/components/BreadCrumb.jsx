import { Link } from "react-router-dom";

export function BreadCrumb({ category, subcategory }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>
      <span>/</span>
      <Link to={`/${category}`}>{category}</Link>
      {subcategory && (
        <>
          <span>/</span>
          <Link to={`/${category}/${subcategory}`}>{subcategory}</Link>
        </>
      )}
    </nav>
  );
}
