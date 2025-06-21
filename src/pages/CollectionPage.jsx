import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import {
  Container,
  Group,
  Text,
  Title,
  Card,
  Modal,
  Button,
  Image,
  Badge,
  Stack,
  Box,
  Radio,
} from "@mantine/core";
import HeaderMenu from "./HeaderMenu";

function Collection() {
  const [moviesList, setMoviesList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieOpened, { open: openMovieModal, close: closeMovieModal }] =
    useDisclosure(false);
  const [selectedMovieType, setSelectedMovieType] = useState("1");

  const handleViewMovie = (movieDetail) => {
    setSelectedMovie(movieDetail);
    openMovieModal();
  };

  useEffect(() => {
    const params = {
      api_key: "1263df9fc79b5bbd8d55997b833c061e",
      with_original_language: "hi",
    };

    if (selectedMovieType === "1") {
      params.sort_by = "popularity.desc";
    } else if (selectedMovieType === "2") {
      params.sort_by = "vote_average.desc";
      params["vote_count.gte"] = 100;
    } else if (selectedMovieType === "3") {
      params["with_genres"] = 35;
      params["vote_count.gte"] = 6;
    } else if (selectedMovieType === "4") {
      params["with_genres"] = 10749;
      params["vote_count.gte"] = 10;
    } else if (selectedMovieType === "5") {
      params["with_genres"] = 28;
      params["vote_count.gte"] = 10;
    }
    axios
      .get("https://api.themoviedb.org/3/discover/movie", {
        params: params,
      })
      .then((res) => {
        setMoviesList(res.data.results);
      })
      .catch((err) => console.error(err));
  }, [selectedMovieType]);

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
          <Title order={4} mb="md">
            Choose Category
          </Title>

          <Radio.Group
            name="adultContent"
            value={selectedMovieType}
            onChange={setSelectedMovieType} // make sure you handle state
          >
            <Stack spacing="sm">
              <Radio value="1" label="🎬 Trending Movies" />
              <Radio value="2" label="⭐ Top Rated Movies" />
              <Radio value="3" label="😊 Feel-Good Comedies" />
              <Radio value="4" label="❤️ Romantic Movies" />
              <Radio value="5" label="🔥 Action Movies" />
            </Stack>
          </Radio.Group>

          {selectedMovieType && (
            <Title order={3} mt="xl">
              {selectedMovieType === "1" && "🎬 Trending Movies"}
              {selectedMovieType === "2" && "⭐ Top Rated Movies"}
              {selectedMovieType === "3" && "😊 Feel-Good Comedies"}
              {selectedMovieType === "4" && "❤️ Romantic Movies"}
              {selectedMovieType === "5" && "🔥 Action Movies"}
            </Title>
          )}
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

export default Collection;
