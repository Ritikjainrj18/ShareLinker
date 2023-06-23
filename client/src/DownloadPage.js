import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmail } from "./services/api";
import "./App.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function DownloadPage() {
  const navigate = useNavigate();
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const location = useLocation();
  const Submit = async (e) => {
    e.preventDefault();
    toast("Sending Mail")
    const data = new URLSearchParams();
    data.append("sender", sender);
    data.append("receiver", receiver);
    data.append("url", result);
    data.append("password",location.state.password);
    const response=await sendEmail(data);
    if(response.error!=undefined){
      toast("Mail not sent");
    }else{
      // navigate("/");
      toast("Mail Sent")
    }
  };

  const result = location.state.url;
   
  return (
    <div>

      <div className="center">
      Share the Link : 
      <a href={result} target="_blank">
        {result}
      </a>
      <br />
      </div>

      <h1>OR</h1>
      <h3>Send Mail</h3>
      <div className="form">
      <form
        onSubmit={(e) => {
          Submit(e);
        }}
      >
        <label>Sender:</label>
        <input
          type="text"
          value={sender}
          required
          onChange={(e) => setSender(e.target.value)}
        />
        <br />
        <label>Receiver Email:</label>
        <input
          type="email"
          value={receiver}
          required
          onChange={(e) => setReceiver(e.target.value)}
        />
        <br />
        <input type="submit" value="Send Mail" />
        <ToastContainer />

      </form>
      </div>

      

    </div>
  );
}

export default DownloadPage;
