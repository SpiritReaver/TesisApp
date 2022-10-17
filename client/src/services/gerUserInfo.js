import axios from "axios";

const URL = "http://3.83.218.170:4000/api/users/";

export default function getUserInfo() {
  return axios.get(URL + `${localStorage.getItem("UserId")}`).then((res) => {
    console.log(res.data);
    return res.data;
  });
}
