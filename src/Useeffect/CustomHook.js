import { useState, useEffect } from "react";

// Custom hook to fetch data from an API
function useFetch(url) {
  const [data, setData] = useState([]);
  const [received, setReceived] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showName, setShowName] = useState("Ashoka");
  const UID = localStorage.getItem("UID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        var sent = Object.values(jsonData).filter((obj) => obj.from === UID);
        console.log(sent);
        setData(sent);

        var received = Object.values(data).filter((obj) => obj.To === UID);
        console.log(received);
        setReceived(received);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
  }, [url]); // Only re-run effect if URL changes

  return { data, loading, showName, setShowName, received };
}

export default useFetch;
