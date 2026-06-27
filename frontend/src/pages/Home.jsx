import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import webbg from "../assets/webbg.png";

const Home = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${webbg})` }}
    >
      <Hero />
      <RecentlyAdded />
    </div>
  );
};

export default Home;