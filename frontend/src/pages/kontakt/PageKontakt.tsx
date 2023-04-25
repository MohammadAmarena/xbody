import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { Forms } from "../../../src/components/Index";
import "./kontakt.scss";

const PageKontakt = () => {
  const { t } = useTranslation();

  return (
    <div className="PageKontakt">
      <Helmet>
        <title>Kontakt</title>
      </Helmet>
      <section className="banner">
        <div className="overlay"></div>
        <div className="home_content">
          <div className="home_title">{t("Contact")}</div>
        </div>
      </section>

      <Container>
        <div className="contact-container">
          <h2>{t("Contact Xbody")}</h2>
          <Row>
            <Col>
              <p>
                <FiMapPin size={40} /> Hamburger Strasse 88
                <br />
                22999 Hamburg
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <FiPhone size={40} /> Hotline Deutschland: 0800 155 333
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>
                <MdOutlineEmail size={40} /> Mail: Xbody.mbs@gmail.com
              </p>
            </Col>
          </Row>
        </div>
      </Container>

      <section className="container-fluid bg-dark text-white">
        <div className="spikes mt-5"></div>
        <Container className="mt-5 py-5">
          <Row className="d-flex justify-content-between align-items-center">
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={5}
            >
              <div>
                <h2>
                  <b>{t("We are happy to help:")}</b>
                </h2>

                <div className="my-5">
                  <p className="text-muted">
                    {t(
                      "Would you like to cooperate with Fitness Xbody as part of the Fit for"
                    )}{" "}
                    <b className="text-white">{t("work program?")}</b>{" "}
                    {t(
                      "Or are you an employee interested in training with us? Then feel free to contact us. Just use our"
                    )}{" "}
                    <b className="text-white">{t("contact form")}</b>{" "}
                    {t(
                      "and give us your request. Our team of experts will get in touch with you immediately and give you all the information about current offers and services. We look forward to helping you stay fit and healthy. You are interested in one"
                    )}{" "}
                    <b className="text-white"></b>{" "}
                    {t(
                      "with Fitness Xbody? Would you like to find out about current offers and services for your company? Or are you an employee and want to train at Fitness First? Do not hesitate to contact us. Just use our . Our team of experts will get in touch with you immediately."
                    )}
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <Forms />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PageKontakt;
