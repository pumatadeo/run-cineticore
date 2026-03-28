import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CALENDAR_FILE_PATH = path.join(__dirname, '../public/calendar-events.json');

// Base de datos inteligente de circuitos y maratones
const globalRaceDatabase = [
    { title: "Maratón Lala", location: "Torreón, Coahuila", type: "42.195K", isKey: true, baseMonth: 2, baseDay: 1, link: "https://www.maratonlala.org/" },
    { title: "Boston Marathon", location: "Boston, USA", type: "WMM", isKey: false, baseMonth: 3, baseDay: 20, link: "https://www.baa.org/races/boston-marathon" },
    { title: "Medio Maratón CDMX", location: "Ciudad de México", type: "21.097K", isKey: true, baseMonth: 6, baseDay: 12, link: "https://21k.cdmx.gob.mx/" },
    { title: "Maratón CDMX", location: "Ciudad de México", type: "42.195K", isKey: true, baseMonth: 7, baseDay: 30, link: "https://maraton.cdmx.gob.mx/" },
    { title: "Berlin Marathon", location: "Berlin, GER", type: "WMM", isKey: false, baseMonth: 8, baseDay: 27, link: "https://www.bmw-berlin-marathon.com/en/" },
    { title: "Maratón Monterrey", location: "Monterrey, NL", type: "42.195K", isKey: true, baseMonth: 11, baseDay: 13, link: "https://www.maratonmonterrey.mx/" },
    { title: "London Marathon", location: "London, UK", type: "WMM", isKey: false, baseMonth: 3, baseDay: 27, link: "https://www.tcslondonmarathon.com/" },
    { title: "Chicago Marathon", location: "Chicago, USA", type: "WMM", isKey: false, baseMonth: 9, baseDay: 13, link: "https://www.chicagomarathon.com/" }
];

function generateDynamicCalendar() {
    console.log('📅 Ajustando calendario evolutivo...');
    const now = new Date();
    
    // Leemos el calendario actual si existe
    let currentEvents = [];
    if (fs.existsSync(CALENDAR_FILE_PATH)) {
        currentEvents = JSON.parse(fs.readFileSync(CALENDAR_FILE_PATH, 'utf-8'));
    }

    // 1. Filtrar eventos pasados
    const validFutureEvents = currentEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= now;
    });

    console.log(`🧹 Se han purgado ${currentEvents.length - validFutureEvents.length} eventos pasados.`);

    // 2. Si hay pocos eventos futuros, reconstruir el año proyectando las fechas base hacia adelante
    const projectedEvents = globalRaceDatabase.map(race => {
        let year = now.getFullYear();
        let projectedDate = new Date(year, race.baseMonth, race.baseDay);
        
        // Si la carrera de ESTE año ya pasó, calcular automáticamente la del PRÓXIMO año
        if (projectedDate < now) {
            year += 1;
            projectedDate = new Date(year, race.baseMonth, race.baseDay);
        }

        return {
            id: Buffer.from(race.title + year).toString('base64'),
            title: race.title,
            location: race.location,
            type: race.type,
            isKey: race.isKey,
            link: race.link,
            date: projectedDate.toISOString()
        };
    });

    // 3. Ordenarlos por fecha más cercana
    projectedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Tomaremos las 6-8 carreras más prontas
    const finalCalendar = projectedEvents.slice(0, 8);

    fs.writeFileSync(CALENDAR_FILE_PATH, JSON.stringify(finalCalendar, null, 2));
    console.log(`✅ CALENDARIO ACTUALIZADO: Registrados ${finalCalendar.length} eventos futuros listos para inscripción.`);
}

generateDynamicCalendar();
