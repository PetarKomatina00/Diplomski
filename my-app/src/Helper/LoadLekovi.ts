import React, { useEffect, useState } from 'react';
import { useGetLekoviQuery } from '../API/LekItemApi';

const YourComponent = ( search: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Assuming useGetLekoviQuery is a valid hook provided by a library
        const lekovi = await useGetLekoviQuery(search);
        console.log(lekovi);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [search]);
};

export default YourComponent;