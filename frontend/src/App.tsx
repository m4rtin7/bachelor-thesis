import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./app/store";
import { setLogged } from "./features/loggedSlice";

function App() {
  const logged = useSelector((state: RootState) => state.logged.value);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setLogged(!logged));
  };

  return (
    <div>
      <div>{logged ? "logged" : "not-logged"}</div>
      <button onClick={handleClick}>CLICK</button>
    </div>
  );
}

export default App;
