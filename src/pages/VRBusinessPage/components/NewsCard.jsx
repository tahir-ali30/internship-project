import { Link } from "react-router-dom";

export default function NewsCard({ title, date, noOfComments, bgImg }) {
  return (
          <Link className="sm:size-96 p-10 flex flex-col justify-between relative group bg-white text-white md:text-black">
              <span
                  style={{backgroundImage:`url(${bgImg})`}}
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat md:opacity-0 md:scale-95 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
              <span
                  className="absolute inset-0 bg-cover bg-center bg-black/50 md:opacity-0 group-hover:opacity-100 transition-all duration-50" />

              <div className="z-10 text-white">
                  <span className="bg-[#FF3B53] p-2 px-3 text-xs">VR GAMES</span>
              </div>
              <div className="text-pretty z-10 group-hover:text-white">
                  <span className="uppercase text-2xl font-semibold">{title}</span>
                  <div className="flex gap-5 mt-4">
                      <span>{date}</span>
                      <span>{noOfComments} Comments</span>
                  </div>
              </div>
          </Link>
  )
}
