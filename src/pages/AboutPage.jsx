import React, { useState } from "react";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    from_email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_nr04rxk",
        "template_20ebpzc",
        formData,
        "ESO6-G60SuHLiG82X"
      )
      .then(
        (result) => {
          alert("Email sent successfully!");
          setFormData({ from_email: "", from_name: "", message: "" });
        },
        (error) => {
          alert("Failed to send email. Please try again.");
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-gray-800 p-6 md:p-16">
      {/* Go Back */}
      <button
        onClick={handleGoBack}
        type="button"
        className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-700 hover:scale-105 transition"
      >
        ← Go Back
      </button>
      <h1 className="text-4xl font-bold mb-6 text-center">About This Blog</h1>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🔍 Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "AI-powered tools",
              aesc: "AI tools auto-generate titles, summaries, tags.",
            },
            {
              title: "Dark Mode",
              aesc: "Dark Mode enables a user-friendly night theme.",
            },
            {
              title: "Role-based Views",
              aesc: "Role-based views separate poster and viewer access.",
            },
            {
              title: "Responsive Design",
              aesc: "Optimizes blog layout for all devices.",
            },
            {
              title: "Reusable Components",
              aesc: "Modular UI parts used across blog pages.",
            },
            {
              title: "REST API Integration",
              aesc: "Fetches and updates blog data from backend.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white shadow-xl rounded-xl p-6 hover:scale-[1.03] transition-all border-t-4 border-blue-500"
            >
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{feature.aesc}</p>
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
              desc: "The Viewer Home page lets users browse and search published blog posts. It shows blog summaries with titles, images, and dates. Users can click to view full blog details. Editing and deleting options are hidden to keep it read-only. The page supports filtering, responsive design, and smooth navigation for an enjoyable reading experience.",
            },
            {
              title: "Poster Home",
              desc: "Poster Home is the dashboard for blog creators to manage their content. Posters can view all their blogs, search by title/content, sort by date, and use buttons to edit or delete posts. It displays toast notifications for actions like creation or updates, and includes a button to navigate to the Create Blog page.",
            },
            {
              title: "Blog Detail",
              desc: "The Blog Detail page displays the full content of a selected blog post. It shows the title, image, tags, published date, and complete content in a clean layout. Accessible by both posters and viewers, it offers a focused reading experience. All data is fetched by ID, and the design remains consistent with the rest of the blog UI.",
            },
            {
              title: "Create Blog",
              desc: "The Create Blog page allows posters to add new blog entries with fields like title, summary, content, tags, and image URL. It includes a Draft/Published toggle and optional AI-powered buttons to generate title, summary, image, and tags. On submission, data is validated, timestamped, sent to the API, and a toast confirms success before redirecting. AI-powered blog editor with tag suggestions.",
            },
            {
              title: "Edit Blog",
              desc: "The Edit Blog page lets posters update existing blog posts. It fetches blog data by ID and pre-fills all fields including title, summary, content, tags, and image. Posters can modify details, toggle draft/published status, and save changes via API. It includes validation, toast feedback, a cancel button, and ensures smooth navigation back to Poster Home. Modify published content and update instantly.",
            },
            {
              title: "About Page",
              desc: "The About page introduces the purpose and vision of the Smart-Blog platform. It explains how the app empowers content creators and readers through clean design, AI tools, and easy blog management. It highlights the tech stack used and briefly showcases key features like role-based access, responsive design, and REST API integration. Know more about the platform and contact form.",
            },
          ].map((page, i) => (
            <div
              key={i}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold">{page.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{page.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">📬 Contact Me</h2>
        <form
          onSubmit={handleSendEmail}
          className="bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl p-8 max-w-xl mx-auto transform hover:shadow-xl transition-all"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Excited to know your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Your Email</label>
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full border px-4 py-2 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition duration-300"
          >
            Send
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
          <i className="fab fa-github hover:text-black transition"></i>
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
