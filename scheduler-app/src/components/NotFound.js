import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - page not found</h1>
            <p>go back to <Link to='/'>home</Link></p>
        </div>
    );
}
 
export default NotFound;