import React,  { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { getDocList } from '../../services/firebase/hosts';
import UserContext from '../../contexts/AppContext';


function Users() {
    const { user } = useParams()
    const navigate = useNavigate()
    const userContext = useContext(UserContext)

    useEffect(()=> {
        const userExist = localStorage.getItem("guest_id")
        
        if(userExist) {
            navigate('/')
        }
        else {
            getDocList().then(documents => {
                const users = documents.flatMap(document => document.users.map(user=> ({name: user, guest_id: document.id})))
                const guest = users.find(data => data.name === user)
                localStorage.setItem('guest_id', guest?.guest_id ?? "")
                userContext!.setGuestId(guest?.guest_id || null)
                navigate('/')
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <></>
    );
}

export default Users;
