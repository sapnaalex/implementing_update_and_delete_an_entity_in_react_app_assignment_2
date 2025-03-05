import { useState, useEffect } from "react";
import ItemList from "./components/ItemList";

const API_URI = `https://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [items, setItems] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    fetch(API_URI)
      .then((response) => response.json())
      .then((data) => setItems(data.doors)) // Ensure correct data structure
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Delete an item
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URI}/${id}`, {
        method: "DELETE",
      });

      // Update state after successful deletion
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return <ItemList items={items} onDelete={handleDelete} />;
}

export default App;
