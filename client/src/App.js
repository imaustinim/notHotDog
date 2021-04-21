import { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState("")
  const [blockchain, setBlockchain] = useState([{
    address: "address",
    key: "key",
    type: "type",
    name: "name",
    quantity: "quantity",
    updatedAt: Date.now(),
    createdAt: Date.now()
  },])
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [key, setKey] = useState("")
  const [type, setType] = useState("nft")
  const [quantity, setQuantity] = useState("1")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/api/addBlock", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: name,
        address: address,
        key: key,
        type: type,
        quantity: quantity
      })
    })
    .then(response => response.json())
    .then(serverData => {
      console.log("Success:", serverData)
      setMessage(serverData.message)
      let newBlock = serverData.block
      newBlock["name"] = serverData.name
      setBlockchain(blockchain => [newBlock, ...blockchain])
    })
    .catch(error => {
      console.error("Error:", error)
      setMessage({
        message: "error"
      })
    })
    console.log(blockchain)
  }

  return (
    <div className="App">
      <div>
        <h2>Add Data</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={e => setName(e.target.value)} required/>
          <input type="text" name="address" placeholder="Address" onChange={e => setAddress(e.target.value)} required/>
          <input type="text" name="key" placeholder="Key" onChange={e => setKey(e.target.value)} required/>
          <select defaultValue={"DEFAULT"} name="type" onChange={e => setType(e.target.value)}required>
            {/* <option value="DEFAULT" disabled> Type of Token </option> */}
            <option value="nft">Non Fungible Token</option>
            <option value="sft">Semi Fungible Token</option>
            <option value="ft">Fungible Token</option>
          </select>
          <input type="number" value="0" min="0" name="quantity" placeholder="Quantity" onChange={e => setQuantity(e.target.value)} required/>
          <button type="submit">Add</button>
        </form>
      </div>
      <div>{message}</div>
      <br/>
      <div>
        {blockchain.map((block, index, array) => {
          return (
            <div>
              <div>Index: {array.length - 1 - index}</div>
              <div>Name: {block.name}</div>
              <div>Address: {block.address}</div>
              <div>Key: {block.key}</div>
              <div>Quantity: {block.quantity}</div>
              <div>CreatedAt: {Date(block.createdAt)}</div>
              <div>UpdatedAt: {Date(block.updatedAt)}</div>
              <br/>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
