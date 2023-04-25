import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FaHeartbeat } from "react-icons/fa";
import "./courses.scss";

const Courses = () => {
  const { t } = useTranslation()
  return (
    <section className="courses">
      <Container>
        <h2 className="section-title">
        {t("We have everything you need for")} <span>{t("your fitness!")}</span>
        </h2>
        <Row className="mt-5">
          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <img src="/public/images/Icons/icon_4.png" alt="" />
              </div>
              <div className="ps-3 fs-5">{t("Weight Loss classes")}</div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <img src="/public/images/Icons/icon_9.png" alt="" />
              </div>
              <div className="ps-3 fs-5">{t("Dance workout classes")}</div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <img src="/public/images/Icons/icon_6.png" alt="" />
              </div>
              <div className="ps-3 fs-5">{t("Endurance classes")}</div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <img src="/public/images/Icons/icon_7.png" alt="" />
              </div>
              <div className="ps-3 fs-5">{t("Muscle building classes")}</div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <img src="/public/images/Icons/icon_8.png" alt="" />
              </div>
              <div className="ps-3 fs-5">{t("Nutrition classes")}</div>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-5 ps-5">
            <div className="d-flex align-items-center justify-content-start">
              <div>
                <FaHeartbeat size={50} color="#FAB15C" />
              </div>
              <div className="ps-3 fs-5">{t("Health classes")}</div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Courses;
