import { useState, useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import {
  Container,
  Grid,
  MultiSelect,
  Group,
  Select,
  Text,
  Title,
  Radio,
  Card,
  Divider,
  Flex,
  TextInput,
  Modal,
  Button,
  ScrollArea,
  Image,
  Badge,
  Stack,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import {
  IconChevronDown,
  IconHeart,
  IconHeartFilled,
} from "@tabler/icons-react";

function Home() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAdultContent, setSelecteAdultContent] = useState("yes");
  const [moviesList, setMoviesList] = useState([]);
  const [selectedType, setSelectedType] = useState("grid");
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieOpened, { open: openMovieModal, close: closeMovieModal }] =
    useDisclosure(false);

  const genreOptions = [
    { label: "Action", value: "action" },
    { label: "Comedy", value: "comedy" },
    { label: "Drama", value: "drama" },
    { label: "Romance", value: "romance" },
    { label: "Thriller", value: "thriller" },
    { label: "Horror", value: "horror" },
    { label: "Mystery", value: "mystery" },
    { label: "Documentary", value: "documentary" },
  ];

  const userRatingOptions = [
    { label: "⭐ 1 and up", value: "1" },
    { label: "⭐ 2 and up", value: "2" },
    { label: "⭐ 3 and up", value: "3" },
    { label: "⭐ 4 and up", value: "4" },
    { label: "⭐ 5 (Highest)", value: "5" },
  ];

  const timeRangeOptions = [
    { label: "All Time", value: "-1" },
    { label: "Today", value: "1" },
    { label: "Yesterday", value: "2" },
    { label: "Last 7 days", value: "3" },
    { label: "This Month", value: "4" },
    { label: "Last Month", value: "5" },
    { label: "This Year", value: "6" },
    { label: "Last Year", value: "7" },
    { label: "Custom Range", value: "8" },
  ];

  const handleSelectedLanguage = (value) => {
    setSelectedLanguage(value);
  };

  const handleSelectedGenre = (value) => {
    setSelectedGenre(value);
  };

  const handleSelectedRating = (value) => {
    setSelectedRating(value);
  };

  const handleSelectedTime = (value) => {
    setSelectedTime(value);
  };

  const handleSelectedAdultContent = (value) => {
    setSelecteAdultContent(value);
  };

  const handleViewMovie = (movieDetail) => {
    console.log(movieDetail);
    setSelectedMovie(movieDetail);
    openMovieModal();
  };

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: "1263df9fc79b5bbd8d55997b833c061e",
          region: "IN", // for India
          sort_by: "popularity.desc",
          with_original_language: "hi", // Hindi
        },
      })
      .then((res) => {
        console.log(res.data.results);
        setMoviesList(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <HeaderMenu />
      <Modal
        opened={opened}
        onClose={close}
        title="Filter Movies"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        centered
        size="650px"
      >
        <ScrollArea h={400}>
          <MultiSelect
            data={["Language", "Genre", "Rating", "Time", "Adult Content"]}
            value={selectedFilters}
            onChange={setSelectedFilters}
            label="Select Filter Types"
            placeholder="Choose filters"
            searchable
            clearable
            mb="lg"
            w={600}
            styles={{
              input: {
                cursor: "pointer",
              },
              dropdown: {
                cursor: "pointer",
              },
              item: {
                cursor: "pointer",
              },
              values: {
                cursor: "pointer",
              },
              wrapper: {
                cursor: "pointer",
              },
            }}
          />
          {selectedFilters.includes("Language") && (
            <Select
              data={[
                { label: "Hindi", value: "hi" },
                { label: "English", value: "en" },
                { label: "Gujarati", value: "gu" },
                { label: "Tamil", value: "ta" },
              ]}
              label="Select Language"
              placeholder="Pick one"
              value={selectedLanguage}
              onChange={handleSelectedLanguage}
              mb="lg"
              w={300}
            />
          )}
          {selectedFilters.includes("Genre") && (
            <Select
              data={genreOptions}
              label="Select Genre"
              placeholder="Pick one"
              value={selectedGenre}
              onChange={handleSelectedGenre}
              mb="lg"
              w={300}
            />
          )}
          {selectedFilters.includes("Rating") && (
            <Select
              data={userRatingOptions}
              label="Select Rating"
              placeholder="Pick one"
              value={selectedRating}
              onChange={handleSelectedRating}
              mb="lg"
              w={300}
            />
          )}
          {selectedFilters.includes("Time") && (
            <Select
              data={timeRangeOptions}
              label="Select Time Filter"
              placeholder="Pick one"
              value={selectedTime}
              onChange={handleSelectedTime}
              mb="lg"
              w={300}
            />
          )}
          {selectedFilters.includes("Adult Content") && (
            <Radio.Group
              name="adultContent"
              label="Select Adult Content"
              value={selectedAdultContent}
              onChange={handleSelectedAdultContent}
            >
              <Group mt="xs">
                <Radio value="yes" label="Yes" defaultChecked />
                <Radio value="no" label="No" />
              </Group>
            </Radio.Group>
          )}
        </ScrollArea>
        <Group position="right" mt="md">
          <Button variant="default" onClick={close}>
            Close
          </Button>
          <Button>Apply</Button>
        </Group>
      </Modal>
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
          <Group position="apart" mb="md">
            <Button onClick={open}>Add Filter</Button>
            <Group>
              <Select
                data={[
                  { label: "Grid", value: "grid" },
                  { label: "List", value: "list" },
                ]}
                value={selectedType}
                onChange={setSelectedType}
                w={120}
              />
              <TextInput placeholder="Search movies..." w={250} />
            </Group>
          </Group>

          <Divider my="md" />

          <Title order={3}>Movies List</Title>
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

                    <Button
                      leftSection={true ? <IconHeartFilled /> : <IconHeart />}
                      variant={true ? "light" : "outline"}
                      size="xs"
                      compact
                      // onClick={() => toggleFavorite(movie)}
                    >
                      {true ? "Favorited" : "Add to Favorites"}
                    </Button>
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
