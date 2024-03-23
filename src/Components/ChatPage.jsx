import React from "react";
import { useContext } from "react";

import { PrettyChatWindow } from "react-chat-engine-pretty";
import DataContext from "./DataContext";

function ChatPage() {
  const { data } = useContext(DataContext);
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <PrettyChatWindow
        projectId="2270dafe-5446-4856-a460-495f8f1698a1"
        username={data.user}
        secret={data.pswd}
        style={{ maxWidth: "20px" }}
      />
    </div>
  );
}
export default ChatPage;
