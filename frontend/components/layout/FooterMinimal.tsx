'use client';


const FooterMinimal = () => {
  return (
    <footer className="py-8 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2024 Shay Acoca. Tous droits réservés.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-6">
            <a
              href="https://linkedin.com/in/shayacoca"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Sy2force"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="mailto:contact@shayacoca.com"
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Email"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
