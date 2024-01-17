import React, { useEffect, useState } from 'react'
import LekModel from '../../../../interfaces/LekModel';
import LekoviCard from './LekoviCard';
import { useGetBestSellersQuery, useGetLekoviQuery } from '../../../../API/LekItemApi';
import { useDispatch } from 'react-redux';
import { setLekItem } from '../../../../Storage/Redux/LekSlice';
import MainLoader from './Common/MainLoader';
import { isNullOrUndefined } from 'util';

const initalDataToPreventDataResultBeingNull = {
    description: "123",
    image: "asd",
    isbn: "123",
    lekID: "5",
    nazivLeka: "Mg",
    price: "111",
    mainCategory: "main",
    sideCategory: "side",
    bestseller: "false"
}
function LekoviLista() {
    //const [lekovi, setLekovi] = useState<LekModel[]>([]);
    const dispatch = useDispatch();
    const { data, isLoading } = useGetLekoviQuery<any>(initalDataToPreventDataResultBeingNull);
    useEffect(() => {
        if (!isLoading) {
            if (data) {
                dispatch(setLekItem(data.result))
            }
            //console.log(data);
        }
    }, [data, isLoading])
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if(!isLoading && data === undefined){
    //             window.location.reload();
    //         }
    //     }, 5000)
    // }, [isLoading, data])

    if (isLoading) {
        return <MainLoader />
    }
    return (
        <div className='container row md-2'>
            {isLoading ? <MainLoader /> :
                data.result.map((lek: LekModel, index: number) => (
                    <LekoviCard lek={lek} key={index} />
                ))}

        </div>
    )
}

export default LekoviLista