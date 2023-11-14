const axios = require("axios");

const credentials = {
  username: "user",
  password: "password",
};

axios
  .post("http://localhost:3000/login", credentials)
  .then((res) => {
    const { token } = res.data;
    axios
      .get("http://localhost:3000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
