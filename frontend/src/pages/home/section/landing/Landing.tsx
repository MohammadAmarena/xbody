import { gallery } from "../../../../dev/gallery";
import "./landing.scss";
import Carousel from "react-bootstrap/Carousel";
import { PrimaryButton, SecondaryButton } from "../../../../../src/components/Index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation()
  return (
    <section className="landing">
      {gallery.slider.map((item) => {
        return (
          <Carousel className="content" slide={true}>
            {item.images.map((image: any, i: any) => {
              return (
                <Carousel.Item className="item overflly">
                  <img className="w-100 h-100" src={image} alt="" key={i} />
                  <div className="landing-text">
                    <h3>{t("gym")}<span style={{ color: "var(--main-color)" }}>{t("studio")}</span> {t("with")}</h3>
                    <p><span style={{ color: "var(--main-color)" }}>{t("top")} </span>{t("quality")}</p>
                    <PrimaryButton>
                      <Link to="/signup" className="border-0">
                        {t("JOIN NOW")}
                      </Link>
                    </PrimaryButton>
                  </div>
                </Carousel.Item>
              );
            })}
          </Carousel>
        );
      })}
    </section>
  );
};

export default Landing;
