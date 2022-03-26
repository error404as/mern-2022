import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';


const CreatePage = () => {
    const [link, setLink] = useState('');
    const { request } = useHttp();
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const keydownHandler = async (e) => {
        if(e.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` });
                console.log(data);
                navigate('/detail/'+data.link._id);
            } catch (e) {}
        }
    }
    return (
        <div>
            Create page
            <div>
                <input type="text" placeholder="link" value={link}
                    onChange={(e) => setLink(e.target.value)}
                    onKeyDown={keydownHandler}
                />
            </div>
        </div>
    )
}

export default CreatePage;
