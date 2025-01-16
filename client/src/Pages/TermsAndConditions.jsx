import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

const TermsAndConditions = () => {
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

      <div className="bg-white p-8">
        <h1 className="text-3xl font-bold text-primarycolor mb-5 text-center">
          Terms & Conditions
        </h1>

        <div className="text-gray-700">
          <p className="mb-4">
            <strong>Last Updated:</strong> 16th January, 2025
          </p>

          <p className="mb-4">
            Welcome to DeshDekho! By accessing or using our website and
            services, you agree to comply with and be bound by the following
            Terms & Conditions. Please read them carefully.
          </p>

          <h2 className="text-xl font-semibold text-primarycolor mt-5 mb-3">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By using our services, you agree to these terms. If you do not
            agree, you may not use our services.
          </p>

          <h2 className="text-xl font-semibold text-primarycolor mt-5 mb-3">
            2. Modification of Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Changes will
            be effective immediately upon posting on our website. Continued use
            of our services constitutes acceptance of the revised terms.
          </p>

          <h2 className="text-xl font-semibold text-primarycolor mt-5 mb-3">
            3. User Responsibilities
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Account Security:</strong> You are responsible for
              maintaining the confidentiality of your account information and
              for all activities that occur under your account.
            </li>
            <li>
              <strong>Compliance:</strong> You agree to comply with all
              applicable laws and regulations while using our services.
            </li>
            <li>
              <strong>Content:</strong> You are responsible for any content you
              upload, share, or otherwise make available through our platform.
              Ensure your content does not violate any third-party rights or
              laws.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-primarycolor mt-5 mb-3">
            4. Booking & Reservations
          </h2>
          <ul className="list-disc pl-5 mb-4">
            <li>
              <strong>Accuracy:</strong> Ensure all booking information is
              accurate and up-to-date. Any errors are your responsibility.
            </li>
            <li>
              <strong>Cancellations & Refunds:</strong> Our cancellation and
              refund policies are outlined separately. By making a reservation,
              you agree to these policies.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
