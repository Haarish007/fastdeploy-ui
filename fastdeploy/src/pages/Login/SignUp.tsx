
// import  { useState } from "react";
// import { TextInput, PasswordInput, Button, Title, Text, Box } from "@mantine/core";
// import { useDisclosure } from "@mantine/hooks";
// import { apiCall } from "../../api/axios";
// import { notifications } from "@mantine/notifications";
// import { IconX } from "@tabler/icons-react";
// import useAuthStore from "../Store/useAuthStore";
// import { URL } from "../../api/serverUrl";
// const SignUp = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [visible, { toggle }] = useDisclosure(false);
//   const { saveAuth  } = useAuthStore.getState();
 
  
//   const handleSignUp = async () => {
//     setLoading(true);
//     try {
//       const response = await apiCall.post(URL.signUp, {
//         name,
//         email,
//         password,
//       });

//       saveAuth(response.data);
//     } catch (error) {
//        notifications.show({
//               title: 'Error',
//               message: 'SignUp failed. Please Try Again.',
//               color: 'red',
//               icon: <IconX size={16} />,
//             });
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleKeyDown = (event:any) => {
//     if (event.key === "Enter") {
//       handleSignUp();
//     }
//   };

//   return (
//    <></>
//   );
// };

// export default SignUp;

"use client"

import { useState } from "react"
import { TextInput, PasswordInput, Button, Title, Text, Paper, Anchor, Container } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { apiCall } from "../../api/axios"
import { notifications } from "@mantine/notifications"
import { IconX } from "@tabler/icons-react"
import useAuthStore from "../Store/useAuthStore"
import { URL } from "../../api/serverUrl"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [visible, { toggle }] = useDisclosure(false)
//   const { saveAuth } = useAuthStore.getState()

  const handleSignUp = async () => {
    setLoading(true)
    try {
      const response = await apiCall.post(URL.signUp, {
        name,
        email,
        password,
      })

      if(response.status === 'success') {
        toast.success(response.message)
      }

    //   saveAuth(response.data)
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "SignUp failed. Please Try Again.",
        color: "red",
        icon: <IconX size={16} />,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      handleSignUp()
    }
  }

  return (
    <Container size="xs" px="xs">
      <Paper radius="md" p="xl" withBorder mt={50}>
        <Title order={2} ta="center" mt="md" mb={30}>
          Create an account
        </Title>

        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          required
          mb="md"
          onKeyDown={handleKeyDown}
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          visible={visible}
          onVisibilityChange={toggle}
          required
          mb="md"
          onKeyDown={handleKeyDown}
        />

        <Button fullWidth mt="xl" onClick={handleSignUp} loading={loading}>
          Create account
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor component={Link} to="/login">
            Sign in
          </Anchor>
        </Text>
      </Paper>
    </Container>
  )
}

export default SignUp

