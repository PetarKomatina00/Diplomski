import React from 'react'
import { useDeleteLekMutation, useGetLekByIDQuery, useGetLekoviQuery } from '../../API/LekItemApi'
import MainLoader from '../../Components/Layout/Page/Lekovi/Common/MainLoader';
import LekModel from '../../interfaces/LekModel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import withAdminAuth from '../../HOC/withAdminAuth';

const initalDataToPreventDataResultBeingNull = {
    description : "123",
    image : "asd",
    isbn : "123",
    lekID : "5",
    nazivLeka : "Mg",
    price : "111"
}
const SviLekovi = () => {
    const { data, isLoading } = useGetLekoviQuery(initalDataToPreventDataResultBeingNull);
    const [deleteLek] = useDeleteLekMutation();
    const navigate = useNavigate();

    const delay = (ms : any) => new Promise(resolve => setTimeout(resolve, ms))
    const handleLekDelete = async (id : number) => {
        deleteLek(id);
        console.log(id);
        toast.promise(
            deleteLek(id),
            {
              pending: 'Obradjuje se zahtev...',
              success: 'Lek je obrisan uspesno 👌',
              error: 'Neka greska. 🤯'
            },
            {
                theme : "dark"
            }
        )
    }
    return (
        <>
            {isLoading && <MainLoader />} 
            {!isLoading && (
                <div className='table p-5'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <h1 className='text-success'>Lekovi Lista</h1>
                        <button className='btn btn-success' onClick={() => navigate("/Lekovi/Upsert")}>Dodaj novi Lek</button>
                    </div>
                    <div className='p-2'>
                        <div className='row border'>
                            <div className='col-2'>Image</div>
                            <div className='col-1'>ID</div>
                            <div className='col-2'>Name</div>
                            <div className='col-2'>Category</div>
                            <div className='col-1'>Price</div>
                            <div className='col-2'>Special Tag</div>
                            <div className='col-2'>Action</div>
                        </div>
                        
                        {data.result.map((lek: LekModel) => {
                            return (
                                <div className='row border' key = {lek.lekID}>
                                    <div className='col-2'>
                                        <img
                                        src = {lek.image} 
                                        alt="no content" style={{ width: "100%", maxWidth: "120px" }}>
                                        </img>
                                    </div>
                                    <div className='col-1'>{lek.lekID}</div>
                                    <div className='col-2'>{lek.nazivLeka}</div>
                                    <div className='col-2'>{lek.description}</div>
                                    <div className='col-1'>{lek.price}</div>
                                    <div className='col-2'>Special Tag</div>
                                    <div className='col-2'>
                                        <button className='btn btn-success'>
                                            <i className='bi bi-pencil-fill'
                                            onClick={() => navigate("/Lekovi/Upsert/" + lek.lekID)}
                                            ></i>
                                        </button>
                                        {/* Ispraviti izgled kada se smanji rezolucija*/}
                                        <button className='btn btn-danger mx-2'>
                                            <i className='bi bi-trash-fill'
                                            onClick = { () => handleLekDelete(lek.lekID)}></i>
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                        {console.log(data.result)}
                    </div>
                </div>
            )}


        </>
    )
}
export default withAdminAuth(SviLekovi)