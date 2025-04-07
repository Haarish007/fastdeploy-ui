
// import  { useState } from "react";
// import { TextInput, PasswordInput, Button, Title, Text, Box } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { apiCall } from "../../api/axios";
// import { notifications } from "@mantine/notifications";
// import { IconX } from "@tabler/icons-react";
// import useAuthStore from "../Store/useAuthStore";
// import { URL } from "../../api/serverUrl";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [visible, { toggle }] = useDisclosure(false);
//   const { saveAuth  } = useAuthStore.getState();
 
  
//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await apiCall.post(URL.login, {
//         email,
//         password,
//       });

//       saveAuth(response.data);
//     } catch (error) {
//        notifications.show({
//               title: 'Error',
//               message: 'Login failed. Please check your credentials.',
//               color: 'red',
//               icon: <IconX size={16} />,
//             });
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleKeyDown = (event:any) => {
//     if (event.key === "Enter") {
//       handleLogin();
//     }
//   };

//   return (
//    <></>
//   );
// };

// export default Login;



import { useState } from "react"
import { TextInput, PasswordInput, Button, Title, Text, Paper, Anchor, Container } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { apiCall } from "../../api/axios"
import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"
import useAuthStore from "../Store/useAuthStore"
import { URL } from "../../api/serverUrl"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, { toggle }] = useDisclosure(false)
  const { saveAuth } = useAuthStore.getState()
 const navigate = useNavigate();
  const handleLogin = async () => {
    setLoading(true)
    try {
      const response = await apiCall.post(URL.login, {
        email,
        password,
      })

      saveAuth(response.data)
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Login failed. Please check your credentials.",
        color: "red",
        icon: <IconX size={16} />,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <Container size="xs" px="xs">
      <Paper radius="md" p="xl" withBorder mt={50}>
        <Title order={2} ta="center" mt="md" mb={30}>
          Welcome back!
        </Title>

        <TextInput
          label="Email"
          placeholder="your@email.com"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          required
          mb="md"
          onKeyDown={handleKeyDown}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          visible={visible}
          onVisibilityChange={toggle}
          required
          mb="md"
          onKeyDown={handleKeyDown}
        />

        <Button fullWidth mt="xl" onClick={handleLogin} loading={loading}>
          Sign in
        </Button>

        <Text ta="center" mt="md">
          Don&apos;t have an account?{" "}
          <Anchor onClick={()=>navigate('/sign-up')} >
            Sign Up
          </Anchor>
        </Text>
      </Paper>
    </Container>
  )
}

export default Login

