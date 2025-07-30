import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [libros, setLibros] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
  });
  
  // Estados para login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });

  // Estado para controlar el modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Verificar si ya hay un token guardado al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyToken(token);
    }
  }, []);

  // Cargar libros solo si está logueado
  useEffect(() => {
    if (isLoggedIn) {
      fetchLibros();
    }
  }, [isLoggedIn]);

  // Función para verificar token
  const verifyToken = async (token) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setIsLoggedIn(true);
        setUser(data.user);
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error verificando token:", error);
      localStorage.removeItem("token");
    }
  };

  // Función para hacer login
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUser(data.user);
        setLoginData({ username: "", password: "" });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  // Función para hacer logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    setLibros([]);
  };

  // Función para cargar libros (con token)
  const fetchLibros = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/libros", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setLibros(data);
      } else {
        console.error("Error al cargar libros");
      }
    } catch (error) {
      console.error("Error al cargar libros:", error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleLoginChange = (event) => {
    const { id, value } = event.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, author, genre } = formData;
    
    if (title && author && genre) {
      const nuevoLibro = { title, author, genre };
      
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/libros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(nuevoLibro),
        });
        
        if (res.ok) {
          const libroGuardado = await res.json();
          setLibros([...libros, libroGuardado]);
          setFormData({ title: "", author: "", genre: "" });
          alert("Libro guardado!");
        } else {
          alert("Error al guardar el libro");
        }
      } catch (error) {
        console.error("Error al guardar el libro:", error);
      }
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  // Función para manejar la apertura del modal
  const handleLibro = (libro) => {
    setSelectedBook(libro);
    setModalVisible(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedBook(null);
  };

  // Si no está logueado, mostrar formulario de login
  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1>📚 Sistema de Libros</h1>
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          <p><em>Usuario de prueba: Juan / Juan1981</em></p>
          
          <div onSubmit={handleLogin}>
            <div>
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            
            <button type="submit" onClick={handleLogin}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    );
  }

  // Si está logueado, mostrar la app normal
  return (
    <>
      <div className="header">
        <h1>Lista de Libros</h1>
        <div className="user-info">
          <span>👋 Hola, {user?.username}!</span>
          <button onClick={handleLogout} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>
      </div>
      
      <div className="libros-contenedor">
        <ul className="libros-lista">
          {libros.map((libro, index) => (
            <li key={index}>
              <button onClick={() => handleLibro(libro)}>
                {libro.title} - {libro.author} - {libro.genre}
              </button>
            </li>
          ))}
        </ul>

        <div onSubmit={handleSubmit} className="libros-formulario">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            value={formData.author}
            onChange={handleChange}
          />
          <label htmlFor="genre">Género</label>
          <input
            type="text"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <button type="submit" onClick={handleSubmit}>Cargar Libro</button>
        </div>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedBook.title}</h2>
            <p><strong>Autor:</strong> {selectedBook.author}</p>
            <p><strong>Género:</strong> {selectedBook.genre}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;