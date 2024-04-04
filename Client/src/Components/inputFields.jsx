import React, { useState } from 'react';

import './inputFields.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItems } from './reduxData/slice';

const InputField = () => {


    const [fields, setFields] = useState([{ id: 1, data: {} }]);

    const dispatch = useDispatch()

    const handleAddField = () => {
        const newField = {
            id: fields.length + 1,
            data: {}
        };
        setFields([...fields, newField]);
    };

    const handleRemoveField = (id) => {
        if (fields.length > 1) {
            setFields(fields.filter(field => field.id !== id));
        }
    };

    const handleChange = (e, id, key) => {
        const value = key === 'image' ? e.target.files[0] : e.target.value;
        const updatedFields = fields.map(field => {
            if (field.id === id) {
                return {
                    ...field,
                    data: {
                        ...field.data,
                        [key]: value
                    }
                };
            }
            return field;
        });
        setFields(updatedFields);
    };



    const handleSave = async (e) => {
        e.preventDefault()
        console.log("All data:", fields.map(field => field.data));
    
        try {
            for (const field of fields) {
                const formData = new FormData();
    
                Object.entries(field.data).forEach(([key, value]) => {
                    if (key === 'image') {
                        formData.append(key, value);
                    } else {
                        formData.append(key, value);
                    }
                });
    
                const response = await axios.post('/api/items', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
    
                console.log('Response:', response.data);
                dispatch(addItems(response.data));
            }
    
            // Clear all input fields
            setFields([{ id: 1, data: {} }]);
            alert('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Error saving data');
        }





        // Clear all input fields
        const inputFields = document.querySelectorAll('.form-control');
        inputFields.forEach(input => {
            input.value = ''; // Reset each input field's value to an empty string
        });


    };

    return (
        <div className="container mt-5 ">

<Link to='/data'><button className='btn btn-primary' >Show Data</button> </Link>
          
            <form onSubmit={(e) => handleSave(e)}>

                {fields.map((field, index) => (

                    <div className="mt-4 input-field row mb-3" key={field.id}>


                        <div className="col">
                            <input type="file" className="form-control" placeholder="Image Title" onChange={e => handleChange(e, field.id, 'image')} required />
                        </div>

                        <div className="col">
                            <input type="text" className="form-control" placeholder=" Title" onChange={e => handleChange(e, field.id, 'title')} required />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" maxLength="250" placeholder="Description" onChange={e => handleChange(e, field.id, 'description')} required />
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" placeholder="Quantity" onChange={e => handleChange(e, field.id, 'quantity')} required />
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" placeholder="Price" onChange={e => handleChange(e, field.id, 'price')} required />
                        </div>
                        <div className="col">
                            <input type="date" className="form-control" onChange={e => handleChange(e, field.id, 'date')} required />
                        </div>


                        <div className="col text-right">
                            {index === 0 ? (
                                <button className="btn btn-primary" onClick={handleAddField}>
                                    <b>+</b>
                                </button>
                            ) : (
                                <button className="btn btn-danger" onClick={() => handleRemoveField(field.id)}>
                                    <b>-</b>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                <div className="row mt-3">
                    <div className="col text-center">
                        <button type='submit' className="btn btn-success">Save</button>
                    </div>
                </div>


            </form>

        </div>
    );
};

export default InputField;
