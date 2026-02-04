import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Vertex Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Fragment Shader
const fragmentShader = `
uniform sampler2D tDiffuse;
uniform sampler2D tMap;
uniform float uVelo;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 map = texture2D(tMap, uv);
  
  // Distortion based on map (mouse trail) or velocity
  // Simple ripple effect using uVelo as a global distortion intensity
  float distortion = uVelo * 0.02;
  vec2 distortedUv = uv + vec2(sin(uv.y * 10.0 + uVelo), cos(uv.x * 10.0)) * distortion;
  
  gl_FragColor = texture2D(tDiffuse, distortedUv);
}
`;

const LiquidDistortion = ({ imageSrc }: { imageSrc: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Setup
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.OrthographicCamera(
            width / -2, width / 2, height / 2, height / -2, 1, 1000
        );
        camera.position.z = 1;
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Load Texture
        const loader = new THREE.TextureLoader();
        const texture = loader.load(imageSrc);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;

        // Material
        const material = new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: { value: texture },
                tMap: { value: new THREE.DataTexture(new Float32Array(4), 1, 1, THREE.RGBAFormat, THREE.FloatType) },
                uVelo: { value: 0 },
                uResolution: { value: new THREE.Vector2(width, height) }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
        });

        const geometry = new THREE.PlaneGeometry(width, height);
        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Animation Loop
        let animationId: number;
        let targetVelo = 0;

        const onMouseMove = (e: MouseEvent) => {
            // Simple velocity simulation based on mouse movement speed could go here
            targetVelo = 1.0;
        };

        window.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            targetVelo *= 0.95; // Decay
            if (plane.material.uniforms.uVelo) {
                plane.material.uniforms.uVelo.value = targetVelo;
            }

            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            const w = containerRef.current.clientWidth;
            const h = containerRef.current.clientHeight;
            renderer.setSize(w, h);

            camera.left = w / -2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = h / -2;
            camera.updateProjectionMatrix();

            plane.geometry.dispose();
            plane.geometry = new THREE.PlaneGeometry(w, h);
            if (plane.material.uniforms.uResolution) {
                plane.material.uniforms.uResolution.value.set(w, h);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            plane.geometry.dispose();
            material.dispose();
            texture.dispose();
        };
    }, [imageSrc]);

    return <div ref={containerRef} className="w-full h-full" />;
};

export default LiquidDistortion;
