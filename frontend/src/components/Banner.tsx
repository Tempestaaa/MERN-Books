import { Mail } from "lucide-react";
import banner from "../assests/banner.png";

const Banner = () => {
  return (
    <div className="flex md:flex-row w-full gap-2 flex-col-reverse items-center">
      {/* LEFT */}
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div className="space-y-12">
          <h1 className="capitalize text-4xl font-bold">
            Welcome here to learn something{" "}
            <span className="text-secondary">new everyday!!!</span>
          </h1>
          <p className="text-xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat,
            reprehenderit optio! Autem libero nobis non eos ut sunt, rerum
            quibusdam obcaecati magnam ea, natus et maxime maiores nisi, commodi
            iste.
          </p>
        </div>

        <form>
          <label className="input input-bordered flex items-center gap-2">
            <Mail className="opacity-70" />
            <input type="text" className="grow" placeholder="Email" />
          </label>
          <button className="btn btn-secondary mt-3">Login</button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2">
        <img
          src={banner}
          alt="Banner"
          className="w-full lg:w-3/4 h-full mx-auto"
        />
      </div>
    </div>
  );
};

export default Banner;
