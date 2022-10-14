import Form from "../components/form";
import Article from "../components/salesArticle";
import { useGlobalContext } from "../contexts/saleContext";

const Home = () => {
  const { sales } = useGlobalContext();

  return (
    <div className="home">
      {/* body */}
      <div className="container">
        {/* sales */}
        <div className="sales">
          {sales &&
            sales.map((sale, index) => <Article key={index} sale={sale} />)}
        </div>

        {/* form */}
        <Form />
      </div>
    </div>
  );
};

export default Home;
