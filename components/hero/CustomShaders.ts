/**
 * GLSL used across the hero scene.
 *
 * Everything here is written so the per-vertex work happens on the GPU. The
 * particle galaxy in particular never touches a CPU loop: each point derives its
 * own orbit from static attributes plus `uTime`, which is what lets it run tens
 * of thousands of points at 60fps.
 */

/** Ashima 3D simplex noise. Shared by every shader below. */
export const SIMPLEX_NOISE = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`;

/* ------------------------------------------------------------------ *
 * Developer Core — displaced icosahedron with a holographic surface
 * ------------------------------------------------------------------ */

export const CORE_VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform float uPointer;
  uniform float uScroll;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vNoise;

  ${SIMPLEX_NOISE}

  void main() {
    // Two octaves: a slow swelling shape plus finer surface chatter.
    float slow = snoise(normal * 1.15 + vec3(0.0, uTime * 0.16, 0.0));
    float fine = snoise(normal * 3.4  - vec3(uTime * 0.28, 0.0, 0.0)) * 0.4;
    float n = slow + fine;

    // Pointer proximity makes the core visibly "lean in" toward the cursor.
    float amount = 0.17 + uPulse * 0.07 + uPointer * 0.09 + uScroll * 0.05;
    vec3 displaced = position + normal * n * amount;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

    vNoise   = n;
    vNormal  = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const CORE_FRAGMENT = /* glsl */ `
  uniform float uTime;
  uniform float uPulse;
  uniform vec3  uColorDeep;
  uniform vec3  uColorMid;
  uniform vec3  uColorHot;

  varying vec3  vNormal;
  varying vec3  vViewDir;
  varying float vNoise;

  void main() {
    // Rim light: bright where the surface turns away from the viewer.
    float fresnel = pow(1.0 - clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0), 2.6);

    // Flowing gradient driven by the same noise that displaced the vertex,
    // so colour and shape breathe together instead of sliding past each other.
    float band = smoothstep(-0.7, 0.9, vNoise + sin(uTime * 0.7) * 0.14);

    vec3 body = mix(uColorDeep, uColorMid, band);
    vec3 col  = mix(body, uColorHot, fresnel * 0.85);

    // Energy veins.
    float veins = smoothstep(0.72, 0.98, abs(sin(vNoise * 7.0 + uTime * 1.1)));
    col += uColorHot * veins * 0.32;

    float glow = fresnel * (0.4 + uPulse * 0.22);
    // Kept well below 1.0: this sits directly behind the headline, and an
    // opaque additive core is what washes the text out.
    gl_FragColor = vec4(col, clamp(0.2 + glow, 0.0, 0.72));
  }
`;

/* ------------------------------------------------------------------ *
 * Particle galaxy — orbits computed entirely in the vertex shader
 * ------------------------------------------------------------------ */

export const GALAXY_VERTEX = /* glsl */ `
  attribute float aRadius;    // base orbital radius
  attribute float aAngle;     // starting angle
  attribute float aSpeed;     // angular velocity
  attribute float aScale;     // point size
  attribute float aLayer;     // 0..1, which depth shell this belongs to
  attribute vec3  aColor;
  attribute float aSeed;

  uniform float uTime;
  uniform float uScroll;      // 0..1 across the whole hero scroll
  uniform float uPixelRatio;
  uniform float uPointerX;
  uniform float uPointerY;

  varying vec3  vColor;
  varying float vAlpha;

  ${SIMPLEX_NOISE}

  void main() {
    float t = uTime;

    // --- phase 1: galaxy expands -------------------------------------
    float expand = 1.0 + smoothstep(0.0, 0.35, uScroll) * 0.85;

    // --- phase 3: orbits flatten into a network lattice ---------------
    float lattice = smoothstep(0.62, 1.0, uScroll);

    float angle  = aAngle + t * aSpeed * (1.0 - lattice * 0.75);
    float radius = aRadius * expand;

    vec3 orbit = vec3(
      cos(angle) * radius,
      sin(angle * 0.85 + aSeed * 6.28) * radius * 0.42,
      sin(angle) * radius
    );

    // Turbulence keeps the shells from reading as perfect rings.
    vec3 turb = vec3(
      snoise(orbit * 0.14 + vec3(t * 0.09, 0.0, 0.0)),
      snoise(orbit * 0.14 + vec3(0.0, t * 0.11, 5.2)),
      snoise(orbit * 0.14 + vec3(3.7, 0.0, t * 0.08))
    );
    orbit += turb * (0.75 + aLayer * 1.5) * (1.0 - lattice * 0.6);

    // Snap toward a grid as the scene becomes a network visualisation.
    vec3 snapped = floor(orbit / 1.6 + 0.5) * 1.6;
    orbit = mix(orbit, snapped, lattice * 0.7);

    // Parallax: outer shells respond more, which reads as depth.
    orbit.x += uPointerX * (0.4 + aLayer * 1.6);
    orbit.y += uPointerY * (0.3 + aLayer * 1.2);

    vec4 mvPosition = modelViewMatrix * vec4(orbit, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Particles form and dissolve on their own cycles.
    float life = 0.55 + 0.45 * sin(t * (0.35 + aSpeed * 2.0) + aSeed * 12.0);
    float twinkle = 0.7 + 0.3 * sin(t * 2.2 + aSeed * 40.0);

    gl_PointSize = aScale * uPixelRatio * twinkle * (140.0 / max(-mvPosition.z, 0.001));

    vColor = aColor;
    // Fade with distance so the far shells sit back in the fog.
    vAlpha = life * smoothstep(-70.0, -8.0, mvPosition.z);
  }
`;

export const GALAXY_FRAGMENT = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2 offset = gl_PointCoord - vec2(0.5);
    float d = dot(offset, offset);          // squared distance, avoids a sqrt
    if (d > 0.25) discard;

    // Steeper falloff + a hard ceiling: additive blending stacks these on
    // top of each other, so a soft wide sprite turns the whole hero milky.
    float glow = pow(1.0 - d * 4.0, 3.2);
    gl_FragColor = vec4(vColor, glow * vAlpha * 0.42);
  }
`;
