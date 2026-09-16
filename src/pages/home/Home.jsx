import { CarrouselCard } from "../../components/CarrouselCard.jsx";
import { Banner } from "../../components/banner.jsx";
import { CarrouselBanner } from "../../components/CarrouselBanner.jsx";
import { Looks } from "../../data/banners.js";
export function Home({ products }) {
  return (
    <>
      <Banner
        posicion="izq-abj"
        titulo="F50 O PREDATOR"
        subtitulo="Armas el caos o toma el control. Elegi uno"
        imagen="https://brand.assets.adidas.com/image/upload/f_auto,q_auto:best,fl_lossy/if_w_gt_1920,w_1920/7533694_CAM_LAM_DAT_ONSITE_PREDATOR_VS_F5_O_FW_26_MP_3_BANNER_HERO_D_2880x1200_523faa5888.jpg"
        botones={[
          { titulo: "F50", link: "/hombre/botines" },
          { titulo: "Predator", link: "/hombre/botines" },
        ]}
      ></Banner>

      <main className="contenedor-main">
        <CarrouselBanner productos={Looks} tag="originals"></CarrouselBanner>
        <h1> PRODUCTOS</h1>
        <section>
          <CarrouselCard productos={products}></CarrouselCard>
        </section>
        <section></section>
      </main>
    </>
  );
}
