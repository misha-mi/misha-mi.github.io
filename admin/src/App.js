import "./helpers/iframeLoader.js";
import axios from "axios";
import "./style.css";
import { useEffect, useState } from "react";

function App() {
  let iframe;
  const [currentPage, setCurrentPage] = useState("index.html");

  useEffect(() => {
    init("index.html");
  }, []);

  function init(page) {
    iframe = document.querySelector("iframe");
    open(page);
    // Здесь можно добавить загрузку списка страниц
  }

  function open(page) {
    setCurrentPage(page);
    console.log(currentPage);
  }

  const createNewService = () => {
    axios
      .post("http://localhost/misha-mi.github.io/api/createServicePage.php", {
        name: "something12",
      })
      .then(console.log);
  };

  return (
    <div className="App">
      <iframe src="http://localhost/misha-mi.github.io"></iframe>
    </div>
  );
}

export default App;
