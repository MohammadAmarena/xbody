import { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import { VscCheck } from "react-icons/vsc";
import { PrimaryButton } from "../../components/Index";
import { clubFaqs, mitgliederFaqs, rundFaqs } from "../../dev/faqs";
import "./faqs.scss";

const FAQS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMatched, setIsMatched] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsSearchActive(event.target.value !== "");
  };

  useEffect(() => {
    setIsMatched(
      rundFaqs.some((faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
        mitgliederFaqs.some((faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        clubFaqs.some((faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [rundFaqs, mitgliederFaqs, clubFaqs, searchTerm]);

  return (
    <div className="pre-container">
      <Helmet>
        <title>FAQS</title>
      </Helmet>
      <main className="container-fluid d-flex justify-content-center align-items-center  text-white text-center">
        <div className="container">
          <h1 className="mt-5"><span className="text-black">Fragen und</span> Antworten</h1>
          {/* <div className="banner-text py-5">

            <div className="my-5">
              <p>
                <VscCheck color="var(--main-color)" size={18} /> Schnelle
                Antworten auf deine Fragen
              </p>
              <p>
                <VscCheck color="var(--main-color)" size={18} /> Kein Anruf bei
                einer Hotline nötig
              </p>
            </div>

            <PrimaryButton href="#antwort">ANTWORT FINDEN</PrimaryButton>
          </div> */}
        </div>
      </main>

      <section className="my-5 pt-5" id="antwort">
        <Container>
          <div className="mb-5 d-flex justify-content-center align-items-center">
            <Col lg={3}>
              <InputGroup className="mb-3" size={"lg"}>
                <Form.Control
                  type="text"
                  placeholder="Suche nach einer Frage..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Button variant="warning" className="border-dark">Suche</Button>
              </InputGroup>
            </Col>
          </div>
          <Accordion>
            <h2 className="titel">Fragen zu meiner Mitgliedschaft :</h2>
            {rundFaqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.id}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            {isSearchActive && !isMatched && (
              <Accordion.Item eventKey={"0"}>
                <Accordion.Header>Keine Ergebnisse gefunden.</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Bitte versuche es mit einer anderen Frage erneut.
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>

          <Accordion className="mt-5">
            <h2 className="titel">Für Mitglieder :</h2>
            {mitgliederFaqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.id}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            {isSearchActive && !isMatched && (
              <Accordion.Item eventKey={"0"}>
                <Accordion.Header>Keine Ergebnisse gefunden.</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Bitte versuche es mit einer anderen Frage erneut.
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>

          <Accordion className="mt-5 position-relative">
            <h2 className="titel">Fragen rund um Xbody-Studio :</h2>
            {clubFaqs
              .filter((faq) =>
                faq.question.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((faq) => (
                <Accordion.Item key={faq.id} eventKey={faq.id}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body className="text-muted">
                    {faq.answer}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            {isSearchActive && !isMatched && (
              <Accordion.Item eventKey={"0"}>
                <Accordion.Header>Keine Ergebnisse gefunden.</Accordion.Header>
                <Accordion.Body className="text-muted">
                  Bitte versuche es mit einer anderen Frage erneut.
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        </Container>
      </section>
    </div>
  );
};

export default FAQS;
