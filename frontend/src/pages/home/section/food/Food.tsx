import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./food.scss";

const Food = () => {
  const { t } = useTranslation()
  return (
    <section className="bg-light food">
      <Container>
        <Link to="/ernährung">
          <h2 className="section-title">{t("Nutrition")}</h2>
        </Link>
        <Row>
          <Col md={5} className="food-img"></Col>
          <Col md={7}>
            <div className="ps-md-5">
              <p className="mb-2">
                {t("Welcome to Health")} <span>Xbody</span>
              </p>
              <h5 className="mb-4">
                {t("Health Xbody is a natural way to improve your health")}
              </h5>
            </div>
            <div className="ps-md-5">
              <p>
                {t("At Xbody we firmly believe that a balanced diet is the key to a successful and healthy fitness life. As a result, we provide tailor-made nutrition plans that are based on the individual needs of our customers and are also contemporary and sustainable. With our concepts, we want to ensure that our clientele is optimally supplied with all the necessary nutrients and at the same time receives enough energy to regenerate and grow.")}
              </p>
              <p>
                {t("At Xbody, we attach great importance not only to achieving short-term athletic goals, but also to staying healthy in the long term - and a balanced diet plays a decisive role in this.")}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Food;
