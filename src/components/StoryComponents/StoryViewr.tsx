import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Progressbar from "./Progressbar";

interface Story {
  image: string;
}

interface StoryViewerProps {
  stories: Story[];
}

const StoryViewr: React.FC<StoryViewerProps> = ({ stories }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const handleNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
      setActiveIndex(activeIndex + 1);
    } else if (currentStoryIndex === stories.length - 1) {
      setCurrentStoryIndex(0);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextStory();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentStoryIndex]);
  return (
    <div className="relative w-full">
      <StoryViewerContainer>
        <StoryImage src={stories?.[currentStoryIndex].image} />
        <div className="absolute top-0 flex w-full">
          {stories.map((item, index) => (
            <Progressbar
              key={index}
              duration={3000}
              index={index}
              activeIndex={activeIndex}
            />
          ))}
        </div>
      </StoryViewerContainer>
    </div>
  );
};

export default StoryViewr;

const StoryViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

const StoryImage = styled.img`
  max-height: 90vh;
  object-fit: contain;
`;
