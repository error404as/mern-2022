import { useState, useEffect, useCallback ,useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const { request, loading } = useHttp();
    const {token} = useContext(AuthContext);

    const getLinks = useCallback(async () => {
        try {
            const data = await request(`/api/link`, 'GET', null, { Authorization: `Bearer ${token}` })
            setLinks(data);
        } catch (e) {
            
        }
    }, [token, request]);

    useEffect(() => {
        getLinks();
    }, [getLinks]);

    return (
        <div>
            Links page
            <div>
                {loading && (<p>Loading</p>)}
                {!loading && !links.length && (<p>No links yet.</p>)}
                {!loading && links.map(el => (
                    <p key={el._id}>
                        [{el.clicks}]: {el.from} <Link to={`/detail/${el._id}`}>detail page</Link>
                    </p>
                ))}
            </div>
        </div>
    )
}

export default LinksPage;
