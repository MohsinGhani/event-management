import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure()

export default message => toast.warning(message);