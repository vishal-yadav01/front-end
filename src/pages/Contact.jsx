import React from "react";
import Footer from "../components/common/Footer";
import ContactDetails from "../components/ContactPage/contactDetails";
import ContactForm from "../components/ContactPage/ContactForm";
import ReviewSlider from "../components/common/ReviewSlider";

const Contact = () => {
  return (
    <div>
      {/* Contact Section */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <h2 className="text-center text-3xl font-semibold mt-8">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
