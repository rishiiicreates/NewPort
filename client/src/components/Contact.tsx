import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        
        // Reset form
        form.reset();
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-dark paper-texture text-white relative">
      <div className="absolute inset-0 bg-dark/80"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8">
              Have a project in mind or want to discuss how we can work together? I'm always open to new opportunities and collaborations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <p className="text-white/70">
                    <a href="mailto:rishiicreates@gmail.com" className="hover:text-primary transition-colors">rishiicreates@gmail.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fab fa-linkedin text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">LinkedIn</h3>
                  <p className="text-white/70">
                    <a href="https://www.linkedin.com/in/hrishikesh-yadav-b4a736360" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Hrishikesh Yadav</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fab fa-github text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">GitHub</h3>
                  <p className="text-white/70">
                    <a href="https://github.com/rishiiicreates" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">rishiiicreates</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0">
                  <i className="fab fa-instagram text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Instagram</h3>
                  <p className="text-white/70">
                    <a href="https://www.instagram.com/rishiicreatess/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">@rishiicreatess</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form 
              className="bg-white p-8 rounded-xl shadow-2xl" 
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <h3 className="text-2xl font-bold text-dark mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark/70 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    {...form.register("name")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      form.formState.errors.name ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark/70 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    {...form.register("email")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      form.formState.errors.email ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                    placeholder="Your email"
                    disabled={isSubmitting}
                  />
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-dark/70 mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    {...form.register("subject")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      form.formState.errors.subject ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                    placeholder="Subject"
                    disabled={isSubmitting}
                  />
                  {form.formState.errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dark/70 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    {...form.register("message")}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      form.formState.errors.message ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary`}
                    placeholder="Your message"
                    disabled={isSubmitting}
                  ></textarea>
                  {form.formState.errors.message && (
                    <p className="mt-1 text-sm text-red-500">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
