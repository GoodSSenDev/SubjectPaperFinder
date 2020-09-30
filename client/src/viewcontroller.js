import Axios from "axios";

class ViewController {
  state = { view: null };

  constructor(view) {
    this.state.view = view;
  }
  searchPaperName(name) {
    var Data = {
      text: name,
    };
    Axios.post("/", Data)
      .then((res) => {
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
