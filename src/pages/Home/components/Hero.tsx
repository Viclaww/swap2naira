const Hero = () => {
  return (
    <section className="flex justify-center bg-gradient-to-b from-blueZ/10 to-white items-center overflow-hidden z-0 px-10 w-[100vw] h-[82vh] font-medium">
      <div className="bg-blueX w-[350px] -z-20 rounded-full blur-[100px] opacity-30 top-8 -right-32  h-[350px] absolute"></div>
      <div className="bg-blueX w-[350px] contrast-75 z-20 rounded-full blur-[100px] opacity-30 top-[50vh] -left-16 h-[350px] absolute"></div>
      <div className="w-[50%] flex flex-col gap-4 relative z-40">
        <h2 className="text-7xl  font-semibold">
          Sell your <span className="text-blueX">Gift Cards</span> at the best
          rates instantly
        </h2>
        <p className="font-medium">
          Got gift cards? Sell them for cash Now. Enjoy a quick, secure, and
          hassle-free process. Turn your gift cards into money you can use
          anywhere, anytime!
        </p>
        <button className="flex w-1/4 rounded justify-center bg-blueX px-4 py-2 font-bold text-white">
          Sell Now
        </button>
      </div>
      <img src="/images/woman.png" className="w-1/3" alt="" />
    </section>
  );
};
export default Hero;
