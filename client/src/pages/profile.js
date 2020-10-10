import React, { Component } from "react";
import { store } from "../store";

import Axios from "axios";
class Profile extends Component {
    state = {  
        data: [],
    }
    
    render() { 
        console.log(store.getState().user)
        let data = {
            username: store.getState().user,
        }
        Axios.post("/account/getInfo", data)
        .then((res) => {
            let items = [];
            console.log(res)
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
        return ( <div>{this.state.data}</div> );
    }
}
 
export default Profile;