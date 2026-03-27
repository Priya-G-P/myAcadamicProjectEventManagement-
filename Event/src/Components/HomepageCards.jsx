import React from 'react'

const cards = [
  {
    title: "WEDDING PLANNERS",
    desc: "Have you ever dreamed of planning the perfect dream event to be remembered forever?.",
    image: "WeddingImage.jpg"
  },

  {
    title: "CORPORATE IT EVENT",
    desc: "If you want to make a statement at your next corporate event,partner with melodia event management company in karnataka.",
    image: "gallery5.jpeg"
  },

  {
    title: "Catering services",
    desc: "Catering services provide prepared food and beverages for events, parties, and functions at a chosen location.",
    image: "gallery9.jpeg"
  },

  {
    title: "BIRTHDAY EVENT",
    desc: "From decor to games-everything to make the day special.",
    image: "brithdayimg.jpeg"
  },

  {
    title: "FESTIVAL EVENT",
    desc: "Festival event management is the planning and organizing of celebrations that bring people together through culture, fun, and creativity.",
    image: "FestivaImage.jpg"
  },

  {
    title: "HOUSE WARMING",
    desc: "A housewarming is a party or ceremony to celebrate a person or family moving into a new home, where guests are invited to share in the joy of the new beginning, tour the home, and give gifts.",
    image: "HouseWarmingImage.jpg"
  },
];

function Card() {
  return (
    <>
      <div>
        <div className="w-full h-screen bg-white">

          <div className="px-6 py-12 ">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 ">

              {cards.map((card, idx) => (
                <div key={idx}
                  className="group relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ">
                  <div className="h-64 w-full ">
                    <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 " loading="lazy"
                      src={card.image} alt={card.title} />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5"> </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 z-20 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="text-yellow-200">
                      <div className="text-2xl font-bold drop-shadow-md">{card.title}</div>
                      <div className="mt-3 max-w-md text-sm leading-relaxed text-white/90"> {card.desc} </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card