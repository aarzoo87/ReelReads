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
  Anchor,
} from "@mantine/core";
import HeaderMenu from "./HeaderMenu";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";

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
  const [searchMovieText, setSearchMovieText] = useState("");
  const [originalMovieList, setOriginalMovieList] = useState([]);
  const [recentWatchList, setRecentWatchList] = useState([]);
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

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
    setRecentWatchList((prev) => [...prev, movieDetail]);
    setSelectedMovie(movieDetail);
    openMovieModal();
  };

  useEffect(() => {
    if (recentWatchList.length > 0) {
      const storedList = localStorage.getItem("movieList");
      const parsedStoredList = storedList ? JSON.parse(storedList) : [];
      const mergedList = [...parsedStoredList];
      recentWatchList.forEach((newMovie) => {
        const alreadyExists = mergedList.find(
          (movie) => movie.id === newMovie.id,
        );
        if (!alreadyExists) {
          mergedList.unshift(newMovie);
        }
      });

      localStorage.setItem("movieList", JSON.stringify(mergedList));
    }
  }, [recentWatchList]);

  const handleSeachMovies = (value) => {
    setSearchMovieText(value.currentTarget.value);
    let searchableMovieList = originalMovieList.filter((movie) =>
      movie.title
        .toLowerCase()
        .includes(value.currentTarget.value.toLowerCase()),
    );
    setMoviesList(searchableMovieList);
  };

  const toggleFavorite = (newMovie) => {
    const storedList = localStorage.getItem("favoriteMovieList");
    const parsedStoredList = storedList ? JSON.parse(storedList) : [];
    const mergedList = [...parsedStoredList];
    const alreadyMovieExists = mergedList.find(
      (movie) => movie.id === newMovie.id,
    );
    if (!alreadyMovieExists) {
      mergedList.push(newMovie);
    }
    console.log("mergedList", mergedList);
    setFavoriteMovieList(mergedList);
    localStorage.setItem("favoriteMovieList", JSON.stringify(mergedList));
  };

  const headers = [
    "Preview",
    "Title",
    "Vote Average",
    "Release Date",
    "Action",
  ];

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: "1263df9fc79b5bbd8d55997b833c061e",
          region: "IN",
          sort_by: "popularity.desc",
          with_original_language: "hi",
        },
      })
      .then((res) => {
        setMoviesList(res.data.results);
        setOriginalMovieList(res.data.results);
      })
      .catch((err) => console.error(err));
    const storedList = localStorage.getItem("favoriteMovieList");
    const parsedStoredList = storedList ? JSON.parse(storedList) : [];
    setFavoriteMovieList(parsedStoredList);
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
              <TextInput
                placeholder="Search movies..."
                value={searchMovieText}
                onChange={handleSeachMovies}
                w={250}
              />
            </Group>
          </Group>
          <Divider my="md" />
          <Title order={3} mb={15}>
            🎬 Movie Spotlight
          </Title>
          {selectedType === "grid" &&
            moviesList?.map((movie) => (
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
                        leftSection={
                          favoriteMovieList.some(
                            (fav) => fav.id === movie.id,
                          ) ? (
                            <IconHeartFilled />
                          ) : (
                            <IconHeart />
                          )
                        }
                        variant={
                          favoriteMovieList.some((fav) => fav.id === movie.id)
                            ? "light"
                            : "outline"
                        }
                        size="xs"
                        compact
                        onClick={() => toggleFavorite(movie)}
                      >
                        {favoriteMovieList.some((fav) => fav.id === movie.id)
                          ? "Favorited"
                          : "Add to Favorites"}
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

          {selectedType === "list" && (
            <Box w="100%" style={{ minWidth: 1100 }}>
              {/* Header Row */}
              <Group gap="sm" wrap="nowrap" px="sm" py="xs" bg="gray.1">
                {headers.map((header) => (
                  <Box
                    key={header}
                    w={header.includes("Title") ? "25%" : "14%"}
                  >
                    <Text
                      size="sm"
                      fw={600}
                      tt="uppercase"
                      c="gray.7"
                      ta="center"
                    >
                      {header}
                    </Text>
                  </Box>
                ))}
              </Group>

              <Divider />

              {/* Data Rows */}
              <ScrollArea h={500} type="auto">
                <Stack spacing={0}>
                  {moviesList?.map((movie, i) => (
                    <Box key={i} bg={i % 2 === 0 ? "white" : "gray.0"}>
                      <Group
                        gap="sm"
                        wrap="nowrap"
                        px="sm"
                        py={10}
                        align="center"
                      >
                        <Box w="14%">
                          <Anchor
                            href={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            target="_blank"
                            size="sm"
                            c="blue"
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            Preview
                          </Anchor>
                        </Box>
                        <Box w="25%">
                          <Text size="sm" truncate fw={600} ta="center">
                            {movie.title}
                          </Text>
                        </Box>
                        <Box
                          w="14%"
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Badge
                            color="blue"
                            variant="light"
                            size="lg"
                            mx="auto"
                          >
                            ⭐ {movie.vote_average}
                          </Badge>
                        </Box>
                        <Box w="14%">
                          <Text size="sm" ta="center">
                            {movie.release_date}
                          </Text>
                        </Box>
                        <Box w="25%">
                          <Group gap="xs" justify="start">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleViewMovie(movie)}
                            >
                              View Details
                            </Button>

                            <Button
                              leftSection={
                                false ? (
                                  <IconHeartFilled size={14} />
                                ) : (
                                  <IconHeart size={14} />
                                )
                              }
                              variant={false ? "light" : "outline"}
                              size="xs"
                              compact
                              // onClick={() => toggleFavorite(movie)}
                            >
                              {true ? "Favorited" : "Add to Favorites"}
                            </Button>
                          </Group>
                        </Box>
                      </Group>
                      <Divider />
                    </Box>
                  ))}
                </Stack>
              </ScrollArea>
            </Box>
          )}
        </Container>
      </Card>
    </>
  );
}

export default Home;
