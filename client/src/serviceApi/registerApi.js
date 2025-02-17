import axios from "axios";

//? REGISTER API
const registerFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/register`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? LOGIN API

const loginFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/login`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//? LOGOUT API

const logoutFunction = async (payload) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/logout`,
      payload
    );
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export { registerFunction, loginFunction, logoutFunction };
