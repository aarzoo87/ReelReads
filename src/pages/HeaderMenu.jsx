import { Box, Container, Group, ActionIcon, Text, rem } from "@mantine/core";
import { IconBell, IconSun, IconMoon } from "@tabler/icons-react";
import { useMantineColorScheme } from "@mantine/core";
import { Link } from "react-router-dom";

function HeaderMenu() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        height: rem(60),
        display: "flex",
        alignItems: "center",
        borderBottom: `1px solid ${
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
        }`,
      })}
    >
      <Container size="xl" px="md" style={{ width: "100%" }}>
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Left Side - Logo + Nav */}
          <Group gap="md" align="center" wrap="nowrap">
            <img src="/logo192.png" alt="Logo" style={{ height: rem(30) }} />
            <Group gap="sm" wrap="nowrap">
              {["Dashboard", "Favorites", "Categories", "Recent", "About"].map(
                (item) => (
                  <Text
                    key={item}
                    component={Link}
                    to={`/${item.toLowerCase() === "dashboard" ? "" : item.toLowerCase()}`}
                    fw={500}
                    size="sm"
                    sx={(theme) => ({
                      color:
                        theme.colorScheme === "dark"
                          ? theme.colors.gray[0]
                          : theme.colors.dark[6],
                      textDecoration: "none",
                      "&:hover": {
                        color:
                          theme.colorScheme === "dark"
                            ? theme.white
                            : theme.black,
                      },
                    })}
                  >
                    {item}
                  </Text>
                ),
              )}
            </Group>
          </Group>

          {/* Right Side - Icons */}
          <Group gap="xs" align="center" wrap="nowrap">
            <ActionIcon variant="default" size="lg">
              <IconBell size={18} />
            </ActionIcon>

            <ActionIcon
              variant="default"
              size="lg"
              onClick={toggleColorScheme}
              title="Toggle color scheme"
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
