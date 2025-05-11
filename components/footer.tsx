"use client"

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-blue-800 to-blue-900 text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/images/deped-cabuyao-logo.png"
                alt="DepEd Cabuyao Logo"
                width={60}
                height={60}
                className="mr-3 bg-white rounded-full p-1"
              />
              <div>
                <h2 className="text-lg font-semibold">DepEd Cabuyao</h2>
                <p className="text-sm text-blue-200">City Schools Division of Cabuyao, Laguna</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 mb-4">
              Providing quality education to all learners in Cabuyao, Laguna.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 p-2 rounded-full transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Schools Directory
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Programs & Services</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <Link href="/programs/enrollment" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Enrollment
                </Link>
              </li>
              <li>
                <Link href="/programs/scholarships" className="hover:text-white transition-colors flex items-center">
                  <span className="mr-2">›</span> Scholarships
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/special-education"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Special Education
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/teacher-training"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Teacher Training
                </Link>
              </li>
              <li>
                <Link
                  href="/programs/student-services"
                  className="hover:text-white transition-colors flex items-center"
                >
                  <span className="mr-2">›</span> Student Services
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 border-b border-blue-700 pb-2">Contact Information</h3>
            <ul className="space-y-3 text-blue-100">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Cabuyao Enterprise Park, Brgy. Banay-Banay, City of Cabuyao, Laguna</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <span>0939 934 0448</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <span>division.cabuyao@deped.gov.ph</span>
              </li>
            </ul>
            <div className="mt-4">
              <Button
                variant="outline"
                className="border-blue-400 text-blue-100 hover:bg-blue-700 hover:text-white"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-700 text-center text-sm text-blue-200">
          <p className="mb-2">
            © {currentYear} Department of Education - City Schools Division of Cabuyao, Laguna. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
