import "./club.scss";
import { useTranslation } from "react-i18next";

const Club = () => {
  const { t } = useTranslation();
  return (
    <section className="clubs">
      <div className="title">
        <h2>{t("Make a trial training appointment")}</h2>
      </div>
      <div className="content">
        <div className="card">
          <h2 className="cardTitle">1</h2>
          <p className="cardText">{t("Book your free trial session online now")}!</p>
        </div>
        <div className="card">
          <h2 className="cardTitle">2</h2>
          <p className="cardText">{t("With us you have the opportunity to test our complete training for a whole day")}!</p>
        </div>
        <div className="card">
          <h2 className="cardTitle">3</h2>
          <p className="cardText">{t("Just bring your sports equipment and let's go")}!</p>
        </div>
      </div>
    </section>
  );
};

export default Club;
