"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Icons ---
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

// --- FadeUp Wrapper ---
const FadeUpSection = ({ children, delay = 0, isVisible, className = "" }) => (
  <div
    className={`transform transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
    } ${className}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const FILTER_PILLS = [
  "All Products", "Flanges", "Buttweld Fittings", "Connectors", 
  "Forged Fittings", "Fasteners", "Refractory Anchors", "Forging Products", 
  "Gaskets", "Sheets, Plates & Coils", "Rods and Bars", 
  "Non ferrous metals", "Pipes"
];

// --- Main Products Array (For Grid & Filters) ---
const ALL_PRODUCTS = [
  { id: 1, category: "Connectors", name: "Stainless Steel Insulation Gasket Kits", slug: "stainless-steel-insulation-gasket-kits", desc: "Insulation gasket kits made from various stainless steel grades.", image: "/products/connectors/Male Connector.jpg" },
  { id: 2, category: "Connectors", name: "Parker 8-6 HBZ-SS Reducing Union", slug: "parker-8-6-hbz-ss-reducing-union", desc: "Reducing unions made of stainless steel AISI 316.", image: "/products/connectors/Tube To Union.jpg" },
  { id: 3, category: "Connectors", name: "Corten Steel Panels", slug: "corten-steel-panels", desc: "Weathering steel panels with protective patina finish.", image: "/products/connectors/CS Check Valves.jpg" },
  { id: 4, category: "Connectors", name: "Forged Stainless Steel Tube Union Elbow", slug: "forged-stainless-steel-tube-union-elbow", desc: "Forged union elbows in multiple stainless alloys and metals.", image: "/products/connectors/SS Union Elbow.jpg" },
  { id: 5, category: "Flanges", name: "Nipo Flange", slug: "nipo-flanges", desc: "Specialized nipo flanges for branch pipe connections.", image: "/products/flanges/Steel Nipoflange.jpg" },
  { id: 6, category: "Flanges", name: "SLIP ON FLANGES", slug: "slip-on-flanges", desc: "High-quality slip-on flanges for various industrial applications.", image: "/images/flangs/SLIP ON FLANGES/SS_SLIP_ON_FLANGES.jpeg" },
  { id: 7, category: "Flanges", name: "RING TYPE JOINT FLANGES", slug: "ring-type-joint-flanges", desc: "RTJ flanges engineered for high-pressure, leak-proof sealing.", image: "/products/flanges/ring-type-joint-flanges.jpg" },
  { id: 8, category: "Flanges", name: "SPECTACLE BLIND FLANGES", slug: "spectacle-blind-flanges", desc: "Spectacle blind flanges for flow control and isolation.", image: "/products/flanges/Spectacle Blind Flanges_.jpg" },
  { id: 9, category: "Flanges", name: "DIN FLANGES", slug: "din-flanges", desc: "DIN standard flanges for European piping applications.", image: "/images/flangs/DIN FLANGES/DIN PN-10 SS Slip On Flanges.jpg" },
  { id: 10, category: "Flanges", name: "THREADED FLANGES", slug: "threaded-flanges", desc: "Threaded flanges for easy and secure pipe threading.", image: "/products/flanges/Stainless Threaded Flanges.jpg" },
  { id: 11, category: "Flanges", name: "BLIND FLANGES", slug: "blind-flanges", desc: "Blind flanges for sealing and capping pipeline ends.", image: "/products/flanges/BLIND FLANGES.jpg" },
  { id: 12, category: "Flanges", name: "Body Flanges", slug: "body-flanges", desc: "Specialized body flanges for industrial piping applications.", image: "/products/flanges/Body Flanges.jpg" },
  { id: 13, category: "Flanges", name: "AWWA_FLANGES", slug: "awwa-flanges", desc: "AWWA standard flanges designed for potable water systems.", image: "/products/flanges/Awwa Flanges.jpg" },
  { id: 14, category: "Flanges", name: "LONG_WELD", slug: "long-weld", desc: "Extended weld neck flanges for high-strength pipeline joints.", image: "/products/flanges/Alloy Steel Long Weld Neck Flanges.jpg" },
  { id: 15, category: "Flanges", name: "WELD NECK FLANGES", slug: "weld-neck-flanges", desc: "Durable weld neck flanges for secure, leak-proof connections.", image: "/products/flanges/Alloy Steel WNRF Flanges.webp" },
  { id: 17, category: "Buttweld Fittings", name: "ANSI B16.28 Swage Nipple", slug: "ansi-b16-28-swage-nipple", desc: "Swage nipples meeting multiple ANSI and JIS dimension standards.", image: "/products/Buttweld Fittings/SS Swage Nipple.webp" },
  { id: 19, category: "Buttweld Fittings", name: "ASTM A403 Stainless Steel Reducing Tee", slug: "astm-a403-stainless-steel-reducing-tee", desc: "Reducing tees compliant with ASTM and ANSI standards.", image: "/products/Buttweld Fittings/ASME1.png" },
  { id: 20, category: "Buttweld Fittings", name: "ANSI B16.28 5D/6D Pipe Bend", slug: "ansi-b16-28-5d-6d-pipe-bend", desc: "Precision 5D/6D pipe bends for smooth flow and durability.", image: "/products/Buttweld Fittings/ANSI B16.28.png" },
  { id: 21, category: "Buttweld Fittings", name: "ASME / ANSI B16.9 Barred Tee", slug: "asme-ansi-b16-9-barred-tee", desc: "Certified barred tees compliant with ASME and ANSI standards.", image: "/products/Buttweld Fittings/ASME2.png" },
  { id: 22, category: "Buttweld Fittings", name: "Cross Reducers", slug: "cross-reducers", desc: "Reducers available in concentric and eccentric designs.", image: "/products/Buttweld Fittings/Duplex Steel Concentric Reducer.jpg" },
  { id: 18, category: "Forged Fittings", name: "ANSI B16.28 Stainless Steel Cross Tee", slug: "ansi-b16-28-stainless-steel-cross-tee", desc: "Cross tees available in multiple thickness schedules.", image: "/products/Buttweld Fittings/SS Cross Tee.jpg" },
  { id: 16, category: "Forged Fittings", name: "ANSI B16.9 Forged Concentric Reducer", slug: "ansi-b16-9-forged-concentric-reducer", desc: "Concentric reducers compliant with ASME and ASTM standards.", image: "/products/Buttweld Fittings/Forged Concentric Reducer.jpg" },
  { id: 23, category: "Forged Fittings", name: "ASTM A234 WP11 Pipe Reducing Tee", slug: "astm-a234-wp11-pipe-reducing-tee", desc: "Reducing tees forged to ASTM standards for pipe size changes.", image: "/products/Forged Fittings/Carbon Steel Reducing Tee.jpg" },
  { id: 24, category: "Forged Fittings", name: "Elbow Outlet Pipe Fittings", slug: "elbow-outlet-pipe-fittings", desc: "Elbow outlet fittings designed for tight directional changes.", image: "/products/Forged Fittings/Elbow Outlets.jpg" },
  { id: 25, category: "Forged Fittings", name: "Stainless Steel Threaded Outlets", slug: "stainless-steel-threaded-outlets", desc: "Threaded outlets built for reliable high-pressure systems.", image: "/products/Forged Fittings/Threaded Outlet.jpg" },
  { id: 26, category: "Forged Fittings", name: "ASTM A182 Flange Outlets", slug: "astm-a182-flange-outlets", desc: "Flange outlets forged for secure pipeline connections.", image: "/products/Forged Fittings/SS Flange Outlets.jpg" },
  { id: 27, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", slug: "astm-a182-nipple-outlet", desc: "Sweep nipple outlets designed for smooth flow transitions.", image: "/products/Forged Fittings/SS Sweep Outlet.jpg" },
  { id: 28, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", slug: "astm-a182-nipple-outlets", desc: "Robust forged nipple outlets for reliable pipe branches.", image: "/products/Forged Fittings/SS Nipple Outlet.jpg" },
  { id: 29, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", slug: "forged-cross-pipe-fitting", desc: "Forged threaded cross fittings for strong, precise connections.", image: "/products/Forged Fittings/Forged Threaded Cross.jpg" },
  { id: 30, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", slug: "forged-cross-pipe-fittings", desc: "Forged cross fittings meeting ASME and MSS standards.", image: "/products/Forged Fittings/Socketweld Forged Tee.jpg" },
  { id: 31, category: "Fasteners", name: "ASTM A325 U Bolts", slug: "astm-a325-u-bolts", desc: "U-shaped bolts for pipe and rod support.", image: "/products/Fasteners/Stainless Steel U Bolt.jpg" },
  { id: 32, category: "Fasteners", name: "ASTM A325 Fasteners", slug: "astm-a325-fasteners", desc: "Versatile ASTM A325 fasteners for multiple applications.", image: "/products/Fasteners/Anchor.jpg" },
  { id: 33, category: "Fasteners", name: "ASTM A325 Eye Bolts", slug: "astm-a325-eye-bolts", desc: "Eye bolts for lifting and rigging applications.", image: "/products/Fasteners/Shoulder Eye Bolt.jpg" },
  { id: 34, category: "Fasteners", name: "Stainless Steel Anchor & Foundation Bolts", slug: "stainless-steel-anchor-foundation-bolts", desc: "Anchor and foundation bolts securing structural foundations.", image: "/products/Fasteners/Sleeve Anchor Bolts.jpg" },
  { id: 35, category: "Fasteners", name: "ASTM A325 Washers", slug: "astm-a325-washers", desc: "Flat washers for load distribution in bolted joints.", image: "/products/Fasteners/SS Flat Washer.jpg" },
  { id: 36, category: "Fasteners", name: "ASTM A193 B7 Stud Bolts", slug: "astm-a193-b7-stud-bolts", desc: "Stud bolts manufactured for heavy-duty industrial use.", image: "/products/Fasteners/Stainless Steel Studs.jpg" },
  { id: 37, category: "Fasteners", name: "ASTM A325 Heavy Hex Nuts", slug: "astm-a325-heavy-hex-nuts", desc: "Heavy hex nuts designed for structural security.", image: "/products/Fasteners/Steel Heavy Hex Nuts.jpg" },
  { id: 38, category: "Fasteners", name: "ASTM A325 Hex Bolts", slug: "astm-a325-hex-bolts", desc: "High-strength hex bolts for industrial fastening needs.", image: "/products/Fasteners/Hex Bolt.jpg" },
  { id: 39, category: "Refractory Anchors", name: "Customized Stainless Steel Refractory Anchors", slug: "customized-stainless-steel-refractory-anchors", desc: "Customized anchors tailored for specific refractory lining needs.", image: "/products/Refractory Anchors/Refractory Anchors UV Type.jpg" },
  { id: 40, category: "Refractory Anchors", name: "U Type Refractory Anchors", slug: "u-type-refractory-anchors", desc: "U-shaped refractory anchors for reliable liner fixing.", image: "/products/Refractory Anchors/SS U ANCHORS.jpg" },
  { id: 41, category: "Refractory Anchors", name: "Stainless Steel Y Type Refractory Anchors", slug: "stainless-steel-y-type-refractory-anchors", desc: "Y-type anchors designed for high-temperature lining support.", image: "/products/Refractory Anchors/Refractory Y Type Anchors.jpg" },
  { id: 42, category: "Refractory Anchors", name: "V Shaped Refractory Anchors", slug: "v-shaped-refractory-anchors", desc: "V-shaped anchors for secure refractory lining attachment.", image: "/products/Refractory Anchors/Refractory V Anchors.jpg" },
  { id: 43, category: "Forging Products", name: "Customized Stainless Steel and Carbon Steel Forgings", slug: "customized-stainless-steel-and-carbon-steel-forgings", desc: "Custom forged parts crafted for specialized applications.", image: "/products/Forging Products/Customize Hot Forging.jpg" },
  { id: 44, category: "Forging Products", name: "Stainless Steel and Carbon Steel Propeller Shafts & Forged Round Bars", slug: "stainless-steel-and-carbon-steel-propeller-shafts-forged-round-bars", desc: "Propeller shafts and forged bars for marine and industrial use.", image: "/products/Forging Products/CS Forged Round Bar.jpg" },
  { id: 45, category: "Forging Products", name: "ASTM A105 Carbon Steel Rotor Shafts", slug: "astm-a105-carbon-steel-rotor-shafts", desc: "Carbon steel rotor shafts designed for machinery applications.", image: "/products/Forging Products/ROTER SHAFT.jpg" },
  { id: 46, category: "Forging Products", name: "Carbon Steel Forged Rings ASTM A105", slug: "carbon-steel-forged-rings-astm-a105", desc: "Carbon steel forged rings for heavy-duty industrial use.", image: "/products/Forging Products/Carbon Steel Forged Ring.jpg" },
  { id: 47, category: "Gaskets", name: "Stainless Steel Graphite Filler Gaskets", slug: "stainless-steel-graphite-filler-gaskets", desc: "Graphite filler gaskets for superior sealing performance.", image: "/products/Gaskets/Monel Graphite Filler Gaskets.jpg" },
  { id: 48, category: "Gaskets", name: "SS 316 and High Nickel Octagonal Ring Type Joint Gaskets", slug: "ss-316-and-high-nickel-octagonal-ring-type-joint-gaskets", desc: "Octagonal gaskets for enhanced sealing in critical systems.", image: "/products/Gaskets/OCTOGONAL GASKETS.jpg" },
  { id: 49, category: "Gaskets", name: "Alloy 20 and Stainless Steel Ring Type Joint Gaskets", slug: "alloy-20-and-stainless-steel-ring-type-joint-gaskets", desc: "Ring joint gaskets for leak-proof high-pressure connections.", image: "/products/Gaskets/RING JOINT TYPE GASKETS.jpg" },
  { id: 50, category: "Gaskets", name: "Spiral Wound Gaskets", slug: "spiral-wound-gaskets", desc: "Spiral wound gaskets for high-pressure flange sealing.", image: "/products/Gaskets/Spiral Wound Gaskets_.jpg" },
  { id: 51, category: "Gaskets", name: "Stainless Steel Insulation Gasket Kits", slug: "stainless-steel-insulation-gasket-kits", desc: "Insulation gasket kits for reliable sealing and insulation.", image: "/products/Gaskets/Monel Insulation Gasket.jpg" },
  { id: 52, category: "Sheets, Plates & Coils", name: "Sheets, Plates & Coils", slug: "sheets-plates-coils", desc: "High-quality sheets, plates, and coils known for superior strength, corrosion resistance, and smooth finish — ideal for industrial and construction applications.", image: "/products/Sheets, Plates & Coils/sheet-plate-coil.png" },
  { id: 53, category: "Rods and Bars", name: "Rods, Bars & Wires", slug: "rods-bars-wires", desc: "Precision-engineered rods and bars offering excellent strength, durability, and corrosion resistance for construction and manufacturing applications.", image: "/products/Rods and Bars/Rods.jpg" },
  { id: 54, category: "Non ferrous metals", name: "Copper Tubes", slug: "copper-tubes", desc: "High-conductivity copper products known for excellent electrical and thermal performance, ideal for wiring, heat exchangers, and industrial use.", image: "/products/Non ferrous metals/copper-pipe.jpg" },
  { id: 55, category: "Non ferrous metals", name: "Brass Tubes", slug: "brass-tubes", desc: "Durable and corrosion-resistant brass materials suitable for fittings, valves, and decorative components in marine and industrial environments.", image: "/products/Non ferrous metals/Brass-tubes.jpg" },
  { id: 56, category: "Non ferrous metals", name: "Cupronickel", slug: "cupronickel", desc: "Cupronickel alloys offering superior resistance to seawater corrosion, widely used in shipbuilding, condensers, and desalination plants.", image: "/products/Non ferrous metals/Cupronickel-Images.jpg" },
  { id: 57, category: "Buttweld Fittings", name: "Cap", slug: "cap", desc: "A pipe fitting used to seal the end of a pipe, ensuring leak-proof closure and protection from contamination.", image: "/products/Buttweld Fittings/cap.jpg" },
  { id: 58, category: "Buttweld Fittings", name: "Stub End", slug: "stub-end", desc: "A pipe fitting used to connect pipes with lap joint flanges, allowing easy disassembly and providing a secure, leak-proof joint.", image: "/products/Buttweld Fittings/stub-end.jpg" },
  { id: 59, category: "Pipes", name: "Seamless Pipes", slug: "seamless-pipes", desc: "Seamless pipes manufactured without welding, offering high strength, corrosion resistance, and reliable performance in high-pressure and high-temperature applications.", image: "/products/Pipes/seamless-pipes.jpg" },
  { id: 60, category: "Pipes", name: "Welded Pipes", slug: "welded-pipes", desc: "Welded pipes manufactured by rolling and welding steel plates, offering high strength, durability, and cost-effective solutions for fluid transport and structural applications.", image: "/products/Pipes/welded-pipes.png" },
  { id: 61, category: "Pipes", name: "ERW Pipes", slug: "erw-pipes", desc: "Electric Resistance Welded pipes manufactured with high precision, offering uniform thickness, smooth finish, and cost-effective performance for structural and pipeline applications.", image: "/products/Pipes/erw-pipes.png" },
  { id: 62, category: "Pipes", name: "Electro Polished Pipes", slug: "electro-polished-pipes", desc: "Premium stainless steel pipes with electro-polished mirror finish, offering ultra-smooth surface, high corrosion resistance, and hygienic performance for critical applications.", image: "/products/Pipes/electro-polished-pipes.png" },
  { id: 63, category: "Pipes", name: "EFW Pipes", slug: "efw-pipes", desc: "Electric Fusion Welded pipes designed for large-diameter applications, offering high strength, durability, and reliable performance in demanding industrial environments.", image: "/products/Pipes/efw-pipes.png" },
];

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    // Reveal grid items on load
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Check URL parameters for initial category filter
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const categoryParam = params.get('category');
      
      if (categoryParam) {
        const matchingCategory = FILTER_PILLS.find(p => p.toLowerCase() === categoryParam.toLowerCase());
        if (matchingCategory) {
          setActiveCategory(matchingCategory);
        }
      }
    }

    return () => clearTimeout(timer);
  }, []);

  const products = ALL_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#ffffff] min-h-screen pt-16 pb-24 font-sans relative overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmerLine {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(300%); }
          }
          .animate-shimmer-line {
            animation: shimmerLine 2s infinite linear;
          }
          @keyframes fadeUpAnim {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up {
            animation: fadeUpAnim 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
          }
        `
      }} />

      <div className="animate-fade-up" style={{ animationDelay: '0ms' }}>
        
        {/* --- SECTION 1: Products Header --- */}
        <div className="text-center mb-10 px-4">
          <h1 className="text-4xl md:text-[50px] font-extrabold inline-block relative mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6]">
            Products
            <div className="absolute -bottom-3 left-[15%] right-[15%] h-[4px] bg-[#EAECEF] rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] animate-shimmer-line rounded-full"></div>
            </div>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-medium max-w-2xl mx-auto mt-4 leading-relaxed tracking-wide">
            Discover our comprehensive range of high-quality flanges and steel products
          </p>
        </div>

        {/* --- SECTION 2: Search Bar & Filter Pills --- */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-[5%] mb-16">
          <div className="relative w-full max-w-[1050px] mx-auto mb-10">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-16 py-5 rounded-full border border-gray-100 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#2EC4FF]/40 text-lg text-gray-700 placeholder-gray-400 transition-shadow tracking-wide"
            />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-black font-bold">
              <SearchIcon />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-[1100px] mx-auto">
            {FILTER_PILLS.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(pill)}
                className={`px-5 py-2.5 text-[15px] font-medium rounded-full transition-all duration-300 tracking-wide ${
                  activeCategory === pill 
                    ? "bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] text-white shadow-[0_8px_20px_-6px_rgba(46,196,255,0.5)]" 
                    : "bg-[#EAECEF] text-gray-800 hover:bg-gray-300"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* --- SECTION 3: Grid and Card Layout --- */}
        <div className="max-w-[1350px] mx-auto px-4 md:px-[5%]" ref={gridRef}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
            {products.map((product, index) => {
              return (
                <FadeUpSection 
                  key={product.id} 
                  isVisible={isVisible} 
                  delay={(index % 3) * 150 + Math.floor(index / 3) * 100} 
                >
                  <Link 
                    href={`/product/${product.slug}`}
                    className="block group relative flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(46,196,255,0.4)] hover:-translate-y-1"
                  >
                    
                    {/* --- UPDATED IMAGE SECTION --- */}
                    <div className={`relative w-full aspect-[16/10] overflow-hidden ${
                      product.id === 6 || product.id === 20  ? 'bg-white' : 'bg-gray-50'
                    }`}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className={`absolute inset-0 w-full h-full transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 ${
                          product.id === 6 || product.id === 20 ? 'object-contain p-4' : 'object-cover'
                        }`}
                      />
                    </div>

                    <div className="relative flex flex-col p-6 md:p-8 overflow-hidden grow">
                      <div className="absolute inset-0 bg-white border-t border-gray-100 transition-opacity duration-500 z-0 opacity-100 group-hover:opacity-0"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] transition-opacity duration-500 z-0 opacity-0 group-hover:opacity-100"></div>

                      <div className="relative z-10 flex flex-col h-full">
                        <span className="block text-xs md:text-sm font-medium tracking-wide uppercase mb-2 transition-colors duration-500 text-[#626569] group-hover:text-[#EAF4FF]">
                          {product.category}
                        </span>
                        
                        <p className="text-sm mb-5 line-clamp-2 transition-colors duration-500 text-gray-500 group-hover:text-blue-100 leading-relaxed">
                          {product.desc}
                        </p>

                        <div className="flex justify-between items-center gap-4 mt-auto">
                          <h3 className="text-xl md:text-[22px] font-semibold tracking-tight leading-snug transition-colors duration-500 text-[#06367b] group-hover:text-white">
                            {product.name}
                          </h3>
                          
                          <div className="relative shrink-0 flex items-center justify-center rounded-full overflow-hidden transition-shadow duration-500 px-4 py-2 md:px-5 md:py-2.5 shadow-sm group-hover:shadow-md">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] transition-opacity duration-500 opacity-100 group-hover:opacity-0"></div>
                            <div className="absolute inset-0 bg-white transition-opacity duration-500 opacity-0 group-hover:opacity-100"></div>
                            <div className="relative z-10 flex items-center gap-2 font-bold text-sm transition-colors duration-500 text-white group-hover:text-[#06367b] tracking-wide">
                              <span className="hidden md:block">View</span>
                              <div className="transform transition-transform duration-500 group-hover:translate-x-1">
                                <ArrowRight />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </FadeUpSection>
              );
            })}
          </div>

          {products.length === 0 && (
            <div className="text-center text-gray-500 py-12 tracking-wide text-lg">
              No products found matching your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;