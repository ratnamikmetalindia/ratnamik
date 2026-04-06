"use client"
import React, { useState, useEffect, useRef } from 'react';

// --- Icons ---
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
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

// New Premium Bullet Icon
const PremiumBulletIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="12" fill="url(#paint0_linear)" fillOpacity="0.12"/>
    <path d="M10 16.4L6 12.4L7.41 10.99L10 13.57L16.59 6.98L18 8.4L10 16.4Z" fill="url(#paint0_linear)"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#06367b"/>
        <stop offset="0.5" stopColor="#2EC4FF"/>
        <stop offset="1" stopColor="#075ca6"/>
      </linearGradient>
    </defs>
  </svg>
);

const FILTER_PILLS = [
  "All Products", "Flanges", "Buttweld Fittings", "Connectors", 
  "Forged Fittings", "Fasteners", "Refractory Anchors", "Forging Products", 
  "Gaskets", "Designer Sheets", "Sheets, Plates & Coils", "Rods and Bars", 
  "Non ferrous metals", "Other"
];

// --- 1. Main Products Array (For Grid & Filters) ---
const ALL_PRODUCTS = [
  { id: 1, category: "Connectors", name: "Stainless Steel Insulation Gasket Kits", desc: "Insulation gasket kits made from various stainless steel grades.", image: "/products/connectors/Male Connector.jpg" },
  { id: 2, category: "Connectors", name: "SParker 8-6 HBZ-SS Reducing Union", desc: "Reducing unions made of stainless steel AISI 316.", image: "/products/connectors/Tube To Union.jpg" },
  { id: 3, category: "Connectors", name: "Corten Steel Panels", desc: "Weathering steel panels with protective patina finish.", image: "/products/connectors/CS Check Valves.jpg" },
  { id: 4, category: "Connectors", name: "Forged Stainless Steel Tube Union Elbow", desc: "Forged union elbows in multiple stainless alloys and metals.", image: "/products/connectors/SS Union Elbow.jpg" },
  { id: 5, category: "Flanges", name: "Nipo Flange", desc: "Specialized nipo flanges for branch pipe connections.", image: "/products/flanges/Steel Nipoflange.jpg" },
  { id: 6, category: "Flanges", name: "SLIP ON FLANGES", desc: "High-quality slip-on flanges for various industrial applications.", image: "/products/flanges/Alloy-Steel-Slip-On-Flanges.webp" },
  { id: 7, category: "Flanges", name: "RING TYPE JOINT FLANGES", desc: "RTJ flanges engineered for high-pressure, leak-proof sealing.", image: "/products/flanges/ring-type-joint-flanges.jpg" },
  { id: 8, category: "Flanges", name: "SPECTACLE BLIND FLANGES", desc: "Spectacle blind flanges for flow control and isolation.", image: "/products/flanges/Spectacle Blind Flanges_.jpg" },
  { id: 9, category: "Flanges", name: "DIN FLANGES", desc: "DIN standard flanges for European piping applications.", image: "/products/flanges/DIN PN6 PN40 Flanges.jpg" },
  { id: 10, category: "Flanges", name: "THREADED FLANGES", desc: "Threaded flanges for easy and secure pipe threading.", image: "/products/flanges/Stainless Threaded Flanges.jpg" },
  { id: 11, category: "Flanges", name: "BLIND FLANGES", desc: "Blind flanges for sealing and capping pipeline ends.", image: "/products/flanges/BLIND FLANGES.jpg" },
  { id: 12, category: "Flanges", name: "Body Flanges", desc: "Specialized body flanges for industrial piping applications.", image: "/products/flanges/Body Flanges.jpg" },
  { id: 13, category: "Flanges", name: "AWWA_FLANGES", desc: "AWWA standard flanges designed for potable water systems.", image: "/products/flanges/Awwa Flanges.jpg" },
  { id: 14, category: "Flanges", name: "LONG_WELD", desc: "Extended weld neck flanges for high-strength pipeline joints.", image: "/products/flanges/Alloy Steel Long Weld Neck Flanges.jpg" },
  { id: 15, category: "Flanges", name: "WELD NECK FLANGES", desc: "Durable weld neck flanges for secure, leak-proof connections.", image: "/products/flanges/Alloy Steel WNRF Flanges.webp" },
  { id: 16, category: "Buttweld Fittings", name: "ANSI B16.9 Forged Concentric Reducer", desc: "Concentric reducers compliant with ASME and ASTM standards.", image: "/products/Buttweld Fittings/Forged Concentric Reducer.jpg" },
  { id: 17, category: "Buttweld Fittings", name: "ANSI B16.28 Swage Nipple", desc: "Swage nipples meeting multiple ANSI and JIS dimension standards.", image: "/products/Buttweld Fittings/SS Swage Nipple.webp" },
  { id: 18, category: "Buttweld Fittings", name: "ANSI B16.28 Stainless Steel Cross Tee", desc: "Cross tees available in multiple thickness schedules.", image: "/products/Buttweld Fittings/SS Cross Tee.jpg" },
  { id: 19, category: "Buttweld Fittings", name: "ASTM A403 Stainless Steel Reducing Tee", desc: "Reducing tees compliant with ASTM and ANSI standards.", image: "/products/Buttweld Fittings/Reducing Tee.jpg" },
  { id: 20, category: "Buttweld Fittings", name: "ANSI B16.28 5D/6D Pipe Bend", desc: "Precision 5D/6D pipe bends for smooth flow and durability.", image: "/products/Buttweld Fittings/SS 6D Bend.jpg" },
  { id: 21, category: "Buttweld Fittings", name: "ASME / ANSI B16.9 Barred Tee", desc: "Certified barred tees compliant with ASME and ANSI standards.", image: "/products/Buttweld Fittings/Buttweld Barred Tee.jpg" },
  { id: 22, category: "Buttweld Fittings", name: "Cross Reducers", desc: "Reducers available in concentric and eccentric designs.", image: "/products/Buttweld Fittings/Duplex Steel Concentric Reducer.jpg" },
  { id: 23, category: "Forged Fittings", name: "ASTM A234 WP11 Pipe Reducing Tee", desc: "Reducing tees forged to ASTM standards for pipe size changes.", image: "/products/Forged Fittings/Carbon Steel Reducing Tee.jpg" },
  { id: 24, category: "Forged Fittings", name: "Elbow Outlet Pipe Fittings", desc: "Elbow outlet fittings designed for tight directional changes.", image: "/products/Forged Fittings/Elbow Outlets.jpg" },
  { id: 25, category: "Forged Fittings", name: "Stainless Steel Threaded Outlets", desc: "Threaded outlets built for reliable high-pressure systems.", image: "/products/Forged Fittings/Threaded Outlet.jpg" },
  { id: 26, category: "Forged Fittings", name: "ASTM A182 Flange Outlets", desc: "Flange outlets forged for secure pipeline connections.", image: "/products/Forged Fittings/SS Flange Outlets.jpg" },
  { id: 27, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", desc: "Sweep nipple outlets designed for smooth flow transitions.", image: "/products/Forged Fittings/SS Sweep Outlet.jpg" },
  { id: 28, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", desc: "Robust forged nipple outlets for reliable pipe branches.", image: "/products/Forged Fittings/SS Nipple Outlet.jpg" },
  { id: 29, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", desc: "Forged threaded cross fittings for strong, precise connections.", image: "/products/Forged Fittings/Forged Threaded Cross.jpg" },
  { id: 30, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", desc: "Forged cross fittings meeting ASME and MSS standards.", image: "/products/Forged Fittings/Socketweld Forged Tee.jpg" },
  { id: 31, category: "Fasteners", name: "ASTM A325 U Bolts", desc: "U-shaped bolts for pipe and rod support.", image: "/products/Fasteners/Stainless Steel U Bolt.jpg" },
  { id: 32, category: "Fasteners", name: "ASTM A325 Fasteners", desc: "Versatile ASTM A325 fasteners for multiple applications.", image: "/products/Fasteners/Anchor.jpg" },
  { id: 33, category: "Fasteners", name: "ASTM A325 Eye Bolts", desc: "Eye bolts for lifting and rigging applications.", image: "/products/Fasteners/Shoulder Eye Bolt.jpg" },
  { id: 34, category: "Fasteners", name: "Stainless Steel Anchor & Foundation Bolts", desc: "Anchor and foundation bolts securing structural foundations.", image: "/products/Fasteners/Sleeve Anchor Bolts.jpg" },
  { id: 35, category: "Fasteners", name: "ASTM A325 Washers", desc: "Flat washers for load distribution in bolted joints.", image: "/products/Fasteners/SS Flat Washer.jpg" },
  { id: 36, category: "Fasteners", name: "ASTM A193 B7 Stud Bolts", desc: "Stud bolts manufactured for heavy-duty industrial use.", image: "/products/Fasteners/Stainless Steel Studs.jpg" },
  { id: 37, category: "Fasteners", name: "ASTM A325 Heavy Hex Nuts", desc: "Heavy hex nuts designed for structural security.", image: "/products/Fasteners/Steel Heavy Hex Nuts.jpg" },
  { id: 38, category: "Fasteners", name: "ASTM A325 Hex Bolts", desc: "High-strength hex bolts for industrial fastening needs.", image: "/products/Fasteners/Hex Bolt.jpg" },
  { id: 39, category: "Refractory Anchors", name: "Customized Stainless Steel Refractory Anchors", desc: "Customized anchors tailored for specific refractory lining needs.", image: "/products/Refractory Anchors/Refractory Anchors UV Type.jpg" },
  { id: 40, category: "Refractory Anchors", name: "U Type Refractory Anchors", desc: "U-shaped refractory anchors for reliable liner fixing.", image: "/products/Refractory Anchors/SS U ANCHORS.jpg" },
  { id: 41, category: "Refractory Anchors", name: "Stainless Steel Y Type Refractory Anchors", desc: "Y-type anchors designed for high-temperature lining support.", image: "/products/Refractory Anchors/Refractory Y Type Anchors.jpg" },
  { id: 42, category: "Refractory Anchors", name: "V Shaped Refractory Anchors", desc: "V-shaped anchors for secure refractory lining attachment.", image: "/products/Refractory Anchors/Refractory V Anchors.jpg" },
  { id: 43, category: "Forging Products", name: "Customized Stainless Steel and Carbon Steel Forgings", desc: "Custom forged parts crafted for specialized applications.", image: "/products/Forging Products/Customize Hot Forging.jpg" },
  { id: 44, category: "Forging Products", name: "Stainless Steel and Carbon Steel Propeller Shafts & Forged Round Bars", desc: "Propeller shafts and forged bars for marine and industrial use.", image: "/products/Forging Products/CS Forged Round Bar.jpg" },
  { id: 45, category: "Forging Products", name: "ASTM A105 Carbon Steel Rotor Shafts", desc: "Carbon steel rotor shafts designed for machinery applications.", image: "/products/Forging Products/ROTER SHAFT.jpg" },
  { id: 46, category: "Forging Products", name: "Carbon Steel Forged Rings ASTM A105", desc: "Carbon steel forged rings for heavy-duty industrial use.", image: "/products/Forging Products/Carbon Steel Forged Ring.jpg" },
  { id: 47, category: "Gaskets", name: "Stainless Steel Graphite Filler Gaskets", desc: "Graphite filler gaskets for superior sealing performance.", image: "/products/Gaskets/Monel Graphite Filler Gaskets.jpg" },
  { id: 48, category: "Gaskets", name: "SS 316 and High Nickel Octagonal Ring Type Joint Gaskets", desc: "Octagonal gaskets for enhanced sealing in critical systems.", image: "/products/Gaskets/OCTOGONAL GASKETS.jpg" },
  { id: 49, category: "Gaskets", name: "Alloy 20 and Stainless Steel Ring Type Joint Gaskets", desc: "Ring joint gaskets for leak-proof high-pressure connections.", image: "/products/Gaskets/RING JOINT TYPE GASKETS.jpg" },
  { id: 50, category: "Gaskets", name: "Spiral Wound Gaskets", desc: "Spiral wound gaskets for high-pressure flange sealing.", image: "/products/Gaskets/Spiral Wound Gaskets_.jpg" },
  { id: 51, category: "Gaskets", name: "Stainless Steel Insulation Gasket Kits", desc: "Insulation gasket kits for reliable sealing and insulation.", image: "/products/Gaskets/Monel Insulation Gasket.jpg" },
  { id: 52, category: "Designer Sheets", name: "Stainless Steel Designer Sheets", desc: "Designer stainless steel sheets for aesthetic applications.", image: "/products/Designer Sheets/SS Designer Sheets.png" },
  { id: 53, category: "Sheets, Plates & Coils", name: "Sheets, Plates & Coils", desc: "High-quality sheets, plates, and coils known for superior strength, corrosion resistance, and smooth finish — ideal for industrial and construction applications.", image: "/products/Sheets, Plates & Coils/sheet-plate-coil.png" },
  { id: 54, category: "Rods and Bars", name: "Rods and Bars", desc: "Precision-engineered rods and bars offering excellent strength, durability, and corrosion resistance for construction and manufacturing applications.", image: "/products/Rods and Bars/Rods.jpg" },
  { id: 55, category: "Non ferrous metals", name: "Copper Tubes", desc: "High-conductivity copper products known for excellent electrical and thermal performance, ideal for wiring, heat exchangers, and industrial use.", image: "/products/Non ferrous metals/copper-pipe.jpg" },
  { id: 56, category: "Non ferrous metals", name: "Brass Tubes", desc: "Durable and corrosion-resistant brass materials suitable for fittings, valves, and decorative components in marine and industrial environments.", image: "/products/Non ferrous metals/Brass-tubes.jpg" },
  { id: 57, category: "Non ferrous metals", name: "Cupronickel", desc: "Cupronickel alloys offering superior resistance to seawater corrosion, widely used in shipbuilding, condensers, and desalination plants.", image: "/products/Non ferrous metals/Cupronickel-Images.jpg" },
  { id: 58, category: "Other", name: "Corten Steel Planters", desc: "Durable corten steel planters for outdoor landscaping", image: "/products/Other/Corten Steel Square Planters.jpg" },
  { id: 59, category: "Other", name: "Stainless Steel Omega Profiles", desc: "Omega shaped stainless steel profiles for architectural designs", image: "/products/Other/Profile Omega.jpg" },
  { id: 60, category: "Other", name: "Stainless Steel PVD Coated Color Profiles", desc: "OPVD coated stainless steel color profiles for decorative use", image: "/products/Other/Stainless Steel 316 Decorative Color C Profile.jpg" },
  { id: 61, category: "Other", name: "Stainless Steel T, U & C Profiles", desc: "T, U, and C stainless steel profiles for versatile uses", image: "/products/Other/stainless steel t patti.jpg" },
  { id: 62, category: "Other", name: "Corten Steel Panels", desc: "Durable weathering steel panels with protective finish", image: "/products/Other/CORTEN PANEL.jpg" },
];

// --- 2. Fallback Defaults ---
const DEFAULT_SPECIFICATIONS = {
  description: "Detailed product description coming soon. Please contact us for more information.",
  features: ["Specifications pending"],
  specs: [
    { parameter: "Material Grades", specification: "Pending" },
    { parameter: "Size Range", specification: "Pending" },
  ],
  productFeatures: ["Feature details coming soon"]
};

// --- 3. Deep Product Details Database ---
const productsDatabase = {
    1: {
        id: "product1",
        name: "Slip On Flanges (SORF Flanges)",
        description: "Slip On Flanges (SORF) are easy-to-install forged steel flanges widely used in piping systems. Manufactured by JAINAM FERRO ALLOYS in stainless steel, carbon steel, alloy steel, duplex, super duplex, and nickel alloys, these flanges ensure leak-proof connections and durability in industrial applications.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN",
            "Certifications: ISO 9001:2015",
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" },
        ],
        productFeatures: [
            "Leakage prevention in pipelines",
            "High mechanical strength and durability",
            "Corrosion resistant for harsh environments",
            "Easy alignment and welding installation",
            "Available in customized thickness, sizes, and grades",
        ],
        applications: [
            "Oil & Gas Processing",
            "Petrochemicals",
            "Power Generation",
            "Heat Exchangers & Condensers",
            "Pharmaceutical Equipment",
            "Offshore Drilling & Marine Applications",
            "Pulp & Paper Industry",
        ],
        exportCountries: [
            "USA", "UK", "UAE", "Saudi Arabia", "Singapore", "Brazil", "Germany", "South Africa", "Australia", "India"
        ]
    },
    2: {
        id: "product2",
        name: "Weld Neck Flanges (WNRF Flanges)",
        description: "Weld Neck Flanges (WNRF) are forged flanges designed for high-pressure and high-temperature applications. Manufactured by JAINAM FERRO ALLOYS as per ASME B16.5, B16.47, MSS SP44, DIN, BS, and EN standards, these flanges ensure leak-proof welded joints and provide reinforcement to piping systems.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN",
            "Certifications: ISO 9001:2015",
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ASME B16.5, ASME B16.47, MSS SP44, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" },
        ],
        productFeatures: [
            "Leak-proof welded connection",
            "High mechanical strength and durability",
            "Excellent corrosion resistance",
            "Suitable for high-pressure and high-temperature applications",
            "Available in customized sizes, thickness, and grades",
        ],
        applications: [
            "Oil & Gas Processing",
            "Petrochemicals",
            "Power Generation",
            "Heat Exchangers & Condensers",
            "Pharmaceutical Equipment",
            "Offshore Drilling & Marine Applications",
            "Pulp & Paper Industry",
        ],
        exportCountries: [
            "USA", "UK", "UAE", "Saudi Arabia", "Germany", "Singapore", "Brazil", "South Africa", "Australia", "India"
        ]
    },
    3: {
        id: "product3",
        name: "Long Weld Neck Flanges (WNRF)",
        description: "Long Weld Neck Flanges (WNRF) are engineered to provide strong, leak-proof connections in piping systems. Manufactured by JAINAM FERRO ALLOYS in stainless steel, carbon steel, alloy steel, duplex, super duplex, nickel, and copper alloys, these flanges offer high strength, corrosion resistance, and durability for industrial applications.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN",
            "Certifications: ISO 9001:2015"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" }
        ],
        productFeatures: [
            "High mechanical strength and durability",
            "Leak-proof connections for pipelines",
            "Corrosion and abrasion resistant",
            "Supports high-pressure systems",
            "Customizable in thickness, size, and material grades"
        ],
    },
    4: {
        id: "product4",
        name: "AWWA Flanges",
        description: "AWWA Flanges (American Water Works Association) are designed for potable water pipelines and waterworks systems. Manufactured by JAINAM FERRO ALLOYS in stainless steel, carbon steel, alloy steel, duplex, super duplex, nickel, and copper alloys, these flanges ensure strength, corrosion resistance, and leak-proof performance in various industrial applications.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, AWWA, DIN, BS, EN",
            "Certifications: ISO 9001:2015"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, ANSI B16.47, MSS SP44, AWWA, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" }
        ],
        productFeatures: [
            "Reliable performance in potable water pipelines",
            "Leak-proof and durable design",
            "Corrosion resistance in harsh environments",
            "High strength to withstand pressure conditions",
            "Available in customized thickness, sizes, and material grades"
        ],
    },
    5: {
        id: "product5",
        name: "Body Flanges",
        description: "Body Flanges are an integral part of industrial projects, designed to provide strength, ease of installation, and cost efficiency. Manufactured by JAINAM FERRO ALLOYS in stainless steel, carbon steel, alloy steel, duplex, super duplex, nickel, and copper alloys, these flanges are suitable for structural and piping applications, ensuring durability and flexibility.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN, AWWA",
            "Certifications: ISO 9001:2015"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, ANSI B16.47, MSS SP44, DIN, BS, EN, AWWA" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" }
        ],
        productFeatures: [
            "Accelerates construction speed and reduces installation costs",
            "Reliable and durable under varying conditions",
            "Corrosion-resistant for long-term performance",
            "Suitable for structural and piping applications",
            "Customizable in sizes, thickness, and materials"
        ],
    },
    6: {
        id: "product6",
        name: "Blind Flanges (BLRF Flanges)",
        description: "Blind flanges are fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. JAINAM FERRO ALLOYS manufactures stainless steel, alloy steel, carbon steel, duplex, super duplex, nickel alloy, and copper alloy blind flanges, ensuring durability and reliable sealing in critical applications.",
        features: [
            "Pressure Classes: 150 LBS to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Flange Face: RF (Raised Face), FF (Flat Face), RTJ (Ring Type Joint)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN",
            "Certifications: ISO 9001:2015",
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" },
        ],
        productFeatures: [
            "Provides complete pipe sealing",
            "Leak-proof and durable under pressure",
            "Corrosion resistant for harsh environments",
            "Easy installation and removal",
            "Suitable for high-pressure and high-temperature applications",
        ],
        applications: [
            "Oil & Gas Processing",
            "Petrochemicals",
            "Power Generation",
            "Heat Exchangers & Condensers",
            "Pharmaceutical Equipment",
            "Offshore Drilling & Marine Applications",
            "Pulp & Paper Industry",
            "Chemical Processing",
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },               
    7: {
        id: "product7",
        name: "Threaded Flanges",
        description: "Threaded flanges are designed to connect pipes by screwing them onto a male pipe thread without welding. JAINAM FERRO ALLOYS manufactures stainless steel, alloy steel, carbon steel, duplex, super duplex, nickel alloy, and copper alloy threaded flanges that are durable, corrosion-resistant, and suitable for high-pressure applications. They are widely used in industries where quick assembly and disassembly are required.",
        features: [
            "Available in Class 150 to 2500 LBS",
            "Sizes: 1/8\" NB to 48\" NB",
            "Face Types: Raised Face (RF), Flat Face (FF), Ring Type Joint (RTJ)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN",
            "ISO 9001:2015 Certified Manufacturing",
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex, Super Duplex, Nickel Alloys, Copper Alloys" },
            { parameter: "Size Range", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Pressure Class", specification: "150, 300, 600, 900, 1500, 2500 LBS" },
            { parameter: "Face Type", specification: "RF, FF, RTJ" },
            { parameter: "Standards", specification: "ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN" },
            { parameter: "Testing", specification: "Pitting Resistance, Chemical Analysis, Hardness, Micro/Macro, Flaring, Flattening" },
        ],
        productFeatures: [
            "No welding required – easy installation",
            "Leak-proof and secure connections",
            "Corrosion and heat resistant materials",
            "Reusable and suitable for maintenance-heavy industries",
            "Ideal for high-pressure and high-temperature applications",
        ],
        applications: [
            "Oil & Gas Pipelines",
            "Petrochemical Plants",
            "Pharmaceutical Equipment",
            "Power Generation",
            "Heat Exchangers & Condensers",
            "Marine & Offshore Applications",
            "Pulp & Paper Industry",
            "Chemical Processing",
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    8: {
        id: "product8",
        name: "DIN Flanges",
        description: "DIN standard flanges are widely used for connecting pipes, valves, pumps, and other equipment to form a piping system. They provide easy access for inspection, cleaning, and modifications. JAINAM FERRO ALLOYS is a leading manufacturer and exporter of DIN flanges including slip-on, welding neck, lap joint, blind, socket weld, and reducing flanges. These flanges are manufactured as per international standards ensuring durability, strength, and precision.",
        features: [
            "Available in DIN ND-6, ND-10, ND-16, ND-25, ND-40 classes",
            "Sizes: 1/8\" NB to 48\" NB",
            "Face Types: Flat Face (FF), Raised Face (RF), Ring Type Joint (RTJ)",
            "Standards: ANSI B16.5, B16.47, MSS SP44, DIN, BS, EN, AWWA, API-605",
            "ISO 9001:2015 Certified Manufacturing"
        ],
        specs: [
            { parameter: "Standard", specification: "ANSI 16.47, ANSI B16.5, MSS SP44, AWWA, API-605, DIN2527, DIN2573, DIN2641, DIN2632, DIN2637, DIN2673" },
            { parameter: "Dimensions", specification: "DIN Flanges" },
            { parameter: "Class", specification: "150, 300, 600, 900, 1500, 2500 LBS, ND-6, ND-10, ND-16, ND-25, ND-40" },
            { parameter: "Size", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Face Type", specification: "FF, RF, RTJ" },
            { parameter: "Testing", specification: "Hardness, Chemical Composition, Flaring, Flattening, Radiography, Third Party Inspection" }
        ],
        productFeatures: [
            "Easy to assemble and disassemble",
            "Leak-proof sealing with gaskets",
            "Corrosion-resistant and durable material grades",
            "Manufactured as per DIN, ANSI, BS & EN standards",
            "Suitable for high-pressure and high-temperature applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "DIN Flanges", "SS DIN Flanges", "DIN Slip On Flanges",
            "DIN PN6 Flat Face Flanges", "DIN Ring Joint Flanges",
            "ASTM / ASME DIN Flanges", "ANSI DIN Flanges", "BS DIN Flanges",
            "Steel DIN Flanges", "Monel DIN Flanges", "DIN Stainless Steel Flanges",
            "Hastelloy DIN Flanges", "Aluminum DIN Flanges", "EN DIN Flanges",
            "Forged Steel DIN Flanges", "DIN Threaded Flanges",
            "Carbon Steel DIN Flanges"
        ]
    },
    9: {
        id: "product9",
        name: "Paddle Blind Flanges",
        description: "JAINAM FERRO ALLOYS manufactures and exports high-quality Paddle Blind Flanges, Paddle Blank Flanges, Hydro Blinds Flanges, Blind Rack Flanges, and Slip Blinds Flanges. These flanges are designed for easy isolation of piping systems during maintenance or inspection. Fabricated using premium raw materials and manufactured under strict quality guidance, Paddle Blind Flanges offer strength, dimensional accuracy, and corrosion resistance, making them suitable for various industries worldwide.",
        features: [
            "Withstand heavy loads and high-temperature environments",
            "High tensile strength",
            "Resistance to corrosion, oxidation, pitting, and stress cracking",
            "Excellent dimensional accuracy",
            "Durability, reliability, and ease of use"
        ],
        specs: [
            { parameter: "Dimension", specification: "DIN Flanges" },
            { parameter: "Standards", specification: "ANSI B16.5, ANSI B16.47 A&B, MSS SP44, AWWA, API 605" },
            { parameter: "Size", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Class", specification: "150, 300, 600, 900, 1500, 2500 LBS, ND-6, ND-10, ND-16, ND-25, ND-40" },
            { parameter: "Face Type", specification: "Flat Face (FF), Raised Face (RF), Ring Type Joint (RTJ)" },
            { parameter: "Testing", specification: "Hardness, Pitting Resistance, Flattening, Flaring, Macro/Micro, Chemical, Mechanical, Hydrostatic, Radiography" }
        ],
        productFeatures: [
            "Provides positive isolation in piping systems",
            "Leak-proof sealing with gaskets",
            "Easy to install and replace",
            "Manufactured as per DIN, ANSI, BS & EN standards",
            "Suitable for high-pressure and high-temperature applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "Paddle Blind Flanges", "Paddle Flanges", "Paddle Blank Flanges",
            "ASTM A515 Paddle Blind Flanges", "Paddle Spacer Flanges",
            "Hydrotest Flanges", "Hydro Blinds Flanges", "Blind Rack Flanges",
            "Blind Flanges", "Slip Blinds Flanges", "DIN Paddle Blind Flanges",
            "Hastelloy Paddle Blind Flanges", "Spectacle Blind Flanges",
            "BS Paddle Blind Flanges", "EN Spectacle Blind Flanges",
            "Forged Steel Paddle Blind Flanges", "DIN Paddle Blind Flanges Exporter"
        ]
    },
    10: {
        id: "product10",
        name: "Paddle Spacer Flanges",
        description: "JAINAM FERRO ALLOYS manufactures and exports high-quality Paddle Spacer Flanges, Spacer Blind Flanges, Hydro Blinds Flanges, and Ring Spacer Flanges. These flanges are widely used for isolation and spacing in pipelines, ensuring safe maintenance and operational flexibility. Fabricated with premium raw materials, Paddle Spacer Flanges are known for their strength, corrosion resistance, and dimensional accuracy, making them ideal for high-pressure and high-temperature applications.",
        features: [
            "Withstand high pressure and elevated temperatures",
            "Corrosion and oxidation resistance",
            "High tensile strength and durability",
            "Accurate dimensions for leak-proof connections",
            "Easy installation and replacement"
        ],
        specs: [
            { parameter: "Standards", specification: "ANSI B16.5, ANSI B16.47 A&B, MSS SP44, AWWA, API 605" },
            { parameter: "Size", specification: "1/8\" NB to 48\" NB" },
            { parameter: "Class", specification: "150, 300, 600, 900, 1500, 2500 LBS, ND-6, ND-10, ND-16, ND-25, ND-40" },
            { parameter: "Face Type", specification: "Flat Face (FF), Raised Face (RF), Ring Type Joint (RTJ)" },
            { parameter: "DIN", specification: "DIN2527, DIN2566, DIN2573, DIN2576, DIN2641, DIN2642, DIN2655, DIN2656, DIN2627, DIN2628, DIN2629, DIN2631, DIN2632, DIN2633, DIN2634, DIN2635, DIN2636, DIN2637, DIN2638, DIN2673" },
            { parameter: "ANSI", specification: "ANSI B16.5, ANSI B16.47, MSS SP44, ANSI B16.36, ANSI B16.48" },
            { parameter: "BS", specification: "BS4504, BS1560, BS10" }
        ],
        productFeatures: [
            "Provides spacing and positive isolation in piping systems",
            "Ensures leak-proof sealing with gaskets",
            "Corrosion resistant at high temperatures",
            "Designed as per DIN, ANSI, BS & EN standards",
            "Widely used in critical oil, gas, and chemical industries"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "Paddle Spacer Flanges", "Spacer Flanges", "Spacer Blind Flanges",
            "ASTM A515 Paddle Spacer Flanges", "Hydro Blinds Flanges",
            "Blind Rack Flanges", "Blind Flanges", "Paddle Flanges",
            "DIN Spacer Flanges", "Hastelloy Paddle Spacer Flanges",
            "Spectacle Spacer Flanges", "BS Paddle Spacer Flanges",
            "EN Paddle Spacer Flanges", "Forged Steel Paddle Spacer Flanges",
            "DIN Paddle Spacer Flanges Exporter", "Paddle Spacer Flanges Stockist"
        ]
    },
    11: {
        id: "product11",
        name: "Spectacle Blind Flanges",
        description: "JAINAM FERRO ALLOYS manufactures and exports high-quality Spectacle Blind Flanges, Alloy 20 Spectacle Blind Flanges, SS Spectacle Blind Flanges, and Duplex Steel Spectacle Blind Flanges. These flanges are designed to provide reliable isolation in pipelines during maintenance or inspection. Fabricated with premium raw materials and tested under strict quality standards, Spectacle Blind Flanges offer strength, corrosion resistance, and precise dimensional accuracy for a wide range of industries worldwide.",
        features: [
            "Withstand high pressure and elevated temperatures",
            "Corrosion and oxidation resistance",
            "High tensile strength and durability",
            "Accurate dimensions for leak-proof connections",
            "Easy installation and replacement"
        ],
        specs: [
            { parameter: "Standards", specification: "ANSI B16.5, ANSI B16.47, MSS SP44, ANSI B16.36, ANSI B16.48" },
            { parameter: "Class", specification: "150, 300, 600, 900, 1500, 2500 LBS, ASA 150#, 2.0MPa, 5.0MPa, 10.0MPa, 15.0MPa, 25.0MPa, 42.0MPa" },
            { parameter: "Size", specification: "½\" (15 NB) to 48\" (1200 NB)" },
            { parameter: "DIN", specification: "DIN2527, DIN2566, DIN2573, DIN2576, DIN2641, DIN2642, DIN2655, DIN2656, DIN2627, DIN2628, DIN2629, DIN2631, DIN2632, DIN2633, DIN2634, DIN2635, DIN2636, DIN2637, DIN2638, DIN2673" },
            { parameter: "ANSI", specification: "ANSI B16.5, ANSI B16.47, MSS SP44, ANSI B16.36, ANSI B16.48" },
            { parameter: "BS", specification: "BS4504, BS1560, BS10" },
            { parameter: "Testing", specification: "PMI/IGC, Flattening, Flaring, Hardness, Macro/Micro, Mechanical/Chemical, Radiography, Hydrostatic" }
        ],
        productFeatures: [
            "Provides positive isolation in piping systems",
            "Leak-proof sealing with gaskets",
            "Designed as per DIN, ANSI, BS & EN standards",
            "Easy to install and replace",
            "Suitable for high-pressure and high-temperature applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "Spectacle Blind Flanges", "Spectacle Flanges", "ASTM A182 Spectacle Flanges",
            "SS Spectacle Blind Flanges", "CS Spectacle Blind Flanges", "Alloy Steel Spectacle Blind Flanges",
            "Duplex Steel Spectacle Blind Flanges", "Super Duplex Steel Spectacle Blind Flanges",
            "Nickel Alloys Spectacle Blind Flanges", "Alloy 20 Spectacle Blind Flanges",
            "Spectacle Blind Flanges Exporter", "Spectacle Flanges Stocks",
            "Forged Steel Spectacle Blind Flanges", "DIN Spectacle Blind Flanges Exporter",
            "Spectacle Blind Flanges Stockist", "Blind Flanges Distributors"
        ]
    },
    12: {
        id: "product12",
        name: "Ring Type Joint (RTJ) Flanges",
        description: "JAINAM FERRO ALLOYS manufactures and exports high-quality Ring Type Joint (RTJ) Flanges, ASTM A182 RTJ Flanges, Titanium RTJ Flanges, CS Ring Type Joint Flanges, Alloy Steel RTJ Flanges, Hastelloy RTJ Flanges, and Nickel RTJ Flanges. These flanges are engineered for high-pressure, high-temperature applications, ensuring leak-proof and durable connections. Fabricated with premium raw materials and tested under strict quality standards, RTJ Flanges offer exceptional corrosion resistance and dimensional accuracy suitable for various industries worldwide.",
        features: [
            "Withstand high pressure and temperature conditions",
            "Leak-proof sealing for critical applications",
            "High tensile strength and durability",
            "Corrosion and oxidation resistant",
            "Easy installation and reliable connections"
        ],
        specs: [
            { parameter: "Standards", specification: "ANSI, MSS, API, AWWA, DIN, JIS, BS, GB" },
            { parameter: "Class", specification: "150#, 300#, 400#, 600#, 900#, 1500#, 2500#" },
            { parameter: "Size", specification: "1/8\" to 84\" NB" },
            { parameter: "Material", specification: "Carbon Steel, Stainless Steel, Alloy Steel, Nickel Alloys, Duplex Steel, Titanium, Copper Alloys" },
            { parameter: "Type", specification: "Threaded, Slip-On, Welding Neck" },
            { parameter: "Testing", specification: "Mechanical/Chemical, Flattening, Flaring, Hardness, Radiography, Hydrostatic" }
        ],
        productFeatures: [
            "Ensures positive isolation in piping systems",
            "Maintains leak-proof connections under high pressure",
            "Manufactured according to ANSI, MSS, DIN & BS standards",
            "High reliability and long service life",
            "Ideal for chemical, pharmaceutical, and offshore applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "SS RTJ Flanges", "Stainless Steel RTJ Flanges", "RTJ Flanges Stockholder",
            "ASTM A182 Ring Type Joint Flanges", "Carbon Steel Ring Type Joint Flanges",
            "Alloy Steel RTJ Flanges", "AS Ring Type Joint Flanges Exporter",
            "Duplex Steel RTJ Flanges Supplier", "Super Duplex Steel RTJ Flanges",
            "Nickel Alloys RTJ Flanges Dealer", "Alloy 20 Ring Type Joint Flanges",
            "Ring Type Joint Flanges Exporter", "RTJ Flanges Stocks",
            "Forged Steel Ring Type Joint Flanges Supplier", "DIN RTJ Flanges Exporter",
            "Ring Type Joint Flanges Stockist", "RTJ Flanges Distributors"
        ]
    },
    13: {
        id: "product13",
        name: "Nipo Flanges",
        description: "JAINAM FERRO ALLOYS manufactures and exports high-quality Nipo Flanges, ASME/ANSI B16.5 Nipo Flanges, Super Duplex Steel Nipo Flanges, Stainless Steel Nipo Flanges, Alloy Steel Nipo Flanges, Hastelloy Nipo Flanges, and ASTM A182 Nipo Flanges. These flanges are designed for branch connections and are a combination of a welding neck flange made in a single welded piece. Nipo Flanges ensure robust and leak-proof connections and are widely used in seawater cooling systems, chemical processing, oil refineries, pulp & paper processing, and other high-pressure applications.",
        features: [
            "High strength and durability",
            "Resistant to corrosion and oxidation",
            "Precision dimensional accuracy",
            "Leak-proof sealing with gaskets",
            "Suitable for high-pressure and high-temperature applications"
        ],
        specs: [
            { parameter: "Standards", specification: "ANSI, MSS, API, AWWA, DIN, JIS, BS, GB" },
            { parameter: "Class", specification: "150#, 300#, 400#, 600#, 900#, 1500#, 2500#" },
            { parameter: "Size", specification: "1/8\" to 84\" NB" },
            { parameter: "Material", specification: "Carbon Steel, Stainless Steel, Alloy Steel, Duplex Steel, Nickel Alloys, Titanium, Copper Alloys" },
            { parameter: "Type", specification: "Threaded, Slip-On, Welding Neck" },
            { parameter: "Testing", specification: "Mechanical/Chemical, Flattening, Flaring, Hardness, Radiography, Hydrostatic" }
        ],
        productFeatures: [
            "Positive isolation in piping networks",
            "Manufactured as per ANSI, MSS, ASTM, and ASME standards",
            "High resistance to rust and corrosion",
            "Easy installation and replacement",
            "Reliable performance under high-pressure conditions"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp & Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "SS Nipo Flanges", "Stainless Steel Nipo Flanges", "Steel Nipo Flange Stockholder",
            "ASTM A182 Nipo Flange Suppliers", "Carbon Steel Nipo Flange Manufacturer",
            "Alloy Steel Nipo Flanges", "AS Nipo Flange Exporter",
            "Duplex Steel Nipo Flange Supplier", "Super Duplex Steel Nipo Flange",
            "Nickel Alloys Nipo Flange Dealer", "Alloy 20 Nipo Flange",
            "Nipo Flange Exporter", "Steel Nipo Flange Stocks",
            "Steel Nipo Flange Supplier", "Steel Nipo Flange Exporter",
            "Nipo Flange Stockist", "Nipo Flanges Distributors"
        ]
    },
    14: {
        id: "product14",
        name: "Pipe Tees",
        description: "JAINAM FERRO ALLOYS is a leading manufacturer, supplier, stockist, and exporter of Pipe Tees, including Stainless Steel Buttweld Tees, Copper Nickel Butt weld Tees, Carbon Steel Equal Tees, Alloy Steel Unequal Tees, and SS Reducing Tees. Designed with a 90° branch connection to the main run, our Pipe Tees are available in equal and unequal dimensions. With 25+ years of industry experience, we provide durable, corrosion-resistant, and cost-effective Tee fittings widely used in chemical, petrochemical, refining, oil & gas, and paper & pulp industries.",
        features: [
            "High strength and durability",
            "Available in equal, unequal, reducing, lateral, and straight types",
            "Corrosion and oxidation resistance",
            "Manufactured in seamless, welded, and fabricated forms",
            "Precision dimensional accuracy with leak-proof connections"
        ],
        specs: [
            { parameter: "Thickness", specification: "Schedule 5S – XXS (incl. STD, XS, S20, S40, S80, S160)" },
            { parameter: "Dimensions", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Size", specification: "Seamless: 1/2″–24″, Welded/Fabricated: 1/2″–48″" },
            { parameter: "Form", specification: "Equal Tee, Unequal Tee, Reducer Tee, Lateral Tee, Straight Tee" },
            { parameter: "Type", specification: "Seamless, Welded, Fabricated" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, B16.28" }
        ],
        productFeatures: [
            "Leak-proof and reliable performance",
            "Compliance with international standards (ASME, ANSI, ASTM)",
            "Available in multiple alloys and grades",
            "High resistance to pressure and temperature variations",
            "Cost-effective with long service life"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Refineries"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "Stainless Steel Unequal Tee", "ASME/ANSI 16.28 Pipe Tees",
            "SS Pipe Tees Stockholder", "ASTM A403 Steel Seamless Lateral Tee Suppliers",
            "Duplex Steel Welded Tees Dealer", "Steel Welded Tees Stockholder",
            "ANSI/ASME B16.9 Tee Distributors", "Stainless Steel Fitting Tee Manufacturer",
            "ANSI 16.9 Fitting Tee", "Nickel Alloy Pipe Tee Exporter",
            "Monel Fitting Tees Supplier", "SS Reducing Tee",
            "Duplex Steel Reducing Tee Dealer", "Monel Fitting Tees",
            "Hastelloy Fitting Equal Tee Exporter", "ANSI B16.28 Reducer Tee Stocks",
            "Alloy 20 Butt weld Tee Supplier", "SS Seamless Equal Tee Exporter",
            "Steel Welded Reducing Tee Stockist", "Reducing Tee Distributors"
        ]
    },
    15: {
        id: "product15",
        name: "Cross Reducers",
        description: "JAINAM FERRO ALLOYS is a trusted manufacturer, supplier, stockist, and exporter of Pipe Reducers, including Concentric and Eccentric Reducers. Our reducers are designed to connect pipe sections of different diameters, maintaining efficient flow and minimizing turbulence. With over 25 years of experience, we provide Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex, and Copper Nickel Reducers that meet international standards such as ASME, ANSI, ASTM, and MSS. These reducers are widely used in chemical, oil & gas, petrochemical, and pharmaceutical industries for reliable and leak-proof connections.",
        features: [
            "Available in Concentric and Eccentric forms",
            "Smooth flow transition reducing turbulence",
            "Corrosion and oxidation resistant",
            "Manufactured in seamless, welded, and fabricated types",
            "Complies with ASME/ANSI B16.9, B16.28, and MSS standards"
        ],
        specs: [
            { parameter: "Thickness", specification: "Schedule 5S – XXS (incl. STD, XS, S20, S40, S80, S160)" },
            { parameter: "Dimensions", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Size", specification: "Seamless: 1/2″–24″, Welded/Fabricated: 1/2″–48″" },
            { parameter: "Form", specification: "Concentric Reducer, Eccentric Reducer, Pipe Reducer" },
            { parameter: "Type", specification: "Seamless, Welded, Fabricated" }
        ],
        productFeatures: [
            "Durable and cost-effective design",
            "High resistance to pressure and temperature variations",
            "Leak-proof connection between pipes of different sizes",
            "Applicable for a wide range of industries",
            "Manufactured as per global quality standards"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Offshore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Refineries"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ],
        otherTypes: [
            "Stainless Steel Reducer", "ASME / ANSI - B 16.9 Reducer",
            "Duplex Steel Eccentric Reducer Dealer", "Steel Reducer",
            "Steel Eccentric Reducer Exporter", "Carbon Steel Concentric Reducer Stocks",
            "Pipe Reducer Supplier", "Concentric Reducer Exporter",
            "Eccentric Reducer Stockist", "Reducers Distributors",
            "Buttwelding Fittings MSS SP-75 Reducer Stockiest", "Fabricated Buttweld Reducer Suppliers",
            "MSS SP-48 Welded Reducer Dealer", "Eccentric Reducer Butt Weld Pipe Fittings Stockholder",
            "Monel Reducer Distributors", "Nickel Alloy Pipe Reducer Manufacturer",
            "SS Concentric Reducer", "ANSI 16.9 Fitting Reducer Exporter",
            "Alloy Steel Reducer Supplier", "Hastelloy Concentric Reducer"
        ]
    },
    16: {
        id: "product16",
        name: "Stainless Steel Tube",
        description: "High-grade stainless steel tubes designed for demanding industrial applications with excellent corrosion resistance and customizable options.",
        features: [
            "Material: Stainless Steel 304/316/321",
            'Diameter: 1/2" to 6"',
            "Length: Up to 12 meters",
            "Surface Finish: Polished, Matte",
            "Certifications: ISO 9001:2015",
            "Application: Industrial, Chemical, Pharmaceutical, Marine",
        ],
        specs: [
            { parameter: "Grade", specification: "304, 316, 321" },
            { parameter: "Outside Diameter", specification: "12 mm - 152 mm" },
            { parameter: "Wall Thickness", specification: "0.50 mm - 4.00 mm" },
            { parameter: "Length", specification: "2 m - 12 m" },
            { parameter: "Finish", specification: "Polished, Matte" },
            { parameter: "Standard", specification: "ASTM A312, ASTM A213" },
            { parameter: "Certification", specification: "ISO 9001:2015" },
            { parameter: "Industry Use", specification: "Pharmaceutical, Chemical, Power Generation, Marine" },
        ],
        productFeatures: [
            "Excellent corrosion resistance",
            "High mechanical strength",
            "Custom lengths and diameters available",
            "Suitable for high-pressure and extreme environments",
            "Certified for industrial and sanitary applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Desalination",
            "Power Generation",
            "Food & Beverage Industry"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    17: {
        id: "product17",
        name: "ASME / ANSI B16.9 Barred Tee",
        description: "High-quality barred tees manufactured with precision for industrial and racing hose applications. Available in multiple materials including stainless steel, Hastelloy, Inconel, and nickel alloys.",
        features: [
            "Compliance: ASME / ANSI B16.9, B16.28, MSS-SP-43",
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Sizes: Seamless (½\"–24\"), ERW / Welded / Fabricated (½\"–48\")",
            "Multiple forms: Pipe Tee, Equal, Unequal, Lateral, Straight, Reducer, Seamless, Welded",
            "Type: Seamless, Welded, Fabricated"
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Nickel" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Thickness", specification: "Sch 5S, 10S, 20S, S10, S20, S30, STD, 40S, S40, S60, XS, 80S, S80, S100, S120, S140, S160, XXS" },
            { parameter: "Size Range", specification: "½\" to 24\" Seamless, ½\" to 48\" ERW/Welded/Fabricated" },
            { parameter: "Form Types", specification: "Pipe Tee, Equal, Unequal, Lateral, Straight, Reducer, Seamless, Welded" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified manufacturing",
            "Corrosion-resistant material options",
            "Versatile application in industrial and racing hose systems",
            "Available in multiple surface finishes",
            "Covered male and female ends"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    18: {
        id: "product18",
        name: "ANSI B16.28 5D/6D Pipe Bend",
        description: "High precision 5D and 6D pipe bends manufactured with induction bending technology offering smooth flow, corrosion resistance, and durability for industrial and petrochemical applications.",
        features: [
            "Standards: ASTM A403 / ASME SA403, ANSI B16.9, ASME B16.25, ASME B16.28, MSS SP-43",
            "DIN Standards: DIN2605, DIN2615, DIN2616, DIN2617, DIN28011",
            "EN Standards: EN10253-1, EN10253-2",
            "Schedule: SCH20, SCH30, SCH40, STD, SCH80, XS, SCH60, SCH120, SCH140, SCH160, XXS",
            "Type: Seamless, ERW, Welded, Fabricated",
            "Form: Bend, Butt weld Bend, Fitting Bend",
            "Size Range: ½\" to 36\""
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel" },
            { parameter: "Stainless Steel Grades", specification: "ASTM A403 WP grades 304, 304L, 316, 316L, 317, 321, 310, 347, 904L" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A234 WPB, A420 WPL3, A420 WPL6, MSS-SP-75 WPHY 42-70" },
            { parameter: "Standards", specification: "ASTM A403, ASME SA403, ANSI B16.9, ASME B16.25, ASME B16.28, MSS-SP-43" },
            { parameter: "DIN", specification: "2605, 2615, 2616, 2617, 28011" },
            { parameter: "EN", specification: "10253-1, 10253-2" },
            { parameter: "Schedule", specification: "SCH20 to XXS (as above)" },
            { parameter: "Size Range", specification: "1/2\" to 36\"" }
        ],
        productFeatures: [
            "Precision engineered for smooth flow and minimal turbulence",
            "Corrosion resistant with multiple material options",
            "Durable and reliable for chemical, petrochemical, and power plants",
            "Manufactured with ISO 9001:2015 certified quality standards",
            "Custom bending radii available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    19: {
        id: "product19",
        name: "ASTM A403 Stainless Steel Reducing Tee",
        description: "Premium ASTM A403 standard stainless steel reducing tees designed for efficient piping with high impact strength, corrosion resistance, and turbulence-free flow.",
        features: [
            "Compliance: ASTM A403, ANSI/ASME B16.9, B16.28, MSS-SP-43",
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Sizes: Seamless (½\"–24\"), ERW/Welded/Fabricated (½\"–48\")",
            "Form Types: Pipe Tee, Equal Tee, Unequal Tee, Lateral Tee, Straight Tee, Reducer Tee, Seamless Tee, Welded Tee",
            "Type: Seamless, Welded, Fabricated",
            "Surface Finishes and End Types Available"
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Nickel" },
            { parameter: "Stainless Steel Grades", specification: "ASTM A403 WP 304/304L/304H/316/316L/317/317L/321/310/347/904L" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A234 WPB, A420 WPL3, A420 WPL6, MSS-SP-75 WPHY 42-70" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A234 WP1, WP5, WP9, WP11, WP22, WP91" },
            { parameter: "Nickel Alloy Grades", specification: "UNS 2200, UNS 2201, Monel 400, Alloy 20, Inconel 600/601/625/825, Hastelloy C276" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, ASME SA815 UNS S31803, S32205" },
            { parameter: "Copper Nickel", specification: "CuNi10Fe1Mn, CuNi30Mn1Fe" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Size Range", specification: "½\" to 24\" Seamless, ½\" to 48\" Welded/Fabricated" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified quality manufacturing",
            "Lightweight and easy installation",
            "Good impact strength and corrosion resistance",
            "Suitable for high purity systems and sanitary applications",
            "Turbulence-free 90° angled branch for efficient flow"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    20: {
        id: "product20",
        name: "STUBEND",
        description: "Precision-engineered ANSI B16.28 elbows used to change fluid flow direction with superior durability, corrosion resistance, and compliance with industrial standards.",
        features: [
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Sizes: Seamless ½\" to 24\", ERW/Welded/Fabricated ½\" to 48\"",
            "Forms: Pipe Elbow, 45°, 90°, 180° Elbow, Long/Short Radius, 1D, 3D, 5D, Seamless, Welded",
            "Compliance: ANSI/ASME B16.9, B16.28, MSS-SP-43",
            "Manufacturing Types: Seamless, Welded, Fabricated"
        ],
        specs: [
            { parameter: "Stainless Steel Grades", specification: "ASTM A403 WP 304/304L/304H/316/316L/317/317L/321/310/347/904L" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A234 WPB/A420 WPL3/A420 WPL6/MSS-SP-75 WPHY 42-70" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A234 WP1/WP5/WP9/WP11/WP22/WP91" },
            { parameter: "Nickel Alloy Grades", specification: "UNS 2200/2201, Monel 400, Alloy 20, Inconel 600/601/625/825, Hastelloy C276" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, ASME SA815 UNS S31803/S32205" },
            { parameter: "Copper Nickel", specification: "CuNi10Fe1Mn, CuNi30Mn1Fe" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Size Range", specification: "½\" to 24\" Seamless, ½\" to 48\" Welded/Fabricated" }
        ],
        productFeatures: [
            "Manufactured in ISO 9001:2015 certified facility",
            "Optimized flow dynamics minimizing turbulence",
            "Corrosion resistant and suitable for high temperature applications",
            "Multiple bend angles and radii available",
            "Offers secure, leak-proof butt-weld connections"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    21: {
        id: "product21",
        name: "ANSI B16.28 Reducing Elbow",
        description: "High-quality reducing elbows conforming to ANSI B16.28 standard, designed for connecting pipes of different sizes with reliable performance in diverse industrial applications.",
        features: [
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Sizes: Seamless Elbow (½\"–24\"), ERW / Welded / Fabricated Elbow (½\"–48\")",
            "Form Types: Pipe Elbow, 45°, 90°, 135°, 180° Reducing Elbows, Long/Short Radius, 1D, 3D, 5D",
            "Manufacturing Types: Seamless, Welded, Fabricated",
            "Dimensions: ANSI/ASME B16.9, B16.28, MSS-SP-43"
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Nickel" },
            { parameter: "Stainless Steel Grade", specification: "ASTM A403 WP 304/304L/304H/316/316L/317/317L/321/310/347/904L" },
            { parameter: "Carbon Steel Grade", specification: "ASTM A234 WPB/A420 WPL3/A420 WPL6/MSS-SP-75 WPHY 42-70" },
            { parameter: "Alloy Steel Grade", specification: "ASTM A234 WP1/WP5/WP9/WP11/WP22/WP91" },
            { parameter: "Nickel Alloy Grade", specification: "UNS 2200/2201, Monel 400, Alloy 20, Inconel 600/601/625/825, Hastelloy C276" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, ASME SA815 UNS S31803/S32205" },
            { parameter: "Copper Nickel", specification: "CuNi10Fe1Mn, CuNi30Mn1Fe" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Size Range", specification: "½\" to 24\" Seamless, ½\" to 48\" Welded/Fabricated" }
        ],
        productFeatures: [
            "Manufactured in ISO 9001:2015 certified facility",
            "Leak-proof connection with superior corrosion resistance",
            "Suitable for high-pressure and high-temperature applications",
            "Optimized design for reduced turbulence and efficient flow",
            "Available in multiple bend angles and radii"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    22: {
        id: "product22",
        name: "ANSI B16.28 Stainless Steel Cross Tee",
        description: "Premium ANSI B16.28 stainless steel cross tees manufactured with precision to provide durable, corrosion-resistant, and turbulence-free piping junction solutions.",
        features: [
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Sizes: Seamless (½\" – 24\"), ERW / Welded / Fabricated (½\" – 48\")",
            "Form Types: Pipe Tee, Equal Tee, Unequal Tee, Lateral Tee, Straight Tee, Reducer Tee, Seamless Tee, Welded Tee",
            "Type: Seamless, Welded, Fabricated",
            "Standards: ANSI/ASME B16.9, B16.28, MSS-SP-43"
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Nickel" },
            { parameter: "Stainless Steel Grades", specification: "ASTM A403 WP 304/304L/304H/316/316L/317/317L/321/310/347/904L" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A234 WPB / A420 WPL3 / A420 WPL6 / MSS-SP-75 WPHY 42-70" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A234 WP1 / WP5 / WP9 / WP11 / WP22 / WP91" },
            { parameter: "Nickel Alloy Grades", specification: "ASTM / ASME SB 336 UNS 2200 (Nickel 200), UNS 2201 (Nickel 201), UNS 4400 (Monel 400), UNS 8020 (Alloy 20 / 20 CB 3), UNS 8825 (Inconel 825), UNS 6600/6601 (Inconel 600/601), UNS 6625 (Inconel 625), UNS 10276 (Hastelloy C 276)" },
            { parameter: "Duplex & Super Duplex Grades", specification: "ASTM A815, ASME SA815 UNS S31803, S32205, Werkstoff No. 1.4462" },
            { parameter: "Copper Nickel Grades", specification: "CuNi10Fe1Mn, CuNi30Mn1Fe" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified production",
            "Superior corrosion resistance and durability",
            "Resistant to chemical and marine environments",
            "Turbulence reducing design ensuring efficient flow",
            "Range of surface finishes and custom sizes available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    23: {
        id: "product23",
        name: "ANSI B16.28 Swage Nipple",
        description: "Durable and precision-engineered ANSI B16.28 swage nipples available in concentric and eccentric forms, made with ASTM A403 stainless steel and other premium materials for high-performance piping systems.",
        features: [
            "Thickness: Schedule 5S to XXS including STD, XS, 40S, 80S, 100, 120, 140, 160",
            "Dimensions: ANSI B16.9, ANSI B16.28, MSS-SP-43 Type A & B, JIS B2312, JIS B2313",
            "Size Range: ½\" to 36\" (Seamless up to 24\"; Welded 8\" to 36\")",
            "Types: Male end reducing nipple, concentric, eccentric",
            "High tensile strength and corrosion resistance"
        ],
        specs: [
            { parameter: "Materials", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Nickel" },
            { parameter: "Stainless Steel Grades", specification: "ASTM A403 WP 304/304L/304H/316/316L/317/317L/321/310/347/904L" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A234 WPB / A420 WPL3/ A420 WPL6 / MSS-SP-75 WPHY 42-70" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A234 WP1/WP5/WP9/WP11/WP22/WP91" },
            { parameter: "Nickel Alloy Grades", specification: "ASTM / ASME SB 336 UNS 2200 (Nickel 200), UNS 2201 (Nickel 201), UNS 4400 (Monel 400), UNS 8020 (Alloy 20 / 20 CB 3), UNS 8825 (Inconel 825), UNS 6600/6601 (Inconel 600/601), UNS 6625 (Inconel 625), UNS 10276 (Hastelloy C 276)" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, ASME SA815 UNS S31803, S32205" },
            { parameter: "Copper Nickel", specification: "CuNi10Fe1Mn, CuNi30Mn1Fe" }
        ],
        productFeatures: [
            "Produced in ISO 9001:2015 certified facilities",
            "High corrosion resistance for harsh environments",
            "Rugged construction with dimensional accuracy",
            "Anti-corrosive surface and high flexibility",
            "Extensive testing including PMI, hardness, flaring, mechanical, and radiography"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    29: {
        id: "product29",
        name: "ANSI B16.9 Forged Concentric Reducer",
        description: "High-quality forged concentric reducers compliant with ASTM and ASME standards, designed for smooth pipe size transitions with superior strength, corrosion resistance, and durability.",
        features: [
            "Complies with ASME B16.9, MSS SP-79, SP-95, ASTM A182, ASTM SA182",
            "Pressure Classes: 2000, 3000, 6000, 9000 LBS",
            "Sizes: 1/4\" NB to 4\" NB",
            "Available in concentric and eccentric types",
            "Manufactured using hot forging followed by machining and heat treatment for optimal mechanical properties"
        ],
        specs: [
            { parameter: "Stainless Steel Grades", specification: "ASTM A182, ASTM/ASME SA 358, SA 312 GR TP 304, 304L, 316, 317, 321, 347, 904L" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A182 F51, F53, F55 UNS S31803, S32205, S32550, S32750" },
            { parameter: "Carbon Steel Grades", specification: "ASTM/ASME A105, A350 LF2, A53 GR A & B, A106 GR A, B, C, API 5L GR B, X42, X52, X70" },
            { parameter: "Alloy Steel Grades", specification: "ASTM/ASME A182, A335 P1, P5, P9, P11, P22, P23, P91" },
            { parameter: "Copper Alloy Steel", specification: "ASTM/ASME SB111 UNS C10100, C10200, C10300, C10800" },
            { parameter: "Nickel Alloy Steel", specification: "ASTM/ASME SB336, SB564, UNS 2200, 4400, 6600, 10276" }
        ],
        productFeatures: [
            "Superior shock and vibration endurance preventing loose connections",
            "Corrosion resistance against harsh chemical environments",
            "Precision forged with high mechanical strength",
            "Hot forged followed by machining and heat treatment processes",
            "Suitable for high pressure and temperature industrial applications"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    24: {
        id: "product24",
        name: "Stainless Steel Insulation Gasket Kits",
        description: "Comprehensive insulation gasket kits designed to provide leak-proof, corrosion-free flange connections and prevent electrolytic or cathodic corrosion in piping systems.",
        features: [
            "Material Grades: SS 304, 304L, 316, 316L, 321, 347, 904L",
            "High Nickel Options: Monel 400, K500, Inconel 600, 625, 800, 825",
            "Ensures electrical insulation and corrosion prevention",
            "Reusable and cost-effective",
            "Manufactured under ISO 9001:2015 certified quality standards"
        ],
        specs: [
            { parameter: "Insulating Material", specification: "G-10/G-11 Glass Reinforced Epoxy (GRE)" },
            { parameter: "Metallic Core", specification: "316 Stainless Steel (Duplex & Inconel available)" },
            { parameter: "Bolt Hole Configuration", specification: "Sleeve and washers included for flange bolt insulation" },
            { parameter: "Temperature Range", specification: "-46°C to 200°C (dependent on material)" },
            { parameter: "Pressure Rating", specification: "Compatible with ANSI B16.5 flange classes up to 2500#" }
        ],
        productFeatures: [
            "Prevents galvanic corrosion in flanged joints",
            "Spring-energized PTFE or elastomeric O-ring face seal options",
            "High dielectric strength and mechanical robustness",
            "Custom sizes and packaging available",
            "Includes insulating sleeves, washers, and steel washers for flange assembly"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    25: {
        id: "product25",
        name: "Parker 8-6 HBZ-SS Reducing Union",
        description: "High precision, single ferrule stainless steel reducing unions by Parker featuring robust construction, corrosion resistance, and leak-free performance for instrumentation tubing.",
        features: [
            "Material: Stainless Steel AISI 316",
            "Connection Type: Single Ferrule Tube Fitting",
            "Sizes: 1/2 in x 3/8 in (other sizes available)",
            "Maximum Operating Pressure: Up to 10,000 psi",
            "Temperature Range: -425°F to 1200°F",
            "Positive leak-free seal after repeated reassembly",
            "Compatible with CPI instrumentation tube fittings"
        ],
        specs: [
            { parameter: "Connection Size", specification: "3/8 in x 1/2 in (other sizes available)" },
            { parameter: "Material Grade", specification: "316 Stainless Steel" },
            { parameter: "Maximum Operating Pressure", specification: "10,000 psi" },
            { parameter: "Maximum Operating Temperature", specification: "1200°F" },
            { parameter: "Connection Type", specification: "Compression, Single Ferrule" },
            { parameter: "Fitting Shape", specification: "Reducing Union" }
        ],
        productFeatures: [
            "Single ferrule design for reliable sealing",
            "Precision engineered for instrumentation applications",
            "High corrosion resistance and durability",
            "Suitable for gases and liquids",
            "Low maintenance with long service life"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Oil & Gas",
            "Power Generation",
            "Petrochemicals",
            "Instrumentation and Control Systems"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    26: {
        id: "product26",
        name: "Forged Stainless Steel Tube Union Elbow",
        description: "Robust forged and stainless steel tube union elbows manufactured for reliable piping connections, featuring corrosion resistance, dimensional accuracy, and versatile applications across industries.",
        features: [
            "Material Grades: Stainless Steel 304, 316, Monel, Brass, Carbon Steel, Alloy Steel, Hastelloy",
            "Types: 45°, 90° Elbows, Reducing Union Elbow, Bulkhead Union Elbow",
            "Construction: Forged, Threaded, Socket Weld",
            "Features: Corrosion resistant, leak-proof, robust construction",
            "Precision engineered for dimensional accuracy and durability"
        ],
        specs: [
            { parameter: "Material", specification: "Stainless Steel 304, 316, Monel, Brass, Carbon Steel, Alloy Steel, Hastelloy" },
            { parameter: "Size Range", specification: "1/16\" to 4\" BSP/NPT" },
            { parameter: "Angle Types", specification: "45°, 90°, 180°" },
            { parameter: "Connection Type", specification: "Threaded, Socket Weld, Butt Weld, Compression" },
            { parameter: "Standards", specification: "ISO 8434-1, DIN 2353, DIN EN 3851, ASME B16.11" }
        ],
        productFeatures: [
            "High corrosion resistance suitable for harsh environments",
            "Structural integrity with minimal footprint",
            "Leak-tight sealing for dynamic system layouts",
            "Easy installation and maintenance",
            "Suitable for instrumentation and control systems"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    27: {
        id: "product27",
        name: "Corten Steel Panels",
        description: "Durable, weathering steel panels made with high-performance alloys including copper, nickel, chromium, phosphorus, and manganese. Engineered for exceptional corrosion resistance, strength, and aesthetic patina formation.",
        features: [
            "Weathering steel with protective patina surface",
            "Contains copper, nickel, chromium, phosphorous, and manganese",
            "Excellent corrosion resistance and durability",
            "Low maintenance with natural rust layer protection",
            "Customizable sizes and finishes available",
            "Ideal for outdoor architectural, landscaping, and industrial applications"
        ],
        specs: [
            { parameter: "Material Composition", specification: "Copper, Nickel, Chromium, Phosphorous, Manganese, Low Carbon Steel Base" },
            { parameter: "Thickness Range", specification: "Typically 1.5 mm to 12 mm (custom sizes available)" },
            { parameter: "Standard Sizes", specification: "Plates and Sheets available up to 4800 mm width and 12000 mm length" },
            { parameter: "Manufacturing Process", specification: "Alloy blending, rolling, heat treatment, oxidation cycle" },
            { parameter: "Surface Finish", specification: "Natural weathered patina or sandblasted" },
            { parameter: "Typical Tensile Strength", specification: "68-78 KSI" }
        ],
        productFeatures: [
            "Forms durable rust-like patina for corrosion protection",
            "High tensile strength and structural integrity",
            "Environmentally sustainable and recyclable",
            "Suitable for bridges, cladding, roofing, fences, landscaping",
            "Aesthetic patina that blends with natural surroundings"
        ],
        applications: [
            "Structural Applications including Bridges and Building Facades",
            "Rail Cars and Industrial Shipping",
            "Storage Vessels and Transport Uses",
            "Landscape Edging and Garden Panels",
            "Roofing and Awnings",
            "Commercial and Residential Building Cladding"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    28: {
        id: "product28",
        name: "Forged Cross Pipe Fittings",
        description: "High-quality forged cross fittings manufactured to ASTM and ASME standards, designed for durable service in piping systems across diverse industries.",
        features: [
            "Dimensional Standards: ASME 16.11, MSS SP-79, MSS SP-95, BS 3799",
            "Pressure Classes: 2000 LBS, 3000 LBS, 6000 LBS, 9000 LBS",
            "Sizes: 1/4\" NB to 4\" NB",
            "Types: Reducing Cross, Unequal Cross, Equal Cross, Forged Cross",
            "Material Grades: Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex, Copper Alloy"
        ],
        specs: [
            { parameter: "Stainless Steel Grades", specification: "ASTM A182, SA 358, SA 312 (304, 304L, 316, 316Ti, 317, 321, 347, 904L)" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A105, A350 LF2, A53 GR A&B, A106 GR A, B & C, API 5L GR B & X Series" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A182, ASTM A335 (P1, P5, P9, P11, P22, P91)" },
            { parameter: "Nickel Alloy Grades", specification: "SB 336, SB 564, UNS 2200, 4400, 8825, 6600, 10276" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, SA 815 (S31803, S32205)" },
            { parameter: "Copper Alloy", specification: "SB 111, SB 466 (Cu-Ni 90/10 and 70/30)" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified quality",
            "High pressure and temperature tolerance",
            "Corrosion resistant and durable construction",
            "Precision thread design for easy installation and leak-proof sealing",
            "Custom fabrication upon request"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    30: {
        id: "product30",
        name: "Forged Cross Pipe Fittings",
        description: "Durable forged cross pipe fittings manufactured to ASTM and ASME standards, designed for high-pressure applications with excellent corrosion resistance and dimensional accuracy.",
        features: [
            "Manufactured via forging process involving heating and shaping under high pressure for superior strength.",
            "Material Grades: Stainless Steel, Carbon Steel, Alloy Steel, Nickel Alloy, Duplex & Super Duplex, Copper Alloy.",
            "Sizes: 1/4\" NB to 4\" NB.",
            "Pressure Classes: 2000 LBS, 3000 LBS, 6000 LBS, 9000 LBS.",
            "Compliance with standards: ASME B16.11, MSS SP-79, MSS SP-95, BS 3799.",
            "Types: Equal Cross, Unequal Cross, Reducing Cross, Forged Cross."
        ],
        specs: [
            { parameter: "Stainless Steel Grades", specification: "ASTM A182, SA 358, SA 312 (304, 304L, 316, 316Ti, 317, 321, 347, 904L)" },
            { parameter: "Carbon Steel Grades", specification: "ASTM A105, A350 LF2, A53 GR A&B, A106 GR A, B & C, API 5L GR B & X series" },
            { parameter: "Alloy Steel Grades", specification: "ASTM A182, A335 (P1, P5, P9, P11, P22, P91)" },
            { parameter: "Nickel Alloy Grades", specification: "ASTM SB 336, SB 564, UNS 2200, 4400, 6600, 10276" },
            { parameter: "Duplex & Super Duplex", specification: "ASTM A815, SA815 UNS S31803, S32205" },
            { parameter: "Copper Alloy Grades", specification: "ASTM SB 111, SB 466 (Cu-Ni 90/10, 70/30)" }
        ],
        productFeatures: [
            "High mechanical strength and pressure tolerance",
            "Excellent corrosion and wear resistance",
            "Precision forged to ensure dimensional accuracy",
            "Heat treated and machined for optimal performance",
            "Suitable for harsh chemical and high temperature environments"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    31: {
        id: "product31",
        name: "ANSI B16.9 Forged Welding Outlets",
        description: "High quality forged welding outlets manufactured per ANSI B16.9 standards, designed as branch connection fittings providing a reliable 90° outlet with beveled ends for secure welding.",
        features: [
            "Material Grades: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L), Carbon Steel (ASTM A105, A694, grades F42-F70), Alloy Steel (ASTM/ASME A182 F1-F91), Duplex Steel (UNS F44, F51, F53, etc.)",
            "Manufactured in accordance with ANSI B16.9 and MSS-SP standards",
            "Socket weld and threaded connection options",
            "Bevelled shaping for ease of welding",
            "Designed to minimize stress at branch connection",
            "Available surface finishes per client requirements"
        ],
        specs: [
            { parameter: "Material", specification: "ASTM A182 Stainless Steel Series, Carbon Steel, Alloy Steel, Duplex Steel" },
            { parameter: "Size Range", specification: "Long sizes from 1/2\" to 48\"" },
            { parameter: "Standards", specification: "ANSI B16.9, ASTM A182, MSS-SP-43" },
            { parameter: "Pressure Rating", specification: "As per pipe class ratings" },
            { parameter: "Connection Type", specification: "Socket Weld, Threaded" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified manufacturing process",
            "Reduced stress concentration at branch connections",
            "Superior corrosion and chemical resistance",
            "Reliable leak-proof joints",
            "Multiple material and finish options"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    32: {
        id: "product32",
        name: "ASTM A182 Nipple Outlets",
        description: "High-quality forged nipple outlets manufactured to ASTM A182 and ASME standards, providing reliable branch connection points with threaded or plain ends for various industrial applications.",
        features: [
            "Material Grades: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L), Carbon Steel (ASTM A105, A694 Grades F42-F70), Alloy Steel (ASTM/ASME A182 F1-F91), Duplex Steel (UNS F44, F45, F51, F53, F55, F60, F61)",
            "Manufactured per ASTM A182 and ANSI/ASME standards",
            "Available in sizes range 1/4\" to 4\" NB",
            "Socketweld and threaded plain end designs",
            "High corrosion resistance and mechanical strength",
            "ISO 9001:2015 certified production"
        ],
        specs: [
            { parameter: "Material Composition", specification: "Stainless Steel, Carbon Steel, Alloy Steel, Duplex & Super Duplex Steel" },
            { parameter: "Size Range", specification: "1/4\" NB to 4\" NB" },
            { parameter: "Standards", specification: "ASTM A182, ASME SA182, ANSI B16.11" }
        ],
        productFeatures: [
            "Durable, corrosion-resistant construction",
            "High tensile strength for demanding environments",
            "Precision forged for dimensional accuracy",
            "Suitable for high-pressure and temperature applications",
            "Custom sizes and finishes available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    33: {
        id: "product33",
        name: "ASTM A182 Nipple Outlets",
        description: "Precision forged ASTM A182 nipple outlets suitable for high-performance piping systems, made from stainless steel, alloy steel, carbon steel, and duplex grades ensuring corrosion resistance and durability.",
        features: [
            "Materials: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L)",
            "Carbon Steel (ASTM A105, A694 grades F42-F70)",
            "Alloy Steel (ASTM/ASME A182 F1-F91 grades)",
            "Duplex Steel (ASTM/ASME A/SA 182 UNS F44-F61)",
            "Manufactured under ISO 9001:2015 certified quality standards",
            "Designed for socket weld and threaded connections"
        ],
        specs: [
            { parameter: "Size Range", specification: "1/4\" NB to 4\" NB" },
            { parameter: "Standards", specification: "ASTM A182, ASME SA182, ANSI B16.11" },
            { parameter: "Pressure Classes", specification: "3000, 6000, 9000 LBS" }
        ],
        productFeatures: [
            "High corrosion and chemical resistance",
            "Excellent mechanical strength",
            "Precision forged for dimensional accuracy",
            "Suitable for high temperature and pressure applications",
            "Customizable sizes and finishes available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    34: {
        id: "product34",
        name: "ASTM A182 Flange Outlets",
        description: "Premium ASTM A182 flange outlets manufactured with superior corrosion resistance and mechanical strength for high-pressure and high-temperature industrial piping applications.",
        features: [
            "Material Grades: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L)",
            "Carbon Steel (ASTM A105, A694 Grades F42-F70)",
            "Alloy Steel (ASTM/ASME A/SA 182 F1-F91)",
            "Duplex Steel (ASTM/ASME A/SA 182 UNS F44-F61)",
            "Manufactured under ISO 9001:2015 certified standards",
            "High durability at elevated temperatures and pressures"
        ],
        specs: [
            { parameter: "Dimensions", specification: "ANSI/ASME B16.9, B16.28, MSS-SP-43" },
            { parameter: "Sizes", specification: "½\" to 48\"" },
            { parameter: "Pressure Ratings", specification: "Class 150 to 2500#" },
            { parameter: "Finish", specification: "Polished, Black, Bright, others as per client requirements" }
        ],
        productFeatures: [
            "Excellent resistance to corrosion and oxidation",
            "Non-magnetic and easy to install",
            "Available in various sizes, lengths, and thicknesses",
            "Backed by stringent quality tests including radiography, macro and micro tests, chemical and mechanical tests",
            "Lightweight and low maintenance"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Industry",
            "Petrochemical Plants",
            "Power Generation",
            "Sea Water Equipment",
            "Heat Exchangers and Condensers",
            "Pulp and Paper Industry",
            "Oil and Gas Offshore Drilling",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    35: {
        id: "product35",
        name: "Stainless Steel Threaded Outlets",
        description: "High-quality ASTM A182 threaded outlets manufactured for seamless pipe branch connections without welding, featuring corrosion resistance, durability, and precision threading.",
        features: [
            "Material Grades: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L), Carbon Steel (ASTM A105, A694 Grades F42-F70), Alloy Steel (ASTM/ASME A/SA 182 F1-F91), Duplex Steel (UNS F44 to F61)",
            "Manufactured per ASTM and ASME specifications for threaded outlets",
            "Corrosion and chemical resistance for harsh industrial environments",
            "Threaded connection facilitates easy installation without welding",
            "Precision dimensions ensure leak-proof, reliable branch connections"
        ],
        specs: [
            { parameter: "Size Range", specification: "1/4\" NB to 4\" NB" },
            { parameter: "Standards", specification: "ASTM A182, ANSI B16.11, MSS SP-43" },
            { parameter: "Material Types", specification: "Stainless, Carbon, Alloy, Duplex Stainless Steels" }
        ],
        productFeatures: [
            "ISO 9001:2015 certified manufacturing",
            "High durability and temperature resistance",
            "Ideal for chemical, pharmaceutical and petrochemical industries",
            "Leak-resistant threaded joints",
            "Custom sizes and threading available upon request"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    36: {
        id: "product36",
        name: "Elbow Outlet Pipe Fittings",
        description: "Precision forged ASTM A182 elbow outlets designed for reliable branch connections in piping systems, featuring high corrosion resistance, dimensional accuracy, and robustness for demanding industrial environments.",
        features: [
            "Material Grades: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L)",
            "Carbon Steel (ASTM A105, A694 F42-F70 grades)",
            "Alloy Steel (ASTM/ASME A/SA 182 F1-F91)",
            "Duplex Steel (ASTM/ASME A/SA UNS F44-F61)",
            "Manufactured per ASTM, ASME, API, JIS, DIN, EN standards",
            "High tensile strength, corrosion resistance and dimensional precision"
        ],
        specs: [
            { parameter: "Size Range", specification: "½\" to 24\"" },
            { parameter: "Pressure Classes", specification: "2000, 3000, 6000, 9000 LBS" },
            { parameter: "Standards", specification: "ANSI/ASME B16.9, MSS SP-97, BS 3799" }
        ],
        productFeatures: [
            "High mechanical strength and wear resistance",
            "Excellent corrosion and oxidation resistance",
            "Tested for hardness, flattening, flaring, pitting resistance, chemical, and mechanical properties",
            "Available with various surface finishes including polished, black, and bright",
            "Packaged securely to prevent damage during transit"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    37: {
        id: "product37",
        name: "ASTM A234 WP11 Pipe Reducing Tee",
        description: "Durable ASTM A234 WP11 pipe reducing tees manufactured to ASME B16.9 standards, designed for smooth flow transitions with excellent corrosion resistance and high mechanical strength.",
        features: [
            "Materials: Stainless Steel (ASTM A182 F304, 304H, 309, 310, 316, 316L, 317L, 321, 347, 904L)",
            "Carbon Steel (ASTM A105, A694 Grades F42-F70)",
            "Alloy Steel (ASTM/ASME A/SA 182 grades F1-F91)",
            "Duplex Steel (ASTM/ASME A/SA 182 UNS F44-F61)",
            "Manufactured under ASTM, ASME, MSS-SP-43 standards",
            "Sizes available from 1/4\" NB to 48\" NB, schedules from 5S to XXS"
        ],
        specs: [
            { parameter: "Standards", specification: "ASME B16.9, MSS-SP-43, ASTM A234 WP11" },
            { parameter: "Size Range", specification: "1/4\" NB to 48\" NB" },
            { parameter: "Pressure Ratings", specification: "Up to 9000 LBS" }
        ],
        productFeatures: [
            "Smooth concentric and eccentric reducing tees available",
            "High impact strength and corrosion resistance",
            "Lightweight and easy to install",
            "Works efficiently under elevated temperatures and pressures",
            "Tested for hardness, pitting, flattening, flaring, chemical and mechanical properties"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    38: {
        id: "product38",
        name: "ASTM A325 Hex Bolts",
        description: "High strength ASTM A325 hex bolts with six-sided heads, designed for structural applications and manufactured in a variety of grades, materials, and corrosion-resistant finishes.",
        features: [
            "Type: Heavy hex head, fully or partially threaded",
            "Standards: ASTM A325, ASME B18.2.6, DIN, BS, ISO, JIS",
            "Available diameters: 1/2\" to 1-1/2\", metric M12–M36",
            "Length: Up to 6\"–10\" standard (larger per request), or metric 3 mm to 200 mm",
            "Finishes: Plain, hot dip galvanized, custom coatings",
            "Minimum tensile strength: 105–120 ksi",
            "Corrosion-resistant options: Alloy steel, duplex steel, titanium, copper-nickel, nickel alloys"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel (AISI 302, 304, 316, 310, 321, 410, 420, 904L, etc.), Duplex Steel (UNS S31803, S32205, S32750, etc.), Carbon Steel (A325, A307, A193), Alloy Steel (A193/B7/B7M/B16), Nickel Alloys (Monel 400, Inconel 600, 625, Hastelloy C276, Alloy 20)" },
            { parameter: "Available Size", specification: "1/2\"–1-1/2\" (imperial), M12–M36 (metric); Custom sizes upto 4\"" },
            { parameter: "Length Range", specification: "1/2\"–10\" (imperial), 3 mm–200 mm (metric), longer on request" },
            { parameter: "Finish", specification: "Plain, Galvanized, Custom" },
            { parameter: "Head Dimensions", specification: "ASME B18.2.6 Heavy Hex; width across flats 7/8\"–2-3/8\" depending on diameter" },
            { parameter: "Thread Form", specification: "UNC, UNF, BSW, Metric, other international forms" }
        ],
        productFeatures: [
            "Compatible with hex cap screws and various washers",
            "Suitable for high-load, high-vibration, and marine environments",
            "Highly corrosion-resistant and durable",
            "Precision threading for secure fit",
            "Supplied with full certification per order"
        ],
        applications: [
            "Structural Steel Construction",
            "Power Generation",
            "Marine and Offshore Equipment",
            "Chemical and Petrochemical Plants",
            "Heat Exchangers and Condensers",
            "Pulp and Paper Industry",
            "Oil and Gas Industry",
            "Pharmaceutical Equipment",
            "Automotive and Heavy Machinery"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    39: {
        id: "product39",
        name: "ASTM A325 Heavy Hex Nuts",
        description: "High strength ASTM A325 heavy hex nuts manufactured to ASME B18.2.6 dimensions, designed for structural bolting with enhanced thickness, larger head, and compatibility with heavy hex bolts.",
        features: [
            "Type: Heavy Hex Nut for structural and industrial bolting",
            "Standard: ASTM A563, A194, A325 and ASME B18.2.6, DIN, BS, ISO, JIS",
            "Size Range: 1/2\" – 1-1/2\" (imperial), M12–M36 (metric) with custom sizes",
            "Finish: Plain, hot dip galvanized, custom coatings",
            "Material Grades: Stainless (AISI 302, 304, 316, 310, 321, 410, 420, 904L), Duplex, Carbon, Alloy, Nickel, Titanium",
            "Heavy hex design: thicker and larger head than standard hex nuts"
        ],
        specs: [
            { parameter: "Thread Size", specification: "1/2\" to 1-1/2\" (UNC, UNF), M12–M36 metric" },
            { parameter: "Width Across Flats", specification: "7/8\" to 2-3/8\" (imperial)" },
            { parameter: "Height (Basic)", specification: "31⁄64\" to 1 15⁄32\" (per ASME B18.2.6)" },
            { parameter: "Material/Grades", specification: "AISI 302, 304, 316, 317, 321, 410, 904L, Duplex, ASTM A307, A193/B6/B7, A563, A194, etc." },
            { parameter: "Tensile Strength", specification: "Min. matches compatible heavy hex bolts (A325: ~120 ksi)" }
        ],
        productFeatures: [
            "Superior tensile strength and durability",
            "Corrosion-resistant for marine, petrochemical, and aggressive environments",
            "Precision threads for tight engagement and secure joint",
            "Designed to distribute large loads and resist loosening under vibration",
            "Supplied with full test certification and traceability"
        ],
        applications: [
            "Structural Steel Construction",
            "Power Generation",
            "Petrochemical and Chemical Plants",
            "Heat Exchangers and Condensers",
            "Pulp and Paper Industry",
            "Oil & Gas Equipment",
            "Railroads and Modular Buildings",
            "Pharmaceutical Equipment"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    40: {
        id: "product40",
        name: "ASTM A193 B7 Stud Bolts",
        description: "High-strength ASTM A193 B7 alloy steel stud bolts, fully threaded with nuts on both ends, heat-treated for mechanical integrity in high-temperature and high-pressure industrial applications.",
        features: [
            "Material Grade: ASTM A193 B7 (alloy steel, AISI 4140/4142, chromium-molybdenum composition)",
            "Standards: ASTM A193/A193M, ASME B18.2.1, B18.2.6, DIN, ISO, JIS",
            "Threading: Full threading as per ASME B1.1 (UNC), B1.13M metric coarse, other forms as needed",
            "Size Range: ¼” to 8” inch (imperial), M6 to M152 metric; Length: up to 200 mm (standard), longer on request",
            "Heat-treated to attain minimum tensile strength of 125 ksi",
            "Finishes: Plain, black, hot-dip galvanized, custom coatings available",
            "Test certificates: EN 10204/3.1, NACE compliance, MTC available"
        ],
        specs: [
            { parameter: "Available Sizes", specification: "¼” to 8” (inch), M6–M152 (metric); custom sizes" },
            { parameter: "Thread Type", specification: "UNC, UNF, Metric, BSW, BSF, ISO, DIN" },
            { parameter: "Operating Temperature", specification: "Up to 840°C for ASTM A193 B7" },
            { parameter: "Tensile Strength", specification: "≥125 ksi (B7), ≥100 ksi (B7M)" },
            { parameter: "Yield Strength", specification: "≥105 ksi (B7)" },
            { parameter: "Density", specification: "7.85 g/cm³" }
        ],
        productFeatures: [
            "Supplied with nuts on both ends, double ended studs available",
            "Excellent corrosion, shock, and vibration resistance",
            "Used for anchor bolting, high temperature and high pressure piping",
            "Compatible with heavy duty engines and automotive assemblies",
            "Traceability and certification for all orders"
        ],
        applications: [
            "Power Generation",
            "Heat Exchangers",
            "Chemical & Petrochemical Plants",
            "Pharmaceutical Equipment",
            "Seawater Equipment",
            "Heavy Duty Engines",
            "Automotive, Marine, and Construction"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    41: {
        id: "product41",
        name: "ASTM A325 Washers",
        description: "Precision-engineered ASTM A325 washers, including flat, lock, spring, square, and fender types, designed to distribute loads, prevent loosening, and protect surfaces in structural assemblies and fastener applications.",
        features: [
            "Type: Flat, Lock, Spring, Square, Round, Fender Washers",
            "Standards: ASTM A325/A563/A193, DIN, ASME B18.22.1, ISO, JIS",
            "Material Grades: Stainless Steel (AISI 302, 304, 316, 310, 321, 347, 410, 420, 904L), Duplex/ Super Duplex, Carbon Steel (A307, A193), Alloy Steel (B6, B7, B7M), Nickel Alloys (Monel, Inconel, Hastelloy, Alloy 20), Titanium",
            "Corrosion-resistant and vibration-resistant options available",
            "Widths from 1/4” to 4-1/2” OD, thicknesses from 1/32” to 3/16” or custom"
        ],
        specs: [
            { parameter: "Size & Dimensions", specification: "Bolt size 1/4” to 1-1/2” (imperial), M3–M56 (metric); Custom sizes per order" },
            { parameter: "Thickness Range", specification: "1/32” to 3/16” standard, custom on request" },
            { parameter: "Finish", specification: "Plain, zinc plated, galvanized, PTFE, special coatings" },
            { parameter: "Shape", specification: "Flat, Square, Round, Spring, Fender, Ogee, Beveled" }
        ],
        productFeatures: [
            "Prevents bolt/nut loosening; buffers underlying surface against damage",
            "Distributes load evenly for long-lasting fastener joints",
            "Special designs (spring, lock) for vibration and shock resistance",
            "High corrosion resistance for marine, chemical, and power environments",
            "Supplied fully certified and traceable; tested under ISO 9001:2015"
        ],
        applications: [
            "Structural Steel Construction",
            "Machinery Assembly",
            "Automotive and Railways",
            "Marine and Offshore Installations",
            "Chemical/Petrochemical Plants",
            "Heat Exchangers and Condensers",
            "Power Generation",
            "Pharmaceutical Equipment"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    42: {
        id: "product42",
        name: "Stainless Steel Anchor & Foundation Bolts",
        description: "High-strength anchor and foundation bolts manufactured to ASTM, DIN, and ISO standards, designed to securely affix structures to concrete or masonry in demanding industrial environments.",
        features: [
            "Types: L-bolts, J-bolts, sleeve anchor bolts, wedge, B&Q, and U-bolts",
            "Standards: ASTM A193 B7, A325, DIN, BS, ISO, JIS",
            "Size Range: M3 – M56 (3/6\" to 2\") | Custom sizes up to 2-1/2\" or M72",
            "Length: 3 mm to 200 mm (custom upon request)",
            "Finish: Plain, galvanized, custom coatings; available in hot-dip galvanized, PTFE, or marine grade",
            "Thread Forms: UNC, UNF, metric coarse/fine as per ASME B1.1/B1.13M"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel (AISI 302, 304, 316, 321, 347, 904L, etc.), Duplex Super Duplex (ASTM A815 UNS S31803, S32750, etc.), Carbon Steel (A307, A193), Alloy Steel (A193 B6/B7), Nickel Alloys (Monel, Inconel, Hastelloy, Alloy 20), Titanium" },
            { parameter: "Tensile Strength", specification: "≥125 ksi (A193 B7), custom per order" },
            { parameter: "Operating Temperature", specification: "Up to 840°C for A193 B7" },
            { parameter: "Certifications", specification: "ISO 9001:2015, EN 10204/3.1, NACE, PED, as requested" }
        ],
        productFeatures: [
            "Superior tensile & yield strength for structural support",
            "Versatile design for all construction, foundation, and machinery anchorage",
            "Excellent corrosion and vibration resistance",
            "Customizable to project specifications",
            "Fully certified: MTC, NACE, ISO, third-party inspection"
        ],
        applications: [
            "Industrial Plant & Equipment Foundations",
            "Structural & Civil Engineering",
            "Power Generation",
            "Petrochemical & Chemical Equipment",
            "Marine & Offshore Structures",
            "Machinery Bases",
            "Heat Exchangers & Condensers",
            "Pulp & Paper Industry",
            "Oil & Gas Infrastructure"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    43: {
        id: "product43",
        name: "ASTM A325 Eye Bolts",
        description: "Industrial grade ASTM A325 eye bolts manufactured with precision for lifting, securing, and rigging applications, made from stainless steel, alloy, carbon steel, and nickel alloys for superior strength and corrosion resistance.",
        features: [
            "Material Grades: Stainless Steel (AISI 302, 304, 316, 310, 317, 321, 347, 904L), Duplex & Super Duplex (ASTM A815 UNS S31803, S32205), Carbon Steel (ASTM A307, A193), Alloy Steel (ASTM A193 B7, B16), Nickel Alloys (Monel, Inconel, Hastelloy, Alloy 20)",
            "Manufactured as stud bolts, forged, or screwed bolts in various types",
            "Sizes: M3 to M56 or 3/6\" to 2\" with custom lengths up to 200mm",
            "Compliant with international standards like ASTM, DIN, BS, and ISO",
            "Testing: Flaring test, flattening test, visual and third-party inspections, radiography, mechanical testing"
        ],
        specs: [
            { parameter: "Standard", specification: "ASTM A325, DIN, BS, ISO" },
            { parameter: "Length Range", specification: "3 mm to 200 mm" },
            { parameter: "Size Range", specification: "M3 to M56 | 3/6\" to 2\"" },
            { parameter: "Type", specification: "Stud Bolts, Forged Bolts, Screwed Bolts" }
        ],
        productFeatures: [
            "Excellent corrosion resistance",
            "High tensile strength and durability",
            "Reliable and secure load bearing",
            "Easy to install and reuse",
            "Certified quality with traceability"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    44: {
        id: "product44",
        name: "ASTM A325 Fasteners",
        description: "High-strength ASTM A325 fasteners designed for structural applications, manufactured to meet international standards with excellent mechanical properties, corrosion resistance, and durability.",
        features: [
            "Material Grades: Stainless Steel (AISI 302, 304, 316, 310, 317, 321, 347, 904L), Duplex & Super Duplex Steel (ASTM/ASME A815 Uns), Carbon Steel (A307, A193), Alloy Steel (ASTM/ASME A/SA 193/194 grades)",
            "Specifications: ASTM A325, DIN, BS, ISO, JIS international standards",
            "Size Range: M3 to M56, 3/6\" to 2\", custom sizes available",
            "Length Range: 3 mm to 200 mm",
            "Corrosion-resistant coatings available including galvanized and alloy plating",
            "Heat treated with high tensile strength (120 ksi minimum for sizes ≤ 1\")"
        ],
        specs: [
            { parameter: "Tensile Strength", specification: "Minimum 120 ksi (sizes ≤ 1\"), 105 ksi (sizes > 1\" to 1.5\")" },
            { parameter: "Thread Forms", specification: "UNC, UNF, Metric coarse/fine" },
            { parameter: "Finish", specification: "Plain, galvanized, coated" },
            { parameter: "Types", specification: "Hex bolts, studs, nuts, washers, anchor bolts" }
        ],
        productFeatures: [
            "Compliant with ASTM F3125 replacement standard for A325",
            "Strong resistance to mechanical loads and stress",
            "Advanced coatings for corrosion and chemical resistance",
            "Wide applications in power, petrochemical, pharmaceutical, and marine industries",
            "Certified quality with traceable test reports"
        ],
        applications: [
            "Structural Steel Construction",
            "Power Generation",
            "Petrochemical Industry",
            "Pharmaceutical Equipment",
            "Marine and Offshore",
            "Oil and Gas",
            "Chemical Processing"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    45: {
        id: "product45",
        name: "ASTM A325 U Bolts",
        description: "High-quality ASTM A325 U Bolts manufactured for structural fastening and support applications, available in stainless steel, carbon steel, alloy steel, and nickel alloys, designed for durability and corrosion resistance.",
        features: [
            "Material Grades: Stainless Steel (AISI 302, 304, 316, 310, 317, 321, 347, 904L), Duplex & Super Duplex (ASTM / ASME A815), Carbon Steel (ASTM A307, A193), Alloy Steel (ASTM A193 B6, B7, B7M), Nickel Alloys (Monel, Inconel, Hastelloy, Alloy 20)",
            "Standard Sizes: M3 to M56 | 3/6\" to 2\" with custom sizes available",
            "Length Range: 3 mm to 200 mm or customized per application needs",
            "Thread Forms: UNC, UNF, Metric coarse/fine per ASME standards",
            "Standards: ASTM, ASME, DIN, ISO, BS, JIS"
        ],
        specs: [
            { parameter: "Diameter Range", specification: "6 mm to 60 mm (as standard)" },
            { parameter: "Length Range", specification: "Up to 200 mm or custom" },
            { parameter: "Certification", specification: "ISO 9001:2015, EN 10204/3.1, NACE" }
        ],
        productFeatures: [
            "High tensile strength and corrosion resistance",
            "Precision thread for secure anchoring",
            "Suitable for varying load-bearing applications",
            "Durable under harsh chemical and marine environments",
            "Manufactured with traceability and full certification"
        ],
        applications: [
            "Industrial Construction",
            "Power Generation",
            "Marine Shipbuilding and Offshore",
            "Chemical Processing",
            "Petrochemical Industry",
            "Pharmaceutical Equipment",
            "Oil & Gas Pipelines"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    46: {
        id: "product46",
        name: "V Shaped Refractory Anchors",
        description: "Durable V-shaped refractory anchors made from stainless steel, high nickel alloys like Inconel and Incoloy, designed to support refractory linings in high-temperature industrial furnaces and chemical plants.",
        features: [
            "Materials: Stainless Steel (304, 304L, 310, 310S, 316, 316L, 321, 347), High Nickel Alloys (Inconel 600, 800, 800H, 800HT, Monel 400, Hastelloy C276), Incoloy 800 and 800HT",
            "Manufactured under ASTM, DIN, ANSI, and international standards",
            "Available in custom sizes and thicknesses from 3 mm to 12 mm or as required",
            "Suitable for thermal shock and heavy refractory linings",
            "Meticulous testing including mechanical, chemical, radiation, and third-party inspections"
        ],
        specs: [
            { parameter: "Material Grades", specification: "SS 304, 304L, 310, 310S, 316, 316L, 321, 347, 904L; Inconel 600, 800 series; Monel 400; Hastelloy C276; Incoloy 800/800HT" },
            { parameter: "Thickness Range", specification: "3 mm to 12 mm" },
            { parameter: "Typical Sizes", specification: "Custom as per client requirements" },
            { parameter: "Testing", specification: "Radiography, macro & micro testing, mechanical and chemical tests" }
        ],
        productFeatures: [
            "High resistance to corrosion, oxidation, and thermal fatigue",
            "Designed for secure refractory lining anchorage in furnaces and reactors",
            "Customized to client design and specification",
            "Long service life under harsh operating conditions",
            "Certificate of compliance and third-party inspection available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Power Generation Furnaces",
            "Petrochemical Reactors",
            "Sea Water Heat Exchangers",
            "Off-Shore Oil Drilling Furnaces",
            "Specialty Chemical Processing"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    47: {
        id: "product47",
        name: "Stainless Steel Y Type Refractory Anchors",
        description: "Robust Y-shaped refractory anchors made from stainless steel grades including 304, 304L, 316, 316L, 310, 321, 347, designed for high temperature and high pressure industrial applications, retaining castable and brick linings.",
        features: [
            "Materials: Stainless Steel (304, 304L, 316, 316L, 310, 310S, 321, 347), High Nickel Alloys (Inconel 600, 800, 800H, 800HT, Monel 400)",
            "Manufactured according to ASTM, DIN, IS, BS, and international standards",
            "Thickness range: 2.3 mm to 2.5 mm",
            "Diameter range: 5 mm to 12 mm or as per customer specification",
            "Length customized per design and application",
            "Surface Finishes: Blackened, hot dip galvanized, nickel plated, bright zinc plated, anodizing"
        ],
        specs: [
            { parameter: "Shape", specification: "Y-shaped for enhanced refractory lining support" },
            { parameter: "Material Grades", specification: "Stainless Steel 304, 316, 310; Inconel 600, 800 series; Monel 400" },
            { parameter: "Thickness", specification: "Typically 2.3 mm to 2.5 mm" },
            { parameter: "Diameter", specification: "5 mm to 12 mm" }
        ],
        productFeatures: [
            "Excellent mechanical strength and thermal shock resistance",
            "Ideal for castable, brick, and ceramic fiber refractory linings",
            "Custom fabrication available to exactly match client requirements",
            "Undergoes strict testing including radiography, macro and micro structure evaluation",
            "High durability and corrosion resistance in extreme conditions"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Equipment",
            "Sea Water Equipment",
            "Heat Exchangers",
            "Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals",
            "Pharmaceuticals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    48: {
        id: "product48",
        name: "U Type Refractory Anchors",
        description: "Durable U-shaped refractory anchors manufactured from stainless steel and high nickel alloys like Incoloy 800, 800H, 800HT, Inconel 600, and Monel 400, designed for supporting refractory linings in industrial furnaces and chemical reactors.",
        features: [
            "Materials: Stainless Steel (304, 304L, 316, 316L, 321, 347, 310), High Nickel Alloys (Inconel 600, 800, 800H, 800HT, Monel 400)",
            "Manufactured under ASTM, DIN, ISO, BS, and international quality standards",
            "Thickness range typically 2 to 12 mm with custom dimensions as per specification",
            "Excellent resistance to thermal shock, corrosion, and oxidation",
            "Undergoes stringent quality testing including radiography, chemical analysis, and mechanical property verification"
        ],
        specs: [
            { parameter: "Material Grades", specification: "Stainless Steel 304, 304L, 316, 316L, 310, 310S; Inconel 600, 800 series; Monel 400; Incoloy 800/800H/800HT" },
            { parameter: "Typical Thickness", specification: "2 to 12 mm depending on application" },
            { parameter: "Custom Sizes", specification: "Available as per customer drawings" }
        ],
        productFeatures: [
            "High mechanical strength and dimensional stability",
            "Suitable for use in high temperature and corrosive environments",
            "Custom fabricated for precise refractory lining support",
            "Certified for quality by international standards",
            "Long operational life under severe industrial conditions"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Processing Equipment",
            "Power Generation Furnaces",
            "Petrochemical Reactors",
            "Oil & Gas Refinery Plants",
            "Sea Water Heat Exchangers",
            "Offshore Drilling Furnaces",
            "Specialty Chemical Processing"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    49: {
        id: "product49",
        name: "Customized Stainless Steel Refractory Anchors",
        description: "Customized refractory anchors made from high-grade stainless steel such as 304, 304L, 316, 316L, 321, suitable for supporting various refractory linings in high-temperature industrial applications including chemical and power plants.",
        features: [
            "Material Grades: Stainless Steel 304, 304L, 316, 316L, 321, 347, 310, 310S",
            "Compatible with high nickel alloys including Inconel 600, 800, 800H, 800HT, and Monel 400",
            "Adapted to client specifications with tailored dimensions and shapes",
            "Designed to support castable, brick, ceramic fiber, and other refractory linings",
            "Quality assured with rigorous testing including radiography, chemical analysis, and mechanical evaluation"
        ],
        specs: [
            { parameter: "Material Grade", specification: "Stainless Steel 304/304L/316/316L/321/347/310, and high nickel alloys" },
            { parameter: "Customization", specification: "Fully customizable sizes and shapes per client requirements" },
            { parameter: "Thickness Range", specification: "Typically 3 mm to 12 mm or per client design" }
        ],
        productFeatures: [
            "Excellent corrosion and thermal shock resistance",
            "Robust design for long service life in harsh industrial environments",
            "Ensures secure anchorage for refractory linings",
            "Fully certified with test reports and traceability",
            "Various surface finishes available including blackening, galvanizing, and nickel plating"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Plants",
            "Power Generation",
            "Oil & Gas Refineries",
            "Heat Exchangers",
            "Pulp and Paper Industry",
            "Petrochemicals",
            "Gas Processing"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    50: {
        id: "product50",
        name: "Carbon Steel Forged Rings ASTM A105",
        description: "Robust carbon steel forged rings manufactured from ASTM A105 grade steel, offering high tensile strength, corrosion resistance, and suitability for industrial furnaces, thermal processing, and steel production centers.",
        features: [
            "Material: ASTM A105 Carbon Steel",
            "Size: Up to 1800 mm Outer Diameter (OD)",
            "Thickness: Up to 300 mm",
            "Manufactured using hot forging followed by machining to proof dimensions",
            "100% Ultrasonic Testing (UT) for flaw detection ensuring product integrity",
            "Superior resistance to impact, fatigue, and wear",
            "Reduces machining waste and manufacturing costs"
        ],
        specs: [
            { parameter: "Chemical Composition", specification: "Max Carbon 0.35%, Manganese 0.6-1.05%, Phosphorus max 0.035%, Sulfur max 0.04%, Silicon 0.1-0.35%, Copper max 0.4%, Nickel max 0.4%, Chromium max 0.3%, Molybdenum max 0.12%, Vanadium max 0.08%" },
            { parameter: "Mechanical Properties", specification: "Tensile Strength min. 485 MPa (70 ksi), Yield Strength min. 250 MPa (36 ksi), Elongation min. 30%, Hardness max. 187 HBW" },
            { parameter: "Manufacturing Process", specification: "Hot forging at 1700-2200°F followed by quenching and tempering or normalizing" },
            { parameter: "Testing", specification: "Ultrasonic testing, hardness test, tensile and elongation tests" }
        ],
        productFeatures: [
            "Optimized to reduce raw material waste and machining time",
            "Machined to exact dimensions for seamless assembly",
            "Suitable for various industrial sectors including chemical, power, and petrochemical plants",
            "ISO 9001:2015 certified manufacturing",
            "Third-party inspection and certification available"
        ],
        applications: [
            "Pharmaceutical Equipment",
            "Chemical Industry",
            "Sea Water Equipment",
            "Heat Exchangers & Condensers",
            "Pulp and Paper Industry",
            "Off-Shore Oil Drilling",
            "Power Generation Industry",
            "Petrochemicals",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    51: {
        id: "product51",
        name: "ASTM A105 Carbon Steel Rotor Shafts",
        description: "Heavy-duty rotor shafts manufactured from ASTM A105 carbon steel, stainless steel grades (304, 304L, 316, 316L, 321, 347, 904L), and alloy steel grades F22, EN8, designed for power generation, chemical, and industrial applications.",
        features: [
            "Material Grades: ASTM A105 Carbon Steel, A350 LF grades, EN8, EN9, Stainless Steel (304/304L/316/316L/321/347/904L), Alloy Steel 4140/4130/F11/F22/F5/F9/F91",
            "Manufactured as seamless or forged shafts with precise dimensional tolerances",
            "Suitable for high stress, heavy load conditions with excellent resistance to wear and corrosion",
            "Heat treated and finished for enhanced mechanical properties and surface finish",
            "Customizable dimensions to meet client specific requirements"
        ],
        specs: [
            { parameter: "Diameter Range", specification: "Up to 550 mm OD or per customer specs" },
            { parameter: "Length Range", specification: "Custom lengths as per application" },
            { parameter: "Surface Finish", specification: "Bright polished, black, or custom finishes" },
            { parameter: "Standards", specification: "ASTM A105, A350, EN8, EN9, ASTM A182" }
        ],
        productFeatures: [
            "High tensile strength and fatigue resistance",
            "Corrosion resistant grades available for harsh environments",
            "Precision manufactured for turbine generators and industrial machinery",
            "Comprehensive testing including chemical composition, hardness, and mechanical properties",
            "ISO 9001:2015 certified manufacturing process"
        ],
        applications: [
            "Power Generation Turbines",
            "Chemical and Petrochemical Equipment",
            "Heat Exchangers and Pumps",
            "Sea Water and Offshore Oil Drilling",
            "Pulp and Paper Industry",
            "Specialty Chemicals",
            "Pharmaceutical Machinery"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    52: {
        id: "product52",
        name: "Stainless Steel and Carbon Steel Propeller Shafts & Forged Round Bars",
        description: "Premium stainless steel and carbon steel propeller shafts and forged round bars manufactured to precise dimensions, offering high corrosion resistance, mechanical strength, and versatility for marine, industrial and structural applications.",
        features: [
            "Materials: Stainless Steel (304, 304L, 316, 316L, 321, 347, 904L), Carbon Steel (A105, A350, EN8, EN9), Alloy Steel (4140, 4130, F11, F22, F5, F9, F91), High Nickel Alloys (Inconel 600/601/625/825/800/800HT/925), Hastelloy (C276, C22), Monel (400, K500)",
            "Sizes: Diameter range from 2 mm up to 1800 mm OD for round bars; Propeller shafts up to 24 inches diameter or customized",
            "Lengths customized as per client specifications",
            "Manufactured using advanced forging and machining processes to ensure dimensional accuracy and surface finish",
            "Applicable for harsh and corrosive environments including marine, power generation, and chemical industries"
        ],
        specs: [
            { parameter: "Diameter Range", specification: "2 mm to 1800 mm (round bars); up to 24 inches (propeller shafts)" },
            { parameter: "Length Range", specification: "Customized lengths as per application" },
            { parameter: "Material Standards", specification: "ASTM A105/A350, EN8/EN9, ASTM A182 for stainless/alloy, ASTM B435/B445 for Nickel alloys" },
            { parameter: "Surface Finish", specification: "Polished, black, zinc plated, custom finishes" }
        ],
        productFeatures: [
            "Superior wear and corrosion resistance",
            "High machining capability reducing manufacturing time",
            "Exceptional strength and fatigue resistance for heavy duty applications",
            "Certifications including ISO 9001:2015, MTC, and third-party inspection",
            "Custom fabrication service to meet unique client requirements"
        ],
        applications: [
            "Marine Propeller Shafts",
            "Power Plant Turnbines",
            "Chemical Processing Equipment",
            "Heat Exchangers",
            "Shipbuilding",
            "Oil and Gas Drilling Equipment",
            "Pulp and Paper Industry",
            "Pharmaceutical Equipment"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    53: {
        id: "product53",
        name: "Customized Stainless Steel and Carbon Steel Forgings",
        description: "Precision-engineered custom forgings manufactured from stainless steel (304, 304L, 316, 316L, 321, 347, 904L) and carbon steel (A105, A350, EN8, EN9) for diverse industrial applications including automotive, oil & gas, and chemical processing.",
        features: [
            "Material Grades: Stainless Steel 304/304L/316/316L/321/347/904L, Carbon Steel A105, A350 LF1/LF2/LF3, EN8, EN9, Alloy Steel 4140, 4130, F11, F22, F5, F9, F91",
            "Custom shapes and sizes tailored to customer specifications including pistons, spindles, gears, pinions, discs, and bars",
            "Manufacturing processes include closed die forging, open die forging, cold forging, and ring rolling",
            "Excellent mechanical properties with enhanced strength, fatigue resistance, and durability",
            "Surface treatments available including painting, zinc plating, galvanizing, and other custom coatings"
        ],
        specs: [
            { parameter: "Forging Types", specification: "Open Die Forging, Closed Die Forging, Cold Forging, Ring Rolling" },
            { parameter: "Weight Range", specification: "From 200 grams to 30 kilograms or as per product requirements" },
            { parameter: "Material Selection", specification: "Based on mechanical and corrosion resistance requirements" },
            { parameter: "Customization", specification: "Full customization of geometry, size, and surface finish" }
        ],
        productFeatures: [
            "Reduced waste and production cost through optimized forging",
            "Ability to produce complex and precise geometries",
            "Improved grain flow resulting in enhanced strength and toughness",
            "Lower environmental impact compared to casting",
            "ISO 9001:2015 certified quality assurance"
        ],
        applications: [
            "Automotive components",
            "Oil & Gas equipment",
            "Construction and heavy machinery",
            "Chemical and pharmaceutical equipment",
            "Power generation components",
            "Specialty industrial parts"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    55: {
        id: "product55",
        name: "Spiral Wound Gaskets",
        description: "Durable spiral wound gaskets constructed by spirally winding metallic strips with soft fillers, available in stainless steel and high nickel alloys, suitable for fluctuating pressures and temperatures in industrial piping and refinery applications.",
        features: [
            "Construction: Metallic winding strip spirally wound with soft filler material providing flexibility and sealing under stress",
            "Materials: Stainless Steel (304, 304L, 316, 316L, 321, 347, 904L), High Nickel Alloys (Monel 400, K500, Inconel 600, 625, 800, 825)",
            "Optional rings: Inner compression ring and outer centering ring for enhanced stability and sealing performance",
            "Fillers: Graphite, PTFE, ceramic, or mica depending on temperature and chemical compatibility",
            "Pressure and Temperature Range: Suitable for API pressures up to 15,000 psi and elevated temperatures"
        ],
        specs: [
            { parameter: "Standard Sizes", specification: "Custom sizes up to 48 inches diameter" },
            { parameter: "Pressure Classes", specification: "Up to ANSI 2500#, API 15,000 psi" },
            { parameter: "Material Standards", specification: "ASTM, ASME, DIN, ISO, BS" },
            { parameter: "Dielectric Properties", specification: "Corrosion resistant with excellent sealing capabilities" }
        ],
        productFeatures: [
            "Excellent resilience and sealing under pressure fluctuations",
            "Highly resistant to heat, corrosion, and chemical attack",
            "Customized design to fit specific flange types and applications",
            "Full certification and MTC available for traceability",
            "Compliance with major industrial gasket standards"
        ],
        applications: [
            "Petrochemical and Refinery Industry",
            "Power Generation",
            "Chemical Processing",
            "Pharmaceutical Equipment",
            "Heat Exchangers",
            "Off-Shore Oil Drilling",
            "Gas Processing",
            "Specialty Chemicals"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    56: {
        id: "product56",
        name: "Alloy 20 and Stainless Steel Ring Type Joint Gaskets",
        description: "Precision-engineered alloy 20 and stainless steel ring type joint (RTJ) gaskets designed for high temperature and high pressure applications, widely used in oilfields, petrochemical, and refinery industries for leak-proof flanged connections.",
        features: [
            "Material Grades: Stainless Steel (304, 304L, 316, 316L, 321, 347, 904L), Alloy 20, Monel 400/K500, Inconel 600, 625, 800, 825",
            "Manufactured to precision according to ASME B16.20, API 6A standards",
            "Available in oval and octagonal profiles designed to fit ring groove type flanges",
            "Gasket hardness is controlled to be softer than flange material to ensure effective sealing without flange damage",
            "Suitable for pressure classes up to API 15,000 psi and ANSI 2500#"
        ],
        specs: [
            { parameter: "Profiles", specification: "Oval and Octagonal cross sections" },
            { parameter: "Material Hardness", specification: "Typically Rockwell B scale max 83-90, softer than flange" },
            { parameter: "Pressure Rating", specification: "Up to 20,000 psi depending on design" },
            { parameter: "Standards", specification: "ASME B16.20, API 6A, API 17D" }
        ],
        productFeatures: [
            "Superior metal-to-metal sealing with high strength and durability",
            "Resistant to harsh chemical and thermal environments",
            "Interchangeable gasket types (R, RX, BX) for versatile flange applications",
            "Full traceability and certified quality as per industry standards",
            "Special gasket sizes and materials available on request"
        ],
        applications: [
            "Oil & Gas exploration and refining",
            "Chemical and petrochemical plants",
            "Power generation industries",
            "Pharmaceutical equipment manufacturing",
            "Marine and offshore installations",
            "Heat exchangers and condensers"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    57: {
        id: "product57",
        name: "SS 316 and High Nickel Octagonal Ring Type Joint Gaskets",
        description: "High-performance octagonal ring type joint gaskets manufactured from stainless steel (316, 316L, 321, 347, 904L) and high-grade nickel alloys (Monel 400, K500, Inconel 600, 625), designed for robust sealing in high-pressure, high-temperature industrial applications.",
        features: [
            "Manufactured to meet ASME B16.20, API 6A, and ISO standards",
            "Octagonal cross-section provides superior sealing efficiency compared to oval gaskets",
            "Materials: Stainless Steel 304, 304L, 316, 316L, 321, 347, 904L; Nickel Alloys Monel 400, K500, Inconel 600, 625, 800, 825",
            "Compatible with octagonal type grooved flanges and specially grooved flanges to prevent leakage",
            "Pressure ratings up to ANSI 2500# and API class 6,000 to 15,000 psi"
        ],
        specs: [
            { parameter: "Ring Numbers", specification: "R11 to R105" },
            { parameter: "Material Hardness", specification: "Softer than flange material, typically Rockwell B scale max 83-90" },
            { parameter: "Size Range", specification: "1/2\" to 24\" nominal diameter" },
            { parameter: "Temperature Range", specification: "Up to 1000°F and above depending on material" }
        ],
        productFeatures: [
            "Superior sealing with multiple contact surfaces for enhanced reliability",
            "High resistance to corrosion, temperature, and pressure fluctuations",
            "Reusability in certain applications depending on gasket condition",
            "Certified and traceable with full quality assurance",
            "Custom sizes and materials available to meet customer specifications"
        ],
        applications: [
            "Petrochemical and Refinery Industry",
            "Power Generation",
            "Off-Shore Oil Drilling",
            "Chemical Processing",
            "Marine Applications",
            "Pharmaceutical Equipment",
            "Specialty Chemicals",
            "Heat Exchangers"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    58: {
        id: "product58",
        name: "Stainless Steel Graphite Filler Gaskets",
        description: "High-quality graphite filler gaskets featuring stainless steel facings, designed for superior sealing in high-temperature and high-pressure applications, widely used in petrochemical, pharmaceutical, and power industries.",
        features: [
            "Composite construction with flexible graphite filler and stainless steel (304, 304L, 316, 316L, 321, 347, 904L) facings",
            "Excellent compression and recovery characteristics suitable for fluctuating pressure and temperature environments",
            "Chemical resistant to acids, solvents, oils, and gases, offering tight seals preventing leakage",
            "Maintains dimensional stability under thermal cycling and pressure variations",
            "Customizable thicknesses and diameters to match flange specifications"
        ],
        specs: [
            { parameter: "Temperature Range", specification: "-250°C to +650°C (variable by material)" },
            { parameter: "Pressure Ratings", specification: "Up to 15000 psi (API 6A) / ANSI 2500# and above" },
            { parameter: "Material Standards", specification: "ASTM, ASME B16.20, API, DIN, ISO compliant" },
            { parameter: "Thickness Range", specification: "Typically 3.2 mm to 6.4 mm or customized" }
        ],
        productFeatures: [
            "Superior sealing under extreme and variable operating conditions",
            "High corrosion resistance avoiding galvanic and electrolytic degradation",
            "Easy installation and reusability in specific applications",
            "RS nuclear grade and petrochemical compatible formulations available",
            "Complete quality certification with full traceability and testing"
        ],
        applications: [
            "Petrochemical Refining",
            "Steam and Water Piping",
            "Pharmaceutical Industry",
            "Power Generation",
            "Chemical Processing",
            "Offshore Oil Exploration",
            "Specialty Chemical Manufacturing",
            "Heat Exchangers and Condensers"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    59: {
        id: "product59",
        name: "Stainless Steel Designer Sheets",
        description: "Premium stainless steel designer sheets with diverse finishes including gold mirror, gold hairline, etching, and black hairline, manufactured from grade 304 stainless steel and available in custom sizes and thicknesses.",
        features: [
            "Material Grade: Stainless Steel 304",
            "Standard Size: 8ft x 4ft sheets; Thickness range: 0-1 mm, 1-2 mm",
            "Manufactured from solid round metal billet through rolling and welding with scarfed weld seams",
            "Finishes include rose gold hairline, bronze hairline, black linen, black bead blast, and etched decorative patterns",
            "High strength, dimensional accuracy, corrosion and chemical resistance",
            "Customization available for sizes, colors, and surface finishes"
        ],
        specs: [
            { parameter: "Size", specification: "8 ft x 4 ft standard; custom sizes available" },
            { parameter: "Thickness", specification: "0-1 mm, 1-2 mm" },
            { parameter: "Material Grade", specification: "SS 304 and variants" }
        ],
        productFeatures: [
            "Elegant appearance suitable for architectural and decorative applications",
            "Strong and durable with excellent corrosion resistance",
            "Easy to clean and maintain surface finish",
            "ISO 9001:2015 certified manufacturing process",
            "Widely used in oil, gas filtration, refrigeration, refining, petrochemical, and offshore industries"
        ],
        applications: [
            "Architectural Cladding",
            "Elevator Interiors",
            "Kitchen Appliances",
            "Furniture",
            "Construction Industry",
            "Chemical & Petrochemical Plants",
            "Off-Shore Oil Platforms",
            "Power Generation Facilities"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    60: {
        id: "product60",
        name: "Corten Steel Panels",
        description: "Durable Corten steel panels made from weathering steel alloys containing copper, nickel, chromium, phosphorus, and manganese, noted for outstanding corrosion resistance, strength, and natural protective rust patina formation.",
        features: [
            "Material Composition: Copper, nickel, chromium, phosphorus, manganese with low carbon for strength and durability",
            "Naturally forms protective rust layer ('patina') that prevents further corrosion and reduces maintenance costs",
            "Available in various types including garden panels, perforated panels, and wall cladding panels",
            "Manufactured per national and international standards with weighing and dimensional precision",
            "Suitable for structural applications such as bridges, building facades, industrial shipping, and storage vessels"
        ],
        specs: [
            { parameter: "Material Standard", specification: "ASTM COR-TEN A & B" },
            { parameter: "Thickness Range", specification: "2 mm to 460 mm" },
            { parameter: "Width Range", specification: "1500 mm to 3200 mm" },
            { parameter: "Length Range", specification: "6000 mm to 12000 mm" }
        ],
        productFeatures: [
            "Exceptional toughness and corrosion resistance against acidic environments and weathering",
            "Self-protective rust layer intensifies with exposure to wet and dry cycles or sandblasting",
            "Low maintenance and long lifecycle making it ideal for outdoor architectural and industrial uses",
            "Customization available for size, thickness, and design",
            "Manufactured using both MIG and arc welding for quality assembly"
        ],
        applications: [
            "Landscape Edging and Retaining Walls",
            "Exterior Wall Cladding",
            "Interior Decorative Panels",
            "Flooring Components",
            "Fencing, Gates, Privacy Screens",
            "Roofing and Awnings",
            "Commercial and Residential Construction"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    61: {
        id: "product61",
        name: "Stainless Steel T, U & C Profiles",
        description: "High-quality stainless steel profiles in T, U, and C shapes including Grade 304 with PVD titanium coating, gold and black mirror finishes, ideal for architectural, construction, and decorative applications.",
        features: [
            "Material Grade: Stainless Steel 304 and variants",
            "Includes PVD titanium coated T profiles, gold mirror finish, black hairline, rose gold finish, and custom decorative patterns",
            "Standard sizes and custom dimensions available, tailored to client requirements",
            "Excellent corrosion resistance and formability",
            "Suitable for structural and decorative uses in interior and exterior environments"
        ],
        specs: [
            { parameter: "Profile Types", specification: "T, U, C shaped structural and decorative profiles" },
            { parameter: "Material", specification: "Stainless Steel 304, 304L, with PVD coatings" },
            { parameter: "Size", specification: "Custom sizes available, standard sheets typically 8 ft x 4 ft" },
            { parameter: "Thickness Range", specification: "0.3 mm to 3 mm or customized" }
        ],
        productFeatures: [
            "High aesthetic appeal with mirror and hairline textured finishes",
            "Durable and corrosion resistant for indoor and outdoor applications",
            "Custom fabrication to exact dimensions or pattern requirements",
            "Widely tested with quality certifications",
            "Easy to install and maintain"
        ],
        applications: [
            "Architecture and Interior Design",
            "Wall Panels and Cladding",
            "Ceilings and Skirting",
            "Kitchen Counters and Furniture",
            "Bus Stations, Airports, and Public Lobbies",
            "Construction and Structural Reinforcement"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    62: {
        id: "product62",
        name: "Stainless Steel PVD Coated Color Profiles",
        description: "High-end stainless steel profiles coated using Physical Vapor Deposition (PVD) titanium ion plating to provide superior wear, scratch, and corrosion resistance, available in multiple colors and finishes for architectural and decorative applications.",
        features: [
            "Material Grade: Stainless Steel 304, with options for 316 and custom grades",
            "PVD Coating provides enhanced surface hardness, wear resistance, and durability compared to conventional coatings",
            "Colors available: Gold, Rose Gold, Black, Bronze, Champagne, Silver, Matte, Glossy",
            "Shapes include T, U, L, J, M, Z, S, W, Q profiles and custom patterns including groove and decorative trims",
            "Standard thicknesses from 0.6 mm to 1 mm with customizable dimensions up to 100 mm width or profile size"
        ],
        specs: [
            { parameter: "Profile Types", specification: "T, U, L, J, M, Z, S, W, Q and custom profiles" },
            { parameter: "Grade", specification: "Stainless Steel 304/316, PVD Coated" },
            { parameter: "Thickness", specification: "0.6 mm to 1 mm standard; custom available" },
            { parameter: "Length", specification: "8 to 10 feet or customized" }
        ],
        productFeatures: [
            "Luxurious finish suitable for commercial and residential architecture",
            "Highly resistant to corrosion, scratches, fading, and fingerprints",
            "Low maintenance with easy cleaning and long service life",
            "Custom fabrication available per client specifications",
            "Widely used in elevator doors, ceiling decoration, hotels, restaurants, and public spaces"
        ],
        applications: [
            "Architectural wall panels and cladding",
            "Decorative trims and profiles for interiors",
            "Ceiling panels and column covers",
            "Elevator doors and lobbies",
            "Hospitality and commercial building interiors",
            "Luxury retail stores and airports"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    63: {
        id: "product63",
        name: "Stainless Steel Omega Profiles",
        description: "High-quality stainless steel omega profiles manufactured from SS 304, 316, and aluminum, available in various sizes, thicknesses, and decorative finishes including mirror, hairline, gold, and rose gold coatings, used in architectural and structural applications.",
        features: [
            "Material Grades: Stainless Steel 304, 316, and Aluminum options",
            "Thicknesses ranging from 0.8 mm to 1.2 mm and customized options",
            "Standard lengths of 2438 mm to 3050 mm, with custom sizes available",
            "Surface finishes include mirror, hairline, gold, rose gold, black, champagne, and bronze",
            "Manufactured using CNC bending, laser cutting, and V-grooving to ensure precise shapes and sharp bending angles"
        ],
        specs: [
            { parameter: "Material Grade", specification: "SS 304, 316, Aluminum 6063 T6" },
            { parameter: "Thickness Range", specification: "0.8 mm, 1.0 mm, 1.2 mm, customizable" },
            { parameter: "Length Range", specification: "2438 mm to 3050 mm (standard), customizable lengths" },
            { parameter: "Surface Finish", specification: "Mirror, Hairline, Gold, Rose Gold, Black, Champagne, Bronze" }
        ],
        productFeatures: [
            "Strong corrosion resistance and durability",
            "High aesthetic value for interior and exterior architectural use",
            "Easy to install and maintain",
            "Custom fabrication on demand for various decorative projects",
            "Complies with relevant national and international standards"
        ],
        applications: [
            "Interior and Exterior Wall Cladding",
            "Suspended Ceilings and Floor Partitions",
            "Skirting and Wall Edge Protection",
            "Architectural and Decorative Panels",
            "Commercial and Residential Buildings",
            "Airports, Bus Stations, and Public Spaces"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    64: {
        id: "product64",
        name: "Corten Steel Planters",
        description: "Durable and weather-resistant Corten steel planters made from weathering steel alloys containing copper, nickel, chromium, phosphorus, and manganese, naturally forming a protective rust layer that ensures long life and low maintenance.",
        features: [
            "Material: ASTM COR-TEN A & B weathering steels",
            "Thickness typically 1.5 to 3 mm, available in custom thicknesses up to 5 mm",
            "Various shapes: square, rectangular, round, pyramid, tapered box, raised beds",
            "Self-protecting rust layer develops over 4-5 months exposed to weather",
            "Manufactured with double folded edges and reinforcing internal beams for durability"
        ],
        specs: [
            { parameter: "Sizes (Standard Examples)", specification: "Square: 16x16x16 inches, 20x20x20 inches; Rectangular: 40x40x14 inches, 48x48x16 inches" },
            { parameter: "Material Thickness", specification: "Standard: 2 mm; Options: 2-5 mm" },
            { parameter: "Drainage", specification: "Optional drainage holes of 27 mm diameter" },
            { parameter: "Finish", specification: "Naturally rusted patina or accelerated rust finish" }
        ],
        productFeatures: [
            "Excellent resistance to weather-related damages including cracking and corrosion",
            "Low maintenance with long lifecycle for residential and commercial use",
            "Various design options including raised garden beds and planter boxes",
            "Warranty typically 5 years dependent on usage",
            "Suitable for landscape edging, fencing, roofing, and decorative outdoor installations"
        ],
        applications: [
            "Landscape Edging",
            "Retaining Walls",
            "Planter Boxes and Raised Beds",
            "Fencing, Gates, Privacy Screens",
            "Roofing and Awnings",
            "Water and Fire Features",
            "Commercial and Residential Landscaping"
        ],
        exportCountries: [
            "Thailand", "Singapore", "Sri Lanka", "Bangladesh",
            "Kuwait", "Dubai", "Saudi Arabia", "Qatar", "Oman", "Bahrain", "Jordan",
            "United Kingdom", "Italy", "Belgium", "France", "Croatia", "Spain",
            "Argentina", "Chile", "Brazil", "Colombia", "Paraguay",
            "Ghana", "South Africa"
        ]
    },
    65: {
        id: "product65",
        name: "Sheets, Plates & Coils",
        description: "High-performance metal sheets, plates, and coils used in a range of industries, manufactured with ASTM- and IS-certified grades for superior durability, corrosion resistance, and versatility in shape and size.",
        features: [
            "S. S. Sheets & Plates: as per ASTM A240, Grades TP 304, 304L, 304LN, 309, 309S, 309H, 310H, 316, 316L, 316H, 316LN, 316Ti, 317, 317L, 321, 321H, 347, 348, 348H, 409, 410, 420, 430, etc. — corrosion resistant and durable for industrial use.",
            "Alloy Steel Plates: as per ASTM A387 Gr. 2, 5, 9, 11, 12 & 22 (Class 1 & 2), ASTM A204 Gr. A & B, DIN 17175 Gr. 15Mo3 & 16Mo3 with IBR Test Certificate — high temperature and pressure resistance.",
            "Carbon Steel / Boiler Quality Plates: as per IS 2062 / ASTM A36, Grades A, B & C, IS 2002 Gr. 1 & 2, ASTM A516 Gr. 60 & 70, ASTM A515 Gr. 70 — strong and weldable for heavy-duty construction.",
            "Abrasion Resistant / Wear Resistant Plates: Sailhard, Hardox, Sumihard, Jee Raex, Fora, Abrazo, Abrex, Xar, Nicrorud, Dillidur 360, 400, 450, 500, 600, 700, 900 & 100 BHN — wear and impact resistant."
        ],
        productFeatures: [
            "S. S. Sheets & Plates: Superior corrosion resistance, high temperature strength, and weldability.",
            "Alloy Steel Plates: Designed for pressure vessels, boilers, and heat exchangers with high thermal resistance.",
            "Carbon Steel / Boiler Quality Plates: Excellent toughness and weldability for structural and fabrication work.",
            "Abrasion Resistant / Wear Resistant Plates: High impact and wear resistance; used in mining, construction, and heavy machinery."
        ],
        applications: [
            "Structural elements in buildings and bridges",
            "Roofing, cladding, and facades",
            "Automotive parts (frames, exhausts, decorative trims)",
            "Marine hardware and shipbuilding",
            "Chemical and pharmaceutical equipment manufacturing",
            "Energy sector: power plants, solar frames"
        ],
        exportCountries: [
            "India", "Thailand", "Singapore", "Bangladesh",
            "UAE", "Kuwait", "Saudi Arabia", "Oman", "Bahrain",
            "UK", "Italy", "Belgium", "France",
            "Argentina", "Brazil", "Chile",
            "Ghana", "South Africa"
        ]
    },
    66: {
        id: "product66",
        name: "Rods, Bars & Wires",
        description: "High-performance rods, bars, and wires available in a range of nickel alloys, stainless steel, carbon steel, brass, bronze, and other high-grade materials for industrial and structural applications.",
        features: [
            "High Nickel Alloy: Monel, Nickel, Inconel, Hastalloy, Copper, Brass, Bronze, Titanium, Tantalum, Bismuth, Aluminium, High Speed Steel, Zinc, Lead, etc.",
            "Material Grade: Stainless Steel, Nickel Alloys, Carbon Steel, Alloy Steel, IBR & Non-IBR.",
            "Types: Rods, Hex, Square, Wires, Billets etc.",
        ],
        productFeatures: [
            "High Nickel Alloy: Exceptional resistance to corrosion, heat, and oxidation in demanding environments.",
            "Material Grade: Covers a wide spectrum of industrial-grade materials for varied strength and thermal requirements.",
            "Types: Available in multiple shapes for flexible fabrication and engineering uses."
        ],
        applications: [
            "Machinery and equipment manufacture",
            "Construction, bridges, buildings, supports",
            "Automotive components and axles",
            "Marine hardware and shipbuilding",
            "Fasteners, springs, structural reinforcements",
            "Electrical applications (due to conductivity for certain alloys)"
        ],
        exportCountries: [
            "India", "Singapore", "Thailand", "Bangladesh",
            "UAE", "Qatar", "Saudi Arabia", "Kuwait", "Oman", "Bahrain",
            "Germany", "UK", "Italy", "France",
            "Argentina", "Brazil", "USA",
            "Ghana", "South Africa"
        ]
    },
    67: {
        id: "product67",
        name: "Copper Tubes",
        description: "High-quality copper materials including DHP, ETP, DPA, and OFHC grades designed for superior electrical and thermal conductivity in industrial and architectural applications.",
        features: [
            "Grades: DHP Copper, ETP Copper, DPA Copper, OFHC Copper",
            "Applications in electrical, thermal, and mechanical systems",
            "Manufactured as per ASTM, ISS, and BSS standards",
            "Excellent ductility and corrosion resistance",
            "Available in tubes, rods, profiles, and wires",
            "Tested for chemical composition, hardness, and hydrostatic performance"
        ],
        specs: [
            { parameter: "Diameter Range", specification: "2mm to 200mm OD" },
            { parameter: "Wall Thickness", specification: "0.10mm to 15mm" },
            { parameter: "Length", specification: "Up to 10 meters straight, coils up to 25 meters" },
            { parameter: "Standard", specification: "ASTM / ISS / BSS / Custom specification" }
        ],
        productFeatures: [
            "Exceptional electrical and thermal conductivity",
            "High resistance to corrosion and fatigue",
            "Available in multiple forms: tubes, rods, profiles, and wires",
            "Fully tested: chemical, physical, hardness, and hydrostatic testing",
            "Ideal for heat exchangers, electrical conductors, and mechanical applications"
        ],
        applications: [
            "Electrical cables and conductors",
            "Heat exchangers and condensers",
            "Plumbing and industrial tubing",
            "Architectural and decorative applications"
        ]
    },
    68: {
        id: "product68",
        name: "Brass Tubes",
        description: "Durable and versatile brass products available in various compositions and mechanical strengths, ideal for decorative, electrical, and structural uses.",
        features: [
            "Compositions: 63/37 Brass, 70/30 Brass, Admiralty Brass, Aluminium Brass, and other specialized blends",
            "Manufactured under ASTM, ISS, and BSS standards",
            "Excellent machinability and corrosion resistance",
            "Available in rods, tubes, strips, wires, and profiles",
            "Tested for hardness, tensile strength, and dimensional accuracy"
        ],
        specs: [
            { parameter: "Material Grades", specification: "63/37, 70/30, Admiralty, Aluminium Brass" },
            { parameter: "Diameter", specification: "Up to 160mm for rods and tubes" },
            { parameter: "Shapes", specification: "Rods, Tubes, Profiles, Wires" }
        ],
        productFeatures: [
            "Excellent corrosion and dezincification resistance",
            "Superior surface finish suitable for precision components",
            "High thermal and electrical conductivity",
            "Tested under international standards for dimensional accuracy",
            "Widely used in hardware, marine, and electrical industries"
        ],
        applications: [
            "Valves, fittings, and fasteners",
            "Heat exchangers and condensers",
            "Decorative hardware and marine components"
        ]
    },
    69: {
        id: "product69",
        name: "Cupronickel",
        description: "High-strength Cupronickel alloys with superior resistance to seawater corrosion, ideal for marine, chemical, and condenser tube applications.",
        features: [
            "Grades: 95/5 Alloy, 90/10 Alloy, 70/30 Alloy",
            "Excellent resistance to seawater corrosion and erosion",
            "Ideal for heat exchangers, condensers, and desalination units",
            "Manufactured under ASTM, ISS, and BSS standards",
            "Available in tubes, rods, and strips"
        ],
        specs: [
            { parameter: "Composition", specification: "Cu-Ni 90/10, 70/30, 95/5" },
            { parameter: "Outer Diameter", specification: "2mm to 200mm" },
            { parameter: "Wall Thickness", specification: "0.10mm to 15mm" },
            { parameter: "Length", specification: "Up to 10 meters straight; coils up to 25 meters" }
        ],
        productFeatures: [
            "High corrosion resistance in seawater and brine environments",
            "Excellent thermal conductivity for condenser applications",
            "High mechanical strength and ductility",
            "Non-magnetic and easy to fabricate",
            "Fully tested for pressure and hydrostatic integrity"
        ],
        applications: [
            "Desalination plants and shipbuilding",
            "Heat exchangers and condensers",
            "Marine pipelines and fittings"
        ]
    },
    70: {
        id: "product70",
        name: "Bronzes",
        description: "High-performance bronze alloys including phosphorous and aluminium bronze, offering superior strength, wear resistance, and corrosion protection.",
        features: [
            "Types: Phosphorous Bronze, Aluminium Bronze, Gun Metal",
            "Grades: Phosphorous Bronze A B1 / A B2 Bush Round",
            "High wear resistance and load-bearing capacity",
            "Manufactured as per ASTM and ISS standards",
            "Excellent machinability and dimensional stability"
        ],
        specs: [
            { parameter: "Shapes", specification: "Rods, Bushes, Tubes, Profiles" },
            { parameter: "Diameter Range", specification: "Up to 160mm" },
            { parameter: "Standard", specification: "ASTM / ISS / BSS" }
        ],
        productFeatures: [
            "Superior anti-friction and bearing properties",
            "High tensile strength and elongation",
            "Corrosion resistance in marine and industrial conditions",
            "Ideal for bushings, bearings, and wear-resistant parts"
        ],
        applications: [
            "Pump and valve components",
            "Bearings, bushings, and sleeves",
            "Marine propeller and mechanical parts"
        ]
    },
    71: {
        id: "product71",
        name: "Copper Tubes & Sections",
        description: "Copper tubes, rods, profiles, and wires precision-engineered for high conductivity, corrosion resistance, and pressure handling in critical systems.",
        features: [
            "Tubes: 2mm OD to 200mm OD with wall thickness from 0.10mm to 15mm",
            "Length: Up to 10 meters straight; coils up to 25 meters in copper, brass & cupronickel",
            "Rods: Available up to 160mm diameter",
            "Strips & Profiles: Custom sections as per client specification",
            "Wires: Copper wires up to 42 SWG in bright annealed condition",
            "S.E. Wires: Super enamelled copper wires up to 42 SWG",
            "Complies with ASTM, ISS, and BSS standards",
            "Testing includes: chemical, dimensional, hydrostatic, and NDT"
        ],
        specs: [
            { parameter: "Outer Diameter", specification: "2mm – 200mm" },
            { parameter: "Wall Thickness", specification: "0.10mm – 15mm" },
            { parameter: "Wire Gauge", specification: "Up to 42 SWG" },
            { parameter: "Testing", specification: "Chemical, Hardness, Hydrostatic, NDT (Eddy Current)" }
        ],
        productFeatures: [
            "High conductivity and excellent surface finish",
            "Precise tolerance and consistent wall thickness",
            "Comprehensive quality testing ensures leak-proof performance",
            "Custom manufacturing available for profiles and sections"
        ],
        applications: [
            "HVAC and refrigeration systems",
            "Heat exchangers and condensers",
            "Electrical conductors and bus bars",
            "Instrumentation and industrial piping"
        ]
    }
};

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);

  // View State (Replaces the Modal Overlay)
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const products = ALL_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to strip special characters for robust matching
  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const getDetailedData = (productName) => {
    if (!productName) return DEFAULT_SPECIFICATIONS;
    const normSearchName = normalizeString(productName);
    
    // Find matching product in productsDatabase
    const match = Object.values(productsDatabase).find(dbItem => {
        const normDbName = normalizeString(dbItem.name);
        return normDbName.includes(normSearchName) || normSearchName.includes(normDbName);
    });
    
    return match || DEFAULT_SPECIFICATIONS;
  };

  const currentDetails = selectedProduct ? getDetailedData(selectedProduct.name) : null;

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

      {/* ========================================================================= */}
      {/* -------------------- MAIN PRODUCT LIST VIEW ----------------------------- */}
      {/* ========================================================================= */}
      {!selectedProduct && (
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
                    <div 
                      onClick={() => openProductDetails(product)}
                      className="block group relative flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(46,196,255,0.4)] hover:-translate-y-1"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
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
                    </div>
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
      )}


      {/* ========================================================================= */}
      {/* ------------------ DETAILED PRODUCT VIEW (NATIVE PAGE) ------------------ */}
      {/* ========================================================================= */}
      {selectedProduct && currentDetails && (
        <div className="max-w-[1350px] mx-auto px-4 md:px-[5%] pb-20">
          
          {/* --- TOP SECTION: Image + Core Info --- */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-16">
            
            {/* Left: Elegant Image Container */}
            <div className="w-full lg:w-[45%] shrink-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white"></div>
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="absolute inset-0 w-full h-full object-contain p-8 mix-blend-multiply transform group-hover:scale-105 transition-transform duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
              </div>
            </div>
            
            {/* Right: Core Info (Title, Desc, Buttons) */}
            <div className="w-full lg:w-[55%] flex flex-col pt-2 lg:pt-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="mb-3 uppercase tracking-widest text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6]">
                {selectedProduct.category}
              </div>

              <h2 className="text-4xl md:text-[46px] font-extrabold tracking-tight text-gray-900 mb-5 leading-tight">
                {currentDetails.name || selectedProduct.name}
              </h2>
              
              <div className="w-20 h-1.5 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] rounded-full mb-8"></div>
              
              <p className="text-gray-600 text-lg md:text-[19px] leading-relaxed tracking-wide mb-10">
                {currentDetails.description || currentDetails.shortDescription || currentDetails.longDesc || "Detailed description coming soon."}
              </p>

              <div className="flex flex-wrap items-center gap-5 mb-6">
                <a 
                  href="/#contact-us"
                  onClick={closeProductDetails}
                  className="bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] text-white px-10 py-4 rounded-xl font-bold shadow-[0_8px_20px_-6px_rgba(46,196,255,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-6px_rgba(46,196,255,0.6)] transition-all tracking-wide text-center"
                >
                  Enquire Now
                </a>
                <button 
                  onClick={closeProductDetails} 
                  className="bg-white text-[#06367b] border-2 border-[#06367b]/20 hover:border-[#06367b] px-8 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all tracking-wide"
                >
                  Back to Products
                </button>
              </div>
            </div>
          </div>


          {/* --- BOTTOM SECTION: Full Width Specs, Features, etc. --- */}
          <div className="w-full">
            
            {/* Features / Key Specs */}
            {(currentDetails.features || currentDetails.keySpecs) && (
                <div className="mb-16 animate-fade-up" style={{ animationDelay: '300ms' }}>
                  <h3 className="text-[26px] font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-4">
                    <span className="w-8 h-1.5 bg-gradient-to-r from-[#06367b] to-[#2EC4FF] rounded-full"></span>
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    {(currentDetails.features || currentDetails.keySpecs).map((feature, i) => (
                      <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 hover:shadow-[0_8px_30px_rgba(6,54,123,0.08)] transition-all">
                        <div className="mt-0.5 shrink-0"><PremiumBulletIcon /></div>
                        <span className="text-gray-700 font-medium tracking-wide text-[15px] leading-relaxed" dangerouslySetInnerHTML={{__html: feature}}></span>
                      </div>
                    ))}
                  </div>
                </div>
            )}

            {/* Technical Specifications */}
            {(currentDetails.specs || currentDetails.technicalSpecs) && (
                <div className="mb-16 animate-fade-up" style={{ animationDelay: '400ms' }}>
                  <h3 className="text-[26px] font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-4">
                    <span className="w-8 h-1.5 bg-gradient-to-r from-[#06367b] to-[#2EC4FF] rounded-full"></span>
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-2 border-l-4 border-blue-50 pl-2">
                    {(currentDetails.specs || currentDetails.technicalSpecs).map((spec, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-4 border-b border-gray-100 px-2 hover:bg-gray-50/50 rounded-lg transition-colors">
                        <div className="w-full sm:w-2/5 font-bold text-gray-900 tracking-wide text-[15px]">
                          {spec.parameter || spec.label}
                        </div>
                        <div className="w-full sm:w-3/5 text-gray-600 leading-relaxed tracking-wide text-[15px]">
                          {spec.specification || spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            )}

            {/* Additional Product Highlights */}
            {currentDetails.productFeatures && (
                <div className="mb-16 animate-fade-up" style={{ animationDelay: '500ms' }}>
                  <h3 className="text-[26px] font-bold text-gray-900 mb-8 tracking-tight flex items-center gap-4">
                    <span className="w-8 h-1.5 bg-gradient-to-r from-[#06367b] to-[#2EC4FF] rounded-full"></span>
                    Product Highlights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-8">
                    {currentDetails.productFeatures.map((highlight, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-0.5 shrink-0"><PremiumBulletIcon /></div>
                        <span className="text-gray-700 leading-relaxed tracking-wide font-medium text-[15px]" dangerouslySetInnerHTML={{__html: highlight}}></span>
                      </div>
                    ))}
                  </div>
                </div>
            )}

            {/* Applications & Export Regions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 animate-fade-up" style={{ animationDelay: '600ms' }}>
                {/* Applications */}
                {currentDetails.applications && (
                    <div className="bg-gray-50 rounded-[1.5rem] p-8 border border-gray-100">
                       <h3 className="text-[22px] font-bold text-gray-900 mb-6 tracking-tight">Applications</h3>
                       <div className="flex flex-wrap gap-3">
                          {currentDetails.applications.map((app, i) => (
                              <span key={i} className="bg-white text-gray-700 text-[13px] font-bold px-4 py-2.5 rounded-full shadow-sm border border-gray-100 tracking-wider">
                                  {app}
                              </span>
                          ))}
                       </div>
                    </div>
                )}

                {/* Export Regions */}
                {(currentDetails.exportRegions || currentDetails.exportCountries) && (
                    <div className="bg-gray-50 rounded-[1.5rem] p-8 border border-gray-100">
                       <h3 className="text-[22px] font-bold text-gray-900 mb-6 tracking-tight">Export Regions</h3>
                       <div className="flex flex-wrap gap-3">
                          {(currentDetails.exportRegions || currentDetails.exportCountries).map((region, i) => (
                              <span key={i} className="bg-[#EAF4FF] text-[#06367b] text-[13px] font-bold px-4 py-2.5 rounded-full shadow-sm border border-[#2EC4FF]/20 tracking-wider">
                                  {region}
                              </span>
                          ))}
                       </div>
                    </div>
                )}
            </div>

            {/* Other Types (if available) */}
            {currentDetails.otherTypes && (
                <div className="mt-10 pt-10 border-t border-gray-100 animate-fade-up" style={{ animationDelay: '700ms' }}>
                  <h3 className="text-[22px] font-bold text-gray-900 mb-6 tracking-tight">Also Available</h3>
                  <div className="flex flex-wrap gap-2.5">
                     {currentDetails.otherTypes.map((type, i) => (
                         <span key={i} className="bg-white text-gray-500 text-[13px] font-medium px-4 py-2 rounded-md border border-gray-200 tracking-wide hover:border-gray-300 transition-colors cursor-default">
                             {type}
                         </span>
                     ))}
                  </div>
                </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Products;