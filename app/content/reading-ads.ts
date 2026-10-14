import type { ReadingBlock, ReadingSection } from './reading-types';

const r = String.raw;
const p = (text: string): ReadingBlock => ({ type: 'p', text });
const m = (tex: string, explain?: string): ReadingBlock => ({ type: 'math', tex, explain });
const note = (title: string, text: string): ReadingBlock => ({ type: 'callout', title, text });
const steps = (...items: string[]): ReadingBlock => ({ type: 'steps', items });
const s = (id: string, side: ReadingSection['side'], chapter: number, index: number, title: string, lead: string, blocks: ReadingBlock[], concepts: string[], tab: number, ranges: [number, number][], lecturePages: number[]): ReadingSection => ({ id, side, chapter, order: chapter * 100 + index, title, lead, blocks, concepts, source: { tab, ranges, lecturePages } });

/** Native-math rewrite of the green-selected AdS notes and all chapter 7.
 * Source ranges are inclusive paragraph block IDs in tmp/notes-current-review/tab-N.json.
 * Repeated screenshots are consolidated. Corrections are visible, not silently inherited.
 */
export const readingAds: ReadingSection[] = [
  s('reading-ads-curvature', 'ads', 3, 1, 'Start with curvature—not with a drawing', 'AdS is a maximally symmetric spacetime with constant negative curvature. Its embedding is a way to calculate that geometry.', [
    m(r`R_{MN}-\frac12Rg_{MN}+\Lambda g_{MN}=0`, 'This is Einstein’s vacuum equation with cosmological constant. Λ is an allowed generally covariant term in the action; it does not describe an ordinary material source.'),
    p('Write D for the spacetime dimension and d = D − 1 for the eventual boundary dimension. Maximal symmetry fixes the entire curvature tensor in terms of one number K.'),
    m(r`R_{MNPQ}=K(g_{MP}g_{NQ}-g_{MQ}g_{NP}),\quad R_{MN}=(D-1)Kg_{MN},\quad R=D(D-1)K`),
    m(r`\left(1-\frac D2\right)R+D\Lambda=0\quad\Longrightarrow\quad R=\frac{2D\Lambda}{D-2},\qquad R_{MN}=\frac{2\Lambda}{D-2}g_{MN}`, 'The trace gives these equations for D > 2. In two dimensions the Einstein tensor vanishes identically, so the same division cannot be used.'),
    m(r`K_{\mathrm{AdS}}=-\frac1{L^2},\quad R_{\mathrm{AdS}_D}=-\frac{D(D-1)}{L^2},\quad \Lambda=-\frac{(D-1)(D-2)}{2L^2}`, 'L is a length: a larger L means weaker curvature. For maximally symmetric Lorentzian spaces, K > 0 gives de Sitter, K = 0 Minkowski, and K < 0 anti-de Sitter.'),
    note('A necessary qualification', 'A vanishing scalar curvature alone does not imply flat spacetime. That conclusion needs the maximally symmetric assumption. Later, AdS₅ × S⁵ has total R = 0 although both factors are curved.'),
  ], ['curvature', 'cosmological-constant'], 4, [[12,16]], [24,25]),

  s('reading-ads-sphere', 'ads', 3, 2, 'The sphere teaches us the embedding method', 'A constraint removes one coordinate. Substituting its parametrization into the ambient metric gives the metric on the surface.', [
    m(r`x^2+y^2+z^2=L^2,\qquad ds^2_{\mathbb R^3}=dx^2+dy^2+dz^2`),
    m(r`x=L\sin\theta\cos\varphi,\quad y=L\sin\theta\sin\varphi,\quad z=L\cos\theta`, 'The three ambient coordinates are functions of only two independent coordinates, θ and φ.'),
    m(r`g_{ab}=\delta_{ij}\frac{\partial X^i}{\partial \sigma^a}\frac{\partial X^j}{\partial \sigma^b},\qquad ds^2_{S^2}=L^2(d\theta^2+\sin^2\theta\,d\varphi^2),\qquad R_{S^2}=\frac2{L^2}`, 'The induced metric measures distances along the sphere. It is not the flat metric of the containing three-dimensional space.'),
    m(r`\sum_{i=1}^{D+1}X_i^2=L^2,\qquad S^D\subset\mathbb R^{D+1},\qquad \dim SO(D+1)=\frac{D(D+1)}2`, 'D + 1 ambient coordinates minus one constraint leave D dimensions. The rotations preserving the constraint are its continuous isometries.'),
    p('Now change the signs of the quadratic form. The shape changes, but so can the signature of the induced metric. The ambient metric and the constraint must be specified together: a hyperboloid drawn in ordinary Euclidean three-space is not automatically AdS.'),
  ], ['embedding', 'isometry', 'curvature'], 4, [[27,35],[42,49],[62,62],[101,101]], [24,25]),

  s('reading-ads-hyperbolic-plane', 'ads', 3, 3, 'H₂ means the hyperbolic plane: Euclidean AdS₂', 'There is one minus sign in the embedding, but the induced metric has no timelike direction.', [
    m(r`-x^2+y^2+z^2=-L^2,\quad x>0,\qquad ds^2_{\mathrm{ambient}}=-dx^2+dy^2+dz^2`, 'Choose one sheet. The normal direction is timelike; after restricting to the surface, both tangent directions are spacelike.'),
    m(r`x=L\cosh\rho\cosh\tau,\quad y=L\cosh\rho\sinh\tau,\quad z=L\sinh\rho,\qquad \rho,\tau\in\mathbb R`),
    m(r`-x^2+y^2+z^2=-L^2\cosh^2\rho(\cosh^2\tau-\sinh^2\tau)+L^2\sinh^2\rho=-L^2`, 'Both cancellations use cosh²u − sinh²u = 1. This verifies the constraint before we calculate any distance.'),
    m(r`\begin{aligned}dx&=L\sinh\rho\cosh\tau\,d\rho+L\cosh\rho\sinh\tau\,d\tau,\\dy&=L\sinh\rho\sinh\tau\,d\rho+L\cosh\rho\cosh\tau\,d\tau,\\dz&=L\cosh\rho\,d\rho.\end{aligned}`),
    m(r`-dx^2+dy^2=-L^2\sinh^2\rho\,d\rho^2+L^2\cosh^2\rho\,d\tau^2`),
    m(r`ds^2_{H_2}=L^2(d\rho^2+\cosh^2\rho\,d\tau^2),\qquad R=-\frac2{L^2}`, 'Adding dz² turns the first coefficient into L². Both signs are positive. τ is therefore not physical time in this Euclidean metric, despite its name.'),
    p('This two-dimensional space has three independent Killing fields. A Killing field generates a transformation that leaves the metric unchanged. The sheet-preserving connected isometry group has Lie algebra so(2,1).'),
  ], ['embedding', 'euclidean-ads', 'curvature'], 4, [[126,159]], [25,26]),

  s('reading-ads-euclidean-dimension', 'ads', 3, 4, 'Add dimensions by replacing a coordinate with a sphere', 'The angular sphere records directions. Its radius records distance from an axis.', [
    m(r`-x^2+y^2+\vec z^{\,2}=-L^2,\qquad \vec z=L\sinh\rho\,\Omega,\qquad \Omega\cdot\Omega=1`, 'Here z⃗ has d components. Ω lies on Sᵈ⁻¹, so it supplies d − 1 angles.'),
    m(r`\Omega\cdot d\Omega=0,\qquad d\vec z^{\,2}=L^2\cosh^2\rho\,d\rho^2+L^2\sinh^2\rho\,d\Omega_{d-1}^2`, 'Differentiate Ω·Ω = 1. The mixed radial–angular term vanishes because Ω·dΩ = 0.'),
    m(r`ds^2_{H_{d+1}}=L^2\left(d\rho^2+\cosh^2\rho\,d\tau^2+\sinh^2\rho\,d\Omega_{d-1}^2\right)`, 'For d ≥ 2 use ρ ≥ 0 and the angular sphere; the earlier H₂ formula instead allowed a signed ρ. Count 1 radial + 1 axial + (d − 1) angular = d + 1 dimensions.'),
    m(r`R=-\frac{d(d+1)}{L^2},\qquad \mathfrak{isom}(H_{d+1})=\mathfrak{so}(d+1,1)`, 'Euclidean AdS is hyperbolic space Hᵈ⁺¹. A higher-dimensional sphere in a picture is represented by a lower-dimensional section; the displayed circle is not all of its angular directions.'),
  ], ['embedding', 'euclidean-ads', 'isometry'], 4, [[160,184]], [26]),

  s('reading-ads-global', 'ads', 3, 5, 'Lorentzian AdS has one physical time', 'Two timelike embedding directions minus one timelike normal leave one timelike direction on AdS.', [
    m(r`-X_{-1}^2-X_0^2+\sum_{i=1}^{d}X_i^2=-L^2,\qquad ds^2_{\mathrm{ambient}}=-dX_{-1}^2-dX_0^2+\sum_i dX_i^2`),
    m(r`X_{-1}=L\cosh\rho\cos t,\quad X_0=L\cosh\rho\sin t,\quad X_i=L\sinh\rho\,\Omega_i`),
    m(r`ds^2_{\mathrm{AdS}_{d+1}}=L^2\left(-\cosh^2\rho\,dt^2+d\rho^2+\sinh^2\rho\,d\Omega_{d-1}^2\right)`, 'Substitution works exactly as for H₂, but cos²t + sin²t replaces the hyperbolic identity. The coefficient of dt² is negative: t is now timelike.'),
    m(r`d\Omega_1^2=d\varphi^2,\qquad d\Omega_2^2=d\theta^2+\sin^2\theta\,d\varphi^2`, 'In AdS₂ the angular factor is absent and one can use −∞ < ρ < ∞. In higher dimensions use ρ ≥ 0 with the appropriate sphere.'),
    p('The embedded hyperboloid identifies t with t + 2π. A curve with fixed ρ and fixed angles is timelike, so this identification creates closed timelike curves. Physical AdS normally means its universal cover: unwrap t onto the entire real line. The local metric and curvature do not change.'),
    m(r`t\in\mathbb R,\qquad \widetilde{\mathrm{AdS}}_{d+1}\simeq\mathbb R\times\mathbb R^d,\qquad \partial\widetilde{\mathrm{AdS}}_{d+1}\simeq\mathbb R\times S^{d-1}`, 'The bulk spatial slice is hyperbolic space, topologically ℝᵈ. It is the conformal boundary—not the bulk—that has the cylinder topology ℝ × Sᵈ⁻¹.'),
    note('Wick rotation is not a real change of coordinates', 'Analytically continuing t = −iτ gives the corresponding Euclidean metric. It changes the signature. Unwrapping time, by contrast, changes a global identification without changing the Lorentzian signature.'),
  ], ['global-ads', 'embedding', 'causal-structure', 'conformal-symmetry'], 4, [[186,240]], [26,27,28]),

  s('reading-ads-compactification', 'ads', 3, 6, 'Bring infinity onto the page without changing light cones', 'A conformal diagram discards an overall positive scale factor. It preserves causality, not physical distances.', [
    m(r`g_{MN}=\Omega^2\widetilde g_{MN}\quad\Longrightarrow\quad g(v,v)=\Omega^2\widetilde g(v,v)`, 'For Ω² > 0 in the interior, timelike, spacelike and null vectors keep their sign. Their numerical lengths need not agree.'),
    m(r`\tan\chi=\sinh\rho,\quad \cosh\rho=\sec\chi,\quad d\rho=\sec\chi\,d\chi,\quad 0\leq\chi<\frac\pi2`),
    m(r`ds^2=\frac{L^2}{\cos^2\chi}\left(-dt^2+d\chi^2+\sin^2\chi\,d\Omega_{d-1}^2\right)`, 'Global infinity ρ → ∞ becomes the finite coordinate position χ = π/2. The divergent prefactor still remembers that infinity is infinitely far in the physical spatial metric.'),
    m(r`d\widetilde s^2=-dt^2+d\chi^2+\sin^2\chi\,d\Omega_{d-1}^2,\qquad d\widetilde s^2_{\partial}=-dt^2+d\Omega_{d-1}^2`, 'Rescale first; only then restrict to χ = π/2. Directly substituting into the physical metric gives a divergence, not a finite boundary metric.'),
    m(r`\text{radial light:}\quad 0=-dt^2+d\chi^2\quad\Longrightarrow\quad \frac{dt}{d\chi}=\pm1`, 'This is why radial null rays are diagonal at 45° when both axes use the same scale.'),
    m(r`\Delta t_{\mathrm{centre}\to\partial}=\frac\pi2,\qquad \Delta\tau_{\mathrm{centre}}=\frac{\pi L}{2}`, 'A radial light ray reaches the conformal boundary in finite global coordinate time. The central observer’s proper time is L times t. This does not mean a massive observer reaches spatial infinity in finite proper distance.'),
  ], ['conformal-boundary', 'causal-structure', 'global-ads'], 4, [[247,271],[352,390]], [28,29]),

  s('reading-ads-boundary-data', 'ads', 3, 7, 'Why the boundary matters to a bulk calculation', 'Initial data alone do not determine the future in AdS unless we also specify what happens at its timelike boundary.', [
    m(r`\phi|_{\Sigma},\quad n^M\nabla_M\phi|_{\Sigma}\qquad +\qquad\text{boundary conditions}`, 'A second-order hyperbolic equation needs the field and its normal derivative initially. In AdS, signals can also enter from the boundary, so that extra input matters.'),
    p('At fixed boundary angles, the rescaled line element is −dt². The AdS boundary is therefore timelike, not null. A change of boundary source can affect bulk events in its causal future. Reflecting conditions instead keep the system closed by specifying how outgoing disturbances return.'),
    m(r`\int_M d^{d+1}x\,\sqrt{|g|}\,\nabla_MJ^M=\int_{\partial M}d^dx\,\sqrt{|\gamma|}\,n_MJ^M`, 'Integration by parts exposes boundary terms. Boundary conditions and boundary terms in the action must fit together so that its variation makes sense.'),
    p('A complete Cauchy surface in Minkowski spacetime determines the solution in its domain of dependence without an extra timelike wall. The null infinities of its Penrose diagram are not the same object as the AdS boundary.'),
    note('This motivates the dictionary; it does not prove it', 'The need for boundary data is a geometric fact. The further claim of AdS/CFT is that a particular quantum field theory on the conformal boundary gives the entire bulk theory. The CFT is not ordinary matter spread throughout AdS.'),
  ], ['conformal-boundary', 'source-response', 'boundary-not-bulk'], 4, [[247,271],[408,466]], [29,30]),

  s('reading-ads-poincare', 'ads', 3, 8, 'Poincaré coordinates show one patch, not a cut-out universe', 'They make the flat boundary directions obvious. Their horizon is a coordinate boundary of this patch.', [
    p('Use dimensionless xμ and z in the following embedding formulas, and x² = ημνxμxν with one negative time direction.'),
    m(r`X^\mu=\frac{Lx^\mu}{z},\quad X^d=\frac{L(1-x^2-z^2)}{2z},\quad X^{d+1}=\frac{L(1+x^2+z^2)}{2z}`),
    m(r`\eta_{\mu\nu}X^\mu X^\nu+(X^d)^2-(X^{d+1})^2=-L^2,\qquad X^d+X^{d+1}=\frac Lz>0`, 'The final inequality for z > 0 excludes part of the hyperboloid. This is the origin of the patch restriction.'),
    m(r`ds^2=\frac{L^2}{z^2}\left(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu\right)`, 'The same form holds if x and z are both given length units, after rescaling them together.'),
    m(r`z\to0:\ \text{conformal boundary},\qquad z\to\infty:\ \text{Poincaré horizon},\qquad \|\partial_t\|^2=-\frac{L^2}{z^2}`, 'The static patch Killing field becomes null at the Poincaré horizon. Neither end is a curvature singularity: R remains −d(d+1)/L². Global AdS extends beyond the horizon of this chart.'),
    p('The induced conformal boundary metric here is Minkowski. Global coordinates instead display the full boundary cylinder. Their relation is conformal on the appropriate regions; a Minkowski patch is not globally identical to the entire cylinder.'),
  ], ['poincare-patch', 'conformal-boundary', 'horizon'], 4, [[485,559]], [30,31,32]),

  s('reading-ads-isometries', 'ads', 3, 9, 'The same move is an AdS isometry and a boundary conformal transformation', 'A bulk isometry preserves the full metric. Its action on the boundary need preserve only the conformal class.', [
    m(r`x^\mu\mapsto a x^\mu,\qquad z\mapsto az,\qquad \frac{L^2}{(az)^2}\left(d(az)^2+d(ax)^2\right)=\frac{L^2}{z^2}(dz^2+dx^2)`, 'The numerator and denominator scale equally. Boundary dilation is a genuine bulk isometry because z scales too.'),
    m(r`P_\mu=-i\partial_\mu,\quad J_{\mu\nu}=i(x_\mu\partial_\nu-x_\nu\partial_\mu),\quad D=-i(x^\mu\partial_\mu+z\partial_z)`),
    m(r`K_\mu=i\left[2x_\mu(x^\nu\partial_\nu+z\partial_z)-(x^2+z^2)\partial_\mu\right]`, 'These coordinate generators use the same overall convention as the CFT column. Overall generator signs are conventions; their consistent brackets and actions are what matter.'),
    m(r`\delta x^\mu=2(b\cdot x)x^\mu-b^\mu(x^2+z^2),\qquad \delta z=2(b\cdot x)z`, 'At z = 0 this becomes the usual special conformal transformation. Away from the boundary, the z² term and δz are required to preserve the AdS metric.'),
    m(r`\mathcal L_\xi g_{MN}=\nabla_M\xi_N+\nabla_N\xi_M=0,\qquad \mathfrak{isom}(\mathrm{AdS}_{d+1})=\mathfrak{so}(d,2)`, 'The first equation is the Killing equation: the Lie derivative of the metric along an isometry vanishes. Translations, Lorentz transformations, dilation and SCTs together give the full algebra, not just the manifest Poincaré subgroup.'),
    p('This is our first concrete cross-column arrow. The two theories independently produce the same symmetry algebra. Matching their dynamics will require much more: states, dimensions and correlation functions.'),
  ], ['conformal-symmetry', 'isometry', 'killing-vector', 'so-d-2'], 4, [[562,589]], [31,32]),

  s('reading-ads-radial-scale', 'ads', 3, 10, 'Three radial coordinates describe the same direction', 'Write down which end is the boundary before interpreting any limit.', [
    m(r`r=\frac{L^2}{z},\qquad r=Le^\sigma,\qquad \frac{dr}{r}=d\sigma`, 'Here x, z and r have length units. σ is dimensionless. It is a Poincaré logarithmic coordinate, not the global radial coordinate ρ above.'),
    m(r`ds^2=\frac{r^2}{L^2}\eta_{\mu\nu}dx^\mu dx^\nu+\frac{L^2}{r^2}dr^2=e^{2\sigma}\eta_{\mu\nu}dx^\mu dx^\nu+L^2d\sigma^2`),
    m(r`\text{boundary: }z\to0\Longleftrightarrow r\to\infty\Longleftrightarrow\sigma\to+\infty`),
    m(r`\text{patch horizon: }z\to\infty\Longleftrightarrow r\to0\Longleftrightarrow\sigma\to-\infty`),
    m(r`\mu\ \propto\ \frac1z=\frac r{L^2}`, 'A boundary energy scale μ has inverse-length units. Small z resolves short distances (UV); deep into the Poincaré interior corresponds to long distances (IR). This is the radial/energy relation, not a claim that the boundary theory contains an extra spatial coordinate.'),
    note('The letter r will reappear', 'In the D3-brane geometry, r initially means distance from the branes in six transverse directions. Only after taking the near-horizon limit does its metric take precisely this AdS radial form.'),
  ], ['radial-scale', 'poincare-patch', 'uv-ir'], 4, [[606,621]], [32]),
  s('reading-d3-pair', 'bridge', 7, 1, 'The particular pair of theories we are building', 'Chapter 7 explains why a four-dimensional gauge theory and strings in a ten-dimensional spacetime can describe the same system.', [
    m(r`\mathcal N=4\ \ SU(N)\ \text{super-Yang--Mills in 4D}\quad\longleftrightarrow\quad\text{type IIB strings on }\mathrm{AdS}_5\times S^5`, 'The left side is the interacting part of the D3-brane worldvolume theory. The right side includes strings, not just the classical Einstein metric.'),
    m(r`A_\mu,\quad \lambda^A_\alpha\ (A=1,2,3,4),\quad \phi^I\ (I=1,\ldots,6)`, 'The gauge multiplet contains one gauge connection, four Weyl fermions and six real scalars, all in the adjoint representation. In four dimensions 𝒩 = 4 means sixteen real Poincaré supercharges.'),
    p('On the bulk side, five AdS dimensions plus five sphere dimensions make the ten dimensions of type IIB. The D3-branes originally have six transverse directions: one radial coordinate plus the five angles of S⁵. The sphere does not arise because we perform Kaluza–Klein reduction; it is already a factor of the near-horizon geometry.'),
    p('We will not assume the two descriptions match because their names appear in one equation. The route is: identify the degrees of freedom of the same D3-brane system, isolate them in a low-energy limit in two ways, then compare the surviving interacting sectors.'),
    steps('Open strings identify the worldvolume fields and their interactions.', 'Closed strings identify the geometry sourced by the branes.', 'A carefully scaled limit separates each description from the same free exterior sector.', 'Parameters and symmetries match, and correlation functions supply quantitative tests.'),
  ], ['open-closed', 'brane-stack', 'decoupling', 'boundary-not-bulk'], 8, [[4,105]], [88,89]),

  s('reading-d3-parameters', 'bridge', 7, 2, 'Keep one parameter dictionary beside every limit', 'N counts branes and colour labels. The two couplings control different expansions.', [
    m(r`\ell_s=\sqrt{\alpha'},\qquad T_F=\frac1{2\pi\alpha'},\qquad g_{\mathrm{YM}}^2=2\pi g_s,\qquad \lambda=Ng_{\mathrm{YM}}^2`),
    m(r`L^4=4\pi g_sN\alpha'^2=2\lambda\alpha'^2,\qquad g_s=\frac{\lambda}{2\pi N},\qquad \frac L{\ell_s}=(2\lambda)^{1/4}`, 'L is the common AdS and sphere radius. α′ has units of length squared; gs, gYM² and λ are dimensionless for D3-branes.'),
    m(r`\frac{\alpha'}{L^2}=\frac1{\sqrt{2\lambda}},\qquad \frac{L^4}{\ell_s^4}=4\pi g_sN`, 'A small string compared with the curvature radius sees an almost flat local geometry. This is what large λ buys us.'),
    note('A convention correction to the screenshots', 'This chapter uses the lecture’s gYM² = 2πgs throughout. Some explanatory screenshots use gYM² = 4πgs. That convention is also possible, but its λ is twice ours and then L⁴ = λα′². Mixing the two dictionaries changes numerical factors in every later limit.'),
    m(r`\dim SU(N)=N^2-1,\qquad \operatorname{rank}SU(N)=N-1`, 'N is the dimension of the fundamental representation, not literally the rank of SU(N). The rank is the number of independent commuting generators.'),
  ], ['parameter-map', 'brane-stack', 'large-n'], 8, [[32,105],[209,212]], [88,89]),

  s('reading-d3-planar-limit', 'cft', 7, 3, 'Large N suppresses handles, not interactions inside a plane', 'A gauge-theory diagram can be reorganized as a surface. This is the first clue of a string expansion.', [
    m(r`N\to\infty,\quad\lambda\text{ fixed}\quad\Longrightarrow\quad g_{\mathrm{YM}}^2=\frac\lambda N\to0,\quad g_s=\frac\lambda{2\pi N}\to0`),
    p('An adjoint field is a matrix. Draw each propagator as two colour lines. Every closed index loop contributes N. For a connected vacuum ribbon graph with V vertices, E edges and F faces, their combined power is its Euler characteristic.'),
    m(r`N^{F-E+V}=N^\chi=N^{2-2h},\qquad \mathcal A_{\mathrm{vac}}=\sum_{h\geq0}N^{2-2h}f_h(\lambda)`, 'h is the genus, or number of handles. Insertions or boundaries change the overall power; the displayed expression is for closed connected vacuum surfaces.'),
    m(r`\text{one extra handle}\quad\longleftrightarrow\quad N^{-2}\quad\longleftrightarrow\quad g_s^2\ \text{at fixed }\lambda`, 'This matches the topology of closed-string perturbation theory.'),
    p('The planar function f₀(λ) still contains arbitrarily many interactions. Taking gYM² to zero while N grows does not make λ small. The planar limit can therefore be strongly coupled and difficult to calculate in ordinary gauge-theory perturbation theory.'),
    note('Two different simplifications', 'Genus zero means no string handles. It does not mean zero string length. A planar dual can still need the full string theory if L is not large compared with ℓs.'),
  ], ['large-n', 'planar-diagrams', 'string-loops'], 8, [[106,146]], [88,89]),

  s('reading-d3-classical-regime', 'bridge', 7, 4, 'When is classical supergravity enough?', 'We need to suppress both finite string size and quantum string loops.', [
    m(r`\lambda\gg1\quad\Longrightarrow\quad \frac{\alpha'}{L^2}\ll1,\qquad g_s=\frac\lambda{2\pi N}\ll1`, 'The first condition controls string-scale curvature effects; the second controls the genus expansion.'),
    m(r`1\ll\lambda\ll N`, 'This is a useful sufficient parametric regime for both conditions. It is more informative than saying only “large N and large λ” without comparing them.'),
    m(r`M_n^2\sim\frac n{\alpha'},\qquad E\ell_s\ll1`, 'Massive string oscillators are heavy at energies well below the string scale. Their squared masses, not their masses, scale as 1/α′.'),
    p('In a weakly curved background at such energies, the massless string fields are described by supergravity. Higher-derivative terms remember finite string size; string loops remember quantum corrections. Their precise first nonzero order depends on symmetries, so an expansion parameter does not mean every power must occur.'),
    m(r`\text{full conjecture}\ \supset\ \text{planar string theory}\ \supset\ \text{classical supergravity approximation}`, 'The exact duality is a statement about full quantum theories. Supergravity is a controlled corner in which we can make many explicit tests, not the entire meaning of AdS/CFT.'),
  ], ['classical-limit', 'parameter-map', 'string-loops', 'curvature'], 8, [[147,212],[820,829]], [88,89,95]),

  s('reading-d3-two-faces', 'bridge', 7, 5, 'One stack, two useful descriptions', 'D-branes support open strings and also source closed-string fields. These are two perspectives on the same object.', [
    p('At small gsN the backreaction is weak on the string scale. It is useful to picture D3-branes in nearly flat space with open strings ending on them and closed strings moving through the surrounding ten dimensions.'),
    p('At large gsN, the stack produces a macroscopic throat. The geometry is strongly changed relative to flat space, but its curvature in string units is weak when L ≫ ℓs. “Large backreaction” and “large local curvature” are not synonyms.'),
    m(r`\frac L{\ell_s}=(4\pi g_sN)^{1/4}`, 'The same parameter tells us when a classical throat is resolved above the string scale.'),
    note('Do not delete one set of degrees of freedom by hand', 'Open strings do not simply cease to exist when the geometry becomes useful. Nor do all brane fluctuations freeze. Duality reorganizes the surviving degrees of freedom; transverse brane fluctuations become the scalar fields of the worldvolume theory.'),
  ], ['brane-stack', 'open-closed', 'curvature'], 8, [[213,260]], [89,90,91]),

  s('reading-d3-chan-paton', 'cft', 7, 6, 'Why a stack of N branes gives U(N)', 'Each end of an open string carries a brane label. The pair of labels is a matrix index.', [
    m(r`a,b=1,\ldots,N,\qquad (A_\mu)^a{}_b,\qquad (\phi^I)^a{}_b`, 'A string can start on brane a and end on brane b. N² combinations give the matrix-valued Chan–Paton degrees of freedom.'),
    m(r`A_\mu=A_\mu^aT^a,\qquad \Phi\mapsto U\Phi U^{-1},\qquad \mathfrak u(N)=\mathfrak{su}(N)\oplus\mathfrak u(1)`, 'The matrix fields transform in the adjoint. Here a on Aμᵃ labels a generator; it is a different use of the index from the endpoint label.'),
    m(r`U(N)\simeq\frac{SU(N)\times U(1)}{\mathbb Z_N},\qquad \Phi=\frac{\operatorname{Tr}\Phi}{N}\mathbf1+\widehat\Phi,\qquad\operatorname{Tr}\widehat\Phi=0`, 'The Lie algebra splits directly. The global group has a shared discrete centre, so it is a quotient, not literally an unconstrained direct product.'),
    p('The trace scalar moves the centre of mass of the whole stack. Commutators with the identity vanish, so the U(1) multiplet decouples from the interacting SU(N) sector in the low-energy theory. When we say the AdS/CFT pair has gauge group SU(N), this free centre-of-mass sector has been set aside.'),
    m(r`\Phi\in\mathrm{adj}(SU(N)):\ \dim=N^2-1,\qquad v\in\mathrm{fund}(SU(N)):\ \dim=N`, 'Fundamental vectors transform as v ↦ Uv; adjoint matrices transform by conjugation. The number inside SU(N) describes the defining vector representation, not the number of generators.'),
  ], ['brane-stack', 'group-theory', 'representations', 'open-closed'], 8, [[261,299],[371,406]], [90,91]),

  s('reading-d3-dbi', 'cft', 7, 7, 'The DBI action: how geometry enters the brane theory', 'The worldvolume action sees the bulk fields pulled back onto the brane. Expanding it reveals familiar field theory.', [
    m(r`\mu_p=\frac1{(2\pi)^p\alpha'^{(p+1)/2}},\qquad T_p=\frac{\mu_p}{g_s},\qquad \Phi=\log g_s+\delta\Phi`),
    m(r`S_{\mathrm{DBI}}=-T_p\int d^{p+1}x\ e^{-\delta\Phi}\sqrt{-\det\!\left(P[g+B]_{\mu\nu}+2\pi\alpha'F_{\mu\nu}\right)}`, 'Equivalently use μp e⁻Φ instead of Tp e⁻δΦ. Do not include both the full e⁻Φ and a tension already divided by gs: that counts the background dilaton twice. RR couplings live in an additional Wess–Zumino term.'),
    m(r`P[g]_{\mu\nu}=g_{MN}(X)\,\partial_\mu X^M\partial_\nu X^N`, 'P is the pullback. Bulk indices M,N run over ten dimensions; μ,ν run only along the brane. The embedding Xᴹ(x) tells us which bulk point each worldvolume point occupies.'),
    m(r`X^\mu=x^\mu,\quad X^I=2\pi\alpha'\phi^I,\quad P[\eta]_{\mu\nu}=\eta_{\mu\nu}+(2\pi\alpha')^2\partial_\mu\phi^I\partial_\nu\phi^I`, 'Static gauge identifies the coordinates along the D3-brane with its four worldvolume coordinates. The six transverse positions become six scalar fields.'),
    m(r`[\alpha']=L^2,\quad [A_\mu]=[\phi^I]=L^{-1},\quad[F_{\mu\nu}]=L^{-2},\quad[X^I]=L`, 'The matrix inside the determinant is dimensionless in these coordinates. The bulk dilaton Φ and transverse scalar φᴵ are different fields, despite similar letters.'),
  ], ['dbi', 'brane-stack', 'open-closed', 'lagrangian'], 8, [[300,331]], [90]),

  s('reading-d3-determinant', 'cft', 7, 8, 'Do the determinant expansion instead of guessing it', 'The square root of a determinant is not the determinant. Its quadratic coefficients matter.', [
    m(r`\log\det(1+M)=\operatorname{tr}\log(1+M)=\operatorname{tr}M-\frac12\operatorname{tr}(M^2)+O(M^3)`),
    m(r`\det(1+M)=1+\operatorname{tr}M+\frac12\left[(\operatorname{tr}M)^2-\operatorname{tr}(M^2)\right]+O(M^3)`),
    m(r`\sqrt{\det(1+M)}=1+\frac12\operatorname{tr}M+\frac18(\operatorname{tr}M)^2-\frac14\operatorname{tr}(M^2)+O(M^3)`, 'Exponentiate one half of tr log(1 + M). This gives 1/8 and −1/4, not the coefficients of det(1 + M). The screenshot that interchanges these expansions needs this correction.'),
    m(r`\sqrt{-\det(g+h)}=\sqrt{-g}\left[1+\frac12h+\frac18h^2-\frac14h_{\mu\nu}h^{\mu\nu}+O(h^3)\right],\qquad h=g^{\mu\nu}h_{\mu\nu}`, 'Raise indices with the background metric. A traceless graviton can be chosen in appropriate physical/gauge settings; h = 0 is not an identity for every metric perturbation.'),
    m(r`F^\mu{}_{\mu}=0,\qquad F^\mu{}_{\nu}F^\nu{}_{\mu}=-F_{\mu\nu}F^{\mu\nu}`, 'These are the trace of the mixed-index matrix F and the trace of its square. Antisymmetry supplies the minus sign that gives a positive F² term inside the DBI square root.'),
    m(r`\sqrt{-\det(P[\eta]+2\pi\alpha'F)}=1+(2\pi\alpha')^2\left[\frac14F_{\mu\nu}F^{\mu\nu}+\frac12\partial_\mu\phi^I\partial^\mu\phi^I\right]+\cdots`, 'The overall minus sign of the Lorentzian action then gives the usual gauge and scalar kinetic terms. The constant term is the static brane tension.'),
  ], ['dbi', 'taylor-expansion', 'lagrangian'], 8, [[332,354]], [90]),

  s('reading-d3-open-closed-coupling', 'cft', 7, 9, 'The expansion separates open, closed and mixed terms', 'The mixed term makes the eventual decoupling claim concrete: its coefficient is proportional to the gravitational coupling.', [
    m(r`T_3(2\pi\alpha')^2=\frac1{2\pi g_s}=\frac1{g_{\mathrm{YM}}^2}`),
    m(r`S_{\mathrm{open}}=-\frac1{2\pi g_s}\int d^4x\left[\frac14F_{\mu\nu}F^{\mu\nu}+\frac12\partial_\mu\phi^I\partial^\mu\phi^I+\cdots\right]`, 'Subtract the constant tension to focus on fluctuations. For one brane this leading action is Abelian; a stack will promote the fields to matrices.'),
    m(r`g_{MN}=\eta_{MN}+\kappa h_{MN},\qquad\delta\Phi=-\kappa\varphi,\qquad e^{-\delta\Phi}=1+\kappa\varphi+\cdots`, 'This choice defines the sign of the canonically normalized dilaton fluctuation ϕ. Choosing the opposite fluctuation variable flips its linear coupling, not the physics.'),
    m(r`S_{\mathrm{int}}\supset-\frac{\kappa}{8\pi g_s}\int d^4x\ \varphi F_{\mu\nu}F^{\mu\nu}`, 'A bulk dilaton couples to a worldvolume operator. Metric fluctuations similarly couple to the stress tensor. This is a precursor of the field/operator dictionary, before the near-horizon limit.'),
    note('Where the κ went in one source line', 'If the dilaton symbol is the dimensionless δΦ, the linear term has no explicit κ. If it is the canonical ϕ defined above, it does. Keeping the definition visible prevents an apparent contradiction between the lecture line and the expanded notes.'),
  ], ['open-closed', 'decoupling', 'field-operator-map', 'parameter-map'], 8, [[332,370]], [90,91]),

  s('reading-d3-sym-action', 'cft', 7, 10, 'A stack makes the low-energy action non-Abelian', 'Covariant derivatives and scalar commutators describe interactions between the matrix degrees of freedom.', [
    m(r`F_{\mu\nu}=\partial_\mu A_\nu-\partial_\nu A_\mu-i[A_\mu,A_\nu],\qquad D_\mu\phi^I=\partial_\mu\phi^I-i[A_\mu,\phi^I]`),
    m(r`S_{\mathrm{bos}}=\frac1{g_{\mathrm{YM}}^2}\int d^4x\ \operatorname{Tr}\left[-\frac14F_{\mu\nu}F^{\mu\nu}-\frac12D_\mu\phi^ID^\mu\phi^I+\frac14\sum_{I,J}[\phi^I,\phi^J][\phi^I,\phi^J]\right]`, 'The matrix-trace normalization is the one inherited from the DBI convention above. Fermionic kinetic and Yukawa terms complete 𝒩 = 4 supersymmetry.'),
    m(r`V=-\frac1{4g_{\mathrm{YM}}^2}\sum_{I,J}\operatorname{Tr}[\phi^I,\phi^J]^2\geq0`, 'For Hermitian scalar matrices, the commutator is anti-Hermitian, so its squared trace is nonpositive. The minus sign makes the potential nonnegative.'),
    m(r`V=0\quad\Longleftrightarrow\quad[\phi^I,\phi^J]=0\quad\Longrightarrow\quad\phi^I=\operatorname{diag}(v_1^I,\ldots,v_N^I)`, 'Commuting Hermitian matrices can be diagonalized together. Their eigenvalues give the transverse brane positions divided by 2πα′.'),
    m(r`\operatorname{STr}(M_1\cdots M_k)=\frac1{k!}\sum_{\pi\in S_k}\operatorname{Tr}(M_{\pi(1)}\cdots M_{\pi(k)})`, 'The symmetrized trace averages orderings and appears in useful non-Abelian DBI approximations.'),
    note('A limit of the formula, not a gap to hide', 'Simply inserting noncommuting matrices into an Abelian square root and taking STr is not an exact all-orders non-Abelian DBI action. The leading Yang–Mills action used in this limit is well defined; higher α′ terms require more care.'),
  ], ['lagrangian', 'brane-stack', 'coulomb-branch', 'supersymmetry'], 8, [[371,406]], [90,91]),

  s('reading-d3-ten-dimensional-origin', 'cft', 7, 11, 'Why exactly six scalars and four Weyl fermions?', 'Dimensionally reduce the ten-dimensional gauge multiplet to four dimensions.', [
    m(r`10=4+6,\qquad A_M\longrightarrow(A_\mu,A_i)=(A_\mu,\phi_i),\qquad \partial_i=0`, 'Keep fields independent of the six reduced coordinates. A gauge component with a spacetime index in a removed direction is a scalar from the four-dimensional viewpoint.'),
    m(r`F_{\mu i}=D_\mu\phi_i,\qquad F_{ij}=-i[\phi_i,\phi_j]`, 'The mixed components produce scalar kinetic terms. The purely internal components produce the scalar commutator potential. These interactions are not added merely to make the field list look supersymmetric.'),
    m(r`-\frac14\operatorname{Tr}F_{MN}F^{MN}\longrightarrow-\frac14\operatorname{Tr}F_{\mu\nu}F^{\mu\nu}-\frac12\operatorname{Tr}D_\mu\phi_iD^\mu\phi_i+\frac14\operatorname{Tr}[\phi_i,\phi_j]^2`),
    m(r`10\mathrm D:\ \mathcal N=1\ \text{has 16 real supercharges}\quad\longrightarrow\quad4\mathrm D:\ \mathcal N=4\ \text{has 16 real supercharges}`, '𝒩 counts copies of the minimal spinor in that dimension, not a universal number of individual components. The number of real supercharges stays the same under this reduction.'),
    m(r`10\mathrm D\ \text{massless vector}:\ 10-2=8\ \text{physical modes},\qquad4\mathrm D:\ 2+6=8`, 'For a massless vector, transversality and gauge equivalence remove two polarization components. Its ten-dimensional Majorana–Weyl partner has eight on-shell fermionic degrees of freedom; in 4D these assemble into four Weyl fermions.'),
    p('The open superstring has Neveu–Schwarz and Ramond sectors: antiperiodic and periodic worldsheet fermions, respectively. With the supersymmetric GSO projection, their massless bosonic and fermionic states give this multiplet.'),
  ], ['supersymmetry', 'dimensional-reduction', 'r-symmetry', 'lagrangian'], 8, [[407,458]], [90,91]),

  s('reading-d3-t-duality', 'ads', 7, 12, 'The same field counting has a T-duality picture', 'A gauge component along a compact direction becomes a transverse brane position after T-duality.', [
    m(r`R_i\longleftrightarrow R_i'=\frac{\alpha'}{R_i},\qquad X^i=2\pi\alpha' A_i`, 'T-duality exchanges momentum and winding, and exchanges Neumann and Dirichlet boundary conditions for an open string along the dualized direction.'),
    m(r`\mathrm{D}9\xrightarrow{\ 6\ \text{T-dualities}\ }\mathrm{D}3`, 'Dualizing six directions along a D9-brane removes those directions from its worldvolume. Their gauge components become six transverse scalars. Six dualities are even, so IIB returns to IIB.'),
    p('This is a local spectrum and field-identification argument. A complete compact model with D9-branes must also satisfy global charge and consistency conditions. We do not need to build that entire compactification to read off the D3 multiplet.'),
  ], ['t-duality', 'brane-stack', 'dimensional-reduction'], 8, [[407,458]], [90,91]),

  s('reading-d3-open-limit', 'cft', 7, 13, 'First low-energy limit: the interacting brane theory survives', 'Send the string length to zero while keeping the worldvolume energy and coupling fixed.', [
    m(r`\alpha'\to0,\qquad E\text{ fixed},\qquad g_s\text{ fixed},\qquad g_{\mathrm{YM}}^2=2\pi g_s\text{ fixed}`, 'Then Eℓs → 0. Massive open-string oscillators become infinitely heavy, while the massless gauge multiplet retains finite interactions.'),
    m(r`2\kappa_{10}^2=(2\pi)^7g_s^2\alpha'^4\quad\Longrightarrow\quad\kappa_{10}\to0`, 'Here κ₁₀ is the gravitational coupling after absorbing the constant background dilaton. Its normalization differs from a string-frame κ₀ used before that absorption.'),
    m(r`S_{\mathrm{closed}}\sim\int\!\left[(\partial h)^2+\kappa h(\partial h)^2+\cdots\right],\qquad S_{\mathrm{int}}\sim\kappa\int\varphi\,\operatorname{Tr}F^2+\cdots`, 'With canonical bulk fields, their nonlinear self-interactions and the mixed open/closed couplings vanish. Free massless closed-string modes remain in the exterior.'),
    m(r`\text{low-energy D3 system}\longrightarrow\mathcal N=4\ U(N)\ \mathrm{SYM}\quad+\quad\text{free ambient massless closed strings}`, 'The plus sign means decoupled sectors, not an extra interaction. Remove the free centre-of-mass U(1) multiplet when focusing on the interacting SU(N) theory.'),
    p('This is a limit, not simply the instruction “ignore gravity.” The displayed powers of α′ explain why gravity and the mixed couplings disappear while the gauge coupling does not.'),
  ], ['open-closed', 'decoupling', 'parameter-map'], 8, [[459,502]], [91]),

  s('reading-d3-coulomb', 'cft', 7, 14, 'Separate the branes: the Coulomb branch', 'A scalar expectation value has a direct geometric meaning. It also gives stretched strings their mass.', [
    m(r`X_a^I=2\pi\alpha'v_a^I,\qquad m_{ab}=T_F|\vec X_a-\vec X_b|=\frac{|\vec X_a-\vec X_b|}{2\pi\alpha'}`, 'Off-diagonal fields connect different branes. Separating those branes makes these fields massive; coincident eigenvalues restore the corresponding non-Abelian symmetry.'),
    m(r`U(N+1)\longrightarrow U(N)\times U(1),\qquad \langle\phi^9\rangle=\frac1{2\pi\alpha'}\operatorname{diag}(0,\ldots,0,r)`, 'This example moves one probe away from a stack. Generic distinct positions break U(N) to U(1)ᴺ.'),
    m(r`u=\frac r{\alpha'},\qquad m=\frac u{2\pi},\qquad\alpha'\to0\ \text{with }u\text{ fixed}\ \Longrightarrow\ r=\alpha'u\to0`, 'A finite field-theory mass requires the geometric separation to shrink as α′. Keeping r fixed instead sends this mass to infinity and removes that state from the low-energy theory.'),
    note('Correcting the branch name', 'Parallel D3-brane separation is the Coulomb branch of 𝒩 = 4 SYM: adjoint scalars acquire commuting expectation values. Gauge symmetry is broken through the Higgs mechanism, but that does not make this moduli space the Higgs branch.'),
  ], ['brane-stack', 'coulomb-branch', 'decoupling', 'radial-scale'], 8, [[503,532]], [91]),
  s('reading-d3-gravity-scale', 'ads', 7, 15, 'Now ask what geometry the stack creates', 'A D3-brane is extended in three spatial directions. Its gravitational field spreads through six transverse dimensions.', [
    m(r`T_p=\frac1{(2\pi)^p g_s\ell_s^{p+1}},\quad[T_p]=L^{-(p+1)},\qquad[\kappa_D^2]=L^{D-2}`, 'The tension is energy per p-dimensional spatial volume. These dimensions follow by requiring the brane and Einstein actions to be dimensionless.'),
    m(r`g_{\mathrm{YM},p}^2=(2\pi)^{p-2}g_s\alpha'^{(p-3)/2},\qquad[g_{\mathrm{YM},p}^2]=L^{p-3}`, 'Only p = 3 gives a dimensionless Yang–Mills coupling. This is one reason the D3 case is special.'),
    m(r`\nabla_{\mathbb R^6}^2H=\frac1{r^5}\frac d{dr}\left(r^5\frac{dH}{dr}\right)=0\quad(r>0)`, 'Away from a rotationally symmetric source, the harmonic function obeys the radial six-dimensional Laplace equation.'),
    m(r`r^5H'=C\quad\Longrightarrow\quad H=A+\frac B{r^4}`, 'Integrate twice. The fourth power comes from six transverse dimensions; it is not the three-dimensional 1/r potential.'),
    m(r`|\text{gravitational perturbation}|\sim\frac{\kappa_{10}^2NT_3}{r^4}\sim\frac{g_sN\ell_s^4}{r^4}`, 'This is a scaling estimate; angular and normalization factors are fixed by the exact solution and its quantized charge.'),
    m(r`H(r)=1+\frac{L^4}{r^4},\qquad L^4=4\pi g_sN\ell_s^4`, 'Asymptotic flatness sets the constant to one. Flux quantization will fix the coefficient L⁴. At r of order L, the departure from the flat metric is order one.'),
  ], ['brane-stack', 'curvature', 'dimensional-analysis', 'parameter-map'], 8, [[533,631]], [91,92]),

  s('reading-d3-full-metric', 'ads', 7, 16, 'The full D3-brane solution has a flat exterior and a throat', 'The warp factors distinguish directions along the branes from directions away from them.', [
    m(r`ds_{10}^2=H(r)^{-1/2}\eta_{\mu\nu}dx^\mu dx^\nu+H(r)^{1/2}\left(dr^2+r^2d\Omega_5^2\right),\qquad H(r)=1+\frac{L^4}{r^4}`),
    m(r`\mu=0,1,2,3,\qquad r^2=\sum_{I=1}^{6}(y^I)^2,\qquad e^\Phi=g_s,\qquad B_2=0`, 'The first four coordinates lie along the D3 worldvolume. The other six are the radial distance r and five angular coordinates. The D3 dilaton is constant.'),
    m(r`r\gg L:\ H\simeq1\quad\Longrightarrow\quad ds^2\simeq\eta_{\mu\nu}dx^\mu dx^\nu+dr^2+r^2d\Omega_5^2`, 'Far away, this is ten-dimensional Minkowski spacetime in polar coordinates in its six transverse directions.'),
    m(r`r\ll L:\ H\simeq\frac{L^4}{r^4}`, 'Closer in, the constant in H is negligible. This approximation changes the displayed geometry to a throat. It is not yet the complete decoupling argument; we still have to specify what is held fixed in the limit.'),
    p('The full solution also includes a self-dual Ramond–Ramond five-form field strength. Without its flux, AdS₅ × S⁵ is not a solution of this system. The flux supports the curvature; the metric alone is not the whole background.'),
  ], ['brane-stack', 'open-closed', 'curvature'], 8, [[632,641],[690,724]], [92,93,94]),

  s('reading-d3-flux', 'ads', 7, 17, 'Why N appears in the radius: quantized five-form flux', 'The integer brane charge fixes the strength of the throat geometry.', [
    m(r`C_4=\frac{H^{-1}-1}{g_s}\,dx^0\wedge dx^1\wedge dx^2\wedge dx^3,\qquad F_5=(1+\star)dC_4`, 'This states the RR normalization used here; the orientation is chosen so that the brane charge is positive. Self-duality adds a magnetic sphere component to the electric component along the branes.'),
    m(r`F_5\big|_{S^5}=\frac{4L^4}{g_s}\,\mathrm{vol}(S^5_{\mathrm{unit}}),\qquad\operatorname{Vol}(S^5_{\mathrm{unit}})=\pi^3`),
    m(r`N=\frac1{(2\pi)^4\alpha'^2}\int_{S^5}F_5=\frac1{16\pi^4\alpha'^2}\frac{4L^4\pi^3}{g_s}=\frac{L^4}{4\pi g_s\alpha'^2}`),
    m(r`L^4=4\pi g_sN\alpha'^2`, 'This fixes the normalization that dimensional analysis alone could not determine. N is now the same integer viewed as flux charge, number of D3-branes, and number of colour labels.'),
    note('Normalizations must travel together', 'Rescaling the RR potential moves factors of gs between F₅ and the flux-quantization formula. The displayed C₄, F₅ and charge formula form one consistent convention; do not combine only one of them with a differently normalized screenshot.'),
  ], ['parameter-map', 'brane-stack', 'flux-quantization'], 8, [[632,641]], [92,93]),

  s('reading-d3-dilaton-variation', 'ads', 7, 18, 'The dilaton equation, with the integration by parts shown', 'This calculation explains why the D3 solution has vanishing ten-dimensional scalar curvature without being flat.', [
    m(r`S_{\mathrm{NS}}=\frac1{2\kappa_0^2}\int d^{10}x\,\sqrt{-g}\,e^{-2\Phi}\left[R+4(\nabla\Phi)^2-\frac12|H_3|^2\right],\qquad |H_3|^2=\frac1{3!}H_{MNP}H^{MNP}`, 'This is the string-frame NS–NS action. H₃ = dB₂ is a three-form, not the radial function H(r). The RR terms do not have an explicit dilaton factor in this string-frame convention.'),
    m(r`\delta e^{-2\Phi}=-2e^{-2\Phi}\delta\Phi,\qquad \delta\left[4(\nabla\Phi)^2\right]=8\nabla_M\Phi\nabla^M\delta\Phi`, 'Vary Φ while holding g and the form fields fixed.'),
    m(r`\delta S_{\mathrm{NS}}\propto\int\sqrt{-g}\left\{-2e^{-2\Phi}\left[R+4(\nabla\Phi)^2-\frac12|H_3|^2\right]\delta\Phi+8e^{-2\Phi}\nabla_M\Phi\nabla^M\delta\Phi\right\}`),
    m(r`\int\sqrt{-g}\,e^{-2\Phi}\nabla_M\Phi\nabla^M\delta\Phi=-\int\sqrt{-g}\,\nabla_M\!\left(e^{-2\Phi}\nabla^M\Phi\right)\delta\Phi+\text{boundary term}`),
    m(r`\nabla_M(e^{-2\Phi}\nabla^M\Phi)=e^{-2\Phi}\left[\Box\Phi-2(\nabla\Phi)^2\right]`),
    m(r`R-4(\nabla\Phi)^2+4\Box\Phi-\frac12|H_3|^2=0`, 'The coefficient of the arbitrary interior variation δΦ must vanish. Boundary variations are handled separately by the chosen conditions and boundary action.'),
    m(r`e^\Phi=g_sH^{(3-p)/4}\quad\xrightarrow{p=3}\quad e^\Phi=g_s,\qquad H_3=0\quad\Longrightarrow\quad R_{10}=0`, 'For a D3-brane the derivatives of the dilaton vanish. The five-form still curves the geometry even though the scalar curvature is zero.'),
  ], ['dilaton', 'curvature', 'lagrangian', 'variation'], 8, [[642,674]], [93]),

  s('reading-d3-curvature-check', 'ads', 7, 19, 'Check the cancellation in the metric itself', 'R = 0 is a trace statement. It is not the statement that all curvature vanishes.', [
    m(r`R=-\frac{5H'(r)+rH''(r)}{2rH(r)^{3/2}},\qquad H=1+\frac{L^4}{r^4}`),
    m(r`H'=-\frac{4L^4}{r^5},\qquad H''=\frac{20L^4}{r^6},\qquad 5H'+rH''=0`, 'This holds away from the localized source, r > 0. The numerator is proportional to the same radial Laplace equation used to construct H.'),
    m(r`R_{\mathrm{AdS}_5}=-\frac{20}{L^2},\qquad R_{S^5}=+\frac{20}{L^2},\qquad R_{\mathrm{AdS}_5\times S^5}=0`, 'The near-horizon product has equal radii and opposite scalar curvatures. Their sum vanishes, but each factor has nonzero Riemann and Ricci tensors.'),
    m(r`R_{\mu\nu}^{\mathrm{AdS}_5}=-\frac4{L^2}g_{\mu\nu},\qquad R_{ab}^{S^5}=+\frac4{L^2}g_{ab}`, 'The five-form stress tensor supports these nonzero components. The ten-dimensional metric is not Ricci-flat just because its scalar trace is zero.'),
  ], ['curvature', 'brane-stack'], 8, [[675,689]], [93]),

  s('reading-d3-throat-coordinates', 'ads', 7, 20, 'Watch the throat become AdS₅ × S⁵', 'The same substitution transforms the longitudinal warp factor, the radial distance and the angular radius.', [
    m(r`H\simeq\frac{L^4}{r^4}\quad\Longrightarrow\quad H^{-1/2}\simeq\frac{r^2}{L^2},\quad H^{1/2}\simeq\frac{L^2}{r^2}`),
    m(r`ds^2\simeq\frac{r^2}{L^2}\eta_{\mu\nu}dx^\mu dx^\nu+\frac{L^2}{r^2}dr^2+L^2d\Omega_5^2`, 'The sphere term is H¹ᐟ²r²dΩ₅². Its r-dependence cancels, leaving a sphere of constant radius L.'),
    m(r`z=\frac{L^2}{r},\qquad dr=-\frac{L^2}{z^2}dz,\qquad\frac{L^2}{r^2}dr^2=\frac{L^2}{z^2}dz^2`),
    m(r`ds^2\simeq\frac{L^2}{z^2}\left(dz^2+\eta_{\mu\nu}dx^\mu dx^\nu\right)+L^2d\Omega_5^2`, 'The first term is the Poincaré metric of AdS₅. The second is S⁵. This is a direct product because the sphere radius is independent of the AdS coordinates.'),
    p('In the full brane geometry the near-horizon approximation only covers r ≪ L. The decoupled near-horizon spacetime obtained by scaling the limit has its own entire radial range and its own asymptotic AdS boundary. That boundary is not the flat spatial infinity of the original full D3 solution.'),
  ], ['poincare-patch', 'brane-stack', 'radial-scale', 'open-closed'], 8, [[690,724]], [93,94]),

  s('reading-d3-redshift', 'ads', 7, 21, 'Two observers: distinguish local energy from energy at infinity', 'A stationary observer’s clock runs at a radius-dependent rate. A signal’s conserved energy and locally measured energy are different quantities.', [
    m(r`g_{tt}=-H^{-1/2},\qquad d\tau=\sqrt{-g_{tt}}\,dt=H^{-1/4}dt`, 't is normalized to proper time for a stationary observer far from the stack. A stationary observer deeper in the throat accumulates less proper time per unit t.'),
    m(r`E_\infty=-p_t,\qquad E_{\mathrm{local}}=-p_Mu^M=\frac{E_\infty}{\sqrt{-g_{tt}}},\qquad E_\infty=H^{-1/4}E_{\mathrm{local}}`, 'The static four-velocity is uᵗ = 1/√(−gtt). Time-translation symmetry makes −pt conserved along the signal’s path.'),
    m(r`r\ll L:\qquad E_\infty\simeq\frac rL E_{\mathrm{local}}`, 'A finite local excitation deep in the throat looks soft to the distant observer. The redshift factor tends to zero as r → 0.'),
    m(r`\frac{E_B}{E_A}=\sqrt{\frac{-g_{tt}(r_A)}{-g_{tt}(r_B)}}=\left[\frac{H(r_B)}{H(r_A)}\right]^{1/4}`, 'For two stationary observers A and B, this compares the energy of the same freely propagating signal. If A is deeper than B, it is redshifted on arrival at B.'),
    m(r`r_A=r_B\quad\Longrightarrow\quad E_B=E_A`, 'Bringing the observers to the same radius removes their relative gravitational redshift—even if both are very deep in the throat. Distance along the branes at fixed radius does not itself change this factor.'),
    note('What the movable observers can and cannot mean', 'Changing their positions can compare stationary measurements. Actual moving observers also have Doppler shifts and need specified trajectories. Redshift alone is not a proof of decoupling: that additionally concerns the strength of interactions or transmission between the throat and exterior in the low-energy limit.'),
  ], ['redshift', 'decoupling', 'brane-stack'], 8, [[725,750]], [94]),

  s('reading-d3-scaled-limit', 'ads', 7, 22, 'The decisive limit holds u = r/α′ fixed', 'Zoom into the throat at the same time that string length shrinks. Do not take these operations independently.', [
    m(r`\alpha'\to0,\qquad u=\frac r{\alpha'}\text{ fixed},\qquad g_s,N\text{ fixed},\qquad L^4=4\pi g_sN\alpha'^2`),
    m(r`\frac r{\ell_s}=u\sqrt{\alpha'}\to0,\qquad\frac rL=\frac{u\sqrt{\alpha'}}{(4\pi g_sN)^{1/4}}\to0`, 'r and L both shrink in fixed length units, but r shrinks faster. The limit automatically probes the near-horizon region.'),
    m(r`H=1+\frac{4\pi g_sN}{\alpha'^2u^4}\quad\longrightarrow\quad\frac{4\pi g_sN}{\alpha'^2u^4}`, 'The second term grows while the constant stays one. This is why dropping the one is justified in this scaled limit.'),
    m(r`\frac{ds^2}{\alpha'}=\frac{u^2}{\sqrt{4\pi g_sN}}\eta_{\mu\nu}dx^\mu dx^\nu+\sqrt{4\pi g_sN}\left(\frac{du^2}{u^2}+d\Omega_5^2\right)`),
    m(r`\frac{ds^2}{\alpha'}=\frac{u^2}{\sqrt{2\lambda}}\eta_{\mu\nu}dx^\mu dx^\nu+\sqrt{2\lambda}\left(\frac{du^2}{u^2}+d\Omega_5^2\right)`, 'The geometry measured in string units stays finite. Its curvature relative to string length is controlled by λ, which has not been sent to infinity in this step.'),
    note('Why the boundary survives the zoom', 'Every finite u lies in r/L → 0 in the original coordinates. The decoupled geometry can nevertheless have arbitrarily large u and an AdS boundary at u → ∞. The limiting spacetime is not obtained by retaining a finite-radius cutout of the original exterior.'),
  ], ['decoupling', 'radial-scale', 'parameter-map', 'open-closed'], 8, [[751,779]], [94,95]),

  s('reading-d3-throat-strings-survive', 'ads', 7, 23, 'Why the throat keeps full string theory, not only massless fields', 'Locally heavy excitations can have finite energy in the time coordinate held fixed by the decoupling limit.', [
    m(r`E_{\mathrm{local}}\sim\frac1{\sqrt{\alpha'}},\qquad \frac rL=\frac{u\sqrt{\alpha'}}{(4\pi g_sN)^{1/4}}`),
    m(r`E_\infty\simeq\frac rL E_{\mathrm{local}}\sim\frac{u}{(4\pi g_sN)^{1/4}}`, 'The inverse string-length divergence is cancelled by the vanishing redshift factor. A throat string excitation can remain at finite energy as seen in the retained boundary time.'),
    p('In the far-away sector there is no such compensating redshift. Massive string oscillators disappear there, leaving free massless closed-string modes. Deep in the throat, the interacting type IIB string sector survives.'),
    m(r`\text{closed description in the limit}\longrightarrow\text{IIB strings on }\mathrm{AdS}_5\times S^5\quad+\quad\text{free ambient massless closed strings}`),
    p('Taking λ large is a separate operation. Only then do most string excitations become heavy compared with the AdS curvature scale and a supergravity description become useful. Keeping these two limits separate removes a common apparent contradiction: α′ → 0 in the decoupling construction does not by itself mean “erase every string in the throat.”'),
  ], ['decoupling', 'redshift', 'classical-limit'], 8, [[751,807]], [94,95]),

  s('reading-d3-identification', 'bridge', 7, 24, 'Remove the same free spectator sector from both descriptions', 'What remains is the proposed gauge/string correspondence.', [
    m(r`\begin{aligned}\text{open viewpoint: }&\quad\mathrm{SYM}+\text{free exterior},\\\text{closed viewpoint: }&\quad\text{AdS throat strings}+\text{free exterior}.\end{aligned}`),
    p('Both descriptions began with the same D3-brane system and isolated a low-energy sector. The common exterior is free and decoupled. This motivates identifying the remaining interacting theories, with the parameter map already fixed by brane tension and charge.'),
    m(r`\left.\mathcal N=4\ SU(N)\ \mathrm{SYM}\right|_{g_{\mathrm{YM}}^2=2\pi g_s}\quad\longleftrightarrow\quad\left.\mathrm{IIB\ on}\ \mathrm{AdS}_5\times S^5\right|_{L^4=4\pi g_sN\alpha'^2}`),
    note('A compelling argument, not a mathematical proof', 'The open-string and smooth-geometry descriptions are easiest in different coupling regimes. The identification is a conjectured equivalence supported by many independent tests; subtracting the spectator sector is not by itself a rigorous derivation at every coupling.'),
    p('“Low energy” here describes how we isolated the theories from the original asymptotically flat construction. The resulting duality is not restricted to only low-energy states of the isolated CFT. It concerns the complete decoupled theory; classical supergravity calculates only its controlled subsector.'),
    p('The CFT has four spacetime coordinates and belongs on the conformal boundary of AdS₅. The bulk string theory has an additional AdS radial direction and an internal S⁵. These are two descriptions of the same states, not a four-dimensional CFT material filling a five-dimensional container.'),
  ], ['open-closed', 'decoupling', 'boundary-not-bulk', 'parameter-map'], 8, [[780,829]], [94,95]),
  s('reading-d3-group-letters', 'bridge', 7, 25, 'Read the group names as equations', 'The letters tell you what a transformation preserves. The numbers tell you the size and signature of its defining space.', [
    m(r`O(n)=\{M\in GL(n,\mathbb R):M^TM=\mathbf1\},\qquad SO(n)=\{M\in O(n):\det M=1\}`, 'O means orthogonal: preserve a real inner product. S means special: impose determinant one. It is a modifier, not a separate group in these names. Orthogonal matrices can otherwise have determinant +1 or −1.'),
    m(r`U(n)=\{U\in GL(n,\mathbb C):U^\dagger U=\mathbf1\},\qquad SU(n)=\{U\in U(n):\det U=1\}`, 'U means unitary: preserve a complex Hermitian inner product. The dagger is transpose plus complex conjugation; it is not just a transpose.'),
    m(r`M^T\eta M=\eta\quad\text{for }O(p,q),\qquad U^\dagger\eta U=\eta\quad\text{for }U(p,q),\qquad\eta=\operatorname{diag}(\underbrace{+1,\ldots,+1}_{p},\underbrace{-1,\ldots,-1}_{q})`, 'The two integers count positive and negative directions of the preserved form. O(p,q) acts on p + q real components; U(p,q) acts on p + q complex components. Adding S again imposes determinant one.'),
    m(r`\dim SO(n)=\frac{n(n-1)}2,\quad\dim U(n)=n^2,\quad\dim SU(n)=n^2-1`, 'These count real infinitesimal generators, not coordinates on the defining vector space. Orthogonal generators are antisymmetric; unitary generators are anti-Hermitian; the special-unitary condition removes one trace generator.'),
    m(r`\dim SO(p,q)=\frac{(p+q)(p+q-1)}2,\qquad\dim SU(p,q)=(p+q)^2-1`, 'Changing the signature changes the real form and compactness, not these dimension counts. In an indefinite orthogonal group, determinant one need not select a single connected component; SO₀ denotes the identity component.'),
    p('A representation specifies how group elements act on some vector space. The fundamental is the defining action; the adjoint acts on generators by T ↦ gTg⁻¹. Equivalent Lie algebras can still have different global groups, allowed spinor representations and discrete quotients.'),
  ], ['group-theory', 'representations', 'conformal-symmetry', 'r-symmetry'], 8, [[831,888]], [95]),

  s('reading-d3-conformal-group', 'bridge', 7, 26, 'The relevant equality is so(4,2) ≅ su(2,2)', 'It is not SO(d,2) = SU(d,2). The four-dimensional example has a particular spin-group relationship.', [
    m(r`\dim SO(4,2)=\frac{6\cdot5}{2}=15,\qquad\dim SU(2,2)=4^2-1=15,\qquad\dim SU(4,2)=6^2-1=35`),
    m(r`\mathfrak{so}(4,2)\simeq\mathfrak{su}(2,2),\qquad SU(2,2)/\{\pm\mathbf1\}\simeq SO_0(4,2)`, 'SU(2,2) is the relevant spin double cover. The quotient statement concerns the connected groups before further covers used to unwrap AdS time. The Lie-algebra identification is the local symmetry statement we need.'),
    p('The six-dimensional real vector of SO(4,2) is not the same representation as the four-component complex spinor of SU(2,2). Different matrix sizes can describe the same local transformations in different representations. Equal generator counts are a check, not by themselves a proof of isomorphism.'),
    m(r`4\ \text{translations}+6\ \text{Lorentz}+1\ \text{dilation}+4\ \text{SCTs}=15`, 'On the CFT side these are conformal transformations of four-dimensional Minkowski spacetime. On the bulk side the same algebra consists of AdS₅ isometries.'),
    note('Why two timelike embedding directions?', 'A four-dimensional Lorentzian boundary already has one timelike direction. The conformal embedding adds a null pair, which supplies one extra positive and one extra negative direction. The ambient space therefore has signature (4,2), not two independent physical times in the CFT or in AdS.'),
    m(r`ds^2_{\mathrm{ambient}}=\eta_{\mu\nu}dX^\mu dX^\nu+2\,dU\,dV,\quad A=\frac{U+V}{\sqrt2},\quad B=\frac{U-V}{\sqrt2},\quad2\,dU\,dV=dA^2-dB^2`),
    m(r`X\cdot X=0,\quad X\sim cX\ (c\ne0):\qquad(d+2)-1-1=d`, 'The conformal boundary can be represented locally by null rays: one constraint and one rescaling remove the two auxiliary dimensions. The AdS hyperboloid instead fixes X·X = −L² and has d + 1 dimensions.'),
  ], ['conformal-symmetry', 'so-d-2', 'group-theory', 'embedding'], 8, [[831,888]], [95]),

  s('reading-d3-r-symmetry', 'bridge', 7, 27, 'The six scalars know about rotations of S⁵', 'The CFT’s internal R-symmetry and the sphere’s rotations are another independent match.', [
    m(r`\sum_{I=1}^{6}(Y^I)^2=L^2\quad\Longrightarrow\quad S^5\subset\mathbb R^6,\qquad\dim SO(6)=15`, 'A five-sphere has six embedding coordinates. This is why its rotation group is SO(6), not SO(5). It acts on internal directions, not on boundary spacetime coordinates.'),
    m(r`\phi^I\mapsto R^I{}_J\phi^J,\qquad R\in SO(6),\qquad\mathfrak{so}(6)\simeq\mathfrak{su}(4)`, 'The six real scalars transform as a vector of SO(6). Supersymmetry makes this the R-symmetry: it also rotates the supercharges and their fermionic partners.'),
    m(r`\operatorname{Spin}(6)\simeq SU(4),\qquad SO(6)\simeq SU(4)/\{\pm\mathbf1\},\qquad\mathbf6\simeq\wedge^2\mathbf4`, 'The scalar six is the antisymmetric two-index representation of SU(4), with its appropriate reality condition. The four Weyl fermions and supercharges need spinor representations, so keeping the covering group SU(4) is important.'),
    m(r`\dim\wedge^2\mathbf4=\binom42=6,\qquad\dim SU(4)=4^2-1=15`, 'The same number 4 counts components of the defining R-symmetry representation, not four internal spatial dimensions. In this example the sphere still has five dimensions and is embedded in six.'),
    p('Do not identify this internal SU(4) with the colour SU(N). Colour is gauged and acts on matrix indices; R-symmetry is a global symmetry acting on the six species of scalar and the supersymmetry generators. Their indices label different structures.'),
  ], ['r-symmetry', 'group-theory', 'representations', 'supersymmetry'], 8, [[831,888]], [95]),

  s('reading-d3-supergroup', 'bridge', 7, 28, 'What PSU(2,2|4) actually packages', 'The superconformal symmetry joins spacetime symmetry, R-symmetry, and fermionic generators.', [
    m(r`\mathfrak{psu}(2,2|4)_{\mathrm{even}}=\mathfrak{su}(2,2)\oplus\mathfrak{su}(4)\simeq\mathfrak{so}(4,2)\oplus\mathfrak{so}(6)`, 'The even generators give the two bosonic symmetries just matched. Their dimensions are 15 + 15 = 30.'),
    m(r`16\ \text{Poincaré supercharges }Q\quad+\quad16\ \text{conformal supercharges }S\quad=\quad32\ \text{real odd generators}`, 'The asymptotically flat D3-brane background preserves sixteen supercharges. Its near-horizon AdS₅ × S⁵ background has the enhanced set of thirty-two, matching the full 4D superconformal algebra.'),
    p('In SU(2,2|4), the vertical bar separates the two parts of a graded defining vector space: a four-component block of signature (2,2), and a four-component internal block. The even transformations act within these blocks; the odd transformations mix them. It is not a list saying that the spacetime is “2 + 2 bosons and 4 fermions.”'),
    m(r`\operatorname{str}\begin{pmatrix}A& B\\C&D\end{pmatrix}=\operatorname{tr}A-\operatorname{tr}D`, 'S imposes the superdeterminant-one condition, or supertrace zero infinitesimally. It is not the ordinary determinant condition applied blindly to a bosonic 8 × 8 matrix.'),
    p('P means projective: quotient out the central U(1) that remains in this equal-block supergroup. After that quotient the even Lie algebra is exactly su(2,2) ⊕ su(4), without an extra independent u(1) generator. Global covers and discrete identifications still need care when specifying the exact symmetry acting on states.'),
    note('What has—and has not—been established', 'The bosonic and supersymmetric symmetry structures agree. This strongly constrains a possible map, but many different observables can carry the same representation. Dynamics must still match.'),
  ], ['supersymmetry', 'conformal-symmetry', 'r-symmetry', 'group-theory'], 8, [[831,888]], [95]),

  s('reading-d3-operators', 'cft', 7, 29, 'Build gauge-invariant operators before matching bulk fields', 'The matrix scalars are not themselves the gauge-invariant CFT observables in the dictionary.', [
    m(r`\phi^I\mapsto U\phi^IU^{-1},\qquad\mathcal O_k^{I_1\cdots I_k}=\operatorname{Tr}\!\left(\phi^{(I_1}\cdots\phi^{I_k)}\right)-\text{SO(6) traces}`, 'Parentheses symmetrize the R-symmetry indices. Subtracting traces makes the tensor traceless. The matrix trace instead contracts colour indices: these are two different operations.'),
    m(r`\mathcal O_2^{IJ}=\operatorname{Tr}(\phi^I\phi^J)-\frac{\delta^{IJ}}6\operatorname{Tr}\!\left(\sum_K\phi^K\phi^K\right)`, 'For k = 2 the subtraction is visible. Contracting I with J gives zero.'),
    m(r`Z=\phi^1+i\phi^2,\qquad\operatorname{Tr}Z^k,\qquad\Delta=k,\qquad SU(4)\text{ representation }[0,k,0]`, 'Tr Zᵏ is a highest-weight example in this half-BPS family. Supersymmetry protects its scaling dimension. For the interacting SU(N) theory, the single-trace family starts at k = 2 because Tr Z = 0.'),
    p('BPS means that a state or operator saturates an appropriate supersymmetry bound and is annihilated by some supercharges. “Half-BPS” specifies how much is preserved. It does not mean every observable involving the operator is automatically coupling-independent.'),
    m(r`\text{single trace}\ \longleftrightarrow\ \text{one bulk particle/string state},\qquad\text{multiple traces}\ \longleftrightarrow\ \text{multiparticle states}\quad(N\text{ large})`, 'This is the leading large-N organization. At finite N, trace identities and operator mixing limit the independence of this basis; one should not count infinitely many independent single traces at fixed N without those constraints.'),
  ], ['field-operator-map', 'bps', 'r-symmetry', 'correlators'], 8, [[894,944]], [95,96]),

  s('reading-d3-kk', 'ads', 7, 30, 'Kaluza–Klein modes resolve motion on the sphere', 'Expand an existing ten-dimensional field in angular patterns on S⁵. Each pattern becomes a five-dimensional field.', [
    m(r`\Phi(X,\Omega)=\sum_{\ell,a}\phi_{\ell a}(X)Y_{\ell a}(\Omega),\qquad-\nabla_{S^5}^2Y_{\ell a}=\frac{\ell(\ell+4)}{L^2}Y_{\ell a}`, 'X labels the AdS coordinates, Ω the sphere angles, and a the degeneracy within a harmonic level. These are not additional independent copies of the ten-dimensional field.'),
    m(r`(\Box_{\mathrm{AdS}_5}+\nabla_{S^5}^2)\Phi=0\quad\Longrightarrow\quad\left(\Box_{\mathrm{AdS}_5}-\frac{\ell(\ell+4)}{L^2}\right)\phi_{\ell a}=0`, 'This example is a minimally coupled massless ten-dimensional scalar. Angular gradients contribute a positive five-dimensional mass squared.'),
    m(r`m_\ell^2L^2=\ell(\ell+4),\qquad m^2L^2=\Delta(\Delta-4)\quad\Longrightarrow\quad\Delta=\ell+4`, 'The standard boundary dimension for this minimally coupled scalar tower is ℓ + 4, not ℓ. The other algebraic root is −ℓ.'),
    note('Do not confuse two different towers', 'The half-BPS operators of dimension k match a particular mixed tower of metric and five-form fluctuations, not the generic minimally coupled scalar above. Different ten-dimensional fields can use similar angular harmonics but obey different coupled AdS equations.'),
    m(r`m_k^2L^2=k(k-4),\qquad\Delta=k,\qquad[0,k,0]\ \text{on both sides}`, 'For the half-BPS scalar tower, the mass and R-symmetry representation match those of the symmetrized traceless scalar operators. At k = 2 the mass saturates the AdS₅ Breitenlohner–Freedman bound m²L² = −4; the correct near-boundary treatment then includes the degenerate-root possibility.'),
    p('Kaluza–Klein analysis does not manufacture the S⁵. The sphere first came from the angular directions of the D3 throat. The expansion now tells us how its geometric harmonics appear as masses and internal representations in AdS₅.'),
  ], ['field-operator-map', 'mass-dimension', 'r-symmetry', 'kaluza-klein'], 8, [[894,960]], [95,96]),

  s('reading-d3-protected-tests', 'bridge', 7, 31, 'Protected data let us compare opposite coupling regimes', 'A quantity that cannot vary with the coupling can be calculated where each theory is easiest.', [
    m(r`\langle\mathcal O_i(x)\mathcal O_j(0)\rangle=\frac{C_i\delta_{ij}}{|x|^{2\Delta_i}}`, 'This is the separated-point Euclidean form for scalar primaries in a basis with diagonal two-point functions. Matching an operator includes choosing its normalization.'),
    m(r`\langle\mathcal O_1(x_1)\mathcal O_2(x_2)\mathcal O_3(x_3)\rangle=\frac{C_{123}}{|x_{12}|^{\Delta_1+\Delta_2-\Delta_3}|x_{23}|^{\Delta_2+\Delta_3-\Delta_1}|x_{31}|^{\Delta_3+\Delta_1-\Delta_2}}`, 'Conformal symmetry fixes this spacetime dependence, but does not by itself fix the coefficient C₁₂₃. Internal-index tensor structures must be matched too.'),
    p('For the appropriate half-BPS two- and three-point functions in 𝒩 = 4 SYM, nonrenormalization results allow a comparison between weak-coupling field theory and strong-coupling supergravity. Protected dimensions are part of this story; protected coefficients require their own theorem and the proper operator basis.'),
    steps('Identify operators and bulk modes with the same spin, dimension and R-symmetry representation.', 'Fix normalizations and account for any mixing.', 'Compute the protected field-theory quantity in a tractable regime.', 'Compute its bulk counterpart from the renormalized action.', 'Compare the numerical coefficients, not merely the allowed power law.'),
    note('Not every correlator is protected', 'General four-point functions contain genuine dynamical information and can depend on λ. Supersymmetry does not turn the entire interacting theory into a free theory.'),
  ], ['correlators', 'bps', 'field-operator-map', 'classical-limit'], 8, [[945,1019]], [95,96]),

  s('reading-d3-witten-tests', 'bridge', 7, 32, 'Now chapter 4 has a physical reason behind it', 'The D3 argument identifies the theories. The source prescription tells us how to compare their observables.', [
    m(r`\phi(z,x)\sim z^{4-\Delta}h(x)+z^\Delta A(x),\qquad Z_{\mathrm{CFT}}[h]=Z_{\mathrm{IIB}}[h]`, 'h is the prescribed leading boundary coefficient and the CFT source. A is the response coefficient, with its precise relation to the expectation value fixed by renormalization. At special dimensions logarithmic terms modify this simple asymptotic form.'),
    m(r`W[h]=\log Z_{\mathrm{CFT}}[h]\simeq-S_{E,\mathrm{ren}}[\phi_{\mathrm{cl}}[h]],\qquad\left.\frac{\delta^nW}{\delta h(x_1)\cdots\delta h(x_n)}\right|_{h=0}=\langle\mathcal O(x_1)\cdots\mathcal O(x_n)\rangle_c`, 'This uses the Euclidean convention Z[h] = ⟨exp(∫hO)⟩. The approximation replaces the full string path integral by a suitable classical bulk saddle. A zero-source normalization subtracts a source-independent constant.'),
    m(r`\langle\mathcal O_1(x_1)\mathcal O_2(x_2)\mathcal O_3(x_3)\rangle\ \sim\ g_{123}\int_{\mathrm{AdS}}d^5X\,\sqrt g\ K_{\Delta_1}(X;x_1)K_{\Delta_2}(X;x_2)K_{\Delta_3}(X;x_3)`, 'A bulk cubic interaction gives a three-point Witten diagram. Each K is a bulk-to-boundary propagator: the response in the bulk to a specified boundary insertion. Overall signs and factors follow the chosen action and operator normalization.'),
    m(r`\mathcal A_{\mathrm{exchange}}\sim\int d^5X\,d^5Y\,\sqrt{g(X)}\sqrt{g(Y)}\ K_1(X)K_2(X)G(X,Y)K_3(Y)K_4(Y)`, 'A bulk-to-bulk propagator G joins two interaction points for an exchange contribution to a four-point function. Contact interactions give additional contributions. The external boundary points are operator insertions, not particles physically launched from a material wall.'),
    m(r`\int_\epsilon^1\frac{dz}{z^5}=\frac14(\epsilon^{-4}-1),\qquad S_{E,\mathrm{ren}}=\lim_{\epsilon\to0}\left[S_{E,\mathrm{regulated}}+S_{E,\mathrm{counterterms}}\right]`, 'The simple integral illustrates a near-boundary divergence. Holographic renormalization adds the appropriate local boundary counterterms before removing the regulator; a divergent unrenormalized on-shell action is not the final CFT generating functional.'),
    p('The path between the theories is now explicit: branes identify the microscopic pair; decoupling isolates them; the near-horizon metric reveals AdS; symmetries and spectra organize the map; boundary sources turn it into calculations. The CFT is on the conformal boundary and describes bulk physics through this dictionary, not by sharing the same local coordinates with it.'),
  ], ['correlators', 'source-response', 'holographic-renormalization', 'boundary-not-bulk', 'open-closed'], 8, [[961,1019]], [95,96]),

  s('reading-d3-beyond-example', 'bridge', 7, 33, 'What changes when we leave this example?', 'The D3 construction is a precise starting point, not a claim that every spacetime or gauge theory has the same dictionary.', [
    p('A finite-temperature boundary state is related to an appropriate black-hole or black-brane bulk state. Changing the matter content or deforming the CFT can break supersymmetry or conformal invariance and changes the bulk solution and boundary conditions.'),
    p('QCD-like holographic models can borrow useful ideas, but 𝒩 = 4 SYM is not QCD: its matter content, supersymmetry and conformal behavior differ. Any comparison must say which approximation or model is being used.'),
    p('Other branes and compact spaces lead to other dimensions and amounts of supersymmetry. De Sitter questions require a separate discussion of proposed dictionaries and their status; replacing a sign in the AdS metric is not a derivation of a de Sitter correspondence.'),
    note('Keep the successful chain visible', 'For any extension, ask what the two theories are, which parameter regime is controlled, what boundary or asymptotic data are fixed, and which observable has actually been matched. This separates a concrete calculation from an appealing analogy.'),
  ], ['extensions', 'open-closed', 'parameter-map'], 8, [[1020,1026]], [96]),
];
