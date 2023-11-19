import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Swal from 'sweetalert2';
// import { useNavigate } from "react-router-dom";
const Login = () => {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    const history = useHistory();
    // const navigate = useNavigate();
    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Please Fill all the Feilds",
                showConfirmButton: false,
                timer: 2000
            });
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Login Successfully",
                showConfirmButton: false,
                timer: 2000
            });
            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
            // navigate('/chats')
        } catch (error) {
            Swal.fire({
                position: "top-center",
                icon: "warning",
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 2000
            });
            setLoading(false);
        }
    };

    return (
        <VStack spacing="10px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>
        </VStack>
    );
};

export default Login;