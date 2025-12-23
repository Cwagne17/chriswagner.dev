"use client";

import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { ContactFormData, ContactFormErrors } from "../types/contact-form";

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});

  const validateForm = () => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 px-6 relative">
      {/* Background accent */}
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
          <p className="text-muted-foreground text-lg">
            Let&apos;s discuss your cloud infrastructure needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-semibold text-xl mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/10">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>christopherwagner0700@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/5 to-transparent border border-purple-500/10">
                  <Phone className="w-5 h-5 text-purple-500" />
                  <span>+1 (443) 204-7483</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-cyan-500/5 to-transparent border border-cyan-500/10">
                  <MapPin className="w-5 h-5 text-cyan-500" />
                  <span>Available for remote work</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-xl mb-6">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com"
                  className="w-12 h-12 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-lg flex items-center justify-center hover:from-gray-500/20 hover:to-gray-600/20 transition-all border border-gray-500/20 hover:border-gray-500/30"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-500" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="w-12 h-12 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg flex items-center justify-center hover:from-blue-500/20 hover:to-blue-600/20 transition-all border border-blue-500/20 hover:border-blue-500/30"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-blue-500" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors ${
                  errors.name
                    ? "border-red-500"
                    : "border-border focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors ${
                  errors.email
                    ? "border-red-500"
                    : "border-border focus:border-blue-500"
                } focus:outline-none`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className={`w-full px-4 py-3 rounded-lg border bg-background transition-colors resize-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-border focus:border-blue-500"
                } focus:outline-none`}
                placeholder="Tell me about your project or how I can help..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              Send Message
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
