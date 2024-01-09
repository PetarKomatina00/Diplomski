import React, { useEffect, useState } from 'react'
import LekModel from '../../../../interfaces/LekModel';
import LekoviCard from './LekoviCard';
import { useGetLekoviQuery } from '../../../../API/LekItemApi';
import { useDispatch } from 'react-redux';
import { setLekItem } from '../../../../Storage/Redux/LekSlice';
import MainLoader from './Common/MainLoader';
import { isNullOrUndefined } from 'util';

function LekoviLista() {
    //const [lekovi, setLekovi] = useState<LekModel[]>([]);
    const dispatch = useDispatch();
    const { data, isLoading } = useGetLekoviQuery(null);

    useEffect(() => {
        if (!isLoading) {
            if (data) {
                dispatch(setLekItem(data.result))
            }

        }
    }, [isLoading])

    useEffect(() => {
        const timer = setTimeout(() => {
            if(!isLoading && data === undefined){
                window.location.reload();
            }
        }, 5000)
    }, [isLoading, data])

    if (isLoading || data === undefined) {
        return <MainLoader />
    }
    return (
        <div className='container row'>
            {data.isSuccess &&
                data.result.map((lek: LekModel, index: number) => (
                    <LekoviCard lek={lek} key={index} />
                ))}
        </div>
    )
}

export default LekoviLista