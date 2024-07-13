const About: React.FC = () => {
  return (
    <>
      <section className='intro text-slate-200'>
        <h1 className='text-6xl text-center text-purple-700 flex flex-col gap-2'>
          What is <span className='text-accent text-8xl font-bold'>Film Freak <b className="font-normal text-slate-200">?</b></span>
        </h1>
        <p className='text-lg text-center text-gray-500 mt-6'>
          The best place to find your favorite movies
        </p>
      </section>
      <div className="flex flex-col gap-9 mt-12">
        <section 
          id="mission" 
          aria-labelledby="mission"
        >
          <h2 className='text-4xl text-center text-purple-600'>Our Mission</h2>
          <p className='text-lg text-gray-500 mt-4'>
            At Film Freak, our mission is to provide movie enthusiasts with an extensive database of films and TV shows. 
            We aim to be the go-to platform for discovering new and classic movies, as well as keeping up with the latest releases.
          </p>
        </section>
        <section 
          id="offer"
          aria-labelledby="offer"
          >
          <h2 className='text-4xl text-center text-purple-600'>What We Offer</h2>
          <ul className='list-disc list-inside mt-4 text-gray-500'>
            <li className='mt-2'>A comprehensive database of movies and TV shows</li>
            <li className='mt-2'>Detailed information on cast, crew, and genres</li>
            <li className='mt-2'>User reviews and ratings</li>
            <li className='mt-2'>Personalized recommendations based on your preferences</li>
            <li className='mt-2'>The latest news and updates from the film industry</li>
          </ul>
        </section>
        <section 
          id="team"
          aria-labelledby="team"
        >
          <h2 className='text-4xl text-center text-purple-600'>Our Team</h2>
          <p className='text-lg text-gray-500 mt-4'>
            Our dedicated team of film enthusiasts and technology experts work tirelessly to bring you the best movie-watching experience. 
            We are passionate about movies and committed to helping you discover your next favorite film.
          </p>
        </section>
        <section
          id="contact" 
          aria-labelledby="contact"
        >
          <h2 className='text-4xl text-center text-purple-600'>Contact Us</h2>
          <p className='text-lg text-gray-500 mt-4'>
            Have any questions or feedback? We'd love to hear from you!
          </p>
          <p className='text-lg text-gray-500 mt-2'>
            Email us at <a href="mailto:support@filmfreak.com" className='text-accent underline'>support@filmfreak.com</a> or follow us on our social media channels.
          </p>
        </section>
      </div>
    </>
  );
};

export default About;
