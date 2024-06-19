const Features = () => {
  return (
    <section className="flex justify-center items-center w-full gap-5 my-8 flex-col">
      <h1 className="text-5xl font-bold">Why Sell with Us</h1>
      <div className="flex flex-row gap-5">
        <div className="flex flex-col items-center justify-center w-[320px] h-[320px] rounded-xl p-4 shadow-md cursor-pointer hover:border-blueX/30 border border-transparent duration-150">
          <img className="w-2/3" src="/images/secure.png" alt="" />
          <article className="flex flex-col items-center text-center">
            <h4 className="text-xl font-semibold">Secure Transactions</h4>
            <p className="text-sm font-medium">
              Your security is our priority. Our encrypted system ensures your
              information is protected throughout the transaction process.
            </p>
          </article>
        </div>
        <div className="flex flex-col items-center justify-center w-[320px] h-[320px] rounded-xl p-4 shadow-md cursor-pointer hover:border-blueX/30 border border-transparent duration-150">
          <img className="w-2/3" src="/images/fast.png" alt="" />
          <article className="flex flex-col items-center text-center">
            <h4 className="text-xl font-semibold">Fast and Easy Process</h4>
            <p className="text-sm font-medium">
              Our user-friendly platform makes selling your gift cards simple.
              Just enter your card details, get an instant offer, and get paid
              quickly.
            </p>
          </article>
        </div>
        <div className="flex flex-col items-center justify-center w-[320px] h-[320px] rounded-xl p-4 shadow-md cursor-pointer hover:border-blueX/30 border border-transparent duration-150">
          <img className="w-2/3" src="/images/multiplecards.jpg" alt="" />
          <article className="flex flex-col items-center text-center">
            <h4 className="text-xl font-semibold">Wide range of Cards</h4>
            <p className="text-sm font-medium">
              No worries, We got you covered! We accept gift cards from hundreds
              of popular retailers and restaurants.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Features;
