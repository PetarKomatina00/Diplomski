import React, { useEffect, useState } from 'react'
import InputHelper from '../../Helper/InputHelper';
import toastNotify from '../../Helper/toastNotify';
import { useAddLekMutation, useGetLekByIDQuery, useGetLekoviQuery, useUpdateLekMutation } from '../../API/LekItemApi';
import apiResponse from '../../interfaces/apiResponse';
import { useNavigate, useParams } from 'react-router-dom';

type ApiResponse = {
    data: {
        errorMessages: string[];
        isSuccess: boolean;
        result: {
            bestSeller: boolean;
            description: string;
            image: string;
            isbn: string;
            lekID: number;
            mainCategory: string;
            nazivLeka: string;
            price: number;
            timesBought: number;
        };
        statusCode: number;
    };
};
const lekInitialData = {
    name: "",
    description: "",
    isbn: "",
    price: "",
    category: "",
    bestSellers: false,
    timesBought: 0
}
function Upsert() {
    const [imageToBeStore, setImageToBeStore] = useState<any>();
    const [imageToBeDisplayed, setImageToBeDisplayed] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [LekInput, setLekInput] = useState(lekInitialData);
    const [addLek] = useAddLekMutation();
    const navigate = useNavigate();
    const [updateLek] = useUpdateLekMutation();
    const { id } = useParams();
    const { data } = useGetLekByIDQuery(id);
    useEffect(() => {
        if (data && data.result) {
            console.log(data.result);
            const tempData = {
                name: data.result.nazivLeka,
                description: data.result.description,
                isbn: data.result.isbn,
                price: data.result.price,
                category: data.result.mainCategory,
                bestSellers: data.result.bestSeller,
                timesBought: data.result.timesBought
            };
            setLekInput(tempData);
            setImageToBeDisplayed(data.result.image);
        }
    }, [data])

    const handleLekInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const tempData = InputHelper(e, LekInput)
        setLekInput(tempData)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const imageType = file.type.split("/")[1];
            const validImageTypes = ["jpeg", "jpg", "png"];
            const isImageTypeValid = validImageTypes.filter((e) => {
                return e === imageType;
            })
            if (file.size > 1000 * 1024) {
                setImageToBeStore("");
                toastNotify("Velicina ne sme biti veca od 1MB", "error");
                return;
            }
            else if (isImageTypeValid.length === 0) {
                setImageToBeStore("");
                toastNotify("File mora biti jpeg, jpg, ili png", "error")
                return;
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            setImageToBeStore(file);
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string;
                setImageToBeDisplayed(imgUrl);
            }
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        if (!imageToBeStore && !id) {
            toastNotify("Please upload an image", "error")
            setIsLoading(false);
            return;
        }
        console.log("this is " + LekInput.bestSellers)
        const formData = new FormData();
        formData.append("nazivLeka", LekInput.name)
        formData.append("description", LekInput.description)
        formData.append("isbn", LekInput.isbn)
        formData.append("price", LekInput.price)
        formData.append("mainCategory", LekInput.category)
        formData.append("bestSeller", (LekInput.bestSellers).toString())
        formData.append("timesBought", "0")
        if (imageToBeDisplayed) formData.append("image", imageToBeStore)
        for (let x of formData.values())
            console.log(x)
        let response : apiResponse;
        if (id) {
            formData.append("lekID", id);
            response = await updateLek({ data: formData, id });
            
            if (response.data?.isSuccess) {
                console.log(response);
                toastNotify("Lek je uspesno izmenjen", "success");
            }
            else {
                toastNotify("Greska", "error")
            }
        }
        else {
            response = await addLek(formData);
            console.log(response);
            console.log(response.data?.isSuccess)
            if (response.data?.isSuccess) {
                toastNotify("Lek je uspesno napravljen", "success");
            }
            else {
                toastNotify("Lek nije napravljen", "error");
            }
        }
        if (response.data?.isSuccess) {
            setIsLoading(false);
            window.location.replace("/Lekovi/SviLekovi")
        }
        setIsLoading(false);
    }
    const handleSelectedValue = (event: any) => {
        console.log(event.target.value)
        LekInput.bestSellers = event.target.value
    }
    return (
        <div className='container border mt-5 p-5'>
            <h3 className='px-2 text-success'>
                {id ? "Izmeni Lek" : "Dodaj Lek"}
            </h3>
            <form method='post' encType='multipart/form-data' onSubmit={handleSubmit}>
                <div className='row mt-3'>
                    <div className='col-md-7'>
                        <input
                            type="text"
                            className='form-control'
                            placeholder='Enter Name'
                            required
                            name="name"
                            value={LekInput.name}
                            onChange={handleLekInput}
                        />
                        <textarea
                            className='form-control mt-3'
                            placeholder='Enter Description'
                            rows={10}
                            name="description"
                            value={LekInput.description}
                            onChange={handleLekInput}
                        >
                        </textarea>
                        <input
                            type="text"
                            className='form-control mt-3'
                            placeholder='Enter ISBN'
                            required
                            name="isbn"
                            value={LekInput.isbn}
                            onChange={handleLekInput}
                        />
                        <input
                            type="text"
                            className='form-control mt-3'
                            placeholder='Enter Price'
                            required
                            name="price"
                            value={LekInput.price}
                            onChange={handleLekInput}
                        />
                        <input
                            type="text"
                            className='form-control mt-3'
                            placeholder='Enter Category'
                            required
                            name="category"
                            value={LekInput.category}
                            onChange={handleLekInput}
                        />
                        <input
                            type="text"
                            className='form-control mt-3'
                            placeholder='Enter Times Bought'
                            required
                            name="timesBought"
                            value={LekInput.timesBought}
                            onChange={handleLekInput}
                        />
                        <select className='form-control mt-3'  onChange={handleSelectedValue}>
                            <option value="false" >False</option>
                            <option value="true" >True</option>
                        </select>
                        <input type="file" className='form-control mt-3' onChange={handleFileChange} />
                        <div className='row'>
                            <div className='col-6'>
                                <button
                                    type='submit'
                                    className='btn btn-success form-control mt-3'>
                                    {id ? "Izmeni" : "Dodaj"}
                                </button>
                            </div>
                            <div className='col-6'>
                                <a onClick={() => navigate(-1)}
                                    className='btn btn-secondary form-control mt-3'>Nazad</a>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-5 text-center'>
                        <img
                            src={imageToBeDisplayed}
                            alt=''
                            style={{ width: "100%", borderRadius: "30px" }}>
                        </img>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Upsert