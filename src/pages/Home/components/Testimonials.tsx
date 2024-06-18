// import { useState } from "react";

const Testimonials = () => {
  const testimonies = [
    {
      name: "Tom Cruise",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Dwayne Johnson",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
    {
      name: "Kevin Hart",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam eligendi architecto maxime inventore? Rem sit ipsam mollitia iusto omnis animi!",
    },
  ];

  //   const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <h2>Testimonials</h2>
      <div className="flex gap-10">
        {testimonies.map(({ name, desc }, index) => (
          <div key={index}>
            <p>{desc}</p>
            <h3>{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
