import { PrimaryButton } from "../../../../../src/components/Index";
import "./personalTraining.scss";
import { Link } from "react-router-dom";
import { VscCheck } from "react-icons/vsc";

const PersonalTraining = () => {
  return (
    <section className="personalTraining">
      <div className="content">
        <div className="item">
          <img src="/public/images/Home/personalTraining.jpg" alt="" />
          <div className="landing-text">
            <h1>PERSONAL TRAINING IN DEINEM <span style={{color:"var(--main-color)"}}>FITNESSCLUB</span></h1>
            <p className="fs-4">
              <VscCheck color="var(--main-color)" /> Maximal effizientes
              Training
            </p>
            <p className="fs-4">
              <VscCheck color="var(--main-color)" /> Individuelle Betreuung für
              dich & deine Ziele
            </p>
            <p className="fs-4">
              <VscCheck color="var(--main-color)" /> Flexible Buchungsoptionen{" "}
            </p>
            <PrimaryButton>
              <Link to="/contact"> JETZT ANFRAGEN</Link>
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalTraining;
