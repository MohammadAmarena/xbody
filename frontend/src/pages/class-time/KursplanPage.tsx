import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import "./Kursplan.scss";

const KursplanPage = () => {
  const [tsfilter, setTsfilter] = useState("all");

  useEffect(() => {
    const handleClick = (event: any) => {
      const clickedFilter = event.target.getAttribute("data-tsfilter");
      listItems.forEach((item) => {
        item.classList.remove("active");
      });
      event.target.classList.add("active");
      setTsfilter(clickedFilter);
    };

    const listItems = document.querySelectorAll(".table-controls ul li");

    listItems.forEach(function (item) {
      item.addEventListener("click", handleClick);
    });

    return () => {
      listItems.forEach(function (item) {
        item.removeEventListener("click", handleClick);
      });
    };
  }, []);

  useEffect(() => {
    const timetable = document.querySelector(".class-timetable");
    const tsMetas = document.querySelectorAll(".ts-meta");

    if (tsfilter === "all") {
      if (timetable !== null) {
        timetable.classList.remove("filtering");
      }
      tsMetas.forEach(function (item) {
        item.classList.remove("show");
      });
    } else {
      if (timetable !== null) {
        timetable.classList.add("filtering");
      }
    }

    tsMetas.forEach(function (item) {
      item.classList.remove("show");
      if (item.getAttribute("data-tsmeta") === tsfilter) {
        item.classList.add("show");
      }
    });
  }, [tsfilter]);

  return (
    <div className="class-timetable-section vh-100 container-fluid">
      <Helmet>
        <title>Kursplan</title>
      </Helmet>
      <section className="spad pt-3">
        <div className="container">
          <Row>
            <Col lg={6}>
              <div className="section-title">
                <h2 className="text-white">Finden Sie Ihr Workout</h2>
              </div>
            </Col>
            <Col lg={6}>
              <div className="table-controls">
                <ul>
                  <li className="active" data-tsfilter="all">
                    Alle events
                  </li>
                  <li data-tsfilter="fitness">Fitness-Tipps</li>
                  <li data-tsfilter="motivation">Motivation</li>
                  <li data-tsfilter="workout">Workout</li>
                </ul>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="class-timetable">
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Montag</th>
                      <th>Dienstag</th>
                      <th>Mittwoch</th>
                      <th>Donnerstag</th>
                      <th>Freitag</th>
                      <th>Samstag</th>
                      <th>Sonntag</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="class-time">6.00am - 8.00am</td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>WEIGHT LOOSE</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="fitness">
                        <h5>Cardio</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Yoga</h5>
                        <span>Keaf Shen</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="fitness">
                        <h5>Fitness</h5>
                        <span>Kimberly Stone</span>
                      </td>
                      <td className="dark-bg blank-td"></td>
                      <td className="hover-bg ts-meta" data-tsmeta="motivation">
                        <h5>Boxing</h5>
                        <span>Rachel Adam</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Body Building</h5>
                        <span>Robert Cage</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="class-time">10.00am - 12.00am</td>
                      <td className="blank-td"></td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Fitness</h5>
                        <span>Kimberly Stone</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="workout">
                        <h5>WEIGHT LOOSE</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Cardio</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="workout">
                        <h5>Body Building</h5>
                        <span>Robert Cage</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="motivation"
                      >
                        <h5>Karate</h5>
                        <span>Donald Grey</span>
                      </td>
                      <td className="blank-td"></td>
                    </tr>
                    <tr>
                      <td className="class-time">5.00pm - 7.00pm</td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Boxing</h5>
                        <span>Rachel Adam</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="motivation">
                        <h5>Karate</h5>
                        <span>Donald Grey</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Body Building</h5>
                        <span>Robert Cage</span>
                      </td>
                      <td className="blank-td"></td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Yoga</h5>
                        <span>Keaf Shen</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="motivation">
                        <h5>Cardio</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Fitness</h5>
                        <span>Kimberly Stone</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="class-time">7.00pm - 9.00pm</td>
                      <td className="hover-bg ts-meta" data-tsmeta="motivation">
                        <h5>Cardio</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                      <td className="dark-bg blank-td"></td>
                      <td className="hover-bg ts-meta" data-tsmeta="fitness">
                        <h5>Boxing</h5>
                        <span>Rachel Adam</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="workout"
                      >
                        <h5>Yoga</h5>
                        <span>Keaf Shen</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="motivation">
                        <h5>Karate</h5>
                        <span>Donald Grey</span>
                      </td>
                      <td
                        className="dark-bg hover-bg ts-meta"
                        data-tsmeta="fitness"
                      >
                        <h5>Boxing</h5>
                        <span>Rachel Adam</span>
                      </td>
                      <td className="hover-bg ts-meta" data-tsmeta="workout">
                        <h5>WEIGHT LOOSE</h5>
                        <span>RLefew D. Loee</span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default KursplanPage;
