import { useEffect } from "react";
import GetApi from "../Api/GetApi";

const Gets = () => {
  const getData = async () => {
    const res = await GetApi();
    console.log(res);
  };

  useEffect(() => {
    getData();
  }, []);
  return <div>Gets</div>;
};

export default Gets;
