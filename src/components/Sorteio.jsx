import styles from './Sorteio.module.css';
import coracaoIcon from '../assets/heart.svg';
function Sorteio() {
  const HeartContainer = () => {
    const hearts = Array.from({ length: 100 }, (_, index) => index + 1);

    return (
      <div className={styles['heart-container']}>
        {hearts.map((number) => (
          <div key={number} className={styles.heart}>
            <span className={styles['heart-number']}>{number}</span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <div className={styles.container}>
        <img className={styles.heartImg} src={coracaoIcon} alt="" width={100} />
        <div className={styles.titulo}>
          <h1>Chá Rifa da</h1>
          <span className={styles.nomeZoe}>Zoe</span>
        </div>
        <img className={styles.heartImg} src={coracaoIcon} alt="" width={100} />
      </div>
      <div className={styles.painel}>
        <HeartContainer />
      </div>
    </>
  );
}

export default Sorteio;
