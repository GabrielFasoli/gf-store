import { CategoriaLayout } from "../../components/CategoriaLayout.jsx";

export function Hombre({ productos }) {
  return (
    <CategoriaLayout
      productos={productos}
      categoria="hombre"
      titulo="Hombre"
    ></CategoriaLayout>
  );
}
