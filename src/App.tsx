import Navbar from "./components/Navbar";
import DataPokemon from "./components/DataPokemon";
import Pokemon from "./components/Pokemon";
import { store } from "./redux/store";
import { Provider } from "react-redux";


const App = () => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <DataPokemon />
        <Pokemon></Pokemon>
      </Provider>
    </>
  );
};

export default App;
