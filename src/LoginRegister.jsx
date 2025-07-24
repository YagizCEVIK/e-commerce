
import { useState } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

export default function LoginRegister({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        setError('Şifre yanlış.');
      } else if (err.code === 'auth/user-not-found') {
        setError('Kullanıcı bulunamadı.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Bu e-posta zaten kayıtlı.');
      } else {
        setError('Hata: ' + err.message);
      }
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 400 }}>
      <h2 className="text-dark">{isRegister ? "Kayıt Ol" : "Giriş Yap"}</h2>
      <form onSubmit={handleSubmit}>
        {isRegister && (
          <input
            type="text"
            placeholder="Adınız"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", marginBottom: 12, padding: 8 }}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 12, padding: 8 }}
        />
        <button type="submit" style={{ width: "100%", marginBottom: 8 }}>
          {isRegister ? "Kayıt Ol" : "Giriş Yap"}
        </button>
      </form>
      <button onClick={handleGoogle} style={{ width: "100%", background: "#db4437", marginBottom: 8 }}>
        Google ile Giriş Yap
      </button>
      <button onClick={() => setIsRegister(!isRegister)} style={{ width: "100%", background: "#eee", color: "#222" }}>
        {isRegister ? "Zaten hesabım var" : "Hesabım yok, kayıt ol"}
      </button>
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
    </div>
  );
}
