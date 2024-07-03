const ProfileSettings = () => {
  return (
    <>
      <form className="flex text-xl gap-6 h-full justify-center w-full flex-col">
        <input
          className=" px-3 py-5 rounded-full bg-blueZ/60 text-black placeholder:text-black outline-none"
          placeholder="Name"
          type="text"
        />
        <input
          className=" px-3 py-5 rounded-full bg-blueZ/60 text-black placeholder:text-black outline-none"
          placeholder="Username"
          type="text"
        />
        <input
          className=" px-3 py-5 rounded-full bg-blueZ/60 text-black placeholder:text-black outline-none"
          placeholder="Phone Number"
          type="number"
        />
      </form>
    </>
  );
};

export default ProfileSettings;
