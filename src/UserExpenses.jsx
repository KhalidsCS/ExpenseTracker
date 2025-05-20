import axios from "axios"
import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useNavigate } from "react-router-dom";
function UserExpenses(){

const [expenses, setExpenses] = useState([])
const [income, setIncome] = useState([])
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28EFF'];
const navigate = useNavigate()


const removeExpense= async(expense)=>{
  await axios.put("/api/expenses/remove", {id: expense.id})
  window.location.reload();
}
const removeIncome= async(incomePart)=>{
  await axios.put("/api/income/remove", {id: incomePart.id})
    window.location.reload();

}
const [expenseData, setExpenseData]= useState({
  "name":"",
  "amount": 0
})
const [incomeData, setIncomeData]= useState({
  "name":"",
  "amount": 0
})
//const handleExpenseChange=(e)=>{setExpenseData({...expenseData, [e.target.name]: e.target.value})}

const handleExpenseChange = (e) => {
  const { name, value } = e.target;
  setExpenseData({
    ...expenseData,
    [name]: name === "amount" ? parseFloat(value) : value
  });
};
const handleIncomeChange = (e) => {
  const { name, value } = e.target;
  setIncomeData({
    ...incomeData,
    [name]: name === "amount" ? parseFloat(value) : value
  });
};

const handleExpenseSubmit=async(e)=>{
  e.preventDefault();
  await axios.put("/api/expenses/add", expenseData);
  window.location.reload();
}

const handleIncomeSubmit=async(e)=>{
  e.preventDefault();
  await axios.put("/api/income/add", incomeData);
  window.location.reload();
}
useEffect (() => {axios.get("/api/expenses").then(response => setExpenses(response.data)).catch(error => {
    console.error("Error fetching expenses:", error);
  });},[])
useEffect (() => {axios.get("/api/income").then(response => setIncome(response.data)).catch(error => {
    console.error("Error fetching income:", error);
  });},[])
return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '40px' }}>
    <div style={{ textAlign: 'center' }}>
      <h2>Expense Breakdown</h2>
      <div style={{ width: 400, height: 400, margin: '0 auto' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={expenses}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {expenses.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
    </div>

    <div style={{ textAlign: 'center' }}>
      <h2>Income Breakdown</h2>
      <div style={{ width: 400, height: 400, margin: '0 auto' }}>
      <PieChart width={400} height={400}>
        <Pie
          data={income}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={140}
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {income.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
    </div>
    </div>
   <h1>Expenses:</h1>
    <ul>
          {expenses.map((expense, index) => (<>
            <li key={index}>{JSON.stringify(expense)}</li>
            <button onClick={()=>removeExpense(expense)}>Delete</button>
            </>
          ))}
        </ul>

    <h1>Income:</h1>      
    <ul>
          {income.map((incomePart, index) => (<>
            <li key={index}>{JSON.stringify(incomePart)}</li>
            <button onClick={()=>removeIncome(incomePart)}>Delete</button>
            </>
          ))}
        </ul>
        Add expense
        <form onSubmit={handleExpenseSubmit}>
         Enter name: <input name="name" type="text" value={expenseData.name} onChange={handleExpenseChange}></input>
         Enter amount: <input name="amount" type="number" value={expenseData.amount} onChange={handleExpenseChange}></input>
         <button type="submit">Add expense</button>
        </form>

         Add income
        <form onSubmit={handleIncomeSubmit}>
         Enter name: <input name="name" type="text" value={incomeData.name} onChange={handleIncomeChange}></input>
         Enter amount: <input name="amount" type="number" value={incomeData.amount} onChange={handleIncomeChange}></input>
         <button type="submit">Add income</button>
        </form>
    </>
)
}
export default UserExpenses