import axios from 'axios';

export const createOrUpdateUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/create-or-update-user`, 
      {}, 
      {
        headers: {
          authtoken,
        },
      }
    );
  };

  export const curentUser = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-user`, 
      {}, 
      {
        headers: {
          authtoken,
        },
      }
    );
  };

  export const curentAdmin = async (authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/current-admin`, 
      {}, 
      {
        headers: {
          authtoken,
        },
      }
    );
  };