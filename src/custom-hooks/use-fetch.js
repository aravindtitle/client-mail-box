import { useState, useEffect } from "react";

const useFetch = (url, Comp) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState(false);
  const UID = localStorage.getItem("UID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          let jsonData = await response.json();

          if (!jsonData) {
            jsonData = [];
          }

          var arrayOfObjects = Object.keys(jsonData).map((key) => ({
            key: key,
            value: jsonData[key],
          }));

          if (Comp === "Sent") {
            setData(
              Object.values(arrayOfObjects).filter(
                ({ value }) => value.from === UID
              )
            );
          }

          if (Comp === "Inbox") {
            setData(
              Object.values(arrayOfObjects).filter(
                ({ value }) => value.To === UID
              )
            );
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url, Comp, data1]); // Run once when component mounts

  return { data, loading, setData, setData1 };
};

export default useFetch;
