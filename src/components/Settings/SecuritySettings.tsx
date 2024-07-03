const SecuritySettings = () => {
  const securityTabs = [
    { name: "Change Password" },
    { name: "Change Withdraw Pin" },
  ];
  return (
    <div className="places flex flex-col gap-5  px-10 text-black">
      {securityTabs.map(({ name }, index) => (
        <div
          className="flex text-black bg-blueX/10 rounded-full items-center gap-6 cursor-pointer px-4 py-5"
          key={index}
        >
          {/* {icon(35)} */}
          <span className="text-xl font-medium">{name} </span>
        </div>
      ))}
    </div>
  );
};

export default SecuritySettings;
