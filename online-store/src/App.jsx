import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { publicRoutes } from "./routes/router";
import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
        <main className=''></main>
        <Footer />
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
