const Hero = () => {
  return (
    <section className="flex justify-center md:flex-row flex-col-reverse bg-gradient-to-b from-blueZ/10 to-white items-center overflow-hidden px-8 z-0 md:px-10 w-[100vw] h-[82vh] font-medium">
      <div className="bg-blueX w-[350px] -z-20 rounded-full blur-[100px] opacity-30 top-8 -right-32  h-[350px] absolute"></div>
      <div className="bg-blueX w-[350px] contrast-75 z-20 rounded-full blur-[100px] opacity-30 top-[50vh] -left-16 h-[350px] absolute"></div>
      <div className="md:w-[50%] flex md:text-left text-center flex-col gap-4 relative z-40">
        <h2 className="md:text-7xl font-bold  text-3xl  md:font-semibold">
          Sell your <span className="text-blueX">Gift Cards</span> at the best
          rates instantly
        </h2>
        <p className="font-medium t text-lg">
          Got gift cards? Sell them for cash Now. Enjoy a quick, secure, and
          hassle-free process. Turn your gift cards into money you can use
          anywhere, anytime!
        </p>
        <button className="flex md:w-1/4 rounded justify-center bg-blueX px-4 py-2 font-bold text-white">
          Sell Now
        </button>
      </div>
      <img src="/images/woman.png" className="md:w-1/3" alt="" />
    </section>
  );
};
export default Hero;
