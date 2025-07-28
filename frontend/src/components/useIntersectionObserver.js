import { useEffect, useState, useRef } from 'react';

// Ce hook personnalisé nous dira si un élément est visible à l'écran ou non
export function useIntersectionObserver(options) {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null); // La référence à l'élément du DOM que l'on veut observer

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // L'Intersection Observer est une API du navigateur
    const observer = new IntersectionObserver(
      ([entry]) => {
        // On met à jour l'état quand l'élément entre ou sort de la vue
        setIntersecting(entry.isIntersecting);
      }, 
      options
    );

    observer.observe(element);

    // Nettoyage : on arrête d'observer l'élément quand le composant est démonté
    return () => observer.unobserve(element);
  }, [options]);

  // On retourne la référence (à attacher à l'élément JSX) et l'état de visibilité
  return [ref, isIntersecting];
}