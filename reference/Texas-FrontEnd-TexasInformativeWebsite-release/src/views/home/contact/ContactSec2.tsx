import React from "react";

const ContactSec2 = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="lg:flex lg:items-center lg:-mx-10">
          <div className="lg:w-1/2 lg:mx-10">
            <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-white lg:text-3xl">
              Let’s talk
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Ask us everything and we would love to hear from you
            </p>

            <form className="mt-12">
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-full dark:placeholder-gray-600 dark:bg-gray-900 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-full dark:placeholder-gray-600 dark:bg-gray-900 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="w-full mt-4">
                <label className="block mb-2 text-sm text-gray-600 ">
                  Message
                </label>
                <textarea
                  className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-2xl md:h-36 dark:placeholder-gray-600 dark:bg-gray-900 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Message"
                ></textarea>
              </div>

              <button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-full hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                get in touch
              </button>
            </form>
          </div>

          <div className="mt-12 lg:flex lg:mt-0 lg:flex-col lg:items-center lg:w-1/2 lg:mx-10">
            <img
              className="hidden object-cover mx-auto rounded-full lg:block shrink-0 w-full h-96"
              src="/images/slider1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSec2;
