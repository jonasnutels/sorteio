import styles from './Sorteio.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import selectIcon from '../assets/select.svg';

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
    <div className={styles.App}>
      <h1>Sorteio</h1>
      <div className={styles.container}>
        <ul>
          {numeros.map((numero) => (
            <li key={numero.id} onClick={() => handleNumeroSelect(numero)}>
              <span>Número: {numero.numero}</span>
              <span>Status:</span>
              <span className={styles[numero.status]}>{numero.status}</span>

              {numero.status !== 'Indisponivel' && (
                <img
                  src={selectIcon}
                  alt=""
                  width={20}
                  onClick={() => {
                    setModalOpen(!modalOpen);
                  }}
                />
              )}

              {selectedNumeroId === numero.id &&
                modalOpen &&
                numero.status !== 'Indisponivel' && (
                  <>
                    <form onSubmit={handleSubmit}>
                      <h3>Rifa Número {numero.numero}</h3>
                      <label>
                        <h3>Nome:</h3>
                        <input
                          type="text"
                          value={nome}
                          required
                          onChange={(e) => setNome(e.target.value)}
                        />
                      </label>
                      <label>
                        <h3>Telefone:</h3>

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
    </div>
  );
}

export default Sorteio;
