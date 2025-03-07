import { useState } from 'react';
import axios from 'axios';
import './empform.css'

const EmployeeForm = () => {
    const initialFormData = {
        EmpID: '',
        EmpName: '',
        Email: '',
        Phone: '',
        DOB: '',
        DOJ: '',
        Address: '',
        Designation: '',
        Place: '',
        Department: '',
        AccountNo: '',
        IFSC: '',
        BankName: '',
        CTC: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [photo, setPhoto] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // 🔹 Handle text input changes
    const handleChange = (e) => {
        let { name, value } = e.target;

        // Convert date to YYYY-MM-DD format
        if (name === "DOB" || name === "DOJ") {
            const date = new Date(value);
            value = date.toISOString().split('T')[0];
        }

        setFormData({ ...formData, [name]: value });
    };

    // 🔹 Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);

        if (file) {
            console.log("🔹 Selected Image:", file.name); // Debugging
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 🔹 Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Append all text fields
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        // Append the uploaded photo
        if (photo) {
            data.append('photo', photo);
        }

        console.log("🔹 Form Data Before Submitting:", Object.fromEntries(data)); // Debugging

        try {
            await axios.post('http://localhost:5000/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Employee Registered Successfully!');
            setFormData(initialFormData);
            setPhoto(null);
            setImagePreview(null);
        } catch (error) {
            console.error("❌ Error registering employee:", error.response?.data || error.message);
            alert("Error registering employee. Please check console logs.");
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Employee Registration</h2>

                <label>Employee ID</label>
                <input type="text" name="EmpID" value={formData.EmpID} onChange={handleChange} required />

                <label>Employee Name</label>
                <input type="text" name="EmpName" value={formData.EmpName} onChange={handleChange} required />

                <label>Email</label>
                <input type="email" name="Email" value={formData.Email} onChange={handleChange} required />

                <label>Phone Number</label>
                <input type="text" name="Phone" value={formData.Phone} onChange={handleChange} required />

                <label>Date of Birth</label>
                <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />

                <label>Date of Joining</label>
                <input type="date" name="DOJ" value={formData.DOJ} onChange={handleChange} required />

                <label>Address</label>
                <textarea name="Address" value={formData.Address} onChange={handleChange} required></textarea>

                <label>Designation</label>
                <input type="text" name="Designation" value={formData.Designation} onChange={handleChange} required />

                <label>Place</label>
                <input type="text" name="Place" value={formData.Place} onChange={handleChange} required />

                <label>Department</label>
                <input type="text" name="Department" value={formData.Department} onChange={handleChange} required />

                <label>Account Number</label>
                <input type="text" name="AccountNo" value={formData.AccountNo} onChange={handleChange} required />

                <label>IFSC Code</label>
                <input type="text" name="IFSC" value={formData.IFSC} onChange={handleChange} required />

                <label>Bank Name</label>
                <input type="text" name="BankName" value={formData.BankName} onChange={handleChange} required />

                <label>CTC</label>
                <input type="number" name="CTC" value={formData.CTC} onChange={handleChange} required />

                <label>Upload Employee Photo</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required />

                {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', marginTop: '10px' }} />}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
