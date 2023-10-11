import { useQuery } from 'react-query';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import TanstackTable from './tanstacktable';
import { Button, Container } from '@mui/material';
// import theme from '../comman/theme';


const CustomHeadersComponent = () => {
    const navigate = useNavigate()
    const LogoutFrom = () => {
        localStorage.clear()
        navigate("/login")
    }

    const token = localStorage.getItem("Token")
    if (!token) {
        navigate("/login")
    }
    let config = {
        headers: {
            authorization: `bearer ${token}`,
        }
    }
    const fetchData = async (key, headers) => {
        const response = await axios.get('http://localhost:3005/api/user/allUser', config);
        return response.data;
    };

    const { isLoading, isError, data } = useQuery(['data'], fetchData);

    if (isLoading) {
        return <>
            <div className='Login_page'>Loading...</div></>
    }

    if (isError) {
        return <>
            <div className='row'>
                <div className='Login_page'>
                    <button className='Logout_btn'>LogOut</button>
                    <div className=''>Error fetching data</div>
                </div>
            </div>
            ;</>
    }

    // Render data
    return <>
        <Container maxWidth="md" sx={{ padding: 10 }}>
            <Button variant="contained" color="primary" onClick={LogoutFrom}>
                LogOut
            </Button>
            <div>
                <h1>Data Table </h1>
                <TanstackTable data={data} />
            </div>
            <div>
            </div>
        </Container></>;
};

export default CustomHeadersComponent;
