// import logo from './logo.svg';
// import './App.css';
import "./style.css"
import { useEffect , useState } from "react";
import supabase from "./supabase";
import CATEGORIES from "./data";
//*TODO : IMPORTING COMPONENTS */


import Fact from "./components/Fact";
import Category from "./components/Category";
import CategoryFilter from "./components/CategoryFilter";
import NewFactForm from "./components/NewFactForm";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Error from "./components/Error";
import FactsList from "./components/FactsList";
import { queryByTestId } from "@testing-library/react";

function App() {


  const [showForm , setShowForm] = useState(false);
  const [facts , setFacts] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  const [isError , isSetError] = useState(false);
  const [currentCategory , setCurrentCategory] = useState("all");
  const [order , setOrder] = useState("Interesting");


  useEffect(
    function(){
      async function getDate(){
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if(currentCategory !== "all")

        query = query.eq("category", currentCategory);

        let { data : facts , error } = await query
          .order(`votes${order}`,{ascending : false})
          .limit(50);
        
        if(!error) setFacts(facts);
        else isSetError(true);

        setIsLoading(false);
        
      }
      getData();
    },
    [currentCategory , order]
  )

  return (
    <div className="App">
    
    </div>
  );
}

export default App;
