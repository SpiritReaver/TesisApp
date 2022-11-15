import axios from "axios";

const URL = "https://api-kgk5.onrender.com/api/users/";

export default async function getUserInfo() {
  const res = await axios.get(URL + `${localStorage.getItem("UserId")}`);
  return res.data;
}
