import { Link } from "react-router-dom";

export function BreadCrumb({ categoria, subcategoria }) {
  return (
    <nav className="breadcrumb">
      <Link to="/">Inicio</Link>
      <span>/</span>
      <Link to={`/${categoria}`}>{categoria}</Link>
      {subcategoria && (
        <>
          <span>/</span>
          <Link to={`/${categoria}/${subcategoria}`}>{subcategoria}</Link>
        </>
      )}
    </nav>
  );
}
