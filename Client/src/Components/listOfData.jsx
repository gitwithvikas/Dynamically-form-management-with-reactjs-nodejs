
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './listOfData.css'
import { useSelector } from "react-redux"

export default function ListOfData() {

    const itemsState = useSelector(state=>state.ItemState.value)
    console.log(itemsState)

    const [searchQuery, setSearchQuery] = useState('')

    const [itemPerPage, setItemPerPage] = useState(10)




    //This is for creating number in base of page 
    const numOfTotalPages = Math.ceil(itemsState.length / itemPerPage)
    const pages = [...Array(numOfTotalPages + 1).fill(0).keys()].slice(1)


    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastPage = currentPage * itemPerPage
    const indexOfFirstPage = indexOfLastPage - itemPerPage

    const visibleitems = itemsState.slice(indexOfFirstPage, indexOfLastPage)

   




    const filteredItems = itemsState.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )


    return <>

        <div className="container text-center">

        <Link to='/'><button className='btn btn-primary' >Home</button> </Link>
            
          
         <input style={{display:'inline-block',marginLeft:'20px'}}  className="form-control w-50 text-center" placeholder="Search..." type="Search" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />


            <div className="mt-5"  >

                {filteredItems.map(ob => (

                    <div className="items" key={ob.id} >
                        <div>
                            <img  src={`/api/${ob.image}`} width='100px' height="100px" alt="" />

                        </div>
                        <div >
                            <div >{ob.title} </div>
                            <div>{ob.description}</div>
                            <div >{ob.quantity} </div>
                            <div >{ob.price} </div>
                            <div>{ob.date}</div>

                        </div>
                    </div>

                ))}





            </div>




            <div className="mt-5">


                {pages.map(ob => (
                    <span key={ob}>

                        <span style={{ cursor: "pointer" }} onClick={() => setCurrentPage(ob)} className={currentPage == ob ? "h2" : ''} >{` ${ob} `}</span>&nbsp;
                        <span>|</span>

                    </span>
                ))}

            </div>

            <div className="mt-3">
                <button className="btn btn-primary"  onClick={() => currentPage !== 1 ? setCurrentPage(currentPage - 1) : ''} >Prev</button>
                &nbsp; &nbsp;
                <button className="btn btn-primary" onClick={() => currentPage !== numOfTotalPages ? setCurrentPage(currentPage + 1) : ''}>Next</button>
            </div>






            <div className="mb-5">


            </div>



        </div>


    </>
}