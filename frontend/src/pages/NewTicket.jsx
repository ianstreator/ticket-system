import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate]);

  const onSubmit = (e) => {
    e.preventDefault;

    dispatch(createTicket({ product, description }));
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <BackButton url={"/"}/>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            disabled
            type="text"
            value={user.name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            disabled
            type="text"
            value={user.email}
            className="form-control"
          />
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={({ target: { value } }) => setProduct(value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="iPod">iPod</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Describe the issue</label>
            <textarea
              name="description"
              id="description"
              placeholder="( Description required )"
              value={description}
              onChange={({ target: { value } }) => setDescription(value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewTicket;
