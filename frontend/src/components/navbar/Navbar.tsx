import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const NavigationBar = () => {
  const { t } = useTranslation();
  return (
    <div className="Nav">
      <Navbar
        expand="lg"
        className="navbar-dark bg-color"
      >
        <Container>
          <span></span>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className="bg-dark text-center"
          >
            <Offcanvas.Header
              closeButton
              className="bg-light bg-opacity-50 text-white"
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Close Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-between flex-grow-1 fs-5">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/probetraining">{t("Trial training")}</NavLink>
                <NavLink to="/training">Training</NavLink>
                <NavLink to="/ernährung">{t("Nutrition")}</NavLink>
                <NavLink to="/contact">{t("Contact")}</NavLink>
                <NavLink to="/kursplan">{t("Classes Time")}</NavLink>
                <NavLink to="/company">{t("Company fitness")}</NavLink>
                <NavLink to="/prices">{t("Prices")}</NavLink>
                <NavLink to="/faqs">FAQs</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
