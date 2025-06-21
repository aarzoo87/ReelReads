import { Box, Container, Group, ActionIcon, rem, Button } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

function HeaderMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Collections", path: "/collections" },
    { label: "Recent", path: "/recent" },
    { label: "About", path: "/about" },
  ];

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
        boxShadow: theme.shadows.xs,
      })}
    >
      <Container size="xl" px="md" py="xs">
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Left Side */}
          <Group gap="lg" align="center" wrap="nowrap">
            <img
              src="/reelreads_logo.png"
              alt="ReelReads Logo"
              style={{ height: rem(36), borderRadius: rem(6) }}
            />

            <Group gap="xs" wrap="nowrap">
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  variant={
                    location.pathname === item.path ? "filled" : "subtle"
                  }
                  color="blue"
                  size="sm"
                  radius="xl"
                >
                  {item.label}
                </Button>
              ))}
            </Group>
          </Group>

          {/* Right Side - Icons */}
          <Group gap="xs">
            <ActionIcon
              variant="light"
              size="lg"
              onClick={toggleColorScheme}
              title="Toggle color scheme"
              color="blue"
            >
              {colorScheme === "dark" ? (
                <IconSun size={18} />
              ) : (
                <IconMoon size={18} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}

export default HeaderMenu;
