import React from 'react'

export default function ServiceCard({ cardNumber, cardTitle, bgImg }) {
  return (
    <div
      style={{backgroundImage: `url(${bgImg})`}}
      className={`card text-white relative group grid min-h-[25rem] px-14 py-8 bg-cover bg-center cursor-pointer bg-opacity-50`}>
      <div className="z-10 transition-all duration-500 -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
        <span className="text-xl font-semibold mb-7">{cardNumber}</span>
      </div>
      <div className="z-10 transition-all duration-500 self-end translate-y-2 group-hover:translate-y-0">
        <h1 className="text-xl font-semibold max-w-48">{cardTitle}</h1>
        <span className="opacity-0 group-hover:opacity-100">Services</span>
      </div>
    </div>
  )
}
