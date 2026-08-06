interface ContactProps {
  title: string;
  email: string;
  phone: string;
  address: string;
}

const Contact1 = ({ title, email, phone, address }: ContactProps) => (
  <section className="py-16 bg-background" id="contact">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-foreground text-center mb-12">{title}</h2>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-1">Email</h3>
            <p className="text-muted-foreground">{email}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Phone</h3>
            <p className="text-muted-foreground">{phone}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-1">Address</h3>
            <p className="text-muted-foreground">{address}</p>
          </div>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <input type="email" placeholder="Your Email" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" />
          <button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 cursor-pointer">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
);

export default Contact1;
