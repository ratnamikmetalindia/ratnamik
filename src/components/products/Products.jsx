"use client"
import React, { useState, useEffect, useRef } from 'react';

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

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
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

// --- Exact Data from Images ---
const BROWSE_TYPES = [
  "Nut Bolt", "Hex Bolt", "Pipes", "Hose Pipe", "Flanges", 
  "RTJ Slip ON / Blind Flanges", "Weld Neck Flanges", "Sheet and Coils", 
  "Stainless Steel", "Mirror Sheet"
];

const FILTER_PILLS = [
  "All Products", "Flanges", "Buttweld Fittings", "Connectors", 
  "Forged Fittings", "Fasteners", "Refractory Anchors", "Forging Products", 
  "Gaskets", "Designer Sheets", "Sheets, Plates & Coils", "Rods and Bars", 
  "Non ferrous metals", "Other"
];

// --- Product Data Array (Updated with individual modal details for easy editing) ---
const ALL_PRODUCTS = [
  { id: 1, category: "Connectors", name: "Stainless Steel Insulation Gasket Kits", desc: "Insulation gasket kits made from various stainless steel grades.", image: "/products/connectors/Male Connector.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 2, category: "Connectors", name: "SParker 8-6 HBZ-SS Reducing Union", desc: "Reducing unions made of stainless steel AISI 316.", image: "/products/connectors/Tube To Union.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 3, category: "Connectors", name: "Corten Steel Panels", desc: "Weathering steel panels with protective patina finish.", image: "/products/connectors/CS Check Valves.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 4, category: "Connectors", name: "Forged Stainless Steel Tube Union Elbow", desc: "Forged union elbows in multiple stainless alloys and metals.", image: "/products/connectors/SS Union Elbow.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 5, category: "Flanges", name: "Nipo Flange", desc: "Specialized nipo flanges for branch pipe connections.", image: "/products/flanges/Steel Nipoflange.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 6, category: "Flanges", name: "SLIP ON FLANGES", desc: "High-quality slip-on flanges for various industrial applications.", image: "/products/flanges/Alloy-Steel-Slip-On-Flanges.webp", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 7, category: "Flanges", name: "RING TYPE JOINT FLANGES", desc: "RTJ flanges engineered for high-pressure, leak-proof sealing.", image: "/products/flanges/ring-type-joint-flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 8, category: "Flanges", name: "SPECTACLE BLIND FLANGES", desc: "Spectacle blind flanges for flow control and isolation.", image: "/products/flanges/Spectacle Blind Flanges_.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 9, category: "Flanges", name: "DIN FLANGES", desc: "DIN standard flanges for European piping applications.", image: "/products/flanges/DIN PN6 PN40 Flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 10, category: "Flanges", name: "THREADED FLANGES", desc: "Threaded flanges for easy and secure pipe threading.", image: "/products/flanges/Stainless Threaded Flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 11, category: "Flanges", name: "BLIND FLANGES", desc: "Blind flanges for sealing and capping pipeline ends.", image: "/products/flanges/BLIND FLANGES.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 12, category: "Flanges", name: "Body Flanges", desc: "Specialized body flanges for industrial piping applications.", image: "/products/flanges/Body Flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 13, category: "Flanges", name: "AWWA_FLANGES", desc: "AWWA standard flanges designed for potable water systems.", image: "/products/flanges/Awwa Flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 14, category: "Flanges", name: "LONG_WELD", desc: "Extended weld neck flanges for high-strength pipeline joints.", image: "/products/flanges/Alloy Steel Long Weld Neck Flanges.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 15, category: "Flanges", name: "WELD NECK FLANGES", desc: "Durable weld neck flanges for secure, leak-proof connections.", image: "/products/flanges/Alloy Steel WNRF Flanges.webp", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 16, category: "Buttweld Fittings", name: "ANSI B16.9 Forged Concentric Reducer", desc: "Concentric reducers compliant with ASME and ASTM standards.", image: "/products/Buttweld Fittings/Forged Concentric Reducer.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 17, category: "Buttweld Fittings", name: "ANSI B16.28 Swage Nipple", desc: "Swage nipples meeting multiple ANSI and JIS dimension standards.", image: "/products/Buttweld Fittings/SS Swage Nipple.webp", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 18, category: "Buttweld Fittings", name: "ANSI B16.28 Stainless Steel Cross Tee", desc: "Cross tees available in multiple thickness schedules.", image: "/products/Buttweld Fittings/SS Cross Tee.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 19, category: "Buttweld Fittings", name: "ASTM A403 Stainless Steel Reducing Tee", desc: "Reducing tees compliant with ASTM and ANSI standards.", image: "/products/Buttweld Fittings/Reducing Tee.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 20, category: "Buttweld Fittings", name: "ANSI B16.28 5D/6D Pipe Bend", desc: "Precision 5D/6D pipe bends for smooth flow and durability.", image: "/products/Buttweld Fittings/SS 6D Bend.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 21, category: "Buttweld Fittings", name: "ASME / ANSI B16.9 Barred Tee", desc: "Certified barred tees compliant with ASME and ANSI standards.", image: "/products/Buttweld Fittings/Buttweld Barred Tee.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 22, category: "Buttweld Fittings", name: "Cross Reducers", desc: "Reducers available in concentric and eccentric designs.", image: "/products/Buttweld Fittings/Duplex Steel Concentric Reducer.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 23, category: "Forged Fittings", name: "ASTM A234 WP11 Pipe Reducing Tee", desc: "Reducing tees forged to ASTM standards for pipe size changes.", image: "/products/Forged Fittings/Carbon Steel Reducing Tee.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 24, category: "Forged Fittings", name: "Elbow Outlet Pipe Fittings", desc: "Elbow outlet fittings designed for tight directional changes.", image: "/products/Forged Fittings/Elbow Outlets.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 25, category: "Forged Fittings", name: "Stainless Steel Threaded Outlets", desc: "Threaded outlets built for reliable high-pressure systems.", image: "/products/Forged Fittings/Threaded Outlet.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 26, category: "Forged Fittings", name: "ASTM A182 Flange Outlets", desc: "Flange outlets forged for secure pipeline connections.", image: "/products/Forged Fittings/SS Flange Outlets.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 27, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", desc: "Sweep nipple outlets designed for smooth flow transitions.", image: "/products/Forged Fittings/SS Sweep Outlet.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 28, category: "Forged Fittings", name: "ASTM A182 Nipple Outlets", desc: "Robust forged nipple outlets for reliable pipe branches.", image: "/products/Forged Fittings/SS Nipple Outlet.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 29, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", desc: "Forged threaded cross fittings for strong, precise connections.", image: "/products/Forged Fittings/Forged Threaded Cross.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 30, category: "Forged Fittings", name: "Forged Cross Pipe Fittings", desc: "Forged cross fittings meeting ASME and MSS standards.", image: "/products/Forged Fittings/Socketweld Forged Tee.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 31, category: "Fasteners", name: "ASTM A325 U Bolts", desc: "U-shaped bolts for pipe and rod support.", image: "/products/Fasteners/Stainless Steel U Bolt.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 32, category: "Fasteners", name: "ASTM A325 Fasteners", desc: "Versatile ASTM A325 fasteners for multiple applications.", image: "/products/Fasteners/Anchor.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 33, category: "Fasteners", name: "ASTM A325 Eye Bolts", desc: "Eye bolts for lifting and rigging applications.", image: "/products/Fasteners/Shoulder Eye Bolt.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 34, category: "Fasteners", name: "Stainless Steel Anchor & Foundation Bolts", desc: "Anchor and foundation bolts securing structural foundations.", image: "/products/Fasteners/Sleeve Anchor Bolts.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 35, category: "Fasteners", name: "ASTM A325 Washers", desc: "Flat washers for load distribution in bolted joints.", image: "/products/Fasteners/SS Flat Washer.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 36, category: "Fasteners", name: "ASTM A193 B7 Stud Bolts", desc: "Stud bolts manufactured for heavy-duty industrial use.", image: "/products/Fasteners/Stainless Steel Studs.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 37, category: "Fasteners", name: "ASTM A325 Heavy Hex Nuts", desc: "Heavy hex nuts designed for structural security.", image: "/products/Fasteners/Steel Heavy Hex Nuts.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 38, category: "Fasteners", name: "ASTM A325 Hex Bolts", desc: "High-strength hex bolts for industrial fastening needs.", image: "/products/Fasteners/Hex Bolt.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 39, category: "Refractory Anchors", name: "Customized Stainless Steel Refractory Anchors", desc: "Customized anchors tailored for specific refractory lining needs.", image: "/products/Refractory Anchors/Refractory Anchors UV Type.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 40, category: "Refractory Anchors", name: "U Type Refractory Anchors", desc: "U-shaped refractory anchors for reliable liner fixing.", image: "/products/Refractory Anchors/SS U ANCHORS.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 41, category: "Refractory Anchors", name: "Stainless Steel Y Type Refractory Anchors", desc: "Y-type anchors designed for high-temperature lining support.", image: "/products/Refractory Anchors/Refractory Y Type Anchors.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 42, category: "Refractory Anchors", name: "V Shaped Refractory Anchors", desc: "V-shaped anchors for secure refractory lining attachment.", image: "/products/Refractory Anchors/Refractory V Anchors.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 43, category: "Forging Products", name: "Customized Stainless Steel and Carbon Steel Forgings", desc: "Custom forged parts crafted for specialized applications.", image: "/products/Forging Products/Customize Hot Forging.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 44, category: "Forging Products", name: "Stainless Steel and Carbon Steel Propeller Shafts & Forged Round Bars", desc: "Propeller shafts and forged bars for marine and industrial use.", image: "/products/Forging Products/CS Forged Round Bar.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 45, category: "Forging Products", name: "ASTM A105 Carbon Steel Rotor Shafts", desc: "Carbon steel rotor shafts designed for machinery applications.", image: "/products/Forging Products/ROTER SHAFT.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 46, category: "Forging Products", name: "Carbon Steel Forged Rings ASTM A105", desc: "Carbon steel forged rings for heavy-duty industrial use.", image: "/products/Forging Products/Carbon Steel Forged Ring.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 47, category: "Gaskets", name: "Stainless Steel Graphite Filler Gaskets", desc: "Graphite filler gaskets for superior sealing performance.", image: "/products/Gaskets/Monel Graphite Filler Gaskets.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 48, category: "Gaskets", name: "SS 316 and High Nickel Octagonal Ring Type Joint Gaskets", desc: "Octagonal gaskets for enhanced sealing in critical systems.", image: "/products/Gaskets/OCTOGONAL GASKETS.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 49, category: "Gaskets", name: "Alloy 20 and Stainless Steel Ring Type Joint Gaskets", desc: "Ring joint gaskets for leak-proof high-pressure connections.", image: "/products/Gaskets/RING JOINT TYPE GASKETS.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 50, category: "Gaskets", name: "Spiral Wound Gaskets", desc: "Spiral wound gaskets for high-pressure flange sealing.", image: "/products/Gaskets/Spiral Wound Gaskets_.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 51, category: "Gaskets", name: "Stainless Steel Insulation Gasket Kits", desc: "Insulation gasket kits for reliable sealing and insulation.", image: "/products/Gaskets/Monel Insulation Gasket.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 52, category: "Designer Sheets", name: "Stainless Steel Designer Sheets", desc: "Designer stainless steel sheets for aesthetic applications.", image: "/products/Designer Sheets/SS Designer Sheets.png", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 53, category: "Sheets, Plates & Coils", name: "Sheets, Plates & Coils", desc: "High-quality sheets, plates, and coils known for superior strength, corrosion resistance, and smooth finish — ideal for industrial and construction applications.", image: "/products/Sheets, Plates & Coils/sheet-plate-coil.png", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 54, category: "Rods and Bars", name: "Rods and Bars", desc: "Precision-engineered rods and bars offering excellent strength, durability, and corrosion resistance for construction and manufacturing applications.", image: "/products/Rods and Bars/Rods.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 55, category: "Non ferrous metals", name: "Copper Tubes", desc: "High-conductivity copper products known for excellent electrical and thermal performance, ideal for wiring, heat exchangers, and industrial use.", image: "/products/Non ferrous metals/copper-pipe.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 56, category: "Non ferrous metals", name: "Brass Tubes", desc: "Durable and corrosion-resistant brass materials suitable for fittings, valves, and decorative components in marine and industrial environments.", image: "/products/Non ferrous metals/Brass-tubes.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 57, category: "Non ferrous metals", name: "Cupronickel", desc: "Cupronickel alloys offering superior resistance to seawater corrosion, widely used in shipbuilding, condensers, and desalination plants.", image: "/products/Non ferrous metals/Cupronickel-Images.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 58, category: "Other", name: "Corten Steel Planters", desc: "Durable corten steel planters for outdoor landscaping", image: "/products/Other/Corten Steel Square Planters.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 59, category: "Other", name: "Stainless Steel Omega Profiles", desc: "Omega shaped stainless steel profiles for architectural designs", image: "/products/Other/Profile Omega.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 60, category: "Other", name: "Stainless Steel PVD Coated Color Profiles", desc: "OPVD coated stainless steel color profiles for decorative use", image: "/products/Other/Stainless Steel 316 Decorative Color C Profile.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 61, category: "Other", name: "Stainless Steel T, U & C Profiles", desc: "T, U, and C stainless steel profiles for versatile uses", image: "/products/Other/stainless steel t patti.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
  { id: 62, category: "Other", name: "Corten Steel Panels", desc: "Durable weathering steel panels with protective finish", image: "/products/Other/CORTEN PANEL.jpg", 
    modalDetails: { longDesc: "Fundamental components used to close the ends of piping systems, providing strong reinforcements and leak-proofing pipelines. Manufactured to ensure durability and reliable sealing in critical applications.", keySpecs: ["Pressure Classes: 150 LBS to 2500 LBS", "Sizes: 1/8\" NB to 48\" NB", "Flange Face: RF, FF, RTJ", "Certifications: ISO 9001:2015"], technicalSpecs: [{ label: "Material Grades", value: "Stainless Steel, Carbon Steel, Alloy Steel" }, { label: "Size Range", value: "1/8\" NB to 48\" NB" }, { label: "Pressure Class", value: "150, 300, 600, 900, 1500, 2500 LBS" }, { label: "Testing", value: "Pitting Resistance, Chemical Analysis, Hardness" }], features: ["Provides complete pipe sealing", "Leak-proof and durable under pressure", "Corrosion resistant for harsh environments", "Easy installation and removal"] } },
];

function Products() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef(null);

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Guaranteed timer effect on page load for FadeUp Cards
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  // Strict Filter Logic ensures "All Products" works reliably by default
  const products = ALL_PRODUCTS.filter(product => {
    const matchesCategory = activeCategory === "All Products" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-[#ffffff] min-h-screen pt-16 pb-24 font-sans relative">
      {/* Dynamic CSS for the animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shimmerLine {
            0% { transform: translateX(-150%); }
            100% { transform: translateX(300%); }
          }
          .animate-shimmer-line {
            animation: shimmerLine 2s infinite linear;
          }
          @keyframes modalPop {
            0% { opacity: 0; transform: scale(0.95) translateY(10px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-modal-pop {
            animation: modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `
      }} />
      
      {/* --- SECTION 1: Browse by Product Type --- */}
      <div className="max-w-[1200px] mx-auto px-4 mb-20 text-center">
        <h2 className="text-3xl md:text-[42px] font-extrabold mb-8 flex items-center justify-center flex-wrap gap-2 tracking-tight text-gray-900">
          Browse by 
          <span className="relative inline-block pb-1 text-transparent bg-clip-text bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6]">
            Product
            <div className="absolute bottom-0 left-0 w-full h-[4px] bg-[#EAECEF] rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] animate-shimmer-line rounded-full"></div>
            </div>
          </span> 
          Type
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-[1000px] mx-auto">
          {BROWSE_TYPES.map((type, idx) => (
            <button 
              key={idx} 
              className="bg-[#F8F9FA] px-5 py-2.5 text-[15px] font-semibold text-gray-800 hover:text-white hover:bg-gradient-to-r hover:from-[#06367b] hover:via-[#2EC4FF] hover:to-[#075ca6] hover:shadow-md transition-all duration-300 rounded-md shadow-sm cursor-pointer"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* --- SECTION 2: Products Header --- */}
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

      {/* --- SECTION 3: Search Bar & Filter Pills --- */}
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

      {/* --- SECTION 4: Grid and Card Layout --- */}
      <div className="max-w-[1350px] mx-auto px-4 md:px-[5%]" ref={gridRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-20">
          {products.map((product, index) => {
            return (
              <FadeUpSection 
                key={product.id} 
                isVisible={isVisible} 
                delay={(index % 3) * 150 + Math.floor(index / 3) * 100} 
              >
                {/* Changed to an interactive div rather than an 'a' tag to prevent unwanted jumps */}
                <div 
                  onClick={() => openModal(product)}
                  className="block group relative flex flex-col h-full w-full bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(46,196,255,0.4)] hover:-translate-y-1"
                >
                  
                  {/* Image Container */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                    />
                  </div>

                  {/* Interactive Content Container */}
                  <div className="relative flex flex-col p-6 md:p-8 overflow-hidden grow">
                    {/* Default Background Layer (White) */}
                    <div className="absolute inset-0 bg-white border-t border-gray-100 transition-opacity duration-500 z-0 opacity-100 group-hover:opacity-0"></div>
                    
                    {/* Hover/Hold Background Layer (Premium Gradient) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] transition-opacity duration-500 z-0 opacity-0 group-hover:opacity-100"></div>

                    {/* Content (z-10) */}
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

      {/* --- SECTION 5: The Product Detail Modal --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content Box */}
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto flex flex-col animate-modal-pop border border-gray-100">
            
            {/* Close Button Top Right */}
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-2.5 bg-gray-50 hover:bg-gray-200 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm"
            >
              <CloseIcon />
            </button>

            <div className="p-6 md:p-10 lg:p-12 flex flex-col gap-10 md:gap-14">
              
              {/* Top Section: Image & Description */}
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
                
                {/* Image Panel (Left) */}
                <div className="w-full lg:w-[40%] flex flex-col gap-6 shrink-0">
                  <div className="w-full aspect-square bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[1.5rem] flex items-center justify-center p-6 relative overflow-hidden group">
                     {/* Ensures the exact same image is used as the card */}
                     <img 
                        src={selectedProduct.image} 
                        alt={selectedProduct.name} 
                        className="w-full h-full object-contain transform group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                     />
                  </div>
                </div>
                
                {/* Information Panel (Right) */}
                <div className="w-full lg:w-[60%] flex flex-col">
                  
                  <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-gray-900 mb-3 leading-tight">
                    {selectedProduct.name}
                  </h2>
                  
                  <div className="w-24 h-1.5 bg-gradient-to-r from-[#06367b] via-[#2EC4FF] to-[#075ca6] rounded-full mb-6"></div>
                  
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed tracking-wide mb-8">
                    {selectedProduct.modalDetails.longDesc}
                  </p>

                  <ul className="space-y-3.5 mb-10">
                    {selectedProduct.modalDetails.keySpecs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-gray-800 font-medium tracking-wide">
                        <div className="mt-1 text-[#2EC4FF] shrink-0"><CheckIcon /></div>
                        <span className="leading-snug">{spec}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-4 mt-auto border-t border-gray-100 pt-8">
                    <button className="bg-gradient-to-r from-[#E31C79] to-[#2B1B54] text-white px-10 py-4 rounded-xl font-bold shadow-[0_8px_20px_-6px_rgba(227,28,121,0.5)] hover:-translate-y-1 hover:shadow-[0_12px_25px_-6px_rgba(227,28,121,0.6)] transition-all tracking-wide">
                      Enquire Now
                    </button>
                    <button 
                      onClick={closeModal} 
                      className="bg-white text-[#2B1B54] border-2 border-[#2B1B54]/20 hover:border-[#2B1B54] px-8 py-3.5 rounded-xl font-bold shadow-sm hover:shadow-md transition-all tracking-wide"
                    >
                      Back to Products
                    </button>
                  </div>

                </div>
              </div>

              {/* Middle Section: Technical Specifications Table */}
              <div className="w-full">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-6 border-b-2 border-gray-100 pb-4">
                  Technical Specifications
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="p-5 font-bold text-gray-800 w-1/3 tracking-wide">Parameter</th>
                        <th className="p-5 font-bold text-gray-800 tracking-wide">Specification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.modalDetails.technicalSpecs.map((spec, i) => (
                        <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-blue-50/20 transition-colors">
                          <td className="p-5 text-gray-800 font-semibold bg-gray-50/40 tracking-wide">{spec.label}</td>
                          <td className="p-5 text-gray-600 leading-relaxed tracking-wide">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Section: Product Features List */}
              <div className="w-full pb-4">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 mb-6 border-b-2 border-gray-100 pb-4">
                  Product Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
                   {selectedProduct.modalDetails.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="mt-0.5 text-[#075ca6] shrink-0"><CheckIcon /></div>
                        <span className="text-gray-700 leading-relaxed tracking-wide font-medium">{feature}</span>
                      </div>
                   ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Products;