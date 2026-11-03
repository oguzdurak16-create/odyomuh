'use client';
import { useState } from 'react';
import { historicalInterval } from '../lib/historical-years';
import styles from './HistoricalYearCalculator.module.css';
export default function HistoricalYearCalculator() {
  const [first, setFirst] = useState('500'), [last, setLast] = useState('500');
  const [firstEra, setFirstEra] = useState('bce'), [lastEra, setLastEra] = useState('ce');
  const [answer, setAnswer] = useState(null), [error, setError] = useState('');
  const reset = () => { setAnswer(null); setError(''); };
  return <section className={styles.card} aria-label="Tarih aralığı hesaplayıcı">
    <form onSubmit={e => { e.preventDefault(); try { setAnswer(historicalInterval(Number(first), firstEra, Number(last), lastEra)); setError(''); } catch (err) { setAnswer(null); setError(err.message); } }}>
      <div className={styles.fields}>
        <label>Başlangıç yılı<input name="firstYear" type="number" min="1" max="1000000" step="1" required value={first} onChange={e => { setFirst(e.target.value); reset(); }} /></label>
        <label>Başlangıç dönemi<select value={firstEra} onChange={e => { setFirstEra(e.target.value); reset(); }}><option value="bce">MÖ (Milattan önce)</option><option value="ce">MS (Milattan sonra)</option></select></label>
        <label>Bitiş yılı<input name="lastYear" type="number" min="1" max="1000000" step="1" required value={last} onChange={e => { setLast(e.target.value); reset(); }} /></label>
        <label>Bitiş dönemi<select value={lastEra} onChange={e => { setLastEra(e.target.value); reset(); }}><option value="bce">MÖ (Milattan önce)</option><option value="ce">MS (Milattan sonra)</option></select></label>
      </div>
      <button type="submit">Yıl farkını hesapla</button>
    </form>
    {error && <p role="alert">{error}</p>}
    {answer && <div className={styles.answer} role="status"><strong data-history-years>{answer.years.toLocaleString('tr-TR')} yıl</strong><p>Başlangıç: {firstEra === 'bce' ? 'MÖ' : 'MS'} {answer.firstCentury}. yüzyıl · Bitiş: {lastEra === 'bce' ? 'MÖ' : 'MS'} {answer.lastCentury}. yüzyıl</p>{answer.reverse && <p>İkinci tarih daha erkendir; gösterilen fark iki yılın mutlak uzaklığıdır.</p>}</div>}
    <p className={styles.note}>Yalnız yıl numaraları karşılaştırılır; ay/gün, takvim dönüşümü ve tarihsel tarihleme belirsizliği hesaplanmaz. MÖ 1 ile MS 1 arasında 1 yıl vardır; yıl 0 eklenmez.</p>
  </section>;
}
