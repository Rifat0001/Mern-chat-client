import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';
const Chatpage = () => {
    const fetchChats = async () => {
        const data = await axios.get('api/chat');
        console.log(data)
    }
    useEffect(() => {
        fetchChats()
    }, [])
    return (
        <div>
            <Button colorScheme='blue'>chat</Button>
        </div>
    );
};

export default Chatpage;