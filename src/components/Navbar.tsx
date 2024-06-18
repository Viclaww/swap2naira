const Navbar = () => {
  return (
    <div className="px-9 flex  bg-blueZ/10 justify-between py-8  ">
      <img src="/images/S2N.png" className="w-32" alt="logo" />
      <div></div>
      <div className="flex gap-3">
        <button className=" py-3 px-5 text-blueZ rounded-3xl">Sign in</button>
        <button className="py-3 px-5 bg-blueX text-lg text-white rounded-3xl">
          Register
        </button>
      </div>
    </div>
  );
};

export default Navbar;
