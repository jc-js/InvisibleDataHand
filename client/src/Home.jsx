import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
<div className="flex flex-col">

{/* ─── HERO CARD SECTION ────────────────────────────────────────── */}
<section className="py-20 px-6">
  <div className="max-w-7xl mx-auto">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
      {/* Image side */}
      <div
        className="md:w-1/2 h-64 md:h-auto bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1677871598276-85b14ea353ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        }}
      />

      {/* Text side */}
      <div className="md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-[3.5rem] font-bold mb-4 text-gray-900">
          Build Your Economic Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          Visualize key economic indicators, analyze trends, and build
          custom reports — all in a few clicks.
        </p>
        <div className="flex flex-col sm:flex-row gap-7">
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
