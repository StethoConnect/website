import React from "react";
import { useContext } from "react";


import { PrettyChatWindow } from "react-chat-engine-pretty";
import DataContext from "./DataContext";

function PChat() {
  const { data ,logout} = useContext(DataContext);
  return (
    <div style={{ height: "95vh", width: "100vw",
    }}>
<button onClick={()=>{logout()
// redirect to login component
window.location.href = "/login";

}}>Logout</button>
    
      <PrettyChatWindow
        projectId="eaf9ac05-8c7e-4d49-b324-4ab5d35b4d50"
        username={data.user}
        secret={data.pswd}
        style={{ maxWidth: "100px" }}
      />

<style>{`
        /* Change the search input field color */
        .chat-window .ce-text-input {
          color: white !important;
        }

        /* Change the search input field placeholder color */
        .chat-window .ce-text-input::placeholder {
          color: white !important;
        }
      `}</style>
    </div>
  );
}
export default PChat;
