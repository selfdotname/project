import mongoose from "mongoose"

const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Employee = mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);

export default Employee