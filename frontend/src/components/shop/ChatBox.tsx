import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcOnlineSupport } from "react-icons/fc";
import socketIOClient, { Socket } from "socket.io-client";

interface Props {
  userInfo: {
    _id?: string;
    name: string;
    isAdmin: boolean;
  };
}

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5010"
    : window.location.host;

const ChatBox: React.FC<Props> = ({ userInfo }) => {
  const uiMessagesRef = useRef<HTMLUListElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messageBody, setMessageBody] = useState<string>("");
  const [messages, setMessages] = useState<{ name: string; body: string }[]>([
    { name: "Admin", body: "Hallo. Bitte stellen Sie Ihre Frage." },
  ]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, userInfo._id, userInfo.isAdmin, userInfo.name]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Fehler. Bitte Nachricht eingeben.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket?.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div className="chatbox">
      {!isOpen ? (
        <Button
          title="Support"
          className="bg-transparent btn-outline-dark"
          onClick={supportHandler}
        >
          <FcOnlineSupport size={40} />
        </Button>
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between">
            <strong>Support </strong>
            <div
              style={{ cursor: "pointer" }}
              onClick={closeHandler}
            >
              <AiOutlineCloseCircle size={25} color="black" />
            </div>
          </Card.Header>
          <Card.Body>
            <ul ref={uiMessagesRef}>
              {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{`${msg.name}: `}</strong> {msg.body}
                </li>
              ))}
            </ul>
          </Card.Body>
          <Form onSubmit={submitHandler}>
            <InputGroup className="p-2">
              <Form.Control
                type="text"
                placeholder="Nachricht eingeben..."
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
              />
              <Button variant="success" type="submit">
                Send
              </Button>
            </InputGroup>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ChatBox;
