import axios from "axios";
import { useEffect, useState, useContext } from "react";
import "./Prices.scss";
import { Store } from "../../Store";
import Swal from "sweetalert2";
import { useSpring, animated } from "react-spring";
import { Helmet } from "react-helmet";
import { Col, Container, Row } from "react-bootstrap";


interface IPacket {
  id: string;
  image: string;
  title: string;
  price: string;
  leistungenTitle: string;
  leistungen: string[];
  dauer: { package: string; price: number }[];
}

export interface ICartItem {
  _id: any;
  name: string;
  image: any;
  price: number;
  quantity: number;
}

export const PagePrices = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [packets, setPackets] = useState<IPacket[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/packets`);
      const packets = response.data.packets.map((packet: IPacket) => ({
        ...packet,
        id: Math.random().toString(36).substring(2, 15),
      }));
      setPackets(packets);
    })();
  }, []);

  const springProps = useSpring({
    from: { opacity: 0, transform: "translateY(-300px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const spring = useSpring({
    from: { opacity: 0, transform: "translateY(-300px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1500 },
  });

  const addToCart = (packet: IPacket, i: number) => {
    const { price } = packet.dauer[i];
    const cartItem: ICartItem = {
      _id: packet.id,
      name: packet.title,
      image: packet.image,
      price,
      quantity: 1,
    };
    dispatch({ type: "CART_ADD_ITEM", payload: cartItem } as any);

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${packet.title} packet was added to your cart`,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <section className="pagePrices">
      <Helmet>
        <title>Preise</title>
      </Helmet>
      <animated.div style={spring}>
        <h2 className="section-title">WÄHLE DEIN PAKET</h2>
      </animated.div>
      <div className="dots dots-up"></div>
      <div className="dots dots-down"></div>
      <Container>
        <Row lg={3} md={2} sm={1} xs={1} className="g-3">
          {packets.map((packet: IPacket) => {
            return (
              <Col className="d-flex justify-content-between">
                <animated.div
                  style={springProps}
                  className="box d-flex justify-content-between flex-column"
                  key={packet.id}
                >
                  <div>
                    <div className="header_box">
                      <div className="title">{packet.title}</div>
                      <div className="price">
                        <span className="text-muted">Ab </span>
                        <span className="amount px-2">{packet.price}</span>
                        <span className="time">/Monat</span>
                      </div>
                      <h4 className="mb-3">{packet.leistungenTitle}</h4>
                    </div>
                    <div className="body_box">
                      <ul>
                        {packet.leistungen.map((leistung: any, i) => (
                          <li key={i}>
                            <span className="text-danger">✓</span> {leistung}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="footer_box d-flex">
                    {packet.dauer.map((duration, i) => (
                      <button key={i} onClick={() => addToCart(packet, i)}>
                        {duration.package}
                      </button>
                    ))}
                  </div>
                </animated.div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};
