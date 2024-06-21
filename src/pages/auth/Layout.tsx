export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="absolute -z-20 grid grid-cols-2 w-screen h-screen">
        <img src="/images/authbg1.png" alt="" />
        <img src="/images/authbg2.png" alt="" />
        <img src="/images/authbg1.png" alt="" />
        <img src="/images/authbg2.png" alt="" />
      </div>
      <div className="bg-blueX   gap-4 flex px-4 rounded-lg py-6 flex-col w-2/5 items-center">
        <img src="/images/S2N.png" className="w-48 bg-white p-1" alt="logo" />
        <form className="auth-form px-12 flex flex-col w-full gap-3">
          {children}
        </form>
      </div>
    </div>
  );
}
