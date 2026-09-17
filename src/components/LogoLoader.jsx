import logo from "../assets/logo_black.png";
export function LogoLoader() {
  return (
    <div className="logo-loader-wrapper">
      <img src={logo} alt="Cargando" className="logo-loader-img" />
    </div>
  );
}
