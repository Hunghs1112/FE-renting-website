import "./HomePage.scss";
import SearchBar from "../Searchbar/Searchbar";
import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import PostList from "../HousePosts/PostList";

const HomePage = (props) => {
  const [displayMap, setDisplayMap] = useState(true);

  const handleToggleMap = () => {
    if (displayMap) {
      setDisplayMap(false);
    } else {
      setDisplayMap(true);
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="row">
          <div
            className={
              displayMap ? "col-5 border left-side " : "border left-side"
            }
          >
            <SearchBar />
            <Button onClick={() => handleToggleMap()}>Map</Button>
            <hr />
            <Container>
              <PostList />
            </Container>
          </div>
          <div className={displayMap ? "col-7 border right-side" : "d-none"}>
            right Side
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
