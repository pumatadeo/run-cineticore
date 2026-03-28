import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parser = new Parser();

const SCIENCE_FILE_PATH = path.join(__dirname, '../public/science-articles.json');

// Términos de búsqueda enfocados en ciencia deportiva, biomecánica y nutrición para corredores
const GOOGLE_NEWS_RSS_URL = 'https://news.google.com/rss/search?q=running+science+OR+biomechanics+OR+sports+nutrition&hl=en-US&gl=US&ceid=US:en';

async function fetchScienceArticles() {
    try {
        console.log('🧪 Iniciando rastreo de artículos científicos de Running...');
        
        let existingArticles = [];
        if (fs.existsSync(SCIENCE_FILE_PATH)) {
            const rawData = fs.readFileSync(SCIENCE_FILE_PATH, 'utf-8');
            existingArticles = JSON.parse(rawData);
            console.log(`📚 Historial actual: ${existingArticles.length} artículos encontrados.`);
        } else {
            // Seed data if file doesn't exist
            existingArticles = [
                {
                    id: "seed-1",
                    title: "La biomecánica del aterrizaje y su impacto en lesiones de rodilla",
                    link: "#",
                    contentSnippet: "Un análisis detallado sobre cómo el tipo de pisada influye directamente en las fuerzas de reacción del suelo y su correlación con la rodilla del corredor.",
                    pubDate: new Date().toISOString()
                }
            ];
        }

        const feed = await parser.parseURL(GOOGLE_NEWS_RSS_URL);
        
        let newArticlesCount = 0;
        const newArticles = [];

        // Tomar hasta 5 artículos recientes para el análisis
        const recentItems = feed.items.slice(0, 5);

        for (const item of recentItems) {
            // Generar ID único usando la URL para no duplicar artículos históricos
            const uniqueId = Buffer.from(item.link).toString('base64');

            // Revisar si ya existe en nuestra "Hemeroteca"
            const exists = existingArticles.some(article => article.id === uniqueId);

            if (!exists) {
                newArticles.push({
                    id: uniqueId,
                    title: item.title,
                    link: item.link,
                    contentSnippet: item.contentSnippet || item.content || 'Sin descripción disponible.',
                    pubDate: item.pubDate || new Date().toISOString()
                });
                newArticlesCount++;
            }
        }

        if (newArticlesCount > 0) {
            // Concatenar los nuevos artículos AL INICIO (para que salgan primero en el historial)
            const updatedHistory = [...newArticles, ...existingArticles];
            fs.writeFileSync(SCIENCE_FILE_PATH, JSON.stringify(updatedHistory, null, 2));
            console.log(`✅ OBTENCIÓN EXITOSA: Se han añadido ${newArticlesCount} artículos nuevos a la hemeroteca.`);
        } else {
            console.log(`ℹ️ SIN CAMBIOS: No hay nuevos artículos científicos que añadir hoy.`);
        }

    } catch (error) {
        console.error('❌ Error general obteniendo artículos científicos:', error);
    }
}

fetchScienceArticles();
