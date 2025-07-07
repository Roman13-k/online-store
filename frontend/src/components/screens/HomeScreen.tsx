import React from "react";
import Intro from "../ui/blocks/homepage/intro/Intro";
import Container from "../ui/shared/containers/Container";
import NewBooks from "../ui/blocks/homepage/newbooks/NewBooks";
import GreatOffers from "../ui/blocks/homepage/greatoffers/GreatOffers";
import TopBooks from "../ui/blocks/homepage/topbooks/TopBooks";

export default function HomeScreen() {
  return (
    <>
      <Intro />
      <Container>
        <NewBooks />
        <GreatOffers />
        <TopBooks />
      </Container>
    </>
  );
}
