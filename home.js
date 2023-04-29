const backendIPAddress = "52.20.54.127:3000";
const getUserProfile = async () => {
  const options = {
    method: "GET",
    credentials: "include",
  };
  await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data);
      //   console.log("==================================");
      console.log(data.user);
      document.getElementById("eng-name-info").innerHTML = `${
        data.user.title_en ? data.user.title_en : ""
      } ${data.user.firstname_en} ${data.user.lastname_en}`;
      document.getElementById("thai-name-info").innerHTML = `${
        data.user.title_en ? data.user.title_en : ""
      } ${data.user.firstname_th} ${data.user.lastname_th}`;
      document.getElementById("student-id").innerHTML = `${data.user.id}`;
    })
    .catch((error) => console.error(error));
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
