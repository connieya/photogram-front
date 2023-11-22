import React from "react";
import StoryViewr from "../../components/StoryComponents/StoryViewr";

const Story = () => {
  const story = [
    {
      image: "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2017/12/17/12/45/football-3024154_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2014/10/14/20/24/football-488714_640.jpg",
    },
    {
      image:
        "https://cdn.pixabay.com/photo/2013/05/02/21/23/basketball-108622_640.jpg",
    },
  ];
  return (
    <div>
      <StoryViewr stories={story} />
    </div>
  );
};

export default Story;
