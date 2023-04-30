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
    .then((data) => data.data)
    .then((data) => {
      console.log(data);
      document.getElementById(
        "eng-name-info"
      ).innerHTML = `${data.student.title_en} ${data.student.firstname_en} ${data.student.lastname_en}`;
      document.getElementById(
        "thai-name-info"
      ).innerHTML = `${data.student.title_th} ${data.student.firstname_th} ${data.student.lastname_th}`;
      document.getElementById("student-id").innerHTML = `${data.student.id}`;
    })
    .catch((error) => console.error(error));
};

const logout = async () => {
  window.location.href = `http://${backendIPAddress}/courseville/logout`;
};
