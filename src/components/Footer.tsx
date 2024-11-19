import { FaGithub } from "react-icons/fa";

export const Footer = () => (
  <footer className="py-4">
    <div className="text-center container tracking-wide mx-auto max-w-4xl">
      <p className="text-gray-600 text-sm">
        Developed by <span className="font-semibold text-gray-700">Luis Carrasco</span>. All rights reserved © {new Date().getFullYear()}.
      </p>
      <a
        href="https://github.com/ilmovilDev"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 font-semibold hover:text-gray-700 mt-2 inline-flex items-center space-x-2"
      >
        <FaGithub className="text-lg" />
        <span>Visit my GitHub</span>
      </a>
    </div>
  </footer>
);

