import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import style from './style.module.scss';
function NotFound() {
  return (
    <div className={style.notfound}>
      <section>
        <div>404 - Page Not Found!</div>
      </section>
      <div className={style.notfound__back_home}>
        <Link to="/">
          <FaHome />
          Back To Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
