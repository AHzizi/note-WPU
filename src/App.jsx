import { useState } from "react";

const GroceryItems = [
  {
    id: 1,
    name: 'Kopi',
    quantity: 5,
    checked: true,
  },
  {
    id: 2,
    name: 'Kopi Susu',
    quantity: 4,
    checked: false,
  }
]

export default function App() {
  const [Items, setItems] =useState(GroceryItems);

  function handleAddItems(item) {
    setItems([...Items, item]);
  }

  function handleRemoveItems(id) {
    setItems(Items.filter(item => item.id !== id)); // Use a different variable name in the filter function
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }
  

  return (
    <div className="app">
      <Header />
      <Form onAddItem={handleAddItems} />
      <GroceryList items={Items} onRemoveItem={handleRemoveItems} onToggleItem={handleToggleItem} />
     <Footer />
    </div>
  );
}

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function Form({ onAddItem }) {

  const [namaBarang, setNamaBarang] = useState('');
  const [daftarBelanja, setDaftarBelanja] = useState(1);
  function handleSubmit(e) {
    e.preventDefault();

    if (!namaBarang) return;
    
    const newItem = {name: namaBarang, quantity: daftarBelanja, checked: false, id: Date.now()};
    onAddItem(newItem);

    setNamaBarang('');
    setDaftarBelanja('');
     
  } 

  

  const quantityNum = [...Array(20)].map((number, i) => (
    <option value={i + 1} key={ i + 1 }>
      {i + 1}
    </option>
  ))

  return (
    <form className="add-form" onSubmit={handleSubmit}>
    <h3>Hari ini belanja apa kita?</h3>
    <div>
      <select value={daftarBelanja} onChange={(e) => setDaftarBelanja(Number(e.target.value))}>
       {quantityNum}
      </select>
      <input type="text" placeholder="nama barang..." value={namaBarang} onChange={(e) => setNamaBarang(e.target.value)}/>
    </div>
    <button>Tambah</button>
  </form>
  )
}

function GroceryList({ items, onRemoveItem, onToggleItem}) {
  return (
    <>
      <div className="list">
          <ul>
          {items.map(item => (
            <Item item={item} key={item.id} onRemoveItem={onRemoveItem} onToggleItem={onToggleItem} />
          ))}
          </ul>
        </div>
        <div className="actions">
          <select>
            <option value="input">Urutkan berdasarkan urutan input</option>
            <option value="name">Urutkan berdasarkan nama barang</option>
            <option value="checked">Urutkan berdasarkan ceklis</option>
          </select>
          <button>Bersihkan Daftar</button>
        </div>
    </>
  );
}


function Item({item, onRemoveItem, onToggleItem}) {
  return (
    <li key={item.id}>
      <input type="checkbox" name="" checked={item.checked} onChange={() => onToggleItem(item.id)} />
      <span style={ item.checked ? { textDecoration: 'line-through'} : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={()=> onRemoveItem(item.id)}>&times;</button>
    </li>
  )
}

function Footer() {
  return  <footer className="stats">Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)</footer>
}