
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useGetLekoviQuery } from '../../../../API/LekItemApi';
import { useDebounce } from '../../../../Helper/hooks';
import { useEffect, useState } from 'react';
import LoadLekovi from '../../../../Helper/LoadLekovi';
import YourComponent from '../../../../Helper/LoadLekovi';
import MainLoader from './Common/MainLoader';

const Filter = ({sendDataToParent} : any) => {
    //const {data, isLoading} = useGetLekoviQuery(["", 1, 2]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const debounceSearch = useDebounce(search);
    const [showByValue, setShowByValue] = useState<number>(2);
    const [sortByValue, setSortByValue] = useState<string>("LTH");

    let lekovi;
    useEffect(() => {
        setLoading(true);
        try {
            // if (debounceSearch.length === 0 || debounceSearch.trim() === '') {
            //     setLoading(true);
            //     fetch('https://localhost:7194/api/Lek/' + 1 + "/" + 2)
            //         .then((res) => res.json())
            //         .then((data) => {
            //             sendDataToParent(data);
            //         })
            //     setLoading(false);
            // }
            if(debounceSearch.length !== 0) {
                setLoading(true);
                console.log("POZIV IZ FILTER")
                fetch('https://localhost:7194/api/Lek/' + 1 + "/" + 2 + "/" + debounceSearch)
                    .then((res) => res.json())
                    .then((data) => {
                        sendDataToParent(data);
                    })
                setLoading(false);
            }

        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(true);
        }
    }, [debounceSearch])


    const getShowByValue = (event: any) => {
        setShowByValue(event.target.innerText);
    }
    const getSortByValue = (event: any) => {
        setSortByValue(event.target.innerText)
    }
    const onChangeSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='searchbar'>
                        <InputGroup>
                            <FormControl onChange={onChangeSetSearch} placeholder="Search..." className='my-2'></FormControl>
                        </InputGroup>
                    </div>
                </div>
                <div className='col'>
                    <Form className='my-2'>
                        <Form.Check
                            type="checkbox"
                            id="checkbox"
                            label="Show best sellers"
                        />
                    </Form>
                </div>
                <div className='col-md-1 my-2'>
                    <div className='sortby'>
                        <DropdownButton id="dropdown-primary-button" variant="secondary" title="Sort by">
                            <Dropdown.Item onClick={getSortByValue}>Best sellers</Dropdown.Item>
                            <Dropdown.Item onClick={getSortByValue} href="#/action-2">Price: Low to High</Dropdown.Item>
                            <Dropdown.Item onClick={getSortByValue} href="#/action-3">Price: High to Low</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className='col-md my-2 mx-md-5'>
                    <div className='show'>
                        <DropdownButton id="dropdown-primary-button" variant="secondary" title="Show">
                            <Dropdown.Item onClick={getShowByValue}>2</Dropdown.Item>
                            <Dropdown.Item onClick={getShowByValue}>4</Dropdown.Item>
                            <Dropdown.Item onClick={getShowByValue}>6</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Filter;
