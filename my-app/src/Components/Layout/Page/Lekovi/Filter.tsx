
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useGetLekoviQuery } from '../../../../API/LekItemApi';
function Filter() {
    const getLekovi = useGetLekoviQuery(["", 1, 2]);
    const pressedEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter'){
            
        }
    }
    
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='searchbar'>
                        <InputGroup onKeyDown={pressedEnter}>
                            <FormControl placeholder="Search..." className='my-2'></FormControl>
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
                            <Dropdown.Item href="#/action-1">Best sellers</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Price: Low to High</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Price: High to Low</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className='col-md my-2 mx-md-5'>
                    <div className='show'>
                        <DropdownButton id="dropdown-primary-button" variant="secondary" title="Show">
                            <Dropdown.Item href="#/action-1">2</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">4</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">6</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
            </div>
        </div >
    );
}
export default Filter;
