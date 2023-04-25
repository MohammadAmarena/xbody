import { PrimaryButton } from '../../../../../src/components/Index'
import { Link } from "react-router-dom";
import "./landing.scss"
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t } = useTranslation();
  return (
    <section className="landing">
      <div className="content">
            <div className="item">
              <img src='/public/images/Home/Probetraining-frau.jpg' alt="" />
              <div className="landing-text">
                <h2>{t("Trial training at")} Xbody</h2>
                <p>{t("Just try it")}</p>
                <PrimaryButton><Link to="/contact">{t("ASK NOW")}</Link></PrimaryButton>

              </div>
            </div>
      </div>
    </section>
  );
};

export default Landing
