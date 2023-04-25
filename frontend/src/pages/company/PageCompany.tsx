import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { VscCheck } from "react-icons/vsc";
import { TbDiscount } from "react-icons/tb";
import { BsPersonCheck, BsPersonPlus } from "react-icons/bs";
import { Forms, PreSection, PrimaryButton, SecondaryButton } from "../../components/Index";
import "./company.scss";
import { NavLink } from "react-router-dom";

const PageCompany = () => {
  return (
    <div className="site-container">
      <Helmet>
        <title>FirmenFitness</title>
      </Helmet>
      <main className="container-fluid d-flex justify-content-center align-items-center banner text-white text-center">
        <div className="container">
          <div className="banner-text py-5">
            
            <h1>FITNESS FÜR DIE GANZE FIRMA</h1>

            <div className="mb-5 fs-4">
              <p>
                <VscCheck color="var(--main-color)" /> Steigerung des
                Selbstvertrauens
              </p>
              <p>
                <VscCheck color="var(--main-color)" /> Förderung der
                Konzentration
              </p>
              <p>
                <VscCheck color="var(--main-color)" /> Minimierung
                gesundheitlicher Risiken
              </p>
            </div>

            <PrimaryButton><NavLink to='/contact'> JETZT ANFRAGE SENDEN</NavLink></PrimaryButton>
          </div>
        </div>
      </main>

      <section>
        <Container className="my-5">
          <Row>
            <Col lg={7}>
              <div className="pb-5">
              
                <h2>
                  <b>
                    <em>Für Unternehmen</em>
                  </b>
                </h2>
                <h3 className="mt-4">Vorteile mit FirmenFitness:</h3>

                <div className="my-4">
                  <p>
                    <VscCheck color="var(--main-color)" size={18} /> Eine gesunde Arbeitsumgebung
                  </p>
                  <p>
                    <VscCheck color="var(--main-color)" size={18} /> Förderung einer gesunden Arbeitsumgebung
                  </p>
                  <p>
                    <VscCheck color="var(--main-color)" size={18} /> Förderung eines gesunden Lebensstils
                  </p>
                  <p>
                    <VscCheck color="var(--main-color)" size={18} /> Betriebliche Fitnessprogramme
                  </p>
                  <p>
                    <VscCheck color="var(--main-color)" size={18} /> Höhere  Leistungsfähigkeit der Mitarbeiter
                  </p>
                </div>

                
              </div>
            </Col>
            <Col lg={5}>
              
              <h2>
                <b>
                  <em>Für Mitarbeiter</em>
                </b>
              </h2>
              <h3 className="mt-4">Vorteile als Mitarbeiter: </h3>

              <div className="my-4">
                <p>
                  <VscCheck color="var(--main-color)" size={18} /> Verbessertes Wohlbefinden und Stressabbau
                </p>
                <p>
                  <VscCheck color="var(--main-color)" size={18} /> Mehr Motivation und eine höhere Lebensqualität.
                </p>
                <p>
                  <VscCheck color="var(--main-color)" size={18} /> Prävention ist der beste Weg zur Erhaltung von Gesundheit.
                </p>
                <p>
                  <VscCheck color="var(--main-color)" size={18} /> Förderung einer positiven Beziehung zum Unternehmen.
                </p>
                <p>
                  <VscCheck color="var(--main-color)" size={18} /> Finanzielle Vorteile für Mitarbeiter und ihre Lebenspartne
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <PreSection/>

      <section>
        <Container className="my-5 text-center">
          <Row>
            <Col lg={4}>
              <BsPersonCheck color="var(--main-color)" size={150} />
              <h5>Volle Mitgliedschaft</h5>
              <p className="my-4 text-muted">
              Steigern Sie die Motivation Ihrer Mitarbeiter, indem Sie ihnen zeigen, dass Sie sich um ihr Wohlbefinden kümmern.
              </p>
            </Col>
            <Col lg={4}>
              <BsPersonPlus color="var(--main-color)" size={150} />
              <h5>Zuschuss-Modell</h5>
              <p className="my-4 text-muted">Machen Sie Ihre Mitarbeiter noch motivierter und unterstützen Sie sie aktiv bei ihrer Gesundheit.
              </p>
            </Col>
            <Col lg={4}>
              <TbDiscount color="var(--main-color)" size={150} />
              <h5>Rabatt-Modell</h5>
              <p className="my-4 text-muted">
              Je nach Anzahl der Mitarbeiter erhalten Sie bei Fitness XBody einen Rabatt auf die monatlichen Gebühren sowie die einmaligen Anmeldegebühren.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="spikes"></div>

      <section className="container-fluid bg-dark text-white">
        <Container className="mt-5 py-5">
          <Row className="d-flex justify-content-between align-items-center">
            <Col
              className="d-flex justify-content-center align-items-center"
              lg={5}
            >
              <div>
                <h2>
                  <b>Wir beraten Sie gerne:</b>
                </h2>

                <div className="my-5">
                  <p className="text-muted">
                  Möchten Sie eine Kooperation mit Fitness Xbody im Rahmen des Fit for <b className="text-white">Work-Programms eingehen?</b> Oder sind Sie als Angestellter daran interessiert, bei uns zu trainieren? Dann nehmen Sie gerne Kontakt mit uns auf. Nutzen Sie einfach unser <b className="text-white">Kontaktformular</b> und geben Sie uns Ihre Anfrage. Unser Expertenteam wird sich umgehend bei Ihnen melden und Ihnen alle Informationen zu aktuellen Angeboten und Leistungen geben. Wir freuen uns darauf, Ihnen zu helfen, fit und gesund zu bleiben.
                    Sie sind interessiert an einer{" "}
                    <b className="text-white"></b> mit
                    Fitness Xbody? Sie möchten sich für Ihr Unternehmen über
                    aktuelle Angebote und Leistungen informieren? Oder Sie sind
                    Angestellter und möchten bei Fitness First trainieren?
                    Zögern Sie nicht, uns zu kontaktieren. Nutzen Sie einfach
                    unser . Unser
                    Expertenteam meldet sich umgehend bei Ihnen.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <Forms/>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default PageCompany;
