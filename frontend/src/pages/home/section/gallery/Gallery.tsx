import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "./gallery.scss";

const Gallery = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="spikes"></div>
      <section className="container-fluid galleryHome bg-dark">
        <h2 className="section-title">{t("Just")} <span>{t("try it")}</span></h2>
        <div>
          <Row>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/635048014540156250.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/article-2605136-1D2067E800000578-932_964x519.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/best-fitness-gyms.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/wonderful-s.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/Square_wellness_xxxxxxxxxxx_i118937_03.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/SoHoChi_037_copy.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/gym-gym-in-house-traditional-home-gym.jpg"
                className="img"
                alt="..."
              />
            </Col>
            <Col lg={3} md={6} className="show_image p-0 overflow-hidden">
              <img
                src="/public/images/Gallery/weight-training-machines.jpg"
                className="img"
                alt="..."
              />
            </Col>
          </Row>
        </div>
      </section>
    </>
  );
};

export default Gallery;
