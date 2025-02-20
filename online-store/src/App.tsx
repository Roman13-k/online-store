import { BrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import { Loading } from "./components/Loading";
import { AppRouter } from "./routes/AppRouter";
import { Context } from "./provider/Context";
import { Provider } from "react-redux";
import { store } from "./provider/store";

function App() {
  const [isAuth, setIsAuth] = useState<string>("");
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (auth) setIsAuth(auth);
    setAuthLoading(false);
  }, []);

  if (authLoading) return <Loading />;

  return (
    <Provider store={store}>
      <Context.Provider value={{ isAuth, setIsAuth }}>
        <BrowserRouter>
          <Header />
          <main className='min-h-[400px]'>
            <AppRouter />
          </main>
          <Footer />
        </BrowserRouter>
      </Context.Provider>
    </Provider>
  );
}

export default App;
