import styles from '@/app/services/services.module.css';

// Questions and answers as native <details> (keyboard and screen reader friendly, no JavaScript)
export default function FaqList({ items }) {
  return (
    <div className={styles.faq}>
      {items.map((item) => (
        <details key={item.q} className={`card ${styles.faqItem}`}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}
