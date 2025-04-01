import { AppShell, Box, Container, Text } from "@mantine/core";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <AppShell
      header={{ height: 50 }}
      padding={0}
      styles={{
        root: {
          height: '100vh',
          overflow: 'hidden',
        },
        main: {
          background: 'none',
          height: 'calc(100vh - 120px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <AppShell.Header style={{ borderBottom: '1px solid #9B9B9B' }} >
        <Container size='xl' h={50} style={{ display: "flex", justifyContent: "space-between" }}>
          <Box style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "95%" }}>
            <Box style={{ display: "flex", justifyContent: "center", width: '100%' }}>
              <Text style={{ fontSize: 24, fontWeight: 600, color: "dark" }}>
                Pentafox Web Service
              </Text>
            </Box>
          </Box>
        </Container>
      </AppShell.Header>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#fff5f5',
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
