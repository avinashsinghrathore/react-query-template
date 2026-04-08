import React, { useEffect } from "react";
import { useState } from "react";

const Sellers = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    console.log("component mount!");
    return () => {
      console.log("component unmount!");
    };
  }, [name]);
  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </>
  );
};

export default Sellers;
