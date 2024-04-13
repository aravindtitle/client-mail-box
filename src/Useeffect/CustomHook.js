import { set } from "firebase/database";
import { useState, useEffect } from "react";

// Custom hook to fetch data from an API
//this custom hook re-render again
function useFetch(url, Comp) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data1, setData1] = useState(false);
  const UID = localStorage.getItem("UID");
  // window.alert("this one is use fetch custom hook");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
      
          let jsonData = await response.json();
         
          if(!jsonData){
            jsonData=[];
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
}

export default useFetch;
