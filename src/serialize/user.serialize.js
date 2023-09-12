export const registerUserResponse = (user, access_token) => {
  const { _id, name, email, picture, status } = user;
  return {
    message: "User registered succesfully",
    user: { _id, name, email, picture, status, access_token },
  };
};

export const loginUserResponse = (user, access_token) => {
  const { _id, name, email, picture, status } = user;
  return {
    message: "User logged in succesfully",
    user: { _id, name, email, picture, status, access_token },
  };
};

export const refreshResponse = (user, access_token) => {
  const { _id, name, email, picture, status } = user;
  return {
    user: { _id, name, email, picture, status, access_token },
  };
};
