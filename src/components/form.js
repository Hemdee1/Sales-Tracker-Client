import { useEffect, useRef } from "react";
import { useGlobalContext } from "../contexts/saleContext";

const Form = () => {
  const { addSale, error } = useGlobalContext();
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = formRef.current.title.value.trim();
    const price = formRef.current.price.value.trim();
    const quantity = formRef.current.quantity.value.trim();
    const img = formRef.current.img.files;

    const sale = { title, price, quantity };

    const formData = new FormData();
    Object.keys(sale).forEach((key) => formData.append(key, sale[key]));

    for (let i = 0; i < img.length; i++) {
      formData.append("img", img[i]);
    }

    addSale(formData);
  };

  useEffect(() => {
    if (error?.length === 0) {
      formRef.current.reset();
    }
  }, [error]);

  return (
    <form className="add" onSubmit={handleSubmit} ref={formRef}>
      <h1>Add a new sale</h1>
      <div className="form-control">
        <h1>Title:</h1>
        <input
          type="text"
          name="title"
          className={error?.includes("title") ? "error" : ""}
        />
      </div>
      <div className="form-control">
        <h1>Price:</h1>
        <input
          type="number"
          name="price"
          className={error?.includes("price") ? "error" : ""}
        />
      </div>
      <div className="form-control">
        <h1>Quantity:</h1>
        <input
          type="number"
          name="quantity"
          className={error?.includes("quantity") ? "error" : ""}
        />
      </div>
      <div className="form-control">
        <h1>Image:</h1>
        <input
          type="file"
          name="img"
          multiple
          className={error?.includes("quantity") ? "error" : ""}
        />
      </div>
      {error?.length > 0 && (
        <span className="error">Please input the required fields</span>
      )}
      <button className="btn">Submit</button>
    </form>
  );
};

export default Form;
