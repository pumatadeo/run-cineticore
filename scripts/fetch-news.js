import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Parser from 'rss-parser';

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
    console.log("Iniciando búsqueda de noticias semanales (Google News RSS)...");
    
    try {
        const parser = new Parser({
            customFields: {
                item: ['description']
            }
        });
        
        // Google News RSS query for marathons in Mexico or World Marathon Majors
        const feedUrl = 'https://news.google.com/rss/search?q=maraton+mexico+OR+marathon+majors+when:7d&hl=es-419&gl=MX&ceid=MX:es-419';
        
        const feed = await parser.parseURL(feedUrl);

        if (!feed.items || feed.items.length === 0) {
            throw new Error("No hay noticias en el feed RSS.");
        }

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

        // Process top 3 news items
        const news = feed.items.slice(0, 3).map(item => {
            const pubDate = new Date(item.pubDate);
            const dateStr = isNaN(pubDate) ? new Date().toLocaleDateString('es-ES', dateOptions) : pubDate.toLocaleDateString('es-ES', dateOptions);
            
            // Clean up description (Google News RSS includes HTML tags like <a>)
            let cleanDesc = item.contentSnippet || item.description || 'Noticia destacada en el mundo del running.';
            cleanDesc = cleanDesc.replace(/<[^>]*>?/gm, ''); // Remove basic html
            if (cleanDesc.length > 150) {
                cleanDesc = cleanDesc.substring(0, 147) + '...';
            }

            return {
                id: item.guid || item.link,
                title: item.title,
                date: dateStr,
                description: cleanDesc,
                image: getRandomImage(),
                url: item.link
            };
        });

        // Ensure public directory exists
        if (!fs.existsSync(PUBLIC_DIR)) {
            fs.mkdirSync(PUBLIC_DIR);
        }

        // Save to public/news.json
        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2));
        console.log(`✅ Noticias actualizadas exitosamente en ${NEWS_FILE}`);
        console.log(`🗞️ Se han guardado ${news.length} noticias reales (Con Insights y Links).`);

    } catch (error) {
        console.error("❌ Ocurrió un error al buscar las noticias RSS:", error.message);
        
        // Fallback data in case of error
        const fallbackNews = [
            {
                id: "fb1",
                title: "Maratón Lala 2026: Preparativos Finales",
                date: new Date().toLocaleDateString('es-ES'),
                description: "La fiesta lagunera se prepara para recibir a miles de corredores en Torreón. ¿Estás listo para correr rápido?",
                image: getRandomImage(),
                url: "https://maratonlala.org/"
            },
            {
                id: "fb2",
                title: "Nuevas zapatillas de placa de carbono revolucionan el mercado",
                date: new Date().toLocaleDateString('es-ES'),
                description: "Las marcas siguen empujando los límites de la tecnología. Análisis de los modelos más usados este fin de semana.",
                image: getRandomImage(),
                url: "https://www.runnersworld.com/"
            },
            {
                id: "fb3",
                title: "Nutrición en carrera: El debate de los geles",
                date: new Date().toLocaleDateString('es-ES'),
                description: "Expertos discuten la cantidad ideal de carbohidratos por hora para pruebas de larga distancia.",
                image: getRandomImage(),
                url: "https://www.soymaratonista.com/"
            }
        ];
        fs.writeFileSync(NEWS_FILE, JSON.stringify(fallbackNews, null, 2));
        console.log("ℹ️ Se guardaron noticias de respaldo (fallback) en su lugar.");
    }
}

fetchRunningNews();
