import { useState, useEffect, useCallback ,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

const DetailPage = () => {
    const [link, setLink] = useState(null);
    const {id: linkId} = useParams();
    const { request } = useHttp();
    const {token} = useContext(AuthContext);

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${token}` })
            setLink(data);
        } catch (e) {
            
        }
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    return (
        <div>
            Detail page for # {linkId}
            <div>
                {link && (
                    <>
                        <p>
                            Code: {link.code}<br />
                            From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a><br />
                            To: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a><br />
                            Clicks: {link.clicks}
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}

export default DetailPage;
