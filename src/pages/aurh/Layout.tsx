export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="bg-blueX/30 gap-4 flex px-4 rounded-lg py-6 flex-col w-2/5 items-center">
        <img src="/images/S2N.png" className="w-48" alt="logo" />
        <form className="flex flex-col w-full gap-3">{children}</form>
      </div>
    </div>
  );
}
