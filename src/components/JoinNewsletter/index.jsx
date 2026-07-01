function JoinNewsletter()
{
    return (
        <section className="pb-24 px-4 text-center mt-20">
        {/* Tiêu đề */}
        <h2
            className="text-bg-secondary leading-[34px] text-[28px] lg:leading-[54px] md:text-[38px] lg:text-[48px] leading-[1.15]  max-w-[772px] mx-auto mb-10"
        >
            Join our world of Mediterranean design and quiet luxury.
        </h2>

        {/* Form */}
        <div className="flex flex-col items-center gap-3 w-full max-w-[360px] mx-auto">
            <input
            type="text"
            placeholder="Name"
            className="w-full px-5 py-3 rounded-md bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
            style={{ fontFamily: 'InstrumentSans' }}
            />
            <input
            type="email"
            placeholder="Email Address"
            className="w-full px-5 py-3 rounded-lg bg-[#f0f4f0] text-bg-secondary placeholder:text-gray-400 outline-none focus:ring-1 focus:ring-bg-secondary transition"
            style={{ fontFamily: 'InstrumentSans' }}
            />
            <button
                className="mt-2 py-3 px-8 rounded-lg bg-bg-secondary text-white text-[20px] cursor-pointer
                relative overflow-hidden group"
            >
                <span className={`block transition-all duration-300 ease-in-out
                        ${'group-hover:-translate-y-full group-hover:opacity-0'}`}>
                        Join Now
                    </span>

                    {/* Text từ dưới lên - chỉ hiện khi hover */}
                    <span className={`absolute inset-0 flex items-center justify-center
                        transition-all duration-300 ease-in-out px-6
                        ${'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100'}`}>
                        Join Now
                    </span>
            </button>
        </div>
    </section>
    )
}
export default JoinNewsletter;