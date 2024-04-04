import useFetch from "../Useeffect/CustomHook";

function MyComponent() {
  const { data, loading, showName, setShowName } = useFetch(
    "https://login-94bb8-default-rtdb.firebaseio.com/email.json"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Data from API: MyComponent</h1>

      <h1>{showName}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;
