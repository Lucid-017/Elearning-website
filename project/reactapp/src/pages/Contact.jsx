import React from "react";
import './css/Contact.css'
const Contact = () => {
  return (
    <>
      <div className="grid grid-cols-1 pb-20 px-10 phone:grid-cols-2 phone:px-20  gap-10">
        <div className="heading">
          <p className="text-4xl font-[600] overflow-hidden">Contact Us</p>
        </div>
        <div className="">
          At EBEDMAS platform is designed to offer progress management and
          monitor student achievements, allowing users to track growth and
          educational milestones every step of the way. We believe in providing flexible and affordable pricing 
          options for our services.
          If you have any
          questions, feedback, or need assistance, please don’t hesitate to
          reach out.
        </div>
      </div>
      <hr className="mx-10 tablet:px-20" />
      <div className="contact grid grid-cols-1 mt-20 mx-10 p-10 tablet:mx-40 tablet:p-20 tablet:grid-cols-2 tablet:gap-10">
        <div className="">
          <form method="post" className="w-full">
            {/* Full name */}
            <div className="flex flex-wrap mb-4">
              <div className="mr-5 laptop:w-[45%]">
                <label htmlFor="name" className="block">
                  First Name
                </label>
                <input
                  type="text"
                  name="fName"
                  placeholder="Enter First Name"
                  required
                />
              </div>

              <div className="laptop:w-[45%]">
                <label htmlFor="name" className="block">
                  Last Name
                </label>
                <input
                  className=""
                  type="text"
                  name="lName"
                  placeholder="Enter Last Name"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap mb-4">
              <div className="mr-5 laptop:w-[45%]">
                <label htmlFor="name" className="block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  required
                />
              </div>

              <div className="laptop:w-[45%]">
                <label htmlFor="name" className="block">
                  Phone Number
                </label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Enter Phone Number"
                  required
                />
              </div>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label htmlFor="subject" className="block">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label htmlFor="message" className="block">
                Message
              </label>
              <textarea
                className="block w-full h-32 bg-[#F7F7F8] border border-gray-200 rounded-md px-4 py-2 resize-none"
                name="message"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button className="w-2/4 mx-auto bg-[#FF9500] text-white font-semibold py-3 rounded-md hover:bg-orange-500 transition duration-300 ease-in-out">
              Send Message
            </button>
          </form>
        </div>
        {/* right */}
        <div className="contact-card pt-20 tablet:pt-0">
          <div>
            {/* icon */}
            <p>Support@ebedmas.com</p>
          </div>
          <div>
            {/* icon */}
            <p>0900 000 000</p>
          </div>
          <div>
            {/* icon */}
            <p>Somewhere in lagos</p>
          </div>
          <div>
            {/* icon */}
            <p>Social Profiles</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
