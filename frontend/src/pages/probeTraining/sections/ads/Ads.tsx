import { PrimaryButton } from "../../../../../src/components/Index";
import { VscCheck } from "react-icons/vsc";
import { Ad } from "./Ad";
import "./ads.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Col, Row } from "react-bootstrap";

const Ads = () => {
  const { t } = useTranslation();
  return (
    <section className="my-5 bg-dark text-white ads">
      <Row>
        <Col lg={6} className="pe-lg-0">
          <img
            src="/public/images/Home/trainer-frau.jpg"
            alt=""
            className="w-100 h-100"
          />
        </Col>
        <Col lg={6} className="text-center d-flex justify-content-center align-items-center px-5 lh-lg">
          <div>
            {" "}
            <h2 style={{color: "var(--main-color)"}}>{t("How is your trial training going?")}</h2>
            <p>
              {t(
                "If you would like to train with one of our competent trainers, you are welcome to register with your club. Our trainers are always available to help you achieve your fitness goals."
              )}
            </p>
            <PrimaryButton>
              <NavLink to="/signin"> {t("JOIN NOW")} </NavLink>
            </PrimaryButton>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="ps-4">
          <h2 style={{color: "var(--main-color)"}} className="my-3">{t("WHAT TO EXPECT AT FITNESS XBody")}</h2>
          <p>
            <VscCheck className="icon" /> {t("Studio in bester Lage")}
          </p>
          <p>
            <VscCheck className="icon" />{" "}
            {t(
              "Experience numerous courses and small group training sessions with us every day"
            )}
          </p>
          <p>
            <VscCheck className="icon" />{" "}
            {t("spacious cardio and strength training bottles")}
          </p>
          <p>
            <VscCheck className="icon" />{" "}
            {t("exclusive support from our qualified trainers")}
          </p>
          <p>
            <VscCheck className="icon" /> {t("Large relaxation areas")}
          </p>
          <p>
            <VscCheck className="icon" />{" "}
            {t(
              "Our trainers are highly qualified and will support you in achieving your goals"
            )}
          </p>
          <p>
            <VscCheck className="icon" />{" "}
            {t("We offer our members free water and other beverages")}
          </p>
          <p>
            <VscCheck className="icon" /> {t("30+ online home workouts")}
          </p>
          <div className="text-center text-danger mb-3">
            <p>{t("And much more - start your first workout now!")}</p>
            <PrimaryButton>
              <NavLink to="/signin"> {t("Sign up NOW")} </NavLink>
            </PrimaryButton>
          </div>
        </Col>
        <Col lg={6} className="ps-lg-0">
          <img
            src="/public/images/Home/erwartet-dich.jpg"
            alt=""
            className="w-100 h-100"
          />
        </Col>
      </Row>
    </section>
  );
};

export default Ads;
