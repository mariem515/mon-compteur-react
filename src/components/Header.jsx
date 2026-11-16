export default function Header({ titre, sousTitre }) {
  const dateDuJour = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="header">
      <h1>{titre}</h1>
      <p>{sousTitre}</p>

      <small
        style={{
          color: '#94a3b8',
          display: 'block',
          marginTop: '6px',
        }}
      >
        Date de la session : {dateDuJour}
      </small>
    </header>
  );
}