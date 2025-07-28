import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Toujours importer le CSS

// Importez le hook que nous venons de créer
import { useIntersectionObserver } from '../components/useIntersectionObserver';

// Le composant FeatureCard ne change pas
function FeatureCard({ icon, title, description, onClick }) {
    // On peut aussi animer chaque carte individuellement !
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    return (
      <div 
        ref={ref}
        className={`feature-card ${isIntersecting ? 'section-visible' : 'section-hidden'}`}
        onClick={onClick}
      >
        <span className="material-symbols-outlined card-icon">{icon}</span>
        <div className="card-title">{title}</div>
        <div className="card-description">{description}</div>
      </div>
    );
}

// Composant pour la nouvelle section visuelle
function HowItWorksSection() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section 
      ref={ref}
      className={`how-it-works-section ${isIntersecting ? 'section-visible' : 'section-hidden'}`}
    >
      <h2>Simple, puissant et toujours à portée de main</h2>
      <div className="steps-container">
        <div className="step">
          {/* EMPLACEMENT IMAGE 2 */}
          <img src="https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Planifiez vos cultures" className="step-image"/>
          <h3>1. Planifiez</h3>
          <p>Ajoutez vos parcelles, définissez vos cultures et planifiez vos tâches directement sur le calendrier agricole.</p>
        </div>
        <div className="step">
          {/* EMPLACEMENT IMAGE 3 */}
          <img src="https://images.pexels.com/photos/7005697/pexels-photo-7005697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Suivez la météo" className="step-image"/>
          <h3>2. Suivez</h3>
          <p>Gardez un œil sur la météo locale précise et suivez l'avancement de vos tâches en temps réel.</p>
        </div>
        <div className="step">
          {/* EMPLACEMENT IMAGE 4 */}
          <img src="https://images.pexels.com/photos/4505458/pexels-photo-4505458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Optimisez vos récoltes" className="step-image"/>
          <h3>3. Optimisez</h3>
          <p>Utilisez les données de géolocalisation et l'historique de vos cultures pour prendre les meilleures décisions.</p>
        </div>
      </div>
    </section>
  );
}


function Home() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Chaque section principale peut avoir sa propre animation
  const [heroRef, isHeroVisible] = useIntersectionObserver({ threshold: 0.2 });
  const [featuresRef, isFeaturesVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div className="home-container">
      <div 
        ref={heroRef}
        className={`hero-section ${isHeroVisible ? 'section-visible' : 'section-hidden'}`}
      >
        <div className="hero-image-container">
            {/* EMPLACEMENT IMAGE 1 (bannière) */}
            <img 
                src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg" 
                alt="Champ de culture moderne" 
                className="hero-image"
            />
        </div>
        <h1>Bienvenue sur Agro App</h1>
        <p>
          L’application tout-en-un pour <b>gérer vos cultures</b>, <b>planifier vos tâches</b>, <b>suivre la météo</b> et <b>localiser vos plantations</b>.
        </p>
      </div>

      <div 
        ref={featuresRef}
        className="features-grid"
      >
        {/* Les cartes s'animeront maintenant une par une grâce au hook mis à l'intérieur */}
        <FeatureCard icon="cloud" title="Météo locale" description="..." onClick={() => navigate('/meteo')} />
        <FeatureCard icon="spa" title="Gestion des cultures" description="..." onClick={() => navigate('/agro/cultures')} />
        <FeatureCard icon="calendar_month" title="Calendriers agricoles" description="..." onClick={() => navigate('/agro/calendriers')} />
        <FeatureCard icon="task" title="Tâches & rappels" description="..." onClick={() => navigate('/agro/taches')} />
        <FeatureCard icon="location_on" title="Géolocalisation" description="..." onClick={() => navigate('/agro/cultures')} />
        <FeatureCard icon={user ? "account_circle" : "login"} title={user ? "Mon profil" : "Connexion"} description="..." onClick={() => navigate('/profil')} />
      </div>

      {/* --- NOUVELLE SECTION VISUELLE --- */}
      <HowItWorksSection />
      
      {/* La section "Fonctionnalités principales" peut aussi être animée de la même façon */}
      {/* ... */}
      
      <footer className="footer">
        © 2025 Agro App — Propulsé par OpenWeatherMap, Photon & OpenStreetMap
      </footer>
    </div>
  );
}

export default Home;