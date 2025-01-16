import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <div className="w-full mb-5">
        <IoIosArrowRoundBack
          size={40}
          className="bg-primarycolor p-1 rounded-full text-white cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className=" mx-auto bg-white p-8">
        <h1 className="text-3xl font-bold text-primarycolor mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 mb-4">
          This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you visit our website or use our
          services. Please read this privacy policy carefully. If you do not
          agree with the terms of this privacy policy, please do not access the
          site.
        </p>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Information We Collect
        </h2>
        <p className="text-gray-700 mb-4">
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Personal Data</li>
          <li>Derivative Data</li>
          <li>Financial Data</li>
          <li>Mobile Device Data</li>
          <li>Third-Party Data</li>
        </ul>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Use of Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          Having accurate information about you permits us to provide you with
          a smooth, efficient, and customized experience. Specifically, we may
          use information collected about you via the Site to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Create and manage your account.</li>
          <li>Email you regarding your account or order.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions.</li>
          <li>Improve customer service.</li>
        </ul>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Disclosure of Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>By Law or to Protect Rights</li>
          <li>Third-Party Service Providers</li>
          <li>Marketing Communications</li>
          <li>Affiliates</li>
        </ul>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Security of Your Information
        </h2>
        <p className="text-gray-700 mb-4">
          We use administrative, technical, and physical security measures to
          help protect your personal information. While we have taken reasonable
          steps to secure the personal information you provide to us, please be
          aware that despite our efforts, no security measures are perfect or
          impenetrable, and no method of data transmission can be guaranteed
          against any interception or other type of misuse.
        </p>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Changes to This Privacy Policy
        </h2>
        <p className="text-gray-700 mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page. You
          are advised to review this Privacy Policy periodically for any
          changes.
        </p>

        <h2 className="text-xl font-bold text-primarycolor mt-6 mb-2">
          Contact Us
        </h2>
        <p className="text-gray-700">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
        </p>
        <p className="text-gray-700 font-semibold mt-2">
          Email: deshdekho.contact@gmail.com
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
