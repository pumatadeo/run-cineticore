import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// To simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public');
const NEWS_FILE = path.join(PUBLIC_DIR, 'news.json');

// High-quality running images from Unsplash (curated for aesthetic design)
const UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530143311094-34d807799e8f?q=80&w=2069&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070&auto=format&fit=crop"
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * UNSPLASH_IMAGES.length);
    return UNSPLASH_IMAGES[randomIndex];
}

async function fetchRunningNews() {
    console.log("Iniciando búsqueda de noticias semanales...");
    
    try {
        // Fetch top posts from /r/running for the week (no auth required)
        const response = await fetch('https://www.reddit.com/r/running/top.json?limit=5&t=week', {
            headers: {
                'User-Agent': 'RunningNewsBot/1.0.0 (Node.js)'
            }
        });

        if (!response.ok) {
            throw new Error(`Error en Reddit API: ${response.status}`);
        }

        const data = await response.json();
        const posts = data.data.children;

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const todayStr = new Date().toLocaleDateString('es-ES', dateOptions);

        const news = posts.slice(0, 3).map(post => {
            const item = post.data;
            return {
                id: item.id,
                title: item.title,
                date: todayStr,
                // Taking a snippet of the selftext for description
                description: item.selftext ? item.selftext.substring(0, 120) + '...' : 'Revisa los detalles de esta noticia destacada en la comunidad del running actual.',
                image: getRandomImage()
            };
        });

        // Ensure public directory exists
        if (!fs.existsSync(PUBLIC_DIR)) {
            fs.mkdirSync(PUBLIC_DIR);
        }

        // Save to public/news.json
        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2));
        console.log(`✅ Noticias actualizadas exitosamente en ${NEWS_FILE}`);
        console.log(`🗞️ Se han guardado ${news.length} noticias.`);

    } catch (error) {
        console.error("❌ Ocurrió un error al buscar las noticias:", error.message);
        
        // Fallback data in case of no internet or API rate limits
        const fallbackNews = [
            {
                id: "fb1",
                title: "Maratón Lala 2026: Preparativos Finales",
                date: new Date().toLocaleDateString('es-ES'),
                description: "La fiesta lagunera se prepara para recibir a miles de corredores en Torreón. ¿Estás listo para correr rápido?",
                image: getRandomImage()
            },
            {
                id: "fb2",
                title: "Nuevas zapatillas de placa de carbono revolucionan el mercado",
                date: new Date().toLocaleDateString('es-ES'),
                description: "Las marcas siguen empujando los límites de la tecnología. Análisis de los modelos más usados este fin de semana.",
                image: getRandomImage()
            },
            {
                id: "fb3",
                title: "Nutrición en carrera: El debate de los geles",
                date: new Date().toLocaleDateString('es-ES'),
                description: "Expertos discuten la cantidad ideal de carbohidratos por hora para pruebas de larga distancia.",
                image: getRandomImage()
            }
        ];
        fs.writeFileSync(NEWS_FILE, JSON.stringify(fallbackNews, null, 2));
        console.log("ℹ️ Se guardaron noticias de respaldo (fallback) en su lugar.");
    }
}

fetchRunningNews();
