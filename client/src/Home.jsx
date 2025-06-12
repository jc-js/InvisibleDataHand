import React from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const logos = [
  { name: 'BSL',     image: '/carousel_logos/BLS_logo.png' },
  { name: 'FRED',    image: '/carousel_logos/fred_logo.png' },
  { name: 'IMF',     image: '/carousel_logos/imf_logo.png' },
  { name: 'OECD', image: '/carousel_logos/OECD_logo.png' },
  { name: 'Open Exchange Rates',    image: '/carousel_logos/open_exchange_rates_logo.png' },
  { name: 'OWID',     image: '/carousel_logos/OWID_logo.png' },
  { name: 'The World Bank',    image: '/carousel_logos/the_world_bank_logo.png' },
  { name: 'UN Comtrade',  image: '/carousel_logos/UN_comtrade_logo.png' }
];

const responsiveOptions = [
  { breakpoint: '1024px', numVisible: 5 },
  { breakpoint: '768px',  numVisible: 3 },
  { breakpoint: '560px',  numVisible: 1 }
];

const logoTemplate = (logo) => (
  <div className="p-d-flex p-jc-center p-ai-center p-p-4">
    <img
      src={logo.image}
      alt={logo.name}
      className="p-mx-4"
      style={{ maxHeight: '3rem' }}
    />
  </div>
);

    return (
<div className="flex flex-col">

{/* ─── HERO CARD SECTION ────────────────────────────────────────── */}
<section className="py-20 px-6">
    <div className="max-w-7xl mx-auto">
    <div
      className="
        relative rounded-lg overflow-hidden
        h-96 md:h-[500px]
        bg-[url('https://images.unsplash.com/photo-1677871598276-85b14ea353ce?q=80&w=2070&auto=format&fit=crop')]
        bg-cover bg-center
      "
    >
      <div className="absolute inset-0" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 sm:px-12">
        <h1 className="text-[3.5rem] font-bold text-white mb-4">
          Build Your Economic Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-6 text-white">
          Visualize key economic indicators, analyze trends, and build
          custom reports — all in a few clicks.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            label="Start Building"
            icon="pi pi-plus-circle"
            onClick={() => navigate('/builder')}
            className="p-button-raised p-button-rounded"
          />
          <Button
            label="Explore Comparisons"
            icon="pi pi-chart-line"
            onClick={() => navigate('/compare')}
            className="p-button-raised p-button-rounded"
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ─── TOP SOURCES CAROUSEL ──────────────────────────────────── */}
<section className="py-20 px-6 bg-gray-50">
  <h2 className="text-3xl font-bold text-center mb-12">Top soruces from</h2>

      <Carousel
        value={logos}
        numVisible={5}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        circular
        autoplayInterval={2500}
        itemTemplate={logoTemplate}
        showIndicators={false}
        showNavigators={false}
        className="p-w-full p-max-w-6xl p-mx-auto"
      />
</section>

        {/* ─── GET STARTED IN SECONDS ───────────────────────────── */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Get Started in Seconds</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-6">
            No setup required. Just select your indicators, customize your view, and start analyzing.
          </p>
          <Button
            label="Try It Now"
            icon="pi pi-play"
            onClick={() => navigate('/builder')}
            className="p-button-raised p-button-rounded"
          />
        </div>
      </section>

      {/* ─── WHAT YOU CAN BUILD ────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">What You Can Build</h2>
        <div className="max-w-5xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Custom Charts</h3>
            <p>Drag & drop indicators and get exactly the graph you need.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Comparisons</h3>
            <p>Side-by-side economic trends for countries, years, or sectors.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Automated Reports</h3>
            <p>Schedule periodic exports and share insights with your team.</p>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ──────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
        <p className="max-w-3xl mx-auto text-center mb-8">
          We combine a rock-solid data backend with an intuitive builder interface so you spend less time wrestling data
          and more time making decisions.
        </p>
        <ul className="max-w-md mx-auto space-y-4 text-lg list-disc list-inside">
          <li>Instant access to the latest FRED, BLS, and OECD data</li>
          <li>Fully customizable dashboards—no code needed</li>
          <li>Collaborate & share in one click</li>
        </ul>
      </section>

      {/* ─── ABOUT US ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-center">
          We're a small team of economists and engineers passionate about making economic data accessible to everyone.  
          Founded in 2025, our mission is to empower analysts, students, and decision-makers with real-time insights.
        </p>
      </section>

    </div>
  );
}

export default Home;
