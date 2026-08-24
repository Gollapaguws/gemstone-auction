"use client";

import { useState } from "react";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send } from "lucide-react";

const branches = [
  {
    name: "Montague Gardens",
    address: "Unit 8 Prosperity Park, Computer Road, Montague Gardens, Cape Town",
    phone: "+27 (0)76 665 1711",
    email: "gems@africangems.com",
    hours: "Monday to Friday 9:00am to 5:00pm",
  },
  {
    name: "Greenmarket Square",
    address: "Shop Two, Protea Assurance House, Greenmarket Square, Cape Town 8000",
    phone: "+27 (0)73 531 2667",
    email: "gems@africangems.com",
    hours: "Mon-Sat 9:30am-6:30pm, Sun 9:30am-5:30pm",
  },
  {
    name: "Auckland, New Zealand",
    address: "Call for full address details",
    phone: "(+64) 09 444 1383",
    email: "maryanne@africangems.com",
    hours: "By appointment only",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Send form data
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="section-title">Contact Us</h1>
        <p className="section-subtitle">
          We&apos;d love to hear from you. Get in touch with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="font-serif font-bold text-xl mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Subject
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Message
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="input-field min-h-[120px]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold flex items-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info & Branches */}
        <div className="space-y-6">
          {/* Quick Contact */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-serif font-bold text-xl mb-4">Quick Contact</h2>
            <div className="space-y-4">
              <a
                href="tel:+27766651711"
                className="flex items-center gap-3 text-gray-700 hover:text-gold-600 transition-colors"
              >
                <Phone className="w-5 h-5 text-gold-500" />
                <div>
                  <p className="font-medium">Telephone / WhatsApp</p>
                  <p className="text-sm text-gray-500">+27 (0)76 665 1711</p>
                </div>
              </a>
              <a
                href="mailto:gems@africangems.com"
                className="flex items-center gap-3 text-gray-700 hover:text-gold-600 transition-colors"
              >
                <Mail className="w-5 h-5 text-gold-500" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-500">gems@africangems.com</p>
                </div>
              </a>
            </div>
          </div>

          {/* Branches */}
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-gold-500"
            >
              <h3 className="font-serif font-bold text-lg mb-3">{branch.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold-500" />
                  {branch.address}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0 text-gold-500" />
                  {branch.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0 text-gold-500" />
                  {branch.email}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 shrink-0 text-gold-500" />
                  {branch.hours}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
