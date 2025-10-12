import React from 'react';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactPage = () => {
    // এখানে আপনার ফর্ম জমা দেওয়ার লজিক এবং state যুক্ত করতে পারেন
    const isSubmitting = false; 

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-10">
            <div className="max-w-7xl mx-auto py-12">

                {/* --- 1. Header Section --- */}
                <header className="text-center mt-4 mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        Get In Touch
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Have a project idea or just want to chat? Send me a message, and let&apos;s create something amazing together.
                    </p>
                </header>

                {/* --- 2. Main Grid: Form & Info --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* A) Contact Information Cards (Left side on large screens) */}
                    <div className="space-y-6 lg:col-span-1">
                        <ContactInfoCard 
                            icon={Mail} 
                            title="Email Address" 
                            content="azmiruddin05@gmail.com" 
                            link="mailto:your.email@example.com" 
                        />
                        <ContactInfoCard 
                            icon={Phone} 
                            title="Phone Number" 
                            content="+8801933946077" 
                            link="tel:+8801933946077" 
                        />
                        <ContactInfoCard 
                            icon={MapPin} 
                            title="Location" 
                            content="Narayanganj, Bangladesh" 
                            link="#" 
                        />
                    </div>
                    
                    {/* B) Contact Form (Right side - takes up more space) */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 md:p-10 rounded-xl shadow-2xl border-t-4 border-indigo-500">
                        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Send Me a Message</h2>
                        
                        <form className="space-y-6">
                            {/* Name and Email in one row for desktop */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormInput label="Full Name" type="text" placeholder="Azmir Uddin" />
                                <FormInput label="Email Address" type="email" placeholder="example@domain.com" />
                            </div>
                            
                            {/* Subject */}
                            <FormInput label="Subject" type="text" placeholder="Project Inquiry or Collaboration" />
                            
                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Tell me more about your project needs..."
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit" 
                                className="w-full py-3 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition duration-150"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactPage;


// --- Reusable Sub-Components ---

// 1. Contact Info Card Component
interface ContactInfoCardProps {
    icon: React.ElementType;
    title: string;
    content: string;
    link: string;
}

const ContactInfoCard: React.FC<ContactInfoCardProps> = ({ icon: Icon, title, content, link }) => (
    <a 
        href={link} 
        className="block bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-l-4 border-indigo-400 dark:border-indigo-600"
    >
        <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full text-indigo-600 dark:text-indigo-400">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{content}</p>
            </div>
        </div>
    </a>
);


// 2. Simple Form Input Component
interface FormInputProps {
    label: string;
    type: string;
    placeholder: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, type, placeholder }) => (
    <div>
        <label htmlFor={label} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label} *
        </label>
        <input
            id={label}
            type={type}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            required
        />
    </div>
);