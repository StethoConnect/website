import NavBar from "./NavBar";
import { useState, useEffect } from "react";

function ProcessAudio() {
  const [recording, setRecording] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file){
        console.log("no file selected")
return 
    }
    else{

//         const fd = new FormData();
//         fd.append('file',file);
//         axios.post(ngrok + '/heart-classification',fd,{
//             onUploadProgress:(ProgressEvent) => console.log(ProgressEvent.progress*100)},
// Headers{  
//     "ngrok-skip-browser-warning": "69420",

//         })
    }
  };

  const handleOnchange = () => {
    setRecording(e.target.files[0]);
    console.log("file selected", recording);
  };

  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit} className="container flex flex-col m-16">
        <label htmlFor="Recorded-Audio">Recorded Audio</label>
        <input
          type="file"
          name="recording"
          onChange={handleOnchange}
          id="recording"
          accept="wav"
        />
        <input type="submit" />
      </form>

      {/* Process Audio 
take input from the device (wav file ) pass to the api end point localhost:3000/lung-sound ,
get json response and parse and display it 
         */}
    </>
  );
}
export default ProcessAudio;
