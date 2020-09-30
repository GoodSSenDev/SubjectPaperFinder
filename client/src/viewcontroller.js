import Axios from "axios";
import VController from "./viewcontroller";

class ViewController {
  state = { view: null };

  constructor(view) {
    this.state.view = view;
  }
  searchPaperName(name) {
    var Data = {
      text: name,
    };
    Axios.post(process.env.PORT || "http://localhost:5000/", Data)
      .then((res) => {
        console.log(process.env.PORT);
        console.log("Data sent: " + JSON.stringify(res.data[0]));
        var Data = res.data;
        this.state.view.setState({ results: Data });
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default ViewController;
