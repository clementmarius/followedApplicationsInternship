/* const title = "Hello World"; */
import './index.css';

/* function App() {
  return (
    <>
      <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind!</h1>
      </>
  );
} */

  function App() {
    const [count, setCount] = useState(0);
  
    const fetchApi = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api");
        console.log(response.data.fruits);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };
  
  
    useEffect(() => {
      fetchApi();
    }, []);
  }

export default App;
