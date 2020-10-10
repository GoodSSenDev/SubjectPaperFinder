import React, { Component } from "react";
import { store } from "../store";

import Axios from "axios";
class Profile extends Component {
    state = {  
        data: [],
    }

    componentDidMount(){
        let data = {
            username: store.getState().user,
        }
        Axios.post("/account/getInfo", data)
        .then((res) => {
            let items = [];
            for (const key in res.body) {
            items.push(
                <div style={{ marginTop: "20px" }}>
                <h3>{key.toUpperCase()}</h3>
                <p>{res.body[key]}</p>
                </div>
            );
            }
            this.setState({ data: items });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    render() { 
        return ( <div></div> );
    }
}
 
export default Profile;