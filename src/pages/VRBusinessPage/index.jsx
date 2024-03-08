import NewsCard from "./components/NewsCard";
import ServiceCard from "./components/ServiceCard";
import { Link } from "react-router-dom";

export default function VR_BusinessPage() {
  const items = [
    {
      title: "endless 3d reality",
      imgSrc: "/cube.png",
    },
    {
      title: "augmented world",
      imgSrc: "/augmented-reality.png",
    },
    {
      title: "virtual traveling",
      imgSrc: "/virtual-tour.png",
    },
  ];
  return (
    <>
      {/* 1st section */}
      <section>
        <div className="bg-[url(https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZyfGVufDB8MHwwfHx8MA%3D%3D)] bg-no-repeat bg-center bg-cover flex pt-20">
          <div className="md:p-16 p-6 text-white">
            <h1 className="text-[7vw] mb-2 leading-none font-semibold uppercase">
              Build <br /> Technology <br />
              That links <br />
              people
            </h1>
            <div className="flex gap-5 flex-wrap">
              <button className="text-black text-nowrap bg-white py-2 px-5">
                DISCOVER THE METAVERSE
              </button>
              <button className="text-nowrap bg-transparent border-2 py-2 px-5">
                MORE ABOUT US
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2nd section */}
      <section className="min-h-96 py-36">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid md:grid-cols-3 place-items-center gap-10 px-10">
            {items.map((item, index) => (
              <div key={index} className="flex items-start gap-5 group cursor-pointer">
                <div className="max-w-16 min-w-14">
                  <img
                    src={item.imgSrc}
                    className="aspect-square"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="uppercase text-2xl font-bold">{item.title}</h1>
                  <h1 className="mt-2">Consectetur adipiscing elit, sed do euism od tempor.</h1>
                  <a className="flex items-center mt-4">
                    <span className="font-bold opacity-0 transition-all duration-700 -translate-x-full group-hover:inline group-hover:opacity-100 group-hover:translate-x-0">
                      Read More
                    </span>
                    <span className="bg-purple-500 transition-all duration-700 -translate-x-[250%] group-hover:translate-x-0 rounded-full p-1.5 text-white ml-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3rd section */}
      <section>
        <div className="grid lg:grid-cols-2 items-center gap-4">

          <div className="basis-[55%]">
            <img src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-vr-copyright.jpg" alt="" />
          </div>

          <div className="basis-[45%] md:pl-28 px-4">
            <div className="md:max-w-[70%] grid gap-5">
              <p className="font-medium">METAVERSE</p>
              <h1 className="lg:text-5xl text-3xl font-semibold">DISCOVER MODERN VR TECHNOLOGY</h1>
              <h3 className="lg:text-xl text-base max-w-[75%]">Qadipiscing elit, sed do eiusmod tempor incididunt ut labore eli sed do eiu.</h3>
              <p className="pl-8 border-l-2 border-l-yellow-300 mt-5 text-gray-500">
                Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              <button className="max-w-max text-white py-4 px-9 font-medium bg-black mt-5">ABOUT US</button>
            </div>
          </div>

        </div>
      </section>

      {/* 4th section */}
      <section className="my-28">
        <div className="max-w-screen-xl mx-auto">

          <div className="text-center lg:max-w-[75%] mx-auto mb-10 grid place-items-center">
            <p className="text-sm font-base">CORPORATE SERVICE</p>
            <h1 className="sm:text-5xl mt-3 lg:max-w-[75%] font-semibold">NEW WAYS TO CONNECT IN THE METAVERSE</h1>
          </div>

          <div className="cards-container px-5 grid lg:grid-cols-4 md:grid-cols-2 gap-8">

            <ServiceCard cardNumber={'01.'} cardTitle={'VIRTUAL TRAVELING'} bgImg={'https://gamic.themerex.net/wp-content/uploads/2020/04/post10-copyright-840x560.jpg'} />
            <ServiceCard cardNumber={'02.'} cardTitle={'AUGMENTED WORLD'} bgImg={'2nd-card.jpg'} />
            <ServiceCard cardNumber={'03.'} cardTitle={'ENDLESS 3D REALITY'} bgImg={'3rd-card.jpg'} />
            <ServiceCard cardNumber={'04.'} cardTitle={'SUPPORT'} bgImg={'4th-card.jpg'} />

          </div>

        </div>
      </section>

      {/* 5th section */}
      <section className="bg-[#F8F8F8]">
        <div className="max-w-screen-sm mx-auto text-center py-36">

          <div className="uppercase max-w-[75%] mx-auto font-semibold">
            <h1 className="font-medium">newsletter signup</h1>
            <h2 className="text-3xl mt-2">suscribe for the updates!</h2>
          </div>

          <div className="">
            <form className="mt-10 px-4">
              <div className="flex pb-2 border-b border-black">
                <input type="email" placeholder="Enter Your Email Addres" className="bg-transparent text-lg text-black focus:outline-none flex-1" />
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
              <div className="flex mt-5 gap-2 items-center">
                <input type="checkbox" />
                <p className="text-sm">I agree to the <a href="#" className="underline hover:text-teal-600">Privacy Policy</a></p>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 6th section */}
      <section className="md:h-[70vh] h-64 bg-[url(https://gamic.themerex.net/wp-content/uploads/2022/09/bg-abt-copyright.jpg)] bg-center bg-cover bg-no-repeat">
        <div className="h-full max-w-screen-md mx-auto flex justify-center items-center">
            <Link className="border-white border-2 rounded-full md:size-24 size-20 flex justify-center items-center">
              <span className="text-white">PLAY</span>
            </Link>
        </div>
      </section>

      {/* 7th section */}
      <section className="md:my-32 my-20">
        <div className="md:max-w-screen-xl mx-auto flex items-center max-md:flex-wrap gap-3 px-5">

          <div className="grid gap-4 md:basis-1/2">
            <h1 className="uppercase text-sm">the best team</h1>
            <h2 className="uppercase text-5xl font-semibold">we help you discover the metaverse</h2>
            <p>Dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia.</p>
            <Link className="mt-5 py-4 px-10 text-white bg-[#DCCD1C] max-w-max">About Us</Link>
          </div>

          <div className="md:basis-1/2 mt-5 relative">
            {/* bg img */}
            <img src="https://gamic.themerex.net/wp-content/uploads/2020/07/border-rad.png" alt="" />

            <div className="absolute md:size-24 size-14 top-20 left-10">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl2-copyright-150x150.jpg" alt="" />
            </div>
            <div className="absolute md:size-24 size-14 top-2/3 left-20">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl5-copyright-150x150.jpg" alt="" />
            </div>
            <div className="absolute md:size-28 size-14 top-2/3 right-20">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl6-copyright-150x150.jpg" alt="" />
            </div>
            <div className="absolute md:size-24 size-14 top-0 right-20">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl1-copyright-150x150.jpg" alt="" />
            </div>
            <div className="absolute md:size-24 size-14 top-40 right-0">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl4-copyright-150x150.jpg" alt="" />
            </div>
            <div className="absolute md:size-24 size-14 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <img className="rounded-full" src="https://gamic.themerex.net/wp-content/uploads/2022/09/image-ppl3-copyright-150x150.jpg" alt="" />
            </div>
          </div>

        </div>
      </section>

      {/* 8th section */}
      <section className="bg-[#F8F8F8] pb-20">
        <div className="max-w-screen-xl mx-auto pt-24 md:pt-48">

          <div className="uppercase max-w-max mx-auto text-center">
            <h1>our blog</h1>
            <h2 className="font-semibold text-5xl">latest vr news</h2>
          </div>

          <div className="mt-10 grid lg:grid-cols-3 px-5 gap-5 justify-center">
            <NewsCard title={"vr office games: upgraded graphics"} date={'Apr 16,2022'} noOfComments={10} bgImg={'https://gamic.themerex.net/wp-content/uploads/2022/04/post43-copyright-840x701.jpg'} />
            <NewsCard title={'the largest game development platform'} date={'Apr 17,2022'} noOfComments={20} bgImg={'https://gamic.themerex.net/wp-content/uploads/2022/04/post44-copyright-840x827.jpg'} />
            <NewsCard title={'awesome game to play with friends'} date={'Apr 19,2022'} noOfComments={16} bgImg={'https://gamic.themerex.net/wp-content/uploads/2022/04/post45-copyright-840x701.jpg'} />
          </div>
        </div>
      </section>
    </>
  );
}