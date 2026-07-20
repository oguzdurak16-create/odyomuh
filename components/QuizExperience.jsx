"use client";

import { useMemo, useState } from 'react';

const CATEGORIES = [
  { key: 'all', label: 'Tümü' },
  { key: 'osmanli', label: 'Osmanlı' },
  { key: 'dunya', label: 'Dünya Tarihi' },
  { key: 'antik', label: 'Antik Çağ' },
  { key: 'savas', label: 'Savaşlar' },
  { key: 'turkiye', label: 'Türkiye' },
];

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

export default function QuizExperience({ questions }) {
  const [category, setCategory] = useState('all');
  const [round, setRound] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const availableCount = useMemo(() => category === 'all' ? questions.length : questions.filter((question) => question.category === category).length, [category, questions]);
  const current = round[questionIndex];
  const progress = round.length ? Math.round(((questionIndex + (selected !== null ? 1 : 0)) / round.length) * 100) : 0;

  function startQuiz() {
    const pool = category === 'all' ? questions : questions.filter((question) => question.category === category);
    setRound(shuffle(pool).slice(0, 10));
    setQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setCorrect(0);
    setFinished(false);
  }

  function chooseAnswer(index) {
    if (selected !== null || !current) return;
    setSelected(index);
    if (index === current.correct) {
      setScore((value) => value + 10);
      setCorrect((value) => value + 1);
    }
  }

  function nextQuestion() {
    if (questionIndex + 1 >= round.length) {
      setFinished(true);
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelected(null);
  }

  const percent = round.length ? Math.round((score / (round.length * 10)) * 100) : 0;
  const resultText = percent === 100
    ? 'Mükemmel. Tarih bilgin çok güçlü.'
    : percent >= 80
      ? 'Harika sonuç. Tarih konularına oldukça hakimsin.'
      : percent >= 60
        ? 'İyi sonuç. Biraz tekrar ile daha da yükseltebilirsin.'
        : percent >= 40
          ? 'Temel iyi. Arşivde biraz daha gezerek skoru yükseltebilirsin.'
          : 'Yeni bir başlangıç için iyi bir tur. Ders notları ve kronoloji sayfası sana yardımcı olur.';

  return (
    <section className="special-page quiz-page" aria-labelledby="quiz-title">
      <header className="special-hero quiz-hero-new">
        <img src="/generated-history/ancient-library-desk.webp" alt="Eski kitaplar ve tarih quiz alanı" width="1672" height="941" />
        <div className="special-hero-overlay" />
        <div className="special-hero-content">
          <p className="eyebrow">ODYOMUH ETKİLEŞİMLİ TEST</p>
          <h1 id="quiz-title">Tarih Quiz</h1>
          <p>Osmanlı, dünya tarihi, antik çağ, savaşlar ve Türkiye tarihi üzerine 125 soruluk havuzdan 10 soruluk bir tur seç.</p>
          <div className="special-hero-stats">
            <span><strong>125+</strong> soru</span>
            <span><strong>5</strong> kategori</span>
            <span><strong>10</strong> soru/tur</span>
          </div>
        </div>
      </header>

      {!round.length ? (
        <section className="quiz-start-panel">
          <div>
            <p className="eyebrow">Kategori seç</p>
            <h2>Bilgini ölç, sonucu anında gör.</h2>
            <p>Her turdaki sorular karıştırılır. Doğru cevabın açıklaması cevap verdikten sonra görünür.</p>
          </div>
          <div className="quiz-category-grid" role="group" aria-label="Quiz kategorileri">
            {CATEGORIES.map((item) => (
              <button
                key={item.key}
                type="button"
                className={category === item.key ? 'active' : ''}
                onClick={() => setCategory(item.key)}
              >
                <span>{item.label}</span>
                <small>{item.key === 'all' ? questions.length : questions.filter((question) => question.category === item.key).length} soru</small>
              </button>
            ))}
          </div>
          <div className="quiz-start-footer">
            <span>Seçili kategoride {availableCount} soru var.</span>
            <button type="button" className="quiz-primary-button" onClick={startQuiz}>Quiz&apos;e Başla</button>
          </div>
        </section>
      ) : finished ? (
        <section className="quiz-result-panel">
          <p className="eyebrow">Tur tamamlandı</p>
          <div className="quiz-result-score">{score}<span>/ {round.length * 10}</span></div>
          <h2>{resultText}</h2>
          <p>{correct} doğru, {round.length - correct} yanlış cevap verdin.</p>
          <div className="quiz-result-actions">
            <button type="button" className="quiz-primary-button" onClick={startQuiz}>Aynı kategoride tekrar dene</button>
            <button type="button" className="quiz-secondary-button" onClick={() => { setRound([]); setFinished(false); }}>Kategori değiştir</button>
          </div>
        </section>
      ) : current ? (
        <section className="quiz-play-panel">
          <div className="quiz-status-row">
            <span>Soru {questionIndex + 1} / {round.length}</span>
            <span>Skor: {score}</span>
          </div>
          <div className="quiz-progress"><span style={{ width: `${progress}%` }} /></div>
          <div className="quiz-question-card">
            <p className="quiz-question-category">{CATEGORIES.find((item) => item.key === current.category)?.label || 'Tarih'}</p>
            <h2>{current.question}</h2>
            <div className="quiz-options">
              {current.options.map((option, index) => {
                const isCorrect = selected !== null && index === current.correct;
                const isWrong = selected === index && selected !== current.correct;
                return (
                  <button
                    type="button"
                    key={option}
                    disabled={selected !== null}
                    className={`${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                    onClick={() => chooseAnswer(index)}
                  >
                    <span>{String.fromCharCode(65 + index)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
            {selected !== null ? (
              <div className="quiz-answer-note">
                <strong>{selected === current.correct ? 'Doğru cevap.' : 'Bu kez olmadı.'}</strong>
                <p>{current.info}</p>
                <button type="button" className="quiz-primary-button" onClick={nextQuestion}>{questionIndex + 1 === round.length ? 'Sonucu Gör' : 'Sonraki Soru'}</button>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </section>
  );
}
