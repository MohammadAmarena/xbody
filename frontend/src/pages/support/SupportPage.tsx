import { MessageBox } from "../../components/Index";
import { useContext, useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { Store } from "../../Store";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

interface User {
  _id: string;
  name: string;
  isAdmin: boolean;
  messages?: {
    body: string;
    name: string;
  }[];
  online?: boolean;
  unread?: boolean;
}

interface Message {
  body: string;
  name: string;
  isAdmin: boolean;
  _id: string;
}

let allUsers: User[] = [];
let allMessages: Message[] = [];
let allSelectedUser: User = { _id: "", name: "", isAdmin: false };
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5010"
    : window.location.host;

export default function SupportPage() {
  const [selectedUser, setSelectedUser] = useState<User>({
    _id: "",
    name: "",
    isAdmin: false,
  });
  const [socket, setSocket] = useState<Socket | null>(null);
  const uiMessagesRef = useRef<HTMLUListElement>(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT) as Socket;
      setSocket(sk);
      if (userInfo) {
        sk.emit("onLogin", {
          _id: userInfo._id,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
        });
      }
      sk.on("message", (data: Message) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  const selectUser = (user: User) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    if (socket) {
      socket.emit("onUserSelected", user);
    }
  };

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else if (userInfo?.name && selectedUser?._id && socket) {
      allMessages = [
        ...allMessages,
        {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        },
      ];
      setMessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={4} md={4} sm={4} className="support-users">
          {users.filter((x) => x._id !== userInfo!._id).length === 0 && (
            <MessageBox>Kein Online-Benutzer gefunden</MessageBox>
          )}
          <ul>
            {users
              .filter((x) => x._id !== userInfo!._id)
              .map((user) => (
                <li
                  key={user._id}
                  className={
                    user._id === selectedUser._id ? "  selected" : "  "
                  }
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => selectUser(user)}
                    className="p-2 fs-5 fw-bold position-relative"
                  >
                    {user.name}
                    <span
                      className={
                        user.unread
                          ? "unread"
                          : user.online
                          ? "online"
                          : "offline"
                      }
                    />
                  </div>
                </li>
              ))}
          </ul>
        </Col>
        <Col lg={8} md={8} sm={8} className="support-messages">
          {!selectedUser._id ? (
            <MessageBox>
              Wählen Sie einen Benutzer aus, um den Chat zu starten
            </MessageBox>
          ) : (
            <div>
              <Row>
                <strong>Chatten mit {selectedUser.name}</strong>
              </Row>
              <ul ref={uiMessagesRef}>
                {messages.length === 0 && <li>Keine Nachricht.</li>}
                {messages.map((msg, index) => (
                  <li key={index}>
                    <strong>{`${msg.name}: `}</strong> {msg.body}
                  </li>
                ))}
              </ul>
              <Form onSubmit={submitHandler}>
                <InputGroup>
                  <Form.Control
                    placeholder="Nachricht eingeben..."
                    type="text"
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                  />
                  <Button variant="success" type="submit">
                    Send
                  </Button>
                </InputGroup>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
