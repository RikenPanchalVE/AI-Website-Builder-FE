interface ContactProps {
  title: string;
  email: string;
  phone: string;
  address: string;
}

const Contact2 = ({ title, email, phone, address }: ContactProps) => (
  <section className="py-16 bg-card" id="contact">
    <div className="container mx-auto px-6 text-center max-w-xl">
      <h2 className="text-3xl font-bold text-foreground mb-8">{title}</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center mb-8">
        <div className="text-sm"><strong>Email:</strong> {email}</div>
        <div className="text-sm"><strong>Phone:</strong> {phone}</div>
        <div className="text-sm"><strong>Address:</strong> {address}</div>
      </div>
      <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 cursor-pointer">
        Contact Us
      </button>
    </div>
  </section>
);

export default Contact2;
