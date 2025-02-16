import mongoose from "mongoose";
import Employee from "@/models/employee";
import styles from "./page.module.css"

export default async function Page() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect("mongodb+srv://obaro:mypassword@cluster0.8lgns.mongodb.net/trppicer?retryWrites=true&w=majority&appName=Cluster0")
  }

  var error = null, employees = null;

  try {
    employees = await Employee.find();
  } catch (err) {
    error = err.message
  }
  return (
    <div>
      <h1>Trippicer employees</h1>
      <ul>
        {error ?
          <p>{error}</p>
          :
          employees.map((employee) => (
            <li key={employee._id} className={styles.li}>
              {employee._id.toString()}<br />
              {employee.name}<br />
              {employee.position}<br />
              {employee.salary}<br />
              {employee.createdAt.toString()}<br />
              {employee.updatedAt.toString()}
            </li>
          ))
        }
      </ul>
    </div>
  );
}
