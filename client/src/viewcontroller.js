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
    let config = {
      headers: {
        title: "Searching_Paper",
      },
    };
    Axios.post("/", Data, config)
      .then((res) => {
        //console.log("Data sent: " + JSON.stringify(res.data[0]));
        var Data = res.data;
        this.state.view.setState({ results: Data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  static submitPaper(data) {
    let config = {
      headers: {
        title: "Submit_Paper",
      },
    };
    Axios.post("/", data, config)
      .then((res) => {
        console.log("Submission Sent!");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default ViewController;
