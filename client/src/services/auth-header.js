import  secureLocalStorage  from  "react-secure-storage";
export default function authHeader() {
  const user = JSON.parse(secureLocalStorage.getItem('doctor'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  } else {
    return {};
  }
}
