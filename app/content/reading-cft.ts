import type { ReadingBlock, ReadingSection } from './reading-types';

const r = String.raw;
const p = (text: string): ReadingBlock => ({ type: 'p', text });
const m = (tex: string, explain?: string): ReadingBlock => ({ type: 'math', tex, explain });
const note = (title: string, text: string): ReadingBlock => ({ type: 'callout', title, text });
const steps = (...items: string[]): ReadingBlock => ({ type: 'steps', items });
const s = (id: string, side: ReadingSection['side'], chapter: number, index: number, title: string, lead: string, blocks: ReadingBlock[], concepts: string[], tab: number, ranges: [number, number][], lecturePages: number[]): ReadingSection => ({ id, side, chapter, order: chapter * 100 + index, title, lead, blocks, concepts, source: { tab, ranges, lecturePages } });

/** Rewritten from the green-selected Google Doc paragraphs and their visually read equations.
 * Paragraph ranges are inclusive block IDs in the current per-tab source extraction.
 * Repeated screenshots are consolidated; source mistakes are corrected explicitly.
 */
export const readingCft: ReadingSection[] = [
  s('reading-large-n', 'cft', 1, 1, 'Large N: many diagrams can become a surface', 'Large N simplifies the topology of gauge-theory diagrams. It does not mean that the gauge theory is weakly coupled.', [
    p('An adjoint matrix field carries two colour indices. Draw its propagator as two lines, one for each index. A closed index loop contributes N. Thickening the resulting graph makes a two-dimensional surface; adding a handle costs two powers of N.'),
    m(r`\lambda=g_{\mathrm{YM}}^2N,\qquad \mathcal A_{\text{vacuum}}=\sum_{h=0}^{\infty}N^{2-2h}F_h(\lambda)`, 'Here h is the number of handles (the genus), not a source. F₀ contains all planar vacuum diagrams at every order in λ. Operator insertions modify the overall N counting.'),
    p('At fixed λ, N → ∞ suppresses nonplanar diagrams. But if λ is large, infinitely many planar diagrams can still matter. Ordinary perturbation theory in λ has failed; the topological expansion in 1/N can remain useful.'),
    m(r`g_s=\frac{\lambda}{2\pi N},\qquad \frac{L^4}{\alpha'^2}=2\lambda,\qquad \frac{\alpha'}{L^2}=\frac1{\sqrt{2\lambda}}`, 'These numerical factors follow this course’s convention gYM² = 2πgs. At fixed λ, gs scales as 1/N. Large λ suppresses string-length corrections to a gently curved bulk geometry.'),
    m(r`1\ll\lambda\ll N\quad\Longrightarrow\quad L\gg\sqrt{\alpha'},\qquad g_s\ll1`, 'This parametric regime controls both kinds of correction in the familiar D3-brane example: string curvature effects and string loops.'),
    p('This is why the difficult gauge-theory regime can become the simple gravity regime. The planar graphs are not thrown away: their combined dynamics is reorganized into the string description. A surface expansion is a clue, not a proof that every matrix theory has a weakly curved AdS dual.'),
    steps('Matrix indices give double-line diagrams.', 'Double-line diagrams organize by surface topology.', 'Large N selects planar topology, while strong λ resums its dynamics.', 'A particular string construction makes the proposed duality precise.', 'We now need the conformal symmetry of that particular boundary theory.'),
  ], ['large-n', 'string-loops', 'classical-limit'], 2, [[566,590]], [11,12,13]),

  s('reading-conformal-generators', 'cft', 2, 1, 'Generators are the infinitesimal moves', 'A generator tells you the direction of a tiny transformation. Its commutators tell you how transformations fit together.', [
    m(r`U(\epsilon)=e^{i\epsilon G}=1+i\epsilon G+O(\epsilon^2)`, 'The finite move is built by repeating tiny moves. The factor i is a quantum-mechanical convention.'),
    m(r`f(x+a)=f(x)+a^\mu\partial_\mu f(x)+O(a^2),\qquad P_\mu=-i\partial_\mu`, 'Taylor’s theorem explains why a derivative generates a translation.'),
    m(r`\begin{aligned}P_\mu&=-i\partial_\mu, & D&=-ix^\rho\partial_\rho,\\ J_{\mu\nu}&=i(x_\mu\partial_\nu-x_\nu\partial_\mu),&K_\mu&=i(2x_\mu x^\rho\partial_\rho-x^2\partial_\mu).\end{aligned}`, 'These are the coordinate generators in the convention of the lecture. Acting on a field also includes its intrinsic spin and scaling dimension.'),
    m(r`[D,P_\mu]=iP_\mu,\qquad [D,K_\mu]=-iK_\mu,\qquad [K_\mu,P_\nu]=-2i(\eta_{\mu\nu}D-J_{\mu\nu})`, 'A translation and an SCT performed in opposite orders differ by a dilation and a Lorentz transformation. The algebra closes: no new kind of infinitesimal move is needed.'),
    m(r`[J_{\mu\nu},P_\rho]=i(\eta_{\nu\rho}P_\mu-\eta_{\mu\rho}P_\nu),\qquad [J_{\mu\nu},K_\rho]=i(\eta_{\nu\rho}K_\mu-\eta_{\mu\rho}K_\nu)`, 'Translations and SCTs transform as Lorentz vectors. These signs follow the displayed choice Jμν = i(xμ∂ν − xν∂μ); reversing that generator convention reverses its brackets.'),
    m(r`[P_\mu,P_\nu]=[K_\mu,K_\nu]=[J_{\mu\nu},D]=0`, 'Together with the ordinary Lorentz algebra, these relations are the conformal Lie algebra.'),
  ], ['conformal-symmetry', 'generators', 'lie-algebra'], 3, [[156,156],[182,184]], [16,17]),

  s('reading-conformal-so', 'cft', 2, 2, 'Why SO(d,2)? Why two minus signs?', 'The conformal algebra of d-dimensional Lorentzian spacetime is the same algebra as the AdS isometry algebra.', [
    m(r`d+\frac{d(d-1)}2+1+d=\frac{(d+1)(d+2)}2=\dim SO(d,2)`, 'Count translations, Lorentz transformations, one dilation and SCTs. This count is a useful check; matching the commutators establishes the algebra isomorphism.'),
    m(r`SO(d,2)=\{M\in GL(d+2,\mathbb R):M^T\eta M=\eta,\ \det M=1\},\qquad \eta=\operatorname{diag}(-1,-1,+1,\ldots,+1)`, 'O means orthogonal: preserve a real quadratic form. S means special: determinant +1. The two numbers count positive and negative directions of that form, not the dimension of the group.'),
    m(r`-X_{-1}^2-X_0^2+\sum_{i=1}^{d}X_i^2=-L^2`, 'AdS is this hyperboloid in the auxiliary (d+2)-dimensional embedding space. Its normal is timelike. Removing that normal leaves one timelike direction in its tangent space, so AdS itself does not have two physical times.'),
    p('The same SO(d,2) transformations act as isometries in the bulk and as conformal transformations on its boundary. For physical AdS we unwrap global time. Covers and discrete quotients change the exact global group; the local Lie algebra is still so(d,2). Matching symmetry is the first hint of a duality, not the entire duality.'),
    note('Correcting a line in the notes', 'SO(d,2) and SU(d,2) are not generally the same. The useful four-dimensional exception is so(4,2) ≅ su(2,2). SU(2,2) preserves a Hermitian form on four complex components and double-covers the identity component of SO(4,2). SU(4,2), by contrast, has 35 generators, not 15.'),
    m(r`\mathfrak{so}(4,2)\simeq\mathfrak{su}(2,2),\qquad \dim SO(4,2)=15=\dim SU(2,2)`, 'The letter U means unitary: preserve a complex Hermitian form. Equal algebras do not automatically mean globally identical groups.'),
    p('After Wick rotation the boundary is Euclidean. Its conformal algebra is so(d+1,1), matching Euclidean AdS, not so(d,2). In particular, Euclidean AdS₅ and a Euclidean CFT₄ use SO(5,1).'),
  ], ['conformal-symmetry', 'isometry', 'so-d-2', 'group-theory'], 3, [[183,189]], [17,24,25,33]),

  s('reading-cft-dimensions', 'cft', 2, 3, 'Scaling dimensions are the CFT’s spectral data', 'An operator has a definite response to changing the length scale. Interactions can change that response.', [
    m(r`x'^\mu=a x^\mu,\qquad \mathcal O'(x')=a^{-\Delta}\mathcal O(x)`, 'This passive convention states both the coordinate change and the transformed field. It avoids mixing the active and passive dilation formulas.'),
    m(r`\Delta=\Delta_{\mathrm{engineering}}+\gamma(\lambda),\qquad \langle\mathcal O(x)\mathcal O(0)\rangle=\frac{C_{\mathcal O}}{|x|^{2\Delta}}`, 'γ is the anomalous dimension. For a free scalar Δ = (d−2)/2; for interacting operators it generally changes. Some supersymmetric operators are protected.'),
    p('N = 4 super-Yang–Mills is interacting and conformal: an interaction does not by itself break conformal invariance. The beta function of its gauge coupling vanishes, while many operator dimensions still depend on the coupling.'),
    m(r`m^2L^2=\Delta(\Delta-d),\qquad \phi(z,x)\sim z^{d-\Delta}\phi_0(x)+z^\Delta A(x)`, 'This is a preview of the scalar bridge, derived below: a bulk mass becomes a CFT dimension; the leading coefficient is the source and the second is related to the response.'),
    p('This is a much sharper test than recognizing the same symmetry group. A proposed dual pair must agree on dimensions, their quantum corrections, and correlation functions. The radial coordinate also scales with x, which is why it organizes the boundary theory’s energy scales.'),
  ], ['mass-dimension', 'correlators', 'conformal-symmetry', 'radial-scale'], 3, [[248,250]], [18,19,20,38]),

  s('reading-two-dimensional-cft', 'cft', 2, 4, 'In two dimensions, local symmetry is much larger', 'Infinitely many local conformal transformations contain the familiar finite global group as a small subalgebra.', [
    p('Use a complex coordinate w for the Euclidean two-dimensional boundary here, so it is not confused with the AdS radial coordinate z. Holomorphic functions generate local angle-preserving maps.'),
    m(r`\ell_n=-w^{n+1}\partial_w,\qquad \bar\ell_n=-\bar w^{n+1}\partial_{\bar w},\qquad n\in\mathbb Z`, 'The integer labels a Laurent power, so there are infinitely many local generators.'),
    m(r`[\ell_m,\ell_n]=(m-n)\ell_{m+n},\quad [\bar\ell_m,\bar\ell_n]=(m-n)\bar\ell_{m+n},\quad [\ell_m,\bar\ell_n]=0`, 'For vector fields f∂ and g∂, the bracket is (fg′−gf′)∂. Substituting the Laurent monomials gives the Witt algebra.'),
    p('A transformation regular everywhere on the sphere must be regular both at w = 0 and at infinity. To test infinity, use v = 1/w.'),
    m(r`\partial_w=-v^2\partial_v,\qquad \ell_n=v^{1-n}\partial_v`, 'Regularity at w = 0 needs n ≥ −1; regularity at v = 0 needs n ≤ 1. Only n = −1, 0, 1 pass both tests.'),
    m(r`\ell_{-1}=-\partial_w,\qquad \ell_0=-w\partial_w,\qquad \ell_1=-w^2\partial_w`, 'They generate translations, scale/rotation transformations and special conformal transformations; there is a corresponding barred set.'),
    m(r`\mathfrak{so}(2,2)\simeq\mathfrak{sl}_2(\mathbb R)\oplus\mathfrak{sl}_2(\mathbb R)`, 'This real form is for a Lorentzian 1+1-dimensional boundary. On the Euclidean sphere, the global group is PSL(2,ℂ), with real Lie algebra so(3,1). The holomorphic and antiholomorphic notation should not erase this signature distinction.'),
    m(r`[L_m,L_n]=(m-n)L_{m+n}+\frac{c}{12}m(m^2-1)\delta_{m+n,0}`, 'Quantization can add a central term, giving the Virasoro algebra. It vanishes for m = −1, 0, 1, so the global generators retain their ordinary algebra.'),
    p('The infinite set imposes many more conditions on correlation functions than the global group alone. It is also crucial for the two-dimensional string worldsheet. In AdS₃, the larger Virasoro structure arises from asymptotic boundary symmetries, not from extra exact Killing vectors of the fixed AdS metric.'),
  ], ['conformal-symmetry', 'two-dimensional-cft', 'virasoro'], 3, [[427,444],[457,458]], [21]),

  s('reading-killing-current', 'cft', 2, 5, 'A Killing vector gives a conserved spacetime charge', 'A Killing vector points along a transformation that leaves the metric unchanged.', [
    m(r`\mathcal L_\xi g_{\mu\nu}=\nabla_\mu\xi_\nu+\nabla_\nu\xi_\mu=0`, 'The Lie derivative compares the metric before and after flowing along ξ. Zero means an isometry.'),
    m(r`j^\mu=T^{\mu\nu}\xi_\nu,\qquad \nabla_\mu j^\mu=(\nabla_\mu T^{\mu\nu})\xi_\nu+T^{\mu\nu}\nabla_\mu\xi_\nu=0`, 'Stress-tensor conservation kills the first term. Symmetry of T contracts only the symmetric derivative of ξ, which vanishes by the Killing equation.'),
    p('Time translations produce energy; spatial translations produce momentum; rotations produce angular momentum. A conformal Killing vector instead changes the metric by a local scale factor. Its current is also conserved when the stress tensor is traceless, subject to the usual quantum-anomaly qualifications.'),
    m(r`\mathcal L_\xi g_{\mu\nu}=\frac2d(\nabla\cdot\xi)g_{\mu\nu}\quad\Longrightarrow\quad \nabla_\mu(T^{\mu\nu}\xi_\nu)=\frac1d(\nabla\cdot\xi)T^\mu{}_{\mu}`),
  ], ['isometry', 'killing-vector', 'ward-identity', 'stress-tensor'], 3, [[529,529]], [22,23]),

  s('reading-where-cft-lives', 'bridge', 4, 1, 'The CFT is on the conformal boundary—not inside the bulk', 'The bulk theory and the boundary CFT are two descriptions of the same physics. They are not two substances occupying one space.', [
    p('AdS₍d+1₎ has d+1 spacetime dimensions. The CFT has d. In the familiar example, the boundary coordinates are time plus three spatial coordinates, while the bulk has one additional radial coordinate.'),
    m(r`x^\mu=(t,x^1,x^2,x^3),\qquad X^M=(x^\mu,z),\qquad ds^2=\frac{L^2}{z^2}(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu)`, 'μ labels boundary directions; M labels all bulk directions. The bulk has z > 0.'),
    m(r`d\widetilde s^2=\frac{z^2}{L^2}ds^2=dz^2+\eta_{\mu\nu}dx^\mu dx^\nu,\qquad d\widetilde s^2_{\partial}=\eta_{\mu\nu}dx^\mu dx^\nu`, 'Rescale first, then restrict to z = 0. The resulting boundary metric is finite. A different allowed rescaling gives a conformally related representative.'),
    p('The boundary is timelike in Lorentzian AdS: its induced metric contains a time direction. It is not a null edge of a Minkowski Penrose diagram. A CFT can be formulated on this boundary geometry, with no z coordinate of its own.'),
    m(r`S_{\mathrm{BH}}=\frac{A}{4G_N}\quad(\hbar=c=k_B=1)`, 'Black-hole entropy motivates holography: gravitational information can scale with area. This is motivation, not a derivation that every bulk region or arbitrary gravity theory has an exact CFT dual.'),
    note('What “encoded on the boundary” means', 'A particle can move inside AdS in the bulk description. The boundary description represents that physical state using CFT data, generally distributed nonlocally. It does not relocate the particle to an ordinary wall, and it does not put CFT matter throughout the bulk.'),
    p('The gravitational theory includes matter fields as well as a metric. Its low-energy action is an effective description; a full string-theory completion is needed outside its regime. Chapter 4 develops the calculation rule before chapter 7 explains its D3-brane origin.'),
  ], ['boundary-not-bulk', 'holography', 'conformal-boundary'], 5, [[1,48]], [34]),

  s('reading-boundary-causal-contrast', 'bridge', 4, 2, 'Why the Minkowski boundary sketch is a different example', 'Your compactification screenshot is useful, but it is about flat spacetime—not the timelike boundary of AdS.', [
    m(r`u=t-x,\quad v=t+x,\quad ds^2=-du\,dv,\quad U=\arctan u,\quad V=\arctan v`, 'The infinite ranges of u and v become −π/2 < U,V < π/2.'),
    m(r`ds^2=-\frac{dU\,dV}{\cos^2U\cos^2V},\qquad d\widetilde s^2=-dU\,dV`, 'A positive conformal rescaling removes the divergent factor without changing light cones.'),
    m(r`U=\frac\pi2\quad\Longrightarrow\quad dU=0\quad\Longrightarrow\quad d\widetilde s^2=0`, 'This particular infinity is null. The analogous V edges are null too; the corner points represent timelike or spacelike infinity.'),
    p('By contrast, restricting the rescaled AdS metric to z = 0 leaves −dt² + d⃗x². That is a Lorentzian metric on a timelike boundary. “Boundary” alone does not tell you whether a surface is timelike, spacelike or null: inspect its induced metric.'),
  ], ['conformal-boundary', 'causal-structure'], 5, [[26,26]], [29,30,31,32]),

  s('reading-fields-operators', 'bridge', 4, 3, 'Match an observable, not a name shared by two fields', 'The basic map pairs a bulk field with a gauge-invariant CFT operator of the right quantum numbers.', [
    m(r`\phi_{\mathrm{bulk}}\longleftrightarrow\mathcal O_{\mathrm{CFT}},\qquad A_M\longleftrightarrow J_\mu,\qquad g_{MN}\longleftrightarrow T_{\mu\nu}`, 'Scalars match scalar operators, gauge fields match conserved global currents, and metric fluctuations match the stress tensor. The precise map also uses dimensions and internal-symmetry representations.'),
    p('The CFT has its own elementary fields, such as matrix scalars, fermions and a gauge connection. These are not automatically the bulk fields. A gauge-dependent elementary field is not usually the boundary observable used in the dictionary.'),
    m(r`A_\mu\mapsto A_\mu+\partial_\mu\alpha,\qquad F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu`, 'For an Abelian gauge theory A depends on the gauge choice, while F is gauge invariant.'),
    m(r`\Phi\mapsto U\Phi U^{-1},\qquad \operatorname{Tr}(\Phi^2)\mapsto\operatorname{Tr}(U\Phi^2U^{-1})=\operatorname{Tr}(\Phi^2)`, 'In a non-Abelian theory the matrix field is gauge covariant; traces such as Tr Φ² and Tr F² are gauge invariant. Non-Abelian F itself is not gauge invariant.'),
    p('Knowing which objects correspond is only the first step. To make predictions, we need a rule that turns a bulk calculation into a boundary expectation value. That rule uses sources.'),
  ], ['field-operator-map', 'source-response', 'ward-identity'], 5, [[57,94]], [34,35,36]),

  s('reading-source-generator', 'bridge', 4, 4, 'A source is a question you ask the CFT', 'Choose an external function h(x). It couples to the operator you want to probe; it is not another quantum field being integrated over.', [
    m(r`Z[h]=\left\langle e^{\int d^dx\,h(x)\mathcal O(x)}\right\rangle_0=\frac{\int\mathcal D\Phi\ e^{-S_E[\Phi]+\int h\mathcal O}}{\int\mathcal D\Phi\ e^{-S_E[\Phi]}},\qquad W[h]=\log Z[h]`, 'The integral is over the CFT fields Φ, not h. Normalizing by the zero-source integral gives Z[0] = 1.'),
    note('One sign convention throughout', 'Here the Euclidean source-deformed action is SE[h] = SE[0] − ∫hO, so the exponential contains +∫hO. Some note screenshots instead write S + ∫hO. That is the opposite definition of the source; mixing the two conventions causes spurious minus signs.'),
    m(r`e^{\int h\mathcal O}=1+\int d^dx\,h(x)\mathcal O(x)+\frac12\int d^dx\,d^dy\,h(x)h(y)\mathcal O(x)\mathcal O(y)+\cdots`, 'Each extra source power multiplies one extra operator. That is why differentiation extracts correlators.'),
    m(r`\frac{\delta h(y)}{\delta h(x)}=\delta^{(d)}(x-y),\qquad \frac{\delta}{\delta h(x)}e^{\int h\mathcal O}=\mathcal O(x)e^{\int h\mathcal O}`),
    m(r`\left.\frac{\delta Z}{\delta h(x)}\right|_0=\langle\mathcal O(x)\rangle,\qquad \left.\frac{\delta^2 Z}{\delta h(x)\delta h(y)}\right|_0=\langle\mathcal O(x)\mathcal O(y)\rangle`, 'Differentiate first. Only afterward set h = 0; otherwise the source dependence has disappeared before it can be differentiated.'),
    m(r`\frac{\delta^2W}{\delta h(x)\delta h(y)}=\langle\mathcal O(x)\mathcal O(y)\rangle_h-\langle\mathcal O(x)\rangle_h\langle\mathcal O(y)\rangle_h`, 'The logarithm subtracts the disconnected piece.'),
    m(r`\langle\mathcal O(x_1)\cdots\mathcal O(x_n)\rangle_c=\left.\frac{\delta^nW}{\delta h(x_1)\cdots\delta h(x_n)}\right|_{h=0}`, 'Everything so far is ordinary QFT. Holography will provide another way to calculate this same W.'),
  ], ['source-response', 'generating-functional', 'correlators'], 5, [[95,119]], [35]),

  s('reading-gkpw', 'bridge', 4, 5, 'The crucial identification: source = bulk boundary data', 'We use the same chosen function h to specify a CFT probe and a boundary condition for a bulk field.', [
    p('Let φ(z,x) denote the entire bulk field. Let h(x) denote its prescribed leading boundary coefficient. These are different mathematical objects: φ depends on d+1 coordinates and obeys a bulk equation; h depends on d coordinates and can be freely chosen.'),
    m(r`Z_{\mathrm{CFT}}[h]=Z_{\mathrm{bulk}}[h],\qquad Z_{\mathrm{bulk}}[h]=\int_{\text{source coefficient}=h}\mathcal D(\text{bulk fields})\ e^{-S_E}`, 'The exact duality equates the entire source-dependent functionals. Divide each side by its value at h = 0 if using the normalized convention above.'),
    p('The full bulk integral includes off-shell configurations: fields that do not obey the classical equation. In a controlled classical regime it is dominated by an appropriate saddle.'),
    m(r`\frac{\delta S_E}{\delta\phi}=0\quad\Longrightarrow\quad\phi_{\mathrm{cl}}[h],\qquad Z_{\mathrm{bulk}}[h]\simeq e^{-S_{E,\mathrm{ren}}[\phi_{\mathrm{cl}}[h]]}`, 'Solve with the selected boundary data and interior/state prescription. Then evaluate and renormalize the action on that solution. “On shell” means precisely that the bulk equation has been solved.'),
    m(r`W[h]\simeq-S_{E,\mathrm{ren}}[\phi_{\mathrm{cl}}[h]]+S_{E,\mathrm{ren}}[\phi_{\mathrm{cl}}[0]]`, 'The h-independent last term enforces W[0] = 0 and disappears under every source derivative.'),
    p('The source h is still arbitrary. For every choice of h there is a new boundary-value problem. Evaluating an action on shell does not mean that h must obey a CFT field equation. It means that the interior profile has been made stationary while that chosen source is held fixed.'),
    steps('Choose the CFT operator O and its source h.', 'Identify the corresponding bulk field φ.', 'Solve the bulk equation with source coefficient h and the desired interior/state condition.', 'Evaluate the renormalized bulk action to obtain W[h].', 'Differentiate W to obtain CFT correlation functions.'),
    p('This is the path between the two theories. A classical bulk problem can calculate a quantum CFT observable because the same functional has two descriptions—not because the CFT operator obeys the bulk Klein–Gordon equation.'),
  ], ['gkpw', 'source-response', 'boundary-not-bulk'], 5, [[120,173]], [35,36]),

  s('reading-two-boundary-conditions', 'bridge', 4, 6, 'Why one boundary value is not the whole solution', 'A second-order radial equation has two independent pieces of data. The source fixes one; regularity or a state prescription fixes the other.', [
    m(r`y''+y=0\quad\Longrightarrow\quad y=A\cos x+B\sin x`, 'Two independent constants need two conditions. For bulk fields these constants become functions of boundary position or momentum.'),
    m(r`(\nabla^2-m^2)\phi=0,\qquad \nabla_MF^{MN}=0`, 'Scalars, vectors and metric perturbations each have equations plus constraints or gauge choices. The scalar example isolates the idea most simply.'),
    m(r`\phi(z,x)\sim f(z)h(x),\qquad h(x)=\lim_{z\to0}\frac{\phi(z,x)}{f(z)}`, 'The source is a rescaled boundary coefficient. The equation of motion determines f(z); we do not pick it just to make a desired answer.'),
    m(r`f(z)=z^{-2}\quad\Longrightarrow\quad\phi(z,x)\sim z^{-2}h(x),\qquad h(x)=\lim_{z\to0}z^2\phi(z,x)`, 'A bulk field can diverge while its source remains perfectly finite. Other masses give modes that vanish instead.'),
    p('In Euclidean AdS we seek a regular solution in the interior, with admissible behaviour throughout the coordinate patch. In a ball picture its center is an ordinary point and the field must not acquire an unforced singularity there. In Lorentzian AdS we also specify the state and the appropriate causal prescription; for a retarded response at a horizon, for example, use ingoing conditions.'),
    note('Do not identify two different places', 'The Euclidean ball center is not the point z = ∞ of upper-half-space coordinates. Euclidean z = ∞ belongs to the point-at-infinity part of its compactified boundary; there is no Lorentzian event horizon in Euclidean signature. The term “Poincaré horizon” belongs to the Lorentzian patch.'),
    p('For an appropriate linear Euclidean problem, regularity fixes the response as a functional of the source. Nonlinear gravity can have several regular saddles for the same source; an extra physical choice is then needed.'),
  ], ['source-response', 'boundary-conditions', 'gkpw'], 5, [[176,213]], [35,36]),

  s('reading-effective-bulk', 'bridge', 4, 7, 'What approximation are we using?', 'The equality of theories is stronger than replacing a path integral by one classical action.', [
    m(r`Z_{\mathrm{CFT}}[h]=Z_{\mathrm{string}}[h]\simeq e^{-S_{\mathrm{supergravity,ren}}[\phi_{\mathrm{cl}}[h]]}`, 'The first equality is the proposed full duality. The last expression requires suppressed quantum and string-length corrections and a suitable dominant saddle.'),
    p('At low local energies compared with the string scale, string theory has an effective supergravity description. “Low energy” here is not a claim that the boundary CFT has become a classical field theory. The CFT may be strongly interacting and quantum while the bulk approximation is classical.'),
    m(r`\mathcal N=4\ \mathrm{SYM}_4\quad\longleftrightarrow\quad\text{type IIB strings on }\mathrm{AdS}_5\times S^5`, 'This concrete example will be justified with D3-branes. The five-sphere supplies internal quantum numbers and Kaluza–Klein fields in the five-dimensional effective bulk theory.'),
    p('The source is an external, off-shell function in the CFT. Its associated classical bulk solution is on shell. Quantum bulk fluctuations about it produce loop corrections; string excitations and higher-derivative terms matter when curvature is large in string units.'),
  ], ['classical-limit', 'gkpw', 'large-n'], 5, [[214,232],[263,278]], [36,37]),

  s('reading-global-to-gauge', 'bridge', 4, 8, 'Why a global CFT symmetry becomes a bulk gauge field', 'Current conservation forces a redundancy in its source. Holography extends that source into a bulk gauge field.', [
    m(r`\psi\mapsto e^{i\alpha}\psi\quad(\alpha\text{ constant}),\qquad \partial_\mu J^\mu=0,\qquad \int d^dx\,A_\mu^{(0)}J^\mu`, 'The CFT has a global U(1) and a conserved current. A⁽⁰⁾ is a background source, not the CFT’s own dynamical gauge connection.'),
    m(r`\delta A_\mu^{(0)}=\partial_\mu\chi,\qquad \delta\!\int A^{(0)}_\mu J^\mu=\int(\partial_\mu\chi)J^\mu=-\int\chi\,\partial_\mu J^\mu=0`, 'Integration by parts links conservation to source gauge invariance. Assume no boundary contribution or anomaly; insertions can add Ward-identity contact terms.'),
    m(r`W[A^{(0)}+d\chi]=W[A^{(0)}],\qquad \partial_\mu\frac{\delta W}{\delta A^{(0)}_\mu}=0`, 'This is the current Ward identity written as a statement about the generating functional.'),
    m(r`A_M(X)\mapsto A_M(X)+\partial_M\chi(X),\qquad A_M^{\mathrm{bulk}}\longleftrightarrow J_\mu^{\mathrm{CFT}}`, 'The bulk parameter can depend on z as well as x. Transformations that act nontrivially on boundary data encode global symmetries and source transformations there.'),
    m(r`\delta W=\int d^dx\sqrt{g_{(0)}}\left(\frac12\langle T^{\mu\nu}\rangle\delta g^{(0)}_{\mu\nu}+\langle J^\mu\rangle\delta A^{(0)}_\mu+\langle\mathcal O\rangle\delta h\right)`, 'This convention defines the stress-tensor source normalization. A small metric deformation couples with a factor 1/2, not simply an extra full metric multiplied by T.'),
    p('Boundary diffeomorphism invariance similarly gives stress-tensor conservation, and the bulk extension is gravity. Thus conserved current ↔ gauge field and stress tensor ↔ metric are consequences of symmetry and the source dictionary, not arbitrary pairings.'),
  ], ['ward-identity', 'global-gauge', 'stress-tensor', 'source-response'], 5, [[235,260]], [36]),

  s('reading-radial-energy', 'bridge', 4, 9, 'The extra direction organizes energy scales', 'z is a length coordinate, not literally an energy. Its inverse transforms like an energy scale.', [
    m(r`ds^2=\frac{L^2}{z^2}(dz^2+dx^\mu dx_\mu),\qquad (x,z)\mapsto(a x,a z)`, 'In Euclidean signature dx² is positive. Scaling every numerator differential contributes a² and scaling the denominator contributes a² too.'),
    m(r`ds'^2=\frac{L^2}{a^2z^2}\,a^2(dz^2+dx^2)=ds^2`, 'A CFT dilation becomes an exact AdS isometry.'),
    m(r`p\mapsto\frac p a,\qquad \mu\propto\frac1z,\qquad r=\frac{L^2}{z}`, 'Momentum has inverse-length units. If r has length units, μ ∝ r/L², not a dimensionally literal equality μ = r.'),
    m(r`z\to0\Longleftrightarrow\mu\to\infty\ (\mathrm{UV}),\qquad z\to\infty\Longleftrightarrow\mu\to0\ (\mathrm{IR})`, 'Short-distance boundary probes mainly resolve the near-boundary region; larger probes reach deeper. The precise radial RG prescription depends on the observable and scheme.'),
    m(r`\int_{\epsilon}^{z_0}\frac{L\,dz}{z}=L\log\frac{z_0}{\epsilon}\to\infty,\qquad \int_{z_0}^{Z}\frac{L\,dz}{z}=L\log\frac Z{z_0}\to\infty`, 'Both ends of a constant-boundary-coordinate radial curve have infinite proper length. Calling increasing z “deeper” describes direction away from the z = 0 boundary, not a finite distance to a center.'),
    p('The extra coordinate does not create another ordinary spacetime position in the CFT. A bulk point combines a boundary location with information about scale. For example, the worldsheet associated with a larger boundary Wilson loop typically extends farther into the bulk.'),
  ], ['radial-scale', 'isometry', 'renormalization'], 5, [[285,325]], [37]),

  s('reading-scalar-action', 'bridge', 4, 10, 'Put a scalar in AdS and derive its equation', 'First determine how a bulk field can vary. We will only interpret its solutions as CFT data after solving this bulk problem.', [
    p('Wick rotate t = −iτ, turning the oscillatory Lorentzian weight eⁱˢ into the Euclidean weight e⁻ˢᴱ with the appropriate continuation. Use a canonical scalar action; the notes sometimes suppress its overall factor 1/2.'),
    m(r`S_E=\frac12\int d^{d+1}X\sqrt g\left(g^{MN}\partial_M\phi\,\partial_N\phi+m^2\phi^2\right)`),
    m(r`g_{MN}=\frac{L^2}{z^2}\delta_{MN},\quad g^{MN}=\frac{z^2}{L^2}\delta^{MN},\quad \det g=\left(\frac{L^2}{z^2}\right)^{d+1},\quad \sqrt g=\frac{L^{d+1}}{z^{d+1}}`, 'The inverse metric undoes the metric. The determinant multiplies one diagonal entry for each bulk dimension.'),
    m(r`S_E=\frac{L^{d-1}}2\int dz\,d^dx\,\left[z^{1-d}\bigl((\partial_z\phi)^2+(\partial_\mu\phi)^2\bigr)+m^2L^2z^{-d-1}\phi^2\right]`, 'For d = 4, the kinetic weight is L³/z³ and the mass-term weight is L⁵/z⁵. The two derivative terms measure radial and boundary-direction variation.'),
    m(r`\delta[(\partial_M\phi)^2]=2\partial_M\phi\,\partial_M\delta\phi,\qquad \delta(\phi^2)=2\phi\,\delta\phi`),
    m(r`\delta S_E=L^{d-1}\int dz\,d^dx\,\delta\phi\left[-\partial_z(z^{1-d}\partial_z\phi)-z^{1-d}\partial_\mu\partial^\mu\phi+m^2L^2z^{-d-1}\phi\right]+\text{boundary term}`, 'Integrate by parts so δφ has no derivative. When deriving the bulk equation, variations vanish at the fixed boundary. Later we deliberately vary boundary sources to obtain observables.'),
    m(r`(\nabla^2-m^2)\phi=0,\qquad \nabla^2\phi=\frac1{\sqrt g}\partial_M(\sqrt g\,g^{MN}\partial_N\phi)`),
    m(r`z^2\partial_z^2\phi+(1-d)z\partial_z\phi+z^2\partial_\mu\partial^\mu\phi-m^2L^2\phi=0`, 'This is the same equation with every AdS metric factor shown explicitly.'),
    note('Same physics, different equations', 'The CFT operator O(x) does not obey this (d+1)-dimensional equation. The bulk equation determines φ(z,x); the dictionary then turns its source dependence into CFT correlators.'),
  ], ['scalar-equation', 'mass-dimension', 'source-response'], 5, [[327,351]], [37,38]),

  s('reading-mass-dimension-derivation', 'bridge', 4, 11, 'Why the power Δ is determined—not guessed', 'A power-law ansatz turns the radial differential equation into a quadratic equation.', [
    m(r`\partial_\mu\phi=0\quad\Longrightarrow\quad z^{d+1}\partial_z(z^{1-d}\partial_z\phi)=m^2L^2\phi`, 'This equation is exact for a boundary-independent mode. For a general slowly varying near-boundary expansion, boundary derivatives enter at subleading powers of z.'),
    m(r`\phi=z^\alpha,\quad \partial_z\phi=\alpha z^{\alpha-1},\quad z^{1-d}\partial_z\phi=\alpha z^{\alpha-d}`, 'α is initially just an unknown radial exponent.'),
    m(r`z^{d+1}\partial_z(\alpha z^{\alpha-d})=\alpha(\alpha-d)z^\alpha=m^2L^2z^\alpha\quad\Longrightarrow\quad\alpha(\alpha-d)=m^2L^2`),
    m(r`\Delta_\pm=\frac d2\pm\nu,\qquad \nu=\sqrt{\frac{d^2}{4}+m^2L^2},\qquad \Delta_++\Delta_-=d`, 'There are two powers because the radial equation is second order. In AdS₅ this reads m²L² = Δ(Δ−4).'),
    p('Why call a root a CFT dimension? The bulk dilation rescales x and z together. If the scalar is transformed as a bulk scalar, its coefficient of zᵅ transforms with weight α. The dictionary identifies the response coefficient with an operator expectation value, fixing its dimension.'),
    m(r`\phi'(a z,a x)=\phi(z,x),\quad \phi=z^{d-\Delta}h(x)+z^\Delta A(x)\quad\Longrightarrow\quad\begin{cases}h'(a x)=a^{-(d-\Delta)}h(x),\\ A'(a x)=a^{-\Delta}A(x).\end{cases}`, 'The two coefficients acquire the source and operator weights required by a dimensionless ∫hO coupling.'),
    m(r`[h]+[\mathcal O]=d,\qquad m^2L^2=\Delta(\Delta-d)`, 'The bulk equation fixes allowed exponents. The holographic identification—not the ansatz alone—tells us which exponent is the CFT operator dimension.'),
  ], ['mass-dimension', 'conformal-symmetry', 'source-response'], 5, [[352,379]], [38]),

  s('reading-two-falloffs', 'bridge', 4, 12, 'One field, two falloffs', 'The leading coefficient records what you impose; the independent subleading coefficient records the response.', [
    m(r`\phi(z,x)=z^{\Delta_-}\bigl(\phi_0(x)+z^2\phi_{(2)}(x)+\cdots\bigr)+z^{\Delta_+}\bigl(\phi_1(x)+O(z^2)\bigr)`, 'For standard quantization Δ = Δ₊ and Δ₋ = d−Δ. If the exponents resonate, logarithmic terms must be included.'),
    p('Boundary derivatives in the equation are multiplied by z². They generate the extra z², z⁴, … terms; those coefficients are usually fixed locally by derivatives of φ₀. The separate response φ₁ is fixed only after the interior/state condition is chosen.'),
    m(r`\phi_{(2)}=-\frac{\partial_\mu\partial^\mu\phi_0}{2(2\Delta_--d+2)}`, 'Away from a vanishing denominator, substitute the series into the equation and compare the coefficient of z^(Δ₋+2). A zero denominator signals the need for logarithms rather than a failed theory.'),
    m(r`d=4,\quad m^2L^2=-3\quad\Longrightarrow\quad\Delta_-=1,\ \Delta_+=3,\qquad\phi\sim z\phi_0+z^3\phi_1`, 'For 0 < z ≪ 1, z dominates z³. Both may tend to zero; “leading” means larger relative to the other, not necessarily divergent. General position-dependent sources in this resonant example also produce a z³ log z term.'),
    m(r`\int_0^\epsilon dz\sqrt g\,|\phi|^2\ \propto\ \int_0^\epsilon dz\,z^{2\alpha-d-1}`, 'This elementary Euclidean volume norm is finite near zero only for α > d/2.'),
    m(r`d=4:\qquad \phi\sim z\ \Rightarrow\ \int_0^\epsilon dz\,z^{-3}=\infty,\qquad \phi\sim z^3\ \Rightarrow\ \int_0^\epsilon dz\,z=\frac{\epsilon^2}{2}`, 'This is the calculation in the expanded note screenshots: the slow branch is non-normalizable in this particular Euclidean L² test; the fast branch is finite near the boundary.'),
    note('Normalizability has more than one meaning', 'Do not use this Euclidean spacetime integral to rule out alternate quantization. The Lorentzian Klein–Gordon/symplectic norm is defined on a spacelike slice and has different weights and boundary terms. In the alternate window both falloffs can be admissible in that sense.'),
  ], ['source-response', 'normalizability', 'mass-dimension'], 5, [[380,403]], [38]),

  s('reading-source-limit', 'bridge', 4, 13, 'Read the source limit one operation at a time', 'You do not usually set z = 0 in φ. Remove the known radial power before taking the limit.', [
    m(r`\phi_0(x)=\lim_{z\to0}z^{-\Delta_-}\phi(z,x)=\lim_{z\to0}z^{\Delta-d}\phi(z,x)`, 'Hold x, m, L and the selected quantization fixed. Move toward the boundary, divide out the source power, and read the surviving coefficient.'),
    m(r`\Delta_-<0:\ z^{\Delta_-}\to\infty;\qquad \Delta_-=0:\ z^{\Delta_-}=1;\qquad \Delta_->0:\ z^{\Delta_-}\to0`, 'The same finite source can multiply a divergent, constant or vanishing bulk field. Only the middle case gives the literal boundary value φ → φ₀.'),
    p('Choose φ₀ freely, then solve the bulk problem. In the regular linear Euclidean vacuum solution, φ₁ is not another independent knob: it is a functional φ₁[φ₀]. “Functional” means its value at x can depend on the source at many other positions.'),
    m(r`\phi_0\ \xrightarrow{\text{bulk equation + interior condition}}\ \phi_{\mathrm{cl}}[\phi_0]\ \xrightarrow{\text{read subleading coefficient}}\ \phi_1[\phi_0]`, 'The response coefficient becomes proportional to ⟨O⟩ after the renormalized action is varied.'),
    p('Both terms are part of an on-shell bulk solution. That does not make the source “on shell”: φ₀ remains externally chosen. In Lorentzian problems, different states can supply independent normalizable excitations even at zero source.'),
  ], ['source-response', 'boundary-conditions', 'limits'], 5, [[404,428]], [39]),

  s('reading-relevance-rg', 'bridge', 4, 14, 'Relevant, marginal and irrelevant—relative to what?', 'The classification asks whether a small deformation becomes more important as the energy scale is lowered.', [
    m(r`S=S_{\mathrm{CFT}}+g\int d^dx\,\mathcal O(x),\quad [\mathcal O]=\Delta,\quad [d^dx]=-d\quad\Longrightarrow\quad[g]=d-\Delta`, 'Here g is a deformation coupling, not the spacetime metric or necessarily the Yang–Mills coupling.'),
    m(r`\widetilde g(\mu)=g\mu^{\Delta-d},\qquad \beta_{\widetilde g}=\mu\frac{d\widetilde g}{d\mu}=(\Delta-d)\widetilde g+O(\widetilde g^2)`, 'Compare dimensionless couplings, not a dimensionful bare number. This linearized expression is valid near the undeformed fixed point.'),
    m(r`\begin{array}{c|c|c}\Delta<d&\widetilde g\text{ grows toward IR}&\text{relevant}\\\Delta=d&\text{linear term vanishes}&\text{marginal}\\\Delta>d&\widetilde g\text{ shrinks toward IR}&\text{irrelevant}\end{array}`),
    m(r`\Delta=\Delta_+:\quad m^2>0\Rightarrow\Delta>d,\qquad m^2=0\Rightarrow\Delta=d,\qquad -\frac{d^2}{4L^2}\le m^2<0\Rightarrow\frac d2\le\Delta<d`, 'The scalar mass translates this classification into bulk data. The source exponent is d−Δ, so an irrelevant source often diverges near z = 0.'),
    p('Marginal by dimension does not automatically mean exactly marginal: nonlinear terms in the beta function may still cause running. A relevant deformation can flow to another CFT, but it may also end in a massive or gapped theory.'),
    m(r`\beta(g_*)=0,\qquad \mathrm{CFT}_{\mathrm{UV}}+\text{deformation}\ \longrightarrow\ \text{RG flow}\ \longrightarrow\ \mathrm{CFT}_{\mathrm{IR}}\ \text{(when an IR fixed point exists)}`),
    p('In the bulk this running is represented by radial profiles and, for finite deformations, a backreacted geometry rather than unmodified pure AdS everywhere. The ultraviolet and infrared AdS regions may have different radii.'),
  ], ['renormalization', 'radial-scale', 'mass-dimension', 'fixed-points'], 5, [[429,449]], [39]),

  s('reading-bf-derivation', 'bridge', 4, 15, 'Why negative mass squared need not be unstable', 'AdS curvature shifts the stability threshold. The useful quantity is m²L² + d²/4.', [
    m(r`E^2=\vec p^{\,2}+m^2\quad\text{in flat spacetime}`, 'For m² < 0, sufficiently small flat-space momentum would give an imaginary frequency. AdS is not flat: its radial geometry and boundary conditions change this argument.'),
    m(r`\Delta_\pm=\frac d2\pm\sqrt{\frac{d^2}{4}+m^2L^2}\quad\Longrightarrow\quad m^2L^2\ge-\frac{d^2}{4}`, 'Real scalar dimensions require the Breitenlohner–Freedman (BF) bound. A quadratic-form calculation shows where the geometric shift comes from.'),
    m(r`S_{\mathrm{radial}}=\frac{L^{d-1}}2\int dz\,d^dx\,z^{-d-1}\left[z^2(\partial_z\phi)^2+m^2L^2\phi^2\right]`, 'For this calculation take ∂μφ = 0. Use z measured in a fixed reference length so log z is dimensionless.'),
    m(r`y=\log z,\quad dz=z\,dy,\quad \partial_z=z^{-1}\partial_y,\quad \phi=z^{d/2}\varphi=e^{dy/2}\varphi`, 'Changing to logarithmic radius and rescaling the field cancel the radial measure factor.'),
    m(r`z\partial_z\phi=e^{dy/2}\left(\partial_y\varphi+\frac d2\varphi\right),\quad \left(\partial_y\varphi+\frac d2\varphi\right)^2=(\partial_y\varphi)^2+d\varphi\partial_y\varphi+\frac{d^2}{4}\varphi^2`),
    m(r`d\varphi\partial_y\varphi=\frac d2\partial_y(\varphi^2),\qquad S_{\mathrm{radial}}=\frac{L^{d-1}}2\int dy\,d^dx\left[(\partial_y\varphi)^2+\left(m^2L^2+\frac{d^2}{4}\right)\varphi^2\right]+\text{boundary term}`, 'The middle term is a total derivative. With suitable boundary conditions, it does not change the bulk quadratic-form positivity test.'),
    m(r`m^2_{\mathrm{radial,eff}}=m^2+\frac{d^2}{4L^2}\ge0\quad\Longleftrightarrow\quad m^2L^2\ge-\frac{d^2}{4}`),
    note('Scope of the argument', 'This is a useful free-scalar stability criterion with admissible boundary conditions, not a guarantee that every interacting background above the BF bound is stable. At equality the two powers coincide and the second solution is z^(d/2) log z.'),
  ], ['bf-bound', 'mass-dimension', 'stability'], 5, [[450,473],[442,445]], [39]),

  s('reading-alternate-quantization', 'bridge', 4, 16, 'Sometimes either coefficient can be the source', 'The same mass can define different boundary theories when both falloffs admit consistent boundary conditions.', [
    p('Standard quantization gives Δ₊ ≥ d/2. But unitary CFTs in d > 2 allow nonidentity scalar primaries down to (d−2)/2. Where are these lower-dimension operators on the bulk side?'),
    m(r`\mathcal O\leftrightarrow|\mathcal O\rangle,\quad \partial_\mu\mathcal O\leftrightarrow P_\mu|\mathcal O\rangle,\quad \|P^2|\mathcal O\rangle\|^2\propto\Delta\left(\Delta-\frac{d-2}{2}\right)`, 'Radial quantization turns operators into states. Positivity of descendant norms gives the scalar unitarity bound; the identity with Δ = 0 is exceptional.'),
    m(r`\Delta\ge\frac{d-2}{2},\qquad \Delta_-\ge\frac{d-2}{2}\quad\Longleftrightarrow\quad\frac d2-\nu\ge\frac d2-1\quad\Longleftrightarrow\quad\nu\le1`),
    m(r`0<\nu<1\quad\Longleftrightarrow\quad-\frac{d^2}{4}<m^2L^2<-\frac{d^2}{4}+1`, 'This is the generic open window admitting both quantizations. The simple unitarity inequality allows endpoints algebraically, but they require separate treatment.'),
    m(r`\phi=z^{\Delta_-}a(x)+z^{\Delta_+}b(x)+\cdots,\qquad\begin{array}{c|c|c}\text{choice}&\text{source}&\text{operator dimension}\\\text{standard}&a&\Delta_+\\\text{alternate}&b&\Delta_-\end{array}`, 'The response is the other coefficient with an appropriate normalization. The alternate generating functional is obtained by a Legendre transform, not by simply deleting the leading term.'),
    p('One operator in one selected CFT does not have both dimensions simultaneously. Choosing what to hold fixed changes the boundary theory. The full bulk solution can contain both powers in either quantization.'),
    note('Endpoints and norms', 'At ν = 0 the roots merge and logarithms appear. At ν = 1 the alternate scalar saturates the free-field bound and needs special treatment. The relevant admissibility test uses the Klein–Gordon/symplectic norm, not the Euclidean L² integral displayed earlier.'),
  ], ['alternate-quantization', 'source-response', 'unitarity', 'mass-dimension'], 5, [[474,510]], [40]),

  s('reading-spinning-dictionary', 'bridge', 4, 17, 'Spin changes the mass–dimension relation', 'A scalar, vector, spinor and graviton obey different wave equations. Their dictionary entries cannot all use the scalar formula.', [
    m(r`\mathrm{Spin}(4)\simeq SU(2)_L\times SU(2)_R,\qquad SO(4)\simeq\frac{SU(2)_L\times SU(2)_R}{\mathbb Z_2}`, 'In four Euclidean boundary dimensions, rotation representations carry two spins (jL,jR). The group equality in the notes needs the double-cover qualification. Lorentzian spins use the corresponding complexified Lorentz algebra and a different real form.'),
    m(r`\begin{array}{c|c|c}\text{field}&(j_L,j_R)&\text{mass and dimension}\\\phi&(0,0)&m^2L^2=\Delta(\Delta-d)\\ A_\mu&(\frac12,\frac12)&m^2L^2=(\Delta-1)(\Delta-d+1)\\ B_{\mu\nu}&(1,0)\oplus(0,1)&m^2L^2=(\Delta-2)(\Delta-d+2)\end{array}`, 'Spin labels in this table are specifically four-dimensional. The p-form mass formula itself generalizes to boundary dimension d.'),
    m(r`m^2L^2=(\Delta-p)(\Delta+p-d)\qquad\text{for a transverse massive }p\text{-form}`, 'Insert p = 1 for a vector and p = 2 for a two-form.'),
    m(r`\psi:\ (\tfrac12,0)\oplus(0,\tfrac12),\qquad \Delta=\frac d2+|mL|`, 'The Dirac equation is first order; the shift is linear in |mL|. The screenshot’s m²L² = Δ−d/2 is not the usual Dirac mass formula.'),
    m(r`\psi_\mu:\ (\tfrac12,1)\oplus(1,\tfrac12),\qquad \Delta=\frac d2+|m_{\mathrm{RS}}L|`, 'For the gamma-traceless spin-3/2 branch, mRS is the mass parameter in the chosen first-order Rarita–Schwinger equation. A gauge-invariant AdS gravitino has a curvature-dependent mass parameter; do not simply set mRS = 0.'),
    m(r`A_M\text{ massless}:\quad\Delta_J=d-1;\qquad g_{MN}\text{ massless spin 2}:\quad\Delta_T=d`, 'The physical branches match a conserved current and the conserved stress tensor. In CFT₄ their dimensions are 3 and 4; the symmetric traceless spin-two representation is (1,1).'),
    m(r`R_{\mathrm{AdS}_{d+1}}=-\frac{d(d+1)}{L^2},\qquad S\supset\frac12\int\sqrt g\,(m_0^2+\xi R)\phi^2,\qquad m_{\mathrm{wave}}^2=m_0^2+\xi R`, 'A curvature coupling shifts the mass entering the scalar wave equation and its mass–dimension formula. This is a separate issue from the d²/4 shift found after the radial field redefinition.'),
  ], ['mass-dimension', 'spin', 'global-gauge', 'stress-tensor', 'group-theory'], 5, [[511,541]], [40]),

  s('reading-correlator-roadmap', 'bridge', 4, 18, 'Now calculate a boundary correlation function', 'We know what the source means. Next solve for its bulk profile, turn that profile into an action, and differentiate.', [
    m(r`S_E=\int d^{d+1}X\sqrt g\left[\frac12\sum_i\bigl((\nabla\phi_i)^2+m_i^2\phi_i^2\bigr)+\frac1{3!}\lambda_{ijk}\phi_i\phi_j\phi_k+\cdots\right]`, 'Each bulk field φi has a source φi⁰ and a dual operator Oi. Factorial conventions merely change the definition of the couplings.'),
    m(r`\phi_i\sim z^{d-\Delta_i}\phi_i^0(x)+z^{\Delta_i}\phi_i^1(x)+\cdots,\qquad \langle\mathcal O_1\cdots\mathcal O_n\rangle_c=\left.\frac{\delta^nW}{\delta\phi_1^0\cdots\delta\phi_n^0}\right|_0`, 'Use W ≃ −SE,ren with the source-sign convention already fixed. The positive derivatives of S in some screenshots omit this sign.'),
    steps('Free propagation already produces the quadratic source dependence needed for a two-point function.', 'A cubic interaction can produce a three-point function.', 'A quartic contact term or two cubic vertices connected by a bulk line can produce four-point functions.', 'At tree level around a zero-field vacuum, vertices with more than n fields cannot contribute to an n-point function. Loops or nonzero backgrounds change that counting.'),
    m(r`W[h]=W[0]+\int h\langle\mathcal O\rangle_0+\frac12\int h(x)h(y)\langle\mathcal O(x)\mathcal O(y)\rangle_c+\cdots`, 'The number of source powers—not just the number of fields in one displayed term—determines which derivative survives at zero source.'),
  ], ['correlators', 'gkpw', 'witten-diagrams'], 5, [[548,578]], [41,43]),

  s('reading-kernel-problem', 'bridge', 4, 19, 'K solves one boundary point at a time', 'Linearity lets us build an arbitrary bulk solution by adding the profiles produced by point sources.', [
    m(r`\phi(z,x)=\int d^dx'\,K_\Delta(z,x;x')\phi_0(x')`, 'x′ labels where the source is applied on the boundary. X = (z,x) labels where we evaluate the bulk field. Translation invariance along the boundary makes K depend on x−x′.'),
    m(r`(-\nabla_X^2+m^2)K_\Delta(X;x')=0\qquad(z>0)`, 'The source is at the boundary, not a delta function in the bulk. Applying the differential operator inside the integral must give zero for every chosen φ₀.'),
    m(r`\lim_{z\to0}z^{\Delta-d}K_\Delta(z,x;x')=\delta^{(d)}(x-x')\quad\text{as a distribution}`, 'This limit means: integrate against a smooth test source first, and then take z → 0. It does not say that a delta function is an ordinary pointwise function.'),
    m(r`\lim_{z\to0}z^{\Delta-d}\phi(z,x)=\int d^dx'\,\delta^{(d)}(x-x')\phi_0(x')=\phi_0(x)`, 'This recovers exactly the prescribed source coefficient.'),
    m(r`(-\nabla_X^2+m^2)G(X;Y)=\frac{\delta^{(d+1)}(X-Y)}{\sqrt{g(X)}}`, 'G is different: it propagates from a source inside the bulk to another bulk point. Its covariant delta function is normalized with the invariant bulk measure.'),
  ], ['bulk-boundary-kernel', 'source-response', 'correlators'], 5, [[579,595]], [41,43]),

  s('reading-kernel-inversion', 'bridge', 4, 20, 'Use an isometry instead of solving the equation again', 'The simple solution z^Δ becomes the localized bulk-to-boundary kernel after inversion.', [
    m(r`\mathbb R^d\cup\{\infty\}\simeq S^d`, 'The Euclidean upper-half-space boundary becomes a sphere after including its point at infinity. For d = 4 this is S⁴.'),
    p('The elementary solution φ = z^Δ has no ordinary source at finite boundary x, after applying the correct source rescaling. In the compactified description its source is concentrated at the point at infinity. We move that point to the origin using an AdS isometry.'),
    m(r`z'=\frac{a^2z}{z^2+|x|^2},\qquad x'^\mu=\frac{a^2x^\mu}{z^2+|x|^2}`, 'a is a fixed reference length; it keeps the units explicit. The notes set a = 1. In Euclidean signature the denominator is positive for z > 0.'),
    m(r`z=0:\quad x'^\mu=\frac{a^2x^\mu}{|x|^2},\qquad |x'|=\frac{a^2}{|x|}`, 'Thus boundary infinity maps to the origin. The bulk map preserves ds² and hence maps solutions of the scalar equation to solutions.'),
    m(r`z^\Delta\ \longmapsto\ \left(\frac{z}{z^2+|x|^2}\right)^\Delta\times\text{constant}`, 'Because φ is a scalar, substitute the inverted coordinate in the original solution. The reference-length factor is absorbed into the normalization.'),
    m(r`K_\Delta(z,x;x')=c_\Delta\left(\frac{z}{z^2+|x-x'|^2}\right)^\Delta`, 'A translation moves the origin source to x′. The shape is now known; only cΔ remains to be fixed.'),
    p('This is a Euclidean boundary-value calculation, like finding an interior temperature from boundary data. The kernel is not a movie of a particle or signal travelling instantaneously from the boundary.'),
  ], ['bulk-boundary-kernel', 'isometry', 'conformal-symmetry'], 5, [[596,631]], [41,42]),

  s('reading-kernel-normalization', 'bridge', 4, 21, 'Where the normalization and delta-function limit come from', 'The coefficient must reproduce a source with exactly its original strength—not merely the right shape.', [
    m(r`\phi(z,0)=c_\Delta\int d^dx'\frac{z^\Delta}{(z^2+|x'|^2)^\Delta}\phi_0(x')`),
    m(r`x'=zy,\quad d^dx'=z^d d^dy,\quad(z^2+|x'|^2)^\Delta=z^{2\Delta}(1+|y|^2)^\Delta`, 'We zoom into the shrinking neighbourhood around the source. Keep z in every measure and denominator factor.'),
    m(r`z^{\Delta-d}\phi(z,0)=c_\Delta\int d^dy\frac{\phi_0(zy)}{(1+|y|^2)^\Delta}\ \longrightarrow\ c_\Delta\phi_0(0)\int\frac{d^dy}{(1+|y|^2)^\Delta}`, 'For a smooth bounded source and Δ > d/2, the normalized weight is integrable. This justifies taking the limit after the rescaling.'),
    m(r`c_\Delta^{-1}=\int\frac{d^dy}{(1+|y|^2)^\Delta}=\frac{2\pi^{d/2}}{\Gamma(d/2)}\int_0^\infty\frac{r^{d-1}\,dr}{(1+r^2)^\Delta}`),
    m(r`u=r^2\quad\Longrightarrow\quad c_\Delta^{-1}=\frac{\pi^{d/2}}{\Gamma(d/2)}B\!\left(\frac d2,\Delta-\frac d2\right)=\pi^{d/2}\frac{\Gamma(\Delta-d/2)}{\Gamma(\Delta)}`),
    m(r`c_\Delta=\frac{\Gamma(\Delta)}{\pi^{d/2}\Gamma(\Delta-d/2)},\qquad c_3\big|_{d=4}=\frac2{\pi^2}`, 'The ordinary integral requires Δ > d/2. The BF endpoint and alternate quantization need their own limiting or transformed prescription.'),
    p('The rescaled kernel gets narrower and taller while its total integral stays one. Away from x = x′ it tends to zero, but the integral retains the full source value. That is precisely the distributional delta-function limit.'),
  ], ['bulk-boundary-kernel', 'limits', 'correlators'], 5, [[632,640]], [42]),

  s('reading-response-kernel', 'bridge', 4, 22, 'Read the response without losing the source', 'The same kernel contains a sharply localized leading piece and a nonlocal subleading piece.', [
    m(r`K_\Delta(z,x;x')=\frac{c_\Delta z^\Delta}{|x-x'|^{2\Delta}}+O(z^{\Delta+2})\qquad(x\ne x')`, 'This expansion holds at separated points. It is not uniform near x = x′.'),
    m(r`\phi(z,x)=z^{d-\Delta}\phi_0(x)+\cdots+z^\Delta\phi_1(x)+\cdots,\qquad \phi_1(x)=c_\Delta\operatorname{Ren}\!\int d^dx'\frac{\phi_0(x')}{|x-x'|^{2\Delta}}`, 'Ren means the singular coincidence region has been defined by renormalization. Extra local terms depend on that definition; the displayed separated-point kernel is unambiguous.'),
    p('Why can’t we simply set z = 0 in the denominator everywhere? Doing that before integration misses the shrinking neighbourhood where the source delta function lives. It can also turn a well-defined finite-z integral into a divergent integral. Extract the source distribution first, then identify the renormalized response.'),
    p('The response at x samples φ₀ at other positions x′. That nonlocal dependence is the beginning of the CFT correlator. No additional CFT field has been inserted into the bulk: the only input was a boundary condition.'),
  ], ['source-response', 'bulk-boundary-kernel', 'renormalization'], 5, [[641,648]], [42]),

  s('reading-onshell-boundary-term', 'bridge', 4, 23, 'Why the on-shell action becomes a boundary term', 'Integrating by parts isolates the bulk equation. On a solution that part vanishes, leaving the boundary flux.', [
    m(r`\nabla_M(\phi\nabla^M\phi)=(\nabla\phi)^2+\phi\nabla^2\phi`, 'This is the product rule in curved space.'),
    m(r`S_E=\frac12\int_{\partial M}d^dx\sqrt\gamma\,\phi n^M\partial_M\phi+\frac12\int_Md^{d+1}X\sqrt g\,\phi(-\nabla^2+m^2)\phi`, 'γ is the metric induced on the cutoff surface. g is the bulk metric. Their volume elements are different.'),
    m(r`(-\nabla^2+m^2)\phi_{\mathrm{cl}}=0\quad\Longrightarrow\quad S_{E,\mathrm{os}}=\frac12\int_{\partial M}d^dx\sqrt\gamma\,\phi n^M\partial_M\phi`),
    m(r`z\ge\epsilon:\qquad \gamma_{\mu\nu}=\frac{L^2}{\epsilon^2}\delta_{\mu\nu},\quad \sqrt\gamma=\frac{L^d}{\epsilon^d},\quad n^z=-\frac\epsilon L`, 'The outward normal at the lower cutoff points toward decreasing z. The minus sign is not optional if this is our integration domain.'),
    m(r`S_{E,\mathrm{os}}(\epsilon)=-\frac{L^{d-1}}2\int d^dx\,\epsilon^{1-d}\phi(\epsilon,x)\partial_z\phi(\epsilon,x)`, 'Assume the selected regular solution gives no additional interior contribution. For d = 4 the prefactor is −L³/(2ε³).'),
    m(r`\partial_z\phi=(d-\Delta)z^{d-\Delta-1}\phi_0+\Delta z^{\Delta-1}\phi_1+\cdots`),
    m(r`z^{1-d}\phi\partial_z\phi=(d-\Delta)z^{d-2\Delta}\phi_0^2+d\phi_0\phi_1+\Delta z^{2\Delta-d}\phi_1^2+\cdots`, 'The first term is local and usually divergent. The cross term is finite. The response-squared term vanishes for Δ > d/2. The omitted source-derivative terms may also require counterterms.'),
  ], ['on-shell-action', 'renormalization', 'source-response'], 5, [[649,664]], [42]),

  s('reading-holographic-renormalization', 'bridge', 4, 24, 'Remove local divergences, retain nonlocal physics', 'A cutoff exposes the divergent terms. Local boundary counterterms cancel them before the boundary limit is taken.', [
    m(r`S_{E,\mathrm{ren}}=\lim_{\epsilon\to0}\bigl(S_{E,\mathrm{os}}(\epsilon)+S_{\mathrm{ct}}(\epsilon)\bigr)`, 'The order matters: solve at regulated boundary data, add the required counterterms, and only then remove the cutoff.'),
    m(r`S_{\mathrm{ct}}\supset\frac{d-\Delta}{2L}\int_{z=\epsilon}d^dx\sqrt\gamma\,\phi^2`, 'For the displayed leading divergence, this term cancels the source-squared divergence. Additional derivative and possibly logarithmic counterterms are needed for general Δ and sources.'),
    m(r`\int d^dx\,\phi_0(x)^2,\quad\int d^dx\,\phi_0(x)\partial^2\phi_0(x)\qquad\text{are local}`, 'Every factor is evaluated at one x.'),
    m(r`\int d^dx\,\phi_0(x)\phi_1(x)\ \sim\ \operatorname{Ren}\!\int d^dx\,d^dy\frac{\phi_0(x)\phi_0(y)}{|x-y|^{2\Delta}}\qquad\text{is nonlocal}`, 'φ₁ is itself a nonlocal functional of φ₀. Writing two coefficients at the same x does not make this a local functional of the source.'),
    m(r`S_{E,\mathrm{ren}}^{\mathrm{nonlocal}}=-\frac{L^{d-1}}2(2\Delta-d)\int d^dx\,\phi_0(x)\phi_1(x)`, 'For the canonical scalar normalization, the leading counterterm also modifies the finite cross term: −d/2 + (d−Δ) = −(2Δ−d)/2. Dropping only the visibly divergent term would miss this coefficient.'),
    m(r`\frac{\delta^2}{\delta h(x)\delta h(y)}\int d^du\,h(u)^2=2\delta^{(d)}(x-y)`, 'A local term contributes only at coincidence, possibly with derivatives of delta functions. Such contact terms can depend on the renormalization scheme.'),
    p('The nonlocal separated-point correlator cannot be removed by a local counterterm. Logarithmic divergences can encode a Weyl anomaly, so they must be treated systematically rather than dismissed as meaningless infinity.'),
  ], ['renormalization', 'on-shell-action', 'correlators'], 5, [[665,676]], [42,44]),

  s('reading-first-correlators', 'bridge', 4, 25, 'One derivative is the response; two give the correlator', 'The bulk calculation now produces the same power law that conformal symmetry demanded.', [
    m(r`W=-S_{E,\mathrm{ren}}+\text{constant},\qquad \langle\mathcal O(x)\rangle_{\phi_0}=\frac{\delta W}{\delta\phi_0(x)}=L^{d-1}(2\Delta-d)\phi_1(x)+\text{local terms}`, 'The two symmetric source factors cancel the 1/2 in the quadratic functional. An overall coefficient in the bulk scalar action would multiply this result.'),
    m(r`\langle\mathcal O(x)\mathcal O(y)\rangle_c=\left.\frac{\delta\langle\mathcal O(x)\rangle_{\phi_0}}{\delta\phi_0(y)}\right|_0=\frac{L^{d-1}(2\Delta-d)c_\Delta}{|x-y|^{2\Delta}}\qquad(x\ne y)`),
    m(r`d=4,\ m^2L^2=-3:\quad\Delta=3,\quad c_3=\frac2{\pi^2},\quad\langle\mathcal O(x)\mathcal O(y)\rangle_c=\frac{4L^3}{\pi^2|x-y|^6}`, 'This numerical coefficient assumes precisely our canonical bulk normalization. Rescaling O or the action changes the coefficient, not the conformal power.'),
    p('At zero source the regular free vacuum solution has φ₀ = φ₁ = 0, so the one-point function vanishes. The derivative of a response can still be nonzero at zero input—just as f(h) = Ch has f(0) = 0 but f′(0) = C.'),
    m(r`\langle\mathcal O(x)\rangle=C,\qquad C=a^{-\Delta}C\ \text{for every }a\quad\Longrightarrow\quad C=0\quad(\Delta\ne0)`, 'Translations make a scalar vacuum one-point function constant; scale invariance then forces it to vanish for nonzero Δ. The identity is an exception.'),
    note('The state matters', 'Zero source does not force every state to have zero response. A thermal, excited or symmetry-breaking state can have a normalizable bulk profile and a nonzero expectation value. The vanishing statement here refers to the selected conformally invariant vacuum.'),
    p('We have completed the chain: bulk mass → radial powers → source and response → renormalized action → CFT two-point function. The CFT result was computed through the bulk, but its two insertion points still lie in boundary spacetime.'),
  ], ['correlators', 'source-response', 'mass-dimension', 'gkpw'], 5, [[677,701]], [42,43]),

  s('reading-witten-diagrams', 'bridge', 4, 26, 'Interactions in the bulk give higher CFT correlators', 'Boundary insertions mark which CFT question we ask. The interaction vertices live in AdS.', [
    m(r`\phi^{(0)}(X)=\int d^dx\,K(X;x)\phi_0(x),\qquad(-\nabla^2+m^2)\phi=\lambda\phi^n`, 'Treat the nonlinear term as a source. Its exact sign and coefficient follow from the chosen potential; n here labels the equation’s power, not necessarily the number of external operators.'),
    m(r`\phi^{(1)}(X)=\lambda\int_Md^{d+1}Y\sqrt{g(Y)}\,G(X;Y)[\phi^{(0)}(Y)]^n`, 'Use a bulk Green function whose boundary condition adds no new source coefficient. G depends separately on radial positions z and z′; it is not generally a function of z−z′.'),
    p('Every field in the on-shell action is ultimately a functional of the boundary source. To obtain an n-point function, extract the term with exactly n source powers by differentiating n times and then setting the source to zero.'),
    m(r`\left.\frac{d^3}{dh^3}(Ah^2+Bh^3+Ch^4)\right|_{h=0}=6B`, 'The quadratic term differentiates away and the quartic term leaves an h that vanishes. Functional derivatives do the same bookkeeping while retaining spacetime positions.'),
    m(r`\langle\mathcal O_i(x_1)\mathcal O_j(x_2)\mathcal O_k(x_3)\rangle\ \propto\ \lambda_{ijk}\int_{\mathrm{AdS}}d^{d+1}X\sqrt g\,K_i(X;x_1)K_j(X;x_2)K_k(X;x_3)`, 'A cubic Witten diagram has three boundary-to-bulk legs meeting at one integrated bulk point. Overall signs and factorials depend on the interaction convention.'),
    m(r`\langle\mathcal O_i(x_1)\mathcal O_j(x_2)\mathcal O_k(x_3)\rangle=\frac{C_{ijk}}{x_{12}^{\Delta_i+\Delta_j-\Delta_k}x_{23}^{\Delta_j+\Delta_k-\Delta_i}x_{31}^{\Delta_k+\Delta_i-\Delta_j}},\qquad x_{ab}=|x_a-x_b|`, 'The bulk integral reproduces exactly the conformally required form. Cijk is proportional to the bulk cubic coupling, with dimension-dependent kernel and integral factors.'),
    m(r`\mathcal A_4^{\mathrm{exchange}}\propto\lambda_{12a}\lambda_{a34}\int dX\sqrt{g_X}\,dY\sqrt{g_Y}\,K_1(X)K_2(X)G_a(X;Y)K_3(Y)K_4(Y)`, 'For exchange, two cubic vertices are joined by an internal bulk-to-bulk line. Include other channels and quartic contacts when the action requires them.'),
    steps('External K lines connect boundary insertions to bulk points.', 'Internal G lines connect two bulk points.', 'Each vertex is integrated with √g over the bulk.', 'The resulting function depends on the boundary insertion positions and satisfies CFT symmetry constraints.'),
  ], ['witten-diagrams', 'correlators', 'bulk-boundary-kernel'], 5, [[747,792]], [43,44]),

  s('reading-current-two-point', 'bridge', 4, 27, 'A conserved current gives one more precise match', 'The scalar calculation generalizes to vectors, but the tensor structure now carries essential information.', [
    m(r`\langle J_\mu(x)J_\nu(y)\rangle=\frac{C_J I_{\mu\nu}(r)}{|r|^{2(d-1)}},\qquad I_{\mu\nu}(r)=\delta_{\mu\nu}-2\frac{r_\mu r_\nu}{r^2},\quad r=x-y`, 'I is the reflection tensor associated with inversion. It supplies the two vector indices while conformal covariance fixes the distance power.'),
    m(r`d=4:\qquad\langle J_\mu(x)J_\nu(y)\rangle=C_J\left(\frac{\delta_{\mu\nu}}{|r|^6}-2\frac{r_\mu r_\nu}{|r|^8}\right),\qquad\Delta_J=3`, 'The factor |r|⁻⁶ means 2ΔJ = 6. The second term has the same total length dimension because its numerator supplies two powers.'),
    m(r`\partial_{r^\mu}\frac{\delta_{\mu\nu}}{|r|^6}=-6\frac{r_\nu}{|r|^8},\qquad \partial_{r^\mu}\left(-2\frac{r_\mu r_\nu}{|r|^8}\right)=+6\frac{r_\nu}{|r|^8}`, 'The terms cancel in four dimensions at r ≠ 0, checking current conservation. Coincident points can carry Ward-identity contact terms.'),
    m(r`m_A^2L^2=0=(\Delta-1)(\Delta-d+1)\quad\Longrightarrow\quad\Delta_J=d-1`, 'The physical conserved-current branch agrees with the massless bulk gauge field. CJ depends on the bulk gauge-action normalization.'),
    p('Again, the boundary object is a gauge-invariant global current, not a gauge-dependent elementary potential. This closes the chapter’s first dictionary: dimensions from masses, sources from boundary falloffs, responses from normalizable data, and correlators from renormalized bulk actions.'),
  ], ['ward-identity', 'correlators', 'global-gauge', 'mass-dimension'], 5, [[834,840]], [45]),
];
