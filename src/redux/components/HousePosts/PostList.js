import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../../services/PostService";
import _ from "lodash";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import HouseDetailModal from "../Modal/HouseDetailModal"; // Import modal chi tiết nhà
import "./PostList.scss";
import { faStar } from "@fortawesome/free-regular-svg-icons";

const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [selectedHouseId, setSelectedHouseId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Kiểm soát modal

  useEffect(() => {
    callFetchAllPosts();
  }, []);

  const callFetchAllPosts = async () => {
    let response = await fetchAllPosts();
    if (response && response.data && +response.data.EC === 0) {
      const _posts = _.cloneDeep(response.data.DT);
      setPosts(_posts);
    }
  };

  // ✅ Xử lý mở modal khi click vào bài đăng
  const handleClickOnPost = (house_id) => {
    setSelectedHouseId(house_id);
    setIsModalOpen(true); // Hiển thị modal
  };

  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.house_id}
          className={props.isOpenMap ? "small-card mb-2" : "medium-card mb-2"}
          style={{ cursor: "pointer" }}
          onClick={() => handleClickOnPost(post.house_id)} // Hiển thị modal khi click
        >
          <Row>
            <Col md={4} className="left-side2">
              <img
                src={post.image}
                className="img-fluid rounded px-1"
                alt="House"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "170px",
                }}
              />
            </Col>
            <Col md={8} className="right-side2">
              <Card.Body>
                <h4 className="title-font">{post.house_name}</h4>
                <p className="highlight-font">
                  <FontAwesomeIcon icon={faDollarSign} /> Giá: {post.cost}đ - Diện tích: {post.area}m²
                </p>
                <p className="smaller-font lighter-font text-truncate">
                  <FontAwesomeIcon icon={faLocationDot} /> {post.address}
                </p>
                <p className="smaller-font lighter-font text-truncate">
                  <FontAwesomeIcon icon={faStar} /> {post.average_rate}
                </p>
                <p className="smaller-font lighter-font text-truncate">
                  {post.description}
                </p>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}

      {/* ✅ Hiển thị modal đúng cách */}
      <HouseDetailModal
        houseId={selectedHouseId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Ẩn modal khi đóng
      />
    </>
  );
};

export default PostList;
