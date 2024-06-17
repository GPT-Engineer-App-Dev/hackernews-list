import { Container, Text, VStack, Box, Link, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Index = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then((response) => response.json())
      .then((storyIds) => {
        const topFiveStoryIds = storyIds.slice(0, 5);
        return Promise.all(
          topFiveStoryIds.map((id) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((response) => response.json())
          )
        );
      })
      .then((stories) => setStories(stories));
  }, []);

  return (
    <Container centerContent maxW="container.md" p={4}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Top 5 Hacker News Stories
        </Heading>
        {stories.map((story) => (
          <Box key={story.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Heading as="h2" size="md" mb={2}>
              {story.title}
            </Heading>
            <Text mb={2}>Upvotes: {story.score}</Text>
            <Link href={story.url} color="teal.500" isExternal>
              Read more
            </Link>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;