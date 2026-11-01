export default function ImageCredit({ credit, english = false }) {
  if (!credit) return null;
  return <p className="image-credit">{english ? 'Photo' : 'Fotoğraf'}: <a href={credit.url} target="_blank" rel="noopener noreferrer">{credit.author}</a> · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer">{credit.license}</a></p>;
}
