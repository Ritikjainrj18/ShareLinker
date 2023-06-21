import { useEffect, useRef, useState } from "react";
import "./App.css";
import {useNavigate} from 'react-router-dom'
import { uploadFile } from "./services/api";
function App() {
  const navigate = useNavigate();
  const [file, setfile] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const fileInputRef = useRef();
  

  const Submit = async (e) => {
    e.preventDefault();
    let response = await uploadFile(data);
    setResult(response.path);
    navigate('/download',{state:{url:response.path}})
  };
  const logo =
    "https://cdnblog.filecloud.com/blog/wp-content/uploads/2018/06/filesharing.png";

const data = new FormData();

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        data.append("name", file.name);
        data.append("file", file);
      }
      if(password){
        data.append("password",password);
      }

    };
    getImage();
  }, [file,password]);


  return (

    <div>
     <div className="container">

      <img src={logo} alt="banner" />
      <div className="wrapper">
        <h1>Simple File Sharing</h1>
        <h3>Upload and Share the download link</h3>
        <form className="form" onSubmit={(e) => {Submit(e)}}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  
          />
          <br /><br />
          <input
            type="file"
            ref={fileInputRef}
            required
            onChange={(e) => setfile(e.target.files[0])}
          />
          <br /><br />
          <input type="submit" value="Share" />
        </form>

      </div>
      </div>
    </div>
  );
}

export default App;
