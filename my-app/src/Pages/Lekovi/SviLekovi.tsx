import React, { useEffect, useState } from 'react'
import { useDeleteLekMutation, useGetLekByIDQuery, useGetLekoviQuery } from '../../API/LekItemApi'
import MainLoader from '../../Components/Layout/Page/Lekovi/Common/MainLoader';
import LekModel from '../../interfaces/LekModel';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import withAdminAuth from '../../HOC/withAdminAuth';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import "./mediaPencilFill.css"
import { useDispatch } from 'react-redux';
import { setLekItem } from '../../Storage/Redux/LekSlice';
import { truncate } from 'fs';
import "./SviLekovi.css"
import { Toast } from 'react-toastify/dist/components';
import toastNotify from '../../Helper/toastNotify';
const initalDataToPreventDataResultBeingNull = {
    nazivLeka: "Mg",
    description: "123",
    image: "asd",
    isbn: "123",
    lekID: "5",
    price: "111"
}
const SviLekovi = () => {
    const dispatch = useDispatch();
    const [showDiv, setShowDiv] = useState(false);
    const [FileName, SetFileName] = useState<any>();
    const [pageOptions, setPageOptions] = useState({
        pageNumber: 1,
        pageSize: 4,
        bestSellers: false
    })
    const { data, isLoading, refetch } = useGetLekoviQuery<any>({
        ...({
            currentPage: pageOptions.pageNumber,
            pageSize: pageOptions.pageSize,
            bestsellers: false
        })
    });
    const [sortName, setSortName] = useState<string>("A - Z")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [lekovi, setLekovi] = useState<LekModel[]>([]);
    const [Loading, setIsLoading] = useState<boolean>(true);
    const sortOptions: Array<string> = [
        "A - Z",
        "Z - A",
        "Best sellers",
        "Price: Low to High",
        "Price: High to Low",
    ]

    const [totalRecords, setTotalRecords] = useState(0);
    //(data);
    //console.log(isLoading)
    const [deleteLek] = useDeleteLekMutation();
    const navigate = useNavigate();

    const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms))
    const handleLekDelete = async (id: number) => {
        deleteLek(id);
        //console.log(id);
        toast.promise(
            deleteLek(id),
            {
                pending: 'Obradjuje se zahtev...',
                success: 'Lek je obrisan uspesno 👌',
                error: 'Neka greska. 🤯'
            },
            {
                theme: "dark"
            }
        )

    }
    useEffect(() => {
        //console.log(isLoading);
        if (!isLoading) {
            if(data.apiResponse.result.length === 0){
                refetch();
            }
            if (data && data.apiResponse.result && data.apiResponse.result.length > 0) {

                //console.log("USLO")
                dispatch(setLekItem(data.apiResponse.result))
                setLekovi(data.apiResponse.result)
                //console.log(data)
                const { TotalRecords } = JSON.parse(data.totalRecords)
                setTotalRecords(TotalRecords)
                const tempCategoryList = ["All"]
                data.apiResponse.result.forEach((item: LekModel) => {
                    if (tempCategoryList.indexOf(item.mainCategory) === -1) {
                        tempCategoryList.push(item.mainCategory);
                    }
                })
                //console.log(data);
                //console.log("Uslo")
                //console.log(data);

            }
        }
    }, [isLoading, pageOptions.pageSize])

    useEffect(() => {
        if (!isLoading 
            || data === null 
            || data === undefined 
            || data.apiResponse.result === undefined 
            || data.apiResponse.result === null
            || data.apiResponse.result.length === 0) {
            refetch();
        }
        if (data) {
            //console.log(data);
            setIsLoading(true);
            const timer = setTimeout(() => {
                //console.log(data.apiResponse.result)
                setLekovi(data.apiResponse.result)
                dispatch(setLekItem(data.apiResponse.result))
                const { TotalRecords } = JSON.parse(data.totalRecords)
                setTotalRecords(TotalRecords)
                setIsLoading(false);
            }, 2000)
            return () => clearTimeout(timer);
        }
    }, [data])
    const handlePaginationClick = (direction: string, pageSize?: number) => {
        if (direction === "prev") {
            setPageOptions({
                pageSize: pageOptions.pageSize, pageNumber: pageOptions.pageNumber - 1, bestSellers: pageOptions.bestSellers
            })
        }
        else if (direction === "next") {
            setPageOptions({
                pageSize: pageOptions.pageSize, pageNumber: pageOptions.pageNumber + 1, bestSellers: pageOptions.bestSellers
            })
        }

        else if (direction === "change") {
            //console.log("uslo")
            setPageOptions({
                pageSize: pageSize ? pageSize : 2,
                pageNumber: 1,
                bestSellers: pageOptions.bestSellers
            })
        }
    }
    const getPageDetails = () => {
        const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1
        const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

        return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`
    }
    if (Loading === true || isLoading === true || lekovi === undefined || data.apiResponse.result.length === 0) {
        return <MainLoader />
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        const fileName = file?.name;
        if (fileName) {
            console.log(fileName)
            console.log(file);
            SetFileName(file)
        }

    }
    const handlePostImageAPI = () => {
        const formData = new FormData();
        formData.append("image", FileName)
        const response = fetch('https://diplomskiapi.azurewebsites.net/api/Lek/UploadImageAdd', {
            method: "POST",
            body: formData,
        })
        .then((x) => {
            if(x.ok){
                toastNotify("Slika je uspesno postavljena.", "success");
            }
            else{
                toastNotify("Nesto je otislo po zlu.", "error");
            }
        })
    }
    const toggleDiv = () => {
        setShowDiv(!showDiv)
    }
    return (
        <>

            {(isLoading && lekovi === undefined) && <MainLoader />}
            {!isLoading && lekovi !== undefined && (
                <div className=''>
                    <div className='table p-5'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h1 className='text-success'>Lekovi Lista</h1>
                            <button className='btn btn-success' onClick={() => navigate("/Lekovi/Upsert")}>Dodaj novi Lek</button>
                        </div>
                        <div className='d-flex align-items-center justify-content-end'>
                            <button className='btn btn-warning' onClick={toggleDiv}>Dodaj reklamu</button>
                        </div>
                        <div className='p-2'>
                            <div className='row border'>
                                <div className='col-2'>Image</div>
                                <div className='col-2'>Name</div>
                                <div className='col-2'>Category</div>
                                <div className='col-1'>Price</div>
                                <div className='col-2'>Description</div>
                                <div className='col-2' style={{textAlign: "right"}}>Action</div>
                            </div>
                            {showDiv && (
                                <div className='overlay'>
                                    <input type="file" className='' onChange={handleFileChange} />
                                    <button onClick={handlePostImageAPI} className='btn btn-success'>Add</button>
                                    <button onClick={toggleDiv} className='btn btn-danger'>Close</button>
                                </div>

                            )}
                            {lekovi && lekovi && lekovi.map((lek: LekModel) => {
                                return (
                                    <div className='row border' key={lek.lekID}>
                                        <div className='col-2'>
                                            <img
                                                src={lek.image}
                                                alt="no content" style={{ width: "100%", maxWidth: "120px" }}>
                                            </img>
                                        </div>
                                        <div className='col-2'>{lek.nazivLeka}</div>
                                        <div className='col-2'>{lek.mainCategory}</div>
                                        <div className='col-1'>{lek.price}</div>
                                        <div className='col-2'>{lek.description}</div>

                                        
                                        
                                        <div className='col-2' style={{textAlign: "right"}}>
                                            <button className='btn btn-success mediaPencilFill'>
                                                <i className='bi bi-pencil-fill'
                                                    onClick={() => navigate("/Lekovi/Upsert/" + lek.lekID)}
                                                ></i>
                                            </button>
                                            {/* Ispraviti izgled kada se smanji rezolucija*/}
                                            <button className='btn btn-danger ms-2' >
                                                <i className='bi bi-trash-fill'
                                                    onClick={() => handleLekDelete(lek.lekID)}></i>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
            <div className='d-flex justify-content-center align-items-center'>
                <div className='mx-2'>
                    {getPageDetails()}
                </div>
                <button disabled={pageOptions.pageNumber === 1}

                    className='btn btn-outline-primary px-3 mx-2'
                    onClick={() => handlePaginationClick("prev")}
                >
                    <i className='bi bi-chevron-left'></i>
                </button>
                <button disabled={pageOptions.pageNumber * pageOptions.pageSize >= totalRecords}
                    className='btn btn-outline-primary px-3 mx-2'
                    onClick={() => handlePaginationClick("next")}
                >
                    <i className='bi bi-chevron-right'></i>
                </button>
            </div>
        </>
    )
}
export default withAdminAuth(SviLekovi)