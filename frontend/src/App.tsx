import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './app/store'
import { setLogged } from './features/loggedSlice'
import { ExcersisePage } from './components/ExcersisePage'

function App() {
  const logged = useSelector((state: RootState) => state.logged.value)

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setLogged(!logged))
  }

  return (
    <div>
      {logged || true ? (
        <ExcersisePage
          name={'Je Parny'}
          excersiseText="Tvojou ulohou je napisat funkciu, ktora vrati pre parne cislo true a pre neparne false"
          code=""
          editableCode=""
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default App
