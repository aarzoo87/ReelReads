import React from "react";
import {
  Container,
  Title,
  Text,
  Card,
  Divider,
  Group,
  Image,
  List,
  ThemeIcon,
  Stack,
  Box,
  Anchor,
  Badge,
} from "@mantine/core";
import { IconCheck, IconBrandGithub } from "@tabler/icons-react";
import HeaderMenu from "./HeaderMenu";

const About = () => {
  return (
    <>
      <HeaderMenu />
      <Container size="md" py="xl">
        <Card shadow="md" padding="xl" radius="lg" withBorder>
          <Stack spacing="lg">
            {/* Logo or Image */}
            <Group position="center">
              <Image
                src="/reelreads_logo.png"
                alt="App Logo"
                width={80}
                height={80}
                radius="md"
              />
            </Group>

            {/* Title & Description */}
            <Box>
              <Title order={2} align="center" mb="sm">
                About Movie & Book Finder
              </Title>
              <Text align="center" size="md">
                A simple app to help you search, explore, and keep track of your
                favorite
                <strong> movies</strong>. Your recent activities are saved
                locally, so you can pick up where you left off.
              </Text>
            </Box>

            <Divider />

            {/* Features List */}
            <Box>
              <Title order={4} mb="xs">
                🚀 Features
              </Title>
              <List
                spacing="xs"
                size="sm"
                icon={
                  <ThemeIcon color="teal" size={20} radius="xl">
                    <IconCheck size={14} />
                  </ThemeIcon>
                }
              >
                <List.Item>Search movies instantly</List.Item>
                <List.Item>Maintain a recent watch/read list</List.Item>
                <List.Item>Fast, responsive UI using Mantine</List.Item>
                <List.Item>Dark mode friendly</List.Item>
                <List.Item>Data stored locally – no account needed</List.Item>
              </List>
            </Box>

            {/* Tech Stack */}
            <Box>
              <Title order={4} mb="xs">
                🛠 Built With
              </Title>
              <Group spacing="sm">
                <Badge color="blue" variant="light">
                  React
                </Badge>
                <Badge color="grape" variant="light">
                  Mantine
                </Badge>
                <Badge color="teal" variant="light">
                  LocalStorage
                </Badge>
              </Group>
            </Box>

            <Divider />

            {/* Developer Info */}
            <Box>
              <Text size="sm" align="center" color="dimmed">
                Developed with ❤️ by <Anchor href="#">Aarzoo Agrawal</Anchor>
              </Text>
            </Box>
          </Stack>
        </Card>
      </Container>
    </>
  );
};

export default About;
