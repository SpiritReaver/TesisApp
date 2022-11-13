import axios from "axios";

const URL = "https://3.83.218.170:4000/api/users/";

export default async function getUserInfo() {
  const res = await axios.get(URL + `${localStorage.getItem("UserId")}`);
  return res.data;
}
