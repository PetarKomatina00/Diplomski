import React, { useEffect } from 'react'
import { useGetBestSellersQuery } from '../../../../API/LekItemApi'
import { useDispatch } from 'react-redux';
import { setLekItem } from '../../../../Storage/Redux/LekSlice';
import MainLoader from '../Lekovi/Common/MainLoader';
import LekModel from '../../../../interfaces/LekModel';
import LekoviCard from '../Lekovi/LekoviCard';

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
function BestSellers() {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetBestSellersQuery<any>(initalDataToPreventDataResultBeingNull);
  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(setLekItem(data.result))
      }
      //console.log(data);
    }
  }, [data, isLoading])

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

export default BestSellers