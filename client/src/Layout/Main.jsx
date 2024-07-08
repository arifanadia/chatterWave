import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="container">
            <Outlet/>
            <h1>Hello trying to to fix</h1>
            
        </div>
    );
};

export default Main;