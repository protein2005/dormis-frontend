import Home from "@/pages/Home";
import AppRouter from "@/routes/AppRouter";

function App() {
  return (
    <>
      <div className="container">
        <Home title="Dormis" />
      </div>
      <AppRouter />
    </>
  )
}

export default App
