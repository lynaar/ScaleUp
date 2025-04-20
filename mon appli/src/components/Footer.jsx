// components/Footer.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons'


const Footer = () => {
  return (
    <footer id ="contact" style={{ 
      backgroundColor: '#57193c',
      padding: '2rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{ 
        display: 'flex',
        gap: '2rem',
        marginBottom: '1rem'
      }}>
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{
            color: 'white',
            fontSize: '1.8rem',
            transition: 'transform 0.3s ease'
          }}
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>

        <a 
          href="https://facebook.com" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Facebook"
          style={{
            color: 'white',
            fontSize: '1.8rem',
            transition: 'transform 0.3s ease'
          }}
        >
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        



      </div>

      <p style={{ 
        color: 'white',
        marginTop: '0.5rem',
        fontSize: '0.9rem'
      }}>
        © ScaleUp. Tous droits réservés.
      </p>
    </footer>
  )
}

export default Footer