import { Col, Container, Row } from "react-bootstrap";
import { PrimaryButton } from "../Index";
import { NavLink } from "react-router-dom";

const PreSection = () => {
  return (
    <section className="container-fluid bg-dark text-white">
      <Container className="my-5">
        <Row>
          <Col
            className="d-flex justify-content-center align-items-center pb-5"
            lg={6}
          >
            <div>
              <h2>
                <b>
                  <em>Angeboten und Leistungen für Unternehmen</em>
                </b>
              </h2>

              <div className="my-4">
                <p>
                Sind Sie an einer Zusammenarbeit mit Fitness XBody im Rahmen des Fit for Work-Programms interessiert? Möchten Sie erfahren, welche Angebote und Dienstleistungen wir für Ihr Unternehmen bereitstellen können? Dann zögern Sie nicht und senden Sie uns noch heute eine Anfrage, ohne dass Sie dabei an Verpflichtungen gebunden sind. Wir stehen Ihnen gerne zur Verfügung und beantworten all Ihre Fragen rund um unser Fit for Work-Programm.
                </p>
              </div>

              <PrimaryButton><NavLink to='/contact'> JETZT ANFRAGE SENDEN</NavLink></PrimaryButton>
            </div>
          </Col>
          <Col lg={6}>
            <img
              src="../../public/images/Home/Partner.jpg"
              alt=""
              className="w-100"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PreSection;
