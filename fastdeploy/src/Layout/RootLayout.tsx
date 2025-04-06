import { AppShell, Box, Container, Group, Image, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";
import rocketIcon from '../assets/rocket.png'
import pentafoxIcon from '../assets/pentafox_whiteIcon.svg'
const RootLayout = () => {
  return (
    <AppShell
      padding={0}
      styles={{
        root: {
          height: '100vh',
          overflow: 'hidden',
        },
        main: {
          background: '#fff5f5',
          height: 'calc(100vh - 120px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >

      <AppShell.Header
        style={{
          borderBottom: '1px solid #9B9B9B',
          backgroundColor: '#e35237',
          position: 'relative',
        }}
      >
        <Container
          size="xl"
          h={60}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative', 
          }}
        >
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              src={pentafoxIcon}
              alt="Pentafox Logo"
              width={30}
              height={30}
            />
          </Box>

          <Box style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}>
            <Group gap="xs" wrap="nowrap" style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Group gap="xs" wrap="nowrap">
                <Text
                  style={{
                    fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                    fontWeight: 600,
                    color: "#fff",
                    whiteSpace: 'nowrap',
                    lineHeight: 1.2,
                  }}
                >
                  Pentafox Deploy Zone
                </Text>
                <Image
                mt={10}
                  src={rocketIcon}
                  alt="Rocket Icon"
                  width={30}
                  height={30}
                />
              </Group>
              <Text
                size={'10px'}
                c="white"
                style={{
                  whiteSpace: 'nowrap',
                  marginLeft: '80px',
                  marginTop: -10,
                  fontWeight: 500,
                }}
              >
                - Automate. Accelerate. Deploy.
              </Text>
            </Group>
          </Box>

          <Box style={{ width: 30 }} />
        </Container>
      </AppShell.Header>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />
      <AppShell.Main
      >
        <Container size={"xl"} style={{ width: '100%', flex: 1, overflow: 'auto' }}>
          <Outlet />
        </Container>
      </AppShell.Main>

    </AppShell>
  );
};

export default RootLayout;
