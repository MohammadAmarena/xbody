import { Button, Col, Form, Row } from "react-bootstrap";
import "./form.scss";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { Link } from "react-router-dom";

const forms = () => {
  const [formMessage, setFormMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [sendSuccessful, setSendSuccessful] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSendButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (async () => {
      try {
        const data = (
          await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/contact`,
            {
              firstName,
              lastName,
              phoneNumber,
              email,
              message,
            },
            { withCredentials: true }
          )
        ).data;
        if (data.errors.length > 0) {
          setErrors(data.errors);
        } else {
          setFormMessage("");
          setFirstName("");
          setLastName("");
          setPhoneNumber("");
          setEmail("");
          setMessage("");
          setErrors([]);
          setSendSuccessful(true);
        }
        Swal({
          title: "Message sent",
          text: `Vielen Dank für Ihre Kontaktaufnahme mit uns.`,
          icon: "success",
        });
        setSuccess(true);
      } catch (err: any) {
        setErrors([err.response.data]);
        setError("An error occurred. Please try again later.");
      }
    })();
  };
  console.log(firstName);

  return (
    <>
      {sendSuccessful ? (
        <div className="sendSuccessfulArea">
          <h2>Vielen Dank für Ihre Kontaktaufnahme mit uns. Wir haben Ihre Anfrage erhalten und werden uns so schnell wie möglich bei Ihnen melden!</h2>
        </div>
      ) : (
        <>
          <Form onSubmit={handleSendButton}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Select required>
                    <option>Anrede *</option>
                    <option>Herr</option>
                    <option>Frau</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Select required>
                    <option>Ich bin *</option>
                    <option>Privatperson</option>
                    <option>Firma</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Vorname *"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Nachname *"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="number"
                placeholder="Telefonnummer bei Rückfragen *"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="E-Mail-Adresse *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                Wir werden Ihre E-Mail niemals an Dritte weitergeben.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                placeholder="Nachricht *"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {formMessage}
            </Form.Group>

            <Form.Text className="text-white">
              Die mit einem * markierten Felder sind Pflichtfelder.
            </Form.Text>
            <Form.Group id="formGridCheckbox" className="mt-3">
              <div className="d-flex">
              <Form.Check type="checkbox" required />
              <Form.Text className="ms-2 text-white">
              Ich habe die <Link to="/datenschutz">Datenschutzbestimmungen</Link> zur Kenntnis genommen.
              </Form.Text>
              </div>
            </Form.Group>

            <div className="buttonRow">
              <div className="formMessage">{formMessage}</div>
              <div className="d-flex justify-content-end mt-4">
                <Button
                  style={{ background: "var(--main-color)" }}
                  className="btn-outline-none border-0"
                  type="submit"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </Form>
          {errors.length > 0 && (
            <div className="errorArea">
              <ul>
                {errors.map((error, i) => {
                  return <li key={i}>{error}</li>;
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};
export default forms;
