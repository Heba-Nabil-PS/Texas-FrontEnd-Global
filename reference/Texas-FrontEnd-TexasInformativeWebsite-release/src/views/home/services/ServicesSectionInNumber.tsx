import React from "react";

const ServicesSectionInNumber = () => {
  return (
    <div className="bg-gray-50 py-16 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            The Blockchain-only hiring platform
          </h2>
          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
            Organic, genuine conversations with higher response rates than
            LinkedIn or cold email.
          </p>
        </div>
      </div>
      <div className="mt-10 pb-1">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-xl bg-white shadow-lg sm:grid sm:grid-cols-3">
                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Blockchain developers =
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-700">
                    500+
                  </dd>
                </div>
                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    Response rate
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-700">
                    58%
                  </dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                    New devs a month
                  </dt>
                  <dd className="order-1 text-5xl font-extrabold text-gray-700">
                    30+
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSectionInNumber;
