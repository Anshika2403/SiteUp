import React, { useState, useEffect } from 'react';

const CardCarousel = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'FCP Monitor', image:"https://img.icons8.com/?size=100&id=46598&format=png&color=000000" },
    { id: 2, title: 'User Engagement', image:"https://img.icons8.com/?size=100&id=o9fLHeuFjD3l&format=png&color=000000" },
    { id: 3, title: 'Response Time Monitor', image:"https://img.icons8.com/?size=100&id=GlE0MZgPqy9V&format=png&color=000000" },
    { id: 4, title: 'SSL Monitor', image:"https://img.icons8.com/?size=100&id=4eabPHhqJGbJ&format=png&color=000000" },
    { id: 5, title: 'Get Notified', image:"https://img.icons8.com/?size=100&id=uK1JeQG014iR&format=png&color=000000" },
    { id: 6, title: 'Monitor Links', image:"https://img.icons8.com/?size=100&id=hfmtYV1qpMTR&format=png&color=000000" },
  ]);

  const [centerIndex, setCenterIndex] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCards(prevCards => {
        const newCards = [...prevCards];
        const firstCard = newCards.shift();
        newCards.push(firstCard);
        return newCards;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index) => {
    const position = index - centerIndex;
    const absPosition = Math.abs(position);
    
    let scale = 1 - (absPosition * 0.2);
    
    let blur = absPosition * 2;
    
    let zIndex = 5 - absPosition;
    
    let opacity = 1 - (absPosition * 0.2);

    return {
      transform: `scale(${scale})`,
      filter: `blur(${blur}px)`,
      zIndex,
      opacity
    };
  };

  return (
    <div className="relative h-96 w-full overflow-hidden">
      <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="absolute transition-all duration-500 ease-in-out"
            style={{
              ...getCardStyle(index),
              left: `${(index - 2) * 260}px`
            }}
          >
            <div className="w-64 h-56 bg-white rounded-lg shadow-xl p-4 flex flex-col border-2 border-gray-100">
              <h3 className="text-xl font-bold mb-2 text-gray-500">{card.title}</h3>
              <img src={`${card.image}`}  className="relative top-0 left-16 w-40"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;