/* ==========================================================================
   EDIT ME — this is the only file you need to touch to add/update
   group members, facilities, or publications.
   Just add a new object to the right array below, following the same
   shape as the existing entries, then save. No other file needs to change.
   ========================================================================== */

var LAB_DATA = {

  phdStudents: [
    { name: "Kurapati Kalyan", title: "Mr.", role: "Ph.D. Scholar", joined: "March 17, 2020", photo: "images/kurapati-kalyan.jpg" },
    { name: "Sai Lakshmi Janga", title: "Miss", role: "Ph.D. Scholar", joined: "Sep 21, 2020", photo: "images/sai-lakshmi-janga.jpg" },
    { name: "Rasik Manve", title: "Mr.", role: "Ph.D. Scholar", joined: "December 13, 2024", photo: "images/rasik-manve.jpg" },
    { name: "Jyotiranjan Jena", title: "Mr.", role: "Ph.D. Scholar", joined: "January 8, 2026", photo: "images/jyotiranjan-jena.jpg" },
    { name: "Ranjana SR", title: "Ms.", role: "Ph.D. Scholar", joined: "January 8, 2026", photo: "images/ranjana-sr.jpg" }
  ],

  postdocs: [
    { name: "Shaik Mohammed Abzal", title: "Dr.", role: "Postdoctoral Fellow", joined: "July 4, 2019", photo: "images/shaik-mohammed-abzal.jpg" }
  ],

  facilities: [
    {
      name: "DC Magnetron Sputtering cum Thermal Evaporator",
      note: "Physical vapor deposition of thin films and layered materials under high vacuum.",
      icon: "sputter",
      photo: "images/facility-sputtering.jpg"
    },
    {
      name: "Low Temperature Electrical Probe Station",
      note: "I–V and device-level electrical characterization down to low temperatures.",
      icon: "probe",
      photo: "images/facility-probe-station.jpg"
    },
    {
      name: "Grazing Incidence X-Ray Diffraction (GIXRD)",
      note: "Structure and texture analysis of thin films and layered crystals.",
      icon: "xrd",
      photo: "images/facility-gixrd.jpg"
    },
    {
      name: "Low Pressure CVD (LPCVD) Furnace",
      note: "Programmable quartz-tube furnace for chemical vapor growth of 2D materials.",
      icon: "furnace",
      photo: "images/facility-lpcvd-furnace.jpg"
    }
  ],

  publications: [
    {
      title: "Starch assisted synthesis of Bi\u2082S\u2083 nanoparticles for enhanced dielectric and antibacterial applications",
      authors: "Imran Uddin, Shaik M. Abzal, Kurapati Kalyan, Sailakshmi Janga, Ashutosh Rath, Rajkumar Patel, Deepak K. Gupta, T. R. Ravindran, Hira Ateeq, Mohd Sajid Khan, Jatis K. Dash",
      journal: "ACS Omega",
      year: "2022",
      vol: "7(46), 42438\u201342445",
      doi: "10.1021/acsomega.2c05593"
    }
  ]

};
