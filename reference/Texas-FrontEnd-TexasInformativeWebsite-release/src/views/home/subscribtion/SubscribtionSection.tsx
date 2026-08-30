import Image from "next/image";

const SubscribtionSection = () => {
  return (
    <section className="w-full h-[320px] flex items-center justify-between overflow-hidden relative">
      {/* Left image */}
      <div className="h-full w-full">
        <Image
        fill
          src="/images/subscription-bg.jpg"
          alt="Woman eating cheese"
          className="object-cover w-full h-full"
        />
      </div>
      {/* Right banners */}
      <div className="flex flex-col items-start justify-center h-full w-full pl-8 relative z-10">
        <div
          className="mb-2"
          style={{
            transform: 'rotate(-4deg)',
          }}
        >
          <span className="inline-block bg-[#ffd42a] text-white font-texas font-extrabold text-2xl md:text-3xl px-6 py-3 shadow-lg tracking-wide" style={{ color: '#fff', letterSpacing: '1px' }}>
            GET YOUR INBOX SEASONED WITH FLAVOR
          </span>
        </div>
        <div
          style={{
            transform: 'rotate(-2deg)',
          }}
        >
          <a href="#" className="inline-block bg-[#357a38] text-white font-texas font-extrabold text-2xl md:text-4xl px-8 py-3 shadow-lg tracking-wide">
            SIGN UP NOW!
          </a>
        </div>
      </div>
    </section>
  );
}

export default SubscribtionSection;