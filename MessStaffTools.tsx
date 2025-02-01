
import { useState } from "react"
import "../styles/MessStaffTools.css"

export default function MessStaffTools() {
  const [orders, setOrders] = useState([
    { id: 1, item: "Chicken Curry", quantity: 2, status: "Pending" },
    { id: 2, item: "Vegetable Biryani", quantity: 1, status: "Preparing" },
  ])

  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Chicken Curry", price: 8.99 },
    { id: 2, name: "Vegetable Biryani", price: 7.99 },
  ])

  const [stockItems, setStockItems] = useState([
    { id: 1, name: "Rice", quantity: 50, unit: "kg" },
    { id: 2, name: "Chicken", quantity: 30, unit: "kg" },
  ])

  const [newMenuItem, setNewMenuItem] = useState({ name: "", price: "" })

  const updateOrderStatus = (id: number, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === id ? { ...order, status: newStatus } : order)))
  }

  const addMenuItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMenuItem.name && newMenuItem.price) {
      setMenuItems([
        ...menuItems,
        { id: menuItems.length + 1, name: newMenuItem.name, price: Number.parseFloat(newMenuItem.price) },
      ])
      setNewMenuItem({ name: "", price: "" })
    }
  }

  const updateStock = (id: number, change: number) => {
    setStockItems(
      stockItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item)),
    )
  }

  return (
    <>
    <div className="container">
      <h1 className="title">Mess Staff Tools</h1>

      <div className="card">
        <h2 className="card-title">Manage Orders</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.item}</td>
                <td>{order.quantity}</td>
                <td>{order.status}</td>
                <td>
                  <button className="button" onClick={() => updateOrderStatus(order.id, "Completed")}>
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="card-title">Update Menu</h2>
        <form onSubmit={addMenuItem} className="form">
          <div className="form-group">
            <label className="label" htmlFor="itemName">
              Item Name
            </label>
            <input
              className="input"
              id="itemName"
              value={newMenuItem.name}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
              placeholder="Enter item name"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="itemPrice">
              Price
            </label>
            <input
              className="input"
              id="itemPrice"
              type="number"
              step="0.01"
              value={newMenuItem.price}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
              placeholder="Enter price"
            />
          </div>
          <button type="submit" className="button">
            Add Menu Item
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2 className="card-title">Monitor Stock</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.unit}</td>
                <td>
                  <button className="button" onClick={() => updateStock(item.id, -1)}>
                    -
                  </button>
                  <button className="button" onClick={() => updateStock(item.id, 1)}>
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}