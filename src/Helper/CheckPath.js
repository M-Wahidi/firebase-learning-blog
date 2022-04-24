function checkPath(location) {
  const isAuth = JSON.parse(localStorage.getItem("auth"));
  if (
    (isAuth && location === "/account/login") ||
    (isAuth && location === "/account/signup") ||
    (isAuth && location === "/account/reset-password")
  ) {
    return true;
  }
}

export default checkPath;
