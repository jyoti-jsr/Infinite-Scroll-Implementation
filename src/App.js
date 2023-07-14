import "./App.css";
import axios from "axios";
import Post from "./components/post/Post";
import { useState, useEffect } from "react";
import Spinner from "./components/Spinner/Spinner";

const list = [
  "JavaScript",
  "TypeScript",
  "CoffeeScript",
  "PHP",
  "Python",
  "Go",
  "Ruby",
  "Java",
  "C#",
  "C++",
];

function App() {
  const [data, setData] = useState([]);
  // const [currentPage] = useState(list);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingPage, setLoadingPage] = useState(true);

  // const postsPerPage = 4;
  // const totalPages = Math.ceil(data.length / postsPerPage);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${currentPage}`
      );
      const resData = await res.data.nodes;
      console.log(resData);
      setData((prev) => [...prev, ...resData]);
      // setTimeout(() => {
      setLoadingPage(false);
      // }, 5000);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // const prev = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const next = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const from = (currentPage - 1) * postsPerPage;
  // const upTo = from + postsPerPage;
  const handleScroll = (e) => {
    const isAtBottom =
      window.innerHeight + window.scrollY + 2 >=
      document.documentElement.scrollHeight;

    if (isAtBottom) {
      e.preventDefault();
      console.log("Scrollbar reached the bottom");
      setCurrentPage((prev) => prev + 1);
      setLoadingPage(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(currentPage);

  return (
    <>
      {
        // loadingPage ? (
        //   <Spinner />
        // ) : (
        data.length &&
          data
            // .slice(from, upTo)
            .map((post, index) => (
              <Post
                key={post.node.author_name}
                title={post.node.title}
                img={post.node.ImageStyle_thumbnail}
              />
            ))
        // )
      }
    </>
  );
}

export default App;
