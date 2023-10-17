import { Wrapper } from "./components/Wrapper";
import { Greeting } from "./components/Greeting";
import { Card } from "./components/Card";

const Home = () => {
  return (
    <main>
      <Wrapper>
        <Greeting />
      </Wrapper>
    </main>
  );
};

export default Home;
