import { Col, Container, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./training.scss";

const Training = () => {
  const { t } = useTranslation()
  return (
    <section className="training">
      <div className="tt_overlay"></div>
      <section>
        <Container>
          <Row>
            <Col>
              <div className="section-title">
                <h2>
                  {t("We make it easy for you")} <span>{t("to take part")}</span>
                </h2>
              </div>
            </Col>
          </Row>
          <Row className="g-md-5 g-lg-3 g-5">
            <Col lg={4} md={6}>
              <Link to="/probetraining">
                <div className="single-item">
                  <img
                    src={`/public/images/Home/Probetraining kostenlos.jpg`}
                    alt=""
                    className="border-1 border-white border"
                  />
                  <div className="box-text">
                    <h5>{t("Trial training for free")}</h5>
                    <p>{t("Just try it out - and it's even free!")}</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col lg={4} md={6}>
              <div className="single-item">
                <img
                  src={`/public/images/Home/Workouts für zu Hause.jpg`}
                  alt=""
                  className="border-1 border-white border"
                />
                <div className="box-text">
                  <h5>{t("Workouts to do at home")}</h5>
                  <p>{t("Stay fit and active.")}</p>
                </div>
              </div>
            </Col>
            <Col lg={4} md={6}>
              <Link to="/company">
                <div className="single-item">
                  <img
                    src={`/public/images/Home/Kooperationen.jpg`}
                    alt=""
                    className="border-1 border-white border"
                  />
                  <div className="box-text">
                    <h5>{t("Cooperations")}</h5>
                    <p>
                      {t("The perfect deal for a better one Work-workout balance!")}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </section>
  );
};

export default Training;
