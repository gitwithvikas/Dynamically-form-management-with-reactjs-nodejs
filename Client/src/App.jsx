import { Route, Routes } from "react-router-dom";
import InputField from "./Components/inputFields";
import ListOfData from "./Components/listOfData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems } from "./Components/reduxData/slice";
import axios from "axios";


export default function App() {


  const dispatch = useDispatch()

  useEffect(async () => {
    const items = await axios.get("/api/items")
    dispatch(fetchAllItems(items.data))

  }, [])


  return <>

    <h3 className='alert alert-danger text-center' >Dynamic Form Management With React  </h3>



    <Routes>
      <Route path='/' element={<InputField />} />
      <Route path="/data" element={<ListOfData />} />
    </Routes>

  </>
}