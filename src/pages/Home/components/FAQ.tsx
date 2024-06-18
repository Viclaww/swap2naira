const FAQ = () => {
  const faqs = [
    {
      head: "What types of gift cards can I sell?",
      desc: "We accept a wide range of gift cards from popular retailers, restaurants, and online stores. Check our full list of accepted cards here.",
    },
    {
      head: "How long does it take to get paid?",
      desc: "Once you accept our offer, you can receive your payment within 24-48 hours, depending on your chosen payment method.",
    },
    {
      head: "Is it safe to sell my gift cards online?",
      desc: "Absolutely! Our platform uses advanced encryption technology to protect your information and ensure a secure transaction process.",
    },
    {
      head: "Can I sell partially used gift cards?",
      desc: "Yes, we accept both full and partially used gift cards. Just enter the remaining balance when you provide the card details.",
    },
  ];
  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      <div>
        {faqs.map(({ head, desc }, index) => (
          <div key={index}>
            <span>{head}</span>
            <span>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
