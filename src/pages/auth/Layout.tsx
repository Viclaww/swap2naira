import { Link } from "react-router-dom";

export default function AuthLayout({
  children,
  desc,
}: {
  children: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="flex bg-blueZ px-3 w-full h-screen justify-center items-center">

      <div className="bg-white gap-4 flex px-4 rounded-lg py-6 flex-col  w-full mx-1 md:w-2/5 items-center">
        <Link to="/">
          <img src="/images/S2N.png" className="w-48 bg-white p-1" alt="logo" />
        </Link>
        <h5 className="font-medium text-center">{desc}</h5>
        <form className="auth-form px-12 flex flex-col w-full gap-3">
          {children}
        </form>
      </div>
    </div>
  );
}
