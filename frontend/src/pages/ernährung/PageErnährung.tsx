import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import CardGroup from "react-bootstrap/CardGroup";
import { Helmet } from "react-helmet";
import "./ernährung.scss";
import { Accordion, Col, Container, Row } from "react-bootstrap";

const PageErnährung = () => {
  return (
    <div className="PageErnährung">
      <Helmet>
        <title>Ernährung</title>
      </Helmet>
      <section className="banner">
        <div className="overlay"></div>
      </section>

      <section className="ernährung bg-white">
        <Container>
          <Row className="" style={{ marginBottom: "100px" }}>
            <Col md={5} className="img_one d-lg-block d-sm-none"></Col>
            <Col md={7}>
              <div className="ps-md-5">
                <h5 className="mb-4">Ernährungstipps</h5>
              </div>
              <div className="ps-md-5 lh-lg">
                <p>
                  Die richtige Ernährung ist ein wesentlicher Bestandteil des
                  Krafttrainings. Um den Muskelaufbau optimal zu unterstützen,
                  solltest du auf eine ausgewogene Nahrungszufuhr achten, die
                  reich an Kohlenhydraten, Proteinen und gesunden Fetten ist.
                  Erfahre hier, welche Mahlzeiten für den Muskelaufbau besonders
                  wichtig sind, wie du deine Ernährung genau planst und
                  spannende Fakten zu Nährwerten erhältst.
                </p>
                <p>
                  Zusätzlich bekommst du coole Tipps, um deine Ernährung auf das
                  nächste Level zu bringen.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <div className="pe-md-5">
                <h5 className="mb-4">Lebensmittel für Muskelaufbau</h5>
              </div>
              <div className="pe-md-5 lh-lg">
                <p>
                  Für Muskelaufbau empfiehlt es sich, 50 % der täglichen
                  Kalorienzufuhr aus Kohlenhydraten zu beziehen. Komplexe
                  Kohlenhydrate wie Vollkornprodukte, Hülsenfrüchte und Gemüse
                  liefern langanhaltende Energie. Gesunde Fette wie Nüsse,
                  Avocado oder Fisch sollten etwa 20 % der Kalorienzufuhr
                  ausmachen, um wichtige Nährstoffe zu liefern.
                </p>
                <p>
                  Die restlichen 30 % sollten aus Protein stammen, um die
                  Muskeln optimal zu versorgen. Ein individuell angepasster
                  Ernährungsplan kann im Krafttraining zum Erfolg führen.
                </p>
              </div>
            </Col>
            <Col md={5} className="img_two d-lg-inline-block d-sm-none"></Col>
          </Row>
        </Container>
      </section>

      <article className="text-white">
        <div className="tt_overlay"></div>
        <h2 className="section-title my-5 py-5">
          Wie es <span>funktioniert?</span>
        </h2>
        <Container>
          <Row>
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="d-block text-center">
                <div className="icon d-flex justify-content-center align-items-center">
                  <img src="/public/images/Icons/diet.png" alt="" height={75} />
                </div>
                <div className="p-2 mt-3">
                  <h5>Folge dem Programm</h5>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="d-block text-center">
                <div className="icon d-flex justify-content-center align-items-center">
                  <img
                    src="/public/images/Icons/report.png"
                    alt=""
                    height={75}
                  />
                </div>
                <div className="p-2 mt-3">
                  <h5>Arbeite für das Ergebnis</h5>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="d-block text-center">
                <div className="icon d-flex justify-content-center align-items-center">
                  <img
                    src="/public/images/Icons/checklist.png"
                    alt=""
                    height={75}
                  />
                </div>
                <div className="p-2 mt-3">
                  <h5>Esse gesundes Esenn</h5>
                </div>
              </div>
            </Col>
            <Col
              md={3}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="d-block text-center">
                <div className="icon d-flex justify-content-center align-items-center">
                  <img
                    src="/public/images/Icons/achievement.png"
                    alt=""
                    height={75}
                  />
                </div>
                <div className="p-2 mt-3">
                  <h5>Geniesse dein Leben</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </article>

      <section className="rezepte">
        <h2 className="section-title">Wochenrezepte</h2>
        <Container>
          <Row sm={1} md={2} className="g-4">
            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="/public/images/Home/rote-linsen-bratlinge.jpg"
                />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Rote Linsen Bratlinge</h4>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Brühe mit Lorbeerblatt aufkochen, Linsen einstreuen,
                        aufkochen und abgedeckt circa 10 Minuten garen. Möhren
                        schälen, Zwiebeln abziehen und beides fein reiben (am
                        besten in einem Zerkleinerer). Linsen abgießen und gut
                        abtropfen lassen. Möhren, Zwiebeln, Linsen,
                        Haferflocken, Ei, Mehl, Schmand und 2 Esslöffel
                        Schnittlauch vermengen und mit Salz und Pfeffer würzen.
                        Linsenmischung portionsweise (jeweils 2 EL) in erhitztem
                        Öl braten (wie bei Reibeplätzchen). Für den Dip Quark
                        und Joghurt mit restlichem Schnittlauch und Petersilie
                        verrühren und mit Salz und Pfeffer würzen. Bratlinge mit
                        dem Dip servieren. Dieses Rezept lässt sich schnell und
                        einfach zubereiten.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>75 ml Brühe</ListGroup.Item>
                  <ListGroup.Item>¼ Lorbeerblatt</ListGroup.Item>
                  <ListGroup.Item>25 g Linsen, rote</ListGroup.Item>
                  <ListGroup.Item>½ Möhre(n)</ListGroup.Item>
                  <ListGroup.Item>20 g Haferflocken, feine</ListGroup.Item>
                  <ListGroup.Item>37 ½ g Joghurt</ListGroup.Item>
                  <ListGroup.Item>10 g Mehl</ListGroup.Item>
                  <ListGroup.Item>1 EL Schnittlauch in Röllchen</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 436 | Eiweiß 23,39 g | Fett 18,64 g | Kohlenhydr. 42,20
                    g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 30 Minuten - Koch-/Backzeit ca. 20 Minuten -
                    Gesamtzeit ca. 50 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="/public/images/Home/gyros-nudelauflauf-in-metaxasosse.jpg"
                />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Gyros-Nudelauflauf in Metaxasoße</h4>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Nudeln in ausreichend Salzwasser kochen, abgießen und in
                        eine Auflaufform geben. Gyros in Öl anbraten. Dann
                        ebenfalls in die Auflaufform geben. Das Gemüse waschen,
                        klein schneiden und in demselben Öl anbraten, in dem
                        zuvor das Gyros angebraten wurde. Noch etwas mit Salz
                        und Pfeffer würzen. Das Öl mit Sahne ablöschen und den
                        Schmand einrühren. Nun auch Tomatenmark und Metaxa
                        hinzugeben. Nach Belieben vom Tomatenmark und Metaxa
                        etwas mehr hinzugeben. Mit Salz und Pfeffer,
                        gegebenenfalls mit Paprikapulver und anderen Gewürzen
                        würzen. Nun die Soße über die Zutaten in der Auflaufform
                        gießen, Käse drüber streuen und bei 150 °C Umluft für 20
                        - 30 Minuten in den Ofen schieben.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>62 ½ g Nudeln</ListGroup.Item>
                  <ListGroup.Item>125 g Gyrosfleisch</ListGroup.Item>
                  <ListGroup.Item>¼ Paprikaschote(n), rote</ListGroup.Item>
                  <ListGroup.Item>½ Zwiebel(n)</ListGroup.Item>
                  <ListGroup.Item>37 ½ g Champignons, frisch</ListGroup.Item>
                  <ListGroup.Item>12 ½ g Tomatenmark</ListGroup.Item>
                  <ListGroup.Item>10 g Mehl</ListGroup.Item>
                  <ListGroup.Item>50 g Schmand</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 878 | Eiweiß 50,15 g | Fett 50,13 g | Kohlenhydr. 55,55
                    g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 30 Minuten - Koch-/Backzeit ca. 50 Minuten -
                    Gesamtzeit ca. 50 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img variant="top" src="/public/images/Home/lasagne.jpg" />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Lasagne</h4>
                    <Accordion.Item eventKey="">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Ragú Bolognese: In einem Topf das Olivenöl erhitzen, das
                        Hackfleisch darin rundherum anbraten und die gehackten
                        Zwiebeln und die gehackte Petersilie dazugeben.
                        Knoblauch in feinen Scheiben und Tomatenmark dazu rühren
                        und mitbraten. Mit den Dosentomaten aufgießen, salzen
                        und pfeffern. Rotwein nach Belieben beifügen. Das Ragú
                        mindestens eine halbe Stunde lang bei geöffnetem Topf
                        einkochen lassen.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>125 g Hackfleisch, gemischtes</ListGroup.Item>
                  <ListGroup.Item>¼ Zwiebel(n)</ListGroup.Item>
                  <ListGroup.Item>½ Knoblauchzehe(n)</ListGroup.Item>
                  <ListGroup.Item>¼ Bund Petersilie oder TK</ListGroup.Item>
                  <ListGroup.Item>¼ EL Tomatenmark</ListGroup.Item>
                  <ListGroup.Item>
                    ¼ Dose Tomate(n), geschälte (500 g)
                  </ListGroup.Item>
                  <ListGroup.Item>etwas Rotwein</ListGroup.Item>
                  <ListGroup.Item>⅛ Liter Milch</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 1122 | Eiweiß 41,75 g | Fett 54,58 g | Kohlenhydr.
                    66,26 g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 30 Minuten - Koch-/Backzeit ca. 70 Minuten -
                    Gesamtzeit ca. 100 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="/public/images/Home/mozzarella-haehnchen-in-basilikum-sahnesauce.jpg"
                />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Mozzarella-Hähnchen in Basilikum-Sahnesauce</h4>
                    <Accordion.Item eventKey="">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Fleisch waschen und trocken tupfen. Mit Salz und Pfeffer
                        würzen. Öl in einer Pfanne erhitzen. Filets darin von
                        allen Seiten ca. 5 Min. kräftig anbraten. Tomaten
                        waschen und halbieren. Basilikumblätter abzupfen,
                        waschen und fein hacken. Sahne in einem Topf aufkochen
                        lassen. Schmelzkäse hineinrühren und schmelzen lassen.
                        Mit Salz und Pfeffer würzen. 2/3 vom Basilikum
                        unterrühren. Fleisch und Tomaten in eine gefettete
                        Auflaufform geben. Sauce darüber gießen. Mozzarella in
                        kleine Stückchen schneiden und auf dem Fleisch
                        verteilen. Wer mag, kann noch geriebenen Parmesan und 1
                        EL Kräuterbutter in kleinen Flöckchen darauf verteilen.
                        Im vorgeheizten Ofen bei 200 °C Ober-/Unterhitze bzw.
                        175 °C Umluft ca. 30 Min. backen. Herausnehmen und mit
                        restlichem Basilikum bestreuen. Dazu schmecken Kroketten
                        oder Reis.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>1 Hühnerbrustfilet(s)</ListGroup.Item>
                  <ListGroup.Item>¼ EL Öl</ListGroup.Item>
                  <ListGroup.Item>62 ½ g Cocktailtomaten</ListGroup.Item>
                  <ListGroup.Item>⅛ Topf Basilikum</ListGroup.Item>
                  <ListGroup.Item>50 g Sahne</ListGroup.Item>
                  <ListGroup.Item>25 g Sahneschmelzkäse</ListGroup.Item>
                  <ListGroup.Item>31 ¼ g Mozzarella</ListGroup.Item>
                  <ListGroup.Item>Parmesan, optional</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 678 | Eiweiß 40,15 g | Fett 41,23 g | Kohlenhydr. 65,45
                    g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 20 Minuten - Koch-/Backzeit ca. 30 Minuten -
                    Gesamtzeit ca. 50 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="/public/images/Home/schweinefilet-mit-maronen-und-porree-in-sahnesosse.jpg"
                />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Schweinefilet mit Maronen in Sahnesoße</h4>
                    <Accordion.Item eventKey="">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Schweinefilet in ca. 5 cm dicke Medaillons schneiden.
                        Porree waschen und in Ringe schneiden. Pfanne erhitzen.
                        Öl hinein geben und ebenfalls erhitzen. Die Medaillons
                        (vorher etwas mehlieren) in die Pfanne geben und auf
                        beiden Seiten kurz scharf anbraten. Aus der Pfanne
                        nehmen und zur Seite stellen. Porree in der Pfanne in
                        etwas Öl anbraten. Mit Sahne ablöschen. Die Maronen und
                        die Medaillons hinzugeben und köcheln lassen, bis die
                        Sahnesoße schön sämig und das Fleisch gar ist. Nach
                        Bedarf abschmecken. Dazu passen Spätzle.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>125 ml Sahne</ListGroup.Item>
                  <ListGroup.Item>¼ Zwiebel(n)</ListGroup.Item>
                  <ListGroup.Item>
                    62 ½ g Marone(n) (Kastanien), fertig gegart
                  </ListGroup.Item>
                  <ListGroup.Item>Salz und Pfeffer</ListGroup.Item>
                  <ListGroup.Item>150 g Schweinefilet(s)</ListGroup.Item>
                  <ListGroup.Item>Öl</ListGroup.Item>
                  <ListGroup.Item>etwas Rotwein</ListGroup.Item>
                  <ListGroup.Item>etwas Mehl</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 549 | Eiweiß 39,09g | Fett 26,58 g | Kohlenhydr. 38,26
                    g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 10 Minuten - Koch-/Backzeit ca. 20 Minuten -
                    Gesamtzeit ca. 30 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>

            <Col>
              <Card>
                <Card.Img
                  variant="top"
                  src="/public/images/Home/gnocchi-salat.jpg"
                />
                <Card.Body className="bg-white">
                  <Accordion className="mt-5">
                    <h4>Gnocchi-Salat</h4>
                    <Accordion.Item eventKey="">
                      <Accordion.Header>Die Zubereitung</Accordion.Header>
                      <Accordion.Body className="text-muted">
                        Die Gnocchi nach Packungsanweisung in Salzwasser kochen.
                        Dann abgießen und kalt abspülen. Die Zucchini und
                        Paprika in dünne Scheiben oder Würfel schneiden. Beide
                        Zutaten nach dem Zerkleinern zusammen mit der fein
                        gehackten Zwiebel in heißem Öl anbraten und mit Salz und
                        Pfeffer würzen. Für die Tomaten-Vinaigrette Knoblauch,
                        Essig, Öl, Tomatenmark und Brühe zusammenmixen. Mit Salz
                        und Pfeffer abschmecken. Gnocchi, Gemüse und die
                        Vinaigrette vermengen. Basilikum und Parmesan über den
                        Salat streuen. Der Salat kann kalt oder aber auch
                        lauwarm serviert werden. Dazu passen Parmaschinken,
                        Antipasti und Baguette.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    81 ¼ g Gnocchi aus dem Kühlregal
                  </ListGroup.Item>
                  <ListGroup.Item>¼ kleine Zwiebel(n)</ListGroup.Item>
                  <ListGroup.Item>¼ Paprikaschote(n), rot</ListGroup.Item>
                  <ListGroup.Item>¼ Zucchini, grün</ListGroup.Item>
                  <ListGroup.Item>½ EL Olivenöl</ListGroup.Item>
                  <ListGroup.Item>
                    Salz und Pfeffer aus der Mühle
                  </ListGroup.Item>
                  <ListGroup.Item>7 ½ ml Gemüsebrühe (3 EL</ListGroup.Item>
                  <ListGroup.Item>¼ Knoblauchzehe(n)</ListGroup.Item>
                  <Card.Header as="h5" className="bg-white">
                    Nährwerte pro Portion:{" "}
                  </Card.Header>
                  <Card.Header as="h5" className="bg-white">
                    kcal 378 | Eiweiß 16,35 g | Fett 19,40 g | Kohlenhydr. 31,85
                    g
                  </Card.Header>
                </ListGroup>
                <Card.Footer className="bg-white">
                  <small className="text-muted">
                    {" "}
                    Arbeitszeit ca. 20 Minuten - Koch-/Backzeit ca. 10 Minuten -
                    Gesamtzeit ca. 30 Minuten
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="spikes"></div>
      <section className="next-week px-2 bg-dark">
        <h2 className="section-title">
          {" "}
          Rezepte für die <span>kommende Woche</span>
        </h2>
        <Row sm={1} md={4} className="g-4">
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="/public/images/Home/thai-suppe-mit-glasnudeln-spinat-und-huehnchen.jpg"
              />{" "}
              <Card.Body>
                <Card.Title>Thai Suppe mit Glasnudeln</Card.Title>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item>
                    81 ¼ g Gnocchi aus dem Kühlregal
                  </ListGroup.Item>
                  <ListGroup.Item>¼ kleine Zwiebel(n)</ListGroup.Item>
                  <ListGroup.Item>¼ Paprikaschote(n), rot</ListGroup.Item>
                  <ListGroup.Item>¼ Zucchini, grün</ListGroup.Item>
                  <ListGroup.Item>½ EL Olivenöl</ListGroup.Item>
                  <ListGroup.Item>
                    Salz und Pfeffer aus der Mühle
                  </ListGroup.Item>
                  <ListGroup.Item>7 ½ ml Gemüsebrühe (3 EL</ListGroup.Item>
                  <ListGroup.Item>¼ Knoblauchzehe(n)</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="/public/images/Home/hackfleisch-lauch-topf.jpg"
              />{" "}
              <Card.Body>
                <Card.Title>Hackfleisch Topf</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>100 g Hackfleisch</ListGroup.Item>
                  <ListGroup.Item>1-große Kartoffel</ListGroup.Item>
                  <ListGroup.Item>1 Stange/n Lauch</ListGroup.Item>
                  <ListGroup.Item>150 ml Gemüsebrühe</ListGroup.Item>
                  <ListGroup.Item>1 EL Tomatenmark</ListGroup.Item>
                  <ListGroup.Item>1 EL Schmelzkäse</ListGroup.Item>
                  <ListGroup.Item>etwas Tabasco</ListGroup.Item>
                  <ListGroup.Item>½-große Zwiebel</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="/public/images/Home/hackbaellchen-toscana.jpg"
              />{" "}
              <Card.Body>
                <Card.Title>Hackbällchen Toscana</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>167 g Hackfleisch</ListGroup.Item>
                  <ListGroup.Item>Knoblauch</ListGroup.Item>
                  <ListGroup.Item>Dose Tomaten</ListGroup.Item>
                  <ListGroup.Item>33g Sahne</ListGroup.Item>
                  <ListGroup.Item>1 EL Tomatenmark</ListGroup.Item>
                  <ListGroup.Item>
                    Salz und Pfeffer aus der Mühle
                  </ListGroup.Item>
                  <ListGroup.Item>0,3g Mozzarella</ListGroup.Item>
                  <ListGroup.Item>0,2 TL Zucker</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Img
                variant="top"
                src="/public/images/Home/kaese-lauch-suppe-mit-hackfleisch.jpg"
              />{" "}
              <Card.Body>
                <Card.Title>Käse-Lauch-Suppe</Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>½ kleine Baguette</ListGroup.Item>
                  <ListGroup.Item>¾ EL Öl</ListGroup.Item>
                  <ListGroup.Item>125 g Hackfleisch</ListGroup.Item>
                  <ListGroup.Item>¾ Stange/n Lauch</ListGroup.Item>
                  <ListGroup.Item>62 ½ g Schmelzkäse</ListGroup.Item>
                  <ListGroup.Item>Salz und Pfeffer</ListGroup.Item>
                  <ListGroup.Item>1 ELGemüsebrühe</ListGroup.Item>
                  <ListGroup.Item>¼ Becher Crème </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default PageErnährung;
