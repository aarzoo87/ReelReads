import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import {
  Container,
  MultiSelect,
  Group,
  Select,
  Text,
  Title,
  Radio,
  Card,
  Divider,
  TextInput,
  Modal,
  Button,
  ScrollArea,
  Image,
  Badge,
  Stack,
  Box,
  Table,
  Grid,
  Anchor,
} from "@mantine/core";
import HeaderMenu from "./HeaderMenu";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoCircle,
} from "@tabler/icons-react";

function Home() {
  const [moviesList, setMoviesList] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieOpened, { open: openMovieModal, close: closeMovieModal }] =
    useDisclosure(false);

  const handleViewMovie = (movieDetail) => {
    setSelectedMovie(movieDetail);
    openMovieModal();
  };

  useEffect(() => {
    const favoriteMovieList =
      JSON.parse(localStorage.getItem("favoriteMovieList")) || [];
    setMoviesList(favoriteMovieList);
  }, []);

  return (
    <>
      <HeaderMenu />
      <Modal
        opened={movieOpened}
        onClose={closeMovieModal}
        title={selectedMovie?.title || "Movie Details"}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        size="700px"
      >
        {selectedMovie && (
          <>
            <Image
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}
              alt={selectedMovie.title}
              radius="md"
              mb="sm"
            />
            <Text size="sm" fw={500}>
              {selectedMovie.overview}
            </Text>
            <Text size="xs" mt="sm">
              Original Language:{" "}
              {selectedMovie.original_language === "hi" ? "Hindi" : "Hindi"}
            </Text>
            <Text size="xs" mt="sm">
              ⭐ {selectedMovie.vote_average} | Released:{" "}
              {selectedMovie.release_date}
            </Text>
            {selectedMovie.adult && (
              <Badge color="red" variant="filled" size="xs">
                18+
              </Badge>
            )}
            <Button
              mt="md"
              variant="light"
              color="orange"
              onClick={closeMovieModal}
            >
              Close
            </Button>
          </>
        )}
      </Modal>
      <Card shadow="md" radius="md" p="lg" withBorder mb="xl">
        <Container size="xl" py="lg">
          <Title order={3} mb={15}>
            🎬 Favorite Movie Spotlight
          </Title>
          {moviesList?.map((movie) => (
            <Card shadow="md" padding="lg" radius="md" withBorder mb="md">
              <Group noWrap spacing="md">
                <Box style={{ width: 180 }}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    radius="md"
                    height={180}
                  />
                </Box>

                <Stack spacing="xs" align="stretch" style={{ flex: 1 }}>
                  <Group justify="space-between" align="center" w="100%">
                    <Group gap="sm">
                      <Text fw={700} fz="lg">
                        {movie.title}
                      </Text>
                      <Badge color="blue" variant="light">
                        ⭐ {movie.vote_average}
                      </Badge>
                    </Group>
                  </Group>

                  <Text size="sm" color="dimmed" lineClamp={3}>
                    {movie.overview}
                  </Text>

                  <Text size="xs" color="gray">
                    Release Date: {movie.release_date}
                  </Text>

                  <Button
                    variant="light"
                    mt="xs"
                    size="xs"
                    color="orange"
                    onClick={() => handleViewMovie(movie)}
                  >
                    View Details
                  </Button>
                </Stack>
              </Group>
            </Card>
          ))}
        </Container>
      </Card>
    </>
  );
}

export default Home;
