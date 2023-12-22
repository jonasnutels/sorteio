import styles from './Sorteio.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';

function Sorteio() {
  const { getNumeros, numeros, updateNumeroStatus } = useContext(UserContext);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [selectedNumeroId, setSelectedNumeroId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getNumeros();
  }, []);

  const handleNumeroSelect = async (selectedNumero) => {
    setSelectedNumeroId(selectedNumero.id);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateNumeroStatus(selectedNumeroId, 'Indisponivel', nome, telefone);
    getNumeros();
    console.log('ID', selectedNumeroId, 'Dados do formulário:', {
      nome,
      telefone,
    });

    setModalOpen(false);
    setNome('');
    setTelefone('');
  };

  return (
    <>
      <div className={styles.container}>
        <h1>Sorteio</h1>
        <ul>
          {numeros.map((numero) => (
            <li key={numero.id} onClick={() => handleNumeroSelect(numero)}>
              Número: {numero.numero}, Status:
              <span className={styles[numero.status]}>{numero.status}</span>
              {selectedNumeroId === numero.id && modalOpen && (
                <>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Nome:
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                      />
                    </label>
                    <label>
                      Telefone:
                      <input
                        type="tel"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        pattern="\d{11}"
                        title="Ex: 82999999999"
                        required
                      />
                    </label>

                    <button type="submit">Enviar</button>
                  </form>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sorteio;
