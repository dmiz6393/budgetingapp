const endpoint = `http://localhost:3000/api/v1`;
const signupURL = `${endpoint}/users`;
const loginURL = `${endpoint}/login`;
const validateURL = `${endpoint}/validate`;


const jsonify = resp => {
    if (resp.ok) return resp.json();
    else throw resp.json();
  };
  
  const constructHeaders = (moreHeaders = {}) => ({
    Authorization: localStorage.getItem("token"),
    ...moreHeaders
  });
  
  const saveToken = data => {
    localStorage.setItem("token", data.jwt);
    return data.user;
  };
  
  const handleServerError = response => {
    throw response;
  };
  
  const clearToken = () => localStorage.removeItem("token");
  
  const signUpUser = user => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    };
    return fetch(signupURL, configObj)
      .then(jsonify)
      .then(saveToken)
      .catch(handleServerError);
  };
  
  const signInUser = user => {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    };
    return fetch(loginURL, configObj)
      .then(jsonify)
      .then(saveToken)
      .catch(handleServerError);
  };
  
  const validateUser = () => {
    if (!localStorage.getItem("token"))
      return Promise.resolve({
        user: null
      });
  
    return fetch(validateURL, { headers: constructHeaders() })
      .then(jsonify)
      .catch(handleServerError);
  };

  export default {
    signUpUser,
    signInUser,
    validateUser,
    clearToken
  }