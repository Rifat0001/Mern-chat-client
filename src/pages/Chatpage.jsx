import { Box, Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ContextProvider';
import SideDrawer from '../components/microComponents/SideDrawer';
import MyChat from '../components/microComponents/MyChat';
import ChatBox from '../components/microComponents/ChatBox';
const Chatpage = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const { user } = ChatState();
    return (
        <div style={{ width: "100%" }}>
            {user && <SideDrawer />}
            <Box className='main-chat-layout'  >
                {user && <MyChat fetchAgain={fetchAgain} />}
                {user && (
                    <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
                )}
            </Box>
        </div>
    );
};

export default Chatpage;