import { useEffect, useState } from "react";
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Title, 
  Text, 
  Paper, 
  Anchor, 
  Container,
  Grid,
  Image,
  Group,
  Divider,
  Box
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { apiCall } from "../../api/axios";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import useAuthStore from "../Store/useAuthStore";
import { URL } from "../../api/serverUrl";
import toast from "react-hot-toast";
import loginImage from "../../assets/Login-pana.svg";
import signupImage from "../../assets/Sign up-amico.svg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const { saveAuth } = useAuthStore.getState();

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && !username)) {
     toast.error("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const response = await apiCall.post(URL.login, { email, password });
        saveAuth(response.data);
        if (response.data.status === 'error') {
          toast.error(response.data.message);
        }
      } else {
        const response = await apiCall.post(URL.signUp, { username, email, password });
        console.log('response', response);
        
        if (response.data.status === 'success') {
          toast.success(response.data.message);
        }
        else if (response.data.status === 'error') {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: isLogin 
          ? "Login failed. Please check your credentials." 
          : "SignUp failed. Please Try Again.",
        color: "red",
        icon: <IconX size={16} />,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    setEmail('')
    setUsername('')
    setPassword('')
  },[isLogin])

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") handleSubmit();
  };

  return (
  <div style={{ backgroundColor: '#FFF8F5', height: '100vh' }}>
    <Container mt='md' style={{ height: "95vh", display: "flex", alignItems: "center",justifyContent:'center' , borderRadius:'8px', backgroundColor:'' }}>
      <Grid gutter={0} style={{ width: "100%", height: "90vh" }}>
        {isLogin && (
          <Grid.Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: '#D8DDE2', borderRadius:'8px 0px 0px 8px' }}>
            <Box style={{ width: "90%", textAlign: "center" }}>
              <Image 
                src={loginImage} 
                alt="Login illustration" 
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
              <Title order={2}>Welcome Back to the entrance </Title>
              <Text size="lg" mb={10}>Log in to continue</Text>
            </Box>
          </Grid.Col>
        )}

        {!isLogin && (
          <Grid.Col span={6} style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: '#D8DDE2', borderRadius:'8px 0px 0px 8px' }}>
            <Box style={{ width: "90%", textAlign: "center" }}>
              <Image 
                src={signupImage} 
                alt="Signup illustration" 
                style={{ maxHeight: "500px", objectFit: "contain" }}
              />
              <Title order={3} >Join Our Community</Title>
              <Text size="md" mb={10}>Create your account and get started</Text>
            </Box>
          </Grid.Col>
        )}

        <Grid.Col span={6}>
          <Paper withBorder p="xl" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor:'#fff',borderRadius:'0px 8px 8px 0px' }}>
            <Title mb={10} order={2} ta="center">
              {isLogin ? "Welcome back!" : "Create an account"}
            </Title>

            {!isLogin && (
              <TextInput
                label="Full Name"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                required
                mb="xs"
                size="md"
                onKeyDown={handleKeyDown}
                withAsterisk
              />
            )}

            <TextInput
              label="Email Address"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              required
              mb="xs"
              size="md"
              onKeyDown={handleKeyDown}
              withAsterisk
            />

            <PasswordInput
              label="Password"
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              visible={visible}
              onVisibilityChange={toggle}
              required
              mb="xs"
              size="md"
              onKeyDown={handleKeyDown}
              withAsterisk
            />

            <Button 
              fullWidth 
              size="md" 
              onClick={handleSubmit} 
              loading={loading}
              color="#e35237"
            >
              {isLogin ? "Sign in" : "Create account"}
            </Button>

            <Divider 
              labelPosition="center" 
              my="xs" 
            />

            <Text ta="center" mt="xs">
             {!isLogin ? "Already have an account? " : "Don't have an account? "}  
              <Anchor 
                component="button" 
                type="button" 
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign Up" : "Sign in"}
              </Anchor>
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
    </div>
  );
};

export default Login;
