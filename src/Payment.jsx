export default function Payment({ cart, onBack }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2 className="text-dark">Ödeme Ekranı</h2>
      <ul style={{ padding: 0, marginBottom: 16 }}>
        {cart.map((item, idx) => (
          <li key={idx} style={{ marginBottom: 8, color: '#222' }}>
            {item.name} - {item.price}₺
          </li>
        ))}
      </ul>
      <div style={{ fontWeight: 'bold', marginBottom: 16, color: '#222' }}>Toplam: {total}₺</div>
      <button style={{ width: '100%', background: '#646cff', color: '#fff', marginBottom: 8 }}>Ödemeyi Tamamla (Demo)</button>
      <button onClick={onBack} style={{ width: '100%', background: '#eee', color: '#222' }}>Geri Dön</button>
    </div>
  );
}
