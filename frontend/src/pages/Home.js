import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="home-container">
      <h1>Bienvenue sur Agro App</h1>
      <p>
        Cette application vous permet de consulter la météo, de localiser des lieux et de tenir un calendrier agricole personnalisé. 
        <br/>
        
      </p>
      <p>
        Utilisez le menu pour accéder aux différentes fonctionnalités.
      </p>
      {/* Ajoute ici une image, un logo ou des liens si tu veux */}
    </div>
  );
}

export default Home;