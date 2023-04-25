import { Helmet } from "react-helmet";
import { Courses, Food, Gallery, Landing, Training } from "./section/Index";
import "./home.scss";

export const PageHome = () => {
  return (
    <div className="pageHome">
      <Helmet>
        <title>Fitness - Home</title>
      </Helmet>
      <Landing />
      <Courses />
      <Training />
      <Food />
      <Gallery />
    </div>
  );
};
