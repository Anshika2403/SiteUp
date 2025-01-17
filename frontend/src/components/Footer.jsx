import React from "react";

function Footer() {
  return (
    <footer className="bg-light pt-16 pb-6 px-8">
      <div className="container mx-auto px-12">
        {/* Main Grid Layout */}
        <div
          className="grid grid-cols-4 gap-x-12 gap-y-8"
          style={{
            gridTemplateColumns: "2fr 1fr 1fr 1fr", // Custom column widths
          }}
        >
          {/* Company Info */}
          <div>
            <h3 className="text-3xl font-bold mb-4">SiteUp</h3>
            <p className="text-[#131117] opacity-70 text-md">
              24/7 website monitoring for developers. Simple, reliable, and
              powerful.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <div className="grid gap-y-2">
              <a
                href="#features"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Pricing
              </a>
              <a
                href="#documentation"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#api"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                API
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <div className="grid gap-y-2">
              <a
                href="#about"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                About Us
              </a>
              <a
                href="#blog"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Blog
              </a>
              <a
                href="#careers"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Careers
              </a>
              <a
                href="#contact"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <div className="grid gap-y-2">
              <a
                href="#help"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Help Center
              </a>
              <a
                href="#status"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Status Page
              </a>
              <a
                href="#sla"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                SLA
              </a>
              <a
                href="#security"
                className="text-[#131117] opacity-70 hover:text-prime hover:opacity-100 transition-colors"
              >
                Security
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-2 gap-4 items-center mt-12 pt-8 border-t border-gray-800">
          {/* Copyright */}
          <div className="flex items-center justify-center md:justify-start text-sm text-[#131117] opacity-70">
            <span>© 2025 UptimeMonitor. Made with</span>
            <span className="text-red-500 mx-1"> &hearts;</span>
            <span>by developers for developers</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center justify-end gap-3">
            <a href="#github">
              <img
                src="https://img.icons8.com/?size=100&id=106562&format=png&color=000000"
                className="w-8 h-8"
              />
            </a>
            <a href="#twitter">
              <img
                src="https://img.icons8.com/?size=100&id=de4vjQ6J061l&format=png&color=000000"
                className="w-8 h-8"
              />
            </a>
            <a href="#email">
              <img
                src="https://img.icons8.com/?size=100&id=38161&format=png&color=000000"
                className="w-8 h-8"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
