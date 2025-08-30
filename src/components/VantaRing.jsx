import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const VantaRings = ({
  backgroundColor = 0x202840,
  color = 0x890f7a,
  mouseControls = true,
  touchControls = true,
  gyroControls = false,
  minHeight = 200,
  minWidth = 200,
  scale = 1.00,
  scaleMobile = 1.00,
  speed = 1,
  className = "",
  style = {}
}) => {
  const containerRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    // VantaJS Rings implementation
    class VantaRings {
      constructor(options = {}) {
        this.options = {
          backgroundColor: backgroundColor,
          color: color,
          mouseControls: mouseControls,
          touchControls: touchControls,
          gyroControls: gyroControls,
          minHeight: minHeight,
          minWidth: minWidth,
          scale: scale,
          scaleMobile: scaleMobile,
          speed: speed,
          el: containerRef.current,
          THREE: THREE,
          ...options
        };

        // Enhanced vibrant color palette
        this.colors = [
          0xff006e, // Hot Pink
          0xff4081, // Pink A200
          0xe91e63, // Pink 500
          0x9c27b0, // Purple 500
          0x673ab7, // Deep Purple 500
          0x3f51b5, // Indigo 500
          0x2196f3, // Blue 500
          0x03a9f4, // Light Blue 500
          0x00bcd4, // Cyan 500
          0x009688, // Teal 500
          0x4caf50, // Green 500
          0x8bc34a, // Light Green 500
          0xcddc39, // Lime 500
          0xffeb3b, // Yellow 500
          0xffc107, // Amber 500
          0xff9800, // Orange 500
          0xff5722, // Deep Orange 500
          0xf44336, // Red 500
          0x00e676, // Green A400
          0x1de9b6, // Teal A400
          0x00e5ff, // Light Blue A400
          0x7c4dff, // Deep Purple A200
          0xff4569, // Custom Hot Pink
          0x6366f1, // Indigo 500 Modern
          0x8b5cf6, // Violet 500
          0x06b6d4, // Cyan 500 Modern
          0x10b981, // Emerald 500
          0xf59e0b, // Amber 500 Modern
          0xef4444, // Red 500 Modern
          0xec4899  // Pink 500 Modern
        ];
        
        this.init();
      }

      init() {
        this.el = this.options.el;
        if (!this.el) return;

        this.prepareEl();
        this.initThree();
        this.setSize();
        this.initScene();
        this.initMouse();
        this.resize();
        this.animationLoop();
        
        this.bindEvents();
      }

      prepareEl() {
        if (getComputedStyle(this.el).position === 'static') {
          this.el.style.position = 'relative';
        }
      }

      initThree() {
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.el.appendChild(this.renderer.domElement);
        
        Object.assign(this.renderer.domElement.style, {
          position: 'absolute',
          zIndex: 0,
          top: 0,
          left: 0,
          background: ''
        });
        
        this.renderer.domElement.classList.add('vanta-canvas');
        this.scene = new THREE.Scene();
      }

      setSize() {
        this.scale = this.isMobile() && this.options.scaleMobile ? 
          this.options.scaleMobile : this.options.scale;
        
        this.width = Math.max(this.el.offsetWidth, this.options.minWidth);
        this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
      }

      isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
               window.innerWidth < 600;
      }

      material(color) {
        const material = new THREE.MeshLambertMaterial({ 
          color: color,
          transparent: true,
          opacity: 0.9
        });
        
        // Add emissive properties for glow effect
        material.emissive = new THREE.Color(color);
        material.emissiveIntensity = 0.1;
        
        return material;
      }

      random(min = 0, max = 1) {
        return min + Math.random() * (max - min);
      }

      randomInt(min = 0, max = 1) {
        return Math.floor(min + Math.random() * (max - min + 1));
      }

      randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
      }

      genRing(color, innerRadius, thickness, rotation = 0, arc = 1.4 * Math.PI, yPos = 0, speed = 1) {
        if (!this.rings) this.rings = [];
        if (innerRadius < 1) innerRadius = 1;

        const extrudeSettings = {
          depth: 0.4,
          bevelEnabled: false,
          steps: 1,
          curveSegments: Math.floor(64 * arc / 6.14)
        };

        const shape = new THREE.Shape();
        const outerRadius = innerRadius + thickness;
        
        shape.absarc(0, 0, outerRadius, 0, arc, false);
        shape.lineTo(innerRadius * Math.cos(arc), innerRadius * Math.sin(arc));
        shape.absarc(0, 0, innerRadius, arc, 0, true);

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = this.material(color);

        // Enhanced transparency and glow effects
        if (this.randomInt(0, 1) === 0 || innerRadius > 60) {
          material.transparent = true;
          material.opacity = Math.max(50 / innerRadius + this.random(-0.2, 0.4), 0.3);
          // Increase emissive for smaller rings
          material.emissiveIntensity = Math.max(0.05, 0.3 / Math.max(innerRadius / 20, 1));
        } else {
          // Make solid rings more vibrant
          material.transparent = true;
          material.opacity = this.random(0.7, 0.95);
          material.emissiveIntensity = 0.15;
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = Math.PI / 2;
        mesh.rotation.z = rotation;
        mesh.position.y = yPos;
        mesh.speed = 0.001 * speed;
        mesh.receiveShadow = true;
        mesh.castShadow = true;

        this.rings.push(mesh);
        this.cont.add(mesh);

        // Recursive ring generation
        if (innerRadius < 20 && arc < 1.3 * Math.PI && this.randomInt(0, 2)) {
          try {
            this.genRing(
              this.randomChoice(this.colors),
              innerRadius + this.random(-1, 3),
              thickness + this.random(-2, 0),
              rotation + arc,
              arc + this.random(-0.5, 0.5),
              yPos + this.random(-3, 1),
              speed
            );
          } catch (e) {}
        }

        return mesh;
      }

      initScene() {
        this.cont = new THREE.Group();
        this.cont.position.set(30, 0, 0);
        this.cont.rotation.x = 0.06667;
        this.cont.rotation.z = 0.16667;
        this.scene.add(this.cont);

        const ringCount = this.isMobile() ? 30 : 60;
        
        for (let i = 0; i < ringCount; i++) {
          let innerRadius, thickness;
          
          if (this.randomInt(0, 3)) {
            innerRadius = this.random(2, 4) + this.random(1, 30) * this.random(1, 2) * this.random(1, 2) * this.random(1, 2);
            if (this.isMobile()) innerRadius *= 0.5;
            thickness = this.random(0, 3.5) + this.random(0, 3.5) - this.randomInt(0, innerRadius / 4) - innerRadius / 50;
          } else {
            innerRadius = this.random(1, 3) * this.random(2, 4);
            thickness = this.random(1, 2) * this.random(1, 2) * this.random(1.1, 1.5);
          }

          const minThickness = 0.05 * Math.pow(2, this.randomInt(0, 4));
          if (thickness < minThickness) thickness = minThickness;

          this.genRing(
            this.randomChoice(this.colors),
            innerRadius,
            thickness,
            this.random(0, 1000),
            this.random(1, 6),
            this.random(0, 50 / (innerRadius + 1) + 5) + 5 / thickness / (innerRadius + 0.5),
            0.25 * Math.max(-this.random(0.5, 2), this.random(1, 50 - innerRadius / 2) - innerRadius / 2)
          );
        }

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(25, this.width / this.height, 10, 10000);
        this.camera.position.set(0, 150, 200);
        this.scene.add(this.camera);

        // Enhanced lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        // Multiple colored point lights for vibrant effects
        this.pointLight1 = new THREE.PointLight(0xff006e, 0.8, 1000);
        this.pointLight1.position.set(100, 100, 100);
        this.scene.add(this.pointLight1);
        
        this.pointLight2 = new THREE.PointLight(0x00e5ff, 0.6, 800);
        this.pointLight2.position.set(-100, 150, 200);
        this.scene.add(this.pointLight2);
        
        this.pointLight3 = new THREE.PointLight(0x10b981, 0.7, 900);
        this.pointLight3.position.set(0, -100, 150);
        this.scene.add(this.pointLight3);

        // Enhanced spotlight with color
        this.spot = new THREE.SpotLight(0xffffff, 1.2);
        this.spot.position.set(-15, 50, 100);
        this.spot.penumbra = 0.8;
        this.spot.angle = 0.6;
        this.spot.decay = 1;
        this.spot.distance = 400;
        this.spot.target = this.cont;
        this.scene.add(this.spot);
        
        // Add rim lighting effect
        this.rimLight = new THREE.DirectionalLight(0x7c4dff, 0.5);
        this.rimLight.position.set(-1, 1, 1);
        this.scene.add(this.rimLight);
      }

      initMouse() {
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
      }

      onMouseMove = (event) => {
        if (!this.options.mouseControls) return;
        
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
          this.mouseX = x;
          this.mouseY = y;
          
          const normalizedX = x / this.width;
          const normalizedY = y / this.height;
          
          if (this.camera) {
            this.camera.ox = this.camera.ox || this.camera.position.x;
            this.camera.oy = this.camera.oy || this.camera.position.y;
            this.camera.tx = this.camera.ox + 50 * (normalizedX - 0.5);
            this.camera.ty = this.camera.oy - 50 * normalizedY;
          }
        }
      };

      onTouchMove = (event) => {
        if (!this.options.touchControls || event.touches.length !== 1) return;
        
        const rect = this.renderer.domElement.getBoundingClientRect();
        const x = event.touches[0].clientX - rect.left;
        const y = event.touches[0].clientY - rect.top;
        
        if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
          this.mouseX = x;
          this.mouseY = y;
          
          const normalizedX = x / this.width;
          const normalizedY = y / this.height;
          
          if (this.camera) {
            this.camera.ox = this.camera.ox || this.camera.position.x;
            this.camera.oy = this.camera.oy || this.camera.position.y;
            this.camera.tx = this.camera.ox + 50 * (normalizedX - 0.5);
            this.camera.ty = this.camera.oy - 50 * normalizedY;
          }
        }
      };

      onResize = () => {
        this.setSize();
        
        if (this.camera) {
          this.camera.aspect = this.width / this.height;
          this.camera.updateProjectionMatrix();
        }
        
        if (this.renderer) {
          this.renderer.setSize(this.width, this.height);
          this.renderer.setPixelRatio(window.devicePixelRatio / this.scale);
        }
      };

      bindEvents() {
        window.addEventListener('resize', this.onResize);
        
        if (this.options.mouseControls) {
          window.addEventListener('mousemove', this.onMouseMove);
        }
        
        if (this.options.touchControls) {
          window.addEventListener('touchstart', this.onTouchMove);
          window.addEventListener('touchmove', this.onTouchMove);
        }
      }

      resize() {
        this.onResize();
      }

      animationLoop = () => {
        if (!this.t) this.t = 0;
        if (!this.t2) this.t2 = 0;

        const now = performance.now();
        
        if (this.prevNow) {
          let delta = (now - this.prevNow) / (1000 / 60);
          delta = Math.max(0.2, Math.min(delta, 5));
          this.t += delta;
          this.t2 += (this.options.speed || 1) * delta;
        }
        
        this.prevNow = now;

        // Update camera position
        if (this.camera) {
          if (Math.abs(this.camera.tx - this.camera.position.x) > 0.01) {
            const diff = this.camera.tx - this.camera.position.x;
            this.camera.position.x += 0.02 * diff;
          }
          
          if (Math.abs(this.camera.ty - this.camera.position.y) > 0.01) {
            const diff = this.camera.ty - this.camera.position.y;
            this.camera.position.y += 0.02 * diff;
          }
          
          this.camera.lookAt(new THREE.Vector3(0, 25, 7));
          this.camera.near = Math.max(0.5 * this.camera.position.z - 20, 1);
          this.camera.updateProjectionMatrix();
        }

        // Rotate rings
        if (this.rings) {
          this.rings.forEach(ring => {
            ring.rotation.z += ring.speed;
          });
        }

        // Animate container with more dynamic movement
        if (this.cont) {
          const time = 0.001 * this.t;
          this.cont.rotation.x += 0.0002 * Math.sin(time * 0.7);
          this.cont.rotation.z += 0.00015 * Math.cos(time * 0.5);
          
          // Subtle position animation for more life
          this.cont.position.y = Math.sin(time * 0.3) * 2;
        }

        // Animate colored lights for dynamic lighting
        if (this.pointLight1 && this.pointLight2 && this.pointLight3) {
          const time = 0.001 * this.t;
          
          this.pointLight1.position.x = 100 + Math.sin(time * 0.5) * 50;
          this.pointLight1.position.y = 100 + Math.cos(time * 0.7) * 30;
          
          this.pointLight2.position.x = -100 + Math.cos(time * 0.4) * 40;
          this.pointLight2.position.z = 200 + Math.sin(time * 0.6) * 60;
          
          this.pointLight3.position.y = -100 + Math.sin(time * 0.8) * 20;
          this.pointLight3.position.x = Math.cos(time * 0.3) * 80;
        }

        // Render with enhanced effects
        if (this.scene && this.camera && this.renderer) {
          this.renderer.render(this.scene, this.camera);
          this.renderer.setClearColor(this.options.backgroundColor, 0.95);
        }

        this.animationId = requestAnimationFrame(this.animationLoop);
      };

      destroy() {
        // Remove event listeners
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('touchstart', this.onTouchMove);
        window.removeEventListener('touchmove', this.onTouchMove);

        // Cancel animation
        if (this.animationId) {
          cancelAnimationFrame(this.animationId);
        }

        // Dispose of Three.js objects
        if (this.scene) {
          this.scene.traverse((child) => {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(material => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          });
        }

        // Remove canvas
        if (this.renderer && this.renderer.domElement && this.el) {
          this.el.removeChild(this.renderer.domElement);
          this.renderer.dispose();
        }
      }
    }

    // Initialize Vanta effect
    if (containerRef.current) {
      vantaEffect.current = new VantaRings({
        backgroundColor,
        color,
        mouseControls,
        touchControls,
        gyroControls,
        minHeight,
        minWidth,
        scale,
        scaleMobile,
        speed
      });
    }

    // Cleanup on unmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [backgroundColor, color, mouseControls, touchControls, gyroControls, minHeight, minWidth, scale, scaleMobile, speed]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        ...style
      }}
    />
  );
};

// Example usage component
const VantaRingsDemo = () => {
  return (
    <div style={{ height: '100vh', width: '100%', background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)' }}>
      <VantaRings
        backgroundColor={0x0}
        color={0xff}
        mouseControls={true}
        touchControls={true}
        gyroControls={false}
        minHeight={200}
        minWidth={200}
        scale={1.0}
        scaleMobile={1.0}
        speed={1.2}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '2rem',
        color: 'white',
        textAlign: 'center',
        paddingTop: '20vh'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          VantaJS Rings in React
        </h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          Interactive 3D rings background effect
        </p>
      </div>
    </div>
  );
};

export default VantaRingsDemo;