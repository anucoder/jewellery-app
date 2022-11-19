import Header from "../Header";
import Category from "./Category";
import Container from "../Container";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <>
      <Header cartChanged={-1}/>
      <div className="background"></div>
      <Container className="relative">
        <div className="absolute bg-quote">
            <q className="quote-text">
              Jewelry is a very personal thing... it should tell a story about
              the person who’s wearing it.
            </q>
            <div className="quote-author">
              <p>-Garance Daré</p>
              <p>(fashion blogger, photographer, author, and
            illustrator)</p></div>
        </div>
        <Category />
        <Testimonials />
      </Container>
      <Footer/>
    </>
  );
};

export default HomePage;
