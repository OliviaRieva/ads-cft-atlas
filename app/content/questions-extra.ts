import type { QuizQuestion } from "../../lib/quiz-types";

// Expanded original questions; primary references distinguish extensions from GGD.
export const extraQuestions: QuizQuestion[] = [
  {
    "id": "expand-qft-001",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "A Noether current obeys ∂ₜj⁰ + ∇·j = 0. What do its components describe?",
    "options": [
      "j⁰ is the total charge and the spatial components are its position",
      "j⁰ is a source that creates charge and the spatial components are probabilities",
      "j⁰ is charge density and the spatial components describe charge flux",
      "j⁰ is always energy density and the spatial components are always momentum density"
    ],
    "answer": 2,
    "explanation": "Integrating j⁰ over space gives the charge associated with the chosen symmetry. The continuity equation says a region can lose that charge through its boundary.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-002",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      4
    ],
    "prerequisite": true,
    "prompt": "For $\\delta\\phi_a=\\epsilon\\Delta_a$, let $\\Pi_a^\\mu=\\partial\\mathcal L/\\partial(\\partial_\\mu\\phi_a)$ and suppose constant ε gives $\\delta\\mathcal L=\\epsilon\\partial_\\mu K^\\mu$. Using the course convention $\\delta S=-\\int d^dx\\,(\\partial_\\mu\\epsilon)j^\\mu$, which current follows?",
    "options": [
      "$j^\\mu=K^\\mu-\\sum_a\\Pi_a^\\mu\\Delta_a$",
      "$j^\\mu=\\sum_a\\Pi_a^\\mu\\Delta_a-K^\\mu$",
      "$j^\\mu=\\sum_a\\Pi_a^\\mu\\Delta_a+K^\\mu$",
      "$j^\\mu=K^\\mu-\\sum_a\\partial_\\nu\\Pi_a^\\nu\\,\\partial^\\mu\\Delta_a$"
    ],
    "answer": 0,
    "explanation": "Localizing ε produces $\\sum_a\\Pi_a^\\mu\\Delta_a\\,\\partial_\\mu\\epsilon$ in addition to $\\epsilon\\partial_\\mu K^\\mu$. Integrating the latter term by parts identifies the coefficient with $-j^\\mu$; reversing the current convention reverses the answer.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-003",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      4
    ],
    "prerequisite": true,
    "prompt": "For $\\mathcal L=-\\frac12\\partial_\\mu\\phi\\,\\partial^\\mu\\phi$, use the shift $\\delta\\phi=\\epsilon(x)$ and define $\\delta S=-\\int d^dx\\,(\\partial_\\mu\\epsilon)j^\\mu$. What is the current?",
    "options": [
      "$j^\\mu=-\\partial^\\mu\\phi$",
      "$j^\\mu=\\phi\\,\\partial^\\mu\\phi$",
      "$j^\\mu=\\partial^\\mu(\\phi^2)$",
      "$j^\\mu=\\partial^\\mu\\phi$"
    ],
    "answer": 3,
    "explanation": "The localized shift changes the Lagrangian by $-\\partial^\\mu\\phi\\,\\partial_\\mu\\epsilon$. Comparing with the stated definition gives $j^\\mu=\\partial^\\mu\\phi$, conserved when the massless field equation $\\Box\\phi=0$ holds.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-004",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      6
    ],
    "prerequisite": true,
    "prompt": "For $\\mathcal L=-\\partial_\\mu\\phi^*\\partial^\\mu\\phi-m^2\\phi^*\\phi$, take $\\delta\\phi=i\\epsilon\\phi$ and $\\delta\\phi^*=-i\\epsilon\\phi^*$. With $\\delta S=-\\int(\\partial_\\mu\\epsilon)j^\\mu$, which current is correct?",
    "options": [
      "$j^\\mu=i(\\phi^*\\partial^\\mu\\phi-\\phi\\partial^\\mu\\phi^*)$",
      "$j^\\mu=i(\\phi\\partial^\\mu\\phi^*-\\phi^*\\partial^\\mu\\phi)$",
      "$j^\\mu=\\phi\\partial^\\mu\\phi^*+\\phi^*\\partial^\\mu\\phi$",
      "$j^\\mu=i\\partial^\\mu(\\phi^*\\phi)$"
    ],
    "answer": 1,
    "explanation": "Vary both derivative terms and retain the coefficient of ∂με. The mass term is invariant, and the resulting current is real because the quantity in parentheses is purely imaginary.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-005",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      4
    ],
    "prerequisite": false,
    "prompt": "Write $E_a=\\delta S/\\delta\\phi_a$ and $\\delta\\phi_a=\\epsilon(x)\\Delta_a$. With compactly supported ε and $\\delta S=-\\int(\\partial_\\mu\\epsilon)j^\\mu$, what is the off-shell Noether relation?",
    "options": [
      "$\\partial_\\mu j^\\mu=0$ for every field configuration",
      "$\\partial_\\mu j^\\mu=\\sum_aE_a\\Delta_a$",
      "$j^\\mu=\\sum_aE_a\\partial^\\mu\\Delta_a$",
      "$\\partial_\\mu j^\\mu=-\\sum_aE_a\\Delta_a$"
    ],
    "answer": 1,
    "explanation": "The field variation gives $\\delta S=\\int\\epsilon\\sum_aE_a\\Delta_a$, while integration by parts gives $\\delta S=\\int\\epsilon\\partial_\\mu j^\\mu$. Equality for arbitrary ε fixes the relation; current conservation follows after imposing $E_a=0$.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-006",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "A conserved charge flows out of a fixed region at 5 units per second and into it at 2 units per second. What is dQregion/dt?",
    "options": [
      "+3 units per second",
      "−7 units per second",
      "0, because the current is conserved",
      "−3 units per second"
    ],
    "answer": 3,
    "explanation": "Integrating the continuity equation gives dQregion/dt equal to minus the net outward flux. Conservation permits the charge in a subsystem to change through its boundary.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-007",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "Let $j'^\\mu=j^\\mu+\\partial_\\nu K^{\\nu\\mu}$, where $K^{\\nu\\mu}=-K^{\\mu\\nu}$ and ordinary derivatives commute. Which statement correctly describes this improvement?",
    "options": [
      "It leaves $\\partial_\\mu j^\\mu$ unchanged; the total charge also agrees if the added surface term vanishes",
      "It leaves the total charge unchanged for every possible boundary condition",
      "It changes conservation whenever K has nonzero spatial derivatives",
      "It preserves conservation only when $K^{\\nu\\mu}$ itself vanishes"
    ],
    "answer": 0,
    "explanation": "The contraction $\\partial_\\mu\\partial_\\nu K^{\\nu\\mu}$ vanishes because the derivatives are symmetric and K is antisymmetric. The added contribution to the charge is a spatial boundary integral, so equality of charges also requires suitable boundary behavior.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-008",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "Why does the Noether current for translations carry two indices, $T^\\mu{}_\\nu$, instead of just one?",
    "options": [
      "Both indices independently label spacetime dimensions of the integration measure",
      "One index labels electric charge and the other labels energy",
      "μ labels current flow, while ν labels which translation is generated",
      "Two indices are needed only because translations are non-Abelian"
    ],
    "answer": 2,
    "explanation": "There is a separate conserved quantity for each independent translation direction. Together their currents form the energy-momentum tensor.",
    "reference": {
      "label": "David Tong — Classical Field Theory, §1.3",
      "url": "https://davidtong.org/teaching/quantum-field-theory/qfthtml/S1"
    }
  },
  {
    "id": "expand-qft-009",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      5,
      7
    ],
    "prerequisite": true,
    "prompt": "For a theory containing only $A_\\mu$, suppose $\\delta A_\\mu=\\partial_\\mu\\alpha$ is a gauge redundancy and $\\delta S=\\int d^dx\\,E^\\mu\\partial_\\mu\\alpha$ with $E^\\mu=\\delta S/\\delta A_\\mu$. Invariance for every compactly supported α implies which identity?",
    "options": [
      "$\\partial_\\mu E^\\mu\\equiv0$ without imposing the equations of motion",
      "$E^\\mu\\equiv0$ for every gauge field",
      "$\\partial_\\mu E^\\mu=0$ only after solving $E^\\mu=0$",
      "$\\partial_\\mu E^\\mu=\\partial_\\mu A^\\mu$ for every gauge field"
    ],
    "answer": 0,
    "explanation": "Integration by parts gives $\\delta S=-\\int\\alpha\\partial_\\mu E^\\mu$. Arbitrary local α therefore yields an identity among the equations of motion, illustrating Noether’s second theorem for a local redundancy."
  },
  {
    "id": "expand-qft-010",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      4
    ],
    "prerequisite": true,
    "prompt": "Using $\\eta=\\operatorname{diag}(-,+,+,+)$, add $-\\frac12m^2\\phi^2$ to the massless scalar Lagrangian and keep the shift current $j^\\mu=\\partial^\\mu\\phi$. What is its divergence on a classical solution?",
    "options": [
      "$\\partial_\\mu j^\\mu=0$ for any nonzero m",
      "$\\partial_\\mu j^\\mu=-m^2\\phi$",
      "$\\partial_\\mu j^\\mu=m^2\\phi$",
      "$\\partial_\\mu j^\\mu=2m^2\\phi^2$"
    ],
    "answer": 2,
    "explanation": "The equation of motion is (□ − m²)φ = 0 in this signature. The mass term explicitly breaks the constant shift symmetry, so the former current need not remain conserved."
  },
  {
    "id": "expand-qft-011",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      4,
      5
    ],
    "prerequisite": false,
    "prompt": "In the path-integral derivation of a Ward identity for ⟨O₁…Oₙ⟩, which variation is needed in addition to the action variation?",
    "options": [
      "Only the variation of O₁, since the other insertions are spectators",
      "The variation of every inserted operator, together with any measure Jacobian",
      "Only the change in the normalization of the vacuum state",
      "Only the variation of the integration coordinates $x^\\mu$"
    ],
    "answer": 1,
    "explanation": "The change of variables acts on the entire integrand. Varying the inserted operators supplies the local contact terms, while a nontrivial regulated Jacobian supplies an additional contribution.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-012",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      5
    ],
    "prerequisite": false,
    "prompt": "Take weight $e^{iS}$, an invariant measure, $\\delta S=\\int d^dx\\,\\epsilon\\partial_\\mu j^\\mu$, and $\\delta O_k=\\epsilon(x_k)R_k$. For $X=\\prod_kO_k$, what follows from $0=i\\langle\\delta S\\,X\\rangle+\\langle\\delta X\\rangle$?",
    "options": [
      "$\\partial_\\mu\\langle j^\\mu(x)X\\rangle=-i\\sum_k\\delta^{(d)}(x-x_k)\\langle R_k\\prod_{\\ell\\ne k}O_\\ell\\rangle$",
      "$\\partial_\\mu\\langle j^\\mu(x)X\\rangle=\\sum_k\\langle R_k\\prod_{\\ell\\ne k}O_\\ell\\rangle$ with no delta functions",
      "$\\partial_\\mu\\langle j^\\mu(x)X\\rangle=0$ including at all insertions",
      "$\\partial_\\mu\\langle j^\\mu(x)X\\rangle=i\\sum_k\\delta^{(d)}(x-x_k)\\langle R_k\\prod_{\\ell\\ne k}O_\\ell\\rangle$"
    ],
    "answer": 3,
    "explanation": "Replace each $\\epsilon(x_k)$ by $\\int d^dx\\,\\epsilon(x)\\delta^{(d)}(x-x_k)$ and use arbitrary ε. Solving $iA+B=0$ gives $A=iB$, which fixes the sign in the stated conventions.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-013",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      5
    ],
    "prerequisite": false,
    "prompt": "Let $\\delta\\phi=2i\\epsilon\\phi$ and $\\delta\\phi^*=-2i\\epsilon\\phi^*$. With weight $e^{iS}$ and $\\delta S=\\int\\epsilon\\partial_\\mu j^\\mu$, what multiplies $G=\\langle\\phi(y)\\phi^*(z)\\rangle$ in $\\partial_\\mu\\langle j^\\mu(x)\\phi(y)\\phi^*(z)\\rangle$?",
    "options": [
      "$+2\\delta^{(d)}(x-y)-2\\delta^{(d)}(x-z)$",
      "$-2\\delta^{(d)}(x-y)-2\\delta^{(d)}(x-z)$",
      "$+2i\\delta^{(d)}(x-y)+2i\\delta^{(d)}(x-z)$",
      "$-2\\delta^{(d)}(x-y)+2\\delta^{(d)}(x-z)$"
    ],
    "answer": 3,
    "explanation": "Each contact term is i times the coefficient of ε in the operator variation. The conjugate operator has the opposite charge, producing opposite signs at y and z.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-014",
    "topic": "Mathematical tools",
    "difficulty": "Applied",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "A Ward identity reads $\\partial_\\mu\\langle j^\\mu(x)X\\rangle=[-2\\delta^{(d)}(x-y)+2\\delta^{(d)}(x-z)]G$. Integrating it against a smooth test function f(x) gives which right-hand side?",
    "options": [
      "2[f(y) − f(z)]G",
      "2[f(z) − f(y)]G",
      "2[f(z) + f(y)]G",
      "2[∂μf(z) − ∂μf(y)]G"
    ],
    "answer": 1,
    "explanation": "A delta distribution samples the function at its support. The result makes clear that contact terms can contribute to an integrated identity despite vanishing at separated points."
  },
  {
    "id": "expand-qft-015",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "If δφ(x) = iqε(x)φ(x), what must be retained when varying the derivative insertion ∂νφ(y) in a local Ward identity?",
    "options": [
      "Only iqε(y)∂νφ(y), because all symmetry parameters act as constants",
      "Only iq(∂νε)(y)φ(y), because the field derivative cannot transform",
      "iq(∂νε)(y)φ(y) as well as iqε(y)∂νφ(y)",
      "iqε(y)φ(y), with no derivative on either factor"
    ],
    "answer": 2,
    "explanation": "The variation commutes with ∂ν, which then differentiates both ε and φ. The derivative of ε becomes a derivative of a delta distribution when the identity is expressed locally.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-016",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      5,
      5
    ],
    "prerequisite": true,
    "prompt": "In a vacuum invariant under an unbroken global U(1), which three-operator charge assignment is not forced to vanish by total-charge conservation alone?",
    "options": [
      "(2, −1, −1)",
      "(2, −1, 1)",
      "(1, 1, −1)",
      "(−2, −1, 1)"
    ],
    "answer": 0,
    "explanation": "An invariant correlator must have zero total U(1) charge. The assignment (2, −1, −1) meets that necessary condition, although dynamics or other symmetries may still make its correlator zero.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-017",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "Suppose $\\partial_\\mu\\langle j^\\mu(x)X\\rangle=-q\\delta^{(d)}(x-y)\\langle X\\rangle$ inside a region V containing y and no other insertions. What is the outward current flux through ∂V?",
    "options": [
      "+q⟨X⟩",
      "0 because no other operator lies on the boundary",
      "−q⟨X⟩",
      "−q times the volume of V times ⟨X⟩"
    ],
    "answer": 2,
    "explanation": "Integrating the divergence converts it to the boundary flux. The delta function contributes one because y lies inside V, so the flux detects the inserted charge with the specified sign.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-018",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      4,
      5
    ],
    "prerequisite": true,
    "prompt": "For bosonic operators, why can $\\partial_{x^0}T[j^0(x)O(y)]$ contain a term supported at $x^0=y^0$ even when the current is conserved?",
    "options": [
      "Time ordering forces the ordinary current divergence to be nonzero everywhere",
      "The delta term is an arbitrary replacement for the equal-time commutator",
      "The term comes only from differentiating the spatial measure",
      "Differentiating the time-ordering step functions produces $\\delta(x^0-y^0)[j^0(x),O(y)]$"
    ],
    "answer": 3,
    "explanation": "Writing the time-ordered product with two Heaviside functions shows that their derivatives yield a delta function. The operator products subtract in the order of the equal-time commutator, providing the canonical origin of contact terms.",
    "reference": {
      "label": "David Tong — Free Fields, §§2.6–2.7",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S2.html"
    }
  },
  {
    "id": "expand-qft-019",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      3,
      5
    ],
    "prerequisite": true,
    "prompt": "A source couples as $\\int d^dx\\,J(x)O(x)$, and O transforms as $O\\to e^{iq\\alpha}O$. How should the source transform so this product stays invariant?",
    "options": [
      "$J\\to e^{iq\\alpha}J$",
      "$J\\to e^{-iq\\alpha}J$",
      "$J\\to e^{2iq\\alpha}J$",
      "J must remain unchanged even when q is nonzero"
    ],
    "answer": 1,
    "explanation": "The source carries the opposite symmetry charge to the operator it multiplies. Treating sources this way organizes Ward identities for the generating functional."
  },
  {
    "id": "expand-qft-020",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "For $\\langle f\\rangle=Z^{-1}\\int dx\\,f(x)e^{-S(x)}$, assume $f(x)e^{-S(x)}$ vanishes at both endpoints. Which equation follows by integrating $d(fe^{-S})/dx$?",
    "options": [
      "⟨f′⟩ = ⟨fS′⟩",
      "⟨f′⟩ = −⟨fS′⟩",
      "⟨f′⟩ = ⟨f⟩⟨S′⟩ for every f",
      "⟨fS′⟩ = 0 for every f"
    ],
    "answer": 0,
    "explanation": "The derivative is $(f'-fS')e^{-S}$, and its integral is the vanishing boundary term. This is the finite-dimensional version of a Euclidean Schwinger–Dyson identity.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-021",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "For the normalized Gaussian weight $e^{-3x^2/2}$ on the real line, use $f(x)=x$ in $\\langle f'\\rangle=\\langle fS'\\rangle$. What is $\\langle x^2\\rangle$?",
    "options": [
      "3",
      "1/3",
      "1/9",
      "2/3"
    ],
    "answer": 1,
    "explanation": "Here f′ = 1 and S′ = 3x, so the identity gives 1 = 3⟨x²⟩. Integration by parts determines the fluctuation without evaluating the normalization integral.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-022",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "In regulated Euclidean scalar theory with $S_E=\\int[\\frac12(\\partial\\phi)^2+\\frac12m^2\\phi^2+\\lambda\\phi^4/4!]$, set $G(x,y)=\\langle\\phi(x)\\phi(y)\\rangle$. Which Schwinger–Dyson equation follows from varying $\\phi(x)$ with insertion $\\phi(y)$?",
    "options": [
      "$(-\\partial_x^2+m^2)G(x,y)+\\frac{\\lambda}{6}\\langle\\phi^3(x)\\phi(y)\\rangle=\\delta^{(d)}(x-y)$",
      "$(-\\partial_x^2+m^2)G(x,y)+\\frac{\\lambda}{24}\\langle\\phi^3(x)\\phi(y)\\rangle=\\delta^{(d)}(x-y)$",
      "$(-\\partial_x^2+m^2)G(x,y)+\\frac{\\lambda}{6}\\langle\\phi^3(x)\\phi(y)\\rangle=0$",
      "$(-\\partial_x^2+m^2)G(x,y)-\\frac{\\lambda}{6}\\langle\\phi^3(x)\\phi(y)\\rangle=-\\delta^{(d)}(x-y)$"
    ],
    "answer": 0,
    "explanation": "The action derivative is (−∂²+m²)φ + λφ³/3!, while the derivative of the insertion is δ⁽ᵈ⁾(x−y). Their expectation values agree by Euclidean integration by parts; the coincident product requires the stated regulator or a renormalized definition.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-023",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "For $Z[J]=\\int D\\phi\\,\\exp(-S_E[\\phi]+\\int J\\phi)$, with an invariant shift measure, which equation follows from a field variation with no operator insertions?",
    "options": [
      "⟨δSᴱ/δφ(x)⟩ⱼ = −J(x)",
      "⟨δSᴱ/δφ(x)⟩ⱼ = iJ(x)",
      "⟨δSᴱ/δφ(x)⟩ⱼ = J(x)",
      "⟨δSᴱ/δφ(x)⟩ⱼ = δJ(x)/δφ(x)"
    ],
    "answer": 2,
    "explanation": "Differentiating the exponential with respect to φ gives −δSᴱ/δφ + J. A vanishing integral of this total functional derivative yields the stated source-dependent identity.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-024",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      3,
      4
    ],
    "prerequisite": false,
    "prompt": "What does the exact relation ⟨δSᴱ/δφ(x)⟩ = 0 tell us about a source-free quantum path integral?",
    "options": [
      "Only configurations obeying the classical equation of motion occur in the integral",
      "Every field fluctuation has zero variance",
      "The quantum expectation value of every nonlinear function equals that function of the mean field",
      "The action derivative averages to zero, although individual configurations need not be stationary"
    ],
    "answer": 3,
    "explanation": "The relation constrains an expectation value over configurations. Adding an operator insertion generally supplies a contact term, so the classical equation cannot simply be set to zero inside every correlator.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-025",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "Why is the Schwinger–Dyson system in interacting φ⁴ theory called a hierarchy?",
    "options": [
      "The equation for a low-point correlator involves higher-point correlators",
      "It orders states solely by increasing energy",
      "It requires every loop correction to be smaller than the previous one",
      "It assigns a separate spacetime dimension to each correlator"
    ],
    "answer": 0,
    "explanation": "The cubic term in δS/δφ makes the two-point equation involve ⟨φ³(x)φ(y)⟩. Equations for those higher correlators generate further unknown correlators unless an exact solution or a controlled closure is available.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-026",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "In a translation-invariant, zero-mean state, a Gaussian closure approximates $\\langle\\phi^3(x)\\phi(y)\\rangle$ by $3\\langle\\phi^2(x)\\rangle G(x,y)$. Substituting this into $(-\\partial^2+m^2)G+\\frac{\\lambda}{6}\\langle\\phi^3\\phi\\rangle=\\delta$ gives which effective mass squared?",
    "options": [
      "m²eff = m² + (λ/6)⟨φ²⟩",
      "m²eff = m² + (λ/2)⟨φ²⟩",
      "m²eff = m² + 3λ⟨φ²⟩",
      "m²eff = m² − (λ/2)⟨φ²⟩"
    ],
    "answer": 1,
    "explanation": "Multiplying λ/6 by the three Gaussian pairings gives λ/2. This closure is an approximation, and the coincident variance must be regulated and treated consistently with mass renormalization.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-027",
    "topic": "Mathematical tools",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "For a finite integral over [a,b], which boundary condition justifies replacing $\\int_a^b dx\\,d(fe^{-S})/dx$ by zero?",
    "options": [
      "f′(a) = f′(b), regardless of S",
      "S′(x) = 0 at every interior point",
      "The spacetime fields vanish at spatial infinity, regardless of the integration variable x",
      "$[f(x)e^{-S(x)}]_a^b=0$"
    ],
    "answer": 3,
    "explanation": "An integral of a total derivative equals the endpoint difference. In a functional version these endpoints concern the integration over field configurations, which is distinct from a spacetime boundary term.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-028",
    "topic": "QED",
    "difficulty": "Foundation",
    "pages": [
      5,
      7
    ],
    "prerequisite": false,
    "prompt": "Why does the classical Maxwell term $-\\frac14F_{\\mu\\nu}F^{\\mu\\nu}$ contain no three-photon or four-photon vertex?",
    "options": [
      "The photon has spin one, which forbids every interaction among photons at any order",
      "A local U(1) transformation forces Aμ itself to vanish",
      "Abelian Fμν is linear in Aμ, so this term is quadratic in Aμ",
      "Electromagnetic charge conservation forbids a fermion loop with photon insertions"
    ],
    "answer": 2,
    "explanation": "For U(1), Fμν = ∂μAν − ∂νAμ has no commutator term. Charged matter can nevertheless generate photon scattering through quantum loops.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-029",
    "topic": "QED",
    "difficulty": "Applied",
    "pages": [
      5,
      5
    ],
    "prerequisite": false,
    "prompt": "Choose $D_\\mu=\\partial_\\mu+ieA_\\mu$ and $\\psi'=e^{i\\alpha(x)}\\psi$. Which transformation makes $D'_\\mu\\psi'=e^{i\\alpha}D_\\mu\\psi$?",
    "options": [
      "$A'_\\mu=A_\\mu+\\frac1e\\partial_\\mu\\alpha$",
      "$A'_\\mu=A_\\mu-e\\partial_\\mu\\alpha$",
      "$A'_\\mu=e^{i\\alpha}A_\\mu$",
      "$A'_\\mu=A_\\mu-\\frac1e\\partial_\\mu\\alpha$"
    ],
    "answer": 3,
    "explanation": "Differentiating the local phase contributes i(∂μα)ψ. The shift in ieAμ cancels this extra term, fixing both its sign and its factor of 1/e.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-030",
    "topic": "QED",
    "difficulty": "Applied",
    "pages": [
      5,
      5
    ],
    "prerequisite": false,
    "prompt": "With $D_\\mu=\\partial_\\mu+ieA_\\mu$, which interaction term appears when $i\\bar\\psi\\gamma^\\mu D_\\mu\\psi$ is expanded?",
    "options": [
      "$+eA_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "$-ieA_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "$-eA_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "$-e^2A_\\mu A^\\mu\\bar\\psi\\psi$"
    ],
    "answer": 2,
    "explanation": "The gauge part contains i times ie, which equals −e. Its coefficient determines the sign convention for the matter current coupling and the fermion-photon vertex.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-031",
    "topic": "QED",
    "difficulty": "Applied",
    "pages": [
      5,
      7
    ],
    "prerequisite": false,
    "prompt": "The course writes $\\mathcal L=-F(A)^2/(4g^2)+i\\bar\\psi\\gamma^\\mu(\\partial_\\mu+iA_\\mu)\\psi$. For Abelian $A_\\mu=gB_\\mu$, where does g appear in the canonically normalized form?",
    "options": [
      "ℒ contains $-\\frac14F(B)^2$ and $-gB_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "ℒ contains $-F(B)^2/(4g^4)$ and $-B_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "ℒ contains $-\\frac14F(B)^2$ and $-g^2B_\\mu\\bar\\psi\\gamma^\\mu\\psi$",
      "ℒ contains $-g^2F(B)^2/4$ and $-B_\\mu\\bar\\psi\\gamma^\\mu\\psi$"
    ],
    "answer": 0,
    "explanation": "Abelian curvature rescales as F(A)=gF(B), canceling the gauge kinetic prefactor. The same field redefinition exposes g in the matter interaction, so the two presentations describe the same coupling.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-032",
    "topic": "QED",
    "difficulty": "Foundation",
    "pages": [
      5,
      5
    ],
    "prerequisite": false,
    "prompt": "Why is the Dirac mass term $m\\bar\\psi\\psi$ invariant under the vector U(1) transformation $\\psi\\to e^{i\\alpha}\\psi$?",
    "options": [
      "A fermion mass term is invariant under any transformation of ψ",
      "$\\bar\\psi$ transforms with $e^{-i\\alpha}$, so the phases cancel",
      "The mass m must transform as $e^{-2i\\alpha}m$",
      "Both ψ and ψ̄ acquire the same phase, whose square equals one"
    ],
    "answer": 1,
    "explanation": "The adjoint field carries the opposite phase, leaving ψ̄ψ unchanged. This statement concerns the vector phase symmetry of QED; an axial transformation acts differently.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-033",
    "topic": "QED",
    "difficulty": "Applied",
    "pages": [
      6,
      6
    ],
    "prerequisite": false,
    "prompt": "For mostly-plus signature and $D_\\mu=\\partial_\\mu+ieA_\\mu$, which term comes from the product of the two gauge-field factors in $-(D_\\mu\\phi)^*D^\\mu\\phi$?",
    "options": [
      "$+e^2A_\\mu A^\\mu|\\phi|^2$",
      "$-e^2A_\\mu A^\\mu|\\phi|^2$",
      "$-eA_\\mu A^\\mu|\\phi|^2$",
      "$-ie^2A_\\mu A^\\mu|\\phi|^2$"
    ],
    "answer": 1,
    "explanation": "The conjugate derivative contains −ieAμ, while the unconjugated derivative contains +ieAμ. Their product is positive before the overall kinetic minus sign, giving the two-photon, two-scalar contact interaction.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-034",
    "topic": "QED",
    "difficulty": "Hard",
    "pages": [
      4,
      7
    ],
    "prerequisite": true,
    "prompt": "In a Lorentz-invariant QED vacuum, write the photon polarization tensor as $\\Pi^{\\mu\\nu}=A(q^2)\\eta^{\\mu\\nu}+B(q^2)q^\\mu q^\\nu$. If the Ward identity gives $q_\\mu\\Pi^{\\mu\\nu}=0$, which relation follows for generic nonzero q?",
    "options": [
      "$A(q^2)=B(q^2)$",
      "$A(q^2)=q^2B(q^2)$",
      "$A(q^2)=-q^2B(q^2)$",
      "$A(q^2)=0$ and $B(q^2)$ is unconstrained"
    ],
    "answer": 2,
    "explanation": "Contracting with qμ gives [A(q²)+q²B(q²)]qν. The coefficient must vanish, leaving a tensor proportional to q²ημν−qμqν rather than two independent scalar functions.",
    "reference": {
      "label": "Matthew Wingate — Advanced QFT, §7",
      "url": "https://www.damtp.cam.ac.uk/user/wingate/Notes/AQFT/aqft_lectures.pdf"
    }
  },
  {
    "id": "expand-qft-035",
    "topic": "QED",
    "difficulty": "Foundation",
    "pages": [
      5,
      5
    ],
    "prerequisite": true,
    "prompt": "A free electromagnetic plane wave in four spacetime dimensions has how many physical photon polarizations?",
    "options": [
      "Four polarizations, one for each component of Aμ",
      "Three polarizations, as for a massive vector",
      "One polarization, because U(1) has one generator",
      "Two transverse polarizations"
    ],
    "answer": 3,
    "explanation": "Gauge redundancy and the Maxwell constraints remove the nonphysical components of the four-potential. The remaining two states can be described by transverse linear polarizations or helicities ±1.",
    "reference": {
      "label": "David Tong — Quantum Electrodynamics",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S6.html"
    }
  },
  {
    "id": "expand-qft-036",
    "topic": "QCD",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": false,
    "prompt": "In QCD, which color representations describe a quark and a gluon respectively?",
    "options": [
      "A quark is fundamental with 3 color components; a gluon is adjoint with 8",
      "A quark is adjoint with 8 color components; a gluon is fundamental with 3",
      "Both are fundamental with 3 color components",
      "Both are adjoint with 8 color components"
    ],
    "answer": 0,
    "explanation": "The local color group is SU(3). Its defining representation acts on a quark’s three color components, while the gauge field takes values in its eight-dimensional Lie algebra.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-037",
    "topic": "QCD",
    "difficulty": "Applied",
    "pages": [
      7,
      7
    ],
    "prerequisite": false,
    "prompt": "Use canonically normalized Yang–Mills fields, with $F^a_{\\mu\\nu}=\\partial_\\mu A^a_\\nu-\\partial_\\nu A^a_\\mu+g f^{abc}A^b_\\mu A^c_\\nu$. What coupling powers multiply the cubic and quartic gauge-field terms in $-\\frac14F^a_{\\mu\\nu}F^{a\\mu\\nu}$?",
    "options": [
      "Cubic: $g$; quartic: $g^2$",
      "Cubic: $g^2$; quartic: $g^4$",
      "Cubic: $1/g$; quartic: $1/g^2$",
      "Cubic: $g$; quartic: $g$"
    ],
    "answer": 0,
    "explanation": "The cross term between ∂A and gAA contains three gauge fields and one power of g. Squaring gAA contains four gauge fields and two powers of g, producing the gluon self-interactions.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-038",
    "topic": "QCD",
    "difficulty": "Applied",
    "pages": [
      7,
      7
    ],
    "prerequisite": false,
    "prompt": "For SU(3) with $N_f$ active Dirac quark flavors, $\\beta(g)=-[11-\\frac23N_f]g^3/(16\\pi^2)+O(g^5)$. What is the bracketed coefficient at $N_f=6$?",
    "options": [
      "9",
      "15",
      "11/3",
      "7"
    ],
    "answer": 3,
    "explanation": "Substitution gives 11 − (2/3)×6 = 7. Its positive value makes the displayed beta function negative at weak positive coupling.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-039",
    "topic": "QCD",
    "difficulty": "Foundation",
    "pages": [
      7,
      7
    ],
    "prerequisite": false,
    "prompt": "In a weakly coupled regime, QCD has β(g)=μdg/dμ<0. What happens when the energy scale μ increases slightly?",
    "options": [
      "The coupling increases",
      "The coupling remains constant because QCD is gauge invariant",
      "The coupling decreases",
      "The coupling becomes negative immediately"
    ],
    "answer": 2,
    "explanation": "A negative derivative with respect to log μ means the positive coupling moves toward smaller values as μ increases. This is the local running behavior underlying asymptotic freedom.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-040",
    "topic": "QCD",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "A quark field is written qᵢᶠ, with color i and flavor f. What does an ordinary SU(3) color gauge transformation act on?",
    "options": [
      "The flavor index f, leaving color unchanged",
      "The color index i, using the same color rotation for each flavor",
      "Only the quark mass parameter",
      "Color and flavor by the same matrix even when the numbers of colors and flavors differ"
    ],
    "answer": 1,
    "explanation": "Color labels the local gauge representation, whereas flavor distinguishes quark species. Equal masses may permit additional flavor symmetries, but those do not become the color gauge redundancy.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-041",
    "topic": "QCD",
    "difficulty": "Hard",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Suppress spin and flavor indices and consider the color contraction $B=\\epsilon_{ijk}q^i q^j q^k$ at one spacetime point. Why is it invariant under $q^i\\to U^i{}_a q^a$ for $U\\in SU(3)$?",
    "options": [
      "Each individual quark component is gauge invariant",
      "The contraction is invariant because $\\operatorname{tr}U=3$ for every $U\\in SU(3)$",
      "Three factors of U contract with $\\epsilon_{ijk}$ to give $(\\det U)\\epsilon_{abc}=\\epsilon_{abc}$",
      "The three color rotations cancel pairwise without using the epsilon tensor"
    ],
    "answer": 2,
    "explanation": "The epsilon tensor converts the product of three fundamental transformations into the determinant. SU(3) has determinant one, so this color structure is a singlet; spin and flavor must also be chosen consistently for a nonzero fermionic operator.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-042",
    "topic": "QCD",
    "difficulty": "Applied",
    "pages": [
      7,
      7
    ],
    "prerequisite": true,
    "prompt": "Why is a bare term $m_g^2 A_\\mu^a A^{a\\mu}/2$ incompatible with the usual local Yang–Mills gauge redundancy when no compensating fields are present?",
    "options": [
      "Every Lorentz scalar automatically breaks gauge invariance",
      "The gauge potential has an inhomogeneous derivative term in its transformation",
      "A gluon mass parameter would have to be dimensionless",
      "The adjoint color index cannot be contracted with itself"
    ],
    "answer": 1,
    "explanation": "The inhomogeneous term prevents AμᵃAᵃμ from transforming as a gauge-invariant scalar. This does not rule out a nonperturbative mass gap in the spectrum of gauge-invariant states.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-043",
    "topic": "QCD",
    "difficulty": "Hard",
    "pages": [
      7,
      9
    ],
    "prerequisite": true,
    "prompt": "Why does the negative one-loop QCD beta function, by itself, not prove confinement?",
    "options": [
      "It establishes weak-coupling running, while confinement concerns long-distance dynamics where that approximation fails",
      "A beta function contains no information about scale dependence",
      "A negative beta function proves all gauge-invariant particles are massless",
      "Confinement is equivalent to the coupling being exactly zero in the ultraviolet"
    ],
    "answer": 0,
    "explanation": "One-loop running predicts growth of the coupling toward lower scales in its domain of validity. Establishing confinement requires additional information about the infrared theory, not an extrapolation of a truncated expansion beyond control.",
    "reference": {
      "label": "David Tong — The Standard Model, chapter 3",
      "url": "https://davidtong.org/pdfs/teaching/standard-model/standardmodel3.pdf"
    }
  },
  {
    "id": "expand-qft-044",
    "topic": "Mathematical tools",
    "difficulty": "Applied",
    "pages": [
      3,
      5
    ],
    "prerequisite": true,
    "prompt": "For a smooth scalar field and constant vector a, what is the coefficient of $\\epsilon^2$ in $\\phi(x+\\epsilon a)$?",
    "options": [
      "$a^\\mu a^\\nu\\partial_\\mu\\partial_\\nu\\phi(x)$",
      "$\\frac12 a^\\mu\\partial_\\mu\\phi(x)$",
      "$-\\frac12 a^\\mu a^\\nu\\partial_\\mu\\partial_\\nu\\phi(x)$",
      "$\\frac12 a^\\mu a^\\nu\\partial_\\mu\\partial_\\nu\\phi(x)$"
    ],
    "answer": 3,
    "explanation": "Apply the ordinary Taylor series along the line x+εa. The second directional derivative carries the factor 1/2!, which matters when extending an infinitesimal symmetry transformation beyond first order."
  },
  {
    "id": "expand-qft-045",
    "topic": "Mathematical tools",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "Treat V as independent of g. What is the expansion of $e^{igV}$ through order $g^2$?",
    "options": [
      "$1+igV+\\frac12g^2V^2+O(g^3)$",
      "$1+igV-g^2V^2+O(g^3)$",
      "$1+gV+\\frac12g^2V^2+O(g^3)$",
      "$1+igV-\\frac12g^2V^2+O(g^3)$"
    ],
    "answer": 3,
    "explanation": "The exponential series contributes (igV)²/2 at second order. Since i²=−1, this term has a minus sign and the factorial denominator."
  },
  {
    "id": "expand-qft-046",
    "topic": "Mathematical tools",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "For $S_{\\rm int}[\\phi]=\\int d^dx\\,\\lambda\\phi(x)^4/4!$, what is $\\delta S_{\\rm int}/\\delta\\phi(y)$?",
    "options": [
      "$\\lambda\\phi(y)^3/3!$",
      "$\\lambda\\phi(y)^3/4!$",
      "$\\lambda\\phi(y)^4/3!$",
      "$4!\\lambda\\phi(y)^3$"
    ],
    "answer": 0,
    "explanation": "Varying φ⁴ produces 4φ³δφ. The defining functional derivative then reads off λφ³/3! after the spacetime delta function performs the integral."
  },
  {
    "id": "expand-qft-047",
    "topic": "Mathematical tools",
    "difficulty": "Foundation",
    "pages": [
      3,
      7
    ],
    "prerequisite": true,
    "prompt": "For $|gx|\\ll1$, which expression approximates $(1+gx)^{-1}$ through order $g^2$?",
    "options": [
      "$1+gx+g^2x^2$",
      "$1-gx+g^2x^2$",
      "$1-gx-g^2x^2$",
      "$1-gx+\\frac12g^2x^2$"
    ],
    "answer": 1,
    "explanation": "The geometric series alternates in powers of gx. Multiplying the proposed expression by 1+gx leaves 1 plus terms of order g³, confirming the truncation."
  },
  {
    "id": "expand-qft-048",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      3,
      4
    ],
    "prerequisite": true,
    "prompt": "In Euclidean perturbation theory, $\\langle O\\rangle_g=\\langle Oe^{-gV}\\rangle_0/\\langle e^{-gV}\\rangle_0$. What is its term linear in g?",
    "options": [
      "$-g\\langle OV\\rangle_0$ only",
      "$+g[\\langle OV\\rangle_0-\\langle O\\rangle_0\\langle V\\rangle_0]$",
      "$-g[\\langle OV\\rangle_0-\\langle O\\rangle_0\\langle V\\rangle_0]$",
      "$-g[\\langle OV\\rangle_0+\\langle O\\rangle_0\\langle V\\rangle_0]$"
    ],
    "answer": 2,
    "explanation": "Expand the numerator and the reciprocal denominator to first order. The subtraction comes from normalization and removes the factorized vacuum contribution.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-049",
    "topic": "Mathematical tools",
    "difficulty": "Hard",
    "pages": [
      3,
      7
    ],
    "prerequisite": true,
    "prompt": "An asymptotic expansion has term magnitudes $T_n=n!g^n$ with $g=0.05$. Using $T_{n+1}/T_n=(n+1)g$, at about which order are the terms smallest?",
    "options": [
      "Around n = 19–20",
      "At n = 1",
      "Around n = 400",
      "Only at n → ∞"
    ],
    "answer": 0,
    "explanation": "The terms decrease while (n+1)g<1 and increase after that ratio exceeds one. Their minimum therefore occurs near n≈1/g; keeping arbitrarily many terms at fixed g does not improve this asymptotic approximation.",
    "reference": {
      "label": "David Skinner — Advanced QFT, §§2.3–2.4",
      "url": "https://www.damtp.cam.ac.uk/user/dbs26/AQFT/chaps1%2B2.pdf"
    }
  },
  {
    "id": "expand-qft-050",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      7,
      15
    ],
    "prerequisite": true,
    "prompt": "Suppose $\\mu\\,dg/d\\mu=bg^2$ with constant $b>0$. Which relation connects the couplings at $\\mu_0$ and $\\mu$ within this approximation?",
    "options": [
      "$\\frac1{g(\\mu)}=\\frac1{g(\\mu_0)}+b\\log(\\mu/\\mu_0)$",
      "$g(\\mu)=g(\\mu_0)+b(\\mu-\\mu_0)$",
      "$\\frac1{g(\\mu)}=\\frac1{g(\\mu_0)}-b\\log(\\mu/\\mu_0)$",
      "$g(\\mu)=g(\\mu_0)(\\mu/\\mu_0)^b$"
    ],
    "answer": 2,
    "explanation": "The chain rule gives d(1/g)/dlog μ=−b. Integrating yields the logarithm; a large resulting coupling signals loss of the assumed perturbative control."
  },
  {
    "id": "expand-qft-051",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      9,
      10
    ],
    "prerequisite": false,
    "prompt": "At fixed N, define $\\lambda=Ng^2$ and $\\beta_g=-bNg^3$. What is $\\beta_\\lambda=d\\lambda/d\\log\\mu$?",
    "options": [
      "$\\beta_\\lambda=-b\\lambda^2$",
      "$\\beta_\\lambda=-2bN\\lambda^2$",
      "$\\beta_\\lambda=-2b\\lambda$",
      "$\\beta_\\lambda=-2b\\lambda^2$"
    ],
    "answer": 3,
    "explanation": "Differentiating λ gives 2Ngβg. Substitution produces −2bN²g⁴=−2bλ², including the factor of two from differentiating g²."
  },
  {
    "id": "expand-qft-052",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "A real scalar has Gaussian mass dimension $[\\phi]=(d-2)/2$. What is the mass dimension of the coefficient u of $\\phi^4/4!$ in d dimensions?",
    "options": [
      "$[u]=d-4$",
      "$[u]=4-d$",
      "$[u]=2-d$",
      "$[u]=0$ for every d"
    ],
    "answer": 1,
    "explanation": "A Lagrangian density has mass dimension d, while φ⁴ has dimension 2(d−2). Subtracting gives 4−d, so in d=4−ε one writes u=μᵋg with dimensionless g.",
    "reference": {
      "label": "David Tong — Statistical Field Theory, §3.5",
      "url": "https://www.damtp.cam.ac.uk/user/tong/sft/sfthtml/S3.html"
    }
  },
  {
    "id": "expand-qft-053",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "For the critical scalar theory in $d=4-\\epsilon$, suppose $\\beta(g)=-\\epsilon g+ag^2+O(g^3)$ with $a>0$ and small $\\epsilon>0$. Which leading value is the interacting Wilson–Fisher fixed point?",
    "options": [
      "$g_*=0$",
      "$g_*=\\epsilon/a$",
      "$g_*=-\\epsilon/a$",
      "$g_*=a/\\epsilon$"
    ],
    "answer": 1,
    "explanation": "Factoring the displayed terms gives g(−ε+ag), with roots zero and ε/a. The nonzero root balances classical scaling against the quantum correction and is perturbatively small when ε is small.",
    "reference": {
      "label": "David Tong — Statistical Field Theory, §3.5",
      "url": "https://www.damtp.cam.ac.uk/user/tong/sft/sfthtml/S3.html"
    }
  },
  {
    "id": "expand-qft-054",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "Use $\\beta=\\mu\\,dg/d\\mu$ and $\\beta'(g_*)=\\epsilon>0$ at the Wilson–Fisher point. Along the quartic-coupling direction on the critical surface, how does a small deviation behave as $\\mu\\to0$?",
    "options": [
      "$\\delta g(\\mu)\\propto\\mu^{-\\epsilon}$, so it grows",
      "$\\delta g(\\mu)$ stays constant because $\\beta(g_*)=0$",
      "$\\delta g(\\mu)\\propto e^{\\epsilon\\mu}$, so linearization gives no fixed-point limit",
      "$\\delta g(\\mu)\\propto\\mu^\\epsilon$, so it shrinks"
    ],
    "answer": 3,
    "explanation": "Linearizing gives dδg/dlog μ=εδg. Its solution decays toward low energy, making this direction infrared-attractive; the statement does not remove relevant mass deformations.",
    "reference": {
      "label": "David Tong — Statistical Field Theory, §3.5",
      "url": "https://www.damtp.cam.ac.uk/user/tong/sft/sfthtml/S3.html"
    }
  },
  {
    "id": "expand-qft-055",
    "topic": "QFT",
    "difficulty": "Foundation",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "Why is an expansion near d=4−ε useful for studying the Wilson–Fisher fixed point?",
    "options": [
      "Noninteger d makes every Feynman diagram vanish",
      "Setting ε=1 automatically turns a one-loop result into an exact three-dimensional answer",
      "For small positive ε, the interacting fixed-point coupling is small enough to organize a perturbative expansion",
      "The expansion removes the need to distinguish relevant and irrelevant perturbations"
    ],
    "answer": 2,
    "explanation": "The fixed-point coupling scales as ε at leading order, supplying a small parameter. Extrapolation to ε=1 can be useful, but its quantitative accuracy is not guaranteed by the first-order calculation.",
    "reference": {
      "label": "David Tong — Statistical Field Theory, §3.5",
      "url": "https://www.damtp.cam.ac.uk/user/tong/sft/sfthtml/S3.html"
    }
  },
  {
    "id": "expand-qft-056",
    "topic": "QFT",
    "difficulty": "Applied",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "A Z₂-symmetric scalar theory has an infrared-attractive Wilson–Fisher quartic coupling, but its mass deformation is relevant. What must be done to reach critical long-distance behavior?",
    "options": [
      "Tune the mass parameter onto the critical surface",
      "Choose any mass because attraction in the quartic coupling removes it",
      "Set the quartic coupling to zero while leaving the mass arbitrary",
      "Increase the mass indefinitely to make the correlation length diverge"
    ],
    "answer": 0,
    "explanation": "A relevant mass deviation grows under coarse-graining and takes the theory away from criticality. Tuning the mass removes that direction and allows the critical flow to approach the interacting fixed point.",
    "reference": {
      "label": "David Tong — Statistical Field Theory, §3.5",
      "url": "https://www.damtp.cam.ac.uk/user/tong/sft/sfthtml/S3.html"
    }
  },
  {
    "id": "expand-qft-057",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "Let $\\beta(g)=-\\epsilon g+ag^2+cg^3+O(g^4)$ with $a>0$. If the nonzero fixed point is $g_*=\\epsilon/a+k\\epsilon^2+O(\\epsilon^3)$, what is k?",
    "options": [
      "$k=c/a^3$",
      "$k=-c/a^2$",
      "$k=-a/c^3$",
      "$k=-c/a^3$"
    ],
    "answer": 3,
    "explanation": "Divide the nonzero-root equation by g and substitute the expansion into −ε+ag+cg²=0. The coefficient of ε² is ak+c/a², which must vanish."
  },
  {
    "id": "expand-qft-058",
    "topic": "GR",
    "difficulty": "Applied",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "In 1+1 dimensions with $c=1$ and $\\eta=\\operatorname{diag}(-,+)$, two events have $\\Delta t=5$ and $\\Delta x=3$. What is the proper time along the inertial path between them?",
    "options": [
      "2",
      "4",
      "√34",
      "8"
    ],
    "answer": 1,
    "explanation": "The interval is −25+9=−16, so the separation is timelike. Proper time is √(Δt²−Δx²)=4 in the chosen units.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-059",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      15,
      16
    ],
    "prerequisite": true,
    "prompt": "Two events are timelike separated and event B is later than A in one inertial frame. Which statement holds for proper, time-orientation-preserving Lorentz transformations?",
    "options": [
      "B remains later than A in every such inertial frame",
      "A sufficiently fast inertial observer sees B before A",
      "The events become simultaneous in their common rest frame",
      "Their separation can become spacelike without changing the speed of light"
    ],
    "answer": 0,
    "explanation": "A Lorentz transformation preserves the interval and, within the stated component of the group, the future light cone. The temporal ordering of timelike-related events is therefore invariant.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-060",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      15,
      17
    ],
    "prerequisite": true,
    "prompt": "Which matrix condition says that a linear transformation $\\Lambda$ preserves the Minkowski interval?",
    "options": [
      "$\\Lambda^T\\Lambda=I$ without a metric factor",
      "$\\Lambda\\eta=\\eta$",
      "$\\Lambda^T\\eta\\Lambda=\\eta$",
      "$\\Lambda^T\\eta\\Lambda=I$"
    ],
    "answer": 2,
    "explanation": "Under x′=Λx the quadratic form becomes xᵀΛᵀηΛx. Requiring it to equal xᵀηx for every vector gives the Lorentz condition.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-061",
    "topic": "GR",
    "difficulty": "Applied",
    "pages": [
      15,
      17
    ],
    "prerequisite": true,
    "prompt": "Take $c=1$, $t'=\\gamma(t-vx)$ and $x'=\\gamma(x-vt)$ with $v=0.6$. What are the coordinates of the event $(t,x)=(5,4)$ in the primed frame?",
    "options": [
      "(t′,x′) = (2.60, 1.00)",
      "(t′,x′) = (9.25, 8.75)",
      "(t′,x′) = (3.25, 1.25)",
      "(t′,x′) = (4.00, 3.00)"
    ],
    "answer": 2,
    "explanation": "Here γ=1/√(1−0.6²)=1.25. Substituting gives t′=1.25(5−2.4)=3.25 and x′=1.25(4−3)=1.25, preserving −t²+x²=−9.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-062",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      15,
      17
    ],
    "prerequisite": true,
    "prompt": "In units c=1, a particle has mass m=3 and spatial momentum magnitude |p|=4. What is its positive on-shell energy?",
    "options": [
      "5",
      "7",
      "1",
      "√7"
    ],
    "answer": 0,
    "explanation": "Relativistic energy obeys E²=|p|²+m². Thus E=√(16+9)=5, independent of whether one writes the metric with mostly-plus or mostly-minus signature.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-063",
    "topic": "GR",
    "difficulty": "Applied",
    "pages": [
      15,
      17
    ],
    "prerequisite": true,
    "prompt": "With $\\eta_{\\mu\\nu}=\\operatorname{diag}(-,+,+,+)$ and $V^\\mu=(3,1,2,0)$, what is $V_\\mu V^\\mu$?",
    "options": [
      "+14",
      "−4",
      "+4",
      "−14"
    ],
    "answer": 1,
    "explanation": "Lowering the index changes the sign of the time component, giving Vμ=(−3,1,2,0). The contraction is −9+1+4=−4, so this vector is timelike.",
    "reference": {
      "label": "Silvia Nagy — Advanced Quantum Theory, §2",
      "url": "https://www.maths.dur.ac.uk/users/silvia.nagy/QFT.html"
    }
  },
  {
    "id": "expand-qft-064",
    "topic": "QFT",
    "difficulty": "Hard",
    "pages": [
      3,
      5
    ],
    "prerequisite": true,
    "prompt": "A scalar vacuum two-point function is nonzero at spacelike separation. Why does that fact alone not imply faster-than-light signaling?",
    "options": [
      "Any nonzero spacelike correlator necessarily carries an observable signal",
      "Microcausality requires only the classical field to vanish outside the light cone",
      "Lorentz invariance allows a controllable signal whenever the correlator is exponentially small",
      "Microcausality constrains the commutator of local observables, which can vanish even when a two-point function does not"
    ],
    "answer": 3,
    "explanation": "A correlator describes quantum correlations and is not by itself a response to a controllable local intervention. For a local scalar field the spacelike commutator vanishes, enforcing the causal restriction even though individual correlation functions need not vanish.",
    "reference": {
      "label": "David Tong — Free Fields, §§2.6–2.7",
      "url": "https://www.damtp.cam.ac.uk/user/tong/qft/qfthtml/S2.html"
    }
  },
  {
    "id": "expand-sym-001",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "A smooth one-parameter family of matrix-group elements satisfies U(0)=I. What does its tangent X=dU/dt at t=0 represent?",
    "options": [
      "An element of the Lie algebra",
      "A new connected component of the group",
      "The dimension of a representation",
      "The determinant of U for all t"
    ],
    "answer": 0,
    "explanation": "The Lie algebra is the tangent space to the group at its identity, equipped with a bracket. For matrix groups that bracket is the matrix commutator."
  },
  {
    "id": "expand-sym-002",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Use the physics convention U(ε)=I+iεT+O(ε²), with ε real. Which condition follows by expanding U†U=I to first order?",
    "options": [
      "T†=−T",
      "T†=T",
      "T²=I",
      "tr T=0 for every unitary group"
    ],
    "answer": 1,
    "explanation": "The linear term in U†U is iε(T−T†), so T must be Hermitian. Tracelessness requires the extra determinant-one condition; it does not follow from unitarity alone."
  },
  {
    "id": "expand-sym-003",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "For SU(5), which pair gives the complex dimension of the defining representation and the dimension of the adjoint representation?",
    "options": [
      "(24, 5)",
      "(5, 25)",
      "(5, 24)",
      "(25, 24)"
    ],
    "answer": 2,
    "explanation": "The defining action uses five-component complex vectors. A traceless Hermitian 5×5 matrix has 25−1=24 real generator coefficients, and the complexified adjoint representation has complex dimension 24."
  },
  {
    "id": "expand-sym-004",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "How many real continuous generators are present in U(3) and SU(3), respectively?",
    "options": [
      "3 and 2",
      "8 and 9",
      "6 and 3",
      "9 and 8"
    ],
    "answer": 3,
    "explanation": "Hermitian 3×3 matrices contain three real diagonal entries and three complex off-diagonal pairs: 3+6=9 parameters. The determinant-one constraint removes the trace generator, leaving eight for SU(3)."
  },
  {
    "id": "expand-sym-005",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "For a real orthogonal matrix R(ε)=I+εA+O(ε²), what follows from RᵀR=I?",
    "options": [
      "Aᵀ=−A",
      "Aᵀ=A",
      "A must be diagonal",
      "A must have determinant one"
    ],
    "answer": 0,
    "explanation": "The first-order term is ε(Aᵀ+A), which must vanish. Thus the generators in this real convention are antisymmetric matrices, with one parameter for each unordered pair of distinct indices."
  },
  {
    "id": "expand-sym-006",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "How many independent continuous generators does SO(7) have?",
    "options": [
      "7",
      "21",
      "28",
      "48"
    ],
    "answer": 1,
    "explanation": "A real antisymmetric 7×7 matrix is determined by its entries above the diagonal. There are 7·6/2=21 such entries; the defining vector representation instead has dimension seven."
  },
  {
    "id": "expand-sym-007",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "For SO(4,2), what are the dimension of the ambient defining real vector space and the number of Lie-algebra generators?",
    "options": [
      "4 and 8",
      "6 and 35",
      "6 and 15",
      "15 and 6"
    ],
    "answer": 2,
    "explanation": "The defining quadratic form has 4+2=6 coordinates. Preserving a nondegenerate symmetric form gives 6·5/2=15 independent generators, irrespective of its signature."
  },
  {
    "id": "expand-sym-008",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "Compare the real dimensions of SO(5,1) and SO(4,2). Which statement is correct?",
    "options": [
      "SO(5,1) has 5 generators and SO(4,2) has 8",
      "SO(5,1) has 35 generators and SO(4,2) has 15",
      "Their dimensions differ because they have different numbers of timelike directions",
      "Both have 15 generators, although their real Lie algebras are different"
    ],
    "answer": 3,
    "explanation": "Both act on a six-dimensional real space, so both have 6·5/2=15 generators. Equal dimension does not fix the real Lie algebra; these signatures give different real forms of the same complexified algebra."
  },
  {
    "id": "expand-sym-009",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "The group SU(3,2) preserves a Hermitian form on ℂ⁵ and has determinant one. How many real generators does it have?",
    "options": [
      "24",
      "10",
      "15",
      "48"
    ],
    "answer": 0,
    "explanation": "For SU(p,q), the real dimension is (p+q)²−1. Here the anti-Hermitian diagonal blocks contribute 3²+2² parameters, the complex off-diagonal block contributes 2·3·2, and the trace condition subtracts one: 9+4+12−1=24."
  },
  {
    "id": "expand-sym-010",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "A note identifies SO(4,2) with SU(4,2). Which generator count immediately disproves this identification?",
    "options": [
      "Both have 15 generators",
      "SO(4,2) has 15 generators; SU(4,2) has 35",
      "SO(4,2) has 35 generators; SU(4,2) has 15",
      "Both have 35 generators"
    ],
    "answer": 1,
    "explanation": "SO(4,2) has 6·5/2=15 generators, while SU(4,2) has 6²−1=35. The special four-dimensional conformal relation involves su(2,2), not su(4,2)."
  },
  {
    "id": "expand-sym-011",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Use the compact convention Sp(n)=USp(2n), acting on ℂ²ⁿ. For Sp(3), which pair gives the defining complex dimension and the real group dimension?",
    "options": [
      "(3, 9)",
      "(6, 35)",
      "(6, 21)",
      "(3, 21)"
    ],
    "answer": 2,
    "explanation": "In this convention the defining representation has complex dimension 2n, and the compact group has real dimension n(2n+1). Substituting n=3 gives six and 21; stating the convention matters because some authors use Sp(2n) for this group.",
    "reference": {
      "label": "D’Hoker: classical groups and dimension table",
      "url": "https://www.pa.ucla.edu/faculty-websites/dhoker-lecture-notes/graduate-courses/group-theory.pdf"
    }
  },
  {
    "id": "expand-sym-012",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "With Sp(n)=USp(2n), which familiar compact group is isomorphic to Sp(1)?",
    "options": [
      "U(1)",
      "SO(2)",
      "SU(3)",
      "SU(2)"
    ],
    "answer": 3,
    "explanation": "Sp(1) consists of unit quaternions and is isomorphic to SU(2). Both have three real generators and a two-dimensional defining complex representation."
  },
  {
    "id": "expand-sym-013",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "In four-dimensional Minkowski spacetime with signature (−,+,+,+), how do the six Lorentz generators split?",
    "options": [
      "Three spatial rotations and three boosts",
      "Four spatial rotations and two boosts",
      "One dilation and five translations",
      "Six translations"
    ],
    "answer": 0,
    "explanation": "Antisymmetric index pairs among the three spatial directions give three rotations. Pairing time with each spatial direction gives three boosts; translations belong to the larger Poincaré algebra."
  },
  {
    "id": "expand-sym-014",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "An irreducible SU(2) representation has spin j=2. How many complex components does a vector in this representation have?",
    "options": [
      "2",
      "5",
      "3",
      "8"
    ],
    "answer": 1,
    "explanation": "The magnetic quantum number runs from −j to j in unit steps, giving 2j+1 states. For j=2 that yields five, even though SU(2) itself always has three generators."
  },
  {
    "id": "expand-sym-015",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Two representations of one Lie algebra use matrices of different sizes. In a fixed algebra basis, what must both matrix sets preserve?",
    "options": [
      "The same matrix trace for every generator",
      "The same number of matrix rows",
      "The same Lie-bracket structure constants",
      "The same eigenvalue multiplicities"
    ],
    "answer": 2,
    "explanation": "A Lie-algebra representation preserves the bracket, so its generator matrices obey the algebra’s commutation relations. Matrix size and spectra can change from one representation to another."
  },
  {
    "id": "expand-sym-016",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "What does the adjoint representation of U(1) do to its one-dimensional Lie algebra?",
    "options": [
      "It rotates it as a two-dimensional plane",
      "It multiplies it by the electric charge of every field",
      "It makes the algebra two-dimensional",
      "It acts trivially"
    ],
    "answer": 3,
    "explanation": "Conjugation by an abelian group leaves every algebra element unchanged. The adjoint representation is therefore one-dimensional and trivial; charged matter uses other U(1) representations."
  },
  {
    "id": "expand-sym-017",
    "topic": "Group theory",
    "difficulty": "Hard",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "For SU(3), a matrix M formed from a fundamental vector and an antifundamental covector transforms as M→UMU⁻¹. How does its nine-dimensional complex space decompose?",
    "options": [
      "A singlet plus an eight-dimensional adjoint",
      "Three singlets plus a six-dimensional irreducible representation",
      "A nine-dimensional irreducible representation",
      "Two fundamental representations plus three singlets"
    ],
    "answer": 0,
    "explanation": "Write M=(tr M)I/3+[M−(tr M)I/3]. The trace piece is invariant, while the eight-dimensional traceless piece transforms in the adjoint, giving 3⊗3̄=1⊕8.",
    "reference": {
      "label": "MIT: tensor products and representations of classical groups",
      "url": "https://ocw.mit.edu/courses/18-745-lie-groups-and-lie-algebras-i-fall-2020/mit18_745_f20_lec_full.pdf"
    }
  },
  {
    "id": "expand-sym-018",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "For compact SU(4), what are its rank and its real group dimension, respectively?",
    "options": [
      "4 and 16",
      "3 and 15",
      "15 and 3",
      "4 and 15"
    ],
    "answer": 1,
    "explanation": "The diagonal traceless generators form a Cartan subalgebra of dimension 4−1=3. The full algebra also includes off-diagonal generators and has dimension 4²−1=15."
  },
  {
    "id": "expand-sym-019",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Why is the adjoint representation of SU(2) not faithful as a group representation?",
    "options": [
      "It has no nonzero matrices",
      "Its Lie algebra has dimension two",
      "The distinct group elements I and −I both act as the identity",
      "Every rotation acts as the identity"
    ],
    "answer": 2,
    "explanation": "Both I and −I commute with every Lie-algebra element, so their conjugation actions agree. The adjoint action forgets the two-element center and therefore factors through SU(2)/{±I}≅SO(3)."
  },
  {
    "id": "expand-sym-020",
    "topic": "Group theory",
    "difficulty": "Hard",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "The Lie algebras su(2) and so(3) are isomorphic. Why does the spin-½ representation integrate to SU(2) but not to an ordinary single-valued representation of SO(3)?",
    "options": [
      "Its matrices do not obey a Lie algebra",
      "SO(3) has no finite-dimensional representations",
      "SU(2) has more Lie-algebra generators",
      "A 2π rotation acts as −I on spin-½ states but is the identity in SO(3)"
    ],
    "answer": 3,
    "explanation": "The local commutators do not specify how representations behave around noncontractible loops of a group. Spin-½ distinguishes the two elements of the covering-group kernel, so it does not descend to SO(3).",
    "reference": {
      "label": "ETH: covering groups and Lie-group representations",
      "url": "https://metaphor.ethz.ch/x/2020/fs/401-3201-00L/ex/notes-lie.pdf"
    }
  },
  {
    "id": "expand-sym-021",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "A representation contains a nonzero proper subspace preserved by every group element. What does this establish?",
    "options": [
      "The representation is reducible",
      "The group is abelian",
      "The representation is faithful",
      "The group has zero dimension"
    ],
    "answer": 0,
    "explanation": "Reducibility means that such an invariant subspace exists. An irreducible representation has no invariant subspaces other than zero and the entire representation space."
  },
  {
    "id": "expand-sym-022",
    "topic": "Group theory",
    "difficulty": "Applied",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Representations V and W have dimensions three and five. What are dim(V⊕W) and dim(V⊗W)?",
    "options": [
      "15 and 8",
      "8 and 15",
      "3 and 5",
      "8 and 8"
    ],
    "answer": 1,
    "explanation": "A direct sum joins two independent sets of basis vectors, so its dimensions add. A tensor product uses all pairs of basis vectors, so its dimensions multiply."
  },
  {
    "id": "expand-sym-023",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "A field is said to be in the SU(2) doublet. What does the word 'doublet' count?",
    "options": [
      "The number of generators of SU(2)",
      "The number of spacetime dimensions",
      "The complex dimension of that field’s representation",
      "The number of disconnected components of SU(2)"
    ],
    "answer": 2,
    "explanation": "A doublet has two complex components that mix under SU(2). This representation dimension differs from the three real parameters needed to specify a group element locally."
  },
  {
    "id": "expand-sym-024",
    "topic": "Group theory",
    "difficulty": "Hard",
    "pages": [
      6,
      7
    ],
    "prerequisite": true,
    "prompt": "Choose Hermitian generators with [Tₐ,Tᵦ]=i fₐᵦᶜT𝑐, and define ad(Tₐ)(Tᵦ)=[Tₐ,Tᵦ]. Which matrix entry has row c and column b?",
    "options": [
      "fₐᵦᶜ without a factor of i",
      "−i fₐᵦᶜ",
      "δₐᵦδᵦ𝑐",
      "(ad Tₐ)ᶜᵦ=i fₐᵦᶜ"
    ],
    "answer": 3,
    "explanation": "Column b contains the coefficients of the image of basis vector Tᵦ. Reading those coefficients directly from the specified commutator gives i fₐᵦᶜ; alternative sign conventions must be traced to a different definition or index order."
  },
  {
    "id": "expand-sym-025",
    "topic": "Group theory",
    "difficulty": "Hard",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "For integer d>2, compare SO(d,2) with SU(d,2), with exactly these subscripts. What does their dimension difference imply?",
    "options": [
      "dim SU(d,2)−dim SO(d,2)=(d+1)(d+4)/2>0, so their Lie algebras cannot be isomorphic",
      "Their dimensions agree for every d",
      "Their dimensions agree only at d=4",
      "Their dimensions differ by exactly one"
    ],
    "answer": 0,
    "explanation": "Set n=d+2. The dimensions are n(n−1)/2 and n²−1, whose difference is (n−1)(n+2)/2=(d+1)(d+4)/2. The special relation so(4,2)≅su(2,2) changes the unitary subscripts and does not contradict this count."
  },
  {
    "id": "expand-sym-026",
    "topic": "Group theory",
    "difficulty": "Foundation",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "Which exceptional real Lie-algebra isomorphism is relevant to conformal symmetry in four-dimensional Minkowski spacetime?",
    "options": [
      "so(4,2)≅su(4,2)",
      "so(4,2)≅su(2,2)",
      "so(4,2)≅su(4)",
      "so(4,2)≅so(5,1)"
    ],
    "answer": 1,
    "explanation": "The Lorentzian conformal algebra so(4,2) is isomorphic to the noncompact algebra su(2,2). Equal generator counts alone would not prove an isomorphism; this is a special relation between these real forms.",
    "reference": {
      "label": "Oregon State: SU(2,2) and the exceptional spin-group relation",
      "url": "https://sites.science.oregonstate.edu/coursewikis/GO/book/go/su22.html"
    }
  },
  {
    "id": "expand-sym-027",
    "topic": "Group theory",
    "difficulty": "Hard",
    "pages": [
      16,
      18
    ],
    "prerequisite": true,
    "prompt": "Let SO₀(4,2) denote the identity component. Which global statement refines so(4,2)≅su(2,2)?",
    "options": [
      "SU(2,2) and SO₀(4,2) are identical matrix groups",
      "SO₀(4,2) has twice as many Lie-algebra generators",
      "SU(2,2)/{±I}≅SO₀(4,2)",
      "SU(2,2) has no nontrivial center"
    ],
    "answer": 2,
    "explanation": "SU(2,2) is a double cover of SO₀(4,2), with kernel {I,−I}. Further quotients arise for the effective action on conformally compactified spacetime, so algebra, covering group, and faithful geometric action must be distinguished.",
    "reference": {
      "label": "Todorov: conformal groups and the SU(2,2) covering map",
      "url": "https://preprints.ihes.fr/storage/ITjanv08.pdf"
    }
  },
  {
    "id": "expand-sym-028",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "After replacing four-dimensional Minkowski space by four-dimensional Euclidean space, which real conformal algebra replaces so(4,2)?",
    "options": [
      "su(4,2)",
      "so(4,1)",
      "so(6)",
      "so(5,1)"
    ],
    "answer": 3,
    "explanation": "For Euclidean ℝᵈ with d>2, the conformal algebra is so(d+1,1). Both signatures give 15 generators at d=4, but the reality conditions and compact subalgebras differ."
  },
  {
    "id": "expand-sym-029",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "The four-dimensional Poincaré algebra has ten generators. Which additions produce the full fifteen-generator conformal algebra?",
    "options": [
      "One dilation and four special conformal generators",
      "Five extra translations",
      "Three dilations and two boosts",
      "Five extra spatial rotations"
    ],
    "answer": 0,
    "explanation": "Poincaré symmetry supplies four translations and six Lorentz transformations. Adding D and the four Kμ gives 4+6+1+4=15 generators."
  },
  {
    "id": "expand-sym-030",
    "topic": "CFT",
    "difficulty": "Foundation",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "Using the translation vector fields Pμ=∂μ on flat spacetime, what is [Pμ,Pν]?",
    "options": [
      "A Lorentz generator for every μ and ν",
      "Zero",
      "The dilation generator",
      "A special conformal generator"
    ],
    "answer": 1,
    "explanation": "Coordinate partial derivatives commute on smooth scalar functions in a flat coordinate chart. Thus translations form an abelian subalgebra, even though the full Poincaré and conformal algebras are nonabelian."
  },
  {
    "id": "expand-sym-031",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "Use real differential operators Pμ=∂μ and D=xν∂ν, with [A,B]=AB−BA and no factors of i. Acting on scalar functions, what is [D,Pμ]?",
    "options": [
      "+Pμ",
      "0",
      "−Pμ",
      "2Kμ"
    ],
    "answer": 2,
    "explanation": "Differentiating xν in PμD produces an extra ∂μ term, while the second-derivative terms cancel. Hence DPμ−PμD=−Pμ in this explicitly stated vector-field convention."
  },
  {
    "id": "expand-sym-032",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "In flat Euclidean space use D=x·∂ and Kμ=2xμ(x·∂)−x²∂μ as real differential operators, with [A,B]=AB−BA. What is [D,Kμ]?",
    "options": [
      "−Kμ",
      "2Pμ",
      "0",
      "+Kμ"
    ],
    "answer": 3,
    "explanation": "Each coefficient in Kμ is homogeneous of degree two, while one derivative carries degree minus one. Its net dilation degree is therefore +1, giving [D,Kμ]=Kμ in this convention."
  },
  {
    "id": "expand-sym-033",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "In flat Euclidean space set Pμ=∂μ, D=x·∂, Mμν=xμ∂ν−xν∂μ, and Kν=2xνD−x²∂ν. With [A,B]=AB−BA and no factors of i, what is [Pμ,Kν]?",
    "options": [
      "2δμνD−2Mμν",
      "2δμνD+2Mμν",
      "δμνD−Mμν",
      "0"
    ],
    "answer": 0,
    "explanation": "Differentiating Kν’s coefficients gives 2δμνD+2xν∂μ−2xμ∂ν. The last two terms equal −2Mμν with the stated definition, which fixes the otherwise convention-sensitive sign."
  },
  {
    "id": "expand-sym-034",
    "topic": "CFT",
    "difficulty": "Foundation",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "The special conformal generators are related to translations by conjugation with inversion. What follows for their mutual commutator?",
    "options": [
      "[Kμ,Kν]=Mμν",
      "[Kμ,Kν]=0",
      "[Kμ,Kν]=δμνD",
      "[Kμ,Kν]=Pμ+Pν"
    ],
    "answer": 1,
    "explanation": "Conjugation preserves brackets, and translations commute. Consequently the special conformal generators also commute with one another, although their brackets with translations are nonzero."
  },
  {
    "id": "expand-sym-035",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "Expand the Euclidean special conformal map x′μ=(xμ−bμx²)/(1−2b·x+b²x²) to first order in b. What is δxμ=x′μ−xμ?",
    "options": [
      "bμ",
      "(b·x)xμ+bμx²",
      "2(b·x)xμ−bμx²",
      "−2(b·x)xμ+bμx²"
    ],
    "answer": 2,
    "explanation": "To first order, the reciprocal denominator is 1+2b·x. Multiplication and subtraction of xμ leave 2(b·x)xμ−bμx², the vector field bμKμ in the matching convention."
  },
  {
    "id": "expand-sym-036",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "In Euclidean space let I(x)=x/x². On a domain where the compositions exist, which sequence yields x′=(x−bx²)/(1−2b·x+b²x²)?",
    "options": [
      "Translate by b, then dilate",
      "Rotate, then invert once",
      "Dilate twice, then translate by −b",
      "Invert, translate by −b, then invert again"
    ],
    "answer": 3,
    "explanation": "After the first inversion and translation, the point is x/x²−b. Applying inversion again and multiplying numerator and denominator by x² gives the stated special conformal map."
  },
  {
    "id": "expand-sym-037",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "For the Euclidean special conformal map with denominator F(x)=1−2b·x+b²x², the pullback metric is δμν/F(x)² wherever the map is regular. What happens at F(x)=0?",
    "options": [
      "The finite-coordinate map is singular there; extending the conformal action requires a suitable compactification",
      "The transformation becomes an ordinary translation there",
      "The Euclidean metric becomes Lorentzian there",
      "Every scalar primary must vanish there"
    ],
    "answer": 0,
    "explanation": "The conformal factor and finite-coordinate expression cease to be regular at that locus. The conformal compactification accommodates points sent to infinity, so a local formula should not be mistaken for a globally defined map of all of ℝᵈ."
  },
  {
    "id": "expand-sym-038",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "For the flat metric ημν and dilation vector ξμ=xμ, what is its metric Lie derivative?",
    "options": [
      "ℒξ ημν=0",
      "ℒξ ημν=2ημν",
      "ℒξ ημν=ημν/d",
      "ℒξ ημν=2xμημν with no sum"
    ],
    "answer": 1,
    "explanation": "Since ∂μξν=ημν, the two symmetric derivative terms add to 2ημν. A dilation is therefore conformal but is not an isometry of the fixed flat metric."
  },
  {
    "id": "expand-sym-039",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "A vector field in flat spacetime has components ξμ=aμ with constant aμ. Which classification follows directly from its derivatives?",
    "options": [
      "A proper conformal transformation with nonzero local scale factor",
      "A special conformal transformation",
      "A Killing vector generating translations",
      "A Weyl transformation at fixed coordinates"
    ],
    "answer": 2,
    "explanation": "All derivatives of ξ vanish, so ℒξ ημν=0. The flow shifts xμ by a constant multiple of aμ and preserves the metric exactly."
  },
  {
    "id": "expand-sym-040",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "In Euclidean ℝᵈ with d≥2, consider x′¹=2x¹ and x′ⁱ=xⁱ for i>1. Why is this transformation not conformal?",
    "options": [
      "It is not invertible",
      "It reverses orientation",
      "Every conformal transformation must have constant Jacobian determinant one",
      "Its pullback metric is diag(4,1,…,1), not a scalar multiple of δμν"
    ],
    "answer": 3,
    "explanation": "Conformality requires the same local length rescaling in every direction. This anisotropic stretch rescales one axis differently, so its symmetric metric deformation has a nonzero traceless part."
  },
  {
    "id": "expand-sym-041",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      16,
      18
    ],
    "prerequisite": false,
    "prompt": "On a d-dimensional manifold, define a conformal Killing vector by ℒξgμν=2σgμν. What is σ in terms of ξ?",
    "options": [
      "σ=(∇μξμ)/d",
      "σ=∇μξμ",
      "σ=d∇μξμ",
      "σ=ξμξμ"
    ],
    "answer": 0,
    "explanation": "Contract the equation with gμν. The left side gives 2∇μξμ and the right side gives 2dσ, so σ is the divergence divided by d."
  },
  {
    "id": "expand-sym-042",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      15,
      17
    ],
    "prerequisite": false,
    "prompt": "Fix the active convention δdiff gμν=ℒξgμν=2σgμν. Which infinitesimal Weyl change δWgμν=2ωgμν compensates it and leaves the background metric unchanged?",
    "options": [
      "ω=σ",
      "ω=−σ",
      "ω=dσ",
      "ω=0 for every conformal Killing vector"
    ],
    "answer": 1,
    "explanation": "The total variation is 2(σ+ω)gμν. Choosing ω=−σ cancels the conformal diffeomorphism’s metric rescaling in the stated convention."
  },
  {
    "id": "expand-sym-043",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      15,
      17
    ],
    "prerequisite": true,
    "prompt": "Under a positive Weyl rescaling gμν→Ω²gμν in d dimensions, how does the invariant volume density √|g| transform?",
    "options": [
      "It is unchanged",
      "√|g|→Ω²√|g| in every dimension",
      "√|g|→Ωᵈ√|g|",
      "√|g|→Ω⁻ᵈ√|g|"
    ],
    "answer": 2,
    "explanation": "The determinant contains d metric factors and therefore acquires Ω²ᵈ. Taking its absolute-value square root gives Ωᵈ, while the coordinate measure is unchanged because this is a Weyl rescaling at fixed coordinates."
  },
  {
    "id": "expand-sym-044",
    "topic": "GR",
    "difficulty": "Applied",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "In coordinates, which expression is the Lie derivative of a metric along ξ?",
    "options": [
      "ξρ∂ρgμν only",
      "∂μξν−∂νξμ",
      "ξμξν",
      "ξρ∂ρgμν+gρν∂μξρ+gμρ∂νξρ"
    ],
    "answer": 3,
    "explanation": "The first term accounts for variation along the flow, while the other two account for the metric’s two covariant indices. With the Levi-Civita connection this equals ∇μξν+∇νξμ.",
    "reference": {
      "label": "Reall: Lie derivatives and Killing vector fields",
      "url": "https://www.damtp.cam.ac.uk/user/hsr1000/lecturenotes_2012.pdf"
    }
  },
  {
    "id": "expand-sym-045",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "In a coordinate chart all metric components are independent of a coordinate y. Which coordinate vector is consequently Killing on that chart?",
    "options": [
      "∂/∂y",
      "y∂/∂y in every such metric",
      "The gradient of every scalar",
      "Every coordinate vector"
    ],
    "answer": 0,
    "explanation": "For ξ=∂/∂y, its coordinate components are constant, so the derivative-of-ξ terms in ℒξg vanish. The remaining term is ∂ygμν, which is zero by assumption."
  },
  {
    "id": "expand-sym-046",
    "topic": "GR",
    "difficulty": "Hard",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "Let ξ satisfy ∇(μξν)=σgμν, and let u be the tangent to an affinely parametrized null geodesic. What happens to ξμuμ along that geodesic?",
    "options": [
      "It always grows linearly with affine parameter",
      "It is conserved even when ξ is conformal Killing but not Killing",
      "It vanishes identically for every initial condition",
      "It is conserved only when σ=0 everywhere"
    ],
    "answer": 1,
    "explanation": "Its affine derivative is uμuν∇μξν because the geodesic acceleration vanishes. Only the symmetric part contributes, giving σgμνuμuν=0 for a null tangent; for timelike geodesics the same argument does not generally give conservation."
  },
  {
    "id": "expand-sym-047",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "For an ordinary scalar f, what is its Lie derivative along a vector field ξ?",
    "options": [
      "∂μξμ alone",
      "f∇μξμ alone",
      "ℒξf=ξμ∂μf",
      "ℒξf=0 for every scalar"
    ],
    "answer": 2,
    "explanation": "A scalar has no tensor indices that require extra index-transport terms. Its Lie derivative is simply its directional derivative along ξ; a conformal primary’s additional Weyl weight is a separate transformation property."
  },
  {
    "id": "expand-sym-048",
    "topic": "GR",
    "difficulty": "Foundation",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "If X and Y are Killing vectors of the same metric, what follows about their Lie bracket [X,Y]?",
    "options": [
      "It can never be zero",
      "It is always a translation",
      "It has a fixed nonzero norm",
      "It is also Killing"
    ],
    "answer": 3,
    "explanation": "Lie derivatives satisfy ℒ[X,Y]=[ℒX,ℒY]. Applying this identity to a metric annihilated by both ℒX and ℒY shows that its derivative along [X,Y] also vanishes."
  },
  {
    "id": "expand-sym-049",
    "topic": "AdS",
    "difficulty": "Applied",
    "pages": [
      26,
      28
    ],
    "prerequisite": false,
    "prompt": "For the AdS Poincaré metric ds²=L²(dz²+ημνdxμdxν)/z², what does the map (z,xμ)→(λz,λxμ), with λ>0, do to ds²?",
    "options": [
      "It leaves ds² invariant and is an AdS isometry",
      "It multiplies ds² by λ²",
      "It multiplies ds² by λ⁻²",
      "It changes the sign of ds²"
    ],
    "answer": 0,
    "explanation": "Both dz²+ημνdxμdxν and z² acquire the same factor λ². Their ratio is unchanged, so the bulk transformation is an exact isometry even though its boundary action is a dilation."
  },
  {
    "id": "expand-sym-050",
    "topic": "AdS",
    "difficulty": "Applied",
    "pages": [
      26,
      28
    ],
    "prerequisite": false,
    "prompt": "In ds²=L²(dz²+ημνdxμdxν)/z², rescale only xμ→λxμ while keeping z fixed. For λ>0 and λ≠1, is this an AdS isometry?",
    "options": [
      "Yes, because every boundary conformal map automatically extends with z fixed",
      "No; only the dx part changes, so this is not the required bulk extension",
      "Yes, because L rescales automatically",
      "No; AdS has no dilation isometry at all"
    ],
    "answer": 1,
    "explanation": "Keeping z fixed leaves dz²/z² unchanged but multiplies the boundary-direction term by λ². The AdS dilation isometry requires z to scale together with xμ."
  },
  {
    "id": "expand-sym-051",
    "topic": "AdS",
    "difficulty": "Hard",
    "pages": [
      27,
      31
    ],
    "prerequisite": true,
    "prompt": "Why can the universal cover of the AdS hyperboloid have the same local isometry algebra but different global time behavior?",
    "options": [
      "Taking a cover changes negative curvature to positive curvature",
      "Taking a cover adds a second physical timelike direction",
      "Unwrapping the periodic global-time coordinate changes topology while leaving the local metric unchanged",
      "The universal cover has no timelike Killing vector"
    ],
    "answer": 2,
    "explanation": "The embedded hyperboloid has periodic global time, which leads to closed timelike curves. Passing to its universal cover unwraps that coordinate and retains the local so(d,2) Killing algebra; statements about the global isometry group must account for the covering space.",
    "reference": {
      "label": "Tong: anti-de Sitter spacetime and its covering space",
      "url": "https://www.damtp.cam.ac.uk/user/tong/gr/grhtml/S4.html"
    }
  },
  {
    "id": "expand-sym-052",
    "topic": "AdS",
    "difficulty": "Applied",
    "pages": [
      24,
      27
    ],
    "prerequisite": false,
    "prompt": "AdS₄ is a maximally symmetric four-dimensional spacetime. How many independent Killing generators does it have, and what is their algebra?",
    "options": [
      "15; so(4,2)",
      "6; so(3,1)",
      "4; the abelian translation algebra",
      "10; so(3,2)"
    ],
    "answer": 3,
    "explanation": "A maximally symmetric D-dimensional metric has D(D+1)/2 Killing generators, giving ten for D=4. The subscript on AdS counts bulk dimensions, so its algebra is so(D−1,2)=so(3,2)."
  },
  {
    "id": "expand-sym-053",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      21,
      22
    ],
    "prerequisite": true,
    "prompt": "In a two-dimensional Euclidean CFT use Δ=h+h̄ and spin s=h−h̄. What are Δ and s for h=3/2 and h̄=1/2?",
    "options": [
      "Δ=2 and s=1",
      "Δ=1 and s=2",
      "Δ=2 and s=2",
      "Δ=1 and s=1"
    ],
    "answer": 0,
    "explanation": "Adding the two conformal weights gives the response to a real scale transformation. Their difference gives the rotation spin, so this example has dimension two and spin one.",
    "reference": {
      "label": "Tong: two-dimensional conformal weights",
      "url": "https://www.damtp.cam.ac.uk/user/tong/string/string4.pdf"
    }
  },
  {
    "id": "expand-sym-054",
    "topic": "CFT",
    "difficulty": "Foundation",
    "pages": [
      21,
      22
    ],
    "prerequisite": true,
    "prompt": "In two-dimensional Euclidean CFT with spin s=h−h̄, which condition characterizes a spin-zero primary?",
    "options": [
      "h=−h̄",
      "h=h̄",
      "h=0 regardless of h̄",
      "h+h̄=0"
    ],
    "answer": 1,
    "explanation": "Spin zero means the difference of the weights vanishes. The total scaling dimension can still be nonzero and equals 2h when h=h̄."
  },
  {
    "id": "expand-sym-055",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      21,
      22
    ],
    "prerequisite": false,
    "prompt": "For the holomorphic vector fields ℓₙ=−zⁿ⁺¹∂z, which modes generate the globally regular Möbius transformations of the Riemann sphere?",
    "options": [
      "Every integer n",
      "Only n=0",
      "n=−1,0,1",
      "Only n≥2"
    ],
    "answer": 2,
    "explanation": "These modes generate translations, dilations/rotations, and special conformal maps. Higher modes develop singularities in a sphere coordinate chart, so the infinite local algebra is larger than the finite global Möbius algebra."
  },
  {
    "id": "expand-sym-056",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      21,
      22
    ],
    "prerequisite": true,
    "prompt": "Take the centerless Witt convention [ℓₘ,ℓₙ]=(m−n)ℓₘ₊ₙ. What is [ℓ₂,ℓ₋₁]?",
    "options": [
      "ℓ₁",
      "−3ℓ₁",
      "3ℓ₃",
      "3ℓ₁"
    ],
    "answer": 3,
    "explanation": "The coefficient is 2−(−1)=3 and the new mode index is 2+(−1)=1. This is a calculation in the stated convention and does not require a central extension."
  },
  {
    "id": "expand-sym-057",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      21,
      22
    ],
    "prerequisite": true,
    "prompt": "Use [Lₘ,Lₙ]=(m−n)Lₘ₊ₙ+(c/12)m(m²−1)δₘ₊ₙ,₀. What is [L₂,L₋₂]?",
    "options": [
      "4L₀+c/2",
      "4L₀+c/12",
      "2L₀+c",
      "4L₀ with no central term"
    ],
    "answer": 0,
    "explanation": "The noncentral term is (2−(−2))L₀=4L₀. The central coefficient is (c/12)·2·(4−1)=c/2; unlike modes −1,0,1, these modes can detect the central extension.",
    "reference": {
      "label": "Tong: the Virasoro commutation relations",
      "url": "https://www.damtp.cam.ac.uk/user/tong/string/string4.pdf"
    }
  },
  {
    "id": "expand-sym-058",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      21,
      22
    ],
    "prerequisite": false,
    "prompt": "The map w=z² is holomorphic. Where is it a locally invertible conformal map of the complex plane?",
    "options": [
      "At every point, including z=0",
      "Where z≠0, but not at z=0",
      "Only at z=0",
      "Nowhere, because its derivative is not constant"
    ],
    "answer": 1,
    "explanation": "A holomorphic map is locally conformal where its derivative is nonzero. Here dw/dz=2z, so the origin is a branch point and must be excluded from any claim of local invertibility."
  },
  {
    "id": "expand-sym-059",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      18,
      20
    ],
    "prerequisite": false,
    "prompt": "A Euclidean conformal map has pullback metric Ω(x)²δμν. For a scalar primary use O′(x′)=Ω(x)⁻ΔO(x). If Δ=3 and Ω=2 at an insertion, what factor multiplies O there?",
    "options": [
      "8",
      "1/2",
      "1/8",
      "1/16"
    ],
    "answer": 2,
    "explanation": "The primary factor is Ω⁻Δ, which gives 2⁻³=1/8. Equivalently, the absolute Jacobian determinant is Ωᵈ, so the same factor can be written as |det(∂x′/∂x)|⁻Δ/ᵈ."
  },
  {
    "id": "expand-sym-060",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      20,
      21
    ],
    "prerequisite": false,
    "prompt": "For nonzero Euclidean points x and y, inversion gives x′=x/x² and y′=y/y². Which identity explains how scalar two-point functions acquire the right weights under inversion?",
    "options": [
      "|x′−y′|²=|x−y|²",
      "|x′−y′|²=x²y²|x−y|²",
      "|x′−y′|²=|x−y|²/(x²+y²)",
      "|x′−y′|²=|x−y|²/(x²y²)"
    ],
    "answer": 3,
    "explanation": "Expanding the squared difference gives 1/x²+1/y²−2x·y/(x²y²). Combining the terms yields the stated identity, so a power of the separation transforms into one local weight factor at each insertion."
  },
  {
    "id": "expand-sym-061",
    "topic": "CFT",
    "difficulty": "Applied",
    "pages": [
      20,
      21
    ],
    "prerequisite": false,
    "prompt": "Define u=x₁₂²x₃₄²/(x₁₃²x₂₄²), where xᵢⱼ² is a squared Euclidean separation. If these four squared distances are 4,9,1,36 in the displayed order, what is u and what happens under a common dilation?",
    "options": [
      "u=1, and it is unchanged",
      "u=6, and it doubles",
      "u=36, and it scales as length squared",
      "u=1/36, and it scales as inverse length"
    ],
    "answer": 0,
    "explanation": "The numerical ratio is (4·9)/(1·36)=1. A common dilation supplies λ⁴ to both numerator and denominator, which cancels; the combination is also invariant under inversion and hence is a conformal cross-ratio."
  },
  {
    "id": "expand-sym-062",
    "topic": "CFT",
    "difficulty": "Foundation",
    "pages": [
      20,
      21
    ],
    "prerequisite": false,
    "prompt": "In a translation- and dilation-invariant flat-space vacuum, what is the one-point function of a scalar primary with Δ>0, assuming no boundary or defect?",
    "options": [
      "A nonzero universal constant fixed by Δ",
      "Zero",
      "Always |x|⁻²Δ",
      "An arbitrary function of x"
    ],
    "answer": 1,
    "explanation": "Translation invariance makes the one-point function a constant C. Dilation invariance then requires C=λ⁻ΔC for every positive λ, forcing C=0 when Δ is nonzero."
  },
  {
    "id": "expand-sym-063",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      20,
      23
    ],
    "prerequisite": true,
    "prompt": "For a nontrivial conserved spin-one primary current Jμ in a unitary Euclidean CFT with d>2, which separated-point two-point function is compatible with conformal symmetry and conservation?",
    "options": [
      "Cδμν/|x|² for every d",
      "Cxμxν/|x|²ᵈ⁺²",
      "C(δμν−2xμxν/x²)/|x|²ᵈ⁻²",
      "Cδμν independent of x"
    ],
    "answer": 2,
    "explanation": "A conserved spin-one primary has dimension Δ=d−1. The inversion tensor Iμν(x)=δμν−2xμxν/x² supplies the vector index structure, and differentiating Iμν(x)/|x|²ᵈ⁻² gives zero away from the contact point.",
    "reference": {
      "label": "Simmons-Duffin: spinning two-point functions and conserved currents",
      "url": "https://arxiv.org/pdf/1602.07982"
    }
  },
  {
    "id": "expand-sym-064",
    "topic": "CFT",
    "difficulty": "Hard",
    "pages": [
      18,
      21
    ],
    "prerequisite": true,
    "prompt": "For identical scalar primaries of dimension Δ, write $\\langle O_1O_2O_3O_4\\rangle=(x_{12}^2x_{34}^2)^{-\\Delta}G(u,v)$, with $u=x_{12}^2x_{34}^2/(x_{13}^2x_{24}^2)$ and $v=x_{14}^2x_{23}^2/(x_{13}^2x_{24}^2)$. What follows from exchanging insertions 1 and 3?",
    "options": [
      "$G(u,v)=G(v,u)$ for every Δ",
      "$u^{\\Delta}G(u,v)=v^{\\Delta}G(v,u)$",
      "$G(u,v)=0$ for all separated points",
      "$v^{\\Delta}G(u,v)=u^{\\Delta}G(v,u)$"
    ],
    "answer": 3,
    "explanation": "The exchange swaps u and v and changes the chosen prefactor from $(x_{12}^2x_{34}^2)^{-\\Delta}$ to $(x_{14}^2x_{23}^2)^{-\\Delta}$. Their ratio supplies $(u/v)^{\\Delta}$, so crossing reads $G(u,v)=(u/v)^{\\Delta}G(v,u)$.",
    "reference": {
      "label": "Simmons-Duffin: the scalar crossing equation",
      "url": "https://arxiv.org/pdf/1602.07982"
    }
  },
  {
    "id": "expand-string-001",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      76,
      80
    ],
    "prerequisite": true,
    "prompt": "A compact circle becomes very small compared with √α′. Which closed-string tower becomes light because its contribution scales with R?",
    "options": [
      "The winding tower",
      "The nonzero momentum tower",
      "All oscillator levels at once",
      "Only the center-of-mass time coordinate"
    ],
    "answer": 0,
    "explanation": "For fixed winding number, the winding contribution is |w|R/α′ and decreases with R. Nonzero compact momentum instead costs |n|/R, so it becomes expensive as the circle shrinks."
  },
  {
    "id": "expand-string-002",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      76,
      80
    ],
    "prerequisite": true,
    "prompt": "At which positive circle radius does R=α′/R hold?",
    "options": [
      "R=α′",
      "R=√α′",
      "R=1/α′",
      "Only at R=0"
    ],
    "answer": 1,
    "explanation": "Multiplying by R gives R²=α′, so the positive solution is the self-dual radius √α′. Whether additional massless states occur there depends on the particular string theory."
  },
  {
    "id": "expand-string-003",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      76,
      80
    ],
    "prerequisite": true,
    "prompt": "A circle has radius R=4√α′. After a spatial T-duality, a state with momentum number n=2 and winding w=0 has which radius and quantum numbers?",
    "options": [
      "R′=4√α′, n′=0, w′=2",
      "R′=√α′/4, n′=2, w′=0",
      "R′=√α′/4, n′=0, w′=2",
      "R′=16√α′, n′=2, w′=2"
    ],
    "answer": 2,
    "explanation": "The dual radius is α′/R=√α′/4 and the integers exchange. The original momentum scale 2/R equals the dual winding scale 2R′/α′."
  },
  {
    "id": "expand-string-004",
    "topic": "String theory",
    "difficulty": "Hard",
    "pages": [
      76,
      80
    ],
    "prerequisite": true,
    "prompt": "Define pL=n/R+wR/α′ and pR=n/R−wR/α′. Under R′=α′/R with n′=w and w′=n, how do these quantities transform?",
    "options": [
      "pL′=−pL and pR′=pR",
      "Both reverse sign",
      "pL and pR exchange without signs",
      "pL′=pL and pR′=−pR"
    ],
    "answer": 3,
    "explanation": "Substitution leaves the sum pL unchanged and reverses the difference pR. This is the zero-mode version of reflecting one chiral half of the compact worldsheet field.",
    "reference": {
      "label": "Tong, String Theory §8.3",
      "url": "https://arxiv.org/html/0908.0333v3"
    }
  },
  {
    "id": "expand-string-005",
    "topic": "String theory",
    "difficulty": "Hard",
    "pages": [
      76,
      80
    ],
    "prerequisite": true,
    "prompt": "Use pL=n/R+wR/α′, pR=n/R−wR/α′, and equal left/right intercepts. If level matching is α′pL²/4+NL=α′pR²/4+NR, what follows for n=2 and w=3?",
    "options": [
      "NR−NL=6",
      "NL−NR=6",
      "NL=NR regardless of n and w",
      "NR−NL=36"
    ],
    "answer": 0,
    "explanation": "The difference pL²−pR² is 4nw/α′. Rearranging the stated matching condition therefore gives NR−NL=nw=6; assigning the opposite definitions to left and right would reverse the written sign."
  },
  {
    "id": "expand-string-006",
    "topic": "String theory",
    "difficulty": "Hard",
    "pages": [
      76,
      81
    ],
    "prerequisite": true,
    "prompt": "For a spatial circle, the T-dual coupling is gs′=gs√α′/R. If R=gs²√α′ with 0<gs≪1, which conclusion is correct?",
    "options": [
      "Both descriptions automatically have the same small coupling",
      "The dual coupling is 1/gs and is large",
      "The dual coupling is gs³",
      "The dual radius is unchanged"
    ],
    "answer": 1,
    "explanation": "Inserting the specified radius gives gs′=gs/gs²=1/gs. T-duality can make the circle larger while making the string loop expansion less useful.",
    "reference": {
      "label": "Tong, String Theory §8.3.1",
      "url": "https://arxiv.org/html/0908.0333v3"
    }
  },
  {
    "id": "expand-string-007",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      80,
      81
    ],
    "prerequisite": true,
    "prompt": "A single T-duality along a spatial circle relates compactified type IIA string theory to which theory?",
    "options": [
      "The 26-dimensional bosonic string",
      "Uncompactified eleven-dimensional supergravity at every coupling",
      "Type IIB on the dual circle",
      "Type IIA with all supersymmetry removed"
    ],
    "answer": 2,
    "explanation": "Reflecting one worldsheet chirality reverses the chirality assignment of one spacetime supercharge. This exchanges type IIA and IIB in their circle compactifications.",
    "reference": {
      "label": "Tong, String Theory §8.3.3",
      "url": "https://arxiv.org/html/0908.0333v3"
    }
  },
  {
    "id": "expand-string-008",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      76,
      81
    ],
    "prerequisite": true,
    "prompt": "Apply the elementary circle T-duality twice, exchanging n and w each time. What happens to R and the momentum/winding labels?",
    "options": [
      "R vanishes and both labels become zero",
      "R grows by α′ on every application",
      "The labels change sign but R stays dual",
      "The original R, n and w return"
    ],
    "answer": 3,
    "explanation": "The radius map is an involution because α′/(α′/R)=R. Exchanging two integer labels twice likewise restores them; this statement concerns the elementary circle data."
  },
  {
    "id": "expand-string-009",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      81,
      84
    ],
    "prerequisite": true,
    "prompt": "A D2-brane is localized on a compact direction transverse to its worldvolume. T-dualizing that transverse circle produces which brane?",
    "options": [
      "A D3-brane wrapping the dual circle",
      "A D1-brane localized on the dual circle",
      "A D2-brane with no changed boundary condition",
      "An NS5-brane by definition"
    ],
    "answer": 0,
    "explanation": "A transverse Dirichlet condition becomes a Neumann condition along the dual circle. The brane gains one spatial worldvolume direction."
  },
  {
    "id": "expand-string-010",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      81,
      87
    ],
    "prerequisite": true,
    "prompt": "After T-dualizing a circle along a stack of D-branes, what do the eigenvalues of a constant Wilson line around the original circle encode?",
    "options": [
      "The number of target-space time directions",
      "The branes’ positions around the dual circle",
      "The genus of every closed worldsheet",
      "The cosmological constant alone"
    ],
    "answer": 1,
    "explanation": "The gauge-field component along the original circle becomes a transverse scalar after duality. Its Wilson-line phases determine positions modulo the periodicity of the dual circle.",
    "reference": {
      "label": "Polchinski, TASI Lectures on D-Branes §2.3",
      "url": "https://arxiv.org/html/hep-th/9611050v2#S2.SS3"
    }
  },
  {
    "id": "expand-string-011",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      79,
      81
    ],
    "prerequisite": false,
    "prompt": "Besides the metric, which two bosonic fields belong to the universal massless NS–NS sector of type II strings?",
    "options": [
      "Two independent gravitons",
      "Only a Ramond–Ramond four-form",
      "An antisymmetric two-form and the dilaton",
      "A color-adjoint gluon and a quark"
    ],
    "answer": 2,
    "explanation": "The left-right tensor product separates into a symmetric traceless tensor, an antisymmetric tensor and a scalar. These yield the graviton, B-field and dilaton in the NS–NS sector."
  },
  {
    "id": "expand-string-012",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      82,
      83
    ],
    "prerequisite": false,
    "prompt": "A D3-brane couples electrically through an integral over its four-dimensional worldvolume. Which Ramond–Ramond potential has the required degree?",
    "options": [
      "A scalar C₀",
      "A one-form C₁",
      "A three-form C₃",
      "A four-form C₄"
    ],
    "answer": 3,
    "explanation": "Integrating a differential form directly over a four-dimensional worldvolume requires degree four. The associated field strength has degree five, with additional terms possible in the full type IIB definition."
  },
  {
    "id": "expand-string-013",
    "topic": "String theory",
    "difficulty": "Applied",
    "pages": [
      82,
      84
    ],
    "prerequisite": false,
    "prompt": "In ten dimensions, an electric p-brane has a magnetic dual of spatial dimension 10−p−4. What is the magnetic dual dimension for p=3?",
    "options": [
      "3",
      "4",
      "5",
      "7"
    ],
    "answer": 0,
    "explanation": "The degree-counting formula gives 10−3−4=3. D3-branes are therefore special: the electric and magnetic source dimensions of the five-form field strength coincide."
  },
  {
    "id": "expand-string-014",
    "topic": "String theory",
    "difficulty": "Hard",
    "pages": [
      13,
      14
    ],
    "prerequisite": true,
    "prompt": "For an oriented worldsheet with h handles and b boundaries, χ=2−2h−b and the vacuum weight is gs^(−χ). What is the annulus weight relative to the disk weight?",
    "options": [
      "gs⁻²",
      "gs",
      "gs²",
      "1/gs"
    ],
    "answer": 1,
    "explanation": "The disk has χ=1 and weight gs⁻¹, whereas the annulus has χ=0 and weight one. Their ratio is gs; vertex-insertion normalizations would need separate accounting for scattering amplitudes."
  },
  {
    "id": "expand-string-015",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      72,
      76
    ],
    "prerequisite": false,
    "prompt": "In a critical string model, why does a two-dimensional worldsheet field theory not imply a two-dimensional target spacetime?",
    "options": [
      "Worldsheet dimension equals the number of target coordinates in every model",
      "The worldsheet has no time coordinate",
      "The fields Xμ on the worldsheet take values in a separate target manifold",
      "Every target coordinate must be a worldsheet coordinate"
    ],
    "answer": 2,
    "explanation": "The worldsheet coordinates label points on the surface swept out by the string. The index μ labels independent target-coordinate fields, so the two dimensions refer to different spaces."
  },
  {
    "id": "expand-string-016",
    "topic": "String theory",
    "difficulty": "Foundation",
    "pages": [
      81,
      87
    ],
    "prerequisite": false,
    "prompt": "A D3-brane in ten-dimensional spacetime has six scalar position fields on its worldvolume because…",
    "options": [
      "It has six spatial worldvolume directions",
      "Every gauge boson always produces six scalars",
      "Ten-dimensional spacetime has no physical time",
      "There are six directions transverse to its four-dimensional worldvolume"
    ],
    "answer": 3,
    "explanation": "Subtracting the four worldvolume dimensions from ten leaves six transverse coordinates. Fluctuations into those directions become six scalar fields; for a stack they acquire matrix-valued Chan–Paton labels."
  },
  {
    "id": "expand-string-017",
    "topic": "SUSY",
    "difficulty": "Applied",
    "pages": [
      61,
      61
    ],
    "prerequisite": false,
    "prompt": "In the GGD normalization, central-charge blocks require both 2m+|Zr| and 2m−|Zr| to be nonnegative. If the largest |Zr| is 10 in fixed mass units, what is the lowest allowed m?",
    "options": [
      "5",
      "10",
      "20",
      "0 for every central charge"
    ],
    "answer": 0,
    "explanation": "The strongest positivity condition is 2m≥max|Zr|. Here it gives m≥5; a state at the lower endpoint saturates at least one BPS bound."
  },
  {
    "id": "expand-string-018",
    "topic": "SUSY",
    "difficulty": "Foundation",
    "pages": [
      81,
      87
    ],
    "prerequisite": true,
    "prompt": "A flat isolated half-BPS D3-brane in the type IIB Minkowski vacuum preserves how many of the vacuum’s 32 real supersymmetry generators?",
    "options": [
      "8",
      "16",
      "24",
      "All 32"
    ],
    "answer": 1,
    "explanation": "Half-BPS means that half of the original supersymmetries survive the brane projection. The near-horizon AdS₅×S⁵ geometry has enhanced supersymmetry, which is a different background."
  },
  {
    "id": "expand-string-019",
    "topic": "SUSY",
    "difficulty": "Applied",
    "pages": [
      84,
      87
    ],
    "prerequisite": true,
    "prompt": "For identical parallel BPS D-branes preserving the same supersymmetry, why can the static long-range force vanish?",
    "options": [
      "The branes have no tension",
      "There are no closed-string fields",
      "Attractive NS–NS exchange cancels repulsive RR exchange",
      "Their transverse separation is a gauge artifact"
    ],
    "answer": 2,
    "explanation": "Tension and charge obey the supersymmetric balance required for cancellation of these exchanges. A brane–antibrane pair has a different charge relationship and does not share this no-force conclusion."
  },
  {
    "id": "expand-string-020",
    "topic": "SUSY",
    "difficulty": "Hard",
    "pages": [
      61,
      61
    ],
    "prerequisite": true,
    "prompt": "Use the convention M=|Z| for BPS masses. Two possible constituents have Z₁=3 and Z₂=4i. If a BPS state of their total charge exists, how does its mass compare with the separated BPS constituents?",
    "options": [
      "It has mass 7, exactly the threshold",
      "It has mass 1 and violates charge conservation",
      "It has mass 25 while the threshold is 7",
      "It has mass 5, below the threshold 7"
    ],
    "answer": 3,
    "explanation": "Additivity gives total central charge 3+4i, whose magnitude is 5, while the constituents have masses 3 and 4. Their unequal phases make the triangle inequality strict; the arithmetic does not by itself prove that the total-charge BPS state exists."
  },
  {
    "id": "expand-string-021",
    "topic": "SUSY",
    "difficulty": "Applied",
    "pages": [
      69,
      69
    ],
    "prerequisite": false,
    "prompt": "The half-BPS rank-two scalar operator in N=4 SYM is a symmetric traceless tensor of SO(6). How many independent R-symmetry components does it have?",
    "options": [
      "20",
      "21",
      "15",
      "36"
    ],
    "answer": 0,
    "explanation": "A symmetric 6×6 tensor has 6·7/2=21 components. Removing its one trace leaves the 20-dimensional representation conventionally called 20′."
  },
  {
    "id": "expand-string-022",
    "topic": "SUSY",
    "difficulty": "Applied",
    "pages": [
      69,
      69
    ],
    "prerequisite": false,
    "prompt": "For Oij=Tr(φiφj)−c δij Tr(φkφk), with i,j=1,…,6, which c removes the SO(6) trace?",
    "options": [
      "1/3",
      "1/6",
      "1/12",
      "6"
    ],
    "answer": 1,
    "explanation": "Contracting i and j yields (1−6c)Tr(φkφk). Setting this to zero fixes c=1/6, separating the traceless half-BPS representation from the singlet trace."
  },
  {
    "id": "expand-string-023",
    "topic": "SUSY",
    "difficulty": "Applied",
    "pages": [
      61,
      69
    ],
    "prerequisite": true,
    "prompt": "Why should an R-symmetry generator not be identified with a central charge simply because both enter supersymmetry discussions?",
    "options": [
      "R-symmetries have no action on states",
      "Every central charge generates spacetime translations",
      "R-symmetry generally rotates supercharges, while a central charge commutes with the super-Poincaré generators",
      "Central charges are always spacetime coordinates"
    ],
    "answer": 2,
    "explanation": "A central extension is central relative to the super-Poincaré algebra under discussion. R-symmetry acts as an automorphism on the supercharges, so its commutator with them is generally nonzero; extending the algebra can also change which charges are central."
  },
  {
    "id": "expand-string-024",
    "topic": "SUSY",
    "difficulty": "Foundation",
    "pages": [
      66,
      69
    ],
    "prerequisite": false,
    "prompt": "N=4 SYM has 16 real Poincaré supercharges. How does its superconformal algebra reach 32 fermionic generators?",
    "options": [
      "It adds 16 color generators and calls them fermions",
      "It doubles the number of spacetime dimensions",
      "It counts every bosonic generator twice",
      "It includes 16 additional conformal supercharges"
    ],
    "answer": 3,
    "explanation": "The S generators accompany the Q generators in the superconformal algebra. Together they account for the 32 supersymmetries matched by the AdS₅×S⁵ background."
  },
  {
    "id": "expand-string-025",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      10,
      14
    ],
    "prerequisite": true,
    "prompt": "In a large-N gauge theory with a fixed number Nf of fundamental flavors, what is the relative counting of one additional closed fundamental-quark loop in a connected planar vacuum diagram?",
    "options": [
      "A factor Nf/N",
      "A factor N² independent of flavor",
      "A factor 1/N² even before counting flavors",
      "No change because all loops are adjoint"
    ],
    "answer": 0,
    "explanation": "A fundamental loop adds a boundary to the ribbon surface, lowering its Euler characteristic by one. Summing the flavor on that loop supplies Nf, giving relative scaling Nf/N when Nf stays fixed."
  },
  {
    "id": "expand-string-026",
    "topic": "AdS/CFT",
    "difficulty": "Foundation",
    "pages": [
      95,
      96
    ],
    "prerequisite": true,
    "prompt": "At leading large N, what bulk interpretation is suggested for a normal-ordered product of two single-trace operators, after accounting for mixing?",
    "options": [
      "A compulsory change of spacetime dimension",
      "A two-particle state",
      "A proof that the bulk has no interactions",
      "A replacement for the boundary metric"
    ],
    "answer": 1,
    "explanation": "Single-trace operators supply the leading single-particle sector in the usual dictionary. Products generate multiparticle sectors, with finite-N mixing and interactions refining that leading interpretation."
  },
  {
    "id": "expand-string-027",
    "topic": "AdS/CFT",
    "difficulty": "Hard",
    "pages": [
      10,
      14
    ],
    "prerequisite": true,
    "prompt": "Normalize single-trace operators so their two-point functions are O(1). In the usual adjoint planar expansion, a connected n-point function scales as N^(2−n). What is the leading connected four-point scaling?",
    "options": [
      "N²",
      "N",
      "N⁻²",
      "N⁰ for every connected function"
    ],
    "answer": 2,
    "explanation": "Setting n=4 gives N⁻². The order-one disconnected products of two-point functions are excluded by the word connected; the specified normalization is essential."
  },
  {
    "id": "expand-string-028",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      8,
      9
    ],
    "prerequisite": true,
    "prompt": "At strong coupling in AdS₅/CFT₄, the appropriate scalar-coupled fundamental Wilson loop is approximated by which bulk object?",
    "options": [
      "A point fixed at the AdS center for every contour",
      "A closed D3-brane with no relation to the contour",
      "Only a local graviton insertion",
      "A fundamental-string worldsheet ending on the boundary contour"
    ],
    "answer": 3,
    "explanation": "The worldsheet boundary follows the loop, with the scalar coupling specifying the corresponding internal-space data. The leading semiclassical expectation value involves the regularized worldsheet action.",
    "reference": {
      "label": "Maldacena, Wilson loops in large N field theories",
      "url": "https://arxiv.org/abs/hep-th/9803002"
    }
  },
  {
    "id": "expand-string-029",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      9,
      14
    ],
    "prerequisite": true,
    "prompt": "A zero-temperature N=4 SYM quark–antiquark potential at strong planar coupling has V(r)=−C√λ/r, with C>0. Which feature is fixed by conformal scaling rather than by the detailed string calculation?",
    "options": [
      "The inverse-distance dependence 1/r",
      "The exact value of C",
      "The appearance of √λ instead of λ",
      "The subtraction prescription for quark masses"
    ],
    "answer": 0,
    "explanation": "In a conformal vacuum with no additional scale, an energy depending only on separation must scale as 1/r. Its dimensionless coupling-dependent coefficient requires dynamics.",
    "reference": {
      "label": "Maldacena, Wilson loops in large N field theories",
      "url": "https://arxiv.org/abs/hep-th/9803002"
    }
  },
  {
    "id": "expand-string-030",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      88,
      89
    ],
    "prerequisite": false,
    "prompt": "In the convention L⁴/α′²=λ, increasing λ from 16 to 256 changes L/√α′ by which factor?",
    "options": [
      "16",
      "2",
      "4",
      "1/2"
    ],
    "answer": 1,
    "explanation": "The radius in string units is λ^(1/4). It increases from 2 to 4, so the factor is two even though λ increases sixteenfold."
  },
  {
    "id": "expand-string-031",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      88,
      95
    ],
    "prerequisite": false,
    "prompt": "Take N→∞ at fixed nonzero gYM, using gs=gYM²/(4π). What happens to gs?",
    "options": [
      "It always vanishes as 1/N",
      "It grows exactly as N²",
      "It stays fixed, so this limit alone does not make string coupling vanish",
      "It becomes equal to the AdS radius"
    ],
    "answer": 2,
    "explanation": "The displayed dictionary has no remaining N dependence when gYM is fixed. This differs from the ’t Hooft limit with fixed λ, where gYM²=λ/N decreases as N grows."
  },
  {
    "id": "expand-string-032",
    "topic": "AdS/CFT",
    "difficulty": "Foundation",
    "pages": [
      88,
      95
    ],
    "prerequisite": false,
    "prompt": "At N→∞ with a fixed λ of order one, which bulk description is generally still required for AdS₅×S⁵?",
    "options": [
      "Classical Einstein gravity with every correction absent",
      "A theory with no string excitations because N is infinite",
      "Only a free boundary scalar field",
      "String theory retaining finite string-length effects"
    ],
    "answer": 3,
    "explanation": "Large N suppresses the usual string loop expansion at fixed λ. With λ only of order one, the radius is not large in string units, so the string excitation and curvature corrections cannot generally be discarded."
  },
  {
    "id": "expand-string-033",
    "topic": "AdS/CFT",
    "difficulty": "Hard",
    "pages": [
      94,
      96
    ],
    "prerequisite": true,
    "prompt": "In AdS₅×S⁵ both factors have radius L. Why does taking L/√α′ large not by itself decouple every S⁵ Kaluza–Klein mode from processes at the AdS curvature scale?",
    "options": [
      "Their masses scale as 1/L, the same order as the AdS curvature energy scale",
      "Their masses all scale as 1/gs with no radius dependence",
      "Every Kaluza–Klein mode becomes a string oscillator",
      "The sphere becomes one-dimensional"
    ],
    "answer": 0,
    "explanation": "Low harmonic levels have mKK·L of order one, even when massive string oscillators become heavy in AdS units. A consistent lower-dimensional truncation may exist, but it is not justified by a parametric separation between these two radii."
  },
  {
    "id": "expand-string-034",
    "topic": "AdS/CFT",
    "difficulty": "Hard",
    "pages": [
      37,
      41
    ],
    "prerequisite": true,
    "prompt": "A minimally coupled massless ten-dimensional scalar is expanded in S⁵ harmonics with eigenvalue k(k+4)/L². Its AdS₅ scalar has m²L²=k(k+4). What is its standard-quantization dimension?",
    "options": [
      "Δ=k for every harmonic",
      "Δ=k+4",
      "Δ=4−k for every harmonic",
      "Δ=k(k+4)"
    ],
    "answer": 1,
    "explanation": "Solving Δ(Δ−4)=k(k+4) gives roots k+4 and −k for k≥0. The standard root is k+4; the half-BPS tower with Δ=k comes from different coupled supergravity modes, so the two towers should not be conflated."
  },
  {
    "id": "expand-string-035",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      95,
      96
    ],
    "prerequisite": false,
    "prompt": "A bulk excitation carries angular momentum J in a chosen rotation plane of S⁵. Which boundary quantum number does that angular momentum match?",
    "options": [
      "The rank N of the gauge group",
      "The number of spacetime translations",
      "An R-symmetry charge",
      "The number of handles on a Feynman diagram"
    ],
    "answer": 2,
    "explanation": "The chosen sphere rotation is an isometry generator and maps to a generator of boundary R-symmetry. Its conserved angular momentum therefore labels the corresponding operator’s R-charge."
  },
  {
    "id": "expand-string-036",
    "topic": "AdS/CFT",
    "difficulty": "Applied",
    "pages": [
      69,
      96
    ],
    "prerequisite": false,
    "prompt": "For Z=φ¹+iφ² in interacting N=4 SU(N) SYM, what is the protected dimension of the half-BPS operator Tr(Z³), when N is large enough for it to be nonzero?",
    "options": [
      "0",
      "6",
      "A freely chosen function of λ",
      "3"
    ],
    "answer": 3,
    "explanation": "This highest-weight scalar operator belongs to the half-BPS degree-three representation. Its shortening condition fixes Δ=3, whereas gauge invariance alone would not establish protection."
  },
  {
    "id": "expand-string-037",
    "topic": "de Sitter",
    "difficulty": "Foundation",
    "pages": [
      24,
      26
    ],
    "prerequisite": true,
    "prompt": "For dS₍d+1₎ embedded by −T²+Σᵢ₌₁^(d+1)Xi²=L², which isometry Lie algebra is manifest?",
    "options": [
      "so(d+1,1)",
      "so(d,2)",
      "su(d+1)",
      "The abelian algebra of translations only"
    ],
    "answer": 0,
    "explanation": "The ambient form has d+1 positive directions and one negative direction. Its preserving transformations induce de Sitter isometries, with connected components and covers handled separately when naming the global group."
  },
  {
    "id": "expand-string-038",
    "topic": "de Sitter",
    "difficulty": "Foundation",
    "pages": [
      27,
      30
    ],
    "prerequisite": true,
    "prompt": "In global de Sitter spacetime, what is the causal character of the past and future conformal boundaries?",
    "options": [
      "Timelike cylinders just like the AdS boundary",
      "Spacelike",
      "Null for every dimension and coordinate system",
      "Ordinary interior Cauchy surfaces at finite proper time"
    ],
    "answer": 1,
    "explanation": "Conformal compactification places past and future infinity at the ends of the global time interval. The induced conformal geometry there is spatial, which changes the interpretation of a proposed boundary description.",
    "reference": {
      "label": "Spradlin, Strominger and Volovich, de Sitter lectures §2",
      "url": "https://arxiv.org/html/hep-th/0110007v2#S2"
    }
  },
  {
    "id": "expand-string-039",
    "topic": "de Sitter",
    "difficulty": "Applied",
    "pages": [
      88,
      89
    ],
    "prerequisite": true,
    "prompt": "A proposed string compactification has de Sitter curvature radius L=1/H. Which condition is necessary to suppress corrections due to curvature at the string scale?",
    "options": [
      "H√α′≫1",
      "H=1/gs with no other scale",
      "α′H²≪1",
      "A positive H alone is sufficient"
    ],
    "answer": 2,
    "explanation": "Curvature corrections depend on the dimensionless quantity α′/L²=α′H². This is only one control condition; string loops, the internal geometry and the compactification’s other scales require separate checks."
  },
  {
    "id": "expand-string-040",
    "topic": "de Sitter",
    "difficulty": "Applied",
    "pages": [
      61,
      69
    ],
    "prerequisite": true,
    "prompt": "Why cannot the protected BPS machinery of ordinary unitary supersymmetric AdS vacua simply be assumed for an exact de Sitter vacuum?",
    "options": [
      "De Sitter curvature always vanishes",
      "Every de Sitter state is automatically half-BPS",
      "AdS and de Sitter share the same vacuum superalgebra in every dimension",
      "Exact de Sitter is incompatible with the usual unbroken supersymmetry under the standard unitary assumptions"
    ],
    "answer": 3,
    "explanation": "The obstruction concerns realizing the de Sitter symmetry together with the usual supersymmetry and positivity requirements. A supersymmetric theory can instead have a vacuum that breaks supersymmetry, so the statement does not rule out studying de Sitter candidates within such theories.",
    "reference": {
      "label": "Spradlin, Strominger and Volovich, de Sitter lectures §1",
      "url": "https://arxiv.org/html/hep-th/0110007v2#S1"
    }
  },
  {
    "id": "expand-string-041",
    "topic": "de Sitter",
    "difficulty": "Foundation",
    "pages": [
      95,
      96
    ],
    "prerequisite": true,
    "prompt": "Which description correctly identifies the strategy of the original KKLT de Sitter proposal?",
    "options": [
      "Stabilize moduli in an AdS construction, then add a supersymmetry-breaking uplift subject to control and stability conditions",
      "Replace every negative sign in the AdS₅×S⁵ metric by a positive sign",
      "Prove all compactifications have a de Sitter vacuum",
      "Use T-duality alone to turn the D3 throat into de Sitter"
    ],
    "answer": 0,
    "explanation": "The proposal combines fluxes and nonperturbative effects with an uplifting contribution, originally from anti-D3-branes. A proposed mechanism is not a universal existence theorem, and its ingredients require a controlled treatment.",
    "reference": {
      "label": "Kachru et al., de Sitter Vacua in String Theory",
      "url": "https://arxiv.org/abs/hep-th/0301240"
    }
  },
  {
    "id": "expand-string-042",
    "topic": "de Sitter",
    "difficulty": "Applied",
    "pages": [
      95,
      96
    ],
    "prerequisite": true,
    "prompt": "A scalar potential has a stationary point with V>0, but its mass matrix has a negative eigenvalue. What does this show about a proposed metastable de Sitter vacuum?",
    "options": [
      "Positive V guarantees perturbative stability",
      "The point is unstable along that scalar direction; positive vacuum energy is not sufficient",
      "The negative eigenvalue is automatically allowed by the AdS BF bound",
      "Every scalar is stabilized because the first derivatives vanish"
    ],
    "answer": 1,
    "explanation": "Stationarity removes the linear variation, but a negative mass eigenvalue gives a descending direction and a growing scalar perturbation. The AdS BF allowance cannot simply be transferred to de Sitter; a metastable candidate needs additional stability checks."
  },
  {
    "id": "expand-string-043",
    "topic": "de Sitter",
    "difficulty": "Hard",
    "pages": [
      37,
      41
    ],
    "prerequisite": true,
    "prompt": "For a free scalar in dS₍d+1₎, the proposed boundary weights are h±=d/2±√(d²/4−m²L²). What happens when m²L²>d²/4?",
    "options": [
      "Both weights become real positive integers",
      "The scalar automatically violates the AdS BF bound",
      "The weights form a complex-conjugate pair",
      "The dimension of spacetime becomes complex"
    ],
    "answer": 2,
    "explanation": "The square root becomes imaginary while the real part of both weights stays d/2. Such weights appear in the dS/CFT proposal and obstruct a naive identification with ordinary unitary Euclidean CFT data; they do not alone prove a bulk instability.",
    "reference": {
      "label": "Strominger, The dS/CFT Correspondence",
      "url": "https://arxiv.org/abs/hep-th/0106113"
    }
  },
  {
    "id": "expand-string-044",
    "topic": "de Sitter",
    "difficulty": "Applied",
    "pages": [
      27,
      33
    ],
    "prerequisite": true,
    "prompt": "For an observer at r=0 in the de Sitter static-patch metric, the semiclassical horizon temperature is T=H/(2π). If H doubles, what happens to this temperature?",
    "options": [
      "It halves",
      "It rises by a factor of four",
      "It becomes zero because de Sitter has no black hole",
      "It doubles"
    ],
    "answer": 3,
    "explanation": "The temperature is linear in H, so doubling H doubles T in the same units. This is a cosmological-horizon temperature and does not require a black hole.",
    "reference": {
      "label": "Spradlin, Strominger and Volovich, de Sitter lectures §3.2",
      "url": "https://arxiv.org/html/hep-th/0110007v2#S3.SS2"
    }
  },
  {
    "id": "expand-string-045",
    "topic": "AdS",
    "difficulty": "Hard",
    "pages": [
      25,
      27
    ],
    "prerequisite": false,
    "prompt": "In ambient metric −dU²−dV²+dX², set U=L coshρ cosτ, V=L coshρ sinτ and X=L sinhρ. What is the squared norm of the tangent ∂/∂τ?",
    "options": [
      "−L²cosh²ρ",
      "+L²cosh²ρ",
      "−L²sinh²ρ",
      "Zero for every ρ"
    ],
    "answer": 0,
    "explanation": "Differentiate U and V with respect to τ while X stays fixed, then add their two negative squares. The result is always negative, so the circular τ direction is timelike in the embedding hyperboloid."
  },
  {
    "id": "expand-string-046",
    "topic": "AdS",
    "difficulty": "Foundation",
    "pages": [
      25,
      27
    ],
    "prerequisite": false,
    "prompt": "The upper sheet −T²+X²+Y²=−L² with T>0 inherits its metric from −dT²+dX²+dY². Which geometry does it represent?",
    "options": [
      "Lorentzian AdS₂ with periodic physical time",
      "The hyperbolic plane H₂, also called Euclidean AdS₂",
      "Lorentzian de Sitter space dS₂",
      "A flat Euclidean plane"
    ],
    "answer": 1,
    "explanation": "Its normal is timelike, leaving a positive-definite metric on the two-dimensional tangent space. The sheet has constant negative curvature; the ambient time coordinate does not make the induced geometry Lorentzian."
  },
  {
    "id": "expand-string-047",
    "topic": "AdS",
    "difficulty": "Hard",
    "pages": [
      25,
      27
    ],
    "prerequisite": false,
    "prompt": "Why does the negative-norm constraint in ambient signature (−,−,+) leave a Lorentzian two-dimensional AdS tangent plane?",
    "options": [
      "Every embedded surface inherits every ambient time direction",
      "The constraint forces all tangent vectors to be timelike",
      "The timelike normal removes one negative direction, leaving one negative and one positive tangent direction",
      "The normal vector has zero norm everywhere"
    ],
    "answer": 2,
    "explanation": "The position vector is normal to this quadric and has norm −L². Its orthogonal complement therefore has one remaining negative direction and one positive direction, which is precisely Lorentzian signature in two dimensions."
  },
  {
    "id": "expand-string-048",
    "topic": "AdS",
    "difficulty": "Hard",
    "pages": [
      24,
      27
    ],
    "prerequisite": true,
    "prompt": "AdS₂, dS₂ and H₂ have locally isomorphic so(2,1) isometry algebras. Why does this not make them the same metric geometry?",
    "options": [
      "The dimension of the algebra uniquely fixes every metric",
      "H₂ actually has no continuous isometries",
      "A Lie algebra determines all global identifications",
      "Metric signature, curvature sign and the stabilizer/global structure contain further information"
    ],
    "answer": 3,
    "explanation": "H₂ is Riemannian and has a compact SO(2) point stabilizer, while the two Lorentzian examples have noncompact SO(1,1) stabilizers. AdS₂ and dS₂ also differ in curvature sign and in the causal role of the circular direction, so the local algebra alone is insufficient."
  }
];

