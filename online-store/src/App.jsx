import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { publicRoutes } from "./routes/router";
import { Context } from "./context/Context";
import { useEffect, useState } from "react";

function App() {
  //! loading component
  const [isAuth, setIsAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  useEffect(() => {
    const auth = localStorage.getItem("Auth");
    if (auth) setIsAuth(auth);
    setAuthLoading(false);
  }, []);

  if (authLoading) return <p>Загрузка...</p>;

  return (
    <Context.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <Header />
        <main className='min-h-[400px]'>
          <Routes>
            {publicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
