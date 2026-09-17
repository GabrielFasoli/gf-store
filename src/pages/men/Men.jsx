import { CategoryLayout } from "../../components/CategoryLayout.jsx";

export function Men({ products }) {
  return (
    <CategoryLayout
      products={products}
      category="hombre"
      title="Hombre"
    ></CategoryLayout>
  );
}
