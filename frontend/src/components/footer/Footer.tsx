import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Row,
} from "react-bootstrap";
import { RxDoubleArrowRight } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";
import { CgFacebook } from "react-icons/cg";
import { TbPhone } from "react-icons/tb";
import { SlPaperPlane } from "react-icons/sl";
import { AiOutlineInstagram, AiOutlineYoutube } from "react-icons/ai";
import "./footer.scss";
import { Link, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert";


const Footer = () => {
  const [emailValue, setEmailValue] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/contact`, { email: emailValue });
      setEmailValue("");
      Swal({
        title: "Herzlichen Dank",
        text: `Herzlichen Dank für Ihre Anmeldung zu unserem Newsletter!`,
        icon: "success",
      });
      setSuccess(true);
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <div className="pre-footer">
        <Container>
          <Row className="text-center">
            <Col className="social-icons" lg={4}>
              <span>Join us :</span>
              <Nav.Link
                href="https://www.instagram.com/xbody.mbs/"
                target="_blank"
              >
                <AiOutlineInstagram size={35} />
              </Nav.Link>
              <Nav.Link
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=100091387230430"
                target="_blank"
              >
                <CgFacebook size={30} />
              </Nav.Link>
              <Nav.Link
                href="https://www.youtube.com/channel/UCooskmIk_NCJXdukExeQVlA"
                target="_blank"
              >
                <AiOutlineYoutube size={35} />
              </Nav.Link>
            </Col>
            <Col className="tel" lg={4}>
              <Nav.Link href="tel:+4900000000000">
                <TbPhone size={30} /> +49 040 123 456 789
              </Nav.Link>
            </Col>
            <Col lg={4}>
              <Nav.Link href="mailto:xbody.mbs@gmail.com">
                <SlPaperPlane size={25} /> xbody.mbs@gmail.com
              </Nav.Link>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="footer">
        <div className="container">
          <div className="box">
            <img
              src="/public/small_logo2.png"
              alt="xbody"
              width={250}
              className="ps-4"
            />
            <figcaption className="border-top text-center fs-5">
              <p>
                To Build a Stro
                <span style={{ color: "#FD701A" }}>ng Athletic Body</span>
              </p>
            </figcaption>
          </div>
          <div className="box">
            <ul className="links">
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />
                <Link to="/impressum">Impressum</Link>
              </li>
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />
                <Link to="/agb">AGB</Link>
              </li>
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />
                <Link to="/datenschutz">Datenschutz</Link>
              </li>
            </ul>
          </div>
          <div className="box">
            <ul className="links">
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />

                <Link to="/uberuns">Über uns</Link>
              </li>
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />
                <a href="#">Widerrufsbelehrung</a>
              </li>
              <li>
                <RxDoubleArrowRight color="var(--main-color)" />
                <a href="#">Cookie-Einstellungen</a>
              </li>
            </ul>
          </div>
          <div className="box ps-4">
            <h5>Newsletter</h5>
            {!success && (
              <>
                <p>
                  Keine Aktionen und Angebote mehr verpassen! Kostenlos und
                  jederzeit kündbar Keine Aktionen und Angebote mehr verpassen!
                  Kostenlos
                </p>
                <Form onSubmit={handleSubmit}>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      placeholder="E-Mail-Adresse"
                      required
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <Button variant="outline-none" type="submit">
                      <IoIosArrowForward />
                    </Button>
                  </InputGroup>
                </Form>
                {error && <div className="error">{error}</div>}
              </>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3 m-4">
          <img
            src="https://d2skenm2jauoc1.cloudfront.net/websites/img/pm-cash.png"
            alt=""
          />
          <img
            src="https://d2skenm2jauoc1.cloudfront.net/websites/img/pm-visa.png"
            alt=""
          />
          <img
            src="https://d2skenm2jauoc1.cloudfront.net/websites/img/pm-master.png"
            alt=""
          />
          <img
            src="https://d2skenm2jauoc1.cloudfront.net/websites/img/pm-paypal.png"
            alt=""
          />
        </div>
        <div className="copyright">
          <p>
            Copyright All rights reserved
            <span className="author"> XBody </span>© 2023.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
