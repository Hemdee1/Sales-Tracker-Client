import { formatDistanceToNow } from "date-fns";
import { useGlobalContext } from "../contexts/saleContext";

const Article = ({ sale }) => {
  const { deleteSale } = useGlobalContext();
  const { price, quantity, title, createdAt, _id, img } = sale;

  return (
    <article>
      <div>
        <h1>{title}</h1>
        <h4 className="price">
          Price: <span>#{price}</span>
        </h4>
        <h4>
          Quantity: <span>{quantity}</span>
        </h4>
        <h4>
          Total: <span>#{price * quantity}</span>
        </h4>
        <span className="time">
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </span>
      </div>
      {img.length > 0 && <img src={`http://localhost:5000/${img[0]}`} alt="" />}
      <button onClick={() => deleteSale(_id)}>
        <svg
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 30 30"
          width="25px"
          height="25px"
        >
          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
        </svg>
      </button>
    </article>
  );
};

export default Article;
