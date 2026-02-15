import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://n8n.digitalsignageindia.co.in/webhook/d0c819ec-55f3-47e4-aa99-528147090104', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-container bg-muted/30" style={{ borderRadius: '24px' }}>
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

        {/* Left: Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="heading-lg text-foreground mb-4">Get In Touch</h2>
            <p className="body-lg text-muted-foreground">
              Ready to transform your space? Visit our showroom or send us a message to schedule a free consultation.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-card border border-border shadow-sm hover:shadow-md transition-shadow" style={{ borderRadius: '9px' }}>
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Visit Us</h3>
                <p className="text-muted-foreground mt-1">
                  Naresh Innovations , #673 , 'M' block, Kuvempu Nagar 2nd Stage,Nrupathunga Road, Mysuru, Karnataka-570023
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-card border border-border shadow-sm hover:shadow-md transition-shadow" style={{ borderRadius: '9px' }}>
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-muted-foreground mt-1">+91 9880079820</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-card border border-border shadow-sm hover:shadow-md transition-shadow" style={{ borderRadius: '9px' }}>
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email Us</h3>
                <p className="text-muted-foreground mt-1">nareshinnovations@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-card p-8 border border-border shadow-xl" style={{ borderRadius: '24px' }}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-background"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                <Input
                  id="phone"
                  placeholder="+91 98765 43210"
                  className="bg-background"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-background"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="min-h-[150px] bg-background resize-none"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
              disabled={loading}
            >
              {loading ? (
                <>Sending... <Loader2 className="ml-2 w-5 h-5 animate-spin" /></>
              ) : (
                <>Send Message <Send className="ml-2 w-5 h-5" /></>
              )}
            </Button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;