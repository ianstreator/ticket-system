import { useSelector, useDispatch } from "react-redux";
import { getTicket, reset } from "../features/tickets/ticketSlice";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Ticket() {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  const { ticketId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getTicket(ticketId));
  }, [isError, message, ticketId]);

  return <div>Ticket</div>;
}

export default Ticket;
