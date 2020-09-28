import React from "react";
import "./ChatRoom.css";
import useChat from "../useChat";

const ChatRoom = (props) => {
  const { roomId } = props.match.params; // get room id from parameters
  const { messages, sendMessage } = useChat(roomId); // create websocket and manage the messeges
  const [newMessage, setNewMessage] = React.useState(""); // set new message

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <div className="alert">
        Share Your Room ID with Your Friends To Start Communication.....
        <br />
        <br />
        <strong className="room-name">Room ID : {roomId}</strong>
      </div>
      <br />
      {/* <h1 className="room-name">Room: {roomId}</h1> */}
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${
                message.ownedByCurrentUser ? "my-message" : "received-message"
              }`}
            >
              {message.body}
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write Message..."
        className="new-message-input-field"
      />
      <br />
      {newMessage && (
        <button onClick={handleSendMessage} className="send-message-button">
          Send
        </button>
      )}
    </div>
  );
};

export default ChatRoom;
