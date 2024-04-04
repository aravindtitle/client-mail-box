import { Button } from "react-bootstrap";
import useFetch from "../Useeffect/CustomHook";

function YourComponent() {
  const { data, loading, showName, setShowName } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json"
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  const ShowHandler = () => {
    setShowName("aravind");
  };

  return (
    <div>
      <h1>Data from API:</h1>
      <h1>{showName}</h1>
      <Button onClick={ShowHandler}>Change</Button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default YourComponent;
