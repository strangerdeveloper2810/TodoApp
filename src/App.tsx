import React, { lazy, Suspense, useState, useEffect } from "react";
import Loading from "./components/Loading";

const Home = lazy(() => import("./pages"));

const App: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      {isLoading ? <Loading /> : <Home />}
    </Suspense>
  );
};

export default App;
