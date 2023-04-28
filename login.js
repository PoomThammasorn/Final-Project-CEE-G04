const backendIPAddress = "52.20.54.127:3000";

const authorizeApplication = () => {
  window.location.href = `http://${backendIPAddress}/courseville/auth_app`;
  //   console.log("authorizeApplication");
};
