import React from "react";

const UserList = () => {
  return (
    <>


    <select name="user-names" id="user-names">
      <option value="" selected disabled hidden>Choose your name here</option>
      <option value="rigatoni">Renee</option>
      <option value="dave">Alisa</option>
      <option value="pumpernickel">Ed</option>
      <option value="reeses">Dave</option>
    </select>
    </>
  )
};

export default UserList;
