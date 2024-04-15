import React, { useEffect, useState } from 'react'
import LekModel from '../../../../interfaces/LekModel';
import LekoviCard from './LekoviCard';
import { useGetBestSellersQuery, useGetLekoviQuery } from '../../../../API/LekItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { setLekItem, setSearchItem } from '../../../../Storage/Redux/LekSlice';
import MainLoader from './Common/MainLoader';
import { isNullOrUndefined } from 'util';
import "./LekoviLista.css"
import Filter from './Filter';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import { Form } from 'react-bootstrap'
import { useDebounce } from '../../../../Helper/hooks';
import { RootState } from '../../../../Storage/Redux/store';
import "./customButton.css"
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
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    // Pagination
    const [filter, setFilters] = useState({ serachString: "", status: "" })
    const [totalRecords, setTotalRecords] = useState(0);
    const [pageOptions, setPageOptions] = useState({
        pageNumber: 1,
        pageSize: 4,
        bestSellers: false
    })
    const [currentPageSize, setCurrentPageSize] = useState(pageOptions.pageSize)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { data, refetch } = useGetLekoviQuery<any>({
        ...({
            currentPage: pageOptions.pageNumber,
            pageSize: pageOptions.pageSize,
            bestsellers: pageOptions.bestSellers
        })
    });

    const [lekovi, setLekovi] = useState<LekModel[]>([]);

    const [selectedCategory, setSelectedCategory] = useState("All")
    const [categoryList, setCategoryList] = useState([""])

    const [sortName, setSortName] = useState<string>("A - Z")
    const searchValue = useSelector((state: RootState) => state.lekItemStore.search)
    const debounceSearch = useDebounce(searchValue);
    const sortOptions: Array<string> = [
        "A - Z",
        "Z - A",
        "Best sellers",
        "Price: Low to High",
        "Price: High to Low",
    ]
   //console.log(data);


    useEffect(() => {
        console.log("SEARCH VALUE SE PROMENIO");
        if (data && data.result) {
            const lekovi = handleSearchFilter(sortName, selectedCategory, searchValue)
            //console.log(lekovi);
            setLekItem(lekovi);
            setLekovi(lekovi)
            //console.log(data);

        }
    }, [searchValue])

    useEffect(() => {
        console.log("ISLOAING SE PROMENIO");
        if (!isLoading) {
            if (data && data.apiResponse.result && data.apiResponse.result.length > 0) {
                dispatch(setLekItem(data.apiResponse.result))
                setLekovi(data.apiResponse.result)
                console.log(data)
                const { TotalRecords } = JSON.parse(data.totalRecords)
                setTotalRecords(TotalRecords)
                const tempCategoryList = ["All"]
                data.apiResponse.result.forEach((item: LekModel) => {
                    if (tempCategoryList.indexOf(item.mainCategory) === -1) {
                        tempCategoryList.push(item.mainCategory);
                    }
                })
                setCategoryList(tempCategoryList)
                //console.log(data);
            }
        }
    }, [isLoading, pageOptions.pageSize, pageOptions.bestSellers])

    useEffect(() => {
        //console.log("DATA SE PROMENIO")
        if (data && data.apiResponse.result.length > 0 ) {
            //console.log(data);
            setIsLoading(true);
            const timer = setTimeout(() => {
                setLekovi(data.apiResponse.result)
                dispatch(setLekItem(data.apiResponse.result))
                const { TotalRecords } = JSON.parse(data.totalRecords)
                setTotalRecords(TotalRecords)
                setIsLoading(false);
            }, 2000)
            return () => clearTimeout(timer);
        }
        else{
            refetch();
        }
    }, [data])
    const handleCategoryClick = (i: number) => {
        const buttons = document.querySelectorAll(".custom-buttons")
        let localCategory;
        buttons.forEach((button, index) => {
            if (index === i) {
                button.classList.add("active")
                if (index === 0) {
                    localCategory = "All"
                }
                else {
                    localCategory = categoryList[index]
                }
                setSelectedCategory(localCategory)
                //console.log(localCategory)
                const tempArray = handleSearchFilter(sortName, localCategory, searchValue)
                //console.log(tempArray)
                setLekItem(tempArray);
                setLekovi(tempArray)
                dispatch(setLekItem(tempArray))
                //console.log(data);
            }
            else {
                button.classList.remove("active")
            }
        })
    }
    const handleSearchFilter = (sortType: string, category: string, search: string) => {
        //console.log(category);
        let temp: any = null;
        let tempLekovi = category === "All"
            ? [...data.apiResponse.result]
            : data.apiResponse.result.filter((item: LekModel) =>
                item.mainCategory.toLowerCase() === category.toLowerCase()
            );

        //search
        if (search) {
            //console.log(tempLekovi);
            const tempSearchLekovi = [...tempLekovi];
            tempLekovi = tempSearchLekovi.filter((item: LekModel) =>
                item.nazivLeka.toLowerCase().includes(search.toLowerCase())
            )
        }

        //sort
        //console.log(sortType)
        if (sortType === "Price: Low to High") {
            tempLekovi.sort((a: LekModel, b: LekModel) => a.price - b.price)
        }
        if (sortType === "Price: High to Low") {
            tempLekovi.sort((a: LekModel, b: LekModel) => b.price - a.price)
        }
        if (sortType === "A - Z") {
            tempLekovi.sort((a: LekModel, b: LekModel) =>
                a.nazivLeka.toLowerCase().charCodeAt(0) -
                b.nazivLeka.toLowerCase().charCodeAt(0))
        }
        if (sortType === "Z - A") {
            tempLekovi.sort((a: LekModel, b: LekModel) =>
                b.nazivLeka.toLowerCase().charCodeAt(0) -
                a.nazivLeka.toLowerCase().charCodeAt(0))
        }
        if (sortType === "Best sellers") {
            tempLekovi.sort((a: LekModel) =>
                a.bestSeller)
        }

        // if(temp != null){
        //     //console.log(temp);
        //     tempLekovi = temp;
        // }
        //console.log(tempLekovi)
        return tempLekovi;
    }

    if (isLoading) {
        return <MainLoader />
    }

    const onChangeSetSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchItem(event.target.value))
        setSearch(event.target.value);
        //console.log(search)
    }
    const handleSortClick = (i: number) => {
        setSortName(sortOptions[i]);
        const tempArray = handleSearchFilter(sortOptions[i], selectedCategory, searchValue)
        setLekovi(tempArray);
    }

    const getPageDetails = () => {
        const dataStartNumber = (pageOptions.pageNumber - 1) * pageOptions.pageSize + 1
        const dataEndNumber = pageOptions.pageNumber * pageOptions.pageSize;

        return `${dataStartNumber} - ${dataEndNumber < totalRecords ? dataEndNumber : totalRecords} of ${totalRecords}`
    }
    const handlePaginationClick = (direction: string, pageSize?: number) => {
        //console.log(direction)
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
    const izvrsi = (event: any) => {
        // console.log(event.target.checked)
        // console.log("PETAR")
    }
    //console.log(lekovi);
    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 col-md-6 col-lg-4 w-75 '>
                                <div className='searchbar'>
                                    <InputGroup>
                                        <FormControl onChange={onChangeSetSearch} placeholder="Search..." className='my-2'></FormControl>
                                    </InputGroup>
                                </div>
                            </div>
                            <div className='col my-2'>
                                <DropdownButton id="dropdown-primary-button" variant="secondary" title="Sort by">
                                    {sortOptions.map((option, index) =>
                                        <Dropdown.Item onClick={() => handleSortClick(index)} key={index}>{option}</Dropdown.Item>
                                    )}
                                </DropdownButton>
                            </div>
                            <div className='col my-2'>
                                <div className='show'>
                                    <select
                                        className="form-select "
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handlePaginationClick("change", Number(e.target.value));
                                            setCurrentPageSize(Number(e.target.value));
                                        }}
                                        style={{ width: "80px" }}
                                        value={currentPageSize}
                                    >
                                        <option>4</option>
                                        <option>8</option>
                                        <option>12</option>
                                        <option>20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=''>
                        <ul className='navbar navbar-expand-md navbar-light w-100 d-flex justify-content-center'>
                            <div className='container-fluid'>
                                <a className="navbar-brand" href="#"></a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-center " id="navbarNav">
                                    <ul className='navbar-nav'>
                                        {categoryList.map((categoryName, index) => (
                                            <li className='nav-item' key={index}>
                                                <a
                                                    onClick={() => handleCategoryClick(index)}
                                                    className={`nav-link p-0 custom-buttons fs-5 ${index === 0 && "active"}`}>
                                                    {categoryName}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                        </ul>
                    </div>
                    <div className=' container d-flex'>
                        <div className='row'>
                            {
                                (lekovi === undefined || lekovi === null) ? <MainLoader /> :
                                    lekovi.filter((item: LekModel) => {
                                        return searchValue.toLowerCase() === '' ?
                                            item : item.nazivLeka.toLowerCase().includes(searchValue)
                                    }).map((lek: LekModel, index: number) => (



                                        <LekoviCard lek={lek} key={index} />
                                    ))
                            }
                        </div>
                    </div>
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
        </>
    )
}

export default LekoviLista