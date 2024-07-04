import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading";

const Layout = () => {
  const { isLoading } = useQuery({ queryKey: ["authUser"] });

  return (
    <div className="min-h-svh flex flex-col font-default text-neutral overflow-hidden">
      <Navbar />

      {isLoading ? (
        <div className="flex-1 grid place-items-center">
          <Loading />
        </div>
      ) : (
        <div className="flex-1 flex max-w-screen-2xl container mx-auto md:px-20 pt-[calc(68px)] pb-10 px-4">
          <Outlet />
        </div>
      )}

      {/* <Footer /> */}

      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </div>
  );
};

export default Layout;
