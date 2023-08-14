import "./App.css";
import { useGetList } from "./services/todos";
console.log("VITE_HOST", import.meta.env.VITE_HOST);
function App() {
  const { data, error, isLoading } = useGetList();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
    <header>
      <h1>Task List</h1>
    </header>
    <main>
      <section>
        <h2>Tasks</h2>
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.task}</li>
          ))}
        </ul>
      </section>
    </main>
    <footer>
      <p>© {new Date().getFullYear()} My Task App</p>
    </footer>
  </div>
  );
}

export default App;
