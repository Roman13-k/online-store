import React from "react";
import Intro from "../ui/blocks/homepage/intro/Intro";
import Container from "../ui/shared/containers/Container";

export default function HomeScreen() {
  return (
    <>
      <Intro />
      <Container>
        <div>Home</div>
      </Container>
    </>
  );
}
