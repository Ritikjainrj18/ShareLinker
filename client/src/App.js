import { useEffect, useRef, useState } from "react";
import "./App.css";
import { uploadFile } from "./services/api";
function App() {
  const [file, setfile] = useState("");
  const [result,setResult]=useState('');
  const fileInputRef = useRef();
  const onUploadClick = () => {
    fileInputRef.current.click();
  };
  const logo =
    "https://cdnblog.filecloud.com/blog/wp-content/uploads/2018/06/filesharing.png";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        let response=await uploadFile(data);
       setResult(response.path);
      }
    };
    getImage();
  }, [file]);
  return (
    <div className="container">
      <img src={logo} alt="banner" />
      <div className="wrapper">
        <h1>Simple File Sharing</h1>
        <p>Upload and Share the download link</p>
        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setfile(e.target.files[0])}
          
        />
        <a href={result} target="_blank">{result}</a>
      </div>
    </div>
  );
}

export default App;
