import React,{useState,useEffect, useRef} from 'react'

function Made() {


  const companies = [
    'Apple', 'Google', 'Microsoft', 'Amazon', 'Meta', 
    'Netflix', 'Tesla', 'Adobe', 'Intel', 'IBM'
  ];

  const containerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      setScrollPosition(scrollTop);
    };

    // Add scroll event listener to the container
    container.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const madeFor = [
    {
      id: 1,
      icon: "https://img.icons8.com/?size=100&id=999&format=png&color=34AF9D",
      title:"Startups",
      description:"You’ve just launched your project, and want to minimise risk of downtime",
    },
    {
      id:2,
      icon:"https://img.icons8.com/?size=100&id=2333&format=png&color=34AF9D",
      title:"Business",
      description:"You need to avoid lost revenue from a website outage",
    },
    {
      id:3,
      icon:"https://img.icons8.com/?size=100&id=3686&format=png&color=34AF9D",
      title:"E-Commerce",
      description:"You need to keep your online retail business running 24/7",
    },
    {
      id:4,
      icon:"https://img.icons8.com/?size=100&id=11151&format=png&color=34AF9D",
      title:"Developers",
      description:"You need advanced settings to set up requests and responses",
    }
  ]

  return (
    <div className='bg-greyish mt-24 mb-4 px-8 pt-8 pb-20'>
      <h2 className='text-center text-4xl font-semibold m-8'>Made for you</h2>
      <ul className='flex justify-evenly'>
        {madeFor.map((item) => (
          <li key={item.id} className='flex flex-col items-center w-60 h-[280px] pt-10 px-4 bg-white rounded-md shadow-lg'>
            <img src={item.icon} alt={item.title} className='w-10 h-10' />
            <h3 className='text-2xl font-semibold my-4'>{item.title}</h3>
            <p className='text-md text-center px-2 text-[#131117] opacity-70'>{item.description}</p>
          </li>
        ))}
      </ul>

      <div 
      ref={containerRef}
      className="w-full h-24 overflow-y-auto scrollbar-hide"
      style={{
        scrollbarWidth: 'none',  
        msOverflowStyle: 'none',  
        WebkitOverflowScrolling: 'touch',
      }}
    >
      
      <div className="h-[200vh]">
        <div className="sticky top-8 w-full overflow-hidden py-6 ">
          <div className="relative">
            <div 
              className="flex whitespace-nowrap transition-transform duration-500"
              style={{
                transform: `translateX(-${scrollPosition}px)`,
              }}
            >
              {[...companies, ...companies, ...companies].map((company, index) => (
                <div 
                  key={index}
                  className="inline-block px-8 text-xl font-medium text-gray-600"
                >
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Made
