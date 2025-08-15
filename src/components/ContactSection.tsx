import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.luxury-fade-up, .luxury-scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Showroom',
      content: 'Naresh Innovations\nMysuru, Karnataka, India',
      subtext: 'Mon - Sat: 9:00 AM - 7:00 PM',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+91 XXXXX XXXXX',
      subtext: 'Available during business hours',
    },
    {
      icon: Mail,
      title: 'Email Us',
      content: 'info@nareshinnovations.com',
      subtext: 'We reply within 24 hours',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Monday - Saturday\n9:00 AM - 7:00 PM',
      subtext: 'Sunday: By appointment only',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 luxury-fade-up">
          <h2 className="heading-lg text-primary mb-4 font-serif">Get In Touch</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your space? Contact us for a free consultation and let's bring your vision to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="luxury-fade-up">
              <h3 className="heading-md text-primary mb-8 font-serif">Let's Start Your Project</h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="luxury-scale-in border-border hover:shadow-glass transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg text-primary">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground whitespace-pre-line mb-2">
                      {info.content}
                    </p>
                    <p className="text-sm text-muted-foreground/80">
                      {info.subtext}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="luxury-fade-up">
              <div className="aspect-video bg-gradient-glass rounded-2xl border border-border overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-accent mx-auto mb-4" />
                    <p className="text-lg font-medium text-primary">Interactive Map</p>
                    <p className="text-muted-foreground">Naresh Innovations, Mysuru</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="luxury-fade-up">
            <Card className="border-border shadow-luxury">
              <CardHeader>
                <CardTitle className="text-primary font-serif">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="border-border focus:ring-accent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border-border focus:ring-accent"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-border focus:ring-accent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-border focus:ring-accent"
                      placeholder="What's your project about?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="border-border focus:ring-accent resize-none"
                      placeholder="Tell us about your project requirements, timeline, and any specific preferences..."
                    />
                  </div>

                  <Button type="submit" className="btn-luxury w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;