import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_nr04rxk", // your service id
        "template_20ebpzc", // your template id
        formData,
        "ESO6-G60SuHLiG82X" // your public key
      )
      .then(
        () => {
          alert("✅ Email sent successfully!");
          setFormData({ from_name: "", from_email: "", message: "" });
        },
        () => {
          alert("❌ Failed to send email. Please try again.");
        }
      );
  };

  const handleGoBack = () => {
    const role = localStorage.getItem("activeRole");
    if (role === "poster") {
      navigate("/poster-home");
    } else {
      navigate("/viewer-home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-blue-600 text-white p-6">
      {/* Go Back */}
      <button
        onClick={handleGoBack}
        type="button"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:scale-105 transition bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
      >
        ← Go Back
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        About This Blog
      </h1>

      {/* Features */}
      <section className="mb-12 bg-">
        <h2 className="text-2xl font-semibold mb-4">🔍 Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI-powered tools",
              desc: "AI tools auto-generate titles, summaries, tags.",
            },
            {
              title: "Dark Mode",
              desc: "Dark Mode enables a user-friendly night theme.",
            },
            {
              title: "Role-based Views",
              desc: "Poster and viewer access kept separate.",
            },
            {
              title: "Responsive Design",
              desc: "Optimized for all screen sizes.",
            },
            {
              title: "Reusable Components",
              desc: "UI parts are modular and consistent.",
            },
            {
              title: "REST API Integration",
              desc: "Dynamic blog data fetching/updating.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-indigo-500 hover:scale-[1.03] transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pages */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">📄 Pages Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Viewer Home",
              desc: "Browse blogs with search and filters. Clean, read-only design.",
            },
            {
              title: "Poster Home",
              desc: "Dashboard for managing blogs with edit/delete options.",
            },
            {
              title: "Blog Detail",
              desc: "Displays full blog content with title, tags, and date.",
            },
            {
              title: "Create Blog",
              desc: "Add new blog posts with AI-powered helpers.",
            },
            {
              title: "Edit Blog",
              desc: "Update existing posts with pre-filled form and validation.",
            },
            {
              title: "About Page",
              desc: "Platform purpose, features, and contact form.",
            },
          ].map((p, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-800">{p.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">📬 Contact Me</h2>
        <form
          onSubmit={handleSendEmail}
          className="bg-white/95 shadow-lg rounded-xl p-8 max-w-xl mx-auto border border-indigo-200"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full text-black border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full text-black border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full text-black border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your message..."
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:scale-105 transition bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg shadow-md 
               hover:shadow-lg transform hover:-translate-y-0.5 transition font-medium 
               w-full sm:w-auto"
          >
            Send 💌
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="text-center space-x-6 text-2xl">
        <a
          href="https://www.linkedin.com/in/tamizhselvan-webdeveloper/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin hover:text-blue-600 transition"></i>
        </a>
        <a
          href="https://github.com/tamizh2225"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github hover:text-gray-900 transition"></i>
        </a>
        <a
          href="https://www.instagram.com/tamizh_.s/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-instagram hover:text-pink-500 transition"></i>
        </a>
      </footer>
    </div>
  );
};

export default About;
