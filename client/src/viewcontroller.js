import Axios from "axios";
const shallowEqual = require("shallowequal");

class ViewController {
  state = { view: null };

  constructor(view) {
    this.state.view = view;
  }
  searchPaperName(data) {
    //console.log(data);
    var Data = {
      text: data.value,
      startDate: data.StartDate,
      endDate: data.EndDate,
    };
    let config = {
      headers: {
        title: "Searching_Paper",
      },
    };
    console.log("searching");
    Axios.post("/", Data, config)
      .then((res) => {
        var results = res.data;
        console.log(results);
        if (Data.startDate == "" && Data.endDate == "") {
          this.state.view.setState({ results: results[0] });
        } else {
          console.log(Data.startDate);
          this.state.view.setState({
            results: this.GetMatchingResults(results),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  GetMatchingResults(results) {
    let papername = results[0];
    let paperdate = results[1];
    let actual = [];
    console.log("Papername");
    console.log(papername);
    console.log("paperdate");
    console.log(paperdate);
    var biggerResult;
    var smallerResult;
    if (papername.length > paperdate.length) {
      biggerResult = papername;
      smallerResult = paperdate;
    } else if (papername.length <= paperdate.length) {
      biggerResult = paperdate;
      smallerResult = papername;
    } else {
      return [];
    }
    var i;
    var j;
    for (i = 0; i < biggerResult.length; i++) {
      for (j = 0; j < smallerResult.length; j++) {
        if (
          biggerResult[i].author == smallerResult[j].author &&
          biggerResult[i].title == smallerResult[j].title
        )
          actual.push(smallerResult[j]);
      }
    }
    console.log("actual" + actual);
    return actual;
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
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export default ViewController;
