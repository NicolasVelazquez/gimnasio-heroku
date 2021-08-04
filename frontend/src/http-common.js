import axios from "axios";

export default axios.create({
  baseURL: "https://gimnasio-heroku.herokuapp.com/api/gimnasio",
  headers: {
    "Content-type": "application/json"
  }
});