import React, { Component } from "react";
//imrc & cc + tab allows to generate the code
//F2 to rename
class Counter extends Component {
  //state = {
  //value: this.props.counter.value,
  //tags: ["tag1", "tag2", "tag3"],
  //imageURL : 'https://picsum.photos/200' //makes a fake 200x200 image
  //};

  //   constructor() {
  //     super();
  //     this.handleIncrement = this.handleIncrement.bind(this); //bind this to handleIncrement
  //   }

  //m-2 margin 2
  //<span style={{ fontSize: 30 }} className="badge badge-primary m-2">{this.formatCount()}</span>
  //<span style={{ styles }} className="badge badge-primary m-2">{this.formatCount()}</span>
  //badge badge-primary = blue badge
  //badge badge-warning = yellow badge
  //React.Fragment = div
  //          { this.state.tags.map(tag => <li key= {tag}>{ tag }</li>)} mapping tag onto list, list needs keys
  styles = {
    fontSize: 50,
    fontWeight: "bold",
  };

  renderTags() {
    if (this.state.tags.length === 0) return <p>There are no tags!</p>;

    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  //   handleIncrement = () => {
  //     //adding = () => avoids the bind event handlers in the constructor
  //     this.setState({ value: this.state.value + 1 }); //detects the changes
  //   };

  // { this.state.tags.length === 0 && 'Please create a new tag!'} true && 'Hi' <- Hi is Truesy whilst an empty character is falsey.
  // ^This renders the last operand

  //This method is call when componented has been updated
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      //Ajax call and get new data rom the server (LIKE A constantly UPDATING SEARCH BAR)
    }
  }

  //This method is call when componenet is removed from the DOM
  componentWillUnmount() {
    console.log("Counter - Unmount");
  }

  render() {
    console.log("Counter - Renders");
    return (
      <React.Fragment>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }
  /* <ul>
    {this.state.tags.map((tag) => (
    <li key={tag}>{tag}</li>
    ))}
    </ul> */
}

export default Counter;
