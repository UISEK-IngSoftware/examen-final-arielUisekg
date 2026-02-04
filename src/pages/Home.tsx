import { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonAvatar,
  IonLoading,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { FuturamaCharacter } from '../types/Futurama';
import { futuramaService } from '../services/futuramaService';
import '../styles/Home.css';

const Home: React.FC = () => {
  // Estado para almacenar la lista de personajes
  const [characters, setCharacters] = useState<FuturamaCharacter[]>([]);
  // Estado para el indicador de carga
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para almacenar mensajes de error
  const [error, setError] = useState<string | null>(null);
  // Estado para el número de página actual
  const [currentPage, setCurrentPage] = useState<number>(1);
  // Número de personajes a mostrar por página
  const charactersPerPage = 6;
  // Número total de páginas
  const totalPages = 9;

  // Hook useEffect para obtener personajes de la API cuando el componente se monta
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // Obtener 50 personajes de la API
        const items = await futuramaService.fetchCharacters(50);
        // Establecer los personajes en el estado
        setCharacters(items);
      } catch (err) {
        // Establecer el mensaje de error si la llamada a la API falla
        setError('Failed to fetch characters. Please try again later.');
      } finally {
        // Ocultar el indicador de carga
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Función para manejar errores al cargar imágenes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Reemplazar la imagen rota con una imagen de respaldo
    e.currentTarget.src = '/favicon.png';
  };

  // Función para manejar cambios de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Dividir el array de personajes para obtener los personajes de la página actual
  const paginatedCharacters = characters.slice(
    (currentPage - 1) * charactersPerPage,
    currentPage * charactersPerPage
  );

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Futurama Characters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Indicador de carga */}
        <IonLoading isOpen={loading} message={'Loading...'} />
        {/* Mensaje de error */}
        {error && (
          <IonCard>
            <IonCardContent>{error}</IonCardContent>
          </IonCard>
        )}
        {/* Mensaje de estado vacío */}
        {!loading && !error && characters.length === 0 && (
          <IonCard>
            <IonCardContent>No characters found.</IonCardContent>
          </IonCard>
        )}
        {/* Lista de personajes y paginación */}
        {!error && (
          <>
            <IonList>
              {paginatedCharacters.map((character) => (
                <IonCard key={character.id} button={true}>
                  <IonItem>
                    <IonAvatar slot="start">
                      <img
                        src={character.image}
                        alt={character.name}
                        onError={handleImageError}
                      />
                    </IonAvatar>
                    <IonLabel>
                      <h2>{character.name}</h2>
                      <p>Gender: {character.gender}</p>
                      <p>Status: {character.status}</p>
                    </IonLabel>
                  </IonItem>
                </IonCard>
              ))}
            </IonList>
            {/* Controles de paginación */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <IonButton
                  key={page}
                  fill={currentPage === page ? 'solid' : 'clear'}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </IonButton>
              ))}
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
