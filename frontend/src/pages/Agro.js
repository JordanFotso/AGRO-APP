import React from 'react';
import AgroNavbar from '../components/AgroNavbar';

function Agro() {
  return (
    <div>
      <AgroNavbar />
      <p>
        Bienvenue sur la page Agro réservée aux utilisateurs connectés.<br />
        Ici vous pouvez gérer vos cultures, calendriers et tâches agricoles.<br />
        Utilisez le menu pour accéder à toutes les fonctionnalités de gestion agricole personnalisée.
      </p>
    </div>
  );
}

export default Agro;