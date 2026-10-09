// Real-world patent records across USPTO, PCT (WIPO), EPO, and IPO (India)
export const MOCK_PATENT_DATABASE = [
  {
    fileNo: "US-11823901-B2",
    appNumber: "US 17/984,312",
    title: "Quantum Annealing Optimization for Neural Network Topology Architecture",
    filingDate: "2023-03-15",
    priorityDate: "2022-04-10",
    publicationDate: "2024-01-18",
    grantDate: "2024-09-24",
    jurisdiction: "USPTO (United States)",
    jurisdictionCode: "US",
    status: "Granted",
    entityStatus: "Small Entity",
    classification: "G06N 10/00, G06F 18/214, H03K 19/195",
    ipcClass: "G06N 10/00",
    cpcClass: "G06N 10/40",
    applicant: {
      name: "Cognitive Quantum Technologies Inc.",
      type: "Corporation",
      country: "United States",
      state: "California",
      city: "Palo Alto",
      address: "425 University Ave, Suite 300, Palo Alto, CA 94301",
      email: "legal@cognitivequantum.ai",
      phone: "+1 (650) 555-0192"
    },
    inventors: [
      {
        id: "inv-1",
        name: "Dr. Elena Vance",
        nationality: "United States",
        residenceAddress: "782 Willow Creek Rd, Menlo Park, CA 94025",
        email: "elena.vance@cognitivequantum.ai",
        shareRatio: "60%"
      },
      {
        id: "inv-2",
        name: "Kenjiro Takahashi",
        nationality: "Japan",
        residenceAddress: "3-14-1 Roppongi, Minato-ku, Tokyo 106-0032",
        email: "k.takahashi@quantumresearch.jp",
        shareRatio: "40%"
      }
    ],
    attorney: {
      name: "Marcus Sterling, Esq.",
      firm: "Sterling, Hayes & Vance LLP",
      regNo: "48,921",
      docketNo: "CQT-2023-P01US",
      email: "msterling@shvlaw.com",
      phone: "+1 (415) 890-2100",
      customerNumber: "109842"
    },
    abstract: "A method and apparatus for configuring deep neural network architectures using adiabatic quantum annealing schedules. Superconducting qubit arrays map Hamiltonian graph cuts corresponding to synaptic connection pruning, achieving exponential latency reduction in ultra-sparse sparse inference clusters.",
    totalClaims: 24,
    independentClaims: 3,
    drawingSheets: 8,
    filingFee: "$1,820.00",
    priorityClaims: [
      {
        country: "US",
        appNumber: "63/329,102",
        filingDate: "2022-04-10"
      }
    ]
  },
  {
    fileNo: "PCT-IB2024-00912",
    appNumber: "PCT/IB2024/009124",
    title: "Solid-State Electrolyte Battery Cell with Nanoporous Graphene Barrier",
    filingDate: "2024-02-08",
    priorityDate: "2023-02-14",
    publicationDate: "2024-08-22",
    grantDate: "",
    jurisdiction: "WIPO (PCT International)",
    jurisdictionCode: "PCT",
    status: "PCT International Phase (Under Examination)",
    entityStatus: "Large Entity",
    classification: "H01M 10/0562, H01M 4/13, B82Y 30/00",
    ipcClass: "H01M 10/052",
    cpcClass: "H01M 10/0562",
    applicant: {
      name: "Aether Energy Systems B.V.",
      type: "Corporation",
      country: "Netherlands",
      state: "North Holland",
      city: "Amsterdam",
      address: "Keizersgracht 482, 1016 EG Amsterdam",
      email: "patents@aetherenergy.eu",
      phone: "+31 20 894 3300"
    },
    inventors: [
      {
        id: "inv-1",
        name: "Lars Van Den Berg",
        nationality: "Netherlands",
        residenceAddress: "Van Eeghenstraat 98, 1071 GL Amsterdam",
        email: "lars.berg@aetherenergy.eu",
        shareRatio: "50%"
      },
      {
        id: "inv-2",
        name: "Dr. Sofia Lindstrom",
        nationality: "Sweden",
        residenceAddress: "Vasagatan 16, 111 20 Stockholm",
        email: "sofia.lindstrom@kth.se",
        shareRatio: "50%"
      }
    ],
    attorney: {
      name: "Dirk Van Der Meer",
      firm: "De Vries & Partners Intellectual Property",
      regNo: "EP-89210",
      docketNo: "AETH-PCT-2024-BAT",
      email: "dirk@devries-ip.eu",
      phone: "+31 20 550 4900",
      customerNumber: "882190"
    },
    abstract: "A high-capacity solid-state lithium battery cell comprising a sulfide-based solid electrolyte matrix combined with atomic layer chemical vapor deposited nanoporous graphene interlayers preventing lithium dendrite puncturing while sustaining 98.4% capacity retention over 2,500 fast charge cycles.",
    totalClaims: 32,
    independentClaims: 4,
    drawingSheets: 14,
    filingFee: "$3,450.00 (CHF)",
    priorityClaims: [
      {
        country: "EP",
        appNumber: "EP23156712.4",
        filingDate: "2023-02-14"
      }
    ]
  },
  {
    fileNo: "EP-4029182-A1",
    appNumber: "EP 21198302.1",
    title: "Autonomous Drone Swarm Collision Avoidance via Distributed Consensus Protocol",
    filingDate: "2021-09-22",
    priorityDate: "2020-09-25",
    publicationDate: "2022-03-30",
    grantDate: "2023-11-15",
    jurisdiction: "EPO (European Patent Office)",
    jurisdictionCode: "EP",
    status: "Granted",
    entityStatus: "Micro Entity",
    classification: "G08G 5/00, G05D 1/10, B64C 39/02",
    ipcClass: "G08G 5/04",
    cpcClass: "G08G 5/0021",
    applicant: {
      name: "AeroMesh Dynamics GmbH",
      type: "Limited Company (GmbH)",
      country: "Germany",
      state: "Bavaria",
      city: "Munich",
      address: "Leopoldstraße 120, 80802 München",
      email: "ip@aeromesh-dynamics.de",
      phone: "+49 89 2441 8900"
    },
    inventors: [
      {
        id: "inv-1",
        name: "Maximilian Weber",
        nationality: "Germany",
        residenceAddress: "Ungererstraße 40, 80805 München",
        email: "m.weber@aeromesh-dynamics.de",
        shareRatio: "70%"
      },
      {
        id: "inv-2",
        name: "Claire Dubois",
        nationality: "France",
        residenceAddress: "14 Rue de Rivoli, 75004 Paris",
        email: "c.dubois@polytechnique.fr",
        shareRatio: "30%"
      }
    ],
    attorney: {
      name: "Dr. Klaus Richter",
      firm: "Richter & Stern Patentanwälte PartG mbB",
      regNo: "DE-10492",
      docketNo: "AERO-EP-01-SWARM",
      email: "klaus.richter@richter-ip.de",
      phone: "+49 89 392 110",
      customerNumber: "450912"
    },
    abstract: "A peer-to-peer ad-hoc communication protocol for uncrewed aerial vehicles executing localized Voronoi cell partitioning without centralized command relays. Decentralized Byzantine fault-tolerant voting prevents micro-second trajectories overlapping in dense urban air mobility corridors.",
    totalClaims: 18,
    independentClaims: 2,
    drawingSheets: 6,
    filingFee: "€1,640.00",
    priorityClaims: [
      {
        country: "DE",
        appNumber: "10 2020 125 091.2",
        filingDate: "2020-09-25"
      }
    ]
  },
  {
    fileNo: "IN-202411039821",
    appNumber: "202411039821 A",
    title: "AI-Powered Microfluidic Biosensor for Ultra-Early Oncological Biomarker Detection",
    filingDate: "2024-05-18",
    priorityDate: "2024-05-18",
    publicationDate: "2024-07-26",
    grantDate: "",
    jurisdiction: "IPO (Indian Patent Office)",
    jurisdictionCode: "IN",
    status: "Published & In Substantive Examination",
    entityStatus: "Startup / Small Entity",
    classification: "G01N 33/574, B01L 3/00, G16B 40/00",
    ipcClass: "G01N 33/50",
    cpcClass: "G01N 33/57488",
    applicant: {
      name: "OncoNano Diagnostics Pvt. Ltd.",
      type: "Private Limited",
      country: "India",
      state: "Karnataka",
      city: "Bengaluru",
      address: "Plot 42, Electronic City Phase 1, Hosur Road, Bengaluru 560100",
      email: "ipr@onconanotech.in",
      phone: "+91 80 4912 8000"
    },
    inventors: [
      {
        id: "inv-1",
        name: "Dr. Rajeshwar Sharma",
        nationality: "India",
        residenceAddress: "Flat 402, Green Glen Layout, Bellandur, Bengaluru 560103",
        email: "rajeshwar.s@onconanotech.in",
        shareRatio: "65%"
      },
      {
        id: "inv-2",
        name: "Dr. Ananya Roy",
        nationality: "India",
        residenceAddress: "12B Southern Avenue, Kolkata 700029",
        email: "ananya.roy@iisc.ac.in",
        shareRatio: "35%"
      }
    ],
    attorney: {
      name: "Siddharth Deshmukh, Patent Agent",
      firm: "Deshmukh & Associates IP Law",
      regNo: "IN/PA-3129",
      docketNo: "ONCO-IN-2024-BIO",
      email: "siddharth@deshmukhip.in",
      phone: "+91 98201 44521",
      customerNumber: "IN-DEL-9921"
    },
    abstract: "A lab-on-a-chip biosensing apparatus comprising functionalized gold nanoparticles coupled with surface plasmon resonance waveguide arrays. Real-time machine learning surface binding kinetics profiling differentiates circulating tumor DNA fragments from benign cellular debris in whole blood samples.",
    totalClaims: 20,
    independentClaims: 2,
    drawingSheets: 10,
    filingFee: "₹8,000 (INR)",
    priorityClaims: []
  }
];

// Available Dynamic Mapping keys that form fields can bind to
export const AVAILABLE_API_MAPPINGS = [
  { key: "patent.fileNo", label: "File Reference No", group: "Patent Identification", example: "US-11823901-B2" },
  { key: "patent.appNumber", label: "Official Application Number", group: "Patent Identification", example: "US 17/984,312" },
  { key: "patent.title", label: "Invention Title", group: "Patent Identification", example: "Quantum Annealing Optimization..." },
  { key: "patent.filingDate", label: "Filing Date", group: "Dates", example: "2023-03-15" },
  { key: "patent.priorityDate", label: "Earliest Priority Date", group: "Dates", example: "2022-04-10" },
  { key: "patent.grantDate", label: "Grant Date (if applicable)", group: "Dates", example: "2024-09-24" },
  { key: "patent.jurisdiction", label: "Jurisdiction / Patent Office", group: "Jurisdiction & Status", example: "USPTO (United States)" },
  { key: "patent.status", label: "Prosecution Status", group: "Jurisdiction & Status", example: "Granted" },
  { key: "patent.entityStatus", label: "Entity Status (Small/Micro/Large)", group: "Jurisdiction & Status", example: "Small Entity" },
  { key: "patent.classification", label: "IPC / CPC Classification", group: "Technical Classification", example: "G06N 10/00, G06F 18/214" },
  { key: "patent.abstract", label: "Invention Abstract", group: "Technical Disclosure", example: "A method and apparatus..." },
  { key: "patent.totalClaims", label: "Total Number of Claims", group: "Technical Disclosure", example: "24" },
  { key: "patent.applicant.name", label: "Applicant / Assignee Name", group: "Applicant / Assignee", example: "Cognitive Quantum Technologies Inc." },
  { key: "patent.applicant.type", label: "Applicant Entity Type", group: "Applicant / Assignee", example: "Corporation" },
  { key: "patent.applicant.country", label: "Applicant Country", group: "Applicant / Assignee", example: "United States" },
  { key: "patent.applicant.address", label: "Applicant Full Address", group: "Applicant / Assignee", example: "425 University Ave..." },
  { key: "patent.applicant.email", label: "Applicant Official Email", group: "Applicant / Assignee", example: "legal@cognitivequantum.ai" },
  { key: "patent.applicant.phone", label: "Applicant Phone", group: "Applicant / Assignee", example: "+1 (650) 555-0192" },
  { key: "patent.inventors", label: "Inventors Table (Repeater Array)", group: "Inventorship", example: "[ { name: '...', nationality: '...' } ]" },
  { key: "patent.attorney.name", label: "Attorney / Agent Name", group: "Legal Representative", example: "Marcus Sterling, Esq." },
  { key: "patent.attorney.firm", label: "Attorney Firm Name", group: "Legal Representative", example: "Sterling, Hayes & Vance LLP" },
  { key: "patent.attorney.regNo", label: "Registration Number", group: "Legal Representative", example: "48,921" },
  { key: "patent.attorney.docketNo", label: "Attorney Docket Number", group: "Legal Representative", example: "CQT-2023-P01US" },
  { key: "patent.attorney.email", label: "Attorney Contact Email", group: "Legal Representative", example: "msterling@shvlaw.com" },
  { key: "patent.filingFee", label: "Statutory Filing Fee", group: "Filing & Fees", example: "$1,820.00" }
];
